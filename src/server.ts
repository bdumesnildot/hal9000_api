import { Hono } from "hono"
import { chatbotApp } from "./modules/llm/llm.app.ts";

export const createServer = () => {
  const server = new Hono().basePath("/api")

  // 404
  server.notFound((c) => {
    return c.text("404 Not found", 404)
  })

  // 500
  server.onError((err, c) => {
    console.error(`${err}`)
    return c.text("Internal server error", 500)
  })

  // Routes
  server.get("/", (ctx) => {
    return ctx.text("I'm sorry, Dave. I'm afraid I can't do that.")
  })
  server.route("/llm", chatbotApp)

  return server
}
