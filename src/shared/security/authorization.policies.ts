import { PERMISSIONS } from '@/shared/security/permissions'
import type { AuthorizationPolicy, PermissionKey } from '@/shared/types/identity'

const permission = Object.fromEntries(PERMISSIONS.map((item) => [item.key, item.key])) as Record<
  PermissionKey,
  PermissionKey
>

export const authorizationPolicies = {
  dashboard: { allOf: [permission['dashboard.read']] },
  academico: { allOf: [permission['academic.read']] },
  estudiantes: { allOf: [permission['students.read']] },
  agenda: { allOf: [permission['dashboard.read']] },
  configuracion: { allOf: [permission['settings.read']] },
} satisfies Record<string, AuthorizationPolicy>
