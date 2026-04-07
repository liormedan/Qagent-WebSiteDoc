import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { QAgentArchitectureLinearDiagram } from "@/components/ui/QAgentArchitectureLinearDiagram";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { QAGENT_CANONICAL_FLOW } from "@/lib/qagent-canonical";

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
        <SectionBlock title="Canonical Flow" body={[QAGENT_CANONICAL_FLOW]} collapsible />
      </div>
    </DocsContent>
  );
}
