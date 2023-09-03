import { InferSchemaType, model, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import env from '@/utils/env'
import { UserPayload } from '@/types/user'
import { sessionSchema } from '@/models/schema/session'

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
            required: true,
            minlength: 6,
            select: false
        },
        roles: {
            type: [String],
            required: true,
            default: ['user']
        },
        sessions: {
            type: [sessionSchema],
            select: false
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, 10)
    }

    next()
})

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function (): string {
    const payload: UserPayload = {
        _id: this._id,
        name: this.name,
        email: this.email,
        roles: this.roles
    }

    const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
        expiresIn: env.JWT_ACCESS_EXPIRATION
    })

    return accessToken
}

userSchema.methods.generateRefreshToken = function (): string {
    const refreshTokenPayload = {
        _id: this._id
    }

    const refreshToken = jwt.sign(refreshTokenPayload, env.JWT_REFRESH_SECRET, {
        expiresIn: env.JWT_REFRESH_EXPIRATION
    })

    return refreshToken
}

type User = InferSchemaType<typeof userSchema> & {
    confirmPassword?: string
    comparePassword: (password: string) => Promise<boolean>
    generateAccessToken: () => string
    generateRefreshToken: () => string
}

const User = model<User>('User', userSchema)

export default User
