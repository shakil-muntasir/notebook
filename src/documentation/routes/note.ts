const NoteRoutes = {
    '/api/notes': {
        get: {
            summary: 'Get a list of notes',
            description: 'Retrieve a list of notes from the database.',
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
                }
            }
        }
    }
}

export default NoteRoutes
