import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";

export default function InfrastructureLayerPage() {
  return (
    <DocsContent>
      <PageTitle title="Infrastructure Layer" description="Canonical layer page for platform and implementation baseline surfaces." />
      <p className="text-sm text-emerald-300">Status: Ready for Implementation</p>
      <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <p><span className="font-semibold">What it does:</span> Defines runtime platform and deployment baseline boundaries.</p>
        <p><span className="font-semibold">What it receives:</span> Layer implementation requirements and runtime constraints.</p>
        <p><span className="font-semibold">What it returns:</span> Stable infrastructure capabilities for system execution.</p>
        <p><span className="font-semibold">Who owns it:</span> Infrastructure Layer.</p>
      </section>
      <div className="space-y-2 rounded-md border border-[var(--border)] bg-slate-950/30 p-4 text-sm text-[var(--muted)]">
        <p>This is the canonical page for the Infrastructure Layer.</p>
        <p>Implementation Baseline is documented as a child page.</p>
        <Link href="/docs/architecture/implementation-baseline" className="font-medium text-[var(--accent)] hover:underline">
          Open Implementation Baseline (child page)
        </Link>
      </div>
    </DocsContent>
  );
}
