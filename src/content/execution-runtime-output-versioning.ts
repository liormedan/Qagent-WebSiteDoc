import type { DocPageContent } from "@/lib/docs";

export const executionRuntimeOutputVersioningContent: DocPageContent = {
  slug: "execution-runtime/output-versioning",
  title: "Output Versioning",
  description: "Canonical bridge from runtime terminal states to immutable version records.",
  sections: [
    {
      title: "Output Publish Preconditions",
      body: [
        "Runtime must be in completed or failed before output publish.",
        "Published output must include runtime_job_id and execution_id lineage links.",
      ],
    },
    {
      title: "Version Persist Flow",
      body: [
        "output_published -> version_record_create -> version_record_persist -> version_state_stored.",
      ],
    },
    {
      title: "Immutability Rules",
      body: [
        "Persisted version_id is immutable.",
        "Version records are append-only and linked to output_id.",
      ],
    },
    {
      title: "Failure Rules",
      body: [
        "Persist failure retries until retry budget exhausted.",
        "If persist fails after budget, output remains published and version_state is not advanced.",
      ],
    },
  ],
};


