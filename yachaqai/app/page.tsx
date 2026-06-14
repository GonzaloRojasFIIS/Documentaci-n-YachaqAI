"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NotebookMeta } from "@/lib/fs-wiki";

export default function HomePage() {
  const router = useRouter();
  const [notebooks, setNotebooks] = useState<NotebookMeta[]>([]);
  const [sessions, setSessions] = useState<{ id: string; title: string; date: string; notebookId: string; completed: boolean; notebookName: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetch("/api/notebooks")
      .then((r) => r.json())
      .then((data) => {
        setNotebooks(data.notebooks || []);
        setSessions(data.sessions || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !file) return;
    setCreating(true);

    try {
      const res = await fetch("/api/notebooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const nb = await res.json();

      const form = new FormData();
      form.append("file", file);
      await fetch(`/api/notebooks/${nb.id}/ingest`, { method: "POST", body: form });

      router.push(`/notebooks/${nb.id}/ingest/progress`);
    } catch (err) {
      console.error(err);
      setCreating(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Cargando cuadernos…</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-primary-foreground"
              >
                <line x1="12" y1="5" x2="5" y2="18" />
                <line x1="12" y1="5" x2="19" y2="18" />
                <line x1="5" y1="18" x2="19" y2="18" />
                <circle cx="12" cy="5" r="3" fill="currentColor" />
                <circle cx="5" cy="18" r="3" fill="currentColor" />
                <circle cx="19" cy="18" r="3" fill="currentColor" />
              </svg>
            </div>
            <h1 className="font-display text-xl font-semibold tracking-tight">YachaqAI</h1>
          </div>
          <Link href="/settings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Configuración
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight mb-2">Tus cuadernos</h2>
          <p className="text-muted-foreground">Cada cuaderno es un grafo de conocimiento que crece a partir de tus fuentes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {notebooks.map((nb) => (
            <NotebookCard
              key={nb.id}
              notebook={nb}
              onDelete={(id) => {
                setNotebooks((prev) => prev.filter((item) => item.id !== id));
                setSessions((prev) => prev.filter((s) => s.notebookId !== id));
              }}
            />
          ))}

          <div className="rounded-xl border border-border bg-card p-5 flex flex-col">
            <h3 className="font-semibold mb-1">Crear nuevo cuaderno</h3>
            <p className="text-sm text-muted-foreground mb-4">Agrega un nombre y sube una fuente para generar el grafo.</p>
            <form onSubmit={handleCreate} className="flex flex-col gap-3 flex-1">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Redes de Computadores"
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
              <label className="flex-1 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-background p-4 cursor-pointer hover:bg-muted transition-colors">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <span className="text-xs text-muted-foreground uppercase tracking-wide">{file ? file.name : "Arrastra o selecciona cualquier archivo"}</span>
              </label>
              <button
                type="submit"
                disabled={creating || !name.trim() || !file}
                className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {creating ? "Creando…" : "Crear cuaderno y generar grafo"}
              </button>
            </form>
          </div>
        </div>

        <div>
          <h3 className="font-display text-xl font-semibold tracking-tight mb-4">Próximas sesiones de repaso</h3>
          {sessions.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
              No hay sesiones programadas. Los repasos aparecerán a medida que estudies.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sessions.map((s) => (
                <Link
                  key={s.id}
                  href={`/notebooks/${s.notebookId}/srs`}
                  className="rounded-xl border border-border bg-card p-4 hover:border-ring transition-colors"
                >
                  <div className="text-xs text-muted-foreground mb-1">{s.notebookName} · {s.date}</div>
                  <div className="font-medium">{s.title}</div>
                  <div className={`mt-2 inline-flex text-xs px-2 py-0.5 rounded-full ${s.completed ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                    {s.completed ? "Completada" : "Pendiente"}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function NotebookCard({ notebook, onDelete }: { notebook: NotebookMeta; onDelete: (id: string) => void }) {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/notebooks/${notebook.id}`)
      .then((r) => r.json())
      .then((data) => setStats(data.stats));
  }, [notebook.id]);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm(`¿Estás seguro de que deseas eliminar el cuaderno "${notebook.name}"? Esta acción eliminará permanentemente todos sus archivos de notas, cuestionarios e historial. No se puede deshacer.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/notebooks/${notebook.id}`, { method: "DELETE" });
      if (res.ok) {
        onDelete(notebook.id);
      } else {
        alert("Error al intentar eliminar el cuaderno");
      }
    } catch (err) {
      console.error(err);
      alert("Error de red al intentar eliminar el cuaderno");
    }
  };

  return (
    <Link
      href={`/notebooks/${notebook.id}/dashboard`}
      className="rounded-xl border border-border bg-card p-5 hover:shadow-md hover:border-ring transition-all group relative"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center font-display font-semibold">
          {notebook.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-xs text-muted-foreground">{new Date(notebook.createdAt).toLocaleDateString("es-ES")}</span>
          <button
            onClick={handleDelete}
            className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all active:scale-90"
            title="Eliminar cuaderno"
          >
            🗑️
          </button>
        </div>
      </div>
      <h3 className="font-semibold text-lg mb-1 group-hover:text-accent-foreground transition-colors">{notebook.name}</h3>
      {stats ? (
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Maestría</span>
            <span className="font-medium">{stats.masteryAvg}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" style={{ width: `${stats.masteryAvg}%` }} />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{stats.conceptCount} conceptos</span>
            <span>{stats.totalNodes} nodos</span>
          </div>
        </div>
      ) : (
        <div className="h-16 animate-pulse bg-muted rounded-lg mt-3" />
      )}
    </Link>
  );
}
