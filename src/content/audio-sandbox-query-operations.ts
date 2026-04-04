import type { DocPageContent } from "@/lib/docs";

export const audioSandboxQueryOperationsContent: DocPageContent = {
  slug: "audio-sandbox/query-operations",
  title: "Query Operations",
  description: "Query interfaces that Q can issue to sandbox for text, acoustic, semantic, and structural scans.",
  sections: [
    {
      title: "Query Categories",
      body: [
        "text query: transcript lookup and phrase matching.",
        "acoustic query: noise/silence/loudness pattern scans.",
        "semantic query: high-level content intent clues.",
        "structural query: region boundaries and segment patterns.",
      ],
    },
    {
      title: "Contracts",
      body: ["Deterministic query request and match response payloads."],
      code: `interface AudioSandboxQuery {
  type: "text" | "acoustic" | "semantic" | "structural";
  query: string;
  targetRegion?: { startSec: number; endSec: number };
  constraints?: Record<string, unknown>;
}

interface AudioQueryMatch {
  id: string;
  startSec: number;
  endSec: number;
  confidence: number;
  reason?: string;
}`,
    },
  ],
};