import type { DocPageContent } from "@/lib/docs";

export const architectureContent: DocPageContent = {
  slug: "architecture",
  title: "Architecture",
  description: "A high-level map of the Q ecosystem and its information flow.",
  sections: [
    {
      title: "Core Components",
      body: [
        "Chat: user interaction surface.",
        "Q: planning and orchestration engine.",
        "audio.dal: strict execution contract.",
        "D Agent: deterministic execution runtime.",
        "Canvas: visual operational surface.",
        "Export Flow: serialization and delivery pipeline.",
      ],
    },
    {
      title: "Data Flow",
      body: [
        "The data path moves from user intent to execution-ready contracts and then to rendered outputs.",
      ],
      code: "Chat -> Q -> audio.dal -> D Agent -> Canvas -> Export",
    },
  ],
};