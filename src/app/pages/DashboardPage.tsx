import { Link } from 'react-router-dom'

import { InstitutionalBrandHeader } from '@/client/institutional/InstitutionalBrandHeader'
import { Badge, Button, Card, Input, SectionHeading, StatTile } from '@/shared/components/ui'
import { IDENTITY_BADGE_TONE, IDENTITY_ROUTE_FLOW } from '@/shared/constants/identity'
import { useAuth } from '@/shared/hooks/useAuth'
import { uiCatalogService } from '@/shared/services/uiCatalog.service'

export function DashboardPage() {
  const { hasPermission, permissions, user } = useAuth()

  const stats = uiCatalogService.getDashboardStats()
  const buttonVariants = uiCatalogService.getButtonVariants()
  const badges = uiCatalogService.getBadgeSamples()

  return (
    <div className="space-y-6">
      <InstitutionalBrandHeader />

      <div className="flex justify-center">
        <Link to="/app/estudiantes" aria-label="Ir al formulario de matricula">
          <Button variant="primary" className="px-8 py-2.5 text-base tracking-[0.08em]">
            INICIO
          </Button>
        </Link>
      </div>

      <SectionHeading
        title="School Management Platform (SMP)"
        description="School Management Platform (SMP). Plataforma institucional para la gestion academica, administrativa y de procesos del colegio."
      />

      <Card>
        <h3 className="text-sm font-semibold text-content-primary">Identity Route Flow</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {IDENTITY_ROUTE_FLOW.map((step) => (
            <div
              key={step.id}
              className="rounded-lg border border-border-subtle bg-neutral-100 p-3"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-content-primary">{step.title}</p>
                <Badge tone={IDENTITY_BADGE_TONE[step.access]}>{step.access}</Badge>
              </div>
              <p className="text-xs text-content-secondary">{step.description}</p>
              <Link
                to={step.path}
                className="mt-3 inline-block text-xs font-semibold text-brand-700"
              >
                {step.path}
              </Link>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-content-primary">Identity Snapshot</h3>
        <div className="mt-4 space-y-2 text-sm text-content-secondary">
          <p>
            Usuario actual:{' '}
            <span className="font-semibold text-content-primary">
              {user?.name ?? 'Sin usuario'}
            </span>
          </p>
          <p>
            Rol actual:{' '}
            <span className="font-semibold text-content-primary">{user?.role ?? 'Sin rol'}</span>
          </p>
          <p>
            Permisos cargados:{' '}
            <span className="font-semibold text-content-primary">{permissions.length}</span>
          </p>
          <p>
            Acceso a settings.write:{' '}
            <span className="font-semibold text-content-primary">
              {hasPermission('settings.write') ? 'permitido' : 'restringido'}
            </span>
          </p>
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-content-primary">Botones</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          {buttonVariants.map(({ label, variant }) => (
            <Button key={variant} variant={variant}>
              {label}
            </Button>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-content-primary">Badges</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          {badges.map(({ label, tone }) => (
            <Badge key={tone} tone={tone}>
              {label}
            </Badge>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-content-primary">Inputs</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Input placeholder="Buscar estudiante" aria-label="Buscar estudiante" />
          <Input placeholder="Filtrar por curso" aria-label="Filtrar por curso" />
        </div>
      </Card>

      <section>
        <h3 className="mb-4 text-sm font-semibold text-content-primary">Stat Tiles</h3>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((item) => (
            <StatTile key={item.title} item={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
