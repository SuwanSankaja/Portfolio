'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './PipelineTerminal.module.css';

const steps = [
  { stage: 'extract', detail: 'postgres · s3 · rest api', time: '0.82s' },
  { stage: 'validate', detail: '1,284,019 rows · 0 nulls', time: '1.40s' },
  { stage: 'transform', detail: 'spark · 48 partitions', time: '3.12s' },
  { stage: 'train', detail: 'xgboost · auc 0.947', time: '12.6s' },
  { stage: 'serve', detail: 'fastapi · p95 41ms', time: '0.94s' },
  { stage: 'load', detail: 'warehouse.analytics', time: '0.71s' },
];

const STEP_MS = 900;
const HOLD_MS = 3200;

/** A looping, illustrative "pipeline run" — signals the data-engineering focus at a glance. */
export function PipelineTerminal() {
  const [done, setDone] = useState(0);
  const [visible, setVisible] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const t = setTimeout(() => setDone(steps.length + 1), 0);
      return () => clearTimeout(t);
    }
    if (!visible) return;
    const finished = done > steps.length;
    const timer = setTimeout(
      () => setDone((d) => (d > steps.length ? 0 : d + 1)),
      finished ? HOLD_MS : done === 0 ? 600 : STEP_MS
    );
    return () => clearTimeout(timer);
  }, [done, visible]);

  const completed = Math.min(done, steps.length);
  const progress = (completed / steps.length) * 100;
  const success = done > steps.length;

  return (
    <div className={styles.wrap} ref={ref}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.terminal} role="img" aria-label="Animated example of a data pipeline run">
        <div className={styles.chrome}>
          <span className={styles.dots} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className={styles.file}>pipeline.py — prod</span>
          <span className={`${styles.state} ${success ? styles.stateOk : ''}`}>
            {success ? 'succeeded' : 'running'}
          </span>
        </div>

        <div className={styles.body} aria-hidden="true">
          <p className={styles.cmd}>
            <span className={styles.prompt}>suwan@colombo</span>
            <span className={styles.muted}>~</span> $ python pipeline.py --env prod
          </p>

          <ul className={styles.steps}>
            {steps.map((s, i) => {
              const state = i < completed ? 'done' : i === completed && !success ? 'active' : 'idle';
              return (
                <li key={s.stage} className={`${styles.step} ${styles[state]}`}>
                  <span className={styles.icon}>
                    {state === 'done' ? '✓' : state === 'active' ? <span className={styles.spinner} /> : '·'}
                  </span>
                  <span className={styles.stage}>{s.stage}</span>
                  <span className={styles.detail}>{s.detail}</span>
                  <span className={styles.time}>{state === 'done' ? s.time : ''}</span>
                </li>
              );
            })}
          </ul>

          <div className={styles.progressRow}>
            <div className={styles.progressTrack}>
              <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            </div>
            <span className={styles.percent}>{Math.round(progress)}%</span>
          </div>

          <p className={`${styles.result} ${success ? styles.resultShow : ''}`}>
            <span className={styles.ok}>✔</span> pipeline succeeded in 19.6s
            <span className={styles.caret} />
          </p>
        </div>
      </div>

      <div className={`${styles.chip} ${styles.chipTop}`} aria-hidden="true">
        <span className={styles.chipIcon}>⚡</span>
        <span>
          <strong>1.28M</strong> rows / run
        </span>
      </div>

      <div className={`${styles.chip} ${styles.chipBottom}`} aria-hidden="true">
        <svg width="54" height="22" viewBox="0 0 54 22" fill="none">
          <path
            d="M1 18 L9 15 L16 16 L23 10 L30 12 L37 6 L44 8 L53 2"
            stroke="url(#spark)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="spark" x1="0" x2="54" y1="0" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00d4ff" />
              <stop offset="1" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
        <span>
          model <strong>AUC 0.947</strong>
        </span>
      </div>
    </div>
  );
}
