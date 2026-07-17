import { Card } from '@/shared/components/ui'

import { WizardInput } from '@/modules/student-enrollment/ui/components/WizardField'
import type { GuardianInfo } from '@/modules/student-enrollment/ui/state/studentEnrollmentWizard.state'

interface GuardiansStepProps {
  guardians: GuardianInfo[]
  onGuardianChange: (id: string, patch: Partial<GuardianInfo>) => void
}

const RELATION_LABEL: Record<'padre' | 'madre', string> = {
  padre: 'Datos del padre',
  madre: 'Datos de la madre',
}

function GuardianCard({
  title,
  emailLabel,
  guardian,
  onChange,
}: {
  title: string
  emailLabel: string
  guardian?: GuardianInfo
  onChange: (patch: Partial<GuardianInfo>) => void
}) {
  return (
    <Card className="space-y-4">
      <h3 className="text-sm font-semibold text-content-primary">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <WizardInput
          label="Apellidos y nombre"
          name={`${guardian?.relation ?? 'guardian'}FullName`}
          value={guardian?.fullName ?? ''}
          onChange={(event) => onChange({ fullName: event.target.value })}
          required
          maxLength={120}
        />
        <WizardInput
          label="Identificacion C.C. N.o"
          name={`${guardian?.relation ?? 'guardian'}DocumentNumber`}
          value={guardian?.documentNumber ?? ''}
          onChange={(event) => onChange({ documentNumber: event.target.value })}
          required
          maxLength={30}
          inputMode="numeric"
          pattern="[0-9]{5,30}"
        />
        <WizardInput
          label="De"
          name={`${guardian?.relation ?? 'guardian'}DocumentIssuedAt`}
          value={guardian?.documentIssuedAt ?? ''}
          onChange={(event) => onChange({ documentIssuedAt: event.target.value })}
          required
          maxLength={120}
        />
        <WizardInput
          label="Ocupacion:"
          name={`${guardian?.relation ?? 'guardian'}Occupation`}
          value={guardian?.occupation ?? ''}
          onChange={(event) => onChange({ occupation: event.target.value })}
          required
          maxLength={100}
        />
        <WizardInput
          label="Nombre empresa donde trabaja:"
          name={`${guardian?.relation ?? 'guardian'}Company`}
          value={guardian?.company ?? ''}
          onChange={(event) => onChange({ company: event.target.value })}
          required
          maxLength={120}
        />
        <WizardInput
          label="Telefono:"
          name={`${guardian?.relation ?? 'guardian'}Phone`}
          value={guardian?.phone ?? ''}
          onChange={(event) => onChange({ phone: event.target.value })}
          required
          inputMode="tel"
          pattern="[0-9+ ()-]{7,20}"
          maxLength={20}
        />
        <WizardInput
          label={emailLabel}
          name={`${guardian?.relation ?? 'guardian'}Email`}
          type="email"
          value={guardian?.email ?? ''}
          onChange={(event) => onChange({ email: event.target.value })}
          required
          maxLength={120}
        />
      </div>
    </Card>
  )
}

export function GuardiansStep({ guardians, onGuardianChange }: GuardiansStepProps) {
  const acudiente = guardians.find((item) => item.relation === 'acudiente')

  return (
    <div className="space-y-4">
      {(['padre', 'madre'] as const).map((relation) => {
        const guardian = guardians.find((item) => item.relation === relation)

        return (
          <GuardianCard
            key={relation}
            title={RELATION_LABEL[relation]}
            emailLabel={relation === 'padre' ? 'E-mail del padre:' : 'E-mail de la madre:'}
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

      <Card className="space-y-4">
        <h3 className="text-sm font-semibold text-content-primary">Datos del acudiente</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <WizardInput
            label="Nombre completo"
            name="acudienteFullName"
            value={acudiente?.fullName ?? ''}
            onChange={(event) => {
              if (!acudiente) {
                return
              }

              onGuardianChange(acudiente.id, { fullName: event.target.value })
            }}
            required
            maxLength={120}
          />
          <WizardInput
            label="Parentesco"
            name="acudienteParentesco"
            value={acudiente?.occupation ?? ''}
            onChange={(event) => {
              if (!acudiente) {
                return
              }

              onGuardianChange(acudiente.id, { occupation: event.target.value })
            }}
            required
            maxLength={100}
          />
          <WizardInput
            label="Telefono"
            name="acudientePhone"
            value={acudiente?.phone ?? ''}
            onChange={(event) => {
              if (!acudiente) {
                return
              }

              onGuardianChange(acudiente.id, { phone: event.target.value })
            }}
            required
            inputMode="tel"
            pattern="[0-9+ ()-]{7,20}"
            maxLength={20}
          />
        </div>
      </Card>
    </div>
  )
}
