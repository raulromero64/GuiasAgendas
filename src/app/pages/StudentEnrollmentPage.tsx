import { SectionHeading } from '@/shared/components/ui'

import { StudentEnrollmentWizard } from '@/modules/student-enrollment/ui'

export function StudentEnrollmentPage() {
  return (
    <section className="space-y-4">
      <nav aria-label="Breadcrumb" className="text-sm text-content-secondary">
        <ol className="flex flex-wrap items-center gap-2">
          <li>Inicio</li>
          <li aria-hidden="true">&gt;</li>
          <li>Estudiantes</li>
          <li aria-hidden="true">&gt;</li>
          <li className="font-semibold text-content-primary">Solicitud de Matricula</li>
        </ol>
      </nav>

      <SectionHeading
        title="Solicitud de Matricula"
        description="Complete la informacion solicitada para registrar la solicitud de matricula del estudiante."
      />

      <StudentEnrollmentWizard />
    </section>
  )
}
