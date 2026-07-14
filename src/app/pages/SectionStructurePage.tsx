interface SectionStructurePageProps {
  title: string
  summary: string
  scope: string
  status: string
}

export function SectionStructurePage({ title, summary, scope, status }: SectionStructurePageProps) {
  return (
    <section className="space-y-4">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-content-primary">{title}</h2>
        <p className="max-w-3xl text-sm text-content-secondary">{summary}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-border-subtle bg-surface p-5">
          <h3 className="text-sm font-semibold text-content-primary">Alcance de la seccion</h3>
          <p className="mt-2 text-sm text-content-secondary">{scope}</p>
        </article>

        <article className="rounded-xl border border-border-subtle bg-surface p-5">
          <h3 className="text-sm font-semibold text-content-primary">Estado actual</h3>
          <p className="mt-2 text-sm text-content-secondary">{status}</p>
        </article>
      </div>
    </section>
  )
}
