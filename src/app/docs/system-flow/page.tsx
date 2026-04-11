import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";
import { SYSTEM_RUNTIME_LIFECYCLE } from "@/lib/system-canonical";

const flowDetails = [
  {
    title: "Canonical Sequence",
    subtitle: "Cross-layer transition order",
    purpose: "Define the authoritative end-to-end transition sequence.",
    defines: ["User -> Client -> QAgent -> API -> Execution -> Versioning -> Output", SYSTEM_RUNTIME_LIFECYCLE],
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
    defines: ["Single canonical sequence reference.", "Cross-layer transition consistency anchor.", "Non-duplication rule for flow declarations."],
    doesNotDefine: "Competing flow definitions in subsystem pages.",
  },
] as const;

export default function SystemFlowPage() {
  return (
    <DocsTemplatePage
      title="End-to-End System Flow"
      description="Canonical cross-layer flow from user request to versioned output."
      sectionPath={["QAgent", "Cross-Layer References", "Runtime Graph / System Structure"]}
      covers="canonical sequence, handoff boundaries, and flow governance references."
      doesNotCover="module-level implementation details and subsystem deep specs."
      overviewIntro="This page is the canonical cross-layer flow reference used by System, QAgent, Client, and API pages."
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
      diagram={{ mode: "flow", steps: ["User", "Client Layer", "QAgent Layer", "API Server Layer", "Execution Layer", "Versioning", "Output"] }}
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
        "System Flow = canonical sequence authority.",
        "System page = system map authority.",
        "QAgent page = planning/handoff authority.",
        "API page = execution orchestration authority.",
      ]}
    />
  );
}
