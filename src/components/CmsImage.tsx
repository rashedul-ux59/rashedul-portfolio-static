export function CmsImage({
  media,
  className = '',
  priority = false,
}: {
  media?: string | null
  className?: string
  sizes?: string
  priority?: boolean
}) {
  if (!media) return null
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={media}
      alt=""
      loading={priority ? 'eager' : 'lazy'}
      className={`h-full w-full object-cover ${className}`}
    />
  )
}
