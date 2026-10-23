"use client";

// Reusable immersive page hero: cursor spotlight + themed aurora + interactive
// neural-net particle canvas + parallax content. Each page passes a `theme`
// (from lib/immersiveThemes) so topics/pages get their own personality.
//
// Mirrors the homepage hero pattern. The outer wrapper is relative +
// overflow-hidden so the absolute canvas/aurora are clipped; content sits in a
// relative Parallax layer above them.

import Spotlight from "./Spotlight";
import AuroraBackground from "./AuroraBackground";
import NeuralCanvas from "./NeuralCanvas";
import Parallax from "./Parallax";
import { defaultTheme } from "@/lib/immersiveThemes";

export default function ImmersiveHero({
  theme = defaultTheme,
  icon,
  title,
  subtitle,
  eyebrow,
  children,
  compact = false,
}) {
  return (
    <Spotlight
      className={`relative overflow-hidden border-b border-white/10 bg-gradient-to-br ${theme.gradient} text-white`}
    >
      <AuroraBackground colors={theme.nodes} className="opacity-50" />
      <NeuralCanvas colors={theme} className="opacity-80" />
      <Parallax
        speed={0.16}
        className={`relative mx-auto max-w-4xl px-4 text-center ${compact ? "py-14 sm:py-16" : "py-20 sm:py-24"}`}
      >
        {icon && <div className="floaty text-5xl drop-shadow-md sm:text-6xl">{icon}</div>}
        {eyebrow && (
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-white/70">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight drop-shadow-sm sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 sm:text-lg">{subtitle}</p>
        )}
        {children}
      </Parallax>
    </Spotlight>
  );
}
