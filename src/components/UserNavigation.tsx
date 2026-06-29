import { Link } from 'react-router-dom'
import { paths } from '../lib/routes'

type UserNavSection = 'orientation' | 'resources'

type UserTopNavProps = {
  active: UserNavSection
  onClear?: () => void
}

type UserBottomNavProps = {
  active: UserNavSection
}

function QuickExitButton() {
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 rounded-lg bg-[#E57373] px-3 py-2 font-button text-[14px] text-on-error shadow-sm transition-colors hover:bg-error md:gap-2 md:rounded-full md:px-6 md:py-3 md:text-button"
      onClick={() => {
        window.location.assign('https://www.google.com')
      }}
    >
      <span
        className="material-symbols-outlined"
        style={{ fontVariationSettings: '"FILL" 1' }}
      >
        exit_to_app
      </span>
      SALIDA RAPIDA
    </button>
  )
}

function DesktopNavLink({
  active,
  children,
  to,
}: {
  active: boolean
  children: string
  to: string
}) {
  return (
    <Link
      to={to}
      className={
        active
          ? 'rounded-full bg-secondary-container px-3 py-1.5 font-label-lg text-label-lg text-on-secondary-container'
          : 'rounded-full px-3 py-1.5 font-label-lg text-label-lg text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface'
      }
    >
      {children}
    </Link>
  )
}

export function UserTopNav({ active, onClear }: UserTopNavProps) {
  return (
    <header className="z-50 flex w-full max-w-full shrink-0 items-center justify-between border-b border-outline-variant/30 bg-surface/90 px-container-padding py-stack-sm font-headline-sm text-headline-sm shadow-sm shadow-primary/10 backdrop-blur-md">
      <div className="flex items-center gap-2 md:gap-4">
        <Link
          to={paths.home}
          className="font-headline-md text-[24px] font-semibold tracking-tight text-primary md:text-headline-md md:text-[#5D7B93]"
        >
          AMPARA
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <DesktopNavLink active={active === 'orientation'} to={paths.chat}>
            Orientacion
          </DesktopNavLink>
          <DesktopNavLink
            active={active === 'resources'}
            to={paths.preguntasFrecuentes}
          >
            Recursos
          </DesktopNavLink>
        </nav>
      </div>
      <div className="flex items-center gap-3 md:gap-4">
        {active === 'orientation' ? (
          <Link
            to={paths.preguntasFrecuentes}
            className="flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-surface-container-high md:hidden"
            aria-label="Ir a recursos"
          >
            <span className="material-symbols-outlined">shield</span>
          </Link>
        ) : null}
        {onClear ? (
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high md:h-auto md:w-auto md:gap-2 md:rounded-lg md:px-4 md:py-2 md:font-body-md md:text-body-md"
            onClick={onClear}
            aria-label="Limpiar historial"
          >
            <span className="material-symbols-outlined">delete</span>
            <span className="hidden md:inline">Limpiar historial</span>
          </button>
        ) : null}
        <QuickExitButton />
      </div>
    </header>
  )
}

export function UserBottomNav({ active }: UserBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full rounded-t-xl bg-surface shadow-[0_-4px_12px_rgba(65,95,118,0.08)] md:hidden">
      <div className="pb-safe flex w-full items-center justify-around px-4 py-3">
        <Link
          className={
            active === 'orientation'
              ? 'flex flex-col items-center justify-center rounded-full bg-secondary-container px-6 py-1 text-on-secondary-container'
              : 'flex flex-col items-center justify-center rounded-lg p-2 text-on-surface-variant hover:bg-surface-container-high'
          }
          to={paths.chat}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontVariationSettings:
                active === 'orientation' ? '"FILL" 1' : undefined,
            }}
          >
            balance
          </span>
          <span className="mt-1 font-label-lg text-label-lg">Orientacion</span>
        </Link>
        <Link
          className={
            active === 'resources'
              ? 'flex flex-col items-center justify-center rounded-full bg-secondary-container px-6 py-1 text-on-secondary-container'
              : 'flex flex-col items-center justify-center rounded-lg p-2 text-on-surface-variant hover:bg-surface-container-high'
          }
          to={paths.preguntasFrecuentes}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontVariationSettings:
                active === 'resources' ? '"FILL" 1' : undefined,
            }}
          >
            shield
          </span>
          <span className="mt-1 font-label-lg text-label-lg">Recursos</span>
        </Link>
      </div>
    </nav>
  )
}
