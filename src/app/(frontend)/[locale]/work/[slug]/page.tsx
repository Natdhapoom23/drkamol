import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { YouTube } from '@/components/YouTube'
import { isLocale, localePath } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { asMedia, getWork, getWorks } from '@/lib/data'
import { alternates } from '@/lib/seo'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return []
  const works = await getWorks(params.locale)
  return works.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const w = await getWork(slug, locale)
  if (!w) return {}
  const cover = asMedia(w.cover)
  return {
    title: w.title,
    description: w.subtitle || undefined,
    alternates: alternates(locale, `/work/${slug}`),
    openGraph: cover?.url ? { images: [{ url: cover.sizes?.card?.url || cover.url }] } : undefined,
  }
}

export default async function WorkDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const w = await getWork(slug, locale)
  // Patient items whose consent period has ended are no longer shown.
  if (!w || (w.consent?.expires && new Date(w.consent.expires) < new Date())) notFound()
  const t = getDict(locale)
  const cover = asMedia(w.cover)
  const video = w.video && typeof w.video === 'object' ? w.video : null

  return (
    <article>
      <div className="wrap page-head">
        <Link className="textlink" href={localePath(locale, '/work')}>
          ← {t.back}
        </Link>
        <span className="eyebrow">{t.cat[w.category]}</span>
        <h1 className="h1" style={{ fontSize: 'clamp(44px, 6vw, 96px)' }}>
          {w.title}
        </h1>
        {w.subtitle ? <p className="lede">{w.subtitle}</p> : null}
      </div>
      {cover?.url ? (
        <div className="wrap">
          <div style={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            <Image src={cover.sizes?.hero?.url || cover.url} alt={cover.alt || w.title} fill priority sizes="(max-width: 1280px) 100vw, 1280px" style={{ objectFit: 'cover' }} />
          </div>
        </div>
      ) : null}
      <div className="wrap section" style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        {w.story ? (
          <div className="prose">
            <RichText data={w.story} />
          </div>
        ) : null}
        {video ? <YouTube id={video.youtube} title={video.title} playLabel={t.play} /> : null}
        {w.gallery?.length ? (
          <div className="masonry">
            {w.gallery.map((g) => {
              const m = asMedia(g.image)
              if (!m?.url) return null
              return (
                <figure key={g.id} className="tile" style={{ margin: '0 0 16px', cursor: 'default' }}>
                  <span className="tile-media" style={{ display: 'block', aspectRatio: `${m.width || 4} / ${m.height || 3}` }}>
                    <Image src={m.sizes?.card?.url || m.url} alt={m.alt || ''} fill sizes="(max-width: 760px) 50vw, 25vw" />
                  </span>
                  {g.caption ? <figcaption className="tile-cap"><span>{g.caption}</span></figcaption> : null}
                </figure>
              )
            })}
          </div>
        ) : null}
      </div>
    </article>
  )
}
