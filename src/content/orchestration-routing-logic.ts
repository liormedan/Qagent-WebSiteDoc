import type { DocPageContent } from "@/lib/docs";

export const orchestrationRoutingLogicContent: DocPageContent = {
  slug: "orchestration/routing-logic",
  title: "Orchestration Routing Logic",
  description: "Deterministic routing rules for selecting the relevant subsystem from user intent.",
  sections: [
    {
      title: "Routing Rules",
      body: [
        "If question -> Audio Query.",
        "If analysis -> Audio Intelligence.",
        "If data needed -> Audio Sandbox.",
        "If comparison requested or required -> Comparison System.",
        "If recommendation requested or beneficial -> Recommendation Engine.",
        "If execution approved -> DAL.",
        "Routing preserves flowId/traceId and forwards version to every downstream agent request.",
      ],
      code: `route(intent)
  question -> audio_query
  analysis -> audio_intelligence
  data_needed -> audio_sandbox
  comparison -> comparison_system
  recommendation -> recommendation_engine
  execution -> dal

routeMeta = { flowId, traceId, version: '1.0' }`,
    },
  ],
};
