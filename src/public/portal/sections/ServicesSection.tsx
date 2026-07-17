import { Card } from '@/shared/components/ui'

import { institutionalBranding } from '@/client/institutional/branding'

export function ServicesSection() {
  return (
    <section id="servicios" className="scroll-mt-24">
      <header className="mb-4 space-y-2">
        <p className="font-brand text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
          Servicios
        </p>
        <h2 className="font-brand text-2xl font-semibold text-content-primary md:text-3xl">
          Oferta institucional
        </h2>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {institutionalBranding.services.map((service) => (
          <Card key={service.title} className="rounded-2xl p-5">
            <h3 className="font-brand text-lg font-semibold text-content-primary">
              {service.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-content-secondary md:text-base">
              {service.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}
