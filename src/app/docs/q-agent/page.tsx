import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { QAGENT_CANONICAL_FLOW, QAGENT_DOC_SOURCE_OF_TRUTH } from "@/lib/qagent-canonical";

const qagentSubsections = [
  {
    title: "QAgent Scope",
    lines: [
      "What it is: QAgent is the orchestration and reasoning layer between client interaction and API execution.",
      "Responsible for intent and planning orchestration.",
      "Does NOT execute API runtime jobs directly.",
      "Inputs: user context, analyzer evidence, lineage metadata.",
      "Outputs: approved execution handoff and lineage references.",
    ],
  },
  {
    title: "Intent Intake",
    lines: [
      "What it is: intake stage that transforms user requests into structured intent candidates.",
      "Responsible for intent signal normalization.",
      "Does NOT decide API policy/retry behavior.",
      "Inputs: user request and contextual evidence.",
      "Outputs: structured intent candidate.",
    ],
  },
  {
    title: "Clarification Gate",
    lines: [
      "What it is: ambiguity gate that blocks unclear requests before planning.",
      "Responsible for clarification enforcement.",
      "Does NOT bypass unresolved ambiguity.",
      "Inputs: intent candidate and ambiguity checks.",
      "Outputs: clarified/validated intent or clarification-required state.",
    ],
  },
  {
    title: "DAL Construction",
    lines: [
      "What it is: planning stage that builds executable and UI plan structures.",
      "Responsible for deterministic plan composition.",
      "Does NOT execute tools/jobs.",
      "Inputs: validated intent and constraints.",
      "Outputs: execution graph and UI plan package.",
    ],
  },
  {
    title: "Approval Gate",
    lines: [
      "What it is: user-approval enforcement stage before execution handoff.",
      "Responsible for approval gating integrity.",
      "Does NOT mutate approved semantics after gate decision.",
      "Inputs: approval-ready plan and user decision.",
      "Outputs: approved/rejected gate result and handoff eligibility.",
    ],
  },
];

export default function QAgentPage() {
  return (
    <DocsContent>
      <PageTitle title="QAgent Layer" description="Canonical layer page for QAgent responsibilities, gates, and execution handoff semantics." />
      <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <p><span className="font-semibold">What it does:</span> Converts user goals into approved execution-ready handoff artifacts.</p>
        <p><span className="font-semibold">What it receives:</span> Client context, intent signals, and internal analysis evidence.</p>
        <p><span className="font-semibold">What it returns:</span> Approved execution request handoff and lineage references.</p>
        <p><span className="font-semibold">Owner:</span> QAgent Layer.</p>
      </section>

      <div className="flex flex-col gap-5">
        <SectionBlock
          title="Purpose"
          body={["QAgent Layer converts user goals into validated, approved, and traceable execution handoff artifacts for API Server Layer."]}
        >
          <p className="text-sm text-[var(--muted)]">
            Canonical concepts: <Link href="/docs/q-agent" className="text-[var(--accent)] hover:underline">QAgent</Link>,{" "}
            <Link href="/docs/architecture/modules/intent-clarification" className="text-[var(--accent)] hover:underline">Intent</Link>,{" "}
            <Link href="/docs/architecture/modules/dal" className="text-[var(--accent)] hover:underline">Plan</Link>.
          </p>
        </SectionBlock>

        <SectionBlock
          title="Responsibilities"
          body={[
            "Responsible for intent resolution, clarification gating, and plan construction.",
            "Handles approval-gated transition toward execution handoff.",
            "Owns QAgent-side lineage semantics and bridge readiness.",
          ]}
        />

        <SectionBlock
          title="Non-Responsibilities"
          body={[
            "Does NOT own API runtime job lifecycle authority.",
            "Does NOT redefine API status tracker ownership.",
            "Does NOT execute infrastructure-level runtime scheduling.",
          ]}
        />

        <SectionBlock
          title="Position in System"
          body={[
            "Before: Client Layer interaction and input capture.",
            "After: API Server Layer /run intake and job lifecycle orchestration.",
          ]}
        >
          <p className="text-sm text-[var(--muted)]">
            Cross-layer links: <Link href="/docs/client" className="text-[var(--accent)] hover:underline">Client Layer</Link>{" -> "}
            <Link href="/docs/api" className="text-[var(--accent)] hover:underline">API Server Layer</Link>.
          </p>
        </SectionBlock>

        <SectionBlock
          title="Inputs"
          body={[
            "Receives user interaction context and request payloads from Client Layer.",
            "Receives analysis/context evidence from upstream QAgent internal modules.",
          ]}
        />

        <SectionBlock
          title="Outputs"
          body={[
            "Produces approved execution handoff artifacts (Execution Request Envelope bridge context).",
            "Produces QAgent lineage references for status and version correlation.",
          ]}
        >
          <p className="text-sm text-[var(--muted)]">
            Contract links:{" "}
            <Link href="/docs/api" className="text-[var(--accent)] hover:underline">
              Execution Request Envelope
            </Link>
            , <Link href="/docs/api/job-orchestration" className="text-[var(--accent)] hover:underline">Job</Link>,{" "}
            <Link href="/docs/api/versioning" className="text-[var(--accent)] hover:underline">Version</Link>.
          </p>
        </SectionBlock>

        <SectionBlock
          title="Boundaries"
          body={[
            "QAgent MUST NOT redefine API endpoint semantics.",
            "QAgent MUST NOT replace API status/progress authority.",
            "QAgent MUST maintain canonical handoff mapping without post-approval semantic mutation.",
          ]}
        />

        <SectionBlock title="Canonical Flow" body={[QAGENT_CANONICAL_FLOW]} />

        {qagentSubsections.map((section) => (
          <SectionBlock key={section.title} title={section.title} body={section.lines} />
        ))}

        <SectionBlock
          title="Source of Truth"
          body={[
            `Canonical layer page: ${QAGENT_DOC_SOURCE_OF_TRUTH.canonicalLocation}.`,
            "This page is authoritative for QAgent layer role, boundaries, and canonical flow.",
            "Subpages and module pages are child specifications and must not redefine this layer contract.",
            QAGENT_DOC_SOURCE_OF_TRUTH.rule,
          ]}
        />
      </div>
    </DocsContent>
  );
}
