---
id: "submodulo-2.1-arquitectura-de-agentes"
tipo: submodulo
titulo: "Tema 2.1: Estructura Interna del Agente Moderno"
modulo: "modulo-arquitecturas-y-protocolos"
---

# Tema 2.1: Estructura Interna del Agente Moderno

La [[2. conceptos/arquitectura-de-agente-de-ia-moderno.md|Arquitectura de Agente de IA Moderno]] integra diversos componentes que interactúan dinámicamente como el Cerebro (LLM), Memoria (corto y largo plazo), Planificación (subtareas e iteraciones) e Interfaces de Acción y Percepción.

## Pilares Arquitectónicos

- **Cerebro (LLM Core)**: Realiza el procesamiento central del lenguaje, razonamiento y toma de decisiones.
- **Módulo de Planificación (Planning)**: Descompone objetivos grandes en tareas manejables (e.g. Chain of Thought) y reflexiona sobre resultados previos (Auto-reflexión).
- **Módulo de Memoria (Memory)**:
  - *Memoria a Corto Plazo*: Contexto actual del chat o variables temporales de la sesión.
  - *Memoria a Largo Plazo*: Base de datos vectorial (RAG) para recuperar información histórica de forma semántica.
- **Módulos de Percepción y Acción (Sensors & Actuators)**: Interfaces para captar datos del entorno y ejecutar cambios sobre el mismo.
