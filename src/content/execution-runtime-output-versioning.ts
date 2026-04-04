import type { DocPageContent } from "@/lib/docs";

export const executionRuntimeOutputVersioningContent: DocPageContent = {
  slug: "execution-runtime/output-versioning",
  title: "Output Versioning",
  description: "Rules for runtime output version creation and integration into version graph.",
  sections: [
    {
      title: "RuntimeOutputVersion Contract",
      body: [
        "Runtime outputs are represented as explicit versions linked to execution requests.",
      ],
      code: `interface RuntimeOutputVersion {
  id: string
  createdFrom: string
  createdAt: number
  executionRequestId: string
  description?: string
  status: 'draft' | 'ready' | 'failed'
}`,
    },
    {
      title: "Versioning Rules",
      body: [
        "Every successful execution creates a new version.",
        "ExecutionResult connects output to version graph via executionRequestId and createdFrom.",
        "New output version becomes comparison candidate by default.",
        "Failed execution must not silently overwrite current active version.",
      ],
    },
  ],
};

