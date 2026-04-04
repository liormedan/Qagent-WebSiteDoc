import type { DocPageContent } from "@/lib/docs";

export const audioSandboxOverviewContent: DocPageContent = {
  slug: "audio-sandbox/overview",
  title: "Audio Sandbox Overview",
  description:
    "Audio Sandbox is an isolated analysis workspace where audio is loaded, indexed, scanned, and queried before planning or execution decisions.",
  sections: [
    {
      title: "What Audio Sandbox Is",
      body: [
        "Audio Sandbox is an isolated workspace for non-destructive audio inspection and indexing.",
        "Q uses sandbox queries to gather context before refining intent or building plans.",
      ],
      code: `interface AudioSandboxBoundary {
  purpose: "query_and_analysis";
  noExecution: true;
  noDirectDsp: true;
}`,
    },
    {
      title: "Sandbox vs DAL vs Engine",
      body: [
        "Sandbox: analysis/query environment.",
        "DAL: deterministic execution contract layer.",
        "Engine: runtime DSP executor after approved handoff.",
      ],
      code: `Q
  -> Audio Sandbox (query / analysis / indexing)
  -> Planning + DAL
  -> Engine execution`,
    },
    {
      title: "Supported Use Cases",
      body: [
        "Find spoken word.",
        "Locate noisy section.",
        "Inspect long silence regions.",
        "Analyze speech/music context before decision.",
      ],
    },
  ],
};