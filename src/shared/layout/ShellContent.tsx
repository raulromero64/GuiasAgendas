import { Outlet } from 'react-router-dom'

import { Card } from '@/shared/components/ui'

/**
 * Contenedor reusable para contenido principal en shell.
 */
export function ShellContent() {
  return (
    <Card className="p-4 md:p-6">
      <Outlet />
    </Card>
  )
}
