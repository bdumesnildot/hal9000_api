import { createOllama } from "ollama-ai-provider"
import { env } from "../../../env.ts"
import type { OllamaLocalModelNameEnum } from "../schema.ts";
import type { LanguageModel } from "ai";

const ollama = createOllama({
  baseURL: env.OLLAMA_BASE_URL,
})

export const getOllamaModel = (model: OllamaLocalModelNameEnum): LanguageModel => {
  return ollama(model)
}
