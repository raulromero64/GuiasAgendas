import { colors } from './colors'
import { radius } from './radius'
import { shadows } from './shadows'
import { spacing } from './spacing'
import { typography } from './typography'

/**
 * Convierte hex a canales RGB para variables CSS.
 */
function hexToRgbChannel(hex: string) {
  const value = hex.replace('#', '')
  const normalized =
    value.length === 3
      ? value
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : value
  const intValue = Number.parseInt(normalized, 16)

  const red = (intValue >> 16) & 255
  const green = (intValue >> 8) & 255
  const blue = intValue & 255

  return `${red} ${green} ${blue}`
}

/**
 * Theme oficial SMP para Tailwind y variables globales.
 */
export const themeTokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  backgrounds: {
    appGradient:
      'radial-gradient(circle at 14% 16%, rgb(var(--color-brand-200) / 0.3), transparent 35%), radial-gradient(circle at 88% 0%, rgb(var(--color-brand-400) / 0.18), transparent 34%), rgb(var(--color-surface-canvas))',
  },
}

/**
 * Variables CSS consumidas por utilidades Tailwind semanticas.
 */
export const themeCssVariables = {
  '--color-brand-50': hexToRgbChannel(colors.brand[50]),
  '--color-brand-100': hexToRgbChannel(colors.brand[100]),
  '--color-brand-200': hexToRgbChannel(colors.brand[200]),
  '--color-brand-300': hexToRgbChannel(colors.brand[300]),
  '--color-brand-400': hexToRgbChannel(colors.brand[400]),
  '--color-brand-500': hexToRgbChannel(colors.brand[500]),
  '--color-brand-600': hexToRgbChannel(colors.brand[600]),
  '--color-brand-700': hexToRgbChannel(colors.brand[700]),
  '--color-brand-800': hexToRgbChannel(colors.brand[800]),
  '--color-brand-900': hexToRgbChannel(colors.brand[900]),
  '--color-neutral-50': hexToRgbChannel(colors.neutral[50]),
  '--color-neutral-100': hexToRgbChannel(colors.neutral[100]),
  '--color-neutral-200': hexToRgbChannel(colors.neutral[200]),
  '--color-neutral-300': hexToRgbChannel(colors.neutral[300]),
  '--color-neutral-400': hexToRgbChannel(colors.neutral[400]),
  '--color-neutral-500': hexToRgbChannel(colors.neutral[500]),
  '--color-neutral-600': hexToRgbChannel(colors.neutral[600]),
  '--color-neutral-700': hexToRgbChannel(colors.neutral[700]),
  '--color-neutral-800': hexToRgbChannel(colors.neutral[800]),
  '--color-neutral-900': hexToRgbChannel(colors.neutral[900]),
  '--color-semantic-info': hexToRgbChannel(colors.semantic.info),
  '--color-semantic-success': hexToRgbChannel(colors.semantic.success),
  '--color-semantic-warning': hexToRgbChannel(colors.semantic.warning),
  '--color-semantic-danger': hexToRgbChannel(colors.semantic.danger),
  '--color-surface-canvas': hexToRgbChannel(colors.neutral[50]),
  '--color-surface-panel': hexToRgbChannel('#ffffff'),
  '--color-content-primary': hexToRgbChannel(colors.neutral[800]),
  '--color-content-secondary': hexToRgbChannel(colors.neutral[600]),
  '--color-content-muted': hexToRgbChannel(colors.neutral[500]),
  '--color-border-subtle': hexToRgbChannel(colors.neutral[200]),
  '--color-border-strong': hexToRgbChannel(colors.neutral[300]),
  '--color-focus-ring': hexToRgbChannel(colors.brand[400]),
} as const
