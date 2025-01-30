import { Hono } from "hono"
import { logger } from "hono/logger"
import { prettyJSON } from 'hono/pretty-json'
import { bearerAuth } from "hono/bearer-auth"
import { env } from "./env.ts"
import pocApp from "./routes/poc/poc.routes.ts"

export const createServer = () => {
  const server = new Hono().basePath("/api")

  /**
   * Middleware
   */
  // Utils
  server.use(logger())
  server.use(prettyJSON())
  // Bearer Auth
  server.use(
    "/*",
    bearerAuth({
      token: env.SERVICE_KEY,
    })
  )

  /**
   * Routes
   */
  server.get("/", (ctx) => {
    return ctx.text("I am fully operational and all my circuits are functioning perfectly.")
  })
  server.route("/poc", pocApp)

  /**
   * Default handler
   */
  server.notFound((c) => {
    return c.text("I'm sorry, Dave. I'm afraid I can't do that.", 404)
  })

  return server
}
