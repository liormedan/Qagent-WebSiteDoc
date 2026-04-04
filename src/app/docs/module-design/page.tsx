import { Link as ChakraLink, List, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const modules = [
  {
    id: "intent-detector",
    name: "Intent Detector",
    body: [
      "Role: initial intent classification from QInput.",
      "Input: QInput.",
      "Output: QIntent.",
      "Dependencies: contracts.",
      "Failure points: low confidence, ambiguous phrase mapping.",
    ],
  },
  {
    id: "reasoning-engine",
    name: "Reasoning Engine",
    body: [
      "Role: resolve ambiguity with bounded internal passes.",
      "Input: QInput + base QIntent.",
      "Output: ReasoningResult.",
      "Dependencies: intent detector, reasoning policy.",
      "Failure points: iteration limit reached, unresolved conflict.",
    ],
  },
  {
    id: "clarification-manager",
    name: "Clarification Manager",
    body: [
      "Role: generate targeted clarification question.",
      "Input: ReasoningResult.",
      "Output: ClarificationQuestion.",
      "Dependencies: reasoning engine.",
      "Failure points: vague question, missing options.",
    ],
  },
  {
    id: "planner",
    name: "Planner",
    body: [
      "Role: build deterministic plan from refined intent.",
      "Input: QIntent.",
      "Output: QPlan.",
      "Dependencies: reasoning result.",
      "Failure points: invalid step ordering, missing target.",
    ],
  },
  {
    id: "safety-gate",
    name: "Safety Gate",
    body: [
      "Role: evaluate approval requirements.",
      "Input: QPlan.",
      "Output: requiresApproval flag.",
      "Dependencies: policy configuration.",
      "Failure points: policy mismatch.",
    ],
  },
  {
    id: "dal-builder",
    name: "DAL Builder",
    body: [
      "Role: map plan to AudioDAL contract.",
      "Input: QPlan + approval status.",
      "Output: AudioDAL.",
      "Dependencies: planner, safety gate.",
      "Failure points: invalid action mapping, missing metadata.",
    ],
  },
  {
    id: "validation-layer",
    name: "Validation Layer",
    body: [
      "Role: validate QOutput and DAL before handoff.",
      "Input: QOutput + AudioDAL.",
      "Output: validation report.",
      "Dependencies: contract schemas.",
      "Failure points: schema mismatch, blocked handoff.",
    ],
  },
  {
    id: "state-manager",
    name: "State Manager",
    body: [
      "Role: enforce allowed state transitions.",
      "Input: current state + event.",
      "Output: next state.",
      "Dependencies: state machine rules.",
      "Failure points: illegal transition, stuck state.",
    ],
  },
] as const;

export default function ModuleDesignPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Module Design"
        description="Future Q runtime modules with IO boundaries, dependencies, and failure points."
      />
      <SectionBlock title="Module Catalog" body={["Use anchor links to jump to module specs."]}>
        <List.Root as="ul" ps={5} gap={1}>
          {modules.map((module) => (
            <List.Item key={module.id}>
              <ChakraLink asChild color="accent">
                <Link href={`#${module.id}`}>{module.name}</Link>
              </ChakraLink>
            </List.Item>
          ))}
        </List.Root>
      </SectionBlock>

      <Stack gap={5} mt={5}>
        {modules.map((module) => (
          <SectionBlock key={module.id} title={module.name} body={module.body} id={module.id} />
        ))}
      </Stack>
    </DocsContent>
  );
}