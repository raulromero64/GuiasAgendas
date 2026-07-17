import { Card } from '@/shared/components/ui'

import type {
  AcademicHistoryRow,
  GuardianInfo,
  StudentEnrollmentFormData,
  YesNoValue,
} from '@/modules/student-enrollment/ui/state/studentEnrollmentWizard.state'

interface ReviewStepProps {
  data: StudentEnrollmentFormData
  onGoToStep: (stepIndex: number) => void
}

function formatYesNo(value: YesNoValue) {
  if (value === 'si') {
    return 'Si'
  }

  if (value === 'no') {
    return 'No'
  }

  return 'Sin definir'
}

function SummaryList({ items }: { items: Array<{ label: string; value: string }> }) {
  return (
    <dl className="grid gap-2 text-sm md:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-md border border-border-subtle bg-neutral-100 px-3 py-2"
        >
          <dt className="text-xs font-semibold uppercase tracking-wide text-content-muted">
            {item.label}
          </dt>
          <dd className="mt-1 text-content-primary">{item.value || 'Sin dato'}</dd>
        </div>
      ))}
    </dl>
  )
}

function GuardiansSummary({ guardians }: { guardians: GuardianInfo[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {guardians.map((guardian) => (
        <Card key={guardian.id} className="space-y-2">
          <h4 className="text-sm font-semibold capitalize text-content-primary">
            {guardian.relation}
          </h4>
          <p className="text-sm text-content-secondary">
            Nombre: {guardian.fullName || 'Sin dato'}
          </p>
          <p className="text-sm text-content-secondary">
            Documento: {guardian.documentNumber || 'Sin dato'}
          </p>
          <p className="text-sm text-content-secondary">
            Expedicion: {guardian.documentIssuedAt || 'Sin dato'}
          </p>
          <p className="text-sm text-content-secondary">
            Ocupacion: {guardian.occupation || 'Sin dato'}
          </p>
          <p className="text-sm text-content-secondary">
            Empresa: {guardian.company || 'Sin dato'}
          </p>
          <p className="text-sm text-content-secondary">Telefono: {guardian.phone || 'Sin dato'}</p>
          <p className="text-sm text-content-secondary">Email: {guardian.email || 'Sin dato'}</p>
        </Card>
      ))}
    </div>
  )
}

function AcademicHistorySummary({ rows }: { rows: AcademicHistoryRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border-subtle bg-surface-panel">
      <table className="min-w-full divide-y divide-border-subtle text-sm">
        <thead className="bg-neutral-100 text-left text-content-secondary">
          <tr>
            <th className="px-3 py-2 font-semibold">Grado</th>
            <th className="px-3 py-2 font-semibold">Institucion</th>
            <th className="px-3 py-2 font-semibold">Ano</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle text-content-secondary">
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="px-3 py-2">{row.grade || 'Sin dato'}</td>
              <td className="px-3 py-2">{row.institution || 'Sin dato'}</td>
              <td className="px-3 py-2">{row.year || 'Sin dato'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SectionHeader({
  title,
  step,
  onGoToStep,
}: {
  title: string
  step: number
  onGoToStep: (stepIndex: number) => void
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h3 className="text-sm font-semibold text-content-primary">{title}</h3>
      <button
        type="button"
        onClick={() => onGoToStep(step)}
        className="text-xs font-semibold text-brand-700 hover:text-brand-800"
      >
        Ir al paso
      </button>
    </div>
  )
}

export function ReviewStep({ data, onGoToStep }: ReviewStepProps) {
  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <SectionHeader title="Inscripcion" step={0} onGoToStep={onGoToStep} />
        <SummaryList
          items={[
            { label: 'Numero de inscripcion', value: data.inscription.inscriptionNumber },
            { label: 'Grado al que aspira', value: data.inscription.targetGrade },
            { label: 'Repitente', value: formatYesNo(data.inscription.isRepeating) },
          ]}
        />
      </Card>

      <Card className="space-y-3">
        <SectionHeader title="Informacion del estudiante" step={1} onGoToStep={onGoToStep} />
        <SummaryList
          items={[
            { label: 'Apellidos', value: data.studentInfo.lastName },
            { label: 'Nombres', value: data.studentInfo.firstName },
            { label: 'Lugar de nacimiento', value: data.studentInfo.birthPlace },
            { label: 'Fecha de nacimiento', value: data.studentInfo.birthDate },
            { label: 'Tipo de documento', value: data.studentInfo.documentType },
            { label: 'Numero de documento', value: data.studentInfo.documentNumber },
            { label: 'Lugar de expedicion', value: data.studentInfo.documentIssuedAt },
            { label: 'Edad', value: data.studentInfo.age },
            { label: 'Grupo RH', value: data.studentInfo.bloodGroup },
            { label: 'EPS', value: data.studentInfo.eps },
            { label: 'I.P.S.', value: data.studentInfo.pps },
            { label: 'Direccion', value: data.studentInfo.address },
            { label: 'Barrio', value: data.studentInfo.neighborhood },
            { label: 'Telefono', value: data.studentInfo.phone },
            { label: 'Celular', value: data.studentInfo.mobile },
            { label: 'Email del acudiente', value: data.studentInfo.guardianEmail },
          ]}
        />
      </Card>

      <Card className="space-y-3">
        <SectionHeader title="Padres y acudientes" step={2} onGoToStep={onGoToStep} />
        <GuardiansSummary guardians={data.guardians} />
      </Card>

      <Card className="space-y-3">
        <SectionHeader title="Informacion personal" step={3} onGoToStep={onGoToStep} />
        <SummaryList
          items={[
            { label: 'Vive con', value: data.personalInfo.livesWith },
            { label: 'Vive con (otro)', value: data.personalInfo.livesWithOtherDetail },
            { label: 'Otras personas', value: data.personalInfo.otherPeople },
            { label: 'Numero de hermanos', value: data.personalInfo.siblingCount },
            { label: 'Lugar entre los hermanos', value: data.personalInfo.siblingOrder },
            {
              label: 'Valoracion psicologica',
              value: formatYesNo(data.personalInfo.psychologicalEvaluation),
            },
            { label: 'Motivo', value: data.personalInfo.psychologicalReason },
          ]}
        />
      </Card>

      <Card className="space-y-3">
        <SectionHeader title="Salud" step={4} onGoToStep={onGoToStep} />
        <SummaryList
          items={[
            {
              label: 'Recomendacion medica',
              value: formatYesNo(data.health.medicalRecommendation),
            },
            { label: 'Detalle recomendacion', value: data.health.medicalRecommendationDetail },
            { label: 'Medicamentos', value: formatYesNo(data.health.medications) },
            { label: 'Detalle medicamentos', value: data.health.medicationsDetail },
            { label: 'Cirugias', value: formatYesNo(data.health.surgeries) },
            { label: 'Detalle cirugias', value: data.health.surgeriesDetail },
            { label: 'Usa lentes', value: formatYesNo(data.health.wearsGlasses) },
            { label: 'Detalle lentes', value: data.health.wearsGlassesDetail },
            { label: 'Observaciones', value: data.health.observations },
          ]}
        />
      </Card>

      <Card className="space-y-3">
        <SectionHeader title="Historial academico" step={5} onGoToStep={onGoToStep} />
        <AcademicHistorySummary rows={data.academicHistory} />
      </Card>
    </div>
  )
}
