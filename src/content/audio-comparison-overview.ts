import type { DocPageContent } from "@/lib/docs";

export const audioComparisonOverviewContent: DocPageContent = {
  slug: "audio-comparison/overview",
  title: "Audio Comparison Overview",
  description: "Why A/B comparison is a core trust and decision mechanism for audio processing workflows.",
  sections: [
    {
      title: "Why A/B Comparison Is Critical",
      body: [
        "A/B comparison makes processing outcomes observable instead of assumed.",
        "It allows users to evaluate whether a change is useful before accepting a version.",
        "Comparison reduces guesswork and lowers the chance of irreversible wrong decisions.",
      ],
    },
    {
      title: "Relation To Decision System",
      body: [
        "Comparison evidence becomes structured input for decision logic.",
        "Q can prefer actions with high-impact positive differences and flag risky regressions.",
        "Decision outcomes remain user-controlled, but become better informed by measured deltas.",
      ],
      code: `Decision input stack
- intent + constraints
- version lineage
- A/B differences
- user preference` ,
    },
    {
      title: "Relation To User Trust",
      body: [
        "Trust increases when users can hear and see exactly what changed.",
        "Transparent differences, clear impact labels, and reversible versioning create confidence.",
        "The system should explain recommendations based on comparison artifacts, not hidden heuristics.",
      ],
    },
  ],
};
