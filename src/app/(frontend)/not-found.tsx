import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-start justify-center px-8 py-28">
      <p className="mb-8 text-[10px] tracking-[.18em] text-[var(--muted)] uppercase">
        404 / A missing page
      </p>
      <h1 className="text-6xl leading-none tracking-[-.045em] [font-family:var(--font-serif)] sm:text-8xl">
        Nothing here,
        <br />
        just a little space.
      </h1>
      <p className="mt-8 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
        This page may have moved, or the entry hasn&apos;t been published yet.
      </p>
      <Link
        className="mt-10 border-b border-[var(--line)] pb-2 text-xs hover:text-[var(--gold-text)]"
        href="/blog"
      >
        &larr; Back to the daily record
      </Link>
    </main>
  )
}
