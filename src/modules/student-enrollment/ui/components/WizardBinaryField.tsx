import { cn } from '@/shared/utils/cn'

import type { YesNoValue } from '@/modules/student-enrollment/ui/state/studentEnrollmentWizard.state'

interface WizardBinaryFieldProps {
  label: string
  value: YesNoValue
  onChange: (value: YesNoValue) => void
  name?: string
  required?: boolean
}

export function WizardBinaryField({
  label,
  value,
  onChange,
  name,
  required,
}: WizardBinaryFieldProps) {
  const options: Array<{ value: Exclude<YesNoValue, ''>; label: string }> = [
    { value: 'si', label: 'Si' },
    { value: 'no', label: 'No' },
  ]

  return (
    <fieldset className="space-y-2 text-sm">
      <legend className="font-medium text-content-primary">
        {label}
        {required && <span className="ml-1 text-brand-700">*</span>}
      </legend>
      <div className="flex items-center gap-4">
        {options.map((option) => (
          <label key={option.value} className="inline-flex items-center gap-2 text-content-primary">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              aria-required={required}
              required={required && value === ''}
              className={cn('h-4 w-4 border-border-strong text-brand-600 focus:ring-brand-200')}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
