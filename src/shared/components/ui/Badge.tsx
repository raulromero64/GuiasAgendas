import type { ReactNode } from 'react'

import { cn } from '@/shared/utils/cn'

interface BadgeProps {
  children: ReactNode
  tone?: 'neutral' | 'info' | 'success'
  className?: string
}

/**
 * Etiqueta compacta para estados y metadata visual.
 */
export function Badge({ children, className, tone = 'neutral' }: BadgeProps) {
  const tones = {
    neutral: 'bg-neutral-100 text-content-secondary',
    info: 'bg-brand-100 text-brand-700',
    success: 'bg-semantic-success/15 text-semantic-success',
  }

  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
