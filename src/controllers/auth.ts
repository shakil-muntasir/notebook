import { Request, Response } from 'express'

import User from '@/models/user'
import { getTime } from '@/utils/timer'
import env from '@/utils/env'

const signup = async (request: Request, response: Response) => {
    const { name, email, password, confirmPassword }: User = request.body

    const userExists = await User.findOne({ email })
    if (userExists) {
        return response.status(400).json({ error: 'User already exists.' })
    }

    if (!confirmPassword) {
        return response.status(400).json({ error: 'confirmPassword is required.' })
    }

    if (password !== confirmPassword) {
        return response.status(400).json({ error: 'Passwords do not match.' })
    }

    const user: User = await User.create({ name, email, password })

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: getTime(env.JWT_REFRESH_EXPIRATION)
    })

    return response.json({
        type: 'Bearer',
        accessToken,
        expiresIn: getTime(env.JWT_ACCESS_EXPIRATION)
    })
}

const signin = async (request: Request, response: Response) => {
    const { email, password }: User = request.body

    const user: User = await User.findOne({ email }).select('+password')

    if (!user || !(await user.comparePassword(password))) {
        return response.status(400).json({ error: 'Invalid credentials.' })
    }

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: getTime(env.JWT_REFRESH_EXPIRATION)
    })

    return response.json({
        type: 'Bearer',
        accessToken,
        expiresIn: getTime(env.JWT_ACCESS_EXPIRATION)
    })
}

const authController = {
    signup,
    signin
}

export default authController
