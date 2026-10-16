"use client";

import { useEffect, useState } from "react";

// Lightweight CSS confetti burst. Mount with `fire` truthy to celebrate (e.g. a
// perfect quiz). Renders ~80 falling pieces then cleans up. No dependencies.
const COLORS = ["#0093D0", "#F5A200", "#16a34a", "#e4002b", "#33b3e4", "#7c3aed"];

export default function Confetti({ fire }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (!fire) return;
    const arr = Array.from({ length: 80 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      left: Math.random() * 100,
      bg: COLORS[i % COLORS.length],
      duration: 2.2 + Math.random() * 1.6,
      delay: Math.random() * 0.4,
      rounded: Math.random() > 0.5,
    }));
    setPieces(arr);
    const t = setTimeout(() => setPieces([]), 4200);
    return () => clearTimeout(t);
  }, [fire]);

  if (!pieces.length) return null;
  return (
    <div aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}vw`,
            backgroundColor: p.bg,
            borderRadius: p.rounded ? "9999px" : "2px",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
