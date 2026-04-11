import { DocsContent } from "@/components/layout/DocsContent";
import { DocsDiagram } from "@/components/ui/DocsDiagram";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

import { DSP_LAYER_HUB_LINKS } from "@/lib/docs-scope-links";
const coreAreas = [
  "layer definition and system position",
  "execution responsibilities and model",
  "processor and engine execution structure",
  "state guarantees, constraints, and compatibility",
];

const relatedBoundaries = [
  "Core Specification = behavioral authority for DSP layer.",
  "Contracts = communication and payload agreement authority.",
  "Processing Engine = internal execution architecture authority.",
  "System Integration = cross-layer DSP boundary authority.",
];

const inThisPage = [
  { title: "Overview", subtitle: "Scope and boundary context.", href: "#overview" },
  { title: "Core Structure Diagram", subtitle: "Behavior model topology.", href: "#core-structure-diagram" },
  { title: "Core Details", subtitle: "Full core specification entries.", href: "#core-details" },
  { title: "Related Docs", subtitle: "Canonical cross-page authority.", href: "#related-docs" },
];

const coreDetails = [
  {
    id: "layer-definition",
    title: "Layer Definition",
    subtitle: "Identity and system position",
    purpose: "Define DSP role, boundaries, and upstream/downstream relation in WaveQ.",
    defines: [
      "DSP as deterministic processing execution unit.",
      "Relation to QAgent via API execution contracts.",
      "Relation to API Server runtime execution flow.",
      "Relation to Data Layer output and lineage emission.",
    ],
    doesNotDefine: "Orchestration policy, UI ownership, or billing enforcement.",
    href: "/docs/dsp-layer/core#1-layer-definition",
    linkLabel: "Deep spec",
  },
  {
    id: "responsibilities",
    title: "Responsibilities",
    subtitle: "Execution ownership model",
    purpose: "Define operational responsibilities inside DSP execution scope.",
    defines: [
      "Execution responsibility for processing task contract handling.",
      "Transformation responsibility from input artifact to transformed artifact.",
      "Artifact generation responsibility for output reference and metadata payload.",
    ],
    doesNotDefine: "Cross-layer orchestration or retry decision ownership.",
    href: "/docs/dsp-layer/core#2-responsibilities-refined",
    linkLabel: "Deep spec",
  },
  {
    id: "execution-model",
    title: "Execution Model",
    subtitle: "How DSP operates",
    purpose: "Define the runtime execution path for DSP task processing.",
    defines: [
      "Single-operation MVP execution per task.",
      "Canonical path: Input File -> Processor -> Output File.",
      "Pipeline compatibility without changing interface semantics.",
    ],
    doesNotDefine: "Job lifecycle ownership or global orchestration states.",
    href: "/docs/dsp-layer/core#3-execution-model",
    linkLabel: "Deep spec",
  },
  {
    id: "dsp-contract",
    title: "DSP Contract",
    subtitle: "Request/response/error boundary",
    purpose: "Reference canonical contracts required for DSP core behavior alignment.",
    defines: [
      "Input contract (`job_id`, `input_file`, `operation`, `params`).",
      "Output contract (`job_id`, `status`, `output_file`, `metadata`).",
      "Error contract (`status`, `error`).",
      "Metadata and compatibility declaration references.",
    ],
    doesNotDefine: "Alternative contract semantics outside canonical DSP contracts page.",
    href: "/docs/dsp-layer/contracts",
    linkLabel: "Canonical page",
  },
  {
    id: "processor-model",
    title: "Processor Model",
    subtitle: "Execution unit model",
    purpose: "Define processor abstraction used by DSP execution.",
    defines: [
      "Processor as uniform execution unit.",
      "Stateless transformation requirement.",
      "Pure transformation behavior from explicit input and params.",
    ],
    doesNotDefine: "Backend-specific algorithm implementation details.",
    href: "/docs/dsp-layer/core#5-processor-model",
    linkLabel: "Deep spec",
  },
  {
    id: "processor-types",
    title: "Processor Types",
    subtitle: "MVP operation set",
    purpose: "Define supported processing operation categories in DSP MVP scope.",
    defines: ["normalize", "gain", "eq (preset-based)"],
    doesNotDefine: "Advanced DSP processing scope beyond MVP.",
    href: "/docs/dsp-layer/core#6-processor-types-mvp-only",
    linkLabel: "Deep spec",
  },
  {
    id: "dsp-engine",
    title: "DSP Engine",
    subtitle: "Execution abstraction layer",
    purpose: "Define engine responsibilities for routing and processor execution interface.",
    defines: [
      "Execution interface from DSP input to output/error contracts.",
      "Processor registry mapping operation names to processors.",
      "Operation routing to matching processor targets.",
      "Backend-agnostic execution boundary.",
    ],
    doesNotDefine: "Binding DSP behavior to a single backend technology.",
    href: "/docs/dsp-layer/processing-engine",
    linkLabel: "Related section",
  },
  {
    id: "integration-flow",
    title: "Integration Flow",
    subtitle: "System integration execution path",
    purpose: "Define where DSP starts and ends in cross-layer processing flow.",
    defines: [
      "Flow: QAgent -> API -> DSP Layer -> Output -> Data Layer.",
      "DSP start point after API selects operation and validates input contract.",
      "DSP end point at output artifact and metadata emission.",
    ],
    doesNotDefine: "System-level orchestration policy outside DSP processing boundary.",
    href: "/docs/dsp-layer/system-integration",
    linkLabel: "Related section",
  },
  {
    id: "state-behavior",
    title: "State & Behavior",
    subtitle: "Runtime guarantees",
    purpose: "Define deterministic and stateless behavior guarantees for DSP execution.",
    defines: [
      "Stateless execution between runs.",
      "No memory continuity across independent tasks.",
      "Deterministic output for same contract and params.",
    ],
    doesNotDefine: "Persistent global state ownership.",
    href: "/docs/dsp-layer/core#9-state-behavior",
    linkLabel: "Deep spec",
  },
  {
    id: "constraints",
    title: "Constraints",
    subtitle: "Non-ownership boundaries",
    purpose: "Define strict boundaries that keep DSP focused on processing execution only.",
    defines: ["No UI awareness.", "No user decision ownership.", "No billing enforcement authority.", "No orchestration authority."],
    doesNotDefine: "Cross-layer responsibilities owned by API, QAgent, or Client.",
    href: "/docs/dsp-layer/core#10-constraints",
    linkLabel: "Deep spec",
  },
  {
    id: "metering-awareness",
    title: "Metering Awareness",
    subtitle: "Usage signal exposure",
    purpose: "Define metering-related metadata exposure boundary.",
    defines: [
      "DSP exposes processing duration and metadata signals.",
      "API consumes exposed signals for metering and reporting.",
      "DSP remains non-owner of billing enforcement policy.",
    ],
    doesNotDefine: "Billing policy execution or enforcement logic.",
    href: "/docs/dsp-layer/contracts#canonical-contract-definitions",
    linkLabel: "Related section",
  },
  {
    id: "future-compatibility",
    title: "Future Compatibility",
    subtitle: "Stable interface across backends",
    purpose: "Define interface stability expectations for backend evolution.",
    defines: [
      "Stable DSP interface semantics across backend targets.",
      "Backend compatibility for python, c++, and wasm targets.",
      "No contract semantic drift across backend replacement.",
    ],
    doesNotDefine: "Backend implementation details or optimization strategies.",
    href: "/docs/dsp-layer/contracts#canonical-contract-definitions",
    linkLabel: "Related section",
  },
] as const;

const relatedDocs = [
  "DSP Overview = layer-level map and navigation authority.",
  "DSP Contracts = canonical contract ownership authority.",
  "DSP Processing Engine = internal execution architecture authority.",
  "DSP System Integration = cross-layer DSP flow authority.",
  "DSP Core = deep behavioral reference authority.",
];

export default function DspCoreSpecificationPage() {
  return (
    <DocsContent>
      <PageTitle
        title="DSP / Processing Layer - Core Specification"
        description="Defines the behavioral model of the DSP layer: responsibilities, execution semantics, state guarantees, and constraints."
      />

      <DocsScopeBlocks links={DSP_LAYER_HUB_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="Core Specification is the behavioral authority for DSP. It defines what DSP does, how execution behaves, and which boundaries must remain invariant."
            areasTitle="Core concerns"
            areas={coreAreas}
            outOfScope="Detailed engine implementation internals and end-to-end orchestration ownership."
            relatedBoundaries={relatedBoundaries}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={inThisPage} />
        </SectionBlock>

        <SectionBlock id="core-structure-diagram" title="Core Structure Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="DSP Core Specification"
            groups={[
              { title: "Identity", items: ["Layer Definition", "Responsibilities"] },
              { title: "Runtime Model", items: ["Execution Model", "DSP Contract", "Processor Model", "Processor Types", "DSP Engine"] },
              { title: "Behavior & Boundaries", items: ["State & Behavior", "Constraints", "Metering Awareness"] },
              { title: "Integration & Evolution", items: ["Integration Flow", "Future Compatibility"] },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="core-details" title="Core Details" body={[]}>
          <LayerSpecAccordion items={[...coreDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs items={relatedDocs} />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
