import { DocsContent } from "@/components/layout/DocsContent";
import { ClientChatFlowDiagram } from "@/components/ui/ClientChatFlowDiagram";

export default function ClientChatUiPage() {
  return (
    <DocsContent>
    <main className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">Chat UI — Overview</h1>
        <p className="text-base text-[var(--muted)]">
          The Chat UI is the primary conversational interface of WaveQ.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Purpose</h2>
        <p className="text-[var(--muted)]">
          It enables users to interact with the system using natural language, providing a structured and guided experience for initiating, refining,
          and approving actions.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Role in the System</h2>
        <p className="text-[var(--muted)]">The Chat UI is the entry point for user intent.</p>
        <p className="text-[var(--muted)]">
          It translates user interaction into a structured conversational flow that can be safely processed by QAgent.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Interaction Flow</h2>
        <ClientChatFlowDiagram />
        <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">
{`User Input -> Chat UI -> QAgent -> Response -> Chat UI -> User`}
        </pre>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Core Responsibilities</h2>
        <div className="space-y-2 text-[var(--muted)]">
          <p>
            <span className="font-semibold text-slate-100">1. User Input Handling</span>: capture user text, handle file attachments, and trigger
            actions from user commands.
          </p>
          <p>
            <span className="font-semibold text-slate-100">2. Conversation Rendering</span>: render full timeline and keep message flow clear and
            structured.
          </p>
          <p>
            <span className="font-semibold text-slate-100">3. Approval Management</span>: present approval requests, support accept/reject, and
            reflect approval state in real time.
          </p>
          <p>
            <span className="font-semibold text-slate-100">4. Session Context Exposure</span>: show current session state, active files, and workflow
            context.
          </p>
          <p>
            <span className="font-semibold text-slate-100">5. System Feedback</span>: display processing/waiting/completed states with immediate
            feedback.
          </p>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Boundaries (Does Not Do)</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Perform intent detection</li>
          <li>Classify or interpret user requests</li>
          <li>Build execution plans</li>
          <li>Dispatch backend execution jobs</li>
          <li>Contain business decision logic</li>
        </ul>
        <p className="text-[var(--muted)]">All logic is delegated to QAgent.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Interaction with QAgent</h2>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-100">Input to QAgent</p>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{`{
  "message": "...",
  "files": [...],
  "sessionId": "..."
}`}</pre>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-100">Output from QAgent</p>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{`{
  "intent": "...",
  "plan": [...],
  "requiresApproval": true,
  "message": "..."
}`}</pre>
        </div>
        <p className="text-[var(--muted)]">
          Sends user messages/actions to QAgent, receives structured responses, and renders clarification prompts, plan summaries, approval requests,
          and status updates.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Integration Note</h2>
        <p className="text-[var(--muted)]">
          Chat UI triggers QAgent, which produces both execution plans and <span className="font-mono">uiPlan</span> for Canvas rendering.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Design Principles</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Conversational clarity: every action must be explainable in chat</li>
          <li>Stateless UI, stateful system: UI reflects state without owning logic</li>
          <li>Guided interaction: lead users through explicit steps</li>
          <li>Immediate feedback: every action gets visible response</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Capabilities</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Natural language interaction</li>
          <li>Approval-based workflow control</li>
          <li>Session-aware conversation</li>
          <li>Real-time system feedback</li>
          <li>Structured AI communication</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Mental Model</h2>
        <p className="text-[var(--muted)]">
          Chat UI is the conversation layer of the system. It does not think, it does not execute, and it makes the system understandable and
          controllable.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Connected Components</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>QAgent (intent and planning)</li>
          <li>Canvas UI (visual execution layer)</li>
          <li>Client Runtime (state and execution feedback)</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Future Extensions</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Voice-based interaction</li>
          <li>Multi-turn intelligent clarification</li>
          <li>Context-aware suggestions</li>
          <li>Action shortcuts (quick commands)</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Summary</h2>
        <p className="text-[var(--muted)]">
          Chat UI is the main interaction interface, the gateway for user intent, and the control surface for approvals and conversational flow.
        </p>
      </section>
    </main>
    </DocsContent>
  );
}
