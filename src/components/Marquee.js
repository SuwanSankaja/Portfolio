import styles from './Marquee.module.css';

const rows = [
  ['Python', 'Apache Spark', 'Databricks', 'Snowflake', 'Kafka', 'Airflow', 'PyTorch', 'Transformers', 'RAG', 'SQL'],
  ['React', 'Next.js', 'Node.js', 'Django', 'Spring Boot', 'Flutter', 'SwiftUI', 'PostgreSQL', 'MongoDB', 'Docker'],
];

function Row({ items, reverse }) {
  // Duplicate the list so the CSS animation can loop seamlessly at -50%.
  const loop = [...items, ...items];
  return (
    <div className={`${styles.track} ${reverse ? styles.reverse : ''}`}>
      {loop.map((item, i) => (
        <span key={i} className={styles.item} aria-hidden={i >= items.length}>
          {item}
          <span className={styles.sep}>✦</span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <section className={styles.marquee} aria-label="Technologies I work with">
      <Row items={rows[0]} />
      <Row items={rows[1]} reverse />
    </section>
  );
}
