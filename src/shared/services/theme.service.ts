import { themeCssVariables } from '@/shared/constants/tokens/theme'

/**
 * Aplica variables globales del Design System al documento.
 */
export const themeService = {
  applyTheme() {
    const root = document.documentElement

    Object.entries(themeCssVariables).forEach(([token, value]) => {
      root.style.setProperty(token, value)
    })
  },
}
