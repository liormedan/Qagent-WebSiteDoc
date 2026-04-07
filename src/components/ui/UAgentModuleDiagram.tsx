import { Activity, Boxes, Gauge, Layout, MousePointerClick, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const nodes = [
  {
    title: "UI Renderer",
    icon: Layout,
    points: ["Render UI blocks", "Layout generation", "Component instantiation"],
  },
  {
    title: "Interaction Handler",
    icon: MousePointerClick,
    points: ["Clicks and inputs", "User adjustments", "Interaction capture"],
  },
  {
    title: "State Sync Layer",
    icon: Activity,
    points: ["Realtime updates", "State reflection", "UI refresh logic"],
  },
  {
    title: "Event Dispatcher",
    icon: Send,
    points: ["Interaction events", "Parameter updates", "Approval signals to QCore"],
  },
  {
    title: "Component Registry",
    icon: Boxes,
    points: ["UI block catalog", "Component definitions", "Plan-to-component mapping"],
  },
  {
    title: "Feedback Layer",
    icon: Gauge,
    points: ["Loading states", "Execution progress", "Error feedback"],
  },
];

export function UAgentModuleDiagram() {
  return (
    <div className="w-full rounded-lg bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_30%),linear-gradient(180deg,#020617_0%,#081126_50%,#020617_100%)] p-4 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 text-center">
          <Badge className="mb-2 rounded-full bg-cyan-500/10 px-3 py-0.5 text-xs text-cyan-200">UI Runtime Layer</Badge>
          <p className="text-2xl font-bold md:text-3xl">UAgent</p>
          <p className="mx-auto mt-2 max-w-3xl text-xs text-slate-300 md:text-sm">
            Renders DAL UI plans into a live interface, captures user interactions, and dispatches events back to QCore.
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
          <p className="text-sm font-semibold text-white">DAL UI Plan → UAgent Runtime UI → Events → QCore</p>
        </div>
      </div>
    </div>
  );
}

