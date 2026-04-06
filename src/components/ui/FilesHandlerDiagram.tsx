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
    <div className="mx-auto w-full max-w-5xl rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-slate-900 to-slate-950 shadow-xl">
      <div className="border-b border-white/10 px-4 py-4 md:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Module Architecture</p>
        <p className="mt-1 text-xl font-bold md:text-2xl">Files Handler</p>
        <p className="mt-2 max-w-2xl text-xs text-slate-300 md:text-sm">
          Input processing layer responsible for ingesting, validating, normalizing, and registering files before analysis.
        </p>
      </div>

      <div className="space-y-5 px-4 py-5 md:px-6 md:py-6">
        <div className="grid gap-3 md:grid-cols-[1fr_56px_1fr] md:items-center">
          <div className="rounded-xl border border-fuchsia-500/40 bg-fuchsia-500/10 p-4 shadow-lg shadow-fuchsia-950/20">
            <div className="text-xs font-medium text-fuchsia-200">Entry Point</div>
            <div className="mt-1 text-lg font-bold">QCore</div>
            <div className="mt-1 text-xs text-slate-300">Initiates file-driven workflow</div>
          </div>

          <div className="hidden justify-center md:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-xs text-cyan-200">
              -&gt;
            </div>
          </div>

          <div className="rounded-xl border border-cyan-500/40 bg-cyan-500/10 p-4 shadow-lg shadow-cyan-950/20">
            <div className="text-xs font-medium text-cyan-200">Module</div>
            <div className="mt-1 text-lg font-bold">Files Handler</div>
            <div className="mt-1 text-xs text-slate-300">Receives and prepares all incoming files</div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[180px_1fr_180px]">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
            <div className="text-xs font-semibold text-cyan-200">Supported Inputs</div>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
              <li>Local uploads</li>
              <li>Drag and drop</li>
              <li>External links</li>
              <li>Previous session files</li>
            </ul>
          </div>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={step.title}>
                <div className="rounded-xl border border-white/10 bg-slate-900/80 p-4 shadow-lg">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-300/70">Step {index + 1}</div>
                      <p className="mt-1 text-base font-semibold">{step.title}</p>
                    </div>
                    <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-[10px] text-cyan-200">
                      Files Handler
                    </div>
                  </div>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {step.items.map((item) => (
                      <div key={item} className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-slate-200">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {index < steps.length - 1 ? (
                  <div className="flex justify-center py-1.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-xs text-cyan-200">
                      v
                    </div>
                  </div>
                ) : null}
              </div>
            ))}

            <div className="flex justify-center pt-1">
              <div className="flex h-10 min-w-48 items-center justify-center rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 text-sm font-semibold text-emerald-200 shadow-lg shadow-emerald-950/20">
                Output -&gt; Analyzer
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
            <div className="text-xs font-semibold text-cyan-200">Core Outcome</div>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
              <li>Validated file object</li>
              <li>Normalized structure</li>
              <li>Metadata extracted</li>
              <li>Stable file reference</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
