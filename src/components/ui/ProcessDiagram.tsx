"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProcessStep = {
  title: string;
  description?: string;
  isBoundary?: boolean;
};

export function ProcessDiagram({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="flex flex-row items-center justify-center space-x-2 py-4 overflow-x-auto w-full no-scrollbar">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center flex-shrink-0">
            <Card
              className={cn(
                "w-48 transition-all hover:scale-[1.05]",
                step.isBoundary
                  ? "border-2 border-purple-500/50 bg-slate-950 shadow-[0_0_20px_-10px_rgba(168,85,247,0.4)]"
                  : "border border-[var(--border)] bg-slate-900/50 backdrop-blur-sm"
              )}
            >
              <CardContent className="flex flex-col items-center p-3 text-center">
                {step.isBoundary ? (
                  <span className="text-xs font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-purple-200 leading-tight">
                    {step.title}
                  </span>
                ) : (
                  <>
                    <Badge className="mb-1 bg-[var(--accent)] text-[10px] py-0 px-1 opacity-80">Step {index + 1}</Badge>
                    <span className="text-[11px] font-bold tracking-wider text-white uppercase leading-tight">
                      {step.title}
                    </span>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {index < steps.length - 1 && (
            <div className="flex items-center flex-shrink-0">
              <ArrowRight className="h-4 w-4 text-[var(--accent)] opacity-50" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
