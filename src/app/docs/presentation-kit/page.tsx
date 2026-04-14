import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const storyline = [
  "### 1. System story (what WaveQ solves)",
  "Problem, target users, and the value of an AI-guided audio workflow.",
  "### 2. Architecture story (how it works)",
  "System map -> Client -> QAgent -> API -> DSP -> Data, including approval and runtime contracts.",
  "### 3. Demo story (how to present it live)",
  "Start from user intent, show planning, show execution, and finish with versioned output and traceability.",
] as const;

const videoChecklist = [
  "Short intro clip (30-60s): system mission and who this is for.",
  "Walkthrough clip (3-7m): complete end-to-end flow on one scenario.",
  "Deep-dive clip (5-12m): one subsystem per video (QAgent, API, DSP, Data, security).",
  "Closing clip (30-60s): key takeaways and next action.",
] as const;

const slideChecklist = [
  "Title + one-line positioning",
  "Problem and current pain",
  "Solution overview",
  "System architecture map",
  "Execution flow (request -> plan -> approval -> run -> version)",
  "Key modules and responsibilities",
  "Security and control points",
  "Roadmap and next milestones",
] as const;

export default function PresentationKitPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Media Kit"
        description="Workspace for preparing explanation videos and presentation decks for the WaveQ system."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">WaveQ / Communication Assets</p>

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock
          id="storyline"
          title="Presentation Storyline"
          body={storyline}
          summaryPreview="Use one narrative spine across video and slides."
        />

        <SectionBlock
          id="video-materials"
          title="Video Materials Checklist"
          body={videoChecklist}
          summaryPreview="Suggested video package for internal and external explanations."
        />

        <SectionBlock
          id="slide-structure"
          title="Slide Deck Structure"
          body={slideChecklist}
          summaryPreview="Recommended slide order for architecture-focused talks."
        />
      </div>
    </DocsContent>
  );
}
