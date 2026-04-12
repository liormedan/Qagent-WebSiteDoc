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

Hard rules (must follow):
- Answer using ONLY the "Retrieved documentation context" section below. Treat it as the sole source of truth.
- Do not invent features, APIs, file paths, links, or behavior that are not clearly supported by that context.
- If the context does not contain enough information to answer the user’s question, reply starting with exactly: "I couldn't find a clear answer in the provided documentation." Then briefly suggest which listed Sources pages might help, or ask for a more specific docs-related question.
- If the user asks about something not covered in the context, say you could not find a clear answer in the provided documentation; do not guess.
- Write clear, natural language in complete sentences.
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
