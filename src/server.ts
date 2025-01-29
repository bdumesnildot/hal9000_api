import { Hono } from "hono"
import { bearerAuth } from "hono/bearer-auth"
import { chatbotApp } from "./modules/llm/llm.app.ts"
import { env } from "./env.ts"

export const createServer = () => {
  const server = new Hono().basePath("/api")

  // Auth
  server.use(
    "/*",
    bearerAuth({
      token: env.SERVICE_KEY,
    })
  )

  // Routes
  server.get("/", (ctx) => {
    return ctx.text("I'm sorry, Dave. I'm afraid I can't do that.")
  })
  server.route("/llm", chatbotApp)

  // 404
  server.notFound((c) => {
    return c.text("404 Not found", 404)
  })

  return server
}
