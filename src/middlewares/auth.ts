import { Request, Response, NextFunction } from 'express'
import http from 'http-status'
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

export const authGuard = (allowedRoles: string[] = ['user']) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization']

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(http.UNAUTHORIZED).json({ message: 'Unauthorized' })
        }

        const token = authHeader.split(' ')[1] // Split Bearer and token and get the token

        try {
            // Verify the token using access secret key
            const decodedToken = jwt.verify(token, env.JWT_ACCESS_SECRET)

            req.user = decodedToken as UserPayload

            const userRoles = req.user.roles || []

            // Check if the user has the "admin" role
            if (userRoles.includes('admin')) {
                // User is an admin, allow access
                next()
            } else {
                // Check if the user's roles include one of the allowed roles
                const isAuthorized = userRoles.some(role => allowedRoles.includes(role))

                if (!isAuthorized) {
                    // User doesn't have the required roles, deny access
                    return res.status(http.FORBIDDEN).json({ message: 'Forbidden' })
                }

                // User has the required roles, allow access
                next()
            }
        } catch (error) {
            return res.status(http.UNAUTHORIZED).json({ message: 'Unauthorized' })
        }
    }
}
