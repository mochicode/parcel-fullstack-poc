import fastify from 'fastify'
import path from 'path'
import * as fs from 'fs/promises'
import { PingResponse, PingUrl } from '~/src/shared'

let server = fastify()

let frontendDir = path.join(process.cwd(), 'dist', 'frontend')
server.get('/frontend*', async (req, reply) => {
  let normalizePath = path.normalize(`/${req.url.slice('/frontend'.length)}`)
  let filePath = path.normalize(path.join(frontendDir, normalizePath))
  
  let file = await fs
    .readFile(filePath, { encoding: 'utf8' })
    .catch(() => null)

  if (file !== null) {
    return reply
      .status(200)
      .header('Content-Type', 'text/html')
      .send(file)
  }

  let index = await fs.readFile(path.join(frontendDir, 'index.html'), { encoding: 'utf8' })
  reply
    .status(200)
    .header('Content-Type', 'text/html')
    .send(index)
})

server.get(PingUrl, (): PingResponse => {
  return { value: 'pong' }
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})