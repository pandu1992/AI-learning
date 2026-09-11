# 🤖 AI Belajar — Platform Pembelajaran AI Interaktif

Platform pembelajaran interaktif untuk mahasiswa mengenal Artificial Intelligence: mulai dari Machine Learning, Deep Learning, Reinforcement Learning, hingga Large Language Models — lengkap dengan **ilustrasi, demo interaktif, slot video YouTube, dan studi kasus** di berbagai bidang.

Dibangun dengan **Next.js 14 (App Router) + Tailwind CSS**. Konten **dwibahasa** (Bahasa Indonesia default, dengan tombol beralih ke English). Tanpa login — open access.

---

## ✨ Fitur

- **Kurikulum berstruktur** — Pengantar AI → Machine Learning → Deep Learning → Reinforcement Learning → LLM.
- **20+ demo interaktif** yang jalan di browser (tanpa server), **dikelompokkan per topik**:
  - **Machine Learning (5):** k-NN, k-means, Regresi Linear & Logistik, Decision Tree, Naive Bayes.
  - **Deep Learning + Computer Vision (5):** Neural Network, Filter Konvolusi (CNN), Deteksi Tepi (Sobel), Pengenal Digit, Fungsi Aktivasi.
  - **Reinforcement Learning (5):** Grid-World (Q-learning), Multi-Armed Bandit, Labirin (Value Iteration), CartPole, Eksplorasi vs Eksploitasi.
  - **LLM & NLP (5):** Analisis Sentimen (Naive Bayes), TF-IDF, Tokenisasi, Word Embeddings, Attention (BERT/Transformer).
- **Kuis singkat** di akhir tiap topik — pilihan ganda dengan skor & penjelasan instan.
- **Studi kasus naratif gaya business case (Harvard/Stanford)** — 4 bidang (Bisnis, Pertanian, Kesehatan, Pendidikan): profil organisasi, tokoh, tantangan, keputusan, solusi AI, hasil, pelajaran, dan **pertanyaan diskusi kelas**.
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
  demoComponents.js         # peta slug -> komponen demo (20 demo)
  demos/                    # 20 komponen demo interaktif, mis:
    KnnDemo, KMeansDemo, RegressionDemo, DecisionTreeDemo, NaiveBayesDemo   (ML)
    NeuralNetDemo, CnnFiltersDemo, EdgeDetectionDemo, PixelClassifierDemo, ActivationDemo   (DL/CV)
    GridWorldDemo, BanditDemo, MazeValueDemo, CartPoleDemo, ExploreExploitDemo   (RL)
    SentimentDemo, TfidfDemo, TokenizationDemo, EmbeddingsDemo, AttentionDemo   (LLM/NLP)
lib/
  content.js       # site, topics, fields
  demos.js         # daftar 20 demo (dikelompokkan per topik) + detail "cara kerja"
  topicContent.js  # isi tiap halaman topik
  caseStudies.js   # studi kasus naratif (business case)
  quizzes.js       # soal kuis per topik
```

Untuk **menambah demo baru**: tambahkan metadata di `lib/demos.js` (dengan `topic`),
buat komponennya di `components/demos/`, lalu daftarkan di `components/demoComponents.js`.

---

## 🧑‍🏫 Ide Penggunaan di Kelas

- Buka **Demo k-NN** di proyektor, minta mahasiswa menebak wilayah prediksi sebelum menampilkannya, lalu ubah `k` untuk mendiskusikan *overfitting vs generalisasi*.
- Gunakan **Demo k-means** untuk menjelaskan iterasi *assignment → update* secara visual.
- Tautkan tiap topik ke video pilihan Anda lewat `videoId`.

---

## 📦 Deploy

Karena semua halaman ter-*prerender* statis, mudah di-deploy ke Vercel, Netlify, atau GitHub Pages (dengan `output: "export"` bila perlu file statis murni).
