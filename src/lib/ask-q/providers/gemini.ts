import { GoogleGenerativeAI } from "@google/generative-ai";

/** Gemini 3 series (preview) — override with `GEMINI_MODEL` if needed. */
const DEFAULT_MODEL = "gemini-3-flash-preview";

export type GeminiAskQInput = {
  query: string;
  /** Full retrieval context for the model (glossary, registry, nav, sources list). */
  contextBlock: string;
};

/**
 * Server-only: reads `GEMINI_API_KEY` from the environment. Never import this module from client code.
 */
export async function generateAskQWithGemini({ query, contextBlock }: GeminiAskQInput): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey?.trim()) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const modelName = process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: modelName });

  const system = `You are Ask Q, answering questions about the WaveQ documentation product.
Rules:
- Use ONLY the context provided below. Do not invent features, APIs, or links that are not supported by the context.
- Write clear, natural language in complete sentences.
- If the context is insufficient to answer, say so briefly and suggest opening the linked docs pages listed under Sources.
- Do not mention Gemini, Google, or that you are a language model.
- Do not output raw JSON unless the user explicitly asked for JSON.`;

  const prompt = `${system}\n\n## Retrieved documentation context\n\n${contextBlock}\n\n## User question\n\n${query}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const trimmed = text?.trim();
  if (!trimmed) {
    throw new Error("Empty response from Gemini");
  }
  return trimmed;
}
