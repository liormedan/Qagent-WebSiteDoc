import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

export default function ApprovalModifyLoopContractPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Approval Modify Loop Contract"
        description="Standard contract defining deterministic behavior when user selects Modify during approval."
      />
      <div className="flex flex-col gap-5">
        <SectionBlock
          title="Architecture Diagram"
          body={[]}
          collapsible
        >
          <div className="rounded-xl border border-cyan-500/20 bg-slate-950/50 p-4">
            <div className="grid gap-2 md:grid-cols-6">
              {["Approval", "Modify", "Return to DAL", "Regenerate Plan", "Regenerate UI", "New Approval"].map((item, index) => (
                <div key={item} className="text-center">
                  <div className={index === 1 ? "rounded-md border border-cyan-400/40 bg-cyan-500/10 px-2 py-2 text-xs font-semibold text-cyan-100" : "rounded-md border border-white/10 bg-slate-900/70 px-2 py-2 text-xs text-slate-200"}>
                    {item}
                  </div>
                  {index < 5 ? <div className="pt-1 text-cyan-300/80">→</div> : null}
                </div>
              ))}
            </div>
          </div>
        </SectionBlock>
        <SectionBlock
          title="Overview"
          body={[
            "Modify is a controlled loopback path, not a partial patch over an approved plan.",
            "Any modify action invalidates prior approval context and requires a full re-approval cycle.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Contract Rules"
          body={[
            "Previous approval state becomes invalid and set to superseded.",
            "DAL must regenerate full plan from updated intent/context.",
            "Approval fingerprint must be regenerated from the new plan payload.",
            "All prior signatures are discarded and cannot be reused.",
            "Re-entry point is DAL planning stage followed by UAgent refresh and new Approval request.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Flow"
          body={[
            "Approval",
            "-> Modify",
            "-> Return to DAL",
            "-> Regenerate Plan",
            "-> Regenerate UI",
            "-> New Approval Request",
          ]}
          collapsible
        />
        <SectionBlock
          title="Control Boundary"
          body={[
            "Approval module captures modify signal.",
            "QCore enforces invalidation and blocks execution until new approval is granted.",
          ]}
          collapsible
        />
      </div>
    </DocsContent>
  );
}
