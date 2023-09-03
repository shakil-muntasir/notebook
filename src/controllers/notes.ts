import { Request, Response } from 'express'

import Note from '@/models/note'

const index = async (request: Request, response: Response) => {
    const notes = await Note.find({ user: request.user!._id })

    return response.json(notes)
}

const store = async (request: Request, response: Response) => {
    const { title, content }: Note = request.body

    const createdNote = await Note.create({ title, content, user: request.user!._id })

    const note = await Note.findById(createdNote._id)

    return response.json(note)
}

const noteController = {
    index,
    store
}

export default noteController
