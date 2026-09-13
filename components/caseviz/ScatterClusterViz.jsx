"use client";

import { useState, useMemo } from "react";

// Shows a 2D scatter that toggles between "raw data" and "AI grouping"
// (clustering) or "AI classification" — to illustrate the algorithm's output.
// spec = { xLabel:{id,en}, yLabel:{id,en}, groups:[{name:{id,en}, color, points:[[x,y],...]}] }
// coords in 0..1
const W = 340;
const H = 260;
const PAD = 28;

export default function ScatterClusterViz({ spec, lang }) {
  const [grouped, setGrouped] = useState(false);
  const groups = spec.groups || [];
  const points = useMemo(
    () => groups.flatMap((g, gi) => g.points.map((p) => ({ x: p[0], y: p[1], gi }))),
    [groups]
  );

  const toPx = (x, y) => [PAD + x * (W - 2 * PAD), H - PAD - y * (H - 2 * PAD)];

  const L = {
    id: { raw: "Data mentah", ai: "Hasil AI", toggle: "Terapkan AI" },
    en: { raw: "Raw data", ai: "AI result", toggle: "Apply AI" },
  }[lang];

  return (
    <div>
      <div className="mb-3 flex items-center justify-center gap-3">
        <span className={`text-sm font-semibold ${!grouped ? "text-slate-800" : "text-slate-400"}`}>{L.raw}</span>
        <button
          onClick={() => setGrouped((g) => !g)}
          role="switch"
          aria-checked={grouped}
          className={`relative h-7 w-14 rounded-full transition-colors ${grouped ? "bg-brand-500" : "bg-slate-300"}`}
        >
          <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${grouped ? "left-8" : "left-1"}`} />
        </button>
        <span className={`text-sm font-semibold ${grouped ? "text-brand-700" : "text-slate-400"}`}>{L.ai}</span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md" role="img">
        {/* axes */}
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#cbd5e1" strokeWidth="1" />
        <line x1={PAD} y1={H - PAD} x2={PAD} y2={PAD} stroke="#cbd5e1" strokeWidth="1" />
        {spec.xLabel && (
          <text x={W / 2} y={H - 6} textAnchor="middle" fontSize="10" fill="#64748b">{spec.xLabel[lang]}</text>
        )}
        {spec.yLabel && (
          <text x={12} y={H / 2} textAnchor="middle" fontSize="10" fill="#64748b" transform={`rotate(-90 12 ${H / 2})`}>{spec.yLabel[lang]}</text>
        )}

        {/* group hulls (soft ellipses) when grouped */}
        {grouped &&
          groups.map((g, gi) => {
            const pts = g.points.map((p) => toPx(p[0], p[1]));
            const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
            const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
            const rx = Math.max(...pts.map((p) => Math.abs(p[0] - cx))) + 16;
            const ry = Math.max(...pts.map((p) => Math.abs(p[1] - cy))) + 16;
            return <ellipse key={gi} cx={cx} cy={cy} rx={rx} ry={ry} fill={g.color} opacity="0.12" stroke={g.color} strokeDasharray="4 3" />;
          })}

        {/* points */}
        {points.map((p, i) => {
          const [px, py] = toPx(p.x, p.y);
          const color = grouped ? groups[p.gi].color : "#94a3b8";
          return <circle key={i} cx={px} cy={py} r="4.5" fill={color} stroke="#fff" strokeWidth="1" />;
        })}
      </svg>

      {grouped && (
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          {groups.map((g, gi) => (
            <span key={gi} className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: g.color }} />
              {g.name[lang]}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
