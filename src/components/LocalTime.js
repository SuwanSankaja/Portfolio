'use client';

import { useEffect, useState } from 'react';
import { site } from '@/config/site';

/** Live local time in Colombo, e.g. "9:42 PM". Renders nothing until mounted to avoid hydration mismatch. */
export function LocalTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: site.timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{time || '—'}</span>;
}
