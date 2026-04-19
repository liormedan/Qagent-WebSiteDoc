import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";
import { SYSTEM_FLOW_SCOPE_LINKS } from "@/lib/docs-scope-links";
import { SYSTEM_RUNTIME_LIFECYCLE } from "@/lib/system-canonical";
import { WAVEQ_CANONICAL_FLOW_STEPS } from "@/lib/waveq-authority";

const flowDetails = [
  {
    title: "Canonical Sequence",
    subtitle: "Cross-layer transition order",
    purpose: "Define the authoritative end-to-end transition sequence.",
    defines: [SYSTEM_RUNTIME_LIFECYCLE],
    doesNotDefine: "Module-level implementation internals.",
  },
  {
    title: "Handoff Boundaries",
    subtitle: "Layer-to-layer ownership transitions",
    purpose: "Define where ownership shifts between layers in the canonical flow.",
    defines: [
      "Client to QAgent handoff boundary.",
      "QAgent to API execution request boundary.",
      "Execution output to versioned reference boundary.",
    ],
    doesNotDefine: "Internal logic of each owning layer.",
  },
  {
    title: "Flow Governance",
    subtitle: "Single-flow authority",
    purpose: "Define this page as canonical flow reference reused across layer pages.",
    defines: [
      "Single canonical sequence reference.",
      "Cross-layer transition consistency anchor.",
      "Non-duplication rule for flow declarations.",
      "Numbered runtime order is authority of /docs/system-runtime (R01–R12), not this page.",
    ],
    doesNotDefine: "Competing flow definitions in subsystem pages.",
  },
] as const;

export default function SystemFlowPage() {
  return (
    <DocsTemplatePage
      title="End-to-End System Flow"
      description="Canonical cross-layer flow from user request to versioned output."
      sectionPath={["QAgent", "Cross-Layer References", "Runtime Graph / System Structure"]}
      scopeLinks={SYSTEM_FLOW_SCOPE_LINKS}
      overviewIntro="This page is the canonical narrative and diagram cross-layer flow reference. Numbered product runtime ordering lives at /docs/system-runtime; protected HTTP ordering at /docs/auth-security/system-flow; domain canonical hrefs at /docs/authority-map."
      overviewAreasTitle="Flow concerns"
      overviewAreas={[
        "End-to-end sequence integrity.",
        "Cross-layer ownership transitions.",
        "Single-flow governance across docs.",
      ]}
      outOfScope="Internal implementation logic of individual modules."
      relatedBoundaries={[
        "System Flow = cross-layer sequence authority.",
        "System page = architecture map authority.",
        "QAgent/API/Client pages = layer authority.",
      ]}
      navItems={[
        { title: "Overview", subtitle: "Flow scope and purpose.", href: "#overview" },
        { title: "Flow Diagram", subtitle: "Canonical sequence visualization.", href: "#diagram" },
        { title: "Flow Details", subtitle: "Transitions and governance.", href: "#details" },
        { title: "Related Docs", subtitle: "Canonical references.", href: "#related-docs" },
      ]}
      diagramTitle="Flow Diagram"
      diagram={{ mode: "flow", steps: [...WAVEQ_CANONICAL_FLOW_STEPS] }}
      detailsTitle="Flow Details"
      detailsItems={flowDetails.map((d) => ({
        id: d.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: d.title,
        subtitle: d.subtitle,
        purpose: d.purpose,
        defines: [...d.defines],
        doesNotDefine: d.doesNotDefine,
        href: "/docs/system-flow",
        linkLabel: "Canonical page",
      }))}
      relatedDocs={[
        "/docs/system-runtime = numbered cross-layer product spine (R01–R12).",
        "/docs/auth-security/system-flow = protected HTTP + bootstrap spine (S/B ids).",
        "/docs/authority-map = canonical href per documentation domain.",
        "System page = system map authority.",
        "QAgent page = planning/handoff authority.",
        "API page = execution orchestration authority.",
      ]}
    />
  );
}
