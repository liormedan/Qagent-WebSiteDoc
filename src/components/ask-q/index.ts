export { AskQProvider, useAskQ, type AskQMessage, type AskQMessageRole } from "@/components/ask-q/AskQProvider";
export { detectIntent, type AskQIntent } from "@/lib/ask-q/intent";
export { isAskQResponseMode, type AskQResponseMode } from "@/lib/ask-q/responseMode";
export type { AskQSource } from "@/lib/askQRetrieval";
export {
  assembleAskQContext,
  assembleAskQFromSnapshot,
  gatherAskQRetrieval,
  formatAskQContextForLlm,
  retrieveGlossaryMatches,
  retrieveRegistryMatches,
  retrieveSourceDocs,
} from "@/lib/askQRetrieval";
export type { GatherAskQRetrievalOptions, AskQLlmContextExtras } from "@/lib/askQRetrieval";
export {
  interpretQuery,
  buildExpandedRetrievalQuery,
  type AskQSemanticIntent,
  type AskQInterpretedConcept,
} from "@/lib/ask-q/interpretQuery";
export {
  resolveFollowUpQuery,
  lastUserContentFromHistory,
  type AskQHistoryTurn,
} from "@/lib/ask-q/resolveFollowUpQuery";
export { buildGuidedSuggestions, type AskQSuggestion } from "@/lib/ask-q/guidedSuggestions";
export { ASK_Q_MODE_TRANSPARENCY, transparencyLineForMode } from "@/lib/ask-q/modeTransparency";
export { appendRollingTopicSummary } from "@/lib/ask-q/rollingTopicSummary";
export { AskQLauncher } from "@/components/ask-q/AskQLauncher";
export { AskQPanel } from "@/components/ask-q/AskQPanel";
