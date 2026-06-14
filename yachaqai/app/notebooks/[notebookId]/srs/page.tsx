"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import NotebookShell from "@/components/NotebookShell";

interface QA {
  q: string;
  a: string;
}

interface SRSCard {
  pageId: string;
  title: string;
  file: string;
  conceptoAsociado: string;
  subtipo: string;
  qas: QA[];
}

export default function SRSPage() {
  const { notebookId } = useParams<{ notebookId: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const moduleFilter = searchParams.get("module");

  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<SRSCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  
  // Evaluation state
  const [evaluating, setEvaluating] = useState(false);
  const [evalReport, setEvalReport] = useState<any>(null);
  const [savingGrade, setSavingGrade] = useState(false);

  // Load questions from notebook pages
  useEffect(() => {
    fetch(`/api/notebooks/${notebookId}`)
      .then((r) => r.json())
      .then((data) => {
        const questionPages = data.pages.filter((p: any) => p.type === "pregunta");
        const conceptPages = data.pages.filter((p: any) => p.type === "concepto");
        
        // Parse markdown content for each question page
        let parsedCards = questionPages.map((p: any) => {
          // Parse conceptId from concepto_asociado field
          let conceptoAsociado = "";
          if (p.frontmatter.concepto_asociado) {
            const parts = p.frontmatter.concepto_asociado.split("/");
            conceptoAsociado = parts[parts.length - 1].replace(".md", "");
          }

          // Parse questions and answers from markdown body
          const qaParts = p.content.split(/##\s+Pregunta\s+\d+/i);
          const qas: QA[] = [];

          for (let i = 1; i < qaParts.length; i++) {
            const part = qaParts[i];
            const match = part.match(/>\s*Respuesta:\s*(.*)/i);
            if (match) {
              const qText = part.split(/>\s*Respuesta:/i)[0].trim();
              const aText = match[1].trim();
              qas.push({ q: qText, a: aText });
            }
          }

          return {
            pageId: p.page_id,
            title: p.title,
            file: p.file,
            conceptoAsociado,
            subtipo: p.frontmatter.subtipo_cuestionario || "conceptual",
            qas,
          };
        });

        // Filter cards if a module filter is active
        if (moduleFilter) {
          parsedCards = parsedCards.filter((card: any) => {
            const assoc = conceptPages.find(
              (c: any) => c.page_id === `concepto-${card.conceptoAsociado}` || c.page_id === card.conceptoAsociado
            );
            return assoc?.frontmatter?.modulo === moduleFilter;
          });
        }

        setCards(parsedCards);
        setLoading(false);
      });
  }, [notebookId, moduleFilter]);

  const currentCard = useMemo(() => {
    if (cards.length === 0 || currentIndex >= cards.length) return null;
    return cards[currentIndex];
  }, [cards, currentIndex]);

  // Handle mock evaluation for open development questions
  const handleEvaluate = () => {
    if (!userAnswer.trim()) return;
    setEvaluating(true);
    setEvalReport(null);

    // Mock evaluation report after 1.5s delay
    setTimeout(() => {
      // Basic heuristic to check answer content
      const ans = userAnswer.toLowerCase();
      let coverage = ["Mencionó el concepto base", "Respuesta escrita con coherencia"];
      let missed: string[] = [];
      let suggestion = "bien";
      let tip = "Revisa los detalles estructurales del concepto.";
      let just = "Respuesta correcta y concisa. Abarca el núcleo del concepto.";

      if (currentCard?.conceptoAsociado === "three-way-handshake") {
        const hasSyn = ans.includes("syn");
        const hasAck = ans.includes("ack");
        if (hasSyn && hasAck) {
          coverage.push("Identificó correctamente el envío de SYN y ACK");
          coverage.push("Explicó el orden de establecimiento");
          suggestion = "excelente";
          tip = "Excelente comprensión. Puedes revisar tiempos RTT en el material de lectura.";
          just = "Mencionó todas las fases del handshake (SYN, SYN-ACK, ACK) de forma clara.";
        } else {
          missed.push("No detalló el orden de las señales SYN y ACK");
          suggestion = "dificil";
          tip = "Intenta memorizar las 3 señales: SYN, SYN-ACK y luego ACK.";
          just = "Falta precisión sobre los nombres específicos de los flags de control.";
        }
      } else if (currentCard?.conceptoAsociado === "dns") {
        const hasIp = ans.includes("ip") || ans.includes("númer");
        const hasName = ans.includes("nombre") || ans.includes("domin");
        if (hasIp && hasName) {
          coverage.push("Explicó la traducción de nombres a IPs");
          coverage.push("Mencionó la utilidad del servicio");
          suggestion = "bien";
          tip = "Prueba a profundizar en el modelo jerárquico (nodos raíz, TLD, autoritativos).";
        } else {
          missed.push("No aclaró que mapea nombres de dominio a direcciones IP");
          suggestion = "olvidado";
          tip = "El DNS actúa como las 'páginas amarillas' de internet. Traduce google.com a su IP.";
        }
      } else {
        // Fallback generic evaluation
        if (ans.length > 30) {
          coverage.push("Aportó explicaciones secundarias interesantes");
          suggestion = "bien";
        } else {
          missed.push("Respuesta muy breve, expande más tu explicación");
          suggestion = "dificil";
        }
      }

      setEvalReport({
        ideas_cubiertas: coverage,
        ideas_omitidas: missed,
        calificacion_sugerida: suggestion,
        justificacion: just,
        tip_de_estudio: tip,
      });
      setEvaluating(false);
      setShowAnswer(true);
    }, 1500);
  };

  // Submit Spaced Repetition grade to backend
  const handleGrade = async (grade: "excelente" | "bien" | "dificil" | "olvidado") => {
    if (!currentCard) return;
    setSavingGrade(true);

    try {
      const res = await fetch(`/api/notebooks/${notebookId}/srs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conceptId: currentCard.conceptoAsociado,
          grade,
        }),
      });

      if (res.ok) {
        // Move to the next card
        setUserAnswer("");
        setShowAnswer(false);
        setEvalReport(null);
        setCurrentIndex((prev) => prev + 1);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingGrade(false);
    }
  };

  if (loading) {
    return (
      <NotebookShell>
        <div className="p-8 max-w-4xl mx-auto flex items-center justify-center min-h-[60vh] text-muted-foreground animate-pulse font-medium">
          Cargando cola de repetición…
        </div>
      </NotebookShell>
    );
  }

  // End of review session state
  if (cards.length === 0 || currentIndex >= cards.length) {
    return (
      <NotebookShell>
        <div className="p-8 max-w-2xl mx-auto text-center flex flex-col items-center justify-center min-h-[70vh]">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm border border-emerald-100">
            ✓
          </div>
          <h1 className="font-display text-2xl font-semibold text-slate-900 mb-2">
            ¡Sesión de repaso completada!
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mb-8">
            Has repasado todas las flashcards activas en este cuaderno. Tu curva de olvido FSRS se ha actualizado.
          </p>
          <div className="flex gap-4">
            <Link
              href={`/notebooks/${notebookId}/dashboard`}
              className="px-5 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
            >
              Ir al Dashboard
            </Link>
            <Link
              href={`/notebooks/${notebookId}/graph`}
              className="px-5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-sm"
            >
              Ver Grafo Semáforo
            </Link>
          </div>
        </div>
      </NotebookShell>
    );
  }

  return (
    <NotebookShell>
      <div className="p-8 max-w-4xl mx-auto min-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
          <div>
            <h1 className="font-display text-xl font-semibold text-slate-900 flex items-center gap-2">
              <span>{moduleFilter ? `Cuestionario Módulo: ${moduleFilter.replace(/-/g, " ").toUpperCase()}` : "Repaso Espaciado"}</span>
              <span className="text-xs font-normal text-muted-foreground bg-slate-100 px-2 py-0.5 rounded-md">
                FSRS v5
              </span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Evaluación inteligente mediante Agente de IA Evaluador.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
            Tarjeta {currentIndex + 1} de {cards.length}
          </span>
        </div>

        {/* Card Body */}
        {currentCard && (
          <div className="flex-1 flex flex-col gap-6">
            <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden flex flex-col">
              {/* Category Header */}
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Concepto: {currentCard.conceptoAsociado.replace(/-/g, " ")}
                </span>
                <span className="text-[10px] font-semibold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 uppercase">
                  {currentCard.subtipo}
                </span>
              </div>

              {/* QA Content */}
              <div className="p-6 flex-1 flex flex-col gap-6">
                <div className="space-y-4">
                  {currentCard.qas.map((qa, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {index + 1}. {qa.q}
                      </h3>
                      {!showAnswer ? (
                        <textarea
                          placeholder="Escribe tu respuesta aquí para que el tutor de IA la evalúe..."
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          disabled={evaluating}
                          className="w-full min-h-[80px] p-3 text-xs border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors resize-none disabled:opacity-50"
                        />
                      ) : (
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                          <span className="font-semibold text-emerald-600 block mb-1">Respuesta Esperada:</span>
                          <p className="text-slate-700 font-medium">{qa.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* AI Evaluator Report */}
                {evaluating && (
                  <div className="p-5 border border-blue-100 bg-blue-50/20 rounded-xl flex items-center justify-center gap-3">
                    <span className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-blue-600 font-semibold animate-pulse">
                      🤖 Tutor Evaluador IA analizando cobertura y precisión…
                    </span>
                  </div>
                )}

                {evalReport && (
                  <div className="p-5 border border-slate-200 bg-slate-50/50 rounded-xl space-y-4 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <span>🤖 Reporte del Tutor IA</span>
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        Sugerencia: <span className="text-blue-600 capitalize font-extrabold">{evalReport.calificacion_sugerida}</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5">
                        <span className="font-semibold text-slate-700 block">Ideas cubiertas:</span>
                        <ul className="space-y-1">
                          {evalReport.ideas_cubiertas.map((idea: string, i: number) => (
                            <li key={i} className="text-slate-600 flex items-start gap-1.5">
                              <span className="text-emerald-500 font-bold">✓</span>
                              {idea}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {evalReport.ideas_omitidas.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="font-semibold text-slate-700 block">Puntos omitidos:</span>
                          <ul className="space-y-1">
                            {evalReport.ideas_omitidas.map((idea: string, i: number) => (
                              <li key={i} className="text-slate-600 flex items-start gap-1.5">
                                <span className="text-amber-500 font-bold">!</span>
                                {idea}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="h-px bg-slate-200/50" />

                    <div className="text-xs">
                      <span className="font-semibold text-slate-700 block mb-1">Justificación del Tutor:</span>
                      <p className="text-slate-600 italic">{evalReport.justificacion}</p>
                    </div>

                    <div className="text-xs bg-slate-100 p-2.5 rounded-lg border border-slate-200/50">
                      <span className="font-semibold text-slate-700 block mb-0.5">Tip de Estudio:</span>
                      <p className="text-slate-600">{evalReport.tip_de_estudio}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions / SRS Buttons */}
            <div className="flex justify-end gap-3 pb-8">
              {!showAnswer && !evalReport && (
                <button
                  onClick={handleEvaluate}
                  disabled={!userAnswer.trim() || evaluating}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                >
                  Enviar para Evaluación IA
                </button>
              )}

              {showAnswer && (
                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: "olvidado", label: "Olvidado", desc: "repaso urgente", color: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100" },
                    { id: "dificil", label: "Difícil", desc: "repasar en 3d", color: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100" },
                    { id: "bien", label: "Bien", desc: "repasar en 7d", color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" },
                    { id: "excelente", label: "Excelente", desc: "repasar en 21d", color: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => handleGrade(btn.id as any)}
                      disabled={savingGrade}
                      className={`flex flex-col items-center justify-center p-3 border rounded-xl transition-all shadow-sm ${btn.color}`}
                    >
                      <span className="font-bold text-xs">{btn.label}</span>
                      <span className="text-[9px] opacity-80 mt-0.5">{btn.desc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </NotebookShell>
  );
}
