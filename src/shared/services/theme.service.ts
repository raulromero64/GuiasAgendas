import { institutionalThemeCssVariables } from '@/client/institutional/theme'
import { themeCssVariables } from '@/shared/constants/tokens/theme'

/**
 * Aplica variables globales del Design System al documento.
 */
export const themeService = {
  applyTheme() {
    const root = document.documentElement

    const runtimeTheme = {
      ...themeCssVariables,
      ...institutionalThemeCssVariables,
    }

    Object.entries(runtimeTheme).forEach(([token, value]) => {
      root.style.setProperty(token, value)
    })
  },
}
