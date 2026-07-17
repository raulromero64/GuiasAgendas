import { InstitutionalBrandHeader } from '@/client/institutional/InstitutionalBrandHeader'
import { Card } from '@/shared/components/ui'

import { institutionalBranding } from '@/client/institutional/branding'
import { StudentEnrollmentWizard } from '@/platform/student-enrollment/ui'

export function PublicEnrollmentWizardPage() {
  return (
    <section className="w-full max-w-5xl space-y-6">
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
