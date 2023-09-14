import NoteRoutes from './routes/note'
import UserRoutes from './routes/user'

import NoteSchema from './schemas/note'
import UserSchema from './schemas/user'

export default {
    openapi: '3.0.0',
    info: {
        title: 'Notebook API Documentation',
        version: '1.0.0',
        description: 'Documentation for Notebook API',
        contact: {
            name: 'Muntasir Rahman',
            email: 'shakil_muntasir@hotmail.com',
            url: 'https://muntasir.io'
        },
        license: {
            name: 'MIT License',
            url: 'https://opensource.org/licenses/MIT'
        }
    },
    paths: {
        ...NoteRoutes,
        ...UserRoutes
    },
    components: {
        schemas: {
            ...NoteSchema,
            ...UserSchema
        }
    }
}
