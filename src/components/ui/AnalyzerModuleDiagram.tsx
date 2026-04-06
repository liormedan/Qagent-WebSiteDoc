import { AudioLines, BrainCircuit, Boxes, Database, FileSearch, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Node = {
  title: string;
  icon: React.ElementType;
  points: string[];
  className: string;
};

const nodes: Node[] = [
  {
    title: "Content Scanner",
    icon: FileSearch,
    points: ["Extracts text", "Scans document type", "Builds file summary"],
    className: "md:col-start-1 md:row-start-1",
  },
  {
    title: "Audio Recognizer",
    icon: AudioLines,
    points: ["Speech-to-text", "Audio segmentation", "Signal detection"],
    className: "md:col-start-3 md:row-start-1",
  },
  {
    title: "Knowledge Fetcher",
    icon: BrainCircuit,
    points: ["Source knowledge", "Retrieve document info", "Supplement context"],
    className: "md:col-start-1 md:row-start-3",
  },
  {
    title: "System Data Parser",
    icon: Database,
    points: ["Extract metadata", "Parse structured data", "Capture context details"],
    className: "md:col-start-3 md:row-start-3",
  },
];

function NodeCard({ title, icon: Icon, points, className }: Node) {
  return (
    <Card className={`relative border-white/10 bg-slate-950/70 shadow-lg backdrop-blur ${className}`}>
      <CardHeader className="pb-2">
        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/10">
          <Icon className="h-4 w-4 text-cyan-300" />
        </div>
        <h3 className="text-base font-semibold text-white">{title}</h3>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1 text-xs text-slate-300">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2">
              <span className="mt-1 h-1 w-1 rounded-full bg-cyan-300" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function AnalyzerModuleDiagram() {
  return (
    <div className="w-full rounded-lg bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_30%),linear-gradient(180deg,#020617_0%,#081126_50%,#020617_100%)] p-4 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 text-center">
          <Badge className="mb-2 rounded-full bg-cyan-500/10 px-3 py-0.5 text-xs text-cyan-200">Analyzer Module</Badge>
          <p className="text-2xl font-bold md:text-3xl">Analyzer</p>
          <p className="mx-auto mt-2 max-w-xl text-xs text-slate-300 md:text-sm">
            Converts files into structured signals and contextual insights for QCore.
          </p>
        </div>

        <div className="relative mx-auto grid max-w-4xl grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-3">
          <NodeCard {...nodes[0]} />

          <Card className="relative border-cyan-400/20 bg-slate-950/80 md:col-start-2 md:row-start-2">
            <CardHeader className="pb-2 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10">
                <Boxes className="h-5 w-5 text-cyan-200" />
              </div>
              <h3 className="text-lg font-semibold text-white">Analyzer</h3>
              <p className="text-xs text-slate-300">Core analysis engine</p>
            </CardHeader>
            <CardContent className="space-y-2">
              {["Segmentation", "Entities", "Feature detection", "Structured output"].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2 py-1">
                  <Sparkles className="h-3 w-3 text-cyan-300" />
                  <span className="text-xs text-slate-200">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <NodeCard {...nodes[1]} />
          <NodeCard {...nodes[2]} />
          <NodeCard {...nodes[3]} />
        </div>

        <div className="mt-6 flex justify-center">
          <Card className="w-full max-w-md border-cyan-400/20 bg-slate-950/80 text-center">
            <CardContent className="p-3">
              <div className="text-xs text-cyan-300/80">Output</div>
              <div className="text-sm font-semibold text-white">QCore / Intent</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
