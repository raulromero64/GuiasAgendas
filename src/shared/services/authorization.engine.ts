import {
  FALLBACK_ROLE_PERMISSIONS,
  IDENTITY_PERMISSIONS,
  IDENTITY_ROLES,
} from '@/shared/constants/identity'
import type { AuthorizationPolicy, PermissionKey, RoleKey } from '@/shared/types/identity'

interface AuthorizationInput {
  role: RoleKey | null
  permissionClaims?: string[]
}

const knownPermissions = new Set<PermissionKey>(IDENTITY_PERMISSIONS.map((item) => item.key))

function normalizePermissionClaims(permissionClaims?: string[]): PermissionKey[] {
  if (!permissionClaims?.length) {
    return []
  }

  return permissionClaims.filter((permission): permission is PermissionKey =>
    knownPermissions.has(permission as PermissionKey)
  )
}

function resolveRolePermissions(role: RoleKey | null): PermissionKey[] {
  if (!role) {
    return []
  }

  const roleConfig = IDENTITY_ROLES.find((item) => item.key === role)
  return roleConfig?.permissions ?? FALLBACK_ROLE_PERMISSIONS
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
    requiredAny.length === 0 || requiredAny.some((p) => hasPermission(permissions, p))

  return allSatisfied && anySatisfied
}
