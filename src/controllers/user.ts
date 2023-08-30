import { Request, Response } from 'express'

import User from '@/models/user'

const index = async (request: Request, response: Response) => {
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
    const { name, email, password }: User = request.body

    const user: User = await User.create({ name, email, password })

    return response.json(user)
}

const userController = {
    index,
    store
}

export default userController
