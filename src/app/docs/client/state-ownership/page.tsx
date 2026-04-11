import { DocsContent } from "@/components/layout/DocsContent";
import { DocsDiagram } from "@/components/ui/DocsDiagram";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

import { CLIENT_SUBPAGE_SCOPE_LINKS } from "@/lib/docs-scope-links";
type OwnershipRow = {
  state: string;
  sourceOfTruth: string;
  writers: string;
  readers: string;
  conflictRule: string;
};

const rows: OwnershipRow[] = [
  {
    state: "chatState",
    sourceOfTruth: "Chat Store",
    writers: "Chat UI, QAgent Bridge",
    readers: "Chat UI, Workspace UI, Runtime",
    conflictRule: "Order by message sequence; ignore stale sequence numbers",
  },
  {
    state: "canvasState",
    sourceOfTruth: "Canvas Runtime",
    writers: "Runtime, QAgent bridge",
    readers: "Canvas UI, Workspace UI",
    conflictRule: "Last write wins with version check",
  },
  {
    state: "audioState",
    sourceOfTruth: "Audio Engine Runtime",
    writers: "Runtime Audio Engine",
    readers: "Canvas UI, Runtime UI, Workspace UI",
    conflictRule: "Monotonic playback timestamp; reject backward stale updates",
  },
  {
    state: "sessionState",
    sourceOfTruth: "Session Store",
    writers: "Session Manager, Auth Flow",
    readers: "Chat UI, Canvas UI, Runtime, Workspace UI",
    conflictRule: "Session switch invalidates previous session data immediately",
  },
  {
    state: "uiState",
    sourceOfTruth: "UI Store",
    writers: "UI Controllers (chat/canvas/workspace)",
    readers: "All client views",
    conflictRule: "Per-scope last write wins; enforce scope keys to avoid cross-view clobbering",
  },
];

function OwnershipMatrixTable({ rows: matrixRows }: { rows: OwnershipRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead className="bg-slate-950/60 text-slate-200">
          <tr>
            <th className="px-3 py-2 font-semibold">State</th>
            <th className="px-3 py-2 font-semibold">Source of Truth</th>
            <th className="px-3 py-2 font-semibold">Writers</th>
            <th className="px-3 py-2 font-semibold">Readers</th>
            <th className="px-3 py-2 font-semibold">Conflict Rule</th>
          </tr>
        </thead>
        <tbody>
          {matrixRows.map((row) => (
            <tr key={row.state} className="border-t border-[var(--border)] text-slate-300">
              <td className="px-3 py-2 font-mono">{row.state}</td>
              <td className="px-3 py-2">{row.sourceOfTruth}</td>
              <td className="px-3 py-2">{row.writers}</td>
              <td className="px-3 py-2">{row.readers}</td>
              <td className="px-3 py-2">{row.conflictRule}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const inPageLinks = [
  { title: "Overview", subtitle: "Strict ownership and how to use this spec.", href: "#overview" },
  { title: "State Ownership Diagram", subtitle: "Stores, authority, and isolation.", href: "#state-ownership-diagram" },
  { title: "Ownership Matrix", subtitle: "Source of truth, writers, readers, conflicts.", href: "#state-ownership-matrix" },
  { title: "Required Rules", subtitle: "Truth, write, read, conflict rules.", href: "#state-ownership-required-rules" },
  { title: "Enforcement Constraints", subtitle: "Shared ownership, implicit writes, code.", href: "#state-ownership-enforcement" },
  { title: "Runtime Implications", subtitle: "Cross-doc reasoning.", href: "#state-ownership-runtime-implications" },
  { title: "Related Docs", subtitle: "State model, runtime, events.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "state-ownership-matrix",
    title: "Ownership Matrix",
    subtitle: "Per-store authority and conflict rules",
    purpose: "Define strict ownership of all client state via the authoritative matrix of state keys, sources of truth, writers, readers, and conflict rules.",
    defines: [
      "Each row is authoritative for design, debugging, and runtime reasoning about who may write or read a store and how races resolve.",
      "Column meanings: State, Source of Truth, Writers, Readers, Conflict Rule.",
    ],
    supplement: <OwnershipMatrixTable rows={rows} />,
    doesNotDefine: "How stores are partitioned conceptually without the writer/reader matrix (see State Model).",
    href: "/docs/client/state-ownership",
    linkLabel: "Canonical page",
  },
  {
    id: "state-ownership-required-rules",
    title: "Required Rules",
    subtitle: "Truth, authority, scope, resolution",
    purpose: "State mandatory ownership invariants for every client store.",
    defines: [
      "Single Source of Truth: each state MUST have one authoritative owner.",
      "Write Authority: only defined writers can mutate state.",
      "Read Scope: readers MUST be explicitly declared per state.",
      "Conflict Resolution: stale updates and session-switch races MUST resolve deterministically.",
    ],
    doesNotDefine: "Event envelope shape or sequencing across surfaces (see Event Contract and Event Flow).",
    href: "/docs/client/state-model",
    linkLabel: "State Model",
  },
  {
    id: "state-ownership-enforcement",
    title: "Enforcement Constraints",
    subtitle: "Non-negotiable implementation guardrails",
    purpose: "Constrain how ownership rules are realized in code.",
    defines: [
      "No shared ownership.",
      "No implicit writes.",
      "Rules MUST be enforceable in code via typed write paths and guards.",
    ],
    doesNotDefine: "API Server execution lifecycle or QAgent planning ownership.",
    href: "/docs/client/runtime",
    linkLabel: "Client Runtime",
  },
  {
    id: "state-ownership-runtime-implications",
    title: "Runtime Implications",
    subtitle: "Using this spec with runtime and events",
    purpose: "Bridge ownership rules to runtime and event documentation without redefining them.",
    defines: [
      "Use the matrix together with Client Runtime to determine which components may transition or observe each store over time.",
      "Use Event Flow and Event Contract to align event-driven updates with declared writers and readers.",
      "[TEXT TBD – expand State Ownership detail]",
    ],
    doesNotDefine: "Replacement for the Event Contract or Client Runtime specifications.",
    href: "/docs/client/runtime",
    linkLabel: "Client Runtime",
  },
] as const;

export default function StateOwnershipPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Client State Ownership"
        description="State Ownership Spec: strict per-store writers, readers, sources of truth, and deterministic conflict rules in the Client Layer."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Client / Runtime & State / State Ownership</p>

      <DocsScopeBlocks links={CLIENT_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock
          id="overview"
          title="Overview"
          body={[]}
          summaryPreview="Why strict ownership exists, how to use the matrix, and how this spec fits State Model and event/runtime docs."
        >
          <DocsOverviewBlock
            intro="Define strict ownership of all client state. Strict ownership prevents drift, double-writes, and ambiguous conflict handling: every store has exactly one source of truth, explicit writers and readers, and a deterministic conflict rule so engineers can design, debug, and reason about runtime behavior with one shared reference."
            areasTitle="How this spec is used"
            areas={[
              "Design: align new UI and runtime features with declared writers and readers before adding mutation paths.",
              "Debugging: trace unexpected state by checking whether a component is an authorized writer or reader for that store.",
              "Runtime reasoning: combine this matrix with State Model (what the stores are) and Client Runtime / events (how updates flow in time).",
            ]}
            outOfScope="QAgent intent/planning ownership and API Server execution lifecycle authority."
            relatedBoundaries={[
              "Client Layer owns local UI/runtime behavior, projection, and enforcement of these ownership rules.",
              "QAgent owns intent and planning.",
              "API Server owns execution lifecycle.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="state-ownership-diagram" title="State Ownership Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="Client State Ownership"
            groups={[
              {
                title: "Stores (source of truth)",
                items: ["Chat Store", "Canvas Runtime", "Audio Engine Runtime", "Session Store", "UI Store"],
              },
              {
                title: "Write vs read",
                items: ["Defined writers only per state", "Declared readers only per state", "Per-state authority (no shared ownership)"],
              },
              {
                title: "Conflict posture",
                items: ["Deterministic rule per row", "No implicit cross-store clobber", "Session and version rules per matrix"],
              },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="state-ownership-details" title="State Ownership Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              {
                href: "/docs/client/state-model",
                title: "Client State Model",
                description: "How client state is partitioned into stores — complements ownership of each store.",
              },
              {
                href: "/docs/client/runtime",
                title: "Client Runtime",
                description: "How state executes and projects over time — applies under these ownership rules.",
              },
              {
                href: "/docs/client/event-flow",
                title: "Client Event Flow",
                description: "Canonical sequence across surfaces — not the ownership matrix itself.",
              },
              {
                href: "/docs/client/event-contract",
                title: "Client Event Contract",
                description: "Event shape and client contract rules — mutations still respect declared writers.",
              },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
