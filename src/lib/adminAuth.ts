import { adminLogin as apiAdminLogin, clearAdminToken, getAdminToken } from './adminApi'

export function isAdminAuthenticated(): boolean {
  return getAdminToken() !== null
}

export async function loginAdmin(username: string, password: string): Promise<void> {
  await apiAdminLogin(username, password)
}

export function logoutAdmin(): void {
  clearAdminToken()
}
