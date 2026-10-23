"use client";

// Iconic per-country landmark scenes behind the home robot. As the robot greets
// in each language, the matching scene cross-fades in. Designed as a WIDE
// horizon band (viewBox 1200x300) anchored to the bottom of the hero, with
// landmarks placed on the LEFT and RIGHT thirds so they flank the centered
// robot instead of hiding behind it. Colored silhouettes, pure SVG, no assets.

const W = 1200;
const H = 300;

const SCENES = {
  // Indonesia — Borobudur (left) + Balinese candi bentar gate (right), gold
  id: (
    <g>
      <circle cx="150" cy="70" r="34" fill="#fde68a" opacity="0.55" />
      {/* Borobudur on the left */}
      <g fill="#f3c17a" opacity="0.9" stroke="#d99a45" strokeWidth="2">
        <rect x="70" y="250" width="210" height="34" rx="8" />
        <rect x="90" y="222" width="170" height="30" rx="8" />
        <rect x="112" y="196" width="126" height="28" rx="8" />
        <rect x="134" y="172" width="82" height="26" rx="8" />
        <path d="M175 132 q26 2 26 40 l-52 0 q0 -38 26 -40 Z" />
        <circle cx="175" cy="128" r="9" />
      </g>
      {/* Balinese split gate on the right */}
      <g fill="#e6a85c" opacity="0.88" stroke="#c98334" strokeWidth="2">
        <path d="M980 284 L980 120 l34 0 l9 20 l0 144 Z" />
        <path d="M1120 284 L1120 120 l-34 0 l-9 20 l0 144 Z" />
      </g>
    </g>
  ),

  // China — pagoda (left) + Great Wall watchtower (right) + mountains, red
  zh: (
    <g>
      <circle cx="1050" cy="70" r="30" fill="#ffd9c0" opacity="0.5" />
      <path d="M0 284 L200 170 L380 250 L560 150 L780 250 L1000 170 L1200 240 L1200 284 Z" fill="#7f1d1d" opacity="0.45" />
      {/* pagoda left */}
      <g fill="#c0271f" opacity="0.92" stroke="#fbbf24" strokeWidth="2">
        <path d="M120 260 l120 0 l-20 -34 l-80 0 Z" />
        <path d="M140 226 l80 0 l-16 -34 l-48 0 Z" />
        <path d="M158 192 l44 0 l-22 -34 Z" />
        <rect x="172" y="260" width="16" height="30" />
      </g>
      {/* Great Wall + watchtower right */}
      <g fill="#b91c1c" opacity="0.9" stroke="#7f1d1d" strokeWidth="2">
        <path d="M820 270 L900 226 L1000 262 L1120 220 L1200 258 L1200 290 L820 290 Z" />
        {[840, 930, 1030, 1140].map((x, i) => (
          <rect key={i} x={x} y={210 - (i % 2) * 8} width="22" height="24" />
        ))}
        <rect x="1000" y="170" width="46" height="52" />
        <rect x="994" y="160" width="58" height="12" />
      </g>
    </g>
  ),

  // Japan — Mt. Fuji (center-left, behind) + torii (right), blue + vermilion
  ja: (
    <g>
      <circle cx="1040" cy="78" r="44" fill="#fecaca" opacity="0.7" />
      {/* Mt. Fuji, left-of-center so the robot doesn't fully cover it */}
      <path d="M40 284 L300 70 L560 284 Z" fill="#5b8fd1" opacity="0.6" />
      <path d="M232 150 L300 70 L370 150 q-34 20 -68 0 q-34 -20 -70 0 Z" fill="#ffffff" opacity="0.92" />
      {/* torii gate on the right */}
      <g fill="#e4002b" opacity="0.92">
        <rect x="860" y="150" width="230" height="20" rx="5" />
        <rect x="880" y="176" width="190" height="14" rx="4" />
        <rect x="898" y="170" width="20" height="114" />
        <rect x="1032" y="170" width="20" height="114" />
      </g>
    </g>
  ),

  // UK — London Eye (left) + Big Ben (right) + skyline, stone blue
  en: (
    <g>
      <g fill="#8fb8e8" opacity="0.75">
        <rect x="60" y="210" width="50" height="74" />
        <rect x="120" y="232" width="38" height="52" />
        <rect x="980" y="214" width="50" height="70" />
        <rect x="1044" y="196" width="42" height="88" />
        <rect x="1096" y="226" width="48" height="58" />
      </g>
      {/* London Eye left */}
      <g opacity="0.85" stroke="#bfdbfe" fill="none" strokeWidth="5">
        <circle cx="300" cy="180" r="74" />
      </g>
      {[0, 36, 72, 108, 144].map((a, i) => (
        <line key={i} x1="300" y1="180" x2={300 + 74 * Math.cos((a * Math.PI) / 180)} y2={180 + 74 * Math.sin((a * Math.PI) / 180)} stroke="#bfdbfe" strokeWidth="2.5" opacity="0.6" />
      ))}
      {/* Big Ben right */}
      <g fill="#cfd8e3" opacity="0.94">
        <rect x="900" y="110" width="46" height="174" />
        <path d="M900 110 L923 70 L946 110 Z" />
        <circle cx="923" cy="146" r="12" fill="#1e293b" opacity="0.55" />
      </g>
    </g>
  ),

  // Saudi — mosque (center-left) + minarets flanking, sand + crescent
  ar: (
    <g>
      <path d="M1040 80 a30 30 0 1 0 12 48 a22 22 0 1 1 -12 -48 Z" fill="#fde68a" opacity="0.7" />
      <path d="M0 284 Q300 234 600 266 T1200 254 L1200 284 Z" fill="#eab308" opacity="0.35" />
      {/* mosque, slightly left */}
      <g fill="#f5f0e6" opacity="0.92" stroke="#d6c7a1" strokeWidth="2">
        <rect x="360" y="190" width="200" height="94" />
        <path d="M382 190 q78 -92 156 0 Z" />
        <rect x="455" y="96" width="6" height="18" />
        <rect x="320" y="120" width="18" height="164" />
        <path d="M320 120 q9 -26 18 0 Z" />
        <rect x="582" y="120" width="18" height="164" />
        <path d="M582 120 q9 -26 18 0 Z" />
      </g>
      <g fill="#fef3c7" opacity="0.9">
        <circle cx="180" cy="80" r="3" />
        <circle cx="250" cy="120" r="2.4" />
        <circle cx="140" cy="140" r="2.4" />
      </g>
    </g>
  ),
};

export default function CountryBackdrop({ code }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%] overflow-hidden" aria-hidden="true">
      {Object.keys(SCENES).map((key) => (
        <svg
          key={key}
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMax meet"
          className="absolute bottom-0 left-1/2 h-full w-[min(1400px,120%)] -translate-x-1/2 opacity-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: key === code ? 0.92 : 0 }}
        >
          {SCENES[key]}
          {key === "ja" && <SakuraPetals />}
        </svg>
      ))}
    </div>
  );
}

// Drifting sakura petals for the Japan scene (SVG + CSS animation).
function SakuraPetals() {
  const petals = [
    { x: 180, d: 0 }, { x: 420, d: 2 }, { x: 650, d: 1 }, { x: 820, d: 3 },
    { x: 980, d: 1.5 }, { x: 1120, d: 2.5 }, { x: 60, d: 3.5 },
  ];
  return (
    <g>
      {petals.map((p, i) => (
        <g key={i} className="sakura-petal" style={{ transformBox: "fill-box", animationDelay: `${p.d}s` }}>
          <ellipse cx={p.x} cy="18" rx="7" ry="4" fill="#ffb7d5" opacity="0.85" transform={`rotate(${i * 40} ${p.x} 18)`} />
        </g>
      ))}
    </g>
  );
}
