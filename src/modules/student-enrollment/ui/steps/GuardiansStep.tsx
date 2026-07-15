import { Card } from '@/shared/components/ui'

import { WizardInput } from '@/modules/student-enrollment/ui/components/WizardField'
import type { GuardianInfo } from '@/modules/student-enrollment/ui/state/studentEnrollmentWizard.state'

interface GuardiansStepProps {
  guardians: GuardianInfo[]
  onGuardianChange: (id: string, patch: Partial<GuardianInfo>) => void
}

const RELATION_LABEL: Record<'padre' | 'madre', string> = {
  padre: 'Padre',
  madre: 'Madre',
}

function GuardianCard({
  title,
  guardian,
  onChange,
}: {
  title: string
  guardian?: GuardianInfo
  onChange: (patch: Partial<GuardianInfo>) => void
}) {
  return (
    <Card className="space-y-4">
      <h3 className="text-sm font-semibold text-content-primary">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <WizardInput
          label="Nombre completo"
          value={guardian?.fullName ?? ''}
          onChange={(event) => onChange({ fullName: event.target.value })}
        />
        <WizardInput
          label="Documento"
          value={guardian?.documentNumber ?? ''}
          onChange={(event) => onChange({ documentNumber: event.target.value })}
        />
        <WizardInput
          label="Lugar de expedicion"
          value={guardian?.documentIssuedAt ?? ''}
          onChange={(event) => onChange({ documentIssuedAt: event.target.value })}
        />
        <WizardInput
          label="Ocupacion"
          value={guardian?.occupation ?? ''}
          onChange={(event) => onChange({ occupation: event.target.value })}
        />
        <WizardInput
          label="Empresa"
          value={guardian?.company ?? ''}
          onChange={(event) => onChange({ company: event.target.value })}
        />
        <WizardInput
          label="Telefono"
          value={guardian?.phone ?? ''}
          onChange={(event) => onChange({ phone: event.target.value })}
        />
        <WizardInput
          label="Email"
          type="email"
          value={guardian?.email ?? ''}
          onChange={(event) => onChange({ email: event.target.value })}
        />
      </div>
    </Card>
  )
}

export function GuardiansStep({ guardians, onGuardianChange }: GuardiansStepProps) {
  return (
    <div className="space-y-4">
      {(['padre', 'madre'] as const).map((relation) => {
        const guardian = guardians.find((item) => item.relation === relation)

        return (
          <GuardianCard
            key={relation}
            title={RELATION_LABEL[relation]}
            guardian={guardian}
            onChange={(patch) => {
              if (!guardian) {
                return
              }

              onGuardianChange(guardian.id, patch)
            }}
          />
        )
      })}

      <p className="text-xs text-content-muted">
        La estructura de datos ya permite incorporar acudientes adicionales sin cambiar la
        arquitectura.
      </p>
    </div>
  )
}
