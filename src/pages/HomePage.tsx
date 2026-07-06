import { Link, useNavigate } from 'react-router-dom'
import { paths } from '../lib/routes'

function QuickExitButton() {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-full bg-error px-4 py-2 font-button text-button text-on-error shadow-sm transition-opacity hover:opacity-90 md:rounded-lg md:bg-[#E57373] md:hover:bg-[#ef5350]"
      onClick={() => {
        window.location.assign('https://www.google.com')
      }}
    >
      <span className="material-symbols-outlined text-[24px] md:hidden">
        directions_run
      </span>
      <span className="material-symbols-outlined hidden text-[24px] md:inline-block">
        logout
      </span>
      <span className="text-left leading-tight md:leading-none">
        <span className="md:hidden">
          SALIDA
          <br />
          RAPIDA
        </span>
        <span className="hidden md:inline">SALIDA RAPIDA</span>
      </span>
    </button>
  )
}

function HomeHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant/30 bg-surface/90 shadow-sm shadow-primary/10 backdrop-blur-md">
      <div className="flex w-full max-w-full items-center justify-between px-container-padding py-stack-sm">
        <div className="flex items-center gap-2">
          <Link
            to={paths.home}
            className="font-['Public_Sans'] text-[26px] font-semibold leading-none tracking-tight text-[#5D7B93]"
          >
            AMPARA
          </Link>
        </div>
        <div className="flex items-center gap-4 md:gap-gutter">
          <span className="ml-4 font-body-md text-body-md text-on-surface-variant md:ml-0">
            Anonimo
          </span>
          <QuickExitButton />
        </div>
      </div>
    </header>
  )
}

function BalanceIcon() {
  return (
    <span
      className="material-symbols-outlined text-5xl text-on-primary-container md:text-4xl md:text-on-secondary-container"
      style={{ fontVariationSettings: '"FILL" 1' }}
    >
      balance
    </span>
  )
}

function MobileHomeContent() {
  const navigate = useNavigate()

  return (
    <main className="mx-auto flex w-full max-w-md flex-grow flex-col px-container-padding pb-stack-lg pt-stack-md md:hidden">
      <section className="mb-stack-lg mt-stack-md flex flex-col items-center text-center">
        <div className="mb-stack-md flex h-24 w-24 items-center justify-center rounded-full bg-primary-container shadow-[0_4px_15px_rgba(65,95,118,0.15)]">
          <BalanceIcon />
        </div>
        <h1 className="m-0 mb-stack-sm font-headline-lg text-headline-lg text-primary">
          Orientacion legal sobre violencia familiar en el Peru
        </h1>
        <p className="m-0 inline-flex items-center gap-2 rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-2 font-body-lg text-body-lg text-on-surface-variant">
          <span
            className="material-symbols-outlined text-secondary"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            lock
          </span>
          Consulta anonima y segura
        </p>
      </section>

      <section className="mb-stack-lg grid grid-cols-1 gap-stack-sm">
        <article className="flex items-start gap-4 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4 text-left shadow-[0_2px_8px_rgba(65,95,118,0.1)]">
          <div className="flex-shrink-0 rounded-full bg-secondary-container p-2">
            <span
              className="material-symbols-outlined text-on-secondary-container"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              volunteer_activism
            </span>
          </div>
          <div>
            <h2 className="m-0 mb-1 font-headline-sm text-headline-sm text-on-surface">
              No estas sola
            </h2>
            <p className="m-0 font-body-md text-body-md text-on-surface-variant">
              Esta plataforma esta disenada para guiarte paso a paso, brindando
              informacion clara y herramientas para tu proteccion.
            </p>
          </div>
        </article>

        <article className="rounded-xl border border-outline-variant/50 bg-surface-container p-4 text-left shadow-[0_2px_8px_rgba(65,95,118,0.05)]">
          <div className="mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary">info</span>
            <h2 className="m-0 font-label-lg text-label-lg text-on-surface">
              Aviso Legal
            </h2>
          </div>
          <p className="m-0 font-body-md text-sm text-on-surface-variant">
            La informacion proporcionada es orientativa y no sustituye el
            asesoramiento legal profesional o la intervencion inmediata de las
            autoridades en caso de emergencia.
          </p>
        </article>
      </section>

      <div className="mt-auto flex flex-col gap-4">
        <button
          type="button"
          onClick={() => navigate(paths.chat)}
          className="flex h-[56px] w-full items-center justify-center gap-2 rounded-[16px] bg-primary font-button text-button text-on-primary shadow-[0_4px_12px_rgba(65,95,118,0.2)] transition-opacity hover:opacity-90"
        >
          Iniciar consulta
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <Link
          to={paths.preguntasFrecuentes}
          className="flex h-[56px] w-full items-center justify-center rounded-[16px] border-2 border-primary font-button text-button text-primary transition-colors hover:bg-surface-container-low"
        >
          Ver preguntas frecuentes
        </Link>
        <p className="text-center font-body-md text-xs text-on-surface-variant/70">
          Al iniciar una consulta, reconoces que esta orientacion no reemplaza
          asesoria legal profesional ni atencion de emergencia.
        </p>
      </div>
    </main>
  )
}

function DesktopHomeContent() {
  const navigate = useNavigate()

  return (
    <main className="hidden flex-grow flex-col items-center justify-center p-container-padding md:flex">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-stack-lg text-center">
        <section className="flex flex-col items-center gap-stack-md">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-secondary-container p-4 text-on-secondary-container">
            <BalanceIcon />
          </div>
          <h1 className="m-0 max-w-2xl font-headline-lg text-headline-lg text-primary">
            Orientacion legal sobre violencia familiar en el Peru
          </h1>
          <p className="m-0 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
            No necesitas registrarte para iniciar una consulta. Tu privacidad es
            nuestra prioridad.
          </p>
        </section>

        <section className="flex w-full max-w-md flex-col justify-center gap-gutter sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(paths.chat)}
            className="flex h-[56px] flex-1 items-center justify-center rounded-xl bg-primary px-8 font-button text-button text-on-primary shadow-[0_4px_12px_rgba(93,123,147,0.15)] transition-colors hover:bg-surface-tint"
          >
            Iniciar consulta
          </button>
          <Link
            to={paths.preguntasFrecuentes}
            className="flex h-[56px] flex-1 items-center justify-center rounded-xl border-2 border-primary px-8 font-button text-button text-primary transition-colors hover:bg-surface-container-low"
          >
            Ver preguntas frecuentes
          </Link>
        </section>
        <p className="font-body-md text-xs text-on-surface-variant/70">
          Al iniciar una consulta, reconoces que esta orientacion no reemplaza
          asesoria legal profesional ni atencion de emergencia.
        </p>

        <section className="mt-8 flex w-full max-w-2xl items-start gap-4 rounded-xl border border-surface-container-highest bg-surface-container-lowest p-6 text-left shadow-[0_2px_10px_rgba(93,123,147,0.1)]">
          <span className="material-symbols-outlined mt-1 text-on-surface-variant">
            info
          </span>
          <div>
            <h2 className="m-0 mb-2 font-headline-sm text-headline-sm text-on-surface">
              Aviso Legal
            </h2>
            <p className="m-0 font-body-md text-body-md text-on-surface-variant">
              Este sistema brinda orientacion legal informativa. No reemplaza la
              asesoria legal profesional ni la atencion de emergencia.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export function HomePage() {
  return (
    <div className="home-page flex min-h-screen flex-col bg-background font-body-md text-on-surface antialiased">
      <HomeHeader />
      <MobileHomeContent />
      <DesktopHomeContent />
    </div>
  )
}
