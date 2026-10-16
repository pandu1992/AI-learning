"use client";

import { useEffect, useState } from "react";

// Thin top bar that fills as the page is scrolled — a subtle sense of progress
// on long pages. Fixed at the very top, above the sticky header.
export default function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-brand-400 via-brand-600 to-amber-400 transition-[width] duration-150"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
