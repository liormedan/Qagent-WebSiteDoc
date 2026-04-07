export function VersioningModuleDiagram() {
  const components = [
    {
      title: "Version Manager",
      bullets: ["Create version", "Update version", "Delete version"],
    },
    {
      title: "Snapshot Builder",
      bullets: ["Capture audio output", "Capture parameters", "Capture DSP chain and metadata"],
    },
    {
      title: "Storage Layer",
      bullets: ["Store audio blobs", "Store metadata JSON", "Preserve version references"],
    },
    {
      title: "History Tracker",
      bullets: ["Timeline sequence", "Timestamps", "Action history"],
    },
    {
      title: "Restore Engine",
      bullets: ["Load version", "Restore DSP chain", "Restore UI state"],
    },
    {
      title: "Diff Engine (Optional)",
      bullets: ["Parameter changes", "DSP chain differences", "Audio differences"],
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-[radial-gradient(110%_95%_at_50%_0%,rgba(14,116,144,0.25),rgba(2,6,23,0.96)_62%)] p-4 md:p-6">
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">Versioning Layer</p>
        <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">State Persistence and History</h3>
        <p className="mt-2 text-sm text-slate-300">
          Captures execution results, stores immutable versions, and enables restore and comparison over time.
        </p>
      </div>

      <div className="mb-5 rounded-xl border border-cyan-500/20 bg-slate-900/70 p-4">
        <p className="text-sm font-semibold text-slate-100">Flow</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Execution Result -{">"} Snapshot Builder -{">"} Version Manager -{">"} Storage Layer -{">"} History Tracker -{">"} Version Stored
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {components.map((item) => (
          <article key={item.title} className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
            <h4 className="text-base font-semibold text-white">{item.title}</h4>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
              {item.bullets.map((bullet) => (
                <li key={bullet}>• {bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
