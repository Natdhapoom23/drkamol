import type { Payload, PayloadRequest } from 'payload'

import * as data from './data'

const ctx = { skipRevalidate: true }

/** Writes the starting content in English, then adds the Thai translations. */
export async function seedContent(payload: Payload, req?: PayloadRequest) {
  const base = { req, context: ctx, overrideAccess: true } as const

  // Profile (global)
  const p = data.profile
  const profileFor = (lang: 'en' | 'th') => {
    const pick = (v: { en: string; th?: string }) => (lang === 'th' ? v.th ?? v.en : v.en)
    return {
      name: pick(p.name),
      role: pick(p.role),
      headlineA: pick(p.headlineA),
      headlineB: pick(p.headlineB),
      intro: pick(p.intro),
      wordA: pick(p.wordA),
      wordB: pick(p.wordB),
      wordC: pick(p.wordC),
      statement: pick(p.statement),
      bio: pick(p.bio),
      philosophy: pick(p.philosophy),
      quote: pick(p.quote),
      license: pick(p.license),
      stats: p.stats.map((s) => ({ value: s.value, label: pick(s.label), confirmed: s.confirmed })),
      education: p.education.map((e) => ({ year: e.year, degree: pick(e.degree), institution: pick(e.institution) })),
      career: p.career.map((c) => ({ period: c.period, role: pick(c.role), place: pick(c.place) })),
      memberships: p.memberships.map((m) => ({ name: pick(m) })),
    }
  }
  const en = await payload.updateGlobal({ ...base, slug: 'profile', locale: 'en', data: profileFor('en') })
  // Array rows must keep their ids so the Thai text lands on the same rows.
  const th = profileFor('th')
  const withIds = <T extends object>(rows: T[], existing?: { id?: string | null }[] | null) =>
    rows.map((r, i) => ({ ...r, id: existing?.[i]?.id ?? undefined }))
  await payload.updateGlobal({
    ...base,
    slug: 'profile',
    locale: 'th',
    data: {
      ...th,
      stats: withIds(th.stats, en.stats),
      education: withIds(th.education, en.education),
      career: withIds(th.career, en.career),
      memberships: withIds(th.memberships, en.memberships),
    },
  })

  // Settings (global)
  const s = data.settings
  await payload.updateGlobal({
    ...base,
    slug: 'settings',
    locale: 'en',
    data: {
      email: s.email,
      phone: s.phone,
      hospitalName: s.hospitalName.en,
      address: s.address.en,
      hospitalUrl: s.hospitalUrl,
      appointmentUrl: s.appointmentUrl,
      youtube: s.youtube,
      siteTitle: s.siteTitle.en,
      siteDescription: s.siteDescription.en,
    },
  })
  await payload.updateGlobal({
    ...base,
    slug: 'settings',
    locale: 'th',
    data: { hospitalName: s.hospitalName.th, siteTitle: s.siteTitle.th, siteDescription: s.siteDescription.th },
  })

  for (const pub of data.publications) {
    await payload.create({ ...base, collection: 'publications', locale: 'en', data: pub })
  }
  for (const l of data.lectures) {
    await payload.create({ ...base, collection: 'lectures', locale: 'en', data: { ...l, kind: (l.kind ?? 'lecture') as 'lecture' } })
  }
  for (const a of data.awards) {
    const doc = await payload.create({
      ...base,
      collection: 'awards',
      locale: 'en',
      data: { title: a.title.en, detail: a.detail?.en, organization: a.organization, year: a.year },
    })
    if (a.title.th) {
      await payload.update({
        ...base,
        collection: 'awards',
        id: doc.id,
        locale: 'th',
        data: { title: a.title.th, detail: a.detail?.th },
      })
    }
  }
  for (const v of data.videos) {
    await payload.create({
      ...base,
      collection: 'videos',
      locale: 'en',
      data: { ...v, category: v.category as 'gender' },
    })
  }
}
