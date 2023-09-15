import 'express-async-errors'
import { NextFunction, Request, Response, Router } from 'express'
import swaggerUi from 'swagger-ui-express'

import env from '@/utils/env'
import swaggerDocument from '@/documentation/openapi'

import authRoutes from '@/routes/auth'
import userRoutes from '@/routes/user'
import noteRoutes from '@/routes/note'

import { errorHandler } from '@/middlewares/error'

const routes: Router = Router()

routes.use('/auth', authRoutes)

routes.use('/users', userRoutes)

routes.use('/notes', noteRoutes)

if (['staging', 'production'].includes(env.NODE_ENV)) {
    /**
        For reverse proxy, e.g. nginx:
        location /api/documentation/ {
            proxy_pass http://<ip>:<port>/api/documentation/;
        }
     */

    const forwardedPrefixSwagger = async (request: Request, _response: Response, next: NextFunction) => {
        request.originalUrl = (request.headers['x-forwarded-prefix'] || '') + request.url
        next()
    }

    routes.use('/documentation/', forwardedPrefixSwagger, swaggerUi.serve)
} else {
    routes.use('/documentation/', swaggerUi.serve)
}
routes.get('/documentation/', swaggerUi.setup(swaggerDocument, { swaggerOptions: { persistAuthorization: true } }))

routes.use(errorHandler)

export default routes
