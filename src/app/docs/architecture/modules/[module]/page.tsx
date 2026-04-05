import { notFound } from "next/navigation";
import { DocsContent } from "@/components/layout/DocsContent";

const architectureModuleTitles: Record<string, string> = {
  "qagent-core": "QAgent Core",
  "files-handler": "Files Handler",
  analyzer: "Analyzer",
  "intent-clarification": "Intent + Clarification",
  dal: "DAL",
  uagent: "UAgent",
  approval: "Approval (UI-triggered, Core-enforced)",
  dagent: "DAgent",
  versioning: "Versioning",
};

export function generateStaticParams() {
  return Object.keys(architectureModuleTitles).map((module) => ({ module }));
}

export default async function ArchitectureModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  const title = architectureModuleTitles[module];

  if (!title) {
    return notFound();
  }

  return (
    <DocsContent>
      <div className="mb-6 space-y-2">
        <h1 className="break-words text-[2rem] font-semibold leading-tight">{title}</h1>
      </div>
    </DocsContent>
  );
}

