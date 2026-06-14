---
id: "submodulo-1.1-ia-agentica"
tipo: submodulo
titulo: "Tema 1.1: Introducción a la IA Agéntica"
modulo: "modulo-fundamentos"
---

# Tema 1.1: Introducción a la IA Agéntica

La [[2. conceptos/ia-agentica.md|IA Agéntica]] representa la transición desde modelos de Inteligencia Artificial pasivos —como los chatbots tradicionales que solo responden a comandos específicos— hacia entidades proactivas y autónomas. Estos nuevos agentes son capaces de razonar, planificar y ejecutar tareas complejas sin necesidad de intervención humana constante.

## ¿Qué define a un Agente?

A diferencia de un LLM estándar en una interfaz de chat, un agente opera en un ciclo continuo de **Percepción-Razonamiento-Acción**:
- **Percepción**: Captura eventos y datos del entorno (mensajes, cambios de archivos, bases de datos).
- **Razonamiento**: Evalúa su meta final, desglosa el problema en pasos y planifica.
- **Acción**: Invoca herramientas externas, actualiza su memoria y responde de forma proactiva.

```
  [ Entorno ] --(Percepción)--> [ Agente (LLM + Memoria) ]
      ^                                  |
      |-------------(Acción)-------------|
```

Esta capacidad de orquestación autónoma promete transformar sectores como la analítica financiera, el soporte de TI, el desarrollo de software y la gobernanza empresarial.
