import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import env from '@/utils/env'
import { UserPayload } from '@/types/user'

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload
        }
    }
}

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1] // Split Bearer and token and get the token

    try {
        // Verify the token using your secret key
        const decodedToken = jwt.verify(token, env.JWT_ACCESS_SECRET)

        req.user = decodedToken as UserPayload

        // Continue to the next middleware or route handler
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}
