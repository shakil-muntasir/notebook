const AuthRoutes = {
    '/api/auth/signup': {
        post: {
            summary: 'Sign up a new user',
            description: 'Sign up a new user.',
            tags: ['Auth'],
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
                '200': {
                    description: 'User signed up successfully',
                    content: {
                        'application/json': {
                            example: {
                                type: 'Bearer',
                                accessToken:
                                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTAyMzA0OWIyYWVlOGM3ZjRkMGMzODUiLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5AZW1haWwuY29tIiwicm9sZXMiOlsiYOPtaW4iXSwiaWF0IjoxNjk0NzIxMDcwLCJleHAiOjE2OTQ3MjQ2NzB9.MSrrfqJ0rGD76QL3FMfBXwSs2KvSZAF08GC1m1TdZmY',
                                expiresIn: 3600000
                            }
                        }
                    }
                },
                '400': {
                    description: 'Bad request',
                    content: {
                        'application/json': {
                            examples: {
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
    },
    '/api/auth/signin': {
        post: {
            summary: 'Sign in a user',
            description: 'Sign in a user.',
            tags: ['Auth'],
            requestBody: {
                description: 'Sign in request object',
                content: {
                    'application/json': {
                        example: {
                            email: 'john@email.com',
                            password: 'password'
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'User signed in successfully',
                    content: {
                        'application/json': {
                            example: {
                                type: 'Bearer',
                                accessToken:
                                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTAyMzA0OWIyYWVlOGM3ZjRkMGMzODUiLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5AZW1haWwuY29tIiwicm9sZXMiOlsiYOPtaW4iXSwiaWF0IjoxNjk0NzIxMDcwLCJleHAiOjE2OTQ3MjQ2NzB9.MSrrfqJ0rGD76QL3FMfBXwSs2KvSZAF08GC1m1TdZmY',
                                expiresIn: 3600000
                            }
                        }
                    }
                },
                '401': {
                    description: 'Invalid credentials',
                    content: {
                        'application/json': {
                            example: {
                                error: 'Invalid credentials.'
                            }
                        }
                    }
                }
            }
        }
    }
}

export default AuthRoutes
