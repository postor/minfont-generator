import 'babel-polyfill'
import express from 'express'
import next from 'next'
import cookieParser from 'cookie-parser'

import routes from './routes'
import upload from './tools/upload'
import words from './tools/words'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()
  server.use(cookieParser())
  server.use('/', express.static('static'))
  server.use('/api/upload', upload)
  server.use('/api/words', words)
  server.use(handler)
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})