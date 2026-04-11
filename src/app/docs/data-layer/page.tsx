import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { DocsDiagram } from "@/components/ui/DocsDiagram";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

import { DATA_LAYER_OVERVIEW_SCOPE_LINKS } from "@/lib/docs-scope-links";
const inPageLinks = [
  { title: "Overview", subtitle: "What this section contains.", href: "#overview" },
  { title: "Data Layer Diagram", subtitle: "Chapters and cross-layer context.", href: "#data-layer-overview-diagram" },
  { title: "Chapter Index", subtitle: "Deep-dive topics inside this section.", href: "#data-layer-chapters" },
  { title: "Data Layer Details", subtitle: "Scope of the overview page.", href: "#data-layer-details" },
  { title: "Related Docs", subtitle: "System placement and contracts.", href: "#related-docs" },
] as const;

const overviewDetails = [
  {
    id: "data-layer-section-scope",
    title: "Section Scope",
    subtitle: "What this overview covers",
    purpose: "Orient readers to the Data Layer documentation section versus runtime and API specifications.",
    defines: [
      "This section documents persistence ownership, canonical versus derived data, artifacts, metadata, and state records.",
      "Chapter pages expand ownership, canonical rules, persistence classes, and artifact policy without duplicating API or DSP execution specs.",
      "[TEXT TBD – expand Data Layer Overview detail]",
    ],
    doesNotDefine: "Database DDL, wire-level API payloads, DSP algorithms, or client UI state machines.",
    href: "/docs/data-layer/system-view",
    linkLabel: "System View",
  },
  {
    id: "data-layer-chapter-routing",
    title: "How to Navigate",
    subtitle: "Recommended reading order",
    purpose: "Point readers from placement to depth.",
    defines: [
      "Start with System View for cross-layer placement, then read chapters in any order based on your integration concern.",
      "Use Schema Registry and architecture contracts for governed schemas referenced by the Data Layer model.",
      "[TEXT TBD – expand Data Layer Overview detail]",
    ],
    doesNotDefine: "Orchestration sequencing across the entire WaveQ runtime.",
    href: "/docs/data-layer/data-ownership",
    linkLabel: "Data Ownership",
  },
] as const;

export default function DataLayerOverviewPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Data Layer"
        description="Canonical documentation for persistence, governed records, lineage, and data ownership boundaries across WaveQ."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Data Layer / Overview</p>

      <DocsScopeBlocks links={DATA_LAYER_OVERVIEW_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock
          id="overview"
          title="Overview"
          body={[]}
          summaryPreview="Top-level entry for the Data Layer docs: what lives here and how it relates to System, API, QAgent, Client, and DSP."
        >
          <DocsOverviewBlock
            intro="The Data Layer documentation section is the home for WaveQ persistence and canonical data governance. It separates durable truth from derived or runtime representations and documents how Client, QAgent, API Server, and DSP interact with stored data without blurring ownership."
            areasTitle="What you will find here"
            areas={[
              "System View: cross-layer placement and source-of-truth framing.",
              "Chapters on ownership, canonical versus derived data, persistence expectations, and artifact management.",
              "Pointers to schema and contract pages that govern stored entities.",
            ]}
            outOfScope="Runtime execution behavior, DSP mathematics, and API transport details."
            relatedBoundaries={[
              "Data Layer owns persistence governance; execution layers run work but do not redefine canonical ownership.",
              "API Server mediates access; QAgent consumes context; DSP produces artifacts; Client presents outputs.",
            ]}
          />
          <p className="mt-3 text-sm text-[var(--muted)]">
            System placement reference:{" "}
            <Link href="/docs/system/data-layer" className="font-medium text-[var(--accent)] hover:underline">
              Data Layer (System placement)
            </Link>
          </p>
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="data-layer-overview-diagram" title="Data Layer Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="Data Layer documentation"
            groups={[
              {
                title: "Entry",
                items: ["Overview (this page)", "System View (cross-layer placement)"],
              },
              {
                title: "Chapters",
                items: ["Data Ownership", "Canonical vs Derived", "Persistence Model", "Artifact Management"],
              },
              {
                title: "Adjacent specs",
                items: ["Schema Registry (contracts)", "API access patterns", "DSP artifact producers"],
              },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="data-layer-chapters" title="Chapter Index" body={[]}>
          <ul className="list-none space-y-2 text-sm text-[var(--muted)]">
            <li>
              <Link href="/docs/data-layer/system-view" className="font-medium text-[var(--accent)] hover:underline">
                Data Layer — System View
              </Link>
              <span className="block text-xs text-slate-500">Cross-layer placement and full architectural narrative.</span>
            </li>
            <li>
              <Link href="/docs/data-layer/data-ownership" className="font-medium text-[var(--accent)] hover:underline">
                Data Ownership
              </Link>
              <span className="block text-xs text-slate-500">Who owns persisted data versus producers and accessors.</span>
            </li>
            <li>
              <Link href="/docs/data-layer/canonical-data" className="font-medium text-[var(--accent)] hover:underline">
                Canonical vs Derived Data
              </Link>
              <span className="block text-xs text-slate-500">Source of truth versus projections and ephemeral copies.</span>
            </li>
            <li>
              <Link href="/docs/data-layer/persistence-model" className="font-medium text-[var(--accent)] hover:underline">
                Persistence Model
              </Link>
              <span className="block text-xs text-slate-500">Durable versus transient data classes.</span>
            </li>
            <li>
              <Link href="/docs/data-layer/artifact-management" className="font-medium text-[var(--accent)] hover:underline">
                Artifact Management
              </Link>
              <span className="block text-xs text-slate-500">DSP and execution outputs versus stored artifacts.</span>
            </li>
          </ul>
        </SectionBlock>

        <SectionBlock id="data-layer-details" title="Data Layer Details" body={[]}>
          <LayerSpecAccordion items={[...overviewDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              {
                href: "/docs/architecture/contracts/schema-registry",
                title: "Schema Registry",
                description: "Contract authority for governed schemas referenced by canonical data.",
              },
              {
                href: "/docs/api",
                title: "API Server",
                description: "Mediates access to persisted data without owning canonical definitions.",
              },
              {
                href: "/docs/system-flow",
                title: "System Flow",
                description: "Cross-layer runtime reference complementary to persistence topics here.",
              },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
