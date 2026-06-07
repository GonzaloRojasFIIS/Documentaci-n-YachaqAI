# 2_despliegue_recursion

> **Validación Cap. 2 (Pérez Ríos/Beer):** Esta fase corresponde a la *Dimensión Vertical* del método. Su objetivo es dividir la enorme variedad (complejidad) del entorno global en sub-entornos manejables, asignando a cada uno una sub-organización responsable. El resultado es una jerarquía de *Niveles de Recursión* anidados. Sin este despliegue, la organización enfrenta una variedad inmanejable y colapsa (patología de complejidad no desplegada).


## Tabla de Contenidos

- [1. Articulación de la Dimensión Vertical y la Dimensión Horizontal](#1-articulacion-de-la-dimension-vertical-y-la-dimension-horizontal)
- [2. Relación entre los Entornos de Cada Nivel de Recursión](#2-relacion-entre-los-entornos-de-cada-nivel-de-recursion)
- [3. Criterios de Recursión Aplicados](#3-criterios-de-recursion-aplicados)
  - [3.1 Criterio Funcional de Valor (Nivel 1 — 4 unidades)](#31-criterio-funcional-de-valor-nivel-1-4-unidades)
- [4. Estructura Completa de Niveles de Recursión](#4-estructura-completa-de-niveles-de-recursion)
- [5. Inventario de Recursos del Proyecto (Medios - Factor 9 de la Matriz)](#5-inventario-de-recursos-del-proyecto-medios-factor-9-de-la-matriz)
  - [5.1 Recurso Humano](#51-recurso-humano)
  - [5.2 Recurso Tecnológico](#52-recurso-tecnologico)
  - [5.3 Recurso Financiero](#53-recurso-financiero)
  - [5.4 Recurso Relacional](#54-recurso-relacional)
  - [5.5 Recurso Temporal](#55-recurso-temporal)
- [6. Matriz de Niveles de Recursión y Factores Críticos](#6-matriz-de-niveles-de-recursion-y-factores-criticos)
- [7. El Director Local en Cada Nivel de Recursión](#7-el-director-local-en-cada-nivel-de-recursion)
- [8. Relaciones entre Entornos de las Unidades Operativas](#8-relaciones-entre-entornos-de-las-unidades-operativas)
- [9. Diagnóstico y Prevención de Patologías Estructurales](#9-diagnostico-y-prevencion-de-patologias-estructurales)
- [10. Dashboard Operativo y KPIs por Unidad (Prevención de Cáncer Organizacional)](#10-dashboard-operativo-y-kpis-por-unidad-prevencion-de-cancer-organizacional)
  - [10.1 S1.1 — Ingeniería y Producto](#101-s11-ingenieria-y-producto)
  - [10.2 S1.2 — Growth/B2C](#102-s12-growthb2c)
  - [10.3 S1.3 — Ventas B2B](#103-s13-ventas-b2b)
  - [10.4 S1.4 — Soporte e Infraestructura](#104-s14-soporte-e-infraestructura)
- [11. Plan de Escalamiento Organizacional y Desdoblamiento de Complejidad](#11-plan-de-escalamiento-organizacional-y-desdoblamiento-de-complejidad)
  - [11.1 Fase 1 — MVP y Validación Comercial (2 a 5 personas) [9]](#111-fase-1-mvp-y-validacion-comercial-2-a-5-personas-9)
  - [11.2 Fase 2 — Tracción y Seed Funding (10 a 15 personas)](#112-fase-2-traccion-y-seed-funding-10-a-15-personas)
  - [11.3 Fase 3 — Expansión y Escalabilidad Regional (30 a 50 personas)](#113-fase-3-expansion-y-escalabilidad-regional-30-a-50-personas)
- [12. Fuentes Citadas](#12-fuentes-citadas)

---

---

## 1. Articulación de la Dimensión Vertical y la Dimensión Horizontal

Antes de entrar en la matriz, el Cap. 2 exige entender cómo se relacionan las dos dimensiones del método:

- **Dimensión Vertical (Despliegue de Complejidad):** Divide el entorno global en sub-entornos anidados, generando la jerarquía de niveles de recursión. Aquí se define *cuántos niveles* existen y qué organización gestiona cada uno.
- **Dimensión Horizontal (Sistema en Foco):** Una vez establecida la jerarquía, se "aterriza" en un nivel específico para analizar su estructura interna (los 5 sistemas MSV). El Cap. 2 la denomina *"sistema en foco"* o *"organización en foco"*.

La articulación entre ambas ocurre cuando, al fijar el sistema en foco (dimensión horizontal), se analiza cómo ese nivel absorbe la complejidad de **su** entorno específico, que a su vez es un sub-entorno del nivel superior. Esto garantiza que el análisis sea simultáneamente coherente hacia arriba (vertical) y exhaustivo hacia adentro (horizontal).

---

## 2. Relación entre los Entornos de Cada Nivel de Recursión

Los entornos de Synapta están **contenidos unos dentro de otros** (principio de anidamiento de la variedad del Cap. 2):

```
Entorno Global de Educación Superior en el Perú (Nivel 0: Synapta)
  └── Entorno Técnico / Producto (Nivel 1.1: Ingeniería)
  └── Entorno de Mercado B2C (Nivel 1.2: Crecimiento B2C)
  └── Entorno de Mercado B2B (Nivel 1.3: Ventas B2B)
  └── Entorno Operativo / Infraestructura (Nivel 1.4: Soporte/DevOps)
```

Cada entorno de Nivel 1 es un **sub-conjunto** del entorno global de Synapta. La complejidad residual que no absorbe ningún Nivel 1 sube al Nivel 0 para ser gestionada por el metasistema corporativo (S3, S4, S5). Esta es la razón por la que el Cap. 2 indica que el entorno del Sistema 4 de una unidad operativa *está contenido dentro* del entorno del Sistema 4 de la organización que la engloba.

---

## 3. Criterios de Recursión Aplicados

Synapta aplica un **criterio de segmentación directo** para gestionar su variedad:

### 3.1 Criterio Funcional de Valor (Nivel 1 — 4 unidades)
Divide el entorno según la cadena de valor de la empresa: desarrollo del producto, adquisición del mercado estudiantil masivo, negociación corporativa universitaria y soporte operacional.

| Nivel | Nombre | Entorno Específico |
| :--- | :--- | :--- |
| **1.1** | Ingeniería y Producto | APIs, modelos de lenguaje, bases de datos y frameworks de desarrollo. |
| **1.2** | Crecimiento B2C | Estudiantes universitarios, profesionales e investigadores individuales. |
| **1.3** | Ventas B2B | Decanos, decanatos, rectores y licencias institucionales universitarias. |
| **1.4** | Soporte y DevOps | Incidencias operativas de usuarios y disponibilidad de servidores. |

> **Justificación cibernética:** En la Fase 1, establecer un nivel de recursión intermedio para "Crecimiento y Ventas" (que requiriera su propio metasistema S1-S5 local) saturaría la capacidad del equipo de 2-5 personas. Por ello, se segmentan directamente en 4 unidades autónomas de Nivel 1, cada una con su propio canal C1 y C2 con el metasistema global de Nivel 0.

---

## 4. Estructura Completa de Niveles de Recursión

```
Nivel 0: Synapta (Sistema en Foco Global)
├── Nivel 1.1: Ingeniería y Producto
├── Nivel 1.2: Crecimiento B2C (Growth)
├── Nivel 1.3: Ventas B2B (Institucional)
└── Nivel 1.4: Soporte e Infraestructura
```

---

## 5. Inventario de Recursos del Proyecto (Medios - Factor 9 de la Matriz)

De acuerdo con el VSM de José Pérez Ríos, el Factor 9 de la Matriz de Recursión exige describir con precisión los **Medios** antes de comprometer cualquier acción planificada. En la cibernética organizacional, **toda acción del Sistema 1 debe estar respaldada obligatoriamente por los recursos y condiciones que aseguren su viabilidad operativa**. El metasistema corporativo debe responder con rigor para cada nivel: *qué se va a hacer, quién lo hará, cómo, cuándo, dónde, con qué medios, con qué requisitos y a qué costo*. 

El no vincular rigurosamente las acciones con los recursos escasos de la startup genera la patología de colapso operativo por falta de soporte estructural. Los rangos de recursos de Synapta se justifican bajo este principio:

### 5.1 Recurso Humano
El equipo está formado por **2 a 5 fundadores y desarrolladores (con dedicación mixta / tiempo parcial en la etapa inicial)**.
*   **Justificación del rango 2–5:** Por debajo de 2 personas, es inviable cumplir con el principio de *independencia estructural* del Sistema 3* (Auditoría), ya que quien opera (S1) no puede ser el mismo actor que audita sin viciar el canal C6. Por encima de 5 personas en una etapa pre-seed voluntaria sin financiamiento, la variedad de coordinación interna se incrementa exponencialmente, haciendo inviable la autoorganización sin una estructura administrativa pesada (patología de hipertrofia de coordinación). Rango de equipo inicial validado por la literatura sobre emprendimientos y equipos técnicos en fase temprana *(NCIIA, 2019; StartupPeru, 2023)*.
*   **Justificación de dedicación de 15–25 horas semanales:** Los integrantes combinan el desarrollo de YachaqAI con otras actividades profesionales o proyectos paralelos (carga mixta). Las 15–25 horas al proyecto representan el margen de variedad residual disponible. Menos de 15h paraliza la viabilidad del roadmap; más de 25h eleva exponencialmente el riesgo de fatiga y abandono del proyecto por parte del talento.
*   **Quién determina la disponibilidad real:** Cada integrante declara su disponibilidad al inicio del ciclo y la recalibra el primer lunes de cada mes. El CEO consolida estos datos en el **modelo de simulación M3 (Disponibilidad y Capacidad por Hitos Externos)**.
*   **Restricción por hitos externos/sobrecarga:** Los periodos de alta demanda profesional o entregas concurrentes en actividades paralelas de los fundadores reducen la disponibilidad del equipo a un mínimo de 5 horas. Durante estas semanas, el S3 tiene prohibido planificar desarrollos nuevos, limitando las acciones del S1.1 a mantenimiento de emergencia y soporte básico.

#### 5.1.1 Asignación Multifuncional y Prevención de Patologías de Roles
En una organización en etapa inicial de 2 a 5 personas, **la multifuncionalidad (multiactividad) es una necesidad absoluta y un principio de viabilidad**. Las 5 funciones sistémicas del VSM (S1, S2, S3, S3*, S4, S5) y los 7 roles específicos del proyecto (CEO, CFO, CTO, Head of Growth, Head of Sales, Head of CS, DevOps Lead) se cubren mediante la ocupación de múltiples roles sistémicos por parte de las mismas personas físicas, variando la asignación según el tamaño del equipo.

Para evitar conflictos de interés, confusión de identidades ("Sistema 3 Esquizofrénico") y el colapso del homeostato S3-S4, se definen los siguientes tres esquemas de asignación cibernética:

##### A) Configuración con 5 personas (Equipo Completo / Máximo Viable)
Es la distribución óptima que maximiza la especialización operativa de las subunidades del Sistema 1 y distribuye las tareas metasistémicas de soporte.

| Integrante (Persona Física) | Roles Organizacionales Cubiertos | Funciones VSM Asignadas | Justificación y Reglas de Prevención de Patologías |
| :--- | :--- | :--- | :--- |
| **Integrante 1 (CEO)** | Director General (CEO) / Responsable de Ventas (Head of Sales) | **S5 (Política), S4 (Inteligencia/Futuro), S3 (Decisor Integrador/Arbitraje S2 de Última Instancia), S1.3 (Ventas B2B)** | **Prevención del colapso del homeostato S3-S4 y esquizofrenia:** El CEO asume la dirección política (S5) y de inteligencia (S4), actuando como decisor de S3 e integrador de arbitraje horizontal de última instancia (S2) ante conflictos persistentes de unidades de Nivel 1. Delega el control operativo/financiero diario y de recursos al CFO para evitar ahogarse en la gestión diaria [11]. |
| **Integrante 2 (CTO)** | Director de Tecnología (CTO) / DevOps Lead | **S1.1 (Desarrollo RAG/Backend/IA), S1.4 (Soporte DevOps)** | **Autonomía Operativa de S1:** Tiene autonomía total para definir la arquitectura y el pipeline técnico de YachaqAI. Sus límites se coordinan mediante acuerdos de recursos en C4 [11]. |
| **Integrante 3 (CFO)** | Director de Finanzas (CFO) / Responsable de CS (Head of CS) | **S3 (Control Operativo/Financiero y Recursos), S2 (Coordinación Horizontal de Rutinas/SLAs), S1.4 (Operación CS)** | **Estandarización de Control y Coordinación:** El CFO asume el control financiero y la distribución de recursos (S3) y coordina las rutinas automáticas y preventivas horizontales (GitHub/HubSpot/SLAs) del S2, actuando como Auditor (S3*) para Ingeniería en el canal C6 [11]. |
| **Integrante 4** | Responsable de Growth (Head of Growth) | **S1.2 (Marketing, Growth y Beta-testers)** | **Enfoque en Variedad de Mercado:** Absorbe toda la complejidad de la captación orgánica de estudiantes y la retroalimentación del piloto beta. |
| **Integrante 5** | Desarrollador de Software (Frontend Dev) | **S1.1 (Desarrollo Frontend, UI y Visualización)** | **Redundancia Operativa y Auditoría Cruzada:** Trabaja en la unidad de Ingeniería (S1.1) junto al CTO, pero actúa como **Auditor (S3\*)** cualitativo de los reportes del CRM de Ventas (S1.3) y de Soporte/CS (S1.4) para evitar reportes sesgados [11]. |

##### B) Configuración con 3 personas (Equipo Base / Transición)
Es el modelo intermedio de desarrollo. En este esquema, los 7 roles específicos se consolidan en 3 personas físicas, manteniendo la separación de control e inteligencia.

| Integrante (Persona Física) | Roles Organizacionales Cubiertos | Funciones VSM Asignadas | Regla Cibernética de Separación |
| :--- | :--- | :--- | :--- |
| **Integrante 1 (CEO)** | CEO + Head of Sales + Head of Growth | **S5 (Política), S4 (Inteligencia/Futuro), S3 (Decisor/Arbitraje S2), S1.2 y S1.3 (Growth y Ventas B2B)** | Asume la representación política (S5), la inteligencia estratégica (S4), el arbitraje de S2 y la decisión final de S3, liderando las unidades operativas de mercado (S1.2 y S1.3). |
| **Integrante 2 (CTO)** | CTO + DevOps Lead | **S1.1 (Ingeniería), S1.4 (DevOps)** | Controla toda la operación tecnológica y despliegue del producto. Su canal algedónico de logs está automatizado. |
| **Integrante 3 (CFO)** | CFO + Head of CS | **S3 (Control Operativo/Financiero), S2 (Coordinación/SLAs), S1.4 (CS), S3\* (Auditoría)** | Controla los recursos tácticos y financieros (S3), las reglas y SLAs de coordinación (S2) y el soporte (S1.4), actuando como auditor externo (S3*) de performance. |

##### C) Configuración con 2 personas (Equipo Mínimo Viable)
Es el límite inferior absoluto de viabilidad cibernética. Menos de 2 personas hace imposible tener auditorías cruzadas sin viciar la objetividad.

*   **Persona A (CEO/CFO):** Asume las funciones metasistémicas **S5, S4, S3, S2** y las operaciones comerciales y de soporte **S1.2 (Growth) y S1.3 (Ventas B2B), más S1.4 (CS)**.
*   **Persona B (CTO):** Asume la operación tecnológica **S1.1 (Desarrollo/IA) y S1.4 (DevOps)**.
*   **Regla de Auditoría (S3\*):** Dado que la Persona B opera Ingeniería, la Persona A actúa como Auditor (S3\*) esporádico revisando los reportes de facturación de APIs de IA y Sentry logs. A su vez, la Persona B audita la base de datos de leads de la Persona A para verificar su correspondencia con los registros del sistema, manteniendo la separación conceptual e impidiendo el colapso por falta de balance.

##### Regla de Reuniones Estructuradas (Evitar el S3 Esquizofrénico)
En cualquiera de las configuraciones, para evitar la patología del *S3 Esquizofrénico* (donde las personas confunden sus roles durante la toma de decisiones), las Sesiones de Alineación Semanal (SAS) se estructuran en bloques con "sombreros conceptuales" explícitos: Bloque 1 (Soporte/SAS - táctico S3), Bloque 2 (Planificación - estratégico S4) y Bloque 3 (Alineación de valores - ético S5). Se prohíbe debatir políticas corporativas mientras se revisan incidentes diarios.

### 5.2 Recurso Tecnológico
Se diseñan los recursos tecnológicos alineados con la pila tecnológica de la propuesta de YachaqAI, utilizando capas de desarrollo/MVP y planificando el escalamiento hacia infraestructura de producción:
*   **Frontend:** React 19 + Next.js 15 (TypeScript) para SSR, React Flow v12 para visualización dinámica del grafo de conocimiento, CodeMirror 6 para edición Markdown modo dual, Zustand para estado global ligero y shadcn/ui + Tailwind CSS v4 para diseño visual.
*   **Backend y Agentes de IA:** FastAPI (Python 3.12) para procesamiento asíncrono rápido. Orquestación mediante LangGraph 0.2+ para los flujos de agentes con estados. Procesamiento de PDFs mediante LlamaParse, y motor de grafos con NetworkX. Planificador de repetición espaciada con py-fsrs (FSRS v5). Modelos de lenguaje Google Gemini 2.5 Flash (ingesta y evaluación) y Gemini 2.5 Pro (síntesis del LLM Wiki), embeddings con `text-embedding-004`. Celery + Redis para background jobs y watchdog para file watching. Ollama + Gemma 3 9B local como LLM opcional de respaldo.
*   **Base de Datos y Almacenamiento:** SQLite + SQLAlchemy 2.0 en desarrollo local (MVP) y PostgreSQL 16 + pgvector en staging/producción. Cloudflare R2 para almacenamiento de PDFs originales.
*   **Infraestructura y DevOps:** Docker + Docker Compose en desarrollo, Kubernetes (GKE/EKS) en producción, CI/CD con GitHub Actions y monitoreo con Prometheus + Grafana y Loki. Canales adicionales como Resend API para email y Firebase Cloud Messaging (FCM) para notificaciones push.
*   **Quién monitorea los límites:** El líder de Ingeniería (CTO) revisa semanalmente el consumo de almacenamiento y cuotas. Si se supera el 70% de los límites de almacenamiento o cuotas de APIs en el tier de desarrollo, se activa una alerta en la SAS mensual para planificar la depuración de datos o la migración de tier.

### 5.3 Recurso Financiero
El presupuesto operativo se sitúa en un rango de **S/. 150–500 mensuales** para la etapa de desarrollo/MVP, con proyección de escalar a **S/. 1,000–3,500 mensuales** (o capital de inversión) en staging/producción.
*   **Justificación del rango:** En etapa MVP cubre el consumo variable de la API de Gemini y LlamaParse (usando tiers gratuitos donde sea posible y paid-as-you-go en volumen) y alojamiento básico local/nube [12, 13]. La escala de producción absorbe los costos de nodos de Kubernetes, base de datos PostgreSQL administrada con pgvector, almacenamiento y egress en Cloudflare R2, y el volumen comercial de llamadas a las APIs de IA [12, 13, 14].
*   **Quién determina el presupuesto real:** El CFO, junto con el CTO, evalúa el consumo real en los primeros 3 días del mes y actualiza el **modelo de simulación M1 (Agotamiento de APIs)**. Un consumo mayor al proyectado mensual gatilla una SAS extraordinaria.

### 5.4 Recurso Relacional
La red de pruebas inicial se estima en **20–100 personas para la red beta**.
*   **Justificación del rango:** Representa la variedad del entorno inmediato y controlable por el equipo (compañeros de facultad, secciones del piloto docente). 20 usuarios es el tamaño de muestra mínimo estadísticamente representativo para validar la tasa de retención D7. 100 usuarios es el límite de difusión orgánica sin incurrir en costos de adquisición (CAC), lo que mantiene viable el proyecto dentro del presupuesto financiero cero para Growth.
*   **Quién mapea la red:** El Head of Growth mantiene el directorio de usuarios beta y accesos activos, actualizándolo semanalmente.

### 5.5 Recurso Temporal
El proyecto tiene un **horizonte de 4–5 meses** [15].
*   **Justificación del horizonte:** Corresponde al ciclo de validación del MVP y primer ciclo de pilotaje de producto (aproximadamente 4-5 meses de iteración activa) [15]. La viabilidad de este ciclo requiere que el desarrollo, el pilotaje comercial y la validación del encaje de mercado se completen dentro de esta ventana temporal para justificar la continuidad del financiamiento o transición a la siguiente fase de inversión [15].
*   **Administrador del calendario:** El CEO diseña y publica el calendario de sprints al inicio del ciclo, mapeando feriados e hitos de negocio críticos como restricciones temporales fijas.

---

## 6. Matriz de Niveles de Recursión y Factores Críticos

La matriz de 10 columnas (*"decálogo"* del Cap. 2) cruza cada nivel con sus factores de diseño críticos.

| Factor Crítico | Nivel 0: Synapta Global | Nivel 1.1: Ingeniería y Producto | Nivel 1.2: Crecimiento B2C | Nivel 1.3: Ventas B2B | Nivel 1.4: Soporte e Infraestructura |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Identificación** | Synapta S.A.C. Corporativo | Unidad de Producto YachaqAI | Unidad Crecimiento B2C | Unidad Ventas B2B | Unidad Soporte e Infra |
| **2. Ámbito Espacial** | Mercado digital universitario peruano. Aplicación web accesible desde cualquier dispositivo con conexión a internet, con difusión orgánica en universidades peruanas licenciadas por SUNEDU. El ámbito se limita a Perú en esta etapa porque el equipo carece de los recursos relacionales, financieros y temporales para absorber la variedad regulatoria y cultural de otro mercado nacional. El Cap. 2 establece que ampliar el ámbito sin tener la organización correspondiente genera la patología de nivel intermedio huérfano. | Repositorio GitHub + infraestructura cloud (AWS/GCP) | Mercado digital nacional (web/app) | **105 universidades peruanas licenciadas** *(SUNEDU, 2026)* [1] | Servidores de producción; canal directo de soporte al usuario |
| **3. Propósito** | Viabilidad financiera y sostenibilidad de largo plazo | Diseñar y optimizar YachaqAI (RAG, SRS, Parser, UI) | Adquirir y retener aprendices intensivos (universitarios, profesionales e investigadores) con suscripciones | Cerrar contratos institucionales y gestionar cuentas B2B | Mantener uptime ≥ 99.0% y onboarding fluido |
| **4. Organización Responsable** | Junta de Fundadores / CEO / CFO | CTO + Equipo de Ingeniería | Head of Growth + Equipo de Marketing Digital | Head of Sales + Ejecutivos de Cuenta B2B | Head of Customer Success + DevOps Lead |
| **5. Stakeholders** | Inversores (VC/Angel), socios estratégicos, SUNEDU | Registros de usuarios beta, auditores técnicos | **1.2 millones de estudiantes matriculados** en Perú *(SUNEDU SIU, 2023/2024)* [2] + profesionales en formación continua | Decanos, rectores, directores de TI universitarios, directores de Capacitación | Usuarios finales con incidencias; administradores de infraestructura |
| **6. Instituciones Influyentes** | Fondos de VC, SUNEDU, CONCYTEC, INDECOPI | OpenAI, Google Cloud, Hugging Face, GitHub | App Stores (Apple/Google), redes sociales, influencers EdTech | SUNEDU *(regulador)*, APEUNI, ASUP (asociaciones universitarias) | AWS, Vercel, Supabase, Cloudflare (proveedores cloud) |
| **7. Legislación Aplicable** | Ley General de Sociedades (LGS), régimen tributario SUNAT, MYPE | Licencias OSS, propiedad intelectual de algoritmos, GDPR para datos de entrenamiento | Ley N° 29733 *(Protección de datos, Perú)*, normativa de e-commerce | Ley Universitaria N° 30220, normativa de licenciamiento institucional SUNEDU | SLA contractuales, seguridad informática, ISO 27001 |
| **8. Acciones Formuladas** | Cerrar ronda semilla; firmar convenio marco con 3 universidades piloto | Lanzar v2.2 del motor Graph-SRS y el parser de PDFs con LlamaParse | Lanzar programa de referidos (universitarios + comunidades de aprendizaje profesional de Perú); alcanzar 5,000 usuarios activos en 90 días | Cerrar 3 pilotos pagos con universidades top-20 del Perú | Automatizar el sistema de onboarding conversacional; resolver tickets en < 1 hora |
| **9. Medios y Recursos** | Capital semilla, identidad corporativa, asesoría legal | Licencias de API (Gemini/LlamaParse), local hosting + Docker, repositorio GitHub, equipo de 2–5 fundadores/ingenieros con dedicación mixta | Presupuesto de pauta digital (Meta Ads, Google Ads), software de email marketing | CRM (HubSpot/Salesforce), material de presentación corporativa, contratos legales de licencia | Sistema de tickets (Zendesk/Intercom), herramientas de monitoreo (Datadog, Sentry) |
| **10. Canales de Comunicación** | Reuniones mensuales de directorio, reportes trimestrales a inversores | Slack técnico, GitHub PRs, reuniones semanales de Sprint Review | Campañas de email, comunidades universitarias y de aprendizaje profesional en Perú, Discord/Telegram de usuarios | Reuniones presenciales/virtuales B2B, presentaciones ejecutivas, emails de seguimiento | Telemetría en vivo del sistema de soporte; chat en tiempo real en la app |

---

## 7. El Director Local en Cada Nivel de Recursión

El Cap. 2 establece que cada unidad operativa (Sistema 1) debe tener un **director local** (*gerente de la unidad*) que actúa como bisagra entre el metasistema corporativo (S3 global) y las operaciones internas de su unidad. **El director local no es el S3 corporativo**, sino el responsable de gestionar la autonomía de su unidad:

| Nivel | Director Local | Responsabilidades Clave |
| :--- | :--- | :--- |
| **Nivel 1.1: Ingeniería** | CTO (Chief Technology Officer) | Asignar sprints, gestionar deuda técnica, negociar presupuesto de APIs con S3, reportar velocidad de entrega. |
| **Nivel 1.2: Growth/B2C** | Head of Growth | Gestionar CAC y canales de adquisición, aprobar campañas de marketing, reportar MRR y churn al S3. |
| **Nivel 1.3: Ventas B2B** | Head of Sales | Dirigir ciclos de venta institucional, aprobar descuentos y condiciones contractuales dentro de márgenes fijados por S3/S5. |
| **Nivel 1.4: Soporte/Infra** | Head of Customer Success + DevOps Lead | Gestionar SLAs operativos, asignar prioridades de soporte, reportar uptime y tiempo medio de resolución al S3. |

> **Diferencia clave con S3 (Cap. 2):** El director local gestiona el *interior* de su unidad con autonomía. El Sistema 3 corporativo (CEO/COO) *no* interviene en las operaciones diarias de las unidades — solo fija objetivos, asigna recursos y exige rendición de cuentas. La intervención directa del S3 en operaciones rutinarias es una patología organizacional descrita en el Cap. 2.---

## 8. Relaciones entre Entornos de las Unidades Operativas

El Cap. 2 (Figura 2.52) establece que las relaciones entre los entornos de las unidades operativas pueden ser absorbedoras de variedad (reducen trabajo para el equipo) o amplificadoras de conflicto (generan variedad no deseada en otra unidad). Si estas interacciones no están mapeadas, el equipo no puede anticiparlas ni diseñar mecanismos S2 que las absorban antes de que escalen al fundador principal.

| Entorno origen | Entorno impactado | Tipo | Mecanismo S2 | Justificación del mecanismo |
| :--- | :--- | :--- | :--- | :--- |
| B2C difunde el producto como "herramienta gratuita para estudiantes" | B2B: el docente pierde la percepción de valor diferencial del piloto institucional | Amplificadora | Informar al integrante de B2B con ≥ 48h antes de cualquier publicación que mencione precio o gratuidad | El docente universitario peruano decide adoptar una herramienta institucional basándose en percepción de valor y credibilidad académica. Un mensaje de "es gratis para todos" destruye el argumento de por qué el piloto con él es especial. Las 48h permiten coordinar el mensaje sin bloquear la publicación. Este mecanismo lo propone el integrante de Relaciones Institucionales. |
| B2C difunde el producto como "herramienta gratuita para estudiantes" | B2B: el docente pierde la percepción de valor diferencial del piloto institucional | Amplificadora | Informar al integrante de B2B con ≥ 48h antes de cualquier publicación que mencione precio o gratuidad | El docente universitario peruano decide adoptar una herramienta institucional basándose en percepción de valor y credibilidad académica. Un mensaje de "es gratis para todos" destruye el argumento de por qué el piloto con él es especial. Las 48h permiten coordinar el mensaje sin bloquear la publicación. |
| Ingeniería despliega un cambio en producción sin avisar | Soporte/Infra: aumentan mensajes de error de usuarios que no entienden el cambio | Amplificadora | Ningún deploy sin avisar al grupo del equipo con ≥ 24h de anticipación | Un deploy sin aviso previo genera un pico de tickets de soporte en la hora siguiente. Con un equipo de soporte que no tiene dedicación exclusiva, ese pico es inmanejable. Las 24h permiten que quien esté de turno en soporte sepa qué cambió. |
| Soporte detecta que usuarios se confunden con una funcionalidad | Ingeniería: recibe información de UX valiosa sin necesidad de investigación formal | Absorbedora | El integrante de Soporte incluye en su cuadro de mando semanal los top-3 puntos de fricción reportados esa semana | Los problemas de UX detectados por soporte son más representativos que los identificados por el equipo de ingeniería internamente. Al documentarlos, Ingeniería los recibe al inicio del sprint siguiente sin reuniones adicionales. |
| B2B promete a un docente una funcionalidad que no está en producción | Ingeniería: recibe presión de entrega no planificada que no cabe en el sprint | Amplificadora | Ningún compromiso de funcionalidad sin verificar en el tablero de GitHub Projects que esté marcada como "disponible en producción" | La verificación en GitHub Projects es un paso de 30 segundos que evita semanas de deuda de entrega. |
| Ingeniería cambia el proveedor de embeddings para reducir costos | Soporte/Infra: aumenta la latencia del RAG sin que Soporte lo sepa, y llegan quejas de usuarios | Amplificadora | Todo cambio de proveedor de API que afecte la experiencia del usuario se prueba en staging ≥ 48h y con al menos otro integrante que valide antes del deploy | Las 48h en staging permiten detectar degradaciones antes de que los usuarios las experimenten. |
| B2C: los primeros usuarios activos se concentran en una carrera específica | B2B: esa concentración señala una facultad concreta donde proponer un piloto | Absorbedora | Mensualmente, el integrante de Comunicación comparte con el integrante de B2B un resumen del perfil de los usuarios más activos | Los datos de comportamiento de los usuarios B2C son el insumo más barato para identificar qué facultades tienen mayor afinidad natural con el producto. |

**Protocolo para interacciones nuevas no mapeadas:** Cuando aparece un conflicto entre entornos que no está en la tabla, el integrante que detecta el impacto lo registra en el canal del equipo ese mismo día. Los dos integrantes involucrados tienen 48 horas para resolverlo directamente. Si no se resuelve, escala al fundador principal con toda la documentación, quien diseña una nueva regla de coordinación y la agrega a la tabla.

---

## 9. Diagnóstico y Prevención de Patologías Estructurales

El Cap. 3 del libro de José Pérez Ríos identifica cuatro patologías estructurales que atentan contra la viabilidad de la organización y que el presente diseño de Synapta previene de manera activa:

*   **Inexistencia de despliegue vertical (Organizaciones gigantes y colapso por variedad):** Ocurre al intentar gestionar la variedad global como una unidad plana y centralizada, lo que impide absorber la complejidad del entorno. En Synapta esto se evita al dividir el sistema en 4 sub-entornos bien delimitados (Ingeniería, Crecimiento B2C, Ventas B2B y Soporte e Infraestructura) asignando sub-organizaciones con directores locales autónomos (§3, §4, §6).
*   **Falta de niveles de recursión en el primer nivel (Zonas del entorno en la sombra):** Ocurre al no dotar de una organización formal a un área relevante del entorno global. En Synapta se previene porque las unidades de Nivel 1 cubren en su totalidad las tres dimensiones de viabilidad (desarrollo, mercado y operaciones) desde el primer día lectivo, impidiendo que existan sectores del entorno desatendidos.
*   **Falta de niveles de recursión en niveles intermedios (Negligencia de entornos intermedios):** Se presenta cuando áreas específicas del entorno intermedio carecen de una unidad responsable. En Synapta esto se evita al otorgar representación formal directa de Nivel 1 a las dos variantes del mercado comercial: Crecimiento B2C (Nivel 1.2) y Ventas B2B (Nivel 1.3), absorbiendo de manera autónoma y diferenciada la complejidad de los usuarios individuales y de los docentes institucionales sin aplanar la jerarquía del VSM.
*   **Despliegue vertical enredado (Membresías múltiples y conflictos de identidad):** Se genera cuando las unidades tienen múltiples relaciones de pertenencia cruzadas sin canales de representación, provocando colisiones de propósitos y valores. En Synapta, todas las unidades de Nivel 1 tienen una única dependencia del Nivel 0. Las expansiones futuras se asimilarán dentro de la unidad B2B existente (Nivel 1.3) y se regularán mediante mecanismos de coordinación S2, evitando crear nuevas jerarquías enredadas hasta que la organización cuente con financiamiento y estructura sólida.

---

## 10. Dashboard Operativo y KPIs por Unidad (Prevención de Cáncer Organizacional)

> **Prevención de la patología del S1: "Bestias Autopoyéticas / Cáncer Organizacional"**
> De acuerdo con el Cap. 3, esta patología ocurre cuando las unidades (S1) se orientan exclusivamente a su propio crecimiento, ignorando la misión de la organización completa. En Synapta, esto se previene mediante la intervención del **Sistema 3 corporativo (CEO/COO)**, el cual utiliza la **negociación de recursos** y este **sistema formal de rendición de cuentas** basado en KPIs. El S3 no interviene en la operación diaria, pero monitorea de forma integrada los KPIs de todas las unidades para asegurar el equilibrio dinámico.

### 10.1 S1.1 — Ingeniería y Producto
Propósito: Desarrollar YachaqAI garantizando el valor del producto y controlando el consumo de APIs según presupuesto M1.

**Capa 1 — Operativa (Revisión por sprint, responsable: CTO)**
*   **Story points completados / planificados:** Meta: `≥ 80%` (🟡: `60–79%`, 🔴: `< 60%`). *Fuente: Cohn, M. (2005).* 
*   **Bugs críticos abiertos en producción:** Meta: `0` (🟡: `1–2`, 🔴: `3+`).
*   **Tiempo de carga del parser (100 págs):** Meta: `≤ 4 minutos` (🟡: `4–6`, 🔴: `> 6`). *Fuente: Nielsen, J. (1993).*
*   **Costo de APIs / usuario activo / mes:** Meta: `≤ S/. 1.50` (🟡: `1.5–3.0`, 🔴: `> 3.0`). 
*   **Tasa de éxito del parser (PDFs académicos):** Meta: `≥ 85%` (🟡: `70–84%`, 🔴: `< 70%`). *Fuente: ParseBench (2024).*

**Capa 2 — Táctica (Revisado SAS mensual)**
*   **% de hitos del mes entregados:** Meta: `≥ 75%`.
*   **Desviación presupuesto APIs:** Meta: `≤ 20%`.

**Capa 3 — Algedónica (Alerta inmediata al metasistema)**
*   Servicio caído > 2h consecutivas.
*   Presupuesto agotado antes del día 20 del mes.
*   Bug crítico con pérdida de datos (Gatilla Protocolo de Emergencia §4.2).

---

### 10.2 S1.2 — Growth/B2C
Propósito: Conseguir y retener 50-150 usuarios activos mediante difusión orgánica.

**Capa 1 — Operativa (Revisión semanal, responsable: Head of Growth)**
*   **Usuarios activos semanales (WAU):** Meta: `Crecimiento constante` (🟡: `2 sem. sin crecimiento`, 🔴: `Caída 10+ WAU`).
*   **Retención al día 7:** Meta: `≥ 25%` (🟡: `12–24%`, 🔴: `< 12%`). *Fuente: Amplitude/Appcues (2023).*
*   **Sesiones de repaso SRS / usuario / semana:** Meta: `≥ 2`. 
*   **Tasa de completación del onboarding:** Meta: `≥ 50%` (🟡: `30–49%`, 🔴: `< 30%`). *Fuente: Mixpanel (2024).*

**Capa 2 — Táctica (Revisado SAS mensual)**
*   **Usuarios activos acumulados:** Meta: `Crecimiento lineal hacia 150`.
*   **Canales de difusión activados:** Meta: `≥ 1 canal/mes`.

**Capa 3 — Algedónica**
*   Queja pública en redes > 100 miembros.
*   Cero sesiones SRS completadas en 48 horas en total.

---

### 10.3 S1.3 — Ventas B2B
Propósito: Gestionar al menos 1 conversación exploratoria activa para piloto.

**Capa 1 — Operativa (Revisión semanal, responsable: Head of Sales)**
*   **Docentes en contacto activo:** Meta: `≥ 1` (🟡: `0 contactos/2 sem`, 🔴: `0 contactos/4 sem`).
*   **Estado piloto:** Meta: `Piloto activo antes del mes 2`.
*   **Frecuencia intercambio:** Meta: `≥ 1 intercambio semanal`.

**Capa 2 — Táctica**
*   **Piloto concluido:** Meta: `1 documento de impacto antes de fin de ciclo`.

**Capa 3 — Algedónica**
*   Abandono del docente del piloto.
*   Compromiso crítico incumplido.

---

### 10.4 S1.4 — Soporte e Infraestructura
Propósito: Mantener uptime ≥ 99% [17], resolución < 24h [16].

**Capa 1 — Operativa (Revisión diaria, responsable: Head of Customer Success)**
*   **Uptime semanal:** Meta: `≥ 99%` (🟡: `97–98.9%`, 🔴: `< 97%`) [17].
*   **Errores 5xx:** Meta: `≤ 5/día` [17].
*   **Tiempo resolución incidencias:** Meta: `≤ 24h` (🟡: `24–48h`, 🔴: `> 48h`) [16].

**Capa 2 — Táctica**
*   **Costo de infraestructura:** Meta: `S/. 0`.

**Capa 3 — Algedónica**
*   Servicio caído > 2h.
*   Límites de tier gratuito alcanzados.

---

## 11. Plan de Escalamiento Organizacional y Desdoblamiento de Complejidad

Para mantener la viabilidad cibernética y evitar que el metasistema colapse bajo el peso de la coordinación interna o la variedad externa, Synapta diseña su escalamiento a través de tres fases evolutivas basadas en el **Desdoblamiento de Complejidad** de Stafford Beer [11].

### 11.1 Fase 1 — MVP y Validación Comercial (2 a 5 personas) [9]
*   **Alcance:** Validación de product-market fit y pilotajes iniciales con beta testers y docentes piloto [10].
*   **Presupuesto:** S/. 150 - 500 mensuales (MVP en tiers gratuitos y costos variables mínimos de APIs de IA) [12, 13, 14].
*   **Estructura de Recursión (Nivel 1):** Las 4 unidades del Sistema 1 son áreas funcionales cubiertas mediante **multiactividad** por el núcleo fundador (CEO, CTO, CFO).
*   **Gobernabilidad Metasistémica:**
    *   **S2 (Coordinación):** Tableros integrados de GitHub Projects, webhooks automáticos y WhatsApp.
    *   **S3 (Control táctico):** Ejerce control directo y distribución del presupuesto limitado de APIs.
    *   **S3* (Auditoría):** Rotación cruzada simple entre fundadores.
    *   **S4 (Inteligencia/Entorno):** Monitoreo directo por el CEO y el CTO de los cambios de APIs de IA y competidores.
    *   **S5 (Política):** Junta de Fundadores informal que sesiona en la SAS mensual.

### 11.2 Fase 2 — Tracción y Seed Funding (10 a 15 personas)
*   **Alcance:** Cierre de contratos comerciales recurrentes con múltiples universidades, expansión del mercado B2C y robustecimiento de la arquitectura cloud en producción.
*   **Presupuesto:** S/. 5,000 - 15,000 mensuales (Financiado por ingresos recurrentes o inversión semilla) [15].
*   **Estructura de Recursión (Nivel 1):** Las 4 unidades de Nivel 1 se formalizan en equipos con **responsables de dedicación exclusiva** (desaparece la multiactividad metasistémica):
    *   **S1.1 (Ingeniería):** CTO + 2 desarrolladores (Frontend / RAG).
    *   **S1.2 (Growth/B2C):** Head of Growth + 1 especialista de contenido.
    *   **S1.3 (Ventas B2B):** Head of Sales + 1 ejecutivo de cuentas corporativas.
    *   **S1.4 (CS/Soporte):** Head of Customer Success + 1 ingeniero de soporte técnico.
*   **Gobernabilidad Metasistémica:**
    *   **S2 (Coordinación):** Se formalizan coordinadores S2 específicos y herramientas automatizadas (Webhooks de Slack/Discord a GitHub y automatizaciones de CRM).
    *   **S3 (Control táctico):** Centralizado en el CFO y un gestor de operaciones (COO) para monitorear presupuestos y cuotas en la nube.
    *   **S3* (Auditoría):** Auditorías automatizadas (SonarQube para código, Sentry para excepciones [17], NPS automatizado en PostHog). La rotación de auditoría cualitativa es asignada a miembros que no operan la unidad.
    *   **S4 (Inteligencia/Entorno):** Creación de un sub-comité de producto (CTO + CEO) enfocado en evaluar la evolución tecnológica de APIs de IA y cambios en la regulación de SUNEDU.
    *   **S5 (Política):** Se formaliza un Directorio (Junta Directiva) con la participación de inversores minoritarios.

### 11.3 Fase 3 — Expansión y Escalabilidad Regional (30 a 50 personas)
*   **Alcance:** Internacionalización (apertura de mercados en otros países de LATAM) y diversificación hacia el sector corporativo B2B (capacitación de personal).
*   **Estructura de Recursión (Nivel 1 y Nivel 2):** Se produce el **segundo desdoblamiento de recursión**. Para evitar que la dirección central colapse por la variedad regional, se crean divisiones geográficas o de mercado que operan como **sistemas viables independientes** (con sus propios S1-S5 locales) [11]:
    *   **Recursión Nivel 1 (Corporativo Central):** S5 Junta de Socios, S4 Dirección de Estrategia Internacional, S3 Dirección de Operaciones Globales.
    *   **Recursión Nivel 2 (Unidades Viables Autónomas):**
        *   **División Perú:** Cuenta con su propia unidad de Ingeniería Local, Fuerza de Ventas B2B Perú, y Soporte Perú. Reporta agregadamente al S3 Corporativo.
        *   **División Internacional:** Cuenta con su propio Gerente General local, Fuerza de Ventas local adaptada a las leyes locales, y Soporte local.
*   **Gobernabilidad Metasistémica:**
    *   **S2 (Coordinación):** El S2 corporativo define estándares globales de API y seguridad de datos, y los S2 locales gestionan el flujo de trabajo diario de cada país.
    *   **S3 (Control táctico):** El S3 central actúa como un *holding* que negocia y distribuye capital entre las divisiones basándose en el retorno de inversión y tracción.
    *   **S3* (Auditoría):** Auditoría centralizada de cumplimiento legal y financiero, combinada con auditorías técnicas locales.
    *   **S4 (Inteligencia/Entorno):** La inteligencia corporativa monitorea tendencias globales de IA (papers, modelos fundacionales de Google/OpenAI), mientras que el S4 local monitorea la legislación y la competencia en su respectivo país.
    *   **S5 (Política):** El S5 central resguarda la misión, visión e identidad ética de Synapta a nivel global.

---

## 12. Fuentes Citadas

| # | Fuente | Dato utilizado |
| :--- | :--- | :--- |
| [1] | SUNEDU (2026). *Listado de universidades con licencia institucional vigente* | 105 universidades licenciadas en Perú |
| [2] | SUNEDU – Sistema de Información Universitaria (2023/2024) | ~1.2 millones de estudiantes |
| [3] | Banco Mundial (2021). *Educación superior en América Latina* | Contexto mercado |
| [4] | Appcues/Amplitude (2023). *Benchmarks de retención* | Retención D7 25–35% |
| [5] | Mixpanel (2024). *SaaS Onboarding Report* | Onboarding 40–60% |
| [6] | LlamaIndex (2024). *LlamaParse Evaluation* | Parser 85% meta |
| [7] | Cohn, Mike (2005). *Agile Estimating* | 80% story points meta |
| [8] | Nielsen, Jakob (1993). *Usability Engineering* | 4 min parser meta |
| [9] | NCIIA (2019). *Student Venture Team Size* | 2-5 integrantes, 15-25h |
| [10] | StartupPeru (2023). *Guía de Pilotos EdTech* | 20-100 usuarios beta |
| [11] | Pérez Ríos, José (2008). *Diseño de organizaciones viables* | Patologías y VSM |
| [12] | Google Cloud (2026). *Vertex AI / Gemini API Pricing Page* | Gemini 2.5 Flash ($0.075/1M tokens) y text-embedding-004 ($0.025/1M tokens) |
| [13] | Supabase (2026). *Pricing Plans* | Base de datos PostgreSQL y pgvector (Free tier / Pro tier a $25/mes) |
| [14] | Vercel (2026). *Pricing and Plan Limits* | Hosting de frontend Next.js (Hobby gratis / Pro a $20/usuario/mes) |
| [15] | Y Combinator (2020). *Startup Playbook & MVP Validation Cycles* | Ciclo estándar de 3 a 5 meses para validación de MVP y tracción inicial |
| [16] | Zendesk (2024). *Customer Experience Trends Report 2024* | Estándares de la industria para tiempos de respuesta a soporte al cliente (≤ 24h para resolución inicial de incidencias) |
| [17] | Beyer, B., Jones, C., Petoff, J., & Murphy, K. (2016). *Site Reliability Engineering: How Google Runs Production Systems*. O'Reilly Media. | Prácticas recomendadas para metas de Uptime y tasas de error aceptables en arquitecturas de software |