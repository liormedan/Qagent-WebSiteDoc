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
  { title: "Overview", subtitle: "Durable vs transient.", href: "#overview" },
  { title: "Persistence Diagram", subtitle: "Data classes.", href: "#persistence-model-diagram" },
  { title: "Data Layer Details", subtitle: "Persistence topics.", href: "#persistence-model-details" },
  { title: "Related Docs", subtitle: "Linked material.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "durable-classes",
    title: "Durable Classes",
    subtitle: "Must persist",
    purpose: "Identify categories of information expected to survive process boundaries under Data Layer authority.",
    defines: [
      "Canonical entities, lineage references, governed artifacts, and audit-worthy records persist.",
      "Persistence expectations are architectural; storage engines are out of scope here.",
    ],
    doesNotDefine: "Database engine selection and sharding topology.",
    href: "/docs/data-layer/system-view",
    linkLabel: "System View",
  },
  {
    id: "transient-classes",
    title: "Transient Classes",
    subtitle: "May remain ephemeral",
    purpose: "Clarify data that should remain outside canonical persistence unless explicitly promoted.",
    defines: [
      "Ephemeral coordination buffers, disposable previews, and volatile execution mirrors stay transient by default.",
      "Promotion requires policy alignment with the Data Layer model.",
    ],
    doesNotDefine: "In-memory execution state machines owned by runtime engines.",
    href: "/docs/api",
    linkLabel: "API Server",
  },
] as const;

export default function PersistenceModelPage() {
  return (
    <DocsContent>
      <PageTitle title="Persistence Model" description="Architectural expectations for durable versus transient data classes and how promotion aligns with Data Layer policy." />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Data Layer / Persistence Model</p>

      <DocsScopeBlocks links={DATA_LAYER_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]} summaryPreview="What must be durable under Data Layer governance versus what stays transient.">
          <DocsOverviewBlock
            intro="The persistence model states which categories of information must be durable for traceability and governance versus which may remain transient until explicitly promoted. It complements ownership and canonical data chapters without prescribing storage technology."
            areasTitle="Coverage"
            areas={[
              "Durable: canonical entities, lineage, governed artifacts.",
              "Transient: volatile previews and coordination buffers unless promoted.",
              "Promotion: policy-gated, not ad hoc.",
            ]}
            outOfScope="DDL, engine tuning, and cluster sizing."
            relatedBoundaries={[
              "Data Layer governs persistence expectations.",
              "Execution layers manage runtime lifetimes separately.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="persistence-model-diagram" title="Persistence Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="Persistence classes"
            groups={[
              { title: "Durable", items: ["Canonical entities", "Lineage", "Governed artifacts"] },
              { title: "Transient", items: ["Coordination buffers", "Previews", "Volatile mirrors"] },
              { title: "Promotion", items: ["Policy-gated", "Data Layer authority"] },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="persistence-model-details" title="Data Layer Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/data-layer/canonical-data", title: "Canonical vs Derived Data", description: "Truth versus projections." },
              { href: "/docs/data-layer/artifact-management", title: "Artifact Management", description: "How outputs become stored artifacts." },
              { href: "/docs/data-layer/system-view", title: "Data Layer — System View", description: "Cross-layer placement narrative." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
