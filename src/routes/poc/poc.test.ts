import { assertEquals, assertMatch } from "jsr:@std/assert"
import { createServer } from "../../server.ts"
import {
  type PostCounterInput,
} from "./poc.schema.ts"

const server = createServer()

Deno.test("Get chatbot/hello", async () => {
  const res = await server.request("/api/poc/hello", {
    method: "GET",
  })
  assertEquals(res.status, 200)
})

Deno.test("Post poc/counter", async () => {
  const body: PostCounterInput = {
    messages: [
      {
        role: "system",
        content:
          "Your job is to update a counter by applying the given operations.",
      },
      {
        role: "user",
        content: "let's start from 7",
      },
      {
        role: "assistant",
        content: "The counter is 7",
      },
      {
        role: "user",
        content: "let's add 5",
      },
    ],
  }

  const res = await server.request("/api/poc/counter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const result = await res.json()

  assertEquals(res.status, 200)
  assertMatch(result, /12/)
})
