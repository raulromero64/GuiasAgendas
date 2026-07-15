import { cn } from '@/shared/utils/cn'

interface WizardStepIndicatorProps {
  steps: string[]
  currentStep: number
  onStepSelect: (index: number) => void
}

export function WizardStepIndicator({
  steps,
  currentStep,
  onStepSelect,
}: WizardStepIndicatorProps) {
  return (
    <ol className="grid gap-2 md:grid-cols-7">
      {steps.map((step, index) => {
        const isActive = index === currentStep
        const isCompleted = index < currentStep

        return (
          <li key={step}>
            <button
              type="button"
              onClick={() => onStepSelect(index)}
              className={cn(
                'flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-xs font-semibold transition',
                isActive && 'border-brand-500 bg-brand-50 text-brand-900',
                !isActive &&
                  isCompleted &&
                  'border-border-strong bg-surface-panel text-content-primary',
                !isActive &&
                  !isCompleted &&
                  'border-border-subtle bg-neutral-100 text-content-secondary'
              )}
            >
              <span
                className={cn(
                  'inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px]',
                  isActive && 'bg-brand-700 text-surface-panel',
                  !isActive && isCompleted && 'bg-brand-600 text-surface-panel',
                  !isActive && !isCompleted && 'bg-neutral-300 text-content-secondary'
                )}
              >
                {index + 1}
              </span>
              <span className="truncate">{step}</span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}
