"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useLang } from "../LanguageProvider";

// Interactive Exploratory Data Analysis (EDA) explorer over a small synthetic
// "house" dataset. Three views: histogram (adjustable bins), correlation
// heatmap, and boxplot with outliers. Original toy data — for teaching.

// synthetic dataset: size(m2), price(hundred-millions Rp), age(years), rooms
function makeData() {
  const rows = [];
  for (let i = 0; i < 80; i++) {
    const size = 40 + Math.random() * 160;
    const rooms = Math.max(1, Math.round(size / 45 + (Math.random() - 0.5)));
    const age = Math.round(Math.random() * 30);
    let price = size * 0.03 + rooms * 0.4 - age * 0.02 + (Math.random() - 0.5) * 1.2 + 1;
    // inject a few outliers
    if (i % 27 === 0) price += 6;
    rows.push({ size: +size.toFixed(0), price: +Math.max(0.5, price).toFixed(2), age, rooms });
  }
  return rows;
}

const FEATURES = [
  { key: "size", id: "Luas (m²)", en: "Size (m²)" },
  { key: "price", id: "Harga", en: "Price" },
  { key: "age", id: "Usia (thn)", en: "Age (yrs)" },
  { key: "rooms", id: "Kamar", en: "Rooms" },
];

function pearson(a, b) {
  const n = a.length;
  const ma = a.reduce((s, v) => s + v, 0) / n;
  const mb = b.reduce((s, v) => s + v, 0) / n;
  let num = 0, da = 0, db = 0;
  for (let i = 0; i < n; i++) {
    const x = a[i] - ma, y = b[i] - mb;
    num += x * y; da += x * x; db += y * y;
  }
  return num / (Math.sqrt(da * db) || 1);
}

function quantile(sorted, q) {
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  return sorted[base + 1] !== undefined ? sorted[base] + rest * (sorted[base + 1] - sorted[base]) : sorted[base];
}

export default function EdaExplorer() {
  const { lang } = useLang();
  const [data] = useState(makeData);
  const [view, setView] = useState("hist"); // hist | corr | box
  const [bins, setBins] = useState(8);
  const [feature, setFeature] = useState("price");
  const histRef = useRef(null);
  const corrRef = useRef(null);
  const boxRef = useRef(null);

  const featLabel = (k) => FEATURES.find((f) => f.key === k)[lang];

  // ---- histogram ----
  useEffect(() => {
    if (view !== "hist") return;
    const c = histRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    const W = c.width, H = c.height, PAD = 30;
    ctx.clearRect(0, 0, W, H);
    const vals = data.map((d) => d[feature]);
    const min = Math.min(...vals), max = Math.max(...vals);
    const counts = new Array(bins).fill(0);
    vals.forEach((v) => {
      let idx = Math.floor(((v - min) / (max - min || 1)) * bins);
      if (idx >= bins) idx = bins - 1;
      counts[idx]++;
    });
    const maxC = Math.max(...counts, 1);
    const bw = (W - 2 * PAD) / bins;
    // axis
    ctx.strokeStyle = "#e2e8f0"; ctx.beginPath(); ctx.moveTo(PAD, H - PAD); ctx.lineTo(W - PAD, H - PAD); ctx.stroke();
    counts.forEach((c2, i) => {
      const h = (c2 / maxC) * (H - 2 * PAD);
      ctx.fillStyle = "#0093D0";
      ctx.fillRect(PAD + i * bw + 1, H - PAD - h, bw - 2, h);
    });
    ctx.fillStyle = "#64748b"; ctx.font = "10px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(min.toFixed(0), PAD, H - PAD + 14);
    ctx.fillText(max.toFixed(0), W - PAD, H - PAD + 14);
  }, [view, bins, feature, data]);

  // ---- correlation heatmap ----
  const corr = useMemo(() => {
    const cols = FEATURES.map((f) => data.map((d) => d[f.key]));
    return FEATURES.map((_, i) => FEATURES.map((__, j) => pearson(cols[i], cols[j])));
  }, [data]);

  useEffect(() => {
    if (view !== "corr") return;
    const c = corrRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    const W = c.width, H = c.height, n = FEATURES.length;
    const M = 70; // left/top margin for labels
    const cell = (W - M) / n;
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const r = corr[i][j];
        // blue for positive, orange for negative
        const t = Math.abs(r);
        const col = r >= 0 ? `rgba(0,147,208,${0.15 + t * 0.75})` : `rgba(245,162,0,${0.15 + t * 0.75})`;
        ctx.fillStyle = col;
        ctx.fillRect(M + j * cell, M + i * cell, cell - 2, cell - 2);
        ctx.fillStyle = t > 0.5 ? "#fff" : "#334155";
        ctx.font = "11px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(r.toFixed(2), M + j * cell + cell / 2, M + i * cell + cell / 2);
      }
    }
    ctx.fillStyle = "#64748b"; ctx.font = "10px sans-serif";
    FEATURES.forEach((f, i) => {
      ctx.textAlign = "right"; ctx.textBaseline = "middle";
      ctx.fillText(f[lang], M - 4, M + i * cell + cell / 2);
      ctx.save(); ctx.translate(M + i * cell + cell / 2, M - 6); ctx.rotate(-Math.PI / 6); ctx.textAlign = "left"; ctx.fillText(f[lang], 0, 0); ctx.restore();
    });
  }, [view, corr, lang]);

  // ---- boxplot ----
  useEffect(() => {
    if (view !== "box") return;
    const c = boxRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    const W = c.width, H = c.height, PAD = 40;
    ctx.clearRect(0, 0, W, H);
    const vals = data.map((d) => d[feature]).sort((a, b) => a - b);
    const q1 = quantile(vals, 0.25), q2 = quantile(vals, 0.5), q3 = quantile(vals, 0.75);
    const iqr = q3 - q1;
    const loFence = q1 - 1.5 * iqr, hiFence = q3 + 1.5 * iqr;
    const inWhisker = vals.filter((v) => v >= loFence && v <= hiFence);
    const wLo = Math.min(...inWhisker), wHi = Math.max(...inWhisker);
    const outliers = vals.filter((v) => v < loFence || v > hiFence);
    const min = Math.min(...vals), max = Math.max(...vals);
    const xOf = (v) => PAD + ((v - min) / (max - min || 1)) * (W - 2 * PAD);
    const cy = H / 2;
    // whiskers
    ctx.strokeStyle = "#334155"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(xOf(wLo), cy); ctx.lineTo(xOf(q1), cy); ctx.moveTo(xOf(q3), cy); ctx.lineTo(xOf(wHi), cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(xOf(wLo), cy - 12); ctx.lineTo(xOf(wLo), cy + 12); ctx.moveTo(xOf(wHi), cy - 12); ctx.lineTo(xOf(wHi), cy + 12); ctx.stroke();
    // box
    ctx.fillStyle = "rgba(0,147,208,0.25)"; ctx.strokeStyle = "#0093D0"; ctx.lineWidth = 2;
    ctx.fillRect(xOf(q1), cy - 26, xOf(q3) - xOf(q1), 52);
    ctx.strokeRect(xOf(q1), cy - 26, xOf(q3) - xOf(q1), 52);
    // median
    ctx.strokeStyle = "#0093D0"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(xOf(q2), cy - 26); ctx.lineTo(xOf(q2), cy + 26); ctx.stroke();
    // outliers
    outliers.forEach((v) => { ctx.beginPath(); ctx.arc(xOf(v), cy, 5, 0, Math.PI * 2); ctx.fillStyle = "#dc2626"; ctx.fill(); });
    ctx.fillStyle = "#64748b"; ctx.font = "10px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("Q1", xOf(q1), cy + 44); ctx.fillText(lang === "id" ? "Median" : "Median", xOf(q2), cy - 34); ctx.fillText("Q3", xOf(q3), cy + 44);
  }, [view, feature, data, lang]);

  const L = {
    id: {
      hist: "Histogram", corr: "Korelasi", box: "Boxplot & Outlier",
      bins: "Jumlah bin", feature: "Fitur",
      histHint: "Histogram menunjukkan SEBARAN sebuah fitur. Geser jumlah bin: terlalu sedikit menyembunyikan pola, terlalu banyak jadi berisik.",
      corrHint: "Heatmap korelasi: biru = korelasi positif, oranye = negatif. Angka mendekati ±1 = hubungan kuat. Membantu memilih fitur & mendeteksi redundansi.",
      boxHint: "Boxplot merangkum sebaran (Q1, median, Q3) dan menandai OUTLIER (titik merah) di luar 1,5×IQR — penting dideteksi saat membersihkan data.",
      redOutlier: "🔴 Titik merah = outlier",
    },
    en: {
      hist: "Histogram", corr: "Correlation", box: "Boxplot & Outliers",
      bins: "Number of bins", feature: "Feature",
      histHint: "A histogram shows the DISTRIBUTION of a feature. Adjust bins: too few hides patterns, too many gets noisy.",
      corrHint: "Correlation heatmap: blue = positive, orange = negative. Values near ±1 = strong relationship. Helps pick features & detect redundancy.",
      boxHint: "A boxplot summarizes the spread (Q1, median, Q3) and marks OUTLIERS (red dots) beyond 1.5×IQR — important to catch when cleaning data.",
      redOutlier: "🔴 Red dots = outliers",
    },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* view tabs */}
      <div className="mb-4 inline-flex flex-wrap rounded-lg border border-slate-300 p-0.5 text-sm font-semibold">
        {[["hist", L.hist], ["corr", L.corr], ["box", L.box]].map(([k, label]) => (
          <button key={k} onClick={() => setView(k)} className={`rounded-md px-3 py-1.5 transition ${view === k ? "bg-brand-600 text-white" : "text-slate-600"}`}>{label}</button>
        ))}
      </div>

      <p className="mb-4 text-sm text-slate-600">{view === "hist" ? L.histHint : view === "corr" ? L.corrHint : L.boxHint}</p>

      {/* controls for hist/box */}
      {(view === "hist" || view === "box") && (
        <div className="mb-3 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-slate-700">{L.feature}:</span>
            <div className="inline-flex flex-wrap gap-1">
              {FEATURES.map((f) => (
                <button key={f.key} onClick={() => setFeature(f.key)} className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${feature === f.key ? "border-transparent bg-brand-600 text-white" : "border-slate-300 bg-white text-slate-700"}`}>{f[lang]}</button>
              ))}
            </div>
          </div>
          {view === "hist" && (
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              {L.bins}: <span className="text-brand-600">{bins}</span>
              <input type="range" min="3" max="20" value={bins} onChange={(e) => setBins(+e.target.value)} className="accent-brand-600" />
            </label>
          )}
        </div>
      )}

      {view === "hist" && <canvas ref={histRef} width={480} height={260} className="w-full max-w-lg rounded-xl border border-slate-300 bg-slate-50" style={{ aspectRatio: "480/260" }} />}
      {view === "corr" && <canvas ref={corrRef} width={340} height={300} className="w-full max-w-md rounded-xl border border-slate-300 bg-slate-50" style={{ aspectRatio: "340/300" }} />}
      {view === "box" && (
        <>
          <canvas ref={boxRef} width={480} height={160} className="w-full max-w-lg rounded-xl border border-slate-300 bg-slate-50" style={{ aspectRatio: "480/160" }} />
          <p className="mt-2 text-xs text-slate-500">{L.redOutlier}</p>
        </>
      )}
    </div>
  );
}
