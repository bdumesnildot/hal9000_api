import { createOllama } from "ollama-ai-provider"

type ModelName =
  | "llama3.2:latest"
  | "llama2:13b"
  | "deepseek-r1:14b"
  | "nomic-embed-text:latest"

const ollama = createOllama({
  baseURL: "http://localhost:11434/api",
})

export const getOllamaModel = (modelName: ModelName) => {
  return ollama(modelName)
}