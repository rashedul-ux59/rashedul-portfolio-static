import React from 'react'
import type { Metadata } from 'next'
import Script from 'next/script'
import { SiteShell } from '@/components/SiteShell'
import { BodyCustomCode, renderHeadCustomCode } from '@/lib/site-custom-code'
import { siteSettings, sanitizeHtmlAttribute } from '@/lib/site-settings'
import './styles.css'

const defaultTitle = 'Rashedul Karim — Independent Product Designer'
const title = siteSettings.title ?? defaultTitle
const description =
  siteSettings.description ??
  'Independent product designer blending strategy, UX and visual craft to make complex things feel simple.'
const favicon = siteSettings.icons?.icon ?? '/favicon.svg'
const socialImage = siteSettings.openGraph?.image
const googleAnalyticsId = sanitizeHtmlAttribute(siteSettings.analytics?.googleAnalyticsId)

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title,
  description,
  robots: siteSettings.robots?.index === false ? { follow: false, index: false } : undefined,
  icons: favicon ? { icon: favicon } : undefined,
  openGraph: {
    title,
    description,
    images: socialImage ? [socialImage] : undefined,
  },
  twitter: socialImage
    ? {
        card: 'summary_large_image',
        images: [socialImage],
      }
    : undefined,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const language = sanitizeHtmlAttribute(siteSettings.language) || 'en'
  const addBypassLinks = siteSettings.accessibility?.addBypassLinks === true
  const customScripts = siteSettings.customScripts

  return (
    <html lang={language} data-theme="night" suppressHydrationWarning>
      <head>
        {renderHeadCustomCode(customScripts?.headStart, 'head-start')}
        {renderHeadCustomCode(customScripts?.headEnd, 'head-end')}
      </head>
      <body className="min-h-screen antialiased">
        <BodyCustomCode html={customScripts?.bodyStart} />
        {addBypassLinks && (
          <a className="site-bypass-link" href="#root">
            Skip to content
          </a>
        )}
        <div id="root" tabIndex={-1}>
          <SiteShell>{children}</SiteShell>
        </div>
        {googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="site-google-analytics" strategy="afterInteractive">
              {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(googleAnalyticsId)});
`}
            </Script>
          </>
        )}
        <BodyCustomCode html={customScripts?.bodyEnd} />
      </body>
    </html>
  )
}
