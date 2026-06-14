import Link from "next/link";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-lg">
              Y
            </div>
            <h1 className="font-display text-xl font-semibold tracking-tight">YachaAI</h1>
          </div>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Volver
          </Link>
        </div>
      </header>
      <section className="max-w-3xl mx-auto px-6 py-10">
        <h2 className="font-display text-2xl font-semibold mb-4">Configuración</h2>
        <p className="text-muted-foreground">Próximamente: preferencias de idioma, modelo de LLM, exportación de cuadernos y más.</p>
      </section>
    </main>
  );
}
