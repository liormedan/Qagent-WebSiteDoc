import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";
import { QAGENT_ARCH_HUB_LINKS } from "@/lib/docs-scope-links";
import { getDocPage } from "@/lib/docs";

const page = getDocPage("implementation-map");

export default function ImplementationMapPage() {
  if (!page) return null;

  return (
    <DocsTemplatePage
      title={page.title}
      description={page.description}
      sectionPath={["QAgent", "Implementation", "Implementation Map"]}
      scopeLinks={QAGENT_ARCH_HUB_LINKS}
      overviewIntro="Implementation Map defines how architecture sections map into implementation scope and sequencing."
      overviewAreasTitle="Implementation concerns"
      overviewAreas={["scope mapping", "phase ordering", "implementation readiness boundaries"]}
      outOfScope="Detailed code-level implementation strategies."
      relatedBoundaries={[
        "Implementation Map = implementation scope authority.",
        "Implementation Baseline = authoritative freeze authority.",
        "Testing Strategy = verification authority.",
      ]}
      navItems={[
        { title: "Overview", subtitle: "Implementation-map scope.", href: "#overview" },
        { title: "Map Diagram", subtitle: "Implementation structure view.", href: "#diagram" },
        { title: "Map Details", subtitle: "Section-level mapping.", href: "#details" },
        { title: "Related Docs", subtitle: "Canonical references.", href: "#related-docs" },
      ]}
      diagramTitle="Map Diagram"
      diagram={{
        mode: "structure",
        root: "Implementation Map",
        groups: [
          { title: "Authoritative Inputs", items: ["Architecture", "Contracts", "Policies"] },
          { title: "Implementation Outputs", items: ["Module Workstreams", "Validation Checklist", "Release Gates"] },
          { title: "Verification", items: ["Testing Strategy", "Conformance Checks", "Baseline Alignment"] },
        ],
      }}
      detailsTitle="Map Details"
      detailsItems={page.sections.map((s) => {
        const lines = s.body.map((l) => l.replace(/^(?:[-*\u2022]\s*)+/, "").trim()).filter(Boolean);
        return {
          id: s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          title: s.title.replace(/^\d+\.\s*/, ""),
          subtitle: lines[0] ?? "Implementation map section",
          purpose: lines[0] ?? "Define this implementation map section.",
          defines: lines.slice(1, 5).length ? lines.slice(1, 5) : ["Authoritative implementation mapping definition."],
          doesNotDefine: "Code-level implementation mechanics.",
          href: "/docs/implementation-map",
          linkLabel: "Canonical page",
        };
      })}
      relatedDocs={[
        "Implementation Map = scope mapping authority.",
        "Implementation Baseline = freeze authority.",
        "Testing Strategy = validation authority.",
        "QAgent architecture pages = source requirement authority.",
      ]}
    />
  );
}
