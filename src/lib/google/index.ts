import { createGoogleGenerativeAI } from '@ai-sdk/google';

type ModelName =
  | "gemini-1.5-flash"
  | "gemini-1.5-pro"

const google = createGoogleGenerativeAI({
  apiKey: Deno.env.get("GOOGLE_API_KEY"),
});

export const getGoogleGenerativeModel = (modelName: ModelName) => {
  return google(modelName)
}