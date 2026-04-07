import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

export default function LineageModelPage() {
  return (
    <DocsContent>
      <PageTitle
        title="End-to-End Lineage Model"
        description="Authoritative correlation model that tracks each request across all architecture layers."
      />
      <div className="flex flex-col gap-5">
        <SectionBlock
          title="Architecture Diagram"
          body={[]}
          collapsible
        >
          <div className="rounded-xl border border-cyan-500/20 bg-slate-950/50 p-4">
            <div className="grid gap-2 md:grid-cols-7">
              {["request_id", "decision_id", "plan_id", "approval_id", "execution_id", "version_id", "restore_id"].map((item, index) => (
                <div key={item} className="text-center">
                  <div className="rounded-md border border-white/10 bg-slate-900/70 px-1.5 py-2 text-[11px] text-slate-200">{item}</div>
                  {index < 6 ? <div className="pt-1 text-cyan-300/80">→</div> : null}
                </div>
              ))}
            </div>
            <p className="mt-2 text-center text-xs text-slate-400">session_id propagates across all stages</p>
          </div>
        </SectionBlock>
        <SectionBlock
          title="Overview"
          body={[
            "Lineage model defines traceability IDs, ownership, creation stage, and propagation rules.",
            "Every critical artifact must be traceable back to request_id and session_id.",
          ]}
          collapsible
        />
        <SectionBlock
          title="ID Definitions"
          body={[
            "request_id: created by QCore at intake; owner QCore; propagates to all modules.",
            "session_id: created at session start; owner State Manager; propagates across all loop iterations.",
            "decision_id: created after Intent validation; owner Intent + Clarification; propagates to DAL and downstream logs.",
            "plan_id: created by DAL Plan Formatter; owner DAL; propagates to UAgent, Approval, DAgent.",
            "execution_id: created by DAgent at execution start; owner DAgent; propagates to Versioning and runtime telemetry.",
            "version_id: created by Version Manager; owner Versioning; propagates to history, restore, and comparison paths.",
            "approval_id: created when Approval request is triggered; owner Approval; propagates to QCore enforcement and audit trail.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Linkage Rules"
          body={[
            "decision_id must reference exactly one request_id.",
            "plan_id must reference one decision_id and one request_id.",
            "execution_id must reference one plan_id.",
            "version_id must reference one execution_id.",
            "approval_id must reference one plan_id and one fingerprint.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Flow"
          body={[
            "User Input -> QCore creates request_id and attaches session_id.",
            "Intent produces decision_id -> DAL produces plan_id -> Approval produces approval_id -> DAgent produces execution_id -> Versioning produces version_id.",
            "Restore requests reference version_id and spawn restore_id while keeping original request lineage.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Summary"
          body={[
            "Lineage model is mandatory for observability, auditability, and deterministic recovery.",
            "No module may emit artifacts without required upstream lineage IDs.",
          ]}
          collapsible
        />
      </div>
    </DocsContent>
  );
}
