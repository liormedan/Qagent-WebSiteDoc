import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";

export default function AuthSecurityPage() {
  return (
    <DocsContent>
      <PageTitle title="Auth & Security Layer" description="Canonical layer page for access, isolation, and security boundaries." />
      <p className="text-sm text-emerald-300">Status: Ready for Implementation</p>
      <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <p><span className="font-semibold">What it does:</span> Defines access, identity, and isolation boundaries across the system.</p>
        <p><span className="font-semibold">What it receives:</span> Security policies and session-boundary requirements.</p>
        <p><span className="font-semibold">What it returns:</span> Enforced authorization and isolation controls.</p>
        <p><span className="font-semibold">Who owns it:</span> Auth & Security Layer.</p>
      </section>
      <div className="space-y-2 rounded-md border border-[var(--border)] bg-slate-950/30 p-4 text-sm text-[var(--muted)]">
        <p>This is the canonical page for the Auth & Security Layer.</p>
        <p>Session Isolation is documented as a child policy page.</p>
        <Link href="/docs/architecture/policies/session-isolation" className="font-medium text-[var(--accent)] hover:underline">
          Open Session Isolation (child page)
        </Link>
      </div>
    </DocsContent>
  );
}
