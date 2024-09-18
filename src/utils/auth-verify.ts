import { Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import env from '@/utils/env'
import { getTime } from '@/utils/timer'

interface RefreshPayload extends JwtPayload {
    _id: string
}

export const verifyRefreshToken = (refreshToken: string): RefreshPayload | null => {
    try {
        return jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as RefreshPayload
    } catch (error) {
        return null
    }
}

export const setRefreshTokenCookie = (response: Response, refreshToken: string) => {
    response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        maxAge: getTime(env.JWT_REFRESH_EXPIRATION),
        sameSite: 'strict'
    })
}
