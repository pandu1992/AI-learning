"use client";

// Lightweight interactive "neural network" particle field rendered on a 2D
// canvas (NO WebGL / three.js — keeps the bundle tiny and runs smoothly on
// phones). Nodes drift slowly, link to nearby nodes with lines, and gently
// swarm toward the pointer/touch. Respects prefers-reduced-motion (renders a
// single static frame then stops). Place inside a `relative overflow-hidden`
// container; it absolutely fills the parent behind the content.

import { useEffect, useRef } from "react";

export default function NeuralCanvas({ className = "", density = 1 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    const parent = canvas.parentElement || canvas;

    // Brand palette for nodes
    const COLORS = ["#33b3e4", "#0093D0", "#F5A200", "#66cbef"];

    let nodes = [];
    const pointer = { x: -9999, y: -9999, active: false };

    function build() {
      const rect = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2); // cap DPR for perf
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Node count scales with area but is capped for mobile performance.
      const base = Math.round((width * height) / 22000) * density;
      const count = Math.max(18, Math.min(base, 90));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1.3 + Math.random() * 1.8,
        c: COLORS[(Math.random() * COLORS.length) | 0],
      }));
    }

    const LINK_DIST = 130; // px within which nodes connect
    const LINK_DIST2 = LINK_DIST * LINK_DIST;

    function frame() {
      ctx.clearRect(0, 0, width, height);

      // update + draw links
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!reduced) {
          // pointer attraction (subtle)
          if (pointer.active) {
            const dx = pointer.x - n.x;
            const dy = pointer.y - n.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 180 * 180 && d2 > 1) {
              const f = 0.6 / Math.sqrt(d2);
              n.vx += dx * f * 0.02;
              n.vy += dy * f * 0.02;
            }
          }
          n.x += n.vx;
          n.y += n.vy;
          // friction + gentle wander
          n.vx *= 0.985;
          n.vy *= 0.985;
          n.vx += (Math.random() - 0.5) * 0.02;
          n.vy += (Math.random() - 0.5) * 0.02;
          // wrap around edges
          if (n.x < -20) n.x = width + 20;
          if (n.x > width + 20) n.x = -20;
          if (n.y < -20) n.y = height + 20;
          if (n.y > height + 20) n.y = -20;
        }

        // links to subsequent nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST2) {
            const a = (1 - Math.sqrt(d2) / LINK_DIST) * 0.5;
            ctx.strokeStyle = `rgba(51,179,228,${a.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
      }

      // draw nodes on top
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        ctx.beginPath();
        ctx.fillStyle = n.c;
        ctx.globalAlpha = 0.9;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!reduced) rafRef.current = requestAnimationFrame(frame);
    }

    function onMove(e) {
      const rect = parent.getBoundingClientRect();
      const p = e.touches ? e.touches[0] : e;
      pointer.x = p.clientX - rect.left;
      pointer.y = p.clientY - rect.top;
      pointer.active = true;
    }
    function onLeave() {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    }

    build();
    frame(); // draws once; loops only when motion is allowed

    const onResize = () => {
      build();
      if (reduced) frame();
    };
    window.addEventListener("resize", onResize);
    parent.addEventListener("pointermove", onMove, { passive: true });
    parent.addEventListener("pointerleave", onLeave, { passive: true });
    parent.addEventListener("touchmove", onMove, { passive: true });
    parent.addEventListener("touchend", onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      parent.removeEventListener("touchmove", onMove);
      parent.removeEventListener("touchend", onLeave);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
