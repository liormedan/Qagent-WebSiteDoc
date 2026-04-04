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
      code: `type DalPayloadMap = {
  remove_noise: { strength: number; profile?: 'mild' | 'balanced' | 'aggressive' }
  normalize_loudness: { targetLufs: number }
  eq_refine: { preset: string; gainDb?: number }
}

interface DalContract<TAction extends keyof DalPayloadMap = keyof DalPayloadMap> {
  action: string;
  payload: DalPayloadMap[TAction];
  hash: string;
}`,
    },
  ],
};
