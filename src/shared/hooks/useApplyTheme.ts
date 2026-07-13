import { useEffect } from 'react'

import { themeService } from '@/shared/services/theme.service'

/**
 * Hook reusable para activar el Design System en runtime.
 */
export function useApplyTheme() {
  useEffect(() => {
    themeService.applyTheme()
  }, [])
}
