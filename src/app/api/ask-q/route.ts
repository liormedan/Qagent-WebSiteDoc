import { NextResponse } from "next/server";
import type { AskQSource } from "@/lib/askQRetrieval";
import { detectIntent } from "@/lib/ask-q/intent";
import { releaseGeminiDailySlot, reserveGeminiDailySlot } from "@/lib/ask-q/geminiDailyLimit";
import { assembleAskQFromSnapshot, gatherAskQRetrieval, formatAskQContextForLlm } from "@/lib/askQRetrieval";
import { interpretQuery } from "@/lib/ask-q/interpretQuery";
import { generateAskQWithGemini } from "@/lib/ask-q/providers/gemini";
import { guardGeminiAnswer } from "@/lib/ask-q/geminiOutputGuard";
import { computeAskQConfidence, snapshotMeetsGeminiMatchGate } from "@/lib/ask-q/matchQuality";
import {
  lastUserContentFromHistory,
  resolveFollowUpQuery,
  type AskQHistoryTurn,
} from "@/lib/ask-q/resolveFollowUpQuery";
import { buildGuidedSuggestions, type AskQSuggestion } from "@/lib/ask-q/guidedSuggestions";
import type { AskQResponseMode } from "@/lib/ask-q/responseMode";

export const runtime = "nodejs";

const MAX_QUERY_LEN = 6000;

const EMPTY_SOURCES: AskQSource[] = [];

type AskQSuccessBody = {
  answer: string;
  sources: AskQSource[];
  mode: AskQResponseMode;
  confidence: number;
  suggestions?: AskQSuggestion[];
};

function jsonAskQ(body: AskQSuccessBody, init?: ResponseInit) {
  const payload: Record<string, unknown> = {
    answer: body.answer,
    sources: body.sources,
    mode: body.mode,
    confidence: body.confidence,
  };
  if (body.suggestions?.length) {
    payload.suggestions = body.suggestions;
  }
  return NextResponse.json(payload, init);
}

const GREETING_REPLY =
  "Hi — I'm **Q Doc Agent**, the WaveQ documentation assistant. I explain the system, its structure, and where to read more — not general topics. Try **system runtime**, **contracts**, **authority map**, **layers/modules**, or **end-to-end flow**.";

const LOW_SIGNAL_REPLY =
  "I need a bit more to go on. Ask about a WaveQ docs topic — for example **system runtime**, **contracts**, **authority map**, or **end-to-end flow** — and I’ll answer from the documentation.";

function parseAskQHistory(raw: unknown): AskQHistoryTurn[] {
  if (!Array.isArray(raw)) return [];
  const out: AskQHistoryTurn[] = [];
  for (const item of raw.slice(-4)) {
    if (!item || typeof item !== "object") continue;
    const o = item as Record<string, unknown>;
    if (o.role !== "user" && o.role !== "assistant") continue;
    const content = typeof o.content === "string" ? o.content.trim() : "";
    if (!content) continue;
    out.push({ role: o.role, content: content.slice(0, 500) });
  }
  return out;
}

function formatConversationSummary(history: AskQHistoryTurn[]): string | undefined {
  if (!history.length) return undefined;
  const lines = history.map((h) => {
    const c = h.content.length > 380 ? `${h.content.slice(0, 379)}…` : h.content;
    return `${h.role}: ${c}`;
  });
  return lines.join("\n").slice(0, 900);
}

function dailyLimitAnswerHe(assembledAnswer: string, utcDay: string): string {
  return [
    "הגעת למכסת השאלות היומית של Q Doc Agent עם המודל (Gemini).",
    "השירות עם המודל יתאפס אחרי חצות UTC — נסה שוב מחר (או אחרי המעבר ליום UTC חדש).",
    "להלן עדיין אפשר לקרוא תשובה מבוססת הדוקומנטציה בלבד (בלי מודל).",
    "",
    assembledAnswer,
    "",
    `(מכסה יומית — יום UTC נוכחי: ${utcDay})`,
  ].join("\n");
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const query = typeof body?.query === "string" ? body.query.trim() : "";
    if (!query) {
      return jsonAskQ(
        {
          answer: "Something went wrong: missing query.",
          sources: EMPTY_SOURCES,
          mode: "bad_request",
          confidence: 0,
        },
        { status: 400 },
      );
    }
    if (query.length > MAX_QUERY_LEN) {
      return jsonAskQ(
        {
          answer: "Something went wrong: query is too long.",
          sources: EMPTY_SOURCES,
          mode: "bad_request",
          confidence: 0,
        },
        { status: 400 },
      );
    }

    const intent = detectIntent(query);
    if (intent === "greeting") {
      return jsonAskQ({
        answer: GREETING_REPLY,
        sources: EMPTY_SOURCES,
        mode: "greeting",
        confidence: 1,
      });
    }
    if (intent === "low_signal") {
      return jsonAskQ({
        answer: LOW_SIGNAL_REPLY,
        sources: EMPTY_SOURCES,
        mode: "low_signal",
        confidence: 1,
      });
    }

    const pathname = typeof body?.pathname === "string" ? body.pathname.trim() : undefined;
    const history = parseAskQHistory(body?.history);
    const effectiveQuery = resolveFollowUpQuery(query, history);
    const interpreted = interpretQuery(effectiveQuery);
    const priorUser = lastUserContentFromHistory(history);
    const lexicalContext =
      history.length > 0 &&
      query.trim().length < 90 &&
      effectiveQuery.trim() === query.trim() &&
      priorUser &&
      priorUser !== query.trim()
        ? priorUser.slice(0, 220)
        : undefined;

    const snapshot = gatherAskQRetrieval({
      query: effectiveQuery,
      pathname: pathname || undefined,
      concepts: interpreted.concepts,
      lexicalContext,
    });
    const assembled = assembleAskQFromSnapshot(snapshot);
    const confidence = computeAskQConfidence(snapshot);
    const guidedSuggestions = buildGuidedSuggestions({
      snapshot,
      intent: interpreted.intent,
      concepts: interpreted.concepts,
      pathname: pathname || undefined,
    });
    const suggestions = guidedSuggestions.length ? guidedSuggestions : undefined;

    if (!process.env.GEMINI_API_KEY?.trim()) {
      return jsonAskQ({
        answer: assembled.answer,
        sources: snapshot.sources,
        mode: "retrieval",
        confidence,
        suggestions,
      });
    }

    if (!snapshotMeetsGeminiMatchGate(snapshot)) {
      return jsonAskQ({
        answer: assembled.answer,
        sources: snapshot.sources,
        mode: "match_gate",
        confidence,
        suggestions,
      });
    }

    const slot = await reserveGeminiDailySlot();
    if (!slot.ok) {
      return jsonAskQ({
        answer: dailyLimitAnswerHe(assembled.answer, slot.day),
        sources: snapshot.sources,
        mode: "daily_limit",
        confidence,
        suggestions,
      });
    }

    try {
      const conversationSummary = formatConversationSummary(history);
      const contextBlock = formatAskQContextForLlm(snapshot, {
        pathname: pathname || undefined,
        latestUserMessage: query,
        conversationSummary,
        semanticIntent: interpreted.intent,
        semanticConcepts: interpreted.concepts,
      });
      const rawAnswer = await generateAskQWithGemini({
        contextBlock,
        latestUserMessage: query,
        retrievalTopic: effectiveQuery,
        pathname: pathname || undefined,
        semanticIntent: interpreted.intent,
        semanticConcepts: interpreted.concepts,
        conversationSummary,
      });
      const guarded = guardGeminiAnswer(rawAnswer, snapshot, contextBlock);
      if (!guarded.ok) {
        return jsonAskQ({
          answer: assembled.answer,
          sources: snapshot.sources,
          mode: "output_guard",
          confidence,
          suggestions,
        });
      }
      return jsonAskQ({
        answer: guarded.answer,
        sources: snapshot.sources,
        mode: "gemini",
        confidence,
        suggestions,
      });
    } catch (err) {
      console.error("[api/ask-q] Gemini error:", err);
      await releaseGeminiDailySlot();
      return jsonAskQ({
        answer: assembled.answer,
        sources: snapshot.sources,
        mode: "retrieval_fallback",
        confidence,
        suggestions,
      });
    }
  } catch (e) {
    console.error("[api/ask-q]", e);
    return jsonAskQ(
      {
        answer: "Something went wrong.",
        sources: EMPTY_SOURCES,
        mode: "error",
        confidence: 0,
      },
      { status: 500 },
    );
  }
}
