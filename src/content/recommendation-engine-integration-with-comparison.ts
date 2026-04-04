import type { DocPageContent } from "@/lib/docs";

export const recommendationEngineIntegrationWithComparisonContent: DocPageContent = {
  slug: "recommendation-engine/integration-with-comparison",
  title: "Integration With Comparison",
  description: "How Q uses A/B comparison evidence to justify and calibrate recommendations.",
  sections: [
    {
      title: "Comparison-Backed Recommendations",
      body: [
        "Q uses comparison summaries and difference markers to justify why a recommendation is proposed.",
        "Recommendation confidence increases when high-impact positive differences are verified.",
        "Risky comparison outcomes can downgrade recommendation confidence or switch action to review/revert.",
        "Recommendation should explicitly explain why version B is better or worse than version A.",
        "Recommendation may suggest accept version, revert, iterate processing, or compare a specific segment.",
      ],
      code: `comparison -> recommendation feedback
measured difference quality
  -> recommendation confidence
  -> suggested action`,
    },
    {
      title: "Concrete Example",
      body: [
        "Comparison shows lower noise, slightly reduced warmth, and improved clarity.",
        "Q recommendation: accept current version if speech intelligibility is priority.",
        "Q recommendation: iterate if natural warmth is priority.",
      ],
    },
  ],
};
