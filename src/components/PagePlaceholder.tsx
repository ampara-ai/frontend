type PagePlaceholderProps = {
  title: string
  description: string
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section id="center">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  )
}
