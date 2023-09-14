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

if (env.NODE_ENV !== 'production') {
    routes.use('/documentation', swaggerUi.serve)
    routes.get('/documentation', swaggerUi.setup(swaggerDocument))
}

routes.use('/auth', authRoutes)

routes.use('/users', userRoutes)

routes.use('/notes', noteRoutes)

routes.use(errorHandler)

export default routes
