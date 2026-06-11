import { useState } from 'react'

import { MaterialIcon } from '../../components/MaterialIcon'

type AuditStatus = 'exito' | 'fallido' | 'revision'

type HealthItem = {
  label: string
  value: string
  icon: string
}

type AuditLog = {
  timestamp: string
  adminId: string
  action: string
  status: AuditStatus
}

const healthItems: HealthItem[] = [
  { label: 'Estado SSL', value: 'Valido', icon: 'check_circle' },
  { label: 'Conexion Base de Datos', value: 'Estable', icon: 'check_circle' },
  { label: 'Estado del Firewall', value: 'Activo', icon: 'check_circle' },
]

const auditLogs: AuditLog[] = [
  {
    timestamp: '2023-10-27 14:32',
    adminId: 'ADM-092',
    action: 'Actualizacion de politica de retencion',
    status: 'exito',
  },
  {
    timestamp: '2023-10-27 11:15',
    adminId: 'ADM-045',
    action: 'Acceso a logs de sistema',
    status: 'exito',
  },
  {
    timestamp: '2023-10-26 18:45',
    adminId: 'ADM-112',
    action: 'Intento de login fallido',
    status: 'fallido',
  },
  {
    timestamp: '2023-10-26 09:20',
    adminId: 'SYSTEM',
    action: 'Rotacion de llaves de encriptacion',
    status: 'exito',
  },
  {
    timestamp: '2023-10-25 16:00',
    adminId: 'ADM-092',
    action: 'Reindexacion de base de conocimiento (Manual)',
    status: 'exito',
  },
]

export function AdminSeguridadPage() {
  const [autoAnonymization, setAutoAnonymization] = useState(true)
  const [sensitiveMonitor, setSensitiveMonitor] = useState(true)
  const [retention, setRetention] = useState('30')
  const [message, setMessage] = useState('Politicas de seguridad activas')

  function simulateAction(nextMessage: string) {
    setMessage(nextMessage)
    window.setTimeout(() => setMessage('Politicas de seguridad activas'), 1200)
  }

  return (
    <div className="w-full min-w-0 overflow-x-hidden space-y-stack-lg">
      <header className="flex min-w-0 flex-col gap-stack-md lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Seguridad
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-on-surface md:text-4xl">
            Seguridad y Privacidad
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-on-surface-variant md:text-lg">
            Gestione las politicas de retencion, acceso y monitorizacion del
            sistema AMPARA.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto">
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-surface px-6 text-base font-bold text-primary shadow-sm transition-colors hover:bg-surface-container-highest"
            onClick={() => simulateAction('Exportando log de auditoria...')}
          >
            <MaterialIcon name="download" className="h-5 w-5 text-[20px]" />
            Exportar log de auditoria
          </button>
          <p className="text-sm font-semibold text-on-surface-variant">
            {message}
          </p>
        </div>
      </header>

      <section className="grid min-w-0 grid-cols-1 gap-stack-md xl:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.18fr)]">
        <div className="flex min-w-0 flex-col gap-stack-md">
          <SystemHealthCard items={healthItems} />
          <PrivacySettingsCard
            autoAnonymization={autoAnonymization}
            sensitiveMonitor={sensitiveMonitor}
            retention={retention}
            onAutoAnonymizationChange={setAutoAnonymization}
            onSensitiveMonitorChange={setSensitiveMonitor}
            onRetentionChange={setRetention}
          />
        </div>

        <SecurityEventTable
          logs={auditLogs}
          onFilter={() => simulateAction('Filtro aplicado visualmente')}
          onReview={(action) => simulateAction(`Revisando: ${action}`)}
        />
      </section>
    </div>
  )
}

function SystemHealthCard({ items }: { items: HealthItem[] }) {
  return (
    <section className="min-w-0 rounded-xl border border-surface-container-high bg-surface p-5 shadow-[0_4px_20px_rgba(93,123,147,0.08)] md:p-6">
      <div className="flex items-center gap-3">
        <MaterialIcon
          name="monitor_heart"
          className="h-11 w-11 rounded-full bg-primary-container text-[23px] text-primary"
        />
        <h2 className="text-xl font-bold text-on-surface">
          Estado del Sistema
        </h2>
      </div>
      <p className="mt-3 text-base leading-relaxed text-on-surface-variant">
        Monitoreo en tiempo real de los componentes criticos de seguridad.
      </p>

      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex min-w-0 items-center justify-between gap-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <MaterialIcon
                name={item.icon}
                className="h-5 w-5 text-[20px] text-secondary"
              />
              <span className="min-w-0 text-base text-on-surface">
                {item.label}
              </span>
            </div>
            <span className="shrink-0 rounded-md bg-secondary-container px-2 py-1 text-sm font-bold text-secondary">
              {item.value}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function PrivacySettingsCard({
  autoAnonymization,
  sensitiveMonitor,
  retention,
  onAutoAnonymizationChange,
  onSensitiveMonitorChange,
  onRetentionChange,
}: {
  autoAnonymization: boolean
  sensitiveMonitor: boolean
  retention: string
  onAutoAnonymizationChange: (value: boolean) => void
  onSensitiveMonitorChange: (value: boolean) => void
  onRetentionChange: (value: string) => void
}) {
  return (
    <section className="min-w-0 rounded-xl border border-surface-container-high bg-surface p-5 shadow-[0_4px_20px_rgba(93,123,147,0.08)] md:p-6">
      <div className="flex items-center gap-3">
        <MaterialIcon
          name="shield_lock"
          className="h-12 min-h-12 w-12 min-w-12 rounded-full bg-primary-container/80 text-[22px] text-primary"
        />
        <h2 className="text-xl font-bold text-on-surface">
          Configuracion de Privacidad
        </h2>
      </div>
      <p className="mt-3 text-base leading-relaxed text-on-surface-variant">
        Ajustes para garantizar la proteccion de datos sensibles.
      </p>

      <div className="mt-6 space-y-3">
        <SecurityRuleCard
          title="Anonimizacion automatica"
          description="Oculta PII en las respuestas del RAG"
          checked={autoAnonymization}
          onChange={onAutoAnonymizationChange}
        />

        <div className="rounded-lg bg-surface-container-low p-3">
          <label
            className="block text-sm font-bold text-on-surface"
            htmlFor="retention"
          >
            Periodo de retencion de datos
          </label>
          <select
            id="retention"
            className="mt-2 block w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-base text-on-surface outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
            value={retention}
            onChange={(event) => onRetentionChange(event.target.value)}
          >
            <option value="30">30 dias (Recomendado)</option>
            <option value="60">60 dias</option>
            <option value="90">90 dias</option>
          </select>
        </div>

        <SecurityRuleCard
          title="Monitor de contenido sensible"
          description="Marca consultas que requieren revision"
          checked={sensitiveMonitor}
          onChange={onSensitiveMonitorChange}
        />

        <SecurityRuleCard
          title="Encriptacion de BD"
          description="AES-256 en reposo"
          checked
          disabled
          onChange={() => undefined}
        />
      </div>
    </section>
  )
}

function SecurityRuleCard({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  title: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-4 rounded-lg bg-surface-container-low p-3">
      <div className="min-w-0">
        <p className="font-bold text-on-surface">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
          {description}
        </p>
      </div>
      <SecurityToggle
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  )
}

function SecurityToggle({
  checked,
  disabled,
  onChange,
}: {
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        checked ? 'bg-primary' : 'bg-surface-variant'
      } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
      onClick={() => onChange(!checked)}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full border border-outline-variant bg-white shadow-sm transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

function SecurityEventTable({
  logs,
  onFilter,
  onReview,
}: {
  logs: AuditLog[]
  onFilter: () => void
  onReview: (action: string) => void
}) {
  return (
    <section className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-surface-container-high bg-surface shadow-[0_4px_20px_rgba(93,123,147,0.08)]">
      <div className="flex flex-col gap-3 border-b border-surface-container-high bg-surface-bright p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div className="min-w-0">
          <h2 className="flex min-w-0 items-center gap-2 text-xl font-bold text-on-surface">
            <MaterialIcon
              name="manage_history"
              className="h-6 w-6 text-[24px] text-primary"
            />
            <span className="min-w-0 truncate">Registro de Auditoria</span>
          </h2>
          <p className="mt-1 text-base text-on-surface-variant">
            Ultimas acciones administrativas en el sistema.
          </p>
        </div>
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary-container/30"
          aria-label="Filtrar registro"
          onClick={onFilter}
        >
          <MaterialIcon name="filter_list" className="h-5 w-5 text-[20px]" />
        </button>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full min-w-[760px] table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[23%]" />
            <col className="w-[15%]" />
            <col className="w-[40%]" />
            <col className="w-[14%]" />
            <col className="w-[8%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-surface-container-high bg-surface-container-low text-sm font-bold text-on-surface-variant">
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">Admin ID</th>
              <th className="px-4 py-3">Accion</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Revisar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-high text-base text-on-surface">
            {logs.map((log) => (
              <AuditLogRow key={`${log.timestamp}-${log.action}`} log={log} onReview={onReview} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-auto flex justify-center border-t border-surface-container-high bg-surface-bright p-4">
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

function AuditLogRow({
  log,
  onReview,
}: {
  log: AuditLog
  onReview: (action: string) => void
}) {
  return (
    <tr className="transition-colors hover:bg-surface-container-low/60">
      <td className="px-4 py-4 text-on-surface-variant">{log.timestamp}</td>
      <td className="px-4 py-4 font-bold">{log.adminId}</td>
      <td className="px-4 py-4">
        <span className="block truncate">{log.action}</span>
      </td>
      <td className="px-4 py-4">
        <SecurityStatusBadge status={log.status} />
      </td>
      <td className="px-4 py-4">
        <div className="flex justify-end">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-outline transition-colors hover:bg-primary-container hover:text-primary"
            aria-label={`Revisar ${log.action}`}
            onClick={() => onReview(log.action)}
          >
            <MaterialIcon name="visibility" className="h-5 w-5 text-[20px]" />
          </button>
        </div>
      </td>
    </tr>
  )
}

function SecurityStatusBadge({ status }: { status: AuditStatus }) {
  const config = {
    exito: {
      label: 'Exito',
      icon: 'check',
      className: 'bg-secondary-container text-on-secondary-container',
    },
    fallido: {
      label: 'Fallido',
      icon: 'warning',
      className: 'bg-error-container text-on-error-container',
    },
    revision: {
      label: 'Revision',
      icon: 'rate_review',
      className: 'bg-tertiary-fixed text-on-tertiary-fixed',
    },
  }[status]

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-bold ${config.className}`}
    >
      <MaterialIcon name={config.icon} className="h-4 w-4 text-[16px]" />
      {config.label}
    </span>
  )
}
