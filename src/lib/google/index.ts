import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { env } from "../../env.ts";

type ModelName =
  | "gemini-1.5-flash"
  | "gemini-1.5-pro"

const google = createGoogleGenerativeAI({
  apiKey: env.GOOGLE_API_KEY,
});

export const getGoogleGenerativeModel = (modelName: ModelName) => {
  return google(modelName)
}