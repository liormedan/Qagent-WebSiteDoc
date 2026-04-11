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

const inPageLinks = [
  { title: "Overview", subtitle: "Placement in System docs.", href: "#overview" },
  { title: "Placement Diagram", subtitle: "Where Data Layer sits.", href: "#system-data-layer-diagram" },
  { title: "Data Layer Details", subtitle: "Where to read next.", href: "#system-data-layer-details" },
  { title: "Related Docs", subtitle: "Top-level Data Layer section.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "system-placement-pointer",
    title: "Canonical documentation",
    subtitle: "Moved to top-level section",
    purpose: "Point System readers to the first-class Data Layer documentation section for depth.",
    defines: [
      "Full Data Layer documentation (overview, system view, and chapters) now lives under /docs/data-layer.",
      "Use this System page only for orientation within the System IA; avoid duplicating long-form content here.",
    ],
    doesNotDefine: "Persistence rules in full detail (see Data Layer section).",
    href: "/docs/data-layer",
    linkLabel: "Data Layer section",
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

      <DocsScopeBlocks
        covers="where the Data Layer sits in the System map and how to navigate to the dedicated Data Layer docs section."
        doesNotCover="full persistence specifications, schema details, or chapter-level ownership rules (see /docs/data-layer)."
      />

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
          <DocsDiagram
            mode="structure"
            root="System map (summary)"
            groups={[
              { title: "Upstream", items: ["Client", "QAgent", "API Server"] },
              { title: "Data Layer", items: ["Canonical persistence", "Artifacts & lineage"] },
              { title: "Downstream", items: ["DSP / processing outputs"] },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="system-data-layer-details" title="Data Layer Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/data-layer", title: "Data Layer (section home)", description: "Overview and chapter index for persistence documentation." },
              { href: "/docs/data-layer/system-view", title: "Data Layer — System View", description: "Full cross-layer placement and narrative." },
              { href: "/docs/system-flow", title: "System Flow", description: "Cross-layer runtime flow complement." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
