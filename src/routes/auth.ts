import { Router } from 'express'

import { authGuard } from '@/middlewares/auth'

import authController from '@/controllers/auth'

const routes: Router = Router()

routes.post('/signup', authController.signup)

routes.post('/signin', authController.signin)

routes.get('/sessions', authGuard(), authController.sessions)

routes.delete('/sessions/:id', authGuard(), authController.deleteSession)

export default routes
