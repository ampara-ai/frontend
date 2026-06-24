import { type FormEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { isAdminAuthenticated, loginAdmin } from '../../lib/adminAuth'
import { paths } from '../../lib/routes'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAdminAuthenticated()) {
    return <Navigate to={paths.admin} replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await loginAdmin(username.trim(), password)
      navigate(paths.admin, { replace: true })
    } catch {
      setError('Credenciales administrativas incorrectas.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-page flex min-h-dvh items-center justify-center bg-surface-container-low px-container-padding py-stack-lg font-body-md text-on-surface">
      <main className="w-full max-w-md rounded-xl border border-outline-variant/40 bg-surface p-6 shadow-[0_8px_24px_rgba(65,95,118,0.12)]">
        <div className="mb-stack-md">
          <p className="font-headline-lg text-headline-lg text-primary">
            AMPARA Admin
          </p>
          <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
            Ingresa con tus credenciales de administrador.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 font-label-lg text-label-lg text-on-surface">
            Usuario
            <input
              className="h-12 rounded-lg border border-outline-variant bg-surface-container-low px-4 font-body-md text-body-md outline-none transition-colors focus:border-primary"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="admin"
              autoComplete="username"
              required
            />
          </label>
          <label className="flex flex-col gap-2 font-label-lg text-label-lg text-on-surface">
            Contrasena
            <input
              className="h-12 rounded-lg border border-outline-variant bg-surface-container-low px-4 font-body-md text-body-md outline-none transition-colors focus:border-primary"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </label>

          {error ? (
            <p className="rounded-lg bg-error-container px-4 py-3 font-body-md text-body-md text-on-error-container">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-12 rounded-lg bg-primary font-button text-button text-on-primary transition-colors hover:bg-surface-tint disabled:cursor-wait disabled:opacity-70"
          >
            {loading ? 'Verificando...' : 'Entrar al panel'}
          </button>
        </form>
      </main>
    </div>
  )
}
