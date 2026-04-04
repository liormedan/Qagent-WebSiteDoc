import { apiContent } from "@/content/api";
import { architectureContent } from "@/content/architecture";
import { audioComparisonModelContent } from "@/content/audio-comparison-comparison-model";
import { audioComparisonCanvasUiContent } from "@/content/audio-comparison-canvas-ui";
import { audioComparisonDifferenceModelContent } from "@/content/audio-comparison-difference-model";
import { audioComparisonIndexContent } from "@/content/audio-comparison-index";
import { audioComparisonOverviewContent } from "@/content/audio-comparison-overview";
import { audioComparisonPlaybackModesContent } from "@/content/audio-comparison-playback-modes";
import { audioComparisonUserFlowContent } from "@/content/audio-comparison-user-flow";
import { audioComparisonVersioningContent } from "@/content/audio-comparison-versioning";
import { audioDalContent } from "@/content/audio-dal";
import { audioIntelligenceContent } from "@/content/audio-intelligence";
import { audioMemoryContent } from "@/content/audio-memory";
import { audioSandboxIndexContent } from "@/content/audio-sandbox-index";
import { audioSandboxAudioFeaturesContent } from "@/content/audio-sandbox-audio-features";
import { audioSandboxIntegrationWithQContent } from "@/content/audio-sandbox-integration-with-q";
import { audioSandboxOverviewContent } from "@/content/audio-sandbox-overview";
import { audioSandboxQueryOperationsContent } from "@/content/audio-sandbox-query-operations";
import { audioSandboxScenarioExamplesContent } from "@/content/audio-sandbox-scenario-examples";
import { audioSandboxSegmentModelContent } from "@/content/audio-sandbox-segment-model";
import { audioSandboxSessionModelContent } from "@/content/audio-sandbox-session-model";
import { audioSandboxStateFlowContent } from "@/content/audio-sandbox-state-flow";
import { audioSandboxTranscriptIndexContent } from "@/content/audio-sandbox-transcript-index";
import { constraintsContent } from "@/content/constraints";
import { contractsContent } from "@/content/contracts";
import { dalIntegrationContent } from "@/content/dal-integration";
import { decisionWithUserContent } from "@/content/decision-with-user";
import { decisionRulesContent } from "@/content/decision-rules";
import { developmentPhasesContent } from "@/content/development-phases";
import { executionRuntimeCancellationRetryContent } from "@/content/execution-runtime-cancellation-and-retry";
import { executionRuntimeErrorHandlingContent } from "@/content/execution-runtime-error-handling";
import { executionRuntimeExecutionContractsContent } from "@/content/execution-runtime-execution-contracts";
import { executionRuntimeIndexContent } from "@/content/execution-runtime-index";
import { executionRuntimeOverviewContent } from "@/content/execution-runtime-overview";
import { executionRuntimeOutputVersioningContent } from "@/content/execution-runtime-output-versioning";
import { executionRuntimeProgressFeedbackContent } from "@/content/execution-runtime-progress-feedback";
import { executionRuntimeIntegrationContent } from "@/content/execution-runtime-runtime-integration";
import { executionRuntimeStatesContent } from "@/content/execution-runtime-runtime-states";
import { functionContractsContent } from "@/content/function-contracts";
import { implementationMapContent } from "@/content/implementation-map";
import { intentsContent } from "@/content/intents";
import { lifecycleEndStatesContent } from "@/content/lifecycle-end-states";
import { lifecycleIndexContent } from "@/content/lifecycle-index";
import { lifecycleInteractionLoopContent } from "@/content/lifecycle-interaction-loop";
import { lifecycleOverviewContent } from "@/content/lifecycle-overview";
import { lifecycleSessionModelContent } from "@/content/lifecycle-session-model";
import { lifecycleSystemEventsContent } from "@/content/lifecycle-system-events";
import { lifecycleVersionLifecycleContent } from "@/content/lifecycle-version-lifecycle";
import { moduleDesignContent } from "@/content/module-design";
import { orchestrationAgentRolesContent } from "@/content/orchestration-agent-roles";
import { orchestrationCommunicationModelContent } from "@/content/orchestration-communication-model";
import { orchestrationConflictResolutionContent } from "@/content/orchestration-conflict-resolution";
import { orchestrationFailureHandlingContent } from "@/content/orchestration-failure-handling";
import { orchestrationFlowContent } from "@/content/orchestration-flow";
import { orchestrationIndexContent } from "@/content/orchestration-index";
import { orchestrationOverviewContent } from "@/content/orchestration-overview";
import { orchestrationRoutingLogicContent } from "@/content/orchestration-routing-logic";
import { orchestrationSharedStateContent } from "@/content/orchestration-shared-state";
import { orchestrationStateMachineContent } from "@/content/orchestration-state-machine";
import { orchestrationUiReflectionContent } from "@/content/orchestration-ui-reflection";
import { overviewContent } from "@/content/overview";
import { planningContent } from "@/content/planning";
import { qAgentContent } from "@/content/q-agent";
import { recommendationEngineFlowContent } from "@/content/recommendation-engine-recommendation-flow";
import { recommendationEngineModelContent } from "@/content/recommendation-engine-recommendation-model";
import { recommendationEngineSourcesContent } from "@/content/recommendation-engine-recommendation-sources";
import { recommendationEngineIndexContent } from "@/content/recommendation-engine-index";
import { recommendationEngineIntegrationWithComparisonContent } from "@/content/recommendation-engine-integration-with-comparison";
import { recommendationEngineOverviewContent } from "@/content/recommendation-engine-overview";
import { recommendationEngineTradeoffsContent } from "@/content/recommendation-engine-tradeoffs";
import { recommendationEngineUxPresentationContent } from "@/content/recommendation-engine-ux-presentation";
import { reasoningSystemContent } from "@/content/reasoning-system";
import { roadmapContent } from "@/content/roadmap";
import { runtimeFlowDesignContent } from "@/content/runtime-flow-design";
import { stateMachineContent } from "@/content/state-machine";
import { testingStrategyContent } from "@/content/testing-strategy";

export type DocSection = {
  title: string;
  body: string[];
  code?: string;
};

export type InfoCardData = {
  title: string;
  description: string;
};

export type DocPageContent = {
  slug: string;
  title: string;
  description: string;
  sections: DocSection[];
  infoCards?: InfoCardData[];
};

const pages: Record<string, DocPageContent> = {
  overview: overviewContent,
  contracts: contractsContent,
  intents: intentsContent,
  planning: planningContent,
  constraints: constraintsContent,
  "reasoning-system": reasoningSystemContent,
  "dal-integration": dalIntegrationContent,
  "state-machine": stateMachineContent,
  "decision-rules": decisionRulesContent,
  "audio-intelligence": audioIntelligenceContent,
  "audio-memory": audioMemoryContent,
  "decision-with-user": decisionWithUserContent,

  "audio-comparison": audioComparisonIndexContent,
  "audio-comparison/overview": audioComparisonOverviewContent,
  "audio-comparison/versioning": audioComparisonVersioningContent,
  "audio-comparison/comparison-model": audioComparisonModelContent,
  "audio-comparison/difference-model": audioComparisonDifferenceModelContent,
  "audio-comparison/playback-modes": audioComparisonPlaybackModesContent,
  "audio-comparison/canvas-ui": audioComparisonCanvasUiContent,
  "audio-comparison/user-flow": audioComparisonUserFlowContent,
  "recommendation-engine": recommendationEngineIndexContent,
  "recommendation-engine/overview": recommendationEngineOverviewContent,
  "recommendation-engine/recommendation-model": recommendationEngineModelContent,
  "recommendation-engine/recommendation-sources": recommendationEngineSourcesContent,
  "recommendation-engine/tradeoffs": recommendationEngineTradeoffsContent,
  "recommendation-engine/recommendation-flow": recommendationEngineFlowContent,
  "recommendation-engine/integration-with-comparison": recommendationEngineIntegrationWithComparisonContent,
  "recommendation-engine/ux-presentation": recommendationEngineUxPresentationContent,
  "execution-runtime": executionRuntimeIndexContent,
  "execution-runtime/overview": executionRuntimeOverviewContent,
  "execution-runtime/execution-contracts": executionRuntimeExecutionContractsContent,
  "execution-runtime/runtime-states": executionRuntimeStatesContent,
  "execution-runtime/progress-feedback": executionRuntimeProgressFeedbackContent,
  "execution-runtime/output-versioning": executionRuntimeOutputVersioningContent,
  "execution-runtime/runtime-integration": executionRuntimeIntegrationContent,
  "execution-runtime/error-handling": executionRuntimeErrorHandlingContent,
  "execution-runtime/cancellation-and-retry": executionRuntimeCancellationRetryContent,
  lifecycle: lifecycleIndexContent,
  "lifecycle/overview": lifecycleOverviewContent,
  "lifecycle/session-model": lifecycleSessionModelContent,
  "lifecycle/interaction-loop": lifecycleInteractionLoopContent,
  "lifecycle/version-lifecycle": lifecycleVersionLifecycleContent,
  "lifecycle/system-events": lifecycleSystemEventsContent,
  "lifecycle/end-states": lifecycleEndStatesContent,
  orchestration: orchestrationIndexContent,
  "orchestration/overview": orchestrationOverviewContent,
  "orchestration/agent-roles": orchestrationAgentRolesContent,
  "orchestration/communication-model": orchestrationCommunicationModelContent,
  "orchestration/routing-logic": orchestrationRoutingLogicContent,
  "orchestration/shared-state": orchestrationSharedStateContent,
  "orchestration/orchestration-flow": orchestrationFlowContent,
  "orchestration/state-machine": orchestrationStateMachineContent,
  "orchestration/conflict-resolution": orchestrationConflictResolutionContent,
  "orchestration/failure-handling": orchestrationFailureHandlingContent,
  "orchestration/ui-reflection": orchestrationUiReflectionContent,

  "implementation-map": implementationMapContent,
  "runtime-flow-design": runtimeFlowDesignContent,
  "module-design": moduleDesignContent,
  "function-contracts": functionContractsContent,
  "development-phases": developmentPhasesContent,
  "testing-strategy": testingStrategyContent,

  "audio-sandbox/overview": audioSandboxOverviewContent,
  "audio-sandbox": audioSandboxIndexContent,
  "audio-sandbox/session-model": audioSandboxSessionModelContent,
  "audio-sandbox/segment-model": audioSandboxSegmentModelContent,
  "audio-sandbox/transcript-index": audioSandboxTranscriptIndexContent,
  "audio-sandbox/audio-features": audioSandboxAudioFeaturesContent,
  "audio-sandbox/query-operations": audioSandboxQueryOperationsContent,
  "audio-sandbox/integration-with-q": audioSandboxIntegrationWithQContent,
  "audio-sandbox/state-flow": audioSandboxStateFlowContent,
  "audio-sandbox/scenario-examples": audioSandboxScenarioExamplesContent,

  "q-agent": qAgentContent,
  "audio-dal": audioDalContent,
  architecture: architectureContent,
  api: apiContent,
  roadmap: roadmapContent,
};

export function getDocPage(slug: string): DocPageContent | undefined {
  return pages[slug];
}

export function getAllDocPages(): DocPageContent[] {
  return Object.values(pages);
}
