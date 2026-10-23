"use client";

// Wraps a hero section and moves a soft radial spotlight toward the cursor by
// setting --sx/--sy CSS vars (the gradient lives in .spotlight::before).
// No-ops under reduced-motion. Children render normally above the effect.

import { useRef } from "react";

export default function Spotlight({ children, className = "" }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const reduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--sx", `${x.toFixed(1)}%`);
    el.style.setProperty("--sy", `${y.toFixed(1)}%`);
  };

  return (
    <div ref={ref} onPointerMove={onMove} className={`spotlight ${className}`}>
      {children}
    </div>
  );
}
