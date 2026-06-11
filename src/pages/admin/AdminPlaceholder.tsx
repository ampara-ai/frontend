export function AdminPlaceholder({
  mockup,
  route,
  title,
}: {
  mockup: string
  route: string
  title: string
}) {
  return (
    <section className="rounded-xl border border-outline-variant/40 bg-surface p-6 shadow-sm">
      <p className="font-label-lg text-label-lg text-on-surface-variant">
        Ruta: {route}
      </p>
      <h1 className="mt-2 font-headline-lg text-headline-lg text-on-surface">
        {title}
      </h1>
      <p className="mt-3 font-body-md text-body-md text-on-surface-variant">
        Placeholder administrativo. Este contenido se implementara luego usando
        el mockup <span className="font-label-lg text-primary">{mockup}</span>.
      </p>
    </section>
  )
}
