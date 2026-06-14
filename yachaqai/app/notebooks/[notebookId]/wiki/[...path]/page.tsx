"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import NotebookShell from "@/components/NotebookShell";
import ForceGraph from "@/components/ForceGraph";
import { WikiNode, WikiLink } from "@/lib/types";

const formatDateValue = (val: string) => {
  try {
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return val;
  }
};

const formatMetaValue = (key: string, value: any) => {
  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-slate-400 italic">Ninguno</span>;
    if (typeof value[0] === "object" && value[0] !== null) {
      const label =
        key === "modulos"
          ? "módulos"
          : key === "conceptos"
          ? "conceptos"
          : key === "fuentes"
          ? "fuentes"
          : key === "preguntas"
          ? "preguntas"
          : "elementos";
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
          {value.length} {label}
        </span>
      );
    }
    return <span className="text-slate-700">{value.join(", ")}</span>;
  }

  if (typeof value === "object" && value !== null) {
    return (
      <code className="text-[10px] bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-600">
        {JSON.stringify(value)}
      </code>
    );
  }

  if (key === "estado" || key === "estado_srs") {
    const stateColors: Record<string, string> = {
      en_estudio: "bg-blue-50 text-blue-700 border-blue-200",
      dominado: "bg-emerald-50 text-emerald-700 border-emerald-200",
      en_practica: "bg-amber-50 text-amber-700 border-amber-200",
      critico: "bg-red-50 text-red-700 border-red-200",
      bloqueado: "bg-slate-50 text-slate-600 border-slate-200",
    };
    const colorClass = stateColors[value] || "bg-slate-50 text-slate-600 border-slate-200";
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${colorClass}`}>
        {String(value).replace("_", " ")}
      </span>
    );
  }

  if (key === "idioma") {
    return (
      <span className="inline-flex items-center gap-1 text-slate-700 font-semibold">
        <span>🌐</span> {value === "es" ? "Español" : value === "en" ? "Inglés" : String(value).toUpperCase()}
      </span>
    );
  }

  if (key === "retentiva_srs" || key === "maestria") {
    const pct = Math.round(Number(value) * 100);
    return (
      <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
        <span className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden inline-block border border-slate-200/60">
          <span
            className={`h-full block ${pct >= 80 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-red-500"}`}
            style={{ width: `${pct}%` }}
          />
        </span>
        <span>{pct}%</span>
      </span>
    );
  }

  if (key === "estabilidad_srs") {
    return <span className="font-semibold text-slate-700">{value} días</span>;
  }

  if (key === "dificultad_srs") {
    const score = Number(value);
    return (
      <span className="inline-flex items-center gap-1 text-slate-700 font-semibold">
        <span>⭐</span> {score.toFixed(1)} / 10
      </span>
    );
  }

  if (typeof value === "string" && (key.includes("creado") || key.includes("actualizado") || key.includes("repaso") || /^\d{4}-\d{2}-\d{2}/.test(value))) {
    return (
      <span className="inline-flex items-center gap-1 text-slate-700 font-semibold">
        <span>📅</span> {formatDateValue(value)}
      </span>
    );
  }

  return <span className="text-slate-750">{String(value)}</span>;
};

export default function WikiPage() {
  const params = useParams<{ notebookId: string; path: string[] }>();
  const { notebookId, path } = params;
  const relPath = path?.join("/") || "index.md";
  
  const [page, setPage] = useState<any>(null);
  const [graph, setGraph] = useState<{ nodes: WikiNode[]; edges: WikiLink[] } | null>(null);
  const [pageList, setPageList] = useState<any[]>([]);
  const [showGraphOverlay, setShowGraphOverlay] = useState(true);
  
  // Folder tree toggle state
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    root: true,
    fuentes: true,
    conceptos: true,
    entidades: false,
    preguntas: false,
    modulos: true,
  });

  const toggleFolder = (folder: string) => {
    setOpenFolders((prev) => ({ ...prev, [folder]: !prev[folder] }));
  };

  const [openSubfolders, setOpenSubfolders] = useState<Record<string, boolean>>({});

  const toggleSubfolder = (folder: string) => {
    setOpenSubfolders((prev) => ({ ...prev, [folder]: !prev[folder] }));
  };

  useEffect(() => {
    const parts = relPath.split("/");
    if (parts.length > 2 && parts[0] === "5. modulos") {
      const activeFolder = parts[1];
      setOpenSubfolders((prev) => ({ ...prev, [activeFolder]: true }));
    }
  }, [relPath]);

  // Fetch current page content
  useEffect(() => {
    const encoded = relPath.split("/").map(encodeURIComponent).join("/");
    fetch(`/api/notebooks/${notebookId}/wiki/${encoded}`)
      .then((r) => r.json())
      .then(setPage);
  }, [notebookId, relPath]);

  // Fetch full graph to construct the localized neighborhood mini-graph
  useEffect(() => {
    fetch(`/api/notebooks/${notebookId}/graph`)
      .then((r) => r.json())
      .then(setGraph);
  }, [notebookId, relPath]);

  // Fetch all pages in the notebook for the sidebar tree
  useEffect(() => {
    fetch(`/api/notebooks/${notebookId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.pages) {
          setPageList(data.pages);
        }
      });
  }, [notebookId]);

  // Group pages by directory
  const groupedPages = useMemo(() => {
    const groups = {
      fuentes: [] as any[],
      conceptos: [] as any[],
      entidades: [] as any[],
      preguntas: [] as any[],
      modulos: [] as any[],
    };

    pageList.forEach((p: any) => {
      if (p.file.startsWith("1. fuentes_transformadas/")) {
        groups.fuentes.push(p);
      } else if (p.file.startsWith("2. conceptos/")) {
        groups.conceptos.push(p);
      } else if (p.file.startsWith("3. entidades/")) {
        groups.entidades.push(p);
      } else if (p.file.startsWith("4. preguntas/")) {
        groups.preguntas.push(p);
      } else if (p.file.startsWith("5. modulos/")) {
        groups.modulos.push(p);
      }
    });

    // Sort alphabetically by title
    groups.fuentes.sort((a, b) => a.title.localeCompare(b.title));
    groups.conceptos.sort((a, b) => a.title.localeCompare(b.title));
    groups.entidades.sort((a, b) => a.title.localeCompare(b.title));
    groups.preguntas.sort((a, b) => a.title.localeCompare(b.title));
    groups.modulos.sort((a, b) => a.title.localeCompare(b.title));

    return groups;
  }, [pageList]);

  // Group modules by sub-folder if any
  const moduleFolders = useMemo(() => {
    const folders: Record<string, { title: string; pages: any[] }> = {};
    const flatPages: any[] = [];

    groupedPages.modulos.forEach((p) => {
      const parts = p.file.split("/");
      if (parts.length > 2) {
        const folderSlug = parts[1];
        const folderTitle = folderSlug
          .replace("modulo-", "Módulo ")
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c: string) => c.toUpperCase());

        if (!folders[folderSlug]) {
          folders[folderSlug] = { title: folderTitle, pages: [] };
        }
        folders[folderSlug].pages.push(p);
      } else {
        flatPages.push(p);
      }
    });

    // Sort pages inside each folder by name (putting index first)
    Object.keys(folders).forEach((slug) => {
      folders[slug].pages.sort((a, b) => {
        const aIsIndex = a.file.endsWith(`${slug}.md`);
        const bIsIndex = b.file.endsWith(`${slug}.md`);
        if (aIsIndex) return -1;
        if (bIsIndex) return 1;
        return a.title.localeCompare(b.title);
      });
    });

    return { folders, flatPages };
  }, [groupedPages.modulos]);

  // Root notebook pages
  const rootPages = useMemo(() => [
    { file: "index.md", title: "Índice principal" },
    { file: "overview.md", title: "Visión General" },
    { file: "log.md", title: "Registro de Actividad" },
    { file: "YACHAQ.md", title: "Reglas de Ingesta (YACHAQ)" }
  ], []);

  // Filter graph to construct a neighborhood mini-graph (center node + neighbors)
  const subGraph = useMemo(() => {
    if (!graph || !page) return { nodes: [], edges: [] };
    const currentId = page.page_id;

    const neighborIds = new Set<string>([currentId]);

    // Find all directly connected nodes (inward or outward)
    graph.edges.forEach((e) => {
      const s = typeof e.source === "object" ? (e.source as any).id : e.source;
      const t = typeof e.target === "object" ? (e.target as any).id : e.target;
      
      if (s === currentId) neighborIds.add(t);
      if (t === currentId) neighborIds.add(s);
    });

    const nodes = graph.nodes.filter((n) => neighborIds.has(n.id));
    const edges = graph.edges.filter((e) => {
      const s = typeof e.source === "object" ? (e.source as any).id : e.source;
      const t = typeof e.target === "object" ? (e.target as any).id : e.target;
      return s === currentId || t === currentId;
    });

    return { nodes, edges };
  }, [graph, page]);

  const getSrsBadgeColor = (estado: string) => {
    switch (estado) {
      case "dominado":
        return "bg-emerald-500";
      case "en_practica":
        return "bg-amber-500";
      case "critico":
        return "bg-red-500";
      case "en_estudio":
        return "bg-blue-500";
      case "bloqueado":
      default:
        return "bg-slate-400";
    }
  };

  if (!page) {
    return (
      <NotebookShell>
        <div className="p-10 animate-pulse text-muted-foreground text-sm font-medium">
          Cargando nota…
        </div>
      </NotebookShell>
    );
  }

  const encoded = relPath.split("/").map(encodeURIComponent).join("/");

  // Skip rendering the frontmatter keys that are system-managed metadata
  const cleanFrontmatter = page.frontmatter
    ? Object.entries(page.frontmatter).filter(
        ([key]) =>
          ![
            "id",
            "tipo",
            "titulo",
            "file",
            "relacionados",
            "prerrequisitos",
            "entidades",
            "mazo_id",
            "yachaq_version",
            "yachaq_schema_version",
          ].includes(key)
      )
    : [];

  return (
    <NotebookShell>
      <div className="h-[calc(100vh-1px)] flex bg-slate-50/50">
        {/* Left Sidebar: Folder Navigation Tree */}
        <div className="w-[250px] bg-slate-50 border-r border-slate-200/80 flex flex-col flex-shrink-0">
          <div className="px-5 py-4 border-b border-slate-200/60 bg-white">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Explorador Wiki
            </h3>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
              Estructura de archivos y notas
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-3.5 flex flex-col gap-2.5">
            {/* Raíz */}
            <div>
              <div 
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-200/50 rounded-lg cursor-pointer select-none transition-colors"
                onClick={() => toggleFolder('root')}
              >
                <span className="text-[9px] text-slate-400">{openFolders.root ? "▼" : "▶"}</span>
                <span>📁 Cuaderno (Raíz)</span>
              </div>
              {openFolders.root && (
                <div className="ml-3 mt-1.5 flex flex-col gap-1 border-l border-slate-200/80 pl-2">
                  {rootPages.map((rp) => {
                    const isSelected = relPath === rp.file;
                    const enc = encodeURIComponent(rp.file);
                    return (
                      <Link
                        key={rp.file}
                        href={`/notebooks/${notebookId}/wiki/${enc}`}
                        className={`block px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
                          isSelected
                            ? "bg-blue-50 text-blue-600 font-semibold"
                            : "text-slate-500 hover:bg-slate-200/40 hover:text-slate-800"
                        }`}
                      >
                        📄 {rp.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 1. Fuentes */}
            <div>
              <div 
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-200/50 rounded-lg cursor-pointer select-none transition-colors"
                onClick={() => toggleFolder('fuentes')}
              >
                <span className="text-[9px] text-slate-400">{openFolders.fuentes ? "▼" : "▶"}</span>
                <span className="truncate">📁 1. Fuentes ({groupedPages.fuentes.length})</span>
              </div>
              {openFolders.fuentes && (
                <div className="ml-3 mt-1.5 flex flex-col gap-1 border-l border-slate-200/80 pl-2">
                  {groupedPages.fuentes.length > 0 ? (
                    groupedPages.fuentes.map((p) => {
                      const isSelected = relPath === p.file;
                      const enc = p.file.split("/").map(encodeURIComponent).join("/");
                      return (
                        <Link
                          key={p.file}
                          href={`/notebooks/${notebookId}/wiki/${enc}`}
                          className={`block px-2.5 py-1 text-[11px] font-medium rounded-md truncate transition-all ${
                            isSelected
                              ? "bg-blue-50 text-blue-600 font-semibold"
                              : "text-slate-500 hover:bg-slate-200/40 hover:text-slate-800"
                          }`}
                          title={p.title}
                        >
                          📄 {p.title}
                        </Link>
                      );
                    })
                  ) : (
                    <span className="text-[10px] text-muted-foreground italic px-2">Vacío</span>
                  )}
                </div>
              )}
            </div>

            {/* 2. Conceptos */}
            <div>
              <div 
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-200/50 rounded-lg cursor-pointer select-none transition-colors"
                onClick={() => toggleFolder('conceptos')}
              >
                <span className="text-[9px] text-slate-400">{openFolders.conceptos ? "▼" : "▶"}</span>
                <span className="truncate">📁 2. Conceptos ({groupedPages.conceptos.length})</span>
              </div>
              {openFolders.conceptos && (
                <div className="ml-3 mt-1.5 flex flex-col gap-1 border-l border-slate-200/80 pl-2">
                  {groupedPages.conceptos.length > 0 ? (
                    groupedPages.conceptos.map((p) => {
                      const isSelected = relPath === p.file;
                      const enc = p.file.split("/").map(encodeURIComponent).join("/");
                      
                      const dotColors: Record<string, string> = {
                        dominado: "bg-emerald-500",
                        en_practica: "bg-amber-500",
                        critico: "bg-red-500",
                        en_estudio: "bg-blue-500",
                        bloqueado: "bg-slate-300"
                      };
                      const dotColor = dotColors[p.frontmatter?.estado_srs || 'bloqueado'] || "bg-slate-300";

                      return (
                        <Link
                          key={p.file}
                          href={`/notebooks/${notebookId}/wiki/${enc}`}
                          className={`flex items-center gap-2 px-2.5 py-1 text-[11px] font-medium rounded-md truncate transition-all ${
                            isSelected
                              ? "bg-blue-50 text-blue-600 font-semibold"
                              : "text-slate-500 hover:bg-slate-200/40 hover:text-slate-800"
                          }`}
                          title={p.title}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${dotColor} flex-shrink-0`} />
                          <span className="truncate">{p.title}</span>
                        </Link>
                      );
                    })
                  ) : (
                    <span className="text-[10px] text-muted-foreground italic px-2">Vacío</span>
                  )}
                </div>
              )}
            </div>

            {/* 3. Entidades */}
            <div>
              <div 
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-200/50 rounded-lg cursor-pointer select-none transition-colors"
                onClick={() => toggleFolder('entidades')}
              >
                <span className="text-[9px] text-slate-400">{openFolders.entidades ? "▼" : "▶"}</span>
                <span className="truncate">📁 3. Entidades ({groupedPages.entidades.length})</span>
              </div>
              {openFolders.entidades && (
                <div className="ml-3 mt-1.5 flex flex-col gap-1 border-l border-slate-200/80 pl-2">
                  {groupedPages.entidades.length > 0 ? (
                    groupedPages.entidades.map((p) => {
                      const isSelected = relPath === p.file;
                      const enc = p.file.split("/").map(encodeURIComponent).join("/");
                      return (
                        <Link
                          key={p.file}
                          href={`/notebooks/${notebookId}/wiki/${enc}`}
                          className={`block px-2.5 py-1 text-[11px] font-medium rounded-md truncate transition-all ${
                            isSelected
                              ? "bg-blue-50 text-blue-600 font-semibold"
                              : "text-slate-500 hover:bg-slate-200/40 hover:text-slate-800"
                          }`}
                          title={p.title}
                        >
                          📄 {p.title}
                        </Link>
                      );
                    })
                  ) : (
                    <span className="text-[10px] text-muted-foreground italic px-2">Vacío</span>
                  )}
                </div>
              )}
            </div>

            {/* 4. Preguntas */}
            <div>
              <div 
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-200/50 rounded-lg cursor-pointer select-none transition-colors"
                onClick={() => toggleFolder('preguntas')}
              >
                <span className="text-[9px] text-slate-400">{openFolders.preguntas ? "▼" : "▶"}</span>
                <span className="truncate">📁 4. Preguntas ({groupedPages.preguntas.length})</span>
              </div>
              {openFolders.preguntas && (
                <div className="ml-3 mt-1.5 flex flex-col gap-1 border-l border-slate-200/80 pl-2">
                  {groupedPages.preguntas.length > 0 ? (
                    groupedPages.preguntas.map((p) => {
                      const isSelected = relPath === p.file;
                      const enc = p.file.split("/").map(encodeURIComponent).join("/");
                      return (
                        <Link
                          key={p.file}
                          href={`/notebooks/${notebookId}/wiki/${enc}`}
                          className={`block px-2.5 py-1 text-[11px] font-medium rounded-md truncate transition-all ${
                            isSelected
                              ? "bg-blue-50 text-blue-600 font-semibold"
                              : "text-slate-500 hover:bg-slate-200/40 hover:text-slate-800"
                          }`}
                          title={p.title}
                        >
                          ❓ {p.title.replace("Cuestionario: ", "")}
                        </Link>
                      );
                    })
                  ) : (
                    <span className="text-[10px] text-muted-foreground italic px-2">Vacío</span>
                  )}
                </div>
              )}
            </div>

            {/* 5. Módulos */}
            <div>
              <div 
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-200/50 rounded-lg cursor-pointer select-none transition-colors"
                onClick={() => toggleFolder('modulos')}
              >
                <span className="text-[9px] text-slate-400">{openFolders.modulos ? "▼" : "▶"}</span>
                <span className="truncate">📁 5. Módulos ({groupedPages.modulos.length})</span>
              </div>
              {openFolders.modulos && (
                <div className="ml-3 mt-1.5 flex flex-col gap-2 border-l border-slate-200/80 pl-2">
                  {/* Subcarpetas agrupadas */}
                  {Object.entries(moduleFolders.folders).map(([folderSlug, folderData]) => {
                    const isOpen = !!openSubfolders[folderSlug];
                    return (
                      <div key={folderSlug} className="space-y-1">
                        <div
                          className="flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-bold text-slate-600 hover:bg-slate-200/40 rounded cursor-pointer select-none transition-colors"
                          onClick={() => toggleSubfolder(folderSlug)}
                        >
                          <span className="text-[8px] text-slate-400">{isOpen ? "▼" : "▶"}</span>
                          <span className="truncate">📁 {folderData.title}</span>
                        </div>
                        {isOpen && (
                          <div className="ml-2.5 flex flex-col gap-0.5 border-l border-slate-200 pl-1.5">
                            {folderData.pages.map((p) => {
                              const isSelected = relPath === p.file;
                              const enc = p.file.split("/").map(encodeURIComponent).join("/");
                              const isIndex = p.file.endsWith(`${folderSlug}.md`);
                              const displayName = isIndex ? "📖 Índice Módulo" : p.title;

                              return (
                                <Link
                                  key={p.file}
                                  href={`/notebooks/${notebookId}/wiki/${enc}`}
                                  className={`block px-2 py-0.5 text-[11px] font-medium rounded truncate transition-all ${
                                    isSelected
                                      ? "bg-blue-50 text-blue-600 font-semibold"
                                      : "text-slate-500 hover:bg-slate-200/30 hover:text-slate-800"
                                  }`}
                                  title={p.title}
                                >
                                  {displayName}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Páginas sueltas */}
                  {moduleFolders.flatPages.map((p) => {
                    const isSelected = relPath === p.file;
                    const enc = p.file.split("/").map(encodeURIComponent).join("/");
                    return (
                      <Link
                        key={p.file}
                        href={`/notebooks/${notebookId}/wiki/${enc}`}
                        className={`block px-2.5 py-1 text-[11px] font-medium rounded-md truncate transition-all ${
                          isSelected
                            ? "bg-blue-50 text-blue-600 font-semibold"
                            : "text-slate-500 hover:bg-slate-200/40 hover:text-slate-800"
                        }`}
                        title={p.title}
                      >
                        📄 {p.title}
                      </Link>
                    );
                  })}

                  {groupedPages.modulos.length === 0 && (
                    <span className="text-[10px] text-muted-foreground italic px-2">Vacío</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center: Wiki Article Content */}
        <div className="flex-1 overflow-y-auto bg-white p-8 relative">
          <div className="max-w-3xl mx-auto">
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5 text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                <span className={`w-2 h-2 rounded-full ${getSrsBadgeColor(page.estado_srs)}`} />
                <span>
                  {page.type} · Maestría: {Math.round((page.maestria || 0) * 100)}%
                </span>
              </div>
              <Link
                href={`/notebooks/${notebookId}/editor/${encoded}`}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
              >
                Editar nota
              </Link>
            </div>

            {/* Frontmatter Info Metadata (if present) */}
            {cleanFrontmatter.length > 0 && (
              <div className="mb-8 rounded-2xl border border-slate-200/80 bg-slate-50/40 backdrop-blur-sm p-5 text-[11px] leading-relaxed shadow-sm flex flex-col gap-3.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-1.5">
                  <span>ℹ️</span> Detalles de la Nota
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {cleanFrontmatter.map(([key, value]) => {
                    const isLongText = key === "resumen" || key === "descripcion";
                    return (
                      <div
                        key={key}
                        className={`flex flex-col md:flex-row items-start gap-1 md:gap-4 border-b border-slate-100/50 pb-2.5 md:pb-0 md:border-b-0 last:border-b-0 ${
                          isLongText ? "md:col-span-2" : ""
                        }`}
                      >
                        <span className="text-muted-foreground capitalize font-medium w-28 flex-shrink-0">
                          {key.replace("_", " ")}
                        </span>
                        <span className="text-slate-800 flex-1 leading-relaxed text-xs">
                          {formatMetaValue(key, value)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Markdown Body */}
            <article
              className="prose prose-slate max-w-none text-xs text-slate-800 leading-relaxed py-4"
              dangerouslySetInnerHTML={{ __html: page.html }}
            />

            {page.type === "modulo" && (
              <div className="mt-8 p-6 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 via-blue-50/20 to-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    <span>¿Listo para evaluar tus conocimientos?</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-md">
                    Pon a prueba tu retención FSRS con las preguntas preparadas para el módulo <strong className="text-slate-700">"{page.title}"</strong>.
                  </p>
                </div>
                <Link
                  href={`/notebooks/${notebookId}/srs?module=${page.page_id.replace("modulo-", "")}`}
                  className="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm flex items-center gap-2 flex-shrink-0"
                >
                  Comenzar Cuestionario
                </Link>
              </div>
            )}

            {/* Floating Graph Container at bottom right */}
            {subGraph.nodes.length > 0 && (
              <div
                className={`fixed bottom-6 right-6 z-10 w-72 h-72 rounded-2xl border border-slate-200/80 bg-white shadow-xl flex flex-col overflow-hidden transition-all duration-300 ${
                  showGraphOverlay
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none invisible"
                }`}
              >
                <div className="px-3.5 py-2 border-b border-slate-100 bg-slate-50/80 backdrop-blur flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <span>🕸️</span> Mapa Local
                  </span>
                  <button
                    onClick={() => setShowGraphOverlay(false)}
                    className="text-slate-400 hover:text-slate-650 hover:bg-slate-200/50 text-[10px] font-bold px-1.5 py-0.5 rounded transition-all"
                    title="Ocultar Mapa"
                  >
                    Ocultar
                  </button>
                </div>
                <div className="flex-1 relative bg-slate-50/10">
                  <ForceGraph
                    notebookId={notebookId}
                    nodes={subGraph.nodes}
                    edges={subGraph.edges}
                  />
                </div>
                <div className="p-2 border-t border-slate-100 bg-slate-50/40 text-[9px] text-muted-foreground leading-tight text-center">
                  Haz clic en un nodo para navegar.
                </div>
              </div>
            )}

            {/* Toggle float graph button if hidden */}
            {!showGraphOverlay && subGraph.nodes.length > 0 && (
              <button
                onClick={() => setShowGraphOverlay(true)}
                className="fixed bottom-6 right-6 z-10 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-semibold shadow-lg transition-all flex items-center gap-1.5 hover:scale-105 duration-200"
              >
                <span>🕸️</span> Mostrar Mapa Local
              </button>
            )}
          </div>
        </div>
      </div>
    </NotebookShell>
  );
}
