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
        <SectionBlock title="QAgent" body={["The complete system architecture that orchestrates planning, approval, execution, and versioning for audio workflows."]} collapsible />
        <SectionBlock title="QCore" body={["The central runtime orchestrator that controls flow, validates transitions, and routes between modules."]} collapsible />
        <SectionBlock title="Plan" body={["A structured action model produced by DAL describing what should happen, in what order, and with which tools/UI elements."]} collapsible />
        <SectionBlock title="Execution" body={["The runtime phase where DAgent executes approved operations and produces concrete outputs."]} collapsible />
        <SectionBlock title="Snapshot" body={["A complete state capture of outputs, parameters, and metadata at a point in time for traceability and restore."]} collapsible />
        <SectionBlock title="Version" body={["An immutable persisted system result linked to lineage IDs and history timeline for compare/restore workflows."]} collapsible />
      </div>
    </DocsContent>
  );
}
