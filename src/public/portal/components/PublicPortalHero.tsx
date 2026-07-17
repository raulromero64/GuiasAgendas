import { institutionalBranding } from '@/client/institutional/branding'
import { Card } from '@/shared/components/ui'

export function PublicPortalHero() {
  return (
    <Card className="overflow-hidden rounded-2xl border-border-subtle bg-gradient-to-b from-surface-panel to-neutral-50 p-0">
      <section
        id="inicio"
        className="grid gap-8 px-6 py-8 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-12"
      >
        <div className="space-y-5">
          <p className="font-brand text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
            Portal institucional
          </p>
          <h1 className="font-brand text-3xl font-semibold text-content-primary md:text-5xl">
            {institutionalBranding.portalHeadline}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-content-secondary md:text-lg">
            {institutionalBranding.portalSubheadline}
          </p>
        </div>

        <div className="flex items-center justify-center rounded-xl border border-border-subtle bg-surface-panel p-6">
          <img
            src={institutionalBranding.wordmarkLogoSrc}
            alt={institutionalBranding.wordmarkLogoAlt}
            className="h-16 w-auto object-contain md:h-24"
          />
        </div>
      </section>
    </Card>
  )
}
