import { type FormEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { isAdminAuthenticated, loginAdmin } from '../../lib/adminAuth'
import { paths } from '../../lib/routes'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAdminAuthenticated()) {
    return <Navigate to={paths.admin} replace />
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const didLogin = loginAdmin(email.trim(), password)

    if (!didLogin) {
      setError('Credenciales administrativas incorrectas.')
      return
    }

    navigate(paths.admin, { replace: true })
  }

  return (
    <div className="admin-page flex min-h-dvh items-center justify-center bg-surface-container-low px-container-padding py-stack-lg font-body-md text-on-surface">
      <main className="w-full max-w-md rounded-xl border border-outline-variant/40 bg-surface p-6 shadow-[0_8px_24px_rgba(65,95,118,0.12)]">
        <div className="mb-stack-md">
          <p className="font-headline-lg text-headline-lg text-primary">
            AMPARA Admin
          </p>
          <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
            Ingresa con credenciales de desarrollo para acceder al panel.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 font-label-lg text-label-lg text-on-surface">
            Usuario
            <input
              className="h-12 rounded-lg border border-outline-variant bg-surface-container-low px-4 font-body-md text-body-md outline-none transition-colors focus:border-primary"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@ampara.local"
            />
          </label>
          <label className="flex flex-col gap-2 font-label-lg text-label-lg text-on-surface">
            Contrasena
            <input
              className="h-12 rounded-lg border border-outline-variant bg-surface-container-low px-4 font-body-md text-body-md outline-none transition-colors focus:border-primary"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Admin123!"
            />
          </label>

          {error ? (
            <p className="rounded-lg bg-error-container px-4 py-3 font-body-md text-body-md text-on-error-container">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-2 h-12 rounded-lg bg-primary font-button text-button text-on-primary transition-colors hover:bg-surface-tint"
          >
            Entrar al panel
          </button>
        </form>
      </main>
    </div>
  )
}
