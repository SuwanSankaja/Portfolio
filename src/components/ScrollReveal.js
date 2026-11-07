'use client';

import { useEffect, useRef, useState } from 'react';

const transforms = {
  up: 'translateY(36px)',
  down: 'translateY(-36px)',
  left: 'translateX(36px)',
  right: 'translateX(-36px)',
  scale: 'scale(0.94)',
  none: 'none',
};

/**
 * Fades/slides children in once they enter the viewport.
 * Styling lives in globals.css (.reveal / .is-visible) so it respects
 * prefers-reduced-motion and a <noscript> fallback.
 */
export function ScrollReveal({ children, delay = 0, direction = 'up', className = '', as: Tag = 'div' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}s`, '--reveal-from': transforms[direction] }}
    >
      {children}
    </Tag>
  );
}
