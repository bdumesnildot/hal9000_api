import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({

  skipValidation: Deno.env.get("SKIP_ENV_VALIDATION") === "true",
  server: {
    RUNTIME_ENV: z.enum(["development", "production"]).default("development"),
    PORT: z.number().default(8888),
    SERVICE_KEY: z.string(),
    OPENAI_API_KEY: z.string(),
    GOOGLE_API_KEY: z.string(),
    ANTHROPIC_API_KEY: z.string(),
    OLLAMA_BASE_URL: z.string().url(),
  },
  runtimeEnv: Deno.env.toObject(),
})
