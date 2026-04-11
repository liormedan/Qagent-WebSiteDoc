import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";

const modules = [
  {
    id: "intent-detector",
    name: "Intent Detector",
    purpose: "Initial intent classification from QInput.",
    defines: ["Input: QInput.", "Output: QIntent.", "Dependencies: contracts.", "Failure points: low confidence and ambiguity."],
  },
  {
    id: "reasoning-engine",
    name: "Reasoning Engine",
    purpose: "Resolve ambiguity with bounded internal passes.",
    defines: ["Input: QInput + base QIntent.", "Output: ReasoningResult.", "Dependencies: intent detector and reasoning policy.", "Failure points: unresolved conflict."],
  },
  {
    id: "clarification-manager",
    name: "Clarification Manager",
    purpose: "Generate targeted clarification prompts.",
    defines: ["Input: ReasoningResult.", "Output: ClarificationQuestion.", "Dependencies: reasoning engine."],
  },
  {
    id: "planner",
    name: "Planner",
    purpose: "Build deterministic plan from refined intent.",
    defines: ["Input: QIntent.", "Output: QPlan.", "Dependencies: reasoning result."],
  },
  {
    id: "safety-gate",
    name: "Safety Gate",
    purpose: "Evaluate approval requirements before execution.",
    defines: ["Input: QPlan.", "Output: requiresApproval flag.", "Dependencies: policy configuration."],
  },
  {
    id: "dal-builder",
    name: "DAL Builder",
    purpose: "Map plan to AudioDAL contract.",
    defines: ["Input: QPlan + approval status.", "Output: AudioDAL.", "Dependencies: planner and safety gate."],
  },
  {
    id: "validation-layer",
    name: "Validation Layer",
    purpose: "Validate QOutput and DAL before handoff.",
    defines: ["Input: QOutput + AudioDAL.", "Output: validation report.", "Dependencies: contract schemas."],
  },
  {
    id: "state-manager",
    name: "State Manager",
    purpose: "Enforce allowed state transitions.",
    defines: ["Input: current state + event.", "Output: next state.", "Dependencies: state machine rules."],
  },
] as const;

export default function ModuleDesignPage() {
  return (
    <DocsTemplatePage
      title="Module Design"
      description="Future Q runtime modules with IO boundaries, dependencies, and failure points."
      sectionPath={["QAgent", "Implementation", "Implementation Notes"]}
      covers="module purpose, IO boundaries, dependencies, and failure surfaces."
      doesNotCover="module implementation code and runtime infrastructure details."
      overviewIntro="Module Design defines high-level module contracts for future Q runtime evolution."
      overviewAreasTitle="Design concerns"
      overviewAreas={["module boundaries", "input/output contracts", "dependency model", "failure surfaces"]}
      outOfScope="Implementation internals and infrastructure runtime concerns."
      relatedBoundaries={[
        "Module Design = module blueprint authority.",
        "Function Contracts = function boundary authority.",
        "Testing Strategy = validation authority.",
      ]}
      navItems={[
        { title: "Overview", subtitle: "Design scope.", href: "#overview" },
        { title: "Design Diagram", subtitle: "Module structure map.", href: "#diagram" },
        { title: "Design Details", subtitle: "Module-by-module specification.", href: "#details" },
        { title: "Related Docs", subtitle: "Canonical references.", href: "#related-docs" },
      ]}
      diagramTitle="Design Diagram"
      diagram={{
        mode: "structure",
        root: "Module Design",
        groups: [
          { title: "Reasoning Modules", items: ["Intent Detector", "Reasoning Engine", "Clarification Manager", "Planner"] },
          { title: "Control Modules", items: ["Safety Gate", "Validation Layer", "State Manager"] },
          { title: "Execution Modules", items: ["DAL Builder"] },
        ],
      }}
      detailsTitle="Design Details"
      detailsItems={modules.map((m) => ({
        id: m.id,
        title: m.name,
        subtitle: m.purpose,
        purpose: m.purpose,
        defines: [...m.defines],
        doesNotDefine: "Cross-layer orchestration ownership.",
        href: "/docs/module-design",
        linkLabel: "Canonical page",
      }))}
      relatedDocs={[
        "Module Design = blueprint authority.",
        "Function Contracts = interface authority.",
        "Testing Strategy = validation authority.",
        "Architecture page = canonical module map authority.",
      ]}
    />
  );
}
