// Bilingual quiz questions per topic slug. Each question:
// { q, options[], answer (index), explain }

export const quizzes = {
  "ai-overview": {
    id: [
      {
        q: "Manakah pernyataan yang paling tepat tentang hubungan AI, ML, dan DL?",
        options: [
          "AI adalah bagian dari Machine Learning",
          "Deep Learning adalah bagian dari Machine Learning, dan ML bagian dari AI",
          "ML dan AI adalah hal yang sama persis",
          "Deep Learning lebih luas daripada AI",
        ],
        answer: 1,
        explain: "AI adalah payung terbesar; di dalamnya ada ML; di dalam ML ada Deep Learning.",
      },
      {
        q: "Tiga faktor utama yang mendorong kemajuan AI dalam satu dekade terakhir adalah…",
        options: [
          "Data melimpah, komputasi murah (GPU), dan algoritma matang",
          "Internet lambat, data sedikit, dan CPU mahal",
          "Hanya karena media sosial",
          "Karena penurunan minat riset",
        ],
        answer: 0,
        explain: "Kombinasi data, komputasi, dan algoritma membuat AI melompat maju.",
      },
    ],
    en: [
      {
        q: "Which statement best describes the relationship between AI, ML, and DL?",
        options: [
          "AI is a subset of Machine Learning",
          "Deep Learning is a subset of Machine Learning, and ML is a subset of AI",
          "ML and AI are exactly the same",
          "Deep Learning is broader than AI",
        ],
        answer: 1,
        explain: "AI is the biggest umbrella; ML sits inside it; Deep Learning sits inside ML.",
      },
      {
        q: "The three main factors driving AI progress in the last decade are…",
        options: [
          "Abundant data, cheap compute (GPUs), and mature algorithms",
          "Slow internet, little data, and expensive CPUs",
          "Only social media",
          "A decline in research interest",
        ],
        answer: 0,
        explain: "Data + compute + algorithms together made AI leap forward.",
      },
    ],
  },

  "machine-learning": {
    id: [
      {
        q: "Perbedaan utama supervised dan unsupervised learning adalah…",
        options: [
          "Supervised memakai data berlabel, unsupervised tidak",
          "Unsupervised selalu lebih akurat",
          "Supervised tidak butuh data",
          "Keduanya tidak butuh data",
        ],
        answer: 0,
        explain: "Supervised belajar dari data yang punya jawaban/label; unsupervised mencari struktur tanpa label.",
      },
      {
        q: "Algoritma mana yang merupakan contoh unsupervised learning?",
        options: ["k-Nearest Neighbors", "Regresi Linear", "k-Means Clustering", "Logistic Regression"],
        answer: 2,
        explain: "k-Means mengelompokkan data tanpa label — termasuk unsupervised learning.",
      },
      {
        q: "Prediksi harga rumah (angka kontinu) termasuk tugas…",
        options: ["Klasifikasi", "Clustering", "Regresi", "Reduksi dimensi"],
        answer: 2,
        explain: "Memprediksi angka kontinu disebut regresi.",
      },
    ],
    en: [
      {
        q: "The key difference between supervised and unsupervised learning is…",
        options: [
          "Supervised uses labeled data, unsupervised does not",
          "Unsupervised is always more accurate",
          "Supervised needs no data",
          "Neither needs data",
        ],
        answer: 0,
        explain: "Supervised learns from labeled data; unsupervised finds structure without labels.",
      },
      {
        q: "Which algorithm is an example of unsupervised learning?",
        options: ["k-Nearest Neighbors", "Linear Regression", "k-Means Clustering", "Logistic Regression"],
        answer: 2,
        explain: "k-Means groups unlabeled data — it is unsupervised learning.",
      },
      {
        q: "Predicting house prices (a continuous number) is a…",
        options: ["Classification", "Clustering", "Regression", "Dimensionality reduction"],
        answer: 2,
        explain: "Predicting a continuous number is called regression.",
      },
    ],
  },

  "deep-learning": {
    id: [
      {
        q: "Arsitektur yang paling cocok untuk tugas pengenalan gambar adalah…",
        options: ["CNN", "k-Means", "Decision Tree", "Regresi Linear"],
        answer: 0,
        explain: "CNN (Convolutional Neural Network) unggul untuk data gambar.",
      },
      {
        q: "Proses menyesuaikan bobot jaringan berdasarkan kesalahan disebut…",
        options: ["Clustering", "Backpropagation", "Tokenisasi", "Normalisasi saja"],
        answer: 1,
        explain: "Backpropagation menghitung gradien error untuk memperbarui bobot.",
      },
    ],
    en: [
      {
        q: "The architecture best suited for image recognition is…",
        options: ["CNN", "k-Means", "Decision Tree", "Linear Regression"],
        answer: 0,
        explain: "CNNs (Convolutional Neural Networks) excel at image data.",
      },
      {
        q: "Adjusting a network's weights based on its error is called…",
        options: ["Clustering", "Backpropagation", "Tokenization", "Just normalization"],
        answer: 1,
        explain: "Backpropagation computes error gradients to update the weights.",
      },
    ],
  },

  "reinforcement-learning": {
    id: [
      {
        q: "Dalam RL, umpan balik yang diterima agen dari lingkungan disebut…",
        options: ["Label", "Reward", "Token", "Cluster"],
        answer: 1,
        explain: "Agen belajar dengan memaksimalkan reward (hadiah) jangka panjang.",
      },
      {
        q: "Strategi agen dalam memilih aksi disebut…",
        options: ["State", "Policy", "Reward", "Dataset"],
        answer: 1,
        explain: "Policy adalah pemetaan dari state ke aksi.",
      },
    ],
    en: [
      {
        q: "In RL, the feedback an agent receives from the environment is called…",
        options: ["Label", "Reward", "Token", "Cluster"],
        answer: 1,
        explain: "The agent learns by maximizing long-term reward.",
      },
      {
        q: "The agent's strategy for choosing actions is called…",
        options: ["State", "Policy", "Reward", "Dataset"],
        answer: 1,
        explain: "A policy maps states to actions.",
      },
    ],
  },

  llm: {
    id: [
      {
        q: "Tugas dasar yang dipelajari sebagian besar LLM adalah…",
        options: [
          "Memprediksi token (kata) berikutnya",
          "Mengelompokkan gambar",
          "Menghitung jarak Euclidean",
          "Mengurutkan angka",
        ],
        answer: 0,
        explain: "LLM dilatih memprediksi token berikutnya; dari sini muncul kemampuan lain.",
      },
      {
        q: "Ketika LLM 'mengarang' fakta yang salah, fenomena ini disebut…",
        options: ["Overfitting", "Halusinasi", "Clustering", "Backpropagation"],
        answer: 1,
        explain: "Halusinasi adalah saat model menghasilkan informasi yang terdengar meyakinkan namun salah.",
      },
      {
        q: "Arsitektur yang mendasari LLM modern adalah…",
        options: ["Transformer", "k-Means", "CNN klasik", "Pohon keputusan"],
        answer: 0,
        explain: "Transformer dengan mekanisme attention adalah dasar LLM modern.",
      },
    ],
    en: [
      {
        q: "The basic task most LLMs learn is…",
        options: [
          "Predicting the next token (word)",
          "Clustering images",
          "Computing Euclidean distance",
          "Sorting numbers",
        ],
        answer: 0,
        explain: "LLMs are trained to predict the next token; other abilities emerge from this.",
      },
      {
        q: "When an LLM 'makes up' false facts, this phenomenon is called…",
        options: ["Overfitting", "Hallucination", "Clustering", "Backpropagation"],
        answer: 1,
        explain: "Hallucination is when the model produces convincing but incorrect information.",
      },
      {
        q: "The architecture underlying modern LLMs is the…",
        options: ["Transformer", "k-Means", "Classic CNN", "Decision tree"],
        answer: 0,
        explain: "The Transformer with its attention mechanism is the foundation of modern LLMs.",
      },
    ],
  },
};
