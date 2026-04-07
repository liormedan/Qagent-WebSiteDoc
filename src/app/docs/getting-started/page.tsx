import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

export default function GettingStartedPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Getting Started"
        description="Simple entry point to understand what QAgent is, how it works, and how to navigate the architecture."
      />
      <div className="flex flex-col gap-5">
        <SectionBlock
          title="What is QAgent"
          body={[
            "QAgent is an AI-driven audio workflow system.",
            "It helps users move from request to controlled output with clear review points, instead of one-shot opaque automation.",
          ]}
          collapsible
        />
        <SectionBlock
          title="How it works (high-level)"
          body={[
            "User -> QCore -> System Modules -> Output.",
            "QCore orchestrates the flow, modules do specialized work, and Versioning preserves results for compare/restore.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Core Concepts"
          body={[
            "QCore: orchestrates the runtime loop and control boundaries.",
            "DAL: turns validated intent into executable and UI plans.",
            "UAgent: renders plan interaction and captures user actions.",
            "DAgent: executes approved actions, including DSP runtime operations.",
            "Versioning: stores immutable outputs and history for traceability and restore.",
          ]}
          collapsible
        />
        <SectionBlock
          title="First mental model"
          body={[
            "Think of QAgent like Cursor, but for audio workflows.",
            "It keeps planning, approval, execution, and version control explicit and auditable.",
          ]}
          collapsible
        />
      </div>
    </DocsContent>
  );
}
