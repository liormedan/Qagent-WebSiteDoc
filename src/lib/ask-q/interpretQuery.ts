/**
 * Lightweight semantic interpretation before retrieval (keywords only; no extra model call).
 */

import { getGlossaryEntryById } from "@/lib/docs-glossary";

export type AskQSemanticIntent = "overview" | "concept" | "flow" | "navigation";

export type AskQInterpretedConcept = "system-runtime" | "contracts" | "authority-map" | "end-to-end";

/** Href prefixes for boosting rows that match interpreted pillars. */
export const INTERPRETED_CONCEPT_HREF_PREFIX: Record<AskQInterpretedConcept, string> = {
  "system-runtime": "/docs/system-runtime",
  contracts: "/docs/contracts",
  "authority-map": "/docs/authority-map",
  "end-to-end": "/docs/end-to-end",
};

const CONCEPT_LEXICAL: Record<AskQInterpretedConcept, string> = {
  "system-runtime": "system runtime execution spine R01 R12 runtime stages",
  contracts: "contracts interfaces traceability contract hub obligations",
  "authority-map": "authority map canonical supplement URL policy documentation authority",
  "end-to-end": "end to end runtime truth cross layer ordering pipeline E2E",
};

/** Canonical glossary rows whose labels/aliases enrich the search surface per pillar concept. */
const CONCEPT_GLOSSARY_ID: Record<AskQInterpretedConcept, string> = {
  "system-runtime": "system-runtime",
  contracts: "contracts-hub",
  "authority-map": "authority-map",
  "end-to-end": "runtime-truth",
};

function lexicalFromConceptGlossaryEntries(concepts: readonly AskQInterpretedConcept[]): string {
  const chunks: string[] = [];
  for (const c of concepts) {
    const id = CONCEPT_GLOSSARY_ID[c];
    const e = getGlossaryEntryById(id);
    if (!e) continue;
    const bits = [e.label, ...(e.aliases ?? []).slice(0, 10)];
    chunks.push(bits.join(" "));
    if (e.tags?.length) chunks.push(e.tags.slice(0, 8).join(" "));
  }
  return chunks.join(" ").replace(/\s+/g, " ").trim().slice(0, 700);
}

export function buildExpandedRetrievalQuery(
  normalizedQuery: string,
  concepts: readonly AskQInterpretedConcept[],
): string {
  const parts = [normalizedQuery];
  const glossaryLex = lexicalFromConceptGlossaryEntries(concepts);
  if (glossaryLex) parts.push(glossaryLex);
  for (const c of concepts) {
    const chunk = CONCEPT_LEXICAL[c];
    if (chunk) parts.push(chunk);
  }
  return parts.join(" ").replace(/\s+/g, " ").trim().slice(0, 1800);
}

function collectConcepts(q: string): AskQInterpretedConcept[] {
  const lower = q.toLowerCase();
  const out = new Set<AskQInterpretedConcept>();

  if (
    /\b(system\s+runtime|execution\s+spine|runtime\s+stages|r0[1-9]|r1[0-2])\b/.test(lower) ||
    /זמן\s*ריצה|ספיין\s*ריצה|ריצת\s*מערכת/.test(q)
  ) {
    out.add("system-runtime");
  }
  if (/\b(contract|contracts|interface|interfaces|traceability|obligation|obligations)\b/.test(lower) || /חוזים|ממשקים/.test(q)) {
    out.add("contracts");
  }
  if (/\b(authority\s+map|canonical|supplement|url\s+policy|documentation\s+authority)\b/.test(lower) || /מפת\s*סמכויות|קנוני/.test(q)) {
    out.add("authority-map");
  }
  if (
    /\b(end[-\s]?to[-\s]?end|e2e|cross[-\s]?layer|runtime\s+truth|ordering\s+across|pipeline\s+ordering)\b/.test(lower) ||
    /קצה\s*לקצה|שכבות/.test(q)
  ) {
    out.add("end-to-end");
  }

  return [...out];
}

function inferIntent(q: string): AskQSemanticIntent {
  const lower = q.toLowerCase().replace(/\s+/g, " ");

  if (
    /\b(where\s+(is|are|can|do|i|should)|which\s+(page|doc|url|section)|how\s+(do|can)\s+i\s+(find|open|navigate|get)|find\s+(the\s+)?(page|doc|section)|link\s+to|locate\s+(the\s+)?(page|doc))\b/.test(
      lower,
    ) ||
    /איפה|איזה\s*עמוד|קישור\s*ל/.test(q)
  ) {
    return "navigation";
  }

  if (
    /\b(flow|pipeline|sequence|ordering|how\s+data\s+moves|data\s+moves|stages|lifecycle|orchestrat)\b/.test(lower) ||
    /זרימה|סדר\s*פעולות|צינור/.test(q)
  ) {
    return "flow";
  }

  if (
    /\b(overview|big\s+picture|high[-\s]?level|architecture(\s+of|\s+overview)?|layers\s+(in|of|for)|what\s+is\s+waveq|explain\s+(the\s+)?(system|waveq|platform)|how\s+does\s+waveq\s+work|system[-\s]?level)\b/.test(
      lower,
    ) ||
    /מבט\s*על|ארכיטקטורה/.test(q)
  ) {
    return "overview";
  }

  return "concept";
}

export function interpretQuery(query: string): { intent: AskQSemanticIntent; concepts: AskQInterpretedConcept[] } {
  const trimmed = query.replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim();
  const concepts = collectConcepts(trimmed);
  const intent = inferIntent(trimmed);
  return { intent, concepts };
}
