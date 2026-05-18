import styles from './Skills.module.css';
import { ScrollReveal } from './ScrollReveal';

const skills = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    ),
    title: 'Languages',
    items: ['Python', 'JavaScript (ES6+)', 'Java', 'Dart', 'Swift', 'SQL', 'PHP'],
    color: 'var(--primary)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z"/><circle cx="12" cy="15" r="2"/></svg>
    ),
    title: 'Data Engineering',
    items: ['Databricks', 'Apache Spark', 'Snowflake', 'Apache Kafka', 'Apache Airflow', 'Pandas & NumPy', 'Jupyter Notebooks'],
    color: 'var(--green)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16z"/><path d="M12 2v8l4 4"/><path d="M21.17 8H12"/></svg>
    ),
    title: 'AI / ML',
    items: ['LLM', 'Transformers', 'Machine Learning', 'Deep Learning', 'Natural Language Processing', 'RAG'],
    color: 'var(--accent)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10"/><path d="M7 12h10"/><path d="M7 17h10"/></svg>
    ),
    title: 'Frontend & Mobile',
    items: ['React & React Native', 'Flutter', 'SwiftUI & UIKit', 'HTML5 & CSS3', 'Bootstrap & Tailwind', 'Chart.js'],
    color: 'var(--pink)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>
    ),
    title: 'Backend',
    items: ['Node.js & Express', 'Django & Django REST', 'Spring Boot', 'RESTful APIs', 'OAuth 2.0', 'IMAP/Email APIs'],
    color: '#fb923c',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>
    ),
    title: 'Databases',
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Database Design'],
    color: '#60a5fa',
  },
];

export function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <ScrollReveal>
          <div className={styles.header}>
            <span className="section-label">Technical Skills</span>
            <h2 className="section-title">A comprehensive toolkit</h2>
            <p className="section-subtitle">for building modern applications</p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {skills.map((skill, i) => (
            <ScrollReveal key={skill.title} delay={i * 0.08}>
              <div
                className={`glass-card ${styles.card}`}
                style={{ '--card-color': skill.color }}
              >
                <div className={styles.cardIcon}>{skill.icon}</div>
                <h3 className={styles.cardTitle}>{skill.title}</h3>
                <div className={styles.pills}>
                  {skill.items.map((item) => (
                    <span key={item} className={styles.pill}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
