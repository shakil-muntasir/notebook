import User from '@/models/user'
import { InferSchemaType, model, Schema } from 'mongoose'

const noteSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: User
        },
        unread: {
            type: Boolean,
            required: true,
            default: true
        }
    },
    {
        timestamps: true
    }
)

type Note = InferSchemaType<typeof noteSchema>

const Note = model<Note>('Note', noteSchema)

export default Note
