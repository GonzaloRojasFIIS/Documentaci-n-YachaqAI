"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import NotebookShell from "@/components/NotebookShell";
import ForceGraph from "@/components/ForceGraph";
import { WikiNode, WikiLink } from "@/lib/types";

interface ChatMessage {
  role: "assistant" | "user";
  content: string;
  type?: "intro" | "availability" | "schedule" | "finished";
}

interface StudySlot {
  day: string;
  time: string;
  duration: number;
  label: string;
  type: "repaso" | "nuevo" | "mixto";
  details: string[];
}

export default function OnboardingPage() {
  const { notebookId } = useParams<{ notebookId: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [graph, setGraph] = useState<{ nodes: WikiNode[]; edges: WikiLink[] } | null>(null);

  // Flow State
  const [step, setStep] = useState<number>(1);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<StudySlot[] | null>(null);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);

  // Fetch stats and graph data (forced as all grises/bloqueados for onboarding)
  useEffect(() => {
    Promise.all([
      fetch(`/api/notebooks/${notebookId}`),
      fetch(`/api/notebooks/${notebookId}/graph`)
    ])
      .then(async ([r1, r2]) => {
        const d1 = await r1.json();
        const d2 = await r2.json();
        setStats(d1.stats);

        // Force all concept nodes to "bloqueado" state (gray) to simulate new learning path
        const grayNodes = d2.nodes.map((n: any) => {
          if (n.type === "concepto") {
            return { ...n, estado_srs: "bloqueado", maestria: 0.00 };
          }
          return n;
        });
        setGraph({ nodes: grayNodes, edges: d2.edges });
        setLoading(false);

        // Initialize chat intro
        setChatHistory([
          {
            role: "assistant",
            content: `¡Hola! Soy tu asistente de aprendizaje **YachaqAI**. He procesado tus materiales de estudio y he estructurado un mapa de conocimiento con **${d1.stats?.conceptCount || 0} conceptos** distribuidos en **${d1.stats?.moduleCount || 0} módulos**.\n\nEn el panel de la derecha puedes ver el grafo inicial. Todos los conceptos están actualmente bloqueados (en gris) porque representan tu ruta por descubrir.\n\nPara empezar, cuéntame: **¿qué días y en qué horarios tienes disponibilidad para estudiar?** Escríbelo con tus propias palabras (ej: "Lunes y miércoles de 8 a 9 pm, y sábados de 9 a 12 de la mañana").`,
            type: "intro"
          }
        ]);
      })
      .catch(() => setLoading(false));
  }, [notebookId]);

  // Handle parsing availability in language natural
  const handleAvailabilitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || submitting) return;

    const userText = userInput;
    setUserInput("");
    setSubmitting(true);

    // Add user response to chat
    setChatHistory((prev) => [...prev, { role: "user", content: userText }]);

    // Simulate Agent scheduler parsing (Section 7.2)
    setTimeout(() => {
      let mockPlan: StudySlot[] = [];

      if (notebookId === "agentes-de-inteligencia-artificial") {
        mockPlan = [
          {
            day: "Martes",
            time: "20:00 - 21:00",
            duration: 60,
            label: "Fundamentos de Agentes de IA (Módulo 1)",
            type: "mixto",
            details: [
              "Repaso FSRS: Activación inicial de conceptos (5 min)",
              "Lectura activa: IA Agéntica & Agentes Conversacionales (35 min)",
              "Cuestionario rápido de comprensión (20 min)"
            ]
          },
          {
            day: "Jueves",
            time: "20:00 - 21:00",
            duration: 60,
            label: "Arquitecturas y Protocolos (Módulo 2)",
            type: "nuevo",
            details: [
              "Repaso FSRS: 1 concepto en consolidación (5 min)",
              "Lectura activa: Arquitectura de Agente de IA Moderno (40 min)",
              "Práctica de Tool Calling & Sintaxis (15 min)"
            ]
          },
          {
            day: "Sábado",
            time: "09:00 - 12:00",
            duration: 180,
            label: "Orquestación Multiagente & Práctica",
            type: "mixto",
            details: [
              "Repaso FSRS: Tarjetas vencidas (15 min)",
              "Lectura profunda: Orquestación de Agentes con LangGraph (60 min)",
              "Caso práctico: Planificación Dinámica (45 min)",
              "Cuestionario interactivo del módulo (30 min)",
              "Sesión de retroalimentación con tutor IA (30 min)"
            ]
          }
        ];
      } else {
        // Redes de Computadoras
        mockPlan = [
          {
            day: "Martes",
            time: "20:00 - 21:00",
            duration: 60,
            label: "Modelos OSI/TCP-IP (Módulo 1)",
            type: "mixto",
            details: [
              "Repaso FSRS: Activación inicial de conceptos (5 min)",
              "Lectura activa: Modelo OSI & Stack TCP/IP (35 min)",
              "Quiz conceptual rápido (20 min)"
            ]
          },
          {
            day: "Jueves",
            time: "20:00 - 21:00",
            duration: 60,
            label: "Capa Física y Enlace (Módulo 2)",
            type: "nuevo",
            details: [
              "Lectura activa: Cableado y topologías (20 min)",
              "Lectura activa: Ethernet y Switch Capa 2 (30 min)",
              "Cuestionario de repaso (10 min)"
            ]
          },
          {
            day: "Sábado",
            time: "09:00 - 12:00",
            duration: 180,
            label: "Capa de Red (Routing & Subnetting)",
            type: "mixto",
            details: [
              "Repaso FSRS: Capas de enlace vencidas (15 min)",
              "Lectura activa: Direccionamiento IPv4 e IPv6 (45 min)",
              "Práctica guiada: Subnetting e IP Masks (60 min)",
              "Linter e integridad de mapas conceptuales (30 min)",
              "Cuestionario de repaso y tutoría IA (30 min)"
            ]
          }
        ];
      }

      setGeneratedPlan(mockPlan);
      setSubmitting(false);
      setStep(2);

      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `¡Excelente! El **Agente Scheduler** ha organizado tu plan de estudios semanal en base a las dependencias de prerrequisitos lógicos de tu grafo y tu disponibilidad.\n\nHe configurado **3 sesiones** que totalizan **5 horas de estudio** semanales, combinando contenido nuevo y repasos FSRS intercalados en los días de mayor duración.\n\nPuedes ver el calendario detallado a la derecha. Ahora dime: **¿te gustaría activar notificaciones push o por correo electrónico para recordarte tus sesiones?**`,
          type: "schedule"
        }
      ]);
    }, 1800);
  };

  // Handle setting notification options and final onboarding activation
  const handleOnboardingComplete = () => {
    setSubmitting(true);

    setTimeout(() => {
      setStep(3);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `¡Perfecto! He guardado tus preferencias. Tu plan de estudio está activo y tus recordatorios se han programado en tu zona horaria local.\n\nTodo está listo para que inicies tu aprendizaje. Te sugiero comenzar abriendo el primer módulo de estudio interactivo. **¡Mucho éxito en tu ruta académica!**`,
          type: "finished"
        }
      ]);
      setSubmitting(false);
    }, 1000);
  };

  if (loading) {
    return (
      <NotebookShell>
        <div className="p-8 max-w-4xl mx-auto flex items-center justify-center min-h-[60vh] text-muted-foreground animate-pulse font-medium">
          Preparando tu onboarding interactivo…
        </div>
      </NotebookShell>
    );
  }

  return (
    <NotebookShell>
      <div className="h-[calc(100vh-1px)] flex bg-slate-50/50">
        {/* Left Side: Conversational Onboarding Agent */}
        <div className="flex-1 flex flex-col border-r border-slate-200/80 bg-white">
          <div className="px-6 py-4 border-b border-slate-100 bg-white shadow-sm/50">
            <h1 className="font-display text-base font-semibold text-slate-900 flex items-center gap-2">
              <span>Conversación de Onboarding</span>
              <span className="text-[10px] font-normal text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                Setup Guiado
              </span>
            </h1>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Personaliza tu cronograma y asimila tu mapa de conocimiento inicial.
            </p>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 flex flex-col justify-end">
            <div className="space-y-6 overflow-y-auto flex-1 pr-1">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col gap-2 max-w-lg ${
                    msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  } animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {msg.role === "assistant" ? "🤖 Asistente YachaqAI" : "👤 Estudiante"}
                    </span>
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-50 text-slate-800 border border-slate-200/50"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                  </div>
                </div>
              ))}

              {submitting && (
                <div className="flex items-center gap-2.5 p-3 bg-slate-50 border border-slate-100 rounded-xl w-fit animate-pulse">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[10px] text-slate-500 font-medium ml-1">
                    YachaqAI calculando dependencias lógicas…
                  </span>
                </div>
              )}
            </div>

            {/* Input Panel depending on step */}
            <div className="border-t border-slate-100 pt-5 mt-4 bg-white">
              {step === 1 && (
                <form onSubmit={handleAvailabilitySubmit} className="flex gap-2.5">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    disabled={submitting}
                    required
                    placeholder="Escribe tu disponibilidad..."
                    className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={submitting || !userInput.trim()}
                    className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors disabled:opacity-50"
                  >
                    Enviar
                  </button>
                </form>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex flex-col gap-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Canales de Notificaciones
                    </span>
                    <div className="flex items-center gap-5">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 select-none">
                        <input
                          type="checkbox"
                          checked={notifEmail}
                          onChange={(e) => setNotifEmail(e.target.checked)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                        />
                        <span>Correo electrónico</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 select-none">
                        <input
                          type="checkbox"
                          checked={notifPush}
                          onChange={(e) => setNotifPush(e.target.checked)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                        />
                        <span>Recordatorios Push</span>
                      </label>
                    </div>
                  </div>
                  <button
                    onClick={handleOnboardingComplete}
                    disabled={submitting}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors disabled:opacity-50"
                  >
                    {submitting ? "Configurando..." : "Confirmar preferencias de notificaciones"}
                  </button>
                </div>
              )}

              {step === 3 && (
                <div className="flex gap-4">
                  <Link
                    href={`/notebooks/${notebookId}/modules`}
                    className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold text-center shadow-sm transition-colors"
                  >
                    📚 Comenzar Módulo 1
                  </Link>
                  <Link
                    href={`/notebooks/${notebookId}/graph`}
                    className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold text-center shadow-sm transition-colors"
                  >
                    🕸️ Explorar Grafo Completo
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Context Panel (Dynamic) */}
        <div className="w-[380px] border-l border-slate-200/80 bg-white flex flex-col flex-shrink-0">
          {step === 1 ? (
            <>
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Grafo de Conocimiento Inicial
                </h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Mapa conceptual estructurado. Todos los nodos inician bloqueados.
                </p>
              </div>
              <div className="flex-1 relative bg-slate-50/20">
                {graph ? (
                  <ForceGraph
                    notebookId={notebookId}
                    nodes={graph.nodes}
                    edges={graph.edges}
                    readOnly={true}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[11px] font-medium">
                    Cargando grafo…
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Cronograma Planificado
                </h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Calendario semanal de estudio adaptativo.
                </p>
              </div>
              <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/30">
                {generatedPlan &&
                  generatedPlan.map((slot, sIdx) => (
                    <div
                      key={sIdx}
                      className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm animate-in fade-in zoom-in-95 duration-300"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded px-1.5 py-0.5 uppercase tracking-wide">
                          {slot.type}
                        </span>
                        <span className="text-[10.5px] font-semibold text-slate-700">
                          {slot.day} · {slot.time}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 leading-tight mb-2.5">
                        {slot.label}
                      </h4>
                      <ul className="space-y-1.5 border-t border-slate-100 pt-2.5">
                        {slot.details.map((detail, dIdx) => (
                          <li
                            key={dIdx}
                            className="text-slate-600 flex items-start gap-2 text-[10px] leading-relaxed"
                          >
                            <span className="text-blue-500 font-bold">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </>
          )}
          <div className="p-4 border-t border-slate-100 bg-slate-50/40 text-[9px] text-muted-foreground leading-relaxed">
            💡 {step === 1 ? "Visualiza las relaciones y temas de tu material." : "Las sesiones se sincronizan de forma automatizada con tu agenda."}
          </div>
        </div>
      </div>
    </NotebookShell>
  );
}
