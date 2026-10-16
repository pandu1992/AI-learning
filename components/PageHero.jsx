"use client";

import AuroraBackground from "./immersive/AuroraBackground";

export default function PageHero({ icon, title, subtitle }) {
  return (
    <div className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-brand-50 via-white to-amber-50">
      <AuroraBackground className="opacity-40" />
      <div className="relative mx-auto max-w-4xl px-4 py-12 text-center">
        {icon && <div className="text-5xl drop-shadow-sm">{icon}</div>}
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>
        {subtitle && <p className="mx-auto mt-3 max-w-2xl text-slate-600">{subtitle}</p>}
      </div>
    </div>
  );
}
