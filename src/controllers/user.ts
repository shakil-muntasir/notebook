import { Request, Response } from 'express'

import User from '@/models/user'

const index = async (_request: Request, response: Response) => {
    try {
        const users: User[] = await User.find()

        return response.json(users)
    } catch (error: unknown) {
        if (error instanceof Error) {
            return response.status(500).json({ error: error.message })
        }

        return response.status(500).json({ error })
    }
}

const store = async (request: Request, response: Response) => {
    const { name, email, password, confirmPassword, roles }: User = request.body

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

    await User.create({ name, email, password, roles })

    const user = await User.findOne({ email })

    return response.json(user)
}

const userController = {
    index,
    store
}

export default userController
