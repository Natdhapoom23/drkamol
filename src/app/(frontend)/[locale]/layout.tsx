import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Motion } from '@/components/Motion'
import { isLocale, locales, siteUrl } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { getSettings } from '@/lib/data'

import '../styles.css'

export const generateStaticParams = () => locales.map((locale) => ({ locale }))
export const dynamicParams = false

export const viewport: Viewport = { themeColor: '#0a0a0b', colorScheme: 'dark' }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const s = await getSettings(locale)
  const og = typeof s.ogImage === 'object' && s.ogImage?.url ? s.ogImage.url : undefined
  return {
    metadataBase: new URL(siteUrl),
    title: { default: s.siteTitle || 'Dr. Kamol Pansritum', template: `%s · Dr. Kamol Pansritum` },
    description: s.siteDescription || undefined,
    openGraph: {
      siteName: 'Dr. Kamol Pansritum',
      type: 'website',
      locale: locale === 'th' ? 'th_TH' : 'en_US',
      images: og ? [{ url: og, width: 1200, height: 630 }] : undefined,
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDict(locale)
  const settings = await getSettings(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Flag JS early so reveal animations never flash, and content stays visible without JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip" href="#main">
          {t.skip}
        </a>
        <Header locale={locale} t={t} appointmentUrl={settings.appointmentUrl} />
        <main id="main">{children}</main>
        <Footer locale={locale} t={t} settings={settings} />
        <Motion />
      </body>
    </html>
  )
}
