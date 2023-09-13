import { Request, Response } from 'express'
import http from 'http-status'

import User from '@/models/user'

const index = async (_request: Request, response: Response) => {
    const users: User[] = await User.find()

    return response.json(users)
}

const store = async (request: Request, response: Response) => {
    const { name, email, password, confirmPassword, roles }: User = request.body

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

    const createdUser = await User.create({ name, email, password, roles })

    const user = await User.findById(createdUser._id)

    return response.json(user)
}

const userController = {
    index,
    store
}

export default userController
