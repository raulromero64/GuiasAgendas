import { SectionHeading } from '@/shared/components/ui'

import { StudentEnrollmentWizard } from '@/modules/student-enrollment/ui'

export function StudentEnrollmentPage() {
  return (
    <section className="space-y-6">
      <SectionHeading
        title="Inscripcion de Estudiantes - Nivel 2"
        description="Wizard estructural para captura de inscripcion. Sin logica de persistencia, validaciones complejas ni integraciones externas."
      />

      <StudentEnrollmentWizard />
    </section>
  )
}
