import { ApiArchitectureLayersDiagram } from "@/components/ui/ApiArchitectureLayersDiagram";

export default function ApiArchitecturePage() {
  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">API Server — Architecture</h1>
        <p className="text-base text-[var(--muted)]">Full WaveQ system architecture map and layer boundaries.</p>
        <p className="text-sm text-[var(--muted)]">Status: 🚧 In Progress</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">WaveQ System Map</h2>
        <ApiArchitectureLayersDiagram />
        <p className="text-sm text-[var(--muted)]">Short Version</p>
        <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">
{`WaveQ
├── Frontend Layer
│   ├── Chat
│   ├── Canvas
│   └── Workspace UI
│
├── QAgent Layer
│   ├── Intent
│   ├── Planning
│   ├── Approval
│   └── Execution Bridge
│
├── API Server Layer
│   ├── Request Intake
│   ├── Queue / Jobs
│   ├── Workers
│   └── Execution Engine
│
├── Processing Layer
│   ├── Client DSP Preview
│   └── Backend DSP Execution
│
├── Data Layer
│   ├── Users / Workspaces
│   ├── Chats / Sessions
│   ├── Files / Artifacts
│   └── Jobs / Results
│
├── Infrastructure Layer
│   ├── Vercel
│   ├── Cloud Run
│   ├── Firestore
│   └── Storage / Queue
│
└── Documentation Layer
    ├── QAgent Docs
    └── API Server Docs`}
        </pre>
        <p className="text-sm text-[var(--muted)]">Detailed Version</p>
        <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">
{`WaveQ
├── 1. Client / Frontend Layer
│   ├── Chat UI
│   │   ├── User Input
│   │   ├── Conversation View
│   │   ├── Approvals UI
│   │   └── Session Context Display
│   │
│   ├── Canvas UI
│   │   ├── Audio Canvas
│   │   ├── Pipeline Blocks
│   │   ├── Waveform View
│   │   ├── Status / Progress View
│   │   └── Export Trigger UI
│   │
│   ├── Workspace UI
│   │   ├── Sidebar Navigation
│   │   ├── Header / Top Navigation
│   │   ├── Docs Access
│   │   └── Project / Session Switching
│   │
│   └── Client Runtime
│       ├── Audio Preview Engine
│       ├── Canvas State
│       ├── UI State
│       └── Auth Session Handling
│
├── 2. QAgent Layer (Brain / Orchestrator)
│   ├── API Entry
│   │   └── /api/q/run
│   │
│   ├── QRunner
│   │   └── Main Orchestration Flow
│   │
│   ├── Core Modules
│   │   ├── Context Builder
│   │   ├── Files Handler
│   │   ├── Analyzer
│   │   ├── Intent Detector
│   │   ├── Plan Builder (DAL)
│   │   ├── Approval Manager
│   │   └── Execution Bridge
│   │
│   ├── Contracts
│   │   ├── Request Types
│   │   ├── Plan Types
│   │   ├── Approval Types
│   │   └── Execution Types
│   │
│   └── Responsibilities
│       ├── Understand User Request
│       ├── Build Action Plan
│       ├── Request Approval
│       └── Send Execution Request to API Server
│
├── 3. API Server Layer (Execution Wrapper / Scalable Backend)
│   ├── API Gateway Layer
│   │   ├── /run
│   │   ├── /jobs
│   │   ├── /files
│   │   └── /health
│   │
│   ├── Request Handling
│   │   ├── Validation
│   │   ├── Authentication / Authorization
│   │   ├── Rate / Load Handling
│   │   └── Request Routing
│   │
│   ├── Job Orchestration
│   │   ├── Queue Manager
│   │   ├── Job Manager
│   │   ├── Worker Manager
│   │   └── Status Tracker
│   │
│   ├── Execution Layer
│   │   ├── Execution Engine
│   │   ├── Plan Interpreter
│   │   ├── Action Dispatcher
│   │   └── Result Collector
│   │
│   └── Responsibilities
│       ├── Accept High Volume Requests
│       ├── Queue Jobs
│       ├── Manage Concurrency
│       ├── Dispatch Execution
│       └── Return Results / Status
│
├── 4. DSP / Processing Layer
│   ├── Client DSP
│   │   ├── Real-time Preview
│   │   ├── Lightweight Effects
│   │   └── Immediate User Feedback
│   │
│   ├── Backend DSP
│   │   ├── Heavy Processing
│   │   ├── Offline Rendering
│   │   ├── Audio Transformations
│   │   └── Export-grade Processing
│   │
│   └── Processing Modules
│       ├── Noise Reduction
│       ├── EQ / Tone Shaping
│       ├── Voice Enhancement
│       ├── Mastering
│       └── Future Audio Pipelines
│
├── 5. Data Layer
│   ├── User Data
│   │   ├── Users
│   │   ├── Workspaces
│   │   └── Memberships
│   │
│   ├── Session Data
│   │   ├── Chats
│   │   ├── Messages
│   │   ├── Plans
│   │   └── Approvals
│   │
│   ├── File Data
│   │   ├── Uploaded Files
│   │   ├── Audio Metadata
│   │   ├── Generated Artifacts
│   │   └── Versions
│   │
│   ├── Job Data
│   │   ├── Job Status
│   │   ├── Progress
│   │   ├── Execution Logs
│   │   └── Results
│   │
│   └── Billing / Usage
│       ├── Plans
│       ├── Subscriptions
│       ├── Usage Counters
│       └── Billing Events
│
├── 6. Infrastructure Layer
│   ├── Frontend Hosting
│   │   └── Vercel
│   │
│   ├── QAgent Hosting
│   │   └── Vercel API / Next.js
│   │
│   ├── API Server Hosting
│   │   └── Google Cloud Run
│   │
│   ├── Queue / Async Infra
│   │   ├── In-memory queue (early phase)
│   │   ├── Redis / PubSub (future)
│   │   └── Cloud Tasks / PubSub (future)
│   │
│   ├── Storage
│   │   ├── Firestore
│   │   ├── File Storage
│   │   └── Artifact Storage
│   │
│   └── Monitoring / Observability
│       ├── Logs
│       ├── Metrics
│       ├── Job Monitoring
│       └── Failure Tracking
│
├── 7. Auth & Security Layer
│   ├── Clerk Authentication
│   ├── User Identity Validation
│   ├── Session Token Handling
│   ├── Workspace Authorization
│   └── API Access Control
│
├── 8. Documentation Layer
│   ├── QAgent Docs
│   │   ├── Core Flow
│   │   ├── Architecture
│   │   ├── Decision System
│   │   ├── Execution
│   │   ├── Versioning
│   │   ├── Implementation
│   │   └── Integration
│   │
│   └── API Server Docs
│       ├── Core Flow
│       ├── Architecture
│       ├── Decision System
│       ├── Execution
│       ├── Versioning
│       ├── Implementation
│       └── Integration
│
└── 9. End-to-End System Flow
    ├── User writes request in Chat
    ├── QAgent builds intent + plan
    ├── Approval requested if needed
    ├── Plan sent to API Server
    ├── API Server creates job
    ├── Worker executes processing
    ├── Result saved in Data Layer
    ├── QAgent receives status / result
    └── Canvas / Chat presents result to user`}
        </pre>
      </section>
    </main>
  );
}
