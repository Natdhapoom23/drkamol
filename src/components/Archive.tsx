'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { Dict } from '@/i18n/dict'
import { youTubeThumb } from '@/lib/youtube'

import { ArrowUpRight, Close, Play } from './Icons'
import { YouTube } from './YouTube'

export type ArchiveItem = {
  key: string
  cat: 'video' | 'lecture' | 'publication' | 'award' | 'patient' | 'conference' | 'press' | 'hospital'
  title: string
  sub?: string
  year?: number | null
  body?: string
  youtube?: string
  image?: { src: string; width: number; height: number; alt: string } | null
  link?: string | null
  page?: string | null
  tone?: number
}

const PAGE = 24

export function Archive({ items, t }: { items: ArchiveItem[]; t: Dict }) {
  const cats = useMemo(() => {
    const order: ArchiveItem['cat'][] = ['patient', 'video', 'lecture', 'publication', 'award', 'conference', 'press', 'hospital']
    return order
      .map((c) => ({ c, n: items.filter((i) => i.cat === c).length }))
      .filter((x) => x.n > 0)
  }, [items])

  const [filter, setFilter] = useState<'all' | ArchiveItem['cat']>('all')
  const [shown, setShown] = useState(PAGE)
  const [open, setOpen] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  // Allow deep links such as /work#lecture from the home page cards.
  useEffect(() => {
    const h = window.location.hash.slice(1)
    if (h && cats.some((x) => x.c === h)) setFilter(h as ArchiveItem['cat'])
  }, [cats])

  const list = useMemo(() => (filter === 'all' ? items : items.filter((i) => i.cat === filter)), [items, filter])
  const visible = list.slice(0, shown)
  const cur = open !== null ? list[open] : null

  const pick = (c: typeof filter) => {
    setFilter(c)
    setShown(PAGE)
    setOpen(null)
    history.replaceState(null, '', c === 'all' ? window.location.pathname : `#${c}`)
  }

  const close = useCallback(() => {
    setOpen(null)
    returnFocus.current?.focus()
  }, [])
  const step = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + list.length) % list.length)),
    [list.length],
  )

  useEffect(() => {
    if (open === null) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, close, step])

  return (
    <>
      <div className="chips" role="toolbar" aria-label={t.filterLabel}>
        <button type="button" className="chip" aria-pressed={filter === 'all'} onClick={() => pick('all')}>
          {t.all} <span>{items.length}</span>
        </button>
        {cats.map(({ c, n }) => (
          <button key={c} type="button" className="chip" aria-pressed={filter === c} onClick={() => pick(c)}>
            {t.cat[c]} <span>{n}</span>
          </button>
        ))}
      </div>

      <div className="masonry">
        {visible.map((it, i) => (
          <button
            key={it.key}
            type="button"
            className="tile"
            onClick={(e) => {
              returnFocus.current = e.currentTarget
              setOpen(i)
            }}
          >
            <Tile it={it} t={t} />
          </button>
        ))}
      </div>

      {shown < list.length ? (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 32 }}>
          <button type="button" className="btn btn-ghost" onClick={() => setShown((s) => s + PAGE)}>
            {t.loadMore}
          </button>
        </div>
      ) : null}

      {cur ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={cur.title}
          data-lenis-prevent
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="lb-panel">
            <div className="lb-media">
              {cur.youtube ? (
                <YouTube key={cur.youtube} id={cur.youtube} title={cur.title} playLabel={t.play} autoplay />
              ) : cur.image ? (
                <div className="lb-poster">
                  <Image src={cur.image.src} alt={cur.image.alt} fill sizes="(max-width: 1100px) 100vw, 760px" />
                </div>
              ) : (
                <div className={`lb-poster tone-${cur.tone ?? 1}`} style={{ display: 'flex', alignItems: 'flex-end', padding: 32 }}>
                  <span style={{ fontSize: 'clamp(64px, 10vw, 140px)', fontWeight: 300, letterSpacing: '-0.05em', lineHeight: 1, color: 'var(--gold)' }}>
                    {cur.year ?? '—'}
                  </span>
                </div>
              )}
            </div>
            <div className="lb-info">
              <div className="lb-top">
                <span className="eyebrow">{t.cat[cur.cat]}</span>
                <button ref={closeRef} type="button" className="icon-btn" aria-label={t.close} onClick={close}>
                  <Close />
                </button>
              </div>
              <h2>{cur.title}</h2>
              {cur.sub ? <p>{cur.sub}</p> : null}
              {cur.body ? <p style={{ color: 'var(--text-3)' }}>{cur.body}</p> : null}
              <div className="tags">{cur.year ? <span className="tag">{cur.year}</span> : null}</div>
              {cur.link ? (
                <a className="btn btn-ghost" href={cur.link} target="_blank" rel="noopener" style={{ alignSelf: 'flex-start' }}>
                  {cur.cat === 'video' ? t.watchOn : t.readPaper} <ArrowUpRight />
                </a>
              ) : null}
              {cur.page ? (
                <Link className="btn btn-light" href={cur.page} style={{ alignSelf: 'flex-start' }}>
                  {cur.title} <ArrowUpRight />
                </Link>
              ) : null}
              <div className="lb-nav">
                <button type="button" className="btn btn-ghost" onClick={() => step(-1)}>
                  ← {t.prev}
                </button>
                <button type="button" className="btn btn-light" onClick={() => step(1)}>
                  {t.next} →
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

function Tile({ it, t }: { it: ArchiveItem; t: Dict }) {
  if (it.youtube) {
    // Every third film gets a square tile for a Pinterest-like rhythm.
    const square = [...it.key].reduce((a, c) => a + c.charCodeAt(0), 0) % 3 === 0
    return (
      <>
        <span className="tile-media" style={{ display: 'block', aspectRatio: square ? '1 / 1' : '16 / 9' }}>
          <span className="badge">{t.cat[it.cat]}</span>
          <Image
            src={youTubeThumb(it.youtube)}
            alt=""
            fill
            sizes="(max-width: 440px) 100vw, (max-width: 760px) 50vw, 25vw"
            // YouTube thumbnails carry letterbox bars; zoom past them in square tiles.
            style={square ? { transform: 'scale(1.34)' } : undefined}
          />
          <span className="tile-play" aria-hidden="true">
            <Play size={16} />
          </span>
        </span>
        <span className="tile-cap">
          <b>{it.title}</b>
          {it.sub ? <span>{it.sub}</span> : null}
        </span>
      </>
    )
  }
  if (it.image) {
    return (
      <>
        <span className="tile-media" style={{ display: 'block', aspectRatio: `${it.image.width} / ${it.image.height}` }}>
          <span className="badge">{t.cat[it.cat]}</span>
          <Image src={it.image.src} alt={it.image.alt} fill sizes="(max-width: 440px) 100vw, (max-width: 760px) 50vw, 25vw" />
        </span>
        <span className="tile-cap">
          <b>{it.title}</b>
          {it.sub ? <span>{it.sub}</span> : null}
        </span>
      </>
    )
  }
  // Text tiles (lectures, publications, awards) give the grid its varied rhythm.
  const light = it.cat === 'publication'
  return (
    <span
      className={`tile-media ${light ? '' : `tone-${it.tone ?? 1}`}`}
      style={{ display: 'block', ...(light ? { background: 'var(--paper)', color: 'var(--dark-text)' } : {}) }}
    >
      <span className="tile-text">
        <span
          className="eyebrow"
          style={{ fontSize: 11, color: light ? 'var(--gold-ink)' : it.cat === 'award' ? 'var(--gold)' : 'var(--text-2)' }}
        >
          {t.cat[it.cat]}
        </span>
        {it.year ? <em style={light ? { color: 'var(--gold-ink)' } : undefined}>{it.year}</em> : null}
        <strong>{it.title}</strong>
        {it.sub ? <span style={{ fontSize: 13, color: light ? 'var(--dark-text-2)' : 'var(--text-3)' }}>{it.sub}</span> : null}
      </span>
    </span>
  )
}
