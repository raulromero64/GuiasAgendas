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
        name="studentLastName"
        value={data.lastName}
        onChange={(event) => onChange({ lastName: event.target.value })}
        required
        maxLength={80}
      />
      <WizardInput
        label="Nombre"
        name="studentFirstName"
        value={data.firstName}
        onChange={(event) => onChange({ firstName: event.target.value })}
        required
        maxLength={80}
      />
      <WizardInput
        label="Lugar y fecha de nacimiento (lugar)"
        name="studentBirthPlace"
        value={data.birthPlace}
        onChange={(event) => onChange({ birthPlace: event.target.value })}
        required
        maxLength={120}
      />
      <WizardInput
        label="Lugar y fecha de nacimiento (fecha)"
        name="studentBirthDate"
        type="date"
        value={data.birthDate}
        onChange={(event) => onChange({ birthDate: event.target.value })}
        required
      />
      <WizardSelect
        label="NUP / T.I."
        name="studentDocumentType"
        value={data.documentType}
        onChange={(event) => onChange({ documentType: event.target.value })}
        options={DOCUMENT_TYPE_OPTIONS}
        placeholder="Seleccionar tipo"
        required
      />
      <WizardInput
        label="N.o"
        name="studentDocumentNumber"
        value={data.documentNumber}
        onChange={(event) => onChange({ documentNumber: event.target.value })}
        required
        maxLength={30}
        inputMode="numeric"
        pattern="[0-9]{5,30}"
      />
      <WizardInput
        label="De"
        name="studentDocumentIssuedAt"
        value={data.documentIssuedAt}
        onChange={(event) => onChange({ documentIssuedAt: event.target.value })}
        required
        maxLength={120}
      />
      <WizardInput
        label="Edad"
        name="studentAge"
        value={data.age}
        onChange={(event) => onChange({ age: event.target.value })}
        required
        inputMode="numeric"
        pattern="[0-9]{1,2}"
        maxLength={2}
      />
      <WizardSelect
        label="Grupo R.H."
        name="studentBloodGroup"
        value={data.bloodGroup}
        onChange={(event) => onChange({ bloodGroup: event.target.value })}
        options={BLOOD_GROUP_OPTIONS}
        placeholder="Seleccionar RH"
        required
      />
      <WizardInput
        label="E.P.S."
        name="studentEps"
        value={data.eps}
        onChange={(event) => onChange({ eps: event.target.value })}
        maxLength={120}
      />
      <WizardInput
        label="P.P.S."
        name="studentPps"
        value={data.pps}
        onChange={(event) => onChange({ pps: event.target.value })}
        maxLength={120}
      />
      <WizardInput
        label="Direccion residencia:"
        name="studentAddress"
        value={data.address}
        onChange={(event) => onChange({ address: event.target.value })}
        required
        maxLength={160}
      />
      <WizardInput
        label="Barrio:"
        name="studentNeighborhood"
        value={data.neighborhood}
        onChange={(event) => onChange({ neighborhood: event.target.value })}
        required
        maxLength={100}
      />
      <WizardInput
        label="Telefono residencia:"
        name="studentPhone"
        value={data.phone}
        onChange={(event) => onChange({ phone: event.target.value })}
        required
        inputMode="tel"
        pattern="[0-9+ ()-]{7,20}"
        maxLength={20}
      />
      <WizardInput
        label="Celular de contacto:"
        name="studentMobile"
        value={data.mobile}
        onChange={(event) => onChange({ mobile: event.target.value })}
        required
        inputMode="tel"
        pattern="[0-9+ ()-]{10,20}"
        maxLength={20}
      />
      <WizardInput
        label="E-mail acudiente:"
        name="studentGuardianEmail"
        type="email"
        value={data.guardianEmail}
        onChange={(event) => onChange({ guardianEmail: event.target.value })}
        containerClassName="md:col-span-2"
        required
        maxLength={120}
      />
    </div>
  )
}
