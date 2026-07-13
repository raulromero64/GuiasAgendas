import type { StatItem } from '@/shared/types/ui'
import { Card } from '@/shared/components/ui/Card'
import { formatNumber } from '@/shared/utils/formatNumber'

interface StatTileProps {
  item: StatItem
}

/**
 * Tarjeta estadistica reusable para indicadores visuales.
 */
export function StatTile({ item }: StatTileProps) {
  const Icon = item.icon

  return (
    <Card className="bg-neutral-100/60">
      <div className="flex items-start justify-between">
        <p className="text-sm text-content-muted">{item.title}</p>
        <Icon className="h-4 w-4 text-brand-500" />
      </div>
      <p className="mt-5 text-3xl font-semibold text-content-primary">{formatNumber(item.value)}</p>
    </Card>
  )
}
