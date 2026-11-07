'use client';

import { useEffect, useState } from 'react';
import { availability, site } from '@/config/site';
import { certs } from './Certifications';
import { CountUp } from './CountUp';
import { DataField } from './DataField';
import { PipelineTerminal } from './PipelineTerminal';
import { IconArrowRight, IconDownload } from './Icons';
import styles from './Hero.module.css';

const rotatingWords = ['data pipelines', 'ML systems', 'AI products', 'full-stack apps'];

const stats = [
  { value: 15, suffix: '+', label: 'Projects shipped' },
  { value: certs.length, suffix: '', label: 'Certifications' },
  { value: 6, suffix: '', label: 'Tech domains' },
];

const firstName = 'Suwan';
const lastName = 'Sankaja';

function SplitWord({ word, offset = 0 }) {
  return word.split('').map((ch, i) => (
    <span key={i} className={styles.char} style={{ '--ci': i + offset }} aria-hidden="true">
      {ch}
    </span>
  ));
}

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setWordIndex((i) => (i + 1) % rotatingWords.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      {/* Background */}
      <div className={styles.bg} aria-hidden="true">
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={styles.grid} />
        <DataField className={styles.canvas} />
        <div className={styles.fade} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <a href="#contact" className={`${styles.badge} fade-in fade-in-delay-1`}>
            <span className="status-dot" data-tone={availability.tone} />
            <span>{availability.headline}</span>
            <IconArrowRight size={14} className={styles.badgeArrow} />
          </a>

          <h1 className={styles.title}>
            <span className="sr-only">{site.name}</span>
            <span className={styles.line}>
              <SplitWord word={firstName} />
            </span>
            <span className={`${styles.line} ${styles.lineGradient}`}>
              <SplitWord word={lastName} offset={firstName.length} />
              <span className={styles.char} style={{ '--ci': firstName.length + lastName.length }} aria-hidden="true">
                .
              </span>
            </span>
          </h1>

          <p className={`${styles.rotator} fade-in fade-in-delay-3`}>
            <span className={styles.rotatorLabel}>I engineer</span>
            <span className={styles.rotatorWindow} aria-live="polite">
              {rotatingWords.map((w, i) => (
                <span
                  key={w}
                  className={`${styles.rotatorWord} ${i === wordIndex ? styles.wordIn : ''} ${
                    i === (wordIndex - 1 + rotatingWords.length) % rotatingWords.length ? styles.wordOut : ''
                  }`}
                  aria-hidden={i !== wordIndex}
                >
                  {w}
                </span>
              ))}
            </span>
          </p>

          <p className={`${styles.intro} fade-in fade-in-delay-4`}>
            Data Engineer based in Colombo. I design reliable data platforms, build machine-learning
            systems and ship the products that put them in people&apos;s hands.
          </p>

          <div className={`${styles.cta} fade-in fade-in-delay-5`}>
            <a href="#projects" className="btn btn-primary" data-magnetic>
              Explore my work
              <IconArrowRight size={18} />
            </a>
            <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn-outline" data-magnetic>
              <IconDownload size={18} />
              Résumé
            </a>
          </div>

          <dl className={`${styles.stats} fade-in fade-in-delay-6`}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt className={styles.statLabel}>{stat.label}</dt>
                <dd className={styles.statValue}>
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={`${styles.visual} fade-in fade-in-delay-4`}>
          <PipelineTerminal />
        </div>
      </div>

      <a href="#about" className={`${styles.scrollIndicator} fade-in fade-in-delay-6`} aria-label="Scroll to About">
        <span className={styles.mouse}>
          <span className={styles.wheel} />
        </span>
      </a>
    </section>
  );
}
