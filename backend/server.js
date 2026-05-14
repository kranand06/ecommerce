import http from 'http'
import dotenv from 'dotenv'
import app from './app.js'


dotenv.config()

const port = process.env.PORT
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
