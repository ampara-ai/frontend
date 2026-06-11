import { Link } from 'react-router-dom'
import { paths } from '../lib/routes'

function QuickExitButton() {
  return (
    <button
      type="button"
      className="flex h-[48px] items-center gap-2 rounded-full bg-[#E57373] px-4 py-2 font-button text-sm text-white shadow-sm shadow-[#E57373]/20 transition-colors hover:bg-[#ef5350]"
      onClick={() => {
        window.location.assign('https://www.google.com')
      }}
    >
      <span className="material-symbols-outlined text-[20px]">
        exit_to_app
      </span>
      SALIDA RAPIDA
    </button>
  )
}

function SessionExpiredHeader() {
  return (
    <>
      <div className="absolute left-0 top-0 z-50 p-container-padding">
        <div className="flex h-[48px] items-center">
          <Link
            to={paths.home}
            className="font-['Public_Sans'] text-[26px] font-semibold tracking-tight text-[#5D7B93]"
          >
            AMPARA
          </Link>
        </div>
      </div>
      <div className="absolute right-0 top-0 z-50 p-container-padding">
        <QuickExitButton />
      </div>
    </>
  )
}

export function SesionExpiradaPage() {
  return (
    <div className="session-expired-page relative flex min-h-dvh flex-col bg-surface text-on-surface antialiased">
      <SessionExpiredHeader />

      <main className="mx-auto flex w-full max-w-md flex-grow flex-col items-center justify-center px-container-padding py-stack-lg text-center">
        <div className="mb-stack-lg flex h-32 w-32 items-center justify-center rounded-full bg-secondary-container shadow-sm shadow-primary/10">
          <span
            className="material-symbols-outlined text-[64px] text-on-secondary-container"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            shield_lock
          </span>
        </div>

        <h1 className="m-0 mb-stack-sm font-headline-lg text-headline-lg text-on-surface">
          Sesión cerrada por seguridad
        </h1>
        <p className="mb-stack-lg max-w-[320px] font-body-lg text-body-lg text-on-surface-variant">
          Por tu privacidad, la sesión se cerró por inactividad y el historial
          visible fue limpiado.
        </p>

        <div className="mt-stack-md flex w-full flex-col gap-stack-sm">
          <Link
            to={paths.chat}
            className="flex h-[56px] w-full items-center justify-center rounded-xl bg-primary font-button text-button text-on-primary shadow-sm shadow-primary/10 transition-colors hover:bg-primary-container hover:text-on-primary-container"
          >
            Iniciar nueva consulta
          </Link>
          <Link
            to={paths.home}
            className="flex h-[56px] w-full items-center justify-center rounded-xl border-2 border-outline-variant font-button text-button text-primary transition-colors hover:bg-surface-container-high"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  )
}
