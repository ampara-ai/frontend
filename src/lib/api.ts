const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
// El id de sesión y la marca de la pregunta de género viven solo en memoria: recargar la página empieza una conversación
// nueva (sección 3.6 del artículo) y no queda rastro de AMPARA en el almacenamiento del navegador si alguien revisa el
// dispositivo. sessionStorage no basta: sobrevive a una recarga en la misma pestaña.
const LEGACY_SESSION_KEY = 'ampara_session_id'
const LEGACY_GENDER_KEY = 'ampara_gender_session'
let sessionId: string | null = null
let genderAskedFor: string | null = null

// Versiones anteriores guardaban el id en localStorage: se borra y se pide al backend que olvide esa conversación.
function forgetLegacySession(): void {
  try {
    const legacy = localStorage.getItem(LEGACY_SESSION_KEY)
    localStorage.removeItem(LEGACY_SESSION_KEY)
    localStorage.removeItem(LEGACY_GENDER_KEY)
    if (legacy) {
      void fetch(`${BASE_URL}/api/v1/session/${legacy}`, { method: 'DELETE' }).catch(() => {})
    }
  } catch {
    // almacenamiento bloqueado por el navegador: no hay nada que limpiar
  }
}
forgetLegacySession()

export function getSessionId(): string {
  if (!sessionId) {
    sessionId = crypto.randomUUID()
  }
  return sessionId
}

function rotateSessionId(): string {
  sessionId = crypto.randomUUID()
  return sessionId
}

export function genderAsked(id: string): boolean {
  return genderAskedFor === id
}

export function markGenderAsked(id: string): void {
  genderAskedFor = id
}

export interface Source {
  source_type: string
  source_label: string
  excerpt: string
  score: number
}

export interface ChatRequest {
  session_id: string
  message: string
}

export interface ChatResponse {
  session_id: string
  answer: string
  sources: Source[]
  from_context: boolean
  out_of_domain: boolean
  no_results: boolean
  consulta_id?: number | null
}

export interface StatusEvent {
  step: string
  message: string
}

export interface TokenEvent {
  content: string
}

export interface DoneEvent extends ChatResponse {}

export interface ErrorEvent {
  detail: string
}

export interface ClearSessionResponse {
  cleared: boolean
  session_id: string
}

export interface StreamCallbacks {
  onStatus: (event: StatusEvent) => void
  onToken: (event: TokenEvent) => void
  onDone: (event: DoneEvent) => void
  onError: (event: ErrorEvent) => void
}

export async function streamChatMessage(
  request: ChatRequest,
  callbacks: StreamCallbacks,
  signal?: AbortSignal,
): Promise<void> {
  let response: Response

  try {
    response = await fetch(`${BASE_URL}/api/v1/chat/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal,
    })
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') return
    callbacks.onError({ detail: 'Error al conectar con el servidor.' })
    return
  }

  if (!response.ok) {
    try {
      const body = await response.json()
      callbacks.onError({ detail: body.detail ?? 'Error en el servidor.' })
    } catch {
      callbacks.onError({ detail: `Error del servidor (${response.status}).` })
    }
    return
  }

  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let eventType = ''
  let receivedDone = false

  try {
    while (true) {
      const { done, value } = await reader.read()

      if (value) {
        buffer += decoder.decode(value, { stream: !done })
      }

      const lines = buffer.split('\n')
      buffer = done ? '' : (lines.pop() ?? '')

      for (const line of lines) {
        if (line.startsWith('event: ')) {
          eventType = line.slice(7).trim()
        } else if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6))
            if (eventType === 'status') {
              callbacks.onStatus(data as StatusEvent)
            } else if (eventType === 'token') {
              callbacks.onToken(data as TokenEvent)
            } else if (eventType === 'done') {
              receivedDone = true
              callbacks.onDone(data as DoneEvent)
            } else if (eventType === 'error') {
              callbacks.onError(data as ErrorEvent)
            }
          } catch {
            callbacks.onError({ detail: 'Error al leer la respuesta del servidor.' })
          }
        } else if (line === '') {
          eventType = ''
        }
      }

      if (done) break
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') return
    callbacks.onError({ detail: 'La conexión con el servidor se interrumpió.' })
    return
  }

  if (!receivedDone) {
    callbacks.onError({ detail: 'La conexión se cerró antes de recibir la respuesta completa.' })
  }
}

export async function clearSession(): Promise<void> {
  const oldId = sessionId
  if (oldId) {
    try {
      await fetch(`${BASE_URL}/api/v1/session/${oldId}`, { method: 'DELETE' })
    } catch {
      // no-op: la limpieza de UI no debe bloquearse por fallo de red
    }
  }
  rotateSessionId()
}

const SOURCE_TYPE_ICONS: Record<string, string> = {
  'Ley 30364': 'gavel',
  'Código Penal': 'gavel',
  'Código Procesal Penal': 'gavel',
  'Jurisprudencia · Casación': 'balance',
  'Jurisprudencia · Acuerdo Plenario': 'balance',
  'Jurisprudencia · Sentencia': 'balance',
  'Jurisprudencia · TC': 'account_balance',
  'Jurisprudencia · Recurso de Nulidad': 'balance',
  'Jurisprudencia · Resolución Administrativa': 'assignment',
  'Guía Institucional': 'menu_book',
  'Protocolo': 'assignment',
  'Manual Institucional': 'library_books',
  'Documento Legal': 'description',
}

export function getSourceIcon(sourceType: string): string {
  return SOURCE_TYPE_ICONS[sourceType] ?? 'description'
}

export async function registerGender(
  sessionId: string,
  genero: 'masculino' | 'femenino' | 'otros',
): Promise<void> {
  try {
    await fetch(`${BASE_URL}/api/v1/session/${sessionId}/genero`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ genero }),
    })
  } catch { /* no-op */ }
}

export async function rateConsulta(
  consultaId: number,
  sessionId: string,
  fueUtil: boolean,
): Promise<void> {
  try {
    await fetch(`${BASE_URL}/api/v1/consulta/${consultaId}/rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, fue_util: fueUtil }),
    })
  } catch { /* no-op */ }
}
