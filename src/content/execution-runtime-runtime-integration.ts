import type { DocPageContent } from "@/lib/docs";

export const executionRuntimeIntegrationContent: DocPageContent = {
  slug: "execution-runtime/runtime-integration",
  title: "Runtime Integration",
  description: "Integration of execution runtime with orchestration, DAL, memory, comparison, recommendation, and UI.",
  sections: [
    {
      title: "Integration Targets",
      body: [
        "Q: receives execution status summaries and continuation readiness.",
        "Orchestration: issues ExecutionRequest and consumes ExecutionResult for flow continuity.",
        "DAL: provides deterministic execution contract payload.",
        "Memory: stores execution events and new output version references.",
        "Comparison: receives output version as candidate for A/B evaluation.",
        "Recommendation: can run after output review for next-step suggestions.",
        "Canvas: shows progress and output-ready UI updates.",
      ],
    },
    {
      title: "Required Integration Flow",
      body: [
        "Q/Orchestration -> Approved Decision -> DAL Generated -> Execution Request -> Runtime Progress -> Output Version -> Memory Update -> Comparison Candidate -> User Review / Continue",
      ],
      code: `Q/Orchestration
  -> Approved Decision
  -> DAL Generated
  -> Execution Request
  -> Runtime Progress
  -> Output Version
  -> Memory Update
  -> Comparison Candidate
  -> User Review / Continue`,
    },
  ],
};

