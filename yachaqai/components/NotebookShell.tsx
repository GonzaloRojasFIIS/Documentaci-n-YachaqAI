"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "◧" },
  { label: "Grafo", href: "/graph", icon: "◉" },
  { label: "Wiki", href: "/wiki/index.md", icon: "◫" },
  { label: "Módulos", href: "/modules", icon: "▦" },
  { label: "Repaso", href: "/srs", icon: "◐" },
  { label: "Calendario", href: "/schedule", icon: "◷" },
  { label: "Chat", href: "/chat", icon: "◒" },
  { label: "Lint", href: "/lint", icon: "◈" },
];

export default function NotebookShell({ children }: { children: React.ReactNode }) {
  const { notebookId } = useParams<{ notebookId: string }>();
  const pathname = usePathname();
  const [name, setName] = useState<string>("");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const val = localStorage.getItem("sidebar_collapsed");
    if (val === "true") {
      setCollapsed(true);
    }
    
    fetch(`/api/notebooks/${notebookId}`)
      .then((r) => r.json())
      .then((data) => setName(data.meta?.name || notebookId));
  }, [notebookId]);

  const handleToggleCollapse = () => {
    const newVal = !collapsed;
    setCollapsed(newVal);
    localStorage.setItem("sidebar_collapsed", String(newVal));
  };

  return (
    <div className="min-h-screen flex">
      <aside className={`border-r border-border bg-card flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
        <div className="p-4 border-b border-border flex flex-col gap-2 relative">
          <div className="flex items-center justify-between">
            {!collapsed ? (
              <Link href="/" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <span>←</span> Volver a cuadernos
              </Link>
            ) : (
              <Link href="/" className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" title="Volver a cuadernos">
                <span>←</span>
              </Link>
            )}
            <button
              onClick={handleToggleCollapse}
              className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors ml-auto font-bold"
              title={collapsed ? "Expandir menú" : "Colapsar menú"}
            >
              {collapsed ? "»" : "«"}
            </button>
          </div>
          {!collapsed && (
            <h2 className="font-display font-semibold text-base mt-2 truncate" title={name}>
              {name || notebookId}
            </h2>
          )}
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const href = `/notebooks/${notebookId}${item.href}`;
            const active = pathname === href || pathname.startsWith(href.replace(/\.md$/, ""));
            return (
              <Link
                key={item.href}
                href={href}
                title={collapsed ? item.label : undefined}
                className={`flex items-center rounded-lg text-sm transition-all ${
                  collapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2"
                } ${
                  active
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span className={`w-4 text-center ${collapsed ? "text-base font-semibold" : ""}`}>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border flex justify-center">
          {collapsed ? (
            <Link
              href={`/notebooks/${notebookId}/sources/add`}
              title="Agregar fuentes"
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold hover:bg-primary/90 transition-colors"
            >
              +
            </Link>
          ) : (
            <Link
              href={`/notebooks/${notebookId}/sources/add`}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <span>+</span> Agregar fuentes
            </Link>
          )}
        </div>
      </aside>
      <main className="flex-1 min-w-0 overflow-auto">{children}</main>
    </div>
  );
}
