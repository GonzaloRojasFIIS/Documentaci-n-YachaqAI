---
id: "submodulo-4.1-desviacion-y-evaluacion"
tipo: submodulo
titulo: "Tema 4.1: Desviación y Evaluación del Comportamiento"
modulo: "modulo-evaluacion-y-gobernanza"
---

# Tema 4.1: Desviación y Evaluación del Comportamiento

La [[2. conceptos/desviacion-de-la-linea-base-humana.md|Desviación de la Línea Base Humana]] mide el grado de diferencia o desviación que muestran las respuestas u operaciones del agente autónomo en comparación con el juicio estándar emitido por expertos humanos bajo las mismas condiciones.

## Evaluación en Agentes

A diferencia de los LLMs tradicionales que se evalúan con benchmarks estáticos (MMLU, GSM8k), los agentes requieren evaluación de trayectorias:
- **Tasa de éxito de la tarea**: Si logró el objetivo final.
- **Llamadas a herramientas válidas**: Cantidad de errores de sintaxis en APIs.
- **Longitud de trayectoria**: Cuántos pasos requirió para llegar a la meta.
- **Eficiencia de costes**: El costo acumulado de tokens de entrada/salida.
