import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";
import { QAGENT_ARCH_HUB_LINKS } from "@/lib/docs-scope-links";
import { getDocPage } from "@/lib/docs";

const page = getDocPage("testing-strategy");

export default function TestingStrategyPage() {
  if (!page) return null;

  return (
    <DocsTemplatePage
      title={page.title}
      description={page.description}
      sectionPath={["QAgent", "Implementation", "Testing Strategy"]}
      scopeLinks={QAGENT_ARCH_HUB_LINKS}
      overviewIntro="Testing Strategy defines how QAgent structure and contracts are validated before implementation and release transitions."
      overviewAreasTitle="Testing concerns"
      overviewAreas={["coverage boundaries", "validation layers", "quality gates and release readiness"]}
      outOfScope="Code-level test harness implementation details."
      relatedBoundaries={[
        "Testing Strategy = validation authority.",
        "Implementation Baseline = freeze authority.",
        "Function Contracts = contract verification authority.",
      ]}
      navItems={[
        { title: "Overview", subtitle: "Testing scope and purpose.", href: "#overview" },
        { title: "Testing Diagram", subtitle: "Validation structure.", href: "#diagram" },
        { title: "Testing Details", subtitle: "Strategy sections.", href: "#details" },
        { title: "Related Docs", subtitle: "Canonical references.", href: "#related-docs" },
      ]}
      diagramTitle="Testing Diagram"
      diagram={{
        mode: "structure",
        root: "Testing Strategy",
        groups: [
          { title: "Inputs", items: ["Architecture", "Contracts", "Policies"] },
          { title: "Validation Layers", items: ["Structure Checks", "Flow Checks", "Boundary Checks"] },
          { title: "Outputs", items: ["Conformance Result", "Readiness Status", "Blocking Findings"] },
        ],
      }}
      detailsTitle="Testing Details"
      detailsItems={page.sections.map((s) => {
        const lines = s.body.map((l) => l.replace(/^(?:[-*\u2022]\s*)+/, "").trim()).filter(Boolean);
        return {
          id: s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          title: s.title.replace(/^\d+\.\s*/, ""),
          subtitle: lines[0] ?? "Testing strategy section",
          purpose: lines[0] ?? "Define this testing strategy section.",
          defines: lines.slice(1, 5).length ? lines.slice(1, 5) : ["Authoritative testing strategy definition."],
          doesNotDefine: "Implementation-specific test framework wiring.",
          href: "/docs/testing-strategy",
          linkLabel: "Canonical page",
        };
      })}
      relatedDocs={[
        "Testing Strategy = validation authority.",
        "Implementation Baseline = release freeze authority.",
        "Function Contracts = contract verification authority.",
        "QAgent architecture pages = requirement authority.",
      ]}
    />
  );
}
