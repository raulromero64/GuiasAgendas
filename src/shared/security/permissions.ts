import type { Permission, PermissionKey } from '@/shared/types/identity'

export const PERMISSIONS: Permission[] = [
  { key: 'dashboard.read', label: 'Visualizar dashboard' },
  { key: 'students.read', label: 'Visualizar estudiantes' },
  { key: 'students.write', label: 'Gestionar estudiantes' },
  { key: 'academic.read', label: 'Visualizar modulo academico' },
  { key: 'academic.write', label: 'Gestionar modulo academico' },
  { key: 'settings.read', label: 'Visualizar configuracion' },
  { key: 'settings.write', label: 'Gestionar configuracion' },
]

const permissionSet = new Set<PermissionKey>(PERMISSIONS.map((item) => item.key))

export function isKnownPermission(value: string): value is PermissionKey {
  return permissionSet.has(value as PermissionKey)
}
