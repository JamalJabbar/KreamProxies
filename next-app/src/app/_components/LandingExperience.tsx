'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SiteNavigation } from '@/components/SiteNavigation'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const scrollProgressKey = 'kream-proxies-scroll-progress'

const getMaxScroll = () => {
  const doc = document.documentElement
  const body = document.body

  return Math.max(doc.scrollHeight, body?.scrollHeight ?? 0) - window.innerHeight
}

const clampProgress = (value: number) => Math.min(1, Math.max(0, value))

const readSavedScrollProgress = () => {
  try {
    const raw = sessionStorage.getItem(scrollProgressKey)

    if (!raw) {
      return 0
    }

    const parsed = Number(raw)

    return Number.isFinite(parsed) ? clampProgress(parsed) : 0
  } catch {
    return 0
  }
}

const persistScrollProgress = () => {
  try {
    const maxScroll = getMaxScroll()
    const progress = maxScroll > 0 ? clampProgress(window.scrollY / maxScroll) : 0

    sessionStorage.setItem(scrollProgressKey, String(progress))
  } catch {
    // Storage may be unavailable in private or restricted browsing modes.
  }
}

const restoreSavedScrollProgress = () => {
  const progress = readSavedScrollProgress()
  const maxScroll = getMaxScroll()
  const targetScroll = maxScroll > 0 ? Math.round(progress * maxScroll) : 0
  const html = document.documentElement
  const previousScrollBehavior = html.style.scrollBehavior

  html.style.scrollBehavior = 'auto'
  window.scrollTo({ left: 0, top: targetScroll, behavior: 'auto' })
  html.style.scrollBehavior = previousScrollBehavior
}

type LandingExperienceProps = {
  children: ReactNode
}

export function LandingExperience({ children }: LandingExperienceProps) {
  const rootRef = useRef<HTMLElement | null>(null)
  const navRef = useRef<HTMLElement | null>(null)
  const homeIconRef = useRef<HTMLAnchorElement | null>(null)
  const menuToggleRef = useRef<HTMLButtonElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const mobileMenuTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    const menuItems = Array.from(
      mobileMenuRef.current?.querySelectorAll<HTMLAnchorElement>('.mobile-menu-item') ?? []
    )
    const focusableControls = menuToggleRef.current
      ? [...menuItems, menuToggleRef.current]
      : menuItems

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        mobileMenuTimelineRef.current?.reverse()
        setIsMobileMenuOpen(false)
        window.requestAnimationFrame(() => menuToggleRef.current?.focus())
        return
      }

      if (event.key !== 'Tab' || !focusableControls.length) {
        return
      }

      const firstItem = focusableControls[0]
      const lastItem = focusableControls[focusableControls.length - 1]

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault()
        lastItem.focus()
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault()
        firstItem.focus()
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    const focusFrame = window.requestAnimationFrame(() => menuItems[0]?.focus())

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      window.cancelAnimationFrame(focusFrame)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const mobileHeader = window.matchMedia('(max-width: 980px)')
    const closeWhenDesktop = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        mobileMenuTimelineRef.current?.reverse()
        setIsMobileMenuOpen(false)
      }
    }

    mobileHeader.addEventListener('change', closeWhenDesktop)

    return () => mobileHeader.removeEventListener('change', closeWhenDesktop)
  }, [])

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = rootRef.current
    let isMounted = true
    let saveScrollFrame = 0

    if (!root) {
      return
    }

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    const schedulePersistScrollProgress = () => {
      if (saveScrollFrame !== 0) {
        return
      }

      saveScrollFrame = window.requestAnimationFrame(() => {
        saveScrollFrame = 0
        persistScrollProgress()
      })
    }

    window.addEventListener('scroll', schedulePersistScrollProgress, { passive: true })
    window.addEventListener('pagehide', persistScrollProgress)
    window.addEventListener('beforeunload', persistScrollProgress)

    gsap.defaults({
      duration: 0.82,
      ease: 'power3.out'
    })

    restoreSavedScrollProgress()

    const headerMedia = gsap.matchMedia()

    headerMedia.add(
      {
        mobile: '(max-width: 980px)',
        desktop: '(min-width: 981px)'
      },
      (context) => {
        if (context.conditions?.mobile) {
          gsap.set(homeIconRef.current, {
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            transformOrigin: 'center center'
          })

          return
        }

        gsap.set(navRef.current, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          transformOrigin: 'top center'
        })

        gsap.set(homeIconRef.current, {
          autoAlpha: 0,
          scale: 0.84,
          x: -12,
          y: -12,
          transformOrigin: 'center center'
        })

        if (prefersReducedMotion) {
          return
        }

        gsap.timeline({
          defaults: {
            ease: 'none'
          },
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '+=180',
            scrub: 0.45,
            invalidateOnRefresh: true
          }
        })
          .to(navRef.current, {
            autoAlpha: 0,
            scale: 0.97,
            y: -16
          }, 0)
          .to(homeIconRef.current, {
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0
          }, 0)
      }
    )

    if (prefersReducedMotion) {
      document.documentElement.classList.remove('hero-intro-pending')
      gsap.set(root.querySelectorAll('.mask-word span, .reveal-copy, .scroll-reveal, .product-card, .use-card, .metric-tile, .faq-card'), {
        autoAlpha: 1,
        y: 0,
        yPercent: 0,
        scale: 1,
        clearProps: 'transform,visibility,opacity'
      })

      document.fonts?.ready.then(() => {
        if (!isMounted) {
          return
        }

        ScrollTrigger.refresh()
        restoreSavedScrollProgress()
      })

      return () => {
        isMounted = false
        window.removeEventListener('scroll', schedulePersistScrollProgress)
        window.removeEventListener('pagehide', persistScrollProgress)
        window.removeEventListener('beforeunload', persistScrollProgress)
        window.cancelAnimationFrame(saveScrollFrame)
        headerMedia.revert()
      }
    }

    gsap.set('.product-card, .use-card, .metric-tile, .faq-card, .workflow-step', {
      autoAlpha: 0,
      y: 34,
      scale: 0.985
    })

    const heroWords = root.querySelectorAll<HTMLElement>('.hero .mask-word span')
    const showHeroWords = () => {
      gsap.set(heroWords, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
        scale: 1,
        skewX: 0,
        skewY: 0,
        rotation: 0,
        force3D: true
      })
    }

    gsap.set(heroWords, {
      autoAlpha: 0,
      x: 0,
      y: 0,
      xPercent: 0,
      yPercent: 130,
      scale: 0.98,
      skewX: 0,
      skewY: 4,
      rotation: 0,
      transformOrigin: '50% 100%',
      force3D: true
    })
    document.documentElement.classList.remove('hero-intro-pending')

    const intro = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'power4.out'
      }
    })

    intro
      .from('.site-shell', {
        autoAlpha: 0,
        duration: 0.18
      })
      .from('.nav', {
        autoAlpha: 0,
        y: -26,
        duration: 0.7
      })
      .set(heroWords, {
        autoAlpha: 1
      }, '-=0.32')
      .to(
        heroWords,
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          xPercent: 0,
          yPercent: 0,
          scale: 1,
          skewX: 0,
          skewY: 0,
          rotation: 0,
          duration: 1,
          stagger: 0.028,
          onComplete: showHeroWords
        },
        '-=0.32'
      )
      .from('.hero .reveal-copy', {
        autoAlpha: 0,
        y: 28,
        duration: 0.78,
        stagger: 0.08
      }, '-=0.76')
      .from('.dashboard-card, .orbit-chip', {
        autoAlpha: 0,
        y: 36,
        scale: 0.95,
        duration: 0.82,
        stagger: 0.08
      }, '-=0.64')

    gsap.to('.scroll-meter', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.35
      }
    })

    gsap.to('.hero-visual', {
      y: 82,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.85
      }
    })

    gsap.to('.ambient-orb.one', {
      x: -60,
      y: 190,
      rotation: 24,
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.15
      }
    })

    gsap.to('.ambient-orb.two', {
      x: 70,
      y: -170,
      rotation: -18,
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.25
      }
    })

    gsap.utils.toArray<HTMLElement>('.masked-scroll').forEach((element) => {
      gsap.from(element.querySelectorAll('.mask-word span'), {
        yPercent: 112,
        skewY: 3,
        duration: 0.86,
        stagger: 0.032,
        scrollTrigger: {
          trigger: element,
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    ScrollTrigger.batch('.product-card, .use-card, .metric-tile, .faq-card, .workflow-step', {
      start: 'top 86%',
      end: 'bottom 12%',
      interval: 0.08,
      batchMax: 4,
      onEnter: (batch) => {
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          overwrite: true
        })
      },
      onLeaveBack: (batch) => {
        gsap.to(batch, {
          autoAlpha: 0,
          y: 34,
          scale: 0.985,
          stagger: 0.05,
          overwrite: true
        })
      }
    })

    gsap.utils.toArray<HTMLElement>('.scroll-reveal').forEach((element) => {
      gsap.from(element, {
        autoAlpha: 0,
        y: 44,
        duration: 0.88,
        scrollTrigger: {
          trigger: element,
          start: 'top 84%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    gsap.to('.marquee-track', {
      xPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.flavor-marquee',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.75
      }
    })

    gsap.to('.chart-bar', {
      scaleY: () => gsap.utils.random(0.35, 1),
      transformOrigin: '50% 100%',
      stagger: {
        each: 0.06,
        repeat: 5,
        yoyo: true
      },
      duration: 0.62,
      ease: 'sine.inOut',
      scrollTrigger: {
        trigger: '.hero-visual',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    const stabilizeInitialScroll = () => {
      if (!isMounted) {
        return
      }

      ScrollTrigger.refresh()
      restoreSavedScrollProgress()
    }

    let introHasPlayed = false
    let introFallbackTimeout = 0
    const playIntro = () => {
      if (!isMounted || introHasPlayed) {
        return
      }

      introHasPlayed = true
      window.clearTimeout(introFallbackTimeout)
      stabilizeInitialScroll()
      intro.play(0)
    }

    const fontsReady = document.fonts?.ready ?? Promise.resolve()

    fontsReady.then(stabilizeInitialScroll).catch(() => undefined)

    if (document.readyState === 'complete') {
      requestAnimationFrame(playIntro)
    } else {
      window.addEventListener('load', playIntro, { once: true })
      introFallbackTimeout = window.setTimeout(playIntro, 1800)
    }

    requestAnimationFrame(() => {
      restoreSavedScrollProgress()
      requestAnimationFrame(restoreSavedScrollProgress)
    })

    return () => {
      isMounted = false
      window.removeEventListener('scroll', schedulePersistScrollProgress)
      window.removeEventListener('pagehide', persistScrollProgress)
      window.removeEventListener('beforeunload', persistScrollProgress)
      window.cancelAnimationFrame(saveScrollFrame)
      window.clearTimeout(introFallbackTimeout)
      window.removeEventListener('load', playIntro)
      headerMedia.revert()
    }
  }, { scope: rootRef })

  useGSAP(() => {
    const menu = mobileMenuRef.current
    const panel = menu?.querySelector<HTMLElement>('.mobile-menu-panel')
    const backdrop = menu?.querySelector<HTMLElement>('.mobile-menu-backdrop')
    const items = menu?.querySelectorAll<HTMLElement>('.mobile-menu-item')
    const details = menu?.querySelectorAll<HTMLElement>('.mobile-menu-detail')
    const lines = menuToggleRef.current?.querySelectorAll<HTMLElement>('.menu-toggle-line')

    if (!menu || !panel || !backdrop || !items || !details || !lines) {
      return
    }

    const menuMedia = gsap.matchMedia()

    menuMedia.add(
      {
        mobile: '(max-width: 980px)',
        reduceMotion: '(prefers-reduced-motion: reduce)'
      },
      (context) => {
        if (!context.conditions?.mobile) {
          return
        }

        const reduceMotion = Boolean(context.conditions.reduceMotion)
        const panelDuration = reduceMotion ? 0 : 0.62
        const detailDuration = reduceMotion ? 0 : 0.3

        gsap.set(menu, {
          autoAlpha: 0,
          pointerEvents: 'none'
        })
        gsap.set(backdrop, {
          autoAlpha: 0
        })
        gsap.set(panel, {
          scale: 0.94,
          transformOrigin: '100% 0%',
          xPercent: 106
        })
        gsap.set(items, {
          autoAlpha: 0,
          rotationY: -10,
          transformOrigin: '0% 50%',
          x: 26
        })
        gsap.set(details, {
          autoAlpha: 0,
          y: 12
        })
        gsap.set(lines, {
          autoAlpha: 1,
          rotation: 0,
          scaleX: 1,
          y: 0
        })

        const timeline = gsap.timeline({
          paused: true,
          defaults: {
            ease: 'power3.out'
          },
          onReverseComplete: () => {
            gsap.set(menu, {
              autoAlpha: 0,
              pointerEvents: 'none'
            })
          }
        })

        timeline
          .set(menu, {
            autoAlpha: 1,
            immediateRender: false,
            pointerEvents: 'auto'
          })
          .to(backdrop, {
            autoAlpha: 1,
            duration: reduceMotion ? 0 : 0.28
          }, 0)
          .to(panel, {
            duration: panelDuration,
            ease: 'power4.inOut',
            scale: 1,
            xPercent: 0
          }, 0)
          .to(items, {
            autoAlpha: 1,
            duration: detailDuration,
            rotationY: 0,
            stagger: reduceMotion ? 0 : 0.045,
            x: 0
          }, reduceMotion ? 0 : 0.2)
          .to(details, {
            autoAlpha: 1,
            duration: detailDuration,
            stagger: reduceMotion ? 0 : 0.05,
            y: 0
          }, reduceMotion ? 0 : 0.32)
          .to(lines[0], {
            duration: detailDuration,
            rotation: 45,
            y: 6
          }, 0)
          .to(lines[1], {
            autoAlpha: 0,
            duration: detailDuration,
            scaleX: 0
          }, 0)
          .to(lines[2], {
            duration: detailDuration,
            rotation: -45,
            y: -6
          }, 0)

        mobileMenuTimelineRef.current = timeline

        if (menu.getAttribute('aria-hidden') === 'false') {
          timeline.progress(1)
        }

        return () => {
          timeline.kill()
          mobileMenuTimelineRef.current = null
        }
      }
    )

    return () => menuMedia.revert()
  }, { scope: rootRef })

  const closeMobileMenu = (restoreFocus = false) => {
    mobileMenuTimelineRef.current?.reverse()
    setIsMobileMenuOpen(false)

    if (restoreFocus) {
      window.requestAnimationFrame(() => menuToggleRef.current?.focus())
    }
  }

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      mobileMenuTimelineRef.current?.reverse()
    } else {
      mobileMenuTimelineRef.current?.play()
    }

    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <main className="site-shell" ref={rootRef}>
      <div className="scroll-meter" />
      <SiteNavigation
        closeMobileMenu={closeMobileMenu}
        homeIconRef={homeIconRef}
        isMobileMenuOpen={isMobileMenuOpen}
        menuToggleRef={menuToggleRef}
        mobileMenuRef={mobileMenuRef}
        navRef={navRef}
        toggleMobileMenu={toggleMobileMenu}
      />
      <div className="ambient-orb one" />
      <div className="ambient-orb two" />
      {children}
    </main>
  )
}
