import type { MetadataRoute } from 'next'

import { localePath, siteUrl } from '@/i18n/config'
import { getWorks } from '@/lib/data'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const works = await getWorks('en').catch(() => [])
  const paths = ['/', '/work', '/academic', '/about', ...works.map((w) => `/work/${w.slug}`)]
  return paths.map((path) => ({
    url: `${siteUrl}${localePath('en', path)}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.8,
    alternates: {
      languages: { en: `${siteUrl}${localePath('en', path)}`, th: `${siteUrl}${localePath('th', path)}` },
    },
  }))
}
