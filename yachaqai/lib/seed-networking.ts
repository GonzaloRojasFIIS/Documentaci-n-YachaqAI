import fs from 'fs';
import path from 'path';

type SeedNode = {
  id: string;
  label: string;
  type: 'concepto' | 'entidad' | 'modulo' | 'fuente' | 'pregunta';
  group?: string;
  maestria: number;
  estado_srs: string;
  file: string;
};

type SeedEdge = {
  source: string;
  target: string;
  type: string;
};

type ConceptDef = {
  slug: string;
  title: string;
  module: string;
  prereq: string[];
  related: string[];
  entities: string[];
  source: string;
  definition: string;
  features: string[];
};

type EntityDef = { slug: string; title: string; description: string; role: string[] };
type SourceDef = {
  slug: string;
  title: string;
  fecha_ingesta: string;
  paginas_procesadas: number;
  resumen: string;
  datos: string[];
  temas: string[];
  citas: string[];
};
type ModuleDef = { slug: string; title: string; orden: number; description: string };
type QuestionDef = { slug: string; title: string; concept: string; pairs: [string, string][] };

const conceptPath = (slug: string) => `2. conceptos/${slug}.md`;
const entityPath = (slug: string) => `3. entidades/${slug}.md`;
const sourcePath = (slug: string) => `1. fuentes_transformadas/${slug}.md`;
const modulePath = (slug: string) => `5. modulos/${slug}.md`;
const questionPath = (slug: string) => `4. preguntas/${slug}.md`;

function todayIso() {
  return new Date().toISOString().split('T')[0];
}

function nowIso() {
  return new Date().toISOString().slice(0, 19);
}

function writeFile(root: string, relPath: string, content: string) {
  const full = path.join(root, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
}

function yamlList(items: string[]) {
  if (items.length === 0) return '  []';
  return items.map((i) => `  - ${i}`).join('\n');
}

function buildConceptMd(c: ConceptDef) {
  const prereqPaths = c.prereq.map(conceptPath);
  const relatedPaths = c.related.map(conceptPath);
  const entityPaths = c.entities.map(entityPath);
  const srcPath = sourcePath(c.source);

  const relatedSection = relatedPaths.length
    ? c.related
        .map(
          (slug) =>
            `- Se relaciona con [[${conceptPath(slug)}]] en el contexto del dominio de redes.`
        )
        .join('\n')
    : '- Sin relaciones secundarias documentadas.';

  const entitySection = entityPaths.length
    ? c.entities.map((slug) => `- [[${entityPath(slug)}]]`).join('\n')
    : '- Sin entidades asociadas.';

  return `---
id: concepto-${c.slug}
tipo: concepto
titulo: "${c.title}"
modulo: ${c.module}
maestria: 0.00
estado_srs: bloqueado
proximo_repaso: null
ultimo_repaso: null
prerrequisitos:
${yamlList(prereqPaths)}
relacionados:
${yamlList(relatedPaths)}
entidades:
${yamlList(entityPaths)}
fuente_primaria: ${srcPath}
---

# ${c.title}

## Definición

${c.definition}

## Características Clave

${c.features.map((f) => `- ${f}`).join('\n')}

## Relación con otros conceptos

${relatedSection}

## Entidades Asociadas

${entitySection}

## Fuente primaria

- [[${srcPath}]]

## Notas del Usuario

BLOQUEADO. Este concepto aún no ha sido estudiado; requiere lectura activa y primer repaso para desbloquear.
`;
}

function buildEntityMd(e: EntityDef, conceptSlugs: string[], sourceSlugs: string[]) {
  const docs = conceptSlugs.length
    ? conceptSlugs.map((s) => `- [[${conceptPath(s)}]]`).join('\n')
    : '- Sin documentos relacionados.';
  const fuentes = sourceSlugs.length
    ? sourceSlugs.map((s) => `- [[${sourcePath(s)}]]`).join('\n')
    : '- Sin fuentes registradas.';

  return `---
id: entidad-${e.slug}
tipo: entidad
titulo: "${e.title}"
---

# ${e.title}

## Descripción

${e.description}

## Rol en el ecosistema

${e.role.map((r) => `- ${r}`).join('\n')}

## Documentos relacionados

${docs}

## Fuentes

${fuentes}
`;
}

function buildSourceMd(s: SourceDef, conceptSlugs: string[]) {
  const conceptLinks = conceptSlugs.length
    ? conceptSlugs.map((c) => `- [[${conceptPath(c)}]]`).join('\n')
    : '- Sin conceptos detectados.';

  return `---
id: fuente-${s.slug}
tipo: fuente_transformada
titulo: "${s.title}"
fecha_ingesta: ${s.fecha_ingesta}
paginas_procesadas: ${s.paginas_procesadas}
---

# ${s.title}

## Resumen

${s.resumen}

## Datos clave

${s.datos.map((d) => `- ${d}`).join('\n')}

## Temas principales

${s.temas.map((t, i) => `${i + 1}. ${t}`).join('\n')}

## Conceptos detectados

${conceptLinks}

## Citas relevantes

${s.citas.map((c) => `> ${c}`).join('\n\n')}
`;
}

function buildModuleMd(m: ModuleDef, concepts: ConceptDef[]) {
  const included = concepts.filter((c) => c.module === m.slug);
  const conceptList = included
    .map((c) => `- [[${conceptPath(c.slug)}]] — Maestría: 0.00 — \`bloqueado\``)
    .join('\n');

  return `---
id: modulo-${m.slug}
tipo: modulo
titulo: "${m.title}"
orden: ${m.orden}
---

# ${m.title}

${m.description}

## Conceptos incluidos

${conceptList}

## Maestría promedio

0.00

## Estado general

Módulo bloqueado. Los conceptos requieren ingest y primer repaso para avanzar.
`;
}

function buildQuestionMd(q: QuestionDef) {
  const pairs = q.pairs
    .map(
      ([pregunta, respuesta], idx) =>
        `## Pregunta ${idx + 1}\n\n${pregunta}\n\n> Respuesta: ${respuesta}`
    )
    .join('\n\n');

  return `---
id: pregunta-${q.slug}
tipo: pregunta
concepto_asociado: ${conceptPath(q.concept)}
subtipo_cuestionario: conceptual
---

# Cuestionario: ${q.title}

${pairs}
`;
}

function buildYACHAQ(notebookId: string) {
  return `# YACHAQ: Esquema del Notebook

## Dominio
Redes de Computadores: arquitecturas, protocolos, direccionamiento, routing, capas OSI/TCP-IP, seguridad y servicios de red en español.

## Idioma
- Español (contenido, preguntas y etiquetas YAML).
- Se permite citar términos técnicos en inglés entre paréntesis cuando sean de uso generalizado.

## Convenciones del notebook
- Cada concepto vive en \`2. conceptos/<slug>.md\`.
- Cada entidad vive en \`3. entidades/<slug>.md\`.
- Cada fuente transformada vive en \`1. fuentes_transformadas/<slug>.md\`.
- Cada pregunta SRS vive en \`4. preguntas/<id>.md\`.
- Cada módulo vive en \`5. modulos/<slug>.md\`.
- Los enlaces internos usan sintaxis WikiLink \`[[ruta/relativa.md]]\`.
- Las fechas usan formato ISO 8601: \`YYYY-MM-DD\` o \`YYYY-MM-DDTHH:MM:SS\`.

## Reglas de ingest
- Solo ingestar fuentes primarias verificables: RFCs, documentación oficial, libros de referencia y guías de certificación.
- Extraer automáticamente conceptos detectados y enlazarlos a archivos existentes o sugerir nuevos slugs.
- Almacenar \`fecha_ingesta\` y \`paginas_procesadas\` en el frontmatter.
- Generar un resumen ejecutivo de máximo 500 palabras.

## Reglas de query
- Responder siempre en español.
- Priorizar fuentes del propio notebook; si no hay información suficiente, indicar explícitamente el vacío.
- Cuando se cite un concepto, incluir su estado de maestría actual (\`maestria\`, \`estado_srs\`).
- No inventar hechos, citas ni porcentajes fuera de los registrados en las fuentes.

## Reglas de lint
- Verificar que cada concepto tenga frontmatter completo: \`id\`, \`tipo\`, \`titulo\`, \`modulo\`, \`maestria\`, \`estado_srs\`, \`proximo_repaso\`, \`ultimo_repaso\`, \`prerrequisitos\`, \`relacionados\`, \`entidades\`, \`fuente_primaria\`.
- Verificar que las rutas de \`[[...]]\` apunten a archivos existentes.
- Verificar que \`estado_srs\` sea coherente con \`maestria\`:
  - \`maestria\` 0.85-1.00 → \`dominado\`
  - \`maestria\` 0.50-0.84 → \`en_practica\`
  - \`maestria\` 0.20-0.49 → \`critico\`
  - \`maestria\` 0.00-0.19 → \`bloqueado\`
- Reportar preguntas huérfanas sin \`concepto_asociado\` existente.
`;
}

function buildIndex(
  notebookId: string,
  modules: ModuleDef[],
  concepts: ConceptDef[],
  entities: EntityDef[],
  sources: SourceDef[],
  questions: QuestionDef[]
) {
  const modulesYaml = modules
    .map(
      (m) =>
        `  - ruta: ${modulePath(m.slug)}\n    titulo: "${m.title}"\n    conceptos: ${
          concepts.filter((c) => c.module === m.slug).length
        }\n    maestria_promedio: 0.00`
    )
    .join('\n');

  const conceptsYaml = concepts
    .map(
      (c) =>
        `  - ruta: ${conceptPath(c.slug)}\n    titulo: "${c.title}"\n    maestria: 0.00\n    estado_srs: bloqueado`
    )
    .join('\n');

  const entitiesYaml = entities
    .map((e) => `  - ruta: ${entityPath(e.slug)}\n    titulo: "${e.title}"`)
    .join('\n');

  const sourcesYaml = sources
    .map((s) => `  - ruta: ${sourcePath(s.slug)}\n    titulo: "${s.title}"`)
    .join('\n');

  const questionsYaml = questions
    .map((q) => `  - ruta: ${questionPath(q.slug)}\n    concepto: ${q.concept}`)
    .join('\n');

  return `---
id: notebook-${notebookId}
tipo: notebook
titulo: Redes de Computadores
idioma: es
estado: en_estudio
creado: ${todayIso()}
actualizado: ${todayIso()}
resumen: >
  Notebook de estudio sobre redes de computadores:
  fundamentos, modelos OSI y TCP/IP, capa de enlace y red,
  routing, capa de transporte, seguridad y servicios de red.
modulos:
${modulesYaml}
conceptos:
${conceptsYaml}
entidades:
${entitiesYaml}
fuentes:
${sourcesYaml}
preguntas:
${questionsYaml}
---

# Redes de Computadores

Este notebook documenta el aprendizaje progresivo sobre redes de computadores, desde fundamentos y topologías hasta routing, transporte, seguridad y diagnóstico.

## Progreso general

- **Conceptos registrados:** ${concepts.length}
- **Dominados:** 0 (0 %)
- **En práctica:** 0 (0 %)
- **Críticos:** 0 (0 %)
- **Bloqueados:** ${concepts.length} (100 %)
- **Maestría promedio:** 0.00

## Módulos

${modules
  .map(
    (m, i) =>
      `${i + 1}. [[${modulePath(m.slug)}]] — Maestría promedio: 0.00`
  )
  .join('\n')}

## Registro de actividad reciente

Ver [[log.md]] para el historial completo de ingestas, consultas, repasos y validaciones.
`;
}

function buildLog(notebookId: string, sourceSlug: string, conceptSlugs: string[]) {
  return `---
id: log-${notebookId}
tipo: log
titulo: Registro de actividad del notebook
---

# Registro de actividad

## ${nowIso()} — ingest
- **Fuente:** \`${sourceSlug}.md\`
- **Origen:** Guía de certificación y libro académico de redes.
- **Páginas procesadas:** 83
- **Conceptos detectados:** ${conceptSlugs
    .slice(0, 6)
    .map((s) => `[[${conceptPath(s)}]]`)
    .join(', ')} y otros.
- **Estado:** Ingesta completada; todos los conceptos quedaron en estado \`bloqueado\` hasta completar lectura activa.
`;
}

export function seedRedesNotebook(notebookId: string): { nodes: SeedNode[]; edges: SeedEdge[] } {
  const root = path.join(process.cwd(), 'data', 'notebooks', notebookId);

  ['1. fuentes_transformadas', '2. conceptos', '3. entidades', '4. preguntas', '5. modulos'].forEach(
    (d) => fs.mkdirSync(path.join(root, d), { recursive: true })
  );

  const modules: ModuleDef[] = [
    {
      slug: 'fundamentos',
      title: 'Fundamentos de Redes',
      orden: 1,
      description:
        'Este módulo introduce los conceptos base de redes: modelos de referencia, topologías y medios de transmisión.',
    },
    {
      slug: 'enlace-red',
      title: 'Capa de Enlace y Red',
      orden: 2,
      description:
        'Este módulo cubre Ethernet, switching, direccionamiento IP, subnetting y routing.',
    },
    {
      slug: 'transporte',
      title: 'Capa de Transporte',
      orden: 3,
      description:
        'Este módulo aborda los protocolos TCP y UDP, puertos, handshake y control de congestión.',
    },
    {
      slug: 'seguridad-servicios',
      title: 'Seguridad y Servicios de Red',
      orden: 4,
      description:
        'Este módulo trata protocolos de aplicación, seguridad perimetral, NAT, VPN, QoS y diagnóstico.',
    },
  ];

  const entities: EntityDef[] = [
    {
      slug: 'cisco',
      title: 'Cisco Systems',
      description:
        'Empresa estadounidense líder en equipamiento de redes, switches, routers, firewalls y certificaciones como CCNA y CCNP.',
      role: [
        'Fabrica infraestructura de red para empresas y proveedores de servicios.',
        'Desarrolla IOS, IOS-XE, NX-OS y el portafolio Catalyst.',
        'Impulsa estándares y certificaciones de la industria.'
      ],
    },
    {
      slug: 'huawei',
      title: 'Huawei',
      description:
        'Compañía china de telecomunicaciones y equipamiento de red, con portafolio de routers, switches, Wi-Fi y soluciones 5G.',
      role: [
        'Compite globalmente en infraestructura de redes fijas y móviles.',
        'Ofrece certificaciones HCIA, HCIP y HCIE.',
        'Participa en organismos de estandarización.',
      ],
    },
    {
      slug: 'juniper',
      title: 'Juniper Networks',
      description:
        'Empresa especializada en routers, switches y seguridad de red, conocida por su sistema operativo Junos.',
      role: [
        'Provee equipos de routing para proveedores de servicios y grandes empresas.',
        'Desarrolla firewalls de la serie SRX y switches EX/QFX.',
        'Contribuye a la evolución de BGP y MPLS.',
      ],
    },
    {
      slug: 'ietf',
      title: 'IETF',
      description:
        'Internet Engineering Task Force, organismo encargado de desarrollar y promover estándares abiertos de Internet.',
      role: [
        'Publica RFCs para protocolos como IP, TCP, UDP, DNS, HTTP, BGP y OSPF.',
        'Coordina grupos de trabajo sobre routing, seguridad y transporte.',
        'Garantiza interoperabilidad entre fabricantes.',
      ],
    },
    {
      slug: 'ieee',
      title: 'IEEE',
      description:
        'Institute of Electrical and Electronics Engineers, organización que estandariza tecnologías como Ethernet, Wi-Fi y VLAN.',
      role: [
        'Define estándares 802.3 (Ethernet), 802.11 (Wi-Fi) y 802.1Q (VLAN).',
        'Publica artículos técnicos y conferencias.',
        'Influencia en medios de transmisión y redes locales.',
      ],
    },
    {
      slug: 'iso',
      title: 'ISO',
      description:
        'International Organization for Standardization, creadora del modelo de referencia OSI para interconexión de sistemas abiertos.',
      role: [
        'Publica el modelo OSI de siete capas.',
        'Establece estándares internacionales para tecnología y telecomunicaciones.',
        'Proporciona un marco conceptual para enseñanza de redes.',
      ],
    },
  ];

  const sources: SourceDef[] = [
    {
      slug: 'ccna-200-301-vol1',
      title: 'CCNA 200-301 Official Cert Guide, Volume 1',
      fecha_ingesta: todayIso(),
      paginas_procesadas: 45,
      resumen:
        'Guía oficial de certificación CCNA que cubre fundamentos de redes, capa de enlace, switching, VLANs, STP, IPv4, IPv6, subnetting y routing básico.',
      datos: [
        'Explica el modelo OSI y el modelo TCP/IP.',
        'Detalla Ethernet, switching, VLANs y spanning tree.',
        'Introduce IPv4, IPv6, subnetting y routing estático/dinámico.',
      ],
      temas: [
        'Fundamentos de redes y topologías.',
        'Ethernet y switching de capa 2.',
        'Capa de red: IPv4, IPv6 y subnetting.',
        'Routing estático y dinámico.',
        'Servicios de infraestructura.',
      ],
      citas: [
        'Una red de datos es cualquier conjunto de dispositivos conectados por medios de transmisión que intercambian información.',
        'El switching de capa 2 reenvía frames basándose en direcciones MAC.',
      ],
    },
    {
      slug: 'computer-networking-top-down',
      title: 'Computer Networking: A Top-Down Approach',
      fecha_ingesta: todayIso(),
      paginas_procesadas: 38,
      resumen:
        'Libro académico que presenta redes desde la capa de aplicación hacia abajo, enfocándose en HTTP, DNS, TCP, UDP, seguridad y redes inalámbricas.',
      datos: [
        'Enfoque top-down para enseñanza de redes.',
        'Protocolos de aplicación: HTTP, DNS, SMTP.',
        'Capa de transporte: TCP, UDP y control de congestión.',
        'Seguridad: TLS, firewalls y VPN.',
      ],
      temas: [
        'Aplicaciones de red.',
        'Transporte: TCP y UDP.',
        'Red: IPv4, IPv6 y routing.',
        'Enlace y LAN inalámbricas.',
        'Seguridad en redes.',
      ],
      citas: [
        'El enfoque top-down comienza por las aplicaciones que los usuarios conocen y luego desciende hasta los protocolos de capas inferiores.',
        'TCP proporciona un servicio de transferencia confiable de datos sobre un canal no confiable.',
      ],
    },
  ];

  const concepts: ConceptDef[] = [
    {
      slug: 'modelo-osi',
      title: 'Modelo OSI',
      module: 'fundamentos',
      prereq: [],
      related: ['tcp-ip', 'topologias-red'],
      entities: ['iso'],
      source: 'ccna-200-301-vol1',
      definition:
        'Modelo de referencia de siete capas que describe cómo los sistemas abiertos se comunican a través de una red.',
      features: [
        'Capas: física, enlace de datos, red, transporte, sesión, presentación y aplicación.',
        'Cada capa ofrece servicios a la superior y oculta la complejidad subyacente.',
        'Facilita la interoperabilidad entre fabricantes y protocolos.',
      ],
    },
    {
      slug: 'tcp-ip',
      title: 'Modelo TCP/IP',
      module: 'fundamentos',
      prereq: ['modelo-osi'],
      related: ['ipv4', 'tcp', 'udp', 'http'],
      entities: ['ietf'],
      source: 'computer-networking-top-down',
      definition:
        'Modelo práctico de cuatro capas que sustenta Internet: acceso a red, Internet, transporte y aplicación.',
      features: [
        'Desarrollado por el DoD y estandarizado por la IETF.',
        'Protocolos IP, TCP y UDP forman el núcleo del modelo.',
        'Es más simple que OSI porque combina funciones de sesión y presentación en la capa de aplicación.',
      ],
    },
    {
      slug: 'topologias-red',
      title: 'Topologías de Red',
      module: 'fundamentos',
      prereq: [],
      related: ['medios-transmision', 'switch', 'stp'],
      entities: ['cisco', 'ieee'],
      source: 'ccna-200-301-vol1',
      definition:
        'Disposición física o lógica de nodos y enlaces que determinan la forma en que se interconectan los dispositivos.',
      features: [
        'Topologías básicas: bus, estrella, anillo, malla e híbrida.',
        'La topología afecta la tolerancia a fallos y la escalabilidad.',
        'Puede ser física (cableado real) o lógica (flujo de datos).',
      ],
    },
    {
      slug: 'medios-transmision',
      title: 'Medios de Transmisión',
      module: 'fundamentos',
      prereq: ['topologias-red'],
      related: ['ethernet', 'wifi'],
      entities: ['ieee'],
      source: 'ccna-200-301-vol1',
      definition:
        'Canales físicos o inalámbricos a través de los cuales viajan las señales entre dispositivos.',
      features: [
        'Cableado de cobre: UTP, STP y coaxial.',
        'Fibra óptica monomodo y multimodo.',
        'Medios inalámbricos: radiofrecuencia, microondas e infrarrojo.',
      ],
    },
    {
      slug: 'ethernet',
      title: 'Ethernet',
      module: 'enlace-red',
      prereq: ['medios-transmision'],
      related: ['direccion-mac', 'switch', 'vlan'],
      entities: ['ieee', 'cisco'],
      source: 'ccna-200-301-vol1',
      definition:
        'Tecnología de red de área local más utilizada, estandarizada por IEEE 802.3.',
      features: [
        'Usaba CSMA/CD en versiones half-duplex antiguas.',
        'Los frames incluyen direcciones MAC origen y destino.',
        'Velocidades desde 10 Mbps hasta 400 Gbps.',
      ],
    },
    {
      slug: 'direccion-mac',
      title: 'Dirección MAC',
      module: 'enlace-red',
      prereq: ['ethernet'],
      related: ['switch', 'arp'],
      entities: ['ieee'],
      source: 'ccna-200-301-vol1',
      definition:
        'Identificador físico de 48 bits asignado a una interfaz de red (NIC) para comunicaciones en capa de enlace.',
      features: [
        'Única teóricamente por dispositivo.',
        'Se representa en hexadecimal separado por dos puntos o guiones.',
        'Opera en la capa de enlace de datos del modelo OSI.',
      ],
    },
    {
      slug: 'switch',
      title: 'Switch',
      module: 'enlace-red',
      prereq: ['direccion-mac', 'ethernet'],
      related: ['vlan', 'stp', 'cdp-lldp'],
      entities: ['cisco', 'huawei'],
      source: 'ccna-200-301-vol1',
      definition:
        'Dispositivo de capa 2 que reenvía frames Ethernet hacia el puerto correspondiente según la dirección MAC destino.',
      features: [
        'Mantiene una tabla MAC dinámica aprendida del tráfico entrante.',
        'Reduce los dominios de colisión respecto a un hub.',
        'Los switches multicapa también pueden enrutar en capa 3.',
      ],
    },
    {
      slug: 'vlan',
      title: 'VLAN',
      module: 'enlace-red',
      prereq: ['switch', 'ethernet'],
      related: ['stp', 'acl'],
      entities: ['cisco'],
      source: 'ccna-200-301-vol1',
      definition:
        'Red de área local virtual que segmenta una red física en dominios de broadcast lógicos independientes.',
      features: [
        'Reduce el tamaño de los dominios de broadcast.',
        'Mejora la seguridad y simplifica la administración.',
        'Requiere trunking (802.1Q) para transportar múltiples VLANs entre switches.',
      ],
    },
    {
      slug: 'wifi',
      title: 'Wi-Fi',
      module: 'enlace-red',
      prereq: ['medios-transmision'],
      related: ['ieee'],
      entities: ['ieee'],
      source: 'computer-networking-top-down',
      definition:
        'Conjunto de estándares IEEE 802.11 para redes de área local inalámbricas.',
      features: [
        'Usa frecuencias de 2.4 GHz, 5 GHz y 6 GHz en Wi-Fi 6E.',
        'Implementa CSMA/CA para evitar colisiones en el medio compartido.',
        'WPA3 aumenta la seguridad frente a ataques de fuerza bruta.',
      ],
    },
    {
      slug: 'arp',
      title: 'ARP',
      module: 'enlace-red',
      prereq: ['direccion-mac', 'ipv4'],
      related: ['icmp'],
      entities: ['ietf'],
      source: 'ccna-200-301-vol1',
      definition:
        'Protocolo de Resolución de Direcciones que obtiene la dirección MAC asociada a una dirección IPv4 en la misma red local.',
      features: [
        'Usa mensajes request y reply de difusión.',
        'Mantiene una caché ARP en cada host para reducir tráfico.',
        'Funciona en la interfaz entre la capa de red y la capa de enlace.',
      ],
    },
    {
      slug: 'ipv4',
      title: 'IPv4',
      module: 'enlace-red',
      prereq: ['tcp-ip'],
      related: ['ipv6', 'subnetting', 'mascara-subred', 'arp'],
      entities: ['ietf'],
      source: 'ccna-200-301-vol1',
      definition:
        'Protocolo de Internet versión 4 que utiliza direcciones de 32 bits para identificar hosts y redes.',
      features: [
        'Direccionamiento jerárquico dividido en porción de red y host.',
        'Agotamiento del espacio de direcciones públicas.',
        'Requiere técnicas como subnetting y NAT.',
      ],
    },
    {
      slug: 'ipv6',
      title: 'IPv6',
      module: 'enlace-red',
      prereq: ['ipv4'],
      related: ['subnetting'],
      entities: ['ietf'],
      source: 'computer-networking-top-down',
      definition:
        'Sucesor de IPv4 que utiliza direcciones de 128 bits y simplifica la cabecera del protocolo.',
      features: [
        'Espacio de direcciones enorme que resuelve el agotamiento de IPv4.',
        'Cabecera más sencilla y soporte para autoconfiguración.',
        'Diseñado para reducir la necesidad de NAT en muchos escenarios.',
      ],
    },
    {
      slug: 'subnetting',
      title: 'Subnetting',
      module: 'enlace-red',
      prereq: ['ipv4', 'mascara-subred'],
      related: ['routing'],
      entities: [],
      source: 'ccna-200-301-vol1',
      definition:
        'Técnica de división de una red IP en subredes más pequeñas para optimizar direccionamiento y rendimiento.',
      features: [
        'Ahorra direcciones IP y reduce el tamaño de los broadcast.',
        'Usa una máscara de subred extendida.',
        'Permite calcular ID de red, broadcast y rango de hosts válidos.',
      ],
    },
    {
      slug: 'mascara-subred',
      title: 'Máscara de Subred',
      module: 'enlace-red',
      prereq: ['ipv4'],
      related: ['subnetting'],
      entities: [],
      source: 'ccna-200-301-vol1',
      definition:
        'Máscara de 32 bits que distingue la porción de red de la porción de host en una dirección IPv4.',
      features: [
        'Se representa en notación decimal punteada o como longitud de prefijo CIDR.',
        'Junto con la dirección IP determina la red a la que pertenece un host.',
        'Indica cuántos bits identifican la red.',
      ],
    },
    {
      slug: 'routing',
      title: 'Routing',
      module: 'enlace-red',
      prereq: ['ipv4', 'subnetting'],
      related: ['ospf', 'bgp'],
      entities: ['cisco', 'juniper'],
      source: 'ccna-200-301-vol1',
      definition:
        'Proceso de seleccionar el camino más adecuado para enviar paquetes desde un origen hasta un destino.',
      features: [
        'Puede ser estático (configurado manualmente) o dinámico (mediante protocolos).',
        'Usa tablas de enrutamiento en routers y switches capa 3.',
        'Se clasifica en IGP (interior) y EGP (exterior).',
      ],
    },
    {
      slug: 'ospf',
      title: 'OSPF',
      module: 'enlace-red',
      prereq: ['routing'],
      related: ['bgp'],
      entities: ['ietf', 'cisco'],
      source: 'ccna-200-301-vol1',
      definition:
        'Protocolo de routing interior de estado de enlace estandarizado por la IETF para redes IP.',
      features: [
        'Usa áreas para escalar en redes grandes.',
        'Calcula la ruta más corta con el algoritmo de Dijkstra.',
        'Ofrece convergencia rápida y métricas basadas en costo.',
      ],
    },
    {
      slug: 'bgp',
      title: 'BGP',
      module: 'enlace-red',
      prereq: ['routing', 'ospf'],
      related: ['nat'],
      entities: ['ietf', 'juniper'],
      source: 'computer-networking-top-down',
      definition:
        'Protocolo de routing exterior utilizado entre sistemas autónomos para intercambiar rutas en Internet.',
      features: [
        'Es un protocolo path-vector.',
        'Intercambia atributos de rutas y políticas entre vecinos.',
        'Es la base de la interconexión global de Internet.',
      ],
    },
    {
      slug: 'icmp',
      title: 'ICMP',
      module: 'enlace-red',
      prereq: ['ipv4'],
      related: ['ping-traceroute'],
      entities: ['ietf'],
      source: 'ccna-200-301-vol1',
      definition:
        'Protocolo de mensajes de control e información que reporta errores y diagnósticos para IP.',
      features: [
        'Transporta mensajes de error y respuestas de diagnóstico.',
        'Es usado por herramientas como ping y traceroute.',
        'No transporta datos de aplicación de usuario.',
      ],
    },
    {
      slug: 'tcp',
      title: 'TCP',
      module: 'transporte',
      prereq: ['tcp-ip', 'ipv4'],
      related: ['udp', 'three-way-handshake', 'puertos', 'control-congestion'],
      entities: ['ietf'],
      source: 'computer-networking-top-down',
      definition:
        'Protocolo de transporte orientado a conexión que ofrece entrega fiable, ordenada y con control de flujo.',
      features: [
        'Establece conexiones mediante three-way handshake.',
        'Usa reconocimientos y retransmisiones para recuperar datos perdidos.',
        'Incluye control de flujo y control de congestión.',
      ],
    },
    {
      slug: 'udp',
      title: 'UDP',
      module: 'transporte',
      prereq: ['tcp-ip', 'ipv4'],
      related: ['tcp', 'puertos', 'dns'],
      entities: ['ietf'],
      source: 'computer-networking-top-down',
      definition:
        'Protocolo de transporte no orientado a conexión, rápido y sin garantías de entrega.',
      features: [
        'Baja latencia y overhead mínimo.',
        'Usado por DNS, voz sobre IP y video en tiempo real.',
        'No ofrece control de congestión ni reordenamiento de paquetes.',
      ],
    },
    {
      slug: 'three-way-handshake',
      title: 'Three-Way Handshake',
      module: 'transporte',
      prereq: ['tcp'],
      related: ['control-congestion'],
      entities: ['ietf'],
      source: 'ccna-200-301-vol1',
      definition:
        'Mecanismo de tres pasos que establece una conexión TCP confiable entre cliente y servidor.',
      features: [
        'Los pasos son SYN, SYN-ACK y ACK.',
        'Sincroniza los números de secuencia inicial de ambos extremos.',
        'Prepara la transferencia de datos con parámetros negociados.',
      ],
    },
    {
      slug: 'puertos',
      title: 'Puertos',
      module: 'transporte',
      prereq: ['tcp', 'udp'],
      related: ['http', 'dns', 'dhcp'],
      entities: ['ietf'],
      source: 'ccna-200-301-vol1',
      definition:
        'Identificadores de 16 bits que permiten multiplexar múltiples servicios en una misma dirección IP.',
      features: [
        'Puertos bien conocidos (0-1023), registrados (1024-49151) y dinámicos.',
        'TCP y UDP usan espacios de puertos independientes.',
        'Permiten que varias aplicaciones compartan una misma interfaz de red.',
      ],
    },
    {
      slug: 'control-congestion',
      title: 'Control de Congestión',
      module: 'transporte',
      prereq: ['tcp'],
      related: ['three-way-handshake', 'qos'],
      entities: ['ietf'],
      source: 'computer-networking-top-down',
      definition:
        'Mecanismos de TCP que evitan saturar la red ajustando la tasa de envío de datos.',
      features: [
        'Mantiene una ventana de congestión dinámica.',
        'Implementa algoritmos como Reno y CUBIC.',
        'Ajusta la tasa según pérdidas, RTT y reconocimientos duplicados.',
      ],
    },
    {
      slug: 'http',
      title: 'HTTP',
      module: 'seguridad-servicios',
      prereq: ['tcp', 'puertos'],
      related: ['dns', 'tls'],
      entities: ['ietf'],
      source: 'computer-networking-top-down',
      definition:
        'Protocolo de transferencia de hipertexto que permite la comunicación entre clientes y servidores web.',
      features: [
        'Arquitectura cliente-servidor basada en peticiones y respuestas.',
        'Métodos comunes: GET, POST, PUT, DELETE.',
        'HTTP/2 y HTTP/3 mejoran rendimiento y latencia.',
      ],
    },
    {
      slug: 'dns',
      title: 'DNS',
      module: 'seguridad-servicios',
      prereq: ['udp', 'puertos'],
      related: ['http', 'dhcp'],
      entities: ['ietf'],
      source: 'computer-networking-top-down',
      definition:
        'Sistema de nombres de dominio que traduce nombres legibles por humanos en direcciones IP.',
      features: [
        'Jerárquico y distribuido en todo Internet.',
        'Usa los puertos 53 de UDP y TCP.',
        'Registros comunes: A, AAAA, CNAME, MX y NS.',
      ],
    },
    {
      slug: 'dhcp',
      title: 'DHCP',
      module: 'seguridad-servicios',
      prereq: ['ipv4', 'udp'],
      related: ['dns', 'nat'],
      entities: ['ietf'],
      source: 'ccna-200-301-vol1',
      definition:
        'Protocolo de configuración dinámica de hosts que asigna parámetros de red automáticamente.',
      features: [
        'Asigna dirección IP, máscara, gateway predeterminado y servidores DNS.',
        'El proceso de arrendamiento sigue los pasos DORA.',
        'Reduce la configuración manual y los errores de direccionamiento.',
      ],
    },
    {
      slug: 'smtp',
      title: 'SMTP',
      module: 'seguridad-servicios',
      prereq: ['tcp', 'puertos'],
      related: ['tls'],
      entities: ['ietf'],
      source: 'computer-networking-top-down',
      definition:
        'Protocolo simple de transferencia de correo para el envío de mensajes entre servidores de correo.',
      features: [
        'Usa los puertos 25 o 587 sobre TCP.',
        'Comandos principales: HELO/EHLO, MAIL FROM, RCPT TO, DATA.',
        'Trabaja junto a POP3 o IMAP para la recepción de correo.',
      ],
    },
    {
      slug: 'tls',
      title: 'TLS',
      module: 'seguridad-servicios',
      prereq: ['tcp', 'http'],
      related: ['vpn', 'firewall'],
      entities: ['ietf'],
      source: 'computer-networking-top-down',
      definition:
        'Protocolo criptográfico que proporciona confidencialidad e integridad sobre conexiones TCP.',
      features: [
        'Sucesor de SSL y base de HTTPS.',
        'Usa certificados digitales para autenticar servidores.',
        'Negocia algoritmos de cifrado durante el handshake.',
      ],
    },
    {
      slug: 'nat',
      title: 'NAT',
      module: 'seguridad-servicios',
      prereq: ['ipv4', 'routing'],
      related: ['firewall'],
      entities: ['ietf'],
      source: 'ccna-200-301-vol1',
      definition:
        'Traducción de direcciones de red que permite reutilizar direcciones privadas en redes internas.',
      features: [
        'Tipos: estático, dinámico y PAT (sobrecarga de puertos).',
        'Permite que múltiples hosts compartan una única IP pública.',
        'Rompe el modelo end-to-end de comunicación.',
      ],
    },
    {
      slug: 'firewall',
      title: 'Firewall',
      module: 'seguridad-servicios',
      prereq: ['nat', 'acl'],
      related: ['vpn', 'tls'],
      entities: ['cisco', 'juniper', 'huawei'],
      source: 'ccna-200-301-vol1',
      definition:
        'Dispositivo o software que filtra el tráfico de red según políticas de seguridad definidas.',
      features: [
        'Filtrado por capa de red, transporte y aplicación.',
        'Stateful inspection rastrea el estado de las conexiones.',
        'Los Next-Generation Firewalls integran IDS/IPS y control de aplicaciones.',
      ],
    },
    {
      slug: 'acl',
      title: 'ACL',
      module: 'seguridad-servicios',
      prereq: ['ipv4'],
      related: ['vlan', 'nat', 'firewall'],
      entities: ['cisco'],
      source: 'ccna-200-301-vol1',
      definition:
        'Lista de control de acceso que define qué tráfico se permite o deniega en un dispositivo de red.',
      features: [
        'Se aplica en routers, switches y firewalls.',
        'Filtra por dirección IP, puerto y protocolo.',
        'El orden de las reglas determina la acción final.',
      ],
    },
    {
      slug: 'vpn',
      title: 'VPN',
      module: 'seguridad-servicios',
      prereq: ['tls', 'firewall'],
      related: ['nat'],
      entities: ['cisco', 'juniper'],
      source: 'computer-networking-top-down',
      definition:
        'Red privada virtual que crea túneles seguros sobre redes públicas no confiables.',
      features: [
        'Proporciona cifrado, autenticación e integridad.',
        'Modalidades site-to-site y remote access.',
        'Tecnologías comunes: IPsec, SSL VPN y WireGuard.',
      ],
    },
    {
      slug: 'ping-traceroute',
      title: 'Ping y Traceroute',
      module: 'seguridad-servicios',
      prereq: ['icmp', 'ipv4'],
      related: ['routing'],
      entities: ['ietf'],
      source: 'ccna-200-301-vol1',
      definition:
        'Herramientas de diagnóstico que usan mensajes ICMP para verificar conectividad y trazar rutas.',
      features: [
        'Ping envía echo request y espera echo reply.',
        'Traceroute muestra los saltos intermedios hacia el destino.',
        'Ayudan a detectar latencia, pérdidas y bucles de routing.',
      ],
    },
    {
      slug: 'qos',
      title: 'QoS',
      module: 'seguridad-servicios',
      prereq: ['control-congestion'],
      related: ['routing', 'vlan'],
      entities: ['ieee', 'ietf'],
      source: 'ccna-200-301-vol1',
      definition:
        'Conjunto de técnicas para gestionar el rendimiento de la red y garantizar calidad a tráfico crítico.',
      features: [
        'Clasificación, marcado, colas, policing y shaping.',
        'Prioriza voz, video y tráfico de misión crítica.',
        'Se implementa en routers, switches y firewalls.',
      ],
    },
    {
      slug: 'cdp-lldp',
      title: 'CDP y LLDP',
      module: 'seguridad-servicios',
      prereq: ['switch'],
      related: ['topologias-red'],
      entities: ['ieee', 'cisco'],
      source: 'ccna-200-301-vol1',
      definition:
        'Protocolos de descubrimiento de vecinos que permiten conocer los dispositivos directamente conectados.',
      features: [
        'CDP es propietario de Cisco.',
        'LLDP es el estándar IEEE 802.1AB.',
        'Revelan capacidades, direcciones y sistemas operativos vecinos.',
      ],
    },
    {
      slug: 'stp',
      title: 'STP',
      module: 'enlace-red',
      prereq: ['switch', 'topologias-red'],
      related: ['vlan', 'qos'],
      entities: ['ieee', 'cisco'],
      source: 'ccna-200-301-vol1',
      definition:
        'Protocolo que evita bucles en topologías redundantes de switches desactivando rutas duplicadas.',
      features: [
        'Elige un puente raíz mediante la prioridad y la MAC.',
        'Bloquea puertos redundantes manteniendo una topología activa sin bucles.',
        'RSTP y MSTP mejoran los tiempos de convergencia.',
      ],
    },
  ];

  const questions: QuestionDef[] = [
    {
      slug: 'q-modelo-osi',
      title: 'Modelo OSI',
      concept: 'modelo-osi',
      pairs: [
        ['¿Cuáles son las siete capas del modelo OSI?', 'Física, enlace de datos, red, transporte, sesión, presentación y aplicación.'],
        ['¿Qué capa del modelo OSI se encarga del direccionamiento lógico?', 'La capa de red.'],
        ['¿Cuál es la principal ventaja de un modelo por capas?', 'Separa funciones, facilita el diseño y la interoperabilidad entre fabricantes.'],
      ],
    },
    {
      slug: 'q-tcp-ip',
      title: 'Modelo TCP/IP',
      concept: 'tcp-ip',
      pairs: [
        ['¿Cuántas capas tiene el modelo TCP/IP?', 'Cuatro: acceso a red, Internet, transporte y aplicación.'],
        ['¿Qué protocolos se encuentran en la capa de transporte?', 'TCP y UDP.'],
        ['¿Por qué TCP/IP es más usado que OSI en Internet?', 'Porque fue implementado primero, es práctico y está estandarizado por la IETF.'],
      ],
    },
    {
      slug: 'q-subnetting',
      title: 'Subnetting',
      concept: 'subnetting',
      pairs: [
        ['¿Qué información se obtiene de una dirección IP y su máscara?', 'El ID de red, la dirección de broadcast y el rango de hosts válidos.'],
        ['¿Por qué subnettear una red?', 'Para reducir broadcast, optimizar direcciones y mejorar seguridad.'],
        ['¿Cuántos hosts útiles tiene una subred /28?', '14 hosts utilizables.'],
      ],
    },
    {
      slug: 'q-three-way-handshake',
      title: 'Three-Way Handshake',
      concept: 'three-way-handshake',
      pairs: [
        ['¿Cuáles son los tres pasos del three-way handshake?', 'SYN, SYN-ACK y ACK.'],
        ['¿Qué se sincroniza durante el handshake?', 'Los números de secuencia inicial de cliente y servidor.'],
        ['¿Por qué TCP utiliza un handshake antes de enviar datos?', 'Para establecer una conexión confiable y negociar parámetros.'],
      ],
    },
    {
      slug: 'q-dns',
      title: 'DNS',
      concept: 'dns',
      pairs: [
        ['¿Qué puertos utiliza DNS?', 'El puerto 53 tanto de UDP como de TCP.'],
        ['¿Qué traduce DNS?', 'Nombres de dominio legibles por humanos en direcciones IP.'],
        ['¿Qué registro asocia un nombre con una dirección IPv6?', 'El registro AAAA.'],
      ],
    },
    {
      slug: 'q-vlan',
      title: 'VLAN',
      concept: 'vlan',
      pairs: [
        ['¿Qué problema resuelve una VLAN?', 'Reduce el tamaño de los dominios de broadcast.'],
        ['¿Qué etiqueta se usa en enlaces troncales entre switches?', 'IEEE 802.1Q.'],
        ['¿En qué capa del modelo OSI opera principalmente una VLAN?', 'En la capa de enlace de datos.'],
      ],
    },
    {
      slug: 'q-routing',
      title: 'Routing',
      concept: 'routing',
      pairs: [
        ['¿Cuál es la diferencia entre routing estático y dinámico?', 'El estático se configura manualmente; el dinámico aprende rutas mediante protocolos.'],
        ['¿Qué dispositivo realiza routing típicamente?', 'Un router o un switch capa 3.'],
        ['¿Qué es una tabla de routing?', 'Una base de datos que almacena las rutas conocidas hacia redes destino.'],
      ],
    },
    {
      slug: 'q-firewall',
      title: 'Firewall',
      concept: 'firewall',
      pairs: [
        ['¿Qué es un firewall stateful?', 'Un firewall que rastrea el estado de las conexiones activas.'],
        ['¿En qué capas opera tradicionalmente un firewall?', 'Principalmente en capa de red y transporte.'],
        ['¿Qué diferencia a un Next-Generation Firewall?', 'Incluye inspección profunda de paquetes, IDS/IPS y control de aplicaciones.'],
      ],
    },
  ];

  // Static files
  writeFile(root, 'YACHAQ.md', buildYACHAQ(notebookId));
  writeFile(root, 'index.md', buildIndex(notebookId, modules, concepts, entities, sources, questions));
  writeFile(root, 'log.md', buildLog(notebookId, sources[0].slug, concepts.map((c) => c.slug)));

  // Modules
  modules.forEach((m) => writeFile(root, modulePath(m.slug), buildModuleMd(m, concepts)));

  // Sources
  sources.forEach((s) => {
    const detected = concepts.filter((c) => c.source === s.slug).map((c) => c.slug);
    writeFile(root, sourcePath(s.slug), buildSourceMd(s, detected));
  });

  // Entities
  entities.forEach((e) => {
    const relatedConcepts = concepts.filter((c) => c.entities.includes(e.slug)).map((c) => c.slug);
    writeFile(root, entityPath(e.slug), buildEntityMd(e, relatedConcepts, sources.map((s) => s.slug)));
  });

  // Concepts
  concepts.forEach((c) => writeFile(root, conceptPath(c.slug), buildConceptMd(c)));

  // Questions
  questions.forEach((q) => writeFile(root, questionPath(q.slug), buildQuestionMd(q)));

  // Build graph nodes
  const toId = (type: string, slug: string) => `${type}-${slug}`;

  const nodes: SeedNode[] = [
    ...concepts.map((c) => ({
      id: toId('concepto', c.slug),
      label: c.title,
      type: 'concepto' as const,
      group: c.module,
      maestria: 0.0,
      estado_srs: 'bloqueado',
      file: conceptPath(c.slug),
    })),
    ...entities.map((e) => ({
      id: toId('entidad', e.slug),
      label: e.title,
      type: 'entidad' as const,
      maestria: 0.0,
      estado_srs: 'en_estudio',
      file: entityPath(e.slug),
    })),
    ...modules.map((m) => ({
      id: toId('modulo', m.slug),
      label: m.title,
      type: 'modulo' as const,
      maestria: 0.0,
      estado_srs: 'en_estudio',
      file: modulePath(m.slug),
    })),
    ...sources.map((s) => ({
      id: toId('fuente', s.slug),
      label: s.title,
      type: 'fuente' as const,
      maestria: 0.0,
      estado_srs: 'ingestado',
      file: sourcePath(s.slug),
    })),
    ...questions.map((q) => ({
      id: toId('pregunta', q.slug),
      label: q.title,
      type: 'pregunta' as const,
      group: q.concept,
      maestria: 0.0,
      estado_srs: 'pendiente',
      file: questionPath(q.slug),
    })),
  ];

  // Build graph edges
  const edges: SeedEdge[] = [];

  concepts.forEach((c) => {
    edges.push({ source: toId('modulo', c.module), target: toId('concepto', c.slug), type: 'contiene' });
    edges.push({ source: toId('fuente', c.source), target: toId('concepto', c.slug), type: 'fuente_primaria' });
    c.prereq.forEach((p) => edges.push({ source: toId('concepto', p), target: toId('concepto', c.slug), type: 'prerrequisito' }));
    c.related.forEach((r) => edges.push({ source: toId('concepto', c.slug), target: toId('concepto', r), type: 'relacionado' }));
    c.entities.forEach((e) => edges.push({ source: toId('concepto', c.slug), target: toId('entidad', e), type: 'entidad_asociada' }));
  });

  questions.forEach((q) => {
    edges.push({ source: toId('pregunta', q.slug), target: toId('concepto', q.concept), type: 'pregunta_sobre' });
  });

  return { nodes, edges };
}
