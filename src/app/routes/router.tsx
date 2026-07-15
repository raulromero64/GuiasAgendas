import { Navigate, createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/app/layout/AppLayout'
import { AuthLayout } from '@/app/layout/AuthLayout'
import { PublicLayout } from '@/app/layout/PublicLayout'
import { DashboardPage } from '@/app/pages/DashboardPage'
import { StudentEnrollmentPage } from '@/app/pages/StudentEnrollmentPage'
import { AuthorizationGuard } from '@/app/routes/AuthorizationGuard'
import { SectionStructurePage } from '@/app/pages/SectionStructurePage'
import {
  AUTH_LAYOUT_ROUTE,
  DASHBOARD_ENTRY_ROUTE,
  PUBLIC_ENTRY_ROUTE,
} from '@/shared/constants/identity'
import { authorizationPolicies } from '@/shared/security/authorization.policies'

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
          <SectionStructurePage
            title="Portal Publico"
            summary="Punto de entrada publico del SMP para comunicacion general y acceso controlado."
            scope="Presentar acceso institucional, lineamientos y redireccion hacia zonas autenticadas."
            status="Estructura base establecida sin logica funcional adicional."
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
          <SectionStructurePage
            title="Identity Gateway"
            summary="Zona de identidad desacoplada para orquestar autenticacion en siguientes fases."
            scope="Sostener el flujo de entrada/autorizacion sin acoplarse a un proveedor externo."
            status="Contrato de autenticacion operativo con implementacion base de infraestructura."
          />
        ),
      },
    ],
  },
  {
    path: DASHBOARD_ENTRY_ROUTE,
    element: <AuthorizationGuard policy={authorizationPolicies.dashboard} />,
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
            element: <AuthorizationGuard policy={authorizationPolicies.academico} />,
            children: [
              {
                index: true,
                element: (
                  <SectionStructurePage
                    title="Academico"
                    summary="Contenedor estructural del dominio academico para evolucion incremental."
                    scope="Definir base de navegacion, permisos y montaje por modulos academicos."
                    status="Estructura final de pagina disponible, sin funcionalidades de negocio."
                  />
                ),
              },
            ],
          },
          {
            path: 'estudiantes',
            element: <AuthorizationGuard policy={authorizationPolicies.estudiantes} />,
            children: [
              {
                index: true,
                element: <StudentEnrollmentPage />,
              },
            ],
          },
          {
            path: 'agenda',
            element: <AuthorizationGuard policy={authorizationPolicies.agenda} />,
            children: [
              {
                index: true,
                element: (
                  <SectionStructurePage
                    title="Agenda"
                    summary="Contenedor estructural para calendario institucional y coordinacion operativa."
                    scope="Habilitar el montaje posterior de eventos, hitos y programacion escolar."
                    status="Estructura final de pagina disponible, sin funcionalidades de negocio."
                  />
                ),
              },
            ],
          },
          {
            path: 'configuracion',
            element: <AuthorizationGuard policy={authorizationPolicies.configuracion} />,
            children: [
              {
                index: true,
                element: (
                  <SectionStructurePage
                    title="Configuracion"
                    summary="Contenedor estructural para parametros base y gobierno de plataforma."
                    scope="Centralizar ajustes institucionales y politicas de operacion futuras."
                    status="Estructura final de pagina disponible, sin funcionalidades de negocio."
                  />
                ),
              },
            ],
          },
        ],
      },
    ],
  },
])
