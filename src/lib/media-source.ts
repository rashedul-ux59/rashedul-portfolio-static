/** Use the native upload URL, without a network loop back to our own hostname. */
export function mediaSource(url: string, updatedAt: string | undefined, origin: string) {
  const source = new URL(url, origin)
  if (source.origin !== new URL(origin).origin) return url
  // Replacement uploads need a new optimization key as well as page revalidation.
  if (updatedAt) source.searchParams.set('v', updatedAt)
  return `${source.pathname}${source.search}`
}
