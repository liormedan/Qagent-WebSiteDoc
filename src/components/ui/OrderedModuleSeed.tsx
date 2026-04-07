import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SeedNode = {
  id: string;
  label: string;
  tone?: "primary" | "default";
  className: string;
};

const seedNodes: SeedNode[] = [
  { id: "02", label: "Files Handler", className: "md:col-start-2 md:row-start-1" },
  { id: "08", label: "DAgent - SDP", className: "md:col-start-1 md:row-start-2" },
  { id: "03", label: "Analyzer", className: "md:col-start-3 md:row-start-2" },
  { id: "01", label: "QAgent Core", tone: "primary", className: "md:col-start-2 md:row-start-3" },
  { id: "06", label: "UAgent - Gen UI", className: "md:col-start-1 md:row-start-4" },
  { id: "04", label: "Intent + Clarification", className: "md:col-start-3 md:row-start-4" },
  { id: "05", label: "DAL", className: "md:col-start-2 md:row-start-5" },
];

export function OrderedModuleSeed() {
  return (
    <Card className="relative overflow-hidden border border-[var(--border)] bg-[var(--panel)] p-4 md:p-8">
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.35) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />

      <CardHeader className="relative mb-2 px-0 pt-0">
        <h2 className="text-xl font-semibold md:text-2xl">Architecture</h2>
      </CardHeader>

      <CardContent className="relative px-0 pb-0">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-5 md:gap-6">
        {seedNodes.map((node) => (
          <div key={node.label} className={cn("mx-auto w-full max-w-56", node.className)}>
            <Card
              className={cn(
                "w-full border shadow-sm",
                node.tone === "primary"
                  ? "border-[var(--accent)] bg-[var(--accent)]/10"
                  : "border-[var(--border)] bg-slate-950/40",
              )}
            >
              <CardContent className="flex min-h-24 items-center justify-between gap-3 p-4">
                <p className="text-sm font-semibold text-slate-100">{node.label}</p>
                <Badge className={cn(node.tone === "primary" ? "bg-[var(--accent)] text-slate-950" : "")}>{node.id}</Badge>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      </CardContent>
    </Card>
  );
}


