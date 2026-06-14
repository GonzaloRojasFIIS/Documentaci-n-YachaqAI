import { NextResponse } from "next/server";
import { notebookExists, buildGraph } from "@/lib/fs-wiki";

export async function GET(_req: Request, { params }: { params: Promise<{ notebookId: string }> }) {
  const { notebookId } = await params;
  if (!notebookExists(notebookId)) {
    return NextResponse.json({ error: "Cuaderno no encontrado" }, { status: 404 });
  }
  const graph = buildGraph(notebookId);
  return NextResponse.json(graph);
}
