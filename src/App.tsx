import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type Product = {
  name: string
  tone: string
  eyebrow: string
  price: string
  description: string
  bullets: string[]
}

type UseCase = {
  title: string
  description: string
  accent: string
}

type Metric = {
  value: string
  label: string
  detail: string
}

type Faq = {
  question: string
  answer: string
}

const products: Product[] = [
  {
    name: 'Residential Swirl',
    tone: 'strawberry',
    eyebrow: 'Rotating + sticky',
    price: 'from $3.80 / GB',
    description: 'Real household IPs for checkouts, scraping, market research, and regional testing.',
    bullets: ['195+ countries', 'Sticky sessions to 120m', 'Instant endpoint generation']
  },
  {
    name: 'Mobile Sherbet',
    tone: 'mint',
    eyebrow: '4G / 5G carrier trust',
    price: 'from $4.40 / GB',
    description: 'Carrier-grade routes for harder targets where account trust and device reputation matter.',
    bullets: ['US and global carriers', 'Rotation controls', 'High-trust ASN mix']
  },
  {
    name: 'ISP Vanilla',
    tone: 'vanilla',
    eyebrow: 'Static residential',
    price: 'from $2.95 / proxy',
    description: 'Dedicated ISP endpoints with residential reputation and datacenter-like stability.',
    bullets: ['Static IPs', 'Unlimited-session tasks', 'Private allocation']
  },
  {
    name: 'Datacenter Crunch',
    tone: 'blueberry',
    eyebrow: 'Speed-first pool',
    price: 'from $1.20 / GB',
    description: 'Fast rotating datacenter IPs for volume workloads that need throughput over stealth.',
    bullets: ['Low-latency routing', 'Bulk generation', 'Concurrent tasks']
  },
  {
    name: 'Retail Float',
    tone: 'pistachio',
    eyebrow: 'Drop-ready routing',
    price: 'custom plans',
    description: 'A tuned bundle for sneaker drops, retail monitors, queue holds, and launch-day bursts.',
    bullets: ['Bot-friendly exports', 'Site templates', 'Discord support']
  }
]

const useCases: UseCase[] = [
  {
    title: 'Sneaker drops',
    description: 'Queue, monitor, and checkout with regional pools tuned for high-pressure releases.',
    accent: 'strawberry'
  },
  {
    title: 'Retail automation',
    description: 'Run restock monitors, account workflows, and marketplace checks without burning one pool.',
    accent: 'pistachio'
  },
  {
    title: 'Web scraping',
    description: 'Rotate clean routes, keep per-domain usage visible, and scale collection jobs by region.',
    accent: 'blueberry'
  },
  {
    title: 'Ad verification',
    description: 'Preview placements, search results, and localized pages from the markets your customers see.',
    accent: 'vanilla'
  }
]

const metrics: Metric[] = [
  {
    value: '99.97%',
    label: '30-day uptime',
    detail: 'Monitored gateway availability'
  },
  {
    value: '195+',
    label: 'Target countries',
    detail: 'Residential and mobile routing'
  },
  {
    value: '250K',
    label: 'Endpoints / batch',
    detail: 'Generated from one dashboard'
  },
  {
    value: '120m',
    label: 'Sticky sessions',
    detail: 'Stable IP windows for account tasks'
  }
]

const faqs: Faq[] = [
  {
    question: 'Do prepaid GB expire?',
    answer: 'No. Kream balance stays on the account, so teams can buy before a busy launch week and use it when traffic arrives.'
  },
  {
    question: 'Can I use sticky and rotating sessions together?',
    answer: 'Yes. Generate rotating endpoints for broad collection work, then switch to sticky session IDs when a workflow needs continuity.'
  },
  {
    question: 'What support channel is fastest?',
    answer: 'Discord tickets are the fastest route. The page is written for operators who need a real answer during active retail or scraping windows.'
  },
  {
    question: 'Is this only for sneaker bots?',
    answer: 'No. Sneaker workflows are one use case. Kream also supports compliant scraping, retail monitoring, ad QA, and geo-testing.'
  }
]

const workflow = [
  'Choose a flavor: residential, mobile, ISP, datacenter, or a retail bundle.',
  'Generate exactly the endpoint format your tools need: user/pass, sticky, country, state, or city.',
  'Watch bandwidth, domains, and session health from one compact control plane.'
]

const flavorTags = [
  'Residential',
  'Mobile',
  'ISP',
  'Datacenter',
  'Sneakers',
  'Retail',
  'Scraping',
  'Ad QA',
  'Social QA',
  'Geo testing'
]

const scrollProgressKey = 'kream-proxies-scroll-progress'

const splitWords = (text: string) => text.split(' ').filter(Boolean)

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
    // Ignore storage failures in private or restricted browsing modes.
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

const MaskedText = ({ text, className = '' }: { text: string; className?: string }) => (
  <span className={`masked-text ${className}`} aria-label={text}>
    {splitWords(text).map((word, index) => (
      <span className="mask-word" aria-hidden="true" key={`${text}-${word}-${index}`}>
        <span>{word}</span>
      </span>
    ))}
  </span>
)

const App = () => {
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

    const intro = gsap.timeline({
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
      .from('.hero .mask-word span', {
        yPercent: 112,
        skewY: 4,
        duration: 1,
        stagger: 0.028
      }, '-=0.32')
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

    document.fonts?.ready.then(stabilizeInitialScroll)
    window.addEventListener('load', stabilizeInitialScroll, { once: true })

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
      window.removeEventListener('load', stabilizeInitialScroll)
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
      <a className="nav-home" href="#top" aria-label="Back to top" onClick={() => closeMobileMenu()} ref={homeIconRef}>
        <span className="nav-home-mark">KP</span>
      </a>
      <button
        aria-controls="mobile-navigation"
        aria-expanded={isMobileMenuOpen}
        aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        ref={menuToggleRef}
        type="button"
      >
        <span aria-hidden="true" className="menu-toggle-line" />
        <span aria-hidden="true" className="menu-toggle-line" />
        <span aria-hidden="true" className="menu-toggle-line" />
      </button>
      <div
        aria-hidden={!isMobileMenuOpen}
        aria-label="Mobile navigation"
        aria-modal="true"
        className="mobile-menu"
        id="mobile-navigation"
        inert={!isMobileMenuOpen}
        ref={mobileMenuRef}
        role="dialog"
      >
        <button
          aria-label="Close navigation menu"
          className="mobile-menu-backdrop"
          onClick={() => closeMobileMenu(true)}
          tabIndex={-1}
          type="button"
        />
        <div className="mobile-menu-panel">
          <p className="mobile-menu-kicker mobile-menu-detail">Kream Proxies / Navigation</p>
          <nav className="mobile-menu-links" aria-label="Mobile navigation links">
            <a className="mobile-menu-item" href="#products" onClick={() => closeMobileMenu(true)}>
              <span>Products</span>
              <small aria-hidden="true">01</small>
            </a>
            <a className="mobile-menu-item" href="#use-cases" onClick={() => closeMobileMenu(true)}>
              <span>Use cases</span>
              <small aria-hidden="true">02</small>
            </a>
            <a className="mobile-menu-item" href="#pricing" onClick={() => closeMobileMenu(true)}>
              <span>Pricing</span>
              <small aria-hidden="true">03</small>
            </a>
            <a className="mobile-menu-item" href="#faq" onClick={() => closeMobileMenu(true)}>
              <span>FAQ</span>
              <small aria-hidden="true">04</small>
            </a>
            <a className="mobile-menu-item mobile-menu-login" href="#start" onClick={() => closeMobileMenu(true)}>Login</a>
          </nav>
          <div className="mobile-menu-footer mobile-menu-detail">
            <p>Ice-cold routing for serious operators.</p>
            <span>Residential / Mobile / ISP / DC</span>
          </div>
        </div>
      </div>
      <nav className="nav" aria-label="Main navigation" ref={navRef}>
        <a className="brand" href="#top" aria-label="Kream Proxies home">
          <span className="brand-mark">KP</span>
          <span>Kream Proxies</span>
        </a>
        <div className="nav-links">
          <a href="#products">Products</a>
          <a href="#use-cases">Use cases</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </div>
        <a className="nav-cta" href="#start">Start scooping</a>
      </nav>
      <div className="ambient-orb one" />
      <div className="ambient-orb two" />
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow reveal-copy">Residential · Mobile · ISP · Datacenter</p>
          <h1>
            <MaskedText text="Proxy infrastructure with ice-cold routing." />
          </h1>
          <p className="hero-lede reveal-copy">
            Kream Proxies gives operators one clean control plane for rotating residential IPs,
            carrier-grade mobile routes, static ISP endpoints, and high-throughput datacenter pools.
          </p>
          <div className="hero-actions reveal-copy">
            <a className="button primary" href="#pricing">View flavors</a>
            <a className="button ghost" href="#products">Compare products</a>
          </div>
          {/* <div className="hero-proof reveal-copy" aria-label="Key platform facts">
            <span>No subscriptions</span>
            <span>Setup in 60 seconds</span>
            <span>Discord support</span>
          </div> */}
        </div>

        <div className="hero-visual" aria-label="Kream Proxies network dashboard illustration">
          <div className="dashboard-card live-card">
            <div className="card-topline">
              <span>Live mix</span>
              <span className="status-dot">Operational</span>
            </div>
            <strong>4.7M</strong>
            <p>fresh endpoints generated this week</p>
            <div className="chart" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, index) => (
                <span className="chart-bar" key={index} style={{ height: `${32 + (index % 6) * 9}%` }} />
              ))}
            </div>
          </div>

          <div className="dashboard-card session-card">
            <div>
              <span className="card-label">Sticky session</span>
              <strong>120m</strong>
            </div>
            <p>Hold the same route while accounts warm, carts queue, or QA sessions stay alive.</p>
          </div>

          {/* <div className="orbit-chip chip-a">US · UK · JP</div>
          <div className="orbit-chip chip-b">Stripe + SOL</div>
          <div className="orbit-chip chip-c">250K batch</div> */}
        </div>
      </section>

      <section className="flavor-marquee" aria-label="Supported proxy flavors and workflows">
        <div className="marquee-track">
          {[...flavorTags, ...flavorTags].map((tag, index) => (
            <span key={`${tag}-${index}`}>{tag}</span>
          ))}
        </div>
      </section>

      <section className="metrics section-pad" aria-label="Kream Proxies network metrics">
        <div className="section-heading scroll-reveal">
          <p className="eyebrow">Proof wall</p>
          <h2 className="masked-scroll">
            <MaskedText text="Numbers that taste better than marketing claims." />
          </h2>
        </div>
        <div className="metric-grid">
          {metrics.map((metric) => (
            <article className="metric-tile" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="products section-pad">
        <div className="section-heading scroll-reveal" id="products">
          <p className="eyebrow">Products</p>
          <h2 className="masked-scroll">
            <MaskedText text="Five proxy flavors, one operational freezer." />
          </h2>
          <p>
            Buy by workload instead of guessing. Every plan shares the same dashboard,
            exports, usage reporting, and support pipeline.
          </p>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article className={`product-card tone-${product.tone}`} key={product.name}>
              <div className="product-top">
                <span>{product.eyebrow}</span>
                <span className="mini-scoop" />
              </div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <strong>{product.price}</strong>
              <ul>
                {product.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <a href="#start">Build with {product.name.split(' ')[0]}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="control-plane section-pad">
        <div className="panel-copy scroll-reveal" id="pricing">
          <p className="eyebrow">Control plane</p>
          <h2 className="masked-scroll">
            <MaskedText text="Generate, paste, ship, then know exactly where every GB went." />
          </h2>
          <p>
            The design doc called for compact operational hierarchy, so Kream keeps the
            page centered on a dashboard language: live usage, route health, country mix,
            and billing clarity before decorative fluff.
          </p>
        </div>
        <div className="console-card scroll-reveal">
          <div className="console-header">
            <span>kream://generate</span>
            <span>ready</span>
          </div>
          <div className="console-row">
            <span>product</span>
            <strong>residential-swirl</strong>
          </div>
          <div className="console-row">
            <span>geo</span>
            <strong>us, ca, uk, de, jp</strong>
          </div>
          <div className="console-row">
            <span>session</span>
            <strong>sticky-90</strong>
          </div>
          <div className="console-row">
            <span>format</span>
            <strong>host:port:user:pass</strong>
          </div>
          <button type="button">Generate 25,000 endpoints</button>
        </div>
      </section>

      <section className="use-cases section-pad">
        <div className="section-heading scroll-reveal" id="use-cases">
          <p className="eyebrow">Use cases</p>
          <h2 className="masked-scroll">
            <MaskedText text="Built for real operator workflows, not showroom demos." />
          </h2>
        </div>
        <div className="use-grid">
          {useCases.map((useCase) => (
            <article className={`use-card accent-${useCase.accent}`} key={useCase.title}>
              <span />
              <h3>{useCase.title}</h3>
              <p>{useCase.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="workflow section-pad">
        <div className="section-heading scroll-reveal">
          <p className="eyebrow">How it works</p>
          <h2 className="masked-scroll">
            <MaskedText text="Three scoops from signup to live traffic." />
          </h2>
        </div>
        <div className="workflow-grid">
          {workflow.map((step, index) => (
            <article className="workflow-step" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="faq section-pad">
        <div className="section-heading scroll-reveal" id="faq">
          <p className="eyebrow">FAQ</p>
          <h2 className="masked-scroll">
            <MaskedText text="Common questions before the first scoop." />
          </h2>
        </div>
        <div className="faq-grid">
          {faqs.map((faq) => (
            <article className="faq-card" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta" id="start">
        <p className="eyebrow">Fast path</p>
        <h2 className="masked-scroll">
          <MaskedText text="Open the freezer. Ship better proxy routes today." />
        </h2>
        <p>
          Start with prepaid GB, build a custom high-volume plan, or open a Discord ticket
          for region-specific routing before a launch.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="mailto:sales@kreamproxies.com">Talk to sales</a>
          <a className="button ghost" href="#products">Review products</a>
        </div>
      </section>

      <footer className="footer">
        <span>Kream Proxies</span>
        <span>Residential · Mobile · ISP · Datacenter</span>
        <span>Built by Jabbar Studios.</span>
      </footer>
    </main>
  )
}

export default App
