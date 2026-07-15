import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'

import { Input } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'

interface FieldShellProps {
  label: string
  children: ReactNode
  className?: string
}

function FieldShell({ label, children, className }: FieldShellProps) {
  return (
    <label className={cn('space-y-2 text-sm', className)}>
      <span className="font-medium text-content-primary">{label}</span>
      {children}
    </label>
  )
}

type WizardInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  containerClassName?: string
}

export function WizardInput({ label, containerClassName, ...props }: WizardInputProps) {
  return (
    <FieldShell label={label} className={containerClassName}>
      <Input {...props} />
    </FieldShell>
  )
}

type WizardSelectProps = InputHTMLAttributes<HTMLSelectElement> & {
  label: string
  options: Array<{ value: string; label: string }>
  placeholder?: string
  containerClassName?: string
}

export function WizardSelect({
  label,
  options,
  placeholder,
  containerClassName,
  className,
  ...props
}: WizardSelectProps) {
  return (
    <FieldShell label={label} className={containerClassName}>
      <select
        className={cn(
          'w-full rounded-md border border-border-strong bg-surface-panel px-3 py-2 text-sm text-content-primary focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100',
          className
        )}
        {...props}
      >
        <option value="">{placeholder ?? 'Seleccionar'}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

type WizardTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  containerClassName?: string
}

export function WizardTextarea({
  label,
  containerClassName,
  className,
  ...props
}: WizardTextareaProps) {
  return (
    <FieldShell label={label} className={containerClassName}>
      <textarea
        className={cn(
          'min-h-24 w-full rounded-md border border-border-strong bg-surface-panel px-3 py-2 text-sm text-content-primary placeholder:text-content-muted focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100',
          className
        )}
        {...props}
      />
    </FieldShell>
  )
}
