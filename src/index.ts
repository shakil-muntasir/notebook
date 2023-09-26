import 'dotenv/config'
import express from 'express'
import useragent from 'express-useragent'

import routes from '@/routes'
import server from '@/server'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(useragent.express())
app.set('trust proxy', true)

app.use('/api', routes)

server.start(app)
