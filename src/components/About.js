import styles from './About.module.css';
import { ScrollReveal } from './ScrollReveal';

const infoItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
    ),
    label: 'Location',
    value: 'Colombo, Sri Lanka',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
    ),
    label: 'Email',
    value: 'suwan.sankaja@gmail.com',
    href: 'mailto:suwan.sankaja@gmail.com',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    ),
    label: 'Phone',
    value: '+94 71 940 6335',
    href: 'tel:+94719406335',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    ),
    label: 'Freelance',
    value: 'Available',
  },
];

export function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <ScrollReveal>
          <div className={styles.header}>
            <span className="section-label">About Me</span>
            <h2 className="section-title">Passionate about solving complex challenges</h2>
            <p className="section-subtitle">through innovative technology</p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          <ScrollReveal direction="left" delay={0.1}>
            <div className={styles.imageWrapper}>
              <div className={styles.imageGlow} />
              <div className={styles.imageDecor} />
              <div className={styles.imageDecor} />
              <img
                src="https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/profile_images/graduation_side_cropped.png"
                alt="Suwan Sankaja"
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.statusBadge}>
                <span className={styles.statusDot} />
                Open to Work
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div className={styles.text}>
              <h3 className={styles.role}>Data Engineer & AI/ML Enthusiast</h3>
              <p className={styles.lead}>
                Computer Science & Engineering Graduate from University of Moratuwa
              </p>
              <p className={styles.bio}>
                I am a software engineer with a passion for building intelligent applications
                that make a difference. My journey in tech has been driven by curiosity and a
                desire to solve real-world problems through code, transitioning from academic
                projects to professional development.
              </p>

              <div className={styles.infoGrid}>
                {infoItems.map((item) => (
                  <div key={item.label} className={`glass-card ${styles.infoCard}`}>
                    <div className={styles.infoIcon}>{item.icon}</div>
                    <div>
                      <span className={styles.infoLabel}>{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className={styles.infoValue}>
                          {item.value}
                        </a>
                      ) : (
                        <span className={styles.infoValue}>{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className={styles.bioSecondary}>
                I continue to participate in hackathons and coding competitions while working
                professionally, constantly pushing my boundaries and collaborating with talented
                individuals to create innovative solutions.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
