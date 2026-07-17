import { WizardBinaryField } from '@/modules/student-enrollment/ui/components/WizardBinaryField'
import { WizardInput, WizardSelect } from '@/modules/student-enrollment/ui/components/WizardField'
import { GRADE_OPTIONS } from '@/modules/student-enrollment/ui/state/studentEnrollmentCatalogs'
import type { InscriptionStepData } from '@/modules/student-enrollment/ui/state/studentEnrollmentWizard.state'
import { Card } from '@/shared/components/ui'

interface InscriptionStepProps {
  data: InscriptionStepData
  onChange: (patch: Partial<InscriptionStepData>) => void
}

export function InscriptionStep({ data, onChange }: InscriptionStepProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <WizardInput
        label="Formulario Inscripcion No."
        name="inscriptionNumber"
        value={data.inscriptionNumber}
        onChange={(event) => onChange({ inscriptionNumber: event.target.value })}
        required
        maxLength={30}
        placeholder="Numero de inscripcion"
      />

      <WizardSelect
        label="Grado al que aspira entrar el estudiante:"
        name="targetGrade"
        value={data.targetGrade}
        onChange={(event) => onChange({ targetGrade: event.target.value })}
        options={GRADE_OPTIONS}
        placeholder="Seleccionar grado"
        required
      />

      <WizardBinaryField
        label="Repitencia de ano:"
        value={data.isRepeating}
        onChange={(value) => onChange({ isRepeating: value })}
        required
        name="isRepeating"
      />

      <Card className="border-dashed">
        <p className="text-sm font-medium text-content-primary">Fotografia del estudiante</p>
        <div className="mt-3 flex min-h-36 items-center justify-center rounded-md border border-border-subtle bg-neutral-100 text-xs text-content-secondary">
          Componente de carga de fotografia (pendiente de integracion)
        </div>
      </Card>
    </div>
  )
}
