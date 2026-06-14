"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import type { ForceGraphMethods } from "react-force-graph-2d";
import { WikiNode, WikiLink } from "@/lib/types";

// Dynamic import for react-force-graph-2d
const ForceGraph2D = dynamic(
  () => import("react-force-graph-2d").then((m) => m.default),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm font-medium animate-pulse">
        Preparando animación del grafo…
      </div>
    ),
  }
);

interface AnimatedGraphProps {
  nodes: WikiNode[];
  edges: WikiLink[];
  onComplete: () => void;
}

export default function AnimatedGraph({ nodes, edges, onComplete }: AnimatedGraphProps) {
  const fgRef = useRef<ForceGraphMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [visibleNodes, setVisibleNodes] = useState<WikiNode[]>([]);
  const [visibleEdges, setVisibleEdges] = useState<WikiLink[]>([]);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  // Update canvas size dynamically
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight || 400,
        });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animate the addition of nodes and links
  useEffect(() => {
    if (nodes.length === 0) return;

    let index = 0;
    const addedIds = new Set<string>();

    const interval = setInterval(() => {
      if (index >= nodes.length) {
        clearInterval(interval);
        // Wait 1.5s after finishing the layout before completing
        setTimeout(() => {
          onComplete();
        }, 1500);
        return;
      }

      const nextNode = nodes[index];
      addedIds.add(nextNode.id);

      // Filter edges that connect currently visible nodes
      const activeEdges = edges.filter((e) => {
        const s = typeof e.source === "object" ? (e.source as any).id : e.source;
        const t = typeof e.target === "object" ? (e.target as any).id : e.target;
        return addedIds.has(s) && addedIds.has(t);
      });

      // Update state
      setVisibleNodes(nodes.slice(0, index + 1));
      setVisibleEdges(activeEdges);

      index++;
    }, 120); // 120ms per node for a smooth, visible build-up animation

    return () => clearInterval(interval);
  }, [nodes, edges, onComplete]);

  // Center/fit graph once some nodes exist and configure forces for dispersion
  useEffect(() => {
    if (fgRef.current) {
      // Push nodes farther apart during dynamic ingestion
      fgRef.current.d3Force("charge")?.strength(-150);
      // Keep links spaced apart
      fgRef.current.d3Force("link")?.distance(80);
      fgRef.current.d3ReheatSimulation();
    }
    if (visibleNodes.length > 3) {
      fgRef.current?.zoomToFit(150, 30);
    }
  }, [visibleNodes.length]);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-slate-950">
      <ForceGraph2D
        ref={fgRef}
        graphData={{ nodes: visibleNodes, links: visibleEdges as any }}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="#090d16" // Sleek dark mode background for build phase
        nodeLabel={(node: any) => node.label}
        nodeColor={() => "#3b82f6"} // Glowing blue color during ingestion
        nodeVal={(node: any) => (node.type === "modulo" ? 8 : 4)}
        
        // Links config
        linkColor={() => "rgba(59, 130, 246, 0.25)"}
        linkWidth={1}

        // Custom canvas rendering for a nice sci-fi glowing particle effect
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const n = node as any;
          const r = n.type === "modulo" ? 7 : 4;
          
          ctx.save();
          ctx.beginPath();
          ctx.arc(n.x ?? 0, n.y ?? 0, r, 0, 2 * Math.PI);
          ctx.fillStyle = "#3b82f6";
          ctx.shadowColor = "#3b82f6";
          ctx.shadowBlur = 10;
          ctx.fill();
          
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();

          // Render minimal node text labels
          const fontSize = Math.max(5, 8 / globalScale);
          ctx.font = `${fontSize}px sans-serif`;
          ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
          ctx.textAlign = "center";
          ctx.fillText(n.label, n.x ?? 0, (n.y ?? 0) + r + 3);
        }}
        cooldownTicks={60}
      />
      
      {/* Floating progress text indicator */}
      <div className="absolute bottom-4 left-4 font-mono text-[11px] text-blue-400 bg-blue-950/40 border border-blue-900/30 px-3 py-1.5 rounded-lg backdrop-blur-sm">
        Indexación: {visibleNodes.length} / {nodes.length} conceptos
      </div>
    </div>
  );
}
