import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

export default function SessionIsolationPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Multi-user and Session Isolation Spec"
        description="Isolation policy for tenants, sessions, execution ownership, and concurrency control."
      />
      <div className="flex flex-col gap-5">
        <SectionBlock
          title="Architecture Diagram"
          body={[]}
          collapsible
        >
          <div className="rounded-xl border border-cyan-500/20 bg-slate-950/50 p-4">
            <div className="grid gap-2 md:grid-cols-5">
              {["tenant_id", "session_id", "request_id", "execution_id", "version_id"].map((item, index) => (
                <div key={item} className="text-center">
                  <div className="rounded-md border border-white/10 bg-slate-900/70 px-2 py-2 text-xs text-slate-200">{item}</div>
                  {index < 4 ? <div className="pt-1 text-cyan-300/80">→</div> : null}
                </div>
              ))}
            </div>
            <p className="mt-2 text-center text-xs text-slate-400">Isolation enforced at each ownership boundary</p>
          </div>
        </SectionBlock>
        <SectionBlock
          title="Overview"
          body={[
            "This policy defines behavior under multi-user and multi-session conditions.",
            "It ensures isolation, ownership integrity, and deterministic conflict handling.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Isolation Rules"
          body={[
            "Tenant isolation: data, versions, and execution artifacts cannot cross tenant boundary.",
            "Session isolation: active state is scoped by session_id and cannot mutate another active session.",
            "Version ownership: version_id is owned by creator session/tenant and requires explicit share policy to access.",
            "Execution ownership: execution_id is bound to originating session and request lineage.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Locking and Conflict Handling"
          body={[
            "Write-lock required for plan execution and version commit within same session scope.",
            "Concurrent modify attempts on same active plan must resolve by first-lock-wins and second path to rebase flow.",
            "Conflict events are logged with request_id, session_id, actor_id, and conflict_type.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Shared Resource Policy"
          body={[
            "Shared resources must be read-only unless explicit ownership transfer contract exists.",
            "Resource lease TTL is required for long-running operations.",
            "Expired leases invalidate pending execution operations and force re-validation.",
          ]}
          collapsible
        />
      </div>
    </DocsContent>
  );
}
