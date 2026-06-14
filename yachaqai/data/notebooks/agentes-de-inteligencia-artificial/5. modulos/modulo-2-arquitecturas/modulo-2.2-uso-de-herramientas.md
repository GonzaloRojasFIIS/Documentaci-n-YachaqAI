---
id: "submodulo-2.2-uso-de-herramientas"
tipo: submodulo
titulo: "Tema 2.2: Llamada a Herramientas e Interfaces"
modulo: "modulo-arquitecturas-y-protocolos"
---

# Tema 2.2: Llamada a Herramientas e Interfaces

La capacidad de interactuar con el mundo exterior se asocia con el [[2. conceptos/uso-de-herramientas-tool-calling.md|Uso de Herramientas (Tool-Calling)]], que permite a los modelos de lenguaje producir formatos estructurados como JSON para invocar APIs o bases de datos externas.

## Flujo de Tool Calling

1. **Llamada inicial**: El agente evalúa la pregunta del usuario y decide invocar una herramienta. Devuelve un formato estructurado con el nombre y parámetros de la función.
2. **Ejecución**: El software cliente/orquestador intercepta la salida, ejecuta la API o consulta, y devuelve el resultado en texto al modelo.
3. **Respuesta final**: El LLM interpreta el resultado técnico y redacta una respuesta comprensible en lenguaje natural.

```
  [ LLM Core ] --(JSON Tool Call)--> [ Orquestador Cliente ]
       ^                                    |
       |---(Respuesta de API) <------------[ API Externa / DB ]
```

El puente lógico entre tokens textuales abstractos (sintaxis) y acciones de software (semántica) se define mediante la [[2. conceptos/interfaz-sintaxis-semantica.md|Interfaz Sintaxis-Semántica]].
