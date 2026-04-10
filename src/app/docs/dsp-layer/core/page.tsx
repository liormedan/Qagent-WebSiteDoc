import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const inputContract = `{
  "job_id": "string",
  "input_file": "string",
  "operation": "string",
  "params": "object"
}`;

const outputContract = `{
  "job_id": "string",
  "status": "completed | failed",
  "output_file": "string",
  "metadata": "object"
}`;

const errorContract = `{
  "status": "failed",
  "error": "string"
}`;

const coreStructureModel = [
  {
    source: "Layer Definition",
    target: "Identity",
    description: "Defines the layer identity and system position.",
  },
  {
    source: "Responsibilities",
    target: "What it does",
    description: "Defines operational ownership during execution.",
  },
  {
    source: "Execution Model",
    target: "How it operates",
    description: "Defines task execution semantics.",
  },
  {
    source: "State & Behavior",
    target: "How it behaves",
    description: "Defines runtime guarantees and invariants.",
  },
  {
    source: "Constraints",
    target: "What it cannot do",
    description: "Defines strict non-ownership boundaries.",
  },
];

export default function DspLayerCorePage() {
  return (
    <DocsContent>
      <PageTitle title="DSP / Processing Layer - Core Specification" description="Deep specification page for DSP execution behavior, contracts, and integration boundaries." />
      <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <p>This page contains the full DSP / Processing Layer technical specification.</p>
      </section>

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock
          title="What is Core Specification"
          body={[
            "Core Specification defines the behavioral model of the DSP layer.",
            "It describes how the layer operates, what it is responsible for, how execution behaves, and what constraints apply.",
            "It does not describe implementation details, processor internals, or system integration flow.",
          ]}
        />

        <SectionBlock
          title="CORE Structure Model"
          body={[]}
          collapsible
        >
          <p className="inline-flex w-fit rounded-md border border-cyan-400/30 bg-cyan-500/10 px-2 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-cyan-100">
            Diagram
          </p>
          <p className="text-sm text-[var(--muted)]">CORE SPECIFICATION</p>
          <div className="mt-2 rounded-xl border border-cyan-500/25 bg-slate-950/40 p-4">
            <div className="space-y-2">
              {coreStructureModel.map((item, index) => (
                <div key={`${item.source}-${item.target}`} className="flex flex-col items-center gap-2">
                  <div className="w-full rounded-md border border-[var(--border)] bg-slate-950/40 p-3">
                    <p className="text-sm font-semibold text-slate-100">{item.source}</p>
                    <p className="text-xs text-cyan-200">{item.target}</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">{item.description}</p>
                  </div>
                  {index < coreStructureModel.length - 1 ? <ArrowDown className="h-4 w-4 text-cyan-300/80" /> : null}
                </div>
              ))}
            </div>
          </div>
        </SectionBlock>

        <SectionBlock
          title="Role of Each Component"
          body={[]}
          collapsible
        >
          <div className="space-y-2">
            <Link href="#1-layer-definition" className="block rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 hover:border-cyan-400/60">
              <p className="text-sm font-semibold text-slate-100">Layer Definition</p>
              <p className="text-xs text-[var(--muted)]">Defines the identity, purpose, and system position of the DSP layer.</p>
            </Link>
            <Link href="#2-responsibilities-refined" className="block rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 hover:border-cyan-400/60">
              <p className="text-sm font-semibold text-slate-100">Responsibilities</p>
              <p className="text-xs text-[var(--muted)]">Defines the operational responsibilities during execution.</p>
            </Link>
            <Link href="#3-execution-model" className="block rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 hover:border-cyan-400/60">
              <p className="text-sm font-semibold text-slate-100">Execution Model</p>
              <p className="text-xs text-[var(--muted)]">Defines how processing tasks are executed.</p>
            </Link>
            <Link href="#9-state-behavior" className="block rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 hover:border-cyan-400/60">
              <p className="text-sm font-semibold text-slate-100">State & Behavior</p>
              <p className="text-xs text-[var(--muted)]">Defines stateless execution and deterministic behavior.</p>
            </Link>
            <Link href="#10-constraints" className="block rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 hover:border-cyan-400/60">
              <p className="text-sm font-semibold text-slate-100">Constraints</p>
              <p className="text-xs text-[var(--muted)]">Defines strict boundaries and forbidden behaviors.</p>
            </Link>
          </div>
        </SectionBlock>

        <SectionBlock
          title="CORE vs Other Sections"
          body={[
            "- CORE defines behavior.",
            "- Contracts define input/output.",
            "- Processing Engine defines implementation.",
            "- Integration defines system flow.",
          ]}
          collapsible
        />

        <SectionBlock
          id="1-layer-definition"
          title="1. Layer Definition"
          body={[
            "DSP Layer is the processing execution unit that performs deterministic audio transformations.",
            "Role in system: execute processing operations on input artifacts and emit output artifacts for downstream storage/reference.",
            "It is NOT an orchestration layer, policy layer, UI layer, or billing layer.",
            "Relation to QAgent: receives approved execution intent indirectly through API execution contracts.",
            "Relation to API Server: executed as a processing component within API execution flow.",
            "Relation to Data Layer: emits output artifacts and metadata for canonical storage and lineage.",
          ]}
          collapsible
        />

        <SectionBlock
          id="2-responsibilities-refined"
          title="2. Responsibilities (Refined)"
          body={[
            "### Execution Responsibility",
            "- Input: processing task contract (`job_id`, `input_file`, `operation`, `params`).",
            "- Output: operation completion status and produced output artifact reference.",
            "- Side effects: creation of processing output artifact.",
            "### Transformation Responsibility",
            "- Input: source audio artifact and operation parameters.",
            "- Output: transformed audio artifact according to operation semantics.",
            "- Side effects: none beyond deterministic transformation output.",
            "### Artifact Generation Responsibility",
            "- Input: successful transformation result and execution context.",
            "- Output: output file reference and processing metadata payload.",
            "- Side effects: output artifact materialization for Data Layer ingestion.",
          ]}
          plainStructured
          collapsible
        />

        <SectionBlock
          id="3-execution-model"
          title="3. Execution Model"
          body={[
            "MVP execution model is single-operation execution per task.",
            "Current conceptual path: Input File -> Processor -> Output File.",
            "Future compatibility: pipeline execution is supported conceptually through the same contract, without changing DSP interface semantics.",
          ]}
          collapsible
        />

        <SectionBlock id="4-dsp-contract-critical" title="4. DSP Contract (Critical)" body={["Canonical request/response/error contracts for DSP processing execution."]} collapsible>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-100">Input Contract</h3>
              <pre className="mt-2 overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-3 text-xs text-slate-200 md:text-sm">{inputContract}</pre>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-100">Output Contract</h3>
              <pre className="mt-2 overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-3 text-xs text-slate-200 md:text-sm">{outputContract}</pre>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-100">Error Contract</h3>
              <pre className="mt-2 overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-3 text-xs text-slate-200 md:text-sm">{errorContract}</pre>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock
          id="5-processor-model"
          title="5. Processor Model"
          body={[
            "Processor is a uniform execution unit with a single transformation interface.",
            "Processor model requirement: stateless execution.",
            "Conceptual definition: Processor = Pure Transformation Function.",
            "Processor behavior must depend only on explicit input contract and params for deterministic output generation.",
          ]}
          collapsible
        />

        <SectionBlock
          id="6-processor-types-mvp-only"
          title="6. Processor Types (MVP Only)"
          body={[
            "- normalize",
            "- gain",
            "- eq (preset-based)",
            "No advanced DSP scope is included in MVP documentation.",
          ]}
          collapsible
        />

        <SectionBlock
          id="7-dsp-engine-abstraction-layer"
          title="7. DSP Engine (Abstraction Layer)"
          body={[
            "DSP Engine defines execution interface, processor registry, and operation routing.",
            "Execution interface: receives DSP input contract and returns DSP output/error contract.",
            "Processor registry: maps operation name to processor implementation target.",
            "Operation routing: resolves requested operation to the matching processor via registry.",
            "DSP Layer is backend-agnostic and is not tied to Python.",
          ]}
          collapsible
        />

        <SectionBlock
          id="8-execution-flow-system-integration"
          title="8. Execution Flow (System Integration)"
          body={[
            "QAgent -> API -> DSP Layer -> Output -> Data Layer.",
            "DSP starts after API execution selects a processing operation and passes a valid DSP input contract.",
            "DSP ends when output artifact and metadata are emitted using DSP output/error contract.",
            "Returned payload includes job status, output_file, and metadata for downstream storage and status projection.",
          ]}
          collapsible
        />

        <SectionBlock
          id="9-state-behavior"
          title="9. State & Behavior"
          body={[
            "DSP is stateless between runs.",
            "No memory continuity is retained across independent processing tasks.",
            "Execution is deterministic for the same input contract and parameters.",
          ]}
          collapsible
        />

        <SectionBlock
          id="10-constraints"
          title="10. Constraints"
          body={[
            "DSP has no UI awareness.",
            "DSP has no user decision or user logic ownership.",
            "DSP has no billing enforcement responsibility.",
            "DSP has no orchestration authority.",
          ]}
          collapsible
        />

        <SectionBlock
          id="11-metering-awareness"
          title="11. Metering Awareness"
          body={[
            "DSP does not enforce billing policy.",
            "DSP exposes processing duration and processing metadata.",
            "API Layer consumes exposed DSP metadata for metering and reporting responsibilities.",
          ]}
          collapsible
        />

        <SectionBlock
          id="12-future-compatibility"
          title="12. Future Compatibility"
          body={[
            "DSP interface must remain stable across backend implementations.",
            "Supported backend targets must include Python, C++, and WASM without interface change.",
            "Backend replacement/extension must not alter input/output/error contract semantics.",
          ]}
          collapsible
        />

        <SectionBlock
          id="source-of-truth"
          title="Source of Truth"
          body={[
            "Canonical layer page: /docs/dsp-layer.",
            "DSP Engine Abstraction page is a child specification and must not redefine layer contracts.",
          ]}
          collapsible
        >
          <Link href="/docs/architecture/dagent/dsp-engine-abstraction" className="font-medium text-[var(--accent)] hover:underline">
            Open DSP Engine Abstraction (child page)
          </Link>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
