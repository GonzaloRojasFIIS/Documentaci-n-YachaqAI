"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import NotebookShell from "@/components/NotebookShell";

interface StudySlot {
  day: string;
  time: string;
  duration: number;
  label: string;
  type: "repaso" | "nuevo" | "mixto";
  details: string[];
}

export default function SchedulePage() {
  const { notebookId } = useParams<{ notebookId: string }>();
  const router = useRouter();

  const [availability, setAvailability] = useState(
    "Tengo libres los martes y jueves de 8:00 PM a 9:00 PM y los sábados de 9:00 AM a 12:00 PM."
  );
  const [generating, setGenerating] = useState(false);
  const [plan, setPlan] = useState<StudySlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<StudySlot | null>(null);

  // States for customizing study sessions
  const [editingSlot, setEditingSlot] = useState<(StudySlot & { originalIndex: number }) | null>(null);
  const [addingToDay, setAddingToDay] = useState<string | null>(null);
  const [newSlot, setNewSlot] = useState<StudySlot | null>(null);

  // Pre-load default generated plan on component mount (for both notebooks)
  useEffect(() => {
    if (notebookId === "agentes-de-inteligencia-artificial") {
      setPlan([
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
      ]);
    } else {
      setPlan([
        {
          day: "Martes",
          time: "20:00 - 21:00",
          duration: 60,
          label: "Capa Física & Enlace (Módulo 2)",
          type: "mixto",
          details: [
            "Repaso FSRS: 5 conceptos vencidos (5-10 min)",
            "Lectura activa: Ethernet (20 min)",
            "Lectura activa: Dirección MAC (20 min)",
            "Quiz rápido de comprensión (10 min)"
          ]
        },
        {
          day: "Jueves",
          time: "20:00 - 21:00",
          duration: 60,
          label: "Capa de Red: Routing (Módulo 3)",
          type: "nuevo",
          details: [
            "Repaso FSRS: 2 conceptos vencidos (5 min)",
            "Lectura activa: Routing e IPv4 (30 min)",
            "Lectura activa: Subnetting y Máscara (15 min)",
            "Simulación de laboratorio (10 min)"
          ]
        },
        {
          day: "Sábado",
          time: "09:00 - 12:00",
          duration: 180,
          label: "Capa de Transporte & Sesión Extendida",
          type: "mixto",
          details: [
            "Repaso FSRS: Todo al día (15 min)",
            "Lectura profunda: Protocolo TCP & UDP (45 min)",
            "Práctica: Three-Way Handshake (30 min)",
            "Anotaciones personales en editor dual (30 min)",
            "Cuestionario general del módulo (30 min)",
            "Sesión de retroalimentación con tutor IA (30 min)"
          ]
        }
      ]);
    }
  }, [notebookId]);

  // Regenerate/mock planner execution from language natural availability
  const handleGeneratePlan = () => {
    setGenerating(true);

    setTimeout(() => {
      if (notebookId === "agentes-de-inteligencia-artificial") {
        setPlan([
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
        ]);
      } else {
        setPlan([
          {
            day: "Martes",
            time: "20:00 - 21:00",
            duration: 60,
            label: "Capa Física & Enlace (Módulo 2)",
            type: "mixto",
            details: [
              "Repaso FSRS: 5 conceptos vencidos (5-10 min)",
              "Lectura activa: Ethernet (20 min)",
              "Lectura activa: Dirección MAC (20 min)",
              "Quiz rápido de comprensión (10 min)"
            ]
          },
          {
            day: "Jueves",
            time: "20:00 - 21:00",
            duration: 60,
            label: "Capa de Red: Routing (Módulo 3)",
            type: "nuevo",
            details: [
              "Repaso FSRS: 2 conceptos vencidos (5 min)",
              "Lectura activa: Routing e IPv4 (30 min)",
              "Lectura activa: Subnetting y Máscara (15 min)",
              "Simulación de laboratorio (10 min)"
            ]
          },
          {
            day: "Sábado",
            time: "09:00 - 12:00",
            duration: 180,
            label: "Capa de Transporte & Sesión Extendida",
            type: "mixto",
            details: [
              "Repaso FSRS: Todo al día (15 min)",
              "Lectura profunda: Protocolo TCP & UDP (45 min)",
              "Práctica: Three-Way Handshake (30 min)",
              "Anotaciones personales en editor dual (30 min)",
              "Cuestionario general del módulo (30 min)",
              "Sesión de retroalimentación con tutor IA (30 min)"
            ]
          }
        ]);
      }
      setGenerating(false);
    }, 1500);
  };

  // Save changes to existing study slot
  const handleSaveEdit = () => {
    if (!editingSlot) return;
    const updatedPlan = [...plan];
    updatedPlan[editingSlot.originalIndex] = {
      day: editingSlot.day,
      time: editingSlot.time,
      duration: Number(editingSlot.duration),
      label: editingSlot.label,
      type: editingSlot.type,
      details: editingSlot.details.map(d => d.trim()).filter(Boolean)
    };
    setPlan(updatedPlan);
    setEditingSlot(null);
    setSelectedSlot(null);
  };

  // Delete a study slot
  const handleDeleteSlot = (index: number) => {
    const updatedPlan = plan.filter((_, idx) => idx !== index);
    setPlan(updatedPlan);
    setEditingSlot(null);
    setSelectedSlot(null);
  };

  // Add new study slot
  const handleSaveNew = () => {
    if (!newSlot) return;
    setPlan([...plan, {
      ...newSlot,
      details: newSlot.details.map(d => d.trim()).filter(Boolean)
    }]);
    setNewSlot(null);
    setAddingToDay(null);
  };

  return (
    <NotebookShell>
      <div className="p-8 max-w-6xl mx-auto min-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="mb-8 border-b border-slate-100 pb-4 flex justify-between items-end">
          <div>
            <h1 className="font-display text-xl font-semibold text-slate-900 flex items-center gap-2">
              <span>Planificador de Estudio</span>
              <span className="text-xs font-normal text-muted-foreground bg-slate-100 px-2 py-0.5 rounded-md">
                Agente Programador
              </span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Visualiza, edita y personaliza tu cronograma adaptativo semanal de aprendizaje.
            </p>
          </div>
        </div>

        {/* NLP Input Panel */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm mb-8">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            Recalcular disponibilidad semanal
          </h2>
          <div className="flex flex-col gap-4">
            <textarea
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              placeholder="Ejemplo: Puedo estudiar los lunes y miércoles de 7 a 9 de la tarde y los domingos por la mañana..."
              className="w-full min-h-[60px] p-3 text-xs border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors resize-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span>⚡</span>
                El agente dividirá tu tiempo optimizando prerrequisitos lógicos.
              </span>
              <button
                onClick={handleGeneratePlan}
                disabled={generating || !availability.trim()}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors disabled:opacity-50"
              >
                {generating ? "Recalculando..." : "Calcular Sesiones con IA"}
              </button>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {generating && (
          <div className="flex-1 flex flex-col items-center justify-center p-12 border border-slate-100 rounded-2xl bg-slate-50/50">
            <span className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <h3 className="text-sm font-semibold text-slate-800 animate-pulse">
              Calculando cronograma de estudio
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs text-center">
              El Agente Scheduler está analizando el tamaño de los módulos, dependencias y tiempos estimados...
            </p>
          </div>
        )}

        {/* Plan Output (Calendar Grid) */}
        {!generating && (
          <div className="flex-1 flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-sm font-semibold text-slate-900 mb-1">Cronograma de Sesiones Activo</h2>
                <p className="text-[11px] text-muted-foreground">Haz clic en cualquier bloque para ver, editar o eliminar la sesión.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((dayName) => {
                const daySlots = plan.filter((s) => s.day === dayName);

                return (
                  <div
                    key={dayName}
                    className="rounded-xl border border-slate-200/80 p-3 flex flex-col bg-white hover:border-slate-350 transition-all min-h-[220px]"
                  >
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-100 pb-1 text-center block">
                      {dayName}
                    </span>

                    {/* Render all slots for this day */}
                    <div className="flex-1 flex flex-col gap-2 mb-3">
                      {daySlots.map((slot, sIdx) => {
                        const originalIndex = plan.indexOf(slot);
                        const typeColors = {
                          nuevo: "bg-blue-50 text-blue-700 border-blue-100",
                          repaso: "bg-emerald-50 text-emerald-700 border-emerald-100",
                          mixto: "bg-amber-50 text-amber-700 border-amber-100"
                        };
                        const typeColor = typeColors[slot.type] || "bg-slate-50 text-slate-650";

                        return (
                          <div
                            key={sIdx}
                            onClick={() => {
                              setSelectedSlot(slot);
                              setEditingSlot({ ...slot, originalIndex });
                            }}
                            className="rounded-lg border border-slate-200/60 bg-slate-50/40 hover:bg-blue-50/20 p-2 cursor-pointer transition-all flex flex-col justify-between min-h-[72px]"
                          >
                            <div className="flex justify-between items-center gap-1">
                              <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded border uppercase tracking-wider ${typeColor}`}>
                                {slot.type}
                              </span>
                              <span className="text-[9px] text-slate-500 font-medium whitespace-nowrap">
                                {slot.time}
                              </span>
                            </div>
                            <h4 className="text-[10.5px] font-bold text-slate-800 leading-tight mt-1.5 line-clamp-2">
                              {slot.label}
                            </h4>
                          </div>
                        );
                      })}

                      {daySlots.length === 0 && (
                        <div className="flex-1 flex items-center justify-center text-slate-350 text-[10px] font-medium italic py-8">
                          Descanso
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setAddingToDay(dayName);
                        setNewSlot({
                          day: dayName,
                          time: "19:00 - 20:00",
                          duration: 60,
                          label: "Nueva Sesión de Estudio",
                          type: "mixto",
                          details: ["Repaso de conceptos clave", "Lectura del tema actual"]
                        });
                      }}
                      className="w-full py-1 text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/20 border border-dashed border-slate-200 rounded-lg text-[9px] font-semibold flex items-center justify-center gap-1 transition-all"
                    >
                      <span>➕ Añadir</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Edit Slot Dialog */}
        {editingSlot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl w-full max-w-md flex flex-col gap-4 mx-4 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-display text-sm font-semibold text-slate-900">
                  Personalizar Sesión de Estudio
                </h3>
                <button
                  onClick={() => setEditingSlot(null)}
                  className="text-slate-400 hover:text-slate-650 text-lg font-bold p-1"
                >
                  ×
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[9px]">Tema / Título de la Sesión</label>
                  <input
                    type="text"
                    value={editingSlot.label}
                    onChange={(e) => setEditingSlot({ ...editingSlot, label: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[9px]">Día</label>
                    <select
                      value={editingSlot.day}
                      onChange={(e) => setEditingSlot({ ...editingSlot, day: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                    >
                      {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[9px]">Tipo de Sesión</label>
                    <select
                      value={editingSlot.type}
                      onChange={(e) => setEditingSlot({ ...editingSlot, type: e.target.value as any })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                    >
                      <option value="nuevo">Nuevo contenido</option>
                      <option value="repaso">Repaso puro</option>
                      <option value="mixto">Mixto (Contenido + SRS)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[9px]">Horario</label>
                    <input
                      type="text"
                      value={editingSlot.time}
                      onChange={(e) => setEditingSlot({ ...editingSlot, time: e.target.value })}
                      placeholder="e.g. 20:00 - 21:00"
                      className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[9px]">Duración (minutos)</label>
                    <input
                      type="number"
                      value={editingSlot.duration}
                      onChange={(e) => setEditingSlot({ ...editingSlot, duration: Number(e.target.value) })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[9px]">Distribución de Actividades (una por línea)</label>
                  <textarea
                    value={editingSlot.details.join("\n")}
                    onChange={(e) => setEditingSlot({ ...editingSlot, details: e.target.value.split("\n") })}
                    rows={4}
                    className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none font-sans leading-relaxed"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end mt-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => handleDeleteSlot(editingSlot.originalIndex)}
                  className="mr-auto px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-650 text-xs font-semibold rounded-xl transition-colors border border-red-100 shadow-sm"
                >
                  🗑️ Eliminar
                </button>
                <button
                  onClick={() => setEditingSlot(null)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Slot Dialog */}
        {addingToDay && newSlot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl w-full max-w-md flex flex-col gap-4 mx-4 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-display text-sm font-semibold text-slate-900">
                  Añadir Nueva Sesión para el {addingToDay}
                </h3>
                <button
                  onClick={() => {
                    setAddingToDay(null);
                    setNewSlot(null);
                  }}
                  className="text-slate-400 hover:text-slate-650 text-lg font-bold p-1"
                >
                  ×
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[9px]">Tema / Título de la Sesión</label>
                  <input
                    type="text"
                    value={newSlot.label}
                    onChange={(e) => setNewSlot({ ...newSlot, label: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[9px]">Día</label>
                    <select
                      value={newSlot.day}
                      onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                    >
                      {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[9px]">Tipo de Sesión</label>
                    <select
                      value={newSlot.type}
                      onChange={(e) => setNewSlot({ ...newSlot, type: e.target.value as any })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                    >
                      <option value="nuevo">Nuevo contenido</option>
                      <option value="repaso">Repaso puro</option>
                      <option value="mixto">Mixto (Contenido + SRS)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[9px]">Horario</label>
                    <input
                      type="text"
                      value={newSlot.time}
                      onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
                      placeholder="e.g. 19:00 - 20:00"
                      className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[9px]">Duración (minutos)</label>
                    <input
                      type="number"
                      value={newSlot.duration}
                      onChange={(e) => setNewSlot({ ...newSlot, duration: Number(e.target.value) })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[9px]">Distribución de Actividades (una por línea)</label>
                  <textarea
                    value={newSlot.details.join("\n")}
                    onChange={(e) => setNewSlot({ ...newSlot, details: e.target.value.split("\n") })}
                    rows={4}
                    className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none font-sans leading-relaxed"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end mt-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    setAddingToDay(null);
                    setNewSlot(null);
                  }}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveNew}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
                >
                  Añadir Sesión
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </NotebookShell>
  );
}
