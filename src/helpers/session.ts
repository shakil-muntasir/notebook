import { Request } from 'express'
import { Document } from 'mongoose'

import User from '@/models/user'
import { SessionType } from '@/models/schema/session'

export const addOrUpdateUserSession = async (request: Request, user: Document & User): Promise<SessionType> => {
    const sessionData: SessionType = {
        browserName: request.useragent?.browser || 'Unknown',
        ipAddress: request.headers['cf-connecting-ip']?.toString() || request.headers['x-forwarded-for']?.toString() || request.socket.remoteAddress || 'Unknown',
        osName: request.useragent?.os || 'Unknown',
        lastAccess: new Date(),
        refreshToken: user.generateRefreshToken()
    }

    // Check if there is an existing session with matching browserName and ipAddress
    const existingSessionIndex: number = user.sessions.findIndex(session => {
        return session.browserName === sessionData.browserName && session.ipAddress === sessionData.ipAddress && session.osName === sessionData.osName
    })

    if (existingSessionIndex !== -1) {
        // Session with matching browserName and ipAddress found, update lastAccess
        user.sessions[existingSessionIndex].lastAccess = sessionData.lastAccess

        // Replace refreshToken with the one from the existing session
        sessionData.refreshToken = user.sessions[existingSessionIndex].refreshToken
    } else {
        // No matching session found, add a new session
        user.sessions.push({
            ...sessionData,
            lastAccess: sessionData.lastAccess
        })
    }

    // Update the user with session data
    await user.save()

    return sessionData
}
