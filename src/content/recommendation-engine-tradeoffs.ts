import type { DocPageContent } from "@/lib/docs";

export const recommendationEngineTradeoffsContent: DocPageContent = {
  slug: "recommendation-engine/tradeoffs",
  title: "Recommendation Tradeoffs",
  description: "Critical tradeoff definitions to keep recommendations realistic and user-trustworthy.",
  sections: [
    {
      title: "Core Audio Tradeoffs",
      body: [
        "More clarity can reduce perceived warmth.",
        "More loudness can reduce dynamic range.",
        "More aggressive noise reduction increases artifact risk.",
        "More compression can reduce natural transients.",
        "More de-essing can introduce dullness risk.",
      ],
      code: `tradeoff examples
more clarity -> less warmth
more loudness -> less dynamics
more noise reduction -> higher artifact risk
more compression -> less natural transients
more de-essing -> dullness risk`,
    },
    {
      title: "Recommendation Policy",
      body: [
        "Each recommendation should disclose tradeoffs when impact includes meaningful downside.",
        "High-confidence recommendations still require explicit tradeoff visibility in UI.",
        "Q must not recommend an action without surfacing key tradeoffs when relevant.",
      ],
    },
    {
      title: "Baseline Tradeoff Catalog",
      body: [
        "clarity: improved intelligibility vs reduced warmth.",
        "warmth: richer tone vs reduced articulation precision.",
        "loudness: stronger perceived level vs reduced dynamics.",
        "dynamics: higher punch and contrast vs lower average loudness.",
        "noise cleanup: cleaner background vs artifact risk.",
        "restoration: defect reduction vs possible timbral coloration.",
      ],
    },
  ],
};
