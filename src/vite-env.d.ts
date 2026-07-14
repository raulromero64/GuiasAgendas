/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_PROVIDER?: 'auth0' | 'development'
  readonly VITE_AUTH0_DOMAIN?: string
  readonly VITE_AUTH0_CLIENT_ID?: string
  readonly VITE_AUTH0_AUDIENCE?: string
  readonly VITE_AUTH0_SCOPE?: string
  readonly VITE_AUTH0_REDIRECT_URI?: string
  readonly VITE_AUTH0_ROLE_CLAIM?: string
  readonly VITE_AUTH0_PERMISSIONS_CLAIM?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
