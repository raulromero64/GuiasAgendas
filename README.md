# ElCervantista SMP

Repositorio de la Plataforma de Gestion Escolar (SMP) de ElCervantista.

## Stack

- React 19
- TypeScript
- Vite
- React Router
- React Query
- React Hook Form + Zod
- Tailwind CSS
- Vitest

## Scripts

- npm run dev
- npm run build
- npm run test
- npm run lint
- npm run preview

## Variables de entorno IAM

Auth0 es el proveedor IAM oficial. Configurar en .env local usando .env.example:

- VITE_AUTH_PROVIDER (auth0 por defecto; development solo para pruebas)
- VITE_AUTH0_DOMAIN
- VITE_AUTH0_CLIENT_ID
- VITE_AUTH0_AUDIENCE
- VITE_AUTH0_SCOPE
- VITE_AUTH0_REDIRECT_URI
- VITE_AUTH0_ROLE_CLAIM
- VITE_AUTH0_PERMISSIONS_CLAIM

## Estructura funcional principal

- src/app: layouts, providers y enrutamiento privado
- src/public: flujo publico de acceso y solicitud de matricula
- src/modules/academic-structure: dominio de estructura academica
- src/modules/student-enrollment: dominio y UI de matricula
- src/shared: componentes, seguridad, servicios y constantes comunes
- src/client/institutional: branding y tema institucional

## Documentacion

- AI/: marco operativo y lineamientos de trabajo asistido
- docs/: arquitectura, plan maestro, historial y manual funcional
