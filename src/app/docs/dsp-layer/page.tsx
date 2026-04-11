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
const dspAreas = [
  "core behavior definition",
  "contract ownership and payload boundaries",
  "processing engine execution structure",
  "system integration and execution handoff",
];

const relatedBoundaries = [
  "DSP Layer = deterministic transformation execution boundary.",
  "API Server Layer = job orchestration and status authority.",
  "QAgent Layer = intent and plan authority.",
  "Data Layer = canonical artifact persistence authority.",
];

const inPageItems = [
  { title: "Overview", subtitle: "Scope and ownership boundaries.", href: "#overview" },
  { title: "DSP Structure Diagram", subtitle: "Core, contracts, engine, integration.", href: "#dsp-structure-diagram" },
  { title: "DSP Details", subtitle: "Canonical sections and deep links.", href: "#dsp-details" },
  { title: "Related Docs", subtitle: "Cross-page authority boundaries.", href: "#related-docs" },
];

const dspDetails = [
  {
    id: "dsp-core-specification",
    title: "Core Specification",
    subtitle: "Behavioral model",
    purpose: "Defines DSP behavior, execution semantics, state guarantees, and constraints.",
    defines: ["layer definition and responsibilities", "execution model and behavior invariants", "non-ownership constraints"],
    doesNotDefine: "backend-specific implementation internals.",
    href: "/docs/dsp-layer/core",
    linkLabel: "Deep spec",
  },
  {
    id: "dsp-contracts",
    title: "Contracts",
    subtitle: "Interface and payload agreement",
    purpose: "Defines canonical request, result, error, metadata, and compatibility contract surfaces.",
    defines: ["execution/result/error contract boundaries", "metadata and metering contract scope", "compatibility declaration fields"],
    doesNotDefine: "processing algorithm behavior.",
    href: "/docs/dsp-layer/contracts",
    linkLabel: "Canonical page",
  },
  {
    id: "dsp-processing-engine",
    title: "Processing Engine",
    subtitle: "Internal execution architecture",
    purpose: "Defines processor organization, routing, and engine lifecycle semantics.",
    defines: ["processor model and processor types", "internal routing and execution coordination", "engine lifecycle states"],
    doesNotDefine: "API-level orchestration policy.",
    href: "/docs/dsp-layer/processing-engine",
    linkLabel: "Deep spec",
  },
  {
    id: "dsp-system-integration",
    title: "System Integration",
    subtitle: "Cross-layer coordination",
    purpose: "Defines where DSP starts and ends in the WaveQ cross-layer execution path.",
    defines: ["handoff from API into DSP", "output emission toward Data Layer", "cross-layer integration boundary"],
    doesNotDefine: "job lifecycle ownership.",
    href: "/docs/dsp-layer/system-integration",
    linkLabel: "Deep spec",
  },
  {
    id: "dsp-execution-flow",
    title: "Execution Flow",
    subtitle: "Runtime path",
    purpose: "Defines the canonical flow from input artifact to output artifact.",
    defines: ["Input File -> Processor -> Output File", "single-operation MVP execution", "deterministic execution path"],
    doesNotDefine: "multi-job orchestration semantics.",
    href: "/docs/dsp-layer/core#8-execution-flow-system-integration",
    linkLabel: "Related section",
  },
  {
    id: "dsp-boundaries",
    title: "Boundaries",
    subtitle: "Non-ownership rules",
    purpose: "Defines strict boundaries that keep DSP focused on processing execution only.",
    defines: ["no UI awareness", "no billing enforcement", "no orchestration authority"],
    doesNotDefine: "system-level control policy.",
    href: "/docs/dsp-layer/core#10-constraints",
    linkLabel: "Related section",
  },
] as const;

const relatedDocs = [
  "DSP Layer = processing execution authority.",
  "DSP Contracts page = canonical contract ownership.",
  "DSP Core Specification = behavioral authority.",
  "DSP Processing Engine = internal execution architecture authority.",
  "DSP System Integration = cross-layer DSP boundary authority.",
];

export default function DspLayerOverviewPage() {
  return (
    <DocsContent>
      <PageTitle title="DSP / Processing Layer" description="Execution layer for deterministic audio transformations." />

      <DocsScopeBlocks links={DSP_LAYER_HUB_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="DSP Layer is the processing execution boundary in WaveQ. It executes deterministic transformations and emits output artifacts and metadata for downstream storage and reporting."
            areasTitle="DSP concerns"
            areas={dspAreas}
            outOfScope="UI logic, billing enforcement, orchestration ownership, and backend-specific implementation strategy."
            relatedBoundaries={relatedBoundaries}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={inPageItems} />
        </SectionBlock>

        <SectionBlock id="dsp-structure-diagram" title="DSP Structure Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="DSP / Processing Layer"
            groups={[
              { title: "Core", items: ["Layer Definition", "Responsibilities", "Execution Model", "State & Behavior", "Constraints"] },
              { title: "Contracts", items: ["Execution Contract", "Result Contract", "Error Contract", "Metadata Contract", "Compatibility"] },
              { title: "Processing Engine", items: ["Processor Model", "Processor Types", "Routing", "Engine Lifecycle"] },
              { title: "System Integration", items: ["API -> DSP Handoff", "DSP -> Data Emission", "Execution Flow Boundary"] },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="dsp-details" title="DSP Details" body={[]}>
          <LayerSpecAccordion items={[...dspDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs items={relatedDocs} />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
