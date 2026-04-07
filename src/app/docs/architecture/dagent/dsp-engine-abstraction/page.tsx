import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

export default function DspEngineAbstractionPage() {
  return (
    <DocsContent>
      <PageTitle
        title="DSP Engine Abstraction Contract"
        description="Abstraction contract for dual-engine architecture: WebAudio baseline now, WASM/C++ premium engine later."
      />
      <div className="flex flex-col gap-5">
        <SectionBlock
          title="Architecture Diagram"
          body={[]}
          collapsible
        >
          <div className="rounded-xl border border-cyan-500/20 bg-slate-950/50 p-4">
            <div className="grid gap-2 md:grid-cols-4">
              {["DAL DSP Plan", "Engine Adapter", "WebAudio Engine", "WASM Engine (Future)"].map((item, index) => (
                <div key={item} className="text-center">
                  <div className={index === 1 ? "rounded-md border border-cyan-400/40 bg-cyan-500/10 px-2 py-2 text-xs font-semibold text-cyan-100" : "rounded-md border border-white/10 bg-slate-900/70 px-2 py-2 text-xs text-slate-200"}>
                    {item}
                  </div>
                  {index < 2 ? <div className="pt-1 text-cyan-300/80">→</div> : null}
                </div>
              ))}
            </div>
            <p className="mt-2 text-center text-xs text-slate-400">Single abstraction contract, dual engine implementations</p>
          </div>
        </SectionBlock>
        <SectionBlock
          title="Overview"
          body={[
            "This contract defines the stable DSP interface independent of engine implementation.",
            "WebAudio is implementation baseline for current system release; WASM/C++ is future premium path under same API.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Engine Interface"
          body={[
            "prepare(chain, context): validates chain and returns executable graph plan.",
            "execute(plan, mode): executes in realtime or offline mode and returns processed buffer handle.",
            "export(result, format): converts result into output artifact.",
            "capabilities(): returns supported nodes, limits, and mode support.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Shared Node Model and Parameter Mapping"
          body={[
            "Shared node types: low_shelf, high_shelf, peaking, gain, compressor.",
            "Shared parameter keys: frequency, gain, q, threshold, ratio, attack, release.",
            "Parameter mapping must be deterministic and normalized before engine-specific conversion.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Parity and Determinism Requirements"
          body={[
            "For identical chain and input, output parity must stay within documented tolerance bounds.",
            "Execution order and node semantics must remain consistent between engines.",
            "Diff reports must include engine_id and tolerance profile for auditability.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Control Boundary"
          body={[
            "Engine adapter abstracts implementation details away from DAL and QCore.",
            "DAgent owns engine selection policy; higher layers never call engine-specific internals directly.",
          ]}
          collapsible
        />
      </div>
    </DocsContent>
  );
}
