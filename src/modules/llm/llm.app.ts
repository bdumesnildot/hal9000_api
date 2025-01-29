import { Hono } from "hono"
import { streamText as honoStreamText } from "hono/streaming"
import { generateObject, generateText, streamText } from "ai"
import { getOllamaModel } from "../../lib/ollama/index.ts"
import {
  postCounterInputSchema,
  postFileInputSchema,
  postFileOutputSchema,
  postPromptInputSchema,
  postRecipeOutputSchema,
} from "./llm.schema.ts"
import { zValidator } from "@hono/zod-validator"
import { getGoogleGenerativeModel } from "../../lib/google/index.ts"

export const chatbotApp = new Hono()
  .get("/hello", (ctx) => {
    return ctx.text("Hello, chatbot!")
  })

  .get("/joke", (ctx) => {
    const { textStream } = streamText({
      model: getOllamaModel("llama2:13b"),
      prompt: "Tell me a web dev joke",
    })

    return honoStreamText(ctx, async (stream) => {
      for await (const text of textStream) {
        await stream.write(text)
      }
    })
  })

  .post("/counter", zValidator("json", postCounterInputSchema), async (ctx) => {
    const { messages } = ctx.req.valid("json")

    const result = await generateText({
      model: getOllamaModel("llama2:13b"),
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
  })

  .post("/recipe", zValidator("json", postPromptInputSchema), async (ctx) => {
    try {
      const { prompt } = ctx.req.valid("json")

      const { object } = await generateObject({
        model: getOllamaModel("llama3.2:latest"),
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
      return ctx.json(
        {
          message: "Internal server error",
        },
        500
      )
    }
  })

  .post(
    "/sentiment",
    zValidator("json", postPromptInputSchema),
    async (ctx) => {
      try {
        const { prompt } = ctx.req.valid("json")

        const { object } = await generateObject({
          model: getOllamaModel("llama2:13b"),
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
        model: getGoogleGenerativeModel("gemini-1.5-flash"),
        schema: postFileOutputSchema,
        system: `You will receive an invoice. ` +
              `Please extract the data from the invoice.` +
              `Add all the information you may find relevant.`,
        messages: [
          {
            role: "user",
            content: [{
              type: "text",
              text: "Please make a description of the following pdf file"
            }]
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

      console.log('object', object)

      return ctx.json(object)
    } catch (e) {
      console.error(e)
      return ctx.json(
        {
          message: "Internal server error",
          error: e
        },
        500
      )
    }
  })
