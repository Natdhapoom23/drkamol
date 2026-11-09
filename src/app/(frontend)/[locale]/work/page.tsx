import { notFound } from 'next/navigation'

import { Archive } from '@/components/Archive'
import { isLocale } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { getArchiveItems } from '@/lib/archive'
import { alternates } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDict(locale)
  return { title: t.archive, description: t.workIntro, alternates: alternates(locale, '/work') }
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDict(locale)
  const items = await getArchiveItems(locale)

  return (
    <>
      <div className="wrap page-head">
        <span className="eyebrow">{t.archive}</span>
        <h1 className="h1">{t.archiveTitle}</h1>
        <p className="lede">{t.workIntro}</p>
      </div>
      <section className="wrap" style={{ paddingBottom: 120 }} aria-label={t.archive}>
        <Archive items={items} t={t} />
      </section>
    </>
  )
}
