import { apiContent } from "@/content/api";
import { architectureContent } from "@/content/architecture";
import { audioDalContent } from "@/content/audio-dal";
import { constraintsContent } from "@/content/constraints";
import { contractsContent } from "@/content/contracts";
import { dalIntegrationContent } from "@/content/dal-integration";
import { intentsContent } from "@/content/intents";
import { planningContent } from "@/content/planning";
import { qAgentContent } from "@/content/q-agent";
import { roadmapContent } from "@/content/roadmap";

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
  contracts: contractsContent,
  "dal-integration": dalIntegrationContent,
  planning: planningContent,
  intents: intentsContent,
  constraints: constraintsContent,
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
