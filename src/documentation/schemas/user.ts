const UserSchema = {
    User: {
        type: 'object',
        properties: {
            _id: {
                type: 'string',
                format: 'uuid',
                example: '5f8a5d9b4f4d4a1b1c9a7b1c'
            },
            name: {
                type: 'string',
                example: 'Muntasir Rahman'
            },
            email: {
                type: 'string',
                example: 'muntasir@email.com'
            },
            roles: {
                type: 'array',
                items: {
                    type: 'string'
                },
                example: ['admin', 'user']
            },
            createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2023-09-14T19:01:54.926Z'
            },
            updatedAt: {
                type: 'string',
                format: 'date-time',
                example: '2023-09-14T19:01:54.926Z'
            },
            __v: {
                type: 'integer',
                example: 0
            }
        }
    }
}

export default UserSchema
