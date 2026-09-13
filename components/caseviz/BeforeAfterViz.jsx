"use client";

import { useState, useEffect } from "react";

// Interactive before/after metric comparison with an animated toggle.
// spec.metrics = [{ label:{id,en}, before, after, unit, betterWhenLower(bool) }]
export default function BeforeAfterViz({ spec, lang }) {
  const [showAfter, setShowAfter] = useState(false);
  const [anim, setAnim] = useState(0);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const dur = 700;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      setAnim(showAfter ? t : 1 - t);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [showAfter]);

  const metrics = spec.metrics || [];
  const L = {
    id: { before: "Sebelum AI", after: "Sesudah AI", toggle: "Lihat dampak" },
    en: { before: "Before AI", after: "After AI", toggle: "See the impact" },
  }[lang];

  return (
    <div>
      <div className="mb-4 flex items-center justify-center gap-3">
        <span className={`text-sm font-semibold ${!showAfter ? "text-slate-800" : "text-slate-400"}`}>{L.before}</span>
        <button
          onClick={() => setShowAfter((s) => !s)}
          role="switch"
          aria-checked={showAfter}
          className={`relative h-7 w-14 rounded-full transition-colors ${showAfter ? "bg-brand-500" : "bg-slate-300"}`}
        >
          <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${showAfter ? "left-8" : "left-1"}`} />
        </button>
        <span className={`text-sm font-semibold ${showAfter ? "text-brand-700" : "text-slate-400"}`}>{L.after}</span>
      </div>

      <div className="space-y-4">
        {metrics.map((m, i) => {
          const val = m.before + (m.after - m.before) * anim;
          const max = Math.max(m.before, m.after) * 1.15 || 1;
          const pct = (val / max) * 100;
          const improved = showAfter;
          const good = m.betterWhenLower ? m.after < m.before : m.after > m.before;
          const barColor = improved ? (good ? "bg-green-500" : "bg-red-400") : "bg-slate-400";
          return (
            <div key={i}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-medium text-slate-700">{m.label[lang]}</span>
                <span className="font-bold tabular-nums text-slate-900">
                  {val.toFixed(m.decimals ?? 0)}{m.unit || ""}
                </span>
              </div>
              <div className="mt-1 h-4 w-full overflow-hidden rounded-full bg-slate-100">
                <div className={`h-4 rounded-full transition-colors ${barColor}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
