"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import NotebookShell from "@/components/NotebookShell";

interface ModuleData {
  id: string;
  title: string;
  description: string;
  concepts: { id: string; title: string; file: string; estado_srs: string; maestria: number }[];
  mastery: number;
}

export default function ModulesPage() {
  const { notebookId } = useParams<{ notebookId: string }>();

  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState<ModuleData[]>([]);

  useEffect(() => {
    fetch(`/api/notebooks/${notebookId}`)
      .then((r) => r.json())
      .then((data) => {
        const pages = data.pages || [];
        const modulePages = pages
          .filter((p: any) => p.type === "modulo")
          .sort((a: any, b: any) => (a.frontmatter?.orden || 0) - (b.frontmatter?.orden || 0));
        const conceptPages = pages.filter((p: any) => p.type === "concepto");

        const computedModules = modulePages.map((m: any) => {
          const modSlug = m.page_id.replace("modulo-", "");
          
          // Find concepts belonging to this module
          const relatedConcepts = conceptPages
            .filter((c: any) => c.frontmatter.modulo === modSlug)
            .map((c: any) => ({
              id: c.page_id,
              title: c.title,
              file: c.file,
              estado_srs: c.estado_srs || "bloqueado",
              maestria: c.maestria || 0,
            }));

          // Calculate average mastery
          const avg = relatedConcepts.length
            ? relatedConcepts.reduce((acc: number, c: any) => acc + c.maestria, 0) / relatedConcepts.length
            : 0;

          return {
            id: m.page_id,
            title: m.title,
            description: m.frontmatter.resumen || "Módulo de aprendizaje.",
            concepts: relatedConcepts,
            mastery: Math.round(avg * 100),
          };
        });

        setModules(computedModules);
        setLoading(false);
      });
  }, [notebookId]);

  const getSrsBadgeColor = (estado: string) => {
    switch (estado) {
      case "dominado":
        return "bg-emerald-500";
      case "en_practica":
        return "bg-amber-500";
      case "critico":
        return "bg-red-500";
      case "en_estudio":
        return "bg-blue-500";
      case "bloqueado":
      default:
        return "bg-slate-400";
    }
  };

  if (loading) {
    return (
      <NotebookShell>
        <div className="p-8 max-w-4xl mx-auto flex items-center justify-center min-h-[60vh] text-muted-foreground animate-pulse font-medium">
          Cargando estructura de módulos…
        </div>
      </NotebookShell>
    );
  }

  return (
    <NotebookShell>
      <div className="p-8 max-w-5xl mx-auto min-h-[85vh]">
        {/* Header */}
        <div className="mb-8 border-b border-slate-100 pb-4">
          <h1 className="font-display text-xl font-semibold text-slate-900 flex items-center gap-2">
            <span>Módulos de Aprendizaje</span>
            <span className="text-xs font-normal text-muted-foreground bg-slate-100 px-2 py-0.5 rounded-md">
              Progreso de Maestría
            </span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Vista estructurada de los temas clave y tu nivel de dominio por cada concepto.
          </p>
        </div>

        {modules.length === 0 ? (
          <div className="text-center p-12 border border-slate-100 rounded-2xl bg-slate-50/50">
            <p className="text-xs text-muted-foreground italic">No hay módulos disponibles en este cuaderno. Agrega una fuente primero.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="font-display text-sm font-semibold text-slate-900">
                      {mod.title}
                    </h2>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 uppercase">
                      {mod.concepts.length} Conceptos
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed mb-6 line-clamp-2">
                    {mod.description}
                  </p>

                  {/* Dynamic Mastery progress bar */}
                  <div className="space-y-1.5 mb-6">
                    <div className="flex justify-between items-center text-xs font-medium">
                      <span className="text-slate-700">Maestría Promedio</span>
                      <span className="text-slate-900 font-bold">{mod.mastery}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${mod.mastery}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Concepts list section */}
                <div className="border-t border-slate-100 pt-4 mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Conceptos Clave
                    </h4>
                    <Link
                      href={`/notebooks/${notebookId}/srs?module=${mod.id.replace("modulo-", "")}`}
                      className="text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors px-2 py-1 rounded bg-blue-50/50 hover:bg-blue-50 border border-blue-100/40"
                    >
                      <span>📝 Dar Cuestionario</span>
                      <span className="text-[8px]">▶</span>
                    </Link>
                  </div>
                  {mod.concepts.length === 0 ? (
                    <span className="text-[10px] text-slate-400 italic">No hay conceptos en este módulo.</span>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mod.concepts.map((concept) => (
                        <Link
                          key={concept.id}
                          href={`/notebooks/${notebookId}/wiki/${concept.file.split("/").map(encodeURIComponent).join("/")}`}
                          className="flex items-center gap-2.5 p-2 rounded-lg border border-slate-50 hover:border-slate-200 bg-slate-50/20 hover:bg-slate-50/50 transition-all group"
                        >
                          <span
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${getSrsBadgeColor(
                              concept.estado_srs
                            )}`}
                          />
                          <span className="text-[11px] font-medium text-slate-700 group-hover:text-blue-600 transition-colors truncate">
                            {concept.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </NotebookShell>
  );
}
