"use client";

import { useState, useEffect, useRef } from "react";

// Animated algorithm pipeline: data flows step-by-step through stages.
// Use in the "Analysis" section to show how the algorithm is applied.
// spec.stages = [{ label:{id,en}, detail:{id,en}, icon }]
export default function PipelineViz({ spec, lang }) {
  const stages = spec.stages || [];
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setActive((a) => {
        if (a >= stages.length - 1) {
          setPlaying(false);
          return a;
        }
        return a + 1;
      });
    }, 1200);
    return () => clearInterval(timer.current);
  }, [playing, stages.length]);

  const L = {
    id: { play: "▶ Jalankan alur", replay: "↻ Ulangi", step: "Langkah" },
    en: { play: "▶ Run the flow", replay: "↻ Replay", step: "Step" },
  }[lang];

  const play = () => {
    if (active >= stages.length - 1) setActive(0);
    setPlaying(true);
  };

  return (
    <div>
      {/* horizontal pipeline */}
      <div className="flex items-stretch gap-1 overflow-x-auto pb-2">
        {stages.map((s, i) => (
          <div key={i} className="flex items-center">
            <button
              onClick={() => { setPlaying(false); setActive(i); }}
              className={`flex min-w-[92px] flex-col items-center rounded-xl border-2 px-3 py-3 text-center transition ${
                i === active
                  ? "border-brand-500 bg-brand-50 shadow"
                  : i < active
                  ? "border-brand-200 bg-white"
                  : "border-slate-200 bg-white opacity-70"
              }`}
            >
              <span className="text-2xl">{s.icon || "⚙️"}</span>
              <span className={`mt-1 text-xs font-semibold ${i === active ? "text-brand-700" : "text-slate-600"}`}>
                {s.label[lang]}
              </span>
            </button>
            {i < stages.length - 1 && (
              <span className={`px-1 text-lg ${i < active ? "text-brand-500" : "text-slate-300"}`}>→</span>
            )}
          </div>
        ))}
      </div>

      {/* active stage detail */}
      {stages[active] && (
        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            {L.step} {active + 1}/{stages.length}
          </p>
          <h4 className="mt-1 font-bold text-slate-900">{stages[active].label[lang]}</h4>
          <p className="mt-1 text-sm text-slate-600">{stages[active].detail[lang]}</p>
        </div>
      )}

      <div className="mt-3 text-center">
        <button
          onClick={play}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          {active >= stages.length - 1 ? L.replay : L.play}
        </button>
      </div>
    </div>
  );
}
