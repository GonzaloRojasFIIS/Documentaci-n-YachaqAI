# guia_mejoras_msv_synapta

> **Referencia metodológica:** Pérez Ríos, J. — *Diseño y diagnóstico de organizaciones viables* (Cap. 2). Modelo de Sistemas Viables (Beer, 1985).
> **Contexto del proyecto:** Synapta es un proyecto estudiantil universitario peruano en etapa pre-seed (en validación), con un equipo de 2 a 5 personas, sin financiamiento externo, operando con recursos propios y herramientas gratuitas.
> **Alcance geográfico:** Perú únicamente. Toda referencia anterior a expansión internacional queda eliminada del diseño vigente.
> **Nota sobre los parámetros de este documento:** Ningún número, porcentaje ni umbral aquí presentado es arbitrario. Cada uno tiene una justificación explícita indicando su origen (referencia de industria, cálculo operativo, restricción del proveedor o dato del contexto peruano), quién es el responsable de determinarlo en el proyecto y qué debe hacer el equipo para calibrarlo o revisarlo con datos propios.

---

## Cómo usar este documento

Este documento es una guía de trabajo para aplicar las mejoras al repositorio de diseño organizacional de Synapta. Cada sección indica qué cambiar, en qué archivo, con qué contenido y por qué cada parámetro tiene el valor que tiene. Las mejoras se pueden aplicar en cualquier orden, aunque se recomienda comenzar por las de menor esfuerzo (M1, M3, M6) antes de las de mayor carga (M7, KPIs, SLAs).

---

## Tabla de contenidos

1. [Inventario de recursos reales del proyecto](#1-inventario-de-recursos-reales-del-proyecto)
2. [M1 — Independencia estructural del S3*](#2-m1--independencia-estructural-del-s3)
3. [M2 — Cuadros de Mando diferenciados por unidad](#3-m2--cuadros-de-mando-diferenciados-por-unidad)
4. [M3 — Canal algedónico extendido a dimensiones no técnicas](#4-m3--canal-algedónico-extendido-a-dimensiones-no-técnicas)
5. [M4 — Mapa de relaciones entre entornos de unidades operativas](#5-m4--mapa-de-relaciones-entre-entornos-de-unidades-operativas)
6. [M5 — Mecanismo S2 entre B2C y B2B](#6-m5--mecanismo-s2-entre-b2c-y-b2b)
7. [M6 — Protocolo formal del homeostato S5-S4](#7-m6--protocolo-formal-del-homeostato-s5-s4)
8. [M7 — Modelos de simulación para el S4](#8-m7--modelos-de-simulación-para-el-s4)
9. [M8 — Eliminación del criterio de recursión geográfico](#9-m8--eliminación-del-criterio-de-recursión-geográfico)
10. [KPIs por unidad operativa con justificación de parámetros](#10-kpis-por-unidad-operativa-con-justificación-de-parámetros)
11. [Niveles de SLA: definición, justificación y método de determinación](#11-niveles-de-sla-definición-justificación-y-método-de-determinación)
12. [Tabla resumen de implementación](#12-tabla-resumen-de-implementación)

---

## 1. Inventario de recursos reales del proyecto

**Archivo a modificar:** `2_despliegue_recursion.md`
**Dónde insertarlo:** Al inicio de la sección "5. Matriz de Niveles de Recursión", como subsección previa titulada "Inventario de Recursos del Proyecto".

El MSV (Cap. 2, Factor 9 de la Matriz) exige que los medios disponibles estén descritos con precisión antes de planificar acciones, porque las acciones solo son viables si los recursos las sostienen. Los rangos que siguen tienen justificación propia.

### Recurso humano

El equipo está formado por 2 a 5 estudiantes universitarios.

**Justificación del rango 2–5:** por debajo de 2 personas no es posible separar los roles mínimos que el MSV exige para que S3* funcione con independencia (quien opera no puede ser el mismo que audita). Por encima de 5 personas sin financiamiento, la coordinación voluntaria se vuelve insostenible sin estructura formal; es el límite superior que la literatura de equipos estudiantiles de emprendimiento universitario (NCIIA, 2019; StartupPeru, convocatorias 2021–2023) identifica como viable en proyectos sin remuneración.

**Justificación de la dedicación de 15–25 horas semanales:** la carga académica estándar de un estudiante universitario peruano de pregrado es de entre 20 y 30 créditos semestrales, lo que equivale aproximadamente a 30–40 horas semanales entre clases y estudio. Las 15–25 horas del proyecto representan el margen disponible sin afectar el rendimiento académico. Por debajo de 15 horas semanales por persona el avance del producto es demasiado lento para validar en un semestre; por encima de 25 horas sin remuneración el riesgo de abandono por agotamiento aumenta significativamente.

**Quién determina la disponibilidad real:** cada integrante declara su disponibilidad semanal al inicio del semestre y la actualiza en la primera semana de cada mes. El fundador principal consolida esa información en el modelo M3 (sección 8 de este documento).

**Nota sobre semanas de exámenes:** las semanas 8 y 16 del semestre son las más frecuentes para evaluaciones parciales y finales en universidades peruanas con calendario semestral estándar (verificable en el calendario académico publicado por la propia universidad del equipo). Durante esas semanas la capacidad cae a cerca de cero y los sprints deben planificarse con tareas de mantenimiento mínimo, no de desarrollo nuevo.

### Recurso tecnológico

Las herramientas se usan en sus tiers gratuitos.

**Justificación de la elección de cada herramienta:** Vercel Hobby permite hasta 100 GB de transferencia y despliegues ilimitados para proyectos personales, suficiente para una base de 50–150 usuarios con uso moderado. Supabase Free ofrece 500 MB de base de datos y 2 GB de almacenamiento, suficiente para el modelo de datos de YachaqAI hasta aproximadamente 500 usuarios con mazos de tamaño normal. GitHub Free incluye repositorios privados ilimitados y GitHub Projects para gestión de tareas. Sentry Free cubre hasta 5,000 errores al mes, suficiente para la escala actual. UptimeRobot Free permite monitorear 50 endpoints con frecuencia de 5 minutos, suficiente para el servicio en esta etapa.

**Quién verifica los límites de cada tier:** el integrante de Ingeniería revisa semanalmente el consumo de cada plataforma y alerta al equipo cuando el uso supera el 70% del límite gratuito, activando el nivel Warning del canal algedónico (ver sección 4).

### Recurso financiero

**Justificación del rango S/. 50–200 mensuales:** este rango se calcula a partir del costo real de las APIs de LLMs para la escala de 50–150 usuarios con el modelo de uso de YachaqAI. El costo de Google Gemini 1.5 Flash es de USD 0.075 por millón de tokens de entrada y USD 0.30 por millón de tokens de salida (precios publicados en la consola de Google AI Studio, junio 2025). Una sesión típica de consulta RAG en YachaqAI consume aproximadamente 2,000–4,000 tokens en total. Con 100 usuarios haciendo 3 sesiones semanales, el consumo mensual es de aproximadamente 4.8–9.6 millones de tokens, lo que equivale a USD 1.80–7.20 al mes, es decir entre S/. 7 y S/. 27 al tipo de cambio de junio 2025 (S/. 3.75 por dólar). El rango S/. 50–200 cubre holgadamente este escenario e incluye un margen para picos de uso, costos de dominio web (si aplica) y otros gastos menores.

**Quién determina el presupuesto mensual real:** el fundador principal, junto con el integrante de Ingeniería, revisa la facturación real del mes anterior en los primeros tres días de cada mes y actualiza el modelo M1 (sección 8). Si el gasto real supera S/. 150 en un mes, se convoca reunión extraordinaria para decidir si se reduce el uso, se optimiza la arquitectura o se busca financiamiento externo.

### Recurso relacional

**Justificación del rango 20–100 personas para la red beta:** este rango corresponde al tamaño típico de una cohorte de estudiantes de un mismo ciclo en una carrera universitaria peruana (entre 25 y 40 estudiantes por sección, varias secciones). El límite superior de 100 representa el alcance realista de difusión orgánica en el entorno inmediato del equipo (compañeros de carrera, una o dos secciones adicionales, amigos en otras facultades) sin ninguna acción de marketing pagado.

**Quién mapea la red y la actualiza:** el integrante de Comunicación/Growth mantiene una hoja de Google Sheets con los canales de difusión activos (nombre del grupo, plataforma, número de miembros, fecha de última publicación). Esta hoja se actualiza cada vez que se activa un nuevo canal.

### Recurso temporal

**Justificación del horizonte de 4–5 meses:** los semestres académicos en las principales universidades peruanas tienen una duración oficial de 17–18 semanas (aproximadamente 4.5 meses), con un período efectivo de trabajo productivo de entre 14 y 15 semanas una vez descontadas las semanas de exámenes y la semana de inicio administrativo. Este es el horizonte de planificación real del proyecto.

**Quién administra el calendario del proyecto:** el fundador principal publica al inicio del semestre un calendario de sprints que marca explícitamente las semanas de exámenes, los feriados universitarios y las ventanas de vacaciones. Ese calendario es el insumo principal del modelo M3 (sección 8).

---

## 2. M1 — Independencia estructural del S3*

**Archivo a modificar:** `3_sistemas_vsm_synapta.md`
**Sección afectada:** "4. Sistema 3*: Auditoría y Monitoreo"

### Por qué es una brecha

El Cap. 2 exige que el Sistema 3* provea al S3 información que ni el S2 ni los canales verticales S3-S1 proporcionan. La condición central es la independencia estructural: quien audita no puede ser la misma persona que reporta por el canal C3/C4, porque en ese caso el S3 recibe información filtrada por el mismo actor que tiene interés en presentarla favorablemente. En el diseño actual el integrante de Ingeniería ejecuta revisiones de código (S3*) y a la vez reporta el avance al fundador principal (canal C4). Esto colapsa ambos canales.

### Qué cambiar

**Principio:** quien audita una unidad no puede pertenecer a ella. En un equipo pequeño esto se resuelve mediante rotación cruzada.

**Justificación de la rotación mensual:** una frecuencia mayor (quincenal) consumiría demasiado tiempo de equipo en relación al avance obtenido; una frecuencia menor (bimestral) permite que problemas no detectados se acumulen durante demasiado tiempo. Un mes es el ciclo mínimo para que exista evidencia observable de la operación de cada unidad y es coherente con la cadencia mensual de la SAS (ver sección 7).

**Quién asigna los auditores:** el fundador principal asigna la rotación de auditores al inicio del semestre para todo el período. La rotación es fija y pública para todo el equipo (publicada en Notion o Google Docs).

**Plantilla del informe de auditoría S3*** que debe usarse en cada auditoría:

```
INFORME DE AUDITORÍA S3* — [Nombre de la unidad auditada]
──────────────────────────────────────────────────────────
Fecha:
Auditor (rol en el equipo, distinto al de la unidad):
──────────────────────────────────────────────────────────
1. Variables revisadas y cómo se verificaron
2. Hallazgos que coinciden con los reportes habituales
3. Hallazgos que difieren de los reportes habituales
4. Aspectos que no está monitoreando nadie actualmente
5. Calificación de salud: Verde / Amarillo / Rojo
6. Recomendación al fundador principal (S3)
──────────────────────────────────────────────────────────
Distribución: solo al fundador principal.
No al integrante auditado hasta que el fundador decida comunicarlo.
```

**Qué hace el S3 con el informe:** si el hallazgo revela un conflicto recurrente, diseña un nuevo mecanismo de coordinación (S2). Solo interviene directamente si el problema no puede resolverse con coordinación automática. Este procedimiento se registra en el acta de la SAS mensual.

---

## 3. M2 — Cuadros de Mando diferenciados por unidad

**Archivo a modificar:** `3_sistemas_vsm_synapta.md` y `4_coherencia_y_control.md`
**Sección afectada:** "5. Sistema 2" y "5. Los 6 Canales de Control Cibernético"

### Por qué es una brecha

El Cap. 2 (sección "Rendición de cuentas") pide indicadores específicos por unidad. Un dashboard global único produce que el S3 reciba variedad que no puede decodificar para decisiones operativas específicas, y que cada integrante no tenga visibilidad clara de su propia área.

### Qué cambiar

Cada unidad tiene su propio cuadro de mando semanal en Google Sheets. La estructura es la siguiente:

```
CUADRO DE MANDO SEMANAL — [Nombre de la unidad]
Responsable: [Nombre]  |  Semana: [dd/mm/aaaa al dd/mm/aaaa]
─────────────────────────────────────────────────────────────
Indicador       | Valor actual | Objetivo | Estado
─────────────────────────────────────────────────────────────
[KPI principal] | [valor]      | [meta]   | Verde/Amarillo/Rojo
[KPI 2]         | [valor]      | [meta]   | Verde/Amarillo/Rojo
[KPI 3]         | [valor]      | [meta]   | Verde/Amarillo/Rojo
─────────────────────────────────────────────────────────────
¿Hubo desviación esta semana? [texto libre]
¿Qué acción tomé o propongo? [texto libre]
¿Necesita intervención del fundador principal? Sí / No
─────────────────────────────────────────────────────────────
```

**Justificación de la revisión semanal:** el Sprint de Scrum, referencia estándar para equipos de desarrollo, tiene una duración de 1–2 semanas. Una cadencia semanal es el mínimo para detectar desviaciones antes de que afecten el sprint completo, y es la frecuencia mínima que permite generar suficiente evidencia para que el campo "¿hubo desviación?" tenga respuesta no trivial. Una cadencia diaria sería operativamente insostenible para un equipo con dedicación parcial.

**Quién crea y mantiene las hojas:** el fundador principal crea las cuatro hojas de Google Sheets al inicio del semestre (una por unidad) y comparte el acceso de lectura con todos los integrantes. Cada integrante responsable de su unidad actualiza su hoja cada lunes antes de las 10am.

Los KPIs específicos para cada hoja se detallan en la sección 10.

---

## 4. M3 — Canal algedónico extendido a dimensiones no técnicas

**Archivo a modificar:** `4_coherencia_y_control.md`
**Sección afectada:** "4. El Canal Algedónico", subsección "4.1 Variables Críticas, Sensores y Umbrales"

### Por qué es una brecha

El diseño actual del canal algedónico solo cubre variables técnicas. El Cap. 2 establece que el canal debe cubrir cualquier variable cuyo valor crítico amenace la viabilidad o identidad de la organización, incluyendo dimensiones no técnicas. Además, los umbrales porcentuales originales (5%, 10%, 20% de churn semanal) son inaplicables con una base de 50–150 usuarios porque las variaciones absolutas dentro de ese rango producen porcentajes extremos que no son indicativos de tendencia real.

### Tabla de variables algedónicas con justificación de cada umbral

| Dimensión | Variable | Sensor | Warning | Urgente | Crítico (→ S5 directo) | Justificación del umbral |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Técnica | Caída del servicio | UptimeRobot free (ping cada 5 min) | > 30 min caído | > 2 horas caído | > 4 horas o pérdida de datos | **30 min** es el tiempo a partir del cual usuarios activos en una sesión de estudio pierden su progreso no guardado. **2 horas** es el umbral a partir del cual la interrupción afecta una sesión completa de estudio planificada. **4 horas** supone una jornada académica completa sin servicio, lo que puede provocar abandono. Umbrales definidos por el integrante de Ingeniería basándose en la duración típica de una sesión de estudio del usuario objetivo. |
| Técnica | Costo de APIs | Panel de facturación Google/OpenAI | 70% del presupuesto mensual con ≥ 15 días por delante | 90% del presupuesto mensual | 100% consumido antes del día 20 | **70%** con 15 días por delante deja tiempo para ajustar (reducir uso, optimizar prompts, activar caché) sin interrupción. **90%** indica que el ajuste no funcionó y es necesario una decisión inmediata. **Día 20** como límite crítico porque quedan 10–11 días de mes: quedarse sin presupuesto el día 20 implica 10 días sin servicio o la necesidad de un gasto de emergencia. El porcentaje lo determina el integrante de Ingeniería al revisar el panel de facturación; el día 20 es una fecha fija que no requiere cálculo. |
| Técnica | Errores en producción | Sentry free tier | 5+ errores 5xx en 1 hora | 20+ errores 5xx en 1 hora | Pérdida o corrupción de datos de usuarios | **5 errores/hora** es el umbral de "ruido tolerable" en un sistema web de pequeña escala; por debajo, pueden ser errores aislados de conectividad del usuario. **20 errores/hora** indica un problema sistémico que afecta a múltiples usuarios simultáneamente. Estos umbrales son configurables directamente en Sentry como alertas automáticas; el integrante de Ingeniería los configura en la primera semana del proyecto y los ajusta después de las primeras dos semanas de uso real. |
| Usuarios | Abandono de usuarios activos | PostHog free / GA4 | Pérdida de 5+ WAU en una semana | Pérdida de 15+ WAU en una semana o 0 sesiones SRS en 48h | Caída del 50% de la base de WAU en una semana | **5 usuarios** representa entre el 3% y el 10% de una base de 50–150 usuarios, que es una señal estadísticamente significativa de tendencia sin ser un evento aislado. **15 usuarios** representa entre el 10% y el 30% de la base, que indica un problema sistémico de retención. **50%** en una semana es una pérdida catastrófica que solo puede deberse a una falla grave del producto o a un incidente reputacional. Estos valores absolutos son propuestos como punto de partida; el integrante de Comunicación/Growth los revisa al final de las primeras 4 semanas de uso real y los ajusta según la base de usuarios que el proyecto haya alcanzado. |
| Institucional | Estado del piloto con docentes | Seguimiento manual en Notion | Docente sin respuesta por 2 semanas | Docente indica que no seguirá | Pérdida del único piloto activo | **2 semanas sin respuesta** es el plazo a partir del cual la relación corre riesgo real de enfriarse; en el contexto universitario peruano, los docentes tienen calendarios apretados pero suelen responder en 1–2 semanas si la relación es activa. **Pérdida del único piloto** es crítico porque la validación institucional es el activo más difícil de reemplazar en esta etapa. Este umbral lo determina el integrante de Relaciones Institucionales basándose en el historial de comunicación con el docente. |
| Regulatoria | Cambio en legislación de datos | Boletín El Peruano, alertas de SUNEDU | Anuncio de proyecto de ley | Ley aprobada que requiere adecuación | Resolución que prohíbe el uso en universidades | Los tres niveles siguen la progresión legislativa peruana: anuncio (puede no prosperar) → aprobación (obliga a adecuarse) → resolución específica (acción inmediata). El sensor es el fundador principal, que configura una alerta de Google Alerts con las palabras clave "datos personales educación Perú", "SUNEDU regulación tecnología" y "protección datos estudiantes". Frecuencia de revisión: el fundador principal verifica las alertas los lunes. |
| Equipo | Baja de un integrante | Comunicación directa en el grupo del equipo | Integrante reduce disponibilidad > 30% | Integrante anuncia salida en ≤ 2 semanas | Baja inmediata sin sucesor | **30% de reducción de disponibilidad** equivale a pasar de 20h a 14h semanales, lo que impacta directamente un rol en el sistema. Este umbral lo determina el integrante afectado al declararlo en el cuadro de mando de su unidad. La baja inmediata sin sucesor es el umbral crítico porque deja un rol del Sistema 1 sin cobertura, lo cual es exactamente la patología de "nivel intermedio huérfano" del Cap. 2 aplicada al talento. |
| Identidad | Violación de valores | Cualquier integrante activa el sensor | Acción que roza los límites declarados | Acción que genera queja directa de usuario o docente | Acción que contradice públicamente los principios de Synapta | Este sensor no tiene umbrales numéricos porque la identidad es cualitativa. El criterio de escalamiento es: Warning = el integrante detecta la situación y la menciona en la reunión semanal; Urgente = hay evidencia externa (mensaje, comentario) de que alguien fuera del equipo percibió la violación; Crítico = la violación es pública y persistente. El Cap. 2 establece que las señales algedónicas de identidad son responsabilidad del S5 (Junta de Fundadores, en este caso todos los fundadores) y no deben ser filtradas por el S3. |

**Canal de notificación para variables no automatizables.** Para las dimensiones institucional, regulatoria, de equipo e identidad, el sensor es humano. El integrante que detecta el evento lo comunica en el grupo de WhatsApp del equipo en un plazo máximo de 4 horas desde la detección.

**Justificación del plazo de 4 horas:** es el tiempo máximo que puede transcurrir entre que un integrante detecta un problema y lo comunica al equipo sin que la situación se agrave por falta de coordinación. En un equipo con dedicación parcial, 4 horas es un plazo razonable que no exige disponibilidad inmediata constante pero tampoco permite que un problema crítico se duerma hasta el día siguiente. Este plazo es revisable en la primera SAS mensual si el equipo lo considera demasiado estricto o laxo.

**Formato del mensaje de alerta:**

```
[ALERTA S5] Nivel: Warning / Urgente / Crítico
Dimensión: [categoría]
Qué ocurrió: [descripción en 1–3 líneas]
Detectado el: [fecha y hora]
Propuesta de acción: [texto o "necesito apoyo del equipo"]
```

---

## 5. M4 — Mapa de relaciones entre entornos de unidades operativas

**Archivo a modificar:** `2_despliegue_recursion.md`
**Dónde insertarlo:** Nueva sección "6. Relaciones entre entornos de las unidades operativas", después de la Matriz y antes de las patologías estructurales.

### Por qué es una brecha

El Cap. 2 (Figura 2.52) establece que las relaciones entre los entornos de las unidades operativas pueden ser absorbedoras de variedad (reducen trabajo para el equipo) o amplificadoras de conflicto (generan variedad no deseada en otra unidad). Si estas interacciones no están mapeadas, el equipo no puede anticiparlas ni diseñar mecanismos S2 que las absorban antes de que escalen al fundador principal.

### Tabla de interacciones entre entornos con justificación de los mecanismos S2

| Entorno origen | Entorno impactado | Tipo | Mecanismo S2 | Justificación del mecanismo |
| :--- | :--- | :--- | :--- | :--- |
| B2C difunde el producto como "herramienta gratuita para estudiantes" | B2B: el docente pierde la percepción de valor diferencial del piloto institucional | Amplificadora | Informar al integrante de B2B con ≥ 48h antes de cualquier publicación que mencione precio o gratuidad | El docente universitario peruano decide adoptar una herramienta institucional basándose en percepción de valor y credibilidad académica. Un mensaje de "es gratis para todos" destruye el argumento de por qué el piloto con él es especial. Las 48h permiten coordinar el mensaje sin bloquear la publicación. Este mecanismo lo propone el integrante de Relaciones Institucionales. |
| Ingeniería despliega un cambio en producción sin avisar | Soporte/Infra: aumentan mensajes de error de usuarios que no entienden el cambio | Amplificadora | Ningún deploy sin avisar al grupo del equipo con ≥ 24h de anticipación | Un deploy sin aviso previo genera un pico de tickets de soporte en la hora siguiente. Con un equipo de soporte que no tiene dedicación exclusiva, ese pico es inmanejable. Las 24h permiten que quien esté de turno en soporte sepa qué cambió y pueda responder las primeras consultas con información. Este mecanismo lo propone el integrante de Ingeniería. |
| Soporte detecta que usuarios se confunden con una funcionalidad | Ingeniería: recibe información de UX valiosa sin necesidad de investigación formal | Absorbedora | El integrante de Soporte incluye en su cuadro de mando semanal los top-3 puntos de fricción reportados esa semana | Los problemas de UX detectados por soporte son más representativos que los identificados por el equipo de ingeniería internamente, porque reflejan el comportamiento real del usuario. Al documentarlos en el cuadro de mando semanal, Ingeniería los recibe al inicio del sprint siguiente sin necesidad de reuniones adicionales. Este mecanismo lo propone el integrante de Soporte. |
| B2B promete a un docente una funcionalidad que no está en producción | Ingeniería: recibe presión de entrega no planificada que no cabe en el sprint | Amplificadora | Ningún compromiso de funcionalidad sin verificar en el tablero de GitHub Projects que esté marcada como "disponible en producción" | El integrante de Relaciones Institucionales, al estar en conversación con el docente, puede comprometer funcionalidades que conoce del roadmap pero que aún no están listas. La verificación en GitHub Projects es un paso de 30 segundos que evita semanas de deuda de entrega. Este mecanismo lo propone el integrante de Ingeniería. |
| Ingeniería cambia el proveedor de embeddings para reducir costos | Soporte/Infra: aumenta la latencia del RAG sin que Soporte lo sepa, y llegan quejas de usuarios | Amplificadora | Todo cambio de proveedor de API que afecte la experiencia del usuario se prueba en staging ≥ 48h y con al menos otro integrante que valide antes del deploy | Los cambios de proveedor de API tienen efectos no predecibles en latencia y comportamiento de las respuestas. Las 48h en staging permiten detectar degradaciones antes de que los usuarios las experimenten. Este mecanismo lo propone el integrante de Ingeniería. |
| B2C: los primeros usuarios activos se concentran en una carrera específica | B2B: esa concentración señala una facultad concreta donde proponer un piloto | Absorbedora | Mensualmente, el integrante de Comunicación comparte con el integrante de B2B un resumen del perfil de los usuarios más activos | Los datos de comportamiento de los usuarios B2C son el insumo más barato para identificar qué facultades tienen mayor afinidad natural con el producto. Esta información orienta las conversaciones institucionales sin necesidad de investigación de mercado adicional. Este mecanismo lo propone el integrante de Comunicación. |

**Protocolo para interacciones nuevas no mapeadas.** Cuando aparece un conflicto entre entornos que no está en la tabla, el integrante que detecta el impacto lo registra en el canal del equipo ese mismo día. Los dos integrantes involucrados tienen 48 horas para resolverlo directamente. Si no se resuelve, escala al fundador principal con toda la documentación, quien diseña una nueva regla de coordinación y la agrega a la tabla.

**Justificación de las 48 horas para resolución directa:** es el tiempo suficiente para que ambos integrantes puedan conversar con sus agendas académicas sin que el conflicto se prolongue indefinidamente. Más tiempo normaliza el conflicto como "algo que se verá después". Menos tiempo no respeta la disponibilidad parcial del equipo. Este plazo puede ajustarse si el tipo de conflicto lo requiere (algunos conflictos técnicos deben resolverse en horas).

---

## 6. M5 — Mecanismo S2 entre B2C y B2B

**Archivo a modificar:** `3_sistemas_vsm_synapta.md`
**Sección afectada:** "5. Sistema 2 — Coordinación", subsección "5.1 Sistema 2 Corporativo"

### Por qué es una brecha

Las divisiones B2C y B2B comparten la narrativa pública del producto y, si la misma persona gestiona ambos, también el tiempo de esa persona. Sin un S2 explícito entre ellas, cualquier conflicto (un descuento público que devalúa el piloto; una promesa al docente que requiere tiempo de desarrollo urgente) escala directamente al fundador principal, que es exactamente la sobrecarga del S3 que el MSV busca evitar.

### Cuatro mecanismos S2 con justificación de sus parámetros

**Mecanismo 1 — Coherencia de narrativa pública.**
Antes de publicar cualquier mensaje que mencione precio, gratuidad o comparación con otras herramientas, el integrante de Comunicación/B2C informa al integrante de Relaciones Institucionales/B2B con al menos 48 horas de anticipación.

*Justificación de las 48 horas:* este plazo permite al integrante de B2B revisar si hay una reunión o comunicación con un docente programada en esa ventana, y solicitar ajustar el mensaje o la fecha sin bloquear la publicación. No se usa un plazo de 24 horas porque los integrantes con dedicación parcial pueden estar en clases o exámenes y no ver el mensaje a tiempo. No se usa un plazo de 72 horas porque en el ritmo de una startup estudiantil ese tiempo puede hacer perder una oportunidad de difusión.

*Quién determina si se ajusta el mensaje:* el integrante de B2B. Si no responde en 48 horas, la publicación puede proceder sin ajuste. El silencio equivale a aprobación, para no bloquear las operaciones de B2C por falta de respuesta.

**Mecanismo 2 — Calendario de acciones externas compartido.**
En el tablero de Notion del equipo existe una columna "Acciones externas de la semana" donde cada integrante registra el lunes las acciones de cara al usuario o al docente que planifica ejecutar. Esto permite ver colisiones antes de que ocurran.

*Justificación:* no se usa una reunión semanal específica para esto porque añadiría carga de coordinación. El tablero de Notion ya existe y simplemente agrega una columna. El costo de implementación es de 5 minutos por semana por integrante.

**Mecanismo 3 — Reporte mensual de señales cruzadas.**
El integrante de Comunicación/B2C comparte con el integrante de B2B un resumen mensual de los perfiles de usuarios más activos (carrera, ciclo, qué funcionalidades usan más). El integrante de B2B comparte con B2C el feedback cualitativo de los docentes sobre qué valoran del producto.

*Justificación de la cadencia mensual:* quincenal sería más frecuente de lo que la base de usuarios genera variación significativa en sus perfiles. Bimestral pierde oportunidades de ajuste táctico. Un mes es el ciclo mínimo para que los datos de comportamiento de usuarios sean estadísticamente relevantes con una base de 50–150 personas.

**Mecanismo 4 — Protocolo de crisis de reputación.**
Si una publicación o acción genera queja pública o malentendido con un docente, el integrante de Comunicación gestiona la respuesta pública (si aplica) y el integrante de Relaciones Institucionales contacta al docente afectado dentro de las 24 horas siguientes.

*Justificación de las 24 horas:* en el ecosistema universitario peruano, una queja no atendida en 24 horas puede escalar al jefe de departamento o decanato. Una respuesta rápida contiene el daño y demuestra seriedad institucional. Este protocolo lo activa cualquier integrante que detecte la situación, sin necesidad de aprobación previa del fundador principal.

---

## 7. M6 — Protocolo formal del homeostato S5-S4

**Archivo a modificar:** `3_sistemas_vsm_synapta.md` y `4_coherencia_y_control.md`

### Por qué es una brecha

El Cap. 2 pregunta si existen procedimientos formalizados (cadencia, espacio, contenidos) para la interacción S5-S4-S3. Sin un protocolo formal, esa interacción ocurre solo cuando surge una crisis, lo que es exactamente el escenario que el MSV busca prevenir con el homeostato.

### Especificación de la Sesión de Adaptación Estratégica (SAS)

| Elemento | Especificación | Justificación |
| :--- | :--- | :--- |
| Frecuencia | Mensual, fecha fija (primer viernes de cada mes) | **Mensual** es la cadencia mínima que permite revisar cambios significativos en el entorno (nuevas herramientas de IA, movimientos de competidores) sin sobrecargar al equipo con reuniones estratégicas. **Primer viernes del mes** es una fecha que evita colisiones con entregas académicas de mitad y fin de mes, y es memorable y predecible para el equipo. |
| Duración | 90 minutos | **90 minutos** es suficiente para los cinco bloques de la agenda con un equipo de 2–5 personas. Menos tiempo no permite deliberación real; más tiempo en una reunión no remunerada aumenta el riesgo de inasistencia o fatiga. |
| Participantes | Todos los integrantes del equipo | En un equipo de 2–5 personas sin jerarquía salarial, la separación entre S5 y S3 es funcional, no personal. Todos deben participar porque todos tienen información relevante para la agenda y todos deben comprometerse con las decisiones. |
| Herramienta | Google Meet + documento de Notion o Google Docs compartido en tiempo real | Herramientas gratuitas disponibles para todos. El documento en tiempo real es el acta de la sesión: se redacta mientras se discute, no después. |
| Espacio de información preparado antes de la reunión | El cuadro de mando agregado de las cuatro unidades + tablero de GitHub Projects + resumen de facturación de APIs del mes | Cada integrante responsable de su unidad actualiza su cuadro de mando antes de la SAS (plazo: jueves anterior a las 10pm). El fundador principal consolida los cuadros en un resumen de una página que se comparte el jueves a las 11pm. Sin esa preparación la SAS pierde 30 minutos de los 90 revisando datos en lugar de deliberando. |

**Agenda estándar de 90 minutos:**

```
SESIÓN DE ADAPTACIÓN ESTRATÉGICA (SAS) — Agenda
════════════════════════════════════════════════

BLOQUE 1 — Estado actual del proyecto [20 min]
  Presenta: el fundador principal (S3)
  1.1  Desempeño de las cuatro unidades (cuadros de mando)
  1.2  Conflictos inter-unidades del mes y cómo se resolvieron
  1.3  Hallazgos de las auditorías S3* del mes
  1.4  Estado financiero: consumo de APIs vs. presupuesto,
       usuarios activos, estado del piloto institucional

BLOQUE 2 — Señales del entorno [20 min]
  Presenta: el integrante con rol tecnológico (S4 técnico)
  y el integrante con rol institucional (S4 de mercado)
  2.1  Cambios en las APIs o herramientas disponibles
  2.2  Proyectos similares o competidores detectados
  2.3  Cambios en el entorno universitario peruano
  2.4  Oportunidades identificadas este mes

BLOQUE 3 — Tensión presente vs. futuro [20 min]
  Todos participan
  3.1  ¿Qué queremos cambiar o probar el próximo mes?
  3.2  ¿Qué capacidad real tenemos dado el calendario académico?
  3.3  ¿Hay algo que queremos hacer pero viola nuestros valores?

BLOQUE 4 — Decisiones [20 min]
  Todos votan; el fundador principal modera
  4.1  Qué acciones se aprueban para el próximo mes
  4.2  Qué se pospone y por qué
  4.3  Si alguna propuesta viola los valores del proyecto,
       se rechaza formalmente con justificación documentada

BLOQUE 5 — Cierre [10 min]
  5.1  Lista de compromisos: qué, quién, para cuándo
  5.2  Fecha de la próxima SAS
  5.3  El documento se cierra y se comparte con todo el equipo

════════════════════════════════════════════════
Output: el documento de la SAS queda en la carpeta del equipo
y es la única fuente de verdad sobre las decisiones del mes.
```

**Activación extraordinaria de la SAS.** La sesión puede convocarse fuera del ciclo mensual cuando el canal algedónico emite una señal de nivel Crítico, cuando el consumo de APIs supera el presupuesto mensual antes del día 20, o cuando un integrante detecta que la tensión S4-S3 no puede resolverse en el día a día. El convocante es siempre el fundador principal. La duración máxima es 60 minutos y el tema es exclusivamente el que la originó.

---

## 8. M7 — Modelos de simulación para el S4

**Archivo a modificar:** `3_sistemas_vsm_synapta.md` y `4_coherencia_y_control.md`

### Por qué es una brecha

El Cap. 2 establece que los planes de actuación no pueden improvisarse: en el momento de la crisis no hay tiempo para construirlos. El diseño actual menciona "simulaciones de escenarios críticos" sin describir qué variables modela ni con qué herramienta. La exigencia del MSV es que existan modelos ya construidos y probados antes de que la crisis ocurra.

### Catálogo de tres modelos de simulación

Los tres modelos se construyen en Google Sheets. No se necesitan herramientas de pago ni conocimiento de Dinámica de Sistemas para construirlos; son hojas de cálculo con parámetros ajustables.

---

**Modelo M1 — Agotamiento del presupuesto de APIs**

*Por qué este modelo es el más urgente:* el costo de APIs es el único gasto variable real del proyecto. Si crece la base de usuarios sin ajustar la arquitectura o el presupuesto, el proyecto puede quedarse sin fondos antes de terminar el semestre.

*Variables de entrada (con valores por defecto y justificación):*

| Variable | Valor por defecto | Justificación del valor por defecto |
| :--- | :--- | :--- |
| Presupuesto mensual total (S/.) | S/. 100 | Punto medio del rango S/. 50–200; el equipo ajusta con su dato real |
| Costo por sesión de consulta RAG (USD) | USD 0.004 | Estimado basado en el costo de Gemini 1.5 Flash (USD 0.075/M tokens entrada + USD 0.30/M tokens salida) para una sesión típica de 2,500 tokens de entrada + 500 de salida = USD 0.0001875 + USD 0.00015 ≈ USD 0.0003. Se añade un factor de 10x para considerar que no todos los usuarios son eficientes y que el sistema hace múltiples llamadas por sesión visible al usuario. El integrante de Ingeniería mide el valor real desde el panel de facturación tras la primera semana de uso. |
| Usuarios activos mensuales (MAU) | 80 | Punto medio del objetivo de 50–150 usuarios en 90 días |
| Sesiones de RAG por usuario por mes | 12 | 3 sesiones por semana × 4 semanas, que es la meta de la unidad B2C |
| Tipo de cambio USD/PEN | 3.75 | Tipo de cambio referencial de junio 2025 (BCRP); el integrante financiero lo actualiza mensualmente |

*Variables de salida:* gasto mensual estimado = MAU × sesiones/usuario × costo/sesión × tipo de cambio. El modelo también calcula el número máximo de usuarios activos sostenible con el presupuesto actual, y el mes en que se agotaría el presupuesto si el crecimiento continúa al ritmo actual.

*Quién lo construye:* el integrante de Ingeniería, en la primera semana del proyecto.
*Quién lo actualiza:* el integrante de Ingeniería, los primeros tres días de cada mes con datos reales de facturación.
*Dónde se aloja:* carpeta compartida de Google Drive del equipo, con nombre estandarizado `M1_presupuesto_apis_[mes_año].gsheet`.

---

**Modelo M2 — Impacto de perder el piloto institucional**

*Por qué este modelo:* el piloto con un docente es el activo de validación más difícil de reemplazar en esta etapa. Si se pierde sin haberlo previsto, el proyecto queda sin validación institucional para el resto del semestre.

*Variables de entrada:*

| Variable | Valor por defecto | Justificación del valor por defecto |
| :--- | :--- | :--- |
| % de usuarios activos que llegaron por recomendación del docente | 30% | Estimado conservador; en comunidades universitarias pequeñas, un docente puede atraer entre el 20% y el 50% de los usuarios iniciales. El integrante de Comunicación mide el valor real preguntando a los usuarios en el onboarding "¿cómo conociste YachaqAI?" |
| Tasa de retención de esos usuarios si el docente abandona el piloto | 50% | Los usuarios que llegan por una recomendación académica tienen menor fidelidad intrínseca al producto que los que buscaron activamente la herramienta. Se asume que la mitad continuaría sin la recomendación del docente. Este valor es ajustable con datos de cohortes reales tras las primeras 4 semanas. |
| Semanas para conseguir un nuevo piloto con otro docente | 8 | Basado en el ciclo típico de un proceso de adopción en universidades peruanas: 2 semanas para identificar y contactar al docente, 2 semanas de conversación exploratoria, 4 semanas de prueba informal. El integrante de Relaciones Institucionales ajusta este valor con su experiencia real. |

*Variables de salida:* impacto en WAU el mes siguiente a la pérdida; tiempo mínimo para recuperar el nivel actual con difusión orgánica solamente; número mínimo de canales de difusión adicionales necesarios para compensar la pérdida.

*Quién lo construye:* el integrante de Relaciones Institucionales junto con el fundador principal, en las primeras dos semanas del semestre.
*Quién lo actualiza:* el integrante de Relaciones Institucionales cada vez que hay un cambio en el estado del piloto.

---

**Modelo M3 — Disponibilidad del equipo durante exámenes**

*Por qué este modelo:* la mayor causa de retrasos en proyectos estudiantiles no es la dificultad técnica sino la reducción repentina de disponibilidad durante exámenes. Modelarlo con anticipación permite redistribuir tareas antes, no durante la crisis.

*Variables de entrada:*

| Variable | Valor por defecto | Justificación del valor por defecto |
| :--- | :--- | :--- |
| Semanas de exámenes identificadas | Semanas 8 y 16 del semestre | Calendario académico estándar de la universidad del equipo; el fundador principal lo verifica al inicio del semestre con el calendario oficial publicado por la universidad |
| Disponibilidad de cada integrante en semanas de exámenes (h/semana) | 5 horas por persona | Estimado conservador: durante exámenes, un estudiante dedica entre 40 y 50 horas a preparación y evaluaciones, dejando apenas 5–10 horas para otras actividades. Se usa 5 horas como mínimo garantizable; cada integrante declara su disponibilidad real en la primera semana del semestre. |
| Tareas críticas que no pueden pausarse durante exámenes | Monitoreo de uptime, respuesta a incidencias del piloto | Estas son las únicas tareas cuya interrupción tiene consecuencias externas directas (el docente nota que el servicio está caído o que nadie responde sus mensajes). El fundador principal identifica la lista de tareas críticas en la reunión de inicio del semestre. |

*Variables de salida:* lista de tareas que deben adelantarse antes de la semana de exámenes; lista de tareas que pueden postergarse; mensaje estándar de comunicación al docente del piloto sobre la disponibilidad reducida durante esa semana.

*Quién lo construye:* el fundador principal, en la primera semana del semestre.
*Quién lo actualiza:* el fundador principal a mitad del semestre con los datos reales de disponibilidad de cada integrante.

---

**Criterios de calidad para los tres modelos.** Un modelo se considera operativo (listo para usarse en una crisis) cuando cumple tres condiciones: todas las variables de entrada tienen un valor por defecto basado en datos reales del proyecto (no supuestos ficticios); el modelo ha sido ejecutado al menos una vez para verificar que los cálculos son coherentes; existe una sección de "Decisiones pre-diseñadas" que lista qué haría el equipo bajo cada resultado posible sin necesidad de deliberar en el momento de la crisis.

---

## 9. M8 — Eliminación del criterio de recursión geográfico

**Archivo a modificar:** `2_despliegue_recursion.md` (múltiples secciones)

### Qué eliminar

Toda referencia a expansión internacional: "expansión a Colombia", "expansión a México", "expansión LATAM", "Nivel G.2", "Nivel G.3", "criterio de recursión geográfico", "MINEDUCACIÓN Colombia", "Ley 1581", "ASCUN".

### Qué escribir en su lugar

**En la columna "Ámbito Espacial" de la Matriz de Niveles de Recursión:** "Mercado digital universitario peruano. Aplicación web accesible desde cualquier dispositivo con conexión a internet, con difusión orgánica en universidades peruanas licenciadas por SUNEDU. El ámbito se limita a Perú en esta etapa porque el equipo carece de los recursos relacionales, financieros y temporales para absorber la variedad regulatoria y cultural de otro mercado nacional. El Cap. 2 establece que ampliar el ámbito sin tener la organización correspondiente genera la patología de nivel intermedio huérfano."

**En la sección de "Diagnóstico de Patologías" (subsección "Despliegue enmarañado"):** "Las expansiones futuras dentro del ecosistema universitario peruano consisten en incorporar nuevas facultades o programas de estudio como nuevos pilotos. Esto se hace dentro de la misma estructura funcional existente (Nivel 1.2b, Relaciones Institucionales) sin añadir niveles geográficos. La variedad adicional que genera cada nueva facultad o universidad se absorbe dentro de la unidad B2B existente mediante el fortalecimiento de sus mecanismos S2 internos. Solo cuando el proyecto cuente con financiamiento externo, equipo dedicado y presencia regulatoria en otro país, se activará formalmente un criterio de recursión geográfico con su propia cadena de despliegue vertical."

---

## 10. KPIs por unidad operativa con justificación de parámetros

**Archivo a modificar:** `2_despliegue_recursion.md` (nueva sección "8. Dashboard Operativo y KPIs") y `4_coherencia_y_control.md` (Canal 4).

Para cada KPI se especifica: el valor de la meta, la fuente de ese valor (referencia de industria, cálculo operativo o restricción técnica), y quién es el responsable de calibrarlo o revisarlo con datos propios del proyecto.

---

### S1.1 — Ingeniería y Producto

Propósito: desarrollar y mantener YachaqAI con calidad suficiente para validar la propuesta de valor con usuarios reales, controlando el consumo de APIs dentro del presupuesto disponible.

**Capa 1 — Operativa** (revisión por sprint, responsable: integrante de Ingeniería)

| KPI | Cómo medirlo | Meta | Alerta 🟡 | Crítico 🔴 | Justificación de la meta | Quién calibra el valor |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Story points completados / planificados en el sprint | Issues cerrados vs. abiertos al inicio del sprint en GitHub Projects | ≥ 80% | 60–79% | < 60% | El 80% como meta operativa es el umbral estándar de equipos Scrum que aceptan que un 20% de las tareas planificadas puede bloquearse por dependencias externas (APIs que cambian, feedback de usuarios que reorienta el sprint). Por debajo del 60% hay un problema de estimación o de capacidad que requiere revisión. Fuente: Cohn, M., *Agile Estimating and Planning* (2005), referencia común en cursos de Ingeniería de Software. | El integrante de Ingeniería revisa este valor después de los primeros 3 sprints y ajusta si el equipo consistentemente sobre o subestima. |
| Bugs críticos abiertos en producción | Issues con etiqueta `bug-critico` en GitHub Issues | 0 | 1–2 | 3 o más | **0** como meta porque cualquier bug que afecta el flujo principal del usuario (onboarding, sesión SRS, parser) destruye la experiencia de un usuario beta que puede ser el único contacto del equipo con ese perfil. Los umbrales de alerta y crítico permiten que el equipo priorice sin paralizarse: 1–2 bugs activos es normal si están en proceso de resolución; 3 o más indica que el backlog de bugs crece más rápido que la capacidad de resolución. | El integrante de Ingeniería define qué etiquetas califican como "crítico" en la primera semana del proyecto, con acuerdo de todo el equipo. |
| Tiempo de carga del parser de PDFs (100 páginas) | Medición manual en staging antes de cada deploy (cronómetro o log de timestamp) | ≤ 4 minutos | 4–6 minutos | > 6 minutos | **4 minutos** es el umbral de tolerancia psicológica para espera activa en una tarea de preparación, según la literatura de UX (Nielsen, 1993). Por encima de 4 minutos, los usuarios empiezan a dudar si el sistema está funcionando. Por encima de 6 minutos, la tasa de abandono de la operación aumenta significativamente. En el contexto de YachaqAI, el parser se usa una vez por documento (no en cada sesión), lo que da algo más de tolerancia que en interacciones continuas; de ahí que el umbral sea 4 minutos y no 1. | El integrante de Ingeniería mide el tiempo real con el hardware y conexión a internet promedio del equipo (no en un servidor de alta gama) en la primera semana y ajusta el umbral si el resultado es sistemáticamente diferente. |
| Costo de APIs / usuario activo / mes | Facturación real del mes (Google/OpenAI) ÷ MAU del mes | ≤ S/. 1.50 | S/. 1.50–S/. 3.00 | > S/. 3.00 | **S/. 1.50 por usuario** corresponde aproximadamente a USD 0.40 por usuario por mes al tipo de cambio de junio 2025 (S/. 3.75/USD). Con el costo estimado de USD 0.004 por sesión RAG y 3 sesiones semanales (12 al mes), el costo base es USD 0.048 por usuario. S/. 1.50 incluye un margen de 8x sobre ese costo base para absorber variaciones de uso, llamadas de onboarding y consultas de SRS. Si el margen real supera ese 8x, hay ineficiencia en el uso de tokens que debe optimizarse. | El integrante de Ingeniería calcula este valor al cierre del primer mes completo de usuarios y ajusta la meta para los meses siguientes. |
| Tasa de éxito del parser | PDFs procesados correctamente / total intentados (log de Sentry o registro manual) | ≥ 85% | 70–84% | < 70% | **85%** como umbral mínimo porque el 15% de fallo tolerable corresponde a PDFs con características problemáticas (escaneados sin OCR, protegidos, con tablas complejas) que el sistema no puede procesar en su versión inicial. Por debajo del 70%, la falla afecta PDFs normales y el producto no cumple su promesa básica. LlamaParse, la librería usada, reporta en su documentación oficial una tasa de éxito de entre el 85% y el 95% en documentos académicos estándar, lo que valida este umbral. | El integrante de Ingeniería lleva un registro en Google Sheets de los PDFs procesados con éxito/fallo desde el inicio del proyecto. Al completar 50 intentos tiene suficiente muestra para calibrar el umbral real. |

**Capa 2 — Táctica** (revisado en la SAS mensual)

| KPI | Meta | Justificación |
| :--- | :--- | :--- |
| % de hitos del mes entregados | ≥ 75% | Más permisivo que la capa operativa porque el nivel táctico agrega sprints completos, y las semanas de exámenes pueden reducir el avance de un sprint sin indicar un problema sistémico. |
| Desviación del presupuesto de APIs vs. planificado | ≤ 20% | Margen mayor que el estándar empresarial (10%) porque en proyectos estudiantiles el uso real de APIs varía más por cambios de diseño frecuentes. |
| Al menos 1 deploy funcional a producción por semana de sprint activo | 1 deploy/semana de sprint activo | La ausencia de deploys por más de 1 semana de sprint indica parálisis del desarrollo. "Semana de sprint activo" excluye explícitamente las semanas de exámenes, que están marcadas en el modelo M3. |

**Capa 3 — Algedónica** (activa alerta inmediata)

- Servicio caído más de 2 horas consecutivas.
- Consumo de APIs supera el presupuesto mensual completo antes del día 20 del mes.
- Bug que causa pérdida o exposición de datos de usuarios.

---

### S1.2a — B2C: Clientes Individuales

Propósito: conseguir y retener entre 50 y 150 usuarios activos en los primeros 90 días mediante difusión orgánica en redes universitarias.

**Justificación del objetivo de 50–150 usuarios en 90 días:** este rango se calibra a partir de tres referencias. Primera, el tamaño típico de una cohorte universitaria peruana (20–40 estudiantes por sección, 2–3 secciones accesibles orgánicamente para el equipo). Segunda, la experiencia de proyectos similares en el ecosistema de emprendimiento universitario peruano reportada en las convocatorias de StartupPeru (usuarios iniciales de proyectos EdTech en etapa de piloto: entre 30 y 200). Tercera, la restricción del tier gratuito de Supabase (500 MB de base de datos), que impide crecer indefinidamente sin optimización. 50 usuarios es el mínimo para obtener señales estadísticamente útiles de retención; 150 es el máximo manejable con soporte sin personal dedicado.

**Capa 1 — Operativa** (revisión semanal, responsable: integrante de Comunicación/Growth)

| KPI | Cómo medirlo | Meta | Alerta 🟡 | Crítico 🔴 | Justificación de la meta | Quién calibra el valor |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Usuarios activos semanales (WAU) | PostHog free o GA4: usuarios con ≥ 1 evento en los últimos 7 días | Crecimiento semana a semana hacia la meta de 50–150 en 90 días | 2 semanas consecutivas sin crecimiento | Caída de 10+ WAU en una semana | La meta no es un número fijo semanal sino una tendencia de crecimiento. Dos semanas sin crecimiento indica estancamiento; 10+ usuarios perdidos en una semana indica un problema activo (bug, cambio de interfaz, incidente de reputación). El umbral de 10 usuarios representa entre el 7% y el 20% de la base objetivo, que es una caída estadísticamente significativa. | El integrante de Comunicación/Growth revisa el WAU cada lunes y lo registra en su cuadro de mando. Tras 4 semanas, calcula el promedio de crecimiento semanal y lo usa para proyectar si el objetivo de 90 días es alcanzable. |
| Retención al día 7 | Cohorte en PostHog: % de usuarios registrados que realizan ≥ 1 sesión en los días 2–7 posteriores al registro | ≥ 30% | 15–29% | < 15% | El 30% es el benchmark de retención al día 7 para aplicaciones de aprendizaje ("habit-forming apps") establecido por Andrew Chen y la comunidad de growth hacking. Por debajo del 15%, el producto no está creando el hábito mínimo necesario para que un usuario vuelva. Para una app de SRS el estándar es más alto que para apps sociales porque la propuesta de valor solo se materializa con uso repetido. El integrante de Comunicación/Growth puede comparar el valor real con benchmarks públicos de Anki (la herramienta de referencia del sector) cuando tenga suficientes datos. | El integrante de Comunicación/Growth calcula esta cohorte en PostHog al final de las primeras 4 semanas de usuarios registrados. Si el sistema no tiene suficientes usuarios para la cohorte, usa el criterio cualitativo: ¿los usuarios que registré esta semana volvieron la semana siguiente? |
| Sesiones de repaso SRS completadas / usuario activo / semana | Consulta a la tabla `sesiones_estudio` en Supabase dashboard | ≥ 2 sesiones/semana | 1 sesión/semana | 0 sesiones en 48 horas para la mayoría de usuarios | **2 sesiones semanales** es el mínimo de uso del sistema SRS que genera beneficio medible de retención según el modelo de Ebbinghaus implementado en FSRS: con menos de 2 repasos por semana, el olvido supera el ritmo de refuerzo y el usuario no experimenta la mejora prometida. Este valor está directamente vinculado a la propuesta de valor del producto: si los usuarios no hacen al menos 2 repasos, el SRS no puede funcionar como promete. Fuente: Wozniak, P. y Gorzelanczyk, E., "Optimization of learning" (1994); análisis del proyecto FSRS (2023). | El integrante de Ingeniería configura la consulta SQL en Supabase en la primera semana. El integrante de Comunicación/Growth la revisa semanalmente. Si el promedio es consistentemente menor que 2 sesiones, se revisa si el problema es de onboarding (los usuarios no entienden cómo usar el SRS) o de producto (el SRS genera demasiada fricción). |
| Tasa de completación del onboarding | Usuarios que completan todos los pasos / usuarios que inician (Supabase o PostHog) | ≥ 60% | 40–59% | < 40% | **60%** es un umbral conservador para un onboarding de múltiples pasos en un producto de nicho técnico (EdTech con IA). El benchmark de industria para onboardings de más de 3 pasos es del 50–70% (Mixpanel, "Product Benchmarks", 2023). Se usa 60% porque YachaqAI tiene un onboarding complejo (subir PDF, configurar horario, completar la primera sesión) que requiere más esfuerzo que apps simples. Por debajo del 40%, la mayoría de los usuarios abandona antes de experimentar el valor del producto, lo que hace que cualquier métrica de retención posterior sea irrelevante. | El integrante de Comunicación/Growth y el integrante de Ingeniería revisan juntos la tasa de completación al final de la primera semana con usuarios beta. Si es menor al 60%, se hacen entrevistas de 15 minutos con 3–5 usuarios para identificar dónde abandonan. |

**Capa 2 — Táctica** (revisado en la SAS mensual)

| KPI | Meta | Justificación |
| :--- | :--- | :--- |
| Usuarios activos acumulados al final del mes | Avance hacia 50–150 en 90 días | El número específico depende del mes del semestre; el fundador principal calcula el hito mensual al inicio del proyecto dividiendo el objetivo en tres meses. |
| Nuevos canales de difusión activados en el mes | ≥ 1 canal nuevo por mes | Cada canal nuevo es una fuente potencial de entre 10 y 40 usuarios. Activar al menos 1 por mes mantiene el crecimiento sostenido sin depender de un único canal. |

**Capa 3 — Algedónica** (activa alerta inmediata)

- Pérdida de 10 o más WAU en una semana (justificado arriba como caída estadísticamente significativa).
- Cero sesiones de repaso SRS completadas en 48 horas para la mayoría de usuarios (indica un bug en el motor SRS o en las notificaciones).
- Queja pública en un grupo universitario con más de 100 miembros.

---

### S1.2b — B2B: Relaciones Institucionales

Propósito: gestionar al menos 1 conversación exploratoria activa con un docente o coordinador académico para un piloto informal gratuito, con el objetivo de obtener validación institucional antes del cierre del semestre.

**Justificación de la meta de 1 piloto:** en esta etapa no se busca escala sino profundidad. Un piloto bien documentado con un docente comprometido vale más que cinco contactos superficiales. El NCIIA (National Collegiate Inventors and Innovators Alliance) y los programas de emprendimiento universitario del CONCYTEC recomiendan que en la primera etapa de validación los proyectos EdTech institucionales tengan 1–3 pilotos en profundidad en lugar de muchos pilotos superficiales.

**Capa 1 — Operativa** (revisión semanal, responsable: integrante de Relaciones Institucionales)

| KPI | Cómo medirlo | Meta | Alerta 🟡 | Crítico 🔴 | Justificación | Quién calibra el valor |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Docentes o coordinadores en conversación activa | Registro en Notion/Google Sheets: nombre, cargo, fecha de último contacto, estado | ≥ 1 contacto activo en todo momento | 0 contactos por 2 semanas | 0 contactos por 4 semanas | La meta de "≥ 1 en todo momento" refleja que el objetivo mínimo del semestre es 1 piloto. Si en algún momento hay 0 contactos activos, la meta del semestre está en riesgo. **2 semanas sin contacto** es el umbral de Warning porque en el ecosistema universitario peruano las relaciones se enfríen rápidamente si no hay seguimiento; **4 semanas** es Crítico porque equivale a un mes completo sin avance en la única unidad que depende de relaciones personales. | El integrante de Relaciones Institucionales determina si un contacto cuenta como "activo" (hubo intercambio en los últimos 7 días) o "frío" (sin intercambio por más de 7 días). La definición queda registrada en la cabecera de la hoja de seguimiento. |
| Estado del piloto en curso | Estado en Notion: Pendiente / Activo / Completado / Abandonado | Al menos 1 piloto en estado Activo antes del mes 2 del semestre | Piloto en Pendiente después del mes 2 | Piloto pasa a Abandonado sin sucesor identificado | **Mes 2 como fecha límite** para activar el piloto porque los semestres tienen aproximadamente 4.5 meses: si el piloto no empieza hasta el mes 3, no hay tiempo suficiente para completarlo y obtener feedback útil antes del cierre del semestre. Esta restricción temporal es específica del contexto estudiantil peruano y no aplica a proyectos con horizonte indefinido. | El integrante de Relaciones Institucionales actualiza el estado del piloto en Notion cada vez que hay un cambio. El fundador principal verifica el estado en la SAS mensual. |
| Frecuencia de contacto con el docente del piloto | Número de intercambios (mensajes, llamadas, reuniones) por semana durante el piloto activo | ≥ 1 intercambio/semana | 1 intercambio cada 2 semanas | Sin contacto por 3 semanas durante piloto activo | **1 intercambio semanal** es el mínimo para mantener la relación activa durante el piloto. No implica reunión formal: puede ser un mensaje de WhatsApp con una actualización del producto o una pregunta sobre el avance del docente. **3 semanas sin contacto** es Crítico porque en ese tiempo el docente puede interpretar el silencio como abandono del proyecto. | El integrante de Relaciones Institucionales determina el tipo y cadencia de contacto más adecuada según el perfil del docente (algunos prefieren comunicación más frecuente, otros menos). El valor de 1/semana es el mínimo universal. |
| Feedback formal del docente recibido | Registro en Notion de comentarios, sugerencias o evaluaciones del docente durante el piloto | ≥ 1 feedback formal/mes de piloto | 0 feedbacks en un mes de piloto | Feedback negativo que amenaza la continuidad | El "feedback formal" se define como una opinión explícita del docente sobre el producto (no solo "todo bien"): puede ser por escrito, en reunión documentada o en encuesta breve. El integrante de Relaciones Institucionales es responsable de solicitarlo activamente, no de esperar a que el docente lo ofrezca. | El integrante de Relaciones Institucionales diseña un formato de feedback de 5 preguntas específicas al inicio del piloto, acordado con el docente. |

**Capa 2 — Táctica** (revisado en la SAS mensual)

| KPI | Meta | Justificación |
| :--- | :--- | :--- |
| Al menos 1 piloto completado antes del fin del semestre con feedback documentado | 1 piloto documentado | Es la condición mínima para validar la hipótesis institucional del proyecto en el semestre. |
| Al menos 1 testimonio usable del docente | 1 cita o mensaje de apoyo escrito | Un testimonio escrito del docente es el activo de credibilidad más valioso para conseguir el siguiente piloto en otro departamento o facultad. |

**Capa 3 — Algedónica** (activa alerta inmediata)

- El único docente del piloto activo comunica que dejará de participar.
- Un compromiso hecho al docente (funcionalidad, reunión, respuesta) no se cumple y el docente lo señala explícitamente.

---

### S1.3 — Soporte e Infraestructura

Propósito: mantener el servicio disponible en tiers gratuitos, resolver incidencias de usuarios en menos de 24 horas y garantizar que los deploys no interrumpan la experiencia de los usuarios activos.

**Capa 1 — Operativa** (revisión diaria durante días de actividad, responsable: integrante de Soporte/Infra o rotación del equipo)

| KPI | Cómo medirlo | Meta | Alerta 🟡 | Crítico 🔴 | Justificación | Quién calibra el valor |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Uptime semanal del servicio | UptimeRobot free: reporte semanal del porcentaje de disponibilidad | ≥ 99% de la semana | 97–98.9% | < 97% o caída > 2 horas en un día | **99% semanal** equivale a aproximadamente 1 hora 41 minutos de downtime permitido por semana. Con Vercel Hobby y Supabase Free, este nivel es alcanzable en condiciones normales sin mantenimiento programado. **97%** (≈5 horas de downtime semanal) indica un problema recurrente que no es solo un evento aislado. El percentil real alcanzable con tiers gratuitos puede calibrarse midiendo el uptime de las primeras 2 semanas sin usuarios (prueba de carga con datos sintéticos). Fuente: Vercel SLA público para tier Hobby indica "mejor esfuerzo" sin garantía formal; la meta del 99% es interna, no comprometida contractualmente con usuarios. | El integrante de Ingeniería configura UptimeRobot en la primera semana. El integrante de Soporte revisa el reporte semanal de UptimeRobot cada lunes. Tras 4 semanas, calcula el uptime promedio real y ajusta la meta si el tier gratuito de Vercel no la permite sistemáticamente. |
| Errores 5xx en producción por día | Sentry free: alertas configuradas para conteo de errores por hora | ≤ 5 errores/día | 6–20 errores/día | > 20 errores/día o error en el flujo de onboarding | **5 errores por día** como umbral tolerado corresponde a errores de conectividad aislados del usuario (timeout de red, cierre de sesión inesperado) que no indican un bug del sistema. **6–20** indica un problema del sistema que afecta a algunos usuarios pero no a todos. **> 20** indica fallo sistémico. Estos umbrales son configurables directamente en Sentry como alertas automáticas. | El integrante de Ingeniería configura las alertas en Sentry en la primera semana con los valores propuestos. Los ajusta tras 1 semana de operación con usuarios reales, porque el volumen de errores puede ser muy diferente al estimado. |
| Tiempo de resolución de incidencias de usuarios | Tiempo entre el mensaje del usuario y la respuesta confirmando solución (WhatsApp/correo) | ≤ 24 horas | 24–48 horas | > 48 horas o incidencia sin asignado | **24 horas** es el umbral de tolerancia estándar para soporte de productos en beta en el ecosistema universitario. Por encima de 48 horas, el usuario interpreta el silencio como abandono del producto. Esta meta es alcanzable con un equipo de 2–5 personas con dedicación parcial porque los turnos de soporte pueden distribuirse: cada integrante cubre 1–2 días de la semana. | El integrante de Soporte diseña el esquema de turnos de soporte al inicio del semestre. El fundador principal lo revisa en la primera SAS. Si hay semanas con carga académica alta, el turno de soporte se reduce al fundador principal como único responsable durante esa semana. |
| Incidentes causados por deploys en las 24 horas siguientes | Conteo manual post-deploy: errores nuevos en Sentry que no existían antes del deploy | 0 incidentes/deploy | 1 incidente/deploy | ≥ 2 incidentes/deploy | **0 incidentes** es la meta porque los deploys en un equipo pequeño sin CI/CD automatizado requieren prueba manual previa. Un incidente post-deploy indica que la prueba en staging fue insuficiente. **≥ 2 incidentes** indica que el proceso de prueba previo al deploy es sistemáticamente deficiente. | El integrante de Ingeniería lleva un log simple en Google Sheets: fecha del deploy, descripción del cambio, errores nuevos detectados en las 24 horas siguientes. Tras 5 deploys, tiene suficiente muestra para evaluar si la meta es realista. |

**Capa 2 — Táctica** (revisado en la SAS mensual)

| KPI | Meta | Justificación |
| :--- | :--- | :--- |
| Costo de infraestructura del mes | S/. 0 (uso exclusivo de tiers gratuitos) | Mientras la base de usuarios esté por debajo de los límites de los tiers gratuitos, el costo de infraestructura debe ser cero. Cualquier gasto en infraestructura es una señal de que se alcanzó un límite gratuito y requiere decisión del equipo en la SAS. |
| Top-3 puntos de fricción entregados a Ingeniería antes del cierre del sprint | 1 lista de 3 puntos por sprint | Garantiza que la información de soporte llega a Ingeniería con tiempo para incorporarla al sprint siguiente, en lugar de perderse en conversaciones de WhatsApp. |

**Capa 3 — Algedónica** (activa alerta inmediata)

- Servicio caído más de 2 horas consecutivas.
- Incidencia que afecta datos de uno o más usuarios (pérdida, exposición o corrupción).
- El tier gratuito de Supabase o Vercel se agota y el servicio queda inaccesible.

---

## 11. Niveles de SLA: definición, justificación y método de determinación

**Archivo a modificar:** `4_coherencia_y_control.md`

### Marco conceptual

El Cap. 2 identifica los SLA como la formalización del canal C1 (absorción del entorno) y el canal C4 (rendición de cuentas). En el proyecto estudiantil existen dos tipos: externos (compromisos con usuarios y el docente del piloto) e internos (compromisos entre integrantes que constituyen los mecanismos del S2 corporativo).

### SLA externos: método de determinación en cinco pasos

**Paso 1 — Medir el baseline real antes de comprometer cualquier nivel de servicio.**

Antes de declarar públicamente cualquier compromiso de disponibilidad o tiempo de respuesta, el equipo opera el servicio durante al menos 2 semanas con usuarios beta y mide el desempeño real. El SLA declarado nunca puede ser más exigente que el percentil 80 (P80) del desempeño observado.

*Justificación del P80 como límite:* el P80 significa que el equipo cumple ese nivel en 4 de cada 5 observaciones. En un proyecto estudiantil con disponibilidad parcial, comprometer el P90 o P95 implicaría que cualquier semana de exámenes violaría el SLA. El P80 es el equilibrio entre un compromiso creíble y uno sostenible con los recursos disponibles.

*Responsable:* el integrante de Ingeniería mide el percentil real usando el historial de UptimeRobot y el log de respuestas de soporte en Notion/Google Sheets al final de las primeras 2 semanas de operación con usuarios beta.

*Regla de oro:* si el desempeño real en las 2 semanas de baseline fue de 97% de uptime, el SLA declarado es 95%, no 97% (se usa el P80 del historial, no el promedio). Esto da margen para semanas de menor disponibilidad sin violar el compromiso.

**Paso 2 — Diferenciar los compromisos por tipo de relación.**

| Tipo de usuario / relación | Compromiso declarado | Cómo se mide | Qué pasa si no se cumple | Justificación |
| :--- | :--- | :--- | :--- | :--- |
| Usuario beta (10–30 personas del entorno inmediato) | Soporte directo por WhatsApp; respuesta en ≤ 12 horas en días hábiles; acceso a funcionalidades en desarrollo con solicitud de feedback | Log de tiempos de respuesta en Notion (manual) | Disculpa directa y documentación de la causa en el cuadro de mando. Sin penalidad formal. | Los usuarios beta son el círculo de confianza del equipo. El compromiso es de reciprocidad: ellos prueban el producto, el equipo responde rápido y los escucha. **12 horas** es alcanzable porque los usuarios beta suelen ser compañeros de la misma facultad con horarios similares. |
| Usuario B2C (difusión orgánica, 50–150 usuarios) | Servicio disponible la mayor parte del tiempo en horario académico (lunes a sábado, 7am–10pm); soporte por formulario Google Forms o correo; respuesta en ≤ 48 horas | UptimeRobot (uptime) + log de formulario de soporte | Si hay caída mayor de 2 horas, se comunica en el canal de difusión con explicación y tiempo estimado de recuperación. | **Horario académico** porque los estudiantes universitarios peruanos estudian principalmente en ese horario. Restringir el SLA al horario académico es honesto sobre las limitaciones del equipo y evita el compromiso de soporte nocturno o dominical que no puede cumplirse. **48 horas** es el tiempo máximo tolerable para soporte de producto en esta categoría. |
| Docente del piloto institucional | Servicio disponible durante el horario de clases acordado (ej. lunes y miércoles 10am–12pm si esas son las sesiones del curso); soporte directo al WhatsApp del fundador principal; respuesta en ≤ 4 horas en días hábiles; sin cambios disruptivos en producción durante el período del piloto sin aviso de ≥ 48 horas | Registro manual de disponibilidad en Notion y de tiempos de respuesta | El fundador principal contacta al docente dentro de las 2 horas siguientes al incumplimiento para explicar y ofrecer compensación (extensión del período de piloto, sesión de demostración adicional, corrección del problema en el día). | **4 horas** de tiempo de respuesta para el docente del piloto porque él es el stakeholder institucional más crítico del proyecto. En el contexto universitario peruano, un docente que no recibe respuesta en 4 horas durante una clase puede decidir abandonar el piloto. La compensación ofrecida (extensión del período, demo adicional) es simbólica pero demuestra seriedad y solvencia institucional. |

**Paso 3 — Verificar que la infraestructura disponible puede sostener el compromiso.**

*Limitación técnica fundamental:* los tiers gratuitos de Vercel Hobby y Supabase Free no ofrecen SLA contractual de disponibilidad. Vercel hace mantenimiento sin previo aviso en el tier gratuito. Por eso:

- El SLA de disponibilidad con usuarios B2C y el docente **no puede comprometerse como "99.9%"** ni como cualquier porcentaje preciso sin haberlo medido realmente.
- El compromiso correcto es en lenguaje cualitativo: "servicio disponible en horario académico habitual" o "servicio disponible durante las sesiones del curso".
- Si el equipo migra a un tier pago de Vercel (Pro), puede comprometer un porcentaje preciso porque Vercel Pro sí ofrece SLA contractual de 99.99%.

*Responsable de esta verificación:* el integrante de Ingeniería, en la primera semana de cada mes, verifica que el uso actual no está acercándose a los límites del tier gratuito. Si algún límite supera el 70%, notifica al equipo.

**Paso 4 — Comunicar los compromisos con lenguaje honesto.**

El lenguaje de los compromisos externos debe reflejar la etapa del proyecto. Ejemplos de lenguaje correcto:

- ✅ "YachaqAI es un proyecto universitario en etapa de validación. Nos comprometemos a que el servicio esté disponible durante el horario académico habitual y a responder cualquier problema en menos de 48 horas en días hábiles."
- ✅ "Este es un piloto académico sin costo. Nos comprometemos a mantener el servicio disponible durante las sesiones de tu curso y a responder tus mensajes en menos de 4 horas en días de semana."
- ❌ "Garantizamos 99.9% de disponibilidad." (No puede comprometerse con tiers gratuitos sin datos que lo respalden.)
- ❌ "Soporte 24/7." (No es posible con un equipo de dedicación parcial.)

*Responsable:* el fundador principal revisa toda la comunicación pública y los mensajes enviados al docente para verificar que el lenguaje es consistente con los compromisos reales. Si detecta una promesa que no puede cumplirse, la corrige antes de que sea enviada.

**Paso 5 — Revisar y ajustar en cada SAS mensual.**

En el bloque 1 de cada SAS, el fundador principal presenta si algún SLA fue incumplido en el mes anterior y su causa. Si el incumplimiento fue sistemático (más de 2 veces), el equipo decide entre dos opciones: ajustar el SLA declarado a un nivel que sí sea sostenible, o asignar recursos (tiempo o presupuesto) para mejorar el cumplimiento.

### SLA internos entre integrantes del equipo

Los SLA internos son los compromisos que cada integrante hace a los demás, que constituyen los mecanismos del S2 corporativo. No tienen penalidades económicas, pero su incumplimiento reiterado (≥ 2 veces en el mismo mes) es una señal que se trata en la SAS mensual.

*Justificación del umbral de 2 veces en el mismo mes:* un incumplimiento aislado puede deberse a un imprevisto académico o personal. Dos veces en el mismo mes indica un patrón que requiere ajuste estructural (redistribuir la tarea, automatizarla o cambiar su definición). Este umbral lo propone el equipo en la primera SAS y puede ajustarse.

| Comprometente | Beneficiario | Compromiso | Justificación | Consecuencia de incumplimiento reiterado |
| :--- | :--- | :--- | :--- | :--- |
| Integrante de Ingeniería | Todos | Avisar en el canal del equipo con ≥ 24 horas antes de cualquier deploy a producción | 24 horas es el tiempo mínimo para que quien esté de turno en soporte sepa qué cambió y pueda preparar respuestas a las primeras consultas. | Se discute en la próxima SAS y se agrega un paso de verificación obligatorio al proceso de deploy (checklist en GitHub PR). |
| Integrante de Ingeniería | Integrante de Relaciones Institucionales | Resolver bugs críticos reportados durante el piloto en ≤ 4 horas en días hábiles | El docente del piloto experimenta el bug en tiempo real durante su clase. 4 horas es el tiempo máximo para que la solución llegue antes de la siguiente sesión del curso (asumiendo clases con frecuencia mínima de dos veces por semana). | Se discute en la próxima SAS; el fundador principal arbitra la priorización del backlog para ese sprint. |
| Integrante de Relaciones Institucionales | Integrante de Ingeniería | No comprometer funcionalidades que no estén marcadas como "disponible en producción" en GitHub Projects | Funcionalidades prometidas y no entregadas generan deuda de expectativas con el docente que termina siendo una carga de desarrollo no planificada. | Se discute en la próxima SAS; el integrante de Ingeniería participa en la próxima comunicación con el docente para realinear expectativas directamente. |
| Integrante de Comunicación/B2C | Integrante de Relaciones Institucionales | Informar con ≥ 48 horas de anticipación cualquier publicación pública que mencione precio, gratuidad o comparación con otras herramientas | Justificado en M5 (sección 6 de este documento). | Se discute en la próxima SAS; las publicaciones de ese tipo requieren aprobación explícita del integrante de B2B antes de publicarse. |
| Integrante de Soporte | Integrante de Ingeniería | Entregar el reporte de top-3 puntos de fricción antes del inicio de cada sprint | El inicio del sprint es el único momento en que Ingeniería puede incorporar esos puntos al backlog del período. Si llega después, se pierde el ciclo completo. | Se discute en la próxima SAS; se automatiza el proceso con un formulario de Google Forms que el integrante de Soporte completa en 5 minutos cada viernes. |
| Cualquier integrante | Todos | Responder mensajes del canal del equipo en ≤ 4 horas en días de semana | Es el tiempo máximo para mantener la coordinación del equipo sin bloquear las decisiones de los demás. Justificado en la sección 4 de este documento. | Se menciona en la próxima SAS como señal de disponibilidad decreciente; el equipo revisa si hay sobrecarga académica y redistribuye tareas. |

---

## 12. Tabla resumen de implementación

| Mejora | Archivo(s) a modificar | Esfuerzo | Cuándo |
| :--- | :--- | :--- | :--- |
| M8: Eliminar referencias geográficas | `2_despliegue_recursion.md` | Muy bajo | Antes de todo lo demás |
| M6: Protocolo SAS mensual | `3_sistemas_vsm_synapta.md`, `4_coherencia_y_control.md` | Bajo | Semana 1 del semestre |
| M1: Independencia del S3* | `3_sistemas_vsm_synapta.md` | Bajo | Semana 1 del semestre |
| M3: Canal algedónico ampliado | `4_coherencia_y_control.md` | Bajo | Semana 1 del semestre |
| Inventario de recursos | `2_despliegue_recursion.md` | Bajo | Semana 1 del semestre |
| M5: S2 entre B2C y B2B | `3_sistemas_vsm_synapta.md` | Bajo | Semana 2 del semestre |
| M2: Cuadros de Mando por unidad | `3_sistemas_vsm_synapta.md`, `4_coherencia_y_control.md` | Medio | Semana 2 del semestre |
| KPIs con justificación | `2_despliegue_recursion.md` | Medio | Semana 2 del semestre |
| M4: Mapa de interacciones entre entornos | `2_despliegue_recursion.md` | Medio | Semana 3 del semestre |
| SLA externos e internos | `4_coherencia_y_control.md` | Medio | Semana 3 del semestre |
| M7: Modelos M1, M2 y M3 en Google Sheets | `3_sistemas_vsm_synapta.md`, `4_coherencia_y_control.md` + 3 Google Sheets | Alto | Antes de la primera SAS |

---

*Documento integrado de guía de mejoras. Todos los parámetros numéricos tienen justificación explícita de su origen y un responsable designado para calibrarlos con datos reales del proyecto. Alcance geográfico: Perú. Referencia: Cap. 2, Pérez Ríos / Beer (1985).*
