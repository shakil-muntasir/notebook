import { Router } from 'express'

import authController from '@/controllers/auth'

const routes: Router = Router()

routes.post('/signup', authController.signup)

routes.post('/signin', authController.signin)

export default routes
