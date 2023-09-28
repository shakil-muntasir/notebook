const SessionSchema = {
    Session: {
        type: 'object',
        properties: {
            _id: {
                type: 'string',
                format: 'string',
                example: '5f8a5d9b4f4d4a1b1c9a7b1c'
            },
            browserName: {
                type: 'string',
                example: 'Chrome'
            },
            ipAddress: {
                type: 'string',
                example: '127.0.0.1'
            },
            osName: {
                type: 'string',
                example: 'Windows 11'
            },
            refreshToken: {
                type: 'string',
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTAzNzNkMWM3ZmRmZjhkNjY0M2Y2NGIiLCJpYXQiOjE2OTU3NTUwNjYsImV4cCI6MTY5NTg0MTQ2Nn0.KwXqkfpThoMllCgknnRwnExClQx6BVN8s0xrEf9EUpw'
            },
            lastAccess: {
                type: 'string',
                format: 'date-time',
                example: '2023-09-14T19:01:54.926Z'
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
            }
        }
    }
}

export default SessionSchema
