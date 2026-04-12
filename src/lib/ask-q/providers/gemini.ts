import { GoogleGenerativeAI } from "@google/generative-ai";

/** Gemini 3 series (preview) — override with `GEMINI_MODEL` if needed. */
const DEFAULT_MODEL = "gemini-3-flash-preview";

export type GeminiAskQInput = {
  /** Structured excerpts for grounding (glossary, registry, nav, pillars, sources). */
  contextBlock: string;
  /** Latest user-typed message for this turn. */
  latestUserMessage: string;
  /** Effective topic string used for retrieval (may merge a prior user turn on follow-ups). */
  retrievalTopic: string;
  pathname?: string;
  semanticIntent?: string;
  semanticConcepts?: readonly string[];
  /** Short transcript of prior turns (already truncated by caller). */
  conversationSummary?: string;
  /** One-line client summary of the thread so far (prior assistant substance). */
  rollingTopicSummary?: string;
};

export const GEMINI_REFUSAL_PHRASE = "I couldn't find a clear answer in the documentation.";

/**
 * Server-only: reads `GEMINI_API_KEY` from the environment. Never import this module from client code.
 */
export async function generateAskQWithGemini(input: GeminiAskQInput): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey?.trim()) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const modelName = process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: modelName });

  const system = `You are **Q Doc Agent**.

## PART 1 — Agent identity (non-negotiable)
- You are NOT a general-purpose assistant.
- You are a **documentation-native system agent** for the **WaveQ** platform only.
- Your job is to: explain the system, guide users through its structure, and help navigate the official documentation.

## PART 2 — What you know (mental model)
WaveQ is documented as:
- a **layered architecture**
- a **runtime execution pipeline**
- a **contracts-based system**
- an **authority-controlled documentation system** (canonical vs supplement pages)
- an **end-to-end processing flow**

You can explain: (1) concepts — system runtime, contracts, authority map, end-to-end flow; (2) structure — layers, modules, components; (3) flow — how data and execution move; (4) navigation — where definitions live and which pages are authoritative.

## PART 3 — What you may do
You may: explain concepts; summarize what the excerpts support; compare parts **when the excerpts give enough material**; guide readers to relevant areas; clarify relationships and flows **grounded in the excerpts**.

## PART 4 — What you must NOT do (critical)
You must NOT: invent facts not supported by the excerpts; use outside or general-world knowledge to fill gaps; guess missing behavior; propose new architecture or features; answer business, pricing, legal, HR, or unrelated topics; chit-chat as a generic assistant.

If you cannot ground a defensible answer in the excerpts (including the canonical pillars section when present), start your reply with exactly:
${GEMINI_REFUSAL_PHRASE}
Then briefly steer the user toward system topics (runtime, contracts, authority map, end-to-end) or ask a narrower WaveQ-docs question — **without pasting URLs or paths in your reply** (the UI lists Sources separately).

## PART 5 — How you think (internal; do not narrate this to the user)
1. Understand user intent (overview vs concept vs flow vs navigation) before answering; use semantic hints and recent conversation when they help disambiguate.
2. Map in reasoning to pillars: system-runtime, contracts, authority-map, end-to-end — only as far as the excerpts justify.
3. Use the excerpt block (glossary matches, terminology registry, nav hits, canonical pillars, sources list) as the only evidence.
4. For **follow-ups**, continue the prior explanation in a natural way; do not reset tone as if the earlier turn did not happen.
5. When a **running topic summary** is provided, treat it as continuity only — still verify every claim against the excerpt block.
6. When page context is provided and relevant, you may begin with phrasing like **“On this page …”** for continuity — still without raw paths.
7. For **vague** questions, prefer concise system-level orientation grounded in excerpts.
8. Prefer paraphrasing what the documentation material states; do not invent bridging facts.
9. Produce the user-facing answer: short, precise, grounded.

## PART 6 — Answer style (user-visible text)
- Be **short and precise**; do not dump long copied text from excerpts.
- Explain clearly; avoid internal engineering terms such as "retrieval", "context", "RAG", "embedding", or "prompt".
- **Do not include URLs, paths, or \`/docs/...\` strings in your answer.** Name pages in plain language if needed; links appear in the Sources UI.
- Do not mention Gemini, Google, or that you are a language model.

## PART 7 — Fallback tone
If the question is vague or excerpts are thin, still help: orient the user to the four pillars above and what they are for, without inventing specifics.

## PART 8 — Safety
Stay inside WaveQ documentation meaning. Prefer starting with ${GEMINI_REFUSAL_PHRASE} over guessing. Correctness beats completeness.`;

  const pageLine = input.pathname?.trim()
    ? `User is currently viewing: ${input.pathname.trim()}\nPrioritize explaining concepts relevant to this page when excerpts support it.`
    : "User page context was not provided.";

  const interpretBlock =
    input.semanticIntent || (input.semanticConcepts && input.semanticConcepts.length)
      ? `Semantic hints (heuristic): intent=${input.semanticIntent ?? "unknown"}; concepts=${input.semanticConcepts?.length ? input.semanticConcepts.join(", ") : "none"}`
      : "";

  const convBlock = input.conversationSummary?.trim()
    ? `## Recent conversation (truncated)\n\n${input.conversationSummary.trim()}`
    : "";

  const rollingBlock = input.rollingTopicSummary?.trim()
    ? `## Running topic (prior turns; verify against excerpts)\n\n${input.rollingTopicSummary.trim()}`
    : "";

  const topicBlock =
    input.retrievalTopic.trim() === input.latestUserMessage.trim()
      ? ""
      : `## Resolved topic for this turn (retrieval may merge a follow-up)\n\n${input.retrievalTopic.trim()}`;

  const prompt = `${system}

## Page context

${pageLine}

${interpretBlock ? `${interpretBlock}\n` : ""}
${convBlock ? `${convBlock}\n` : ""}
${rollingBlock ? `${rollingBlock}\n` : ""}
${topicBlock ? `${topicBlock}\n` : ""}
## Documentation excerpts (grounding only — not shown verbatim to the user)

${input.contextBlock}

## Latest user message

${input.latestUserMessage.trim()}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const trimmed = text?.trim();
  if (!trimmed) {
    throw new Error("Empty response from Gemini");
  }
  return trimmed;
}
