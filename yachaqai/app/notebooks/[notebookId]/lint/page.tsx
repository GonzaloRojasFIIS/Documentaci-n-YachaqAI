"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import NotebookShell from "@/components/NotebookShell";

interface LintIssue {
  id: string;
  type: "orphan" | "contradiction" | "missing_page";
  title: string;
  description: string;
  file: string;
  status: "pending" | "fixed";
}

export default function LintPage() {
  const { notebookId } = useParams<{ notebookId: string }>();

  const [score, setScore] = useState(87);
  const [running, setRunning] = useState(false);
  const [issues, setIssues] = useState<LintIssue[]>([]);

  useEffect(() => {
    if (notebookId === "agentes-de-inteligencia-artificial") {
      setIssues([
        {
          id: "i1",
          type: "orphan",
          title: "Concepto huérfano detectado",
          description: "El archivo '3. entidades/langchain.md' no tiene enlaces entrantes en ninguna otra nota del wiki.",
          file: "3. entidades/langchain.md",
          status: "pending",
        },
        {
          id: "i2",
          type: "contradiction",
          title: "Contradicción semántica en gobernanza",
          description: "Tus notas en '2. conceptos/arquitectura-sbc.md' afirman que las entidades SBC (Single-Agent Behavioral Control) operan de manera autónoma sin supervisión de gobernanza corporativa, lo cual contradice las directrices de alineación y control ético definidas en '1. introduccion/gobernanza-ia.md'.",
          file: "2. conceptos/arquitectura-sbc.md",
          status: "pending",
        },
        {
          id: "i3",
          type: "missing_page",
          title: "Pregunta sin concepto asociado",
          description: "La pregunta 'Cuestionario: Memoria a Largo Plazo' apunta al concepto '2. conceptos/vector-stores.md', pero este archivo no ha sido creado en el wiki.",
          file: "4. preguntas/q-memoria.md",
          status: "pending",
        },
      ]);
      setScore(78);
    } else {
      setIssues([
        {
          id: "i1",
          type: "orphan",
          title: "Concepto huérfano detectado",
          description: "El archivo '3. entidades/ietf.md' no tiene enlaces entrantes en ninguna otra nota del wiki.",
          file: "3. entidades/ietf.md",
          status: "pending",
        },
        {
          id: "i2",
          type: "contradiction",
          title: "Contradicción semántica en notas personales",
          description: "Tus notas en '2. conceptos/tcp.md' afirman que TCP no asegura el orden de los bytes, lo cual contradice la definición formal en la especificación RFC 793 de la IETF.",
          file: "2. conceptos/tcp.md",
          status: "pending",
        },
        {
          id: "i3",
          type: "missing_page",
          title: "Pregunta sin concepto asociado",
          description: "La pregunta 'Cuestionario: Subnetting' apunta al concepto '2. conceptos/subnetting.md', pero este archivo no ha sido creado en el wiki.",
          file: "4. preguntas/q-subnetting.md",
          status: "pending",
        },
      ]);
      setScore(82);
    }
  }, [notebookId]);

  const handleRunLint = () => {
    setRunning(true);

    setTimeout(() => {
      // Simulate automatic fixes and update health score
      setIssues((prev) =>
        prev.map((issue) => ({
          ...issue,
          status: "fixed",
        }))
      );
      setScore(100);
      setRunning(false);
    }, 2000);
  };

  const getIssueBadge = (type: string) => {
    switch (type) {
      case "orphan":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "contradiction":
        return "bg-red-50 text-red-700 border-red-100";
      case "missing_page":
      default:
        return "bg-blue-50 text-blue-700 border-blue-100";
    }
  };

  return (
    <NotebookShell>
      <div className="p-8 max-w-4xl mx-auto min-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="mb-8 border-b border-slate-100 pb-4">
          <h1 className="font-display text-xl font-semibold text-slate-900 flex items-center gap-2">
            <span>Health Check & Linter</span>
            <span className="text-xs font-normal text-muted-foreground bg-slate-100 px-2 py-0.5 rounded-md">
              Verificador de Integridad
            </span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Analiza wikilinks rotos, notas huérfanas y contradicciones semánticas en tu base de conocimiento.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Health Score Card */}
          <div className="md:col-span-1 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm flex flex-col items-center justify-center text-center">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              Puntaje de Salud
            </h3>
            <div className="relative flex items-center justify-center mb-2">
              {/* Radial Score Indicator */}
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#f1f5f9"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke={score === 100 ? "#10b981" : "#3b82f6"}
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 40}
                  strokeDashoffset={2 * Math.PI * 40 * (1 - score / 100)}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <span className="absolute text-xl font-bold text-slate-800">{score}%</span>
            </div>
            <span className="text-[10px] font-semibold text-muted-foreground">
              {score === 100 ? "Integridad del Wiki: Óptima" : "Se requieren correcciones"}
            </span>
          </div>

          {/* Linter Info Panel */}
          <div className="md:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-450 uppercase tracking-wider mb-2">
                Agente de Integridad LINT
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                El motor LINT realiza escaneos de consistencia lógica cruzada y análisis de referencias. Corrige wikilinks rotos enlazando al concepto correcto y detecta afirmaciones contradictorias contra fuentes formales usando IA.
              </p>
            </div>
            <button
              onClick={handleRunLint}
              disabled={running || score === 100}
              className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
            >
              {running ? "Corrigiendo problemas semánticos…" : score === 100 ? "Wiki 100% Saludable" : "Corregir todos los problemas con IA"}
            </button>
          </div>
        </div>

        {/* Loading Spinner overlay */}
        {running && (
          <div className="flex-1 flex flex-col items-center justify-center p-12 border border-slate-100 rounded-2xl bg-slate-50/50 mb-8">
            <span className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <h3 className="text-sm font-semibold text-slate-800 animate-pulse">
              Corriendo verificación semántica profunda
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs text-center">
              El linter de YachaqAI está reparando metadatos frontmatter, resolviendo referencias rotas y reconciliando tus notas.
            </p>
          </div>
        )}

        {/* Issues list */}
        {!running && (
          <div className="flex-1 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Incidencias Detectadas ({issues.filter((i) => i.status === "pending").length})
            </h3>
            
            {issues.map((issue) => (
              <div
                key={issue.id}
                className={`rounded-xl border p-4 bg-white shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4 transition-all duration-300 ${
                  issue.status === "fixed" ? "border-emerald-100 bg-emerald-50/10 opacity-75" : "border-slate-200"
                }`}
              >
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-bold border rounded px-1.5 py-0.5 uppercase tracking-wide ${getIssueBadge(issue.type)}`}>
                      {issue.type.replace("_", " ")}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">
                      {issue.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {issue.description}
                  </p>
                  <span className="text-[10px] text-muted-foreground block font-mono">
                    Ruta: {issue.file}
                  </span>
                </div>

                <div className="flex-shrink-0">
                  {issue.status === "fixed" ? (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 rounded-full text-[10px] flex items-center gap-1.5 shadow-sm">
                      <span>✓</span> Corregido
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-amber-50 text-amber-700 font-bold border border-amber-200 rounded-full text-[10px] flex items-center gap-1.5 shadow-sm animate-pulse">
                      <span>⚠️</span> Pendiente
                    </span>
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
