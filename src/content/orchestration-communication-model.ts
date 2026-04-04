import type { DocPageContent } from "@/lib/docs";

export const orchestrationCommunicationModelContent: DocPageContent = {
  slug: "orchestration/communication-model",
  title: "Orchestration Communication Model",
  description: "Message contracts for inter-agent/service communication within the orchestration layer.",
  sections: [
    {
      title: "Base Transport Contracts",
      body: [
        "All requests and responses are versioned and traceable.",
        "Every AgentRequest and AgentResponse must include traceId and flowId.",
      ],
      code: `interface AgentRequest<TPayload> {
  version: '1.0'
  source: string
  target: string
  type: string
  flowId: string
  traceId: string
  requestId: string
  timestamp: number
  payload: TPayload
}

interface AgentResponse<TData> {
  version: '1.0'
  source: string
  target: string
  flowId: string
  traceId: string
  requestId: string
  timestamp: number
  status: 'ok' | 'error'
  data?: TData
  error?: AgentError
}`,
    },
    {
      title: "Unified Error Contract",
      body: [
        "All agents return the same error shape.",
      ],
      code: `interface AgentError {
  code: string
  message: string
  retryable: boolean
}

interface ErrorEnvelope {
  error: AgentError
  source: string
  timestamp: number
}`,
    },
    {
      title: "Typed Requests Per Agent",
      body: [
        "Request payloads are explicit and deterministic.",
      ],
      code: `interface AudioSandboxRequest {
  version: '1.0'
  operation: 'store' | 'index' | 'query'
  fileId: string
  region?: { startSec: number; endSec: number }
  queryText?: string
}

interface AudioIntelligenceRequest {
  version: '1.0'
  fileId: string
  featureSet: Array<'lufs' | 'noise' | 'clipping' | 'reverb' | 'speech_music'>
}

interface ComparisonRequest {
  version: '1.0'
  baseVersionId: string
  comparedVersionId: string
  mode: 'full' | 'region'
  region?: { startSec: number; endSec: number }
}

interface RecommendationRequest {
  version: '1.0'
  intentType: string
  currentVersionId: string
  includeTradeoffs: boolean
  maxRecommendations: number
}`,
    },
    {
      title: "Typed Responses Per Agent",
      body: [
        "No flow should rely on generic AgentResponse only; each agent has a dedicated response contract.",
      ],
      code: `interface ComparisonSummary {
  totalDifferences: number
  highImpactCount: number
  overallRisk: 'safe' | 'moderate' | 'risky'
  recommendedAction: 'accept' | 'revert' | 'review'
}

interface AudioSandboxResponse {
  version: '1.0'
  status: 'ok' | 'error'
  matches?: AudioQueryMatch[]
  features?: AudioFeatures
  error?: AgentError
}

interface AudioIntelligenceResponse {
  version: '1.0'
  status: 'ok' | 'error'
  features: AudioFeatures
  insights?: string[]
  error?: AgentError
}

interface ComparisonResponse {
  version: '1.0'
  status: 'ok' | 'error'
  comparison: AudioComparison
  differences: AudioDifference[]
  summary: ComparisonSummary
  error?: AgentError
}

interface RecommendationResponse {
  version: '1.0'
  status: 'ok' | 'error'
  recommendations: AudioRecommendation[]
  error?: AgentError
}`,
    },
    {
      title: "Dispatch Mapping",
      body: [
        "Routing layer resolves strongly typed request/response pairs.",
      ],
      code: `type OrchestrationRequestMap = {
  audio_sandbox: AgentRequest<AudioSandboxRequest>
  audio_intelligence: AgentRequest<AudioIntelligenceRequest>
  comparison: AgentRequest<ComparisonRequest>
  recommendation: AgentRequest<RecommendationRequest>
}

type OrchestrationResponseMap = {
  audio_sandbox: AgentResponse<AudioSandboxResponse>
  audio_intelligence: AgentResponse<AudioIntelligenceResponse>
  comparison: AgentResponse<ComparisonResponse>
  recommendation: AgentResponse<RecommendationResponse>
}`,
    },
  ],
};
