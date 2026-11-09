import type { ArchiveItem } from '@/components/Archive'
import { localePath, type Locale } from '@/i18n/config'

import { asMedia, getAwards, getLectures, getPublications, getVideos, getWorks, paperLink } from './data'

/** Everything the archive shows, newest first, mixed so the grid has rhythm. */
export async function getArchiveItems(locale: Locale): Promise<ArchiveItem[]> {
  const [works, videos, lectures, pubs, awards] = await Promise.all([
    getWorks(locale),
    getVideos(locale),
    getLectures(),
    getPublications(),
    getAwards(locale),
  ])

  const fromWorks: ArchiveItem[] = works.map((w) => {
    const img = asMedia(w.cover)
    const card = img?.sizes?.card
    return {
      key: `w-${w.id}`,
      cat: w.category,
      title: w.title,
      sub: w.subtitle ?? undefined,
      year: w.year,
      image: img
        ? {
            src: card?.url || img.url || '',
            width: card?.width || img.width || 4,
            height: card?.height || img.height || 5,
            alt: img.alt || w.title,
          }
        : null,
      page: localePath(locale, `/work/${w.slug}`),
    }
  })
  const fromVideos: ArchiveItem[] = videos.map((v) => ({
    key: `v-${v.id}`,
    cat: 'video',
    title: v.title,
    sub: v.description ?? undefined,
    year: v.year,
    youtube: v.youtube,
    link: `https://www.youtube.com/watch?v=${v.youtube}`,
  }))
  const fromLectures: ArchiveItem[] = lectures.map((l, i) => {
    const img = asMedia(l.image)
    return {
      key: `l-${l.id}`,
      cat: 'lecture',
      title: l.title,
      sub: [l.event, [l.city, l.country].filter(Boolean).join(', ')].filter(Boolean).join(' · '),
      year: l.year,
      tone: (i % 4) + 1,
      image: img ? { src: img.sizes?.card?.url || img.url || '', width: img.width || 4, height: img.height || 3, alt: img.alt || l.title } : null,
    }
  })
  const fromPubs: ArchiveItem[] = pubs.map((p) => ({
    key: `p-${p.id}`,
    cat: 'publication',
    title: p.title,
    sub: p.journal,
    year: p.year,
    body: p.summary ?? undefined,
    link: paperLink(p),
  }))
  const fromAwards: ArchiveItem[] = awards.map((a) => ({
    key: `a-${a.id}`,
    cat: 'award',
    title: a.title,
    sub: [a.detail, a.organization].filter(Boolean).join(' · '),
    year: a.year,
    tone: 3,
  }))

  // Interleave the streams so the default "All" view mixes images, films and text.
  const streams = [fromWorks, fromVideos, fromLectures, fromPubs, fromAwards].map((s) => [...s])
  const out: ArchiveItem[] = []
  const pattern = [0, 1, 2, 1, 3, 0, 2, 1, 4, 2, 3, 1]
  let k = 0
  while (streams.some((s) => s.length)) {
    const s = streams[pattern[k++ % pattern.length]]
    if (s.length) out.push(s.shift()!)
  }
  return out
}
