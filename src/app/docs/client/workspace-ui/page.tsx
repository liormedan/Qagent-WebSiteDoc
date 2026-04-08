import { DocsContent } from "@/components/layout/DocsContent";
import { ClientWorkspaceFlowDiagram } from "@/components/ui/ClientWorkspaceFlowDiagram";

export default function ClientWorkspaceUiPage() {
  return (
    <DocsContent>
    <main className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">Workspace UI — Overview</h1>
        <p className="text-base text-[var(--muted)]">
          The Workspace UI is the structural and organizational layer of the WaveQ client.
        </p>
        <p className="text-base text-[var(--muted)]">
          It defines how different UI components (Chat, Canvas, and Runtime) are arranged, connected, and accessed by the user.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Role in the System</h2>
        <ClientWorkspaceFlowDiagram />
        <p className="text-[var(--muted)]">The Workspace UI is the container and coordinator of the Client Layer.</p>
        <p className="text-[var(--muted)]">
          It ensures that all components operate within a coherent and navigable environment.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Interaction Flow</h2>
        <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">
{`User Navigation -> Workspace UI -> Chat / Canvas -> System Response -> Workspace Update`}
        </pre>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Core Responsibilities</h2>
        <div className="space-y-2 text-[var(--muted)]">
          <p>
            <span className="font-semibold text-slate-100">1. Layout Composition</span>: define overall UI structure and manage positioning of Chat,
            Canvas, and navigation areas.
          </p>
          <p>
            <span className="font-semibold text-slate-100">2. Navigation Management</span>: enable switching between Chat, Canvas, and Export while
            keeping navigation intuitive.
          </p>
          <p>
            <span className="font-semibold text-slate-100">3. Session Management</span>: track active session and maintain continuity across views.
          </p>
          <p>
            <span className="font-semibold text-slate-100">4. Global State Awareness</span>: reflect active project, selected file, and execution
            state in synchronized UI.
          </p>
          <p>
            <span className="font-semibold text-slate-100">5. System Coordination</span>: connect Chat UI and Canvas UI with consistent data flow and
            unified experience.
          </p>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Boundaries (Does Not Do)</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Interpret user intent</li>
          <li>Generate UI dynamically (Canvas responsibility)</li>
          <li>Execute processing</li>
          <li>Manage API Server jobs</li>
          <li>Contain business logic</li>
        </ul>
        <p className="text-[var(--muted)]">It is purely structural and coordinative.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Connected Components</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Chat UI</li>
          <li>Canvas UI</li>
          <li>Client Runtime</li>
          <li>QAgent (indirectly via data flow)</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Design Principles</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Structural clarity: clear and predictable layout</li>
          <li>Minimal friction: easy navigation with no unnecessary steps</li>
          <li>Persistent context: no loss of user state between views</li>
          <li>Consistency: unified behavior across all views</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Capabilities</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Multi-view navigation</li>
          <li>Session switching</li>
          <li>Layout orchestration</li>
          <li>Global state coordination</li>
          <li>Unified UI experience</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Mental Model</h2>
        <p className="text-[var(--muted)]">Workspace = Operating Environment.</p>
        <p className="text-[var(--muted)]">It is the space where conversations happen, workflows are visualized, and execution is controlled.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Interaction with Other Layers</h2>
        <div className="space-y-2 text-[var(--muted)]">
          <p><span className="font-semibold text-slate-100">With Chat UI</span>: receives user actions and displays the conversation panel.</p>
          <p><span className="font-semibold text-slate-100">With Canvas UI</span>: hosts visual execution environment and maintains synchronization.</p>
          <p><span className="font-semibold text-slate-100">With Client Runtime</span>: reflects execution state globally and updates UI accordingly.</p>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Integration Note</h2>
        <p className="text-[var(--muted)]">
          Workspace coordinates Chat, Canvas, and Runtime into a unified interaction environment.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Future Extensions</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Multi-project workspace</li>
          <li>Collaborative sessions</li>
          <li>Workspace presets</li>
          <li>Custom layouts</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Summary</h2>
        <p className="text-[var(--muted)]">
          Workspace UI is the structural backbone of the frontend, the coordinator of UI components, and the environment in which WaveQ operates.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Implementation Note</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>No business logic</li>
          <li>No Gen UI generation</li>
          <li>No DSP behavior</li>
          <li>Focus only on layout, navigation, and orchestration</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">WaveQ Frontend Project Structure</h2>
        <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">
{`WaveQ Frontend
├── app/ (Next.js App Router)
│   ├── layout.tsx
│   ├── page.tsx
│   │
│   ├── workspace/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   │
│   │   ├── chat/
│   │   │   └── page.tsx
│   │   │
│   │   ├── canvas/
│   │   │   └── page.tsx
│   │   │
│   │   ├── export/
│   │   │   └── page.tsx
│   │   │
│   │   └── settings/
│   │       └── page.tsx
│   │
│   ├── docs/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── qagent/
│   │   ├── api/
│   │   └── client/
│   │
│   └── share/
│       └── page.tsx
│
├── shared/
│   ├── components/
│   │   ├── ui/ (shadcn)
│   │   ├── layout/
│   │   │   ├── workspace-layout.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── header.tsx
│   │   │
│   │   ├── chat/
│   │   │   ├── chat.tsx
│   │   │   ├── message-list.tsx
│   │   │   ├── message-item.tsx
│   │   │   ├── chat-input.tsx
│   │   │   └── approvals-panel.tsx
│   │   │
│   │   ├── canvas/
│   │   │   ├── main-canvas.tsx
│   │   │   ├── audio-canvas-runtime.tsx
│   │   │   ├── waveform-view.tsx
│   │   │   ├── pipeline-block.tsx
│   │   │   ├── pipeline-view.tsx
│   │   │   ├── timeline.tsx
│   │   │   └── canvas-controls.tsx
│   │   │
│   │   ├── audio/
│   │   │   ├── audio-player.tsx
│   │   │   ├── transport-controls.tsx
│   │   │   └── volume-meter.tsx
│   │   │
│   │   ├── export/
│   │   │   ├── export-panel.tsx
│   │   │   └── export-status.tsx
│   │   │
│   │   └── docs/
│   │       ├── docs-header.tsx
│   │       ├── docs-sidebar.tsx
│   │       └── docs-pager.tsx
│   │
│   ├── lib/
│   │   ├── utils/
│   │   │   ├── cn.ts
│   │   │   └── helpers.ts
│   │   │
│   │   ├── api/
│   │   │   ├── qagent-client.ts
│   │   │   └── api-client.ts
│   │   │
│   │   ├── state/
│   │   │   ├── chat-store.ts
│   │   │   ├── canvas-store.ts
│   │   │   ├── audio-store.ts
│   │   │   ├── session-store.ts
│   │   │   └── ui-store.ts
│   │   │
│   │   ├── audio/
│   │   │   ├── audio-engine.ts
│   │   │   ├── audio-buffer-cache.ts
│   │   │   ├── waveform-cache.ts
│   │   │   └── audio-utils.ts
│   │   │
│   │   ├── canvas/
│   │   │   ├── canvas-engine.ts
│   │   │   ├── canvas-actions.ts
│   │   │   ├── canvas-to-dsp.ts
│   │   │   └── canvas-serializer.ts
│   │   │
│   │   ├── chat/
│   │   │   ├── chat-handler.ts
│   │   │   ├── message-parser.ts
│   │   │   └── chat-canvas-bridge.ts
│   │   │
│   │   └── runtime/
│   │       ├── execution-dispatcher.ts
│   │       ├── pipeline-runner.ts
│   │       └── status-tracker.ts
│   │
│   └── hooks/
│       ├── use-chat.ts
│       ├── use-canvas.ts
│       ├── use-audio.ts
│       ├── use-session.ts
│       └── use-execution.ts
│
├── features/
│   ├── q-agent/
│   │   ├── q-runner.ts
│   │   ├── plan-store.ts
│   │   └── approval-store.ts
│   │
│   ├── export/
│   │   ├── export-store.ts
│   │   └── export-logic.ts
│   │
│   └── audio-processing/
│       ├── processors/
│       └── dsp-preview.ts
│
├── services/
│   ├── auth/
│   │   └── clerk.ts
│   │
│   ├── firebase/
│   │   ├── firestore.ts
│   │   └── storage.ts
│   │
│   └── analytics/
│       └── tracking.ts
│
├── styles/
│   ├── globals.css
│   └── theme.css
│
├── public/
│   └── assets/
│
└── types/
    ├── chat.ts
    ├── canvas.ts
    ├── audio.ts
    ├── plan.ts
    └── session.ts`}
        </pre>
      </section>
    </main>
    </DocsContent>
  );
}
