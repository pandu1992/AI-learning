// Per-topic "spotlight" mini-features — a signature interactive widget for each
// of the 6 curriculum topics, keyed by topic slug. Data is bilingual (id/en).
// The TopicSpotlight component reads `type` to pick which interactive UI to
// render and feeds it this data. All lightweight, client-side, no deps.

export const topicSpotlights = {
  // ---------------- AI Overview: "Is this AI?" ----------------
  "ai-overview": {
    type: "isAi",
    icon: "🤖",
    id: {
      title: "Ini AI atau Bukan?",
      sub: "Tebak apakah tiap sistem termasuk AI. Klik jawabanmu lalu lihat penjelasannya.",
      yes: "AI", no: "Bukan AI",
      items: [
        { text: "Kalkulator menjumlahkan angka", ai: false, why: "Aturan tetap & deterministik — tak belajar dari data." },
        { text: "Filter spam email", ai: true, why: "Belajar pola dari contoh email untuk mengklasifikasikan." },
        { text: "Termostat menyalakan AC di suhu tertentu", ai: false, why: "Hanya aturan if-else sederhana, bukan pembelajaran." },
        { text: "Rekomendasi film di aplikasi streaming", ai: true, why: "Model mempelajari preferensi dari perilaku pengguna." },
        { text: "Mobil swakemudi mengenali pejalan kaki", ai: true, why: "Computer vision + model yang dilatih dari banyak data." },
        { text: "Jam alarm berbunyi pukul 6 pagi", ai: false, why: "Pemicu waktu tetap — tidak ada kecerdasan adaptif." },
      ],
    },
    en: {
      title: "Is This AI?",
      sub: "Guess whether each system counts as AI. Click your answer, then see why.",
      yes: "AI", no: "Not AI",
      items: [
        { text: "A calculator adding numbers", ai: false, why: "Fixed, deterministic rules — it doesn't learn from data." },
        { text: "An email spam filter", ai: true, why: "Learns patterns from example emails to classify them." },
        { text: "A thermostat turning on AC at a set temperature", ai: false, why: "Just a simple if-else rule, not learning." },
        { text: "Movie recommendations in a streaming app", ai: true, why: "A model learns preferences from user behavior." },
        { text: "A self-driving car recognizing pedestrians", ai: true, why: "Computer vision + a model trained on lots of data." },
        { text: "An alarm clock ringing at 6 AM", ai: false, why: "A fixed time trigger — no adaptive intelligence." },
      ],
    },
  },

  // ---------------- Machine Learning: "Which algorithm?" ----------------
  "machine-learning": {
    type: "algoPicker",
    icon: "🧭",
    id: {
      title: "Algoritma Mana untuk Kasusku?",
      sub: "Jawab dua pertanyaan, dapatkan rekomendasi algoritma.",
      q1: "Apakah datamu punya label (jawaban yang benar)?",
      q2a: "Apa yang ingin diprediksi?",
      q2b: "Apa tujuanmu?",
      labeled: "Ya, ada label", unlabeled: "Tidak ada label",
      category: "Kategori (mis. spam/bukan)", number: "Angka (mis. harga)",
      group: "Kelompokkan data mirip", reduce: "Kurangi jumlah fitur",
      resultLbl: "Rekomendasi",
      results: {
        classification: { name: "Klasifikasi (k-NN, SVM, Random Forest)", why: "Data berlabel + target kategori → supervised classification." },
        regression: { name: "Regresi (Linear, Random Forest Regressor)", why: "Data berlabel + target angka kontinu → supervised regression." },
        clustering: { name: "Clustering (k-means, DBSCAN)", why: "Tanpa label + ingin mengelompokkan → unsupervised clustering." },
        dimred: { name: "Reduksi Dimensi (PCA, t-SNE)", why: "Tanpa label + ingin memadatkan fitur → dimensionality reduction." },
      },
      restart: "↺ Ulangi",
    },
    en: {
      title: "Which Algorithm for My Case?",
      sub: "Answer two questions, get an algorithm recommendation.",
      q1: "Does your data have labels (correct answers)?",
      q2a: "What do you want to predict?",
      q2b: "What's your goal?",
      labeled: "Yes, labeled", unlabeled: "No labels",
      category: "A category (e.g. spam/not)", number: "A number (e.g. price)",
      group: "Group similar data", reduce: "Reduce the feature count",
      resultLbl: "Recommendation",
      results: {
        classification: { name: "Classification (k-NN, SVM, Random Forest)", why: "Labeled data + categorical target → supervised classification." },
        regression: { name: "Regression (Linear, Random Forest Regressor)", why: "Labeled data + continuous-number target → supervised regression." },
        clustering: { name: "Clustering (k-means, DBSCAN)", why: "No labels + want to group → unsupervised clustering." },
        dimred: { name: "Dimensionality Reduction (PCA, t-SNE)", why: "No labels + want to compress features → dimensionality reduction." },
      },
      restart: "↺ Restart",
    },
  },

  // ---------------- Deep Learning: Build-a-network ----------------
  "deep-learning": {
    type: "netBuilder",
    icon: "🧠",
    id: {
      title: "Rakit Jaringan Saraf-mu",
      sub: "Tambah/kurangi lapisan & neuron, lihat jumlah parameter tumbuh.",
      inputs: "Neuron input", layers: "Lapisan tersembunyi", width: "Neuron per lapisan", outputs: "Neuron output",
      params: "Total parameter (bobot + bias)",
      note: "Makin banyak parameter = makin kuat tapi makin mudah overfit & lambat dilatih.",
      tiny: "Kecil & cepat, cocok masalah sederhana.",
      big: "Besar & kuat, butuh banyak data agar tak overfit.",
    },
    en: {
      title: "Build Your Neural Network",
      sub: "Add/remove layers & neurons, watch the parameter count grow.",
      inputs: "Input neurons", layers: "Hidden layers", width: "Neurons per layer", outputs: "Output neurons",
      params: "Total parameters (weights + biases)",
      note: "More parameters = more powerful but easier to overfit & slower to train.",
      tiny: "Small & fast, good for simple problems.",
      big: "Large & powerful, needs lots of data to avoid overfitting.",
    },
  },

  // ---------------- Reinforcement Learning: Reward designer ----------------
  "reinforcement-learning": {
    type: "rewardDesigner",
    icon: "🎮",
    id: {
      title: "Desainer Reward",
      sub: "Atur reward sebuah robot pengantar, lihat perilaku yang muncul.",
      goalR: "Reward sampai tujuan", stepR: "Reward tiap langkah", crashR: "Penalti menabrak",
      behaviorLbl: "Perilaku yang dipelajari agen",
      behaviors: {
        efficient: "✅ Efisien: menuju tujuan lewat jalur terpendek & aman.",
        lazy: "😴 Malas: langkah dihukum terlalu berat → agen takut bergerak.",
        reckless: "💥 Ceroboh: menabrak tak dihukum cukup → agen menerobos.",
        wander: "🌀 Berkeliaran: langkah malah diberi reward → agen berputar-putar, enggan selesai.",
      },
      tip: "Reward yang dirancang buruk = perilaku tak diinginkan. Inilah 'reward shaping'.",
    },
    en: {
      title: "Reward Designer",
      sub: "Tune a delivery robot's rewards and see the behavior that emerges.",
      goalR: "Reward for reaching goal", stepR: "Reward per step", crashR: "Penalty for crashing",
      behaviorLbl: "The behavior the agent learns",
      behaviors: {
        efficient: "✅ Efficient: heads to the goal via the shortest, safe path.",
        lazy: "😴 Lazy: steps punished too hard → the agent is afraid to move.",
        reckless: "💥 Reckless: crashing isn't punished enough → the agent barges through.",
        wander: "🌀 Wandering: steps are rewarded → the agent loops around, avoids finishing.",
      },
      tip: "Badly designed rewards = unwanted behavior. This is 'reward shaping'.",
    },
  },

  // ---------------- LLM: Tokenizer counter ----------------
  llm: {
    type: "tokenizer",
    icon: "🔤",
    id: {
      title: "Penghitung Token",
      sub: "Ketik teks dan lihat perkiraan jumlah token — satuan yang 'dibaca' & ditagih LLM.",
      ph: "Ketik atau tempel teks di sini…",
      chars: "Karakter", words: "Kata", tokens: "Perkiraan token",
      note: "Perkiraan kasar (~4 karakter/token untuk teks Latin). Biaya & batas konteks LLM dihitung dalam token, bukan kata.",
      empty: "Mulai mengetik untuk melihat estimasi token.",
    },
    en: {
      title: "Token Counter",
      sub: "Type text and see the estimated token count — the unit an LLM 'reads' & is billed in.",
      ph: "Type or paste text here…",
      chars: "Characters", words: "Words", tokens: "Estimated tokens",
      note: "Rough estimate (~4 chars/token for Latin text). LLM cost & context limits are counted in tokens, not words.",
      empty: "Start typing to see the token estimate.",
    },
  },

  // ---------------- AI Ethics: Dilemma cards ----------------
  "ai-ethics": {
    type: "dilemma",
    icon: "⚖️",
    id: {
      title: "Dilema Etika AI",
      sub: "Baca skenario, pilih sikapmu, lalu lihat pertimbangan etisnya.",
      your: "Pilihanmu", consider: "Pertimbangan",
      next: "Skenario berikutnya →",
      items: [
        {
          scenario: "Model perekrutan kerja lebih sering menolak pelamar dari kelompok tertentu karena data historis bias.",
          options: ["Pakai saja, akurat secara statistik", "Audit & perbaiki bias sebelum dipakai"],
          answer: 1,
          why: "Akurasi statistik tak membenarkan diskriminasi. Bias historis harus diaudit & dimitigasi (fairness).",
        },
        {
          scenario: "Chatbot kesehatan bisa memberi 'diagnosis'. Haruskah menambahkan diagnosis otomatis?",
          options: ["Ya, agar cepat membantu", "Tidak tanpa pengawasan tenaga medis"],
          answer: 1,
          why: "Keputusan berisiko tinggi butuh pengawasan manusia (human oversight) & tak boleh menggantikan profesional.",
        },
        {
          scenario: "Sistem pengenalan wajah dipasang diam-diam di ruang publik untuk 'keamanan'.",
          options: ["Boleh, demi keamanan", "Perlu transparansi & persetujuan"],
          answer: 1,
          why: "Pengawasan tanpa persetujuan melanggar privasi; transparansi & batasan jelas wajib.",
        },
      ],
    },
    en: {
      title: "AI Ethics Dilemmas",
      sub: "Read a scenario, pick your stance, then see the ethical reasoning.",
      your: "Your choice", consider: "Consideration",
      next: "Next scenario →",
      items: [
        {
          scenario: "A hiring model rejects applicants from a certain group more often because the historical data is biased.",
          options: ["Use it, it's statistically accurate", "Audit & fix the bias before using it"],
          answer: 1,
          why: "Statistical accuracy doesn't justify discrimination. Historical bias must be audited & mitigated (fairness).",
        },
        {
          scenario: "A health chatbot could give a 'diagnosis'. Should you add automatic diagnosis?",
          options: ["Yes, to help faster", "No, not without medical oversight"],
          answer: 1,
          why: "High-stakes decisions need human oversight and must not replace professionals.",
        },
        {
          scenario: "A face-recognition system is quietly installed in a public space for 'security'.",
          options: ["It's fine, for safety", "It needs transparency & consent"],
          answer: 1,
          why: "Surveillance without consent violates privacy; transparency & clear limits are required.",
        },
      ],
    },
  },
};

// ---------------- Module spotlights (sub-topics) ----------------
// Keyed by module slug so TopicSpotlight can render them on module pages too.
Object.assign(topicSpotlights, {
  // Data Foundations: "spot the data problem"
  "data-foundations": {
    type: "dataDoctor",
    icon: "🩺",
    id: {
      title: "Dokter Data: Temukan Masalahnya",
      sub: "Lihat tiap kondisi data, pilih masalah yang paling tepat.",
      pick: "Pilih diagnosis:",
      items: [
        { desc: "Kolom 'umur' punya banyak sel kosong.", options: ["Missing values", "Outlier", "Data leakage"], answer: 0, why: "Sel kosong = missing values. Tangani dengan imputasi atau hapus baris/kolom." },
        { desc: "Satu rumah tercatat berharga Rp999 miliar, jauh di atas lainnya.", options: ["Kelas tak seimbang", "Outlier", "Duplikat"], answer: 1, why: "Nilai ekstrem jauh dari sebaran = outlier. Periksa apakah error input atau asli." },
        { desc: "Fitur 'total_bayar' dipakai memprediksi 'apakah transaksi terjadi'.", options: ["Data leakage", "Missing values", "Normalisasi kurang"], answer: 0, why: "'total_bayar' baru ada SETELAH transaksi → bocor info masa depan = data leakage." },
        { desc: "99% data berlabel 'bukan penipuan', 1% 'penipuan'.", options: ["Outlier", "Kelas tak seimbang", "Duplikat"], answer: 1, why: "Distribusi label sangat timpang = class imbalance. Akurasi akan menyesatkan." },
      ],
    },
    en: {
      title: "Data Doctor: Spot the Problem",
      sub: "Read each data condition and pick the most accurate problem.",
      pick: "Pick the diagnosis:",
      items: [
        { desc: "The 'age' column has many empty cells.", options: ["Missing values", "Outlier", "Data leakage"], answer: 0, why: "Empty cells = missing values. Handle with imputation or dropping rows/cols." },
        { desc: "One house is recorded at $999 billion, far above the rest.", options: ["Class imbalance", "Outlier", "Duplicate"], answer: 1, why: "An extreme value far from the distribution = outlier. Check if it's an input error or real." },
        { desc: "A 'total_paid' feature is used to predict 'did the transaction happen'.", options: ["Data leakage", "Missing values", "Needs normalization"], answer: 0, why: "'total_paid' only exists AFTER the transaction → leaks future info = data leakage." },
        { desc: "99% of rows are labeled 'not fraud', 1% 'fraud'.", options: ["Outlier", "Class imbalance", "Duplicate"], answer: 1, why: "A heavily skewed label distribution = class imbalance. Accuracy will mislead." },
      ],
    },
  },

  // Intelligent Agents: order the sense -> think -> act loop
  "intelligent-agents": {
    type: "agentLoop",
    icon: "🔁",
    id: {
      title: "Susun Siklus Agen",
      sub: "Klik langkah sesuai urutan siklus agen–lingkungan yang benar.",
      pick: "Klik berurutan:",
      correctMsg: "✅ Tepat! Sensor → Program agen → Aktuator → Lingkungan, lalu berulang.",
      wrongMsg: "Belum urut. Mulai dari menangkap kondisi lewat sensor.",
      reset: "↺ Ulangi",
      steps: [
        { label: "Sensor menangkap kondisi lingkungan", order: 0 },
        { label: "Program agen memutuskan aksi", order: 1 },
        { label: "Aktuator menjalankan aksi", order: 2 },
        { label: "Lingkungan berubah → ulangi", order: 3 },
      ],
    },
    en: {
      title: "Assemble the Agent Loop",
      sub: "Click the steps in the correct agent–environment cycle order.",
      pick: "Click in order:",
      correctMsg: "✅ Correct! Sensors → Agent program → Actuators → Environment, then repeat.",
      wrongMsg: "Not in order. Start by perceiving the state via sensors.",
      reset: "↺ Restart",
      steps: [
        { label: "Sensors perceive the environment state", order: 0 },
        { label: "The agent program decides an action", order: 1 },
        { label: "Actuators carry out the action", order: 2 },
        { label: "The environment changes → repeat", order: 3 },
      ],
    },
  },

  // Ethics in Practice: more dilemma cards (reuses the dilemma widget)
  "ethics-in-practice": {
    type: "dilemma",
    icon: "⚖️",
    id: {
      title: "Latihan Dilema Etika",
      sub: "Skenario praktik nyata — pilih sikapmu, lihat pertimbangannya.",
      your: "Pilihanmu", consider: "Pertimbangan", next: "Skenario berikutnya →",
      items: [
        { scenario: "Model AI-mu akurat 95% tapi kamu tak bisa menjelaskan kenapa ia menolak pinjaman seseorang.", options: ["Pakai saja, akurat", "Butuh model yang bisa dijelaskan (explainability)"], answer: 1, why: "Keputusan berdampak besar (pinjaman) butuh transparansi/explainability agar bisa diaudit & adil." },
        { scenario: "Data latih berisi foto yang diambil dari internet tanpa izin pemiliknya.", options: ["Tak masalah, publik", "Perlu memperhatikan hak & persetujuan"], answer: 1, why: "Data publik bukan berarti bebas pakai; hormati hak cipta, privasi, & persetujuan." },
        { scenario: "Chatbot-mu kadang menghasilkan info salah yang terdengar meyakinkan.", options: ["Biarkan, umumnya benar", "Beri peringatan & sitasi sumber"], answer: 1, why: "Halusinasi LLM berisiko; beri disclaimer, grounding sumber, & dorong verifikasi pengguna." },
      ],
    },
    en: {
      title: "Ethics Dilemma Practice",
      sub: "Real-practice scenarios — pick your stance, see the reasoning.",
      your: "Your choice", consider: "Consideration", next: "Next scenario →",
      items: [
        { scenario: "Your AI model is 95% accurate but you can't explain why it denied someone's loan.", options: ["Use it, it's accurate", "You need an explainable model"], answer: 1, why: "High-impact decisions (loans) need transparency/explainability to be auditable & fair." },
        { scenario: "Your training data contains photos scraped from the internet without owners' consent.", options: ["Fine, it's public", "Must respect rights & consent"], answer: 1, why: "Public data isn't free to use; respect copyright, privacy, & consent." },
        { scenario: "Your chatbot sometimes produces confident-sounding but false information.", options: ["Leave it, usually right", "Add warnings & cite sources"], answer: 1, why: "LLM hallucination is risky; add disclaimers, source grounding, & encourage user verification." },
      ],
    },
  },
});

export const getTopicSpotlight = (slug) => topicSpotlights[slug] || null;
