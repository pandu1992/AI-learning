"use client";

// Decorative CS/AI motifs that flank the hero robot so the sides aren't empty.
// LEFT: a 3D-ish "code orbit" — crossed rings rotating with coding symbols
// ({ }, </>, 101, λ, #, a CPU chip) riding around them.
// RIGHT: a rotating "neural network" cluster — nodes linked by lines, pulsing.
// Pure SVG + CSS (no 3D lib). Decorative only (aria-hidden). Idle rotation is
// disabled under reduced-motion, matching the rest of the site.

const CODE_SYMBOLS = ["{ }", "</>", "101", "λ", "#", "()"];

export function CodeOrbit({ className = "" }) {
  return (
    <div className={`tech-orbit pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 220 220" className="h-full w-full overflow-visible">
        {/* three crossed orbit rings (rotate as a group) */}
        <g className="orbit-spin" style={{ transformOrigin: "110px 110px" }}>
          <ellipse cx="110" cy="110" rx="92" ry="38" fill="none" stroke="#7fd3f2" strokeWidth="1.5" opacity="0.5" />
          <ellipse cx="110" cy="110" rx="92" ry="38" fill="none" stroke="#9db6d8" strokeWidth="1.5" opacity="0.4" transform="rotate(60 110 110)" />
          <ellipse cx="110" cy="110" rx="92" ry="38" fill="none" stroke="#F5A200" strokeWidth="1.5" opacity="0.4" transform="rotate(120 110 110)" />
        </g>
        {/* glowing core */}
        <circle cx="110" cy="110" r="16" fill="#0b2436" />
        <circle cx="110" cy="110" r="9" fill="#33b3e4" className="robot-core" />
        {/* CPU chip core mark */}
        <g stroke="#eaf8ff" strokeWidth="1.4" opacity="0.9">
          <rect x="103" y="103" width="14" height="14" rx="2" fill="none" />
          <line x1="110" y1="99" x2="110" y2="103" /><line x1="106" y1="99" x2="106" y2="103" /><line x1="114" y1="99" x2="114" y2="103" />
          <line x1="110" y1="117" x2="110" y2="121" /><line x1="106" y1="117" x2="106" y2="121" /><line x1="114" y1="117" x2="114" y2="121" />
          <line x1="99" y1="110" x2="103" y2="110" /><line x1="117" y1="110" x2="121" y2="110" />
        </g>
        {/* symbols riding the orbit (counter-rotating container, each chip upright) */}
        <g className="orbit-spin-rev" style={{ transformOrigin: "110px 110px" }}>
          {CODE_SYMBOLS.map((s, i) => {
            const a = (i / CODE_SYMBOLS.length) * Math.PI * 2;
            const x = 110 + Math.cos(a) * 92;
            const y = 110 + Math.sin(a) * 38;
            return (
              <g key={i} transform={`translate(${x} ${y})`}>
                <circle r="15" fill="#0b2436" stroke="#33b3e4" strokeWidth="1.5" />
                <text textAnchor="middle" dominantBaseline="central" fontSize="11" fontWeight="700" fill="#7fe3ff" fontFamily="ui-monospace, monospace">
                  {s}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

// Rotating neural-network cluster.
const NODES = [
  { x: 110, y: 40 }, { x: 56, y: 92 }, { x: 164, y: 92 },
  { x: 80, y: 160 }, { x: 140, y: 160 }, { x: 110, y: 112 },
];
const LINKS = [
  [0, 1], [0, 2], [0, 5], [1, 3], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5], [4, 5],
];

export function NeuralCluster({ className = "" }) {
  return (
    <div className={`tech-orbit pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 220 220" className="h-full w-full overflow-visible">
        <g className="orbit-spin-slow" style={{ transformOrigin: "110px 110px" }}>
          {/* links */}
          <g stroke="#7fd3f2" strokeWidth="1.4" opacity="0.5">
            {LINKS.map(([a, b], i) => (
              <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} />
            ))}
          </g>
          {/* nodes (pulsing) */}
          {NODES.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r="9" fill="#0b2436" stroke="#33b3e4" strokeWidth="1.5" />
              <circle cx={n.x} cy={n.y} r="4.5" fill={i % 3 === 0 ? "#F5A200" : "#66e0ff"} className="robot-core" style={{ animationDelay: `${i * 0.3}s` }} />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
