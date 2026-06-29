import { type ChangeEvent, useEffect, useRef, useState } from 'react'

import { MaterialIcon } from '../../components/MaterialIcon'
import {
  type QueueItem,
  type UploadResponse,
  getDocumentsQueue,
  syncKnowledgeBase,
  uploadDocument,
} from '../../lib/adminApi'

type DocumentStatus = 'active' | 'processing' | 'pending' | 'error'

export function AdminIndexacionPage() {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([])
  const [queueLoading, setQueueLoading] = useState(true)
  const [syncState, setSyncState] = useState<'idle' | 'syncing' | 'done' | 'error'>('idle')

  useEffect(() => {
    getDocumentsQueue()
      .then(setQueueItems)
      .catch(() => {})
      .finally(() => setQueueLoading(false))
  }, [])

  async function handleSync() {
    setSyncState('syncing')
    try {
      await syncKnowledgeBase()
      setSyncState('done')
      const updated = await getDocumentsQueue().catch(() => queueItems)
      setQueueItems(updated)
    } catch {
      setSyncState('error')
    }
  }

  const syncLabel =
    syncState === 'syncing'
      ? 'Actualizando base...'
      : syncState === 'done'
        ? 'Base actualizada'
        : syncState === 'error'
          ? 'Error al sincronizar'
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

      <div className="flex max-w-2xl flex-col gap-stack-md">
        <UploadCard />
        <IndexingStatusCard queueItems={queueItems} loading={queueLoading} />
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

function IndexingStatusCard({
  queueItems,
  loading,
}: {
  queueItems: QueueItem[]
  loading: boolean
}) {
  return (
    <section className="min-w-0 rounded-xl border border-secondary-fixed bg-secondary-container p-5 shadow-[0_4px_20px_rgba(78,105,83,0.05)] md:p-6">
      <h2 className="flex items-center gap-2 text-xl font-bold text-on-secondary-container">
        <MaterialIcon name="check_circle" className="h-6 w-6 text-[24px]" />
        Estado de Indexacion
      </h2>

      <div className="mt-4 space-y-3">
        {loading ? (
          <p className="text-sm font-semibold text-on-secondary-container/60">
            Cargando cola...
          </p>
        ) : queueItems.length === 0 ? (
          <p className="text-sm font-semibold text-on-secondary-container/60">
            No hay documentos en cola.
          </p>
        ) : (
          queueItems.map((item) => (
            <IndexingQueueItem key={item.filename} item={item} />
          ))
        )}
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
          {item.filename}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-variant">
          <div
            className={`h-full rounded-full ${progressColor(item.status)}`}
            style={{ width: `${item.progress_pct}%` }}
          />
        </div>
        <span className="text-sm font-bold text-secondary">
          {item.progress_pct}%
        </span>
      </div>

      <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-secondary">
        <MaterialIcon
          name={item.status === 'active' ? 'done_all' : 'pending'}
          className="h-4 w-4 text-[16px]"
        />
        {item.message}
      </p>
    </article>
  )
}

function progressColor(status: DocumentStatus) {
  if (status === 'error') return 'bg-error'
  if (status === 'processing') return 'bg-tertiary-container'
  if (status === 'pending') return 'bg-outline'
  return 'bg-secondary'
}
