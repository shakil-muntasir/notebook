import { Request, Response } from 'express'
import http from 'http-status'

import Note from '@/models/note'

const index = async (request: Request, response: Response) => {
    const notes = await Note.find({ user: request.user!._id })

    return response.status(http.OK).json(notes)
}

const store = async (request: Request, response: Response) => {
    const { title, content }: Note = request.body

    const createdNote = await Note.create({ title, content, user: request.user!._id })

    const note = await Note.findById(createdNote._id)

    return response.status(http.OK).json(note)
}

const show = async (request: Request, response: Response) => {
    const { id } = request.params

    const note = await Note.findById(id)

    if (!note) {
        return response.status(http.NOT_FOUND).json({ error: 'Note not found.' })
    }

    return response.status(http.OK).json(note)
}

const update = async (request: Request, response: Response) => {
    const { id } = request.params

    const note = await Note.findById(id)

    if (!note) {
        return response.status(http.NOT_FOUND).json({ error: 'Note not found.' })
    }

    const { title, content, unread }: Note = request.body

    note.title = title
    note.content = content
    note.unread = unread

    await note.save()

    return response.status(http.OK).json(note)
}

const destroy = async (request: Request, response: Response) => {
    const { id } = request.params

    const note = await Note.findById(id)

    if (!note) {
        return response.status(http.NOT_FOUND).json({ error: 'Note not found.' })
    }

    await note.deleteOne()

    return response.status(http.NO_CONTENT).send()
}

const noteController = {
    index,
    store,
    show,
    update,
    destroy
}

export default noteController
