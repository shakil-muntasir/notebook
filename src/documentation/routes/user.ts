const UserRoutes = {
    '/api/users': {
        get: {
            summary: 'Get a list of users',
            description: 'Retrieve a list of users from the database.',
            tags: ['User'],
            responses: {
                '200': {
                    description: 'Successful response',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/User'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export default UserRoutes
