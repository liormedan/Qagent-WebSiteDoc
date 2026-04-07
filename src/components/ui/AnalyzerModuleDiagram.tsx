const components = [
  {
    title: "Content Scanner",
    bullets: ["Text extraction", "Document scanning", "Basic summarization", "Content segmentation"],
  },
  {
    title: "Audio Recognizer",
    bullets: ["Speech-to-text", "Region and event segmentation", "Signal detection", "Audio feature extraction"],
  },
  {
    title: "System Data Parser",
    bullets: ["Metadata extraction", "JSON / CSV parsing", "Structured format detection", "Context attributes"],
  },
  {
    title: "Knowledge Fetcher",
    bullets: ["Context retrieval", "Internal data query", "Analysis enrichment", "Relevance filtering"],
  },
  {
    title: "Feature Extractor",
    bullets: ["Entity extraction", "Pattern detection", "Anomaly detection", "Relationship mapping"],
  },
  {
    title: "Structure Builder",
    bullets: ["Data aggregation", "Schema normalization", "Entity organization", "Final structured output"],
  },
];

export function AnalyzerModuleDiagram() {
  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-cyan-500/20 bg-[radial-gradient(110%_95%_at_50%_0%,rgba(14,116,144,0.24),rgba(2,6,23,0.96)_62%)] p-4 md:p-6">
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">Module Architecture</p>
        <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Analyzer</h3>
        <p className="mt-2 text-sm text-slate-300">
          Interpretation module that transforms normalized inputs into structured, feature-rich representations for downstream reasoning.
        </p>
      </div>

      <div className="mb-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/85">Core Output</p>
        <p className="mt-1 text-sm font-medium text-slate-100">Structured representation, extracted features, and analysis metadata</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {components.map((item) => (
          <article key={item.title} className="rounded-xl border border-white/10 bg-slate-900/70 p-3">
            <h4 className="text-base font-semibold text-white">{item.title}</h4>
            <ul className="mt-2 space-y-1 text-xs text-slate-300">
              {item.bullets.map((bullet) => (
                <li key={bullet}>• {bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm font-semibold text-emerald-200">
        Output → Intent + Clarification
      </div>
    </div>
  );
}
