interface SectionHeadingProps {
  title: string
  description: string
}

/**
 * Encabezado reusable para secciones de pagina.
 */
export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <header>
      <h2 className="text-2xl font-semibold text-content-primary">{title}</h2>
      <p className="mt-1 text-sm text-content-secondary">{description}</p>
    </header>
  )
}
