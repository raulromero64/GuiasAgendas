import { BarChart3, Building2, UsersRound } from 'lucide-react'

import type { StatItem } from '@/shared/types/ui'
import type { ButtonVariant } from '@/shared/types/ui'

/**
 * Datos visuales de muestra para validar componentes UI.
 */
export const DASHBOARD_STAT_ITEMS: StatItem[] = [
  { title: 'Instituciones activas', value: 8, icon: Building2 },
  { title: 'Usuarios en plataforma', value: 1284, icon: UsersRound },
  { title: 'Indicadores operativos', value: 24, icon: BarChart3 },
]

/**
 * Variantes visuales para prueba de botones base.
 */
export const SHOWCASE_BUTTON_VARIANTS: Array<{ label: string; variant: ButtonVariant }> = [
  { label: 'Primario', variant: 'primary' },
  { label: 'Secundario', variant: 'secondary' },
  { label: 'Outline', variant: 'outline' },
  { label: 'Ghost', variant: 'ghost' },
]

/**
 * Tonos visuales para prueba de badges base.
 */
export const SHOWCASE_BADGES = [
  { label: 'Neutral', tone: 'neutral' as const },
  { label: 'Info', tone: 'info' as const },
  { label: 'Success', tone: 'success' as const },
]
