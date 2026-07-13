import type { PropsWithChildren } from 'react'

import { useApplyTheme } from '@/shared/hooks/useApplyTheme'

/**
 * Provider de tema para inyectar tokens globales del Design System.
 */
export function ThemeProvider({ children }: PropsWithChildren) {
  useApplyTheme()

  return <>{children}</>
}
