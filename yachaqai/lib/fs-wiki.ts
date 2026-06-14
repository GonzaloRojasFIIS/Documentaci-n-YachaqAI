import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import { marked } from 'marked';
import { NotebookMeta, WikiNode, WikiLink, WikiPage } from './types';

export type { NotebookMeta, WikiNode, WikiLink, WikiPage };

const DATA_DIR = path.join(process.cwd(), 'data', 'notebooks');

function notebookDir(id: string) {
  return path.join(DATA_DIR, id);
}

function metaPath(id: string) {
  return path.join(notebookDir(id), '.yachaq', 'notebook.json');
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function ensureNotebooksDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function listNotebooks(): NotebookMeta[] {
  ensureNotebooksDir();
  if (!fs.existsSync(DATA_DIR)) return [];
  return fs
    .readdirSync(DATA_DIR)
    .filter((id) => {
      const dir = notebookDir(id);
      return fs.statSync(dir).isDirectory() && fs.existsSync(metaPath(id));
    })
    .map((id) => getNotebookMeta(id))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getNotebookMeta(id: string): NotebookMeta {
  const raw = fs.readFileSync(metaPath(id), 'utf8');
  return { id, ...JSON.parse(raw) } as NotebookMeta;
}

export function notebookExists(id: string) {
  return fs.existsSync(notebookDir(id)) && fs.existsSync(metaPath(id));
}

export function createNotebook(name: string): NotebookMeta {
  ensureNotebooksDir();
  const id = slugify(name);
  const dir = notebookDir(id);
  fs.mkdirSync(path.join(dir, '.yachaq'), { recursive: true });
  fs.mkdirSync(path.join(dir, '1. fuentes_transformadas'), { recursive: true });
  fs.mkdirSync(path.join(dir, '2. conceptos'), { recursive: true });
  fs.mkdirSync(path.join(dir, '3. entidades'), { recursive: true });
  fs.mkdirSync(path.join(dir, '4. preguntas'), { recursive: true });
  fs.mkdirSync(path.join(dir, '5. modulos'), { recursive: true });

  const now = new Date().toISOString();
  const meta: NotebookMeta = {
    id,
    name,
    description: '',
    createdAt: now,
    updatedAt: now,
  };
  fs.writeFileSync(metaPath(id), JSON.stringify(meta, null, 2), 'utf8');

  const yachaq = `# YACHAQ: Esquema del Notebook

## Dominio
${name}

## Idioma
- Español

## Convenciones del notebook
- Conceptos en \`2. conceptos/<slug>.md\`.
- Entidades en \`3. entidades/<slug>.md\`.
- Fuentes transformadas en \`1. fuentes_transformadas/<slug>.md\`.
- Preguntas SRS en \`4. preguntas/<id>.md\`.
- Módulos en \`5. modulos/<slug>.md\`.
- Enlaces internos con \`[[ruta/relativa.md]]\`.
`;
  fs.writeFileSync(path.join(dir, 'YACHAQ.md'), yachaq, 'utf8');

  const index = `---
id: notebook-${id}
tipo: notebook
titulo: ${name}
estado: nuevo
creado: ${now.split('T')[0]}
actualizado: ${now.split('T')[0]}
resumen: >
  Notebook nuevo. Agrega fuentes para comenzar a construir el grafo de conocimiento.
modulos: []
conceptos: []
entidades: []
fuentes: []
preguntas: []
---

# ${name}

Este notebook está vacío. Usa el botón **Agregar fuentes** para empezar.
`;
  fs.writeFileSync(path.join(dir, 'index.md'), index, 'utf8');

  const log = `---
id: log-${id}
tipo: log
---

# Registro de actividad

- ${now.split('T')[0]} — Cuaderno creado.
`;
  fs.writeFileSync(path.join(dir, 'log.md'), log, 'utf8');

  return meta;
}

export function updateNotebookMeta(id: string, patch: Partial<NotebookMeta>) {
  const meta = getNotebookMeta(id);
  const updated = { ...meta, ...patch, updatedAt: new Date().toISOString() };
  fs.writeFileSync(metaPath(id), JSON.stringify(updated, null, 2), 'utf8');
  return updated;
}

export function parseFrontmatter(content: string): { frontmatter: Record<string, any>; body: string } {
  if (!content.startsWith('---')) return { frontmatter: {}, body: content };
  const end = content.indexOf('---', 3);
  if (end === -1) return { frontmatter: {}, body: content };
  const yamlText = content.slice(3, end).trim();
  const body = content.slice(end + 3).trimStart();
  try {
    return { frontmatter: YAML.parse(yamlText) || {}, body };
  } catch {
    return { frontmatter: {}, body: content };
  }
}

export function getMarkdownFiles(notebookId: string, subDir?: string): string[] {
  const base = subDir ? path.join(notebookDir(notebookId), subDir) : notebookDir(notebookId);
  if (!fs.existsSync(base)) return [];
  const out: string[] = [];
  const entries = fs.readdirSync(base, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(base, entry.name);
    if (entry.isDirectory()) {
      out.push(...getMarkdownFiles(notebookId, subDir ? path.join(subDir, entry.name) : entry.name));
    } else if (entry.name.endsWith('.md')) {
      const rel = subDir ? path.join(subDir, entry.name) : entry.name;
      out.push(rel.replace(/\\/g, '/'));
    }
  }
  return out;
}

export function readPage(notebookId: string, relPath: string): WikiPage {
  let normalizedRelPath = relPath.replace(/\\/g, '/');

  // Auto-append .md if not present and the file exists with .md
  if (!normalizedRelPath.endsWith('.md')) {
    const tempPath = path.join(notebookDir(notebookId), normalizedRelPath + '.md');
    if (fs.existsSync(tempPath)) {
      normalizedRelPath += '.md';
    }
  }

  const filePath = path.join(notebookDir(notebookId), normalizedRelPath);
  const raw = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
  const { frontmatter, body } = parseFrontmatter(raw);
  const rawType = frontmatter.tipo || 'concepto';
  const tipo = rawType === 'fuente_transformada' ? 'fuente' : rawType;
  const id = frontmatter.id || normalizedRelPath.replace(/\.md$/, '').replace(/[^a-z0-9]/gi, '-');
  const title = frontmatter.titulo || path.basename(normalizedRelPath, '.md').replace(/-/g, ' ');

  // Convert double-bracket wiki links to standard Markdown links before parsing
  const parsedBody = body.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_match, linkPath, label) => {
    const cleanPath = linkPath.trim();
    const encodedPath = cleanPath.split('/').map(encodeURIComponent).join('/');
    
    let displayLabel = (label || '').trim();
    if (!displayLabel) {
      const basename = cleanPath.split('/').pop() || '';
      displayLabel = basename
        .replace(/\.md$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c: string) => c.toUpperCase());
    }
    
    return `[${displayLabel}](/notebooks/${notebookId}/wiki/${encodedPath})`;
  });

  return {
    notebookId,
    page_id: id,
    file: normalizedRelPath,
    title,
    type: tipo,
    content: raw,
    html: marked.parse(parsedBody) as string,
    frontmatter,
    related: Array.isArray(frontmatter.relacionados) ? frontmatter.relacionados : [],
    maestria: typeof frontmatter.maestria === 'number' ? frontmatter.maestria : 0,
    estado_srs: frontmatter.estado_srs || 'bloqueado',
    last_updated: frontmatter.ultimo_repaso || frontmatter.actualizado || frontmatter.fecha_ingesta || new Date().toISOString(),
  };
}

export function getAllPages(notebookId: string): WikiPage[] {
  return getMarkdownFiles(notebookId)
    .filter((p) => p !== 'YACHAQ.md' && p !== 'index.md' && p !== 'log.md')
    .map((p) => readPage(notebookId, p));
}

export function savePage(notebookId: string, relPath: string, content: string) {
  const filePath = path.join(notebookDir(notebookId), relPath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  updateNotebookMeta(notebookId, {});
}

export function extractWikiLinks(content: string): string[] {
  const matches = content.match(/\[\[([^\]]+)\]\]/g) || [];
  return matches.map((m) => {
    const raw = m.slice(2, -2);
    const pipeIdx = raw.indexOf('|');
    return pipeIdx === -1 ? raw : raw.slice(0, pipeIdx);
  });
}

export function buildGraph(notebookId: string): { nodes: WikiNode[]; edges: WikiLink[] } {
  const pages = getAllPages(notebookId);
  const nodeMap = new Map<string, WikiNode>();

  for (const page of pages) {
    const type = page.type;
    const group =
      type === 'concepto'
        ? page.frontmatter.modulo || 'general'
        : type === 'entidad'
        ? 'Entidades'
        : type === 'fuente'
        ? 'Fuentes'
        : type === 'modulo'
        ? 'Módulos'
        : type === 'pregunta'
        ? 'SRS'
        : 'general';

    nodeMap.set(page.page_id, {
      id: page.page_id,
      label: page.title,
      type,
      group,
      maestria: page.maestria,
      estado_srs: page.estado_srs,
      file: page.file,
      summary: page.frontmatter.resumen || '',
      module: page.frontmatter.modulo,
      category: group,
    });
  }

  const edgeMap = new Map<string, WikiLink>();

  for (const page of pages) {
    const links = extractWikiLinks(page.content);
    for (const link of links) {
      const targetPage = pages.find((p) => p.file === link || p.file.endsWith('/' + link));
      if (!targetPage || targetPage.page_id === page.page_id) continue;
      const key = [page.page_id, targetPage.page_id].sort().join('--');
      if (!edgeMap.has(key)) {
        edgeMap.set(key, {
          source: page.page_id,
          target: targetPage.page_id,
          type: 'relacionado',
        });
      }
    }

    const related = Array.isArray(page.frontmatter.relacionados) ? page.frontmatter.relacionados : [];
    for (const rel of related) {
      const targetPage = pages.find((p) => p.file === rel || p.file.endsWith('/' + rel));
      if (!targetPage || targetPage.page_id === page.page_id) continue;
      const key = [page.page_id, targetPage.page_id].sort().join('--');
      if (!edgeMap.has(key)) {
        edgeMap.set(key, {
          source: page.page_id,
          target: targetPage.page_id,
          type: 'relacionado',
        });
      }
    }

    const prerrequisitos = Array.isArray(page.frontmatter.prerrequisitos) ? page.frontmatter.prerrequisitos : [];
    for (const pre of prerrequisitos) {
      const targetPage = pages.find((p) => p.file === pre || p.file.endsWith('/' + pre));
      if (!targetPage || targetPage.page_id === page.page_id) continue;
      const key = [targetPage.page_id, page.page_id].sort().join('--');
      edgeMap.set(key, {
        source: targetPage.page_id,
        target: page.page_id,
        type: 'prerrequisito',
      });
    }

    const conceptoAsociado = page.frontmatter.concepto_asociado;
    if (page.type === 'pregunta' && typeof conceptoAsociado === 'string') {
      const targetPage = pages.find((p) =>
        p.file === conceptoAsociado ||
        p.file.endsWith('/' + conceptoAsociado) ||
        p.file.endsWith('/' + conceptoAsociado + '.md')
      );
      if (targetPage && targetPage.page_id !== page.page_id) {
        const key = [page.page_id, targetPage.page_id].sort().join('--');
        if (!edgeMap.has(key)) {
          edgeMap.set(key, {
            source: page.page_id,
            target: targetPage.page_id,
            type: 'pregunta_sobre',
          });
        }
      }
    }
  }

  return { nodes: Array.from(nodeMap.values()), edges: Array.from(edgeMap.values()) };
}

export function getNotebookStats(notebookId: string) {
  const pages = getAllPages(notebookId);
  const concepts = pages.filter((p) => p.type === 'concepto');
  const entities = pages.filter((p) => p.type === 'entidad');
  const sources = pages.filter((p) => p.type === 'fuente');
  const questions = pages.filter((p) => p.type === 'pregunta');
  const modules = pages.filter((p) => p.type === 'modulo');

  const masterySum = concepts.reduce((acc, c) => acc + c.maestria, 0);
  const masteryAvg = concepts.length ? masterySum / concepts.length : 0;

  const estadoCounts = {
    bloqueado: concepts.filter((c) => c.estado_srs === 'bloqueado').length,
    critico: concepts.filter((c) => c.estado_srs === 'critico').length,
    en_practica: concepts.filter((c) => c.estado_srs === 'en_practica').length,
    dominado: concepts.filter((c) => c.estado_srs === 'dominado').length,
  };

  return {
    conceptCount: concepts.length,
    entityCount: entities.length,
    sourceCount: sources.length,
    questionCount: questions.length,
    moduleCount: modules.length,
    masteryAvg: Math.round(masteryAvg * 100),
    estadoCounts,
    totalNodes: pages.length,
  };
}

export function getSources(notebookId: string) {
  return getAllPages(notebookId)
    .filter((p) => p.type === 'fuente')
    .map((p) => ({
      id: p.page_id,
      title: p.title,
      fecha_ingesta: p.frontmatter.fecha_ingesta || p.last_updated,
      paginas_procesadas: p.frontmatter.paginas_procesadas || 0,
      tipo: p.frontmatter.tipo || 'pdf',
    }));
}

export function getModules(notebookId: string) {
  return getAllPages(notebookId)
    .filter((p) => p.type === 'modulo')
    .map((p) => {
      const concepts = getAllPages(notebookId).filter(
        (c) => c.type === 'concepto' && c.frontmatter.modulo === p.page_id.replace('modulo-', '')
      );
      const avg = concepts.length
        ? concepts.reduce((acc, c) => acc + c.maestria, 0) / concepts.length
        : 0;
      return {
        id: p.page_id,
        title: p.title,
        conceptCount: concepts.length,
        mastery: Math.round(avg * 100),
        file: p.file,
      };
    });
}

export function getSRSItems(notebookId: string) {
  const concepts = getAllPages(notebookId).filter((p) => p.type === 'concepto');
  return getAllPages(notebookId)
    .filter((p) => p.type === 'pregunta')
    .map((p) => {
      const assoc = concepts.find(
        (c) => c.page_id === `concepto-${p.frontmatter.concepto_asociado}` || c.page_id === p.frontmatter.concepto_asociado
      );
      return {
        id: p.page_id,
        title: p.title,
        concepto_asociado: p.frontmatter.concepto_asociado || '',
        conceptTitle: assoc?.title || '',
        estado_srs: assoc?.estado_srs || 'bloqueado',
        file: p.file,
      };
    });
}

export function getSessions(notebookId: string) {
  // Placeholder until schedule is implemented per notebook
  return [] as { id: string; title: string; date: string; notebookId: string; completed: boolean }[];
}

export function deleteNotebook(id: string) {
  const dir = notebookDir(id);
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

