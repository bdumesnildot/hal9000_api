import { createOpenAI } from "@ai-sdk/openai"
import { env } from "../../../env.ts"
import type { OpenAiModelNameEnum } from "../schema.ts"
import type { LanguageModel } from "ai"

const openai = createOpenAI({
  compatibility: "strict",
  apiKey: env.OPENAI_API_KEY,
})

export const getOpenAiModel = (model: OpenAiModelNameEnum): LanguageModel => {
  return openai(model)
}
