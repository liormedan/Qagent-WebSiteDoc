import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { DocsDiagram } from "@/components/ui/DocsDiagram";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

import { END_TO_END_OVERVIEW_SCOPE_LINKS } from "@/lib/docs-scope-links";

const inPageLinks = [
  { title: "Overview", subtitle: "What this section contains.", href: "#overview" },
  { title: "End-to-end diagram", subtitle: "Layer map (this page).", href: "#end-to-end-overview-diagram" },
  { title: "Chapter index", subtitle: "Deep-dive topics.", href: "#end-to-end-chapters" },
  { title: "Related Docs", subtitle: "Runtime, map, contracts, auth.", href: "#related-docs" },
  { title: "End-to-end details", subtitle: "Accordion scope.", href: "#end-to-end-details" },
] as const;

const endToEndChapterIndexItems = [
  {
    id: "e2e-chapter-system-placement",
    title: "System placement",
    subtitle: "",
    purpose: "Cross-layer diagram pointer; stays under this layer in the nav.",
    defines: [] as const,
    doesNotDefine: "",
    href: "/docs/end-to-end/system-placement",
    linkLabel: "Open System placement chapter",
  },
  {
    id: "e2e-chapter-runtime-truth",
    title: "Runtime truth",
    subtitle: "",
    purpose: "References to R spine, events map, and parallel auth spine only.",
    defines: [] as const,
    doesNotDefine: "",
    href: "/docs/end-to-end/runtime-truth",
    linkLabel: "Open Runtime truth chapter",
  },
  {
    id: "e2e-chapter-integration-points",
    title: "Integration points",
    subtitle: "",
    purpose: "Named cuts with links to the contracts hub and layer authorities.",
    defines: [] as const,
    doesNotDefine: "",
    href: "/docs/end-to-end/integration-points",
    linkLabel: "Open Integration points chapter",
  },
  {
    id: "e2e-chapter-failure-flow",
    title: "Failure flow",
    subtitle: "",
    purpose: "System-level failure posture and pointers to error contracts.",
    defines: [] as const,
    doesNotDefine: "",
    href: "/docs/end-to-end/failure-flow",
    linkLabel: "Open Failure flow chapter",
  },
  {
    id: "e2e-chapter-invariants",
    title: "Invariants",
    subtitle: "",
    purpose: "Global rules and machine export JSON.",
    defines: [] as const,
    doesNotDefine: "",
    href: "/docs/end-to-end/invariants",
    linkLabel: "Open Invariants chapter",
  },
] as const;

const overviewDetails = [
  {
    id: "e2e-section-scope",
    title: "Section scope",
    subtitle: "What this layer covers",
    purpose: "Orient readers to End-to-end documentation versus per-layer specs and versus System placement diagrams.",
    defines: [
      "This layer documents system-level cross-cutting truth: pointers to runtime spines, contracts hub, validation, and errors.",
      "Chapter pages split placement, runtime truth, integration cuts, failure posture, and invariants without redefining R steps or contract payloads.",
    ],
    doesNotDefine: "Per-layer internals, R/S/B step text, JSON Schemas, and registry row definitions.",
    href: "/docs/end-to-end/system-placement",
    linkLabel: "System placement",
  },
  {
    id: "e2e-chapter-routing",
    title: "How to navigate",
    subtitle: "Recommended reading order",
    purpose: "Point readers from overview to chapters and external authorities.",
    defines: [
      "Start with System placement (this layer), then read Runtime truth, Integration points, Failure flow, and Invariants in order or by concern.",
      "Use System overview and Contracts hub when you need placement diagrams or machine artifacts not duplicated here.",
    ],
    doesNotDefine: "Orchestration algorithms and implementation file paths.",
    href: "/docs/end-to-end/runtime-truth",
    linkLabel: "Runtime truth",
  },
] as const;

export default function EndToEndOverviewPage() {
  return (
    <DocsContent>
      <PageTitle
        title="End-to-end layer"
        description="System-level cross-cutting documentation: placement pointers, runtime and contract authorities, integration cuts, failure posture, and invariants. Chapters live on child routes under /docs/end-to-end/."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: End-to-end / Overview</p>

      <DocsScopeBlocks links={END_TO_END_OVERVIEW_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock
          id="overview"
          title="Overview"
          body={[]}
          summaryPreview="Top-level entry for End-to-end docs: how this layer relates to System, runtime spines, and contracts."
        >
          <DocsOverviewBlock
            intro="The End-to-end layer is the home for documentation that spans all product layers without re-stating layer-owned specs. It mirrors other layer sections: an overview on this page, chapter pages for each topic, and explicit links to authoritative hubs (system-runtime, auth system flow, contracts, authority map)."
            areasTitle="What you will find here"
            areas={[
              "System placement (child page): entry to the cross-layer diagram hosted under System.",
              "Runtime truth, integration points, failure flow, and invariants on dedicated chapter pages.",
              "No duplicate R steps, contract payloads, or validation stage definitions.",
            ]}
            outOfScope="HTTP micro-order except via pointers to Auth system flow; UI and API field catalogs."
            relatedBoundaries={[
              "System pages own the global layer map and placement diagrams.",
              "system-runtime owns R01–R12; auth-security/system-flow owns S/B.",
            ]}
          />
          <p className="mt-3 text-sm text-[var(--muted)]">
            System placement (this layer):{" "}
            <Link href="/docs/end-to-end/system-placement" className="font-medium text-[var(--accent)] hover:underline">
              /docs/end-to-end/system-placement
            </Link>
          </p>
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="end-to-end-overview-diagram" title="End-to-end diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="End-to-end documentation"
            groups={[
              {
                title: "Entry",
                items: ["Overview (this page)", "System placement (chapter)"],
              },
              {
                title: "Chapters",
                items: ["Runtime truth", "Integration points", "Failure flow", "Invariants"],
              },
              {
                title: "Authorities (read there)",
                items: ["System runtime (R)", "Auth system flow (S/B)", "Contracts hub", "Authority map"],
              },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="end-to-end-chapters" title="Chapter index" body={[]}>
          <LayerSpecAccordion variant="chapter" items={[...endToEndChapterIndexItems]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <p className="text-xs text-slate-500">Cross-layer authorities (not the placement strip above).</p>
          <ul className="mt-2 list-none space-y-1.5 text-sm text-[var(--muted)]">
            <li>
              <Link href="/docs/system-runtime" className="font-medium text-[var(--accent)] hover:underline">
                System runtime
              </Link>
              <span className="text-xs text-slate-500"> · R01–R12 product spine</span>
            </li>
            <li>
              <Link href="/docs/authority-map" className="font-medium text-[var(--accent)] hover:underline">
                Authority map
              </Link>
              <span className="text-xs text-slate-500"> · canonical href per domain</span>
            </li>
            <li>
              <Link href="/docs/contracts" className="font-medium text-[var(--accent)] hover:underline">
                Contracts hub
              </Link>
              <span className="text-xs text-slate-500"> · registry and traceability</span>
            </li>
            <li>
              <Link href="/docs/auth-security" className="font-medium text-[var(--accent)] hover:underline">
                Auth & security
              </Link>
              <span className="text-xs text-slate-500"> · S/B spine and security specs</span>
            </li>
          </ul>
        </SectionBlock>

        <SectionBlock id="end-to-end-details" title="End-to-end details" body={[]}>
          <LayerSpecAccordion items={[...overviewDetails]} />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
