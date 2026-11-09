'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Site-wide scroll motion: Lenis smooth scrolling, GSAP parallax on
 * [data-parallax="<speed>"] and fade-up on [data-reveal]. Loaded after the
 * page is interactive so it never blocks rendering, and switched off
 * entirely for visitors who prefer reduced motion.
 */
export function Motion() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.remove('js')
      return
    }
    let cleanup = () => {}
    let cancelled = false

    ;(async () => {
      try {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('lenis'),
      ])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)

      const lenis = new Lenis({ lerp: 0.11 })
      lenis.on('scroll', ScrollTrigger.update)
      const tick = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)

      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || '0.2')
          gsap.fromTo(
            el,
            { yPercent: -speed * 50 },
            {
              yPercent: speed * 50,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            delay: parseFloat(el.dataset.reveal || '0') || 0,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          })
        })
        // Statement words light up one after another while scrolling past.
        gsap.utils.toArray<HTMLElement>('[data-words] span').forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0.18 },
            { opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 45%', scrub: true } },
          )
        })
      })

      cleanup = () => {
        ctx.revert()
        gsap.ticker.remove(tick)
        lenis.destroy()
      }
      } catch {
        // If the animation code cannot load, show everything without motion.
        document.documentElement.classList.remove('js')
      }
    })()

    return () => {
      cancelled = true
      cleanup()
    }
  }, [pathname])

  return null
}
