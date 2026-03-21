import styles from './Projects.module.css';
import { ScrollReveal } from './ScrollReveal';

const projects = [
  {
    title: 'Exchange Rate Tracker',
    description:
      'A comprehensive real-time currency exchange tracking platform for Sri Lankan banks. Features automated data scraping with GitHub Actions, interactive charts, and responsive design for monitoring AUD, USD, EUR, and GBP rates across major banks.',
    image:
      'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Exchange%20Rate/Confinix%20Exchange.gif',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'Chart.js', 'Python', 'Selenium', 'GitHub Actions', 'Vercel'],
    links: [
      { label: 'Live Demo', href: 'https://exrates.suwansankaja.com/', external: true },
      { label: 'View Code', href: 'https://github.com/SuwanSankaja/exchange_rate_dashboard', github: true },
    ],
  },
  {
    title: 'Full-Stack Gmail IMAP Client',
    description:
      'A modern Gmail client with secure OAuth 2.0 authentication, IMAP email syncing, persistent MySQL storage, and advanced search functionality.',
    image:
      'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/projects/gmail_client.gif',
    tech: ['React', 'Node.js', 'Express.js', 'MySQL', 'OAuth 2.0', 'IMAP'],
    links: [
      { label: 'View Code', href: 'https://github.com/SuwanSankaja/gmail-client', github: true },
    ],
  },
  {
    title: 'Multilingual Medical Chatbot',
    description:
      'An intelligent NLP-powered chatbot for the medical domain that understands and responds in Sinhala, enabling appointment booking.',
    image:
      'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/projects/rasa_2.gif',
    tech: ['RASA NLU', 'Python', 'React', 'MySQL', 'Django'],
    links: [
      { label: 'View Code', href: 'https://github.com/Localized-Medical-Chatbot/Medical_Chatbot', github: true },
    ],
  },
  {
    title: 'Confinix Stream',
    description:
      'A sleek, native media streaming application that streams personal media libraries from Koofr, pCloud, and WebDAV cloud storage directly on Device.',
    image:
      'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/projects/confinix_stream_demo.gif',
    tech: ['Swift', 'SwiftUI', 'UIKit', 'VLCKit', 'WebDAV', 'TMDB API'],
    isMobile: true,
    links: [],
  },
  {
    title: 'StarFly Interstellar Travel',
    description:
      'A futuristic mobile application concept for interstellar travel booking with biometric auth and AI assistance.',
    image:
      'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/projects/starfly.gif',
    tech: ['React Native', 'Django', 'JavaScript', 'REST API'],
    isMobile: true,
    links: [
      { label: 'View Code', href: 'https://github.com/SuwanSankaja/StarFly_Interstellar_Traveling', github: true },
    ],
  },
  {
    title: 'Days Lived',
    description:
      'See your life in terms of days — both lived and left — and make more meaningful choices with your time.',
    image:
      'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/projects/dayslived.gif',
    tech: ['Flutter', 'Dart', 'Android Studio'],
    isMobile: true,
    links: [
      { label: 'View Code', href: 'https://github.com/SuwanSankaja/DaysLived', github: true },
    ],
  },
];

function ProjectCard({ project }) {
  return (
    <div className={`glass-card ${styles.card} ${project.isMobile ? styles.mobileApp : ''}`}>
      <div className={styles.media}>
        <img src={project.image} alt={project.title} loading="lazy" />
        <div className={styles.mediaOverlay} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.tech}>
          {project.tech.map((t) => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
        {project.links.length > 0 && (
          <div className={styles.links}>
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.link} ${link.external ? styles.linkPrimary : ''}`}
              >
                {link.github ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                )}
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <ScrollReveal>
          <div className={styles.header}>
            <span className="section-label">Featured Projects</span>
            <h2 className="section-title">Recent work that showcases</h2>
            <p className="section-subtitle">my skills and passion for building</p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={0.05 + i * 0.08}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
