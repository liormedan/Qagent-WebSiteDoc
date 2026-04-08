import {
  API_SERVER_CANONICAL_NAME,
  EXECUTION_LAYER_AUTHORITY_MODEL,
  EXECUTION_LAYER_BOUNDARY_RULES,
  EXECUTION_LAYER_CANONICAL_FLOW,
  EXECUTION_LAYER_DOC_SOURCE_OF_TRUTH,
  EXECUTION_LAYER_ERROR_BOUNDARY,
  EXECUTION_LAYER_MODULE_DEFINITIONS,
  EXECUTION_LAYER_PURITY_RULES,
  EXECUTION_LAYER_STATE_OWNERSHIP,
  EXECUTION_RESULT_PACKAGE_DEFINITION,
} from "@/lib/api-server-canonical";

const executionModules = [
  {
    name: "Execution Engine",
    definition: EXECUTION_LAYER_MODULE_DEFINITIONS.executionEngine,
  },
  {
    name: "Plan Interpreter",
    definition: EXECUTION_LAYER_MODULE_DEFINITIONS.planInterpreter,
  },
  {
    name: "Action Dispatcher",
    definition: EXECUTION_LAYER_MODULE_DEFINITIONS.actionDispatcher,
  },
  {
    name: "Result Collector",
    definition: EXECUTION_LAYER_MODULE_DEFINITIONS.resultCollector,
  },
] as const;

export default function ApiExecutionPage() {
  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">{API_SERVER_CANONICAL_NAME} - Execution Layer</h1>
        <p className="text-sm text-emerald-300">Status: LOCKED (deep structural definition)</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Position in Flow</h2>
        <p className="rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">
          Gateway -{">"} Request Handling -{">"} Decision System -{">"} Job Orchestration -{">"} Execution Layer -{">"} Versioning
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Subsystem Definition</h2>
        <p className="text-[var(--muted)]">{EXECUTION_LAYER_AUTHORITY_MODEL.subsystemDefinition}</p>
        <p className="text-[var(--muted)]">Purpose: {EXECUTION_LAYER_AUTHORITY_MODEL.purpose}</p>
        <p className="text-[var(--muted)]">Role: {EXECUTION_LAYER_AUTHORITY_MODEL.role}</p>
        <p className="text-[var(--muted)]">{EXECUTION_LAYER_AUTHORITY_MODEL.nonOwnership}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Module Definitions</h2>
        <div className="space-y-4">
          {executionModules.map((moduleItem) => (
            <div key={moduleItem.name} className="rounded-md border border-[var(--border)] bg-slate-950/30 p-4 text-sm">
              <p className="font-semibold text-slate-100">{moduleItem.name}</p>
              <p className="text-[var(--muted)]">Purpose: {moduleItem.definition.purpose}</p>
              <p className="text-[var(--muted)]">Responsibility: {moduleItem.definition.responsibility}</p>
              {"controls" in moduleItem.definition ? <p className="text-[var(--muted)]">Controls: {moduleItem.definition.controls}</p> : null}
              {"receives" in moduleItem.definition ? <p className="text-[var(--muted)]">Receives: {moduleItem.definition.receives}</p> : null}
              {"emits" in moduleItem.definition ? <p className="text-[var(--muted)]">Emits: {moduleItem.definition.emits}</p> : null}
              {"routesTo" in moduleItem.definition ? <p className="text-[var(--muted)]">Routes to: {moduleItem.definition.routesTo}</p> : null}
              {"gathers" in moduleItem.definition ? <p className="text-[var(--muted)]">Gathers: {moduleItem.definition.gathers}</p> : null}
              <p className="text-[var(--muted)]">Must not do: {moduleItem.definition.mustNotDo}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">EXECUTION_LAYER_CANONICAL_FLOW</h2>
        <p className="rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{EXECUTION_LAYER_CANONICAL_FLOW}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Execution Result Package</h2>
        <p className="text-[var(--muted)]">
          <span className="font-semibold text-slate-100">{EXECUTION_RESULT_PACKAGE_DEFINITION.name}</span>: {EXECUTION_RESULT_PACKAGE_DEFINITION.rule}
        </p>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          {EXECUTION_RESULT_PACKAGE_DEFINITION.conceptualContents.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Boundaries</h2>
        <p className="text-[var(--muted)]">Job Orchestration -{">"} Execution Layer: {EXECUTION_LAYER_BOUNDARY_RULES.jobOrchestrationToExecution}</p>
        <p className="text-[var(--muted)]">Execution Layer -{">"} Runtime / Worker Execution: {EXECUTION_LAYER_BOUNDARY_RULES.executionToRuntimeWorkers}</p>
        <p className="text-[var(--muted)]">Execution Layer -{">"} Versioning: {EXECUTION_LAYER_BOUNDARY_RULES.executionToVersioning}</p>
        <p className="text-[var(--muted)]">Execution Layer -{">"} Decision System: {EXECUTION_LAYER_BOUNDARY_RULES.executionToDecisionSystem}</p>
        <p className="text-[var(--muted)]">Prohibited: {EXECUTION_LAYER_BOUNDARY_RULES.prohibited}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Error Role</h2>
        <p className="text-sm font-semibold text-slate-100">Owned by Execution Layer</p>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          {EXECUTION_LAYER_ERROR_BOUNDARY.ownedByExecutionLayer.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="text-sm font-semibold text-slate-100">Owned Elsewhere</p>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          {EXECUTION_LAYER_ERROR_BOUNDARY.ownedElsewhere.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">State and Ownership</h2>
        <p className="text-[var(--muted)]">Execution-local state: {EXECUTION_LAYER_STATE_OWNERSHIP.executionLocalState}</p>
        <p className="text-[var(--muted)]">Transient state: {EXECUTION_LAYER_STATE_OWNERSHIP.transientState}</p>
        <p className="text-[var(--muted)]">Outward emission: {EXECUTION_LAYER_STATE_OWNERSHIP.outwardEmission}</p>
        <p className="text-[var(--muted)]">Not owned: {EXECUTION_LAYER_STATE_OWNERSHIP.notOwned}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Immutability and Purity Rules</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          {EXECUTION_LAYER_PURITY_RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Source of Truth</h2>
        <p className="text-[var(--muted)]">
          Canonical location: <span className="font-semibold text-slate-100">{EXECUTION_LAYER_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>
        </p>
        <p className="text-[var(--muted)]">{EXECUTION_LAYER_DOC_SOURCE_OF_TRUTH.rule}</p>
      </section>
    </main>
  );
}
