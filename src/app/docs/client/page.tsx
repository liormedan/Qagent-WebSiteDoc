import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { CLIENT_LAYER_CANONICAL_NAME, CLIENT_LAYER_DOC_SOURCE_OF_TRUTH } from "@/lib/client-canonical";

const CLIENT_CANONICAL_FLOW =
  "User Input -> Client UI Surfaces (Chat/Canvas/Workspace) -> QAgent Request -> UI State Update -> API Status/Result Projection -> User-visible Output.";

export default function ClientOverviewPage() {
  return (
    <DocsContent>
      <PageTitle title={CLIENT_LAYER_CANONICAL_NAME} description="Canonical layer page for user interaction and UI/runtime ownership boundaries." />
      <p className="text-sm text-emerald-300">Status: Ready for Implementation</p>
      <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <p><span className="font-semibold">What it does:</span> Owns user interaction and UI runtime presentation.</p>
        <p><span className="font-semibold">What it receives:</span> User input and status/result projections from downstream layers.</p>
        <p><span className="font-semibold">What it returns:</span> Structured requests to QAgent and user-visible output updates.</p>
        <p><span className="font-semibold">Who owns it:</span> Client Layer.</p>
      </section>

      <div className="flex flex-col gap-5">
        <SectionBlock
          title="Purpose"
          body={[
            "Client Layer is the user-facing system boundary that captures input, renders state, and presents outputs with deterministic UI/runtime ownership.",
          ]}
          collapsible
        >
          <p className="text-sm text-[var(--muted)]">
            Canonical concepts: <Link href="/docs/client" className="text-[var(--accent)] hover:underline">Client Layer</Link>,{" "}
            <Link href="/docs/client/state-ownership" className="text-[var(--accent)] hover:underline">UI State</Link>,{" "}
            <Link href="/docs/client/state-ownership" className="text-[var(--accent)] hover:underline">Session</Link>.
          </p>
        </SectionBlock>

        <SectionBlock
          title="Responsibilities"
          body={[
            "Responsible for user interaction surfaces (Chat, Canvas, Workspace).",
            "Handles rendering of system state, progress, and result projections.",
            "Owns client-side UI/runtime state boundaries and event emission semantics.",
          ]}
          collapsible
        />

        <SectionBlock
          title="Non-Responsibilities"
          body={[
            "Does NOT interpret intent policy.",
            "Does NOT create execution plans.",
            "Does NOT own job lifecycle authority.",
            "Does NOT execute API runtime jobs.",
          ]}
          collapsible
        />

        <SectionBlock
          title="Position in System"
          body={[
            "Position: User -> Client Layer -> QAgent Layer -> API Server Layer -> Output.",
            "Before: user request and interaction intent.",
            "After: QAgent structured processing and API execution lifecycle.",
          ]}
          collapsible
        >
          <p className="text-sm text-[var(--muted)]">
            Cross-layer links: <Link href="/docs/q-agent" className="text-[var(--accent)] hover:underline">QAgent</Link>{" -> "}
            <Link href="/docs/api" className="text-[var(--accent)] hover:underline">API Server Layer</Link>.
          </p>
        </SectionBlock>

        <SectionBlock
          title="Inputs"
          body={[
            "Receives user input events and interaction actions from the user boundary.",
            "Receives plan/status/result projections from QAgent and API server surfaces.",
          ]}
          collapsible
        >
          <p className="text-sm text-[var(--muted)]">
            Linked concepts: <Link href="/docs/architecture/modules/dal" className="text-[var(--accent)] hover:underline">Plan</Link>,{" "}
            <Link href="/docs/api/versioning" className="text-[var(--accent)] hover:underline">Version</Link>.
          </p>
        </SectionBlock>

        <SectionBlock
          title="Outputs"
          body={[
            "Produces structured request events to QAgent.",
            "Produces deterministic UI state updates and output presentation for users.",
          ]}
          collapsible
        />

        <SectionBlock
          title="Boundaries"
          body={[
            "Client Layer MUST NOT redefine QAgent intent, approval, or planning semantics.",
            "Client Layer MUST NOT redefine API job status ownership.",
            "Job status/progress authority belongs to API Status Tracker, not client UI.",
          ]}
          collapsible
        />

        <SectionBlock title="Canonical Flow" body={[CLIENT_CANONICAL_FLOW]} collapsible />

        <SectionBlock
          title="Source of Truth"
          body={[
            `Canonical location: ${CLIENT_LAYER_DOC_SOURCE_OF_TRUTH.canonicalLocation}`,
            CLIENT_LAYER_DOC_SOURCE_OF_TRUTH.rule,
          ]}
          collapsible
        />
      </div>
    </DocsContent>
  );
}
