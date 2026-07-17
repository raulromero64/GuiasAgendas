import { WizardBinaryField } from '@/modules/student-enrollment/ui/components/WizardBinaryField'
import { WizardInput, WizardTextarea } from '@/modules/student-enrollment/ui/components/WizardField'
import type { PersonalInfoStepData } from '@/modules/student-enrollment/ui/state/studentEnrollmentWizard.state'

interface PersonalInfoStepProps {
  data: PersonalInfoStepData
  onChange: (patch: Partial<PersonalInfoStepData>) => void
}

export function PersonalInfoStep({ data, onChange }: PersonalInfoStepProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <fieldset className="space-y-2 text-sm md:col-span-2">
        <legend className="font-medium text-content-primary">
          El estudiante vive con:<span className="ml-1 text-brand-700">*</span>
        </legend>
        <div className="flex flex-wrap items-center gap-4">
          <label className="inline-flex items-center gap-2 text-content-primary">
            <input
              type="radio"
              name="livesWith"
              value="mama"
              checked={data.livesWith === 'mama'}
              onChange={(event) => onChange({ livesWith: event.target.value })}
              required={data.livesWith === ''}
              className="h-4 w-4 border-border-strong text-brand-600 focus:ring-brand-200"
            />
            <span>Mama</span>
          </label>
          <label className="inline-flex items-center gap-2 text-content-primary">
            <input
              type="radio"
              name="livesWith"
              value="papa"
              checked={data.livesWith === 'papa'}
              onChange={(event) => onChange({ livesWith: event.target.value })}
              required={data.livesWith === ''}
              className="h-4 w-4 border-border-strong text-brand-600 focus:ring-brand-200"
            />
            <span>Papa</span>
          </label>
          <label className="inline-flex items-center gap-2 text-content-primary">
            <input
              type="radio"
              name="livesWith"
              value="ambos_padres"
              checked={data.livesWith === 'ambos_padres'}
              onChange={(event) => onChange({ livesWith: event.target.value })}
              required={data.livesWith === ''}
              className="h-4 w-4 border-border-strong text-brand-600 focus:ring-brand-200"
            />
            <span>Ambos padres</span>
          </label>
        </div>
      </fieldset>
      <WizardInput
        label="Otras personas:"
        name="otherPeople"
        value={data.otherPeople}
        onChange={(event) => onChange({ otherPeople: event.target.value })}
        required
        maxLength={200}
      />
      <WizardInput
        label="N.o hermanos:"
        name="siblingCount"
        value={data.siblingCount}
        onChange={(event) => onChange({ siblingCount: event.target.value })}
        required
        inputMode="numeric"
        pattern="[0-9]{1,2}"
        maxLength={2}
      />
      <WizardInput
        label="Lugar que ocupa entre ellos"
        name="siblingOrder"
        value={data.siblingOrder}
        onChange={(event) => onChange({ siblingOrder: event.target.value })}
        required
        inputMode="numeric"
        pattern="[0-9]{1,2}"
        maxLength={2}
      />
      <WizardBinaryField
        label="Ha tenido valoracion psicologica:"
        name="psychologicalEvaluation"
        value={data.psychologicalEvaluation}
        onChange={(value) => onChange({ psychologicalEvaluation: value })}
        required
      />
      <WizardTextarea
        label="Por que?"
        name="psychologicalReason"
        value={data.psychologicalReason}
        onChange={(event) => onChange({ psychologicalReason: event.target.value })}
        required
        maxLength={500}
      />
    </div>
  )
}
