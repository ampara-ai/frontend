import { useMemo, useState } from 'react'

import { MaterialIcon } from '../../components/MaterialIcon'

type RangeFilter = '24h' | '7d' | '30d'

type SummaryMetric = {
  title: string
  value: string
  label?: string
  icon: string
  tone: 'primary' | 'tertiary' | 'secondary'
}

type Interaction = {
  timestamp: string
  userId: string
  category: string
  status: 'resuelta' | 'derivada' | 'bloqueada'
}

const summaryMetrics: SummaryMetric[] = [
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
    tone: 'tertiary',
  },
  {
    title: 'Tasa de errores',
    value: '0.5%',
    icon: 'check_circle',
    tone: 'secondary',
  },
  {
    title: 'Uso del sistema',
    value: '68%',
    label: 'Capacidad',
    icon: 'memory',
    tone: 'primary',
  },
]

const chartDataByRange: Record<RangeFilter, number[]> = {
  '24h': [40, 60, 45, 80, 55, 70, 90, 65, 50, 85],
  '7d': [58, 66, 72, 61, 84, 77, 92, 69, 73, 88],
  '30d': [45, 52, 64, 59, 71, 68, 80, 76, 83, 90],
}

const interactions: Interaction[] = [
  {
    timestamp: 'Hace 2 min',
    userId: 'usr_8f92...a1b',
    category: 'Orientacion',
    status: 'resuelta',
  },
  {
    timestamp: 'Hace 5 min',
    userId: 'usr_3c4d...9e2',
    category: 'Recursos',
    status: 'resuelta',
  },
  {
    timestamp: 'Hace 12 min',
    userId: 'usr_7x1y...p4q',
    category: 'Derivacion',
    status: 'derivada',
  },
  {
    timestamp: 'Hace 18 min',
    userId: 'usr_2m9n...v5w',
    category: 'Seguridad',
    status: 'bloqueada',
  },
  {
    timestamp: 'Hace 24 min',
    userId: 'usr_5k3l...j8r',
    category: 'Orientacion',
    status: 'resuelta',
  },
]

const trendItems = [
  { label: 'Respuestas con contexto recuperado', value: 91, tone: 'primary' },
  { label: 'Consultas anonimas completadas', value: 86, tone: 'secondary' },
  { label: 'Interacciones derivadas a recursos', value: 34, tone: 'tertiary' },
]

export function AdminMetricasPage() {
  const [range, setRange] = useState<RangeFilter>('24h')

  const chartData = useMemo(() => chartDataByRange[range], [range])

  return (
    <div className="w-full min-w-0 overflow-x-hidden space-y-stack-lg">
      <header className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Metricas
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-on-surface md:text-4xl">
            Panel de Control Legal-RAG-2025
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-on-surface-variant md:text-lg">
            Vision general del rendimiento, uso y estado operativo del sistema
            de recuperacion.
          </p>
        </div>

        <MetricFilter activeRange={range} onChange={setRange} />
      </header>

      <section className="grid grid-cols-1 gap-gutter md:grid-cols-2 2xl:grid-cols-4">
        {summaryMetrics.map((metric) => (
          <MetricSummaryCard key={metric.title} metric={metric} />
        ))}
      </section>

      <section className="grid min-w-0 grid-cols-1 gap-gutter xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.85fr)]">
        <MetricChartCard range={range} values={chartData} />
        <InteractionsTable interactions={interactions} />
      </section>

      <section className="grid min-w-0 grid-cols-1 gap-gutter lg:grid-cols-3">
        {trendItems.map((item) => (
          <MetricTrendItem key={item.label} item={item} />
        ))}
      </section>
    </div>
  )
}

function MetricFilter({
  activeRange,
  onChange,
}: {
  activeRange: RangeFilter
  onChange: (range: RangeFilter) => void
}) {
  const filters: Array<{ value: RangeFilter; label: string }> = [
    { value: '24h', label: '24h' },
    { value: '7d', label: '7 dias' },
    { value: '30d', label: '30 dias' },
  ]

  return (
    <div className="flex w-fit rounded-full border border-surface-container-highest bg-surface p-1 shadow-sm">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={
            activeRange === filter.value
              ? 'rounded-full bg-primary px-4 py-2 text-sm font-bold text-on-primary'
              : 'rounded-full px-4 py-2 text-sm font-bold text-on-surface-variant transition-colors hover:bg-surface-container-high'
          }
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}

function MetricSummaryCard({ metric }: { metric: SummaryMetric }) {
  const toneClasses = {
    primary: {
      icon: 'bg-primary-container text-primary',
      bar: 'bg-primary',
      value: 'text-on-surface',
    },
    tertiary: {
      icon: 'bg-tertiary-fixed text-tertiary',
      bar: 'bg-tertiary',
      value: 'text-on-surface',
    },
    secondary: {
      icon: 'bg-secondary-container text-secondary',
      bar: 'bg-secondary',
      value: 'text-secondary',
    },
  }[metric.tone]

  return (
    <article className="flex min-w-0 flex-col gap-5 rounded-xl border border-surface-container-highest bg-surface p-5 shadow-[0_2px_12px_rgba(65,95,118,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-on-surface-variant">
            {metric.title}
          </p>
          <div className="mt-3 flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
            <strong
              className={`shrink-0 text-3xl font-bold leading-none ${toneClasses.value}`}
            >
              {metric.value}
            </strong>
            {metric.label ? (
              <span className="min-w-0 text-sm font-semibold leading-snug text-outline">
                {metric.label}
              </span>
            ) : null}
          </div>
        </div>
        <MaterialIcon
          name={metric.icon}
          className={`h-12 min-h-12 w-12 min-w-12 rounded-full text-[22px] ${toneClasses.icon}`}
        />
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-container-high">
        <div className={`h-full w-2/3 rounded-full ${toneClasses.bar}`} />
      </div>
    </article>
  )
}

function MetricChartCard({
  range,
  values,
}: {
  range: RangeFilter
  values: number[]
}) {
  return (
    <section className="min-w-0 rounded-xl border border-surface-container-highest bg-surface p-5 shadow-[0_2px_12px_rgba(65,95,118,0.06)] md:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-on-surface">
            Actividad del Sistema
          </h2>
          <p className="mt-1 text-sm text-on-surface-variant">
            {range === '24h'
              ? 'Ultimas 24h'
              : range === '7d'
                ? 'Ultimos 7 dias'
                : 'Ultimos 30 dias'}
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-container px-3 py-1 text-xs font-bold text-primary">
          <MaterialIcon name="monitoring" className="h-4 w-4 text-[16px]" />
          Datos mock
        </span>
      </div>

      <div className="mt-6 flex min-h-[220px] w-full items-end gap-2 border-b border-surface-container-highest pt-4">
        {values.map((value, index) => (
          <div
            key={`${range}-${index}`}
            className={
              index === values.length - 1
                ? 'flex-1 rounded-t-sm bg-primary transition-colors hover:bg-primary/80'
                : 'flex-1 rounded-t-sm bg-primary-container/60 transition-colors hover:bg-primary/60'
            }
            style={{ height: `${value}%` }}
            title={`Actividad ${value}%`}
          />
        ))}
      </div>

      <div className="mt-2 flex justify-between text-sm font-semibold text-on-surface-variant">
        <span>{range === '24h' ? '00:00' : 'Inicio'}</span>
        <span>{range === '24h' ? '12:00' : 'Medio'}</span>
        <span>{range === '24h' ? '24:00' : 'Actual'}</span>
      </div>
    </section>
  )
}

function InteractionsTable({ interactions }: { interactions: Interaction[] }) {
  return (
    <section className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-surface-container-highest bg-surface shadow-[0_2px_12px_rgba(65,95,118,0.06)]">
      <div className="border-b border-surface-container-highest bg-surface-container-lowest p-5 md:p-6">
        <h2 className="text-xl font-bold text-on-surface">
          Ultimas interacciones
        </h2>
        <p className="mt-1 text-sm text-on-surface-variant">
          Registro anonimo reciente.
        </p>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full min-w-[520px] table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[34%]" />
            <col className="w-[30%]" />
            <col className="w-[22%]" />
            <col className="w-[14%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-surface-container-highest bg-surface-container-low text-sm font-bold text-on-surface-variant">
              <th className="px-4 py-3">Marca de tiempo</th>
              <th className="px-4 py-3">ID Anonimo</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3 text-right">Estado</th>
            </tr>
          </thead>
          <tbody className="text-sm text-on-surface">
            {interactions.map((interaction, index) => (
              <InteractionRow
                key={interaction.userId}
                interaction={interaction}
                even={index % 2 === 1}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-surface-container-highest bg-surface-container-lowest p-4 text-center">
        <button
          type="button"
          className="text-sm font-bold text-primary transition-colors hover:text-primary/80"
        >
          Ver registro completo
        </button>
      </div>
    </section>
  )
}

function InteractionRow({
  interaction,
  even,
}: {
  interaction: Interaction
  even: boolean
}) {
  return (
    <tr
      className={`border-b border-surface-container-lowest transition-colors last:border-b-0 hover:bg-surface-container-lowest ${
        even ? 'bg-surface-bright' : ''
      }`}
    >
      <td className="px-4 py-3 text-on-surface-variant">
        {interaction.timestamp}
      </td>
      <td className="px-4 py-3 font-mono text-xs">{interaction.userId}</td>
      <td className="px-4 py-3">
        <span className="block truncate">{interaction.category}</span>
      </td>
      <td className="px-4 py-3 text-right">
        <InteractionStatus status={interaction.status} />
      </td>
    </tr>
  )
}

function InteractionStatus({ status }: { status: Interaction['status'] }) {
  const config = {
    resuelta: {
      label: 'OK',
      className: 'bg-secondary-container text-on-secondary-container',
    },
    derivada: {
      label: 'Der.',
      className: 'bg-tertiary-fixed text-on-tertiary-fixed',
    },
    bloqueada: {
      label: 'Rev.',
      className: 'bg-error-container text-on-error-container',
    },
  }[status]

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-bold ${config.className}`}
    >
      {config.label}
    </span>
  )
}

function MetricTrendItem({
  item,
}: {
  item: { label: string; value: number; tone: string }
}) {
  const barColor =
    item.tone === 'secondary'
      ? 'bg-secondary'
      : item.tone === 'tertiary'
        ? 'bg-tertiary'
        : 'bg-primary'

  return (
    <article className="min-w-0 rounded-xl border border-surface-container-highest bg-surface p-5 shadow-[0_2px_12px_rgba(65,95,118,0.06)]">
      <div className="flex items-center justify-between gap-4">
        <p className="min-w-0 text-sm font-semibold text-on-surface-variant">
          {item.label}
        </p>
        <strong className="shrink-0 text-xl font-bold text-on-surface">
          {item.value}%
        </strong>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-container-high">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${item.value}%` }}
        />
      </div>
    </article>
  )
}
