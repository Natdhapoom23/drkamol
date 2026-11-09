export const locales = ['en', 'th'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v)

/** English lives at the root ("/academic"), Thai under "/th" ("/th/academic"). */
export const localePath = (locale: Locale, path = '/') => {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (locale === defaultLocale) return clean
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}

export const siteUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'https://drkamol.com').replace(/\/$/, '')
