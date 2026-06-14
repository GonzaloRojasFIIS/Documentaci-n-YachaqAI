# YACHAQ: Esquema del Notebook

## Dominio
Redes de Computadores: arquitecturas, protocolos, direccionamiento, routing, capas OSI/TCP-IP, seguridad y servicios de red en español.

## Idioma
- Español (contenido, preguntas y etiquetas YAML).
- Se permite citar términos técnicos en inglés entre paréntesis cuando sean de uso generalizado.

## Convenciones del notebook
- Cada concepto vive en `2. conceptos/<slug>.md`.
- Cada entidad vive en `3. entidades/<slug>.md`.
- Cada fuente transformada vive en `1. fuentes_transformadas/<slug>.md`.
- Cada pregunta SRS vive en `4. preguntas/<id>.md`.
- Cada módulo vive en `5. modulos/<slug>.md`.
- Los enlaces internos usan sintaxis WikiLink `[[ruta/relativa.md]]`.
- Las fechas usan formato ISO 8601: `YYYY-MM-DD` o `YYYY-MM-DDTHH:MM:SS`.

## Reglas de ingest
- Solo ingestar fuentes primarias verificables: RFCs, documentación oficial, libros de referencia y guías de certificación.
- Extraer automáticamente conceptos detectados y enlazarlos a archivos existentes o sugerir nuevos slugs.
- Almacenar `fecha_ingesta` y `paginas_procesadas` en el frontmatter.
- Generar un resumen ejecutivo de máximo 500 palabras.

## Reglas de query
- Responder siempre en español.
- Priorizar fuentes del propio notebook; si no hay información suficiente, indicar explícitamente el vacío.
- Cuando se cite un concepto, incluir su estado de maestría actual (`maestria`, `estado_srs`).
- No inventar hechos, citas ni porcentajes fuera de los registrados en las fuentes.

## Reglas de lint
- Verificar que cada concepto tenga frontmatter completo: `id`, `tipo`, `titulo`, `modulo`, `maestria`, `estado_srs`, `proximo_repaso`, `ultimo_repaso`, `prerrequisitos`, `relacionados`, `entidades`, `fuente_primaria`.
- Verificar que las rutas de `[[...]]` apunten a archivos existentes.
- Verificar que `estado_srs` sea coherente con `maestria`:
  - `maestria` 0.85-1.00 → `dominado`
  - `maestria` 0.50-0.84 → `en_practica`
  - `maestria` 0.20-0.49 → `critico`
  - `maestria` 0.00-0.19 → `bloqueado`
- Reportar preguntas huérfanas sin `concepto_asociado` existente.
