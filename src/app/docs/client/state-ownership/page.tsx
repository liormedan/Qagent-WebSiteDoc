import { DocsContent } from "@/components/layout/DocsContent";

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

export default function StateOwnershipPage() {
  return (
    <DocsContent>
      <main className="space-y-6">
        <section className="space-y-2">
          <h1 className="text-3xl font-semibold">State Ownership Spec</h1>
          <p className="text-[var(--muted)]">Define strict ownership of all client state.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Ownership Matrix</h2>
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
                {rows.map((row) => (
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
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Required Rules</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>Single Source of Truth: each state MUST have one authoritative owner.</li>
            <li>Write Authority: only defined writers can mutate state.</li>
            <li>Read Scope: readers MUST be explicitly declared per state.</li>
            <li>Conflict Resolution: stale updates and session-switch races MUST resolve deterministically.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Enforcement Constraints</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>No shared ownership.</li>
            <li>No implicit writes.</li>
            <li>Rules MUST be enforceable in code via typed write paths and guards.</li>
          </ul>
        </section>
      </main>
    </DocsContent>
  );
}
