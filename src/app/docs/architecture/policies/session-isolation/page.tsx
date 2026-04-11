import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";

const isolationDetails = [
  {
    title: "Tenant and Session Isolation",
    subtitle: "Scope ownership",
    purpose: "Define tenant/session isolation boundaries for QAgent state and artifacts.",
    defines: ["tenant-scoped data isolation", "session-scoped active state isolation", "version ownership by tenant/session scope"],
    doesNotDefine: "Cross-tenant sharing policies outside explicit contracts.",
  },
  {
    title: "Execution Ownership",
    subtitle: "Lineage binding",
    purpose: "Define execution ownership relationship to originating request/session lineage.",
    defines: ["execution_id bound to originating lineage.", "ownership checks for execution actions.", "lineage-preserving access constraints."],
    doesNotDefine: "API-side job scheduling ownership.",
  },
  {
    title: "Locking and Conflict Handling",
    subtitle: "Concurrency governance",
    purpose: "Define lock strategy and conflict handling during concurrent operations.",
    defines: ["write-lock for execution and version commits.", "first-lock-wins conflict rule.", "conflict event logging with lineage IDs."],
    doesNotDefine: "Distributed lock implementation internals.",
  },
  {
    title: "Shared Resource Policy",
    subtitle: "Lease and access constraints",
    purpose: "Define controlled shared-resource behavior across concurrent sessions.",
    defines: ["read-only default shared access.", "lease TTL requirements for long operations.", "lease expiry invalidation rules."],
    doesNotDefine: "Storage backend implementation details.",
  },
] as const;

export default function SessionIsolationPage() {
  return (
    <DocsTemplatePage
      title="Multi-user and Session Isolation Spec"
      description="Isolation policy for tenants, sessions, execution ownership, and concurrency control."
      sectionPath={["QAgent", "Policies", "Session Isolation"]}
      covers="tenant/session isolation rules, execution ownership boundaries, conflict handling, and shared resource constraints."
      doesNotCover="distributed lock implementation and storage backend internals."
      overviewIntro="Session Isolation defines how QAgent preserves strict ownership boundaries under multi-user and multi-session load."
      overviewAreasTitle="Isolation concerns"
      overviewAreas={[
        "Tenant and session scope isolation.",
        "Execution and version ownership constraints.",
        "Concurrency locks and conflict resolution.",
      ]}
      outOfScope="Implementation-level locking mechanisms and infrastructure persistence internals."
      relatedBoundaries={[
        "Session Isolation = isolation authority.",
        "Control Policy Matrix = control transitions authority.",
        "Failure Policy = failure/escalation authority.",
        "Lineage Model = identifier ownership authority.",
      ]}
      navItems={[
        { title: "Overview", subtitle: "Isolation scope.", href: "#overview" },
        { title: "Isolation Diagram", subtitle: "Ownership chain and boundaries.", href: "#diagram" },
        { title: "Isolation Details", subtitle: "Rules and constraints.", href: "#details" },
        { title: "Related Docs", subtitle: "Canonical references.", href: "#related-docs" },
      ]}
      diagramTitle="Isolation Diagram"
      diagram={{
        mode: "flow",
        steps: ["tenant_id", "session_id", "request_id", "execution_id", "version_id"],
      }}
      detailsTitle="Isolation Details"
      detailsItems={isolationDetails.map((d) => ({
        id: d.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: d.title,
        subtitle: d.subtitle,
        purpose: d.purpose,
        defines: [...d.defines],
        doesNotDefine: d.doesNotDefine,
        href: "/docs/architecture/policies/session-isolation",
        linkLabel: "Canonical page",
      }))}
      relatedDocs={[
        "Session Isolation = concurrency and ownership authority.",
        "Control Policy Matrix = transition authority.",
        "Failure Policy = fallback/escalation authority.",
        "Lineage Model = identity ownership authority.",
      ]}
    />
  );
}
