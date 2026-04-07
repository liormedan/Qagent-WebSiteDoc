import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { QAgentArchitectureLinearDiagram } from "@/components/ui/QAgentArchitectureLinearDiagram";
import { SectionBlock } from "@/components/ui/SectionBlock";

export default function SystemFlowPage() {
  return (
    <DocsContent>
      <PageTitle
        title="System Flow"
        description="End-to-end system flow from user request to versioned output with approval and restore-ready lifecycle."
      />
      <div className="flex flex-col gap-5">
        <SectionBlock title="Architecture Diagram" body={[]} collapsible>
          <QAgentArchitectureLinearDiagram />
        </SectionBlock>
        <SectionBlock
          title="Step-by-step flow"
          body={[
            "1. User request enters QCore.",
            "2. Files Handler ingests and normalizes input artifacts.",
            "3. Analyzer extracts structure and feature signals.",
            "4. Intent + Clarification resolves user intent and ambiguity.",
            "5. DAL generates executable and UI plans.",
            "6. UAgent presents the plan and captures interaction.",
            "7. Approval gates execution through explicit user decision.",
            "8. DAgent executes approved operations.",
            "9. Versioning stores results, history, and restore context.",
          ]}
          collapsible
        />
      </div>
    </DocsContent>
  );
}
