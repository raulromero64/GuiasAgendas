import {
  DASHBOARD_STAT_ITEMS,
  SHOWCASE_BADGES,
  SHOWCASE_BUTTON_VARIANTS,
} from '@/shared/constants/uiShowcase'

/**
 * Servicio desacoplado para exponer datos de showcase UI.
 */
export const uiCatalogService = {
  getDashboardStats() {
    return DASHBOARD_STAT_ITEMS
  },
  getButtonVariants() {
    return SHOWCASE_BUTTON_VARIANTS
  },
  getBadgeSamples() {
    return SHOWCASE_BADGES
  },
}
