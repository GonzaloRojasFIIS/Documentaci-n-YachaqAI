import { redirect } from "next/navigation";

export default async function NotebookIndexPage({ params }: { params: Promise<{ notebookId: string }> }) {
  const { notebookId } = await params;
  redirect(`/notebooks/${notebookId}/dashboard`);
}
