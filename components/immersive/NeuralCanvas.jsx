"use client";

// Interactive "neural network" particle field on a 2D canvas (NO WebGL /
// three.js — tiny bundle, smooth on phones). Nodes drift and link to nearby
// nodes. The pointer is a FIRST-CLASS citizen: a glowing cursor orb, nearby
// nodes light up and draw bright links to the cursor, nodes are pushed/pulled,
// and clicking fires a shockwave ripple that shoves particles outward.
// Respects prefers-reduced-motion (single static frame, no interaction loop).

import { useEffect, useRef } from "react";

export default function NeuralCanvas({ className = "", density = 1, interactive = true }) {
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

    const COLORS = ["#33b3e4", "#0093D0", "#F5A200", "#66cbef"];

    let nodes = [];
    const pointer = { x: -9999, y: -9999, active: false, t: 0 };
    let shockwaves = []; // {x, y, r, max}

    function build() {
      const rect = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const base = Math.round((width * height) / 20000) * density;
      const count = Math.max(22, Math.min(base, 96));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 1.4 + Math.random() * 2,
        c: COLORS[(Math.random() * COLORS.length) | 0],
      }));
    }

    const LINK_DIST = 130;
    const LINK_DIST2 = LINK_DIST * LINK_DIST;
    const POINTER_RADIUS = 240; // influence radius of the cursor
    const POINTER_RADIUS2 = POINTER_RADIUS * POINTER_RADIUS;

    function frame() {
      ctx.clearRect(0, 0, width, height);

      // advance shockwaves
      if (!reduced) {
        for (let s = shockwaves.length - 1; s >= 0; s--) {
          shockwaves[s].r += 9;
          if (shockwaves[s].r > shockwaves[s].max) shockwaves.splice(s, 1);
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!reduced) {
          // pointer interaction: pull from afar, repel up close (strong + visible)
          if (pointer.active) {
            const dx = pointer.x - n.x;
            const dy = pointer.y - n.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < POINTER_RADIUS2 && d2 > 1) {
              const d = Math.sqrt(d2);
              if (d < 80) {
                // close: push away (feels responsive)
                const f = (80 - d) / 80;
                n.vx -= (dx / d) * f * 1.4;
                n.vy -= (dy / d) * f * 1.4;
              } else {
                // far: gentle swarm toward cursor
                const f = (1 - d / POINTER_RADIUS) * 0.35;
                n.vx += (dx / d) * f;
                n.vy += (dy / d) * f;
              }
            }
          }
          // shockwave push
          for (let s = 0; s < shockwaves.length; s++) {
            const sw = shockwaves[s];
            const dx = n.x - sw.x;
            const dy = n.y - sw.y;
            const d = Math.sqrt(dx * dx + dy * dy) || 1;
            if (Math.abs(d - sw.r) < 50) {
              const f = (1 - Math.abs(d - sw.r) / 50) * 2.2;
              n.vx += (dx / d) * f;
              n.vy += (dy / d) * f;
            }
          }
          n.x += n.vx;
          n.y += n.vy;
          n.vx *= 0.94; // a bit more friction so pushes settle nicely
          n.vy *= 0.94;
          n.vx += (Math.random() - 0.5) * 0.03;
          n.vy += (Math.random() - 0.5) * 0.03;
          if (n.x < -20) n.x = width + 20;
          if (n.x > width + 20) n.x = -20;
          if (n.y < -20) n.y = height + 20;
          if (n.y > height + 20) n.y = -20;
        }

        // node-to-node links
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

      // bright links from nodes near the cursor TO the cursor (the "wow")
      if (!reduced && pointer.active) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < POINTER_RADIUS2) {
            const a = (1 - Math.sqrt(d2) / POINTER_RADIUS) * 0.9;
            ctx.strokeStyle = `rgba(245,162,0,${a.toFixed(3)})`; // brand orange
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        ctx.beginPath();
        ctx.fillStyle = n.c;
        ctx.globalAlpha = 0.92;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // glowing cursor orb + pulse ring
      if (!reduced && pointer.active) {
        pointer.t += 0.08;
        const grd = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 60);
        grd.addColorStop(0, "rgba(255,255,255,0.55)");
        grd.addColorStop(0.3, "rgba(102,203,239,0.35)");
        grd.addColorStop(1, "rgba(102,203,239,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 60, 0, Math.PI * 2);
        ctx.fill();
        // pulsing ring
        const ringR = 14 + Math.sin(pointer.t) * 4;
        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, ringR, 0, Math.PI * 2);
        ctx.stroke();
      }

      // draw shockwave rings
      if (!reduced) {
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const a = 1 - sw.r / sw.max;
          ctx.strokeStyle = `rgba(245,162,0,${(a * 0.6).toFixed(3)})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      if (!reduced) rafRef.current = requestAnimationFrame(frame);
    }

    function toLocal(e) {
      const rect = parent.getBoundingClientRect();
      const p = e.touches ? e.touches[0] : e;
      return { x: p.clientX - rect.left, y: p.clientY - rect.top };
    }
    function onMove(e) {
      const { x, y } = toLocal(e);
      pointer.x = x;
      pointer.y = y;
      pointer.active = true;
    }
    function onLeave() {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    }
    function onDown(e) {
      const { x, y } = toLocal(e);
      shockwaves.push({ x, y, r: 10, max: Math.max(width, height) * 0.7 });
    }

    build();
    frame();

    const onResize = () => {
      build();
      if (reduced) frame();
    };
    window.addEventListener("resize", onResize);
    if (interactive && !reduced) {
      parent.addEventListener("pointermove", onMove, { passive: true });
      parent.addEventListener("pointerleave", onLeave, { passive: true });
      parent.addEventListener("pointerdown", onDown, { passive: true });
      parent.addEventListener("touchmove", onMove, { passive: true });
      parent.addEventListener("touchend", onLeave, { passive: true });
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      parent.removeEventListener("pointerdown", onDown);
      parent.removeEventListener("touchmove", onMove);
      parent.removeEventListener("touchend", onLeave);
    };
  }, [density, interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
}
