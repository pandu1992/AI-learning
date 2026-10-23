"use client";

// Interactive "neural network" particle field on a 2D canvas (NO WebGL /
// three.js — tiny bundle, smooth on phones). Nodes drift and link to nearby
// nodes. The pointer is a FIRST-CLASS citizen: a glowing cursor orb, nearby
// nodes light up and draw bright links to the cursor, nodes are pushed/pulled,
// and clicking fires a shockwave ripple that shoves particles outward.
//
// prefers-reduced-motion handling: we DON'T kill interactivity (that made the
// hero look dead on machines with "reduce animations" on). Instead we disable
// only the *idle* self-animation — nodes stop drifting on their own — but the
// user can still move the cursor / tap to make the network react. The render
// loop runs continuously when motion is allowed; under reduced-motion it runs
// on-demand only while the pointer is active or a shockwave is alive, then
// parks on a calm static frame.

import { useEffect, useRef } from "react";

export default function NeuralCanvas({ className = "", density = 1, interactive = true, colors }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  // `colors` optionally themes the field: { nodes:[hex...], link:[r,g,b],
  // accent:[r,g,b], orb:[r,g,b] }. Falls back to the default brand palette.
  const theme = {
    nodes: colors?.nodes || ["#33b3e4", "#0093D0", "#F5A200", "#66cbef"],
    link: colors?.link || [51, 179, 228],
    accent: colors?.accent || [245, 162, 0],
    orb: colors?.orb || [102, 203, 239],
  };
  const themeKey = JSON.stringify(theme);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    const LINK = theme.link;
    const ACCENT = theme.accent;
    const ORB = theme.orb;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    const parent = canvas.parentElement || canvas;

    const COLORS = theme.nodes;

    let nodes = [];
    const pointer = { x: -9999, y: -9999, active: false, t: 0 };
    let shockwaves = []; // {x, y, r, max}
    let running = false;

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

    // When reduced-motion is on, the loop should keep running only while the
    // user is actively interacting (pointer active or shockwaves still moving).
    function needsFrame() {
      if (!reduced) return true;
      if (pointer.active) return true;
      if (shockwaves.length) return true;
      // also keep running a little while velocities settle
      return nodes.some((n) => Math.abs(n.vx) > 0.05 || Math.abs(n.vy) > 0.05);
    }

    function frame() {
      ctx.clearRect(0, 0, width, height);

      // advance shockwaves (always allowed — they're user-triggered)
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        shockwaves[s].r += 9;
        if (shockwaves[s].r > shockwaves[s].max) shockwaves.splice(s, 1);
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // pointer interaction + physics. Allowed even under reduced-motion
        // because it's a direct response to user input (not idle animation).
        if (pointer.active) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < POINTER_RADIUS2 && d2 > 1) {
            const d = Math.sqrt(d2);
            if (d < 80) {
              const f = (80 - d) / 80;
              n.vx -= (dx / d) * f * 1.4;
              n.vy -= (dy / d) * f * 1.4;
            } else {
              const f = (1 - d / POINTER_RADIUS) * 0.35;
              n.vx += (dx / d) * f;
              n.vy += (dy / d) * f;
            }
          }
        }
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
        n.vx *= 0.94;
        n.vy *= 0.94;
        // idle wander ONLY when full motion is allowed
        if (!reduced) {
          n.vx += (Math.random() - 0.5) * 0.03;
          n.vy += (Math.random() - 0.5) * 0.03;
        }
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        // node-to-node links
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST2) {
            const a = (1 - Math.sqrt(d2) / LINK_DIST) * 0.5;
            ctx.strokeStyle = `rgba(${LINK[0]},${LINK[1]},${LINK[2]},${a.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
      }

      // bright links from nodes near the cursor TO the cursor (the "wow")
      if (pointer.active) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < POINTER_RADIUS2) {
            const a = (1 - Math.sqrt(d2) / POINTER_RADIUS) * 0.9;
            ctx.strokeStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${a.toFixed(3)})`; // accent
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
      if (pointer.active) {
        pointer.t += 0.08;
        const grd = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 60);
        grd.addColorStop(0, "rgba(255,255,255,0.55)");
        grd.addColorStop(0.3, `rgba(${ORB[0]},${ORB[1]},${ORB[2]},0.35)`);
        grd.addColorStop(1, `rgba(${ORB[0]},${ORB[1]},${ORB[2]},0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 60, 0, Math.PI * 2);
        ctx.fill();
        const ringR = 14 + Math.sin(pointer.t) * 4;
        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, ringR, 0, Math.PI * 2);
        ctx.stroke();
      }

      // shockwave rings
      for (let s = 0; s < shockwaves.length; s++) {
        const sw = shockwaves[s];
        const a = 1 - sw.r / sw.max;
        ctx.strokeStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${(a * 0.6).toFixed(3)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // schedule next frame: always when full motion allowed; on-demand under
      // reduced-motion (while interacting / settling).
      if (needsFrame()) {
        running = true;
        rafRef.current = requestAnimationFrame(frame);
      } else {
        running = false;
      }
    }

    // kick the loop if it parked (used by interaction handlers under reduced-motion)
    function wake() {
      if (!running) {
        running = true;
        rafRef.current = requestAnimationFrame(frame);
      }
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
      wake();
    }
    function onLeave() {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    }
    function onDown(e) {
      const { x, y } = toLocal(e);
      shockwaves.push({ x, y, r: 10, max: Math.max(width, height) * 0.7 });
      wake();
    }

    build();
    running = true;
    rafRef.current = requestAnimationFrame(frame); // initial frame + (full motion) continuous loop

    const onResize = () => {
      build();
      wake();
    };
    window.addEventListener("resize", onResize);
    // Interaction is enabled regardless of reduced-motion so the hero stays
    // interactive for everyone; reduced-motion only removes idle auto-drift.
    if (interactive) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [density, interactive, themeKey]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
}
