import { notFound } from 'next/navigation'

import { ArrowUpRight } from '@/components/Icons'
import { isLocale, siteUrl } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { getAwards, getLectures, getProfile, getPublications, paperLink } from '@/lib/data'
import { alternates, JsonLd } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDict(locale)
  return { title: t.researchTitle, description: t.academicIntro, alternates: alternates(locale, '/academic') }
}

export default async function AcademicPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDict(locale)
  const [pubs, lectures, awards, profile] = await Promise.all([
    getPublications(),
    getLectures(),
    getAwards(locale),
    getProfile(locale),
  ])

  const scholarly = pubs.map((p) => ({
    '@context': 'https://schema.org',
    '@type': p.kind === 'chapter' ? 'Chapter' : 'ScholarlyArticle',
    headline: p.title,
    datePublished: p.year ? String(p.year) : undefined,
    isPartOf: { '@type': 'Periodical', name: p.journal },
    author: { '@type': 'Person', name: 'Kamol Pansritum', url: siteUrl },
    sameAs: paperLink(p) || undefined,
  }))

  return (
    <>
      <JsonLd data={scholarly} />
      <div className="wrap page-head">
        <span className="eyebrow">{t.nav.academic}</span>
        <h1 className="h1">{t.researchTitle}</h1>
        <p className="lede">{t.academicIntro}</p>
      </div>

      <section className="section light" style={{ marginTop: 40 }}>
        <div className="wrap split">
          <div>
            <span className="eyebrow">01</span>
            <h2 className="h2">{t.publications}</h2>
          </div>
          <ul className="pubs">
            {pubs.map((p) => {
              const href = paperLink(p)
              const inner = (
                <>
                  <span className="pub-year">{p.year ?? ''}</span>
                  <span>
                    <span className="pub-title">{p.title}</span>
                    <span className="pub-journal">
                      {p.journal}
                      {p.doi ? ` · DOI ${p.doi}` : ''}
                    </span>
                  </span>
                  {href ? <ArrowUpRight /> : <span />}
                </>
              )
              return (
                <li className="pub" key={p.id}>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener">
                      {inner}
                    </a>
                  ) : (
                    <div>{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <span className="eyebrow">02</span>
            <h2 className="h2">{t.lectures}</h2>
          </div>
          <ol className="timeline" reversed>
            {lectures.map((l) => (
              <li key={l.id} data-reveal>
                <span className="t">{l.year}</span>
                <span>
                  <strong>{l.title}</strong>
                  <span className="sub">
                    {l.event}
                    {l.city || l.country ? ` — ${[l.city, l.country].filter(Boolean).join(', ')}` : ''}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">03</span>
              <h2 className="h2">{t.awards}</h2>
            </div>
          </div>
          <div className="awards">
            {awards.map((a, i) => (
              <div className="award" key={a.id} data-reveal={String((i % 3) * 0.08)}>
                <span className="yr">{a.year}</span>
                <strong>{a.title}</strong>
                {a.detail ? <span>{a.detail}</span> : null}
                {a.organization ? <span>{a.organization}</span> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {profile.memberships?.length ? (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap split">
            <div>
              <span className="eyebrow">04</span>
              <h2 className="h2">{t.memberships}</h2>
            </div>
            <ul className="timeline">
              {profile.memberships.map((m) => (
                <li key={m.id} style={{ gridTemplateColumns: '1fr' }}>
                  <strong>{m.name}</strong>
                </li>
              ))}
              {profile.license ? (
                <li style={{ gridTemplateColumns: '1fr' }}>
                  <span className="sub">{profile.license}</span>
                </li>
              ) : null}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  )
}
