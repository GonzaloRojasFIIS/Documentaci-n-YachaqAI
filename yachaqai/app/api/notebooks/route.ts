import { NextRequest, NextResponse } from "next/server";
import { listNotebooks, createNotebook, getSessions } from "@/lib/fs-wiki";

export async function GET() {
  const notebooks = listNotebooks();
  const sessions = notebooks.flatMap((nb) =>
    getSessions(nb.id).map((s) => ({ ...s, notebookName: nb.name }))
  );
  return NextResponse.json({ notebooks, sessions });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const name = body.name?.trim();
  if (!name) {
    return NextResponse.json({ error: "Nombre requerido" }, { status: 400 });
  }
  const notebook = createNotebook(name);
  return NextResponse.json(notebook);
}
