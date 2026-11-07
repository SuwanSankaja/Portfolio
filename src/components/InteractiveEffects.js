'use client';

import { useEffect, useRef } from 'react';

/**
 * One global pointer listener that powers the site's micro-interactions
 * (desktop / fine pointers only, disabled for reduced motion):
 *   • cursor glow that trails the pointer
 *   • spotlight border on any `.glass-card`   (sets --mx / --my)
 *   • magnetic pull on `[data-magnetic]`      (buttons, socials)
 *   • 3D tilt on `[data-tilt]`                (portrait, featured media)
 */
export function InteractiveEffects() {
  const glowRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer) return;

    const glow = glowRef.current;
    let raf = 0;
    let x = -500;
    let y = -500;
    let gx = x;
    let gy = y;
    let magnetEl = null;
    let tiltEl = null;

    const resetMagnet = () => {
      if (magnetEl) magnetEl.style.transform = '';
      magnetEl = null;
    };

    const resetTilt = () => {
      if (tiltEl) tiltEl.style.transform = '';
      tiltEl = null;
    };

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target instanceof Element ? e.target : null;
      if (!target) return;

      // Spotlight
      const card = target.closest('.glass-card');
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${x - r.left}px`);
        card.style.setProperty('--my', `${y - r.top}px`);
      }

      if (reduced) return;

      // Magnetic
      const magnet = target.closest('[data-magnetic]');
      if (magnet !== magnetEl) resetMagnet();
      if (magnet) {
        magnetEl = magnet;
        const r = magnet.getBoundingClientRect();
        const dx = x - (r.left + r.width / 2);
        const dy = y - (r.top + r.height / 2);
        magnet.style.transform = `translate(${dx * 0.22}px, ${dy * 0.3}px)`;
      }

      // Tilt
      const tilt = target.closest('[data-tilt]');
      if (tilt !== tiltEl) resetTilt();
      if (tilt) {
        tiltEl = tilt;
        const r = tilt.getBoundingClientRect();
        const px = (x - r.left) / r.width - 0.5;
        const py = (y - r.top) / r.height - 0.5;
        tilt.style.transform = `perspective(1000px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg)`;
      }
    };

    const onLeave = () => {
      resetMagnet();
      resetTilt();
      x = -500;
      y = -500;
    };

    const render = () => {
      gx += (x - gx) * 0.12;
      gy += (y - gy) * 0.12;
      if (glow) glow.style.transform = `translate3d(${gx - 250}px, ${gy - 250}px, 0)`;
      raf = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    if (!reduced) raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, rgba(168,85,247,0.03) 35%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
        willChange: 'transform',
        transform: 'translate3d(-1000px, -1000px, 0)',
      }}
    />
  );
}
