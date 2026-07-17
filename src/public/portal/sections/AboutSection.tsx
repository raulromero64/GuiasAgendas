import { Card } from '@/shared/components/ui'

import { institutionalBranding } from '@/client/institutional/branding'

export function AboutSection() {
  return (
    <section id="nosotros" className="scroll-mt-24">
      <Card className="rounded-2xl p-6 md:p-8">
        <header className="space-y-3">
          <p className="font-brand text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
            Nosotros
          </p>
          <h2 className="font-brand text-2xl font-semibold text-content-primary md:text-3xl">
            Comunidad educativa con enfoque humano y academico
          </h2>
        </header>

        <p className="mt-4 text-base leading-relaxed text-content-secondary md:text-lg">
          {institutionalBranding.aboutText}
        </p>
      </Card>
    </section>
  )
}
