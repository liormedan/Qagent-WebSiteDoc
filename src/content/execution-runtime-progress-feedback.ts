import type { DocPageContent } from "@/lib/docs";

export const executionRuntimeProgressFeedbackContent: DocPageContent = {
  slug: "execution-runtime/progress-feedback",
  title: "Progress And Feedback",
  description: "Runtime progress, status, and feedback surface definitions for user and system.",
  sections: [
    {
      title: "Feedback Model",
      body: [
        "Progress updates communicate current stage and normalized completion percentage.",
        "Final feedback communicates completed/failed/cancelled outcome with warnings or errors.",
      ],
      code: `progress model
- stage
- progress
- optional message

final feedback
- status
- outputVersionId
- warnings or error`,
    },
    {
      title: "Display Surfaces",
      body: [
        "chat: human-readable status updates and final execution summary.",
        "canvas: execution badge/state indicator and output-ready notification.",
        "background/internal only: low-level retries, internal transition timestamps, trace metadata.",
      ],
    },
    {
      title: "Examples",
      body: [
        "Applying noise reduction...",
        "Generating processed version...",
        "Execution completed — version B created",
      ],
    },
    {
      title: "Warnings Vs Errors",
      body: [
        "Warnings indicate non-blocking quality concerns while output exists.",
        "Errors indicate blocking failure where continuation requires retry/regeneration/manual choice.",
      ],
    },
  ],
};

