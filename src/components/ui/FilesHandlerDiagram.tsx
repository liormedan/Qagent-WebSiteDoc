"use client";

export default function FilesHandlerDiagram() {
  const steps = [
    {
      title: "Input Gateway",
      items: ["File uploads", "External links", "Previous files", "Drag and drop"],
    },
    {
      title: "File Validator",
      items: ["File type", "File size", "Format check", "Integrity check"],
    },
    {
      title: "File Normalizer",
      items: ["Standardize format", "Unify metadata", "Normalize structure"],
    },
    {
      title: "Metadata Extractor",
      items: ["File name", "Duration", "Format", "Sample rate"],
    },
    {
      title: "Storage Manager",
      items: ["Assign file ID", "Manage storage", "Access reference"],
    },
    {
      title: "File Registry",
      items: ["Session files", "Processed files", "File relationships"],
    },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-cyan-500/20 bg-[radial-gradient(110%_95%_at_50%_0%,rgba(14,116,144,0.24),rgba(2,6,23,0.96)_62%)] p-4 md:p-6">
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">Module Architecture</p>
        <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Files Handler</h3>
        <p className="mt-2 text-sm text-slate-300">
          Input processing layer responsible for ingesting, validating, normalizing, and registering files before analysis.
        </p>
      </div>

      <div className="mb-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-fuchsia-500/35 bg-fuchsia-500/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-200/90">Entry Point</p>
          <p className="mt-2 text-lg font-semibold text-white">QCore</p>
          <p className="mt-1 text-sm text-slate-300">Initiates file-driven workflow</p>
        </div>
        <div className="rounded-xl border border-cyan-500/35 bg-cyan-500/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/90">Module</p>
          <p className="mt-2 text-lg font-semibold text-white">Files Handler</p>
          <p className="mt-1 text-sm text-slate-300">Receives and prepares all incoming files</p>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3 md:p-4">
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div key={step.title}>
              <div className="rounded-lg border border-white/10 bg-slate-900/80 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-base font-semibold text-slate-100">{step.title}</p>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-cyan-300/80">Step {index + 1}</p>
                </div>
                <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                  {step.items.map((item) => (
                    <div key={item} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              {index < steps.length - 1 ? (
                <div className="flex justify-center py-1.5 text-cyan-300/90">
                  <span className="text-sm">↓</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm font-semibold text-emerald-200">
        Output → Analyzer
      </div>
    </div>
  );
}
