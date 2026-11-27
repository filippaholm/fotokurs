import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Icon } from './Icons'
import footerDivider from '../assets/figma/footer-divider.svg'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Ljusrum – startsidan">Ljusrum</Link>
      <div className="menu-wrap">
        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? 'Stäng menyn' : 'Öppna menyn'}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        {menuOpen && (
          <nav id="site-menu" className="menu-panel" aria-label="Huvudmeny">
            <Link to="/" onClick={() => setMenuOpen(false)}>Startsida</Link>
            <Link to="/" hash="workshop" onClick={() => setMenuOpen(false)}>Workshop</Link>
            <Link to="/" hash="booking" onClick={() => setMenuOpen(false)}>Boka din plats</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>Om oss</Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <strong>Ljusrum</strong>
          <span>Fotoworkshops i Stockholm</span>
        </div>
        <div className="footer-column">
          <strong>Utforska</strong>
          <Link to="/" hash="workshop">Workshops</Link>
          <Link to="/about">Om oss</Link>
        </div>
        <div className="footer-column">
          <strong>Följ oss</strong>
          <a className="footer-instagram" href="https://www.instagram.com/ljusrum/">
            <Icon name="instagram" size={16} />
            Instagram
          </a>
          <a href="https://www.instagram.com/ljusrum/">@ljusrum</a>
        </div>
        <div className="footer-column">
          <strong>Kontakt</strong>
          <a href="mailto:hej@ljusrum.se">hej@ljusrum.se</a>
        </div>
      </div>
      <img className="footer-divider" src={footerDivider} alt="" />
      <p className="footer-copyright">© 2026 Ljusrum</p>
    </footer>
  )
}
