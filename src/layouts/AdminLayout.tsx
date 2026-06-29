import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { MaterialIcon } from '../components/MaterialIcon'
import { logoutAdmin } from '../lib/adminAuth'
import { paths } from '../lib/routes'

const adminLinks = [
  { to: paths.admin, label: 'Dashboard', icon: 'dashboard', end: true },
  {
    to: paths.adminIndexacion,
    label: 'Indexacion',
    icon: 'folder_shared',
    end: false,
  },
] as const

function AdminNavLink({
  end,
  icon,
  label,
  to,
}: {
  end?: boolean
  icon: string
  label: string
  to: string
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        isActive
          ? 'flex items-center gap-3 rounded-lg bg-primary px-3 py-3 font-label-lg text-label-lg text-on-primary'
          : 'flex items-center gap-3 rounded-lg px-3 py-3 font-label-lg text-label-lg text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface'
      }
    >
      <MaterialIcon name={icon} className="h-5 w-5 text-[20px]" />
      <span>{label}</span>
    </NavLink>
  )
}

export function AdminLayout() {
  const navigate = useNavigate()

  function handleLogout() {
    logoutAdmin()
    navigate(paths.adminLogin, { replace: true })
  }

  return (
    <div className="admin-page min-h-dvh w-full overflow-x-hidden bg-surface-container-low font-body-md text-on-surface">
      <aside className="fixed left-0 top-0 hidden h-dvh w-72 flex-col border-r border-outline-variant/40 bg-surface px-4 py-6 md:flex">
        <div className="px-3 pb-6">
          <p className="font-headline-md text-headline-md text-primary">
            AMPARA Admin
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Gestion interna
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-2">
          {adminLinks.map((link) => (
            <AdminNavLink key={link.to} {...link} />
          ))}
        </nav>
        <button
          type="button"
          className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-outline-variant px-4 py-3 font-label-lg text-label-lg text-on-surface-variant transition-colors hover:bg-surface-container-high"
          onClick={handleLogout}
        >
          <MaterialIcon name="logout" className="h-5 w-5 text-[20px]" />
          Cerrar sesion
        </button>
      </aside>

      <div className="min-w-0 md:pl-72">
        <header className="sticky top-0 z-40 border-b border-outline-variant/40 bg-surface/90 px-container-padding py-stack-sm shadow-sm backdrop-blur-md md:hidden">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-headline-sm text-headline-sm text-primary">
                AMPARA Admin
              </p>
              <p className="font-label-lg text-label-lg text-on-surface-variant">
                Gestion interna
              </p>
            </div>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high"
              onClick={handleLogout}
              aria-label="Cerrar sesion"
            >
              <MaterialIcon name="logout" className="h-5 w-5 text-[22px]" />
            </button>
          </div>
          <nav className="hide-scrollbar mt-3 flex gap-2 overflow-x-auto">
            {adminLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  isActive
                    ? 'shrink-0 rounded-full bg-primary px-4 py-2 font-label-lg text-label-lg text-on-primary'
                    : 'shrink-0 rounded-full bg-surface-container px-4 py-2 font-label-lg text-label-lg text-on-surface-variant'
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </header>

        <main className="mx-auto min-h-dvh w-full min-w-0 max-w-6xl overflow-x-hidden px-container-padding py-stack-lg">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
