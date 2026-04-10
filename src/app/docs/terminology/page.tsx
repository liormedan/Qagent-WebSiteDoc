import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

export default function TerminologyPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Terminology"
        description="Canonical terminology to keep architecture, implementation, and communication aligned."
      />
      <div className="flex flex-col gap-5">
        <SectionBlock
          title="QAgent"
          body={["The decision and planning layer that orchestrates QCore flow, approvals, and execution handoff to API Server Layer."]}
          collapsible
        />
        <SectionBlock title="QCore" body={["The central runtime orchestrator that controls flow, validates transitions, and routes between modules."]} collapsible />
        <SectionBlock title="Plan" body={["A structured action model produced by DAL describing what should happen, in what order, and with which tools/UI elements."]} collapsible />
        <SectionBlock
          title="Execution"
          body={["The API Server runtime phase where Execution Layer runs approved work and emits the canonical Execution Result Package."]}
          collapsible
        />
        <SectionBlock title="Snapshot" body={["A complete state capture of outputs, parameters, and metadata at a point in time for traceability and restore."]} collapsible />
        <SectionBlock title="Version" body={["An immutable persisted system result linked to lineage IDs and history timeline for compare/restore workflows."]} collapsible />
      </div>
    </DocsContent>
  );
}
