import { DocsContent } from "@/components/layout/DocsContent";
import { DocsDiagram } from "@/components/ui/DocsDiagram";
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
  | { mode: "structure"; root: string; groups: Array<{ title: string; items: string[] }> };

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
  diagram: TemplateDiagram;
  detailsTitle: string;
  detailsItems: LayerSpecItem[];
  relatedDocs: string[];
  relatedFooter?: ReactNode;
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
  detailsTitle,
  detailsItems,
  relatedDocs,
  relatedFooter,
}: DocsTemplatePageProps) {
  return (
    <DocsContent>
      <PageTitle title={title} description={description} />
      {sectionPath && sectionPath.length > 0 ? (
        <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: {sectionPath.join(" / ")}</p>
      ) : null}

      <DocsScopeBlocks links={scopeLinks} />

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

        <SectionBlock id="diagram" title={diagramTitle} body={[]}>
          {diagram.mode === "flow" ? (
            <DocsDiagram mode="flow" steps={diagram.steps} />
          ) : (
            <DocsDiagram mode="structure" root={diagram.root} groups={diagram.groups} />
          )}
        </SectionBlock>

        <SectionBlock id="details" title={detailsTitle} body={[]}>
          <LayerSpecAccordion items={detailsItems} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs items={relatedDocs} />
          {relatedFooter ? <div className="mt-3">{relatedFooter}</div> : null}
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
