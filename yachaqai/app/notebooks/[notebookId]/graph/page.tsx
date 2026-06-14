"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import NotebookShell from "@/components/NotebookShell";

const NotebookGraph = dynamic(() => import("@/components/NotebookGraph"), { ssr: false });

export default function GraphPage() {
  const { notebookId } = useParams<{ notebookId: string }>();

  return (
    <NotebookShell>
      <div className="h-[calc(100vh-1px)] flex flex-col">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-card/50">
          <div>
            <h1 className="font-display text-xl font-semibold">Grafo de conocimiento</h1>
            <p className="text-sm text-muted-foreground">Haz clic en un nodo para abrir su nota.</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <LegendItem color="#22c55e" label="Dominado" />
            <LegendItem color="#f59e0b" label="En práctica" />
            <LegendItem color="#ef4444" label="Crítico" />
            <LegendItem color="#9ca3af" label="Bloqueado" />
          </div>
        </div>
        <div className="flex-1 min-h-0 relative w-full h-full">
          <NotebookGraph notebookId={notebookId} />
        </div>
      </div>
    </NotebookShell>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
