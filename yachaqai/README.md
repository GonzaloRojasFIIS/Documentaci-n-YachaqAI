# YachaqAI — Next.js 15 + TypeScript + shadcn/ui

Prototipo de la plataforma **YachaqAI** (LMS con knowledge graph + repetición espaciada), inspirado en:
- **Rowboat** (stack base): Next.js 15 + TypeScript + shadcn/ui (new-york) + lucide-react + Tailwind v4 + Cytoscape
- **Kompl** (complementos): mini-grafo en cada lectura, layout editorial centrado, vista "Kinetic Archive", top nav minimalista
- **YachaqAI** (funcionalidad): Wiki (vault de Markdown), grafo de conocimiento, FSRS, LLM Wiki con RAG simulado

## Stack

| Capa | Tecnología |
|---|---|
| Framework | **Next.js 15.0** (App Router) |
| Lenguaje | **TypeScript 5** (strict) |
| UI | **shadcn/ui** (new-york style, baseColor: neutral) + Tailwind v3 (CSS vars) |
| Iconos | **lucide-react** |
| Tipografía | **Inter** + **Space Grotesk** + **JetBrains Mono** (vía `next/font`) |
| Grafo | **Cytoscape** (CDN-style via npm) |
| Markdown | Custom renderer (soporta `[[id]]`, `[[id\|txt]]`, frontmatter, tablas) |
| Estado | React Context (`use-wiki.tsx`) |

## Estructura

```
yachaqai/
├── app/
│   ├── layout.tsx                 # Root layout (TopNav + Sidebar + StatusBar)
│   ├── page.tsx                   # / Upload (PDF/URL/demo)
│   ├── globals.css                # Tailwind + design tokens + Kompl editorial
│   ├── dashboard/page.tsx         # /dashboard
│   ├── graph/page.tsx             # /graph (Cytoscape interactivo)
│   ├── editor/page.tsx            # /editor?file=... (visualizador MD con mini-grafo)
│   ├── files/page.tsx             # /files (archive estilo Kompl: tree/cards/recent)
│   ├── wiki/page.tsx              # /wiki (LLM Wiki chat con RAG simulado)
│   ├── srs/page.tsx               # /srs (FSRS flashcards con Agente Evaluador)
│   ├── schedule/page.tsx          # /schedule (calendario semanal)
│   ├── modules/page.tsx           # /modules (6 módulos topológicos)
│   ├── notifications/page.tsx     # /notifications
│   ├── lint/page.tsx              # /lint (salud del Wiki + problemas)
│   └── api/
│       ├── ingest/route.ts        # POST simulado de ingesta de PDF/URL
│       ├── chat/route.ts          # POST Q&A matching con Q&A pairs
│       ├── srs/route.ts           # GET preguntas + POST calificación FSRS
│       ├── graph/route.ts         # GET nodos/aristas o vecindario
│       ├── mini-graph/route.ts    # POST datos del mini-grafo (SVG-ready)
│       ├── files/route.ts         # GET contenido de archivo MD
│       └── lint/route.ts          # GET score + issues
├── components/
│   ├── top-nav.tsx                # Top nav estilo Kompl (Inicio/Wiki/Grafo)
│   ├── sidebar.tsx                # Sidebar con Wiki context card (de Kompl)
│   ├── mini-graph.tsx             # Mini-grafo SVG (inspirado en Kompl)
│   ├── markdown-renderer.tsx      # Parser MD con wikilinks y frontmatter
│   ├── file-tree.tsx              # Tree explorador de archivos
│   ├── redirect.tsx               # Helper para redirect con estado
│   └── ui/                        # shadcn primitives (button, card, badge, input)
├── hooks/
│   └── use-wiki.tsx               # Contexto global del Wiki (cargado, currentView)
├── lib/
│   ├── data.ts                    # Seed data (3 fuentes, 35 nodos, 50 aristas, 6 Q&A, ...)
│   └── utils.ts                   # cn() helper
├── components.json                # shadcn config
├── tailwind.config.ts             # Tailwind theme + design tokens
├── next.config.mjs
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

## Modo standard

**Light mode** es el estándar (configurado en `app/globals.css`). El `dark:` se mantiene como variante preparada pero no se usa por defecto.

## Cómo correr

```bash
cd yachaqai
npm install
npm run dev
# Abre http://localhost:3000
```

## Recorrido recomendado

1. **`/`** — Aparece la pantalla de Upload. Click en tab "Usar demo" → "Cargar Wiki de demostración" (animación de 4 pasos, ~2s).
2. **`/dashboard`** — Stats, continue-card, repasos urgentes, curva de retención, fuentes.
3. **`/graph`** — Cytoscape interactivo. Hover dim-neighbors, click abre side panel, 3 modos de color.
4. **`/files`** — Vista "Kinetic Archive" (de Kompl). Tabs: Árbol / Por tipo / Recientes. Click en archivo abre preview con mini-grafo.
5. **`/editor?file=2.%20conceptos/protocolo_tcp.md`** — Visualizador MD con toolbar (lectura/edición/dual), panel derecho con **mini-grafo** (cuadrado con nodo al centro + relacionados), frontmatter, nodos relacionados. Click en wikilinks navega.
6. **`/wiki`** — Chat con 4 preguntas sugeridas. Cada respuesta muestra los nodos consultados en panel derecho, archivos citados, fuentes con snippets. Simula los 6 pasos del agente (RAG simulado vía `qa_pairs` matching por keywords).
7. **`/srs`** — 10 flashcards. Las objetivas se auto-califican; las de desarrollo pasan por el **Agente Evaluador** que da feedback con ideas cubiertas/omitidas + tip de estudio.
8. **`/schedule`** — Calendario semanal con tipos de sesión (nuevo/repaso/mixto).
9. **`/modules`** — 6 módulos en grid 2-col, con barra de progreso y badges de conceptos.
10. **`/notifications`** — 6 notificaciones con tipos diferenciados.
11. **`/lint`** — Score 87/100 + 3 issues (huérfano, contradicción, sin página).

## API Routes (backend simulado)

Todas las rutas devuelven JSON simulado basado en el seed data de `lib/data.ts`:

- `POST /api/ingest` — Registra la ingesta (sin persistencia, solo confirma con stats)
- `POST /api/chat` — Matchea la pregunta del usuario contra los 6 Q&A pairs por keywords
- `POST /api/srs` — Califica con FSRS (intervalos: olvido=1d, dificil=3d, bien=7d, excelente=21d)
- `GET /api/graph` — Devuelve el grafo o vecindario de un nodo
- `POST /api/mini-graph` — Layout calculado (radial) para el mini-grafo
- `GET /api/files` — Devuelve el contenido de un archivo MD o el listado
- `GET /api/lint` — Detecta nodos huérfanos + issues manuales

## Inspiración por proyecto

### De Rowboat
- **Next.js 15 + TS** como framework base
- **shadcn/ui** con style `new-york` y baseColor `neutral`
- **Tailwind CSS** con CSS variables
- **lucide-react** para iconografía
- Estructura monorepo-friendly (`apps/`)
- `components.json` para shadcn config
- Vercel-ready (`next build` produce output estático + serverless)

### De Kompl
- **Mini-grafo** en cada lectura (cuadrado SVG con nodo al centro + relacionados) — diferenciador clave
- **Layout editorial centrado** (`container-narrow` con max-width 1280px)
- **Vista "Kinetic Archive"** para archivos (header editorial + tabs)
- **Top nav minimalista** con links principales
- **Sidebar con Wiki context card** arriba (en lugar de duplicar navegación)
- Hover states con `cubic-bezier(0.4, 0, 0.2, 1)`

### De YachaqAI (funcionalidad)
- Wiki como vault de Markdown (single source of truth)
- Grafo de conocimiento con nodos/aristas
- SRS con propagación FSRS
- LLM Wiki con RAG simulado
- 3 fuentes, 6 módulos, 10 preguntas, 6 Q&A
