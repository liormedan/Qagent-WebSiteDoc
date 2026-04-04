import type { DocPageContent } from "@/lib/docs";

export const apiContent: DocPageContent = {
  slug: "api",
  title: "API Contracts",
  description: "Typed request and response boundaries for Q and DAL integration.",
  sections: [
    {
      title: "QInput",
      body: [
        "QInput defines inbound user intent and contextual metadata.",
      ],
      code: `interface QInput {
  sessionId: string;
  userText: string;
  context?: Record<string, string>;
}`,
    },
    {
      title: "QOutput",
      body: [
        "QOutput returns planning results and action contracts.",
      ],
      code: `interface QOutput {
  planId: string;
  summary: string;
  actions: DalContract[];
}`,
    },
    {
      title: "DAL Contract",
      body: [
        "A minimal first contract for deterministic execution.",
      ],
      code: `interface DalContract {
  action: string;
  payload: Record<string, unknown>;
  hash: string;
}`,
    },
  ],
};