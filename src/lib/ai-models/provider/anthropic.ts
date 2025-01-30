import { createAnthropic } from "@ai-sdk/anthropic"
import { env } from "../../../env.ts"
import type { AnthropicModelNameEnum } from "../schema.ts";
import type { LanguageModel } from "ai";

const anthropic = createAnthropic({
  apiKey: env.ANTHROPIC_API_KEY,
})

export const getGoogleAnthropicModel = (model: AnthropicModelNameEnum): LanguageModel => {
  return anthropic(model)
}
