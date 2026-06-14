"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import NotebookShell from "@/components/NotebookShell";

export default function DashboardPage() {
  const { notebookId } = useParams<{ notebookId: string }>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/notebooks/${notebookId}`)
      .then((r) => r.json())
      .then(setData);
  }, [notebookId]);

  if (!data) {
    return (
      <NotebookShell>
        <div className="p-10 animate-pulse text-muted-foreground">Cargando dashboard…</div>
      </NotebookShell>
    );
  }

  const { meta, stats } = data;
  const estado = stats?.estadoCounts || {};

  return (
    <NotebookShell>
      <div className="p-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold tracking-tight mb-2">{meta.name}</h1>
          <p className="text-muted-foreground">{meta.description || "Cuaderno de estudio generado con YachaqAI."}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Conceptos" value={stats?.conceptCount || 0} />
          <StatCard label="Nodos totales" value={stats?.totalNodes || 0} />
          <StatCard label="Maestría" value={`${stats?.masteryAvg || 0}%`} />
          <StatCard label="Fuentes" value={stats?.sourceCount || 0} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-4">Distribución de maestría</h3>
            <div className="space-y-3">
              <MasteryBar label="Dominado" count={estado.dominado || 0} total={stats?.conceptCount || 1} color="bg-emerald-500" />
              <MasteryBar label="En práctica" count={estado.en_practica || 0} total={stats?.conceptCount || 1} color="bg-amber-500" />
              <MasteryBar label="Crítico" count={estado.critico || 0} total={stats?.conceptCount || 1} color="bg-red-500" />
              <MasteryBar label="Bloqueado" count={estado.bloqueado || 0} total={stats?.conceptCount || 1} color="bg-slate-400" />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-4">Acciones rápidas</h3>
            <div className="space-y-2">
              <Link href={`/notebooks/${notebookId}/sources/add`} className="block w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium text-center hover:bg-primary/90 transition-colors">
                Agregar fuentes
              </Link>
              <Link href={`/notebooks/${notebookId}/graph`} className="block w-full px-4 py-2 rounded-lg border border-input bg-background text-sm font-medium text-center hover:bg-muted transition-colors">
                Ver grafo
              </Link>
              <Link href={`/notebooks/${notebookId}/wiki/index.md`} className="block w-full px-4 py-2 rounded-lg border border-input bg-background text-sm font-medium text-center hover:bg-muted transition-colors">
                Abrir wiki
              </Link>
            </div>
          </div>
        </div>
      </div>
    </NotebookShell>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function MasteryBar({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const pct = total ? Math.round((count / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1">
        <span>{label}</span>
        <span className="text-muted-foreground">{count} ({pct}%)</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
