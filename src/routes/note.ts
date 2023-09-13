import { Router } from 'express'

import noteController from '@/controllers/notes'
import { authGuard } from '@/middlewares/auth'

const routes: Router = Router()

routes.get('/', authGuard(), noteController.index)

routes.post('/', authGuard(), noteController.store)

routes.get('/:id', authGuard(), noteController.show)

routes.patch('/:id', authGuard(), noteController.update)

routes.delete('/:id', authGuard(), noteController.destroy)

export default routes
