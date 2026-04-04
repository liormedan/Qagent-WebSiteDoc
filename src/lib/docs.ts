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
import { functionContractsContent } from "@/content/function-contracts";
import { implementationMapContent } from "@/content/implementation-map";
import { intentsContent } from "@/content/intents";
import { moduleDesignContent } from "@/content/module-design";
import { overviewContent } from "@/content/overview";
import { planningContent } from "@/content/planning";
import { qAgentContent } from "@/content/q-agent";
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
