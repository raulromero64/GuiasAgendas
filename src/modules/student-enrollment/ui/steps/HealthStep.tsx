import { WizardBinaryField } from '@/modules/student-enrollment/ui/components/WizardBinaryField'
import { WizardTextarea } from '@/modules/student-enrollment/ui/components/WizardField'
import type { HealthStepData } from '@/modules/student-enrollment/ui/state/studentEnrollmentWizard.state'

interface HealthStepProps {
  data: HealthStepData
  onChange: (patch: Partial<HealthStepData>) => void
}

export function HealthStep({ data, onChange }: HealthStepProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <WizardBinaryField
        label="Recomendacion medica"
        value={data.medicalRecommendation}
        onChange={(value) => onChange({ medicalRecommendation: value })}
      />
      {data.medicalRecommendation === 'si' && (
        <WizardTextarea
          label="Detalle recomendacion medica"
          value={data.medicalRecommendationDetail}
          onChange={(event) => onChange({ medicalRecommendationDetail: event.target.value })}
        />
      )}
      <WizardBinaryField
        label="Medicamentos"
        value={data.medications}
        onChange={(value) => onChange({ medications: value })}
      />
      {data.medications === 'si' && (
        <WizardTextarea
          label="Detalle de medicamentos"
          value={data.medicationsDetail}
          onChange={(event) => onChange({ medicationsDetail: event.target.value })}
        />
      )}
      <WizardBinaryField
        label="Cirugias"
        value={data.surgeries}
        onChange={(value) => onChange({ surgeries: value })}
      />
      {data.surgeries === 'si' && (
        <WizardTextarea
          label="Detalle de cirugias"
          value={data.surgeriesDetail}
          onChange={(event) => onChange({ surgeriesDetail: event.target.value })}
        />
      )}
      <WizardBinaryField
        label="Usa lentes"
        value={data.wearsGlasses}
        onChange={(value) => onChange({ wearsGlasses: value })}
      />
      {data.wearsGlasses === 'si' && (
        <WizardTextarea
          label="Detalle de uso de lentes"
          value={data.wearsGlassesDetail}
          onChange={(event) => onChange({ wearsGlassesDetail: event.target.value })}
        />
      )}
      <WizardTextarea
        label="Observaciones"
        value={data.observations}
        onChange={(event) => onChange({ observations: event.target.value })}
        containerClassName="md:col-span-2"
      />
    </div>
  )
}
