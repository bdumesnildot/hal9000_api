import { z } from "zod"

/**
 * providers
 */
export const modelProviderEnumSchema = z.enum(["google", "openAi", "anthropic", "ollama"])
export type ModelProviderEnum = z.infer<typeof modelProviderEnumSchema>

/**
 * models
 */
export const googleModelNameEnumSchema = z.enum([
  "gemini-1.5-flash",
  "gemini-1.5-pro",
])
export type GoogleModelNameEnum = z.infer<typeof googleModelNameEnumSchema>

export const openAiModelNameEnumSchema = z.enum(["gpt-4o-mini", "gpt-4o"])
export type OpenAiModelNameEnum = z.infer<typeof openAiModelNameEnumSchema>

export const anthropicModelNameEnumSchema = z.enum([
  "claude-3-5-sonnet-20241022",
  "claude-3-5-haiku-20241022",
])
export type AnthropicModelNameEnum = z.infer<typeof anthropicModelNameEnumSchema>

export const ollamaLocalModelNameEnumSchema = z.enum([
  "llama3.2:latest",
  "llama2:13b",
  "deepseek-r1:14b",
  "nomic-embed-text:latest",
])
export type OllamaLocalModelNameEnum = z.infer<typeof ollamaLocalModelNameEnumSchema>

export const modelNameEnumSchema = z.union([
  googleModelNameEnumSchema,
  openAiModelNameEnumSchema,
  anthropicModelNameEnumSchema,
  ollamaLocalModelNameEnumSchema,
])
export type ModelNameEnum = z.infer<typeof modelNameEnumSchema>