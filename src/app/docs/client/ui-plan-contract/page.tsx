import { DocsContent } from "@/components/layout/DocsContent";

export default function UiPlanContractPage() {
  return (
    <DocsContent>
      <main className="space-y-6">
        <section className="space-y-2">
          <h1 className="text-3xl font-semibold">UI Plan Contract</h1>
          <p className="text-[var(--muted)]">
            Strict implementation contract for Canvas rendering. The <span className="font-mono">uiPlan</span> payload MUST be versioned and strictly
            validated before rendering.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">JSON Schema</h2>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "waveq/client/ui-plan.schema.json",
  "title": "WaveQ UI Plan",
  "type": "object",
  "additionalProperties": false,
  "required": ["uiPlan"],
  "properties": {
    "uiPlan": {
      "type": "object",
      "additionalProperties": false,
      "required": ["version", "layout", "blocks", "metadata"],
      "properties": {
        "version": { "type": "string", "pattern": "^\\\\d+\\\\.\\\\d+$" },
        "layout": {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": false,
            "required": ["id", "type", "region"],
            "properties": {
              "id": { "type": "string", "minLength": 1 },
              "type": { "enum": ["waveform", "pipeline", "panel", "status"] },
              "region": { "enum": ["main", "left", "right", "bottom", "overlay"] }
            }
          }
        },
        "blocks": {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": false,
            "required": ["id", "type", "label", "status"],
            "properties": {
              "id": { "type": "string", "minLength": 1 },
              "type": { "enum": ["effect", "control", "waveform", "status", "action"] },
              "label": { "type": "string", "minLength": 1 },
              "status": { "enum": ["idle", "ready", "running", "completed", "failed"] },
              "params": { "type": "object", "additionalProperties": true },
              "layoutRef": { "type": "string" }
            }
          }
        },
        "metadata": {
          "type": "object",
          "additionalProperties": false,
          "required": ["status"],
          "properties": {
            "status": { "enum": ["ready", "running", "completed", "failed"] },
            "duration": { "type": "number", "minimum": 0 },
            "sampleRate": { "type": "integer", "minimum": 8000 },
            "sessionId": { "type": "string" },
            "traceId": { "type": "string" }
          }
        }
      }
    }
  }
}`}</pre>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Required vs Optional Fields</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>Required root: <span className="font-mono">uiPlan</span></li>
            <li>
              Required in <span className="font-mono">uiPlan</span>: <span className="font-mono">version</span>, <span className="font-mono">layout</span>,{" "}
              <span className="font-mono">blocks</span>, <span className="font-mono">metadata</span>
            </li>
            <li>
              Required per block: <span className="font-mono">id</span>, <span className="font-mono">type</span>, <span className="font-mono">label</span>,{" "}
              <span className="font-mono">status</span>
            </li>
            <li>
              Optional per block: <span className="font-mono">params</span>, <span className="font-mono">layoutRef</span>
            </li>
            <li>
              Required in metadata: <span className="font-mono">status</span>
            </li>
            <li>
              Optional in metadata: <span className="font-mono">duration</span>, <span className="font-mono">sampleRate</span>,{" "}
              <span className="font-mono">sessionId</span>, <span className="font-mono">traceId</span>
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Enum Definitions</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>
              Block types: <span className="font-mono">effect | control | waveform | status | action</span>
            </li>
            <li>
              Block status: <span className="font-mono">idle | ready | running | completed | failed</span>
            </li>
            <li>
              Metadata status: <span className="font-mono">ready | running | completed | failed</span>
            </li>
            <li>
              Layout region: <span className="font-mono">main | left | right | bottom | overlay</span>
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Versioning Strategy</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>
              Use semantic format <span className="font-mono">MAJOR.MINOR</span> in <span className="font-mono">uiPlan.version</span>.
            </li>
            <li>MINOR increments are backward compatible (additive fields only).</li>
            <li>MAJOR increments are breaking and require renderer upgrade path.</li>
            <li>Renderer MUST reject unknown MAJOR versions.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Backward Compatibility Rules</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>Do not remove or rename required fields in the same MAJOR version.</li>
            <li>New optional fields are allowed in MINOR versions.</li>
            <li>Unknown optional fields MAY be ignored only if schema mode allows them.</li>
            <li>Unknown enum values MUST fail validation.</li>
            <li>Rendering MUST stop when validation fails.</li>
            <li>Invalid uiPlan MUST NOT be partially rendered.</li>
          </ul>
        </section>
      </main>
    </DocsContent>
  );
}
