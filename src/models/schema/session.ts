import { InferSchemaType, Schema } from 'mongoose'

export const sessionSchema = new Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
            auto: true
        },
        browserName: {
            type: String,
            required: true
        },
        ipAddress: {
            type: String,
            required: true
        },
        userAgent: {
            type: String,
            required: true
        },
        osName: {
            type: String,
            required: true
        },
        lastAccess: {
            type: Date,
            required: true
        },
        refreshToken: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export type SessionType = Omit<InferSchemaType<typeof sessionSchema>, 'createdAt' | 'updatedAt'>
