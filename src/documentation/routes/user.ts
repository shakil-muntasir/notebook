const UserRoutes = {
    '/api/users': {
        get: {
            summary: 'Get a list of users',
            description: 'Retrieve a list of users from the database.',
            security: [{ 'Bearer Token': [] }],
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
                },
                '401': {
                    description: 'Unauthorized',
                    content: {
                        'application/json': {
                            example: {
                                message: 'Unauthorized'
                            }
                        }
                    }
                }
            }
        },
        post: {
            summary: 'Create a new user',
            description: 'Create a new user.',
            security: [{ 'Bearer Token': [] }],
            tags: ['User'],
            requestBody: {
                description: 'User request object',
                content: {
                    'application/json': {
                        example: {
                            name: 'John Doe',
                            email: 'john@email.com',
                            password: 'password',
                            confirmPassword: 'password'
                        }
                    }
                }
            },
            responses: {
                '201': {
                    description: 'User created successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User'
                            }
                        }
                    }
                },
                '400': {
                    description: 'Bad request',
                    content: {
                        'application/json': {
                            examples: {
                                Name: {
                                    value: {
                                        error: 'name is required.'
                                    }
                                },
                                Email: {
                                    value: {
                                        error: 'email is required.'
                                    }
                                },
                                'Confirm Password': {
                                    value: {
                                        error: 'confirmPassword is required.'
                                    }
                                },
                                'Password Mismatch': {
                                    value: {
                                        error: 'Passwords do not match.'
                                    }
                                }
                            }
                        }
                    }
                },
                '401': {
                    description: 'Unauthorized',
                    content: {
                        'application/json': {
                            example: {
                                message: 'Unauthorized'
                            }
                        }
                    }
                },
                '409': {
                    description: 'User already exists',
                    content: {
                        'application/json': {
                            example: {
                                error: 'User already exists.'
                            }
                        }
                    }
                }
            }
        }
    }
}

export default UserRoutes
