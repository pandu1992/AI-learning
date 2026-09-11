"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import PageHero from "./PageHero";
import Callout from "./Callout";
import KnnDemo from "./demos/KnnDemo";
import KMeansDemo from "./demos/KMeansDemo";
import RegressionDemo from "./demos/RegressionDemo";
import NeuralNetDemo from "./demos/NeuralNetDemo";
import GridWorldDemo from "./demos/GridWorldDemo";

const registry = {
  "supervised-knn": {
    icon: "🎯",
    Component: KnnDemo,
    id: {
      title: "Klasifikasi Supervised — k-NN",
      subtitle: "Belajar dengan data berlabel.",
      how: [
        "k-Nearest Neighbors menyimpan semua contoh berlabel.",
        "Untuk memprediksi titik baru, ia melihat k tetangga terdekat.",
        "Kelas terbanyak di antara tetangga menjadi prediksi.",
        "Ubah k dan amati bagaimana batas keputusan menjadi lebih halus atau lebih tajam.",
      ],
      case: "Studi kasus: mengklasifikasikan jenis bunga dari ukuran kelopak, atau menandai transaksi sebagai penipuan/normal.",
    },
    en: {
      title: "Supervised Classification — k-NN",
      subtitle: "Learning with labeled data.",
      how: [
        "k-Nearest Neighbors stores all labeled examples.",
        "To predict a new point, it looks at the k closest neighbors.",
        "The majority class among neighbors becomes the prediction.",
        "Change k and observe how the decision boundary gets smoother or sharper.",
      ],
      case: "Case study: classifying flower species from petal sizes, or flagging transactions as fraud/normal.",
    },
  },
  "unsupervised-kmeans": {
    icon: "🔗",
    Component: KMeansDemo,
    id: {
      title: "Clustering Unsupervised — k-means",
      subtitle: "Menemukan kelompok tanpa label.",
      how: [
        "Tempatkan k centroid secara acak.",
        "Setiap titik bergabung ke centroid terdekat (assignment).",
        "Setiap centroid pindah ke rata-rata anggotanya (update).",
        "Ulangi sampai centroid tidak bergerak lagi (konvergen).",
      ],
      case: "Studi kasus: segmentasi pelanggan berdasarkan perilaku belanja, atau mengelompokkan artikel berita bertema serupa.",
    },
    en: {
      title: "Unsupervised Clustering — k-means",
      subtitle: "Finding groups without labels.",
      how: [
        "Place k centroids randomly.",
        "Each point joins its nearest centroid (assignment).",
        "Each centroid moves to the average of its members (update).",
        "Repeat until centroids stop moving (convergence).",
      ],
      case: "Case study: segmenting customers by shopping behavior, or grouping news articles by similar topics.",
    },
  },
  regression: {
    icon: "📉",
    Component: RegressionDemo,
    id: {
      title: "Regresi Linear & Logistik",
      subtitle: "Menarik garis terbaik melewati data.",
      how: [
        "Regresi linear mencari garis y = m·x + b yang paling pas.",
        "Kualitas garis diukur dengan error (MSE) — makin kecil makin baik.",
        "Regresi logistik memakai fungsi sigmoid untuk memprediksi probabilitas kelas (0/1).",
        "Ambang 0,5 pada probabilitas menentukan batas keputusan klasifikasi.",
      ],
      case: "Studi kasus: memprediksi harga rumah (linear) atau menentukan email spam/bukan (logistik).",
    },
    en: {
      title: "Linear & Logistic Regression",
      subtitle: "Fitting the best line through data.",
      how: [
        "Linear regression finds the best-fitting line y = m·x + b.",
        "Line quality is measured by error (MSE) — smaller is better.",
        "Logistic regression uses a sigmoid to predict class probability (0/1).",
        "A 0.5 probability threshold sets the classification decision boundary.",
      ],
      case: "Case study: predicting house prices (linear) or deciding spam/not-spam email (logistic).",
    },
  },
  "neural-network": {
    icon: "🧠",
    Component: NeuralNetDemo,
    id: {
      title: "Jaringan Saraf (Neural Network)",
      subtitle: "Belajar batas keputusan yang rumit.",
      how: [
        "Jaringan menerima 2 input (koordinat x, y) dan menghasilkan probabilitas kelas.",
        "Neuron tersembunyi memungkinkan model mempelajari pola non-linear (mis. XOR & lingkaran).",
        "Saat dilatih, bobot disesuaikan lewat backpropagation untuk memperkecil loss.",
        "Tambah neuron atau ubah learning rate untuk melihat pengaruhnya.",
      ],
      case: "Studi kasus: pengenalan tulisan tangan, deteksi objek, dan banyak tugas persepsi lainnya.",
    },
    en: {
      title: "Neural Network",
      subtitle: "Learning complex decision boundaries.",
      how: [
        "The network takes 2 inputs (x, y coordinates) and outputs a class probability.",
        "Hidden neurons let the model learn non-linear patterns (e.g. XOR & circles).",
        "During training, weights adjust via backpropagation to reduce loss.",
        "Add neurons or change the learning rate to see the effect.",
      ],
      case: "Case study: handwriting recognition, object detection, and many other perception tasks.",
    },
  },
  "rl-gridworld": {
    icon: "🎮",
    Component: GridWorldDemo,
    id: {
      title: "Reinforcement Learning — Grid-World",
      subtitle: "Agen belajar dari reward lewat coba-coba.",
      how: [
        "Agen mengeksplorasi grid dan menerima reward (+1 di tujuan, −1 di jebakan).",
        "Q-learning memperbarui nilai tiap pasangan (state, aksi) berdasarkan pengalaman.",
        "Parameter ε mengatur eksplorasi vs eksploitasi (coba hal baru vs pakai yang terbaik).",
        "Setelah banyak episode, panah menunjukkan kebijakan (policy) optimal yang dipelajari.",
      ],
      case: "Studi kasus: robot navigasi, permainan (AlphaGo), dan optimasi rute.",
    },
    en: {
      title: "Reinforcement Learning — Grid-World",
      subtitle: "An agent learns from rewards by trial and error.",
      how: [
        "The agent explores the grid and receives rewards (+1 at goal, −1 in traps).",
        "Q-learning updates the value of each (state, action) pair from experience.",
        "The ε parameter balances exploration vs exploitation (try new vs use best).",
        "After many episodes, the arrows reveal the learned optimal policy.",
      ],
      case: "Case study: robot navigation, games (AlphaGo), and route optimization.",
    },
  },
};

export default function DemoView({ slug }) {
  const { lang } = useLang();
  const entry = registry[slug];
  const data = entry[lang];
  const Demo = entry.Component;

  const labels = {
    id: { how: "Cara kerja", playground: "Playground", back: "← Semua demo" },
    en: { how: "How it works", playground: "Playground", back: "← All demos" },
  }[lang];

  return (
    <div>
      <PageHero icon={entry.icon} title={data.title} subtitle={data.subtitle} />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="mb-3 text-xl font-bold text-slate-900">🧪 {labels.playground}</h2>
        <Demo />

        <h2 className="mb-3 mt-10 text-xl font-bold text-slate-900">⚙️ {labels.how}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-slate-700">
          {data.how.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>

        <Callout emoji="🌍" title={lang === "id" ? "Contoh Penerapan" : "Application Example"}>
          {data.case}
        </Callout>

        <div className="mt-8">
          <Link href="/demos" className="text-sm font-semibold text-brand-600 hover:underline">
            {labels.back}
          </Link>
        </div>
      </div>
    </div>
  );
}
