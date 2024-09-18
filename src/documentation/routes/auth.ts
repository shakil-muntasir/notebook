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
    },
    '/api/auth/refresh': {
        post: {
            summary: 'Refresh access token',
            description: 'Refresh access token using refresh token.',
            tags: ['Auth'],
            requestBody: {
                description: 'Refresh token request object',
                content: {
                    'application/json': {
                        example: {
                            refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTAyMzA0OWIyYWVlOGM3ZjRkMGMzODUiLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5AZW1haWwuY29tIiwicm9sZXMiOlsiYOPtaW4iXSwiaWF0IjoxNjk0NzIxMDcwLCJleHAiOjE2OTQ3MjQ2NzB9.MSrrfqJ0rGD76QL3FMfBXwSs2KvSZAF08GC1m1TdZmY'
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'Access token refreshed successfully',
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
                            examples: {
                                Unauthorized: {
                                    value: {
                                        error: 'Unauthorized'
                                    }
                                },
                                Invalid: {
                                    value: {
                                        error: 'Invalid refresh token.'
                                    }
                                },
                                NotInUserSession: {
                                    value: {
                                        error: 'Refresh token not found in user sessions.'
                                    }
                                }
                            }
                        }
                    }
                },
                '404': {
                    description: 'Not found',
                    content: {
                        'application/json': {
                            example: {
                                error: 'User not found.'
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/auth/user': {
        get: {
            summary: 'Retrieve logged in user details',
            description: 'Retrieve details of the logged in user.',
            security: [{ 'Bearer Token': [] }],
            tags: ['Auth'],
            responses: {
                '200': {
                    description: 'Successful response',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User'
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
        }
    },
    '/api/auth/sessions': {
        get: {
            summary: 'Retrieve list of sessions',
            description: "Retrieve list of logged in user's sessions.",
            security: [{ 'Bearer Token': [] }],
            tags: ['Auth'],
            responses: {
                '200': {
                    description: 'Successful response',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/Session'
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
        }
    },
    '/api/auth/sessions/{id}': {
        delete: {
            summary: 'Delete a session by ID',
            description: 'Delete a user session from the database by ID.',
            security: [{ 'Bearer Token': [] }],
            tags: ['Auth'],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                        format: 'string'
                    },
                    description: 'ID of the session to delete'
                }
            ],
            responses: {
                '204': {
                    description: 'Session deleted successfully'
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
                '404': {
                    description: 'Not found',
                    content: {
                        'application/json': {
                            examples: {
                                Session: {
                                    value: {
                                        error: 'Session not found.'
                                    }
                                },
                                User: {
                                    value: {
                                        error: 'User not found.'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export default AuthRoutes
