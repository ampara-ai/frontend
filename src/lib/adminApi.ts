const ADMIN_TOKEN_KEY = 'ampara_admin_token'
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

export interface UploadResponse {
  filename: string
  chunks_created: number
  chunk_ids: string[]
}

export function getAdminToken(): string | null {
  return localStorage.getItem(ADMIN_TOKEN_KEY)
}

export function setAdminToken(token: string): void {
  localStorage.setItem(ADMIN_TOKEN_KEY, token)
}

export function clearAdminToken(): void {
  localStorage.removeItem(ADMIN_TOKEN_KEY)
}

export async function adminLogin(username: string, password: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/v1/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) throw new Error('Credenciales inválidas')
  const data: { access_token: string; token_type: string } = await res.json()
  setAdminToken(data.access_token)
}

async function adminFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getAdminToken()
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  })
  if (res.status === 401) {
    clearAdminToken()
    window.location.href = '/admin/login'
    throw new Error('Sesión expirada')
  }
  return res
}

export async function uploadDocument(file: File): Promise<UploadResponse> {
  const formData = new FormData()
  formData.append('file', file)

  const res = await adminFetch(`${BASE_URL}/api/v1/admin/documents/upload`, {
    method: 'POST',
    body: formData,
  })

  if (res.status === 415) throw new Error('Solo se aceptan archivos PDF o DOCX')
  if (res.status === 400) throw new Error('El archivo está vacío')
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { detail?: string }).detail ?? 'Error al subir el documento')
  }
  return res.json() as Promise<UploadResponse>
}
