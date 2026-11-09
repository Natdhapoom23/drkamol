'use client'

import Image from 'next/image'
import { useState } from 'react'

import { youTubeThumb } from '@/lib/youtube'

type Props = { id: string; title: string; playLabel: string; priority?: boolean; autoplay?: boolean }

/**
 * Shows only a thumbnail until the visitor presses play, so YouTube's
 * ~1 MB player is never downloaded on page load (keeps PageSpeed green).
 */
export function YouTube({ id, title, playLabel, priority, autoplay }: Props) {
  const [active, setActive] = useState(Boolean(autoplay))
  return (
    <div className="yt">
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setActive(true)} aria-label={`${playLabel}: ${title}`}>
          <Image src={youTubeThumb(id)} alt="" fill sizes="(max-width: 1280px) 100vw, 1280px" priority={priority} />
          <span className="yt-play" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 14 14" fill="currentColor">
              <path d="M4 2v10l8-5z" />
            </svg>
          </span>
          <span className="yt-title">{title}</span>
        </button>
      )}
    </div>
  )
}
