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
Entorno Global de Educación Superior en el Perú (Nivel 0: Synapta)
  └── Entorno Técnico / Producto (Nivel 1.1: Ingeniería)
  └── Entorno de Mercado - B2C (Nivel 1.2a: Clientes individuales, profesionales e investigadores)
  └── Entorno de Mercado - B2B (Nivel 1.2b: Instituciones universitarias peruanas)
  └── Entorno Operativo / Infraestructura (Nivel 1.3: Soporte/DevOps)
```

Cada entorno de Nivel 1 es un **sub-conjunto** del entorno global de Synapta. La complejidad residual que no absorbe ningún Nivel 1 sube al Nivel 0 para ser gestionada por el metasistema corporativo (S3, S4, S5). Esta es la razón por la que el Cap. 2 indica que el entorno del Sistema 4 de una unidad operativa *está contenido dentro* del entorno del Sistema 4 de la organización que la engloba.

---

## 3. Criterios de Recursión Aplicados

Synapta aplica **dos criterios de recursión complementarios** para gestionar su variedad:

### 3.1 Criterio 1: Funcional de Valor (Nivel 1 — 3 unidades)
Divide el entorno según la cadena de valor de la empresa: desarrollo del producto, adquisición del mercado y operation del servicio. Este es el criterio principal y el más estable en el tiempo.

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

## 5. Inventario de Recursos del Proyecto

El MSV (Cap. 2, Factor 9 de la Matriz) exige que los medios disponibles estén descritos con precisión antes de planificar acciones, porque las acciones solo son viables si los recursos las sostienen. Los rangos que siguen tienen justificación propia.

### 5.1 Recurso humano
El equipo está formado por **2 a 5 estudiantes universitarios**.

*   **Justificación del rango 2–5:** Por debajo de 2 personas no es posible separar los roles mínimos que el MSV exige para que S3* funcione con independencia (quien opera no puede ser el mismo que audita). Por encima de 5 personas sin financiamiento, la coordinación voluntaria se vuelve insostenible sin estructura formal; es el límite superior que la literatura de equipos estudiantiles de emprendimiento universitario (NCIIA, 2019; StartupPeru, convocatorias 2021–2023) identifica como viable en proyectos sin remuneración.
*   **Justificación de la dedicación de 15–25 horas semanales:** La carga académica estándar de un estudiante universitario peruano de pregrado es de entre 20 y 30 créditos semestrales, lo que equivale aproximadamente a 30–40 horas semanales entre clases y estudio. Las 15–25 horas del proyecto representan el margen disponible sin afectar el rendimiento académico. Por debajo de 15 horas semanales por persona el avance del producto es demasiado lento para validar en un semestre; por encima de 25 horas sin remuneración el riesgo de abandono por agotamiento aumenta significativamente.
*   **Quién determina la disponibilidad real:** Cada integrante declara su disponibilidad semanal al inicio del semestre y la actualiza en la primera semana de cada mes. El fundador principal consolida esa información en el modelo M3 (sección de modelos de simulación).
*   **Nota sobre semanas de exámenes:** Las semanas 8 y 16 del semestre son las más frecuentes para evaluaciones parciales y finales en universidades peruanas con calendario semestral estándar. Durante esas semanas la capacidad cae a cerca de cero y los sprints deben planificarse con tareas de mantenimiento mínimo, no de desarrollo nuevo.

### 5.2 Recurso tecnológico
Las herramientas se usan en sus tiers gratuitos.

*   **Justificación de la elección de cada herramienta:** Vercel Hobby permite hasta 100 GB de transferencia y despliegues ilimitados para proyectos personales, suficiente para una base de 50–150 usuarios con uso moderado. Supabase Free ofrece 500 MB de base de datos y 2 GB de almacenamiento, suficiente para el modelo de datos de YachaqAI hasta aproximadamente 500 usuarios con mazos de tamaño normal. GitHub Free incluye repositorios privados ilimitados y GitHub Projects para gestión de tareas. Sentry Free cubre hasta 5,000 errores al mes, suficiente para la escala actual. UptimeRobot Free permite monitorear 50 endpoints con frecuencia de 5 minutos, suficiente para el servicio en esta etapa.
*   **Quién verifica los límites de cada tier:** El integrante de Ingeniería revisa semanalmente el consumo de cada plataforma y alerta al equipo cuando el uso supera el 70% del límite gratuito, activando el nivel Warning del canal algedónico.

### 5.3 Recurso financiero
El presupuesto operativo se sitúa en un rango de **S/. 50–200 mensuales**.

*   **Justificación del rango S/. 50–200 mensuales:** Este rango se calcula a partir del costo real de las APIs de LLMs para la escala de 50–150 usuarios con el modelo de uso de YachaqAI. El costo de Google Gemini 1.5 Flash es de USD 0.075 por millón de tokens de entrada y USD 0.30 por millón de tokens de salida (precios publicados en la consola de Google AI Studio). Una sesión típica de consulta RAG en YachaqAI consume aproximadamente 2,000–4,000 tokens en total. Con 100 usuarios haciendo 3 sesiones semanales, el consumo mensual es de aproximadamente 4.8–9.6 millones de tokens, lo que equivale a USD 1.80–7.20 al mes, es decir entre S/. 7 y S/. 27 al tipo de cambio (S/. 3.75 por dólar). El rango S/. 50–200 cubre holgadamente este escenario e incluye un margen para picos de uso, costos de dominio web (si aplica) y otros gastos menores.
*   **Quién determina el presupuesto mensual real:** El fundador principal, junto con el integrante de Ingeniería, revisa la facturación real del mes anterior en los primeros tres días de cada mes y actualiza el modelo M1. Si el gasto real supera S/. 150 en un mes, se convoca reunión extraordinaria para decidir si se reduce el uso, se optimiza la arquitectura o se busca financiamiento externo.

### 5.4 Recurso relacional
La red de pruebas inicial se estima en **20–100 personas para la red beta**.

*   **Justificación del rango 20–100 personas para la red beta:** Este rango corresponde al tamaño típico de una cohorte de estudiantes de un mismo ciclo en una carrera universitaria peruana (entre 25 y 40 estudiantes por sección, varias secciones). El límite superior de 100 representa el alcance realista de difusión orgánica en el entorno inmediato del equipo (compañeros de carrera, una o dos secciones adicionales, amigos en otras facultades) sin ninguna acción de marketing pagado.
*   **Quién mapea la red y la actualiza:** El integrante de Comunicación/Growth mantiene una hoja de Google Sheets con los canales de difusión activos (nombre del grupo, plataforma, número de miembros, fecha de última publicación). Esta hoja se actualiza cada vez que se activa un nuevo canal.

### 5.5 Recurso temporal
El proyecto tiene un **horizonte de 4–5 meses**.

*   **Justificación del horizonte de 4–5 meses:** Los semestres académicos en las principales universidades peruanas tienen una duración oficial de 17–18 semanas (aproximadamente 4.5 meses), con un período efectivo de trabajo productivo de entre 14 y 15 semanas una vez descontadas las semanas de exámenes y la semana de inicio administrativo. Este es el horizonte de planificación real del proyecto.
*   **Quién administra el calendario del proyecto:** El fundador principal publica al inicio del semestre un calendario de sprints que marca explícitamente las semanas de exámenes, los feriados universitarios y las ventanas de vacaciones. Ese calendario es el insumo principal del modelo M3.

---

## 6. Matriz de Niveles de Recursión y Factores Críticos

La matriz de 10 columnas (*"decálogo"* del Cap. 2) cruza cada nivel con sus factores de diseño críticos.

| Factor Crítico | Nivel 0: Synapta Global | Nivel 1.1: Ingeniería y Producto | Nivel 1.2a: B2C Clientes Individuales | Nivel 1.2b: B2B Instituciones | Nivel 1.3: Experiencia e Infraestructura |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Identificación** | Synapta S.A.C. Corporativo | Unidad de Producto YachaqAI | Div. Adquisición B2C | Div. Cuentas Institucionales B2B | Unidad Operaciones y Soporte |
| **2. Ámbito Espacial** | Mercado digital universitario peruano. Aplicación web accesible desde cualquier dispositivo con conexión a internet, con difusión orgánica en universidades peruanas licenciadas por SUNEDU. El ámbito se limita a Perú en esta etapa porque el equipo carece de los recursos relacionales, financieros y temporales para absorber la variedad regulatoria y cultural de otro mercado nacional. El Cap. 2 establece que ampliar el ámbito sin tener la organización correspondiente genera la patología de nivel intermedio huérfano. | Repositorio GitHub + infraestructura cloud (AWS/GCP) | Mercado digital nacional (web/app) | **105 universidades peruanas licenciadas** *(SUNEDU, 2026)* [1] | Servidores de producción; canal directo de soporte al usuario |
| **3. Propósito** | Viabilidad financiera y sostenibilidad de largo plazo | Diseñar y optimizar YachaqAI (RAG, SRS, Parser, UI) | Adquirir y retener aprendices intensivos (universitarios, profesionales e investigadores) con suscripciones | Cerrar contratos institucionales y gestionar cuentas B2B | Mantener uptime ≥ 99.9% y onboarding fluido |
| **4. Organización Responsable** | Junta de Fundadores / CEO / CFO | CTO + Equipo de Ingeniería | Head of Growth + Equipo de Marketing Digital | Head of Sales + Ejecutivos de Cuenta B2B | Head of Customer Success + DevOps Lead |
| **5. Stakeholders** | Inversores (VC/Angel), socios estratégicos, SUNEDU | Usuarios beta, contribuidores open source, auditores técnicos | **1.2 millones de estudiantes matriculados** en Perú *(SUNEDU SIU, 2023/2024)* [2] + profesionales en formación continua y autodidactas en el territorio nacional. | Decanos, rectores, directores de TI universitarios, directores de Capacitación Corporativa | Usuarios finales con incidencias; administradores de infraestructura |
| **6. Instituciones Influyentes** | Fondos de VC, SUNEDU, CONCYTEC, INDECOPI | OpenAI, Google Cloud, Hugging Face, GitHub | App Stores (Apple/Google), redes sociales, influencers EdTech | SUNEDU *(regulador)*, APEUNI, ASUP (asociaciones universitarias) | AWS, Vercel, Supabase, Cloudflare (proveedores cloud) |
| **7. Legislación Aplicable** | Ley General de Sociedades (LGS), régimen tributario SUNAT, MYPE | Licencias OSS, propiedad intelectual de algoritmos, GDPR para datos de entrenamiento | Ley N° 29733 *(Protección de datos, Perú)*, normativa de e-commerce | Ley Universitaria N° 30220, normativa de licenciamiento institucional SUNEDU | SLA contractuales, seguridad informática, ISO 27001 |
| **8. Acciones Formuladas** | Cerrar ronda semilla; firmar convenio marco con 3 universidades piloto | Lanzar v2.2 del motor Graph-SRS y el parser de PDFs con LlamaParse | Lanzar programa de referidos (universitarios + comunidades de aprendizaje profesional de Perú); alcanzar 5,000 usuarios activos en 90 días | Cerrar 3 pilotos pagos con universidades top-20 del Perú | Automatizar el sistema de onboarding conversacional; resolver tickets en < 1 hora |
| **9. Medios y Recursos** | Capital semilla, identidad corporativa, asesoría legal | Licencias de API (presupuesto mensual asignado), servidores de testing, equipo de 4–6 ingenieros | Presupuesto de pauta digital (Meta Ads, Google Ads), software de email marketing | CRM (HubSpot/Salesforce), material de presentación corporativa, contratos legales de licencia | Sistema de tickets (Zendesk/Intercom), herramientas de monitoreo (Datadog, Sentry) |
| **10. Canales de Comunicación** | Reuniones mensuales de directorio, reportes trimestrales a inversores | Slack técnico, GitHub PRs, reuniones semanales de Sprint Review | Campañas de email, comunidades universitarias y de aprendizaje profesional en Perú, Discord/Telegram de usuarios | Reuniones presenciales/virtuales B2B, presentaciones ejecutivas, emails de seguimiento | Telemetría en vivo del sistema de soporte; chat en tiempo real en la app |

---

## 7. El Director Local en Cada Nivel de Recursión

El Cap. 2 establece que cada unidad operativa (Sistema 1) debe tener un **director local** (*gerente de la unidad*) que actúa como bisagra entre el metasistema corporativo (S3 global) y las operaciones internas de su unidad. **El director local no es el S3 corporativo**, sino el responsable de gestionar la autonomía de su unidad:

| Nivel | Director Local | Responsabilidades Clave |
| :--- | :--- | :--- |
| **Nivel 1.1: Ingeniería** | CTO (Chief Technology Officer) | Asignar sprints, gestionar deuda técnica, negociar presupuesto de APIs con S3, reportar velocidad de entrega. |
| **Nivel 1.2a: B2C** | Head of Growth | Gestionar CAC y canales de adquisición, aprobar campañas de marketing, reportar MRR y churn al S3. |
| **Nivel 1.2b: B2B** | Head of Sales | Dirigir ciclos de venta institucional, aprobar descuentos y condiciones contractuales dentro de márgenes fijados por S3/S5. |
| **Nivel 1.3: Soporte/Infra** | Head of Customer Success + DevOps Lead | Gestionar SLAs operativos, asignar prioridades de soporte, reportar uptime y tiempo medio de resolución al S3. |

> **Diferencia clave con S3 (Cap. 2):** El director local gestiona el *interior* de su unidad con autonomía. El Sistema 3 corporativo (CEO/COO) *no* interviene en las operaciones diarias de las unidades — solo fija objetivos, asigna recursos y exige rendición de cuentas. La intervención directa del S3 en operaciones rutinarias es una patología organizacional descrita en el Cap. 2.---

## 8. Relaciones entre Entornos de las Unidades Operativas

El Cap. 2 (Figura 2.52) establece que las relaciones entre los entornos de las unidades operativas pueden ser absorbedoras de variedad (reducen trabajo para el equipo) o amplificadoras de conflicto (generan variedad no deseada en otra unidad). Si estas interacciones no están mapeadas, el equipo no puede anticiparlas ni diseñar mecanismos S2 que las absorban antes de que escalen al fundador principal.

| Entorno origen | Entorno impactado | Tipo | Mecanismo S2 | Justificación del mecanismo |
| :--- | :--- | :--- | :--- | :--- |
| B2C difunde el producto como "herramienta gratuita para estudiantes" | B2B: el docente pierde la percepción de valor diferencial del piloto institucional | Amplificadora | Informar al integrante de B2B con ≥ 48h antes de cualquier publicación que mencione precio o gratuidad | El docente universitario peruano decide adoptar una herramienta institucional basándose en percepción de valor y credibilidad académica. Un mensaje de "es gratis para todos" destruye el argumento de por qué el piloto con él es especial. Las 48h permiten coordinar el mensaje sin bloquear la publicación. Este mecanismo lo propone el integrante de Relaciones Institucionales. |
| Ingeniería despliega un cambio en producción sin avisar | Soporte/Infra: aumentan mensajes de error de usuarios que no entienden el cambio | Amplificadora | Ningún deploy sin avisar al grupo del equipo con ≥ 24h de anticipación | Un deploy sin aviso previo genera un pico de tickets de soporte en la hora siguiente. Con un equipo de soporte que no tiene dedicación exclusiva, ese pico es inmanejable. Las 24h permiten que quien esté de turno en soporte sepa qué cambió y pueda responder las primeras consultas con información. Este mecanismo lo propone el integrante de Ingeniería. |
| Soporte detecta que usuarios se confunden con una funcionalidad | Ingeniería: recibe información de UX valiosa sin necesidad de investigación formal | Absorbedora | El integrante de Soporte incluye en su cuadro de mando semanal los top-3 puntos de fricción reportados esa semana | Los problemas de UX detectados por soporte son más representativos que los identificados por el equipo de ingeniería internamente, porque reflejan el comportamiento real del usuario. Al documentarlos en el cuadro de mando semanal, Ingeniería los recibe al inicio del sprint siguiente sin necesidad de reuniones adicionales. Este mecanismo lo propone el integrante de Soporte. |
| B2B promete a un docente una funcionalidad que no está en producción | Ingeniería: recibe presión de entrega no planificada que no cabe en el sprint | Amplificadora | Ningún compromiso de funcionalidad sin verificar en el tablero de GitHub Projects que esté marcada como "disponible en producción" | El integrante de Relaciones Institucionales, al estar en conversación con el docente, puede comprometer funcionalidades que conoce del roadmap pero que aún no están listas. La verificación en GitHub Projects es un paso de 30 segundos que evita semanas de deuda de entrega. Este mecanismo lo propone el integrante de Ingeniería. |
| Ingeniería cambia el proveedor de embeddings para reducir costos | Soporte/Infra: aumenta la latencia del RAG sin que Soporte lo sepa, y llegan quejas de usuarios | Amplificadora | Todo cambio de proveedor de API que afecte la experiencia del usuario se prueba en staging ≥ 48h y con al menos otro integrante que valide antes del deploy | Los cambios de proveedor de API tienen efectos no predecibles en latencia y comportamiento de las respuestas. Las 48h en staging permiten detectar degradaciones antes de que los usuarios las experimenten. Este mecanismo lo propone el integrante de Ingeniería. |
| B2C: los primeros usuarios activos se concentran en una carrera específica | B2B: esa concentración señala una facultad concreta donde proponer un piloto | Absorbedora | Mensualmente, el integrante de Comunicación comparte con el integrante de B2B un resumen del perfil de los usuarios más activos | Los datos de comportamiento de los usuarios B2C son el insumo más barato para identificar qué facultades tienen mayor afinidad natural con el producto. Esta información orienta las conversaciones institucionales sin necesidad de investigación de mercado adicional. Este mecanismo lo propone el integrante de Comunicación. |

**Protocolo para interacciones nuevas no mapeadas:** Cuando aparece un conflicto entre entornos que no está en la tabla, el integrante que detecta el impacto lo registra en el canal del equipo ese mismo día. Los dos integrantes involucrados tienen 48 horas para resolverlo directamente. Si no se resuelve, escala al fundador principal con toda la documentación, quien diseña una nueva regla de coordinación y la agrega a la tabla.

*Justificación de las 48 horas para resolución directa:* Es el tiempo suficiente para que ambos integrantes puedan conversar con sus agendas académicas sin que el conflicto se prolongue indefinidamente. Más tiempo normaliza el conflicto como "algo que se verá después". Menos tiempo no respeta la disponibilidad parcial del equipo.

---

## 9. Diagnóstico y Prevención de Patologías Estructurales

El Cap. 2 identifica cuatro patologías que este diseño previene explícitamente:

| Patología | Descripción | Prevención en Synapta |
| :--- | :--- | :--- |
| **Inexistencia de despliegue vertical** | Gestionar toda la variedad global como una unidad plana. | Synapta divide el entorno desde el inicio en 4 sub-entornos con unidades autónomas en el Nivel 1. |
| **Falta de niveles en el primer nivel** | Empezar la recursión desde un segundo nivel, dejando el primero sin organización. | El Nivel 1 cubre la totalidad de la cadena de valor (Ingeniería, Ventas, Soporte) desde el día uno. |
| **Niveles intermedios huérfanos** | Dejar un sub-entorno sin una organización que lo atienda. | La creación de Divisiones B2C y B2B como sub-niveles de 1.2 garantiza que ningún segmento de mercado quede sin atención especializada. |
| **Despliegue enmarañado** | Unidades con múltiples dependencias cruzadas sin canales claros. | Las expansiones futuras dentro del ecosistema universitario peruano consisten en incorporar nuevas facultades o programas de estudio como nuevos pilotos. Esto se hace dentro de la misma estructura funcional existente (Nivel 1.2b, Relaciones Institucionales) sin añadir niveles geográficos. La variedad adicional que genera cada nueva facultad o universidad se absorbe dentro de la unidad B2B existente mediante el fortalecimiento de sus mecanismos S2 internos. Solo cuando el proyecto cuente con financiamiento externo, equipo dedicado y presencia regulatoria en otro país, se activará formalmente un criterio de recursión geográfico con su propia cadena de despliegue vertical. |

---

## 10. Dashboard Operativo y KPIs por Unidad

Para cada KPI se especifica: el valor de la meta, la fuente de ese valor (referencia de industria, cálculo operativo o restricción técnica) y quién es el responsable de calibrarlo o revisarlo con datos propios del proyecto.

### 10.1 S1.1 — Ingeniería y Producto
Propósito: Desarrollar y mantener YachaqAI con calidad suficiente para validar la propuesta de valor con usuarios reales, controlando el consumo de APIs dentro del presupuesto disponible.

**Capa 1 — Operativa (Revisión por sprint, responsable: CTO / Integrante de Ingeniería)**
*   **Story points completados / planificados en el sprint:** Meta: `≥ 80%` (Alerta 🟡: `60–79%`, Crítico 🔴: `< 60%`). El 80% como meta operativa es el umbral estándar de equipos Scrum que aceptan que un 20% de las tareas planificadas puede bloquearse por dependencias externas. *Fuente: Cohn, M., Agile Estimating and Planning (2005).* El integrante de Ingeniería revisa este valor después de los primeros 3 sprints y ajusta si el equipo consistentemente sobre o subestima.
*   **Bugs críticos abiertos en producción:** Meta: `0` (Alerta 🟡: `1–2`, Crítico 🔴: `3 o más`). Meta 0 porque cualquier bug que afecta el flujo principal del usuario (onboarding, sesión SRS, parser) destruye la experiencia de un usuario beta. El integrante de Ingeniería define qué etiquetas califican como "crítico" en la primera semana.
*   **Tiempo de carga del parser de PDFs (100 páginas):** Meta: `≤ 4 minutos` (Alerta 🟡: `4–6 minutos`, Crítico 🔴: `> 6 minutos`). 4 minutos es el umbral de tolerancia psicológica para espera activa en una tarea de preparación, según la literatura de UX *(Nielsen, 1993)*. El integrante de Ingeniería mide el tiempo real con el hardware y conexión a internet promedio del equipo en la primera semana.
*   **Costo de APIs / usuario activo / mes:** Meta: `≤ S/. 1.50` (Alerta 🟡: `S/. 1.50–S/. 3.00`, Crítico 🔴: `> S/. 3.00`). S/. 1.50 por usuario corresponde a unos USD 0.40. Con el costo estimado de USD 0.004 por sesión RAG y 12 sesiones al mes, el costo base es USD 0.048. S/. 1.50 incluye un margen de 8x para absorber variaciones de uso. El integrante de Ingeniería calcula este valor al cierre del primer mes completo.
*   **Tasa de éxito del parser:** Meta: `≥ 85%` (Alerta 🟡: `70–84%`, Crítico 🔴: `< 70%`). 85% de éxito es el estándar documentado de LlamaParse en documentos académicos estables. El 15% restante corresponde a PDFs con características problemáticas (sin OCR, escaneados, protegidos). El integrante de Ingeniería lleva un registro en Google Sheets para calibrar.

**Capa 2 — Táctica (Revisado en la SAS mensual por todo el equipo)**
*   **% de hitos del mes entregados:** Meta: `≥ 75%`. Más permisivo que la capa operativa porque el nivel táctico agrega sprints completos y las semanas de exámenes reducen el avance.
*   **Desviación del presupuesto de APIs vs. planificado:** Meta: `≤ 20%`. Margen mayor que el empresarial (10%) porque en proyectos estudiantiles el uso real varía más rápido.
*   **Deploy funcional a producción:** Meta: `Al menos 1 deploy por semana de sprint activo` (excluyendo semanas de exámenes). La ausencia de deploys por más de 1 semana indica parálisis.

**Capa 3 — Algedónica (Activa alerta inmediata al metasistema)**
*   Servicio caído más de 2 horas consecutivas.
*   Consumo de APIs supera el presupuesto mensual completo antes del día 20 del mes.
*   Bug que causa pérdida o exposición de datos de usuarios.

---

### 10.2 S1.2a — B2C: Clientes Individuales
Propósito: Conseguir y retener entre 50 y 150 usuarios activos en los primeros 90 días mediante difusión orgánica en redes universitarias.
*Justificación del rango 50–150:* Se calibra según el tamaño de una cohorte universitaria típica (20-40 alumnos por sección, 2-3 secciones accesibles), la experiencia en pilotos de StartupPeru y los límites de la base de datos de Supabase Free (500 MB).

**Capa 1 — Operativa (Revisión semanal, responsable: Head of Growth)**
*   **Usuarios activos semanales (WAU):** Meta: `Tendencia de crecimiento constante` (Alerta 🟡: `2 semanas consecutivas sin crecimiento`, Crítico 🔴: `Caída de 10+ WAU en una semana`). 10 usuarios representa entre el 7% y el 20% de la base objetivo inicial. El Head of Growth lo revisa cada lunes en PostHog/GA4.
*   **Retención al día 7:** Meta: `≥ 30%` (Alerta 🟡: `15–29%`, Crítico 🔴: `< 15%`). 30% es el benchmark de retención al día 7 para habit-forming apps académicas. El Head of Growth lo calcula a partir de cohortes en PostHog.
*   **Sesiones de repaso SRS completadas / usuario activo / semana:** Meta: `≥ 2 sesiones/semana` (Alerta 🟡: `1 sesión/semana`, Crítico 🔴: `0 sesiones en 48 horas para la mayoría`). 2 sesiones es el mínimo para que el algoritmo FSRS amortigüe la curva del olvido. Si es menor, se revisa si hay fricción excesiva.
*   **Tasa de completación del onboarding:** Meta: `≥ 60%` (Alerta 🟡: `40–59%`, Crítico 🔴: `< 40%`). 60% es el umbral para onboardings de nicho técnico (subir PDF, configurar horario, primer repaso) según Mixpanel (2023).

**Capa 2 — Táctica (Revisado en la SAS mensual)**
*   **Usuarios activos acumulados:** Avance progresivo hacia el objetivo final de 50-150 usuarios.
*   **Nuevos canales de difusión activados:** Meta: `≥ 1 canal nuevo por mes` (comunidades de estudiantes o de desarrollo profesional).

**Capa 3 — Algedónica (Alerta inmediata)**
*   Pérdida de 10 o más WAU en una semana.
*   Cero sesiones de repaso completadas en 48 horas en total.
*   Queja pública en redes o grupos estudiantiles con > 100 miembros.

---

### 10.3 S1.2b — B2B: Relaciones Institucionales
Propósito: Gestionar al menos 1 conversación exploratoria activa con un docente o coordinador para un piloto informal gratuito antes del fin de semestre.
*Justificación de la meta (1 piloto):* NCIIA (2019) y CONCYTEC recomiendan pilotos profundos de alta fidelidad con 1-3 docentes en etapa inicial antes de expandirse.

**Capa 1 — Operativa (Revisión semanal, responsable: Head of Sales)**
*   **Docentes en conversación activa:** Meta: `≥ 1 contacto activo` (Alerta 🟡: `0 contactos por 2 semanas`, Crítico 🔴: `0 contactos por 4 semanas`). 2 semanas sin contacto es el umbral en que las relaciones académicas se enfríen rápidamente en universidades peruanas.
*   **Estado del piloto en curso:** Meta: `Al menos 1 piloto activo antes del mes 2 del semestre` (Alerta 🟡: `Pendiente después del mes 2`, Crítico 🔴: `Pilotaje abandonado sin sucesor`). Si el piloto no empieza en el mes 2, las 17 semanas de clase no permitirán evaluar el impacto antes del final del ciclo.
*   **Frecuencia de contacto con el docente:** Meta: `≥ 1 intercambio semanal` (Alerta 🟡: `1 intercambio cada 2 semanas`, Crítico 🔴: `Sin contacto por 3 semanas`).
*   **Feedback formal del docente:** Meta: `≥ 1 feedback documentado al mes`.

**Capa 2 — Táctica (Revisado en la SAS mensual)**
*   **Piloto completado con éxito:** Meta: `1 piloto concluido y documentado antes del fin de ciclo`.
*   **Testimonios usables:** Meta: `≥ 1 testimonio escrito o cita de apoyo del docente`.

**Capa 3 — Algedónica (Alerta inmediata)**
*   El docente del piloto activo comunica que dejará de participar.
*   Un compromiso crítico incumplido (funcionalidades fallidas o reuniones canceladas sin aviso).

---

### 10.4 S1.3 — Soporte e Infraestructura
Propósito: Mantener el servicio disponible en tiers gratuitos, resolver incidencias en menos de 24 horas y asegurar la estabilidad de los deploys.

**Capa 1 — Operativa (Revisión diaria, responsable: Head of Customer Success / DevOps Lead)**
*   **Uptime semanal del servicio:** Meta: `≥ 99%` (Alerta 🟡: `97–98.9%`, Crítico 🔴: `< 97% o caída > 2 horas continuas`). 99% semanal representa unos 100 minutos de caída máxima, razonable para Vercel Hobby y Supabase Free.
*   **Errores 5xx en producción:** Meta: `≤ 5 errores/día` (Alerta 🟡: `6–20 errores/día`, Crítico 🔴: `> 20 errores/día`).
*   **Tiempo de resolución de incidencias:** Meta: `≤ 24 horas` (Alerta 🟡: `24–48 horas`, Crítico 🔴: `> 48 horas`). 24 horas es el límite psicológico para un beta-tester en educación superior.
*   **Bugs post-deploy en 24h:** Meta: `0` (Alerta 🟡: `1 bug`, Crítico 🔴: `≥ 2 bugs`). Un bug post-deploy indica fallas en las pruebas en staging.

**Capa 2 — Táctica (Revisado en la SAS mensual)**
*   **Costo de infraestructura del mes:** Meta: `S/. 0` (uso exclusivo de recursos gratuitos).
*   **Top-3 puntos de fricción:** Meta: `1 reporte priorizado entregado a Ingeniería por sprint`.

**Capa 3 — Algedónica (Activa alerta inmediata)**
*   Servicio caído por más de 2 horas.
*   Incidencia que afecta la base de datos de usuarios (corrupción, borrado).
*   Se alcanzan los límites del tier gratuito y el servicio se detiene.

---

## 11. Fuentes Citadas

| # | Fuente | Dato utilizado |
| :--- | :--- | :--- |
| [1] | SUNEDU (2026). *Listado de universidades con licencia institucional vigente* | 105 universidades licenciadas en Perú |
| [2] | SUNEDU – Sistema de Información Universitaria (2023/2024) | ~1.2 millones de estudiantes matriculados en universidades peruanas licenciadas |
| [3] | Banco Mundial (2021). *Educación superior en América Latina y el Caribe* | Contexto de mercado regional de educación superior |
