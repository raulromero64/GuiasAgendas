import { IDENTITY_ROLES } from '@/shared/constants/identity'
import { isKnownPermission } from '@/shared/security/permissions'
import type { AuthorizationPolicy, PermissionKey, RoleKey } from '@/shared/types/identity'

interface AuthorizationInput {
  role: RoleKey | null
  permissionClaims?: string[]
}

function normalizePermissionClaims(permissionClaims?: string[]): PermissionKey[] {
  if (!permissionClaims?.length) {
    return []
  }

  return permissionClaims.filter((permission): permission is PermissionKey =>
    isKnownPermission(permission)
  )
}

function resolveRolePermissions(role: RoleKey | null): PermissionKey[] {
  if (!role) {
    return []
  }

  const roleConfig = IDENTITY_ROLES.find((item) => item.key === role)
  return roleConfig?.permissions ?? []
}

export function resolveEffectivePermissions({ role, permissionClaims }: AuthorizationInput) {
  const rolePermissions = resolveRolePermissions(role)
  const claimPermissions = normalizePermissionClaims(permissionClaims)

  return [...new Set<PermissionKey>([...rolePermissions, ...claimPermissions])]
}

export function hasPermission(permissions: PermissionKey[], permission: PermissionKey) {
  return permissions.includes(permission)
}

export function isAuthorized(permissions: PermissionKey[], policy?: AuthorizationPolicy) {
  if (!policy) {
    return true
  }

  const requiredAll = policy.allOf ?? []
  const requiredAny = policy.anyOf ?? []

  const allSatisfied = requiredAll.every((permission) => hasPermission(permissions, permission))
  const anySatisfied =
    requiredAny.length === 0 ||
    requiredAny.some((permission) => hasPermission(permissions, permission))

  return allSatisfied && anySatisfied
}
