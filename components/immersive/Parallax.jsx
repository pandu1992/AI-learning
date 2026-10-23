"use client";

// Subtle scroll parallax: translates children on the Y axis as the element
// scrolls through the viewport. Uses a single rAF-throttled scroll listener and
// GPU transforms only. No-ops under prefers-reduced-motion.
//
//   speed > 0  -> moves slower than scroll (drifts up as you scroll down)
//   speed < 0  -> moves faster (drifts down)

import { useEffect, useRef } from "react";

export default function Parallax({ children, speed = 0.15, className = "", as: Tag = "div" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress: -1 (below viewport) .. 1 (above), 0 at center
      const center = rect.top + rect.height / 2;
      const progress = (center - vh / 2) / vh;
      const shift = -progress * speed * 100; // px
      el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <Tag ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </Tag>
  );
}
