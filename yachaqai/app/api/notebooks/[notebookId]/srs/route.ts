import { NextRequest, NextResponse } from "next/server";
import { notebookExists, getAllPages, savePage, parseFrontmatter } from "@/lib/fs-wiki";
import YAML from "yaml";

export async function POST(req: NextRequest, { params }: { params: Promise<{ notebookId: string }> }) {
  const { notebookId } = await params;
  if (!notebookExists(notebookId)) {
    return NextResponse.json({ error: "Cuaderno no encontrado" }, { status: 404 });
  }

  const { conceptId, grade } = await req.json();

  // Find the concept page in the notebook
  const pages = getAllPages(notebookId);
  const conceptPage = pages.find((p) => p.page_id === conceptId || p.page_id === `concepto-${conceptId}`);

  if (!conceptPage) {
    return NextResponse.json({ error: "Concepto no encontrado en este cuaderno" }, { status: 404 });
  }

  // Update frontmatter values based on FSRS rating
  const now = new Date();
  const today = now.toISOString().split("T")[0];

  let nextDays = 1;
  let estadoSrs = "critico";
  let maestria = 0.40;

  switch (grade) {
    case "excelente":
      nextDays = 21;
      estadoSrs = "dominado";
      maestria = 0.95;
      break;
    case "bien":
      nextDays = 7;
      estadoSrs = "dominado";
      maestria = 0.85;
      break;
    case "dificil":
      nextDays = 3;
      estadoSrs = "en_practica";
      maestria = 0.70;
      break;
    case "olvidado":
    default:
      nextDays = 1;
      estadoSrs = "critico";
      maestria = 0.35;
      break;
  }

  const nextReviewDate = new Date();
  nextReviewDate.setDate(now.getDate() + nextDays);
  const nextReviewStr = nextReviewDate.toISOString().split("T")[0];

  // Parse the current raw markdown content
  const { frontmatter, body } = parseFrontmatter(conceptPage.content);

  // Update SRS fields
  const updatedFrontmatter = {
    ...frontmatter,
    estado_srs: estadoSrs,
    maestria: maestria,
    ultimo_repaso: today,
    proximo_repaso: nextReviewStr,
    actualizado: today,
  };

  // Rebuild the markdown content with YAML frontmatter
  const yamlText = YAML.stringify(updatedFrontmatter).trim();
  const newContent = `---\n${yamlText}\n---\n\n${body}`;

  // Save the page back to the filesystem
  savePage(notebookId, conceptPage.file, newContent);

  // Add an entry in log.md (optional but extremely nice to align with the proposal log)
  // Let's do this to keep audit logs
  try {
    const logPage = pages.find((p) => p.file === "log.md");
    if (logPage) {
      const logEntry = `\n- ${today} — Repaso de ${conceptPage.title} (${grade.toUpperCase()}) | SRS actualizado.`;
      savePage(notebookId, "log.md", logPage.content.trim() + logEntry);
    }
  } catch (e) {
    console.error("Error updating log.md", e);
  }

  return NextResponse.json({
    success: true,
    conceptId,
    title: conceptPage.title,
    newEstadoSrs: estadoSrs,
    newMaestria: maestria,
    nextReview: nextReviewStr,
  });
}
