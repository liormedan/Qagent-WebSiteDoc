import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { QAgentArchitectureLinearDiagram } from "@/components/ui/QAgentArchitectureLinearDiagram";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { QAGENT_CANONICAL_FLOW } from "@/lib/qagent-canonical";

export default function SystemFlowPage() {
  return (
    <DocsContent>
      <PageTitle
        title="QAgent Flow"
        description="QAgent layer flow visualization. For the full cross-layer system map, use /docs/system."
      />
      <div className="flex flex-col gap-5">
        <section className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-xs leading-5 text-cyan-100 md:text-sm">
          Full system structure entry: <span className="font-semibold">/docs/system</span>
        </section>
        <SectionBlock title="Architecture Diagram" body={[]} collapsible>
          <QAgentArchitectureLinearDiagram />
        </SectionBlock>
        <SectionBlock title="Canonical Flow" body={[QAGENT_CANONICAL_FLOW]} collapsible />
      </div>
    </DocsContent>
  );
}
