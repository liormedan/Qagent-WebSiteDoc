"use client";

import React, { useMemo } from "react";
import {
  ReactFlow,
  Handle,
  Position,
  Background,
  BackgroundVariant,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const CustomNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="group relative">
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[var(--accent)] to-blue-600 opacity-20 blur transition duration-300 group-hover:opacity-40" />
      <div className="relative rounded-xl border border-[var(--border)] bg-slate-900/90 px-8 py-5 shadow-2xl backdrop-blur-xl">
        <Handle type="target" position={Position.Top} className="!h-2 !w-2 !border-none !bg-[var(--accent)]" />
        <span className="text-base font-bold tracking-wider text-white uppercase">{data.label}</span>
        <Handle type="source" position={Position.Bottom} className="!h-2 !w-2 !border-none !bg-[var(--accent)]" />
      </div>
    </div>
  );
};

const BoundaryNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="group relative">
      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-md animate-pulse" />
      <div className="relative rounded-2xl border-2 border-purple-500/50 bg-slate-950 px-10 py-8 shadow-[0_0_60px_-12px_rgba(168,85,247,0.5)]">
        <Handle type="target" position={Position.Top} className="!h-3 !w-3 !border-none !bg-purple-400" />
        <span className="text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-purple-200">
          {data.label}
        </span>
      </div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
  boundary: BoundaryNode,
};

export type FlowData = {
  nodes: Node[];
  edges: Edge[];
};

export function FlowDiagram({ data }: { data: FlowData }) {
  const defaultEdgeOptions = useMemo(() => ({
    animated: true,
    style: { stroke: "var(--accent)", strokeWidth: 3, opacity: 0.8 },
  }), []);

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-slate-950/50 backdrop-blur-sm">
      <ReactFlow
        nodes={data.nodes}
        edges={data.edges}
        nodeTypes={nodeTypes}
        nodeOrigin={[0.5, 0]}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        defaultEdgeOptions={defaultEdgeOptions}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        panOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#334155" />
      </ReactFlow>
      
      {/* Decorative Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
    </div>
  );
}
