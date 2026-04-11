import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";
import { QAGENT_ARCH_HUB_LINKS } from "@/lib/docs-scope-links";
import { getDocPage } from "@/lib/docs";

const page = getDocPage("function-contracts");

export default function FunctionContractsPage() {
  if (!page) return null;

  return (
    <DocsTemplatePage
      title={page.title}
      description={page.description}
      sectionPath={["QAgent", "Implementation", "Function Contracts"]}
      scopeLinks={QAGENT_ARCH_HUB_LINKS}
      overviewIntro="Function Contracts define canonical payload and boundary expectations at function-level interfaces."
      overviewAreasTitle="Contract concerns"
      overviewAreas={["function payload boundaries", "input/output expectations", "contract conformance references"]}
      outOfScope="Implementation details of function internals."
      relatedBoundaries={[
        "Function Contracts = function interface authority.",
        "Schema Registry = inter-module schema authority.",
        "Control Policy = governance authority.",
      ]}
      navItems={[
        { title: "Overview", subtitle: "Function-contract scope.", href: "#overview" },
        { title: "Contract Diagram", subtitle: "Interface boundary map.", href: "#diagram" },
        { title: "Contract Details", subtitle: "Section-level contracts.", href: "#details" },
        { title: "Related Docs", subtitle: "Canonical references.", href: "#related-docs" },
      ]}
      diagramTitle="Contract Diagram"
      diagram={{
        mode: "structure",
        root: "Function Contracts",
        groups: [
          { title: "Inputs", items: ["Required Fields", "Optional Fields", "Validation Preconditions"] },
          { title: "Function Boundary", items: ["Contract Check", "Execution Gate", "Error Surface"] },
          { title: "Outputs", items: ["Result Shape", "Error Shape", "Metadata Envelope"] },
        ],
      }}
      detailsTitle="Contract Details"
      detailsItems={page.sections.map((s) => {
        const lines = s.body.map((l) => l.replace(/^(?:[-*\u2022]\s*)+/, "").trim()).filter(Boolean);
        return {
          id: s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          title: s.title.replace(/^\d+\.\s*/, ""),
          subtitle: lines[0] ?? "Function contract section",
          purpose: lines[0] ?? "Define this function contract section.",
          defines: lines.slice(1, 5).length ? lines.slice(1, 5) : ["Authoritative function contract definition."],
          doesNotDefine: "Function implementation internals.",
          href: "/docs/function-contracts",
          linkLabel: "Canonical page",
        };
      })}
      relatedDocs={[
        "Function Contracts = function interface authority.",
        "Schema Registry = module contract authority.",
        "Client-QAgent ID Mapping = cross-layer mapping authority.",
        "QAgent page = parent layer boundary authority.",
      ]}
    />
  );
}
