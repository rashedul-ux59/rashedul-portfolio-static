import type { Metadata } from 'next'
import { SiteShell } from '@/components/SiteShell'
import siteConfig from '../../../config/site.json'
import './styles.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description: siteConfig.description,
  icons: { icon: '/favicon.svg' },
  openGraph: { title: `${siteConfig.name} — ${siteConfig.role}`, description: siteConfig.description, type: 'website' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" data-theme="night"><body><SiteShell>{children}</SiteShell></body></html>
}
