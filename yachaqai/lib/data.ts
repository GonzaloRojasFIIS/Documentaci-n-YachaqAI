export interface Source {
  source_id: string;
  title: string;
  source_type: 'pdf' | 'url' | 'book';
  date_ingested: string;
  compile_status: 'active' | 'pending' | 'failed';
  pages?: number;
  url?: string;
}

export interface WikiNode {
  id: string;
  label: string;
  group: 'concept' | 'entity' | 'comparison' | 'overview' | 'module' | 'source-summary';
  category: string;
  source_count: number;
  summary?: string | null;
  last_updated?: string;
  archived?: boolean;
  file?: string;
}

export interface WikiLink {
  source: string;
  target: string;
  type: string;
}

export interface WikiPage {
  page_id: string;
  title: string;
  page_type: WikiNode['group'];
  category: string;
  summary: string;
  content: string;
  sources: string[];
  related: string[];
  last_updated: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  concept_count: number;
  mastery: number;
  color: string;
}

export interface SRSQuestion {
  id: string;
  question: string;
  answer: string;
  tipo: 'objetiva' | 'desarrollo';
  concepto_asociado: string;
}

export interface Session {
  id: string;
  title: string;
  date: string;
  duration_min: number;
  type: 'nuevo' | 'repaso' | 'mixto';
  modules: string[];
  completed: boolean;
}

export const SOURCES: Source[] = [
  { source_id: 'cisco-ccna-v1', title: 'Cisco CCNA Vol.1', source_type: 'book', date_ingested: '2026-06-01', compile_status: 'active', pages: 450 },
  { source_id: 'tanenbaum-redes', title: 'Tanenbaum — Computer Networks', source_type: 'book', date_ingested: '2026-06-02', compile_status: 'active', pages: 820 },
  { source_id: 'kurose-ross', title: 'Kurose & Ross — Computer Networking', source_type: 'book', date_ingested: '2026-06-03', compile_status: 'active', pages: 890 },
  { source_id: 'rfc-793', title: 'RFC 793 — TCP Specification', source_type: 'url', date_ingested: '2026-06-05', compile_status: 'active', url: 'https://tools.ietf.org/rfc/rfc793.txt' },
  { source_id: 'rfc-791', title: 'RFC 791 — IP Specification', source_type: 'url', date_ingested: '2026-06-06', compile_status: 'active', url: 'https://tools.ietf.org/rfc/rfc791.txt' },
];

export const MODULES: Module[] = [
  { id: 'fundamentos', title: 'Fundamentos de Redes', description: 'Modelos OSI/TCP-IP, topologías y tipos de redes.', concept_count: 6, mastery: 82, color: '#2563eb' },
  { id: 'capa-fisica', title: 'Capa Física y Enlace', description: 'Ethernet, switches, MAC, VLANs y Wi-Fi.', concept_count: 7, mastery: 65, color: '#7c3aed' },
  { id: 'capa-red', title: 'Capa de Red (IP)', description: 'Direccionamiento IP, subnetting, routing estático y dinámico.', concept_count: 8, mastery: 54, color: '#0891b2' },
  { id: 'capa-transporte', title: 'Capa de Transporte', description: 'TCP, UDP, puertos, control de congestión.', concept_count: 6, mastery: 71, color: '#ea580c' },
  { id: 'capa-aplicacion', title: 'Capa de Aplicación', description: 'HTTP, DNS, DHCP, correo y seguridad.', concept_count: 7, mastery: 48, color: '#0d9488' },
  { id: 'seguridad', title: 'Seguridad y Troubleshooting', description: 'Firewalls, ACLs, NAT, VPNs y diagnóstico.', concept_count: 5, mastery: 33, color: '#dc2626' },
];

export const NODES: WikiNode[] = [
  { id: 'redes-intro', label: 'Redes de Computadores', group: 'overview', category: 'Fundamentos', source_count: 3, summary: 'Visión general de las redes, su clasificación y arquitecturas.', last_updated: '2026-06-12T10:00:00Z' },
  { id: 'osi', label: 'Modelo OSI', group: 'concept', category: 'Fundamentos', source_count: 3, summary: 'Siete capas de interconexión de sistemas abiertos.', last_updated: '2026-06-11T09:00:00Z' },
  { id: 'tcp-ip', label: 'Modelo TCP/IP', group: 'concept', category: 'Fundamentos', source_count: 3, summary: 'Cuatro capas del stack de protocolos de Internet.', last_updated: '2026-06-11T09:30:00Z' },
  { id: 'topologias', label: 'Topologías de Red', group: 'concept', category: 'Fundamentos', source_count: 2, summary: 'Bus, estrella, anillo, malla y híbridas.', last_updated: '2026-06-10T08:00:00Z' },
  { id: 'medios', label: 'Medios de Transmisión', group: 'concept', category: 'Fundamentos', source_count: 2, summary: 'Cables UTP, fibra óptica y medios inalámbricos.', last_updated: '2026-06-10T08:30:00Z' },
  { id: 'cisco', label: 'Cisco Systems', group: 'entity', category: 'Entidades', source_count: 2, summary: 'Fabricante líder de equipos de networking.', last_updated: '2026-06-09T10:00:00Z' },
  { id: 'ietf', label: 'IETF', group: 'entity', category: 'Entidades', source_count: 2, summary: 'Internet Engineering Task Force, estandariza protocolos.', last_updated: '2026-06-09T11:00:00Z' },
  { id: 'ethernet', label: 'Ethernet', group: 'concept', category: 'Capa Física/Enlace', source_count: 3, summary: 'Tecnología de LAN más usada: frames, MAC, CSMA/CD.', last_updated: '2026-06-08T09:00:00Z' },
  { id: 'mac', label: 'Dirección MAC', group: 'concept', category: 'Capa Física/Enlace', source_count: 2, summary: 'Identificador físico de 48 bits de una interfaz.', last_updated: '2026-06-08T10:00:00Z' },
  { id: 'switch', label: 'Switch', group: 'concept', category: 'Capa Física/Enlace', source_count: 2, summary: 'Dispositivo de Capa 2 que conmuta frames por MAC.', last_updated: '2026-06-07T08:00:00Z' },
  { id: 'vlan', label: 'VLAN', group: 'concept', category: 'Capa Física/Enlace', source_count: 2, summary: 'Segmentación lógica de una red de área local.', last_updated: '2026-06-07T09:00:00Z' },
  { id: 'wifi', label: 'Wi-Fi (802.11)', group: 'concept', category: 'Capa Física/Enlace', source_count: 2, summary: 'Estándar IEEE 802.11 para redes inalámbricas.', last_updated: '2026-06-06T10:00:00Z' },
  { id: 'ipv4', label: 'IPv4', group: 'concept', category: 'Capa de Red', source_count: 3, summary: 'Protocolo de Internet versión 4, direcciones de 32 bits.', last_updated: '2026-06-05T09:00:00Z' },
  { id: 'ipv6', label: 'IPv6', group: 'concept', category: 'Capa de Red', source_count: 2, summary: 'Protocolo de Internet versión 6, direcciones de 128 bits.', last_updated: '2026-06-05T10:00:00Z' },
  { id: 'subnetting', label: 'Subnetting', group: 'concept', category: 'Capa de Red', source_count: 3, summary: 'División de una red en subredes más pequeñas.', last_updated: '2026-06-04T08:00:00Z' },
  { id: 'mascara-subred', label: 'Máscara de Subred', group: 'concept', category: 'Capa de Red', source_count: 2, summary: 'Determina la porción de red y host de una IP.', last_updated: '2026-06-04T09:00:00Z' },
  { id: 'routing', label: 'Routing', group: 'concept', category: 'Capa de Red', source_count: 2, summary: 'Proceso de encaminamiento de paquetes entre redes.', last_updated: '2026-06-03T10:00:00Z' },
  { id: 'ospf', label: 'OSPF', group: 'concept', category: 'Capa de Red', source_count: 2, summary: 'Protocolo de routing link-state interior.', last_updated: '2026-06-03T11:00:00Z' },
  { id: 'tcp', label: 'TCP', group: 'concept', category: 'Capa de Transporte', source_count: 3, summary: 'Protocolo orientado a conexión, confiable, control de flujo.', last_updated: '2026-06-02T09:00:00Z' },
  { id: 'udp', label: 'UDP', group: 'concept', category: 'Capa de Transporte', source_count: 2, summary: 'Protocolo no orientado a conexión, de bajo overhead.', last_updated: '2026-06-02T10:00:00Z' },
  { id: 'three-way-handshake', label: 'Three-Way Handshake', group: 'concept', category: 'Capa de Transporte', source_count: 2, summary: 'Establecimiento de conexión TCP con SYN, SYN-ACK, ACK.', last_updated: '2026-06-01T08:00:00Z' },
  { id: 'puertos', label: 'Puertos TCP/UDP', group: 'concept', category: 'Capa de Transporte', source_count: 2, summary: 'Identificadores de 16 bits para servicios y aplicaciones.', last_updated: '2026-06-01T09:00:00Z' },
  { id: 'congestion', label: 'Control de Congestión', group: 'concept', category: 'Capa de Transporte', source_count: 2, summary: 'Mecanismos de TCP para evitar colapsar la red.', last_updated: '2026-05-31T10:00:00Z' },
  { id: 'http', label: 'HTTP', group: 'concept', category: 'Capa de Aplicación', source_count: 2, summary: 'Protocolo de transferencia de hipertexto.', last_updated: '2026-05-30T09:00:00Z' },
  { id: 'dns', label: 'DNS', group: 'concept', category: 'Capa de Aplicación', source_count: 2, summary: 'Sistema de nombres de dominio.', last_updated: '2026-05-30T10:00:00Z' },
  { id: 'dhcp', label: 'DHCP', group: 'concept', category: 'Capa de Aplicación', source_count: 2, summary: 'Asignación automática de direcciones IP.', last_updated: '2026-05-29T08:00:00Z' },
  { id: 'smtp', label: 'SMTP/POP/IMAP', group: 'concept', category: 'Capa de Aplicación', source_count: 1, summary: 'Protocolos de correo electrónico.', last_updated: '2026-05-29T09:00:00Z' },
  { id: 'tls', label: 'TLS/SSL', group: 'concept', category: 'Capa de Aplicación', source_count: 2, summary: 'Seguridad en la capa de transporte.', last_updated: '2026-05-28T10:00:00Z' },
  { id: 'nat', label: 'NAT', group: 'concept', category: 'Seguridad', source_count: 2, summary: 'Traducción de direcciones de red.', last_updated: '2026-05-27T09:00:00Z' },
  { id: 'firewall', label: 'Firewall', group: 'concept', category: 'Seguridad', source_count: 2, summary: 'Control de tráfico entre redes.', last_updated: '2026-05-27T10:00:00Z' },
  { id: 'acl', label: 'ACL', group: 'concept', category: 'Seguridad', source_count: 1, summary: 'Listas de control de acceso.', last_updated: '2026-05-26T08:00:00Z' },
  { id: 'vpn', label: 'VPN', group: 'concept', category: 'Seguridad', source_count: 1, summary: 'Red privada virtual sobre red pública.', last_updated: '2026-05-26T09:00:00Z' },
  { id: 'ping', label: 'Ping / Traceroute', group: 'concept', category: 'Seguridad', source_count: 1, summary: 'Herramientas básicas de diagnóstico.', last_updated: '2026-05-25T10:00:00Z' },
];

export const EDGES: WikiLink[] = [
  { source: 'redes-intro', target: 'osi', type: 'contiene' },
  { source: 'redes-intro', target: 'tcp-ip', type: 'contiene' },
  { source: 'redes-intro', target: 'topologias', type: 'contiene' },
  { source: 'redes-intro', target: 'medios', type: 'contiene' },
  { source: 'osi', target: 'tcp-ip', type: 'comparado_con' },
  { source: 'tcp-ip', target: 'ipv4', type: 'incluye' },
  { source: 'tcp-ip', target: 'tcp', type: 'incluye' },
  { source: 'tcp-ip', target: 'udp', type: 'incluye' },
  { source: 'tcp-ip', target: 'http', type: 'incluye' },
  { source: 'osi', target: 'ethernet', type: 'capa_2' },
  { source: 'ethernet', target: 'mac', type: 'usa' },
  { source: 'ethernet', target: 'switch', type: 'usa' },
  { source: 'switch', target: 'vlan', type: 'soporta' },
  { source: 'ethernet', target: 'wifi', type: 'alternativa' },
  { source: 'ipv4', target: 'ipv6', type: 'evoluciona_a' },
  { source: 'ipv4', target: 'mascara-subred', type: 'usa' },
  { source: 'ipv4', target: 'subnetting', type: 'usa' },
  { source: 'ipv4', target: 'routing', type: 'necesita' },
  { source: 'ipv4', target: 'nat', type: 'relacionado' },
  { source: 'routing', target: 'ospf', type: 'implementado_por' },
  { source: 'tcp', target: 'udp', type: 'alternativa' },
  { source: 'tcp', target: 'three-way-handshake', type: 'usa' },
  { source: 'tcp', target: 'puertos', type: 'usa' },
  { source: 'tcp', target: 'congestion', type: 'incluye' },
  { source: 'three-way-handshake', target: 'puertos', type: 'usa' },
  { source: 'udp', target: 'puertos', type: 'usa' },
  { source: 'http', target: 'dns', type: 'usa' },
  { source: 'http', target: 'tls', type: 'usa' },
  { source: 'dns', target: 'dhcp', type: 'relacionado' },
  { source: 'dhcp', target: 'ipv4', type: 'configura' },
  { source: 'smtp', target: 'tls', type: 'usa' },
  { source: 'nat', target: 'firewall', type: 'relacionado' },
  { source: 'firewall', target: 'acl', type: 'usa' },
  { source: 'vpn', target: 'tls', type: 'usa' },
  { source: 'ping', target: 'ipv4', type: 'usa' },
  { source: 'cisco', target: 'switch', type: 'fabrica' },
  { source: 'ietf', target: 'tcp', type: 'estandariza' },
  { source: 'ietf', target: 'ipv4', type: 'estandariza' },
  { source: 'ietf', target: 'http', type: 'estandariza' },
];

export const PAGES: WikiPage[] = NODES.map((n) => ({
  page_id: n.id,
  title: n.label,
  page_type: n.group,
  category: n.category,
  summary: n.summary ?? '',
  sources: SOURCES.slice(0, n.source_count).map((s) => s.source_id),
  related: EDGES.filter((e) => e.source === n.id || e.target === n.id)
    .map((e) => (e.source === n.id ? e.target : e.source)),
  last_updated: n.last_updated ?? '2026-06-01T00:00:00Z',
  content: `# ${n.label}\n\n${n.summary ?? ''}\n\n> Fuente: YachaAI Wiki — Redes de Computadores.\n`,
}));

export const QUESTIONS: SRSQuestion[] = [
  { id: 'q1', question: '¿Cuáles son las 7 capas del modelo OSI?', answer: 'Física, Enlace de Datos, Red, Transporte, Sesión, Presentación, Aplicación.', tipo: 'objetiva', concepto_asociado: 'osi' },
  { id: 'q2', question: '¿Cuántas capas tiene el modelo TCP/IP y cuáles son?', answer: '4 capas: Acceso a la Red, Internet, Transporte y Aplicación.', tipo: 'objetiva', concepto_asociado: 'tcp-ip' },
  { id: 'q3', question: 'Explica el three-way handshake de TCP.', answer: 'El cliente envía SYN, el servidor responde SYN-ACK, y el cliente confirma con ACK. Así se establece la conexión.', tipo: 'desarrollo', concepto_asociado: 'three-way-handshake' },
  { id: 'q4', question: '¿Cuál es la diferencia principal entre IPv4 e IPv6?', answer: 'IPv4 usa direcciones de 32 bits; IPv6 usa direcciones de 128 bits.', tipo: 'objetiva', concepto_asociado: 'ipv4' },
  { id: 'q5', question: '¿Qué dispositivo opera en la Capa 2 y toma decisiones por dirección MAC?', answer: 'El switch.', tipo: 'objetiva', concepto_asociado: 'switch' },
  { id: 'q6', question: 'Describe para qué sirve DNS.', answer: 'DNS traduce nombres de dominio legibles por humanos a direcciones IP numéricas.', tipo: 'desarrollo', concepto_asociado: 'dns' },
  { id: 'q7', question: '¿Qué protocolo usa el puerto 80 por defecto?', answer: 'HTTP.', tipo: 'objetiva', concepto_asociado: 'http' },
  { id: 'q8', question: '¿Qué ventaja principal ofrece TCP sobre UDP?', answer: 'TCP es confiable: entrega ordenada, reconocimientos y retransmisión.', tipo: 'objetiva', concepto_asociado: 'tcp' },
  { id: 'q9', question: 'Explica el subnetting y por qué es útil.', answer: 'Divide una red grande en subredes menores para mejorar administración, seguridad y eficiencia del routing.', tipo: 'desarrollo', concepto_asociado: 'subnetting' },
  { id: 'q10', question: '¿Qué es NAT y para qué se usa?', answer: 'NAT traduce direcciones IP privadas a públicas, permitiendo compartir una única IP pública.', tipo: 'desarrollo', concepto_asociado: 'nat' },
];

export const SESSIONS: Session[] = [
  { id: 's1', title: 'Repaso de Capa de Red', date: '2026-06-14', duration_min: 30, type: 'repaso', modules: ['capa-red'], completed: false },
  { id: 's2', title: 'Nuevos conceptos de Transporte', date: '2026-06-15', duration_min: 45, type: 'nuevo', modules: ['capa-transporte'], completed: false },
  { id: 's3', title: 'Sesión mixta: Enlace + Aplicación', date: '2026-06-17', duration_min: 60, type: 'mixto', modules: ['capa-fisica', 'capa-aplicacion'], completed: false },
  { id: 's4', title: 'Fundamentos generales', date: '2026-06-18', duration_min: 30, type: 'nuevo', modules: ['fundamentos'], completed: true },
];

export const ACTIVITY = [
  { id: 'a1', date: '2026-06-13', type: 'compile', message: 'Wiki compilada desde 3 fuentes: 32 páginas generadas.', source: 'Cisco CCNA Vol.1' },
  { id: 'a2', date: '2026-06-12', type: 'page', message: 'Página actualizada: Three-Way Handshake.', source: 'Kurose & Ross' },
  { id: 'a3', date: '2026-06-11', type: 'srs', message: 'Repaso completado: 8/10 preguntas correctas.', source: 'SRS' },
  { id: 'a4', date: '2026-06-10', type: 'source', message: 'Nueva fuente añadida: RFC 791 — IP Specification.', source: 'RFC 791' },
  { id: 'a5', date: '2026-06-09', type: 'chat', message: 'Consulta del agente: "Diferencia entre TCP y UDP".', source: 'Chat' },
  { id: 'a6', date: '2026-06-08', type: 'lint', message: 'Health check: 2 nodos huérfanos detectados.', source: 'Lint' },
];

export function getNodeById(id: string): WikiNode | undefined {
  return NODES.find((n) => n.id === id);
}

export function getPageById(id: string): WikiPage | undefined {
  return PAGES.find((p) => p.page_id === id);
}

export function getNeighbors(id: string): WikiNode[] {
  const ids = new Set<string>();
  for (const e of EDGES) {
    if (e.source === id) ids.add(e.target);
    if (e.target === id) ids.add(e.source);
  }
  return NODES.filter((n) => ids.has(n.id));
}

export function getGraphData() {
  return {
    nodes: NODES,
    links: EDGES,
  };
}
