# 6_sistema_2

> **Referencia Metodológica (Pérez Ríos / Stafford Beer):** El Sistema 2 (S2) es el regulador de la oscilación y el coordinador de las interacciones horizontales entre las unidades del Sistema 1 (S1). Su objetivo es amortiguar los conflictos locales, estabilizar el sistema a través de normativas compartidas y evitar que las desviaciones operativas asciendan y sobrecarguen al metasistema (S3). Este archivo presenta el diseño detallado del Sistema 2 de Synapta (YachaqAI).


## Tabla de Contenidos

- [1. Introducción al Diseño del Sistema 2](#1-introduccion-al-diseno-del-sistema-2)
- [2. Caracterización Estructural del Sistema 1](#2-caracterizacion-estructural-del-sistema-1)
  - [2.1 Cadenas de Suministro Internas y Flujos de Procesos](#21-cadenas-de-suministro-internas-y-flujos-de-procesos)
  - [2.2 Puntos de Conflicto y Competencia por Recursos Comunes](#22-puntos-de-conflicto-y-competencia-por-recursos-comunes)
  - [2.3 El Canal 2: Interacciones Directas S1-S1 (Primera Línea de Amortiguación)](#23-el-canal-2-interacciones-directas-s1-s1-primera-linea-de-amortiguacion)
- [3. Diagnóstico de Necesidades de Coordinación](#3-diagnostico-de-necesidades-de-coordinacion)
- [4. Análisis de Oscilaciones y Conflictos](#4-analisis-de-oscilaciones-y-conflictos)
  - [4.1 Principales Oscilaciones Identificadas](#41-principales-oscilaciones-identificadas)
  - [4.2 Rutinas Específicas de Amortiguación S2](#42-rutinas-especificas-de-amortiguacion-s2)
- [5. Principios de Diseño del Sistema 2](#5-principios-de-diseno-del-sistema-2)
- [6. Diseño de Mecanismos de Coordinación](#6-diseno-de-mecanismos-de-coordinacion)
  - [6.1 Planificación de Producción y Programas de Tareas](#61-planificacion-de-produccion-y-programas-de-tareas)
  - [6.2 Equipos de Coordinación y Bases de Conocimiento](#62-equipos-de-coordinacion-y-bases-de-conocimiento)
  - [6.3 Procedimientos Contables y Reglas de Recursos Humanos](#63-procedimientos-contables-y-reglas-de-recursos-humanos)
  - [6.4 Mecanismos de Cultura Operativa y Homologación de Comportamiento](#64-mecanismos-de-cultura-operativa-y-homologacion-de-comportamiento)
- [7. Diseño de Arquitectura Informacional](#7-diseno-de-arquitectura-informacional)
  - [7.1 Flujo Ascendente (Filtro de Ruido y Consolidación)](#71-flujo-ascendente-filtro-de-ruido-y-consolidacion)
  - [7.2 Flujo Descendente (Diseminación de Políticas y Estilo Operativo)](#72-flujo-descendente-diseminacion-de-politicas-y-estilo-operativo)
- [8. Diseño de Canales de Coordinación](#8-diseno-de-canales-de-coordinacion)
  - [8.1 Arquitectura de los Canales del S2 (Los 8 Componentes del Homeostato Horizontal)](#81-arquitectura-de-los-canales-del-s2-los-8-componentes-del-homeostato-horizontal)
- [9. Análisis Cibernético del Sistema 2](#9-analisis-cibernetico-del-sistema-2)
  - [9.1 Demostración Matemática de la Absorción de Variedad](#91-demostracion-matematica-de-la-absorcion-de-variedad)
- [10. Evaluación de Equilibrio Coordinación–Autonomía](#10-evaluacion-de-equilibrio-coordinacionautonomia)
  - [10.1 Indicadores de Desviación Autocrática en el S2](#101-indicadores-de-desviacion-autocratica-en-el-s2)
  - [10.2 Acciones de Restablecimiento del Equilibrio](#102-acciones-de-restablecimiento-del-equilibrio)
- [11. Validación del Diseño del Sistema 2](#11-validacion-del-diseno-del-sistema-2)
- [12. Conclusiones](#12-conclusiones)
- [Fuentes Citadas](#fuentes-citadas)

---

---

## 1. Introducción al Diseño del Sistema 2

El Sistema 2 de Synapta se concibe estructuralmente como el **mecanismo anti-oscilatorio y de coordinación horizontal** que permite al conjunto de unidades organizativas del Sistema 1 (S1.1 Ingeniería, S1.2 Growth/B2C, S1.3 Ventas B2B, S1.4 Soporte/Infra) funcionar de manera armoniosa y sincronizada.

En el Modelo de Sistema Viable (MSV) de Stafford Beer [1], las unidades del S1 tienen por naturaleza una alta autonomía, lo que genera inevitablemente fricciones horizontales debido a sus objetivos operacionales específicos. El S2 actúa como una red de amortiguación que **absorbe la variedad de estas fricciones a través de estándares y rutinas de coordinación**, previniendo que los roces diarios requieran la intervención directa y autoritaria del Sistema 3 (CEO/CFO). El éxito del S2 radica en que el sistema total se mantiene en equilibrio dinámico mediante el autocontrol horizontal.

---

## 2. Caracterización Estructural del Sistema 1

Para diseñar un S2 efectivo, primero es necesario caracterizar cómo interactúan operativamente las unidades operativas elementales de Synapta y en qué puntos exactos compiten por los recursos, proveedores o clientes.

```
       [S1.1 Ingeniería] ◄─── Deploys / Release Calendar ───► [S1.4 Soporte/Infra]
               │                                                      │
     FSRS / Roadmap de APIs                                      Tickets / Bugs
               │                                                      │
               ▼                                                      ▼
     [S1.2 Growth/B2C] ◄──── Estrategia de Precios (48h) ───► [S1.3 Ventas B2B]
```

### 2.1 Cadenas de Suministro Internas y Flujos de Procesos
1. **Flujo de Código a Soporte (S1.1 ──► S1.4):** Ingeniería produce nuevas versiones de software que Soporte debe mantener. Un deploy mal coordinado genera tickets imprevistos y sobrecarga el entorno operativo de soporte.
2. **Flujo de Incidencias a Ingeniería (S1.4 ──► S1.1):** Soporte captura los bugs reportados por los usuarios beta y debe transferirlos a Ingeniería. Sin un canal filtrado, Ingeniería se satura de interrupciones informales.
3. **Flujo de Producto a Demos B2B (S1.1 ──► S1.3):** Ingeniería desarrolla funcionalidades que Ventas B2B debe incluir en sus demostraciones comerciales a universidades. Prometer características no terminadas quiebra la confianza del cliente.
4. **Flujo de Datos de Conversión (S1.2 ──► S1.3):** Growth recopila datos de comportamiento de los usuarios B2C, los cuales sirven como prueba social e input estratégico para que Ventas B2B identifique facultades universitarias clave.

### 2.2 Puntos de Conflicto y Competencia por Recursos Comunes
- **Presupuesto Financiero Pre-Seed:** En la Fase 1, Synapta cuenta con un presupuesto operativo de **S/. 150 a S/. 500 mensuales** [2]. Ingeniería (tokens de APIs de Gemini), Growth (pauta orgánica vs. marketing) y Soporte (cuotas en la nube) compiten por el mismo fondo monetario.
- **Dedicación Temporal Limitada:** Los integrantes del equipo operan bajo un modelo de dedicación mixta de **15 a 25 horas semanales** [3]. Las unidades del S1 compiten por el tiempo de los fundadores; por ejemplo, si el CTO debe atender tickets urgentes de soporte (S1.4), detiene el desarrollo del core RAG (S1.1).
- **Consistencia en el Mercado (B2C vs. B2B):** Growth B2C busca maximizar usuarios activos semanales (WAU) mediante campañas abiertas y mazos de repetición espaciada gratuitos, mientras que Ventas B2B busca cerrar licitaciones institucionales premium. Las campañas masivas y ofertas gratuitas desalinean y debilitan la negociación de la venta corporativa si no se coordinan.

### 2.3 El Canal 2: Interacciones Directas S1-S1 (Primera Línea de Amortiguación)
Antes de activar los mecanismos formales de control del S2, la teoría cibernética exige que las unidades operativas posean canales de comunicación directa lo suficientemente fuertes para resolver la mayor variedad de fricciones de manera autónoma. En Synapta, el **Canal 2 (C2)** se refuerza con tres vías de comunicación directa diaria:
- **Chat Directo Dev-CS (S1.1 ◄──► S1.4):** Canal rápido en Discord (`#dev-cs-chat`) donde el DevOps Lead e Ingeniería resuelven dudas rápidas sobre fallas locales de usuarios o aclaran si un bug reportado es un falso positivo, sin abrir tickets de Sentry ni alertar al metasistema.
- **Sincronización Directa de Insights (S1.2 ◄──► S1.3):** Espacio informal de 15 minutos en la SAS mensual para compartir capturas cualitativas y feedback espontáneo de estudiantes con Ventas B2B, ayudando a afinar los argumentos comerciales ante docentes.
- **Feed Directo de Requerimientos de Docentes (S1.3 ◄──► S1.1):** Canal directo para que Ventas B2B suba ideas de mejora de docentes al backlog de Ingeniería en formato de borrador. Ingeniería evalúa e integra estas ideas de forma autónoma según la velocidad de sprint, evitando discusiones presupuestarias complejas con S3.

Esta comunicación directa filtra el **75% de las fricciones menores** en el nivel operativo, impidiendo que asciendan a reguladores formales de S2 o requieran arbitraje del S3.

---

## 3. Diagnóstico de Necesidades de Coordinación

El diagnóstico sistémico identifica cuatro áreas críticas de fricción entre las unidades de Synapta donde la falta de normativas comunes genera desequilibrios operacionales, y define la automatización requerida para evitar la intervención del S3:

| Área de Fricción | Causa Raíz Identificada | Consecuencia en el Sistema | Automatización S2 Propuesta |
| :--- | :--- | :--- | :--- |
| **S1.1 vs. S1.4** (Estabilidad de Producción) | Deploys sin aviso o en horas de alta concurrencia de estudiantes universitarios. | Caídas del servidor y saturación de tickets P0 en el Head of CS. | Webhook automático de GitHub Actions hacia canal `#infra-alerts` y bloqueo automático de deploys en horas pico de exámenes [2]. |
| **S1.2 vs. S1.3** (Mensaje y Precios) | Lanzamiento de ofertas de mazos gratis o cambios de marca por Growth sin informar a Ventas. | Decanos se quejan de la inconsistencia de precios respecto a la versión institucional. | Validación obligatoria y "silencio aprobatorio" de 48h automatizado mediante tablero de campañas en GitHub Projects. |
| **S1.4 vs. S1.1** (Promesas de Roadmap) | Ventas promete la integración de LlamaParse o soporte de ecuaciones para cerrar un piloto docente antes de tiempo. | Ingeniería se ve forzada a alterar el sprint, generando deuda técnica y sobrecosto de APIs. | Bloqueo en HubSpot CRM que impide marcar un trato B2B como "Demo realizada" si las funcionalidades no están en producción en el Release Calendar. |
| **S1.4 vs. S1.1** (Tratamiento de Bugs) | Escalamiento informal de bugs por WhatsApp a cualquier hora del día al CTO. | Interrupción constante del desarrollo y pérdida de velocidad del sprint técnico. | Bot de GitHub que centraliza y convierte los reportes de Sentry en *Issues* del Backlog, clasificándolos automáticamente por prioridad. |

---

## 4. Análisis de Oscilaciones y Conflictos

Las oscilaciones son fluctuaciones destructivas en el comportamiento de la organización que ocurren cuando las acciones de una unidad del S1 provocan reacciones tardías o desmedidas en otra, amplificando la inestabilidad sistémica.

```
 Sin S2:
 [S1.1 Deploy] ───► [S1.4 Caos / Caída] ───► [S3 CEO Interviene / Castigo]
 
 Con S2 (Rutinas de Amortiguación):
 [S1.1 Deploy] ───► [Mecanismo S2: Deploy Notice 24h & Runbook] ───► [Uptime 99%]
```

### 4.1 Principales Oscilaciones Identificadas
1. **La Oscilación de la Deuda Técnica:** Ingeniería (S1.1) acelera el desarrollo para cumplir con el Release Calendar de Ventas (S1.3) y comete errores de código. Esto provoca un pico de tickets de soporte técnico (S1.4) la semana siguiente, lo que obliga al CTO a detener el desarrollo para reparar bugs, retrasando el Release Calendar del mes siguiente y generando una oscilación en la entrega del producto.
2. **La Oscilación del Presupuesto de APIs:** Growth (S1.2) lanza una campaña viral en comunidades estudiantiles peruanas, atrayendo a 150 usuarios en 2 días. Esto causa un consumo de tokens de Gemini no planificado, agotando el presupuesto de APIs mensual de Ingeniería (S1.1) antes del día 20 [4], forzando al CFO (S3) a intervenir para apagar servidores y detener el crecimiento.

### 4.2 Rutinas Específicas de Amortiguación S2
Para estabilizar estas fluctuaciones, se establecen cuatro rutinas operativas automatizadas:

- **Rutina de Calibración de APIs (S2-API):** Atenuador de variedad automatizado local que disminuye la tasa de peticiones a Gemini al alcanzar el 85% de la cuota presupuestal mensual (evitando que el S1 consuma el presupuesto prematuramente). 
  > **Nota de Precisión Teórica (Canales Algedónicos vs. S2):** Esta rutina es un atenuador rutinario del S2. Si el agotamiento presupuestal representa una amenaza existencial inminente de quiebra antes de terminar el mes y el atenuador local no basta, esto activa un verdadero **Canal Algedónico** (ver Sección 15 del Sistema 1), puenteando la jerarquía para escalar directamente al S5 (Junta de Fundadores/CEO) para decidir si inyectar más capital o detener la operación de YachaqAI.
- **Rutina del Release Calendar (S2-Release):** Calendario de lanzamientos mensual invariable. Ventas B2B solo puede vender lo que ya está en producción, eliminando los compromisos no planificados.
- **Rutina de Deploy con Pre-aviso de 24h (S2-Deploy):** Registro obligatorio en el calendario del equipo 24 horas antes del deploy, que ejecuta de forma automática prubas de integración en Vercel staging.
- **Rutina del Cuadro de Mando Semanal (S2-Dashboard):** Sincronización automática de métricas operativas el primer día hábil de la semana antes de las 10:00 am, evitando reuniones informales de control.

---

## 5. Principios de Diseño del Sistema 2

El diseño del Sistema 2 de Synapta se rige por los principios fundamentales de la cibernética organizacional de Stafford Beer [1, 5]:

1. **Función de Servicio y Apoyo Transversal (Eje Horizontal):** El S2 no es un jefe ni tiene autoridad de mando. Es un facilitador horizontal que provee las reglas del juego para que el S1 coopere. Sus mecanismos (sprints, CRM, runbooks) existen para servir a las operaciones del S1, no para controlarlas policialmente.
2. **No Pertenece a la Línea de Mando Vertical (S3-S1):** El S2 no da órdenes directas de hacer o dejar de hacer. Por ejemplo, el mecanismo de integración de Git no decide qué funcionalidad programar (eso lo define S3/S1.1), solo asegura que el código cumpla con los estándares de compilación.
3. **Prevención de la Burocracia y Autoritarismo:** Un S2 fallido es percibido como "pérdida de tiempo" o "fábrica de formularios". Para evitarlo, todo mecanismo del S2 en Synapta debe ser automatizado e integrado en las herramientas de uso diario del equipo (GitHub, WhatsApp, HubSpot). Si una regla del S2 requiere que un integrante llene un formulario manual de más de 3 campos, se considera patológica y debe ser rediseñada.

---

## 6. Diseño de Mecanismos de Coordinación

Para materializar el S2 en la operación diaria de Synapta, se implementan los siguientes mecanismos y herramientas concretas:

### 6.1 Planificación de Producción y Programas de Tareas
- **Sprint Semanal Integrado:** Todo el equipo de Ingeniería (S1.1) y Soporte (S1.4) planifica el trabajo los lunes a las 9:00 am a través de un tablero de **GitHub Projects** con estimación en Story Points [6].
- **Sizing Matrix B2B (S2-SalesSizing):** Tabla de pre-evaluación que indica los requisitos técnicos mínimos que debe cumplir una universidad para calificar al piloto (ej. conectividad a internet de docentes, uso de PDFs no escaneados). Impide vender pilotos inviables.

### 6.2 Equipos de Coordinación y Bases de Conocimiento
- **Comité Operativo CS-Ingeniería:** Reunión quincenal de 30 minutos (jueves 4:00 pm) entre el CTO y el Head of CS para priorizar el backlog de errores y calibrar runbooks en base a la matriz P0-P3.
- **Repositorio Central de Documentación (Wiki de Synapta):** Repositorio privado en GitHub que almacena:
  - *Runbooks de Soporte:* Guías paso a paso para resolver excepciones frecuentes en Supabase.
  - *Pitch Decks y FAQ B2B:* Argumentarios estandarizados y alineados con las políticas éticas del S5.

### 6.3 Procedimientos Contables y Reglas de Recursos Humanos
- **Seguimiento Automatizado del API Burn Rate:** Hoja de Google Sheets conectada mediante API a Vertex AI Console que grafica la proyección de costo mensual de tokens. Si la proyección supera el límite financiero establecido para el mes (S/. 350 en Fase 1) [4], el script envía de forma automática un aviso al canal `#finances`.
- **Protocolo de Respuestas Asíncronas (S2-RRHH):** Normativa interna que fija el tiempo máximo de respuesta para la coordinación operativa de sprint en **4 horas hábiles** en Discord/WhatsApp para días laborales, y de **24 horas** para fines de semana [7], adaptándose a la dedicación de tiempo parcial del equipo.

### 6.4 Mecanismos de Cultura Operativa y Homologación de Comportamiento
Siguiendo las directrices de Pérez Ríos [5], el S2 no debe ser un mecanismo puramente mecanicista o tecnológico, sino que debe incorporar el "estilo" y la "cultura" operativa de la organización. Synapta homologa el comportamiento del equipo mediante tres herramientas de cultura sistémica:
- **Cultura de Post-Mortems sin Culpa (Blameless Post-Mortems):** Ante una falla del servidor o un sobrecosto de APIs, el análisis se enfoca exclusivamente en la falla del proceso y en la actualización del runbook de S2 local. Está estrictamente prohibido culpar o sancionar individualmente a un miembro. Esto promueve la transparencia y evita que el equipo oculte errores (previniendo el *Bloqueo Algedónico*).
- **Inducción Cultural y Onboarding Sistémico:** Cada nuevo colaborador o miembro de soporte participa en una sesión de inducción de 1 hora liderada por el CEO/CTO sobre empatía con el aprendiz y resguardo de la privacidad de datos. Se establecen valores comunes de respeto, colaboración asíncrona y honestidad comercial.
- **Manual de Estilo de Comunicación con el Cliente (Voz de Synapta):** Documento compartido en Notion que homologa el tono, vocabulario y límites éticos en la interacción con usuarios B2C y docentes B2B, garantizando coherencia en el mensaje sin importar quién atienda el canal de CS o de Ventas.

---

## 7. Diseño de Arquitectura Informacional

La arquitectura de información del S2 de Synapta está diseñada como un canal de **doble flujo (bidireccional)**, permitiendo tanto la consolidación ascendente de métricas operativas como la diseminación descendente de políticas y decisiones metasistémicas.

```
   [S1.1 Ingeniería Local] ◄─── (GitHub / Webhooks) ◄───┐
   [S1.2 Growth B2C Local] ◄── (Discord Channels) ◄────┼──► [S2 Corporativo Dashboard] ◄──► [S3 CEO/CFO]
   [S1.3 Ventas B2B Local] ◄── (HubSpot / Policies) ◄──┼─── (Flujo Bidireccional)
   [S1.4 Soporte Local] ◄────── (Runbooks / Wiki) ◄─────┘
```

### 7.1 Flujo Ascendente (Filtro de Ruido y Consolidación)
1. **Mecanismo S2 Local (Ubicación, Herramientas y Responsabilidades):**
   - **S1.1 Ingeniería:** Reside en la configuración del repositorio central en GitHub (acciones automatizadas `.github/workflows`, linters automáticos ESLint/Prettier, y reglas de protección de la rama `main`). El **CTO** es el responsable de mantener y auditar estas herramientas locales.
   - **S1.2 Growth B2C:** Reside en los páneles de PostHog (funnel tracking de conversión del onboarding de estudiantes), alertas automatizadas de conversión y campañas programadas en Mailchimp. El **Head of Growth** es el responsable de mantener configurados los funnels y alertas.
   - **S1.3 Ventas B2B:** Reside en HubSpot CRM (campos obligatorios para avanzar de fase en el pipeline, restricciones de descuentos por usuario, y registro de minutas). El **Head of Sales** es el responsable de auditar la consistencia del CRM.
   - **S1.4 Soporte/Infra:** Reside en el ruteo de excepciones en Sentry, alertas de disponibilidad en UptimeRobot, y reglas de enrutamiento y priorización en Zendesk. El **DevOps Lead** y el **Head of CS** son co-responsables de mantener los runbooks de soporte y la automatización de la matriz de tickets.
2. **Mecanismo S2 Corporativo (Dashboard Consolidado y Reglas de Filtro de Ruido):**
   - Un script programado consolida diariamente los indicadores clave de cada regulador local en un único **Cuadro de Mando Semanal** en Notion/Google Sheets.
   - **Reglas Lógicas del Filtro de Ruido (Atenuación de Variedad):** Para evitar la saturación de información en el metasistema S3, el S2 Corporativo aplica tres filtros algorítmicos sobre las desviaciones:
     - *Regla 1 (Ventana de Autoresolución):* Si un indicador sale de la zona verde (ej. latencia alta en RAG o fallo de carga de PDF en S1.1) pero el S2 local (mediante runbooks automatizados o auto-scaling en Supabase) devuelve la métrica a la normalidad en una ventana de 15 minutos, se clasifica como "ruido transitorio". Se registra en el log histórico para la auditoría de S3*, pero no genera alertas al CEO (S3).
     - *Regla 2 (Filtro por Criticidad de Nivel de Evento):* Las alertas P0 (fugas de datos, base de datos de producción Supabase caída) puentean el filtro S2 y escalan de inmediato como alertas críticas. Las alertas P1 y P2 solo escalan al S3 si su tasa de frecuencia supera las 3 ocurrencias por hora o persisten sin resolución local por más de 30 minutos.
     - *Regla 3 (Filtro Estadístico de Desviación Estándar):* El S2 calcula semanalmente el promedio ($\mu$) y desviación estándar ($\sigma$) de los indicadores clave. Si una métrica fluctúa dentro de una desviación menor a dos sigmas ($< 2\sigma$), el sistema la trata como ruido operativo normal y la absorbe. Si supera las $2\sigma$ de desviación en 3 mediciones consecutivas de 10 minutos, se genera una alerta visual de desvío para el S3.

### 7.2 Flujo Descendente (Diseminación de Políticas y Estilo Operativo)
El metasistema (S3/S5) utiliza el canal corporativo del S2 de forma descendente para propagar automáticamente actualizaciones normativas, nuevas programaciones, políticas contables y estándares de comportamiento, eliminando la necesidad de órdenes individuales directas:
- **Sincronización Normativa Automatizada:** Cuando el S3/CFO modifica el presupuesto mensual de APIs o el S5 actualiza las directrices éticas de privacidad de datos en el manual central, se dispara de forma automática una acción en GitHub (`Github workflow`) que abre Pull Requests de actualización en los repositorios de código locales e inserta alertas en la Wiki de Soporte.
- **Canal de Diseminación de Políticas (#ops-standards):** Canal de Slack/Discord de solo lectura donde el metasistema difunde nuevas reglas. Un bot transductor formatea estas directrices en tarjetas de tareas y checklist de cumplimiento obligatorio para los sprints locales de cada unidad, asegurando que las directrices de S3 se asimilen orgánicamente en el trabajo del S1.

---

## 8. Diseño de Canales de Coordinación

Para conectar el S2 corporativo con los reguladores locales del S1 de manera continua, se implementa el **Canal 5 (Canal Anti-oscilatorio)** del MSV [1], detallando sus transmisores y transductores de información:

### 8.1 Arquitectura de los Canales del S2 (Los 8 Componentes del Homeostato Horizontal)
Para garantizar el equilibrio homeostático y la retroalimentación continua según la teoría del MSV [1], cada canal de coordinación en Synapta se diseña detallando sus ocho componentes esenciales, su capacidad máxima y su cadencia:

#### A. Canal 5.1 — Coordinación de Despliegues (Ingeniería S1.1 ◄──► Soporte/Infra S1.4)
1. **Emisor:** CTO (Gestión de S1.1).
2. **Transductor 1 (Codificación de Salida):** Github Action script que compila y emite un payload JSON con los detalles del deploy.
3. **Canal 1 (Vía de Ida):** Request HTTP POST (Payload seguro en tránsito).
4. **Transductor 2 (Decodificación de Entrada):** Slack Integration App que traduce el JSON en un mensaje formateado interactivo en el canal `#engineering-releases`.
5. **Receptor:** Head of CS / DevOps Lead (Gestión de S1.4).
6. **Transductor 3 (Codificación de Retorno):** El receptor (S1.4) hace clic en el botón "Aceptado y Runbooks Verificados" en Slack o añade el emoji `✅` a la alerta.
7. **Canal 2 (Vía de Retorno):** Slack Interactive Webhook Payload (HTTP POST de retorno).
8. **Transductor 4 (Decodificación de Retorno):** Consola de GitHub Actions que recibe el webhook, decodifica el retorno y actualiza el estado del deploy a "Verificado", informando al emisor original (CTO). Si no se recibe confirmación en **60 minutos**, el sistema escala enviando un mensaje SMS/WhatsApp automatizado al DevOps Lead.

- **Capacidad y Cadencia:** Capacidad máxima del canal de 2 alertas de deploy por semana para evitar fatiga cognitiva del equipo de Soporte. Cadencia temporal asíncrona ligada al final de sprint.

#### B. Canal 5.2 — Notificación de Errores Críticos (Soporte S1.4 ◄──► Ingeniería S1.1)
1. **Emisor:** DevOps Lead / Sentry alert monitor (Gestión de S1.4).
2. **Transductor 1 (Codificación de Salida):** Sentry SDK que captura excepciones no controladas en Supabase y las formatea en JSON.
3. **Canal 1 (Vía de Ida):** HTTP POST payload a través del API de Slack.
4. **Transductor 2 (Decodificación de Entrada):** Sentry Slack bot que dibuja el error y adjunta el log formateado en `#ops-alerts` con severidad (P0-P3).
5. **Receptor:** CTO (Gestión de S1.1).
6. **Transductor 3 (Codificación de Retorno):** El CTO presiona el botón "Crear Issue y Asignar" o añade el emoji `👀` al mensaje de Slack.
7. **Canal 2 (Vía de Retorno):** Webhook interactivo de Slack a GitHub API.
8. **Transductor 4 (Decodificación de Retorno):** El bot de Sentry recibe el evento de GitHub API, decodifica el retorno y marca el ticket como "Investigando" en Sentry de forma inmediata, informando al emisor original (Soporte). Si no se recibe retorno en **15 minutos** para alertas de nivel P0, el bot inicia el protocolo de llamadas automáticas al CTO.

- **Capacidad y Cadencia:** Capacidad del canal de 10 alertas agrupadas por hora (los duplicados se colapan automáticamente para evitar ruido y fatiga de alarmas). Cadencia temporal en tiempo real.

#### C. Canal 5.3 — Sincronización de Pilotos (Ventas B2B S1.3 ◄──► Ingeniería S1.1)
1. **Emisor:** Head of Sales (Gestión de S1.3).
2. **Transductor 1 (Codificación de Salida):** API de HubSpot CRM que genera una petición JSON al pasar un trato comercial al estado "Piloto Solicitado".
3. **Canal 1 (Vía de Ida):** Request HTTP POST de HubSpot a la API de GitHub.
4. **Transductor 2 (Decodificación de Entrada):** GitHub Projects Importer que inserta de forma automática una tarjeta de tarea en la columna "Backlog de Pilotos".
5. **Receptor:** CTO (Gestión de S1.1).
6. **Transductor 3 (Codificación de Retorno):** Al arrastrar el CTO el Issue a la columna "Planificado en Sprint", la automatización de GitHub codifica la acción y genera un payload de actualización.
7. **Canal 2 (Vía de Retorno):** GitHub Webhook que envía la señal de retorno.
8. **Transductor 4 (Decodificación de Retorno):** API de HubSpot CRM que recibe el webhook, decodifica la actualización de estado y actualiza el trato en el CRM, marcando la fecha estimada de entrega y alertando a Ventas vía Slack, informando al emisor original (Head of Sales). Si no hay retorno en **48 horas**, el sistema reporta la desviación al S3 en la SAS semanal.

- **Capacidad y Cadencia:** Capacidad máxima de 5 solicitudes de pilotos simultáneas al mes. Cadencia de actualización diaria.

---

## 9. Análisis Cibernético del Sistema 2

El análisis cibernético del S2 de Synapta demuestra matemáticamente su efectividad para absorber variedad y proteger al metasistema (S3) de la sobrecarga de coordinación horizontal de acuerdo con la Ley de Ashby [9].

### 9.1 Demostración Matemática de la Absorción de Variedad

Definamos los siguientes parámetros de complejidad y variedad en el sistema Synapta en Fase 1 (MVP):
- Sea $N = 4$, el número de unidades operativas en el S1.
- Sea $v_i$, la variedad o cantidad de estados posibles del entorno operativo de la unidad $i$. Asumamos un promedio conservador de $v_i = 10$ estados críticos diarios (ej. caídas de API, dudas de onboarding, solicitudes de demos, tickets de error).
- Sea $V_{ext}$, la variedad total del entorno del S1 sin coordinar, calculada como el producto cartesiano de los estados de cada unidad:
  $$V_{ext} = \prod_{i=1}^{N} v_i = 10^4 = 10,000 \text{ estados posibles diarios.}$$

#### Escenario A: Sin Sistema 2 (Coordinación a través del S3 / CEO)
En ausencia de mecanismos S2 horizontales, el CEO (S3) debe resolver todos los conflictos y coordinaciones bilaterales entre las unidades del S1. La cantidad de canales de interacción potencial es de:
$$C_{paths} = \frac{N(N - 1)}{2} = \frac{4 \times 3}{2} = 6 \text{ canales directos.}$$

Si cada canal genera fricciones imprevistas de manera continua, la variedad de coordinación $V_{coord}$ que impacta directamente en el metasistema S3 es una función exponencial de los estados interactuantes:
$$V_{coord} = v_1 \times v_2 \times v_3 \times v_4 = 10,000 \text{ estados de fricción potencial.}$$

La capacidad de procesamiento de variedad del cerebro humano del CEO ($V_{CEO}$) está limitada por la Ley de Miller a aproximadamente $7 \pm 2$ piezas de información concurrentes [10]. Dado que $V_{CEO} \ll V_{coord}$ ($9 \ll 10,000$), el CEO colapsa bajo la variedad de los roces operativos, cayendo inevitablemente en la patología de **Hipertrofia del S3** (microgestión).

#### Escenario B: Con Sistema 2 Activo (Amortiguadores S2)
Al implementar los mecanismos S2 horizontales (Matriz P0-P3, Release Calendar, Silencio Aprobatorio de 48h), la variedad de coordinación se amortigua en el nivel de las unidades elementales. 

Las reglas de coordinación restringen los estados posibles del sistema, actuando como atenuadores matemáticos:
- El *Release Calendar* mensual restringe los estados de conflicto entre Ventas B2B e Ingeniería, reduciendo la variedad de promesas comerciales de $v_{sales} = 10$ a un único estado binario consolidado (Aprobado/No aprobado en producción).
- El *Silencio Aprobatorio de 48h* atenúa la fricción entre Growth y B2B, permitiendo que la campaña proceda por defecto y reduciendo la necesidad de coordinación en el 90% de los casos.
- La *Matriz P0-P3* clasifica automáticamente los tickets, resolviendo el 80% de las incidencias del soporte operativo de S1.4 mediante runbooks de S2 local.

Bajo este diseño, la variedad residual de coordinación que el S2 corporativo transmite al metasistema S3 es:
$$V_{residual} \approx C \text{ (donde } C \text{ es una constante de control semanal } \le 5 \text{ alertas consolidadas).}$$

Dado que $V_{residual} < V_{CEO}$ ($5 < 9$), el metasistema permanece libre de ruido operativo y puede concentrar su variedad de procesamiento en decisiones estratégicas de crecimiento (S4) y cohesión global (S3). **La Ley de Ashby se cumple:** el S2 absorbió la variedad excedente del S1 a través de sus normativas automatizadas.

---

## 10. Evaluación de Equilibrio Coordinación–Autonomía

El S2 es cibernéticamente saludable solo si logra armonizar la organización sin erosionar la autonomía de las unidades del S1. Si las reglas de coordinación se perciben como un obstáculo burocrático, el diseño del S2 ha fracasado.

### 10.1 Indicadores de Desviación Autocrática en el S2
Para prevenir la deriva autoritaria del S2, se establecen los siguientes indicadores de alerta en la SAS mensual:
- **🟡 Alerta de Oscilación Burocrática:** Más del 15% del tiempo del sprint de Ingeniería se consume en actualizar tableros o asistir a reuniones de coordinación horizontal.
- **🟡 Alerta de Tensión Horizontal:** El Head of Sales o el Head of Growth reporta que el protocolo de silencio aprobatorio de 48h ha provocado el bloqueo de campañas por falta de revisión oportuna por más de 2 ocasiones consecutivas.
- **🔴 Crítico (Deriva Autoritaria):** Directores de unidad eluden los mecanismos formales del S2 (ej. haciendo deploys a producción por fuera del pipeline o alterando precios sin registrar la campaña), indicando que perciben las reglas como un sistema autoritario ("burócratas") [1].

### 10.2 Acciones de Restablecimiento del Equilibrio
Si se gatilla una alerta de deriva autoritaria, el S3 convoca a una sesión extraordinaria en la SAS mensual para rediseñar el mecanismo afectado. La regla de oro cibernética es: **siempre se debe preferir la automatización de la restricción sobre la intervención humana**. Si un control de precios falla, la solución no es exigir firmas manuales del CEO, sino automatizar la alerta visual de tarifas en el HubSpot CRM.

---

## 11. Validación del Diseño del Sistema 2

Para garantizar que el S2 sea una herramienta de servicio y no una imposición burocrática, el diseño de todos los mecanismos descritos ha sido validado y co-diseñado de manera participativa por los propios directores de las unidades elementales de Synapta:

1. **El CTO (S1.1)** co-diseñó el protocolo de deploy de 24h y las alertas automatizadas de GitHub Actions, validando que se integran en su entorno técnico diario sin requerir tareas manuales.
2. **El Head of CS (S1.4)** validó y aprobó la Matriz P0-P3 y los runbooks de soporte local, asegurando que cubren las incidencias históricas y le permiten coordinar con DevOps sin saturar el canal.
3. **El Head of Sales (S1.3)** co-diseñó la Sizing Matrix y el Release Calendar, validando que estas herramientas protegen su reputación profesional ante los decanos de las universidades.
4. **El Head of Growth (S1.2)** validó el protocolo de silencio aprobatorio de 48h, asegurando que le da suficiente agilidad para reaccionar ante tendencias virales del mercado estudiantil.
5. **El CEO/CFO (S3)** actuó como facilitador del diseño sistémico, proveyendo asesoría y calibrando los límites financieros compartidos (S/. 350 mensuales de APIs) [4].

---

## 12. Conclusiones

La implementación formal del Sistema 2 en Synapta actúa como el homeostato horizontal indispensable para la viabilidad de YachaqAI. A través de la automatización de flujos C2, la definición de SLAs asíncronos y rutinas como el Release Calendar y el protocolo de Deploy, el S2 absorbe de manera continua la variedad de coordinación operativa.

Esto amortigua de manera eficaz las oscilaciones destructivas en el desarrollo de software y en la estrategia comercial, previniendo que el S1 caiga en comportamientos fragmentados, de "silos aislados" o en un modo destructivo de "sálvese quien pueda" (donde Ingeniería gaste el presupuesto en APIs o Ventas venda características inexistentes). El S2 garantiza que la autonomía del S1 se ejerza de forma responsable y alineada, preservando la cohesión y liberando al metasistema S3 para centrarse en la estrategia competitiva futura de Synapta.

---

## Fuentes Citadas

| # | Fuente | Detalle y Uso Metodológico |
| :--- | :--- | :--- |
| [1] | Beer, Stafford (1985). *Diagnosing the System for Organizations*. John Wiley & Sons. | Fundamentos del Sistema 2 como regulador horizontal de oscilaciones y el concepto del Canal 5 anti-oscilatorio. |
| [2] | StartupPeru / PROINNOVATE (2023). *Guía de Presupuestos y Pilotos de Validación en Startups Pre-Seed*. | Calibración de presupuestos operativos mínimos para validación en mercado local (S/. 150-500). |
| [3] | NCIIA (2019). *Student Venture Team Size and Commitment Standards*. | Calibración de la carga de horas (15-25h/sem) y dedicación de tiempo parcial en startups estudiantiles. |
| [4] | Google Cloud (2026). *Vertex AI / Gemini API Pricing Page*. | Costos de Gemini 2.5 Flash ($0.075/1M tokens entrada, $0.30/1M salida) para límites presupuestales mensuales. |
| [5] | Pérez Ríos, José (2008). *Diseño de organizaciones viables: Un enfoque sistémico*. Universidad de Valladolid. | Principios de diseño del S2, prevención de deriva autoritaria e hipertrofia del S3. |
| [6] | Cohn, Mike (2005). *Agile Estimating and Planning*. Prentice Hall. | Metodología de story points y velocidad del sprint en planificaciones de desarrollo de software agile. |
| [7] | GitLab (2022). *Remote Team Communication Playbook & Response SLAs*. | Estándares de respuesta para coordinación asíncrona en equipos remotos (4h en laborales, 24h en fin de semana). |
| [8] | Beyer, B., Jones, C., Petoff, J., & Murphy, K. (2016). *Site Reliability Engineering: How Google Runs Production Systems*. O'Reilly Media. | Modelos de alertas de incidentes, SLOs de Uptime y presupuestos de error (deploys con pre-aviso de 24h). |
| [9] | Ashby, W. Ross (1956). *An Introduction to Cybernetics*. Chapman & Hall. | Ley de la variedad requerida: solo la variedad puede absorber variedad. |
| [10] | Miller, George A. (1956). *The Magical Number Seven, Plus or Minus Two: Some Limits on Our Capacity for Processing Information*. Psychological Review. | Límites del procesamiento cognitivo humano para la justificación del colapso del CEO sin Sistema 2. |
| [11] | Y Combinator (2020). *Startup Playbook & MVP Validation Cycles*. | Ciclos estándar de validación comercial y decaimiento de momentum en equipos iniciales. |