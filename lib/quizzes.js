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
      {
        q: "Decision tree membuat keputusan dengan cara…",
        options: [
          "Serangkaian pertanyaan ya/tidak yang membagi data",
          "Menghitung rata-rata semua tetangga",
          "Mengalikan matriks besar",
          "Mengacak label secara acak",
        ],
        answer: 0,
        explain: "Decision tree memecah data lewat pertanyaan bertingkat pada fitur (mis. Gini).",
      },
      {
        q: "Risiko utama saat decision tree dibuat terlalu dalam adalah…",
        options: ["Underfitting", "Overfitting", "Konvergensi lambat", "Kehilangan data"],
        answer: 1,
        explain: "Pohon yang terlalu dalam menghafal data latih (overfitting) dan buruk pada data baru.",
      },
      {
        q: "Naive Bayes mengklasifikasi berdasarkan…",
        options: [
          "Probabilitas menggunakan teorema Bayes",
          "Jarak Euclidean ke centroid",
          "Backpropagation",
          "Reward dari lingkungan",
        ],
        answer: 0,
        explain: "Naive Bayes menghitung probabilitas tiap kelas dan memilih yang tertinggi.",
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
      {
        q: "A decision tree makes decisions by…",
        options: [
          "A series of yes/no questions that split the data",
          "Averaging all neighbors",
          "Multiplying large matrices",
          "Randomly shuffling labels",
        ],
        answer: 0,
        explain: "A decision tree splits data via stepwise questions on features (e.g. Gini).",
      },
      {
        q: "The main risk when a decision tree is grown too deep is…",
        options: ["Underfitting", "Overfitting", "Slow convergence", "Data loss"],
        answer: 1,
        explain: "A too-deep tree memorizes the training data (overfitting) and generalizes poorly.",
      },
      {
        q: "Naive Bayes classifies based on…",
        options: [
          "Probability using Bayes' theorem",
          "Euclidean distance to a centroid",
          "Backpropagation",
          "Rewards from an environment",
        ],
        answer: 0,
        explain: "Naive Bayes computes each class's probability and picks the highest.",
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
      {
        q: "Dalam CNN, 'kernel' atau filter berfungsi untuk…",
        options: [
          "Mendeteksi fitur (tepi, tekstur, pola) di gambar",
          "Mengurutkan piksel dari terang ke gelap",
          "Menghapus warna gambar",
          "Menyimpan gambar ke disk",
        ],
        answer: 0,
        explain: "Kernel digeser ke seluruh gambar (konvolusi) untuk menonjolkan fitur tertentu.",
      },
      {
        q: "Operator Sobel dalam computer vision digunakan untuk…",
        options: ["Deteksi tepi", "Clustering", "Tokenisasi", "Menaikkan resolusi"],
        answer: 0,
        explain: "Sobel menghitung gradien kecerahan untuk menemukan tepi objek.",
      },
      {
        q: "Mengapa fungsi aktivasi (seperti ReLU) penting dalam jaringan saraf?",
        options: [
          "Memberi non-linearitas agar pola kompleks bisa dipelajari",
          "Mempercepat koneksi internet",
          "Menghapus kebutuhan akan data",
          "Menggantikan peran GPU",
        ],
        answer: 0,
        explain: "Tanpa aktivasi non-linear, banyak lapisan runtuh menjadi satu lapisan linear.",
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
      {
        q: "In a CNN, a 'kernel' or filter is used to…",
        options: [
          "Detect features (edges, textures, patterns) in an image",
          "Sort pixels from light to dark",
          "Remove an image's colors",
          "Save the image to disk",
        ],
        answer: 0,
        explain: "A kernel slides across the image (convolution) to emphasize a particular feature.",
      },
      {
        q: "The Sobel operator in computer vision is used for…",
        options: ["Edge detection", "Clustering", "Tokenization", "Upscaling resolution"],
        answer: 0,
        explain: "Sobel computes brightness gradients to find object edges.",
      },
      {
        q: "Why are activation functions (like ReLU) important in a neural network?",
        options: [
          "They add non-linearity so complex patterns can be learned",
          "They speed up the internet connection",
          "They remove the need for data",
          "They replace the GPU",
        ],
        answer: 0,
        explain: "Without non-linear activation, many layers collapse into a single linear layer.",
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
      {
        q: "Dilema 'eksplorasi vs eksploitasi' berarti menyeimbangkan…",
        options: [
          "Mencoba aksi baru vs memakai aksi terbaik yang diketahui",
          "Data latih vs data uji",
          "CPU vs GPU",
          "Supervised vs unsupervised",
        ],
        answer: 0,
        explain: "Agen harus sesekali bereksplorasi agar tidak terjebak pada pilihan suboptimal.",
      },
      {
        q: "Parameter ε (epsilon) pada strategi ε-greedy mengatur…",
        options: [
          "Seberapa sering agen bereksplorasi secara acak",
          "Kecepatan belajar jaringan saraf",
          "Ukuran gambar input",
          "Jumlah token",
        ],
        answer: 0,
        explain: "ε besar = lebih banyak eksplorasi; ε kecil = lebih banyak eksploitasi.",
      },
      {
        q: "Pada value iteration di labirin, nilai tiap kotak menyebar…",
        options: [
          "Mundur dari kotak tujuan ke seluruh peta",
          "Dari kiri ke kanan saja",
          "Secara acak setiap langkah",
          "Hanya di sekitar agen",
        ],
        answer: 0,
        explain: "Nilai merambat mundur dari tujuan, membentuk kebijakan optimal dari mana pun.",
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
      {
        q: "The 'exploration vs exploitation' dilemma means balancing…",
        options: [
          "Trying new actions vs using the best known action",
          "Training data vs test data",
          "CPU vs GPU",
          "Supervised vs unsupervised",
        ],
        answer: 0,
        explain: "The agent must occasionally explore to avoid getting stuck on a suboptimal choice.",
      },
      {
        q: "In an ε-greedy strategy, the ε (epsilon) parameter controls…",
        options: [
          "How often the agent explores randomly",
          "The neural network's learning speed",
          "The input image size",
          "The number of tokens",
        ],
        answer: 0,
        explain: "Large ε = more exploration; small ε = more exploitation.",
      },
      {
        q: "In maze value iteration, each cell's value spreads…",
        options: [
          "Backward from the goal across the whole map",
          "From left to right only",
          "Randomly each step",
          "Only near the agent",
        ],
        answer: 0,
        explain: "Values propagate backward from the goal, forming an optimal policy from anywhere.",
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
      {
        q: "Analisis sentimen dengan bag-of-words + Naive Bayes adalah contoh…",
        options: [
          "NLP tradisional (tanpa deep learning)",
          "Reinforcement learning",
          "Computer vision",
          "Clustering gambar",
        ],
        answer: 0,
        explain: "Bag-of-words + Naive Bayes adalah pendekatan NLP klasik sebelum era deep learning.",
      },
      {
        q: "TF-IDF memberi skor tinggi pada kata yang…",
        options: [
          "Sering di satu dokumen tapi langka di seluruh koleksi",
          "Muncul di semua dokumen",
          "Paling pendek",
          "Berhuruf kapital",
        ],
        answer: 0,
        explain: "Kata khas (sering lokal, langka global) paling membedakan sebuah dokumen.",
      },
      {
        q: "Sebelum diproses LLM, teks terlebih dulu dipecah menjadi…",
        options: ["Token", "Piksel", "Cluster", "Reward"],
        answer: 0,
        explain: "Tokenisasi memecah teks menjadi token (sering sub-kata) yang dipetakan ke ID.",
      },
      {
        q: "Word embedding merepresentasikan kata sebagai…",
        options: [
          "Vektor angka, di mana makna serupa berdekatan",
          "Gambar berwarna",
          "Pohon keputusan",
          "Daftar aturan if-else",
        ],
        answer: 0,
        explain: "Embedding menempatkan kata bermakna serupa berdekatan dalam ruang vektor.",
      },
      {
        q: "Mekanisme self-attention pada Transformer memungkinkan tiap kata untuk…",
        options: [
          "'Memperhatikan' kata lain guna memahami konteks",
          "Menghitung tepi gambar",
          "Mengelompokkan pelanggan",
          "Menyeimbangkan tiang",
        ],
        answer: 0,
        explain: "Attention menimbang relevansi antar kata, inti pemahaman konteks BERT/GPT.",
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
      {
        q: "Sentiment analysis with bag-of-words + Naive Bayes is an example of…",
        options: [
          "Traditional NLP (no deep learning)",
          "Reinforcement learning",
          "Computer vision",
          "Image clustering",
        ],
        answer: 0,
        explain: "Bag-of-words + Naive Bayes is a classic NLP approach predating deep learning.",
      },
      {
        q: "TF-IDF gives a high score to a word that…",
        options: [
          "Is frequent in one document but rare across the collection",
          "Appears in every document",
          "Is the shortest",
          "Is capitalized",
        ],
        answer: 0,
        explain: "A distinctive word (locally frequent, globally rare) best differentiates a document.",
      },
      {
        q: "Before an LLM processes text, the text is first split into…",
        options: ["Tokens", "Pixels", "Clusters", "Rewards"],
        answer: 0,
        explain: "Tokenization splits text into tokens (often sub-words) mapped to IDs.",
      },
      {
        q: "A word embedding represents a word as…",
        options: [
          "A number vector, where similar meanings sit close together",
          "A colored image",
          "A decision tree",
          "A list of if-else rules",
        ],
        answer: 0,
        explain: "Embeddings place similarly-meaning words close together in vector space.",
      },
      {
        q: "The Transformer's self-attention mechanism lets each word…",
        options: [
          "'Attend' to other words to understand context",
          "Compute image edges",
          "Cluster customers",
          "Balance a pole",
        ],
        answer: 0,
        explain: "Attention weighs relevance between words — the core of BERT/GPT context understanding.",
      },
    ],
  },
};
