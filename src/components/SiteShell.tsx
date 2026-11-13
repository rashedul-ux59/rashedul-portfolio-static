'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import siteConfig from '../../config/site.json'

type Theme = 'night' | 'day'

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('night')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  useEffect(() => {
    try { if (localStorage.getItem('portfolio-theme') === 'day') setTheme('day') } catch {}
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('portfolio-theme', theme) } catch {}
  }, [theme])
  useEffect(() => { setMenuOpen(false) }, [pathname])
  useEffect(() => {
    if (!menuOpen) return
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key)
  }, [menuOpen])

  return <div className="site">
    <header className={`nav ${scrolled || pathname !== '/' ? 'nav-solid' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <Link href="/#top" className="brand" aria-label={`${siteConfig.name}, home`}>
        <Image className="brand-logo" src={siteConfig.logo.src} alt={siteConfig.logo.alt} width={siteConfig.logo.width} height={siteConfig.logo.width} style={{ width: siteConfig.logo.width, height: siteConfig.logo.width }} priority />
        {siteConfig.logo.showName && <span>{siteConfig.name}<span className="brand-dot">.</span></span>}
      </Link>
      <nav id="primary-navigation" className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
        {[['/#work', 'Work'], ['/#about', 'About'], ['/#expertise', 'Expertise'], ['/#contact', 'Contact']].map(([href, label]) => <Link href={href} key={label} onClick={() => setMenuOpen(false)}>{label}</Link>)}
      </nav>
      <div className="nav-actions">
        <button className="theme-toggle" onClick={() => setTheme(theme === 'night' ? 'day' : 'night')} aria-label={`Switch to ${theme === 'night' ? 'day' : 'night'} mode`} aria-pressed={theme === 'night'}>
          <svg viewBox="0 0 20 20" width="15" height="15" fill="none" aria-hidden="true">{theme === 'night' ? <path d="M14.9 13.5A6.6 6.6 0 0 1 6.5 5.1a6.4 6.4 0 1 0 8.4 8.4Z" stroke="currentColor" strokeWidth="1.2" /> : <><circle cx="10" cy="10" r="3.2" stroke="currentColor"/><path d="M10 1v2m0 14v2M1 10h2m14 0h2M3.5 3.5 5 5m10 10 1.5 1.5M3.5 16.5 5 15M15 5l1.5-1.5" stroke="currentColor"/></>}</svg>
          <span>{theme === 'night' ? 'Night' : 'Day'}</span>
        </button>
        <Link href="/#contact" className="nav-contact">Let’s talk <span aria-hidden="true">↗</span></Link>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'}><span/><span/></button>
      </div>
    </header>
    {children}
  </div>
}
