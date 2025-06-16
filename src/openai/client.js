// src/lib/openrouter.js
import { OpenAI } from "openai"; // v4.18+

//OPENROUTER_API_KEY=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

export const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey:
    "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", // Open
  // headers opcionales para aparecer en el ranking de OpenRouter
  defaultHeaders: {
    "HTTP-Referer": "http://localhost",
    "X-Title": "chatbot",
  },
});
