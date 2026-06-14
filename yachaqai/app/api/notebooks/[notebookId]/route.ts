import { NextResponse } from "next/server";
import { getNotebookMeta, notebookExists, getNotebookStats, getAllPages, deleteNotebook } from "@/lib/fs-wiki";

export async function GET(_req: Request, { params }: { params: Promise<{ notebookId: string }> }) {
  const { notebookId } = await params;
  if (!notebookExists(notebookId)) {
    return NextResponse.json({ error: "Cuaderno no encontrado" }, { status: 404 });
  }
  const meta = getNotebookMeta(notebookId);
  const stats = getNotebookStats(notebookId);
  const pages = getAllPages(notebookId);
  return NextResponse.json({ meta, stats, pages });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ notebookId: string }> }) {
  const { notebookId } = await params;
  if (!notebookExists(notebookId)) {
    return NextResponse.json({ error: "Cuaderno no encontrado" }, { status: 404 });
  }
  deleteNotebook(notebookId);
  return NextResponse.json({ success: true });
}
