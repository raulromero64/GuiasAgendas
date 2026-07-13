import { FALLBACK_ROLE_PERMISSIONS, IDENTITY_ROLES } from '@/shared/constants/identity'
import type { PermissionKey, RoleKey } from '@/shared/types/identity'

/**
 * Resuelve permisos por rol desde la configuracion centralizada.
 */
export function resolveRolePermissions(role: RoleKey): PermissionKey[] {
  const roleConfig = IDENTITY_ROLES.find((item) => item.key === role)
  return roleConfig?.permissions ?? FALLBACK_ROLE_PERMISSIONS
}

/**
 * Evalua permisos de forma pura y reutilizable.
 */
export function hasPermission(permissions: PermissionKey[], permission: PermissionKey) {
  return permissions.includes(permission)
}
