import { Router } from 'express'

import noteController from '@/controllers/notes'
import { authGuard } from '@/middlewares/auth'

const routes: Router = Router()

routes.get('/', authGuard(), noteController.index)

routes.post('/', authGuard(), noteController.store)

export default routes
