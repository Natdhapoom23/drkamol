import type { Metadata } from 'next'

import { localePath, siteUrl, type Locale } from '@/i18n/config'

/** Canonical URL plus hreflang alternates for a page that exists in both languages. */
export const alternates = (locale: Locale, path: string): Metadata['alternates'] => ({
  canonical: `${siteUrl}${localePath(locale, path)}`,
  languages: {
    en: `${siteUrl}${localePath('en', path)}`,
    th: `${siteUrl}${localePath('th', path)}`,
    'x-default': `${siteUrl}${localePath('en', path)}`,
  },
})

export const JsonLd = ({ data }: { data: object }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
)
