import { WizardBinaryField } from '@/modules/student-enrollment/ui/components/WizardBinaryField'
import { WizardInput, WizardSelect } from '@/modules/student-enrollment/ui/components/WizardField'
import { GRADE_OPTIONS } from '@/modules/student-enrollment/ui/state/studentEnrollmentCatalogs'
import type { InscriptionStepData } from '@/modules/student-enrollment/ui/state/studentEnrollmentWizard.state'

interface InscriptionStepProps {
  data: InscriptionStepData
  onChange: (patch: Partial<InscriptionStepData>) => void
}

export function InscriptionStep({ data, onChange }: InscriptionStepProps) {
  return (
    <div className="space-y-4">
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
        <WizardInput
          label="Foto del estudiante (referencia)"
          name="studentPhotoPlaceholder"
          value={data.studentPhotoPlaceholder}
          onChange={(event) => onChange({ studentPhotoPlaceholder: event.target.value })}
          required
          maxLength={160}
          placeholder="Referencia de foto fisica"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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
      </div>
    </div>
  )
}
