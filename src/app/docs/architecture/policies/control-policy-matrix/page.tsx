import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { QAGENT_CANONICAL_FLOW } from "@/lib/qagent-canonical";

const matrix = [
  "file intake | trigger: QCore | validate: Files Handler | enforce: QCore | block: Files Handler/QCore | execute: Files Handler",
  "analysis | trigger: QCore | validate: Analyzer | enforce: QCore | block: Analyzer/Flow Controller | execute: Analyzer",
  "intent | trigger: QCore | validate: Intent Validator | enforce: QCore | block: Ambiguity Detector | execute: Intent + Clarification",
  "planning | trigger: QCore | validate: Constraint Resolver | enforce: QCore | block: DAL | execute: DAL",
  "UI generation | trigger: DAL plan handoff | validate: UAgent component registry | enforce: QCore policy | block: UAgent | execute: UAgent",
  "approval | trigger: Approval Triggering | validate: User Confirmation Handling + approval state checks | enforce: QCore Enforcement | block: QCore Enforcement | execute: Approval layer",
  "execution | trigger: approved plan | validate: DAgent preflight validation | enforce: QCore + Flow Controller | block: QCore Enforcement/DAgent | execute: DAgent",
  "versioning | trigger: DAgent result | validate: Version Manager + Storage validation | enforce: QCore policy | block: Versioning integrity guard | execute: Versioning",
  "restore | trigger: user restore request | validate: Restore Engine + state validation | enforce: QCore | block: Restore Engine | execute: Restore Engine",
];

export default function ControlPolicyMatrixPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Control Policy Matrix"
        description="Authoritative authority matrix defining who can trigger, validate, enforce, block, and execute at each system stage."
      />
      <div className="flex flex-col gap-5">
        <SectionBlock
          title="Architecture Diagram"
          body={[]}
          collapsible
        >
          <div className="rounded-xl border border-cyan-500/20 bg-slate-950/50 p-4">
            <div className="grid gap-2 md:grid-cols-5">
              {["Trigger", "Validate", "Enforce", "Block", "Execute"].map((item, index) => (
                <div key={item} className="text-center">
                  <div className={index === 2 ? "rounded-md border border-cyan-400/40 bg-cyan-500/10 px-2 py-2 text-xs font-semibold text-cyan-100" : "rounded-md border border-white/10 bg-slate-900/70 px-2 py-2 text-xs text-slate-200"}>
                    {item}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-center text-xs text-slate-400">QCore is enforcement authority across all critical stages</p>
          </div>
        </SectionBlock>
        <SectionBlock
          title="Control Matrix"
          body={matrix}
          collapsible
        />
        <SectionBlock title="Canonical Flow" body={[QAGENT_CANONICAL_FLOW]} collapsible />
        <SectionBlock
          title="Summary"
          body={[
            "This matrix is mandatory for implementation and governance audits.",
            "Any new stage or module must declare trigger/validate/enforce/block/execute ownership before integration.",
          ]}
          collapsible
        />
      </div>
    </DocsContent>
  );
}
