import 'dotenv/config'
import express from 'express'

import routes from '@/routes'
import server from '@/server'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', routes)

server.start(app)
