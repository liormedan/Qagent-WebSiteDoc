import { DocsContent } from "@/components/layout/DocsContent";
import { DocsDiagram } from "@/components/ui/DocsDiagram";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const inPageLinks = [
  { title: "Overview", subtitle: "Role of the Data Layer in WaveQ.", href: "#overview" },
  { title: "Data Layer Structure Diagram", subtitle: "Placement and source of truth.", href: "#data-layer-structure-diagram" },
  { title: "Data Ownership Model", subtitle: "Who owns what data.", href: "#data-ownership-model" },
  { title: "Canonical vs Derived Data", subtitle: "Truth vs projections.", href: "#canonical-vs-derived" },
  { title: "Data Flow Across Layers", subtitle: "Reads, writes, producers.", href: "#data-flow-across-layers" },
  { title: "Persistence Model", subtitle: "Durable vs transient classes.", href: "#persistence-model" },
  { title: "Artifact Management", subtitle: "DSP outputs and stored artifacts.", href: "#artifact-management" },
  { title: "State Records", subtitle: "Durable records vs runtime state.", href: "#state-records" },
  { title: "Boundaries & Responsibilities", subtitle: "Persistence vs execution.", href: "#boundaries-responsibilities" },
  { title: "Related Docs", subtitle: "Cross-layer references.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "data-ownership-model",
    title: "Data Ownership Model",
    subtitle: "Producers, owners, and access",
    purpose: "Clarify which layer owns persisted system data versus who may read or produce values without owning canonical persistence.",
    defines: [
      "Data Layer owns canonical persistence and governance for system entities referenced across runs.",
      "Upstream layers may produce payloads or artifacts, but ownership of durable truth remains with the Data Layer model.",
      "Access (API mediation, read paths) is distinct from ownership: control of access does not transfer persistence ownership.",
      "[TEXT TBD – expand Data Ownership Model detail]",
    ],
    doesNotDefine: "Physical storage technology and low-level schema definitions.",
    href: "/docs/data-layer/data-ownership",
    linkLabel: "Data Ownership chapter",
  },
  {
    id: "canonical-vs-derived",
    title: "Canonical vs Derived Data",
    subtitle: "Source of truth vs projections",
    purpose: "Separate durable canonical records from derived, temporary, or presentation-focused representations.",
    defines: [
      "Canonical data is the authoritative, persisted source of truth for entities the system relies on across sessions and runs.",
      "Derived data is computed, cached for presentation, or reconstructed for runtime UX and is not a substitute for canonical ownership.",
      "The distinction keeps execution and UI projections from silently replacing governed records.",
      "[TEXT TBD – expand Canonical vs Derived Data detail]",
    ],
    doesNotDefine: "Transformation implementation details and cache strategy design.",
    href: "/docs/data-layer/canonical-data",
    linkLabel: "Canonical vs Derived chapter",
  },
  {
    id: "data-flow-across-layers",
    title: "Data Flow Across Layers",
    subtitle: "Handoffs without collapsing ownership",
    purpose: "Describe how data moves between Client, QAgent, API Server, DSP, and the Data Layer at a system level.",
    defines: [
      "API Server mediates access to persisted data: validation and orchestration align with Data Layer boundaries without redefining ownership.",
      "DSP and execution pipelines produce artifacts and metadata that are persisted or linked under Data Layer rules.",
      "Client reads and presents data; it does not author canonical persistence authority.",
      "QAgent consumes data context for planning; it does not define canonical storage ownership.",
      "[TEXT TBD – expand Data Flow Across Layers detail]",
    ],
    doesNotDefine: "Full runtime sequencing and execution lifecycle behavior (see API and system flow references).",
    href: "/docs/system-flow",
    linkLabel: "System Flow",
  },
  {
    id: "persistence-model",
    title: "Persistence Model",
    subtitle: "What must be durable",
    purpose: "State what classes of information must persist versus what may remain transient in the architecture.",
    defines: [
      "Canonical entities, lineage references, and governed artifacts are expected to persist under Data Layer authority.",
      "Ephemeral coordination signals, in-flight UI buffers, and disposable previews remain outside canonical persistence unless promoted by policy.",
      "Durable records are distinguished from temporary projections used during execution.",
      "[TEXT TBD – expand Persistence Model detail]",
    ],
    doesNotDefine: "Database engine choice and infrastructure-specific storage topology.",
    href: "/docs/data-layer/persistence-model",
    linkLabel: "Persistence Model chapter",
  },
  {
    id: "artifact-management",
    title: "Artifact Management",
    subtitle: "Generated outputs vs canonical records",
    purpose: "Explain how DSP and execution outputs relate to stored artifacts and canonical records.",
    defines: [
      "DSP outputs (processed media, intermediate artifacts) are linked or stored according to Data Layer artifact policy.",
      "Generated artifacts remain accountable to canonical records: identifiers, lineage, and retention expectations apply at the data model level.",
      "Artifact management is a persistence concern, not a description of DSP algorithms.",
      "[TEXT TBD – expand Artifact Management detail]",
    ],
    doesNotDefine: "DSP execution logic and file encoding specifics.",
    href: "/docs/data-layer/artifact-management",
    linkLabel: "Artifact Management chapter",
  },
  {
    id: "state-records",
    title: "State Records",
    subtitle: "Durable references vs runtime state",
    purpose: "Define persisted state references and how they differ from runtime or engine-local state.",
    defines: [
      "State records reflect durable system state that must survive process boundaries and support traceability.",
      "They are distinct from in-memory execution state, engine lifecycle states, and volatile coordination snapshots.",
      "Versioning and lineage tie back to canonical records rather than transient runtime mirrors.",
      "[TEXT TBD – expand State Records detail]",
    ],
    doesNotDefine: "In-memory execution state and engine lifecycle states owned by runtime layers.",
    href: "/docs/api",
    linkLabel: "API Server",
  },
  {
    id: "boundaries-responsibilities",
    title: "Boundaries & Responsibilities",
    subtitle: "Persistence vs execution",
    purpose: "State strict ownership boundaries between persistence, orchestration, processing, and presentation.",
    defines: [
      "Data Layer owns persistence, not execution: it governs what is stored and referenced, not how jobs run moment-to-moment.",
      "API Server controls access to data: it mediates reads and writes without becoming the canonical owner of stored truth.",
      "DSP may produce outputs and artifacts but does not own canonical persistence policy.",
      "Client may consume or present data but is not the source of truth for governed system records.",
      "QAgent uses data context for planning and decisions but does not define data ownership or storage authority.",
    ],
    doesNotDefine: "API orchestration algorithms, DSP signal logic, or client UI state machine definitions.",
    href: "/docs/data-layer",
    linkLabel: "Data Layer Overview",
  },
] as const;

export default function DataLayerSystemViewPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Data Layer - System View"
        description="Defines how data is structured, stored, and managed across the WaveQ system, including ownership boundaries and data flow between layers."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Data Layer / System View</p>

      <DocsScopeBlocks
        covers="data ownership and boundaries; canonical vs derived data; persistence responsibilities; system-level data flow; source of truth positioning."
        doesNotCover="API contracts; DSP processing logic; database schema implementation; client state management; runtime execution lifecycle."
      />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock
          id="overview"
          title="Overview"
          body={[]}
          summaryPreview="Canonical persistence, derived representations, and how the Data Layer differs from runtime and API behavior."
        >
          <DocsOverviewBlock
            intro="The Data Layer is the source of truth for persistent system data in WaveQ. It defines how data is owned, stored, and accessed across layers, separating canonical records from derived or runtime representations that surfaces and pipelines use for execution and presentation."
            areasTitle="Architectural intent"
            areas={[
              "Persistence boundaries: what must be durable versus what remains transient outside canonical scope.",
              "System-level data flow: how artifacts, metadata, and state records relate to Client, QAgent, API Server, and DSP without collapsing layers.",
              "Separation from execution: storage and ownership are specified here; runtime behavior and processing logic are specified elsewhere.",
            ]}
            outOfScope="Database DDL, API payload schemas, DSP algorithms, and client UI state ownership."
            relatedBoundaries={[
              "Data Layer owns persistence governance, not execution engines.",
              "API Server controls access to persisted data; it does not replace canonical ownership.",
              "DSP produces outputs and artifacts; it does not define canonical storage ownership.",
              "Client presents data; it is not the system source of truth.",
              "QAgent uses data context; it does not own persistence definitions.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="data-layer-structure-diagram" title="Data Layer Structure Diagram" body={[]}>
          <p className="mb-3 text-sm text-[var(--muted)]">
            Cross-layer placement showing the Data Layer as the persistence source of truth between upstream orchestration and downstream processing.
          </p>
          <DocsDiagram
            mode="structure"
            root="WaveQ System"
            groups={[
              {
                title: "Client",
                items: ["User-facing interaction", "Consumes and presents data; not source of truth"],
              },
              {
                title: "QAgent",
                items: ["Planning and intent", "Uses data context; does not own persistence"],
              },
              {
                title: "API Server",
                items: ["Orchestration and access control", "Mediates access to Data Layer"],
              },
              {
                title: "Data Layer",
                items: ["Canonical Data", "Artifacts", "Metadata", "State Records", "Source of truth for persistence"],
              },
              {
                title: "DSP",
                items: ["Processing and outputs", "Produces artifacts; no canonical storage ownership"],
              },
            ]}
          />
          <p className="mt-2 text-xs text-slate-500">
            Architecture placement only: no database tables, schema fields, API payloads, DSP engine internals, job lifecycle detail, or client state internals.
          </p>
        </SectionBlock>

        <SectionBlock id="data-layer-details" title="Data Layer Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              {
                href: "/docs/data-layer",
                title: "Data Layer Overview",
                description: "Section home and chapter index for Data Layer documentation.",
              },
              {
                href: "/docs/api",
                title: "API Server",
                description: "Controls and mediates access to the Data Layer.",
              },
              {
                href: "/docs/q-agent",
                title: "QAgent",
                description: "Consumes and uses data context; does not own persistence.",
              },
              {
                href: "/docs/dsp-layer",
                title: "DSP / Processing Layer",
                description: "Produces artifacts and metadata; does not define canonical storage ownership.",
              },
              {
                href: "/docs/system-flow",
                title: "System Integration",
                description: "Subsystem flow reference; this page covers persistence ownership and data structure boundaries.",
              },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
