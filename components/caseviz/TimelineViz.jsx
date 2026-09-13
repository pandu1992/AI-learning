"use client";

import { useState } from "react";

// Interactive project timeline. Click a milestone to expand its detail.
// spec.milestones = [{ when:{id,en}, title:{id,en}, detail:{id,en} }]
export default function TimelineViz({ spec, lang }) {
  const [active, setActive] = useState(0);
  const milestones = spec.milestones || [];

  return (
    <div>
      {/* step dots */}
      <div className="flex items-center">
        {milestones.map((m, i) => (
          <div key={i} className="flex flex-1 items-center last:flex-none">
            <button
              onClick={() => setActive(i)}
              aria-label={m.title[lang]}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                i <= active ? "bg-brand-500 text-white" : "bg-slate-200 text-slate-500"
              } ${i === active ? "ring-4 ring-brand-100" : ""}`}
            >
              {i + 1}
            </button>
            {i < milestones.length - 1 && (
              <div className={`h-1 flex-1 ${i < active ? "bg-brand-500" : "bg-slate-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* active detail */}
      {milestones[active] && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            {milestones[active].when[lang]}
          </p>
          <h4 className="mt-1 font-bold text-slate-900">{milestones[active].title[lang]}</h4>
          <p className="mt-1 text-sm text-slate-600">{milestones[active].detail[lang]}</p>
        </div>
      )}
    </div>
  );
}
