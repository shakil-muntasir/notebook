import 'express-async-errors'
import { Router } from 'express'

import userRoutes from '@/routes/user'
import { errorHandler } from '@/utils/error-handler'

const routes: Router = Router()

routes.use('/users', userRoutes)

routes.use(errorHandler)

export default routes
