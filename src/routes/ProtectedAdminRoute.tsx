import { Navigate, Outlet } from 'react-router-dom'
import { isAdminAuthenticated } from '../lib/adminAuth'
import { paths } from '../lib/routes'

export function ProtectedAdminRoute() {
  if (!isAdminAuthenticated()) {
    return <Navigate to={paths.adminLogin} replace />
  }

  return <Outlet />
}
