import { ScrollReveal } from './ScrollReveal';
import { SectionHeader } from './SectionHeader';
import { IconArrowUpRight, IconGithub } from './Icons';
import styles from './Projects.module.css';

const featured = [
  {
    title: 'Exchange Rate Tracker',
    category: 'Data Automation · Web',
    year: '2025 — Present',
    url: 'exrates.suwansankaja.com',
    description:
      'A real-time currency exchange tracking platform for Sri Lankan banks. Automated scraping pipelines on GitHub Actions feed interactive charts for monitoring AUD, USD, EUR and GBP rates across major banks.',
    image: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Exchange%20Rate/Confinix%20Exchange.gif',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'Chart.js', 'Python', 'Selenium', 'GitHub Actions', 'Vercel'],
    links: [
      { label: 'Live Demo', href: 'https://exrates.suwansankaja.com/', primary: true },
      { label: 'Source', href: 'https://github.com/SuwanSankaja/exchange_rate_dashboard', github: true },
    ],
  },
  {
    title: 'Full-Stack Gmail IMAP Client',
    category: 'Full-Stack',
    year: '2025',
    url: 'gmail-client',
    description:
      'A modern Gmail client with secure OAuth 2.0 authentication, IMAP email syncing, persistent MySQL storage and advanced search.',
    image: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/projects/gmail_client.gif',
    tech: ['React', 'Node.js', 'Express.js', 'MySQL', 'OAuth 2.0', 'IMAP'],
    links: [{ label: 'Source', href: 'https://github.com/SuwanSankaja/gmail-client', github: true }],
  },
  {
    title: 'Multilingual Medical Chatbot',
    category: 'NLP · Conversational AI',
    year: '2023',
    url: 'medical-chatbot',
    description:
      'An NLP-powered chatbot for the medical domain that understands and responds in Sinhala, letting patients book appointments in their own language.',
    image: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/projects/rasa_2.gif',
    tech: ['RASA NLU', 'Python', 'React', 'MySQL', 'Django'],
    links: [{ label: 'Source', href: 'https://github.com/Localized-Medical-Chatbot/Medical_Chatbot', github: true }],
  },
];

const mobileApps = [
  {
    title: 'Confinix Stream',
    category: 'iOS · Media',
    description:
      'A native streaming app that plays personal media libraries from Koofr, pCloud and WebDAV cloud storage directly on device.',
    image: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/projects/confinix_stream.gif',
    tech: ['Swift', 'SwiftUI', 'UIKit', 'VLCKit', 'WebDAV', 'TMDB API'],
    status: 'In active development',
    links: [],
  },
  {
    title: 'StarFly Interstellar Travel',
    category: 'Mobile Concept',
    description:
      'A futuristic interstellar travel booking concept with biometric authentication and an AI assistant.',
    image: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/projects/starfly.gif',
    tech: ['React Native', 'Django', 'JavaScript', 'REST API'],
    links: [{ label: 'Source', href: 'https://github.com/SuwanSankaja/StarFly_Interstellar_Traveling', github: true }],
  },
  {
    title: 'Days Lived',
    category: 'Flutter',
    description: 'See your life in days, lived and left, and make more meaningful choices with your time.',
    image: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/projects/dayslived.gif',
    tech: ['Flutter', 'Dart', 'Android Studio'],
    links: [{ label: 'Source', href: 'https://github.com/SuwanSankaja/DaysLived', github: true }],
  },
];

function ProjectLinks({ links }) {
  if (!links.length) return null;
  return (
    <div className={styles.links}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.link} ${link.primary ? styles.linkPrimary : ''}`}
          data-magnetic
        >
          {link.github && <IconGithub size={16} />}
          {link.label}
          <IconArrowUpRight size={15} className={styles.linkArrow} />
        </a>
      ))}
    </div>
  );
}

function FeaturedProject({ project, index }) {
  const reverse = index % 2 === 1;
  const primary = project.links[0]?.href;

  return (
    <article className={`${styles.feature} ${reverse ? styles.featureReverse : ''}`}>
      <ScrollReveal direction={reverse ? 'left' : 'right'} className={styles.featureMediaCol}>
        <a
          href={primary}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.browser}
          data-tilt
          aria-label={`Open ${project.title}`}
        >
          <div className={styles.browserBar}>
            <span className={styles.browserDots} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className={styles.browserUrl}>{project.url}</span>
          </div>
          <div className={styles.browserScreen}>
            <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
          </div>
          <span className={styles.browserGlow} aria-hidden="true" />
        </a>
      </ScrollReveal>

      <ScrollReveal delay={0.12} className={styles.featureBody}>
        <div className={styles.meta}>
          <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
          <span className={styles.metaLine} />
          <span className={styles.category}>{project.category}</span>
        </div>
        <h3 className={styles.featureTitle}>{project.title}</h3>
        <p className={styles.year}>{project.year}</p>
        <p className={styles.description}>{project.description}</p>
        <ul className={styles.tech}>
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <ProjectLinks links={project.links} />
      </ScrollReveal>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader
          index="03"
          label="Selected Work"
          title="Things I've designed,"
          highlight="built and shipped."
          subtitle="A selection of data platforms, AI systems and products, from automated pipelines to native apps."
        />

        <div className={styles.features}>
          {featured.map((project, i) => (
            <FeaturedProject key={project.title} project={project} index={i} />
          ))}
        </div>

        <ScrollReveal>
          <div className={styles.subhead}>
            <h3>Mobile apps</h3>
            <span className={styles.subheadLine} />
            <span className={styles.subheadCount}>{String(mobileApps.length).padStart(2, '0')} apps</span>
          </div>
        </ScrollReveal>

        <div className={styles.mobileGrid}>
          {mobileApps.map((app, i) => (
            <ScrollReveal key={app.title} delay={i * 0.1}>
              <article className={`glass-card ${styles.appCard}`}>
                <div className={styles.phoneStage}>
                  <div className={styles.phone}>
                    <span className={styles.notch} aria-hidden="true" />
                    <img src={app.image} alt={`${app.title} app preview`} loading="lazy" />
                  </div>
                </div>
                <div className={styles.appBody}>
                  <span className={styles.category}>{app.category}</span>
                  <h4 className={styles.appTitle}>{app.title}</h4>
                  <p className={styles.appDesc}>{app.description}</p>
                  <ul className={styles.tech}>
                    {app.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  {app.status && (
                    <p className={styles.appStatus}>
                      <span className="status-dot" data-tone="amber" />
                      {app.status}
                    </p>
                  )}
                  <ProjectLinks links={app.links} />
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className={styles.more}>
            <p>Want to see more? Most of my work lives on GitHub.</p>
            <a
              href="https://github.com/SuwanSankaja"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              data-magnetic
            >
              <IconGithub size={18} />
              Browse all repositories
              <IconArrowUpRight size={16} />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
