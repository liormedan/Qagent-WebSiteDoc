import type { DocPageContent } from "@/lib/docs";

export const decisionRulesContent: DocPageContent = {
  slug: "decision-rules",
  title: "Decision Rules",
  description: "Deterministic routing rules for query vs processing flows.",
  sections: [
    {
      title: "Routing Rules",
      body: [
        "If user asks about audio content/state -> route to sandbox query flow.",
        "For pure query requests -> do not generate DAL.",
        "For processing requests -> sandbox may enrich context before planning.",
      ],
      code: `if (request.kind === "audio_query") {
  route = "sandbox";
  generateDal = false;
}

if (request.kind === "audio_processing") {
  route = "reasoning_then_planning";
  sandboxEnrichment = true;
}`,
    },
  ],
};