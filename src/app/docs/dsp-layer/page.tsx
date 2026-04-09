import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";

export default function DspLayerPage() {
  return (
    <DocsContent>
      <PageTitle title="DSP / Processing Layer" description="Canonical layer page for DSP and processing concerns." />
      <p className="text-sm text-emerald-300">Status: Ready for Implementation</p>
      <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <p><span className="font-semibold">What it does:</span> Defines processing responsibilities for audio transformation workloads.</p>
        <p><span className="font-semibold">What it receives:</span> Execution-time processing instructions from execution modules.</p>
        <p><span className="font-semibold">What it returns:</span> Processed audio artifacts and execution outputs.</p>
        <p><span className="font-semibold">Who owns it:</span> DSP / Processing Layer.</p>
      </section>
      <div className="space-y-2 rounded-md border border-[var(--border)] bg-slate-950/30 p-4 text-sm text-[var(--muted)]">
        <p>This is the canonical page for the DSP / Processing Layer.</p>
        <p>DSP Engine Abstraction is documented as a child page.</p>
        <Link href="/docs/architecture/dagent/dsp-engine-abstraction" className="font-medium text-[var(--accent)] hover:underline">
          Open DSP Engine Abstraction (child page)
        </Link>
      </div>
    </DocsContent>
  );
}
