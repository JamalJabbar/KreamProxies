import type { RefObject } from 'react'

type SiteNavigationProps = {
  isMobileMenuOpen: boolean
  homeIconRef: RefObject<HTMLAnchorElement | null>
  menuToggleRef: RefObject<HTMLButtonElement | null>
  mobileMenuRef: RefObject<HTMLDivElement | null>
  navRef: RefObject<HTMLElement | null>
  closeMobileMenu: (restoreFocus?: boolean) => void
  toggleMobileMenu: () => void
}

export function SiteNavigation({
  isMobileMenuOpen,
  homeIconRef,
  menuToggleRef,
  mobileMenuRef,
  navRef,
  closeMobileMenu,
  toggleMobileMenu
}: SiteNavigationProps) {
  return (
    <>
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
            <a className="mobile-menu-item mobile-menu-login" href="#start" onClick={() => closeMobileMenu(true)}>
              Login
            </a>
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
    </>
  )
}
