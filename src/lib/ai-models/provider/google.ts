import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { env } from "../../../env.ts"
import type { GoogleModelNameEnum } from "../schema.ts"
import type { LanguageModel } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: env.GOOGLE_API_KEY,
})

export const getGoogleGenerativeModel = (model: GoogleModelNameEnum): LanguageModel => {
  return google(model)
}
