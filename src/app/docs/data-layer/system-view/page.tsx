import { DocsContent } from "@/components/layout/DocsContent";
import { DocsDiagram } from "@/components/ui/DocsDiagram";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

import { DATA_LAYER_SUBPAGE_SCOPE_LINKS } from "@/lib/docs-scope-links";
/** In-page anchors follow document order: Overview → diagram → detail entries → related. */
const inPageLinks = [
  { title: "Overview", subtitle: "What the Data Layer is and why it exists.", href: "#overview" },
  {
    title: "Data Layer Placement Diagram",
    subtitle: "Where persistence sits relative to other layers.",
    href: "#data-layer-placement-diagram",
  },
  {
    title: "Data Flow Across Layers",
    subtitle: "Who exchanges data with the Data Layer and in what direction.",
    href: "#data-flow-across-layers",
  },
  {
    title: "Data Ownership Model",
    subtitle: "Owner vs producer vs accessor.",
    href: "#data-ownership-model",
  },
  {
    title: "Canonical vs Derived Data",
    subtitle: "Source of truth versus projections.",
    href: "#canonical-vs-derived",
  },
  { title: "Persistence Model", subtitle: "Durable, transient, and lifecycle framing.", href: "#persistence-model" },
  { title: "State Records", subtitle: "Durable references vs runtime-only state.", href: "#state-records" },
  {
    title: "Artifact Management",
    subtitle: "Outputs, storage relationship, and canonical linkage.",
    href: "#artifact-management",
  },
  {
    title: "Boundaries & Responsibilities",
    subtitle: "Cross-layer separation and read/write framing.",
    href: "#boundaries-responsibilities",
  },
  { title: "Related Docs", subtitle: "Deeper specs in other sections.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "data-flow-across-layers",
    title: "Data Flow Across Layers",
    subtitle: "Movement and direction, not sequencing or APIs",
    purpose:
      "Explain how data moves between the Data Layer and other WaveQ layers at an architectural level, without prescribing execution order or wire contracts.",
    defines: [
      "API Server ↔ Data Layer: the API mediates reads and writes against persisted truth; it does not become the owner of canonical records.",
      "DSP → Data Layer: processing emits artifacts and related metadata that are registered or stored under Data Layer policy (producer ≠ owner).",
      "Client ← Data Layer: the client consumes projections and references for presentation; it does not author canonical persistence.",
      "QAgent → Data Layer: planning consumes data context and references governed records; QAgent does not own where canonical truth is stored.",
    ],
    doesNotDefine: "Execution sequencing, concrete API endpoints, queue/worker runtime behavior, or orchestration timelines.",
    href: "/docs/data-layer/data-ownership",
    linkLabel: "Data Ownership chapter",
  },
  {
    id: "data-ownership-model",
    title: "Data Ownership Model",
    subtitle: "Who owns truth versus who touches it",
    purpose:
      "Define ownership boundaries for data so producer, owner, and accessor roles stay distinct across layers.",
    defines: [
      "The Data Layer owns canonical persistence governance for system entities the architecture treats as durable truth.",
      "Producer layers (e.g. DSP, execution paths) may create payloads or artifacts; ownership of governed records remains with the Data Layer unless explicitly promoted by policy.",
      "Read responsibility: layers may read through mediated access (e.g. API) without acquiring ownership of stored truth.",
      "Write responsibility: writes that change canonical state are initiated via controlled paths; access mediation does not transfer persistence ownership to the API.",
    ],
    doesNotDefine: "Concrete storage engines, table layouts, or schema DDL.",
    href: "/docs/data-layer/data-ownership",
    linkLabel: "Data Ownership chapter",
  },
  {
    id: "canonical-vs-derived",
    title: "Canonical vs Derived Data",
    subtitle: "Types of data and why the split matters",
    purpose:
      "Clarify which data counts as authoritative versus derived so projections cannot silently replace governed records.",
    defines: [
      "Canonical data: the authoritative, persisted source of truth the system relies on across sessions and runs.",
      "Derived data: computed, session-local, or presentation-oriented values rebuilt from canonical inputs or ephemeral coordination.",
      "The distinction matters so UI, caches, and execution mirrors cannot be mistaken for durable governance without an explicit promotion path.",
    ],
    doesNotDefine: "Transformation algorithms, cache invalidation rules, or materialized view implementation.",
    href: "/docs/data-layer/canonical-data",
    linkLabel: "Canonical vs Derived chapter",
  },
  {
    id: "persistence-model",
    title: "Persistence Model",
    subtitle: "What must survive, what may be ephemeral",
    purpose:
      "Define conceptually what must persist, what may remain transient, and how durable records relate to lifecycle—not how disks are provisioned.",
    defines: [
      "Must persist: governed entities, lineage and references needed for traceability, and artifacts/metadata under Data Layer retention policy.",
      "May be transient: in-flight coordination, disposable previews, and engine-local buffers unless explicitly promoted into canonical scope.",
      "Lifecycle: durable records are the continuity anchor; transient state is discardable when it does not carry governed meaning.",
    ],
    doesNotDefine: "Database product choice, cluster topology, backup mechanics, or infrastructure provisioning.",
    href: "/docs/data-layer/persistence-model",
    linkLabel: "Persistence Model chapter",
  },
  {
    id: "state-records",
    title: "State Records",
    subtitle: "Durable references vs runtime-only mirrors",
    purpose:
      "Isolate durable state records from transient runtime mirrors so traceable system state is not conflated with engine-local or in-flight data.",
    defines: [
      "State records (durable): persisted references to system state that must survive process boundaries, support traceability, and remain distinct from runtime-only mirrors.",
      "They are distinct from in-memory execution state, engine lifecycle states, and volatile coordination snapshots.",
      "Versioning and lineage tie back to canonical records rather than transient runtime mirrors.",
    ],
    doesNotDefine: "In-memory execution state and engine lifecycle states owned by runtime layers.",
    href: "/docs/data-layer/persistence-model",
    linkLabel: "Persistence Model chapter",
  },
  {
    id: "artifact-management",
    title: "Artifact Management",
    subtitle: "From output to governed stored object",
    purpose:
      "Define how outputs become artifacts under Data Layer rules, and how artifacts relate to canonical data—without describing DSP math or file formats.",
    defines: [
      "Artifact creation: execution and DSP paths produce outputs that become artifacts when registered or stored according to Data Layer policy.",
      "Storage relationship: artifacts are linked to identifiers, lineage, or parent canonical entities so they remain accountable to governed records.",
      "Link to canonical data: artifacts are not a separate truth plane; they remain tied to canonical ownership and retention semantics.",
    ],
    doesNotDefine: "DSP algorithms, codec or container formats, or processing pipeline internals.",
    href: "/docs/data-layer/artifact-management",
    linkLabel: "Artifact Management chapter",
  },
  {
    id: "boundaries-responsibilities",
    title: "Boundaries & Responsibilities",
    subtitle: "Cross-layer separation at a glance",
    purpose:
      "Centralize how persistence ownership, read paths, write paths, and layer responsibilities stay separated so architectural roles do not collapse into one another.",
    defines: [
      "Ownership boundaries: the Data Layer remains the canonical persistence authority; other layers do not redefine governed truth by mediating access or producing outputs.",
      "Read vs write rules: reads may traverse mediators (e.g. API) without transferring persistence ownership; writes that change canonical state follow controlled persistence paths and remain accountable to Data Layer governance.",
      "Separation between layers: Client presents and consumes projections; QAgent consumes data context for planning; API Server mediates access; DSP produces artifacts and processing outputs—each without becoming the owner of canonical stored truth.",
    ],
    doesNotDefine: "API orchestration algorithms, DSP signal processing, client UI state machines, or storage implementation.",
    href: "/docs/data-layer",
    linkLabel: "Data Layer Overview",
  },
] as const;

export default function DataLayerSystemViewPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Data Layer - System View"
        description="Cross-layer view of persistence: source of truth, directional data exchange with other layers, and boundaries—without contracts, execution logic, or storage implementation."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Data Layer / System View</p>

      <DocsScopeBlocks links={DATA_LAYER_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock
          id="overview"
          title="Overview"
          body={[]}
          summaryPreview="What the Data Layer is, its role in WaveQ, and its position as persistence source of truth—at a glance."
        >
          <DocsOverviewBlock
            intro="The Data Layer is WaveQ's persistence and canonical-data boundary: it is where governed, durable truth for the architecture lives. Other layers orchestrate, process, or present work; they interact with stored data through defined relationships but do not replace this boundary as the owner of canonical persistence."
            areasTitle="This page defines"
            areas={[
              "What the Data Layer is and why it exists as the system's persistence source of truth.",
              "Its role relative to execution, access mediation, processing, and presentation—without specifying internal storage layout or wire contracts.",
            ]}
            outOfScope="Internal storage structure, API payloads, execution sequencing, DSP algorithms, and client UI state machines."
            relatedBoundaries={[
              "Does not define internal physical structure of stores—only architectural persistence responsibility.",
              "Does not define contracts or execution logic—those belong to API, runtime, and layer-specific specs.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="data-layer-placement-diagram" title="Data Layer Placement Diagram" body={[]}>
          <p className="mb-3 text-sm text-[var(--muted)]">
            Placement only: shows where the Data Layer sits as persistence source of truth. It does not define data flow sequencing, API shapes, or store internals.
          </p>
          <DocsDiagram
            mode="structure"
            root="WaveQ System"
            groups={[
              {
                title: "Client",
                items: ["Presentation and interaction", "Consumes data from the system; not canonical owner"],
              },
              {
                title: "QAgent",
                items: ["Planning and context", "Uses Data Layer context; does not own persistence"],
              },
              {
                title: "API Server",
                items: ["Access mediation", "Reads and writes go through controlled paths; not owner of canonical truth"],
              },
              {
                title: "Data Layer",
                items: ["Canonical records", "Artifacts (governed)", "Metadata", "Durable state references", "Source of truth"],
              },
              {
                title: "DSP",
                items: ["Processing outputs", "Produces artifacts; does not own canonical storage policy"],
              },
            ]}
          />
          <p className="mt-2 text-xs text-slate-500">
            Not shown here: database tables, field-level schemas, REST paths, job timelines, DSP internals, or client state graphs.
          </p>
        </SectionBlock>

        <SectionBlock id="details" title="Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              {
                href: "/docs/data-layer",
                title: "Data Layer Overview",
                description: "Section home and chapter index.",
              },
              {
                href: "/docs/data-layer/data-ownership",
                title: "Data Ownership",
                description: "Deep dive on ownership and access versus persistence ownership.",
              },
              {
                href: "/docs/data-layer/canonical-data",
                title: "Canonical vs Derived Data",
                description: "Truth versus projections and promotion boundaries.",
              },
              {
                href: "/docs/data-layer/persistence-model",
                title: "Persistence Model",
                description: "Durable classes, transience, and lifecycle expectations.",
              },
              {
                href: "/docs/data-layer/artifact-management",
                title: "Artifact Management",
                description: "Artifacts, lineage, and relationship to canonical records.",
              },
              {
                href: "/docs/api",
                title: "API Server",
                description: "Where access mediation and execution-facing contracts are specified.",
              },
              {
                href: "/docs/system-flow",
                title: "System Flow",
                description: "Subsystem flow reference; sequencing is not defined on this page.",
              },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
