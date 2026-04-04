import type { DocPageContent } from "@/lib/docs";

export const audioDalContent: DocPageContent = {
  slug: "audio-dal",
  title: "audio.dal",
  description:
    "audio.dal defines a strict action contract between conversational planning and downstream execution.",
  sections: [
    {
      title: "What Is audio.dal",
      body: [
        "audio.dal is a deterministic contract format for action payloads.",
        "It gives the system a predictable interface between language and operation.",
      ],
    },
    {
      title: "Why It Is Required",
      body: [
        "Raw language output is ambiguous and difficult to validate.",
        "audio.dal introduces a rigid schema so execution systems consume structured and verifiable actions.",
      ],
    },
    {
      title: "Traceability And Hash Actions",
      body: [
        "Every action payload can be hashed and tracked over time.",
        "This enables repeatability, audit trails, and deterministic replays.",
      ],
      code: "actionHash = sha256(JSON.stringify(dalContract))",
    },
  ],
};