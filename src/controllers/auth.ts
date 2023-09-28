import { Request, Response } from 'express'
import { Document } from 'mongoose'
import http from 'http-status'

import User from '@/models/user'
import env from '@/utils/env'
import { getTime } from '@/utils/timer'
import { addOrUpdateUserSession } from '@/helpers/session'

const signup = async (request: Request, response: Response) => {
    const { name, email, password, confirmPassword }: User = request.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        return response.status(http.CONFLICT).json({ error: 'User already exists.' })
    }

    if (!confirmPassword) {
        return response.status(http.BAD_REQUEST).json({ error: 'confirmPassword is required.' })
    }

    if (password !== confirmPassword) {
        return response.status(http.BAD_REQUEST).json({ error: 'Passwords do not match.' })
    }

    const user = (await User.create({ name, email, password })) as Document & User

    const { refreshToken } = await addOrUpdateUserSession(request, user)

    response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: getTime(env.JWT_REFRESH_EXPIRATION)
    })

    return response.status(http.OK).json({
        type: 'Bearer',
        accessToken: user.generateAccessToken(),
        expiresIn: getTime(env.JWT_ACCESS_EXPIRATION)
    })
}

const signin = async (request: Request, response: Response) => {
    const { email, password }: User = request.body

    const user = (await User.findOne({ email }).select('+password +sessions')) as Document & User

    if (!user || !(await user.comparePassword(password))) {
        return response.status(http.UNAUTHORIZED).json({ error: 'Invalid credentials.' })
    }

    const { refreshToken } = await addOrUpdateUserSession(request, user)

    response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: getTime(env.JWT_REFRESH_EXPIRATION)
    })

    return response.status(http.OK).json({
        type: 'Bearer',
        accessToken: user.generateAccessToken(),
        expiresIn: getTime(env.JWT_ACCESS_EXPIRATION)
    })
}

const sessions = async (request: Request, response: Response) => {
    const { _id } = request.user!

    const user = await User.findById(_id).select({
        sessions: { refreshToken: false, createdAt: false, updatedAt: false }
    })

    if (!user) {
        return response.status(http.NOT_FOUND).json({ error: 'User not found.' })
    }

    return response.status(http.OK).json(user.sessions)
}

const deleteSession = async (request: Request, response: Response) => {
    const { _id: userId } = request.user!
    const { id: sessionId } = request.params

    const user = await User.findById(userId).select('+sessions')

    if (!user) {
        return response.status(http.NOT_FOUND).json({ error: 'User not found.' })
    }

    if (!user.sessions.id(sessionId)) {
        return response.status(http.NOT_FOUND).json({ error: 'Session not found.' })
    }

    user.sessions.remove({ _id: sessionId })

    await user.save()

    return response.status(http.NO_CONTENT).send()
}

const authController = {
    signup,
    signin,
    sessions,
    deleteSession
}

export default authController
