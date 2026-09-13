"use client";

import { useState } from "react";

// Interactive conversion/attrition funnel. Hover/click a stage to highlight it.
// spec.stages = [{ label:{id,en}, value, note:{id,en} }]
export default function FunnelViz({ spec, lang }) {
  const [active, setActive] = useState(null);
  const stages = spec.stages || [];
  const max = Math.max(...stages.map((s) => s.value), 1);

  return (
    <div className="space-y-2">
      {stages.map((s, i) => {
        const pct = (s.value / max) * 100;
        const isActive = active === i;
        const prev = i > 0 ? stages[i - 1].value : null;
        const drop = prev ? Math.round(((prev - s.value) / prev) * 100) : null;
        return (
          <div key={i}>
            <button
              onClick={() => setActive(isActive ? null : i)}
              className="mx-auto block w-full text-left"
              style={{ maxWidth: `${Math.max(pct, 22)}%` }}
            >
              <div
                className={`rounded-lg px-3 py-2 text-center text-sm font-semibold text-white transition ${isActive ? "bg-brand-700 ring-2 ring-brand-300" : "bg-brand-500 hover:bg-brand-600"}`}
              >
                {s.label[lang]} · {s.value.toLocaleString()}
              </div>
            </button>
            {drop != null && (
              <p className="mt-0.5 text-center text-[11px] text-red-500">↓ {drop}%</p>
            )}
            {isActive && s.note && (
              <p className="mx-auto mt-1 max-w-md rounded-md bg-slate-50 px-3 py-2 text-center text-xs text-slate-600">
                {s.note[lang]}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
