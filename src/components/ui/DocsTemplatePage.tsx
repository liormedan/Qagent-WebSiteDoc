import { DocsContent } from "@/components/layout/DocsContent";
import { DocsDiagram, type DocsDiagramStructureGroup } from "@/components/ui/DocsDiagram";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks, type DocsScopeLink } from "@/components/ui/DocsScopeBlocks";
import { LayerSpecAccordion, type LayerSpecItem } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import type { ReactNode } from "react";

type NavItem = {
  title: string;
  subtitle: string;
  href: string;
};

type TemplateDiagram =
  | { mode: "flow"; steps: string[] }
  | { mode: "structure"; root: string; groups: readonly DocsDiagramStructureGroup[] };

type DocsTemplatePageProps = {
  title: string;
  description: string;
  sectionPath?: string[];
  scopeLinks: readonly DocsScopeLink[];
  overviewIntro: string;
  overviewAreasTitle: string;
  overviewAreas: string[];
  outOfScope: string;
  relatedBoundaries: string[];
  navItems: NavItem[];
  diagramTitle: string;
  /** Ignored when `diagramSlot` is set. */
  diagram?: TemplateDiagram;
  /** Custom diagram body (e.g. interactive pilot). When set, `diagram` is not used. */
  diagramSlot?: ReactNode;
  detailsTitle: string;
  detailsItems: LayerSpecItem[];
  /** Passed to `LayerSpecAccordion` for compact closed summaries (pilot). */
  detailsSummaryVariant?: "default" | "reference";
  relatedDocs: string[];
  relatedFooter?: ReactNode;
  /** Pilot: render the diagram block immediately under scope links (before overview). */
  diagramPlacement?: "default" | "afterScope";
};

export function DocsTemplatePage({
  title,
  description,
  sectionPath,
  scopeLinks,
  overviewIntro,
  overviewAreasTitle,
  overviewAreas,
  outOfScope,
  relatedBoundaries,
  navItems,
  diagramTitle,
  diagram,
  diagramSlot,
  detailsTitle,
  detailsItems,
  relatedDocs,
  relatedFooter,
  diagramPlacement = "default",
  detailsSummaryVariant,
}: DocsTemplatePageProps) {
  const diagramAfterScope = diagramPlacement === "afterScope";

  const diagramBody =
    diagramSlot ??
    (diagram
      ? diagram.mode === "flow"
        ? <DocsDiagram mode="flow" steps={diagram.steps} />
        : <DocsDiagram mode="structure" root={diagram.root} groups={diagram.groups} />
      : null);

  if (!diagramBody) {
    throw new Error("DocsTemplatePage requires `diagram` or `diagramSlot`.");
  }

  const diagramSection = (
    <SectionBlock id="diagram" title={diagramTitle} body={[]}>
      {diagramBody}
    </SectionBlock>
  );

  return (
    <DocsContent>
      <PageTitle title={title} description={description} />
      {sectionPath && sectionPath.length > 0 ? (
        <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: {sectionPath.join(" / ")}</p>
      ) : null}

      <DocsScopeBlocks links={scopeLinks} />

      {diagramAfterScope ? <div className="mt-5">{diagramSection}</div> : null}

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro={overviewIntro}
            areasTitle={overviewAreasTitle}
            areas={overviewAreas}
            outOfScope={outOfScope}
            relatedBoundaries={relatedBoundaries}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={navItems} />
        </SectionBlock>

        {diagramAfterScope ? null : diagramSection}

        <SectionBlock id="details" title={detailsTitle} body={[]}>
          <LayerSpecAccordion items={detailsItems} summaryVariant={detailsSummaryVariant} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs items={relatedDocs} />
          {relatedFooter ? <div className="mt-3">{relatedFooter}</div> : null}
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
