"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import NotebookShell from "@/components/NotebookShell";
import ForceGraph from "@/components/ForceGraph";
import { WikiNode, WikiLink } from "@/lib/types";
import { marked } from "marked";

interface Message {
  role: "user" | "assistant";
  content: string;
  citations?: { id: string; file: string; title: string }[];
  steps?: string[];
  nodesQuery?: string[]; // nodes relevant to this message
}

export default function ChatPage() {
  const { notebookId } = useParams<{ notebookId: string }>();

  const [graph, setGraph] = useState<{ nodes: WikiNode[]; edges: WikiLink[] } | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy tu asistente pedagógico de **YachaqAI**. Puedo responder preguntas complejas basándome en los apuntes de tu cuaderno y visualizar los conceptos relacionados en el panel lateral. ¿De qué te gustaría aprender hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Track currently active nodes in right panel
  const [activeNodeIds, setActiveNodeIds] = useState<string[]>([]);

  const suggestions = useMemo(() => {
    if (notebookId === "agentes-de-inteligencia-artificial") {
      return [
        "¿Qué es la IA Agéntica y cómo se diferencia de los chatbots?",
        "Explica los componentes de la Arquitectura de un Agente Moderno.",
        "¿Qué frameworks se utilizan para la Orquestación de Agentes?",
        "¿Cuáles son los desafíos éticos y de Gobernanza de IA?",
      ];
    }
    return [
      "¿Cuál es la diferencia entre TCP y UDP?",
      "¿Cómo funciona el proceso de Three-Way Handshake?",
      "¿Qué es subnetting y por qué es útil?",
      "¿Qué es el DNS y sobre qué protocolo de transporte corre?",
    ];
  }, [notebookId]);

  // Load complete graph to perform sub-graph rendering
  useEffect(() => {
    fetch(`/api/notebooks/${notebookId}/graph`)
      .then((r) => r.json())
      .then((data) => {
        setGraph(data);
        // Initially show overview nodes in right panel
        const overviewNodes = data.nodes
          .filter((n: any) => n.group === "overview" || n.category === "Fundamentos")
          .map((n: any) => n.id);
        setActiveNodeIds(overviewNodes);
      });
  }, [notebookId]);

  // Extract subset of the graph for the right side panel
  const subGraphData = useMemo(() => {
    if (!graph) return { nodes: [], edges: [] };
    if (activeNodeIds.length === 0) return graph; // Fallback to full graph if empty

    const filteredNodes = graph.nodes.filter((n) => activeNodeIds.includes(n.id));
    const nodeIds = new Set(filteredNodes.map((n) => n.id));
    const filteredEdges = graph.edges.filter((e) => {
      const s = typeof e.source === "object" ? (e.source as any).id : e.source;
      const t = typeof e.target === "object" ? (e.target as any).id : e.target;
      return nodeIds.has(s) && nodeIds.has(t);
    });

    return { nodes: filteredNodes, edges: filteredEdges };
  }, [graph, activeNodeIds]);

  const handleSend = (text: string) => {
    if (!text.trim() || loading) return;

    const newMessages = [...messages, { role: "user", content: text } as Message];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Simulated RAG Agent Response matching Section 12.3 & Section 5
    setTimeout(() => {
      const query = text.toLowerCase();
      let response = "";
      let citations: { id: string; file: string; title: string }[] = [];
      let steps: string[] = [];
      let queriedNodes: string[] = [];

      if (notebookId === "agentes-de-inteligencia-artificial") {
        if (query.includes("agentica") || query.includes("agéntica") || query.includes("chatbot")) {
          response = "La **IA Agéntica (Agentic AI)** representa el paso de sistemas de Inteligencia Artificial reactivos (como chatbots que responden comandos fijos) a entidades proactivas y autónomas. Estos agentes pueden razonar sobre una meta general, descomponerla en planes, tomar decisiones independientes y ejecutar acciones reales usando herramientas externas sin requerir intervención constante.\n\nSus componentes principales incluyen:\n* **LLM Core (Cerebro)**: Para razonar y tomar decisiones.\n* **Planificación Dinámica**: Ajustar la ruta si cambian las condiciones.\n* **Llamada a herramientas (Tool-calling)**: Conectarse a APIs o bases de datos.";
          citations = [
            { id: "concepto-ia-agentica", file: "2. conceptos/ia-agentica.md", title: "IA Agéntica" },
            { id: "concepto-agentes-conversacionales-avanzados", file: "2. conceptos/agentes-conversacionales-avanzados.md", title: "Agentes Conversacionales Avanzados" },
          ];
          steps = [
            "🔍 Búsqueda vectorial: 'IA Agéntica vs chatbot' con similitud 0.96.",
            "🕸️ Expansión de subgrafo: Recuperando relaciones a 'Automatización Proactiva'.",
            "📄 Lectura de apuntes: Cargando archivos de conceptos e ideas clave de Fundamentos.",
            "🧠 Síntesis con LLM: Agrupando comparaciones sobre el cambio a sistemas activos.",
          ];
          queriedNodes = ["concepto-ia-agentica", "concepto-agentes-conversacionales-avanzados", "concepto-automatizacion-proactiva"];
        } else if (query.includes("arquitectura") || query.includes("componentes") || query.includes("estructura")) {
          response = "La **Arquitectura de un Agente de IA Moderno** se compone de cinco pilares fundamentales que interactúan de forma continua:\n\n1. **El Cerebro (LLM)**: Procesa información y razona.\n2. **Memoria**: Memoria a corto plazo (el contexto del chat) y memoria a largo plazo (almacenamiento vectorial RAG).\n3. **Planificación y Razonamiento**: Descomposición de problemas (e.g. Chain of Thought) y auto-reflexión.\n4. **Uso de Herramientas (Tool-calling)**: APIs, scripts o bases de datos externas.\n5. **Percepción y Acción**: Módulos que captan el entorno (sensores) y actúan sobre él (actuadores).";
          citations = [
            { id: "concepto-arquitectura-de-agente-de-ia-moderno", file: "2. conceptos/arquitectura-de-agente-de-ia-moderno.md", title: "Arquitectura de Agente Moderno" },
            { id: "concepto-uso-de-herramientas-tool-calling", file: "2. conceptos/uso-de-herramientas-tool-calling.md", title: "Uso de Herramientas" },
          ];
          steps = [
            "🔍 Búsqueda vectorial: 'Arquitectura de Agente' con similitud 0.98.",
            "🕸️ Expansión de subgrafo: Conexiones a 'Tool Calling' e 'Interfaz Sintaxis-Semántica'.",
            "📄 Lectura de apuntes: Analizando la anatomía del agente del archivo 'arquitectura-de-agente-de-ia-moderno.md'.",
            "🧠 Síntesis con LLM: Estructurando el desglose de los componentes de agentes.",
          ];
          queriedNodes = ["concepto-arquitectura-de-agente-de-ia-moderno", "concepto-uso-de-herramientas-tool-calling", "concepto-interfaz-sintaxis-semantica"];
        } else if (query.includes("orquestacion") || query.includes("orquestación") || query.includes("frameworks") || query.includes("langgraph") || query.includes("crewai")) {
          response = "La **Orquestación de Agentes** se refiere a la coordinación de múltiples agentes especializados que colaboran para resolver problemas complejos a gran escala.\n\nLos frameworks más populares son:\n* **LangGraph**: Construye flujos circulares y cíclicos usando grafos dirigidos.\n* **CrewAI**: Diseña dinámicas colaborativas basadas en roles y tareas.\n* **AutoGen**: Permite conversaciones multiagente flexibles.\n\nPara plataformas empresariales, destacan soluciones como Microsoft Copilot Studio, Salesforce Agentforce e IBM watsonx.";
          citations = [
            { id: "concepto-orquestacion-de-agentes", file: "2. conceptos/orquestacion-de-agentes.md", title: "Orquestación de Agentes" },
            { id: "concepto-planificacion-dinamica", file: "2. conceptos/planificacion-dinamica.md", title: "Planificación Dinámica" },
          ];
          steps = [
            "🔍 Búsqueda vectorial: 'Orquestación de Agentes y frameworks' con similitud 0.95.",
            "🕸️ Expansión de subgrafo: Trayectos a 'Planificación Dinámica' y 'Estabilidad Translingüística'.",
            "📄 Lectura de apuntes: Cargando notas sobre LangGraph y CrewAI del archivo del concepto.",
            "🧠 Síntesis con LLM: Estructurando comparaciones entre frameworks multiagente.",
          ];
          queriedNodes = ["concepto-orquestacion-de-agentes", "concepto-planificacion-dinamica", "concepto-capacidad-referencial"];
        } else if (query.includes("gobernanza") || query.includes("ética") || query.includes("desviacion") || query.includes("desviación") || query.includes("riesgos")) {
          response = "La **Gobernanza de IA** es el conjunto de reglas y marcos éticos para el desarrollo y despliegue seguro de agentes de IA autónomos. Sus mayores desafíos incluyen:\n\n1. **Desviación de la línea base humana**: Cuánto difiere el criterio del agente respecto al juicio de un experto humano.\n2. **Mapeo conceptual a la realidad**: Asegurar que las suposiciones y modelos lógicos del agente coincidan con la física y restricciones reales.\n3. **Responsabilidad legal**: Quién asume las consecuencias de decisiones autónomas erróneas (e.g. compras financieras incorrectas).\n4. **Estabilidad translingüística**: Que las políticas éticas del agente no se degraden al operar en diferentes lenguajes.";
          citations = [
            { id: "concepto-gobernanza-de-ia", file: "2. conceptos/gobernanza-de-ia.md", title: "Gobernanza de IA" },
            { id: "concepto-desviacion-de-la-linea-base-humana", file: "2. conceptos/desviacion-de-la-linea-base-humana.md", title: "Desviación de la Línea Base Humana" },
            { id: "concepto-mapeo-conceptual-a-la-realidad", file: "2. conceptos/mapeo-conceptual-a-la-realidad.md", title: "Mapeo Conceptual a la Realidad" },
          ];
          steps = [
            "🔍 Búsqueda vectorial: 'Gobernanza y ética en agentes' con similitud 0.93.",
            "🕸️ Expansión de subgrafo: Caminos a 'Desviación' y 'Mapeo conceptual a la realidad'.",
            "📄 Lectura de apuntes: Leyendo directrices regulatorias de 'gobernanza-de-ia.md'.",
            "🧠 Síntesis con LLM: Extrayendo puntos clave éticos y técnicos.",
          ];
          queriedNodes = ["concepto-gobernanza-de-ia", "concepto-desviacion-de-la-linea-base-humana", "concepto-mapeo-conceptual-a-la-realidad"];
        } else {
          response = "No tengo notas específicas sobre eso en este cuaderno. Sin embargo, basándome en el contexto de agentes de IA, puedo sugerirte revisar los conceptos de Fundamentos de IA, Arquitecturas, Orquestación o Evaluación y Gobernanza.";
          citations = [
            { id: "overview-agentes-ia", file: "overview.md", title: "Visión General" },
          ];
          steps = [
            "🔍 Búsqueda vectorial: Búsqueda fallida. Similitud semántica inferior a 0.60.",
            "🕸️ Expansión de subgrafo: Cargando nodos principales del índice de IA.",
            "📄 Lectura de apuntes: Leyendo overview.md del mazo.",
            "🧠 Síntesis con LLM: Proponiendo temas alternativos de IA Agéntica.",
          ];
          queriedNodes = ["concepto-ia-agentica", "concepto-agentes-conversacionales-avanzados", "concepto-gobernanza-de-ia"];
        }
      } else {
        // Redes de Computadoras
        if (query.includes("handshake") || query.includes("saludo")) {
          response =
            "El **Three-Way Handshake** (saludo de tres vías) es el mecanismo de establecimiento de conexión en TCP. Consta de tres pasos:\n\n1. **SYN**: El cliente envía un segmento con el flag SYN activo para sincronizar sus números de secuencia.\n2. **SYN-ACK**: El servidor responde con SYN activo para sincronizar sus propios números de secuencia y un ACK para confirmar el SYN del cliente.\n3. **ACK**: El cliente envía un segmento final de confirmación (ACK) para establecer formalmente el socket.\n\nEsto garantiza que ambas partes estén listas para transmitir datos confiables.";
          citations = [
            { id: "concepto-three-way-handshake", file: "2. conceptos/three-way-handshake.md", title: "Three-Way Handshake" },
            { id: "concepto-tcp", file: "2. conceptos/tcp.md", title: "Protocolo TCP" },
          ];
          steps = [
            "🔍 Búsqueda vectorial: 'Three-way Handshake' matcheado con similitud 0.94.",
            "🕸️ Expansión de subgrafo: Siguiendo enlaces hacia 'TCP' y 'Puertos'.",
            "📄 Lectura de apuntes: Cargados archivos de conceptos asociados y notas personales del usuario.",
            "🧠 Síntesis con LLM: Agrupando respuestas sobre el handshake de tres vías.",
          ];
          queriedNodes = ["concepto-three-way-handshake", "concepto-tcp", "concepto-puertos"];
        } else if (query.includes("dns") || query.includes("nombre")) {
          response =
            "El **DNS** (Domain Name System) es el protocolo de capa de aplicación que actúa como la libreta de direcciones de Internet, traduciendo nombres de dominio legibles por humanos (ej. `google.com`) a direcciones IP numéricas (ej. `142.250.191.46`).\n\nEl servicio DNS se ejecuta principalmente sobre UDP en el puerto 53 para reducir la latencia de resolución, aunque puede recurrir a TCP en transferencias de zona grandes o si el paquete supera los 512 bytes.";
          citations = [
            { id: "concepto-dns", file: "2. conceptos/dns.md", title: "DNS" },
            { id: "concepto-tcp-ip", file: "2. conceptos/tcp-ip.md", title: "Modelo TCP/IP" },
          ];
          steps = [
            "🔍 Búsqueda vectorial: 'DNS' matcheado con similitud 0.97.",
            "🕸️ Expansión de subgrafo: Navegando arista 'usa' -> 'capa-aplicacion'.",
            "📄 Lectura de apuntes: Cargando 'dns.md' para contexto de puertos.",
            "🧠 Síntesis con LLM: Generando resumen sobre servicios de resolución de nombres.",
          ];
          queriedNodes = ["concepto-dns", "concepto-http", "concepto-tls"];
        } else if (query.includes("tcp") || query.includes("udp") || query.includes("transporte")) {
          response =
            "La diferencia principal entre **TCP** y **UDP** radica en la confiabilidad de la conexión:\n\n* **TCP (Transmission Control Protocol)**: Es orientado a conexión, confiable, garantiza el orden de llegada de los paquetes mediante reconocimientos (ACKs), realiza retransmisiones y regula la velocidad mediante mecanismos de control de congestión.\n* **UDP (User Datagram Protocol)**: No está orientado a conexión, es rápido, tiene muy bajo overhead y no garantiza la entrega de paquetes. Es ideal para tráfico de videollamadas o juegos online donde la velocidad prima sobre la integridad.";
          citations = [
            { id: "concepto-tcp", file: "2. conceptos/tcp.md", title: "TCP" },
            { id: "concepto-udp", file: "2. conceptos/udp.md", title: "UDP" },
            { id: "concepto-control-congestion", file: "2. conceptos/control-congestion.md", title: "Control de Congestión" },
          ];
          steps = [
            "🔍 Búsqueda vectorial: 'TCP vs UDP' matcheado en Capa de Transporte.",
            "🕸️ Expansión de subgrafo: Subgrafo de transporte recuperado (5 nodos).",
            "📄 Lectura de apuntes: Analizando diferencias estructurales y control de flujo.",
            "🧠 Síntesis con LLM: Comparando características de protocolos de transporte.",
          ];
          queriedNodes = ["concepto-tcp", "concepto-udp", "concepto-puertos", "concepto-control-congestion", "concepto-three-way-handshake"];
        } else if (query.includes("subnetting") || query.includes("red") || query.includes("ip")) {
          response =
            "El **Subnetting** es el proceso de dividir una red física en varias subredes lógicas más pequeñas. Es extremadamente útil por tres razones principales:\n\n1. **Eficiencia**: Minimiza el desperdicio de direcciones IP.\n2. **Seguridad**: Aísla el tráfico entre diferentes subredes.\n3. **Rendimiento**: Reduce el tamaño de los dominios de broadcast y mejora la velocidad del routing.";
          citations = [
            { id: "concepto-subnetting", file: "2. conceptos/subnetting.md", title: "Subnetting" },
            { id: "concepto-ipv4", file: "2. conceptos/ipv4.md", title: "IPv4" },
            { id: "concepto-mascara-subred", file: "2. conceptos/mascara-subred.md", title: "Máscara de Subred" },
          ];
          steps = [
            "🔍 Búsqueda vectorial: 'Subnetting' matcheado con similitud 0.92.",
            "🕸️ Expansión de subgrafo: Nodos conectados 'IPv4', 'Máscara' y 'Routing'.",
            "📄 Lectura de apuntes: Cargando archivos conceptuales de Capa de Red.",
            "🧠 Síntesis con LLM: Generando explicaciones de subnetting y direccionamiento.",
          ];
          queriedNodes = ["concepto-subnetting", "concepto-ipv4", "concepto-mascara-subred", "concepto-routing", "concepto-ospf"];
        } else {
          response =
            "No tengo notas específicas sobre eso en este cuaderno. Sin embargo, basándome en el contexto de redes, puedo sugerirte revisar los conceptos de Capas del Modelo OSI, Stack TCP/IP o Protocolos de Aplicación.";
          citations = [
            { id: "concepto-modelo-osi", file: "2. conceptos/modelo-osi.md", title: "Modelo OSI" },
          ];
          steps = [
            "🔍 Búsqueda vectorial: Búsqueda fallida. Umbral de similitud inferior a 0.60.",
            "🕸️ Expansión de subgrafo: Recuperando nodos centrales del cuaderno.",
            "📄 Lectura de apuntes: Cargado index.md principal.",
            "🧠 Síntesis con LLM: Sugiriendo temas alternativos.",
          ];
          queriedNodes = ["concepto-modelo-osi", "concepto-tcp-ip", "concepto-topologias-red", "concepto-medios-transmision"];
        }
      }

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: response,
          citations,
          steps,
          nodesQuery: queriedNodes,
        },
      ]);
      
      // Update sub-graph view in right panel
      if (queriedNodes.length > 0) {
        setActiveNodeIds(queriedNodes);
      }
      setLoading(false);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    handleSend(suggestion);
  };

  return (
    <NotebookShell>
      <div className="h-[calc(100vh-1px)] flex bg-slate-50/50">
        {/* Left Side: Chat Workspace */}
        <div className="flex-1 flex flex-col border-r border-slate-200/80 bg-white">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h1 className="font-display text-base font-semibold text-slate-900 flex items-center gap-2">
                <span>LLM Wiki Chat</span>
                <span className="text-[10px] font-normal text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  Agentic RAG
                </span>
              </h1>
              <p className="text-xs text-muted-foreground">
                Haz preguntas para consultar las notas del cuaderno usando RAG semántico.
              </p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-5">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col gap-2 max-w-2xl ${
                  msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-800 border border-slate-200/40"
                  }`}
                >
                  {msg.role === "user" ? (
                    <p className="whitespace-pre-line">{msg.content}</p>
                  ) : (
                    <div
                      className="prose prose-slate prose-xs max-w-none prose-p:my-1 prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5 prose-strong:text-slate-900 prose-strong:font-bold prose-headings:text-slate-900"
                      dangerouslySetInnerHTML={{ __html: marked.parse(msg.content) as string }}
                    />
                  )}
                </div>

                {/* Timeline reasoning steps (Agentic RAG) */}
                {msg.steps && msg.steps.length > 0 && (
                  <details className="w-full text-[10px] text-slate-500 bg-slate-50 border border-slate-200/50 rounded-lg p-2.5 cursor-pointer outline-none hover:bg-slate-100/30 transition-colors">
                    <summary className="font-semibold select-none text-slate-700">
                      Ver traza del Agente RAG ({msg.steps.length} pasos)
                    </summary>
                    <ul className="mt-2 space-y-1.5 pl-1.5 border-l border-slate-200">
                      {msg.steps.map((step, sIdx) => (
                        <li key={sIdx} className="font-mono leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}

                {/* Citations list */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {msg.citations.map((cite, cIdx) => (
                      <Link
                        key={cIdx}
                        href={`/notebooks/${notebookId}/wiki/${cite.file.split("/").map(encodeURIComponent).join("/")}`}
                        className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[10px] text-slate-600 font-medium hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm"
                      >
                        <span>📄</span>
                        <span>{cite.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl w-fit animate-pulse">
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" />
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-slate-500 font-medium ml-1">
                  IA procesando y consultando subgrafo…
                </span>
              </div>
            )}
          </div>

          {/* Quick Suggestions Chips */}
          {messages.length === 1 && (
            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/20">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2.5">
                Consultas Sugeridas
              </span>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => handleSuggestionClick(sug)}
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-full text-[10px] text-slate-600 font-medium hover:text-slate-800 hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input Area */}
          <div className="p-4 border-t border-slate-100 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex gap-2.5"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                placeholder="Pregunta algo sobre tu cuaderno (ej. ¿Por qué TCP es orientado a la conexión?)..."
                className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors disabled:opacity-50"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Graph Context Panel */}
        <div className="w-[340px] border-l border-slate-200/80 bg-white flex flex-col flex-shrink-0">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Subgrafo de Consulta
            </h3>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Nodos del conocimiento consultados en tiempo real.
            </p>
          </div>
          <div className="flex-1 relative bg-slate-50/30">
            {graph ? (
              <ForceGraph
                notebookId={notebookId}
                nodes={subGraphData.nodes}
                edges={subGraphData.edges}
                readOnly={true}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[11px] font-medium">
                Cargando subgrafo de contexto…
              </div>
            )}
          </div>
          <div className="p-4 border-t border-slate-100 bg-slate-50/40 text-[9px] text-muted-foreground leading-relaxed">
            ℹ️ Los nodos mostrados se extraen dinámicamente utilizando el análisis RAG sobre tu base de conocimiento.
          </div>
        </div>
      </div>
    </NotebookShell>
  );
}
