import { WizardBinaryField } from '@/modules/student-enrollment/ui/components/WizardBinaryField'
import {
  WizardInput,
  WizardSelect,
  WizardTextarea,
} from '@/modules/student-enrollment/ui/components/WizardField'
import { LIVES_WITH_OPTIONS } from '@/modules/student-enrollment/ui/state/studentEnrollmentCatalogs'
import type { PersonalInfoStepData } from '@/modules/student-enrollment/ui/state/studentEnrollmentWizard.state'

interface PersonalInfoStepProps {
  data: PersonalInfoStepData
  onChange: (patch: Partial<PersonalInfoStepData>) => void
}

export function PersonalInfoStep({ data, onChange }: PersonalInfoStepProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <WizardSelect
        label="Vive con"
        value={data.livesWith}
        onChange={(event) => onChange({ livesWith: event.target.value })}
        options={LIVES_WITH_OPTIONS}
        placeholder="Seleccionar"
      />
      {data.livesWith === 'otro' && (
        <WizardInput
          label="Vive con (otro)"
          value={data.livesWithOtherDetail}
          onChange={(event) => onChange({ livesWithOtherDetail: event.target.value })}
        />
      )}
      <WizardInput
        label="Otras personas"
        value={data.otherPeople}
        onChange={(event) => onChange({ otherPeople: event.target.value })}
      />
      <WizardInput
        label="Numero de hermanos"
        value={data.siblingCount}
        onChange={(event) => onChange({ siblingCount: event.target.value })}
      />
      <WizardInput
        label="Lugar entre los hermanos"
        value={data.siblingOrder}
        onChange={(event) => onChange({ siblingOrder: event.target.value })}
      />
      <WizardBinaryField
        label="Valoracion psicologica"
        value={data.psychologicalEvaluation}
        onChange={(value) => onChange({ psychologicalEvaluation: value })}
      />
      <WizardTextarea
        label="Motivo"
        value={data.psychologicalReason}
        onChange={(event) => onChange({ psychologicalReason: event.target.value })}
      />
    </div>
  )
}
