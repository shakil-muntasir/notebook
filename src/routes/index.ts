import 'express-async-errors'
import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'

import env from '@/utils/env'
import swaggerDocument from '@/documentation/openapi'

import authRoutes from '@/routes/auth'
import userRoutes from '@/routes/user'
import noteRoutes from '@/routes/note'

import { errorHandler } from '@/middlewares/error'

const routes: Router = Router()

routes.use('/auth', authRoutes)

routes.use('/users', userRoutes)

routes.use('/notes', noteRoutes)

if (env.NODE_ENV !== 'production') {
    const swaggerOptions = { swaggerOptions: { persistAuthorization: true } }

    routes.use('/documentation', swaggerUi.serve)
    routes.get('/documentation', swaggerUi.setup(swaggerDocument, swaggerOptions))
}

routes.use(errorHandler)

export default routes
