type MockupPlaceholderProps = {
  route: string
  title: string
  mockups: string[]
}

export function MockupPlaceholder({
  route,
  title,
  mockups,
}: MockupPlaceholderProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-8 text-center text-on-background">
      <p className="font-label-lg text-label-lg text-on-surface-variant">
        Ruta: {route}
      </p>
      <h1 className="font-headline-lg text-headline-lg text-on-surface">
        {title}
      </h1>
      <div>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Mockup HTML pendiente de convertir:
        </p>
        <ul className="mt-3 space-y-2 font-body-md text-body-md text-primary">
          {mockups.map((mockup) => (
            <li key={mockup}>{mockup}</li>
          ))}
        </ul>
      </div>
    </main>
  )
}
