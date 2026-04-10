import { DocsContent } from "@/components/layout/DocsContent";
import { EndToEndSequenceDiagram } from "@/components/ui/EndToEndSequenceDiagram";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { SYSTEM_RUNTIME_LIFECYCLE } from "@/lib/system-canonical";

export default function SystemFlowPage() {
  return (
    <DocsContent>
      <PageTitle title="End-to-End System Flow" description="Canonical cross-layer flow from user request to versioned output." />
      <div className="flex flex-col gap-5">
        <SectionBlock
          title="Flow Definition"
          body={["This page is the canonical cross-layer sequence view used by system and layer pages."]}
        />
        <SectionBlock title="End-to-End Sequence Diagram" body={[]}>
          <EndToEndSequenceDiagram />
        </SectionBlock>
        <SectionBlock title="Canonical Lifecycle String" body={[SYSTEM_RUNTIME_LIFECYCLE]} />
      </div>
    </DocsContent>
  );
}

