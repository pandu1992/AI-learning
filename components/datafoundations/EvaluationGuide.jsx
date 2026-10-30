"use client";

import { useState } from "react";
import { useLang } from "../LanguageProvider";
import FormulaWithNotation from "../FormulaWithNotation";

// A reference "which algorithm → which evaluation metric" guide, grouped by
// learning type and task. Complements the interactive EvaluationMetrics above:
// that one lets you play with the math; this one answers "for THIS algorithm,
// what should I measure?". Bilingual, with the key metrics' formulas.

// Metric definitions (shared), each with a KaTeX formula + symbols.
const METRICS = {
  mae: {
    name: "MAE",
    tex: "\\frac{1}{n}\\sum |\\hat{y}-y|",
    id: "Rata-rata selisih absolut. Mudah ditafsir, tahan outlier.",
    en: "Mean absolute error. Easy to read, robust to outliers.",
  },
  rmse: {
    name: "RMSE",
    tex: "\\sqrt{\\frac{1}{n}\\sum (\\hat{y}-y)^2}",
    id: "Akar MSE; menghukum error besar lebih keras.",
    en: "Root of MSE; penalizes large errors harder.",
  },
  r2: {
    name: "R²",
    tex: "1-\\frac{SS_{res}}{SS_{tot}}",
    id: "Seberapa baik model vs tebakan rata-rata (1 = sempurna).",
    en: "How much better than guessing the mean (1 = perfect).",
  },
  acc: {
    name: "Accuracy",
    tex: "\\frac{TP+TN}{TP+TN+FP+FN}",
    id: "Proporsi prediksi benar. Menyesatkan bila kelas timpang.",
    en: "Fraction correct. Misleading on imbalanced classes.",
  },
  prf: {
    name: "Precision / Recall / F1",
    tex: "F1 = 2\\cdot\\frac{P\\cdot R}{P+R}",
    id: "Fokus kelas positif; wajib untuk data timpang (fraud, penyakit).",
    en: "Focus on the positive class; a must for imbalanced data (fraud, disease).",
  },
  auc: {
    name: "ROC-AUC",
    tex: "\\text{AUC} = \\int_0^1 TPR\\, d(FPR)",
    id: "Kualitas peringkat probabilitas, lepas dari ambang.",
    en: "Quality of probability ranking, independent of threshold.",
  },
  logloss: {
    name: "Log Loss",
    tex: "-\\frac{1}{n}\\sum [\\,y\\log p + (1-y)\\log(1-p)\\,]",
    id: "Menghukum probabilitas yang percaya diri tapi salah.",
    en: "Penalizes confident-but-wrong probabilities.",
  },
  silhouette: {
    name: "Silhouette",
    tex: "s = \\frac{b-a}{\\max(a,b)}",
    id: "Seberapa rapat & terpisah cluster (−1..1, makin tinggi makin baik).",
    en: "How tight & separated clusters are (−1..1, higher is better).",
  },
  dbi: {
    name: "Davies–Bouldin",
    tex: "DB = \\frac{1}{k}\\sum_i \\max_{j\\ne i}\\frac{\\sigma_i+\\sigma_j}{d(\\mu_i,\\mu_j)}",
    id: "Rasio sebaran-dalam vs jarak-antar cluster (makin kecil makin baik).",
    en: "Within vs between cluster ratio (lower is better).",
  },
  inertia: {
    name: "Inertia / Elbow",
    tex: "\\sum_i \\lVert x_i-\\mu_{c_i}\\rVert^2",
    id: "Total jarak kuadrat ke centroid; cari 'siku' untuk memilih k.",
    en: "Total squared distance to centroids; find the 'elbow' to pick k.",
  },
  ari: {
    name: "ARI / NMI",
    tex: "\\text{ARI} = \\frac{\\text{RI}-E[\\text{RI}]}{\\max(\\text{RI})-E[\\text{RI}]}",
    id: "Bila label sebenarnya ada: kecocokan cluster vs label (eksternal).",
    en: "If true labels exist: agreement of clusters vs labels (external).",
  },
  evr: {
    name: "Explained Variance Ratio",
    tex: "\\frac{\\lambda_1+\\cdots+\\lambda_k}{\\sum_j \\lambda_j}",
    id: "Berapa % informasi (varians) yang dipertahankan PCA.",
    en: "What % of information (variance) PCA keeps.",
  },
  recon: {
    name: "Reconstruction Error",
    tex: "\\lVert X - \\hat{X} \\rVert^2",
    id: "Seberapa dekat data hasil rekonstruksi ke aslinya (PCA/autoencoder).",
    en: "How close the reconstructed data is to the original (PCA/autoencoder).",
  },
  trust: {
    name: "Trustworthiness",
    tex: "T(k)\\in[0,1]",
    id: "Seberapa setia tetangga dijaga (untuk t-SNE/UMAP).",
    en: "How faithfully neighborhoods are preserved (for t-SNE/UMAP).",
  },
};

// Algorithm → recommended metrics, grouped by learning type & task.
const GROUPS = [
  {
    key: "reg",
    id: { group: "Supervised · Regresi", icon: "📈", note: "Memprediksi ANGKA kontinu → ukur seberapa jauh prediksi dari nilai nyata." },
    en: { group: "Supervised · Regression", icon: "📈", note: "Predicting a continuous NUMBER → measure how far predictions are from the truth." },
    metrics: ["mae", "rmse", "r2"],
    algos: {
      id: ["Linear/Ridge/Lasso Regression", "Random Forest Regressor", "Gradient Boosting Regressor (XGBoost)", "SVR (Support Vector Regression)", "k-NN Regressor"],
      en: ["Linear/Ridge/Lasso Regression", "Random Forest Regressor", "Gradient Boosting Regressor (XGBoost)", "SVR (Support Vector Regression)", "k-NN Regressor"],
    },
  },
  {
    key: "clf",
    id: { group: "Supervised · Klasifikasi", icon: "🎯", note: "Memprediksi KATEGORI → pakai confusion matrix. Untuk data timpang, utamakan Precision/Recall/F1 & AUC daripada Accuracy." },
    en: { group: "Supervised · Classification", icon: "🎯", note: "Predicting a CATEGORY → use the confusion matrix. For imbalanced data, prefer Precision/Recall/F1 & AUC over Accuracy." },
    metrics: ["acc", "prf", "auc", "logloss"],
    algos: {
      id: ["Logistic Regression", "k-NN", "SVM", "Decision Tree", "Random Forest", "Naive Bayes", "Gradient Boosting (XGBoost)"],
      en: ["Logistic Regression", "k-NN", "SVM", "Decision Tree", "Random Forest", "Naive Bayes", "Gradient Boosting (XGBoost)"],
    },
  },
  {
    key: "clust",
    id: { group: "Unsupervised · Clustering", icon: "🔗", note: "Tanpa label → ukur kerapatan & pemisahan cluster. Bila label sebenarnya tersedia, ARI/NMI bisa dipakai." },
    en: { group: "Unsupervised · Clustering", icon: "🔗", note: "No labels → measure cluster tightness & separation. If true labels exist, ARI/NMI can be used." },
    metrics: ["silhouette", "dbi", "inertia", "ari"],
    algos: {
      id: ["k-Means", "DBSCAN", "Hierarchical Clustering", "Gaussian Mixture (GMM)"],
      en: ["k-Means", "DBSCAN", "Hierarchical Clustering", "Gaussian Mixture (GMM)"],
    },
  },
  {
    key: "dr",
    id: { group: "Unsupervised · Reduksi Dimensi", icon: "🧭", note: "Ukur seberapa banyak informasi dipertahankan / struktur dijaga setelah dimensi dikurangi." },
    en: { group: "Unsupervised · Dimensionality Reduction", icon: "🧭", note: "Measure how much information is kept / structure preserved after reducing dimensions." },
    metrics: ["evr", "recon", "trust"],
    algos: {
      id: ["PCA", "Autoencoder", "t-SNE / UMAP (pakai trustworthiness)", "LDA (supervised: pakai akurasi klasifikasi)"],
      en: ["PCA", "Autoencoder", "t-SNE / UMAP (use trustworthiness)", "LDA (supervised: use classification accuracy)"],
    },
  },
];

export default function EvaluationGuide() {
  const { lang } = useLang();
  const [open, setOpen] = useState("reg");

  const L = {
    id: {
      intro: "Metrik evaluasi BERBEDA tergantung jenis tugas. Pilih kelompok untuk melihat algoritma mana memakai metrik apa — lengkap dengan rumusnya.",
      algos: "Algoritma umum", metrics: "Metrik yang cocok",
    },
    en: {
      intro: "Evaluation metrics DIFFER by task type. Pick a group to see which algorithms use which metrics — with their formulas.",
      algos: "Common algorithms", metrics: "Suitable metrics",
    },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.intro}</p>

      {/* group selector */}
      <div className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {GROUPS.map((g) => {
          const meta = g[lang];
          const active = open === g.key;
          return (
            <button
              key={g.key}
              onClick={() => setOpen(g.key)}
              className={`rounded-xl border p-3 text-left transition ${active ? "border-brand-500 bg-brand-50" : "border-slate-200 hover:border-brand-300"}`}
            >
              <div className="text-xl">{meta.icon}</div>
              <div className={`mt-1 text-sm font-bold ${active ? "text-brand-700" : "text-slate-800"}`}>{meta.group}</div>
            </button>
          );
        })}
      </div>

      {/* selected group detail */}
      {GROUPS.filter((g) => g.key === open).map((g) => {
        const meta = g[lang];
        return (
          <div key={g.key} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <p className="text-sm text-slate-600">{meta.note}</p>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {/* algorithms */}
              <div>
                <p className="mb-2 text-sm font-bold text-slate-700">🧩 {L.algos}</p>
                <div className="flex flex-wrap gap-2">
                  {g.algos[lang].map((a, i) => (
                    <span key={i} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">{a}</span>
                  ))}
                </div>
              </div>

              {/* metrics with formulas */}
              <div>
                <p className="mb-2 text-sm font-bold text-slate-700">📐 {L.metrics}</p>
                <div className="space-y-2">
                  {g.metrics.map((mk) => {
                    const m = METRICS[mk];
                    return (
                      <div key={mk} className="rounded-lg border border-slate-200 bg-white p-3">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-sm font-bold text-brand-700">{m.name}</span>
                        </div>
                        <div className="mt-1 overflow-x-auto">
                          <FormulaWithNotation tex={m.tex} display={false} compact />
                        </div>
                        <p className="mt-1 text-xs text-slate-500">{m[lang]}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
