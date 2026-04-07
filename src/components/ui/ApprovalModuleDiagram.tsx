import { BadgeCheck, Ban, CheckCircle2, ClipboardCheck, Shield, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const nodes = [
  {
    title: "Approval Triggering",
    icon: ClipboardCheck,
    points: ["Identify critical actions", "Trigger approval UI", "Show relevant plan details"],
  },
  {
    title: "User Confirmation Handling",
    icon: SlidersHorizontal,
    points: ["Approve", "Reject", "Modify"],
  },
  {
    title: "Core Enforcement",
    icon: Shield,
    points: ["No execution without approval", "Block unauthorized transitions", "Apply safety rules"],
  },
  {
    title: "Approval State Tracking",
    icon: BadgeCheck,
    points: ["Track status per action", "Maintain approval history", "Support multi-step approvals"],
  },
  {
    title: "Conditional Approval Logic",
    icon: CheckCircle2,
    points: ["Rule-based triggers", "Different approval levels", "Context-sensitive enforcement"],
  },
  {
    title: "Failure Guard",
    icon: Ban,
    points: ["Missing approval -> block", "Reject -> cancel/adjust", "Unclear -> clarification"],
  },
];

export function ApprovalModuleDiagram() {
  return (
    <div className="w-full rounded-lg bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_30%),linear-gradient(180deg,#020617_0%,#081126_50%,#020617_100%)] p-4 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 text-center">
          <Badge className="mb-2 rounded-full bg-cyan-500/10 px-3 py-0.5 text-xs text-cyan-200">Control Gate Layer</Badge>
          <p className="text-2xl font-bold md:text-3xl">Approval</p>
          <p className="mx-auto mt-2 max-w-3xl text-xs text-slate-300 md:text-sm">
            UI triggers user approval while QCore enforces authorization before any critical execution.
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
          <p className="text-xs text-cyan-300/80">Flow</p>
          <p className="text-sm font-semibold text-white">DAL / UI Plan → User Decision → QCore Enforcement → Proceed or Block</p>
        </div>
      </div>
    </div>
  );
}

