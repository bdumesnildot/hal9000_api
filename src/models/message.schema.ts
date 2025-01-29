import { z } from "zod"

export const coreMessageSchema = z.object({
  role: z.enum(["system", "user", "data", "assistant"]),
  content: z.string(),
})

export const coreMessageListSchema = coreMessageSchema.array()
