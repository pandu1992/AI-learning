"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

// Confusion Matrix & ROC / Threshold explorer.
// A classifier outputs a SCORE in [0,1] for each example. We have two synthetic
// populations (positives tend to score high, negatives low, with overlap). A
// THRESHOLD slider decides positive-vs-negative; students watch the confusion
// matrix, precision/recall/accuracy/F1, and the ROC operating point move — and
// see how AUC summarizes performance across all thresholds. Original toy data.

// Deterministic synthetic scores (seeded) so the demo is stable across renders.
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
// Box-Muller normal
function makeData(seed, sep) {
  const rnd = mulberry32(seed);
  const normal = (m, s) => {
    const u = Math.max(1e-9, rnd()), v = rnd();
    return m + s * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const clamp = (x) => Math.max(0, Math.min(1, x));
  const pos = Array.from({ length: 60 }, () => ({ label: 1, score: clamp(normal(0.5 + sep / 2, 0.15)) }));
  const neg = Array.from({ length: 60 }, () => ({ label: 0, score: clamp(normal(0.5 - sep / 2, 0.15)) }));
  return [...pos, ...neg];
}

function confusion(data, thr) {
  let TP = 0, FP = 0, FN = 0, TN = 0;
  for (const d of data) {
    const pred = d.score >= thr ? 1 : 0;
    if (d.label === 1 && pred === 1) TP++;
    else if (d.label === 0 && pred === 1) FP++;
    else if (d.label === 1 && pred === 0) FN++;
    else TN++;
  }
  return { TP, FP, FN, TN };
}

// ROC points: sweep threshold 1->0, compute (FPR, TPR)
function rocCurve(data) {
  const P = data.filter((d) => d.label === 1).length;
  const N = data.length - P;
  const pts = [];
  for (let t = 1.0; t >= -0.001; t -= 0.02) {
    const { TP, FP } = confusion(data, t);
    pts.push({ fpr: FP / (N || 1), tpr: TP / (P || 1), thr: t });
  }
  // AUC via trapezoid over sorted-by-fpr points
  const sorted = [...pts].sort((a, b) => a.fpr - b.fpr);
  let auc = 0;
  for (let i = 1; i < sorted.length; i++) {
    auc += ((sorted[i].fpr - sorted[i - 1].fpr) * (sorted[i].tpr + sorted[i - 1].tpr)) / 2;
  }
  return { pts, auc };
}

export default function RocThresholdDemo() {
  const { lang } = useLang();
  const [thr, setThr] = useState(0.5);
  const [sep, setSep] = useState(0.5); // class separation (model quality)
  const histRef = useRef(null);
  const rocRef = useRef(null);

  const data = useMemo(() => makeData(12345, sep), [sep]);
  const cm = useMemo(() => confusion(data, thr), [data, thr]);
  const { pts, auc } = useMemo(() => rocCurve(data), [data]);

  const P = cm.TP + cm.FN, N = cm.FP + cm.TN;
  const total = P + N || 1;
  const accuracy = (cm.TP + cm.TN) / total;
  const precision = cm.TP + cm.FP === 0 ? 0 : cm.TP / (cm.TP + cm.FP);
  const recall = cm.TP + cm.FN === 0 ? 0 : cm.TP / (cm.TP + cm.FN);
  const f1 = precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);
  const curTpr = recall;
  const curFpr = N === 0 ? 0 : cm.FP / N;

  const L = {
    id: {
      hint: "Pengklasifikasi memberi SKOR (0–1) pada tiap contoh. AMBANG (threshold) menentukan positif/negatif. Geser ambang & lihat confusion matrix, metrik, serta titik kerja di kurva ROC berubah.",
      sep: "Kualitas model (pemisahan kelas)",
      thr: "Ambang keputusan (threshold)",
      scoreDist: "Sebaran skor (hijau = positif, merah = negatif). Garis = ambang.",
      roc: "Kurva ROC",
      auc: "AUC",
      pos: "Positif", neg: "Negatif", predPos: "Prediksi +", predNeg: "Prediksi −", actual: "Aktual",
      note: "Menaikkan ambang → lebih sedikit positif → precision naik tapi recall turun (dan sebaliknya). Kurva ROC & AUC merangkum performa di SEMUA ambang: AUC 1,0 = sempurna, 0,5 = tebak acak. Pilih ambang sesuai biaya kesalahan (mis. deteksi penyakit vs filter spam).",
      lowSep: "model lemah (banyak tumpang-tindih)", highSep: "model kuat (kelas terpisah)",
    },
    en: {
      hint: "A classifier gives each example a SCORE (0–1). The THRESHOLD decides positive vs negative. Drag the threshold & watch the confusion matrix, metrics, and the ROC operating point move.",
      sep: "Model quality (class separation)",
      thr: "Decision threshold",
      scoreDist: "Score distribution (green = positives, red = negatives). Line = threshold.",
      roc: "ROC curve",
      auc: "AUC",
      pos: "Positive", neg: "Negative", predPos: "Pred +", predNeg: "Pred −", actual: "Actual",
      note: "Raising the threshold → fewer positives → precision up but recall down (and vice versa). The ROC curve & AUC summarize performance across ALL thresholds: AUC 1.0 = perfect, 0.5 = random guessing. Choose the threshold by the cost of errors (e.g. disease detection vs spam filtering).",
      lowSep: "weak model (lots of overlap)", highSep: "strong model (separated classes)",
    },
  }[lang];

  // ---- score histogram ----
  useEffect(() => {
    const c = histRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    const W = c.width, H = c.height, PAD = 20, bins = 20;
    ctx.clearRect(0, 0, W, H);
    const hp = new Array(bins).fill(0), hn = new Array(bins).fill(0);
    data.forEach((d) => {
      let b = Math.floor(d.score * bins); if (b >= bins) b = bins - 1; if (b < 0) b = 0;
      (d.label === 1 ? hp : hn)[b]++;
    });
    const maxC = Math.max(1, ...hp, ...hn);
    const bw = (W - 2 * PAD) / bins;
    for (let i = 0; i < bins; i++) {
      const xp = PAD + i * bw;
      const ph = (hp[i] / maxC) * (H - 2 * PAD);
      const nh = (hn[i] / maxC) * (H - 2 * PAD);
      ctx.fillStyle = "rgba(22,163,74,0.6)";
      ctx.fillRect(xp + 1, H - PAD - ph, bw / 2 - 1, ph);
      ctx.fillStyle = "rgba(220,38,38,0.55)";
      ctx.fillRect(xp + bw / 2, H - PAD - nh, bw / 2 - 1, nh);
    }
    // threshold line
    const tx = PAD + thr * (W - 2 * PAD);
    ctx.strokeStyle = "#0093D0"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(tx, 6); ctx.lineTo(tx, H - PAD); ctx.stroke();
    ctx.fillStyle = "#64748b"; ctx.font = "10px sans-serif";
    ctx.fillText("0", PAD, H - 6); ctx.fillText("1", W - PAD - 4, H - 6);
  }, [data, thr]);

  // ---- ROC curve ----
  useEffect(() => {
    const c = rocRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    const W = c.width, H = c.height, PAD = 28;
    const X = (fpr) => PAD + fpr * (W - 2 * PAD);
    const Y = (tpr) => H - PAD - tpr * (H - 2 * PAD);
    ctx.clearRect(0, 0, W, H);
    // axes + diagonal
    ctx.strokeStyle = "#e2e8f0"; ctx.lineWidth = 1;
    ctx.strokeRect(PAD, PAD, W - 2 * PAD, H - 2 * PAD);
    ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(1), Y(1)); ctx.stroke(); ctx.setLineDash([]);
    // curve
    ctx.strokeStyle = "#0093D0"; ctx.lineWidth = 2.5;
    ctx.beginPath();
    [...pts].sort((a, b) => a.fpr - b.fpr).forEach((p, i) => { const px = X(p.fpr), py = Y(p.tpr); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); });
    ctx.stroke();
    // fill AUC area lightly
    ctx.lineTo(X(1), Y(0)); ctx.closePath();
    ctx.fillStyle = "rgba(0,147,208,0.08)"; ctx.fill();
    // current operating point
    ctx.beginPath(); ctx.arc(X(curFpr), Y(curTpr), 6, 0, Math.PI * 2);
    ctx.fillStyle = "#F5A200"; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = "#fff"; ctx.stroke();
    // labels
    ctx.fillStyle = "#64748b"; ctx.font = "10px sans-serif";
    ctx.fillText("FPR →", W - PAD - 34, H - PAD + 14);
    ctx.save(); ctx.translate(PAD - 8, PAD + 28); ctx.rotate(-Math.PI / 2); ctx.fillText("TPR →", 0, 0); ctx.restore();
  }, [pts, curFpr, curTpr]);

  const Cell = ({ label, val, cls }) => (
    <div className={`rounded-lg p-3 text-center ${cls}`}>
      <div className="text-[11px] text-slate-600">{label}</div>
      <div className="text-xl font-black text-slate-800">{val}</div>
    </div>
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>

      {/* model quality */}
      <div className="mb-3">
        <div className="text-sm font-semibold text-slate-700">{L.sep}: <span className="text-brand-600">{sep.toFixed(2)}</span></div>
        <input type="range" min="0" max="0.9" step="0.05" value={sep} onChange={(e) => setSep(+e.target.value)} className="mt-1 w-full accent-brand-600" />
        <div className="flex justify-between text-[10px] text-slate-400"><span>{L.lowSep}</span><span>{L.highSep}</span></div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="w-full lg:max-w-sm">
          <p className="mb-1 text-xs text-slate-500">{L.scoreDist}</p>
          <canvas ref={histRef} width={360} height={150} className="w-full rounded-lg border border-slate-300 bg-white" style={{ aspectRatio: "360/150" }} />
          {/* threshold slider */}
          <div className="mt-3">
            <div className="text-sm font-semibold text-slate-700">{L.thr}: <span className="text-brand-600">{thr.toFixed(2)}</span></div>
            <input type="range" min="0" max="1" step="0.01" value={thr} onChange={(e) => setThr(+e.target.value)} className="mt-1 w-full accent-brand-600" />
          </div>
        </div>

        <div className="flex-1">
          <p className="mb-1 text-xs text-slate-500">{L.roc} — {L.auc}: <span className="font-bold text-brand-700">{auc.toFixed(3)}</span></p>
          <canvas ref={rocRef} width={260} height={200} className="w-full max-w-xs rounded-lg border border-slate-300 bg-white" style={{ aspectRatio: "260/200" }} />
        </div>
      </div>

      {/* confusion matrix */}
      <div className="mt-5 grid max-w-md grid-cols-2 gap-2">
        <Cell label={`TP (${L.actual} + / ${L.predPos})`} val={cm.TP} cls="bg-green-50" />
        <Cell label={`FP (${L.actual} − / ${L.predPos})`} val={cm.FP} cls="bg-red-50" />
        <Cell label={`FN (${L.actual} + / ${L.predNeg})`} val={cm.FN} cls="bg-amber-50" />
        <Cell label={`TN (${L.actual} − / ${L.predNeg})`} val={cm.TN} cls="bg-slate-50" />
      </div>

      {/* metrics */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[["Accuracy", accuracy], ["Precision", precision], ["Recall / TPR", recall], ["F1", f1]].map(([lbl, v]) => (
          <div key={lbl} className="rounded-lg border border-slate-200 p-2 text-center">
            <div className="text-[11px] text-slate-500">{lbl}</div>
            <div className="text-sm font-bold text-brand-600">{Math.round(v * 100)}%</div>
          </div>
        ))}
      </div>

      <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.note}</p>
    </div>
  );
}
