import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function InfoCard({ title, description }: { title: string; description: string }) {
  const [shortDescription, ...rest] = description.split(". ");
  const hasMore = rest.length > 0;
  const fullDescription = hasMore ? `${shortDescription}. ${rest.join(". ")}` : description;

  return (
    <Card className="flex-1">
      <CardContent>
        <details className="group" open={false}>
          <summary className="list-none cursor-pointer">
            <h3 className="mb-2 text-sm font-semibold">{title}</h3>
            <p className="text-sm text-[var(--muted)]">{shortDescription}</p>
            <p className="mt-2 text-xs text-slate-400">Expand</p>
          </summary>
          <div className="mt-3 border-t border-[var(--border)] pt-3">
            <p className="text-sm text-[var(--muted)]">{fullDescription}</p>
          </div>
        </details>
      </CardContent>
      {hasMore ? (
        <CardFooter>
          <p className="text-xs text-slate-400">Details are available in the accordion above.</p>
        </CardFooter>
      ) : null}
    </Card>
  );
}
