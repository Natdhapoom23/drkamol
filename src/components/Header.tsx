'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { localePath, type Locale } from '@/i18n/config'
import type { Dict } from '@/i18n/dict'

type Props = { locale: Locale; t: Dict; appointmentUrl?: string | null }

/** Strip the "/th" prefix to get the page path shared by both languages. */
const basePath = (pathname: string) => pathname.replace(/^\/th(?=\/|$)/, '') || '/'

export function Header({ locale, t, appointmentUrl }: Props) {
  const pathname = usePathname() || '/'
  const path = basePath(pathname)
  const links = [
    { href: '/work', label: t.nav.work },
    { href: '/academic', label: t.nav.academic },
    { href: '/about', label: t.nav.about },
  ]
  const current = (href: string) => (path === href || path.startsWith(`${href}/`) ? 'page' : undefined)

  return (
    <header className="header">
      <div className="wrap header-in">
        <Link href={localePath(locale, '/')} className="logo">
          Dr. Kamol<span>.</span>
        </Link>
        <nav className="nav" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={localePath(locale, l.href)} aria-current={current(l.href)}>
              {l.label}
            </Link>
          ))}
          <a href="#contact">{t.nav.contact}</a>
        </nav>
        <div className="header-actions">
          <div className="lang" role="group" aria-label={t.langLabel}>
            <Link href={localePath('en', path)} hrefLang="en" lang="en" aria-current={locale === 'en'}>
              EN
            </Link>
            <Link href={localePath('th', path)} hrefLang="th" lang="th" aria-current={locale === 'th'}>
              ไทย
            </Link>
          </div>
          {appointmentUrl ? (
            <a className="btn btn-gold" href={appointmentUrl} target="_blank" rel="noopener">
              {t.consult}
            </a>
          ) : null}
        </div>
      </div>
      <nav className="mobile-nav" aria-label="Main (mobile)">
        {links.map((l) => (
          <Link key={l.href} href={localePath(locale, l.href)} aria-current={current(l.href)}>
            {l.label}
          </Link>
        ))}
        <a href="#contact">{t.nav.contact}</a>
      </nav>
    </header>
  )
}
