import { NextResponse } from "next/server";
import { notebookExists, buildGraph } from "@/lib/fs-wiki";
import { seedRedesNotebook } from "@/lib/seed-networking";

export async function POST(_req: Request, { params }: { params: Promise<{ notebookId: string }> }) {
  const { notebookId } = await params;
  if (!notebookExists(notebookId)) {
    return NextResponse.json({ error: "Cuaderno no encontrado" }, { status: 404 });
  }

  // The uploaded file content is intentionally ignored for this demo seed.
  // Any file type triggers the same Redes de Computadores knowledge graph.
  const { nodes, edges } = seedRedesNotebook(notebookId);
  const graph = buildGraph(notebookId);

  return NextResponse.json({
    success: true,
    notebookId,
    generatedNodes: nodes.length,
    generatedEdges: edges.length,
    nodes,
    edges,
    graph,
  });
}
