'use client';

import { useEffect, useRef } from 'react';

/** A vertical line that "draws" itself as its parent scrolls through the viewport. */
export function ScrollLine({ className, fillClassName }) {
  const ref = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const fill = fillRef.current;
    if (!el || !fill) return;

    let ticking = false;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      const progress = Math.min(Math.max((anchor - rect.top) / rect.height, 0), 1);
      fill.style.transform = `scaleY(${progress})`;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <div ref={fillRef} className={fillClassName} />
    </div>
  );
}
