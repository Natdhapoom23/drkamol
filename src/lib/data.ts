import config from '@payload-config'
import { cache } from 'react'
import { getPayload } from 'payload'

import type { Locale } from '@/i18n/config'
import type { Award, Lecture, Media, Publication, Video, Work } from '@/payload-types'

export const payload = cache(async () => getPayload({ config }))

export const getProfile = cache(async (locale: Locale) =>
  (await payload()).findGlobal({ slug: 'profile', locale, depth: 1 }),
)

export const getSettings = cache(async (locale: Locale) =>
  (await payload()).findGlobal({ slug: 'settings', locale, depth: 1 }),
)

export const getPublications = cache(async (): Promise<Publication[]> => {
  const res = await (await payload()).find({ collection: 'publications', limit: 500, sort: '-year', depth: 0 })
  // Undated papers go after dated ones.
  return res.docs.sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
})

export const getLectures = cache(async (): Promise<Lecture[]> =>
  (await (await payload()).find({ collection: 'lectures', limit: 500, sort: '-year', depth: 1 })).docs,
)

export const getAwards = cache(async (locale: Locale): Promise<Award[]> =>
  (await (await payload()).find({ collection: 'awards', limit: 200, sort: '-year', locale, depth: 1 })).docs,
)

export const getVideos = cache(async (locale: Locale): Promise<Video[]> =>
  (await (await payload()).find({ collection: 'videos', limit: 500, sort: 'order', locale, depth: 0 })).docs,
)

export const getWorks = cache(async (locale: Locale): Promise<Work[]> =>
  (
    await (await payload()).find({
      collection: 'works',
      limit: 500,
      sort: '-year',
      locale,
      depth: 1,
      where: { _status: { equals: 'published' } },
    })
  ).docs,
)

export const getWork = cache(async (slug: string, locale: Locale): Promise<Work | null> => {
  const res = await (await payload()).find({
    collection: 'works',
    limit: 1,
    locale,
    depth: 2,
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
  })
  return res.docs[0] ?? null
})

export const asMedia = (m: unknown): Media | null =>
  m && typeof m === 'object' && 'url' in (m as Media) ? (m as Media) : null

export const paperLink = (p: Pick<Publication, 'doi' | 'url'>) =>
  p.url || (p.doi ? `https://doi.org/${p.doi}` : null)
