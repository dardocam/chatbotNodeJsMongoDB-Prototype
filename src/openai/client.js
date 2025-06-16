// src/lib/openrouter.js
import { OpenAI } from "openai"; // v4.18+

export const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  // headers opcionales para aparecer en el ranking de OpenRouter
  defaultHeaders: {
    "HTTP-Referer": "http://localhost",
    "X-Title": "chatbot",
  },
});
