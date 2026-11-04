"use client";

import { useLang } from "../LanguageProvider";
import { batikImages, BATIK_CLASS_ORDER } from "@/lib/batikImages";

// "Average motif" (class prototype) gallery: each image is the pixel-wise mean
// of ~40 real images from that class. It's a genuine ML idea — the nearest-
// centroid / template concept — and visually striking: Parang's diagonals and
// Kawung's grid survive averaging (consistent structure), while varied motifs
// blur out (high intra-class variance → harder to classify).
export default function BatikPrototypes() {
  const { lang } = useLang();
  const L = {
    id: {
      lead: "Tiap gambar di bawah adalah rata-rata piksel dari ~40 citra nyata kelas tersebut — sebuah 'prototipe kelas'.",
      note: "Motif dengan struktur konsisten (mis. garis Parang, kisi Kawung) tetap terlihat setelah dirata-rata; motif yang sangat bervariasi menjadi buram → variasi dalam-kelas tinggi, lebih sulit diklasifikasikan.",
    },
    en: {
      lead: "Each image below is the pixel-wise average of ~40 real images from that class — a 'class prototype'.",
      note: "Motifs with consistent structure (e.g. Parang's diagonals, Kawung's grid) survive averaging; highly varied motifs blur out → high intra-class variance, harder to classify.",
    },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-600">{L.lead}</p>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
        {BATIK_CLASS_ORDER.map((c) => (
          <figure key={c} className="text-center">
            <img src={batikImages.mean[c]} alt={`Average ${c}`} className="mx-auto aspect-square w-full max-w-[120px] rounded-xl border border-slate-200 object-cover" style={{ imageRendering: "auto" }} />
            <figcaption className="mt-1.5 text-xs font-semibold text-slate-700">{c}</figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">💡 {L.note}</p>
    </div>
  );
}
