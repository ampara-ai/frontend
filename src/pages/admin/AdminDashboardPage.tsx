import { useEffect, useState } from 'react'

import { MaterialIcon } from '../../components/MaterialIcon'
import { type DashboardResponse, getDashboard } from '../../lib/adminApi'

type ServiceState = 'online' | 'degraded' | 'offline'

function formatLatency(ms: number): string {
  return `${(ms / 1000).toFixed(1)}s`
}

function formatNumber(n: number): string {
  return n.toLocaleString('es-PE')
}

function formatPercent(p: number): string {
  return `${p}%`
}

export function AdminDashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getDashboard()
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-stack-lg">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Administracion
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-on-surface md:text-4xl">
          Panel de Control
        </h1>
        <p className="mt-3 text-base leading-relaxed text-on-surface-variant">
          Estado general del sistema Legal-RAG.
        </p>
      </header>

      {error ? (
        <p className="rounded-xl bg-error-container px-4 py-3 text-sm font-semibold text-on-error-container">
          {error}
        </p>
      ) : null}

      <section className="grid grid-cols-1 gap-gutter md:grid-cols-3">
        <MetricCard
          title="Latencia promedio"
          value={data ? formatLatency(data.metrics.avg_latency_ms) : '—'}
          icon="speed"
          tone="primary"
          loading={loading}
        />
        <MetricCard
          title="Consultas totales"
          value={data ? formatNumber(data.metrics.total_queries) : '—'}
          label="Anonimas"
          icon="forum"
          tone="accent"
          loading={loading}
        />
        <MetricCard
          title="Tasa de errores"
          value={data ? formatPercent(data.metrics.error_rate_pct) : '—'}
          icon="check_circle"
          tone="success"
          loading={loading}
        />
      </section>

      <section className="rounded-2xl border border-surface-container-highest bg-surface p-5 shadow-[0_2px_18px_rgba(65,95,118,0.08)] md:p-6">
        <h2 className="text-xl font-bold text-on-surface">Estado del sistema</h2>
        <p className="mt-1 text-sm text-on-surface-variant">
          Disponibilidad de los servicios principales.
        </p>
        <div className="mt-5 space-y-3">
          <SystemStatus
            label="API RAG"
            status={data?.services.rag_api ?? null}
            loading={loading}
          />
          <SystemStatus
            label="Servicio de inferencia"
            status={data?.services.inference_service ?? null}
            loading={loading}
          />
        </div>
      </section>
    </div>
  )
}

function MetricCard({
  title,
  value,
  label,
  icon,
  tone,
  loading,
}: {
  title: string
  value: string
  label?: string
  icon: string
  tone: 'primary' | 'accent' | 'success'
  loading: boolean
}) {
  const toneClasses = {
    primary: { icon: 'bg-primary-container text-primary', bar: 'bg-primary' },
    accent: { icon: 'bg-tertiary-container text-tertiary', bar: 'bg-tertiary' },
    success: { icon: 'bg-secondary-container text-secondary', bar: 'bg-secondary' },
  }[tone]

  return (
    <article className="flex min-w-0 flex-col gap-5 rounded-2xl border border-surface-container-highest bg-surface p-5 shadow-[0_2px_18px_rgba(65,95,118,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-on-surface-variant">{title}</p>
          <div className="mt-3 flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
            <strong
              className={`shrink-0 text-3xl font-bold leading-none text-on-surface ${loading ? 'opacity-40' : ''}`}
            >
              {value}
            </strong>
            {label ? (
              <span className="min-w-0 text-sm font-medium leading-snug text-on-surface-variant">
                {label}
              </span>
            ) : null}
          </div>
        </div>
        <span
          className={`flex h-12 min-h-12 w-12 min-w-12 shrink-0 items-center justify-center rounded-full leading-none ${toneClasses.icon}`}
        >
          <MaterialIcon name={icon} className="text-[22px]" />
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-container-high">
        <div className={`h-full w-2/3 rounded-full ${toneClasses.bar}`} />
      </div>
    </article>
  )
}

const SERVICE_LABELS: Record<ServiceState, string> = {
  online: 'Operativo',
  degraded: 'Degradado',
  offline: 'Sin conexion',
}

const SERVICE_BADGE: Record<ServiceState, string> = {
  online: 'bg-secondary-container text-secondary',
  degraded: 'bg-tertiary-container text-tertiary',
  offline: 'bg-error-container text-on-error-container',
}

const SERVICE_DOT: Record<ServiceState, string> = {
  online: 'bg-secondary',
  degraded: 'bg-tertiary',
  offline: 'bg-error',
}

function SystemStatus({
  label,
  status,
  loading,
}: {
  label: string
  status: ServiceState | null
  loading: boolean
}) {
  const badgeClass =
    status ? SERVICE_BADGE[status] : 'bg-surface-container-high text-on-surface-variant'
  const dotClass = status ? SERVICE_DOT[status] : 'bg-outline'
  const statusText = loading ? '...' : (status ? SERVICE_LABELS[status] : 'Sin datos')

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-surface-container-low px-4 py-3">
      <span className="text-sm font-semibold text-on-surface-variant">{label}</span>
      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${badgeClass}`}>
        <span className={`size-1.5 rounded-full ${dotClass}`} />
        {statusText}
      </span>
    </div>
  )
}
