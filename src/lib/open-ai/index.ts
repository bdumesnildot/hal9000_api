import { createOpenAI } from "@ai-sdk/openai"
import { env } from "../../env.ts"

type ModelName = "gpt-4o-mini" | "gpt-4o"

const openai = createOpenAI({
  compatibility: "strict",
  apiKey: env.OPENAI_API_KEY,
})

export const getChatGptModel = (modelName: ModelName) => {
  return openai(modelName)
}
