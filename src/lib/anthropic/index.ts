import { createAnthropic } from "@ai-sdk/anthropic"
import { env } from "../../env.ts"

type ModelName = "claude-3-5-sonnet-20241022" | "claude-3-5-haiku-20241022"

const anthropic = createAnthropic({
  apiKey: env.ANTHROPIC_API_KEY,
})

export const getGoogleAnthropicModel = (modelName: ModelName) => {
  return anthropic(modelName)
}
