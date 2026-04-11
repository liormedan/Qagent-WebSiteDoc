import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";
import { QAGENT_ARCH_HUB_LINKS } from "@/lib/docs-scope-links";

const baselineDetails = [
  {
    title: "Documentation Governance",
    subtitle: "Source-of-truth boundaries",
    purpose: "Define which documentation locations are authoritative for implementation.",
    defines: [
      "QAgent authority under architecture and system flow references.",
      "Client and API authoritative locations.",
      "Conflict rule: canonical pages override supporting content.",
    ],
    doesNotDefine: "New architecture semantics outside existing canonical pages.",
  },
  {
    title: "Authoritative Baseline Set",
    subtitle: "Implementation-allowed references",
    purpose: "Define the baseline set of pages that may drive implementation behavior.",
    defines: ["Core modules pages.", "Contracts pages.", "Policies pages.", "Approval and DSP abstraction pages."],
    doesNotDefine: "Draft pages as binding requirements.",
  },
  {
    title: "Non-authoritative Pages",
    subtitle: "Draft/supporting content",
    purpose: "Define which pages are supporting and not binding for implementation.",
    defines: ["Draft skeleton pages.", "Exploratory pages without explicit boundaries.", "Future/optional content references."],
    doesNotDefine: "Promotion process into authoritative baseline.",
  },
  {
    title: "Enforcement Rule",
    subtitle: "PR traceability requirement",
    purpose: "Define implementation traceability requirement against baseline references.",
    defines: [
      "Implementation PRs must reference authoritative baseline sections.",
      "Draft pages cannot introduce binding requirements.",
      "Baseline promotion is required before new pages become authoritative.",
    ],
    doesNotDefine: "CI enforcement implementation details.",
  },
] as const;

export default function ImplementationBaselinePage() {
  return (
    <DocsTemplatePage
      title="Implementation Baseline"
      description="Authoritative baseline freeze for implementation: binding pages vs draft/future scope."
      sectionPath={["QAgent", "Implementation", "Implementation Baseline"]}
      scopeLinks={QAGENT_ARCH_HUB_LINKS}
      overviewIntro="Implementation Baseline freezes which documentation sources are binding for implementation and governance."
      overviewAreasTitle="Baseline concerns"
      overviewAreas={[
        "Canonical source governance.",
        "Authoritative baseline page set.",
        "Draft/supporting page boundaries.",
        "Implementation traceability rules.",
      ]}
      outOfScope="Changing architecture decisions or adding new modules."
      relatedBoundaries={[
        "Implementation Baseline = implementation authority boundary.",
        "Architecture pages = module/system authority.",
        "Testing Strategy = validation authority.",
      ]}
      navItems={[
        { title: "Overview", subtitle: "Baseline scope and purpose.", href: "#overview" },
        { title: "Baseline Diagram", subtitle: "Authority segmentation.", href: "#diagram" },
        { title: "Baseline Details", subtitle: "Governance and enforcement rules.", href: "#details" },
        { title: "Related Docs", subtitle: "Canonical references.", href: "#related-docs" },
      ]}
      diagramTitle="Baseline Diagram"
      diagram={{
        mode: "structure",
        root: "Implementation Baseline",
        groups: [
          { title: "Authoritative", items: ["Architecture", "Contracts", "Policies", "Implementation Baseline"] },
          { title: "Allowed for Implementation", items: ["Baseline-referenced sections", "Canonical contract rules", "Canonical flow references"] },
          { title: "Non-authoritative", items: ["Draft pages", "Future placeholders", "Exploratory content"] },
        ],
      }}
      detailsTitle="Baseline Details"
      detailsItems={baselineDetails.map((d) => ({
        id: d.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: d.title,
        subtitle: d.subtitle,
        purpose: d.purpose,
        defines: [...d.defines],
        doesNotDefine: d.doesNotDefine,
        href: "/docs/architecture/implementation-baseline",
        linkLabel: "Canonical page",
      }))}
      relatedDocs={[
        "Implementation Baseline = implementation authority.",
        "Architecture page = module map authority.",
        "System Flow = transition authority.",
        "Testing Strategy = validation authority.",
      ]}
    />
  );
}
