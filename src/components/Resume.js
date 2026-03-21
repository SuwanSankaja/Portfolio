import styles from './Resume.module.css';
import { ScrollReveal } from './ScrollReveal';

const education = [
  {
    title: 'BSc in Computer Science & Engineering',
    period: '2021 - 2025',
    institution: 'University of Moratuwa',
    highlight: 'Data Science & Engineering',
    details: [
      'ML algorithms, statistical analysis',
      'Advanced Algorithms, Database Systems',
      'Transformer-based NLP research',
    ],
  },
  {
    title: 'GCE Advanced Level',
    period: '2019',
    institution: 'Royal College, Colombo',
    highlight: 'Z-Score: 2.006',
    details: [
      'Combined Mathematics — A',
      'Chemistry — A',
      'Physics — B',
    ],
  },
  {
    title: 'GCE Ordinary Level',
    period: '2015',
    institution: 'Presidents College, Colombo',
    highlight: '9As',
    details: ['English Medium'],
  },
];

const projects = [
  {
    title: 'Exchange Rate Tracker',
    period: '2025 Jun — Present',
    status: 'active',
    description: 'Real-time currency exchange monitoring for Sri Lankan banks',
    tech: ['Node.js', 'MongoDB', 'Chart.js', 'Python', 'Selenium'],
    links: [
      { label: 'Demo', href: 'https://exrates.suwansankaja.com/' },
      { label: 'Code', href: 'https://github.com/SuwanSankaja/exchange_rate_dashboard' },
    ],
  },
  {
    title: 'Confinix Stream',
    period: '2026 Jan — Present',
    status: 'active',
    description: 'Native media streaming app with multi-cloud integration',
    tech: ['Swift', 'SwiftUI', 'UIKit', 'VLCKit'],
    links: [],
  },
  {
    title: 'Fixplain — Final Year Research',
    period: '2024 Jun — 2025 Jun',
    description: 'Transformer-based NL explanation generation for automated program repair',
    tech: ['Python', 'PyTorch', 'CUDA', 'Java'],
    links: [{ label: 'Code', href: 'https://github.com/orgs/ExplainaCode/repositories' }],
  },
  {
    title: 'Gmail IMAP Client',
    period: '2025 Jun — 2025 Jul',
    description: 'Full-stack Gmail client with OAuth 2.0, IMAP syncing, and MySQL storage',
    tech: ['React', 'Node.js', 'MySQL', 'OAuth 2.0'],
    links: [{ label: 'Code', href: 'https://github.com/SuwanSankaja/gmail-client' }],
  },
  {
    title: 'Days Lived',
    period: '2025 May — 2025 Jul',
    description: 'Flutter app to reflect on days lived and time remaining',
    tech: ['Flutter', 'Dart'],
    links: [{ label: 'Code', href: 'https://github.com/SuwanSankaja/DaysLived' }],
  },
  {
    title: 'Crypto Notifier',
    period: '2024 Oct — 2024 Nov',
    description: 'Cryptocurrency alert system for significant price fluctuations',
    tech: ['Python', 'Docker', 'Digital Ocean'],
    links: [{ label: 'Code', href: 'https://github.com/SuwanSankaja/Crypto-Notifier' }],
  },
  {
    title: 'Workout Buddy',
    period: '2024 Sept — 2024 Oct',
    description: 'MERN stack web app for logging and tracking workouts',
    tech: ['React', 'Node.js', 'MongoDB'],
    links: [{ label: 'Code', href: 'https://github.com/SuwanSankaja/Workout_Buddy' }],
  },
  {
    title: 'Multilingual Medical Chatbot',
    period: '2023 Jun — 2023 Nov',
    description: 'NLP chatbot supporting Sinhala for medical appointment booking',
    tech: ['RASA NLU', 'React', 'Spring Boot', 'MySQL'],
    links: [{ label: 'Code', href: 'https://github.com/Localized-Medical-Chatbot/Medical_Chatbot' }],
  },
];

export function Resume() {
  return (
    <section id="resume" className="section section-alt">
      <div className="container">
        <ScrollReveal>
          <div className={styles.header}>
            <span className="section-label">Resume</span>
            <h2 className="section-title">Education & Experience</h2>
            <p className="section-subtitle">My educational background and project journey</p>
          </div>
        </ScrollReveal>

        {/* Education Cards */}
        <div className={styles.eduGrid}>
          {education.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
            <div className={`glass-card ${styles.eduCard}`}>
              <div className={styles.eduTop}>
                <span className={styles.eduPeriod}>{item.period}</span>
                <span className={styles.eduHighlight}>{item.highlight}</span>
              </div>
              <h3 className={styles.eduTitle}>{item.title}</h3>
              <p className={styles.eduInstitution}>{item.institution}</p>
              <ul className={styles.eduDetails}>
                {item.details.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
            </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Download */}
        <div className={styles.downloadRow}>
          <a
            href="https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/CV/Suwan%20Data%20Engineering%20CSE.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            Download Full Resume
          </a>
        </div>

        {/* Project Timeline */}
        <ScrollReveal>
        <h3 className={styles.projectsHeading}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          Project Timeline
        </h3>
        </ScrollReveal>

        <div className={styles.timeline}>
          {projects.map((project) => (
            <div key={project.title} className={styles.timelineItem}>
              <div className={styles.timelineMeta}>
                <span className={styles.timelinePeriod}>{project.period}</span>
                {project.status === 'active' && (
                  <span className={styles.activeBadge}>
                    <span className={styles.activeDot} />
                    Active
                  </span>
                )}
              </div>
              <div className={`glass-card ${styles.timelineCard}`}>
                <div className={styles.cardHeader}>
                  <h4 className={styles.projectTitle}>{project.title}</h4>
                  {project.links.length > 0 && (
                    <div className={styles.projectLinks}>
                      {project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.projectLink}
                        >
                          {link.label === 'Demo' ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                          )}
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <p className={styles.projectDesc}>{project.description}</p>
                <div className={styles.techTags}>
                  {project.tech.map((t) => (
                    <span key={t} className={styles.techTag}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
