import Link from "next/link";
import { linkConcepts } from "@/lib/docs/auto-link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { DocsNavGroup } from "@/lib/navigation";

export function NavCard({ title, description, href, section = "Start Here" }: { title: string; description: string; href: string; section?: DocsNavGroup; icon?: string }) {
  const isImplementation = section === "Implementation";
  const isDecision = section === "Decision System";
  const isAudio = section === "Audio Intelligence";
  const isMainFlow = section === "Main Flow";
  const [shortDescription, ...rest] = description.split(". ");
  const fullDescription = rest.length > 0 ? `${shortDescription}. ${rest.join(". ")}` : description;

  return (
    <Card className={isImplementation || isDecision || isAudio || isMainFlow ? "bg-slate-900" : ""}>
      <CardContent>
        <details className="group" open={false}>
          <summary className="cursor-pointer list-none space-y-3">
            <div className="flex items-start justify-between gap-3">
              <h3 className="break-words text-sm font-semibold">{title}</h3>
              <Badge className={isImplementation ? "bg-cyan-700" : isDecision ? "bg-teal-700" : isAudio ? "bg-orange-700" : "bg-slate-700"}>
                {section}
              </Badge>
            </div>
            <p className="break-words text-sm leading-6 text-[var(--muted)]">{linkConcepts(shortDescription, 1)}</p>
            <p className="text-xs text-slate-400">Expand</p>
          </summary>

          <div className="mt-3 space-y-3 border-t border-[var(--border)] pt-3">
            <p className="break-words text-sm text-[var(--muted)]">{linkConcepts(fullDescription, 2)}</p>
            <Link href={href} className="inline-block text-sm text-slate-300 hover:text-[var(--accent)]">
              Open page
            </Link>
          </div>
        </details>
      </CardContent>
    </Card>
  );
}
