const NoteSchema = {
    Note: {
        properties: {
            _id: {
                type: 'string',
                format: 'string',
                example: '5f8a5d9b4f4d4a1b1c9a7b1c'
            },
            title: {
                type: 'string',
                example: 'My first note'
            },
            content: {
                type: 'string',
                example: 'This is my first note'
            },
            unread: {
                type: 'boolean',
                example: true
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

export default NoteSchema
