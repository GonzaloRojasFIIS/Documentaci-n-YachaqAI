"use client";

import { useEffect, useState, useMemo } from "react";
import { WikiNode, WikiLink } from "@/lib/types";
import ForceGraph from "./ForceGraph";

export default function NotebookGraph({ notebookId }: { notebookId: string }) {
  const [graph, setGraph] = useState<{ nodes: WikiNode[]; edges: WikiLink[] } | null>(null);
  
  // Filters state
  const [selectedModule, setSelectedModule] = useState<string>("todos");
  const [selectedStates, setSelectedStates] = useState<Record<string, boolean>>({
    dominado: true,
    en_practica: true,
    critico: true,
    bloqueado: true,
    en_estudio: true,
  });

  useEffect(() => {
    fetch(`/api/notebooks/${notebookId}/graph`)
      .then((r) => r.json())
      .then(setGraph);
  }, [notebookId]);

  // Extract unique module ids from nodes
  const availableModules = useMemo(() => {
    if (!graph) return [];
    const mods = new Set<string>();
    graph.nodes.forEach((n) => {
      if (n.module) {
        mods.add(n.module);
      }
    });
    return Array.from(mods);
  }, [graph]);

  // Filter nodes and edges
  const filteredGraph = useMemo(() => {
    if (!graph) return { nodes: [], edges: [] };

    // Filter nodes
    const nodes = graph.nodes.filter((node) => {
      // 1. Module filter
      if (selectedModule !== "todos" && node.module !== selectedModule && node.id !== selectedModule) {
        return false;
      }
      // 2. Mastery state filter
      const estado = node.estado_srs || "bloqueado";
      if (!selectedStates[estado]) {
        return false;
      }
      return true;
    });

    const nodeIds = new Set(nodes.map((n) => n.id));

    // Filter edges (only keep links between visible nodes)
    const edges = graph.edges.filter((edge) => {
      const s = typeof edge.source === "object" ? (edge.source as any).id : edge.source;
      const t = typeof edge.target === "object" ? (edge.target as any).id : edge.target;
      return nodeIds.has(s) && nodeIds.has(t);
    });

    return { nodes, edges };
  }, [graph, selectedModule, selectedStates]);

  if (!graph) {
    return (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm font-medium animate-pulse">
        Cargando datos del grafo…
      </div>
    );
  }

  const toggleState = (state: string) => {
    setSelectedStates((prev) => ({
      ...prev,
      [state]: !prev[state],
    }));
  };

  return (
    <div className="w-full h-full relative flex flex-col md:flex-row bg-slate-50/50">
      {/* Left sidebar filter panel */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200/80 bg-white p-5 flex flex-col gap-6 flex-shrink-0 z-10">
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Filtrar por Módulo
          </h3>
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="w-full text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none focus:border-blue-500 transition-colors"
          >
            <option value="todos">Todos los temas</option>
            {availableModules.map((mod) => (
              <option key={mod} value={mod}>
                {mod.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Estados de Maestría
          </h3>
          <div className="flex flex-col gap-2.5">
            {[
              { id: "dominado", label: "Dominado", color: "bg-emerald-500 border-emerald-500" },
              { id: "en_practica", label: "En Práctica", color: "bg-amber-500 border-amber-500" },
              { id: "critico", label: "Crítico", color: "bg-red-500 border-red-500" },
              { id: "en_estudio", label: "En Estudio", color: "bg-blue-500 border-blue-500" },
              { id: "bloqueado", label: "Bloqueado", color: "bg-slate-400 border-slate-400" },
            ].map((st) => (
              <label
                key={st.id}
                className="flex items-center gap-3 cursor-pointer group text-xs text-slate-700 font-medium select-none"
              >
                <input
                  type="checkbox"
                  checked={selectedStates[st.id]}
                  onChange={() => toggleState(st.id)}
                  className="hidden"
                />
                <span
                  className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-all ${
                    selectedStates[st.id]
                      ? `${st.color} text-white`
                      : "border-slate-300 bg-white group-hover:border-slate-400"
                  }`}
                >
                  {selectedStates[st.id] && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-2.5 h-2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>
                <span className="group-hover:text-slate-900 transition-colors">
                  {st.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-auto border-t border-slate-100 pt-4 text-[10px] text-muted-foreground flex flex-col gap-1">
          <span>Nodos mostrados: {filteredGraph.nodes.length} / {graph.nodes.length}</span>
          <span>Enlaces mostrados: {filteredGraph.edges.length} / {graph.edges.length}</span>
        </div>
      </div>

      {/* Main graph canvas area */}
      <div className="flex-1 relative min-h-[400px] md:min-h-0">
        <ForceGraph
          notebookId={notebookId}
          nodes={filteredGraph.nodes}
          edges={filteredGraph.edges}
        />
      </div>
    </div>
  );
}
