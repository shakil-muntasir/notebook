import { Router } from 'express'

import userController from '@/controllers/user'
import { authGuard } from '@/middlewares/auth'

const routes: Router = Router()

routes.get('/', authGuard, userController.index)

routes.post('/', authGuard, userController.store)

export default routes
