import { Link } from 'react-router-dom'

import { InstitutionalBrandHeader } from '@/client/institutional/InstitutionalBrandHeader'
import { Button, Card } from '@/shared/components/ui'

import { institutionalBranding } from '@/client/institutional/branding'
import { StudentEnrollmentWizard } from '@/platform/student-enrollment/ui'
import { PUBLIC_ENTRY_ROUTE } from '@/shared/constants/identity'

export function PublicEnrollmentWizardPage() {
  return (
    <section className="mx-auto w-full max-w-5xl space-y-6">
      <div className="fixed right-4 top-4 z-40 md:right-6 md:top-6">
        <Link to={PUBLIC_ENTRY_ROUTE}>
          <Button variant="outline" className="font-brand bg-surface-panel/95 backdrop-blur">
            Volver al inicio
          </Button>
        </Link>
      </div>

      <InstitutionalBrandHeader />

      <Card className="space-y-3 p-6 md:p-8">
        <header className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
            {institutionalBranding.schoolName}
          </p>
          <h1 className="text-3xl font-semibold text-content-primary md:text-4xl">
            {institutionalBranding.accessTitle}
          </h1>
          <p className="text-sm text-content-secondary md:text-base">
            Complete la informacion solicitada para registrar la solicitud de matricula.
          </p>
        </header>
      </Card>

      <StudentEnrollmentWizard />
    </section>
  )
}
