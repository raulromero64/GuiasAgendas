import { Link, Outlet } from 'react-router-dom'

import { DASHBOARD_ENTRY_ROUTE, PUBLIC_ENTRY_ROUTE } from '@/shared/constants/identity'
import { Badge, Card, SectionHeading } from '@/shared/components/ui'

/**
 * Layout IAM preparado para futuros formularios y proveedores externos.
 */
export function AuthLayout() {
  return (
    <div className="min-h-screen bg-app-gradient">
      <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-10 md:px-6">
        <Card className="w-full space-y-5 p-6 md:p-8">
          <SectionHeading
            title="AuthLayout"
            description="Infraestructura lista para autenticacion real en siguientes fases."
          />

          <div className="flex items-center gap-3">
            <Badge tone="info">Identity Placeholder</Badge>
            <p className="text-sm text-content-secondary">
              Sin formularios ni credenciales reales en este sprint.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to={DASHBOARD_ENTRY_ROUTE}
              className="inline-flex items-center justify-center rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-surface-panel shadow-sm transition hover:bg-brand-600"
            >
              Ir a zona protegida
            </Link>
            <Link
              to={PUBLIC_ENTRY_ROUTE}
              className="inline-flex items-center justify-center rounded-md border border-border-strong bg-surface-panel px-4 py-2 text-sm font-semibold text-content-secondary shadow-sm transition hover:bg-neutral-100"
            >
              Volver a PublicLayout
            </Link>
          </div>

          <Outlet />
        </Card>
      </main>
    </div>
  )
}
