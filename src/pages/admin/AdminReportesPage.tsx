import { useMemo, useState } from 'react'

import { MaterialIcon } from '../../components/MaterialIcon'

type ReportRange = '30d' | 'month' | 'previous' | 'year'
type ReportStatus = 'listo' | 'generando' | 'programado'

type SummaryReport = {
  title: string
  value: string
  unit?: string
  trend?: string
  trendIcon?: string
  icon: string
  tone: 'primary' | 'tertiary' | 'secondary'
}

type GeneratedReport = {
  name: string
  type: string
  date: string
  status: ReportStatus
}

const summaryReports: SummaryReport[] = [
  {
    title: 'Total de Consultas',
    value: '1,248',
    trend: '12%',
    trendIcon: 'trending_up',
    icon: 'forum',
    tone: 'primary',
  },
  {
    title: 'Promedio de Respuesta',
    value: '2.4',
    unit: 'segundos',
    trend: '0.3s',
    trendIcon: 'trending_down',
    icon: 'timer',
    tone: 'tertiary',
  },
  {
    title: 'Casos Resueltos',
    value: '98%',
    unit: 'tasa de exito',
    icon: 'task_alt',
    tone: 'secondary',
  },
]

const volumeData: Record<ReportRange, number[]> = {
  '30d': [60, 50, 30, 40, 20, 10],
  month: [66, 48, 34, 44, 24, 14],
  previous: [72, 56, 42, 47, 30, 18],
  year: [68, 52, 38, 31, 24, 12],
}

const categories = [
  { label: 'Violencia Familiar', value: 45, color: 'bg-primary' },
  { label: 'Pension de Alimentos', value: 35, color: 'bg-tertiary-container' },
  { label: 'Tramites Legales', value: 20, color: 'bg-tertiary-fixed-dim' },
]

const generatedReports: GeneratedReport[] = [
  {
    name: 'Reporte_operativo_mensual.pdf',
    type: 'PDF',
    date: '24 Oct 2023',
    status: 'listo',
  },
  {
    name: 'Resumen_consultas_anonimas.xlsx',
    type: 'XLSX',
    date: '23 Oct 2023',
    status: 'listo',
  },
  {
    name: 'Auditoria_rendimiento_rag.pdf',
    type: 'PDF',
    date: 'En proceso',
    status: 'generando',
  },
  {
    name: 'Reporte_seguridad_semanal.pdf',
    type: 'PDF',
    date: 'Programado',
    status: 'programado',
  },
]

const rangeLabels: Record<ReportRange, string> = {
  '30d': 'Ultimos 30 dias',
  month: 'Este mes',
  previous: 'Mes anterior',
  year: 'Año actual',
}

export function AdminReportesPage() {
  const [range, setRange] = useState<ReportRange>('30d')
  const [actionMessage, setActionMessage] = useState('Listo para exportar')

  const currentVolume = useMemo(() => volumeData[range], [range])

  function simulateAction(message: string) {
    setActionMessage(message)
    window.setTimeout(() => setActionMessage('Listo para exportar'), 1200)
  }

  return (
    <div className="w-full min-w-0 overflow-x-hidden space-y-stack-lg">
      <header className="flex min-w-0 flex-col gap-stack-md lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Reportes
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-on-surface md:text-4xl">
            Analisis y Reportes
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-on-surface-variant">
            Vision general del rendimiento y volumen de consultas del sistema
            AMPARA.
          </p>
        </div>

        <ReportActions
          range={range}
          actionMessage={actionMessage}
          onRangeChange={setRange}
          onExport={() => simulateAction('Preparando descarga PDF...')}
          onGenerate={() => simulateAction('Generando nuevo reporte...')}
        />
      </header>

      <section className="grid min-w-0 grid-cols-1 gap-stack-md lg:grid-cols-3">
        {summaryReports.map((report) => (
          <ReportSummaryCard key={report.title} report={report} />
        ))}
      </section>

      <section className="grid min-w-0 grid-cols-1 gap-stack-md xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
        <VolumeChartCard values={currentVolume} range={range} />
        <CategoryDistributionCard />
      </section>

      <ReportsTable
        reports={generatedReports}
        onDownload={(name) => simulateAction(`Descargando ${name}...`)}
      />
    </div>
  )
}

function ReportActions({
  range,
  actionMessage,
  onRangeChange,
  onExport,
  onGenerate,
}: {
  range: ReportRange
  actionMessage: string
  onRangeChange: (range: ReportRange) => void
  onExport: () => void
  onGenerate: () => void
}) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-2 sm:w-auto">
      <div className="flex flex-wrap items-center gap-unit">
        <label className="flex h-12 min-w-0 items-center rounded-lg border border-outline-variant bg-surface-container-low px-3">
          <MaterialIcon
            name="calendar_month"
            className="mr-2 h-5 w-5 text-[20px] text-on-surface-variant"
          />
          <span className="sr-only">Periodo de reporte</span>
          <select
            className="min-w-0 border-0 bg-transparent p-0 pr-6 text-base font-semibold text-on-surface outline-none focus:ring-0"
            value={range}
            onChange={(event) => onRangeChange(event.target.value as ReportRange)}
          >
            {Object.entries(rangeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-primary/25 bg-surface px-5 text-base font-bold text-primary transition-colors hover:bg-primary-container"
          onClick={onGenerate}
        >
          <MaterialIcon name="add_chart" className="h-5 w-5 text-[20px]" />
          Generar
        </button>

        <button
          type="button"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-bold text-on-primary shadow-sm transition-colors hover:bg-primary/90"
          onClick={onExport}
        >
          <MaterialIcon name="download" className="h-5 w-5 text-[20px]" />
          Descargar PDF
        </button>
      </div>

      <p className="text-sm font-semibold text-on-surface-variant">
        {actionMessage}
      </p>
    </div>
  )
}

function ReportSummaryCard({ report }: { report: SummaryReport }) {
  const toneClasses = {
    primary: {
      icon: 'bg-primary-container/50 text-primary',
      accent: 'bg-primary/5 group-hover:bg-primary/10',
    },
    tertiary: {
      icon: 'bg-tertiary-fixed text-tertiary',
      accent: 'bg-tertiary/5 group-hover:bg-tertiary/10',
    },
    secondary: {
      icon: 'bg-secondary-container/60 text-secondary',
      accent: 'bg-secondary/5 group-hover:bg-secondary/10',
    },
  }[report.tone]

  return (
    <article className="group relative flex min-w-0 flex-col gap-3 overflow-hidden rounded-xl border border-outline-variant/30 bg-surface p-6 shadow-[0_2px_15px_-3px_rgba(93,123,147,0.1)] transition-shadow hover:shadow-[0_4px_20px_-3px_rgba(93,123,147,0.15)]">
      <div
        className={`pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full blur-xl transition-colors ${toneClasses.accent}`}
      />
      <div className="relative flex min-w-0 items-center gap-3 text-on-surface-variant">
        <MaterialIcon
          name={report.icon}
          className={`h-11 min-h-11 w-11 min-w-11 rounded-lg text-[22px] ${toneClasses.icon}`}
        />
        <h2 className="min-w-0 text-sm font-bold uppercase tracking-wide">
          {report.title}
        </h2>
      </div>

      <div className="relative flex min-w-0 flex-wrap items-baseline gap-2">
        <strong className="text-[40px] font-bold leading-none text-on-surface">
          {report.value}
        </strong>
        {report.unit ? (
          <span className="text-base text-on-surface-variant">{report.unit}</span>
        ) : null}
        {report.trend ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary-container/60 px-2 py-0.5 text-sm font-bold text-secondary">
            <MaterialIcon
              name={report.trendIcon ?? 'trending_up'}
              className="h-4 w-4 text-[16px]"
            />
            {report.trend}
          </span>
        ) : null}
      </div>

      {report.title === 'Casos Resueltos' ? (
        <div className="relative mt-1 h-1.5 overflow-hidden rounded-full bg-surface-variant">
          <div className="h-full w-[98%] rounded-full bg-secondary" />
        </div>
      ) : null}
    </article>
  )
}

function VolumeChartCard({
  values,
  range,
}: {
  values: number[]
  range: ReportRange
}) {
  const path = buildVolumePath(values)

  return (
    <section className="flex min-w-0 flex-col gap-stack-sm rounded-xl border border-outline-variant/30 bg-surface p-6 shadow-[0_2px_15px_-3px_rgba(93,123,147,0.1)]">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-on-surface">
            Volumen de Consultas
          </h2>
          <p className="mt-1 text-sm text-on-surface-variant">
            {rangeLabels[range]}
          </p>
        </div>
        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
          aria-label="Mas opciones"
        >
          <MaterialIcon name="more_vert" className="h-5 w-5 text-[20px]" />
        </button>
      </div>

      <div className="relative min-h-[320px] overflow-hidden rounded-lg bg-surface-container-low/50 pt-8">
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-2 py-8 opacity-40">
          <div className="border-t border-outline-variant" />
          <div className="border-t border-outline-variant" />
          <div className="border-t border-outline-variant" />
          <div className="border-t border-outline-variant" />
        </div>

        <svg
          className="relative h-[280px] w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          role="img"
          aria-label="Grafico de volumen de consultas"
        >
          <defs>
            <linearGradient id="reportAreaGradient" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#415f76" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#415f76" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${path} L100,100 L0,100 Z`} fill="url(#reportAreaGradient)" />
          <path
            d={path}
            fill="none"
            stroke="#415f76"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          {values.slice(1, -1).map((value, index) => {
            const x = ((index + 1) / (values.length - 1)) * 100
            const y = value
            return (
              <circle
                key={`${x}-${value}`}
                cx={x}
                cy={y}
                fill="#ffffff"
                r="1.7"
                stroke="#415f76"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            )
          })}
        </svg>

        <div className="absolute bottom-0 flex w-full justify-between px-4 py-2 text-xs font-semibold text-on-surface-variant">
          <span>Sem 1</span>
          <span>Sem 2</span>
          <span>Sem 3</span>
          <span>Sem 4</span>
        </div>
      </div>
    </section>
  )
}

function CategoryDistributionCard() {
  return (
    <section className="flex min-w-0 flex-col gap-stack-sm rounded-xl border border-outline-variant/30 bg-surface p-6 shadow-[0_2px_15px_-3px_rgba(93,123,147,0.1)]">
      <h2 className="text-xl font-bold text-on-surface">
        Categorias de Consulta
      </h2>

      <div className="flex flex-1 flex-col justify-center gap-6">
        <div className="relative mx-auto h-48 w-48">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              fill="transparent"
              r="40"
              stroke="#f6f3f2"
              strokeWidth="16"
            />
            <circle
              cx="50"
              cy="50"
              fill="transparent"
              r="40"
              stroke="#415f76"
              strokeDasharray="251.2"
              strokeDashoffset="138.16"
              strokeWidth="16"
            />
            <circle
              className="origin-center rotate-[162deg]"
              cx="50"
              cy="50"
              fill="transparent"
              r="40"
              stroke="#627884"
              strokeDasharray="251.2"
              strokeDashoffset="62.8"
              strokeWidth="16"
            />
            <circle
              className="origin-center rotate-[288deg]"
              cx="50"
              cy="50"
              fill="transparent"
              r="40"
              stroke="#b3cad8"
              strokeDasharray="251.2"
              strokeDashoffset="200.96"
              strokeWidth="16"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <strong className="text-2xl font-bold text-on-surface">1.2k</strong>
            <span className="text-xs font-semibold text-on-surface-variant">
              Total
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.label}
              className="flex min-w-0 items-center justify-between gap-3"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className={`h-3 w-3 shrink-0 rounded-full ${category.color}`} />
                <span className="min-w-0 truncate text-sm text-on-surface">
                  {category.label}
                </span>
              </div>
              <span className="shrink-0 text-sm font-bold text-on-surface">
                {category.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ReportsTable({
  reports,
  onDownload,
}: {
  reports: GeneratedReport[]
  onDownload: (name: string) => void
}) {
  return (
    <section className="min-w-0 overflow-hidden rounded-xl border border-outline-variant/30 bg-surface shadow-[0_2px_15px_-3px_rgba(93,123,147,0.1)]">
      <div className="flex flex-col gap-2 border-b border-surface-container-highest bg-surface-container-lowest p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div>
          <h2 className="text-xl font-bold text-on-surface">
            Reportes generados
          </h2>
          <p className="mt-1 text-sm text-on-surface-variant">
            Historial local simulado de exportaciones administrativas.
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full min-w-[720px] table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[42%]" />
            <col className="w-[16%]" />
            <col className="w-[18%]" />
            <col className="w-[14%]" />
            <col className="w-[10%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-surface-container-highest bg-surface-container-low text-sm font-bold text-on-surface-variant">
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Accion</th>
            </tr>
          </thead>
          <tbody className="text-sm text-on-surface">
            {reports.map((report) => (
              <tr
                key={report.name}
                className="border-b border-surface-container-lowest transition-colors last:border-b-0 hover:bg-surface-container-lowest"
              >
                <td className="px-4 py-4">
                  <span className="block truncate font-semibold">
                    {report.name}
                  </span>
                </td>
                <td className="px-4 py-4 text-on-surface-variant">
                  {report.type}
                </td>
                <td className="px-4 py-4 text-on-surface-variant">
                  {report.date}
                </td>
                <td className="px-4 py-4">
                  <ReportStatusBadge status={report.status} />
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-full text-outline transition-colors hover:bg-primary-container hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`Descargar ${report.name}`}
                      disabled={report.status !== 'listo'}
                      onClick={() => onDownload(report.name)}
                    >
                      <MaterialIcon
                        name="download"
                        className="h-5 w-5 text-[20px]"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function ReportStatusBadge({ status }: { status: ReportStatus }) {
  const config = {
    listo: {
      label: 'Listo',
      className: 'bg-secondary-container text-on-secondary-container',
      dot: 'bg-secondary',
    },
    generando: {
      label: 'Generando',
      className: 'bg-tertiary-fixed text-on-tertiary-fixed',
      dot: 'bg-tertiary-container',
    },
    programado: {
      label: 'Programado',
      className: 'bg-surface-container-high text-on-surface-variant',
      dot: 'bg-outline',
    },
  }[status]

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${config.className}`}
    >
      <span className={`h-2 w-2 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  )
}

function buildVolumePath(values: number[]) {
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100
      return `${index === 0 ? 'M' : 'L'}${x},${value}`
    })
    .join(' ')
}
