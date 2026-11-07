import { site } from '@/config/site';
import { ScrollReveal } from './ScrollReveal';
import { ScrollLine } from './ScrollLine';
import { SectionHeader } from './SectionHeader';
import { IconArrowUpRight, IconBriefcase, IconDownload, IconGithub, IconGraduation } from './Icons';
import styles from './Resume.module.css';

const education = [
  {
    title: 'BSc in Computer Science & Engineering',
    period: '2021 — 2025',
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
    details: ['Combined Mathematics — A', 'Chemistry — A', 'Physics — B'],
  },
  {
    title: 'GCE Ordinary Level',
    period: '2015',
    institution: 'Presidents College, Colombo',
    highlight: '9 A Passes',
    details: ['English Medium'],
  },
];

const projects = [
  {
    title: 'Confinix Stream',
    period: '2026 Jan — Present',
    status: 'active',
    description: 'Native media streaming app with multi-cloud integration',
    tech: ['Swift', 'SwiftUI', 'UIKit', 'VLCKit'],
    links: [],
  },
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
    title: 'Fixplain — Final Year Research',
    period: '2024 Jun — 2025 Jun',
    description: 'Transformer-based natural-language explanation generation for automated program repair',
    tech: ['Python', 'PyTorch', 'CUDA', 'Java'],
    links: [{ label: 'Code', href: 'https://github.com/orgs/ExplainaCode/repositories' }],
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
        <SectionHeader
          index="04"
          label="Journey"
          title="Education &"
          highlight="the road so far."
          subtitle="The academic foundation and the projects that shaped how I build."
        />

        {/* Education */}
        <ScrollReveal>
          <h3 className={styles.groupTitle}>
            <IconGraduation size={20} />
            Education
          </h3>
        </ScrollReveal>

        <div className={styles.eduGrid}>
          {education.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1} className={i === 0 ? styles.eduMain : ''}>
              <article className={`glass-card ${styles.eduCard}`}>
                <div className={styles.eduTop}>
                  <span className={styles.eduPeriod}>{item.period}</span>
                  <span className={styles.eduHighlight}>{item.highlight}</span>
                </div>
                <h4 className={styles.eduTitle}>{item.title}</h4>
                <p className={styles.eduInstitution}>{item.institution}</p>
                <ul className={styles.eduDetails}>
                  {item.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Resume banner */}
        <ScrollReveal>
          <div className={styles.banner}>
            <div>
              <p className={styles.bannerTitle}>Want the full picture?</p>
              <p className={styles.bannerText}>Experience, skills and achievements in one page.</p>
            </div>
            <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-magnetic>
              <IconDownload size={18} />
              Download résumé
            </a>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <ScrollReveal>
          <h3 className={styles.groupTitle}>
            <IconBriefcase size={20} />
            Project timeline
          </h3>
        </ScrollReveal>

        <div className={styles.timeline}>
          <ScrollLine className={styles.line} fillClassName={styles.lineFill} />
          {projects.map((project) => (
            <ScrollReveal key={project.title} className={styles.item}>
              <div className={styles.itemMeta}>
                <span className={styles.period}>{project.period}</span>
                {project.status === 'active' && (
                  <span className={styles.activeBadge}>
                    <span className="status-dot" />
                    Active
                  </span>
                )}
              </div>
              <span className={`${styles.node} ${project.status === 'active' ? styles.nodeActive : ''}`} aria-hidden="true" />
              <div className={`glass-card ${styles.card}`}>
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
                          aria-label={`${project.title} — ${link.label}`}
                        >
                          {link.label === 'Code' ? <IconGithub size={14} /> : <IconArrowUpRight size={14} />}
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <p className={styles.projectDesc}>{project.description}</p>
                <ul className={styles.techTags}>
                  {project.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
