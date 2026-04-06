import { Blocks, Compass, Link2, Route, ShieldCheck, Workflow } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type DalNode = {
  title: string;
  icon: React.ElementType;
  points: string[];
};

const nodes: DalNode[] = [
  {
    title: "Action Planner",
    icon: Compass,
    points: ["Action breakdown", "Step sequencing", "Goal decomposition"],
  },
  {
    title: "Tool Mapper",
    icon: Link2,
    points: ["Tool selection", "Capability alignment", "Execution mapping"],
  },
  {
    title: "Execution Graph Builder",
    icon: Workflow,
    points: ["Dependencies", "Execution order", "Parallel and sequential flow"],
  },
  {
    title: "UI Plan Generator",
    icon: Blocks,
    points: ["UI blocks", "Visual representation", "Interaction elements"],
  },
  {
    title: "Constraint Resolver",
    icon: ShieldCheck,
    points: ["System limits", "Tool compatibility", "Execution constraints"],
  },
  {
    title: "Plan Formatter",
    icon: Route,
    points: ["Structured plan object", "Execution-ready output", "UI plan integration"],
  },
];

export function DalModuleDiagram() {
  return (
    <div className="w-full rounded-lg bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_30%),linear-gradient(180deg,#020617_0%,#081126_50%,#020617_100%)] p-4 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 text-center">
          <Badge className="mb-2 rounded-full bg-cyan-500/10 px-3 py-0.5 text-xs text-cyan-200">Planning Layer</Badge>
          <p className="text-2xl font-bold md:text-3xl">DAL</p>
          <p className="mx-auto mt-2 max-w-3xl text-xs text-slate-300 md:text-sm">
            Transforms structured intent into an actionable plan, tool mapping, execution graph, and UI planning output.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {nodes.map((node) => (
            <Card key={node.title} className="border-white/10 bg-slate-950/75">
              <CardHeader className="pb-2">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10">
                  <node.icon className="h-4 w-4 text-cyan-300" />
                </div>
                <h3 className="text-sm font-semibold text-white">{node.title}</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-xs text-slate-300">
                  {node.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 rounded-full bg-cyan-300" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-cyan-400/20 bg-slate-950/70 p-3 text-center">
          <p className="text-xs text-cyan-300/80">Output</p>
          <p className="text-sm font-semibold text-white">Structured DAL Plan → DAgent / UAgent</p>
        </div>
      </div>
    </div>
  );
}

