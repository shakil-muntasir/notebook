import { NextFunction, Request, Response } from 'express'
import http from 'http-status'
import { Error } from 'mongoose'

export const errorHandler = (error: unknown, _request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof Error) {
        return response.status(http.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }

    response.status(http.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error.' })
}
