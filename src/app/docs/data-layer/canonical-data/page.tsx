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
  { title: "Overview", subtitle: "Canonical vs derived framing.", href: "#overview" },
  { title: "Canonical Diagram", subtitle: "Truth vs projections.", href: "#canonical-data-diagram" },
  { title: "Data Layer Details", subtitle: "Definitions and boundaries.", href: "#canonical-data-details" },
  { title: "Related Docs", subtitle: "Linked chapters.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "canonical-definition",
    title: "Canonical Definition",
    subtitle: "Source of truth",
    purpose: "Define canonical data as the authoritative persisted record set the system relies on across sessions.",
    defines: [
      "Canonical data is durable, governed, and referenced by lineage and identifiers owned by the Data Layer model.",
      "Downstream layers consume canonical projections; they do not silently replace canonical rows.",
      "[TEXT TBD – expand Canonical vs Derived Data detail]",
    ],
    doesNotDefine: "Row-level schema definitions and migration scripts.",
    href: "/docs/data-layer/system-view",
    linkLabel: "System View",
  },
  {
    id: "derived-definition",
    title: "Derived Definition",
    subtitle: "Projections and caches",
    purpose: "Define derived data as computed, presentation, or ephemeral representations.",
    defines: [
      "Derived data may be recomputed, cached for UX, or reconstructed for runtime without becoming the persistence authority.",
      "Promotion to canonical status follows Data Layer policy, not ad hoc client or API behavior.",
      "[TEXT TBD – expand Canonical vs Derived Data detail]",
    ],
    doesNotDefine: "Transformation code paths and cache TTL tables.",
    href: "/docs/client/state-model",
    linkLabel: "Client State Model",
  },
] as const;

export default function CanonicalDataPage() {
  return (
    <DocsContent>
      <PageTitle title="Canonical vs Derived Data" description="Separates authoritative persisted records from projections, caches, and presentation copies across WaveQ layers." />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Data Layer / Canonical vs Derived Data</p>

      <DocsScopeBlocks
        covers="canonical source of truth; derived and ephemeral representations; promotion boundaries; why the distinction matters."
        doesNotCover="DSP math; API serialization; client reducer implementations; database engines."
      />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]} summaryPreview="Why canonical data must stay distinct from derived runtime and UI projections.">
          <DocsOverviewBlock
            intro="Canonical versus derived data keeps persistence honest: canonical records remain the governed truth while derived views serve execution and UX. This chapter states the architectural distinction without prescribing transformation implementations."
            areasTitle="Why it matters"
            areas={[
              "Prevents silent replacement of governed records by UI or pipeline caches.",
              "Clarifies promotion paths when derived outputs become durable artifacts.",
              "Aligns API and Client behavior with Data Layer policy.",
            ]}
            outOfScope="Cache eviction algorithms and serializer field layouts."
            relatedBoundaries={[
              "Data Layer defines canonical authority.",
              "Client and API consume or mediate; they do not redefine truth.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="canonical-data-diagram" title="Canonical Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="Canonical vs derived"
            groups={[
              { title: "Canonical", items: ["Governed records", "Lineage-linked", "Data Layer authority"] },
              { title: "Derived", items: ["Projections", "Caches", "Presentation buffers"] },
              { title: "Promotion", items: ["Policy-gated", "Not ad hoc client/API"] },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="canonical-data-details" title="Data Layer Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/data-layer/data-ownership", title: "Data Ownership", description: "Who owns persisted data and accessors." },
              { href: "/docs/data-layer/persistence-model", title: "Persistence Model", description: "Durable versus transient classes." },
              { href: "/docs/architecture/contracts/schema-registry", title: "Schema Registry", description: "Schema governance for canonical entities." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
