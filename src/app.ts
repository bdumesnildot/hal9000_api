import { env } from "./env.ts";
import { createServer, } from './server.ts'

const server = createServer()

Deno.serve({port: env.PORT}, server.fetch)
