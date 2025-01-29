import { createEnv } from '@t3-oss/env-core'
import { z } from "zod";

export const env = createEnv({
  /*
   * Specify what prefix the client-side variables must have.
   * This is enforced both on type-level and at runtime.
   */
  skipValidation: Deno.env.get("SKIP_ENV_VALIDATION") === 'true',
  server: {
      PORT: z.number().default(8888),
      SERVICE_KEY: z.string(),
      OPENAI_API_KEY: z.string(),
      GOOGLE_API_KEY: z.string(),
      ANTHROPIC_API_KEY: z.string(),
  },
  /**
   * What object holds the environment variables at runtime.
   * Often `process.env` or `import.meta.env`
   */
  runtimeEnv: Deno.env.toObject(),
})
