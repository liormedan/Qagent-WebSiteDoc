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
import { SYSTEM_DOC_SOURCE_OF_TRUTH } from "@/lib/system-canonical";

const layerNavigationCards: Array<{
  id: string;
  title: string;
  href: string;
  summary: string;
  doesNotDefine: string;
  responsibilities: string[];
}> = [
  {
    id: "client-layer",
    title: "Client Layer",
    href: "/docs/client",
    summary: "User-facing interaction layer and UI runtime.",
    responsibilities: ["Capture user input and interaction events.", "Render runtime progress and final outputs.", "Forward structured requests to QAgent."],
    doesNotDefine: "Intent planning policy, API orchestration, and execution scheduling.",
  },
  {
    id: "qagent-layer",
    title: "QAgent Layer",
    href: "/docs/q-agent",
    summary: "Decision-making layer that builds execution plans.",
    responsibilities: ["Resolve intent and clarification requirements.", "Build execution handoff artifacts.", "Apply approval logic before API handoff."],
    doesNotDefine: "Runtime job execution ownership and global UI state authority.",
  },
  {
    id: "api-layer",
    title: "API Server Layer",
    href: "/docs/api",
    summary: "Execution orchestration and job system.",
    responsibilities: ["Validate `/run` input contract.", "Create and manage queued jobs.", "Expose status and results through API endpoints."],
    doesNotDefine: "Intent derivation semantics and client interaction policy.",
  },
  {
    id: "dsp-layer",
    title: "DSP / Processing Layer",
    href: "/docs/dsp-layer",
    summary: "Processing and transformation layer for audio workloads.",
    responsibilities: ["Run signal processing and audio transformations.", "Support execution pipelines with processing primitives.", "Produce processed audio outputs."],
    doesNotDefine: "Queue orchestration, billing policy enforcement, and UI concerns.",
  },
  {
    id: "data-layer",
    title: "Data Layer",
    href: "/docs/data-layer",
    summary: "Canonical storage and data model layer.",
    responsibilities: ["Store canonical records and artifacts.", "Maintain schema consistency.", "Track lineage and reference relationships."],
    doesNotDefine: "Execution routing or planning authority.",
  },
  {
    id: "infrastructure-layer",
    title: "Infrastructure Layer",
    href: "/docs/infrastructure-layer",
    summary: "Platform runtime and deployment support layer.",
    responsibilities: ["Provide hosting and runtime environment.", "Support scaling and deployment operations.", "Stabilize execution conditions for system services."],
    doesNotDefine: "Application-level business contracts and policy decisions.",
  },
  {
    id: "auth-layer",
    title: "Auth & Security Layer",
    href: "/docs/auth-security",
    summary: "Identity, access, and isolation boundary layer.",
    responsibilities: ["Authenticate identities and session context.", "Authorize access to protected operations.", "Enforce isolation and boundary security rules."],
    doesNotDefine: "Execution processing logic and versioning authority.",
  },
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
              { title: "Layer Details", subtitle: "Ownership per layer and deep links.", href: "#layer-details" },
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
          <LayerSpecAccordion
            items={layerNavigationCards.map((layer) => ({
              id: layer.id,
              title: layer.title,
              subtitle: layer.summary,
              purpose: layer.summary,
              defines: layer.responsibilities,
              doesNotDefine: layer.doesNotDefine,
              href: layer.href,
              linkLabel: "Canonical page",
            }))}
          />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            items={[
              "System page = architecture map and layer boundaries.",
              "Layer pages = deep specification authority.",
              "System Flow page = cross-layer transitions.",
            ]}
          />
          <div className="mt-4 rounded-md border border-[var(--border)] bg-slate-950/30 p-3 text-sm text-[var(--muted)]">
            <p className="font-semibold text-slate-100">Secondary references</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li><Link href="/docs/system-flow" className="font-medium text-[var(--accent)] hover:underline">Flow Diagram and Cross-Layer Runtime Flow</Link></li>
              <li><Link href="/docs/system-flow#system-edge-case-handling" className="font-medium text-[var(--accent)] hover:underline">System Edge Case Handling</Link></li>
              <li><Link href="/docs/system-flow#system-error-ownership-model" className="font-medium text-[var(--accent)] hover:underline">System Error Ownership Model</Link></li>
              <li><Link href="/docs/system-flow#system-runtime-lifecycle" className="font-medium text-[var(--accent)] hover:underline">System Runtime Lifecycle</Link></li>
            </ul>
          </div>

          <div className="mt-3 rounded-md border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs leading-5 text-emerald-100 md:text-sm">
            Canonical location: <span className="font-semibold">{SYSTEM_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>
            <br />
            {SYSTEM_DOC_SOURCE_OF_TRUTH.rule}
          </div>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
