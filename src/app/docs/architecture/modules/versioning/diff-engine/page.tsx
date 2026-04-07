import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

export default function DiffEnginePage() {
  return (
    <DocsContent>
      <PageTitle
        title="Diff Engine"
        description="Optional Versioning submodule for structured comparison between versions across parameters, chains, and outputs."
      />
      <div className="flex flex-col gap-5">
        <SectionBlock
          title="Architecture Diagram"
          body={[]}
          collapsible
        >
          <div className="rounded-xl border border-cyan-500/20 bg-slate-950/50 p-4">
            <div className="grid gap-2 md:grid-cols-5">
              {["Version A", "Snapshot Load", "Diff Engine", "Diff Report", "Review Paths"].map((item, index) => (
                <div key={item} className="text-center">
                  <div className={index === 2 ? "rounded-md border border-cyan-400/40 bg-cyan-500/10 px-2 py-2 text-xs font-semibold text-cyan-100" : "rounded-md border border-white/10 bg-slate-900/70 px-2 py-2 text-xs text-slate-200"}>
                    {item}
                  </div>
                  {index < 4 ? <div className="pt-1 text-cyan-300/80">→</div> : null}
                </div>
              ))}
            </div>
          </div>
        </SectionBlock>
        <SectionBlock
          title="Overview"
          body={[
            "Diff Engine compares two versions and highlights meaningful deltas.",
            "It supports parameter-level, chain-level, and output-level difference analysis for informed decision-making.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Responsibilities"
          body={[
            "Compare DSP parameter sets across versions.",
            "Compare DSP chain topology and node-level changes.",
            "Generate normalized diff report for downstream consumers.",
            "Support optional audio-level difference markers.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Flow"
          body={[
            "Version A + Version B -> Snapshot Load -> Parameter Diff -> Chain Diff -> Optional Audio Diff -> Unified Diff Report.",
            "Diff report can be consumed by UAgent, Approval, and Versioning review workflows.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Control Boundary"
          body={[
            "Diff Engine performs comparison only.",
            "It does not mutate versions, does not execute DSP, and does not enforce workflow transitions.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Inputs / Outputs"
          body={[
            "Inputs: base_version_id, target_version_id, snapshot references, optional audio references.",
            "Outputs: structured diff report, parameter delta set, chain topology delta set, optional audio delta summary.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Failure Handling"
          body={[
            "Missing version reference -> reject comparison request.",
            "Schema mismatch between snapshots -> normalize through compatibility adapter or fail with capability_error.",
            "Audio diff failure -> return partial diff with explicit degraded status.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Integration Points"
          body={[
            "Consumes Version Manager and Storage Layer version artifacts.",
            "Feeds UAgent comparison views, Approval review payloads, and Versioning analysis history.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Outputs"
          body={[
            "Structured diff object.",
            "Parameter change set.",
            "Chain topology difference set.",
            "Optional audio difference summary.",
          ]}
          collapsible
        />
      </div>
    </DocsContent>
  );
}
