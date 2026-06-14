import { NextRequest, NextResponse } from "next/server";
import { notebookExists, readPage, savePage } from "@/lib/fs-wiki";

async function getParams(params: Promise<{ notebookId: string; path?: string[] }>) {
  const { notebookId, path } = await params;
  const relPath = path ? decodeURIComponent(path.join("/")) : "index.md";
  return { notebookId, relPath };
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ notebookId: string; path?: string[] }> }) {
  const { notebookId, relPath } = await getParams(params);
  if (!notebookExists(notebookId)) {
    return NextResponse.json({ error: "Cuaderno no encontrado" }, { status: 404 });
  }
  const page = readPage(notebookId, relPath);
  return NextResponse.json(page);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ notebookId: string; path?: string[] }> }) {
  const { notebookId, relPath } = await getParams(params);
  if (!notebookExists(notebookId)) {
    return NextResponse.json({ error: "Cuaderno no encontrado" }, { status: 404 });
  }
  const { content } = await req.json();
  savePage(notebookId, relPath, content);
  return NextResponse.json({ success: true });
}
