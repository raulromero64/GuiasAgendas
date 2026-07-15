import { WizardSelect } from '@/modules/student-enrollment/ui/components/WizardField'
import type { YesNoValue } from '@/modules/student-enrollment/ui/state/studentEnrollmentWizard.state'

interface WizardBinaryFieldProps {
  label: string
  value: YesNoValue
  onChange: (value: YesNoValue) => void
}

export function WizardBinaryField({ label, value, onChange }: WizardBinaryFieldProps) {
  return (
    <WizardSelect
      label={label}
      value={value}
      onChange={(event) => onChange(event.target.value as YesNoValue)}
      options={[
        { value: 'si', label: 'Si' },
        { value: 'no', label: 'No' },
      ]}
      placeholder="Seleccionar"
    />
  )
}
