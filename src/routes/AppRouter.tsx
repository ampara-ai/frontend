import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AdminLayout } from '../layouts/AdminLayout'
import { AppLayout } from '../layouts/AppLayout'
import { paths } from '../lib/routes'
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage'
import { AdminIndexacionPage } from '../pages/admin/AdminIndexacionPage'
import { AdminLoginPage } from '../pages/admin/AdminLoginPage'
import { AdminMetricasPage } from '../pages/admin/AdminMetricasPage'
import { AdminReportesPage } from '../pages/admin/AdminReportesPage'
import { AdminSeguridadPage } from '../pages/admin/AdminSeguridadPage'
import { ChatPage } from '../pages/ChatPage'
import { HomePage } from '../pages/HomePage'
import { PreguntasFrecuentesPage } from '../pages/PreguntasFrecuentesPage'
import { SesionExpiradaPage } from '../pages/SesionExpiradaPage'
import { ProtectedAdminRoute } from './ProtectedAdminRoute'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: paths.home,
        element: <HomePage />,
      },
      {
        path: paths.chat,
        element: <ChatPage />,
      },
      {
        path: paths.preguntasFrecuentes,
        element: <PreguntasFrecuentesPage />,
      },
      {
        path: paths.sesionExpirada,
        element: <SesionExpiradaPage />,
      },
      {
        path: paths.adminLogin,
        element: <AdminLoginPage />,
      },
      {
        element: <ProtectedAdminRoute />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                path: paths.admin,
                element: <AdminDashboardPage />,
              },
              {
                path: paths.adminIndexacion,
                element: <AdminIndexacionPage />,
              },
              {
                path: paths.adminMetricas,
                element: <AdminMetricasPage />,
              },
              {
                path: paths.adminReportes,
                element: <AdminReportesPage />,
              },
              {
                path: paths.adminSeguridad,
                element: <AdminSeguridadPage />,
              },
            ],
          },
        ],
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
