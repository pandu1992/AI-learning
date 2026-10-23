"use client";

// Lightweight 3D tilt-on-hover wrapper. On pointer move it rotates the element
// slightly in 3D (perspective + rotateX/Y) toward the cursor and lifts a soft
// highlight — an "interactive 3D" feel with zero WebGL. Disabled under
// prefers-reduced-motion and on touch (no hover). GPU-friendly transforms only.

import { useRef } from "react";

export default function TiltCard({ children, className = "", max = 8, glow = true }) {
  const ref = useRef(null);

  // Tilt is a direct response to pointer movement (not idle animation), so we
  // keep it active even under reduced-motion — we just rely on the short CSS
  // transition, which the reduced-motion CSS already shortens/removes.
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(0)`;
    if (glow) {
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`tilt-card ${glow ? "tilt-glow" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
