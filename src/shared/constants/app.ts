/**
 * Constantes globales de presentacion del SMP.
 */
export const APP_NAME = 'School Management Platform'
export const APP_SHORT = 'SMP'
export const CURRENT_PHASE = 'Phase 1'
export const CURRENT_SPRINT = 'Sprint 1.6'

const env = import.meta.env

export const AUTH_PROVIDER = env.VITE_AUTH_PROVIDER as 'auth0' | 'development'

export const AUTH0_CONFIG = {
  domain: env.VITE_AUTH0_DOMAIN,
  clientId: env.VITE_AUTH0_CLIENT_ID,
  audience: env.VITE_AUTH0_AUDIENCE,
  scope: env.VITE_AUTH0_SCOPE,
  redirectUri: env.VITE_AUTH0_REDIRECT_URI,
  roleClaim: env.VITE_AUTH0_ROLE_CLAIM,
  permissionsClaim: env.VITE_AUTH0_PERMISSIONS_CLAIM,
}
