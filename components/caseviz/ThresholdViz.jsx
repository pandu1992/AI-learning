"use client";

import { useState } from "react";

// Interactive decision-threshold trade-off. A slider moves the cutoff; the
// confusion counts (TP/FP/FN/TN) and precision/recall update live.
// Great for the "Analysis" section of classification cases.
// spec = { positiveLabel:{id,en}, negativeLabel:{id,en},
//          dist: { pos:[scores...], neg:[scores...] } }  scores in 0..1
export default function ThresholdViz({ spec, lang }) {
  const [thr, setThr] = useState(0.5);
  const pos = spec.dist?.pos || [];
  const neg = spec.dist?.neg || [];

  const tp = pos.filter((s) => s >= thr).length;
  const fn = pos.length - tp;
  const fp = neg.filter((s) => s >= thr).length;
  const tn = neg.length - fp;
  const precision = tp + fp === 0 ? 0 : tp / (tp + fp);
  const recall = tp + fn === 0 ? 0 : tp / (tp + fn);

  const L = {
    id: {
      thr: "Ambang keputusan",
      precision: "Presisi",
      recall: "Recall",
      tp: "Benar-positif", fp: "Salah-alarm", fn: "Terlewat", tn: "Benar-negatif",
      hint: "Geser ambang: makin rendah = menangkap lebih banyak kasus positif (recall naik) tapi lebih banyak salah-alarm (presisi turun). Ini keputusan bisnis, bukan sekadar teknis.",
    },
    en: {
      thr: "Decision threshold",
      precision: "Precision",
      recall: "Recall",
      tp: "True positive", fp: "False alarm", fn: "Missed", tn: "True negative",
      hint: "Slide the threshold: lower = catches more positives (recall up) but more false alarms (precision down). This is a business decision, not just a technical one.",
    },
  }[lang];

  // draw dots on a 0..1 axis
  const W = 340, H = 90, PAD = 16;
  const x = (s) => PAD + s * (W - 2 * PAD);

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md" role="img">
        <line x1={PAD} y1={H / 2} x2={W - PAD} y2={H / 2} stroke="#e2e8f0" strokeWidth="1" />
        {neg.map((s, i) => (
          <circle key={`n${i}`} cx={x(s)} cy={H / 2 - 10} r="4" fill={s >= thr ? "#dc2626" : "#F5A200"} opacity="0.85" />
        ))}
        {pos.map((s, i) => (
          <circle key={`p${i}`} cx={x(s)} cy={H / 2 + 10} r="4" fill={s >= thr ? "#0093D0" : "#94a3b8"} opacity="0.9" />
        ))}
        {/* threshold line */}
        <line x1={x(thr)} y1={10} x2={x(thr)} y2={H - 10} stroke="#0f172a" strokeWidth="2" strokeDasharray="4 3" />
      </svg>

      <div className="mt-2">
        <label className="block text-sm font-semibold text-slate-700">
          {L.thr}: <span className="text-brand-600">{thr.toFixed(2)}</span>
        </label>
        <input type="range" min="0.05" max="0.95" step="0.05" value={thr} onChange={(e) => setThr(Number(e.target.value))} className="mt-1 w-full accent-brand-600" />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-center text-sm sm:grid-cols-4">
        <div className="rounded-lg bg-brand-50 p-2"><div className="text-xs text-slate-500">{L.tp}</div><div className="font-bold text-brand-700">{tp}</div></div>
        <div className="rounded-lg bg-red-50 p-2"><div className="text-xs text-slate-500">{L.fp}</div><div className="font-bold text-red-600">{fp}</div></div>
        <div className="rounded-lg bg-slate-50 p-2"><div className="text-xs text-slate-500">{L.fn}</div><div className="font-bold text-slate-700">{fn}</div></div>
        <div className="rounded-lg bg-amber-50 p-2"><div className="text-xs text-slate-500">{L.tn}</div><div className="font-bold text-amber-700">{tn}</div></div>
      </div>

      <div className="mt-3 flex justify-center gap-6 text-sm">
        <span className="text-slate-600">{L.precision}: <b className="text-slate-900">{Math.round(precision * 100)}%</b></span>
        <span className="text-slate-600">{L.recall}: <b className="text-slate-900">{Math.round(recall * 100)}%</b></span>
      </div>

      <p className="mt-3 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">{L.hint}</p>
    </div>
  );
}
