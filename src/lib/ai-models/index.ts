import type { LanguageModel } from "ai"
import type { ModelProviderEnum, ModelNameEnum } from "./schema.ts"
import type { GoogleModelNameEnum } from "./schema.ts"
import type { OpenAiModelNameEnum } from "./schema.ts"
import type { AnthropicModelNameEnum } from "./schema.ts"
import type { OllamaLocalModelNameEnum } from "./schema.ts"
import { getGoogleGenerativeModel } from "./provider/google.ts"
import { getOpenAiModel } from "./provider/openai.ts"
import { getGoogleAnthropicModel } from "./provider/anthropic.ts"
import { getOllamaModel } from "./provider/ollama.ts"

export function getAiModel(
  provider: "google",
  model: GoogleModelNameEnum
): LanguageModel
export function getAiModel(
  provider: "openAi",
  model: OpenAiModelNameEnum
): LanguageModel
export function getAiModel(
  provider: "anthropic",
  model: AnthropicModelNameEnum
): LanguageModel
export function getAiModel(
  provider: "ollama",
  model: OllamaLocalModelNameEnum
): LanguageModel
export function getAiModel(
  provider: ModelProviderEnum,
  model: ModelNameEnum
): LanguageModel {
  switch (provider) {
    case "google":
      return getGoogleGenerativeModel(model as GoogleModelNameEnum)
    case "openAi":
      return getOpenAiModel(model as OpenAiModelNameEnum)
    case "anthropic":
      return getGoogleAnthropicModel(model as AnthropicModelNameEnum)
    case "ollama":
      return getOllamaModel(model as OllamaLocalModelNameEnum)
    default:
      throw new Error(`Provider ${provider} is not supported`)
  }
}
