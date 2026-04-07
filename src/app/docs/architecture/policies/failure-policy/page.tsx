import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

export default function FailurePolicyPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Unified Failure Policy"
        description="System-wide failure taxonomy, retry rules, escalation path, and fallback strategy for deterministic resilience."
      />
      <div className="flex flex-col gap-5">
        <SectionBlock
          title="Architecture Diagram"
          body={[]}
          collapsible
        >
          <div className="rounded-xl border border-cyan-500/20 bg-slate-950/50 p-4">
            <div className="grid gap-2 md:grid-cols-5">
              {["Error Event", "Classify", "Retry Budget", "Fallback / Escalate", "Abort / Continue"].map((item, index) => (
                <div key={item} className="text-center">
                  <div className={index === 1 ? "rounded-md border border-cyan-400/40 bg-cyan-500/10 px-2 py-2 text-xs font-semibold text-cyan-100" : "rounded-md border border-white/10 bg-slate-900/70 px-2 py-2 text-xs text-slate-200"}>
                    {item}
                  </div>
                  {index < 4 ? <div className="pt-1 text-cyan-300/80">→</div> : null}
                </div>
              ))}
            </div>
          </div>
        </SectionBlock>
        <SectionBlock
          title="Error Taxonomy"
          body={[
            "validation_error: contract mismatch, missing fields, invalid transitions.",
            "capability_error: unsupported model/tool/capability combination.",
            "runtime_error: orchestration/runtime state failures.",
            "execution_error: execution step failure inside DAgent or tool layer.",
            "storage_error: persistence/retrieval/version storage failure.",
            "approval_error: approval state mismatch, invalid approval signal, stale fingerprint.",
            "recovery_error: restore/rollback/recovery flow failure.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Retry Budget"
          body={[
            "validation_error: no retries, immediate reject.",
            "capability_error: 1 reroute attempt then fail.",
            "runtime_error: 2 retries with exponential backoff.",
            "execution_error: 1 safe retry then fallback path.",
            "storage_error: 3 retries then degraded persistence mode.",
            "approval_error: no retry until explicit user action.",
            "recovery_error: 1 retry then escalate to manual recovery mode.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Escalation Path"
          body={[
            "Module-local handling -> QCore policy evaluation -> user-facing notification via UAgent -> safe stop or fallback execution.",
            "Critical failures with data integrity risk trigger immediate abort and lock execution.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Abort Conditions"
          body={[
            "Contract violation at control boundary.",
            "Approval required but missing.",
            "Unrecoverable storage corruption.",
            "Inconsistent state that fails recovery constraints.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Partial Success Handling"
          body={[
            "Partial outputs must be flagged with degraded_status and linked to execution_id.",
            "Versioning stores partial result only if integrity rules pass and status is explicit.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Fallback Matrix"
          body={[
            "Analyzer fail -> return clarification request with minimal context path.",
            "Intent ambiguity -> clarification loop, no planning.",
            "DAL invalid plan -> regenerate plan with reduced scope.",
            "DSP execution failure -> switch safe execution mode or abort with preserved state.",
            "Storage failure -> queue deferred persistence and block restore entry until commit success.",
          ]}
          collapsible
        />
      </div>
    </DocsContent>
  );
}
