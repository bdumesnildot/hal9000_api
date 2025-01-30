import "jsr:@std/dotenv"
import { load } from "jsr:@std/dotenv"
import { z } from "zod"

const envSchema = z.object({
  RUNTIME_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.number().default(8888),
  SERVICE_KEY: z.string(),
  OPENAI_API_KEY: z.string(),
  GOOGLE_API_KEY: z.string(),
  ANTHROPIC_API_KEY: z.string(),
  OLLAMA_BASE_URL: z.string().url(),
})

const loadedEnv = await load({
  envPath: "./.env",
  export: true,
})

const parsedEnv = envSchema.safeParse(
  Deno.env.get("RUNTIME_ENV") === "production"
    ? {
        RUNTIME_ENV: Deno.env.get("RUNTIME_ENV"),
        PORT: Deno.env.get("PORT"),
        SERVICE_KEY: Deno.env.get("SERVICE_KEY"),
        OPENAI_API_KEY: Deno.env.get("OPENAI_API_KEY"),
        GOOGLE_API_KEY: Deno.env.get("GOOGLE_API_KEY"),
        ANTHROPIC_API_KEY: Deno.env.get("ANTHROPIC_API_KEY"),
        OLLAMA_BASE_URL: Deno.env.get("OLLAMA_BASE_URL"),
      }
    : loadedEnv
)

if (!parsedEnv.success) {
  throw new Error(
    `I'm sorry, Dave. I couldn't parse environment variables: ${parsedEnv.error.message}`
  )
}

export const env = parsedEnv.data
