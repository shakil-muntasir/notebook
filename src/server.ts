import mongoose from 'mongoose'
import { Express } from 'express'
import env from '@/utils/env'

export default {
    start: async (app: Express) => {
        try {
            await mongoose.connect(env.MONGO_URI, { dbName: env.MONGO_DB })

            app.listen(env.APP_PORT, () => console.log(`MongoDB Connected: ${env.MONGO_DB}, Server listening on port: ${env.APP_PORT}`))
        } catch (error) {
            console.error(`Error connecting to database: ${env.MONGO_DB}`)
        }
    }
}
