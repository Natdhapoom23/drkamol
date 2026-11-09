import Link from 'next/link'

import { localePath, type Locale } from '@/i18n/config'
import type { Dict } from '@/i18n/dict'
import type { Setting } from '@/payload-types'

export function Footer({ locale, t, settings }: { locale: Locale; t: Dict; settings: Setting }) {
  return (
    <footer className="footer" id="contact">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link href={localePath(locale, '/')} className="logo" style={{ fontSize: 22 }}>
              Dr. Kamol<span>.</span>
            </Link>
            <span style={{ color: 'var(--text-3)' }}>{t.footerTag}</span>
          </div>
          <div>
            <h3>{t.visit}</h3>
            {settings.hospitalName ? <span>{settings.hospitalName}</span> : null}
            {settings.address ? <address>{settings.address}</address> : null}
          </div>
          <div>
            <h3>{t.contact}</h3>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
            {settings.phone ? <a href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`}>{settings.phone}</a> : null}
            {settings.appointmentUrl ? (
              <a href={settings.appointmentUrl} target="_blank" rel="noopener">
                {t.bookAt} ↗
              </a>
            ) : null}
          </div>
          <div>
            <h3>Links</h3>
            {settings.hospitalUrl ? (
              <a href={settings.hospitalUrl} target="_blank" rel="noopener">
                {settings.hospitalName || 'Kamol Hospital'} ↗
              </a>
            ) : null}
            {settings.youtube ? (
              <a href={settings.youtube} target="_blank" rel="noopener">
                YouTube ↗
              </a>
            ) : null}
            {settings.facebook ? (
              <a href={settings.facebook} target="_blank" rel="noopener">
                Facebook ↗
              </a>
            ) : null}
            {settings.instagram ? (
              <a href={settings.instagram} target="_blank" rel="noopener">
                Instagram ↗
              </a>
            ) : null}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Dr. Kamol Pansritum</span>
          <span>{t.consentNote}</span>
        </div>
      </div>
    </footer>
  )
}
