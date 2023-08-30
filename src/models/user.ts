import { InferSchemaType, model, Schema } from 'mongoose'

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            minlength: 6,
            required: true
        }
    },
    {
        timestamps: true
    }
)

type User = InferSchemaType<typeof userSchema>

const User = model<User>('User', userSchema)

export default User
