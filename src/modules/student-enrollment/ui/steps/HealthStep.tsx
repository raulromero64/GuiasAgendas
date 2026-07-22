import { WizardBinaryField } from '@/modules/student-enrollment/ui/components/WizardBinaryField'
import { WizardTextarea } from '@/modules/student-enrollment/ui/components/WizardField'
import type { HealthStepData } from '@/modules/student-enrollment/ui/state/studentEnrollmentWizard.state'

interface HealthStepProps {
  data: HealthStepData
  onChange: (patch: Partial<HealthStepData>) => void
}

export function HealthStep({ data, onChange }: HealthStepProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-content-muted">
        Indique informacion medica relevante para el cuidado escolar del estudiante.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <WizardBinaryField
          label="Tiene alguna recomendacion medica especial:"
          name="medicalRecommendation"
          value={data.medicalRecommendation}
          onChange={(value) =>
            onChange({
              medicalRecommendation: value,
              medicalRecommendationDetail: value === 'si' ? data.medicalRecommendationDetail : '',
            })
          }
          required
        />
        {data.medicalRecommendation === 'si' && (
          <WizardTextarea
            label="Cual?"
            name="medicalRecommendationDetail"
            value={data.medicalRecommendationDetail}
            onChange={(event) => onChange({ medicalRecommendationDetail: event.target.value })}
            required
            maxLength={500}
          />
        )}
        <WizardBinaryField
          label="Toma algun medicamento:"
          name="medications"
          value={data.medications}
          onChange={(value) =>
            onChange({
              medications: value,
              medicationsDetail: value === 'si' ? data.medicationsDetail : '',
            })
          }
          required
        />
        {data.medications === 'si' && (
          <WizardTextarea
            label="Cual es?"
            name="medicationsDetail"
            value={data.medicationsDetail}
            onChange={(event) => onChange({ medicationsDetail: event.target.value })}
            required
            maxLength={500}
          />
        )}
        <WizardBinaryField
          label="Ha tenido alguna cirugia:"
          name="surgeries"
          value={data.surgeries}
          onChange={(value) =>
            onChange({
              surgeries: value,
              surgeriesDetail: value === 'si' ? data.surgeriesDetail : '',
            })
          }
          required
        />
        {data.surgeries === 'si' && (
          <WizardTextarea
            label="Por que?"
            name="surgeriesDetail"
            value={data.surgeriesDetail}
            onChange={(event) => onChange({ surgeriesDetail: event.target.value })}
            required
            maxLength={500}
          />
        )}
        <WizardBinaryField
          label="Usa lentes o gafas:"
          name="wearsGlasses"
          value={data.wearsGlasses}
          onChange={(value) =>
            onChange({
              wearsGlasses: value,
              wearsGlassesDetail: value === 'si' ? data.wearsGlassesDetail : '',
            })
          }
          required
        />
        {data.wearsGlasses === 'si' && (
          <WizardTextarea
            label="Por que?"
            name="wearsGlassesDetail"
            value={data.wearsGlassesDetail}
            onChange={(event) => onChange({ wearsGlassesDetail: event.target.value })}
            required
            maxLength={500}
          />
        )}
        <WizardTextarea
          label="Tiene alguna informacion sobre la salud del estudiante que crea importante para tener en cuenta:"
          name="healthObservations"
          value={data.observations}
          onChange={(event) => onChange({ observations: event.target.value })}
          containerClassName="md:col-span-2"
          required
          maxLength={700}
        />
      </div>
    </div>
  )
}
