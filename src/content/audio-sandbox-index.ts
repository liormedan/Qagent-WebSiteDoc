import type { DocPageContent } from "@/lib/docs";

export const audioSandboxIndexContent: DocPageContent = {
  slug: "audio-sandbox",
  title: "Audio Sandbox",
  description: "Section index for sandbox session, indexing, feature, query, and integration specs.",
  sections: [
    {
      title: "Section Scope",
      body: [
        "This section defines sandbox contracts and state flow used by Q for audio investigation.",
        "It does not define runtime DSP execution.",
        "Highlighted regions are supported as first-class analysis output for timeline and canvas linking.",
        "Audio Sandbox operates as a data and query service inside orchestration.",
        "Sandbox becomes active after session load.",
        "Sandbox supports repeated analysis across one lifecycle.",
      ],
      code: `Read next:
1) /docs/audio-sandbox/overview
2) /docs/audio-sandbox/session-model
3) /docs/audio-sandbox/query-operations
4) /docs/audio-sandbox/integration-with-q

Highlighted region support:
interface SandboxHighlightRegion {
  start: number;
  end: number;
  label: string;
  source: "query_match" | "difference_marker";
}

Orchestration cross-link:
/docs/orchestration/agent-roles

Lifecycle cross-link:
/docs/lifecycle/overview`,
    },
  ],
};
