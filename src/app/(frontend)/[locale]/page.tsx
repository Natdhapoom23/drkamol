import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Arrow, ArrowUpRight, Play } from '@/components/Icons'
import { YouTube } from '@/components/YouTube'
import { isLocale, localePath, siteUrl, type Locale } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { getArchiveItems } from '@/lib/archive'
import { asMedia, getLectures, getProfile, getPublications, getSettings, getVideos, paperLink } from '@/lib/data'
import { alternates, JsonLd } from '@/lib/seo'
import { youTubeThumb } from '@/lib/youtube'

export const revalidate = 3600

/** Shown until a portrait is uploaded in the CMS. */
const DEFAULT_PORTRAIT = '/images/dr-kamol-hero.jpg'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const s = await getSettings(locale)
  return { title: { absolute: s.siteTitle || 'Dr. Kamol Pansritum' }, alternates: alternates(locale, '/') }
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  if (!isLocale(l)) notFound()
  const locale: Locale = l
  const t = getDict(locale)

  const [profile, settings, pubs, lectures, videos, archive] = await Promise.all([
    getProfile(locale),
    getSettings(locale),
    getPublications(),
    getLectures(),
    getVideos(locale),
    getArchiveItems(locale),
  ])

  const portrait = asMedia(profile.portrait)
  const heroImage = asMedia(profile.heroImage)
  const bandImage = asMedia(profile.bandImage)
  const film = videos.find((v) => v.featured) ?? videos[0]
  const countries = new Set(lectures.map((x) => x.country).filter(Boolean)).size

  const stats = [
    ...(profile.stats ?? []).filter((s) => s.confirmed).map((s) => ({ v: s.value, label: s.label })),
    { v: String(pubs.length), label: t.pubCount },
    { v: String(lectures.length), label: t.lectureCount },
    { v: String(countries), label: t.countryCount },
  ].slice(0, 4)

  const featuredPubs = [...pubs.filter((p) => p.featured), ...pubs.filter((p) => !p.featured)].slice(0, 4)
  const teaser = archive.filter((i) => i.youtube || i.image).slice(0, 8)

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: 'Kamol Pansritum',
    honorificPrefix: 'Dr.',
    url: siteUrl,
    medicalSpecialty: ['PlasticSurgery'],
    description: profile.intro,
    image: portrait?.url ? new URL(portrait.url, siteUrl).toString() : `${siteUrl}${DEFAULT_PORTRAIT}`,
    alumniOf: [{ '@type': 'CollegeOrUniversity', name: 'Khon Kaen University' }, { '@type': 'CollegeOrUniversity', name: 'Chulalongkorn University' }],
    worksFor: { '@type': 'Hospital', name: settings.hospitalName || 'Kamol Cosmetic Hospital', url: settings.hospitalUrl || undefined },
    address: { '@type': 'PostalAddress', addressLocality: 'Bangkok', addressCountry: 'TH' },
    email: settings.email,
    sameAs: [settings.hospitalUrl, settings.youtube, settings.facebook, settings.instagram].filter(Boolean),
  }

  return (
    <>
      <JsonLd data={person} />

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" data-parallax="0.35" aria-hidden="true">
          {heroImage?.url ? (
            <Image className="hero-img" src={heroImage.sizes?.hero?.url || heroImage.url} alt="" fill priority sizes="100vw" />
          ) : (
            <div className="hero-orb" />
          )}
        </div>
        {/* Large portrait on the right, fading into the black page. Replaceable in the CMS (Profile → Portrait). */}
        <div className="hero-photo">
          <div className="hero-photo-in" data-parallax="0.12">
            <Image
              src={portrait?.url || DEFAULT_PORTRAIT}
              alt={portrait?.alt || profile.name}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 60vw"
            />
          </div>
        </div>
        <div className="hero-fade" />
        <div className="wrap hero-content">
          <p className="eyebrow">{profile.name}</p>
          <h1 className="h1" style={{ maxWidth: 980 }}>
            {profile.headlineA}
            <br />
            <span className="muted">{profile.headlineB}</span>
          </h1>
          <p className="lede">{profile.intro}</p>
          <div className="hero-actions">
            <Link className="btn btn-light" href={localePath(locale, '/work')}>
              {t.explore} <Arrow />
            </Link>
            {film ? (
              <a className="btn btn-ghost" href="#film">
                <Play /> {t.watch}
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {/* Figures */}
      <section className="stats" aria-label={t.figures}>
        <div className="wrap stats-in">
          {stats.map((s, i) => (
            <div className="stat" key={s.label} data-reveal={String(i * 0.08)}>
              <b>{s.v}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Statement */}
      <section className="statement">
        <div className="wrap">
          <h2 data-words>
            <span>{profile.wordA}</span>
            <span>{profile.wordB}</span>
            <span>{profile.wordC}</span>
          </h2>
          <p data-reveal>{profile.statement}</p>
        </div>
      </section>

      {/* Parallax band with his own words */}
      {profile.quote ? (
        <section className="band" aria-label={t.inHisWords}>
          <div className="band-bg" data-parallax="0.3" aria-hidden="true">
            {bandImage?.url ? <Image src={bandImage.sizes?.hero?.url || bandImage.url} alt="" fill sizes="100vw" /> : null}
          </div>
          <blockquote data-reveal>
            <p>“{profile.quote}”</p>
            <cite>— {profile.name}</cite>
          </blockquote>
        </section>
      ) : null}

      {/* Selected work */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">01 — {t.selected}</span>
              <h2 className="h2">{t.selectedTitle}</h2>
            </div>
            <Link className="textlink" href={localePath(locale, '/work')}>
              {t.viewAll} →
            </Link>
          </div>
          <div className="cards">
            <Link className="card" href={`${localePath(locale, '/work')}#video`} data-reveal>
              <div className="card-img tone-1">
                {videos[1] ? <Image src={youTubeThumb(videos[1].youtube)} alt="" fill sizes="(max-width: 760px) 100vw, 420px" style={{ opacity: 0.55 }} /> : null}
              </div>
              <div className="card-body">
                <small>
                  {videos.length} {t.cards.stories.unit}
                </small>
                <strong>{t.cards.stories.title}</strong>
                <span>{t.cards.stories.body}</span>
              </div>
            </Link>
            <Link className="card" href={localePath(locale, '/academic')} data-reveal="0.08">
              <div className="card-img tone-2" />
              <span className="card-glyph">ISAPS · WPATH · PRS · JPRAS</span>
              <div className="card-body">
                <small>
                  {pubs.length} {t.cards.academic.unit}
                </small>
                <strong>{t.cards.academic.title}</strong>
                <span>{t.cards.academic.body}</span>
              </div>
            </Link>
            <Link className="card" href={`${localePath(locale, '/work')}#lecture`} data-reveal="0.16">
              <div className="card-img tone-3" />
              <span className="card-glyph">{[...new Set(lectures.map((x) => x.city).filter(Boolean))].slice(0, 5).join(' · ')}</span>
              <div className="card-body">
                <small>
                  {lectures.length} {t.cards.lectures.unit}
                </small>
                <strong>{t.cards.lectures.title}</strong>
                <span>{t.cards.lectures.body}</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Research */}
      <section className="section light">
        <div className="wrap split">
          <div>
            <span className="eyebrow">02 — {t.research}</span>
            <h2 className="h2">{t.researchTitle}</h2>
            <p className="lede">{t.researchBody}</p>
            <Link className="textlink" href={localePath(locale, '/academic')}>
              {t.allPublications} →
            </Link>
          </div>
          <ul className="pubs">
            {featuredPubs.map((p) => {
              const href = paperLink(p)
              const inner = (
                <>
                  <span className="pub-year">{p.year ?? ''}</span>
                  <span>
                    <span className="pub-title">{p.title}</span>
                    <span className="pub-journal">{p.journal}</span>
                  </span>
                  {href ? <ArrowUpRight /> : <span />}
                </>
              )
              return (
                <li className="pub" key={p.id} data-reveal>
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

      {/* Film */}
      {film ? (
        <section className="section" id="film">
          <div className="wrap">
            <div className="film-head">
              <span className="eyebrow">03 — {t.film}</span>
              <h2 className="h2">{t.filmTitle}</h2>
            </div>
            <div data-reveal>
              <YouTube id={film.youtube} title={film.title} playLabel={t.play} />
            </div>
          </div>
        </section>
      ) : null}

      {/* Archive teaser */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">04 — {t.archive}</span>
              <h2 className="h2">{t.archiveTitle}</h2>
            </div>
            <Link className="btn btn-light" href={localePath(locale, '/work')}>
              {t.openArchive}
            </Link>
          </div>
          <div className="masonry">
            {teaser.map((it, i) => (
              <Link key={it.key} className="tile" href={`${localePath(locale, '/work')}#${it.cat}`} data-reveal={String((i % 4) * 0.06)}>
                <span className="tile-media" style={{ display: 'block', aspectRatio: i % 3 === 1 ? '1 / 1' : '16 / 9' }}>
                  <span className="badge">{t.cat[it.cat]}</span>
                  <Image
                    src={it.youtube ? youTubeThumb(it.youtube) : it.image!.src}
                    alt=""
                    fill
                    sizes="(max-width: 440px) 100vw, (max-width: 760px) 50vw, 25vw"
                    // YouTube thumbnails carry letterbox bars; zoom past them in square tiles.
                    style={it.youtube && i % 3 === 1 ? { transform: 'scale(1.34)' } : undefined}
                  />
                </span>
                <span className="tile-cap">
                  <b>{it.title}</b>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
