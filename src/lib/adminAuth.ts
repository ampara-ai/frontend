const ADMIN_SESSION_KEY = 'ampara_admin_session'

export const adminCredentials = {
  email: 'admin@ampara.local',
  password: 'Admin123!',
} as const

export type AdminSession = {
  email: string
  authenticatedAt: string
}

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) !== null
}

export function getAdminSession(): AdminSession | null {
  const session = sessionStorage.getItem(ADMIN_SESSION_KEY)

  if (!session) {
    return null
  }

  return JSON.parse(session) as AdminSession
}

export function loginAdmin(email: string, password: string): boolean {
  const isValid =
    email === adminCredentials.email && password === adminCredentials.password

  if (!isValid) {
    return false
  }

  sessionStorage.setItem(
    ADMIN_SESSION_KEY,
    JSON.stringify({
      email,
      authenticatedAt: new Date().toISOString(),
    } satisfies AdminSession),
  )

  return true
}

export function logoutAdmin() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY)
}
