import type { DocPageContent } from "@/lib/docs";

export const lifecycleVersionLifecycleContent: DocPageContent = {
  slug: "lifecycle/version-lifecycle",
  title: "Version Lifecycle",
  description: "Lifecycle of original, processed, accepted, reverted, and rejected versions within one session.",
  sections: [
    {
      title: "Version States In Session",
      body: [
        "original version",
        "processed candidate versions",
        "accepted version",
        "reverted version",
        "rejected candidate",
        "comparison-ready version",
      ],
    },
    {
      title: "Version Rules",
      body: [
        "Original is immutable.",
        "Processed versions are derived.",
        "Accepted version becomes new active baseline.",
        "Rejected versions stay in history unless explicitly discarded.",
      ],
    },
  ],
};

