import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { WAVEQ_FLOW_BOUNDARY_CONTRACTS } from "@/lib/waveq-authority";

export default function FunctionContractsPage() {
  return (
    <DocsContent>
      <PageTitle title="Function Contracts" description="Authority Pack (v1.0)" />
      <div className="flex flex-col gap-5">
        {WAVEQ_FLOW_BOUNDARY_CONTRACTS.map((contract) => (
          <SectionBlock key={contract.boundary} title={contract.boundary} body={[]}>
            <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/60 p-3 text-xs text-slate-200 md:text-sm">
              <code>{JSON.stringify(contract, null, 2)}</code>
            </pre>
          </SectionBlock>
        ))}
      </div>
    </DocsContent>
  );
}

