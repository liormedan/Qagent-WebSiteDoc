import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

export default function VersionManagerPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Version Manager"
        description="Versioning submodule responsible for version lifecycle control and immutable version state transitions."
      />
      <div className="flex flex-col gap-5">
        <SectionBlock
          title="Architecture Diagram"
          body={[]}
          collapsible
        >
          <div className="rounded-xl border border-cyan-500/20 bg-slate-950/50 p-4">
            <div className="grid gap-2 md:grid-cols-4">
              {["Snapshot Builder", "Version Manager", "Storage Layer", "History Tracker"].map((item, index) => (
                <div key={item} className="text-center">
                  <div className={index === 1 ? "rounded-md border border-cyan-400/40 bg-cyan-500/10 px-2 py-2 text-xs font-semibold text-cyan-100" : "rounded-md border border-white/10 bg-slate-900/70 px-2 py-2 text-xs text-slate-200"}>
                    {item}
                  </div>
                  {index < 3 ? <div className="pt-1 text-cyan-300/80">→</div> : null}
                </div>
              ))}
            </div>
          </div>
        </SectionBlock>
        <SectionBlock
          title="Overview"
          body={[
            "Version Manager governs the lifecycle of version entities in the system.",
            "It creates, updates, and deprecates version records while preserving traceability and immutability guarantees.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Responsibilities"
          body={[
            "Create version records from snapshot payloads.",
            "Assign version identifiers and lifecycle status.",
            "Update version state transitions with policy enforcement.",
            "Ensure immutable baseline behavior after version creation.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Flow"
          body={[
            "Snapshot Builder Output -> Version Manager Create -> Storage Layer Persist -> History Tracker Update.",
            "For updates: Version Lookup -> Transition Validation -> Metadata Update -> History Propagation.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Control Boundary"
          body={[
            "Version Manager controls lifecycle metadata and version state transitions.",
            "It does not execute DSP, does not render UI, and does not store binary artifacts directly.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Inputs / Outputs"
          body={[
            "Inputs: snapshot object, request_id, session_id, execution_id, version metadata.",
            "Outputs: version_id, lifecycle state record, transition event payload.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Failure Handling"
          body={[
            "Invalid snapshot contract -> reject version creation.",
            "Version ID collision -> regenerate ID and re-validate uniqueness.",
            "Transition policy violation -> block state mutation and escalate to QCore.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Integration Points"
          body={[
            "Upstream: Snapshot Builder and DAgent execution result contract.",
            "Downstream: Storage Layer persistence, History Tracker timeline updates, Restore Engine lookup path.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Outputs"
          body={[
            "Version ID and lifecycle status.",
            "Version metadata record.",
            "Transition event payload for History Tracker.",
          ]}
          collapsible
        />
      </div>
    </DocsContent>
  );
}
