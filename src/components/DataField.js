'use client';

import { useEffect, useRef } from 'react';

/**
 * Interactive "data network" background: drifting nodes, links between
 * neighbours, packets of data travelling along the links, and a gentle
 * pull towards the pointer. Pauses when off-screen or the tab is hidden;
 * renders a single static frame for reduced-motion users.
 */
export function DataField({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes = [];
    let packets = [];
    let raf = 0;
    let running = false;
    let visible = true;
    const pointer = { x: -9999, y: -9999, active: false };
    let linkDist = 140;

    const lerpColor = (t) => {
      // cyan (0,212,255) → indigo (109,139,255) → purple (168,85,247)
      const stops = [
        [0, 212, 255],
        [109, 139, 255],
        [168, 85, 247],
      ];
      const s = t < 0.5 ? 0 : 1;
      const lt = t < 0.5 ? t * 2 : (t - 0.5) * 2;
      const a = stops[s];
      const b = stops[s + 1];
      return [
        Math.round(a[0] + (b[0] - a[0]) * lt),
        Math.round(a[1] + (b[1] - a[1]) * lt),
        Math.round(a[2] + (b[2] - a[2]) * lt),
      ];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const widthChanged = Math.abs(rect.width - width) > 1;
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Mobile browsers fire resize when the URL bar shows/hides — keep the
      // existing network unless the width actually changed.
      if (!widthChanged && nodes.length) return;

      const mobile = width < 700;
      linkDist = mobile ? 110 : 150;
      const count = Math.round(Math.min(Math.max((width * height) / (mobile ? 11000 : 15000), 28), 95));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 0.6,
        hub: Math.random() < 0.08,
      }));
      packets = [];
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const ld2 = linkDist * linkDist;

      // Move
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = width + 20;
          if (n.x > width + 20) n.x = -20;
          if (n.y < -20) n.y = height + 20;
          if (n.y > height + 20) n.y = -20;

          if (pointer.active) {
            const dx = pointer.x - n.x;
            const dy = pointer.y - n.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 220 * 220 && d2 > 1) {
              const f = 0.012 * (1 - Math.sqrt(d2) / 220);
              n.x += dx * f;
              n.y += dy * f;
            }
          }
        }
      }

      // Links
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < ld2) {
            const alpha = (1 - d2 / ld2) * 0.22;
            const [r, g, bl] = lerpColor(Math.min(Math.max(a.x / width, 0), 1));
            ctx.strokeStyle = `rgba(${r},${g},${bl},${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            if (!reduced && packets.length < 14 && Math.random() < 0.0009) {
              packets.push({ a, b, t: 0, speed: 0.006 + Math.random() * 0.012 });
            }
          }
        }

        // Pointer links
        if (pointer.active) {
          const dx = a.x - pointer.x;
          const dy = a.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 180 * 180) {
            ctx.strokeStyle = `rgba(0,212,255,${(1 - d2 / (180 * 180)) * 0.35})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        const [r, g, b] = lerpColor(Math.min(Math.max(n.x / width, 0), 1));
        if (n.hub) {
          ctx.fillStyle = `rgba(${r},${g},${b},0.12)`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${r},${g},${b},${n.hub ? 0.9 : 0.55})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.hub ? n.r * 1.8 : n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Packets
      packets = packets.filter((p) => {
        p.t += p.speed;
        const dx = p.a.x - p.b.x;
        const dy = p.a.y - p.b.y;
        if (p.t >= 1 || dx * dx + dy * dy > ld2) return false;
        const x = p.a.x + (p.b.x - p.a.x) * p.t;
        const y = p.a.y + (p.b.y - p.a.y) * p.t;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 7);
        grad.addColorStop(0, 'rgba(180,240,255,0.95)');
        grad.addColorStop(1, 'rgba(0,212,255,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = pointer.y >= 0 && pointer.y <= rect.height;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        if (reduced) draw();
      }, 150);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });

    resize();
    draw();
    start();
    io.observe(canvas);
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      io.disconnect();
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
