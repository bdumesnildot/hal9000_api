import { Hono } from "hono"
import { logger } from "hono/logger"
import { prettyJSON } from 'hono/pretty-json'
import { bearerAuth } from "hono/bearer-auth"
import { chatbotApp } from "./modules/llm/llm.app.ts"
import { env } from "./env.ts"

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
    return ctx.text("I'm sorry, Dave. I'm afraid I can't do that.")
  })
  // apps
  server.route("/llm", chatbotApp)

  /**
   * Default handler
   */
  server.notFound((c) => {
    return c.text("404 Not found", 404)
  })

  return server
}
