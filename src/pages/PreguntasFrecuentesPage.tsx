import { useNavigate } from 'react-router-dom'
import { UserBottomNav, UserTopNav } from '../components/UserNavigation'

const faqItems = [
  {
    title: 'Ley 30364',
    icon: 'gavel',
    description: 'Marco legal para prevenir, sancionar y erradicar la violencia familiar.',
    prompt: '¿Qué es la Ley 30364 y qué protege?',
  },
  {
    title: 'Tipos de violencia',
    icon: 'warning',
    description: 'Física, psicológica, sexual y económica o patrimonial.',
    prompt: '¿Cuáles son los tipos de violencia familiar según la ley peruana?',
  },
  {
    title: 'Medidas de protección',
    icon: 'shield',
    description: 'Acciones urgentes para reducir riesgos y proteger a la persona afectada.',
    prompt: '¿Qué medidas de protección existen para víctimas de violencia familiar?',
  },
  {
    title: 'Dónde denunciar',
    icon: 'location_on',
    description: 'Comisarías, juzgados de familia y Centros Emergencia Mujer.',
    prompt: '¿Dónde puedo denunciar violencia familiar en Perú?',
  },
  {
    title: 'Línea 100',
    icon: 'call',
    description: 'Servicio gratuito de orientación y ayuda frente a violencia familiar.',
    prompt: '¿Qué es la Línea 100 y cómo me puede ayudar?',
  },
  {
    title: 'CEM',
    icon: 'support_agent',
    description: 'Atención psicológica, social y legal en Centros Emergencia Mujer.',
    prompt: '¿Qué son los Centros Emergencia Mujer y qué servicios ofrecen?',
  },
]

function QuickExitButton() {
  return (
    <button
      type="button"
      className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#E57373] font-button text-button text-on-error shadow-lg md:hidden"
      onClick={() => {
        window.location.assign('https://www.google.com')
      }}
      aria-label="Salida rápida"
    >
      <span className="material-symbols-outlined">exit_to_app</span>
    </button>
  )
}

function FaqCard({
  title,
  icon,
  description,
  onClick,
}: {
  title: string
  icon: string
  description: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-h-16 flex-col gap-2 rounded-xl border border-outline-variant/50 bg-surface-container-low p-4 text-left shadow-[0_2px_8px_rgba(93,123,147,0.05)] transition-colors hover:bg-surface-container-high"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-button text-button text-on-surface">{title}</span>
        <span className="material-symbols-outlined text-primary transition-transform group-hover:scale-105">
          {icon}
        </span>
      </div>
      <p className="font-body-md text-sm leading-relaxed text-on-surface-variant">
        {description}
      </p>
    </button>
  )
}

export function PreguntasFrecuentesPage() {
  const navigate = useNavigate()

  return (
    <div className="faq-page flex min-h-dvh flex-col bg-background pb-24 font-body-md text-on-background md:pb-0">
      <UserTopNav active="resources" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-container-padding py-stack-lg md:px-12">
        <section className="mb-stack-lg">
          <h1 className="m-0 mb-2 font-headline-lg text-headline-lg text-primary">
            Preguntas Frecuentes
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Selecciona un tema para recibir orientación inmediata.
          </p>
        </section>

        <section className="mb-stack-lg grid grid-cols-1 gap-gutter sm:grid-cols-2">
          {faqItems.map((item) => (
            <FaqCard
              key={item.title}
              title={item.title}
              icon={item.icon}
              description={item.description}
              onClick={() =>
                navigate('/chat?q=' + encodeURIComponent(item.prompt))
              }
            />
          ))}
        </section>
      </main>
      <QuickExitButton />
      <UserBottomNav active="resources" />
    </div>
  )
}
