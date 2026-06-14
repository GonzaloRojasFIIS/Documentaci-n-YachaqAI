export type NotebookMeta = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  domain?: string;
};

export type WikiNodeType = 'concepto' | 'entidad' | 'modulo' | 'fuente' | 'pregunta' | 'notebook' | 'overview';

export type WikiNode = {
  id: string;
  label: string;
  type: WikiNodeType;
  group?: string;
  maestria: number;
  estado_srs: string;
  file: string;
  summary?: string;
  module?: string;
  category?: string;
};

export type WikiLink = {
  source: string;
  target: string;
  type: string;
};

export type WikiPage = {
  notebookId: string;
  page_id: string;
  file: string;
  title: string;
  type: WikiNodeType;
  content: string;
  html: string;
  frontmatter: Record<string, any>;
  related: string[];
  maestria: number;
  estado_srs: string;
  last_updated: string;
};

export function colorForEstado(estado: string) {
  switch (estado) {
    case 'dominado':
      return '#22c55e';
    case 'en_practica':
      return '#f59e0b';
    case 'critico':
      return '#ef4444';
    case 'bloqueado':
    default:
      return '#9ca3af';
  }
}
