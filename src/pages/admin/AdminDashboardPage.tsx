import { Link } from 'react-router-dom'

import { MaterialIcon } from '../../components/MaterialIcon'
import { paths } from '../../lib/routes'

type Metric = {
  title: string
  value: string
  label?: string
  icon: string
  tone: 'primary' | 'accent' | 'success' | 'neutral'
}

type Shortcut = {
  title: string
  description: string
  icon: string
  to: string
  status: string
}

type Activity = {
  title: string
  detail: string
  time: string
  icon: string
}

const metrics: Metric[] = [
  {
    title: 'Latencia promedio',
    value: '2.4s',
    icon: 'speed',
    tone: 'primary',
  },
  {
    title: 'Consultas totales',
    value: '12,450',
    label: 'Anonimas',
    icon: 'forum',
    tone: 'accent',
  },
  {
    title: 'Tasa de errores',
    value: '0.5%',
    icon: 'check_circle',
    tone: 'success',
  },
  {
    title: 'Uso del sistema',
    value: '68%',
    label: 'Capacidad',
    icon: 'memory',
    tone: 'neutral',
  },
]

const shortcuts: Shortcut[] = [
  {
    title: 'Indexacion',
    description: 'Gestiona documentos, fuentes y cola de procesamiento.',
    icon: 'folder_shared',
    to: paths.adminIndexacion,
    status: '3 fuentes pendientes',
  },
  {
    title: 'Metricas',
    description: 'Revisa calidad de respuestas, latencia y uso anonimo.',
    icon: 'monitoring',
    to: paths.adminMetricas,
    status: 'Actualizado hoy',
  },
  {
    title: 'Reportes',
    description: 'Consulta resúmenes operativos y exportaciones internas.',
    icon: 'summarize',
    to: paths.adminReportes,
    status: '2 reportes nuevos',
  },
  {
    title: 'Seguridad',
    description: 'Supervisa reglas de acceso, sesiones y eventos sensibles.',
    icon: 'shield',
    to: paths.adminSeguridad,
    status: 'Sin alertas criticas',
  },
]

const recentActivity: Activity[] = [
  {
    title: 'Indice legal actualizado',
    detail: 'Se procesaron documentos de orientación y medidas de proteccion.',
    time: 'Hace 18 min',
    icon: 'sync',
  },
  {
    title: 'Consulta anonima resuelta',
    detail: 'El asistente respondio usando referencias de la base Legal-RAG.',
    time: 'Hace 42 min',
    icon: 'chat_bubble',
  },
  {
    title: 'Revision de seguridad completada',
    detail: 'No se detectaron intentos de acceso administrativo fallidos.',
    time: 'Hace 1 h',
    icon: 'verified_user',
  },
]

export function AdminDashboardPage() {
  return (
    <div className="space-y-stack-lg">
      <header className="flex flex-col gap-stack-sm lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Administracion
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-on-surface md:text-4xl">
            Panel de Control Legal-RAG-2025
          </h1>
          <p className="mt-3 text-base leading-relaxed text-on-surface-variant">
            Vision general del rendimiento y estado del sistema de
            recuperacion.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-surface-container-highest bg-surface px-4 py-2 text-sm font-semibold text-on-surface-variant shadow-sm">
          <MaterialIcon
            name="radio_button_checked"
            className="h-5 w-5 text-[20px] text-secondary"
          />
          Operacion estable
        </div>
      </header>

      <section className="grid grid-cols-1 gap-gutter md:grid-cols-2 2xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} metric={metric} />
        ))}
      </section>

      <section className="grid gap-gutter xl:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-2xl border border-surface-container-highest bg-surface p-5 shadow-[0_2px_18px_rgba(65,95,118,0.08)] md:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-on-surface">
                Accesos del panel
              </h2>
              <p className="mt-1 text-sm text-on-surface-variant">
                Modulos administrativos principales para la operacion de AMPARA.
              </p>
            </div>
            <span className="rounded-full bg-primary-container px-3 py-1 text-xs font-bold text-primary">
              Admin
            </span>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {shortcuts.map((shortcut) => (
              <PanelAccessCard key={shortcut.title} shortcut={shortcut} />
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-surface-container-highest bg-surface p-5 shadow-[0_2px_18px_rgba(65,95,118,0.08)] md:p-6">
          <h2 className="text-xl font-bold text-on-surface">
            Estado del sistema
          </h2>
          <p className="mt-1 text-sm text-on-surface-variant">
            Señales operativas basadas en datos mock locales.
          </p>

          <div className="mt-5 space-y-3">
            <SystemStatus label="API de orientacion" value="Disponible" />
            <SystemStatus label="Base Legal-RAG" value="Sincronizada" />
            <SystemStatus label="Moderacion" value="Activa" />
          </div>
        </aside>
      </section>

      <section className="rounded-2xl border border-surface-container-highest bg-surface p-5 shadow-[0_2px_18px_rgba(65,95,118,0.08)] md:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-on-surface">
              Actividad reciente
            </h2>
            <p className="mt-1 text-sm text-on-surface-variant">
              Ultimos eventos operativos del entorno administrativo.
            </p>
          </div>
          <Link
            to={paths.adminReportes}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary-container"
          >
            Ver reportes
            <MaterialIcon name="arrow_forward" className="h-5 w-5 text-[18px]" />
          </Link>
        </div>

        <div className="mt-5 divide-y divide-surface-container-highest">
          {recentActivity.map((activity) => (
            <RecentActivityItem key={activity.title} activity={activity} />
          ))}
        </div>
      </section>
    </div>
  )
}

function MetricCard({ metric }: { metric: Metric }) {
  const toneClasses = {
    primary: {
      icon: 'bg-primary-container text-primary',
      bar: 'bg-primary',
    },
    accent: {
      icon: 'bg-tertiary-container text-tertiary',
      bar: 'bg-tertiary',
    },
    success: {
      icon: 'bg-secondary-container text-secondary',
      bar: 'bg-secondary',
    },
    neutral: {
      icon: 'bg-surface-container-high text-on-surface-variant',
      bar: 'bg-on-surface-variant',
    },
  }[metric.tone]

  return (
    <article className="flex min-w-0 flex-col gap-5 rounded-2xl border border-surface-container-highest bg-surface p-5 shadow-[0_2px_18px_rgba(65,95,118,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-on-surface-variant">
            {metric.title}
          </p>
          <div className="mt-3 flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
            <strong className="shrink-0 text-3xl font-bold leading-none text-on-surface">
              {metric.value}
            </strong>
            {metric.label ? (
              <span className="min-w-0 text-sm font-medium leading-snug text-on-surface-variant">
                {metric.label}
              </span>
            ) : null}
          </div>
        </div>
        <span
          className={`flex h-12 min-h-12 w-12 min-w-12 shrink-0 items-center justify-center rounded-full leading-none ${toneClasses.icon}`}
        >
          <span className="material-symbols-outlined flex items-center justify-center text-[22px] leading-none">
            {metric.icon}
          </span>
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-container-high">
        <div className={`h-full w-2/3 rounded-full ${toneClasses.bar}`} />
      </div>
    </article>
  )
}

function PanelAccessIcon({ icon }: { icon: string }) {
  return (
    <span className="flex h-12 min-h-12 w-12 min-w-12 shrink-0 items-center justify-center rounded-full bg-surface text-primary shadow-sm">
      <span className="material-symbols-outlined flex items-center justify-center text-[22px] leading-none">
        {icon}
      </span>
    </span>
  )
}

function PanelAccessCard({ shortcut }: { shortcut: Shortcut }) {
  return (
    <Link
      to={shortcut.to}
      className="group rounded-xl border border-surface-container-highest bg-surface-container-low p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary-container/45 hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <PanelAccessIcon icon={shortcut.icon} />
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-on-surface">{shortcut.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
            {shortcut.description}
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-wide text-secondary">
            {shortcut.status}
          </p>
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-on-surface-variant transition-colors group-hover:bg-surface group-hover:text-primary">
          <span className="material-symbols-outlined flex items-center justify-center text-[19px] leading-none">
            arrow_forward
          </span>
        </span>
      </div>
    </Link>
  )
}

function SystemStatus({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-surface-container-low px-4 py-3">
      <span className="text-sm font-semibold text-on-surface-variant">
        {label}
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-container px-3 py-1 text-xs font-bold text-secondary">
        <span className="size-1.5 rounded-full bg-secondary" />
        {value}
      </span>
    </div>
  )
}

function ActivityIcon({ icon }: { icon: string }) {
  return (
    <span className="flex h-10 min-h-10 w-10 min-w-10 shrink-0 items-center justify-center rounded-full bg-primary-container/70 text-primary">
      <span className="material-symbols-outlined flex items-center justify-center text-[20px] leading-none">
        {icon}
      </span>
    </span>
  )
}

function RecentActivityItem({ activity }: { activity: Activity }) {
  return (
    <article className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
      <ActivityIcon icon={activity.icon} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <h3 className="font-bold text-on-surface">{activity.title}</h3>
          <span className="shrink-0 text-xs font-semibold text-on-surface-variant sm:text-right">
            {activity.time}
          </span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
          {activity.detail}
        </p>
      </div>
    </article>
  )
}
