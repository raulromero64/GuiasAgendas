import { WizardInput, WizardSelect } from '@/modules/student-enrollment/ui/components/WizardField'
import {
  BLOOD_GROUP_OPTIONS,
  DOCUMENT_TYPE_OPTIONS,
} from '@/modules/student-enrollment/ui/state/studentEnrollmentCatalogs'
import type { StudentInfoStepData } from '@/modules/student-enrollment/ui/state/studentEnrollmentWizard.state'

interface StudentInfoStepProps {
  data: StudentInfoStepData
  onChange: (patch: Partial<StudentInfoStepData>) => void
}

export function StudentInfoStep({ data, onChange }: StudentInfoStepProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <WizardInput
        label="Apellidos"
        value={data.lastName}
        onChange={(event) => onChange({ lastName: event.target.value })}
      />
      <WizardInput
        label="Nombres"
        value={data.firstName}
        onChange={(event) => onChange({ firstName: event.target.value })}
      />
      <WizardInput
        label="Lugar de nacimiento"
        value={data.birthPlace}
        onChange={(event) => onChange({ birthPlace: event.target.value })}
      />
      <WizardInput
        label="Fecha de nacimiento"
        type="date"
        value={data.birthDate}
        onChange={(event) => onChange({ birthDate: event.target.value })}
      />
      <WizardSelect
        label="Tipo de documento"
        value={data.documentType}
        onChange={(event) => onChange({ documentType: event.target.value })}
        options={DOCUMENT_TYPE_OPTIONS}
        placeholder="Seleccionar tipo"
      />
      <WizardInput
        label="Numero de documento"
        value={data.documentNumber}
        onChange={(event) => onChange({ documentNumber: event.target.value })}
      />
      <WizardInput
        label="Lugar de expedicion"
        value={data.documentIssuedAt}
        onChange={(event) => onChange({ documentIssuedAt: event.target.value })}
      />
      <WizardInput
        label="Edad"
        value={data.age}
        onChange={(event) => onChange({ age: event.target.value })}
      />
      <WizardSelect
        label="Grupo RH"
        value={data.bloodGroup}
        onChange={(event) => onChange({ bloodGroup: event.target.value })}
        options={BLOOD_GROUP_OPTIONS}
        placeholder="Seleccionar RH"
      />
      <WizardInput
        label="EPS"
        value={data.eps}
        onChange={(event) => onChange({ eps: event.target.value })}
      />
      <WizardInput
        label="PPS"
        value={data.pps}
        onChange={(event) => onChange({ pps: event.target.value })}
      />
      <WizardInput
        label="Direccion"
        value={data.address}
        onChange={(event) => onChange({ address: event.target.value })}
      />
      <WizardInput
        label="Barrio"
        value={data.neighborhood}
        onChange={(event) => onChange({ neighborhood: event.target.value })}
      />
      <WizardInput
        label="Telefono"
        value={data.phone}
        onChange={(event) => onChange({ phone: event.target.value })}
      />
      <WizardInput
        label="Celular"
        value={data.mobile}
        onChange={(event) => onChange({ mobile: event.target.value })}
      />
      <WizardInput
        label="Email del acudiente"
        type="email"
        value={data.guardianEmail}
        onChange={(event) => onChange({ guardianEmail: event.target.value })}
        containerClassName="md:col-span-2"
      />
    </div>
  )
}
