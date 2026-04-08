import { DocsContent } from "@/components/layout/DocsContent";
import { ClientCapabilitiesDiagram } from "@/components/ui/ClientCapabilitiesDiagram";
import { ClientLayerDiagram } from "@/components/ui/ClientLayerDiagram";
import { ClientSurfaceDiagram } from "@/components/ui/ClientSurfaceDiagram";
import { CLIENT_LAYER_CANONICAL_NAME, CLIENT_LAYER_DOC_SOURCE_OF_TRUTH } from "@/lib/client-canonical";

export default function ClientOverviewPage() {
  return (
    <DocsContent>
    <main className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">{CLIENT_LAYER_CANONICAL_NAME} - Overview</h1>
        <p className="text-base text-[var(--muted)]">
          {CLIENT_LAYER_CANONICAL_NAME} is the user-facing interface of WaveQ.
        </p>
        <p className="text-sm text-emerald-300">Status: LOCKED (structure)</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Purpose</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Capturing user input</li>
          <li>Displaying system state and feedback</li>
          <li>Rendering audio workflows visually</li>
          <li>Providing real-time interaction with the system</li>
        </ul>
        <p className="text-base text-[var(--muted)]">It is the layer where human ↔ system interaction happens.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Role in the System</h2>
        <p className="text-[var(--muted)]">WaveQ is composed of three main layers:</p>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>{CLIENT_LAYER_CANONICAL_NAME}: User experience</li>
          <li>QAgent Layer: Decision making (Brain)</li>
          <li>API Server Layer: Execution orchestration</li>
        </ul>
        <p className="text-[var(--muted)]">The Client Layer acts as the bridge between user intent and system intelligence.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">System Interaction Flow</h2>
        <ClientLayerDiagram />
        <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">
{`User -> Client (Chat / Canvas)
        |
     QAgent
        |
     API Server
        |
      Result
        |
 Client (UI update)`}
        </pre>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Responsibilities</h2>
        <div className="space-y-2 text-[var(--muted)]">
          <p>
            <span className="font-semibold text-slate-100">1. User Interaction</span>: receive user input (text, files, actions), provide Chat
            interface, and support approvals/confirmations.
          </p>
          <p>
            <span className="font-semibold text-slate-100">2. Visual Workflow Representation</span>: display audio pipeline, visual blocks, and
            real-time state.
          </p>
          <p>
            <span className="font-semibold text-slate-100">3. Real-time Feedback</span>: show loading/running/done states, progress indicators, and
            instant system responses.
          </p>
          <p>
            <span className="font-semibold text-slate-100">4. Audio Preview</span>: play processed audio in real-time for quick iteration before full
            execution.
          </p>
          <p>
            <span className="font-semibold text-slate-100">5. State Management</span>: maintain chat/canvas/selection state, sync with QAgent, and
            preserve session continuity.
          </p>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Non-Responsibilities (Boundaries)</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Perform intent detection</li>
          <li>Build execution plans</li>
          <li>Execute heavy processing</li>
          <li>Manage job queues</li>
          <li>Contain business logic</li>
        </ul>
        <p className="text-[var(--muted)]">These belong to QAgent and API Server.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Design Principles</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Reactive UI: always reflects current system state</li>
          <li>Separation from logic: decisions are delegated to QAgent</li>
          <li>Real-time experience: immediate audio + visual feedback without blocking</li>
          <li>Visual clarity: pipeline and actions remain visible and traceable</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Core Components</h2>
        <ClientSurfaceDiagram />
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Chat UI: user input, conversation history, approval prompts, session context</li>
          <li>Canvas UI: waveform view, pipeline blocks, execution state, export actions</li>
          <li>Workspace UI: sidebar/header navigation, project/session switching, docs/tools access</li>
          <li>Client Runtime: audio preview engine, canvas state, UI sync, auth session handling</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Capabilities</h2>
        <ClientCapabilitiesDiagram />
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Interactive chat-based control</li>
          <li>Visual audio pipeline editing</li>
          <li>Real-time audio preview</li>
          <li>Dynamic UI updates</li>
          <li>Session-based interaction</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Technologies</h2>
        <div className="space-y-2 text-[var(--muted)]">
          <p><span className="font-semibold text-slate-100">Frontend Framework</span>: React / Next.js</p>
          <p><span className="font-semibold text-slate-100">UI System</span>: Tailwind CSS, shadcn/ui components</p>
          <p><span className="font-semibold text-slate-100">State Management</span>: Zustand / React state</p>
          <p><span className="font-semibold text-slate-100">Audio Processing (Client-side)</span>: Web Audio API, OfflineAudioContext</p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Integration with QAgent</h2>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-100">Input to QAgent</p>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{`{
  "message": "...",
  "files": [...]
}`}</pre>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-100">Output from QAgent</p>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{`{
  "intent": "...",
  "plan": [...],
  "requiresApproval": true
}`}</pre>
        </div>
        <p className="text-[var(--muted)]">
          Behavior: sends user input to QAgent, receives structured response, updates UI accordingly, and triggers approval or execution flows.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Mental Model</h2>
        <p className="text-[var(--muted)]">
          Think of the Client Layer as the Interface Brain Extension: it does not decide, it makes decisions visible, and allows users to interact
          with them.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Future Evolution</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Fully interactive audio canvas (editor-like)</li>
          <li>Drag-and-drop pipeline editing</li>
          <li>Real-time collaborative sessions</li>
          <li>Voice interaction</li>
          <li>AI-assisted UI suggestions</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Summary</h2>
        <p className="text-[var(--muted)]">
          The Client Layer is the user experience layer, the visual representation of the system, and the interaction point between human and AI.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Anti-Patterns</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Rendering UI from execution plan</li>
          <li>Mixing DSP logic inside UI</li>
          <li>Letting Canvas decide structure</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Source of Truth</h2>
        <p className="text-[var(--muted)]">
          Canonical location: <span className="font-semibold text-slate-100">{CLIENT_LAYER_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>
        </p>
        <p className="text-[var(--muted)]">{CLIENT_LAYER_DOC_SOURCE_OF_TRUTH.rule}</p>
      </section>
    </main>
    </DocsContent>
  );
}
