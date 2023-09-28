const NoteRoutes = {
    '/api/notes': {
        get: {
            summary: 'Get a list of notes',
            description: 'Retrieve a list of notes from the database.',
            security: [{ 'Bearer Token': [] }],
            tags: ['Note'],
            responses: {
                '200': {
                    description: 'Successful response',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/Note'
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
            summary: 'Create a new note',
            description: 'Create a new note.',
            security: [{ 'Bearer Token': [] }],
            tags: ['Note'],
            requestBody: {
                description: 'User request object',
                content: {
                    'application/json': {
                        example: {
                            title: 'My first note',
                            content: 'This is my first note'
                        }
                    }
                }
            },
            responses: {
                '201': {
                    description: 'Note created successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Note'
                            }
                        }
                    }
                },
                '400': {
                    description: 'Bad request',
                    content: {
                        'application/json': {
                            examples: {
                                Title: {
                                    value: {
                                        error: 'title is required.'
                                    }
                                },
                                Content: {
                                    value: {
                                        error: 'content is required.'
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
                }
            }
        }
    },
    '/api/notes/{id}': {
        get: {
            summary: 'Get a note by ID',
            description: 'Retrieve a note from the database by ID.',
            security: [{ 'Bearer Token': [] }],
            tags: ['Note'],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                        format: 'string'
                    },
                    description: 'ID of the note to retrieve'
                }
            ],
            responses: {
                '200': {
                    description: 'Note found',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Note'
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
                '404': {
                    description: 'Not found',
                    content: {
                        'application/json': {
                            example: {
                                error: 'Note not found.'
                            }
                        }
                    }
                }
            }
        },
        patch: {
            summary: 'Update a note by ID',
            description: 'Update a note in the database by ID.',
            security: [{ 'Bearer Token': [] }],
            tags: ['Note'],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                        format: 'string'
                    },
                    description: 'ID of the note to update'
                }
            ],
            requestBody: {
                description: 'Updated note data',
                content: {
                    'application/json': {
                        example: {
                            title: 'My first note updated',
                            content: 'This is my first note updated',
                            unread: true
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'Note updated successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Note'
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
                '404': {
                    description: 'Not found',
                    content: {
                        'application/json': {
                            example: {
                                error: 'Note not found.'
                            }
                        }
                    }
                }
            }
        },
        delete: {
            summary: 'Delete a note by ID',
            description: 'Delete a note from the database by ID.',
            security: [{ 'Bearer Token': [] }],
            tags: ['Note'],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                        format: 'string'
                    },
                    description: 'ID of the note to delete'
                }
            ],
            responses: {
                '204': {
                    description: 'Note deleted successfully'
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
                            example: {
                                error: 'Note not found.'
                            }
                        }
                    }
                }
            }
        }
    }
}

export default NoteRoutes
