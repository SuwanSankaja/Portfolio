'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './Hero.module.css';

const typedItems = [
  'Data Science',
  'Machine Learning',
  'Full-Stack Development',
  'AI Applications',
];

const codeLines = [
  'const analyze = (data) => data.map(transform);',
  "import { MachineLearning } from 'tensorflow';",
  'function processDataset(input) { return neural.predict(input); }',
  'if (model.accuracy > threshold) { deploy(); }',
  'const results = await model.train(dataset);',
  'pipeline.add(preprocessing).add(training).execute();',
  "export default { predict, analyze, visualize };",
  'const insights = data.reduce((acc, val) => acc + val, 0);',
  'matrix.multiply(weights).add(bias).activate();',
  'for (let epoch = 0; epoch < iterations; epoch++) { optimize(); }',
  "model.compile({ optimizer: 'adam', loss: 'mse' });",
  'return predictions.filter(p => p.confidence > 0.95);',
];

const stats = [
  { value: '15+', label: 'Projects Built' },
  { value: '14', label: 'Certifications' },
  { value: '6', label: 'Tech Domains' },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const fullText = typedItems[currentIndex];

    if (!isDeleting) {
      setDisplayText(fullText.substring(0, displayText.length + 1));
      if (displayText.length + 1 === fullText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
    } else {
      setDisplayText(fullText.substring(0, displayText.length - 1));
      if (displayText.length - 1 === 0) {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % typedItems.length);
        return;
      }
    }
  }, [currentIndex, displayText, isDeleting]);

  useEffect(() => {
    const speed = isDeleting ? 30 : 60;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <section id="hero" className={styles.hero}>
      {/* Background Layers */}
      <div className={styles.bgOrbs}>
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
        <div className={`${styles.orb} ${styles.orb4}`} />
      </div>

      <div className={styles.codeBackground}>
        {codeLines.map((line, i) => (
          <div
            key={i}
            className={styles.codeLine}
            style={{
              top: `${8 + i * 7}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${25 + (i % 3) * 5}s`,
            }}
          >
            {line}
          </div>
        ))}
      </div>

      <div className={styles.gridPattern} />
      <div className={styles.radialGlow} />

      {/* Content */}
      <div className={styles.content}>
        <div className={`${styles.badge} fade-in fade-in-delay-1`}>
          <span className={styles.badgeDot}>
            <span className={styles.badgePing} />
          </span>
          Available for Opportunities
        </div>

        <h1 className={`${styles.title} fade-in fade-in-delay-2`}>
          <span className="gradient-text">Suwan Sankaja</span>
        </h1>

        <p className={`${styles.subtitle} fade-in fade-in-delay-3`}>
          Building intelligent solutions at the intersection of code and data
        </p>

        <div className={`${styles.typedWrapper} fade-in fade-in-delay-3`}>
          <span className={styles.typedLabel}>I specialize in </span>
          <span className={styles.typedText}>{displayText}</span>
          <span className={styles.cursor}>|</span>
        </div>

        <div className={`${styles.cta} fade-in fade-in-delay-4`}>
          <a href="#projects" className="btn btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
            View My Work
          </a>
          <a href="#contact" className="btn btn-outline">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Get In Touch
          </a>
        </div>

        {/* Stats */}
        <div className={`${styles.stats} fade-in fade-in-delay-5`}>
          {stats.map((stat, i) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
              {i < stats.length - 1 && <div className={styles.statDivider} />}
            </div>
          ))}
        </div>

      </div>

      {/* Scroll indicator — positioned relative to hero, not content */}
      <div className={`${styles.scrollIndicator} fade-in fade-in-delay-6`}>
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
