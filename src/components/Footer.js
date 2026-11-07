import { availability, site, socials } from '@/config/site';
import { LocalTime } from './LocalTime';
import { IconArrowUp, socialIcons } from './Icons';
import styles from './Footer.module.css';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Journey', href: '#resume' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <p className={styles.tagline}>
              Building intelligent solutions at the intersection of <span className="gradient-text">code and data</span>.
            </p>
            <p className={styles.status}>
              <span className="status-dot" data-tone={availability.tone} />
              {availability.headline}
            </p>
          </div>

          <nav className={styles.col} aria-label="Footer">
            <span className={styles.colTitle}>Navigate</span>
            {links.map((l) => (
              <a key={l.href} href={l.href} className={styles.link}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className={styles.col}>
            <span className={styles.colTitle}>Connect</span>
            {socials.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  <Icon size={15} />
                  {s.label}
                </a>
              );
            })}
          </div>

          <div className={styles.col}>
            <span className={styles.colTitle}>Local time</span>
            <span className={styles.time}>
              <LocalTime />
            </span>
            <span className={styles.zone}>Colombo, Sri Lanka · GMT+5:30</span>
            <a href={`mailto:${site.email}`} className={`${styles.link} ${styles.mail}`}>
              {site.email}
            </a>
          </div>
        </div>

        <div className={styles.wordmark} aria-hidden="true">
          Suwan Sankaja
        </div>

        <div className={styles.bottom}>
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className={styles.crafted}>Designed &amp; built in Colombo.</p>
          <a href="#hero" className={styles.toTop} aria-label="Back to top" data-magnetic>
            <IconArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
