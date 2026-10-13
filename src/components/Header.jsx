import { useState } from 'react'
import { scrollToId } from '../lib/scroll.js'
import './Header.css'

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Header({ reducedMotion }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavClick = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    scrollToId(id, reducedMotion)
  }

  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <a
          href="#home"
          className="site-header__logo"
          onClick={(e) => handleNavClick(e, 'home')}
        >
          Rupali
        </a>

        <nav className="site-header__nav" aria-label="Primary">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={(e) => handleNavClick(e, link.id)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="site-header__toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        id="mobile-nav"
        className={`site-header__mobile ${menuOpen ? 'is-open' : ''}`}
        aria-label="Mobile"
        hidden={!menuOpen}
      >
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} onClick={(e) => handleNavClick(e, link.id)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
