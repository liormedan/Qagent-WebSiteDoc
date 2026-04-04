import type { DocPageContent } from "@/lib/docs";

export const audioSandboxStateFlowContent: DocPageContent = {
  slug: "audio-sandbox/state-flow",
  title: "Audio Sandbox State Flow",
  description: "Sandbox state model, allowed transitions, and Q capabilities per state.",
  sections: [
    {
      title: "State Model",
      body: ["States controlling sandbox readiness and query lifecycle."],
      code: `type AudioSandboxState =
  | "empty"
  | "loading"
  | "ready"
  | "indexing"
  | "scanning"
  | "returning_results"
  | "error";`,
    },
    {
      title: "Allowed Transitions",
      body: [
        "empty -> loading -> indexing -> ready",
        "ready -> scanning -> returning_results -> ready",
        "any -> error on failure",
      ],
      code: `type SandboxTransition = {
  from: AudioSandboxState;
  to: AudioSandboxState;
  trigger: "load" | "index" | "query" | "complete" | "fail";
};`,
    },
    {
      title: "Q Capability by State",
      body: [
        "In empty/loading/indexing: Q cannot run query operations.",
        "In ready/scanning: Q can request queries.",
        "In error: Q must return recoverable error context.",
      ],
    },
  ],
};