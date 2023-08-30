import { Router } from 'express'

import userController from '@/controllers/user'

const routes: Router = Router()

routes.get('/', userController.index)

routes.post('/', userController.store)

export default routes
