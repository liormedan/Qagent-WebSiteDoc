import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";
import { ORCHESTRATION_HUB_LINKS } from "@/lib/docs-scope-links";
import { getDocPage } from "@/lib/docs";

const page = getDocPage("orchestration/routing-logic");

export default function OrchestrationRoutingLogicPage() {
  if (!page) return null;

  return (
    <DocsTemplatePage
      title={page.title}
      description={page.description}
      sectionPath={["QAgent", "System Flow", "Routing Logic"]}
      scopeLinks={ORCHESTRATION_HUB_LINKS}
      overviewIntro="This page defines how orchestration routes requests and transitions across QAgent flow paths."
      overviewAreasTitle="Routing concerns"
      overviewAreas={["route selection logic", "branch constraints", "deterministic routing outcomes"]}
      outOfScope="Runtime execution internals and downstream API orchestration."
      relatedBoundaries={[
        "Routing Logic = route decision authority.",
        "Orchestration Flow = sequence authority.",
        "State Machine = transition validity authority.",
      ]}
      navItems={[
        { title: "Overview", subtitle: "Routing scope.", href: "#overview" },
        { title: "Routing Diagram", subtitle: "Route branch model.", href: "#diagram" },
        { title: "Routing Details", subtitle: "Rule-by-rule details.", href: "#details" },
        { title: "Related Docs", subtitle: "Canonical references.", href: "#related-docs" },
      ]}
      diagramTitle="Routing Diagram"
      diagram={{ mode: "structure", root: "Routing Logic", groups: [{ title: "Input", items: ["Request Context", "Session State"] }, { title: "Decision", items: ["Rule Evaluation", "Branch Selection"] }, { title: "Output", items: ["Next Stage", "Route Metadata"] }] }}
      detailsTitle="Routing Details"
      detailsItems={page.sections.map((s) => {
        const lines = s.body.map((l) => l.replace(/^(?:[-*\u2022]\s*)+/, "").trim()).filter(Boolean);
        return {
          id: s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          title: s.title.replace(/^\d+\.\s*/, ""),
          subtitle: lines[0] ?? "Routing specification",
          purpose: lines[0] ?? "Define this routing section.",
          defines: lines.slice(1, 5).length ? lines.slice(1, 5) : ["Authoritative routing definition."],
          doesNotDefine: "Execution stage internals outside routing scope.",
          href: "/docs/orchestration/routing-logic",
          linkLabel: "Canonical page",
        };
      })}
      relatedDocs={[
        "Routing Logic = route decision authority.",
        "Orchestration Flow = sequence authority.",
        "State Machine = transition authority.",
        "QAgent page = layer authority.",
      ]}
    />
  );
}
