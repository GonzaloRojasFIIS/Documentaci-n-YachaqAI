"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import NotebookShell from "@/components/NotebookShell";

const AnimatedGraph = dynamic(() => import("@/components/AnimatedGraph"), { ssr: false });

export default function IngestProgressPage() {
  const { notebookId } = useParams<{ notebookId: string }>();
  const router = useRouter();
  const [graph, setGraph] = useState<{ nodes: any[]; edges: any[] } | null>(null);
  const [phase, setPhase] = useState<string>("Iniciando ingesta…");
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    fetch(`/api/notebooks/${notebookId}/ingest`, { method: "POST" })
      .then((r) => r.json())
      .then((data) => {
        setGraph(data.graph || { nodes: [], edges: [] });
        setPhase("Construyendo grafo de conocimiento…");
      })
      .catch(() => setPhase("Error al procesar la fuente."));
  }, [notebookId]);

  function handleComplete() {
    setPhase("¡Grafo listo! Redirigiendo…");
    setTimeout(() => {
      router.push(`/notebooks/${notebookId}/onboarding`);
    }, 1200);
  }

  return (
    <NotebookShell>
      <div className="h-full flex flex-col items-center justify-center p-8">
        <div className="text-center mb-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight mb-2">Construyendo tu cuaderno</h1>
          <p className="text-muted-foreground animate-pulse">{phase}</p>
        </div>
        <div className="w-full max-w-5xl h-[60vh] rounded-2xl border border-border bg-card overflow-hidden shadow-sm relative">
          {graph ? (
            <AnimatedGraph nodes={graph.nodes} edges={graph.edges} onComplete={handleComplete} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Preparando visualización…
            </div>
          )}
        </div>
      </div>
    </NotebookShell>
  );
}
