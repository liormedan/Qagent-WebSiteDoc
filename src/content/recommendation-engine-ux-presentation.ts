import type { DocPageContent } from "@/lib/docs";

export const recommendationEngineUxPresentationContent: DocPageContent = {
  slug: "recommendation-engine/ux-presentation",
  title: "Recommendation UX Presentation",
  description: "User-facing contract for displaying recommendation content clearly and decisively.",
  sections: [
    {
      title: "What The User Sees",
      body: [
        "Recommendation card: concise action title and reason.",
        "Explanation: why this recommendation is proposed now.",
        "Confidence: numeric score with plain-language label.",
        "Expected result: projected benefit and likely side effects.",
        "Tradeoff warning: key downside alerts for relevant actions.",
        "Action controls: confirm / reject / refine and compare.",
      ],
      code: `interface RecommendationCardViewModel {
  title: string
  summary: string
  confidence: number
  expectedImpact: string[]
  tradeoffs?: string[]
  actions: Array<'accept' | 'reject' | 'refine' | 'compare'>
}`,
    },
    {
      title: "UX Rules",
      body: [
        "Recommendation must be concise.",
        "Explanation must be understandable.",
        "Confidence must not be hidden.",
        "Tradeoffs must be visible when relevant.",
        "The user must always retain final choice.",
      ],
    },
  ],
};
