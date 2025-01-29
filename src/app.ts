import { createServer, } from './server.ts'

const server = createServer()

Deno.serve({port: 8888}, server.fetch)
