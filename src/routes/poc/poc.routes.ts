import { Hono } from "hono"
import { generateObject, generateText } from "ai"
import {
  postCounterInputSchema,
  postFileInputSchema,
  postFileOutputSchema,
  postPromptInputSchema,
  postRecipeOutputSchema,
} from "./poc.schema.ts"
import { zValidator } from "@hono/zod-validator"
import { getAiModel } from "../../lib/ai-models/index.ts"
import { env } from "../../env.ts"

const app = new Hono()
  .post("/counter", zValidator("json", postCounterInputSchema), async (ctx) => {
    try {
      const { messages } = ctx.req.valid("json")

      const result = await generateText({
        model:
          env.DENO_ENV === "development"
            ? getAiModel("ollama", "llama2:13b")
            : getAiModel("google", "gemini-1.5-flash"),
        messages,
      })

      const allMessages = [
        ...messages,
        {
          role: "assistant",
          text: result.text,
        },
      ]
      console.dir(allMessages, { depth: null })

      return ctx.json(result.text)
    } catch (e) {
      console.error(e)
    }
  })

  .post("/recipe", zValidator("json", postPromptInputSchema), async (ctx) => {
    try {
      const { prompt } = ctx.req.valid("json")

      const { object } = await generateObject({
        model:
          env.DENO_ENV === "development"
            ? getAiModel("ollama", "llama2:13b")
            : getAiModel("google", "gemini-1.5-flash"),
        system:
          `You are helping a user create a recipe. ` +
          `Use British English variants of ingredient names, like Coriander over Cilantro.`,
        schemaName: "Recipe",
        schema: postRecipeOutputSchema,
        prompt,
      })

      return ctx.json(object)
    } catch (e) {
      console.error(e)
    }
  })

  .post(
    "/sentiment",
    zValidator("json", postPromptInputSchema),
    async (ctx) => {
      try {
        const { prompt } = ctx.req.valid("json")

        const { object } = await generateObject({
          model:
            env.DENO_ENV === "development"
              ? getAiModel("ollama", "llama2:13b")
              : getAiModel("google", "gemini-1.5-flash"),
          output: "enum",
          enum: ["positive", "negative", "neutral"],
          system:
            `Classify the sentiment of the text as either ` +
            `positive, negative, or neutral.`,
          prompt,
        })

        return ctx.json(object)
      } catch (e) {
        console.error(e)
        return ctx.json(
          {
            message: "Internal server error",
          },
          500
        )
      }
    }
  )

  .post("/file", zValidator("form", postFileInputSchema), async (ctx) => {
    try {
      const { file } = ctx.req.valid("form")

      console.log({
        file: {
          name: file.name,
          type: file.type,
          size: file.size,
        },
      })

      const { object } = await generateObject({
        model: getAiModel("anthropic", "claude-3-5-sonnet-20241022"),
        schema: postFileOutputSchema,
        system:
          `You will receive an invoice. ` +
          `Please extract the data from the invoice.` +
          `Add all the information you may find relevant.`,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Please make a description of the following pdf file",
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "file",
                data: await file.arrayBuffer(),
                mimeType: file.type,
              },
            ],
          },
        ],
      })

      console.log("object", object)

      return ctx.json(object)
    } catch (e) {
      console.error(e)
    }
  })

export default app
