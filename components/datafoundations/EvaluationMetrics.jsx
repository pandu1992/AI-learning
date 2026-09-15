"use client";

import { useState, useMemo } from "react";
import { useLang } from "../LanguageProvider";
import FormulaWithNotation from "../FormulaWithNotation";

// Interactive evaluation-metrics explorer with three tabs:
//  1) Classification: adjustable confusion matrix -> accuracy/precision/recall/F1
//  2) Regression: adjustable predictions -> MSE/MAE/R2
//  3) Unsupervised: k selector -> silhouette-ish score + elbow (inertia) curve
// All original toy math for teaching; formulas rendered with KaTeX.

// ---------- Classification ----------
function Classification({ lang }) {
  const [tp, setTp] = useState(45);
  const [fp, setFp] = useState(10);
  const [fn, setFn] = useState(8);
  const [tn, setTn] = useState(37);

  const total = tp + fp + fn + tn || 1;
  const accuracy = (tp + tn) / total;
  const precision = tp + fp === 0 ? 0 : tp / (tp + fp);
  const recall = tp + fn === 0 ? 0 : tp / (tp + fn);
  const f1 = precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);

  const L = {
    id: {
      hint: "Geser jumlah tiap sel confusion matrix, lalu lihat metrik berubah. Precision fokus 'seberapa tepat prediksi positif'; recall fokus 'seberapa banyak positif tertangkap'.",
      actual: "Aktual", pred: "Prediksi", pos: "Positif", neg: "Negatif",
      tp: "TP (benar-positif)", fp: "FP (salah-alarm)", fn: "FN (terlewat)", tn: "TN (benar-negatif)",
    },
    en: {
      hint: "Adjust each confusion-matrix cell, then watch the metrics change. Precision = 'how correct are positive predictions'; recall = 'how many positives are caught'.",
      actual: "Actual", pred: "Predicted", pos: "Positive", neg: "Negative",
      tp: "TP (true positive)", fp: "FP (false alarm)", fn: "FN (missed)", tn: "TN (true negative)",
    },
  }[lang];

  const Cell = ({ label, value, set, color }) => (
    <div className={`rounded-lg p-3 text-center ${color}`}>
      <div className="text-[11px] text-slate-600">{label}</div>
      <div className="text-lg font-bold text-slate-900">{value}</div>
      <input type="range" min="0" max="100" value={value} onChange={(e) => set(+e.target.value)} className="mt-1 w-full accent-brand-600" />
    </div>
  );

  const Metric = ({ name, tex, value, symbols }) => (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700">{name}</span>
        <span className="text-lg font-bold text-brand-600">{Math.round(value * 100)}%</span>
      </div>
      <div className="mt-1 text-slate-500">
        <FormulaWithNotation tex={tex} display={false} symbols={symbols} compact />
      </div>
    </div>
  );

  const cmSymbols = [
    { sym: "TP", id: "True Positive — benar diprediksi positif", en: "True Positive — correctly predicted positive" },
    { sym: "TN", id: "True Negative — benar diprediksi negatif", en: "True Negative — correctly predicted negative" },
    { sym: "FP", id: "False Positive — salah-alarm (negatif diprediksi positif)", en: "False Positive — false alarm (negative predicted positive)" },
    { sym: "FN", id: "False Negative — terlewat (positif diprediksi negatif)", en: "False Negative — missed (positive predicted negative)" },
  ];

  return (
    <div>
      <p className="mb-3 text-sm text-slate-600">{L.hint}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        <Cell label={L.tp} value={tp} set={setTp} color="bg-brand-50" />
        <Cell label={L.fp} value={fp} set={setFp} color="bg-red-50" />
        <Cell label={L.fn} value={fn} set={setFn} color="bg-amber-50" />
        <Cell label={L.tn} value={tn} set={setTn} color="bg-green-50" />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Metric name="Accuracy" tex={"\\frac{TP+TN}{TP+TN+FP+FN}"} value={accuracy} symbols={cmSymbols} />
        <Metric name="Precision" tex={"\\frac{TP}{TP+FP}"} value={precision} symbols={cmSymbols.slice(0, 3)} />
        <Metric name="Recall" tex={"\\frac{TP}{TP+FN}"} value={recall} symbols={[cmSymbols[0], cmSymbols[3]]} />
        <Metric name="F1" tex={"2\\cdot\\frac{P\\cdot R}{P+R}"} value={f1}
          symbols={[
            { sym: "P", id: "Precision", en: "Precision" },
            { sym: "R", id: "Recall", en: "Recall" },
          ]} />
      </div>
    </div>
  );
}

// ---------- Regression ----------
function Regression({ lang }) {
  // fixed actuals, adjustable "noise" via a slider to change predictions
  const actual = [3.0, 5.0, 2.0, 8.0, 6.0, 4.0, 7.0];
  const [spread, setSpread] = useState(1.0); // prediction error magnitude
  const preds = useMemo(() => actual.map((y, i) => y + Math.sin(i * 1.7) * spread), [spread]);

  const n = actual.length;
  const mse = preds.reduce((s, p, i) => s + (p - actual[i]) ** 2, 0) / n;
  const mae = preds.reduce((s, p, i) => s + Math.abs(p - actual[i]), 0) / n;
  const mean = actual.reduce((s, v) => s + v, 0) / n;
  const ssTot = actual.reduce((s, v) => s + (v - mean) ** 2, 0);
  const ssRes = preds.reduce((s, p, i) => s + (p - actual[i]) ** 2, 0);
  const r2 = ssTot === 0 ? 0 : 1 - ssRes / ssTot;

  const L = {
    id: { hint: "Geser besar error prediksi. MSE menghukum error besar lebih berat (dikuadratkan); MAE lebih 'jujur' pada rata-rata; R² = seberapa baik model dibanding tebakan rata-rata.", spread: "Besar error prediksi" },
    en: { hint: "Adjust the prediction-error magnitude. MSE penalizes large errors more (squared); MAE is a plainer average; R² = how much better the model is than guessing the mean.", spread: "Prediction-error magnitude" },
  }[lang];

  const Metric = ({ name, tex, value, suffix, symbols }) => (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700">{name}</span>
        <span className="text-lg font-bold text-brand-600">{value}{suffix}</span>
      </div>
      <div className="mt-1 text-slate-500">
        <FormulaWithNotation tex={tex} display={false} symbols={symbols} compact />
      </div>
    </div>
  );

  const sy = {
    n: { sym: "n", id: "jumlah data", en: "number of data points" },
    y: { sym: "y", id: "nilai sebenarnya (aktual)", en: "the actual value" },
    yhat: { sym: "\\hat{y}", id: "nilai prediksi model", en: "the model's predicted value" },
    ssres: { sym: "SS_{res}", id: "jumlah kuadrat sisa (error model)", en: "residual sum of squares (model error)" },
    sstot: { sym: "SS_{tot}", id: "jumlah kuadrat total (variasi data)", en: "total sum of squares (data variance)" },
  };

  return (
    <div>
      <p className="mb-3 text-sm text-slate-600">{L.hint}</p>
      <label className="block text-sm font-semibold text-slate-700">{L.spread}: <span className="text-brand-600">{spread.toFixed(1)}</span></label>
      <input type="range" min="0" max="3" step="0.1" value={spread} onChange={(e) => setSpread(+e.target.value)} className="mt-1 w-full max-w-sm accent-brand-600" />
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <Metric name="MSE" tex={"\\frac{1}{n}\\sum (\\hat{y}-y)^2"} value={mse.toFixed(2)} suffix="" symbols={[sy.n, sy.yhat, sy.y]} />
        <Metric name="MAE" tex={"\\frac{1}{n}\\sum |\\hat{y}-y|"} value={mae.toFixed(2)} suffix="" symbols={[sy.n, sy.yhat, sy.y]} />
        <Metric name="R²" tex={"1-\\frac{SS_{res}}{SS_{tot}}"} value={r2.toFixed(2)} suffix="" symbols={[sy.ssres, sy.sstot]} />
      </div>
    </div>
  );
}

// ---------- Unsupervised ----------
function Unsupervised({ lang }) {
  // toy inertia curve (elbow) + a silhouette-ish score peaking at true k=3
  const [k, setK] = useState(3);
  const inertia = (kk) => 100 / kk + (kk > 3 ? (kk - 3) * 3 : 0); // decreasing, elbow ~3
  const silh = (kk) => Math.max(0, 0.72 - Math.abs(kk - 3) * 0.13); // peaks at k=3

  const L = {
    id: {
      hint: "Data tanpa label butuh metrik khusus. Silhouette (−1..1): makin tinggi makin baik pemisahan cluster. Metode Elbow: cari 'siku' pada kurva inertia (jumlah jarak kuadrat ke centroid).",
      k: "Jumlah cluster (k)", silh: "Silhouette Score", inertiaLbl: "Inertia (elbow)", best: "🟢 Terbaik di sekitar k=3 (siku & silhouette tertinggi).",
    },
    en: {
      hint: "Unlabeled data needs special metrics. Silhouette (−1..1): higher = better cluster separation. Elbow method: find the 'elbow' on the inertia curve (sum of squared distances to centroids).",
      k: "Number of clusters (k)", silh: "Silhouette Score", inertiaLbl: "Inertia (elbow)", best: "🟢 Best around k=3 (elbow & highest silhouette).",
    },
  }[lang];

  // simple bar chart of inertia for k=1..8
  const ks = [1, 2, 3, 4, 5, 6, 7, 8];
  const maxIn = Math.max(...ks.map(inertia));

  return (
    <div>
      <p className="mb-3 text-sm text-slate-600">{L.hint}</p>
      <label className="block text-sm font-semibold text-slate-700">{L.k}: <span className="text-brand-600">{k}</span></label>
      <input type="range" min="1" max="8" value={k} onChange={(e) => setK(+e.target.value)} className="mt-1 w-full max-w-sm accent-brand-600" />

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">{L.silh}</span>
            <span className="text-lg font-bold text-brand-600">{silh(k).toFixed(2)}</span>
          </div>
          <div className="mt-1 text-slate-500">
            <FormulaWithNotation tex={"s = \\frac{b-a}{\\max(a,b)}"} display={false} compact
              symbols={[
                { sym: "s", id: "skor silhouette satu titik (−1..1)", en: "the silhouette score of a point (−1..1)" },
                { sym: "a", id: "rata-rata jarak ke titik dalam cluster yang sama", en: "mean distance to points in the same cluster" },
                { sym: "b", id: "rata-rata jarak ke cluster terdekat lain", en: "mean distance to the nearest other cluster" },
              ]} />
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">{L.inertiaLbl}</span>
            <span className="text-lg font-bold text-slate-800">{inertia(k).toFixed(0)}</span>
          </div>
          <div className="mt-1 text-slate-500">
            <FormulaWithNotation tex={"\\sum_{i}\\lVert x_i-\\mu_{c_i}\\rVert^2"} display={false} compact
              symbols={[
                { sym: "x_i", id: "titik data ke-i", en: "the i-th data point" },
                { sym: "\\mu_{c_i}", id: "centroid (pusat) cluster milik titik itu", en: "the centroid of that point's cluster" },
                { sym: "\\lVert \\cdot \\rVert^2", id: "jarak kuadrat (Euclidean)", en: "squared (Euclidean) distance" },
              ]} />
          </div>
        </div>
      </div>

      {/* elbow bar chart */}
      <div className="mt-4">
        <div className="flex items-end gap-1" style={{ height: 90 }}>
          {ks.map((kk) => (
            <div key={kk} className="flex flex-1 flex-col items-center justify-end">
              <div className="w-full rounded-t" style={{ height: `${(inertia(kk) / maxIn) * 78}px`, backgroundColor: kk === k ? "#F5A200" : "#0093D0" }} />
              <span className={`mt-1 text-[10px] ${kk === k ? "font-bold text-brand-700" : "text-slate-400"}`}>{kk}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 text-xs text-slate-500">{L.best}</p>
    </div>
  );
}

export default function EvaluationMetrics() {
  const { lang } = useLang();
  const [tab, setTab] = useState("classification");

  const L = {
    id: { classification: "Klasifikasi (Supervised)", regression: "Regresi (Supervised)", unsupervised: "Unsupervised" },
    en: { classification: "Classification (Supervised)", regression: "Regression (Supervised)", unsupervised: "Unsupervised" },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 inline-flex flex-wrap rounded-lg border border-slate-300 p-0.5 text-sm font-semibold">
        {[["classification", L.classification], ["regression", L.regression], ["unsupervised", L.unsupervised]].map(([k, label]) => (
          <button key={k} onClick={() => setTab(k)} className={`rounded-md px-3 py-1.5 transition ${tab === k ? "bg-brand-600 text-white" : "text-slate-600"}`}>{label}</button>
        ))}
      </div>
      {tab === "classification" && <Classification lang={lang} />}
      {tab === "regression" && <Regression lang={lang} />}
      {tab === "unsupervised" && <Unsupervised lang={lang} />}
    </div>
  );
}
