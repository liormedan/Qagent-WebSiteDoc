import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";

const failureDetails = [
  {
    title: "Error Taxonomy",
    subtitle: "Failure class definitions",
    purpose: "Define canonical failure classes used by the QAgent failure model.",
    defines: ["validation_error", "capability_error", "runtime_error", "execution_error", "storage_error", "approval_error", "recovery_error"],
    doesNotDefine: "Module-specific implementation error payloads.",
  },
  {
    title: "Retry Budget",
    subtitle: "Retry envelope by class",
    purpose: "Define retry limits and escalation entry points for each failure class.",
    defines: ["No-retry boundaries for validation/approval classes.", "Limited retries with backoff for runtime/storage classes.", "Safe retry then fallback boundaries for execution classes."],
    doesNotDefine: "Dynamic policy override logic at runtime.",
  },
  {
    title: "Escalation and Abort",
    subtitle: "Escalation path and stop conditions",
    purpose: "Define escalation flow and deterministic abort conditions.",
    defines: ["Module-local handling to QCore policy escalation.", "Immediate abort on integrity-risk failures.", "Safe stop/fallback boundary options."],
    doesNotDefine: "Client UX behavior beyond escalation signals.",
  },
  {
    title: "Fallback and Partial Success",
    subtitle: "Degraded-mode behavior",
    purpose: "Define fallback matrix and partial-success publication constraints.",
    defines: ["Fallback mappings by subsystem failure.", "degraded_status usage for partial outputs.", "Versioning guardrails for partial persistence."],
    doesNotDefine: "Billing/reporting policy tied to degraded outputs.",
  },
] as const;

export default function FailurePolicyPage() {
  return (
    <DocsTemplatePage
      title="Unified Failure Policy"
      description="System-wide failure taxonomy, retry rules, escalation path, and fallback strategy for deterministic resilience."
      sectionPath={["QAgent", "Policies", "Failure Policy"]}
      covers="error classes, retry budgets, escalation paths, abort conditions, and fallback behavior."
      doesNotCover="module-level implementation internals and client UX copy strategy."
      overviewIntro="Failure Policy defines how QAgent classifies failures and responds in a deterministic, boundary-safe way."
      overviewAreasTitle="Failure concerns"
      overviewAreas={[
        "Failure classification taxonomy.",
        "Retry and escalation control.",
        "Abort and fallback governance.",
      ]}
      outOfScope="Module implementation details and external system retry logic outside QAgent policy ownership."
      relatedBoundaries={[
        "Failure Policy = failure ownership authority.",
        "Control Policy Matrix = control ownership authority.",
        "Session Isolation = isolation authority under contention.",
        "QAgent layer = parent orchestration authority.",
      ]}
      navItems={[
        { title: "Overview", subtitle: "Failure policy scope.", href: "#overview" },
        { title: "Failure Diagram", subtitle: "Classify -> retry -> escalate flow.", href: "#diagram" },
        { title: "Failure Details", subtitle: "Taxonomy and control rules.", href: "#details" },
        { title: "Related Docs", subtitle: "Canonical references.", href: "#related-docs" },
      ]}
      diagramTitle="Failure Diagram"
      diagram={{
        mode: "flow",
        steps: ["Error Event", "Classify", "Retry Budget", "Fallback/Escalate", "Abort/Continue"],
      }}
      detailsTitle="Failure Details"
      detailsItems={failureDetails.map((d) => ({
        id: d.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: d.title,
        subtitle: d.subtitle,
        purpose: d.purpose,
        defines: [...d.defines],
        doesNotDefine: d.doesNotDefine,
        href: "/docs/architecture/policies/failure-policy",
        linkLabel: "Canonical page",
      }))}
      relatedDocs={[
        "Failure Policy = failure handling authority.",
        "Control Policy Matrix = stage control authority.",
        "Session Isolation = contention/isolation authority.",
        "QAgent layer page = parent boundary authority.",
      ]}
    />
  );
}
