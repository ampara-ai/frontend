import { type ChangeEvent, useMemo, useRef, useState } from 'react'

import { MaterialIcon } from '../../components/MaterialIcon'
import { type UploadResponse, uploadDocument } from '../../lib/adminApi'

type DocumentStatus = 'activo' | 'procesando' | 'pendiente' | 'error'

type IndexedDocument = {
  name: string
  type: 'pdf' | 'docx'
  uploadedAt: string
  status: DocumentStatus
}

type QueueItem = {
  name: string
  progress: number
  status: DocumentStatus
  message: string
}

const indexedDocuments: IndexedDocument[] = [
  {
    name: 'Ley_30364_actualizada.pdf',
    type: 'pdf',
    uploadedAt: '24 Oct 2023',
    status: 'activo',
  },
  {
    name: 'Guia_Atencion_CEM_2023.docx',
    type: 'docx',
    uploadedAt: '22 Oct 2023',
    status: 'activo',
  },
  {
    name: 'Reglamento_Ley_30364.pdf',
    type: 'pdf',
    uploadedAt: '15 Oct 2023',
    status: 'procesando',
  },
  {
    name: 'Jurisprudencia_Violencia_Familiar_2022.pdf',
    type: 'pdf',
    uploadedAt: '10 Oct 2023',
    status: 'activo',
  },
]

const queueItems: QueueItem[] = [
  {
    name: 'Ley_30364_actualizada.pdf',
    progress: 100,
    status: 'activo',
    message: 'Indexado con exito',
  },
  {
    name: 'Reglamento_Ley_30364.pdf',
    progress: 64,
    status: 'procesando',
    message: 'Extrayendo fragmentos normativos',
  },
  {
    name: 'Protocolos_CEM_2024.docx',
    progress: 15,
    status: 'pendiente',
    message: 'En cola de procesamiento',
  },
]

export function AdminIndexacionPage() {
  const [query, setQuery] = useState('')
  const [syncState, setSyncState] = useState<'idle' | 'syncing' | 'done'>(
    'idle',
  )

  const filteredDocuments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return indexedDocuments
    }

    return indexedDocuments.filter((document) =>
      document.name.toLowerCase().includes(normalizedQuery),
    )
  }, [query])

  function handleSync() {
    setSyncState('syncing')
    window.setTimeout(() => setSyncState('done'), 900)
  }

  const syncLabel =
    syncState === 'syncing'
      ? 'Actualizando base...'
      : syncState === 'done'
        ? 'Base actualizada'
        : 'Actualizar base de conocimientos'

  return (
    <div className="w-full min-w-0 overflow-x-hidden space-y-stack-lg">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Indexacion
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-on-surface md:text-4xl">
          Gestion de Base de Conocimientos
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-on-surface-variant md:text-lg">
          Sube, actualiza y gestiona los documentos normativos que alimentan el
          sistema Legal-RAG de AMPARA.
        </p>
      </header>

      <section className="grid min-w-0 grid-cols-1 gap-stack-md 2xl:grid-cols-[0.82fr_minmax(0,1.18fr)]">
        <div className="flex min-w-0 flex-col gap-stack-md">
          <UploadCard />

          <IndexingStatusCard queueItems={queueItems} />

          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-bold text-on-primary shadow-[0_4px_14px_rgba(65,95,118,0.2)] transition-colors hover:bg-primary/90 disabled:cursor-wait disabled:opacity-80"
            onClick={handleSync}
            disabled={syncState === 'syncing'}
          >
            <MaterialIcon
              name={syncState === 'syncing' ? 'progress_activity' : 'sync'}
              className="h-5 w-5 text-[21px]"
            />
            {syncLabel}
          </button>
        </div>

        <SourceTable
          documents={filteredDocuments}
          query={query}
          onQueryChange={setQuery}
        />
      </section>
    </div>
  )
}

type UploadState = 'idle' | 'uploading' | 'success' | 'error'

function UploadCard() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadState, setUploadState] = useState<UploadState>('idle')
  const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null)
  const [uploadError, setUploadError] = useState('')

  function handleSelectFile() {
    fileInputRef.current?.click()
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null
    setSelectedFile(file)
    setUploadState('idle')
    setUploadResult(null)
    setUploadError('')
  }

  async function handleUpload() {
    if (!selectedFile) return
    setUploadState('uploading')
    setUploadResult(null)
    setUploadError('')

    try {
      const result = await uploadDocument(selectedFile)
      setUploadResult(result)
      setUploadState('success')
      setSelectedFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (err) {
      setUploadError((err as Error).message)
      setUploadState('error')
    }
  }

  return (
    <section className="min-w-0 rounded-xl border border-surface-variant bg-surface p-5 shadow-[0_4px_20px_rgba(65,95,118,0.05)] md:p-6">
      <h2 className="flex items-center gap-2 text-xl font-bold text-primary">
        <MaterialIcon name="upload_file" className="h-6 w-6 text-[24px]" />
        Cargar documento
      </h2>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="sr-only"
        onChange={handleFileChange}
      />

      <div className="mt-4 flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-lowest p-6 text-center transition-colors hover:bg-surface-container-low">
        <MaterialIcon
          name="cloud_upload"
          className="h-14 w-14 rounded-full bg-surface-container-high text-[32px] text-outline"
        />
        <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
          Arrastra y suelta tu archivo aqui
        </p>
        <p className="mt-2 text-sm font-semibold text-outline">o</p>
        <button
          type="button"
          className="mt-4 rounded-xl border-2 border-primary px-6 py-2 text-base font-bold text-primary transition-colors hover:bg-primary-container hover:text-on-primary-container"
          onClick={handleSelectFile}
          disabled={uploadState === 'uploading'}
        >
          Explorar Archivos
        </button>
        <p className="mt-4 text-sm font-semibold text-outline">
          Soporta PDF, DOCX (Max 50MB)
        </p>

        {selectedFile ? (
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-secondary-container px-3 py-1 text-sm font-bold text-secondary">
            <MaterialIcon name="draft" className="h-4 w-4 text-[17px]" />
            {selectedFile.name}
          </p>
        ) : null}
      </div>

      {selectedFile && uploadState !== 'uploading' ? (
        <button
          type="button"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-3 text-base font-bold text-on-secondary transition-colors hover:bg-secondary/90"
          onClick={handleUpload}
        >
          <MaterialIcon name="upload" className="h-5 w-5 text-[20px]" />
          Subir documento
        </button>
      ) : null}

      {uploadState === 'uploading' ? (
        <p className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-on-surface-variant">
          <MaterialIcon name="progress_activity" className="h-4 w-4 text-[16px]" />
          Subiendo y procesando documento...
        </p>
      ) : null}

      {uploadState === 'success' && uploadResult ? (
        <p className="mt-4 rounded-lg bg-secondary-container px-4 py-3 text-sm font-semibold text-on-secondary-container">
          ✓ &quot;{uploadResult.filename}&quot; indexado — {uploadResult.chunks_created} fragmentos añadidos al RAG
        </p>
      ) : null}

      {uploadState === 'error' ? (
        <p className="mt-4 rounded-lg bg-error-container px-4 py-3 text-sm font-semibold text-on-error-container">
          ✗ {uploadError}
        </p>
      ) : null}
    </section>
  )
}

function IndexingStatusCard({ queueItems }: { queueItems: QueueItem[] }) {
  return (
    <section className="min-w-0 rounded-xl border border-secondary-fixed bg-secondary-container p-5 shadow-[0_4px_20px_rgba(78,105,83,0.05)] md:p-6">
      <h2 className="flex items-center gap-2 text-xl font-bold text-on-secondary-container">
        <MaterialIcon name="check_circle" className="h-6 w-6 text-[24px]" />
        Estado de Indexacion
      </h2>

      <div className="mt-4 space-y-3">
        {queueItems.map((item) => (
          <IndexingQueueItem key={item.name} item={item} />
        ))}
      </div>
    </section>
  )
}

function IndexingQueueItem({ item }: { item: QueueItem }) {
  return (
    <article className="rounded-lg bg-surface p-4">
      <div className="flex min-w-0 items-center gap-2">
        <MaterialIcon
          name="description"
          className="h-5 w-5 text-[20px] text-secondary"
        />
        <span className="min-w-0 truncate font-semibold text-on-surface">
          {item.name}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-variant">
          <div
            className={`h-full rounded-full ${progressColor(item.status)}`}
            style={{ width: `${item.progress}%` }}
          />
        </div>
        <span className="text-sm font-bold text-secondary">
          {item.progress}%
        </span>
      </div>

      <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-secondary">
        <MaterialIcon
          name={item.status === 'activo' ? 'done_all' : 'pending'}
          className="h-4 w-4 text-[16px]"
        />
        {item.message}
      </p>
    </article>
  )
}

function SourceTable({
  documents,
  query,
  onQueryChange,
}: {
  documents: IndexedDocument[]
  query: string
  onQueryChange: (value: string) => void
}) {
  return (
    <section className="min-w-0 overflow-hidden rounded-xl border border-surface-variant bg-surface p-5 shadow-[0_4px_20px_rgba(65,95,118,0.05)] md:p-6">
      <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="flex min-w-0 items-center gap-2 text-xl font-bold text-primary">
          <MaterialIcon name="library_books" className="h-6 w-6 text-[24px]" />
          <span className="min-w-0 truncate">Documentos Indexados</span>
        </h2>

        <label className="relative block w-full min-w-0 lg:w-72 lg:shrink-0">
          <span className="sr-only">Buscar documento</span>
          <MaterialIcon
            name="search"
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[20px] text-outline"
          />
          <input
            className="w-full rounded-lg border-0 bg-surface-container-low py-2 pl-10 pr-4 text-base text-on-surface outline-none transition-colors focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary"
            placeholder="Buscar documento..."
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </label>
      </div>

      <div className="mt-5 max-w-full overflow-x-auto">
        <table className="w-full min-w-[720px] table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[42%]" />
            <col className="w-[22%]" />
            <col className="w-[18%]" />
            <col className="w-[18%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-surface-variant text-sm font-bold uppercase tracking-wide text-on-surface-variant">
              <th className="px-2 py-3">Nombre del Documento</th>
              <th className="px-2 py-3">Fecha de Subida</th>
              <th className="px-2 py-3">Estado</th>
              <th className="px-2 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-base text-on-surface">
            {documents.map((document) => (
              <DocumentRow key={document.name} document={document} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function DocumentRow({ document }: { document: IndexedDocument }) {
  return (
    <tr className="border-b border-surface-variant/50 transition-colors last:border-b-0 hover:bg-surface-container-low">
      <td className="px-2 py-4">
        <div className="flex min-w-0 items-center gap-2">
          <MaterialIcon
            name={document.type === 'pdf' ? 'picture_as_pdf' : 'description'}
            className="h-5 w-5 text-[20px] text-outline"
          />
          <span className="min-w-0 truncate">{document.name}</span>
        </div>
      </td>
      <td className="px-2 py-4 text-on-surface-variant">
        {document.uploadedAt}
      </td>
      <td className="px-2 py-4">
        <StatusBadge status={document.status} />
      </td>
      <td className="px-2 py-4">
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-outline transition-colors hover:bg-primary-container hover:text-primary"
            aria-label={`Ver ${document.name}`}
          >
            <MaterialIcon name="visibility" className="h-5 w-5 text-[20px]" />
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-outline transition-colors hover:bg-error-container hover:text-error"
            aria-label={`Eliminar ${document.name}`}
          >
            <MaterialIcon name="delete" className="h-5 w-5 text-[20px]" />
          </button>
        </div>
      </td>
    </tr>
  )
}

function StatusBadge({ status }: { status: DocumentStatus }) {
  const statusConfig = {
    activo: {
      label: 'Activo',
      className: 'bg-secondary-container text-on-secondary-container',
      dot: 'bg-secondary',
    },
    procesando: {
      label: 'Procesando',
      className: 'bg-tertiary-fixed text-on-tertiary-fixed',
      dot: 'bg-tertiary-container',
    },
    pendiente: {
      label: 'Pendiente',
      className: 'bg-surface-container-high text-on-surface-variant',
      dot: 'bg-outline',
    },
    error: {
      label: 'Error',
      className: 'bg-error-container text-on-error-container',
      dot: 'bg-error',
    },
  }[status]

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-bold ${statusConfig.className}`}
    >
      <span className={`h-2 w-2 rounded-full ${statusConfig.dot}`} />
      {statusConfig.label}
    </span>
  )
}

function progressColor(status: DocumentStatus) {
  if (status === 'error') {
    return 'bg-error'
  }

  if (status === 'procesando') {
    return 'bg-tertiary-container'
  }

  if (status === 'pendiente') {
    return 'bg-outline'
  }

  return 'bg-secondary'
}
