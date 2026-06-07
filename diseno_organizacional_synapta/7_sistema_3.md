# 7_sistema_3

> **Referencia Metodológica (Pérez Ríos / Stafford Beer):** El Sistema 3 (S3) es el metasistema responsable de la gestión operativa del "aquí y ahora". Su misión es asegurar la cohesión interna actual de la organización, negociar recursos (Canal 4) y ejercer el control y la rendición de cuentas (Accountability) de las unidades del Sistema 1. A diferencia de los sistemas orientados al futuro (S4) y a las políticas (S5), el S3 se enfoca en la estabilidad y sinergia operativa del presente inmediato. Este archivo presenta el diseño detallado del Sistema 3 de Synapta (YachaqAI).


## Tabla de Contenidos

- [1. Introducción al Diseño del Sistema 3](#1-introduccion-al-diseno-del-sistema-3)
- [2. Fundamentación del Sistema 3](#2-fundamentacion-del-sistema-3)
- [3. Requerimientos de Gestión Derivados del Sistema 1](#3-requerimientos-de-gestion-derivados-del-sistema-1)
- [4. Diseño de la Estructura de Dirección Interna](#4-diseno-de-la-estructura-de-direccion-interna)
  - [4.1 Diseño de la Sala de Operaciones Virtual (Operations Room)](#41-diseno-de-la-sala-de-operaciones-virtual-operations-room)
- [5. Diseño del Sistema de Asignación de Recursos (Canal 4)](#5-diseno-del-sistema-de-asignacion-de-recursos-canal-4)
  - [5.1 El Proceso de Negociación: La SAS Mensual](#51-el-proceso-de-negociacion-la-sas-mensual)
  - [5.2 Estructura de los 8 Componentes del Canal 4 (Recursos)](#52-estructura-de-los-8-componentes-del-canal-4-recursos)
  - [5.3 Tabla de Asignación de Recursos y Entregables Pactados (Fase 1)](#53-tabla-de-asignacion-de-recursos-y-entregables-pactados-fase-1)
- [6. Diseño del Sistema de Monitoreo y Control (Rendición de Cuentas)](#6-diseno-del-sistema-de-monitoreo-y-control-rendicion-de-cuentas)
  - [6.1 Estructura de los 8 Componentes del Canal de Rendición de Cuentas](#61-estructura-de-los-8-componentes-del-canal-de-rendicion-de-cuentas)
  - [6.2 Reglas de Escalamiento Operativo por Semáforos](#62-reglas-de-escalamiento-operativo-por-semaforos)
- [7. Diseño del Sistema de Auditoría y Verificación (Sistema 3*) (Canal 6)](#7-diseno-del-sistema-de-auditoria-y-verificacion-sistema-3-canal-6)
  - [7.1 El Principio de Rotación Cruzada e Independencia](#71-el-principio-de-rotacion-cruzada-e-independencia)
  - [7.2 Herramientas de Auditoría S3* e Inyección Directa de Datos](#72-herramientas-de-auditoria-s3-e-inyeccion-directa-de-datos)
  - [7.3 Estructura de los 8 Componentes del Canal 6 (Auditoría)](#73-estructura-de-los-8-componentes-del-canal-6-auditoria)
- [8. Análisis de Variedad y Regulación Interna](#8-analisis-de-variedad-y-regulacion-interna)
- [9. Relación Sistema 3 - Sistema 4 (Homeostato S3-S4)](#9-relacion-sistema-3-sistema-4-homeostato-s3-s4)
  - [9.1 Mecanismos Asíncronos Continuos de Sincronización](#91-mecanismos-asincronos-continuos-de-sincronizacion)
  - [9.2 Protocolo Democrático de Team Syntegrity (Resolución de Conflictos S3-S4)](#92-protocolo-democratico-de-team-syntegrity-resolucion-de-conflictos-s3-s4)
- [10. Riesgos de Inviabilidad Asociados al Sistema 3](#10-riesgos-de-inviabilidad-asociados-al-sistema-3)
  - [10.1 Patología: "Esquizofrenia de la Gestión"](#101-patologia-esquizofrenia-de-la-gestion)
  - [10.2 Patología: "Conexión Débil o Inexistente con el Sistema 1"](#102-patologia-conexion-debil-o-inexistente-con-el-sistema-1)
- [11. Diseño del Canal 3 (Instrucciones Corporativas y Transmisión del Ethos)](#11-diseno-del-canal-3-instrucciones-corporativas-y-transmision-del-ethos)
  - [11.1 Estructura de los 8 Componentes del Canal 3 (Instrucciones)](#111-estructura-de-los-8-componentes-del-canal-3-instrucciones)
- [12. Validación del Diseño del Sistema 3](#12-validacion-del-diseno-del-sistema-3)
- [13. Conclusiones](#13-conclusiones)
- [Fuentes Citadas](#fuentes-citadas)

---

---

## 1. Introducción al Diseño del Sistema 3

El Sistema 3 de Synapta se conceptualiza como la **Dirección y Gestión Operativa Central** encargada de coordinar el "aquí y ahora" de la organización. Su función principal es doble:
1. **Garantizar la estabilidad interna actual:** Supervisar que la interacción entre las unidades operativas (S1.1 Ingeniería, S1.2 Growth/B2C, S1.3 Ventas B2B, S1.4 Soporte/Infra) se mantenga en equilibrio homeostático, evitando que las fallas diarias detengan la operación.
2. **Asegurar la entrega de valor de YachaqAI:** Coordinar que las unidades del S1 produzcan de manera efectiva el software RAG-FSRS, adquieran y retengan a los estudiantes universitarios y ejecuten exitosamente los pilotos docentes institucionales.

El S3 en Synapta no define la visión a largo plazo (eso es competencia del S4/S5) ni realiza la codificación técnica (función del S1.1). Su responsabilidad exclusiva es **hacer que el sistema operativo actual funcione de forma eficiente, cohesionada y sostenible**.

---

## 2. Fundamentación del Sistema 3

La misión de cohesión del S3 exige descubrir, regular y explotar activamente las **sinergias operacionales** resultantes de las interacciones horizontales del Sistema 1. Sin la intervención cohesiva del S3, las unidades operativas actuarían de manera fragmentada o competitiva ("silos aislados"), destruyendo el valor global.

En Synapta, el S3 explota tres sinergias inter-unidades críticas:

```
                      [S3 Gestión Operativa Cohesiva]
                                     │
           ┌─────────────────────────┼─────────────────────────┐
     Sinergia Técnica          Sinergia Comercial        Sinergia de CS-CAC
     (Ingeniería-Infra)         (B2C - B2B Sales)          (Soporte-Growth)
           │                         │                         │
  Uso de Supabase/pgvector     Funnel PostHog guía       Uptime y CS reduce
  y microservicios modulares   segmentación de Ventas    churn D7 y baja CAC
```

1. **Sinergia Técnica (S1.1 ◄──► S1.4):** Ingeniería y Soporte/Infra utilizan el mismo stack tecnológico unificado (Vercel para Next.js, Supabase para PostgreSQL/pgvector) [4, 5]. Esto permite compartir patrones de optimización y bases de conocimiento, eliminando la duplicación de costos de herramientas y acelerando la resolución de incidencias.
2. **Sinergia Comercial (S1.2 ◄──► S1.3):** Los datos de conversión estudiantil recopilados por Growth B2C en PostHog revelan qué facultades universitarias tienen mayor afinidad natural con YachaqAI. Ventas B2B utiliza estos *insights* de prueba social, logrando elevar la tasa de cierre de pilotos del benchmark estándar del 10% al **25% en el mercado EdTech peruano** [10].
3. **Sinergia de CS-CAC (S1.4 ◄──► S1.2):** La resolución rápida de bugs por Soporte en el onboarding estudiantil incrementa la retención D7. Al retener más usuarios, la pauta de adquisición orgánica del Head of Growth se vuelve más eficiente, disminuyendo el costo de adquisición de clientes (CAC).

---

## 3. Requerimientos de Gestión Derivados del Sistema 1

Para que las unidades del S1 ejerzan su autonomía operativa responsablemente, el S3 debe satisfacer y regular sus requerimientos operacionales inmediatos. Esta provisión se vincula directamente a las políticas y valores éticos establecidos por el Sistema 5:

- **Establecimiento de Metas Locales Coherentes:** El S3 traduce los lineamientos estratégicos de S5 (ej. privacidad total del alumno y democratización del aprendizaje) en metas operativas claras para cada unidad. S1.1 recibe la meta de implementar encriptación de logs; S1.3 recibe la meta de cerrar pilotos docentes con foco de inclusión.
- **Provisión de Recursos e Infraestructura:** El S3 es el responsable de garantizar los insumos necesarios para que las unidades operen:
  - *S1.1 Ingeniería:* Presupuesto mensual para APIs de Google Gemini en Vertex AI [13].
  - *S1.3 Ventas B2B:* Acceso a plantillas de convenios validadas por la asesoría legal externa.
  - *S1.4 Soporte/Infra:* Acceso a cuotas de bases de datos PostgreSQL en Supabase [14] y servidores en Vercel [15].
  - *Temporal:* Resguardo del tiempo de dedicación mixta del equipo (**15 a 25 horas semanales** [3]) respetando el calendario de exámenes de pregrado [11].

---

## 4. Diseño de la Estructura de Dirección Interna

En la Fase 1 (MVP/Validación), los roles metasistémicos de Synapta están asignados mediante un esquema de **multiactividad** coordinado por el S3 para evitar la duplicación de cargos y optimizar la capacidad de un equipo de 2 a 5 personas [9]:

- **Área de Marketing y Ventas (Growth B2C y B2B):** Gestionado de forma conjunta por el **Head of Growth** (adquisición estudiantil, pauta orgánica) y el **Head of Sales** (demos, convenios universitarios), reportando de forma unificada su pipeline.
- **Área de Recursos Humanos:** Coordinado directamente por el **CEO**, quien administra el Modelo M3 de disponibilidad temporal del equipo, ajustando la capacidad de los sprints ante hitos de carga académica o profesional [9].
- **Área de Producción e Ingeniería:** Liderado por el **CTO**, quien consolida la responsabilidad del desarrollo técnico del core RAG y la provisión de infraestructura cloud junto con el DevOps Lead.
- **Área de Contabilidad y Presupuestos (Finanzas):** Liderado por el **CFO**, quien actúa como el controlador operativo y financiero del S3 (administrando el Modelo M1, la asignación de recursos y el API burn rate) y coordina el S2 corporativo, gestionando el balance del presupuesto pre-seed (**S/. 150 - S/. 500 mensuales**) [2]. El **CEO** actúa como el decisor integrador de S3 y árbitro final de S2.

### 4.1 Diseño de la Sala de Operaciones Virtual (Operations Room)
Para que el S3 y el S4 interactúen de manera efectiva sin ahogarse en la complejidad operativa, se diseña una **Sala de Operaciones Virtual** que centraliza la visualización y modelado del MSV. Este espacio se monta sobre un dashboard unificado en Notion que consume datos automáticos de las APIs de las herramientas del S2, estructurado en cuatro paneles interactivos:
1. **Panel 1 — Desempeño Operativo Actual (S1 & S2):** Gráficos de tendencias en tiempo real: Uptime semanal de Next.js (de UptimeRobot), tasa de excepciones 5xx (de Sentry), costo diario acumulado de tokens de Gemini, y retención D7 estudiantil (de PostHog).
2. **Panel 2 — Auditorías e Integridad (S3*):** Estado y semáforo de las auditorías técnicas cruzadas del mes y del clima del equipo.
3. **Panel 3 — Modelos de Simulación Operativa (S4):** Simulador de escenarios "What-if" para proyectar la latencia de RAG y los costos de APIs en función de la demanda.
4. **Panel 4 — Representación del VSM:** Diagrama interactivo del Modelo de Sistema Viable de Synapta que muestra los estados de los semáforos de cada regulador local de manera integrada.

---

## 5. Diseño del Sistema de Asignación de Recursos (Canal 4)

La asignación de recursos a las unidades operativas se realiza de manera pactada y transparente mediante el **Canal 4 (Negociación de Recursos)**. Este sistema evita la imposición jerárquica y vincula directamente el presupuesto otorgado con metas de desempeño específicas.

### 5.1 El Proceso de Negociación: La SAS Mensual
- **Frecuencia:** Primer lunes de cada mes (duración máxima de 2 horas).
- **Participantes:** El metasistema (CEO y CFO en rol S3) y los directores locales de las unidades del S1 (CTO, Head of Growth, Head of Sales, CS Lead).
- **Procedimiento:** Cada director local presenta su proyección de costos operativos en base a la estimación del sprint. El CFO valida los recursos disponibles del presupuesto global de la startup (Fase 1: S/. 150 - S/. 500/mes) [2]. Se debate y firma el **Contrato de Asignación Operativa**.

### 5.2 Estructura de los 8 Componentes del Canal 4 (Recursos)
Para garantizar el cierre del bucle de negociación, el Canal 4 se diseña bajo la arquitectura cibernética estricta:
1. **Emisor:** Directores locales de las unidades del S1 (CTO, Heads de B2C/B2B/CS).
2. **Transductor 1 (Codificación de Salida):** Ficha de Planificación Operativa mensual que detalla los story points estimados, el presupuesto proyectado de APIs y la disponibilidad temporal del equipo en horas.
3. **Canal 1 (Vía de Ida):** Videoconferencia o reunión presencial síncrona en la SAS mensual.
4. **Transductor 2 (Decodificación de Entrada):** El CFO/CEO evalúa las solicitudes frente al modelo M1 y el presupuesto disponible, cargando las asignaciones aprobadas.
5. **Receptor:** CEO/CFO (S3 Metasistémico).
6. **Transductor 3 (Codificación de Retorno):** El receptor (CEO/CFO) firma digitalmente el Contrato de Asignación Operativa en Notion, disparando un webhook.
7. **Canal 2 (Vía de Retorno):** Slack Webhook API enviando una notificación con un botón interactivo al canal de la unidad operativa.
8. **Transductor 4 (Decodificación de Retorno):** El director de la unidad presiona el botón "Recursos Aceptados" en Slack, lo cual envía un payload interactivo que actualiza de forma automática el estado de la Ficha en Notion, informando a la dirección (Emisor original) y cerrando el ciclo. Si no hay confirmación en **24 horas hábiles**, se escala al S5.

- **Capacidad y Cadencia:** Capacidad máxima de 4 negociaciones simultáneas (una por unidad de S1). Cadencia mensual.

### 5.3 Tabla de Asignación de Recursos y Entregables Pactados (Fase 1)

| Unidad Operativa | Recurso Asignado (Pactado) | Hito/Entregable Requerido | Indicador de Desempeño (KPI) |
| :--- | :--- | :--- | :--- |
| **S1.1 Ingeniería** | S/. 200/mes (API Gemini & LlamaParse) + 20h/sem de desarrollo [13]. | Despliegue de la API de FastAPI con parser académico estable en staging. | Tasa de éxito del parser ≥ 85% [6] y completación de sprint ≥ 80% [7]. |
| **S1.2 Growth B2C** | S/. 50/mes (pauta orgánica) + 12h/sem del Head of Growth. | Registro de 50 usuarios universitarios peruanos activos orgánicos. | Tasa de retención D7 ≥ 25% [4] y WAU en crecimiento constante. |
| **S1.3 Ventas B2B** | S/. 50/mes (viáticos/demos) + 10h/sem del Head of Sales. | Cierre de 1 piloto docente activo en universidad SUNEDU [3]. | 1 Docente activo y tiempo de cierre de piloto ≤ 8 semanas [11]. |
| **S1.4 Soporte/Infra** | S/. 100/mes (buffer de contingencia Supabase/Vercel) + 8h/sem de CS. | Mantenimiento de la plataforma activa en producción sin caídas. | Uptime semanal de servicio ≥ 99.0% [17] y resolución de tickets ≤ 24h [18]. |

---

## 6. Diseño del Sistema de Monitoreo y Control (Rendición de Cuentas)

Para evitar que el S3 colapse bajo la sobrecarga de variedad (complejidad) de las operaciones diarias, el sistema de control se estructura bajo la metodología de **Informes de Excepción**. Las unidades operan con total autonomía y solo reportan formalmente cuando sus KPIs desvían de los rangos preestablecidos.

### 6.1 Estructura de los 8 Componentes del Canal de Rendición de Cuentas
1. **Emisor:** Los Sistemas 2 locales de cada unidad del S1 (GitHub, PostHog, HubSpot, Zendesk).
2. **Transductor 1 (Codificación de Salida):** Script automático que extrae las métricas del final de la semana y las emite formateadas en un JSON estructurado.
3. **Canal 1 (Vía de Ida):** HTTPS payload enviado a través del webhook de Notion.
4. **Transductor 2 (Decodificación de Entrada):** Parser en el Notion que procesa el JSON y actualiza automáticamente los colores de los semáforos (Verde, Amarillo, Rojo) en el Panel 1 de la Sala de Operaciones.
5. **Receptor:** CEO/CFO en el S3 Metasistémico.
6. **Transductor 3 (Codificación de Retorno):** El receptor (CEO/CFO) hace clic en "Revisado/Conforme" o reacciona con `✅` al reporte en Slack.
7. **Canal 2 (Vía de Retorno):** API de Slack enviando un payload HTTP POST de vuelta a la base de datos de Notion.
8. **Transductor 4 (Decodificación de Retorno):** Notion decodifica el webhook y actualiza el estado del reporte semanal a "Atendido", notificando automáticamente al director local (Emisor original) en su panel de control que el ciclo de rendición de cuentas está cerrado.

- **Capacidad y Cadencia:** Capacidad de 1 reporte semanal unificado consolidando las 4 unidades. Cadencia semanal.

### 6.2 Reglas de Escalamiento Operativo por Semáforos
El S3 monitorea el desempeño a través del Cuadro de Mando Semanal utilizando una lógica de tres colores:

```
  🟢 Estado Verde  ──► Desempeño OK. Autonomía total de la unidad. S3 no interviene.
  🟡 Estado Amarillo ─► Desviación menor. El director local envía un "Reporte de Excepción"
                        con causa y plan de acción. S3 monitorea en la SAS.
  🔴 Estado Rojo   ──► Desviación crítica. Se suspende la autonomía local temporalmente.
                        El S3 interviene de forma directa y convoca SAS extraordinaria.
```

- **Estado Verde (Operación Normal):** Métrica dentro de la meta saludable (🟢). El director local posee autonomía absoluta. No se requiere reporte adicional.
- **Estado Amarillo (Alerta de Excepción):** Métrica cae en el rango de alerta (🟡) por 1 semana (ej. Uptime 97-98.9% o Sprint completado 60-79%).
  - *Acción:* El director local debe registrar en el canal `#ops-exceptions` una **Ficha de Excepción** de máximo 150 palabras detallando la causa raíz y el plan de mitigación a nivel S2 local.
- **Estado Rojo (Alarma Crítica):** Métrica entra en zona crítica (🔴) (ej. Uptime < 97%, story points < 60%, o API burn rate proyecta sobrecosto total).
  - *Acción:* Alerta automatizada en Slack. El S3 (CEO) asume el control directo temporal de las prioridades de la unidad afectada y convoca a una sesión extraordinaria de rediseño.

---

## 7. Diseño del Sistema de Auditoría y Verificación (Sistema 3*) (Canal 6)

El metasistema necesita comprobar de forma esporádica que la información reportada por las unidades en el Cuadro de Mando es fiel a la realidad operativa. Para esto, se implementa el **Sistema 3* (Canal 6 de Auditoría)**, el cual obtiene información directa y profunda bajando directamente a las operaciones en crudo sin pasar por los filtros ni reportes de los directores locales [1].

### 7.1 El Principio de Rotación Cruzada e Independencia
Para asegurar la imparcialidad y evitar conflictos de interés, el auditor asignado no debe pertenecer a la unidad auditada:
- **Auditoría Técnica (S1.1 / S1.4):** El DevOps Lead (S1.4) audita el repositorio de Ingeniería (S1.1).
- **Auditoría Comercial (S1.2 / S1.3):** El Head of Sales (S1.3) audita los datos de conversión de Growth (S1.2) en PostHog.
- **Auditoría de Procesos:** El CFO audita los logs de interacción en HubSpot CRM de Ventas (S1.3).

### 7.2 Herramientas de Auditoría S3* e Inyección Directa de Datos
Las auditorías se ejecutan de manera esporádica (mensual o ad hoc) y se diseñan de forma que el auditor consulte la fuente de datos primarios sin la intervención del director de la unidad:
- **Auditoría de Calidad de Código:** Inspección manual directa del log de commits en la rama `main` en GitHub, ejecución local de los scripts de análisis estático (SonarQube/ESLint) y verificación de cobertura de pruebas unitarias.
- **Auditoría de la Experiencia del Usuario (UX Audit):** El auditor se registra como usuario beta de prueba en producción, ejecuta de forma anónima el flujo completo de onboarding y evalúa de manera cruda la latencia del pipeline RAG y la precisión del parser académico.
- **Auditoría del Clima Laboral y Disponibilidad:** Entrevistas rápidas individuales de 10 minutos entre el CEO y los desarrolladores para validar la veracidad del Modelo M3 de dedicación de tiempo parcial, bypassando reportes consolidados de Ingeniería.

### 7.3 Estructura de los 8 Componentes del Canal 6 (Auditoría)
1. **Emisor:** El auditor cruzado del S3*.
2. **Transductor 1 (Codificación de Salida):** Consulta de datos crudos (ej. script SQL directo, script Git log check, o simulación manual de onboarding) sin pedir permiso al director local.
3. **Canal 1 (Vía de Ida):** Inspección directa de base de datos de producción y entornos de prueba.
4. **Transductor 2 (Decodificación de Entrada):** Dashboard de auditoría en la Sala de Operaciones que compara las métricas reportadas frente a los datos en crudo recolectados.
5. **Receptor:** CEO/CFO en el S3 Metasistémico.
6. **Transductor 3 (Codificación de Retorno):** El receptor (CEO/CFO) emite la Ficha de Hallazgos S3* y la firma digitalmente en Notion.
7. **Canal 2 (Vía de Retorno):** API de Notion que dispara una alerta automatizada en Slack.
8. **Transductor 4 (Decodificación de Retorno):** Slack-bot que notifica al auditor original del S3* y al director de la unidad auditada, registrando la fecha del descargo técnico y cerrando el ciclo de retroalimentación de la auditoría.

*   **Capacidad y Cadencia:** Capacidad de 1 auditoría detallada al mes por unidad del S1. Cadencia mensual.

---

## 8. Análisis de Variedad y Regulación Interna

Para cumplir con la Ley de Ashby [16], el S3 de Synapta está diseñado para actuar como un **absorbedor de la complejidad vertical** del S1, protegiendo al metasistema global de la patología de la **Hipertrofia del Sistema 3** (microgestión).

```
   Variedad Vertical de Operaciones del S1 (Infinita)
         │
         ▼
 ┌───────────────┐
 │   Filtro S2   │  ◄──► (Amortigua oscilaciones horizontales directas)
 └───────────────┘
         │  Variedad atenuada
         ▼
 ┌───────────────┐
 │  Auditoría S3*│  ◄──► (Valida información esporádicamente sin burocracia)
 └───────────────┘
         │  Solo excepciones críticas (Amarillo/Rojo)
         ▼
   Sistema 3 (CEO)  ◄──► Capacidad de atención protegida (Miller [10])
```

- **Mapeo de Variedad:** La variedad diaria del S1 (cientos de líneas de código, tickets de soporte, conversaciones de ventas) es absorbida en primera instancia por los reguladores del S2 (Linters, Kanban, runbooks automáticos) y los canales de comunicación directa del Canal 2 (C2) [5].
- **Filtro del S3:** Al S3 solo llegan las desviaciones consolidadas semanales y los informes de excepción. Esto atenúa la variedad a un rango manejable para la atención del CEO (bajo la Ley de Miller de $7 \pm 2$ fragmentos cognitivos concurrentes [10]).
- **Garantía de Autonomía:** El S3 tiene prohibido intervenir en las tareas operativas diarias de las unidades cuando la métrica está en Verde. La microgestión (ej. el CEO diciéndole al CTO qué base de datos usar) es una patología que destruye el autocontrol local y sobrecarga la capacidad del S3, rompiendo la homeostasis de la organización.

---

## 9. Relación Sistema 3 - Sistema 4 (Homeostato S3-S4)

La interfaz entre el S3 (Gestión del Presente) y el S4 (Inteligencia / Dirección del Futuro) es un **homeostato crítico** que asegura que Synapta sea estable hoy pero capaz de adaptarse a los cambios del mañana. Para manejar la alta variedad de este homeostato y procesar el conflicto natural entre estabilidad y cambio adaptativo, el diseño rechaza los límites rígidos de reuniones de tiempo limitado y establece un **sistema de sincronización asíncrona continua**:

```
 ┌─────────────────────────────────────────────────────────────────────────┐
 │                   HOMEOSTATO DINÁMICO CONTINUO S3-S4                    │
 │                                                                         │
 │  S3 (Operaciones) ──► Envía restricciones en tiempo real                │
 │                       (presupuesto APIs, horas M3, latencia) ────┐      │
 │                                                                  ▼      │
 │  S4 (Estrategia)  ◄── Envía señales del entorno futuro           Wiki   │
 │                       (nuevos modelos, SUNEDU, CAC) ◄────────────┘      │
 │                                                                         │
 │  Mecanismo de Resolución: Tablero de Estrategia Operativa en Notion y   │
 │  Debate Continuo en Slack (#strategy-ops) apoyado en simulador.         │
 └─────────────────────────────────────────────────────────────────────────┘
```

### 9.1 Mecanismos Asíncronos Continuos de Sincronización
- **Actualización Dinámica de Restricciones (S3):** El CTO y el CFO actualizan en tiempo real en la Sala de Operaciones Virtual la tasa de consumo de APIs y la disponibilidad real de horas del equipo (Modelo M3).
- **Inyección de Tendencias de Adaptación (S4):** El CEO y el CTO en rol de Inteligencia alimentan la base de conocimiento con papers de arXiv, cambios en los precios de Gemini [13] y benchmarks del mercado.
- **Canal de Debate e Interacción (#strategy-ops):** Canal de discusión continuo en Slack para resolver tensiones de adaptación. Si el S4 detecta la necesidad de migrar de Gemini 1.5 a Gemini 2.5 Flash, introduce la propuesta en el canal. S3 evalúa de forma asíncrona el costo de horas de migración frente a la estabilidad del sprint actual.
- **Modelos de Simulación Predictiva:** El homeostato se apoya en una herramienta de simulación en Google Sheets donde se modela la variabilidad de costos e infraestructura ante picos de demanda. Esto permite que el diálogo S3-S4 se base en simulaciones cuantitativas y no en intuiciones subjetivas. Las discrepancias insolubles se abordan en la SAS mensual con una preparación de datos ya consolidada.

### 9.2 Protocolo Democrático de Team Syntegrity (Resolución de Conflictos S3-S4)
Para evitar que el diálogo S3-S4 caiga en un bloqueo burocrático, parálisis jerárquica o resoluciones unilaterales autoritarias del CEO, se implementa una adaptación del protocolo de **Team Syntegrity** desarrollado por Stafford Beer. Este protocolo democrático asíncrono permite alcanzar consensos estratégicos maximizando la variedad disponible sin recurrir a una estructura de mando rígida.

*   **Geometría del Grupo (Icosaedro Simplificado):** Se modela una estructura virtual de 12 roles (vértices de un icosaedro) conectados por 30 canales de comunicación directa (aristas). En la Fase 1, al ser un equipo de 2-5 personas, los 12 roles de discusión se distribuyen de forma multiactiva (cada integrante asume 2 a 3 roles en los grupos de debate de acuerdo con sus "sombreros" funcionales).
*   **Distribución de Roles y Temas de Debate:**
    - Se definen 3 Grupos de Debate principales enfocados en las tensiones críticas S3-S4:
      1. *Grupo 1: Viabilidad Financiera vs. Velocidad de Expansión* (CFO, Head of Growth, CEO).
      2. *Grupo 2: Deuda Técnica vs. Innovación RAG/IA* (CTO, DevOps, CEO).
      3. *Grupo 3: Estabilidad de Soporte (SLA) vs. Nuevas Alianzas B2B* (Head of CS, Head of Sales, CFO).
*   **Protocolo de Iteración Asíncrona (Reverberación):**
    - Cada debate se realiza en un foro/canal dedicado en Slack en 3 roles cibernéticos:
      - *Miembro Activo:* Defiende y propone (Voz directa).
      - *Crítico/Oponente:* Desafía la viabilidad técnica/financiera (Filtro de variedad).
      - *Observador:* Documenta e integra el consenso (Transductor neutro).
    - El debate sigue 3 iteraciones de reverberación asíncrona de 48 horas cada una, donde el observador resume las objeciones y re-formula la propuesta hasta que se alcanza un índice de consenso matemática y lógicamente estable, cerrando la brecha entre el "aquí y ahora" del S3 y el "allá y entonces" del S4.

---

## 10. Riesgos de Inviabilidad Asociados al Sistema 3

El diseño del S3 de Synapta previene activamente dos patologías graves descritas en la literatura cibernética de Stafford Beer y José Pérez Ríos [1, 5]:

### 10.1 Patología: "Esquizofrenia de la Gestión"
- **Definición:** Ocurre cuando el tomador de decisiones del S3 es incapaz de balancear su doble lealtad: pertenecer al "Sistema" de las operaciones (entender y defender al S1) y al mismo tiempo pertenecer al "Metasistema" de dirección (exigir control para el S5). En startups con equipos de 2-5 personas, el CEO actúa frecuentemente como operador del S1 y líder de S3/S5, colapsando su identidad de rol.
- **Mitigación en Synapta:** Regla de **Sombreros Conceptuales**. En las reuniones de la SAS mensual, el moderador exige declarar explícitamente en calidad de qué rol se emite cada opinión: *"Como S1.3 (Ventas) reporto que los de Ingeniería se retrasaron"* vs. *"Como S3 (Dirección Operativa) debo balancear el retraso reasignando recursos temporalmente"*. Esto previene el conflicto de identidad de rol.

### 10.2 Patología: "Conexión Débil o Inexistente con el Sistema 1"
- **Definición:** El metasistema S3 emite metas y presupuestos pero está desconectado de la realidad del S1 (opacidad de las unidades). Las unidades operan en una anarquía de facto, reportando métricas manipuladas para mantener su autonomía sin rendir cuentas.
- **Mitigación en Synapta:** La combinación del **Cuadro de Mando Semanal** automatizado (mecanismo S2 horizontal de transparencia de métricas) y las **auditorías cruzadas esporádicas del S3*** asegura un flujo de información transparente y veraz, impidiendo la opacidad de los directores locales.

---

## 11. Diseño del Canal 3 (Instrucciones Corporativas y Transmisión del Ethos)

El Canal 3 conecta de manera vertical y directa al metasistema S3 con los directores locales de las unidades del S1. A diferencia de las intervenciones de emergencia, el Canal 3 se utiliza de forma rutinaria para transmitir lineamientos, ethos de la empresa, cumplimiento legal no negociable y políticas obligatorias, absorbiendo variedad al fijar marcos de acción preestablecidos.

### 11.1 Estructura de los 8 Componentes del Canal 3 (Instrucciones)
1. **Emisor:** CEO/CFO (S3 Metasistémico).
2. **Transductor de Salida (Codificación):** Redacción de una Ficha de Directriz Corporativa no negociable (ej. actualización de políticas de privacidad según la Ley N° 29733 o directrices de seguridad de datos de SUNEDU [3]).
3. **Canal de Ida:** Repositorio central de políticas de Synapta y alertas push automáticas en el canal `#ops-standards`.
4. **Transductor de Entrada (Decodificación):** Bot de GitHub que inserta la directriz legal en los runbooks de S2 local y crea de manera automática tareas de cumplimiento no negociables en el backlog de la unidad.
5. **Receptor:** Directores locales de las unidades del S1 (CTO, Heads de B2C/B2B/CS).
6. **Transductor 3 (Codificación de Retorno):** El director local hace clic en el botón "Directriz Entendida e Implementada".
7. **Canal 2 (Vía de Retorno):** Slack Webhook o GitHub API que envía la señal de confirmación de vuelta.
8. **Transductor 4 (Decodificación de Retorno):** Consola de administración de S3 o bot de Notion que recibe el webhook, cambia el estado de la directriz a "Confirmada/Cumplida" en la Sala de Operaciones, y notifica a la dirección metasistémica (CFO/CEO).

*   **Capacidad y Cadencia:** Capacidad de 2 directrices corporativas por sprint. Cadencia mensual o ad hoc ante cambios éticos/legales.

---

## 12. Validación del Diseño del Sistema 3

La validez del diseño del S3 de Synapta se sustenta en que la intervención directa, autoritaria y jerárquica del CEO sobre las operaciones del S1 es un **mecanismo de excepción**, no de uso ordinario:

1. El S3 gobierna de forma regular a través de **metas pactadas y asignación de paquetes de recursos** (negociación C4 en la SAS mensual).
2. El control de desviaciones se delega a los reguladores horizontales del **Sistema 2** (sprints, calendarios y matrices automáticas) para que las unidades se auto-corrijan sin requerir supervisión vertical.
3. La verificación de la información rutinaria se delega al canal independiente del **Sistema 3*** (auditorías cruzadas esporádicas).
4. El CEO solo asume una intervención directa jerárquica (Instrucción C3 extraordinaria a través de Canal 3) si un indicador crítico de desempeño entra en **Estado Rojo** (🔴) y el mecanismo local del S2 ha fallado. Esta validación garantiza el respeto absoluto de la autonomía del S1, resguardando la viabilidad de la organización.

---

## 13. Conclusiones

El Sistema 3 de Synapta cumple de manera eficaz con su papel integrador del "aquí y ahora". A través de la formalización del Canal 4 de asignación de recursos condicionados a KPIs y el diseño de la rendición de cuentas por informes de excepción, el S3 mantiene la homeostasis interna de la organización. 

La integración de la rotación cruzada mensual en el S3*, el diseño de la Sala de Operaciones Virtual y el homeostato fluido asíncrono con el S4 garantizan que YachaqAI opere de forma cohesionada, sinérgica y alineada con la visión del S5, evitando la anarquía operativa de las unidades y previniendo al mismo tiempo la parálisis por microgestión del metasistema.

---

## Fuentes Citadas

| # | Fuente | Detalle y Uso Metodológico |
| :--- | :--- | :--- |
| [1] | Beer, Stafford (1985). *Diagnosing the System for Organizations*. John Wiley & Sons. | Concepto del Sistema 3, el Canal 4 de negociación de recursos, el canal 6 de auditoría (S3*) y las patologías del metasistema. |
| [2] | StartupPeru / PROINNOVATE (2023). *Guía de Presupuestos y Pilotos de Validación en Startups Pre-Seed*. | Rango presupuestal pre-seed de S/. 150-500/mes y tasas de éxito de validación comercial. |
| [3] | NCIIA (2019). *Student Venture Team Size and Commitment Standards*. | Carga de horas de dedicación mixta/tiempo parcial en startups universitarias (15-25h/sem). |
| [4] | Appcues & Amplitude (2023). *Product Retention Benchmarks by Category*. | Calibración de KPIs de retención D7 para justificación de sinergia CS-Growth. |
| [5] | Pérez Ríos, José (2008). *Diseño de organizaciones viables: Un enfoque sistémico*. Universidad de Valladolid. | Patologías de la esquizofrenia de gestión, hipertrofia de S3, y principios del Sistema 3*. |
| [6] | ParseBench (2024). *PDF Parser Evaluation Benchmark for Academic Documents*. | Meta de tasa de éxito del parser (≥ 85%) para validación de recursos de Ingeniería. |
| [7] | Cohn, Mike (2005). *Agile Estimating and Planning*. Prentice Hall. | Calibración de la meta de story points completados por sprint (≥ 80%). |
| [8] | Beyer, B., Jones, C., Petoff, J., & Murphy, K. (2016). *Site Reliability Engineering: How Google Runs Production Systems*. O'Reilly Media. | Modelos de informes de excepción, SLOs de Uptime y presupuestos de error. |
| [9] | NCIIA (2019). *Student Venture Team Size and Commitment Standards*. | Distribución de roles en equipos de desarrollo pequeños (2-5 personas). |
| [10] | Miller, George A. (1956). *The Magical Number Seven, Plus or Minus Two: Some Limits on Our Capacity for Processing Information*. Psychological Review. | Límite del procesamiento cognitivo humano para la justificación del filtro de ruido en el S3. |
| [11] | Y Combinator (2020). *Startup Playbook & MVP Validation Cycles*. | Justificación de horizontes de sprints y ciclos de pilotos docentes en EdTech. |
| [12] | GitLab (2022). *Remote Team Communication Playbook & Response SLAs*. | Estándares de respuesta de coordinación asíncrona para la asignación temporal. |
| [13] | Google Cloud (2026). *Vertex AI / Gemini API Pricing Page*. | Costeo de llamadas de APIs de Gemini 2.5 Flash para asignación en el Canal 4. |
| [14] | Supabase (2026). *Pricing Plans & Platform Limits*. | Límites de PostgreSQL para la provisión de base de datos en S1.4. |
| [15] | Vercel (2026). *Pricing and Plan Limits*. | Límites de hosting Next.js para la provisión de servidores. |
| [16] | Ashby, W. Ross (1956). *An Introduction to Cybernetics*. Chapman & Hall. | Ley de la variedad requerida para el diseño de la regulación interna del S3. |
| [17] | Beyer, B., Jones, C., Petoff, J., & Murphy, K. (2016). *Site Reliability Engineering: How Google Runs Production Systems*. O'Reilly Media. | Umbral de Uptime semanal de servicio (≥ 99.0%). |
| [18] | Zendesk (2024). *Customer Experience Trends Report*. | Estándar de tiempo de resolución de tickets en CS (≤ 24h). |