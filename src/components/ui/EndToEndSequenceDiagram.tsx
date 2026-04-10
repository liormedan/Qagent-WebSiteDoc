import { ArrowDown } from "lucide-react";

const sequence = [
  "User submits request",
  "Client Layer captures interaction",
  "QAgent resolves intent and plan",
  "QAgent sends Execution Request Envelope to API",
  "API validates and creates job",
  "Execution Layer runs job actions",
  "Versioning stores canonical result",
  "API exposes status and result via /jobs",
  "Client renders output to user",
];

export function EndToEndSequenceDiagram() {
  return (
    <div className="rounded-xl border border-cyan-500/25 bg-slate-950/40 p-4">
      <h3 className="text-base font-semibold text-slate-100">End-to-End Sequence</h3>
      <p className="mt-1 text-sm text-slate-300">Cross-layer sequence from request intake to user-visible output.</p>
      <div className="mx-auto mt-4 flex w-full max-w-3xl flex-col items-stretch gap-2">
        {sequence.map((step, index) => (
          <div key={step} className="flex flex-col items-center gap-2">
            <div className="w-full rounded-md border border-indigo-400/30 bg-indigo-500/10 px-3 py-2 text-sm text-indigo-100">
              <span className="font-semibold">{index + 1}.</span> {step}
            </div>
            {index < sequence.length - 1 ? <ArrowDown className="h-4 w-4 text-indigo-300/80" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

