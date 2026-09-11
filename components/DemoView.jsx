"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import PageHero from "./PageHero";
import Callout from "./Callout";
import KnnDemo from "./demos/KnnDemo";
import KMeansDemo from "./demos/KMeansDemo";

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
