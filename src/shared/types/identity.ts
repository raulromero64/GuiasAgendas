export type RoleKey = 'super_admin' | 'admin' | 'coordinator' | 'teacher' | 'student'

export type PermissionKey =
  | 'dashboard.read'
  | 'students.read'
  | 'students.write'
  | 'academic.read'
  | 'academic.write'
  | 'settings.read'
  | 'settings.write'

export interface Permission {
  key: PermissionKey
  label: string
}

export interface Role {
  key: RoleKey
  label: string
  permissions: PermissionKey[]
}

export interface User {
  id: string
  name: string
  email: string
  role: RoleKey
  permissionClaims?: string[]
}

export interface AuthorizationPolicy {
  allOf?: PermissionKey[]
  anyOf?: PermissionKey[]
}

export interface Session {
  token: string
  startedAt: string
  expiresAt: string
}

export interface AuthSnapshot {
  user: User | null
  session: Session | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AuthContextValue extends AuthSnapshot {
  permissions: PermissionKey[]
  hasPermission: (permission: PermissionKey) => boolean
  isAuthorized: (policy?: AuthorizationPolicy) => boolean
  signOut: () => Promise<void>
}
