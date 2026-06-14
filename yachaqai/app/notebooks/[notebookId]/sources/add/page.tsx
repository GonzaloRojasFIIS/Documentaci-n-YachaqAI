"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NotebookShell from "@/components/NotebookShell";

export default function AddSourcesPage() {
  const { notebookId } = useParams<{ notebookId: string }>();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setLoading(true);

    const form = new FormData();
    form.append("file", file);

    await fetch(`/api/notebooks/${notebookId}/ingest`, {
      method: "POST",
      body: form,
    });

    router.push(`/notebooks/${notebookId}/ingest/progress`);
  }

  return (
    <NotebookShell>
      <div className="p-8 max-w-2xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight mb-2">Agregar fuentes</h1>
        <p className="text-muted-foreground mb-8">
          Sube cualquier archivo. YachaqAI procesará tu fuente y construirá el grafo de conocimiento.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-input bg-card p-12 cursor-pointer hover:bg-muted transition-colors">
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl">
              ↑
            </div>
            <div className="text-center">
              <p className="font-medium">{file ? file.name : "Arrastra un archivo aquí o haz clic para seleccionar"}</p>
              <p className="text-sm text-muted-foreground mt-1">PDF, DOCX, TXT, MD, URL… cualquier formato</p>
            </div>
          </label>

          <button
            type="submit"
            disabled={loading || !file}
            className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Procesando…" : "Generar grafo de conocimiento"}
          </button>
        </form>
      </div>
    </NotebookShell>
  );
}
