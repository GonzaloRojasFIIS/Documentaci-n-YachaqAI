"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import NotebookShell from "@/components/NotebookShell";

export default function EditorPage() {
  const params = useParams<{ notebookId: string; path: string[] }>();
  const router = useRouter();
  const { notebookId, path } = params;
  const relPath = path?.join("/") || "index.md";
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const encoded = relPath.split("/").map(encodeURIComponent).join("/");
    fetch(`/api/notebooks/${notebookId}/wiki/${encoded}`)
      .then((r) => r.json())
      .then((data) => setContent(data.content || ""));
  }, [notebookId, relPath]);

  async function handleSave() {
    setSaving(true);
    const encoded = relPath.split("/").map(encodeURIComponent).join("/");
    await fetch(`/api/notebooks/${notebookId}/wiki/${encoded}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    setSaving(false);
    router.push(`/notebooks/${notebookId}/wiki/${encoded}`);
  }

  const encoded = relPath.split("/").map(encodeURIComponent).join("/");

  return (
    <NotebookShell>
      <div className="h-[calc(100vh-1px)] flex flex-col">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-card/50">
          <div>
            <h1 className="font-display text-lg font-semibold">Editar: {relPath}</h1>
            <p className="text-sm text-muted-foreground">Los cambios se guardan en el archivo Markdown.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/notebooks/${notebookId}/wiki/${encoded}`}
              className="px-4 py-2 rounded-lg border border-input bg-background text-sm hover:bg-muted transition-colors"
            >
              Cancelar
            </Link>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {saving ? "Guardando…" : "Guardar cambios"}
            </button>
          </div>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 w-full p-6 font-mono text-sm resize-none focus:outline-none bg-background"
          spellCheck={false}
        />
      </div>
    </NotebookShell>
  );
}
