"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ForceGraphMethods } from "react-force-graph-2d";
import { WikiNode, WikiLink } from "@/lib/types";

// Dynamic import for react-force-graph-2d since it relies on browser canvas APIs
const ForceGraph2D = dynamic(
  () => import("react-force-graph-2d").then((m) => m.default),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm font-medium animate-pulse">
        Cargando visualización del grafo…
      </div>
    ),
  }
);

interface ForceGraphProps {
  notebookId: string;
  nodes: WikiNode[];
  edges: WikiLink[];
  width?: number;
  height?: number;
  readOnly?: boolean;
  centerNodeId?: string;
}

export default function ForceGraph({
  notebookId,
  nodes,
  edges,
  width,
  height,
  readOnly = false,
  centerNodeId,
}: ForceGraphProps) {
  const router = useRouter();
  const fgRef = useRef<ForceGraphMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const [hoveredNode, setHoveredNode] = useState<WikiNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<WikiNode | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Update canvas size dynamically if width/height props are not provided
  useEffect(() => {
    if (width && height) {
      setDimensions({ width, height });
      return;
    }

    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight || 500,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width, height]);

  // Color mapping based on Semáforo de Maestría (Proposal Section 10.1)
  const getMasteryColor = useCallback((node: WikiNode) => {
    const estado = node.estado_srs || "bloqueado";
    switch (estado) {
      case "dominado":
        return "#22c55e"; // Emerald-500
      case "en_practica":
        return "#f59e0b"; // Amber-500
      case "critico":
        return "#ef4444"; // Red-500
      case "en_estudio":
        return "#3b82f6"; // Blue-500
      case "bloqueado":
      default:
        return "#9ca3af"; // Gray-400
    }
  }, []);

  // Sizing mapping based on node type
  const getNodeVal = useCallback((node: WikiNode) => {
    switch (node.type) {
      case "modulo":
      case "overview":
        return 14;
      case "fuente":
        return 10;
      case "concepto":
        return 7;
      case "entidad":
        return 5;
      default:
        return 6;
    }
  }, []);

  // Precompute adjacency list for quick neighbor highlight
  const adjList = useMemo(() => {
    const map = new Map<string, Set<string>>();
    nodes.forEach((n) => map.set(n.id, new Set()));
    edges.forEach((e) => {
      const s = typeof e.source === "object" ? (e.source as any).id : e.source;
      const t = typeof e.target === "object" ? (e.target as any).id : e.target;
      if (map.has(s)) map.get(s)?.add(t);
      if (map.has(t)) map.get(t)?.add(s);
    });
    return map;
  }, [nodes, edges]);

  // Check if a node is connected to the selected/hovered node
  const activeFocusId = selectedNode?.id || hoveredNode?.id;
  const activeNeighbors = useMemo(() => {
    if (!activeFocusId) return new Set<string>();
    return adjList.get(activeFocusId) || new Set<string>();
  }, [activeFocusId, adjList]);

  // Handle clicking a node: navigate to its markdown file
  const handleNodeClick = useCallback(
    (node: any) => {
      const n = node as WikiNode;
      if (readOnly) return;
      
      if (n.file) {
        const encoded = n.file.split("/").map(encodeURIComponent).join("/");
        router.push(`/notebooks/${notebookId}/wiki/${encoded}`);
      }
    },
    [router, notebookId, readOnly]
  );

  const handleNodeHover = useCallback((node: any) => {
    setHoveredNode(node as WikiNode | null);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

  // Center/fit graph once loaded and configure forces for dispersion
  useEffect(() => {
    if (fgRef.current) {
      const isLocal = !!centerNodeId || nodes.length < 10;
      // Adjust forces: local map needs smaller repulsion and distance to fit the 72x72 box
      fgRef.current.d3Force("charge")?.strength(isLocal ? -60 : -250);
      fgRef.current.d3Force("link")?.distance((link: any) => {
        if (isLocal) return 50;
        return link.type === "prerrequisito" ? 120 : 90;
      });
      // Strong gravity on X/Y to prevent disconnected nodes from flying away
      (fgRef.current.d3Force("x") as any)?.strength(isLocal ? 0.25 : 0.08);
      (fgRef.current.d3Force("y") as any)?.strength(isLocal ? 0.25 : 0.08);

      // Re-heat simulation to apply new forces
      fgRef.current.d3ReheatSimulation();
    }

    const timer = setTimeout(() => {
      if (fgRef.current) {
        fgRef.current.zoomToFit(200, 40);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [nodes, centerNodeId]);

  // Link styling
  const getLinkDashArray = useCallback((link: WikiLink) => {
    return link.type === "relacionado" ? [2, 2] : null;
  }, []);

  const getLinkColor = useCallback(
    (link: any) => {
      if (!activeFocusId) return "#cbd5e1"; // Light gray
      const s = typeof link.source === "object" ? link.source.id : link.source;
      const t = typeof link.target === "object" ? link.target.id : link.target;
      if (s === activeFocusId || t === activeFocusId) {
        return "#3b82f6"; // Highlight active links in blue
      }
      return "#f1f5f9"; // Dim other links
    },
    [activeFocusId]
  );

  const getLinkWidth = useCallback(
    (link: any) => {
      if (!activeFocusId) return 1.2;
      const s = typeof link.source === "object" ? link.source.id : link.source;
      const t = typeof link.target === "object" ? link.target.id : link.target;
      return s === activeFocusId || t === activeFocusId ? 2.5 : 0.4;
    },
    [activeFocusId]
  );

  const graphData = useMemo(() => {
    return {
      nodes: nodes.map((node) => {
        // Ensure all coordinates are calculated dynamically by D3 simulation
        const { fx, fy, ...rest } = node as any;
        return rest;
      }),
      links: edges.map((edge) => {
        // Reset source/target to string IDs to prevent D3 reference binding crashes
        const s = typeof edge.source === "object" ? (edge.source as any).id : edge.source;
        const t = typeof edge.target === "object" ? (edge.target as any).id : edge.target;
        return {
          ...edge,
          source: s,
          target: t,
        };
      }),
    };
  }, [nodes, edges]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="#ffffff"
        nodeLabel={() => ""} // disable default browser tooltips
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        onBackgroundClick={() => setSelectedNode(null)}
        nodeVal={getNodeVal as any}
        
        // Link config
        linkWidth={getLinkWidth}
        linkColor={getLinkColor}
        linkLineDash={getLinkDashArray as any}
        linkDirectionalArrowLength={(link: any) => (link.type === "prerrequisito" ? 4 : 0)}
        linkDirectionalArrowRelPos={0.95}

        // Custom node rendering on canvas
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const n = node as any;
          const r = getNodeVal(n);
          const color = getMasteryColor(n);
          
          const isFocused = activeFocusId === n.id;
          const isNeighbor = activeNeighbors.has(n.id);
          const isDimmed = activeFocusId && !isFocused && !isNeighbor;

          ctx.save();
          ctx.beginPath();
          ctx.arc(n.x ?? 0, n.y ?? 0, r, 0, 2 * Math.PI);
          
          // Draw shadowed background for active/focused nodes
          if (isFocused) {
            ctx.shadowColor = color;
            ctx.shadowBlur = 12;
          }

          ctx.fillStyle = isDimmed ? color + "22" : color;
          ctx.fill();
          ctx.restore();

          // Render border
          ctx.beginPath();
          ctx.arc(n.x ?? 0, n.y ?? 0, r, 0, 2 * Math.PI);
          ctx.strokeStyle = isFocused ? "#1e293b" : "rgba(255,255,255,0.85)";
          ctx.lineWidth = isFocused ? 2 : 1;
          ctx.stroke();

          // Draw outer halo rings
          if (isFocused) {
            ctx.beginPath();
            ctx.arc(n.x ?? 0, n.y ?? 0, r + 4, 0, 2 * Math.PI);
            ctx.strokeStyle = "rgba(59, 130, 246, 0.35)";
            ctx.lineWidth = 2;
            ctx.stroke();
          } else if (isNeighbor) {
            ctx.beginPath();
            ctx.arc(n.x ?? 0, n.y ?? 0, r + 2, 0, 2 * Math.PI);
            ctx.strokeStyle = "rgba(59, 130, 246, 0.15)";
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }

          // Labels rendering
          const labelText = n.label;
          const showLabel = globalScale > 1.4 || isFocused || hoveredNode?.id === n.id;
          if (showLabel && labelText) {
            const fontSize = Math.max(6, 11 / globalScale);
            ctx.font = `600 ${fontSize}px Inter, system-ui, sans-serif`;
            ctx.fillStyle = isDimmed ? "#94a3b855" : "#1e293b";
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            
            // Draw a subtle white text background for readability
            const textY = (n.y ?? 0) + r + 3;
            const textWidth = ctx.measureText(labelText).width;
            ctx.fillStyle = "rgba(255,255,255,0.8)";
            ctx.fillRect((n.x ?? 0) - textWidth / 2 - 2, textY - 1, textWidth + 4, fontSize + 2);
            
            ctx.fillStyle = isDimmed ? "#94a3b8" : "#1e293b";
            ctx.fillText(labelText, n.x ?? 0, textY);
          }
        }}
        cooldownTicks={100}
      />

      {/* Floating Hover Tooltip Card */}
      {hoveredNode && (
        <div
          className="absolute z-50 pointer-events-none p-3.5 bg-white/95 backdrop-blur border border-slate-200/80 rounded-xl shadow-lg w-56 flex flex-col gap-1.5 transition-opacity duration-150 animate-in fade-in"
          style={{
            left: mousePos.x + 16,
            top: mousePos.y + 16,
          }}
        >
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-900 leading-tight">
              {hoveredNode.label}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider mt-0.5">
              {hoveredNode.type} · {hoveredNode.category || hoveredNode.group}
            </span>
          </div>

          <div className="h-px bg-slate-100 my-0.5" />

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-muted-foreground block">Dominio:</span>
              <span className="font-semibold text-slate-800">
                {hoveredNode.maestria !== undefined
                  ? Math.round(hoveredNode.maestria * 100)
                  : 0}
                %
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block">Estado SRS:</span>
              <span
                className="font-semibold capitalize"
                style={{ color: getMasteryColor(hoveredNode) }}
              >
                {(hoveredNode.estado_srs || "bloqueado").replace("_", " ")}
              </span>
            </div>
          </div>
          
          {hoveredNode.summary && (
            <div className="text-[10px] text-slate-500 italic mt-1 line-clamp-2 border-t border-slate-50 border-dashed pt-1.5">
              {hoveredNode.summary}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
