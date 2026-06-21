# Índice del Diseño Integrado del MSV de Synapta (v2) — con gráficos clave por sistema

> **Propósito.** Este índice ordena el informe final a partir del **borrador v2 integrado** (`11_borrador_v2_diseno_integrado_msv_synapta.md`), que sintetiza el diseño previo (S1–S5) más el **diagnóstico de viabilidad** e incorpora **cinco fuentes nuevas (F1–F5)** con sus correcciones 🔧. Para cada parte se indica **qué desarrollar** y **el/los gráfico(s) más importante(s) a realizar**, anclados a la figura exacta del libro de Pérez Ríos (2012). El recorrido empieza en **viabilidad** y **culmina en el diagrama MSV total**.
>
> **Convención de gráficos:** cada artefacto visual lleva un código `[Gx]` único. La columna de anclaje cita la figura original (p. ej. *Fig. 2.19 de Pérez Ríos, 2012*). Los gráficos marcados con 🆕 provienen de las fuentes nuevas; los marcados con 🔧 materializan una corrección del v2.

---

## Tabla de Contenidos

- [0. Marco y mapa de las 5 fuentes nuevas](#0-marco-y-mapa-de-las-5-fuentes-nuevas)
- [1. Diagnóstico de Viabilidad (punto de partida)](#1-diagnóstico-de-viabilidad-punto-de-partida)
- [2. Sistema 1 — Operaciones](#2-sistema-1--operaciones)
- [3. Sistema 2 — Coordinación](#3-sistema-2--coordinación)
- [4. Sistema 3 y S3* — Gestión y Auditoría](#4-sistema-3-y-s3--gestión-y-auditoría)
- [5. Sistema 4 — Inteligencia](#5-sistema-4--inteligencia)
- [6. Sistema 5 — Política e Identidad](#6-sistema-5--política-e-identidad)
- [7. Diagramas de Interacción y Comunicación (los 8 componentes)](#7-diagramas-de-interacción-y-comunicación-los-8-componentes)
- [8. Cierre — Diagrama MSV Total de Synapta](#8-cierre--diagrama-msv-total-de-synapta)
- [Anexo — Tabla maestra de gráficos](#anexo--tabla-maestra-de-gráficos)

---

## 0. Marco y mapa de las 5 fuentes nuevas

**Qué desarrollar.** Encuadre del informe: regla POSIWID, método de 4 etapas de Pérez Ríos (2012), Ley de Ashby, y declaración de cómo cada fuente nueva (F1 TOP de patologías IA; F2 Kellogg agente-MSV; F3 Modelo Viable y Ágil; F4 IA como fuerza laboral digital/PID; F5 VSMod en proyectos software) corrige el diseño previo.

- **[G0.1] Diagrama de flujo del método de 4 etapas → diseño S1–S5.** — *Fig. 2.4 de Pérez Ríos (2012)* (dimensión vertical y horizontal).
- **[G0.2] Mapa de aplicación de las 5 fuentes nuevas sobre los sistemas.** 🆕 Matriz visual Fuente (F1–F5) × Sistema impactado (S1–S5/Diagnóstico), reflejando la tabla del v2.

---

## 1. Diagnóstico de Viabilidad (punto de partida)

**Qué desarrollar.** Sistema de interés y propósito verificable (YachaqAI/FSRS), entorno de alta variedad (EdTech LATAM, 105 universidades), evaluación de los cinco requisitos del MSV, las **tres brechas rojas** (S3* auditor=operador, S4 sin sensores, canal algedónico sin umbral) y las **cinco brechas de variedad**. Cierre con la condición mínima de paso Fase 1 → Fase 2.

**Gráficos clave:**
- **[G1.1] Diagrama Sistema–Entorno de Synapta (Nivel 0).** — *Fig. 2.1 de Pérez Ríos (2012)* (la organización en su entorno).
- **[G1.2] MSV con semáforo diagnóstico por sistema (🟢/🟡/🔴) + canal algedónico escalonado S3→S4→S5.** — *Fig. 2.19 de Pérez Ríos (2012)*. **Gráfico central del diagnóstico.**
- **[G1.3] Balanza de variedad Entorno ⇄ Synapta con las 5 brechas críticas.** — *Fig. 1.6 de Pérez Ríos (2012)* (variedad residual).
- **[G1.4] Rejilla TOP: mapeo de las 3 brechas rojas a patologías de la Taxonomía IA.** 🆕🔧 Tabla-mapa que ubica *S4 débil → PII5 «pollo sin cabeza»*, *canal algedónico ausente → PIII4 de comunicación* y *S3\* con conflicto → patología funcional de auditoría* (Pérez Ríos, 2025, F1).
- **[G1.5] Diagrama de trazabilidad Brecha → Prioridad de cierre (P1–P3) → Indicador de viabilidad mínima.**

---

## 2. Sistema 1 — Operaciones

**Qué desarrollar.** Las cuatro unidades autónomas (S1.1 Ingeniería, S1.2 Growth/B2C, S1.3 Ventas B2B, S1.4 Soporte/Infra), sus tres elementos básicos, su recursividad de Nivel 1, el control intrínseco con autonomía acotada, y las tres correcciones v2: IA como fuerza laboral digital (C2.1), artefactos ágiles como reguladores de variedad (C2.2) y retroalimentación algedónica de agentes (C2.3).

**Gráficos clave:**
- **[G2.1] Despliegue vertical: Metasistema → 4 unidades del S1.** — *Fig. 2.5 de Pérez Ríos (2012)* (despliegue vertical de la complejidad).
- **[G2.2] Unidad operativa elemental (Entorno ↔ Operación ↔ Gestión local).** — *Fig. 2.43 de Pérez Ríos (2012)*; dimensión horizontal en *Fig. 2.18*.
- **[G2.3] Ciclo de IA "Percepción → LLM → Acción → Memoria" dentro del pipeline de YachaqAI.** 🆕🔧 Diagrama del núcleo operativo como fuerza laboral digital (Zavrazhnyi & Kulyk, 2025, F4) — corrección C2.1.
- **[G2.4] Relaciones entre operaciones elementales del S1 (Canal C2).** — *Fig. 2.47 de Pérez Ríos (2012)*.
- **[G2.5] Artefactos ágiles (backlog/tableros) como amplificadores y atenuadores de variedad S3↔S1.** 🆕🔧 (Ceballos Chávez et al., 2025, F3) — corrección C2.2.
- **[G2.6] Lazo de retroalimentación algedónica de agente ("dopamina sintética").** 🆕🔧 (Kellogg, 2026, F2) — corrección C2.3.

---

## 3. Sistema 2 — Coordinación

**Qué desarrollar.** El S2 como regulador anti-oscilatorio horizontal (Release Calendar, silencio aprobatorio 48h, matriz P0–P3, deploy con preaviso 24h), co-diseñado para no ser autoritario, y las correcciones v2: prevención del "régimen supercrítico" de comunicación (C3.1) y automatización de amortiguadores (C3.2).

**Gráficos clave:**
- **[G3.1] Diagrama del Sistema 2 (corporativo + S2 locales) coordinando las 4 unidades.** — *Fig. 2.40 de Pérez Ríos (2012)*.
- **[G3.2] Canal de coordinación anti-oscilatorio (C5).** — *Fig. 2.41 de Pérez Ríos (2012)* (coordinating channel).
- **[G3.3] Red de conectividad: "régimen supercrítico" vs. red coordinada (dailies + visibilidad cruzada).** 🆕🔧 Diagrama de red que contrasta exceso de intermediarios/cuellos de botella vs. red equilibrada (Ceballos Chávez et al., 2025, F3) — corrección C3.1.
- **[G3.4] Absorción de variedad: "Sin S2" (colapso del CEO ~10⁴ estados) vs. "Con S2" (≤5 alertas).** — *Fig. 1.6 de Pérez Ríos (2012)* + Ley de Ashby.

---

## 4. Sistema 3 y S3* — Gestión y Auditoría

**Qué desarrollar.** Gobierno del "aquí y ahora" por metas pactadas (Canal 4) y rendición de cuentas por excepción (semáforos), el S3* con rotación cruzada (Canal 6), y las correcciones v2: resolución de la brecha roja del S3* (C4.1), control por semáforos modelado como controlador PID (C4.2) y variedad S3↔S1 con artefactos ágiles (C4.3).

**Gráficos clave:**
- **[G4.1] Diagrama del Sistema 3 en el metasistema.** — *Fig. 2.30 de Pérez Ríos (2012)*.
- **[G4.2] Canal 4 — negociación de recursos (SAS mensual).** — *Fig. 2.32 de Pérez Ríos (2012)*.
- **[G4.3] Rendición de cuentas con lógica de semáforos 🟢🟡🔴.** — *Fig. 2.33 de Pérez Ríos (2012)* (accountability).
- **[G4.4] Control por semáforos como controlador PID (Proporcional-Integral-Derivativo).** 🆕🔧 Diagrama de bloques: desviación del KPI → P (magnitud) + I (persistencia) + D (velocidad) → señal de control del S3, previniendo la hipertrofia (Zavrazhnyi & Kulyk, 2025, F4) — corrección C4.2.
- **[G4.5] Sistema 3* y canal de auditoría por rotación cruzada (auditor ≠ operador).** — *Fig. 2.38 y Fig. 2.39 de Pérez Ríos (2012)*; a nivel de unidad *Fig. 2.51*. 🔧 corrección C4.1.

---

## 5. Sistema 4 — Inteligencia

**Qué desarrollar.** El órgano de adaptación al "afuera y el mañana": radares (tecnológico, regulatorio, mercado), Sala de Operaciones de 5 pantallas, modelos de simulación M2/M5, y las correcciones v2: cierre de la brecha roja con respaldo TOP/«pollo sin cabeza» (C5.1), fundamento de los simuladores en Dinámica de Sistemas/VSMod (C5.2) e índices cuantitativos de adaptabilidad (C5.3).

**Gráficos clave:**
- **[G5.1] Diagrama del Sistema 4 y su acoplamiento al entorno.** — *Fig. 2.25 de Pérez Ríos (2012)*.
- **[G5.2] Los dos lazos homeostáticos del S4 (entorno presente / entorno futuro).** — *Fig. 2.26 y Fig. 2.27 de Pérez Ríos (2012)*.
- **[G5.3] Sala de Operaciones de 5 pantallas (presente, pasado, futuro, modelo cibernético, vigilancia).** — *Fig. 2.23 de Pérez Ríos (2012)* (elements of an Operations Room). **Gráfico central del S4** y prueba de cierre de la brecha roja (PII5).
- **[G5.4] Modelos M2/M5 de Dinámica de Sistemas mapeados a VSMod.** 🆕🔧 Diagrama de los simuladores (M2 pérdida de piloto, M5 mercado/SUNEDU) con la Pantalla 4 en VSMod (Puche Regaliza et al., 2006, F5) — corrección C5.2.
- **[G5.5] Homeostato S4–S3 (secuencia de negociación presente↔futuro).** — *Fig. 2.28 de Pérez Ríos (2012)*.
- **[G5.6] Tablero de índices cuantitativos de adaptabilidad/sostenibilidad del S4.** 🆕🔧 (Zavrazhnyi & Kulyk, 2025, F4) — corrección C5.3.

---

## 6. Sistema 5 — Política e Identidad

**Qué desarrollar.** La Junta de Fundadores como gestión normativa (POSIWID, límites, cuatro principios), su rol de absorbedor final de variedad y árbitro del homeostato S3–S4, y las correcciones v2: identidad/valores como condición de autonomía de la IA (C6.1), canal algedónico robusto para riesgos éticos de IA (C6.2) y gobernanza de stakeholders/filosofía del producto (C6.3).

**Gráficos clave:**
- **[G6.1] Diagrama del Sistema 5 como cierre del metasistema.** — *Fig. 2.21 de Pérez Ríos (2012)*.
- **[G6.2] El S5 arbitrando el homeostato S3–S4.** — *Fig. 2.22 de Pérez Ríos (2012)*. **Gráfico central del S5.**
- **[G6.3] Cadena de transmisión de identidad (Top-Down / Bottom-Up) hacia los S5 locales.** — *Fig. 2.24 de Pérez Ríos (2012)*.
- **[G6.4] Identidad y valores como condición de autonomía del agente de IA.** 🆕🔧 Diagrama que conecta el sistema de valores del S5 con la estabilidad conductual del agente (Kellogg, 2026, F2) — corrección C6.1.
- **[G6.5] Canal algedónico ético-IA (sesgo/alucinación/impacto) hacia el S5.** 🆕🔧 — *Fig. 2.53 de Pérez Ríos (2012)* enriquecida con la patología PIII4 (Pérez Ríos, 2025) — corrección C6.2.
- **[G6.6] Mapa de stakeholders en el S5 (desarrolladores, docentes, estudiantes, inversores, regulador).** 🆕🔧 (Puche Regaliza et al., 2006, F5) — corrección C6.3.

---

## 7. Diagramas de Interacción y Comunicación (los 8 componentes)

**Qué desarrollar.** El patrón canónico de canal de comunicación como bucle homeostático cerrado con sus 8 componentes y su capacidad/ancho de banda, instanciado en los canales reales de Synapta. Este patrón es la leyenda común de todos los canales del modelo.

**Gráficos clave:**
- **[G7.1] Canal genérico — los 8 componentes (emisor, T1–T4, canales de ida y vuelta, receptor).** — *Fig. 2.3 de Pérez Ríos (2012)* (components of a communication channel). **Plantilla base.**
- **[G7.2] Instanciación: Canal de despliegue S1.1 ↔ S1.4 (deploy → verificación).** — según *Fig. 2.3*.
- **[G7.3] Instanciación: Canal C1 entre sub-entornos B2C ↔ B2B (recomendación "pull").** — según *Fig. 2.3*.
- **[G7.4] Dimensión horizontal Entorno-Operación-Gestión con artefactos ágiles como amplificador de gestión.** — *Fig. 2.18 de Pérez Ríos (2012)* 🔧 (integra C2.2/C4.3).
- **[G7.5] Canal algedónico escalonado S1 → S3 → S4 → S5 (técnico + ético-IA).** — *Fig. 2.53 de Pérez Ríos (2012)*.

---

## 8. Cierre — Diagrama MSV Total de Synapta

**Qué desarrollar.** La vista integradora final: el Modelo de Sistema Viable completo de Synapta con los seis sistemas (S1, S2, S3, S3*, S4, S5), el entorno presente y futuro, los seis canales de control (C1–C6) y el canal algedónico, mostrando que todas las correcciones v2 quedan ubicadas sobre una sola arquitectura coherente. Es el gráfico que sintetiza todo el informe y la lámina final de la presentación.

**Gráfico culminante:**
- **[G8.1] DIAGRAMA MSV TOTAL DE SYNAPTA.** — *Fig. 2.19 de Pérez Ríos (2012)* como base estructural, complementada con *Fig. 2.56* (conexiones entre sistemas de distintos niveles de recursión) para mostrar la recursividad. Sobre este diagrama se anotan, como capa final, las correcciones 🔧 de las 5 fuentes: ciclo de IA en S1, PID en S3, Sala de Operaciones/VSMod en S4, valores-IA y canal ético en S5, y red coordinada en S2.
- **[G8.2] (opcional de respaldo) Semáforo de madurez por sistema: estado Fase 1 vs. estado objetivo.** — *Fig. 1.8 de Pérez Ríos (2012)* (VSM adaptado de Beer 1985).

> **Nota de validación.** En el diagrama total la señal algedónica asciende por niveles (S1 → S3 → S4 → S5) y solo alcanza al S5 si S3 y S4 no la resuelven; no va directa al S5 en condiciones rutinarias (Pérez Ríos, 2012).

---

## Anexo — Tabla maestra de gráficos

| Gráfico | Parte | Anclaje (Pérez Ríos, 2012, salvo indicación) | Fuente nueva / corrección |
| :--- | :--- | :--- | :--- |
| G0.1 | Marco | Fig. 2.4 | — |
| G0.2 | Marco | (matriz propia) | F1–F5 🆕 |
| G1.1 | Diagnóstico | Fig. 2.1 | — |
| **G1.2** | **Diagnóstico** | **Fig. 2.19** | — |
| G1.3 | Diagnóstico | Fig. 1.6 | — |
| G1.4 | Diagnóstico | (rejilla TOP) | F1 🆕🔧 |
| G1.5 | Diagnóstico | (trazabilidad) | — |
| G2.1 | S1 | Fig. 2.5 | — |
| G2.2 | S1 | Fig. 2.43 / 2.18 | — |
| G2.3 | S1 | (ciclo IA) | F4 🆕🔧 C2.1 |
| G2.4 | S1 | Fig. 2.47 | — |
| G2.5 | S1 | (artefactos ágiles) | F3 🆕🔧 C2.2 |
| G2.6 | S1 | (algedónico de agente) | F2 🆕🔧 C2.3 |
| G3.1 | S2 | Fig. 2.40 | — |
| G3.2 | S2 | Fig. 2.41 | — |
| G3.3 | S2 | (red de comunicación) | F3 🆕🔧 C3.1 |
| G3.4 | S2 | Fig. 1.6 | — |
| G4.1 | S3 | Fig. 2.30 | — |
| G4.2 | S3 | Fig. 2.32 | — |
| G4.3 | S3 | Fig. 2.33 | — |
| G4.4 | S3 | (controlador PID) | F4 🆕🔧 C4.2 |
| G4.5 | S3* | Fig. 2.38 / 2.39 / 2.51 | 🔧 C4.1 |
| G5.1 | S4 | Fig. 2.25 | — |
| G5.2 | S4 | Fig. 2.26 / 2.27 | — |
| **G5.3** | **S4** | **Fig. 2.23** | 🔧 C5.1 |
| G5.4 | S4 | (M2/M5 + VSMod) | F5 🆕🔧 C5.2 |
| G5.5 | S4 | Fig. 2.28 | — |
| G5.6 | S4 | (índices adaptabilidad) | F4 🆕🔧 C5.3 |
| G6.1 | S5 | Fig. 2.21 | — |
| **G6.2** | **S5** | **Fig. 2.22** | — |
| G6.3 | S5 | Fig. 2.24 | — |
| G6.4 | S5 | (valores-IA del agente) | F2 🆕🔧 C6.1 |
| G6.5 | S5 | Fig. 2.53 | F1 🆕🔧 C6.2 |
| G6.6 | S5 | (stakeholders) | F5 🆕🔧 C6.3 |
| G7.1 | Comunicación | Fig. 2.3 | — |
| G7.2 | Comunicación | Fig. 2.3 (instancia) | — |
| G7.3 | Comunicación | Fig. 2.3 (instancia) | — |
| G7.4 | Comunicación | Fig. 2.18 | 🔧 C2.2/C4.3 |
| G7.5 | Comunicación | Fig. 2.53 | — |
| **G8.1** | **Cierre** | **Fig. 2.19 + Fig. 2.56** | Capa final 🔧 F1–F5 |
| G8.2 | Cierre | Fig. 1.8 | — |

> **Gráficos prioritarios para la presentación** (resaltados en negrita): **G1.2** (MSV diagnóstico), **G5.3** (Sala de Operaciones), **G6.2** (S5 arbitrando homeostato) y **G8.1** (MSV total final).
