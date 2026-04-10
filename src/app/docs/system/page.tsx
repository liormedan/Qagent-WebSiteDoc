import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { EndToEndSequenceDiagram } from "@/components/ui/EndToEndSequenceDiagram";
import { DocsDiagram } from "@/components/ui/DocsDiagram";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { SYSTEM_DOC_SOURCE_OF_TRUTH, SYSTEM_EDGE_CASE_HANDLING, SYSTEM_ERROR_OWNERSHIP_MODEL, SYSTEM_RUNTIME_LIFECYCLE } from "@/lib/system-canonical";

const layerNavigationCards: Array<{
  order: number;
  title: string;
  href: string;
  summary: string;
  responsibilities: string[];
}> = [
  { order: 1, title: "Client Layer", href: "/docs/client", summary: "User-facing interaction layer and UI runtime.", responsibilities: ["Capture user input and interaction events.", "Render runtime progress and final outputs.", "Forward structured requests to QAgent."] },
  { order: 2, title: "QAgent Layer", href: "/docs/q-agent", summary: "Decision-making layer that builds execution plans.", responsibilities: ["Resolve intent and clarification requirements.", "Build execution handoff artifacts.", "Apply approval logic before API handoff."] },
  { order: 3, title: "API Server Layer", href: "/docs/api", summary: "Execution orchestration and job system.", responsibilities: ["Validate `/run` input contract.", "Create and manage queued jobs.", "Expose status and results through API endpoints."] },
  { order: 4, title: "DSP / Processing Layer", href: "/docs/dsp-layer", summary: "Processing and transformation layer for audio workloads.", responsibilities: ["Run signal processing and audio transformations.", "Support execution pipelines with processing primitives.", "Produce processed audio outputs."] },
  { order: 5, title: "Data Layer", href: "/docs/data-layer", summary: "Canonical storage and data model layer.", responsibilities: ["Store canonical records and artifacts.", "Maintain schema consistency.", "Track lineage and reference relationships."] },
  { order: 6, title: "Infrastructure Layer", href: "/docs/infrastructure-layer", summary: "Platform runtime and deployment support layer.", responsibilities: ["Provide hosting and runtime environment.", "Support scaling and deployment operations.", "Stabilize execution conditions for system services."] },
  { order: 7, title: "Auth & Security Layer", href: "/docs/auth-security", summary: "Identity, access, and isolation boundary layer.", responsibilities: ["Authenticate identities and session context.", "Authorize access to protected operations.", "Enforce isolation and boundary security rules."] },
];

export default function SystemPage() {
  return (
    <DocsContent>
      <PageTitle title="WaveQ System Structure" description="This page presents the full architecture of WaveQ as a unified system." />

      <DocsScopeBlocks
        covers="system map, layer boundaries, canonical flow anchors, and system-level governance references."
        doesNotCover="module-level implementation details and deep subsystem specifications."
      />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="WaveQ is organized into primary execution layers and supporting layers with a single end-to-end flow from user input to versioned output."
            areasTitle="System concerns"
            areas={[
              "Primary layers: Client, QAgent, API Server.",
              "Supporting layers: DSP, Data, Infrastructure, Auth & Security.",
              "Cross-layer path: request to output with versioned references.",
            ]}
            outOfScope="internal module implementation and runtime optimization details."
            relatedBoundaries={[
              "System page = architecture map and layer boundaries.",
              "Layer pages = canonical authority for each layer.",
              "Flow page = cross-layer transition authority.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav
            items={[
              { title: "Overview", subtitle: "System scope and boundaries.", href: "#overview" },
              { title: "System Structure Diagram", subtitle: "Layer topology and relations.", href: "#system-structure-diagram" },
              { title: "Layer Details", subtitle: "Layer summaries and deep links.", href: "#layer-details" },
              { title: "Related Docs", subtitle: "Canonical governance references.", href: "#related-docs" },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="system-structure-diagram" title="System Structure Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="WaveQ"
            groups={[
              { title: "Primary Layers", items: ["Client Layer", "QAgent Layer", "API Server Layer"] },
              { title: "Supporting Layers", items: ["DSP / Processing", "Data", "Infrastructure", "Auth & Security"] },
              { title: "Cross-Layer", items: ["End-to-End Flow", "Versioned Output"] },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="layer-details" title="Layer Details" body={[]}>
          <div className="space-y-3 text-sm text-[var(--muted)]">
            {layerNavigationCards.map((layer) => (
              <div key={layer.title} className="rounded-md border border-[var(--border)] bg-slate-950/30 p-3">
                <p className="font-semibold text-slate-100">{layer.order}. {layer.title}</p>
                <p className="mt-2">{layer.summary}</p>
                <p className="mt-2 font-medium text-slate-200">Defines:</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">{layer.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
                <Link href={layer.href} className="mt-3 inline-block font-medium text-[var(--accent)] hover:underline">Related section</Link>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            items={[
              "System page = architecture map and layer boundaries.",
              "Layer pages = deep specification authority.",
              "System Flow page = cross-layer transitions.",
            ]}
          />

          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm font-semibold text-slate-100">Flow Diagram</p>
              <EndToEndSequenceDiagram />
              <Link href="/docs/system-flow" className="mt-2 inline-block text-sm font-medium text-[var(--accent)] hover:underline">Related section</Link>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-100">System Edge Case Handling</p>
              <div className="mt-2 space-y-2">
                {SYSTEM_EDGE_CASE_HANDLING.map((item) => (
                  <div key={item.edgeCase} className="rounded-md border border-[var(--border)] bg-slate-950/30 p-3 text-sm">
                    <p className="font-semibold text-slate-100">{item.edgeCase}</p>
                    <p className="text-[var(--muted)]">Handling layer: {item.handlingLayer}</p>
                    <p className="text-[var(--muted)]">System behavior: {item.systemBehavior}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-100">System Error Ownership Model</p>
              <div className="mt-2 overflow-x-auto rounded-lg border border-[var(--border)]">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead className="bg-slate-950/60 text-slate-200"><tr><th className="px-3 py-2 font-semibold">Error Type</th><th className="px-3 py-2 font-semibold">Owning Layer</th></tr></thead>
                  <tbody>{SYSTEM_ERROR_OWNERSHIP_MODEL.map((row) => (<tr key={row.errorType} className="border-t border-[var(--border)] text-slate-300"><td className="px-3 py-2">{row.errorType}</td><td className="px-3 py-2">{row.owningLayer}</td></tr>))}</tbody>
                </table>
              </div>
            </div>

            <div className="rounded-md border border-[var(--border)] bg-slate-950/30 p-3 text-sm text-[var(--muted)]">
              <p className="font-semibold text-slate-100">System Runtime Lifecycle (Canonical)</p>
              <p className="mt-1">{SYSTEM_RUNTIME_LIFECYCLE}</p>
            </div>

            <div className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs leading-5 text-emerald-100 md:text-sm">
              Canonical location: <span className="font-semibold">{SYSTEM_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>
              <br />
              {SYSTEM_DOC_SOURCE_OF_TRUTH.rule}
            </div>
          </div>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
