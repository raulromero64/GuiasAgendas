import { PERMISSIONS } from '@/shared/security/permissions'
import type { Permission, PermissionKey, Role } from '@/shared/types/identity'

/**
 * Permisos oficiales del dominio IAM SMP.
 */
export const IDENTITY_PERMISSIONS: Permission[] = PERMISSIONS

/**
 * Mapeo centralizado de roles y permisos.
 */
export const IDENTITY_ROLES: Role[] = [
  {
    key: 'super_admin',
    label: 'Super Admin',
    permissions: IDENTITY_PERMISSIONS.map((permission) => permission.key),
  },
  {
    key: 'admin',
    label: 'Administrador',
    permissions: [
      'dashboard.read',
      'students.read',
      'students.write',
      'academic.read',
      'academic.write',
      'settings.read',
    ],
  },
  {
    key: 'coordinator',
    label: 'Coordinador',
    permissions: ['dashboard.read', 'students.read', 'academic.read', 'academic.write'],
  },
  {
    key: 'teacher',
    label: 'Docente',
    permissions: ['dashboard.read', 'students.read', 'academic.read'],
  },
  {
    key: 'student',
    label: 'Estudiante',
    permissions: ['dashboard.read'],
  },
]

export const SESSION_STORAGE_KEY = 'smp.identity.session'

/**
 * Ruta por defecto al expirar o faltar sesion.
 */
export const PUBLIC_ENTRY_ROUTE = '/'

export const PUBLIC_ENROLLMENT_ACCESS_ROUTE = '/acceso-matricula'

export const PUBLIC_ENROLLMENT_WIZARD_ROUTE = '/solicitud-matricula'

export const DASHBOARD_ENTRY_ROUTE = '/app'

export const AUTH_LAYOUT_ROUTE = '/auth'

export const IDENTITY_ROUTE_FLOW: Array<{
  id: string
  title: string
  path: string
  description: string
  access: 'public' | 'auth' | 'protected'
}> = [
  {
    id: 'public-layout',
    title: 'PublicLayout',
    path: '/',
    description: 'Entrada publica e informativa del SMP.',
    access: 'public',
  },
  {
    id: 'auth-layout',
    title: 'AuthLayout',
    path: '/auth',
    description: 'Zona de identidad preparada para futuros proveedores IAM.',
    access: 'auth',
  },
  {
    id: 'authorization-guard',
    title: 'AuthorizationGuard + AppLayout',
    path: '/app',
    description: 'Zona administrativa protegida por sesion y permisos.',
    access: 'protected',
  },
]

export const IDENTITY_BADGE_TONE: Record<
  'public' | 'auth' | 'protected',
  'neutral' | 'info' | 'success'
> = {
  public: 'neutral',
  auth: 'info',
  protected: 'success',
}

export const FALLBACK_ROLE_PERMISSIONS: PermissionKey[] = []
