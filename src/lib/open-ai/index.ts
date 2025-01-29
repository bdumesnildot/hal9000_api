import { createOpenAI } from "@ai-sdk/openai"

type ModelName = "gpt-4o-mini" | "gpt-4o"

const openai = createOpenAI({
  compatibility: "strict",
  apiKey: Deno.env.get("OPENAI_API_KEY"),
})

export const getChatGptModel = (modelName: ModelName) => {
  return openai(modelName)
}
