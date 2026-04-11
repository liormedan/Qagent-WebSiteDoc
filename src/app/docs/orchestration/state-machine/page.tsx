import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";
import { getDocPage } from "@/lib/docs";

const page = getDocPage("orchestration/state-machine");

export default function OrchestrationStateMachinePage() {
  if (!page) return null;

  return (
    <DocsTemplatePage
      title={page.title}
      description={page.description}
      sectionPath={["QAgent", "System Flow", "State Machine"]}
      covers="state definitions, transition constraints, and state-machine governance rules."
      doesNotCover="module implementation internals and external orchestration systems."
      overviewIntro="This page defines the orchestration state machine that constrains valid transitions in QAgent workflows."
      overviewAreasTitle="State-machine concerns"
      overviewAreas={["state definitions", "allowed transitions", "invalid transition handling"]}
      outOfScope="Detailed module algorithms and cross-layer orchestration implementation."
      relatedBoundaries={[
        "State Machine = transition validity authority.",
        "Routing Logic = branch selection authority.",
        "Orchestration Flow = sequence authority.",
      ]}
      navItems={[
        { title: "Overview", subtitle: "State scope and purpose.", href: "#overview" },
        { title: "State Diagram", subtitle: "State progression model.", href: "#diagram" },
        { title: "State Details", subtitle: "State-by-state definitions.", href: "#details" },
        { title: "Related Docs", subtitle: "Canonical references.", href: "#related-docs" },
      ]}
      diagramTitle="State Diagram"
      diagram={{ mode: "flow", steps: ["Initialized", "Interpreting", "Planning", "Approval Pending", "Executing", "Versioned"] }}
      detailsTitle="State Details"
      detailsItems={page.sections.map((s) => {
        const lines = s.body.map((l) => l.replace(/^(?:[-*\u2022]\s*)+/, "").trim()).filter(Boolean);
        return {
          id: s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          title: s.title.replace(/^\d+\.\s*/, ""),
          subtitle: lines[0] ?? "State specification",
          purpose: lines[0] ?? "Define this state-machine section.",
          defines: lines.slice(1, 5).length ? lines.slice(1, 5) : ["Authoritative state-machine definition."],
          doesNotDefine: "Implementation internals outside state semantics.",
          href: "/docs/orchestration/state-machine",
          linkLabel: "Canonical page",
        };
      })}
      relatedDocs={[
        "State Machine = transition validity authority.",
        "Routing Logic = route decision authority.",
        "Orchestration Flow = ordered sequence authority.",
        "System Flow = cross-layer transition authority.",
      ]}
    />
  );
}
