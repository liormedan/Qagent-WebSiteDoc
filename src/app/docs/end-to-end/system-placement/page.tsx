import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

import { END_TO_END_SUBPAGE_SCOPE_LINKS } from "@/lib/docs-scope-links";

const inPageLinks = [
  { title: "Overview", subtitle: "Diagram authority.", href: "#overview" },
  { title: "Related docs", subtitle: "System + layer.", href: "#related-docs" },
] as const;

export default function EndToEndSystemPlacementPage() {
  return (
    <DocsContent>
      <PageTitle
        title="System placement"
        description="End-to-end chapter: where to read the cross-layer placement diagram. The diagram itself lives under System; this page keeps navigation inside the End-to-end layer."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: End-to-end / System placement</p>

      <DocsScopeBlocks links={END_TO_END_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]} summaryPreview="Pointer only; no duplicated diagram.">
          <DocsOverviewBlock
            intro="The authoritative cross-layer placement diagram for end-to-end flow is maintained on the System documentation tree. This chapter exists so the End-to-end layer has a normal child page in the sidebar—without jumping the reader into the full System sidebar context."
            areasTitle="Where to read"
            areas={[
              "System / End-to-end flow: canonical diagram and system-level placement copy.",
              "System overview: layer map for all layers.",
            ]}
            outOfScope="R numbering, contract payloads, and per-layer deep specs."
            relatedBoundaries={["End-to-end overview on /docs/end-to-end.", "system-runtime for product runtime order."]}
          />
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
            Open the placement diagram:{" "}
            <Link className="font-semibold text-[var(--accent)] hover:underline" href="/docs/system/end-to-end-flow">
              /docs/system/end-to-end-flow
            </Link>
            .
          </p>
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/end-to-end", title: "End-to-end overview", description: "Layer root." },
              { href: "/docs/system/end-to-end-flow", title: "End-to-end flow (System)", description: "Diagram + placement." },
              { href: "/docs/system", title: "System overview", description: "Layer map." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
