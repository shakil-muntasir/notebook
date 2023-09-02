import 'express-async-errors'
import { Router } from 'express'

import authRoutes from '@/routes/auth'
import userRoutes from '@/routes/user'

import { errorHandler } from '@/middlewares/error'

const routes: Router = Router()

routes.use('/auth', authRoutes)

routes.use('/users', userRoutes)

routes.use(errorHandler)

export default routes
