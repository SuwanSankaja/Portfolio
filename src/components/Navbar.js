'use client';

import { useState, useEffect, useRef } from 'react';
import { availability, site } from '@/config/site';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Journey', href: '#resume' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const progressRef = useRef(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      }

      setScrolled(y > 24);
      if (y > 640 && y > lastY + 4) setHidden(true);
      else if (y < lastY - 4 || y <= 640) setHidden(false);
      if (Math.abs(y - lastY) > 4) lastY = y;

      let current = '';
      for (const { href } of navLinks) {
        const el = document.getElementById(href.slice(1));
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = href.slice(1);
      }
      setActiveSection(current);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const navClass = [
    styles.navbar,
    scrolled ? styles.scrolled : '',
    hidden && !menuOpen ? styles.hidden : '',
    menuOpen ? styles.open : '',
  ].join(' ');

  return (
    <header className={navClass}>
      <div className={styles.bar}>
        <a href="#hero" className={styles.logo} aria-label={`${site.name} — back to top`}>
          <span className={styles.logoMark}>
            <img src={site.logo} alt="" width={34} height={34} />
          </span>
          <span className={styles.logoText}>
            Suwan<span className={styles.logoDim}> Sankaja</span>
          </span>
        </a>

        <nav className={styles.desktopLinks} aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${activeSection === link.href.slice(1) ? styles.navLinkActive : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className={`btn btn-primary ${styles.cta}`} data-magnetic>
          Let&apos;s Talk
        </a>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
        </button>

        <div className={styles.progress} ref={progressRef} aria-hidden="true" />
      </div>

      <div id="mobile-menu" className={styles.mobileMenu} aria-hidden={!menuOpen} inert={!menuOpen}>
        <nav className={styles.mobileLinks} aria-label="Mobile">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${activeSection === link.href.slice(1) ? styles.mobileLinkActive : ''}`}
              style={{ '--i': i }}
              onClick={() => setMenuOpen(false)}
            >
              <span className={styles.mobileIndex}>{String(i + 1).padStart(2, '0')}</span>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.mobileFooter} style={{ '--i': navLinks.length }}>
          <span className={styles.mobileStatus}>
            <span className="status-dot" data-tone={availability.tone} />
            {availability.short}
          </span>
          <a href={`mailto:${site.email}`} className={styles.mobileEmail}>
            {site.email}
          </a>
          <a href="#contact" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
            Start a conversation
          </a>
        </div>
      </div>
    </header>
  );
}
