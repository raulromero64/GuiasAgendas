interface PlaceholderPageProps {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-semibold text-content-primary">{title}</h2>
      <p className="max-w-2xl text-sm text-content-secondary">{description}</p>
      <div className="mt-6 rounded-xl border border-dashed border-border-strong bg-neutral-100 p-8 text-sm text-content-muted">
        Contenido pendiente para proximo sprint.
      </div>
    </div>
  )
}
