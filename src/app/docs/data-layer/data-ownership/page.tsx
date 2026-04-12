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
const inPageLinks = [
  { title: "Overview", subtitle: "Ownership framing.", href: "#overview" },
  { title: "Ownership Diagram", subtitle: "Producers vs owners.", href: "#data-ownership-diagram" },
  { title: "Data Layer Details", subtitle: "Ownership topics.", href: "#data-ownership-details" },
  { title: "Related Docs", subtitle: "Cross references.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "ownership-core",
    title: "Ownership Core",
    subtitle: "Data Layer as owner",
    purpose: "State that canonical persisted data is owned by the Data Layer model, not by producers or accessors.",
    defines: [
      "Data Layer governs which entities are canonical and how lineage and references remain stable across runs.",
      "Producers (DSP, pipelines) and accessors (API, Client) interact with data under policies defined here.",
    ],
    doesNotDefine: "Physical storage engines and per-table DDL.",
    href: "/docs/data-layer/system-view",
    linkLabel: "System View",
  },
  {
    id: "access-vs-ownership",
    title: "Access vs Ownership",
    subtitle: "API and Client",
    purpose: "Separate mediated access from persistence ownership.",
    defines: [
      "API Server controls access paths; ownership of canonical truth remains with the Data Layer.",
      "Client presents data; it does not become the persistence owner by rendering or caching.",
    ],
    doesNotDefine: "API authentication mechanics and client cache eviction policies.",
    href: "/docs/api",
    linkLabel: "API Server",
  },
] as const;

export default function DataOwnershipPage() {
  return (
    <DocsContent>
      <PageTitle title="Data Ownership" description="Who owns persisted WaveQ data, how producers and accessors relate to the Data Layer, and access versus ownership boundaries." />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Data Layer / Data Ownership</p>

      <DocsScopeBlocks links={DATA_LAYER_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]} summaryPreview="Ownership rules for canonical data and how this chapter extends the System View.">
          <DocsOverviewBlock
            intro="Data Ownership documents which layer owns persisted truth, how producers hand off artifacts without assuming storage authority, and why API and Client access does not transfer ownership. It narrows the System View ownership narrative into implementable boundaries."
            areasTitle="Focus areas"
            areas={[
              "Canonical owner: Data Layer persistence governance.",
              "Producers: DSP and execution outputs accounted to canonical records.",
              "Access: API mediation and Client presentation without ownership drift.",
            ]}
            outOfScope="Schema field lists and engine-local buffers."
            relatedBoundaries={[
              "QAgent uses context; it does not own persistence.",
              "DSP produces artifacts; it does not own canonical storage truth.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="data-ownership-diagram" title="Ownership Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="Persistence ownership"
            groups={[
              { title: "Data Layer", items: ["Owns canonical records", "Defines lineage and governance"] },
              { title: "Producers", items: ["DSP / pipelines", "Produce artifacts under policy"] },
              { title: "Accessors", items: ["API Server mediates access", "Client presents; not owner"] },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="data-ownership-details" title="Data Layer Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/data-layer/system-view", title: "Data Layer — System View", description: "Full cross-layer placement and narrative." },
              { href: "/docs/data-layer/canonical-data", title: "Canonical vs Derived Data", description: "Truth versus projections." },
              { href: "/docs/architecture/contracts/schema-registry", title: "Schema Registry", description: "Governed schemas for stored entities." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
