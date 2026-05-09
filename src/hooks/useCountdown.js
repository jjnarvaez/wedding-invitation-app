import { useState, useEffect } from 'react';

function useCountdown() {
  const [time, setTime] = useState({ d: "--", h: "--", m: "--", s: "--" });
  useEffect(() => {
    const tick = () => {
      const diff = new Date("2026-09-04T16:00:00-05:00") - new Date();
      if (diff <= 0) { setTime({ d:"00", h:"00", m:"00", s:"00" }); return; }
      const pad = n => String(Math.floor(n)).padStart(2, "0");
      setTime({ d: pad(diff/86400000), h: pad(diff%86400000/3600000), m: pad(diff%3600000/60000), s: pad(diff%60000/1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default useCountdown;