import mongoose from 'mongoose'
import { Express } from 'express'
import env from '@/utils/env'

export default {
    start: async (app: Express) => {
        try {
            await mongoose.connect(env.MONGO_URI, { dbName: env.MONGO_DB })
            console.log(`Connected to database: ${env.MONGO_DB}`)

            app.listen(env.PORT, () => console.log(`Server listening on port ${env.PORT}`))
        } catch (error) {
            console.error(`Error connecting to database: ${env.MONGO_DB}`)
        }
    }
}
