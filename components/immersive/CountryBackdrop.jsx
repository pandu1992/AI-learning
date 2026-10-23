"use client";

// Iconic per-country landmark scenes behind the home robot. As the robot greets
// in each language, the matching scene cross-fades in (Indonesia → Borobudur +
// Balinese gate, China → Great Wall + pagoda, Japan → Mt. Fuji + torii +
// sakura, UK → Big Ben skyline, Saudi → desert + mosque). Pure SVG, no assets.
// Colored silhouettes with a soft glow so they read clearly against the blue
// hero without overpowering the robot. Honors reduced-motion for the petals.

const SCENES = {
  // Indonesia — Borobudur stupa + Balinese split gate (candi bentar), warm gold
  id: (
    <g>
      <circle cx="120" cy="90" r="34" fill="#fde68a" opacity="0.5" />
      <g fill="#f8cf8f" opacity="0.85" stroke="#e7a94e" strokeWidth="1.5">
        <rect x="190" y="300" width="220" height="34" rx="8" />
        <rect x="210" y="272" width="180" height="30" rx="8" />
        <rect x="232" y="246" width="136" height="28" rx="8" />
        <rect x="254" y="222" width="92" height="26" rx="8" />
        <path d="M300 184 q26 2 26 38 l-52 0 q0 -36 26 -38 Z" />
        <circle cx="300" cy="180" r="8" />
      </g>
      <g fill="#f3c079" opacity="0.85">
        <path d="M248 246 q9 0 9 14 l-18 0 q0 -14 9 -14Z" />
        <path d="M352 246 q9 0 9 14 l-18 0 q0 -14 9 -14Z" />
      </g>
      {/* Balinese candi bentar split gate (right) */}
      <g fill="#e6a85c" opacity="0.8" stroke="#c98334" strokeWidth="1.5">
        <path d="M470 334 L470 206 l26 0 l6 16 l0 112 Z" />
        <path d="M566 334 L566 206 l-26 0 l-6 16 l0 112 Z" />
      </g>
    </g>
  ),

  // China — Great Wall over mountains + pagoda, red/gold
  zh: (
    <g>
      <circle cx="500" cy="88" r="30" fill="#ffd9c0" opacity="0.5" />
      <path d="M0 334 L120 214 L220 300 L330 196 L460 308 L600 236 L600 334 Z" fill="#7f1d1d" opacity="0.5" />
      <g fill="#b91c1c" opacity="0.9" stroke="#7f1d1d" strokeWidth="1.5">
        <path d="M30 304 L120 246 L210 292 L320 226 L440 290 L580 232 L580 304 Z" />
        {[55, 150, 255, 365, 480].map((x, i) => (
          <rect key={i} x={x} y={236 - (i % 2) * 8} width="20" height="22" />
        ))}
        <rect x="300" y="190" width="42" height="46" />
        <rect x="294" y="182" width="54" height="10" />
      </g>
      {/* pagoda */}
      <g fill="#dc2626" opacity="0.9" stroke="#fbbf24" strokeWidth="1.2">
        <path d="M104 304 l48 0 l-8 -18 l-32 0 Z" />
        <path d="M112 286 l32 0 l-7 -18 l-18 0 Z" />
        <path d="M119 268 l18 0 l-9 -18 Z" />
        <rect x="124" y="304" width="8" height="20" />
      </g>
    </g>
  ),

  // Japan — Mt. Fuji + torii gate + sun, blue mountain / red torii
  ja: (
    <g>
      <circle cx="466" cy="112" r="40" fill="#fecaca" opacity="0.65" />
      {/* Mt. Fuji */}
      <path d="M120 334 L300 142 L480 334 Z" fill="#60a5fa" opacity="0.55" />
      <path d="M252 206 L300 142 L350 206 q-24 16 -48 0 q-24 -16 -50 0 Z" fill="#ffffff" opacity="0.9" />
      {/* torii gate (vermilion) */}
      <g fill="#e4002b" opacity="0.9">
        <rect x="404" y="244" width="162" height="14" rx="4" />
        <rect x="416" y="262" width="138" height="10" rx="3" />
        <rect x="428" y="258" width="14" height="76" />
        <rect x="528" y="258" width="14" height="76" />
      </g>
    </g>
  ),

  // UK — London skyline with Big Ben + London Eye, cool stone
  en: (
    <g>
      <g fill="#93c5fd" opacity="0.7">
        <rect x="30" y="248" width="42" height="86" />
        <rect x="84" y="270" width="32" height="64" />
        <rect x="126" y="236" width="48" height="98" />
        <rect x="430" y="258" width="42" height="76" />
        <rect x="482" y="236" width="36" height="98" />
        <rect x="526" y="266" width="42" height="68" />
      </g>
      <circle cx="212" cy="250" r="44" fill="none" stroke="#bfdbfe" strokeWidth="4" opacity="0.85" />
      {[0, 45, 90, 135].map((a, i) => (
        <line key={i} x1="212" y1="250" x2={212 + 44 * Math.cos((a * Math.PI) / 180)} y2={250 + 44 * Math.sin((a * Math.PI) / 180)} stroke="#bfdbfe" strokeWidth="2" opacity="0.6" />
      ))}
      {/* Big Ben */}
      <g fill="#cbd5e1" opacity="0.92">
        <rect x="300" y="160" width="38" height="174" />
        <path d="M300 160 L319 128 L338 160 Z" />
        <circle cx="319" cy="188" r="10" fill="#1e293b" opacity="0.6" />
      </g>
    </g>
  ),

  // Saudi Arabia — desert dunes + mosque with domes & minarets, warm sand
  ar: (
    <g>
      <path d="M460 104 a28 28 0 1 0 11 45 a21 21 0 1 1 -11 -45 Z" fill="#fde68a" opacity="0.7" />
      <path d="M0 334 Q150 280 300 312 T600 300 L600 334 Z" fill="#eab308" opacity="0.35" />
      <path d="M0 334 Q200 302 360 322 T600 316 L600 334 Z" fill="#ca8a04" opacity="0.3" />
      {/* mosque */}
      <g fill="#f5f0e6" opacity="0.9" stroke="#d6c7a1" strokeWidth="1.2">
        <rect x="246" y="250" width="108" height="84" />
        <path d="M258 250 q42 -58 84 0 Z" />
        <rect x="298" y="186" width="4" height="12" />
        <rect x="230" y="208" width="11" height="126" />
        <path d="M230 208 q5.5 -18 11 0 Z" />
        <rect x="359" y="208" width="11" height="126" />
        <path d="M359 208 q5.5 -18 11 0 Z" />
      </g>
      <g fill="#fef3c7" opacity="0.9">
        <circle cx="110" cy="92" r="2.4" />
        <circle cx="156" cy="124" r="2" />
        <circle cx="86" cy="146" r="2" />
      </g>
    </g>
  ),
};

export default function CountryBackdrop({ code }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Object.keys(SCENES).map((key) => (
        <svg
          key={key}
          viewBox="0 0 600 340"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-[1200ms] ease-in-out"
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
    { x: 120, d: 0 }, { x: 200, d: 2 }, { x: 300, d: 1 }, { x: 390, d: 3 },
    { x: 470, d: 1.5 }, { x: 540, d: 2.5 }, { x: 60, d: 3.5 },
  ];
  return (
    <g>
      {petals.map((p, i) => (
        <g key={i} className="sakura-petal" style={{ transformBox: "fill-box", animationDelay: `${p.d}s` }}>
          <ellipse cx={p.x} cy="20" rx="6" ry="3.4" fill="#ffb7d5" opacity="0.8" transform={`rotate(${i * 40} ${p.x} 20)`} />
        </g>
      ))}
    </g>
  );
}
