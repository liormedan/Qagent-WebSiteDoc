import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { DocsDiagram } from "@/components/ui/DocsDiagram";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

import { systemLayerDocLinks } from "@/lib/docs-scope-links";
const inPageLinks = [
  { title: "Overview", subtitle: "Placement in System docs.", href: "#overview" },
  { title: "Placement Diagram", subtitle: "Internal pillars and neighbors.", href: "#system-data-layer-diagram" },
  { title: "Data Layer Details", subtitle: "Chapters at system abstraction.", href: "#system-data-layer-details" },
] as const;

const details = [
  {
    id: "data-layer-system-purpose",
    title: "Layer Purpose (System map)",
    subtitle: "Persistence source of truth",
    purpose: "State why the Data Layer exists on the system map and how it relates to other WaveQ layers at a summary level.",
    defines: [
      "Canonical persistence and governed records as documented in the Data Layer section.",
      "Artifacts, metadata, and durable state records as first-class persistence concerns.",
      "This System page orients only; full structure lives under /docs/data-layer.",
    ],
    doesNotDefine: "API `/run` contracts, DSP algorithms, or client UI state ownership.",
    href: "/docs/data-layer",
    linkLabel: "Data Layer section",
  },
  {
    id: "data-canonical-derived",
    title: "Canonical vs Derived",
    subtitle: "Truth versus projections",
    purpose: "Summarize how the Data Layer documentation separates authoritative records from derived projections.",
    defines: [
      "Canonical data as persisted source of truth across sessions and runs.",
      "Derived or presentation-oriented data as non-authoritative unless promoted by policy.",
    ],
    doesNotDefine: "transformation algorithms or cache invalidation implementation.",
    href: "/docs/data-layer/canonical-data",
    linkLabel: "Canonical vs Derived chapter",
  },
  {
    id: "data-ownership-model",
    title: "Data Ownership Model",
    subtitle: "Owner, producer, accessor",
    purpose: "Capture ownership model headlines from the Data Layer system view without duplicating chapter prose.",
    defines: [
      "Data Layer owns canonical persistence governance.",
      "Producer layers may emit artifacts; governed ownership remains with Data Layer policy.",
      "API Server mediates access without becoming canonical owner; Client and QAgent consume context.",
    ],
    doesNotDefine: "table-level DDL or storage engine configuration.",
    href: "/docs/data-layer/data-ownership",
    linkLabel: "Data Ownership chapter",
  },
  {
    id: "data-persistence-state",
    title: "Persistence Model & State Records",
    subtitle: "Durable vs transient",
    purpose: "Point to persistence classes and durable state records as documented in Data Layer chapters.",
    defines: [
      "Persistence model expectations for durable versus transient data classes.",
      "State records as durable references distinct from runtime-only mirrors.",
    ],
    doesNotDefine: "backup topology or database product selection.",
    href: "/docs/data-layer/persistence-model",
    linkLabel: "Persistence Model chapter",
  },
  {
    id: "data-artifact-management",
    title: "Artifact Management",
    subtitle: "Outputs linked to canonical records",
    purpose: "Summarize artifact accountability as documented under Data Layer artifact management.",
    defines: [
      "Artifacts registered or stored under Data Layer policy with lineage to canonical entities.",
      "DSP and execution paths as producers; Data Layer defines accountability, not transform math.",
    ],
    doesNotDefine: "DSP codec or container format specifications.",
    href: "/docs/data-layer/artifact-management",
    linkLabel: "Artifact Management chapter",
  },
  {
    id: "data-cross-layer-boundaries",
    title: "Cross-Layer Boundaries",
    subtitle: "Interfaces, not internals",
    purpose: "List how Client, QAgent, API Server, and DSP relate to the Data Layer without collapsing ownership.",
    defines: [
      "API Server: mediated reads and writes; not canonical persistence owner.",
      "QAgent: consumes context; does not own persistence definitions.",
      "Client: consumes projections; not source of governed truth.",
      "DSP: produces artifacts; does not own canonical storage policy.",
    ],
    doesNotDefine: "orchestration sequencing or endpoint-level API reference.",
    href: "/docs/data-layer/system-view",
    linkLabel: "Data Layer System View",
  },
  {
    id: "data-canonical-nav",
    title: "Canonical Navigation",
    subtitle: "Where depth lives",
    purpose: "Direct readers from the System IA stub to the authoritative Data Layer documentation set.",
    defines: [
      "Section overview at /docs/data-layer for chapter index.",
      "Cross-layer narrative at /docs/data-layer/system-view for full placement and detail entries.",
    ],
    doesNotDefine: "duplicated long-form system view content on this System stub page.",
    href: "/docs/data-layer/system-view",
    linkLabel: "System View",
  },
] as const;

export default function SystemDataLayerPlacementPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Data Layer (System placement)"
        description="Short System-oriented pointer: where the Data Layer sits relative to other layers, with links to the top-level Data Layer documentation section."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: System / Data Layer</p>

      <DocsScopeBlocks links={systemLayerDocLinks("/docs/data-layer")} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]} summaryPreview="System map entry for Data Layer; canonical content lives under the Data Layer tab.">
          <DocsOverviewBlock
            intro="Within System documentation, this page orients the Data Layer as the persistence and canonical-data authority between upstream orchestration and downstream processing. Detailed narratives, diagrams, and chapters now live in the top-level Data Layer section to avoid duplicate long-form content."
            areasTitle="Navigate next"
            areas={[
              "Data Layer overview and chapter index: /docs/data-layer",
              "Cross-layer System View inside Data Layer: /docs/data-layer/system-view",
              "End-to-end system flow (runtime complement): /docs/system-flow",
            ]}
            outOfScope="Duplicating the full Data Layer System View body on this page."
            relatedBoundaries={[
              "System View pages summarize placement; Data Layer section owns persistence depth.",
              "API, QAgent, Client, and DSP pages remain authoritative for their respective behaviors.",
            ]}
          />
          <p className="mt-3 text-sm text-[var(--muted)]">
            Open the Data Layer section:{" "}
            <Link href="/docs/data-layer" className="font-medium text-[var(--accent)] hover:underline">
              /docs/data-layer
            </Link>
            {" · "}
            <Link href="/docs/data-layer/system-view" className="font-medium text-[var(--accent)] hover:underline">
              System View
            </Link>
          </p>
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="system-data-layer-diagram" title="Placement Diagram" body={[]}>
          <p className="mb-3 text-sm text-[var(--muted)]">
            Internal pillars match /docs/data-layer chapters; neighbor row matches cross-layer interfaces from Data Layer System View—no schemas, APIs, or sequencing graphs.
          </p>
          <DocsDiagram
            mode="structure"
            root="Data Layer"
            groups={[
              {
                title: "Persistence pillars",
                items: ["Canonical data", "Derived boundaries (policy)", "Artifacts (governed)", "Metadata"],
              },
              {
                title: "Model & records",
                items: ["Data ownership model", "Canonical vs derived", "Persistence model", "State records"],
              },
              {
                title: "Neighbors (interfaces)",
                items: ["API Server Layer (mediated access)", "QAgent Layer (context)", "Client Layer (consumption)", "DSP / Processing Layer (artifact producer)"],
              },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="system-data-layer-details" title="Data Layer Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
