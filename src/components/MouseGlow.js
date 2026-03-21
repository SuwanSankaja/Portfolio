'use client';

import { useEffect, useRef } from 'react';

export function MouseGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf;
    let x = -200;
    let y = -200;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
    };

    const render = () => {
      el.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
      raf = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', move, { passive: true });
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
        mixBlendMode: 'screen',
      }}
    />
  );
}
