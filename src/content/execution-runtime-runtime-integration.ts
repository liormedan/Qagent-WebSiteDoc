import type { DocPageContent } from "@/lib/docs";

export const executionRuntimeIntegrationContent: DocPageContent = {
  slug: "execution-runtime/runtime-integration",
  title: "Runtime Integration",
  description: "Runtime integration boundaries with DAgent, Output, and Versioning.",
  sections: [
    {
      title: "Inbound Integration",
      body: [
        "DAgent is the single inbound producer for runtime start payloads.",
        "Runtime start payload is validated before queued materialization.",
      ],
    },
    {
      title: "Runtime Internal Integration",
      body: [
        "State engine commits transitions.",
        "Progress publisher emits state and progress signals.",
      ],
    },
    {
      title: "Outbound Integration",
      body: [
        "Runtime publishes output package to Output boundary.",
        "Output boundary forwards immutable payload to Versioning.",
      ],
    },
    {
      title: "Contract Integrity",
      body: [
        "All boundary transitions enforce contract version v1.0.",
        "Schema violations are rejected before state commit.",
      ],
    },
  ],
};


