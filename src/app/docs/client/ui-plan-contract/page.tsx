import { DocsContent } from "@/components/layout/DocsContent";
import { DocsDiagram } from "@/components/ui/DocsDiagram";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import uiPlanSchema from "./ui-plan.schema.json";

import { CLIENT_SUBPAGE_SCOPE_LINKS } from "@/lib/docs-scope-links";
function UiPlanJsonSchemaPre() {
  return (
    <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">
      {JSON.stringify(uiPlanSchema, null, 2)}
    </pre>
  );
}

const inPageLinks = [
  { title: "Overview", subtitle: "Contract role and validation intent.", href: "#overview" },
  { title: "UI Plan Diagram", subtitle: "Producer, validation, Canvas consumer.", href: "#ui-plan-contract-diagram" },
  { title: "JSON Schema", subtitle: "Canonical schema document.", href: "#ui-plan-json-schema" },
  { title: "Required vs Optional Fields", subtitle: "Root, uiPlan, blocks, metadata.", href: "#ui-plan-required-optional" },
  { title: "Enum Definitions", subtitle: "Types, statuses, regions.", href: "#ui-plan-enums" },
  { title: "Versioning Strategy", subtitle: "MAJOR.MINOR rules.", href: "#ui-plan-versioning" },
  { title: "Backward Compatibility Rules", subtitle: "Enums, partial render ban.", href: "#ui-plan-compatibility" },
  { title: "Related Docs", subtitle: "Contracts, events, errors, lifecycle.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "ui-plan-json-schema",
    title: "JSON Schema",
    subtitle: "WaveQ UI Plan (draft 2020-12)",
    purpose: "Define the strict JSON Schema for the uiPlan payload used for Canvas rendering.",
    defines: [
      "Strict implementation contract for Canvas rendering. The uiPlan payload MUST be versioned and strictly validated before rendering.",
      "Canonical schema is rendered below (same structure as legacy; formatting from JSON.stringify).",
    ],
    supplement: <UiPlanJsonSchemaPre />,
    doesNotDefine: "Cross-layer Chat/QAgent bridge payloads in full (see Cross-Layer Contracts).",
    href: "/docs/client/ui-plan-contract",
    linkLabel: "Canonical page",
  },
  {
    id: "ui-plan-required-optional",
    title: "Required vs Optional Fields",
    subtitle: "Root, uiPlan, block, metadata",
    purpose: "List required and optional fields per legacy specification.",
    defines: [
      "Required root: uiPlan",
      "Required in uiPlan: version, layout, blocks, metadata",
      "Required per block: id, type, label, status",
      "Optional per block: params, layoutRef",
      "Required in metadata: status",
      "Optional in metadata: duration, sampleRate, sessionId, traceId",
    ],
    doesNotDefine: "Event Contract envelope fields.",
    href: "/docs/client/event-contract",
    linkLabel: "Event Contract",
  },
  {
    id: "ui-plan-enums",
    title: "Enum Definitions",
    subtitle: "Block type, status, metadata status, layout region",
    purpose: "Enumerate allowed enum sets exactly as specified.",
    defines: [
      "Block types: effect | control | waveform | status | action",
      "Block status: idle | ready | running | completed | failed",
      "Metadata status: ready | running | completed | failed",
      "Layout region: main | left | right | bottom | overlay",
    ],
    doesNotDefine: "Runtime lifecycle state machine (see Runtime Lifecycle).",
    href: "/docs/client/canvas-ui",
    linkLabel: "Canvas UI",
  },
  {
    id: "ui-plan-versioning",
    title: "Versioning Strategy",
    subtitle: "Semantic MAJOR.MINOR",
    purpose: "Define uiPlan.version semantics and renderer obligations.",
    defines: [
      "Use semantic format MAJOR.MINOR in uiPlan.version.",
      "MINOR increments are backward compatible (additive fields only).",
      "MAJOR increments are breaking and require renderer upgrade path.",
      "Renderer MUST reject unknown MAJOR versions.",
    ],
    doesNotDefine: "Repository-wide service semver policy.",
    href: "/docs/client/contracts",
    linkLabel: "Cross-Layer Contracts",
  },
  {
    id: "ui-plan-compatibility",
    title: "Backward Compatibility Rules",
    subtitle: "Fields, enums, rendering",
    purpose: "Define compatibility and validation failure behavior for Canvas.",
    defines: [
      "Do not remove or rename required fields in the same MAJOR version.",
      "New optional fields are allowed in MINOR versions.",
      "Unknown optional fields MAY be ignored only if schema mode allows them.",
      "Unknown enum values MUST fail validation.",
      "Rendering MUST stop when validation fails.",
      "Invalid uiPlan MUST NOT be partially rendered.",
    ],
    doesNotDefine: "User-visible error copy (see Error Model).",
    href: "/docs/client/error-model",
    linkLabel: "Error Model",
  },
] as const;

export default function UiPlanContractPage() {
  return (
    <DocsContent>
      <PageTitle
        title="UI Plan Contract"
        description="Strict implementation contract for Canvas rendering: versioned uiPlan JSON Schema, enums, semver, and fail-fast validation before render."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Client / Validation & Tests / UI Plan Contract</p>

      <DocsScopeBlocks links={CLIENT_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock
          id="overview"
          title="Overview"
          body={[]}
          summaryPreview="What the UI Plan Contract is, why strict pre-render validation matters, and how it fits Cross-Layer Contracts and Event Contract."
        >
          <DocsOverviewBlock
            intro="The UI Plan Contract is the strict implementation contract for Canvas rendering: the uiPlan payload MUST be versioned and strictly validated before rendering so invalid or incompatible plans never partially mutate the tree. It complements Cross-Layer Contracts (where uiPlan appears in bridge examples) and Event Contract (event shapes and ordering), while focusing on schema, enums, semver, and fail-fast behavior specific to Canvas consumption."
            areasTitle="Why strict validation before rendering"
            areas={[
              "Prevents partial UI from malformed or stale uiPlan payloads.",
              "Keeps enum and MAJOR version drift explicit and rejectable at a single validation boundary.",
              "Aligns renderer upgrades with documented MAJOR.MINOR semantics.",
            ]}
            outOfScope="QAgent planning logic that produces uiPlan and API Server-side validation ownership."
            relatedBoundaries={[
              "Client Layer owns local UI/runtime behavior, projection, and enforcement of this contract at render ingress.",
              "QAgent owns intent and planning.",
              "API Server owns execution lifecycle.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="ui-plan-contract-diagram" title="UI Plan Contract Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="uiPlan validation boundary"
            groups={[
              { title: "uiPlan producer", items: ["Structured plan output", "Versioned uiPlan document"] },
              { title: "Validation boundary", items: ["Schema + enum checks", "Unknown MAJOR rejection", "Unknown enum validation failure"] },
              { title: "Renderer / Canvas consumer", items: ["Fail-fast on invalid uiPlan", "No partial render on failure"] },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="ui-plan-contract-details" title="UI Plan Contract Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/client/contracts", title: "Cross-Layer Contracts", description: "Bridge shapes where uiPlan crosses Client boundaries." },
              { href: "/docs/client/event-contract", title: "Client Event Contract", description: "Event envelopes and ordering—not uiPlan schema." },
              { href: "/docs/client/error-model", title: "Client Error Model", description: "Canonical client errors when validation fails." },
              { href: "/docs/client/runtime-lifecycle", title: "Runtime Lifecycle", description: "Runtime states alongside Canvas/runtime handoff." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
