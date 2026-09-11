# 🤖 AI Belajar — Platform Pembelajaran AI Interaktif

Platform pembelajaran interaktif untuk mahasiswa mengenal Artificial Intelligence: mulai dari Machine Learning, Deep Learning, Reinforcement Learning, hingga Large Language Models — lengkap dengan **ilustrasi, demo interaktif, slot video YouTube, dan studi kasus** di berbagai bidang.

Dibangun dengan **Next.js 14 (App Router) + Tailwind CSS**. Konten **dwibahasa** (Bahasa Indonesia default, dengan tombol beralih ke English). Tanpa login — open access.

---

## ✨ Fitur

- **Kurikulum berstruktur** — Pengantar AI → Machine Learning → Deep Learning → Reinforcement Learning → LLM.
- **5 demo interaktif** yang jalan di browser (tanpa server):
  - **k-NN (Supervised)** — klik kanvas untuk menambah titik berlabel, atur nilai `k`, dan lihat *wilayah keputusan* dihitung langsung.
  - **k-means (Unsupervised)** — lihat centroid bergerak *langkah demi langkah* sampai konvergen.
  - **Regresi Linear & Logistik** — geser garis regresi dan lihat error (MSE) mengecil, atau atur kurva sigmoid untuk klasifikasi.
  - **Jaringan Saraf (Neural Network)** — latih jaringan saraf kecil (ala TensorFlow Playground) dan amati batas keputusannya belajar pada dataset lingkaran/XOR/linear.
  - **Reinforcement Learning (Grid-World)** — agen belajar via Q-learning mencari reward 🏁 dan menghindari jebakan 🕳️; kebijakan optimal ditampilkan sebagai panah.
- **Kuis singkat** di akhir tiap topik — pilihan ganda dengan skor & penjelasan instan.
- **Studi kasus per bidang** — Bisnis, Pertanian, Kesehatan, Pendidikan (tiap contoh diberi label tekniknya).
- **Slot video YouTube** di tiap topik — tinggal tempel ID video.
- **Dwibahasa (ID/EN)** dengan tombol di header (tersimpan di browser).
- **Responsif** — nyaman dibuka di HP maupun proyektor kelas.

---

## 🚀 Menjalankan

```bash
npm install
npm run dev      # mode pengembangan → http://localhost:3000
```

Untuk produksi:

```bash
npm run build
npm run start
```

---

## 🎥 Menambahkan Video YouTube

Buka `lib/topicContent.js`. Setiap topik punya field `videoId` yang masih kosong.
Isi dengan ID video (bagian setelah `v=` pada URL YouTube). Contoh:

URL `https://www.youtube.com/watch?v=aircAruvnKk` → `videoId: "aircAruvnKk"`.

---

## ✏️ Menyunting Konten

Semua teks terpusat dan mudah diedit (tidak perlu menyentuh komponen):

| File | Isi |
|------|-----|
| `lib/content.js` | Judul situs, daftar topik, demo, dan bidang (kartu di beranda & navigasi). |
| `lib/topicContent.js` | Isi lengkap tiap halaman topik + slot video. |
| `lib/caseStudies.js` | Studi kasus per bidang. |

Struktur teks memakai format dwibahasa `{ id: "...", en: "..." }`.

---

## 📁 Struktur Proyek

```
app/
  layout.js                 # layout root (header, footer, provider bahasa)
  page.js                   # beranda
  topics/[slug]/page.js     # halaman topik (dinamis)
  demos/page.js             # daftar demo
  demos/[slug]/page.js      # halaman demo (dinamis)
  case-studies/page.js      # daftar studi kasus
  case-studies/[slug]/page.js
components/
  Header, Footer, LanguageProvider, LanguageToggle
  PageHero, TopicCard, Callout, YouTubeEmbed
  TopicView, DemoView, CaseStudyView
  Quiz.jsx                  # kuis pilihan ganda per topik
  demos/KnnDemo.jsx         # demo supervised (k-NN)
  demos/KMeansDemo.jsx      # demo unsupervised (k-means)
  demos/RegressionDemo.jsx  # demo regresi linear & logistik
  demos/NeuralNetDemo.jsx   # demo jaringan saraf (training di browser)
  demos/GridWorldDemo.jsx   # demo RL grid-world (Q-learning)
lib/
  content.js, topicContent.js, caseStudies.js, quizzes.js
```

---

## 🧑‍🏫 Ide Penggunaan di Kelas

- Buka **Demo k-NN** di proyektor, minta mahasiswa menebak wilayah prediksi sebelum menampilkannya, lalu ubah `k` untuk mendiskusikan *overfitting vs generalisasi*.
- Gunakan **Demo k-means** untuk menjelaskan iterasi *assignment → update* secara visual.
- Tautkan tiap topik ke video pilihan Anda lewat `videoId`.

---

## 📦 Deploy

Karena semua halaman ter-*prerender* statis, mudah di-deploy ke Vercel, Netlify, atau GitHub Pages (dengan `output: "export"` bila perlu file statis murni).
