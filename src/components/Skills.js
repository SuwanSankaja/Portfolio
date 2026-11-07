import { ScrollReveal } from './ScrollReveal';
import { SectionHeader } from './SectionHeader';
import { IconBrain, IconCode, IconDatabase, IconLayout, IconPipeline, IconServer } from './Icons';
import styles from './Skills.module.css';

// `wide` cards span two columns in the desktop bento layout.
const skills = [
  {
    icon: IconPipeline,
    title: 'Data Engineering',
    blurb: 'Designing pipelines and platforms that move and shape data at scale.',
    items: ['Databricks', 'Apache Spark', 'Snowflake', 'Apache Kafka', 'Apache Airflow', 'Pandas & NumPy', 'Jupyter Notebooks'],
    color: 'var(--primary)',
    wide: true,
  },
  {
    icon: IconBrain,
    title: 'AI / ML',
    blurb: 'Models, LLMs and retrieval systems.',
    items: ['LLM', 'Transformers', 'Machine Learning', 'Deep Learning', 'Natural Language Processing', 'RAG'],
    color: 'var(--accent)',
  },
  {
    icon: IconCode,
    title: 'Languages',
    blurb: 'Fluent across the stack.',
    items: ['Python', 'JavaScript (ES6+)', 'Java', 'Dart', 'Swift', 'SQL', 'PHP'],
    color: 'var(--green)',
  },
  {
    icon: IconLayout,
    title: 'Frontend & Mobile',
    blurb: 'Interfaces on the web and native mobile.',
    items: ['React & React Native', 'Flutter', 'SwiftUI & UIKit', 'HTML5 & CSS3', 'Bootstrap & Tailwind', 'Chart.js'],
    color: 'var(--pink)',
    wide: true,
  },
  {
    icon: IconServer,
    title: 'Backend',
    blurb: 'APIs, auth and integrations that hold everything together.',
    items: ['Node.js & Express', 'Django & Django REST', 'Spring Boot', 'RESTful APIs', 'OAuth 2.0', 'IMAP/Email APIs'],
    color: 'var(--orange)',
    wide: true,
  },
  {
    icon: IconDatabase,
    title: 'Databases',
    blurb: 'Relational, document and in-memory stores.',
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Database Design'],
    color: 'var(--blue)',
  },
];

export function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <SectionHeader
          index="02"
          label="Skills"
          title="A toolkit built for"
          highlight="data‑driven products."
          subtitle="From ingestion to inference to interface: the technologies I use to take ideas from raw data to production."
        />

        <div className={styles.grid}>
          {skills.map(({ icon: Icon, title, blurb, items, color, wide }, i) => (
            <ScrollReveal key={title} delay={(i % 3) * 0.08} className={wide ? styles.wide : ''}>
              <article className={`glass-card ${styles.card}`} style={{ '--card-color': color }}>
                <div className={styles.cardTop}>
                  <span className={styles.cardIcon}>
                    <Icon size={22} />
                  </span>
                  <span className={styles.count}>{String(items.length).padStart(2, '0')} tools</span>
                </div>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.blurb}>{blurb}</p>
                <ul className={styles.pills}>
                  {items.map((item) => (
                    <li key={item} className={styles.pill}>
                      {item}
                    </li>
                  ))}
                </ul>
                <Icon size={180} className={styles.watermark} />
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
