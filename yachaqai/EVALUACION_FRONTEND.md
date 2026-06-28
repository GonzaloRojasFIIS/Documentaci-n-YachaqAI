# YachaqAI -- Evaluacion del Frontend Actual vs. Especificaciones

> **Fecha de evaluacion:** 27 de junio de 2026
> **Documentos de referencia:**
> - `YachaqAI_MVP_Flujo_Pantallas.md` (v1.1)
> - `YachaqAI_Especificacion_Frontend_Unificada.md` (v1.0)
> **Archivos evaluados:** 22 paginas, 6 componentes, 6 archivos lib, 6 rutas API

---

## Indice

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Evaluacion de Rutas y Pantallas](#2-evaluacion-de-rutas-y-pantallas)
3. [Evaluacion del Sistema de Diseno](#3-evaluacion-del-sistema-de-diseno)
4. [Evaluacion de Funcionalidad Real vs. Simulada](#4-evaluacion-de-funcionalidad-real-vs-simulada)
5. [Diagnostico de Rendimiento](#5-diagnostico-de-rendimiento-por-que-el-sistema-es-lento)
6. [Codigo Muerto y Dependencias Innecesarias](#6-codigo-muerto-y-dependencias-innecesarias)
7. [Matriz de Cumplimiento por Pantalla](#7-matriz-de-cumplimiento-por-pantalla)
8. [Recomendaciones Priorizadas](#8-recomendaciones-priorizadas)

---

## 1. Resumen Ejecutivo

| Metrica | Valor |
|:---|:---|
| **Pantallas especificadas** | 29 |
| **Pantallas implementadas** | 15 (parcialmente) |
| **Pantallas faltantes** | 14 |
| **Cumplimiento del flujo de navegacion** | ~30% |
| **Cumplimiento del sistema de diseno** | ~20% |
| **Funcionalidad real (no simulada)** | ~35% |
| **Problemas criticos de rendimiento** | 8 |

**Conclusion general:** El frontend actual es un **prototipo funcional** que demuestra el concepto del producto, pero **no cumple** con las especificaciones de los documentos de flujo MVP ni de la especificacion unificada en los siguientes aspectos fundamentales:

1. **Estructura de rutas completamente diferente** a la especificada
2. **Tema visual claro (fondo blanco)** en lugar del dark mode `#0D1B2A` especificado
3. **No usa React Flow v12** -- usa `react-force-graph-2d` en su lugar
4. **No tiene Zustand** ni ningun state management global
5. **No tiene modulo de autenticacion** (M1 completo ausente)
6. **La mayoria de funcionalidades "inteligentes" estan simuladas** con datos hardcodeados
7. **3 librerias de grafos instaladas pero solo 1 en uso** -- peso muerto significativo
8. **Multiples problemas de rendimiento** por lectura excesiva de filesystem sin cache

---

## 2. Evaluacion de Rutas y Pantallas

### 2.1 Comparativa de Rutas: Especificado vs. Implementado

| Pantalla Especificada | Ruta Especificada | Ruta Implementada | Estado |
|:---|:---|:---|:---|
| **P1.1** Landing | `/` | `/` (pero es lista de notebooks, no landing) | **DIFERENTE** |
| **P1.2** Registro | `/auth/register` | No existe | **FALTANTE** |
| **P1.3** Login | `/auth/login` | No existe | **FALTANTE** |
| **P1.4** Recuperar contrasena | `/auth/reset-password` | No existe | **FALTANTE** |
| **P2.1** Onboarding Bienvenida | `/onboarding/1` | `/notebooks/[id]/onboarding` (wizard 3 pasos, no 6) | **PARCIAL** |
| **P2.2** Nombre del Mazo | `/onboarding/2` | Integrado en home page (crear notebook) | **DIFERENTE** |
| **P2.3** Objetivo de Estudio | `/onboarding/3` | No existe | **FALTANTE** |
| **P2.4** Subida del PDF | `/onboarding/4` | `/notebooks/[id]/sources/add` | **PARCIAL** |
| **P2.5** Disponibilidad NL | `/onboarding/5` | Integrado en `/notebooks/[id]/onboarding` paso 1 | **PARCIAL** |
| **P2.6** Confirmar Cronograma | `/onboarding/6` | Integrado en `/notebooks/[id]/onboarding` paso 2 | **PARCIAL** |
| **P3.1** Gestion Documentos | `/deck/[id]/documents` | No existe como tal | **FALTANTE** |
| **P3.2** Upload/Procesamiento | `/deck/[id]/documents/upload` | `/notebooks/[id]/sources/add` (basico) | **PARCIAL** |
| **P3.3** Panel Salud LINT | `/deck/[id]/health` | `/notebooks/[id]/lint` (simulado) | **PARCIAL** |
| **P4.1** Grafo Principal | `/deck/[id]/graph` | `/notebooks/[id]/graph` | **PARCIAL** |
| **P4.2** Tooltip de Nodo | Overlay en P4.1 | Tooltip basico en ForceGraph | **PARCIAL** |
| **P4.3** Vista Filtrada Modulo | Estado de P4.1 | Filtros en NotebookGraph | **PARCIAL** |
| **P5.0** Plan de Estudio Visual | `/deck/[id]/plan` | `/notebooks/[id]/modules` (lista, no Duolingo) | **DIFERENTE** |
| **P5.1** Preparacion Sesion | `/deck/[id]/session/[sid]/prep` | No existe | **FALTANTE** |
| **P5.2** Lectura Concepto | `/deck/[id]/session/[sid]/read` | `/notebooks/[id]/wiki/[...path]` (wiki viewer) | **PARCIAL** |
| **P5.3** Editor Markdown | `/deck/[id]/session/[sid]/edit` | `/notebooks/[id]/editor/[...path]` (textarea basico) | **PARCIAL** |
| **P5.4** Cuestionario | `/deck/[id]/session/[sid]/quiz` | `/notebooks/[id]/srs` (flashcards basicas) | **PARCIAL** |
| **P5.5** Resumen Post-Sesion | `/deck/[id]/session/[sid]/summary` | No existe | **FALTANTE** |
| **P5.6** Repaso SRS | `/deck/[id]/review` | Integrado en `/notebooks/[id]/srs` | **PARCIAL** |
| **P5.7** Ruta SI: Recursos | `/deck/[id]/session/[sid]/resources` | No existe | **FALTANTE** |
| **P5.8** Ruta NO: Refuerzo | `/deck/[id]/session/[sid]/reinforce` | No existe | **FALTANTE** |
| **P6.1** Dashboard | `/dashboard` | `/notebooks/[id]/dashboard` (por notebook) | **PARCIAL** |
| **P6.2** Estadisticas | `/dashboard/stats` | No existe | **FALTANTE** |
| **P6.3** LLM Wiki | `/deck/[id]/wiki` | `/notebooks/[id]/chat` (simulado) | **PARCIAL** |
| **P6.4** Configuracion | `/settings` | `/settings` (placeholder "Proximamente") | **PLACEHOLDER** |

### 2.2 Resumen de Cobertura de Rutas

| Categoria | Cantidad |
|:---|:---|
| Implementadas y alineadas | 0 |
| Parcialmente implementadas | 15 |
| Implementacion diferente a la especificacion | 3 |
| Completamente faltantes | 10 |
| Placeholder sin funcionalidad | 1 |

### 2.3 Pantallas Criticas Faltantes

Las siguientes pantallas son **bloqueantes** para el flujo MVP:

1. **Todo el Modulo 1 (Autenticacion):** No hay registro, login, ni OAuth con Google. Cualquier visitante accede directamente a la app.
2. **P5.1 Preparacion de Sesion:** No existe la pantalla de "warm-up" antes de estudiar.
3. **P5.5 Resumen Post-Sesion:** No hay feedback despues de completar un cuestionario. El flujo termina abruptamente.
4. **P5.7/P5.8 Bifurcacion Post-Evaluacion:** No existe la ruta condicional segun rendimiento (>=70% vs <70%).
5. **P6.2 Estadisticas:** No hay curva de retencion, heatmap de actividad, ni analisis de patrones.

### 2.4 Problemas Estructurales de Rutas

| Problema | Detalle |
|:---|:---|
| **Prefijo incorrecto** | Especificacion usa `/deck/[deckId]/...`, implementacion usa `/notebooks/[notebookId]/...` |
| **Sesiones sin ID** | Especificacion usa `/session/[sessionId]/...` para lectura/quiz/resumen. Implementacion no tiene concepto de "sesion" como entidad. |
| **Dashboard global vs. por notebook** | Especificacion: `/dashboard` (global). Implementacion: `/notebooks/[id]/dashboard` (por notebook). |
| **Onboarding sin pasos numerados** | Especificacion: `/onboarding/[step]` (1-6). Implementacion: pagina unica con tabs internos. |

---

## 3. Evaluacion del Sistema de Diseno

### 3.1 Paleta de Colores

| Elemento | Especificacion | Implementacion | Cumple |
|:---|:---|:---|:---|
| **Fondo principal** | `#0D1B2A` (Navy profundo, dark mode) | `hsl(0 0% 100%)` = `#FFFFFF` (blanco, light mode) | **NO** |
| **Cards/sidebar** | `#1A2E45` (Navy medio) | `hsl(210 40% 98%)` = `#f8fafc` (gris muy claro) | **NO** |
| **Color primario** | `#1E3A5F` (Navy primario) | `hsl(222 47% 11%)` = `#0f172a` (slate-900) | **PARCIAL** |
| **CTA principal** | `#00C6FB` (Cyan electrico) | No definido como token. Usa blue-600 Tailwind | **NO** |
| **Violeta YachaqAI** | `#534AB7` | No implementado | **NO** |
| **Verde semaforo** | `#4CAF50` / `#00E676` | `#22c55e` (emerald-500 Tailwind) | **SIMILAR** |
| **Amarillo semaforo** | `#FFC107` | `#f59e0b` (amber-500 Tailwind) | **SIMILAR** |
| **Rojo semaforo** | `#F44336` | `#ef4444` (red-500 Tailwind) | **SIMILAR** |
| **Gris bloqueado** | `#9E9E9E` | `#9ca3af` (gray-400 Tailwind) | **SIMILAR** |
| **Naranja racha** | `#FF6D00` | No implementado (no hay racha) | **NO** |
| **Dark mode** | Por defecto | No activado. `darkMode: ["class"]` pero sin toggle | **NO** |

**Veredicto:** El sistema de diseno implementado es un tema claro generico basado en shadcn/ui defaults, no el dark mode Navy especificado en los documentos.

### 3.2 Tipografia

| Elemento | Especificacion | Implementacion | Cumple |
|:---|:---|:---|:---|
| **Titulos** | Space Grotesk | Cargada via Google Fonts, variable `--font-space` | **SI** |
| **Cuerpo** | Inter | Cargada via Google Fonts, variable `--font-inter` | **SI** |
| **Codigo/Respuestas** | JetBrains Mono | Cargada via Google Fonts, variable `--font-jetbrains` | **SI** |
| **Tamaños H1** | 32-40px Bold | No aplicados sistematicamente | **PARCIAL** |
| **Tamaños cuerpo** | 15-16px, line-height 1.6 | Defaults de Tailwind (14px base) | **NO** |

### 3.3 Iconografia

| Aspecto | Especificacion | Implementacion | Cumple |
|:---|:---|:---|:---|
| **Libreria** | Lucide React | Instalada (`lucide-react` v0.465) | **SI** |
| **Uso consistente** | Tabla de 25+ iconos con colores asignados | Solo `Search` y `Settings` usados en `TopNav.tsx` (que es codigo muerto) | **NO** |
| **Stroke** | 2px | Default de Lucide | **SI** |
| **Tamano nav** | 20px | No aplicado | **NO** |

### 3.4 Animaciones y Transiciones

| Animacion Especificada | Implementada | Estado |
|:---|:---|:---|
| Fade + slide entre pantallas (250-350ms) | No | **FALTANTE** |
| Fade-in + translateY entrada elementos (200ms) | `fade-in` keyframe definido (220ms) pero raramente usado | **PARCIAL** |
| Degradacion gradual de nodos (CSS transition) | No | **FALTANTE** |
| Modo modulo: atenuar nodos irrelevantes (400ms) | No | **FALTANTE** |
| Glow effect en CTAs | No (solo en `AnimatedGraph.tsx` durante ingesta) | **PARCIAL** |
| `Loader2` con `animate-spin` | Plugin instalado, usado en algunos estados de carga | **PARCIAL** |
| Feedback < 300ms | No garantizado (muchas acciones esperan fetch) | **NO** |

### 3.5 Componentes UI (shadcn/ui)

| Componente | Especificado | Implementado | Notas |
|:---|:---|:---|:---|
| Button | Si | `components/ui/button.tsx` | Existe pero subutilizado |
| Card | Si | `components/ui/card.tsx` | Existe |
| Input | Si | `components/ui/input.tsx` | Existe |
| Label | Si | `components/ui/label.tsx` | Existe |
| Badge | Si | `components/ui/badge.tsx` | Existe |
| Switch | Si | `components/ui/switch.tsx` | Existe |
| Select | Si | No | **FALTANTE** |
| Dialog/Modal | Si | No | **FALTANTE** |
| Dropdown | Si | No | **FALTANTE** |
| Tabs | Si | No | **FALTANTE** |
| Progress | Si | No | **FALTANTE** |
| Tooltip | Si | No (tooltip custom inline en ForceGraph) | **FALTANTE** |
| Toast | Si | `components/Toast.tsx` (nunca importado) | **MUERTO** |

---

## 4. Evaluacion de Funcionalidad Real vs. Simulada

### 4.1 Funcionalidades Reales (operativas)

| Funcionalidad | Ubicacion | Detalles |
|:---|:---|:---|
| CRUD de notebooks | `app/page.tsx`, API routes | Crear, listar, eliminar notebooks en filesystem |
| Visualizacion de grafo | `ForceGraph.tsx`, `NotebookGraph.tsx` | Grafo interactivo con colores segun estado SRS |
| Lectura de wiki pages | `wiki/[...path]/page.tsx` | Renderizado Markdown con frontmatter, sidebar de navegacion |
| Edicion de paginas | `editor/[...path]/page.tsx` | Textarea basico, guarda en filesystem |
| Calificacion SRS | `srs/page.tsx`, API `/srs` | Actualiza frontmatter con nuevo estado, maestria, proximo repaso |
| Seed de contenido | `seed-networking.ts` | Genera 50+ archivos MD con estructura completa |
| Filtrado de grafo | `NotebookGraph.tsx` | Filtro por modulo y estado SRS |

### 4.2 Funcionalidades Simuladas (hardcodeadas)

| Funcionalidad | Ubicacion | Que deberia hacer | Que hace realmente |
|:---|:---|:---|:---|
| **Chat RAG / LLM Wiki** | `chat/page.tsx` | Consulta Graph-Traversal RAG con LLM | Cadena de `if/else` que matchea keywords y devuelve texto hardcodeado |
| **Evaluacion IA de respuestas** | `srs/page.tsx` | Enviar respuesta al Agente Evaluador, recibir feedback semantico | Matching de substrings (`ans.includes("syn")`) con reporte prefabricado |
| **Generacion de cronograma** | `onboarding/page.tsx`, `schedule/page.tsx` | Parsear disponibilidad NL con LLM y generar slots | `setTimeout` de 2s que retorna plan hardcodeado por `notebookId` |
| **Ingesta de PDF/URL** | `ingest/route.ts` | Procesar archivo con LlamaParse, extraer conceptos con Gemini | Ignora el archivo subido, ejecuta `seedRedesNotebook()` siempre |
| **Lint / Salud del mazo** | `lint/page.tsx` | Ejecutar agente LINT para detectar problemas reales | Issues y score hardcodeados. "Fix all" pone todo en 100% con timeout |
| **Animacion de ingesta** | `ingest/progress/page.tsx` | Mostrar progreso real del pipeline | Anima nodos predefinidos del seed, no refleja procesamiento real |

### 4.3 Impacto de las Simulaciones

**Riesgo principal:** Un usuario o stakeholder que pruebe el sistema pensara que las funcionalidades de IA estan implementadas, cuando en realidad:
- El chat solo responde a 2 temas (Redes y Agentes IA) con respuestas fijas
- La evaluacion de respuestas no usa ningun modelo de lenguaje
- Cualquier archivo subido genera el mismo notebook de "Redes de Computadores"
- El lint nunca analiza el contenido real del mazo

---

## 5. Diagnostico de Rendimiento: Por que el sistema es lento

### 5.1 Problemas Criticos (Alto Impacto)

#### Problema 1: Lectura completa del filesystem en cada request

**Ubicacion:** `lib/fs-wiki.ts` -- funciones `getAllPages()`, `buildGraph()`, `getNotebookStats()`

**Causa:** Cada llamada API lee **todos** los archivos Markdown del notebook desde disco. No hay cache en memoria, ni cache en disco, ni ETags, ni invalidacion incremental.

**Impacto:** Para un notebook con 50 paginas:
- `GET /api/notebooks/:id` llama a `getAllPages()` -> 50 lecturas de archivo + 50 parseos YAML + 50 conversiones Markdown a HTML
- `GET /api/notebooks/:id/graph` llama a `buildGraph()` que internamente llama a `getAllPages()` de nuevo -> otras 50 lecturas
- Ambos endpoints se llaman frecuentemente desde multiples paginas

**Severidad:** **CRITICA** -- Es la causa principal de lentitud percibida.

#### Problema 2: 3 librerias de grafos en el bundle (solo 1 usada)

**Ubicacion:** `package.json`

**Librerias instaladas pero nunca importadas:**

| Libreria | Tamano estimado (minificado) | Usada |
|:---|:---|:---|
| `cytoscape` | ~800 KB | **NO** |
| `sigma` | ~200 KB | **NO** |
| `@react-sigma/core` | ~50 KB | **NO** |
| `graphology` | ~100 KB | **NO** |
| `graphology-layout-forceatlas2` | ~50 KB | **NO** |
| `graphology-types` | ~5 KB | **NO** |
| **Total peso muerto** | **~1.2 MB** | - |

**Impacto:** Aunque Next.js hace tree-shaking, estas dependencias:
- Aumentan el tiempo de `npm install` y el tamano de `node_modules`
- Pueden interferir con la resolucion de modulos
- `react-force-graph-2d` ya trae `d3-force` (~300 KB) como dependencia transitiva

**Severidad:** **ALTA** -- Afecta tiempos de build e instalacion.

#### Problema 3: Patron N+1 en la pagina principal

**Ubicacion:** `app/page.tsx` -- componente `NotebookCard`

**Causa:** La pagina principal hace:
1. `GET /api/notebooks` para listar todos los notebooks
2. Para **cada** notebook, un `useEffect` individual hace `GET /api/notebooks/:id` para obtener estadisticas

Con 5 notebooks = 6 requests HTTP secuenciales. Cada uno lee todo el filesystem.

**Severidad:** **ALTA** -- La pagina de inicio es la mas lenta de toda la app.

#### Problema 4: API devuelve datos excesivos

**Ubicacion:** `app/api/notebooks/[notebookId]/route.ts`

**Causa:** `GET /api/notebooks/:id` devuelve el campo `pages` que contiene **todas** las paginas con sus campos `content` (Markdown crudo) y `html` (HTML renderizado). Para 50 paginas, el JSON de respuesta puede superar 1-2 MB.

**Severidad:** **ALTA** -- Transferencia de datos innecesaria. Muchos consumidores solo necesitan metadata/frontmatter.

### 5.2 Problemas Moderados (Medio Impacto)

#### Problema 5: ForceGraph renderizado aunque este oculto

**Ubicacion:** `app/notebooks/[notebookId]/wiki/[...path]/page.tsx`

**Causa:** El mini-grafo flotante en la esquina inferior derecha siempre esta montado en el DOM. Aunque visualmente oculto (opacity/visibility), el canvas de d3-force sigue ejecutando la simulacion de fisica (ticks de fuerza).

**Severidad:** **MEDIA** -- Consume CPU innecesariamente en cada pagina del wiki.

#### Problema 6: Sin state management global

**Ubicacion:** Toda la aplicacion

**Causa:** No hay Zustand, Context, ni Redux. Cada pagina re-fetcha datos desde cero al montarse. Navegar de Dashboard -> Grafo -> Wiki genera 3 llamadas independientes al mismo endpoint `/api/notebooks/:id`.

**Severidad:** **MEDIA** -- Datos ya obtenidos se descartan y re-solicitan.

#### Problema 7: `buildGraph()` y `getNotebookStats()` duplican lecturas

**Ubicacion:** `lib/fs-wiki.ts`

**Causa:** Ambas funciones llaman internamente a `getAllPages()`. Si un endpoint necesita ambos resultados, lee el filesystem **2 veces**.

**Severidad:** **MEDIA** -- Duplicacion de I/O.

### 5.3 Problemas Menores (Bajo Impacto)

#### Problema 8: `ignoreBuildErrors` y `ignoreDuringBuilds`

**Ubicacion:** `next.config.mjs`

```javascript
typescript: { ignoreBuildErrors: true },
eslint: { ignoreDuringBuilds: true },
```

**Impacto:** No causa lentitud directamente, pero oculta errores de TypeScript y ESLint que podrian revelar:
- Imports innecesarios
- Componentes que se re-renderizan sin motivo
- Variables no utilizadas que retienen memoria
- Tipos `any` que impiden optimizaciones del compilador

**Severidad:** **BAJA** -- Deuda tecnica que dificulta la deteccion de problemas.

### 5.4 Resumen de Impacto en Rendimiento

```
Tiempo tipico de carga de una pagina (estimado):
  
  Lectura filesystem (50 archivos .md)    ~400-800ms
  Parseo YAML + Markdown->HTML            ~200-400ms
  Serializacion JSON                      ~50-100ms
  Transferencia red (1-2 MB JSON)         ~100-300ms
  Parsing JSON en cliente                 ~50-100ms
  Render React + d3-force simulation      ~300-500ms
  ─────────────────────────────────────────
  Total estimado por pagina               ~1.1 - 2.2 segundos
  
  Si hay N+1 fetches (home page):         ~3 - 6 segundos
```

---

## 6. Codigo Muerto y Dependencias Innecesarias

### 6.1 Archivos Muertos

| Archivo | Motivo |
|:---|:---|
| `lib/data.ts` (~400 lineas) | Datos hardcodeados de version anterior. Ningun import en el proyecto actual. |
| `components/TopNav.tsx` (~180 lineas) | Nunca importado en ningun layout ni pagina. Referencia CSS variables indefinidas y API endpoint `/api/pages/search` inexistente. |
| `components/Toast.tsx` (~60 lineas) | Hook `useToast()` exportado pero nunca importado. |

### 6.2 Funciones/Exports Muertos

| Export | Archivo | Motivo |
|:---|:---|:---|
| `colorForEstado()` | `lib/types.ts` | Nunca importada. Logica duplicada inline en `ForceGraph.tsx`. |
| `PAGE_TYPE_VAR` | `lib/page-type-palette.ts` | CSS variables referenciadas nunca definidas en `globals.css`. |
| `PAGE_TYPE_LABEL` | `lib/page-type-palette.ts` | Nunca importado. |
| `cn()` | `lib/utils.ts` | Funcion utilidad clasica de shadcn/ui, pero nunca llamada en el proyecto. |

### 6.3 Dependencias npm No Utilizadas

| Paquete | Tamano estimado | Motivo |
|:---|:---|:---|
| `cytoscape` | ~800 KB | Nunca importado en codigo fuente |
| `@types/cytoscape` | ~50 KB | Tipos para libreria no usada |
| `sigma` | ~200 KB | Nunca importado |
| `@react-sigma/core` | ~50 KB | Nunca importado |
| `graphology` | ~100 KB | Nunca importado |
| `graphology-layout-forceatlas2` | ~50 KB | Nunca importado |
| `graphology-types` | ~5 KB | Nunca importado |
| `@radix-ui/react-slot` | ~10 KB | Solo usado internamente por `button.tsx`, pero los botones raramente usan `asChild` |
| `class-variance-authority` | ~5 KB | Solo usado en `button.tsx` |

### 6.4 Typos Detectados

| Ubicacion | Error | Correccion |
|:---|:---|:---|
| `app/settings/page.tsx` linea 13 | "YachaAI" | "YachaqAI" |
| `components/TopNav.tsx` linea 148 | "YachaAI" | "YachaqAI" |

---

## 7. Matriz de Cumplimiento por Pantalla

### Modulo 1 -- Autenticacion

| Pantalla | Elementos Especificados | Implementados | % |
|:---|:---|:---|:---|
| **P1.1 Landing** | Hero, CTA "Empezar Gratis", seccion valor, demo GIF, footer | Lista de notebooks con formulario "crear notebook" | **10%** |
| **P1.2 Registro** | 6 campos, indicador fortaleza, OAuth Google, validacion real-time | No existe | **0%** |
| **P1.3 Login** | Email, password, "Recordarme", OAuth, error banner | No existe | **0%** |
| **P1.4 Recuperar Contrasena** | 2 pasos (email -> nueva password) | No existe | **0%** |

### Modulo 2 -- Onboarding

| Pantalla | Elementos Especificados | Implementados | % |
|:---|:---|:---|:---|
| **P2.1 Bienvenida** | Barra progreso 1/6, bullets beneficios, boton empezar | Integrado en onboarding (sin barra 1/6) | **20%** |
| **P2.2 Nombre Mazo** | Campo nombre, descripcion, chips sugerencia, max 60 chars | En home page (campo basico sin validaciones) | **15%** |
| **P2.3 Objetivo** | 4 tarjetas objetivo, date picker examen, nivel principiante/intermedio/avanzado | No existe | **0%** |
| **P2.4 Subida PDF** | Drop zone, barra progreso upload, mensajes rotantes procesamiento | Drop zone basica, redirige a animacion de ingesta | **30%** |
| **P2.5 Disponibilidad NL** | Textarea con ejemplos, procesamiento LLM, pregunta aclaracion | Textarea con ejemplos (respuesta simulada) | **40%** |
| **P2.6 Confirmar Cronograma** | Calendario semanal editable 7 columnas, slots arrastrables | Vista de cronograma generado (no editable inline) | **25%** |

### Modulo 3 -- Ingesta

| Pantalla | Elementos Especificados | Implementados | % |
|:---|:---|:---|:---|
| **P3.1 Gestion Documentos** | Lista cards por documento, estados, estadisticas, log actividad | No existe como pantalla dedicada | **0%** |
| **P3.2 Upload/Procesamiento** | Drop zone PDF, campo URL, opciones OCR, barra progreso 7 etapas, deteccion contradicciones | Drop zone basica. Sin campo URL, sin OCR, sin progreso real, sin contradicciones | **15%** |
| **P3.3 Panel LINT** | Score radial, nodos huerfanos, contradicciones, refs rotas, modulos sin quiz | Score SVG + issues hardcodeados. "Fix all" simulado | **20%** |

### Modulo 4 -- Grafo

| Pantalla | Elementos Especificados | Implementados | % |
|:---|:---|:---|:---|
| **P4.1 Grafo Principal** | React Flow v12, canvas 80%, sidebar modulos, barra filtros, barra estadisticas, 2 modos (exploracion + modulo lineal) | `react-force-graph-2d`, sidebar filtros basicos, sin barra estadisticas inferior, sin modo modulo con badges numericos | **40%** |
| **P4.2 Tooltip Nodo** | Titulo, modulo, maestria %, proximo repaso, preguntas, prerrequisitos, botones "Leer"/"Repasar" | Tooltip flotante con label, tipo, maestria, estado. Sin botones accion | **35%** |
| **P4.3 Vista Filtrada Modulo** | Nodos atenuados, banner progreso, boton iniciar sesion, mensaje bloqueado | Filtro de checkbox que oculta nodos (no atenua). Sin banners ni botones de sesion | **25%** |

### Modulo 5 -- Sesion de Estudio

| Pantalla | Elementos Especificados | Implementados | % |
|:---|:---|:---|:---|
| **P5.0 Plan Visual (Duolingo)** | Ruta vertical, nodos modulo con 6 estados visuales, expandir chips, personalizar con prompt, plan completado | Lista grid de cards con barras de maestria. Sin ruta visual, sin expansion, sin prompt NL | **15%** |
| **P5.1 Preparacion Sesion** | Card tipo/modulo/conceptos/duracion, banner repasos pendientes, opciones repaso | No existe | **0%** |
| **P5.2 Lectura Concepto** | Breadcrumb, sidebar conceptos, markdown renderizado, links [[]], "Mis Notas", barra tiempo lectura | Wiki viewer con sidebar folders, markdown renderizado, links funcionan. Sin "Mis Notas", sin barra tiempo | **50%** |
| **P5.3 Editor Markdown** | CodeMirror 6, split view, toolbar, autocompletado [[, YAML protegido | Textarea plano, sin preview, sin toolbar, sin autocompletado | **10%** |
| **P5.4 Cuestionario** | 4 tipos pregunta (completar, relacionar, diagrama, desarrollo), evaluacion IA, 4 calificaciones FSRS, soberania usuario | 1 tipo (texto libre), evaluacion simulada por keywords, 4 botones FSRS, usuario califica | **30%** |
| **P5.5 Resumen Post-Sesion** | Confetti/particulas, metricas, mini-grafo animado, bifurcacion 70%, proximos repasos | No existe | **0%** |
| **P5.6 Repaso SRS** | Entrada con conteo, flashcards, badge "Repaso SRS", propagacion incertidumbre, grafico antes/despues | Integrado en `/srs` sin distincion de modo repaso vs. nuevo | **20%** |
| **P5.7 Ruta SI: Recursos** | Grid recursos externos, filtros, botones navegacion | No existe | **0%** |
| **P5.8 Ruta NO: Refuerzo** | Lista nodos deficientes con feedback IA, sesion programada con selector hora | No existe | **0%** |

### Modulo 6 -- Dashboard y Wiki

| Pantalla | Elementos Especificados | Implementados | % |
|:---|:---|:---|:---|
| **P6.1 Dashboard** | Sidebar colapsable (8 items), barra superior con racha/notificaciones, sesion de hoy, metricas 360, carga repaso heatmap, accesos rapidos | Sidebar colapsable (8 items), stat cards basicas, barra maestria, links rapidos. Sin racha, sin sesion de hoy, sin heatmap, sin notificaciones | **35%** |
| **P6.2 Estadisticas** | Curva retencion vs Ebbinghaus, tabla conceptos, heatmap GitHub, patrones, eficacia cronograma | No existe | **0%** |
| **P6.3 LLM Wiki** | Chat con Graph-RAG, citas ancladas, indicador nodos consultados, archivar respuesta, sugerencias contextuales | Chat simulado con respuestas hardcodeadas, mini-grafo lateral, "pasos RAG" falsos | **15%** |
| **P6.4 Configuracion** | Mi cuenta, notificaciones (6 tipos + canales), mi mazo (umbrales SRS, exportar ZIP), privacidad, eliminar cuenta | Pagina placeholder "Proximamente" | **0%** |

### Promedio General de Cumplimiento

| Modulo | Promedio |
|:---|:---|
| M1 - Autenticacion | **2.5%** |
| M2 - Onboarding | **22%** |
| M3 - Ingesta | **12%** |
| M4 - Grafo | **33%** |
| M5 - Sesion Estudio | **14%** |
| M6 - Dashboard & Wiki | **12.5%** |
| **PROMEDIO GLOBAL** | **~16%** |

---

## 8. Recomendaciones Priorizadas

### Prioridad 1 -- Rendimiento (resolver lentitud inmediata)

| # | Accion | Impacto Esperado |
|:---|:---|:---|
| R1 | **Implementar cache en memoria para `getAllPages()`** con invalidacion por timestamp de archivo. Evitar releer todo el filesystem en cada request. | Reduccion de ~60-70% en tiempo de respuesta API |
| R2 | **Eliminar dependencias npm no usadas** (`cytoscape`, `sigma`, `graphology`, `graphology-layout-forceatlas2`, `@react-sigma/core`, `graphology-types`, `@types/cytoscape`). Ejecutar `npm uninstall` de cada una. | Reduccion de ~1.2 MB en `node_modules`, builds mas rapidos |
| R3 | **Crear endpoint ligero `GET /api/notebooks/:id/stats`** que solo devuelva metadata y conteos, sin enviar todas las paginas con HTML. | Reduccion de ~80% en tamano de respuesta JSON |
| R4 | **Batch fetch en pagina principal:** Reemplazar N+1 fetches individuales por un solo `GET /api/notebooks?include=stats`. | De N+1 requests a 1 request |
| R5 | **Lazy mount del ForceGraph** en wiki: solo montar el componente cuando el usuario haga click en "Ver grafo", no al cargar la pagina. | Eliminar simulacion d3 innecesaria en background |

### Prioridad 2 -- Alineacion con especificaciones (funcionalidad core)

| # | Accion | Pantallas Afectadas |
|:---|:---|:---|
| R6 | **Implementar Modulo 1 (Auth)** con NextAuth.js o similar: registro email, login, OAuth Google, JWT | P1.1, P1.2, P1.3, P1.4 |
| R7 | **Migrar rutas** de `/notebooks/[notebookId]/...` a `/deck/[deckId]/...` para alinear con especificacion | Todas |
| R8 | **Implementar dark mode** con paleta `#0D1B2A` / `#1A2E45` como default | Toda la app |
| R9 | **Implementar P5.5 (Resumen Post-Sesion)** con bifurcacion >= 70% / < 70% | P5.5, P5.7, P5.8 |
| R10 | **Reemplazar `react-force-graph-2d` por React Flow v12** o justificar la decision de mantener la libreria actual | P4.1, P4.2, P4.3 |
| R11 | **Agregar Zustand** para estado global (usuario, sesion activa, grafo cacheado, notebook actual) | Toda la app |

### Prioridad 3 -- Calidad y mantenibilidad

| # | Accion |
|:---|:---|
| R12 | **Eliminar codigo muerto:** `lib/data.ts`, `components/TopNav.tsx`, `components/Toast.tsx`, exports sin usar en `types.ts` y `page-type-palette.ts` |
| R13 | **Remover `ignoreBuildErrors` y `ignoreDuringBuilds`** de `next.config.mjs` y corregir errores de TypeScript |
| R14 | **Reemplazar `dangerouslySetInnerHTML`** en chat y wiki por sanitizacion con `DOMPurify` |
| R15 | **Corregir typos** "YachaAI" -> "YachaqAI" en `settings/page.tsx` y `TopNav.tsx` |
| R16 | **Conectar funcionalidades simuladas** a backends reales (LLM para chat, evaluacion, schedule NLP) o documentar claramente que son demos |

---

> **Nota:** Este documento refleja el estado del frontend al 27 de junio de 2026. El proyecto se encuentra en fase de prototipo funcional con un ~16% de cumplimiento respecto a las especificaciones del MVP. Los problemas de rendimiento son resolubles con las optimizaciones de Prioridad 1, que no requieren cambios arquitectonicos mayores.