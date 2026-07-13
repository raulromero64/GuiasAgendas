/**
 * Formatea numeros para visualizacion consistente en UI.
 */
export function formatNumber(value: number) {
  return new Intl.NumberFormat('es-ES').format(value)
}
