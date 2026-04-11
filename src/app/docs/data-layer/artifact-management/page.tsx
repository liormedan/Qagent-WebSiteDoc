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
  { title: "Overview", subtitle: "Artifacts and canonical linkage.", href: "#overview" },
  { title: "Artifact Diagram", subtitle: "Producer to store.", href: "#artifact-management-diagram" },
  { title: "Data Layer Details", subtitle: "Artifact topics.", href: "#artifact-management-details" },
  { title: "Related Docs", subtitle: "DSP and persistence.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "artifact-lifecycle",
    title: "Artifact Lifecycle",
    subtitle: "From DSP to storage",
    purpose: "Describe how generated artifacts relate to canonical records without specifying DSP math.",
    defines: [
      "DSP and execution pipelines produce artifacts that must be linked or stored under Data Layer artifact policy.",
      "Identifiers and lineage connect artifacts back to canonical entities.",
      "[TEXT TBD – expand Artifact Management detail]",
    ],
    doesNotDefine: "DSP kernel implementations and encoding bit depths.",
    href: "/docs/dsp-layer",
    linkLabel: "DSP Layer",
  },
  {
    id: "governance",
    title: "Governance",
    subtitle: "Accountability",
    purpose: "State accountability expectations for retained artifacts.",
    defines: [
      "Retention and reference rules are persistence concerns owned by the Data Layer model.",
      "API mediation exposes artifacts but does not redefine storage ownership.",
      "[TEXT TBD – expand Artifact Management detail]",
    ],
    doesNotDefine: "Object storage bucket naming conventions.",
    href: "/docs/data-layer/persistence-model",
    linkLabel: "Persistence Model",
  },
] as const;

export default function ArtifactManagementPage() {
  return (
    <DocsContent>
      <PageTitle title="Artifact Management" description="How DSP and execution outputs become governed artifacts tied to canonical Data Layer records." />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Data Layer / Artifact Management</p>

      <DocsScopeBlocks links={DATA_LAYER_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]} summaryPreview="Persistence view of artifacts produced by DSP and execution paths.">
          <DocsOverviewBlock
            intro="Artifact management explains how generated media and intermediate outputs are accounted to canonical records. DSP may produce artifacts, but canonical storage ownership and governance remain with the Data Layer; this chapter keeps that boundary explicit."
            areasTitle="Outcomes"
            areas={[
              "Artifacts are linkable to canonical entities and lineage.",
              "Retention expectations are architectural, not engine-local.",
              "API surfaces artifacts without owning canonical definitions.",
            ]}
            outOfScope="DSP processing graphs and serializer layouts."
            relatedBoundaries={[
              "DSP produces outputs; Data Layer defines canonical persistence policy.",
              "API mediates access; it does not own canonical truth.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="artifact-management-diagram" title="Artifact Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="Artifacts"
            groups={[
              { title: "Producers", items: ["DSP outputs", "Execution pipelines"] },
              { title: "Policy", items: ["Linkage rules", "Lineage identifiers"] },
              { title: "Canonical store", items: ["Data Layer governance", "Accountable artifacts"] },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="artifact-management-details" title="Data Layer Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/data-layer/persistence-model", title: "Persistence Model", description: "Durable versus transient expectations." },
              { href: "/docs/dsp-layer", title: "DSP / Processing Layer", description: "Processing producers of artifacts." },
              { href: "/docs/data-layer/system-view", title: "Data Layer — System View", description: "Cross-layer placement and narrative." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
