import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";
import { getDocPage } from "@/lib/docs";

const page = getDocPage("orchestration/orchestration-flow");

export default function OrchestrationFlowPage() {
  if (!page) return null;

  return (
    <DocsTemplatePage
      title={page.title}
      description={page.description}
      sectionPath={["QAgent", "System Flow", "Orchestration Flow"]}
      covers="orchestration transition flow, sequencing rules, and stage handoff behavior."
      doesNotCover="module-specific implementation internals."
      overviewIntro="This page defines orchestration flow behavior for the QAgent system flow layer."
      overviewAreasTitle="Orchestration concerns"
      overviewAreas={["state transitions", "stage ordering", "handoff determinism"]}
      outOfScope="Implementation mechanics of specific orchestration modules."
      relatedBoundaries={[
        "Orchestration Flow = transition sequence authority.",
        "Routing Logic = routing decision authority.",
        "State Machine = state progression authority.",
      ]}
      navItems={[
        { title: "Overview", subtitle: "Scope and boundaries.", href: "#overview" },
        { title: "Flow Diagram", subtitle: "Flow structure map.", href: "#diagram" },
        { title: "Flow Details", subtitle: "Section-level details.", href: "#details" },
        { title: "Related Docs", subtitle: "Cross-page references.", href: "#related-docs" },
      ]}
      diagramTitle="Flow Diagram"
      diagram={{ mode: "flow", steps: ["Intake", "Route", "Validate", "Execute", "Reflect", "Complete"] }}
      detailsTitle="Flow Details"
      detailsItems={page.sections.map((s) => {
        const lines = s.body.map((l) => l.replace(/^(?:[-*\u2022]\s*)+/, "").trim()).filter(Boolean);
        return {
          id: s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          title: s.title.replace(/^\d+\.\s*/, ""),
          subtitle: lines[0] ?? "Orchestration specification",
          purpose: lines[0] ?? "Define this orchestration section.",
          defines: lines.slice(1, 5).length ? lines.slice(1, 5) : ["Authoritative orchestration flow definition."],
          doesNotDefine: "Cross-layer ownership outside orchestration scope.",
          href: "/docs/orchestration/orchestration-flow",
          linkLabel: "Canonical page",
        };
      })}
      relatedDocs={[
        "Orchestration Flow = sequence authority.",
        "Routing Logic = routing authority.",
        "State Machine = state authority.",
        "System Flow = cross-layer authority.",
      ]}
    />
  );
}
