import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";

export default function DataLayerPage() {
  return (
    <DocsContent>
      <PageTitle title="Data Layer" description="Canonical layer page for system data contracts, lineage, and data ownership." />
      <p className="text-sm text-emerald-300">Status: Ready for Implementation</p>
      <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <p><span className="font-semibold">What it does:</span> Defines canonical data structures, records, and lineage storage.</p>
        <p><span className="font-semibold">What it receives:</span> Structured entities and artifacts from QAgent and API layers.</p>
        <p><span className="font-semibold">What it returns:</span> Stored data references and retrievable historical entities.</p>
        <p><span className="font-semibold">Who owns it:</span> Data Layer.</p>
      </section>
      <div className="space-y-2 rounded-md border border-[var(--border)] bg-slate-950/30 p-4 text-sm text-[var(--muted)]">
        <p>This is the canonical page for the Data Layer.</p>
        <p>Schema Registry is documented as a child contract page.</p>
        <Link href="/docs/architecture/contracts/schema-registry" className="font-medium text-[var(--accent)] hover:underline">
          Open Schema Registry (child page)
        </Link>
      </div>
    </DocsContent>
  );
}
