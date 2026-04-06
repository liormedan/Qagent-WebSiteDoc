import { AlertTriangle, CheckCircle2, HelpCircle, Layers, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const steps = [
  {
    title: "Intent Resolver",
    points: ["Intent classification", "Goal identification", "Action-type mapping"],
    icon: Target,
  },
  {
    title: "Context Interpreter",
    points: ["Analyzer output fusion", "Memory integration", "Session awareness"],
    icon: Layers,
  },
  {
    title: "Ambiguity Detector",
    points: ["Missing parameters", "Conflicting signals", "Multiple interpretations"],
    icon: AlertTriangle,
  },
  {
    title: "Clarification Generator",
    points: ["Targeted questions", "User options", "Structured prompts"],
    icon: HelpCircle,
  },
  {
    title: "Intent Validator + Structurer",
    points: ["Completeness checks", "Capability compatibility", "Structured intent output"],
    icon: CheckCircle2,
  },
];

export function IntentClarificationDiagram() {
  return (
    <div className="w-full rounded-lg bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_30%),linear-gradient(180deg,#020617_0%,#081126_50%,#020617_100%)] p-4 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 text-center">
          <Badge className="mb-2 rounded-full bg-cyan-500/10 px-3 py-0.5 text-xs text-cyan-200">Reasoning Preparation</Badge>
          <p className="text-2xl font-bold md:text-3xl">Intent + Clarification</p>
          <p className="mx-auto mt-2 max-w-3xl text-xs text-slate-300 md:text-sm">
            Interprets user intent, resolves ambiguity early, and outputs structured intent for DAL.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <Card className="h-full border-white/10 bg-slate-950/75">
                <CardHeader className="pb-2">
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10">
                    <step.icon className="h-4 w-4 text-cyan-300" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {step.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-1 h-1 w-1 rounded-full bg-cyan-300" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              {index < steps.length - 1 ? (
                <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-cyan-300 md:block">→</span>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-cyan-400/20 bg-slate-950/70 p-3 text-center">
          <p className="text-xs text-cyan-300/80">Output</p>
          <p className="text-sm font-semibold text-white">Structured Intent Object → DAL</p>
        </div>
      </div>
    </div>
  );
}

