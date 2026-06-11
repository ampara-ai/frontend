type MaterialIconProps = {
  name: string
  className?: string
  decorative?: boolean
}

export function MaterialIcon({
  name,
  className = '',
  decorative = true,
}: MaterialIconProps) {
  return (
    <span
      aria-hidden={decorative ? 'true' : undefined}
      className={`material-symbols-outlined inline-flex shrink-0 items-center justify-center leading-none ${className}`}
    >
      {name}
    </span>
  )
}
