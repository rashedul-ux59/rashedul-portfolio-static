import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="case-page">
      <div className="case-page-inner">
        <p className="chapter-number">404 / A missing page</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(52px, 8vw, 100px)', margin: '28px 0' }}>Nothing here,<br />just a little space.</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 440, lineHeight: 1.8 }}>This page may have moved, or the address may be incorrect.</p>
        <Link className="case-back" href="/#top">← Back to the homepage</Link>
      </div>
    </main>
  )
}
