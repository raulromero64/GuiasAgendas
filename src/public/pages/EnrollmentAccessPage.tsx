import { Link } from 'react-router-dom'

import { InstitutionalBrandHeader } from '@/client/institutional/InstitutionalBrandHeader'
import { institutionalBranding } from '@/client/institutional/branding'
import { PUBLIC_ENROLLMENT_WIZARD_ROUTE } from '@/shared/constants/identity'
import { Button, Card, Input } from '@/shared/components/ui'

export function EnrollmentAccessPage() {
  return (
    <section className="w-full max-w-3xl space-y-6">
      <InstitutionalBrandHeader />

      <Card className="space-y-6 p-6 md:p-8">
        <header className="space-y-3 text-center">
          <h1 className="text-3xl font-semibold text-content-primary md:text-4xl">
            {institutionalBranding.accessTitle}
          </h1>
          <p className="text-sm text-content-secondary md:text-base">
            {institutionalBranding.accessMessage}
          </p>
        </header>

        <div className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-content-primary">PIN de acceso</span>
            <Input
              type="text"
              inputMode="numeric"
              placeholder={institutionalBranding.accessPlaceholder}
              aria-label="PIN de acceso institucional"
            />
          </label>

          <Link to={PUBLIC_ENROLLMENT_WIZARD_ROUTE} className="block">
            <Button type="button" className="w-full py-3 text-base">
              Ingresar
            </Button>
          </Link>
        </div>

        <div className="rounded-xl border border-dashed border-border-strong bg-neutral-50 px-4 py-3 text-sm text-content-secondary">
          {institutionalBranding.validationPlaceholder}
        </div>

        <footer className="text-center">
          <a
            href={institutionalBranding.websiteUrl}
            className="text-sm font-semibold text-brand-700 transition hover:text-brand-800"
          >
            ← Regresar al sitio web del colegio
          </a>
        </footer>
      </Card>
    </section>
  )
}
