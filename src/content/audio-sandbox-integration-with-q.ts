import type { DocPageContent } from "@/lib/docs";

export const audioSandboxIntegrationWithQContent: DocPageContent = {
  slug: "audio-sandbox/integration-with-q",
  title: "Integration with Q",
  description: "How Q routes requests to sandbox and uses results to refine intent and planning context.",
  sections: [
    {
      title: "Integration Flows",
      body: [
        "User asks audio question -> Q routes to sandbox query flow.",
        "User asks processing request -> Q may query sandbox first to enrich context before planning.",
        "Sandbox results can refine intent confidence and target regions.",
      ],
      code: `if (requestKind === "audio_question") {
  route = "sandbox_query_flow";
}

if (requestKind === "audio_processing") {
  route = "enrich_with_sandbox_before_plan";
}`,
    },
    {
      title: "Decision Rules",
      body: [
        "Pure query requests do not generate DAL.",
        "Processing requests can generate DAL only after planning + safety checks.",
      ],
    },
  ],
};