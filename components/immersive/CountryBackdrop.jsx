"use client";

// Iconic per-country landmark scenes behind the home robot. As the robot greets
// in each language, the matching scene cross-fades in (Indonesia → Borobudur +
// Balinese gate, China → Great Wall + pagoda, Japan → Mt. Fuji + torii +
// sakura, UK → Big Ben skyline, Saudi → desert + mosque). Pure SVG, no assets.
// Absolutely positioned to fill the hero; sits behind the particles/robot.
// Honors reduced-motion only for the drifting petals/clouds (scenes still show).

const SCENES = {
  // Indonesia — Borobudur stupa + Balinese split gate (candi bentar)
  id: (
    <g>
      <ellipse cx="300" cy="330" rx="180" ry="26" fill="#ffffff" opacity="0.06" />
      {/* Borobudur: stepped pyramid + central stupa */}
      <g fill="#ffffff" opacity="0.14">
        <rect x="200" y="300" width="200" height="30" rx="6" />
        <rect x="218" y="276" width="164" height="26" rx="6" />
        <rect x="236" y="254" width="128" height="24" rx="6" />
        <rect x="256" y="234" width="88" height="22" rx="6" />
        <path d="M300 200 q24 2 24 34 l-48 0 q0 -32 24 -34 Z" />
        <circle cx="300" cy="196" r="7" />
      </g>
      {/* small bell stupas */}
      <g fill="#ffffff" opacity="0.1">
        <path d="M250 254 q8 0 8 12 l-16 0 q0 -12 8 -12Z" />
        <path d="M350 254 q8 0 8 12 l-16 0 q0 -12 8 -12Z" />
      </g>
      {/* Balinese candi bentar split gates on the right */}
      <g fill="#ffffff" opacity="0.12">
        <path d="M470 330 L470 210 l24 0 l6 14 l0 106 Z" />
        <path d="M560 330 L560 210 l-24 0 l-6 14 l0 106 Z" />
      </g>
      <g fill="#ffffff" opacity="0.08">
        <circle cx="120" cy="90" r="30" />
      </g>
    </g>
  ),

  // China — Great Wall over mountains + a pagoda
  zh: (
    <g>
      {/* mountains */}
      <path d="M0 330 L120 220 L220 300 L330 200 L460 310 L600 240 L600 330 Z" fill="#ffffff" opacity="0.10" />
      {/* great wall ridge with crenellations */}
      <g fill="#ffffff" opacity="0.16">
        <path d="M40 300 L120 250 L210 290 L320 230 L430 288 L560 236 L560 300 Z" />
        <g>
          {[60, 150, 250, 360, 470].map((x, i) => (
            <rect key={i} x={x} y={238 - (i % 2) * 6} width="18" height="20" />
          ))}
        </g>
        {/* watchtower */}
        <rect x="300" y="196" width="40" height="44" />
        <rect x="296" y="188" width="48" height="10" />
      </g>
      {/* pagoda */}
      <g fill="#ffffff" opacity="0.13">
        <path d="M110 300 l40 0 l-6 -16 l-28 0 Z" />
        <path d="M116 284 l28 0 l-6 -16 l-16 0 Z" />
        <path d="M122 268 l16 0 l-8 -16 Z" />
        <rect x="126" y="300" width="8" height="18" />
      </g>
      <circle cx="500" cy="90" r="26" fill="#ffffff" opacity="0.1" />
    </g>
  ),

  // Japan — Mt. Fuji + torii gate (sakura petals added as animated layer below)
  ja: (
    <g>
      {/* Mt. Fuji */}
      <path d="M140 330 L300 150 L460 330 Z" fill="#ffffff" opacity="0.12" />
      <path d="M258 206 L300 150 L344 206 q-22 14 -44 0 q-22 -14 -42 0 Z" fill="#ffffff" opacity="0.22" />
      {/* sun disc */}
      <circle cx="470" cy="120" r="34" fill="#ffffff" opacity="0.14" />
      {/* torii gate */}
      <g fill="#ffffff" opacity="0.18">
        <rect x="410" y="250" width="150" height="12" rx="3" />
        <rect x="420" y="266" width="130" height="8" rx="2" />
        <rect x="430" y="262" width="12" height="68" />
        <rect x="528" y="262" width="12" height="68" />
      </g>
    </g>
  ),

  // UK — London skyline with Big Ben
  en: (
    <g fill="#ffffff">
      <g opacity="0.12">
        {/* skyline blocks */}
        <rect x="40" y="250" width="40" height="80" />
        <rect x="90" y="270" width="30" height="60" />
        <rect x="130" y="240" width="46" height="90" />
        <rect x="430" y="260" width="40" height="70" />
        <rect x="480" y="240" width="34" height="90" />
        <rect x="520" y="268" width="40" height="62" />
        {/* London Eye hint */}
        <circle cx="210" cy="250" r="40" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.9" />
      </g>
      {/* Big Ben */}
      <g opacity="0.2">
        <rect x="300" y="170" width="34" height="160" />
        <path d="M300 170 L317 140 L334 170 Z" />
        <circle cx="317" cy="196" r="9" fill="none" stroke="#ffffff" strokeWidth="3" />
      </g>
    </g>
  ),

  // Saudi Arabia — desert dunes + mosque with domes & minarets
  ar: (
    <g>
      {/* dunes */}
      <path d="M0 330 Q150 280 300 310 T600 300 L600 330 Z" fill="#ffffff" opacity="0.1" />
      <path d="M0 330 Q200 300 360 320 T600 315 L600 330 Z" fill="#ffffff" opacity="0.07" />
      {/* mosque */}
      <g fill="#ffffff" opacity="0.16">
        <rect x="250" y="250" width="100" height="70" />
        {/* central dome */}
        <path d="M262 250 q38 -54 76 0 Z" />
        <rect x="298" y="190" width="4" height="12" />
        {/* side minarets */}
        <rect x="236" y="214" width="10" height="106" />
        <path d="M236 214 q5 -16 10 0 Z" />
        <rect x="354" y="214" width="10" height="106" />
        <path d="M354 214 q5 -16 10 0 Z" />
      </g>
      {/* crescent moon */}
      <path d="M470 100 a26 26 0 1 0 10 42 a20 20 0 1 1 -10 -42 Z" fill="#ffffff" opacity="0.16" />
      {/* stars */}
      <g fill="#ffffff" opacity="0.2">
        <circle cx="120" cy="90" r="2" />
        <circle cx="160" cy="120" r="1.6" />
        <circle cx="90" cy="140" r="1.6" />
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
          preserveAspectRatio="xMidYMax meet"
          className="absolute bottom-0 left-1/2 h-[70%] w-[min(1100px,100%)] -translate-x-1/2 transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: key === code ? 1 : 0 }}
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
          <ellipse cx={p.x} cy="20" rx="5" ry="3" fill="#ffd6e7" opacity="0.5" transform={`rotate(${i * 40} ${p.x} 20)`} />
        </g>
      ))}
    </g>
  );
}
