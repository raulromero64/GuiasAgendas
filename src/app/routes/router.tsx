import { Navigate, createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/app/layout/AppLayout'
import { AuthLayout } from '@/app/layout/AuthLayout'
import { PublicLayout } from '@/app/layout/PublicLayout'
import { DashboardPage } from '@/app/pages/DashboardPage'
import { PlaceholderPage } from '@/app/pages/PlaceholderPage'
import {
  AUTH_LAYOUT_ROUTE,
  DASHBOARD_ENTRY_ROUTE,
  PUBLIC_ENTRY_ROUTE,
} from '@/shared/constants/identity'
import { ProtectedRoute } from '@/app/routes/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={DASHBOARD_ENTRY_ROUTE} replace />,
  },
  {
    path: PUBLIC_ENTRY_ROUTE,
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: (
          <PlaceholderPage
            title="Portal Publico"
            description="Layout publico disponible para informacion y acceso general del SMP."
          />
        ),
      },
    ],
  },
  {
    path: AUTH_LAYOUT_ROUTE,
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <PlaceholderPage
            title="Identity Gateway"
            description="Layout de autenticacion preparado para integrar Firebase o Supabase en el siguiente sprint."
          />
        ),
      },
    ],
  },
  {
    path: DASHBOARD_ENTRY_ROUTE,
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: 'academico',
            element: (
              <PlaceholderPage
                title="Academico"
                description="Seccion reservada para gestion academica en siguientes sprints."
              />
            ),
          },
          {
            path: 'estudiantes',
            element: (
              <PlaceholderPage
                title="Estudiantes"
                description="Seccion reservada para administracion del ciclo de vida estudiantil."
              />
            ),
          },
          {
            path: 'agenda',
            element: (
              <PlaceholderPage
                title="Agenda"
                description="Seccion reservada para calendario institucional y eventos operativos."
              />
            ),
          },
          {
            path: 'configuracion',
            element: (
              <PlaceholderPage
                title="Configuracion"
                description="Seccion reservada para ajustes de plataforma y parametros base."
              />
            ),
          },
        ],
      },
    ],
  },
])
