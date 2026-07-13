import type { Permission, PermissionKey, Role, Session, User } from '@/shared/types/identity'

/**
 * Permisos oficiales del dominio IAM SMP.
 */
export const IDENTITY_PERMISSIONS: Permission[] = [
  { key: 'dashboard.read', label: 'Visualizar dashboard' },
  { key: 'students.read', label: 'Visualizar estudiantes' },
  { key: 'students.write', label: 'Gestionar estudiantes' },
  { key: 'academic.read', label: 'Visualizar modulo academico' },
  { key: 'academic.write', label: 'Gestionar modulo academico' },
  { key: 'settings.read', label: 'Visualizar configuracion' },
  { key: 'settings.write', label: 'Gestionar configuracion' },
]

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

/**
 * Usuario de demostracion para infraestructura IAM sin proveedor externo.
 */
export const MOCK_AUTH_USER: User = {
  id: 'usr-admin-cervantes',
  name: 'Administrador SMP',
  email: 'admin@smp.local',
  role: 'admin',
}

/**
 * Sesion temporal de demostracion para rutas protegidas.
 */
export const MOCK_AUTH_SESSION: Session = {
  token: 'mock-session-token',
  startedAt: new Date().toISOString(),
  expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(),
}

export const SESSION_STORAGE_KEY = 'smp.identity.session'

/**
 * Ruta por defecto al expirar o faltar sesion.
 */
export const PUBLIC_ENTRY_ROUTE = '/public'

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
    path: '/public',
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
    id: 'protected-route',
    title: 'ProtectedRoute + AppLayout',
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

export const FALLBACK_ROLE_PERMISSIONS: PermissionKey[] = ['dashboard.read']
