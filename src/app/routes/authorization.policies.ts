import type { AuthorizationPolicy } from '@/shared/types/identity'

export const routeAuthorizationPolicies: Record<string, AuthorizationPolicy> = {
  dashboard: { allOf: ['dashboard.read'] },
  academico: { allOf: ['academic.read'] },
  estudiantes: { allOf: ['students.read'] },
  agenda: { allOf: ['dashboard.read'] },
  configuracion: { allOf: ['settings.read'] },
}
