import { NextResponse } from "next/server";
import type { AskQSource } from "@/lib/askQRetrieval";
import { detectIntent } from "@/lib/ask-q/intent";
import { releaseGeminiDailySlot, reserveGeminiDailySlot } from "@/lib/ask-q/geminiDailyLimit";
import { assembleAskQFromSnapshot, gatherAskQRetrieval, formatAskQContextForLlm } from "@/lib/askQRetrieval";
import { generateAskQWithGemini } from "@/lib/ask-q/providers/gemini";

export const runtime = "nodejs";

const MAX_QUERY_LEN = 6000;

const GREETING_REPLY =
  "Hi — I'm Ask Q for WaveQ docs. Ask about **system runtime**, **contracts**, **authority map**, **client layer**, or **end-to-end flow**, and I'll answer from the documentation.";

const LOW_SIGNAL_REPLY =
  "Could you add a bit more detail? Try a concrete topic, for example: **system runtime**, **contracts**, **authority map**, or **end-to-end flow**.";

function dailyLimitAnswerHe(assembledAnswer: string, utcDay: string): string {
  return [
    "הגעת למכסת השאלות היומית של Ask Q עם המודל (Gemini).",
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
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }
    if (query.length > MAX_QUERY_LEN) {
      return NextResponse.json({ error: "Query too long" }, { status: 400 });
    }

    const intent = detectIntent(query);
    if (intent === "greeting") {
      return NextResponse.json({
        answer: GREETING_REPLY,
        sources: [] satisfies AskQSource[],
        mode: "greeting" as const,
      });
    }
    if (intent === "low_signal") {
      return NextResponse.json({
        answer: LOW_SIGNAL_REPLY,
        sources: [] satisfies AskQSource[],
        mode: "low_signal" as const,
      });
    }

    const snapshot = gatherAskQRetrieval(query);
    const assembled = assembleAskQFromSnapshot(snapshot);

    if (!process.env.GEMINI_API_KEY?.trim()) {
      return NextResponse.json({
        answer: assembled.answer,
        sources: snapshot.sources,
        mode: "retrieval" as const,
      });
    }

    const hasRetrievalContext =
      snapshot.glossaryHits.length > 0 ||
      snapshot.registryHits.length > 0 ||
      snapshot.sourceDocs.length > 0;

    if (!hasRetrievalContext) {
      return NextResponse.json({
        answer: assembled.answer,
        sources: snapshot.sources,
        mode: "retrieval" as const,
      });
    }

    const slot = await reserveGeminiDailySlot();
    if (!slot.ok) {
      return NextResponse.json({
        answer: dailyLimitAnswerHe(assembled.answer, slot.day),
        sources: snapshot.sources,
        mode: "daily_limit" as const,
      });
    }

    try {
      const contextBlock = formatAskQContextForLlm(snapshot);
      const answer = await generateAskQWithGemini({ query, contextBlock });
      return NextResponse.json({
        answer,
        sources: snapshot.sources,
        mode: "gemini" as const,
      });
    } catch (err) {
      console.error("[api/ask-q] Gemini error:", err);
      await releaseGeminiDailySlot();
      return NextResponse.json({
        answer: assembled.answer,
        sources: snapshot.sources,
        mode: "retrieval_fallback" as const,
      });
    }
  } catch (e) {
    console.error("[api/ask-q]", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
