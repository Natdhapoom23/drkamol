import Image from 'next/image'
import { notFound } from 'next/navigation'

import { isLocale } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { asMedia, getProfile } from '@/lib/data'
import { alternates } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDict(locale)
  const p = await getProfile(locale)
  return { title: t.aboutTitle, description: p.intro || undefined, alternates: alternates(locale, '/about') }
}

const paras = (s?: string | null) => (s ? s.split(/\n{2,}/).filter(Boolean) : [])

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDict(locale)
  const p = await getProfile(locale)
  const portrait = asMedia(p.portrait)

  return (
    <>
      <div className="wrap page-head">
        <span className="eyebrow">{p.role}</span>
        <h1 className="h1">{p.name}</h1>
      </div>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap split">
          <div>
            <div style={{ position: 'relative', aspectRatio: '3 / 4', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
              <Image
                src={portrait?.url || '/images/dr-kamol-hero.jpg'}
                alt={portrait?.alt || p.name}
                fill
                sizes="(max-width: 900px) 100vw, 420px"
                style={{ objectFit: 'cover', objectPosition: '55% 20%' }}
              />
            </div>
          </div>
          <div className="prose">
            {paras(p.bio).map((x, i) => (
              <p key={i} data-reveal>
                {x}
              </p>
            ))}
          </div>
        </div>
      </section>

      {p.philosophy ? (
        <section className="band" style={{ height: 'auto', padding: 'clamp(96px, 12vw, 160px) 0' }} aria-label={t.inHisWords}>
          <div className="band-bg" data-parallax="0.25" aria-hidden="true" />
          <blockquote>
            <span className="eyebrow" style={{ display: 'block', marginBottom: 24 }}>
              {t.inHisWords}
            </span>
            {paras(p.philosophy).map((x, i) => (
              <p key={i} style={{ fontSize: 'clamp(22px, 2.4vw, 32px)' }} data-reveal>
                {x}
              </p>
            ))}
            <cite>— {p.name}</cite>
          </blockquote>
        </section>
      ) : null}

      <section className="section">
        <div className="wrap split">
          <div>
            <h2 className="h2">{t.education}</h2>
          </div>
          <ol className="timeline">
            {(p.education ?? []).map((e) => (
              <li key={e.id} data-reveal>
                <span className="t">{e.year}</span>
                <span>
                  <strong>{e.degree}</strong>
                  <span className="sub">{e.institution}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap split">
          <div>
            <h2 className="h2">{t.career}</h2>
          </div>
          <ol className="timeline">
            {(p.career ?? []).map((c) => (
              <li key={c.id} data-reveal>
                <span className="t">{c.period}</span>
                <span>
                  <strong>{c.role}</strong>
                  <span className="sub">{c.place}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
