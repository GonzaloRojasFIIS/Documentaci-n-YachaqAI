# 2_despliegue_recursion

> **Validación Cap. 2 (Pérez Ríos/Beer):** Esta fase corresponde a la *Dimensión Vertical* del método. Su objetivo es dividir la enorme variedad (complejidad) del entorno global en sub-entornos manejables, asignando a cada uno una sub-organización responsable. El resultado es una jerarquía de *Niveles de Recursión* anidados. Sin este despliegue, la organización enfrenta una variedad inmanejable y colapsa (patología de complejidad no desplegada).

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
Entorno Global LATAM (Nivel 0: Synapta)
  └── Entorno Técnico / Producto (Nivel 1.1: Ingeniería)
  └── Entorno de Mercado - B2C (Nivel 1.2a: Clientes individuales)
  └── Entorno de Mercado - B2B (Nivel 1.2b: Instituciones universitarias)
  └── Entorno Operativo / Infraestructura (Nivel 1.3: Soporte/DevOps)
```

Cada entorno de Nivel 1 es un **sub-conjunto** del entorno global de Synapta. La complejidad residual que no absorbe ningún Nivel 1 sube al Nivel 0 para ser gestionada por el metasistema corporativo (S3, S4, S5). Esta es la razón por la que el Cap. 2 indica que el entorno del Sistema 4 de una unidad operativa *está contenido dentro* del entorno del Sistema 4 de la organización que la engloba.

---

## 3. Criterios de Recursión Aplicados

Synapta aplica **dos criterios de recursión complementarios** para gestionar su variedad:

### 3.1 Criterio 1: Funcional de Valor (Nivel 1 — 3 unidades)
Divide el entorno según la cadena de valor de la empresa: desarrollo del producto, adquisición del mercado y operación del servicio. Este es el criterio principal y el más estable en el tiempo.

### 3.2 Criterio 2: Tipo de Cliente (Nivel 1.2 — 2 sub-unidades)
Dentro de la unidad de Crecimiento y Ventas (Nivel 1.2), se aplica un segundo criterio de división por **tipo de cliente** para gestionar la diferente variedad que genera cada segmento:

| Sub-nivel | Nombre | Entorno Específico |
| :--- | :--- | :--- |
| **1.2a** | División B2C | Estudiantes universitarios, profesionales en formación continua, investigadores y autodidactas intensivos que adquieren suscripciones mensuales/anuales. |
| **1.2b** | División B2B | Universidades, centros de educación y empresas que contratan licencias institucionales con SLA y soporte dedicado. |

> **Justificación cibernética:** El ciclo de venta B2C (días, adquisición digital, ticket bajo) y el ciclo B2B (semanas/meses, negociación presencial, ticket alto) tienen una variedad tan diferente que gestionarlos con el mismo equipo generaría oscilaciones destructivas. El Sistema 2 entre ambas sub-unidades evita que los recursos de ventas fluctúen caóticamente entre ambos mercados.

---

## 4. Estructura Completa de Niveles de Recursión

```
Nivel 0: Synapta (Sistema en Foco Global)
├── Nivel 1.1: Ingeniería y Producto
├── Nivel 1.2: Crecimiento y Ventas
│   ├── Nivel 1.2a: División B2C (Clientes Individuales)
│   └── Nivel 1.2b: División B2B (Instituciones Universitarias)
└── Nivel 1.3: Experiencia del Cliente e Infraestructura
```

---

## 5. Matriz de Niveles de Recursión y Factores Críticos

La matriz de 10 columnas (*"decálogo"* del Cap. 2) cruza cada nivel con sus factores de diseño críticos.

| Factor Crítico | Nivel 0: Synapta Global | Nivel 1.1: Ingeniería y Producto | Nivel 1.2a: B2C Clientes Individuales | Nivel 1.2b: B2B Instituciones | Nivel 1.3: Experiencia e Infraestructura |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Identificación** | Synapta S.A.C. Corporativo | Unidad de Producto YachaqAI | Div. Adquisición B2C | Div. Cuentas Institucionales B2B | Unidad Operaciones y Soporte |
| **2. Ámbito Espacial** | Global; inicio en Perú con expansión LATAM | Repositorio GitHub + infraestructura cloud (AWS/GCP) | Mercado digital nacional e internacional (web/app) | **105 universidades peruanas licenciadas** *(SUNEDU, 2026)* [1] + expansión LATAM | Servidores de producción; canal directo de soporte al usuario |
| **3. Propósito** | Viabilidad financiera y sostenibilidad de largo plazo | Diseñar y optimizar YachaqAI (RAG, SRS, Parser, UI) | Adquirir y retener aprendices intensivos (universitarios, profesionales e investigadores) con suscripciones | Cerrar contratos institucionales y gestionar cuentas B2B | Mantener uptime ≥ 99.9% y onboarding fluido |
| **4. Organización Responsable** | Junta de Fundadores / CEO / CFO | CTO + Equipo de Ingeniería | Head of Growth + Equipo de Marketing Digital | Head of Sales + Ejecutivos de Cuenta B2B | Head of Customer Success + DevOps Lead |
| **5. Stakeholders** | Inversores (VC/Angel), socios estratégicos, SUNEDU | Usuarios beta, contribuidores open source, auditores técnicos | **1.2 millones de estudiantes matriculados** en Perú *(SUNEDU SIU, 2023/2024)* [2] + profesionales en formación continua y autodidactas; >30 millones de estudiantes en LATAM *(Banco Mundial, 2021)* [3] | Decanos, rectores, directores de TI universitarios, directores de Capacitación Corporativa | Usuarios finales con incidencias; administradores de infraestructura |
| **6. Instituciones Influyentes** | Fondos de VC, SUNEDU, CONCYTEC, INDECOPI | OpenAI, Google Cloud, Hugging Face, GitHub | App Stores (Apple/Google), redes sociales, influencers EdTech | SUNEDU *(regulador)*, APEUNI, ASUP (asociaciones universitarias) | AWS, Vercel, Supabase, Cloudflare (proveedores cloud) |
| **7. Legislación Aplicable** | Ley General de Sociedades (LGS), régimen tributario SUNAT, MYPE | Licencias OSS, propiedad intelectual de algoritmos, GDPR para datos de entrenamiento | Ley N° 29733 *(Protección de datos, Perú)*, normativa de e-commerce | Ley Universitaria N° 30220, normativa de licenciamiento institucional SUNEDU | SLA contractuales, seguridad informática, ISO 27001 |
| **8. Acciones Formuladas** | Cerrar ronda semilla; firmar convenio marco con 3 universidades piloto | Lanzar v2.2 del motor Graph-SRS y el parser de PDFs con LlamaParse | Lanzar programa de referidos (universitarios + comunidades de aprendizaje profesional); alcanzar 5,000 usuarios activos en 90 días | Cerrar 3 pilotos pagos con universidades top-20 del Perú | Automatizar el sistema de onboarding conversacional; resolver tickets en < 1 hora |
| **9. Medios y Recursos** | Capital semilla, identidad corporativa, asesoría legal | Licencias de API (presupuesto mensual asignado), servidores de testing, equipo de 4–6 ingenieros | Presupuesto de pauta digital (Meta Ads, Google Ads), software de email marketing | CRM (HubSpot/Salesforce), material de presentación corporativa, contratos legales de licencia | Sistema de tickets (Zendesk/Intercom), herramientas de monitoreo (Datadog, Sentry) |
| **10. Canales de Comunicación** | Reuniones mensuales de directorio, reportes trimestrales a inversores | Slack técnico, GitHub PRs, reuniones semanales de Sprint Review | Campañas de email, comunidades universitarias y de aprendizaje profesional, Discord/Telegram de usuarios | Reuniones presenciales/virtuales B2B, presentaciones ejecutivas, emails de seguimiento | Telemetría en vivo del sistema de soporte; chat en tiempo real en la app |

---

## 6. El Director Local en Cada Nivel de Recursión

El Cap. 2 establece que cada unidad operativa (Sistema 1) debe tener un **director local** (*gerente de la unidad*) que actúa como bisagra entre el metasistema corporativo (S3 global) y las operaciones internas de su unidad. **El director local no es el S3 corporativo**, sino el responsable de gestionar la autonomía de su unidad:

| Nivel | Director Local | Responsabilidades Clave |
| :--- | :--- | :--- |
| **Nivel 1.1: Ingeniería** | CTO (Chief Technology Officer) | Asignar sprints, gestionar deuda técnica, negociar presupuesto de APIs con S3, reportar velocidad de entrega. |
| **Nivel 1.2a: B2C** | Head of Growth | Gestionar CAC y canales de adquisición, aprobar campañas de marketing, reportar MRR y churn al S3. |
| **Nivel 1.2b: B2B** | Head of Sales | Dirigir ciclos de venta institucional, aprobar descuentos y condiciones contractuales dentro de márgenes fijados por S3/S5. |
| **Nivel 1.3: Soporte/Infra** | Head of Customer Success + DevOps Lead | Gestionar SLAs operativos, asignar prioridades de soporte, reportar uptime y tiempo medio de resolución al S3. |

> **Diferencia clave con S3 (Cap. 2):** El director local gestiona el *interior* de su unidad con autonomía. El Sistema 3 corporativo (CEO/COO) *no* interviene en las operaciones diarias de las unidades — solo fija objetivos, asigna recursos y exige rendición de cuentas. La intervención directa del S3 en operaciones rutinarias es una patología organizacional descrita en el Cap. 2.

---

## 7. Diagnóstico y Prevención de Patologías Estructurales

El Cap. 2 identifica cuatro patologías que este diseño previene explícitamente:

| Patología | Descripción | Prevención en Synapta |
| :--- | :--- | :--- |
| **Inexistencia de despliegue vertical** | Gestionar toda la variedad global como una unidad plana. | Synapta divide el entorno desde el inicio en 4 sub-entornos con unidades autónomas en el Nivel 1. |
| **Falta de niveles en el primer nivel** | Empezar la recursión desde un segundo nivel, dejando el primero sin organización. | El Nivel 1 cubre la totalidad de la cadena de valor (Ingeniería, Ventas, Soporte) desde el día uno. |
| **Niveles intermedios huérfanos** | Dejar un sub-entorno sin una organización que lo atienda. | La creación de Divisiones B2C y B2B como sub-niveles de 1.2 garantiza que ningún segmento de mercado quede sin atención especializada. |
| **Despliegue enmarañado** | Unidades con múltiples dependencias cruzadas sin canales claros. | La división es puramente funcional para toda la región. Las expansiones geográficas futuras (Colombia, México) se añadirán *bajo* el Nivel 1.2b (B2B), manteniendo la jerarquía limpia. |

---

## Fuentes Citadas

| # | Fuente | Dato utilizado |
| :--- | :--- | :--- |
| [1] | SUNEDU (2026). *Listado de universidades con licencia institucional vigente* | 105 universidades licenciadas en Perú |
| [2] | SUNEDU – Sistema de Información Universitaria (2023/2024) | ~1.2 millones de estudiantes matriculados en universidades peruanas licenciadas |
| [3] | Banco Mundial (2021). *Educación superior en América Latina y el Caribe* | >30 millones de estudiantes en educación superior en LATAM |
