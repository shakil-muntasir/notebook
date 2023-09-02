import { NextFunction, Request, Response } from 'express'

export const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof Error) {
        return res.status(500).json({ message: error.message })
    }

    res.status(500).json({ message: 'Internal Server Error' })
}
