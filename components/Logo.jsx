"use client";

// App logo. Two parts:
//   1) A "cosmic orbit + orange planet + pixel trail" mark, inspired by the
//      visual language of the BINUS Online Computer Science identity (orbit,
//      orange dot, dissolving pixels). This is an original illustration, NOT a
//      copy of the official BINUS trademark. If you have the official logo file,
//      drop it at /public/binus-logo.png and set useImage.
//   2) Optional wordmark ("Cognia") + program attribution.
//
// Props:
//   size       - mark height in px (default 34)
//   showText   - render the wordmark beside the mark (default true)
//   attribution- show "BINUS Online · Computer Science" under the wordmark

const BINUS_ORANGE = "#F5A200";
const BINUS_GRAY = "#9CA3AF";
const BINUS_BLUE = "#0093D0";

export function LogoMark({ size = 34 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Cognia logo"
      style={{ flexShrink: 0 }}
    >
      {/* crosshair guides (subtle) */}
      <line x1="4" y1="30" x2="60" y2="30" stroke={BINUS_GRAY} strokeWidth="1" opacity="0.35" />
      <line x1="22" y1="6" x2="22" y2="56" stroke={BINUS_GRAY} strokeWidth="1" opacity="0.35" />
      {/* crosshair end dots */}
      <circle cx="5" cy="30" r="2.2" fill="#E4002B" />
      <circle cx="59" cy="30" r="2.2" fill="#E4002B" />
      <circle cx="22" cy="7" r="2.2" fill="#E4002B" />
      <circle cx="22" cy="55" r="2.2" fill="#E4002B" />

      {/* grey orbit ring around the planet */}
      <path
        d="M34 16 A 16 16 0 1 1 14 40"
        fill="none"
        stroke={BINUS_GRAY}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* orange planet with highlight */}
      <circle cx="22" cy="30" r="10" fill={BINUS_ORANGE} />
      <circle cx="18.5" cy="26.5" r="3" fill="#ffffff" opacity="0.85" />

      {/* pixel trail dissolving to the right */}
      <g fill={BINUS_GRAY}>
        <rect x="34" y="22" width="4" height="4" />
        <rect x="39" y="26" width="4" height="4" />
        <rect x="34" y="30" width="4" height="4" />
        <rect x="40" y="20" width="3" height="3" opacity="0.8" />
        <rect x="44" y="30" width="3" height="3" opacity="0.7" />
        <rect x="45" y="24" width="2.5" height="2.5" opacity="0.6" />
        <rect x="49" y="28" width="2" height="2" opacity="0.5" />
        <rect x="50" y="22" width="2" height="2" opacity="0.4" />
      </g>
    </svg>
  );
}

export default function Logo({ size = 34, showText = true, attribution = false }) {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark size={size} />
      {showText && (
        <span className="inline-flex flex-col leading-none">
          <span className="text-lg font-extrabold tracking-tight text-brand-700">Cognia</span>
          {attribution && (
            <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color: BINUS_BLUE }}>
              BINUS Online · Computer Science
            </span>
          )}
        </span>
      )}
    </span>
  );
}
