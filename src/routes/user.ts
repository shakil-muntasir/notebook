import { Router } from 'express'

import userController from '@/controllers/user'
import { authGuard } from '@/middlewares/auth'

const routes: Router = Router()

routes.get('/', authGuard(['admin']), userController.index)

routes.post('/', authGuard(['admin']), userController.store)

export default routes
