// Central registry of ALL interactive demos, each tagged with its parent topic.
// Metadata only (title/summary/icon/how/case). The actual React components are
// mapped in components/DemoView.jsx by slug. This keeps content editable in one
// place and lets us group demos per topic.

export const demoList = [
  // ---------------- Machine Learning ----------------
  {
    slug: "supervised-knn",
    topic: "machine-learning",
    icon: "🎯",
    id: {
      title: "Klasifikasi Supervised — k-NN",
      summary: "Klik kanvas untuk menambah titik berlabel dan lihat wilayah keputusan langsung.",
    },
    en: {
      title: "Supervised Classification — k-NN",
      summary: "Click the canvas to add labeled points and watch the decision regions.",
    },
  },
  {
    slug: "unsupervised-kmeans",
    topic: "machine-learning",
    icon: "🔗",
    id: {
      title: "Clustering Unsupervised — k-means",
      summary: "Kelompokkan data tanpa label dan lihat iterasi centroid langkah demi langkah.",
    },
    en: {
      title: "Unsupervised Clustering — k-means",
      summary: "Group unlabeled data and watch centroids iterate step by step.",
    },
  },
  {
    slug: "regression",
    topic: "machine-learning",
    icon: "📉",
    id: {
      title: "Regresi Linear & Logistik",
      summary: "Geser garis regresi hingga error mengecil, atau atur sigmoid untuk klasifikasi.",
    },
    en: {
      title: "Linear & Logistic Regression",
      summary: "Drag the line until error shrinks, or tune the sigmoid for classification.",
    },
  },
  {
    slug: "decision-tree",
    topic: "machine-learning",
    icon: "🌳",
    id: {
      title: "Decision Tree",
      summary: "Bangun batas keputusan bertingkat dengan serangkaian pertanyaan ya/tidak.",
    },
    en: {
      title: "Decision Tree",
      summary: "Build a stepwise decision boundary from a series of yes/no questions.",
    },
  },
  {
    slug: "naive-bayes",
    topic: "machine-learning",
    icon: "🎲",
    id: {
      title: "Naive Bayes",
      summary: "Klasifikasi berbasis probabilitas — lihat bagaimana teorema Bayes memutuskan kelas.",
    },
    en: {
      title: "Naive Bayes",
      summary: "Probability-based classification — see how Bayes' theorem decides the class.",
    },
  },

  // ---------------- Deep Learning (incl. Computer Vision) ----------------
  {
    slug: "neural-network",
    topic: "deep-learning",
    icon: "🧠",
    id: {
      title: "Jaringan Saraf (Neural Network)",
      summary: "Latih jaringan saraf kecil di browser dan amati batas keputusannya belajar.",
    },
    en: {
      title: "Neural Network",
      summary: "Train a tiny neural network in the browser and watch its boundary learn.",
    },
  },
  {
    slug: "cnn-filters",
    topic: "deep-learning",
    icon: "🔎",
    id: {
      title: "Computer Vision — Filter Konvolusi",
      summary: "Terapkan kernel konvolusi pada gambar dan lihat cara CNN mendeteksi fitur.",
    },
    en: {
      title: "Computer Vision — Convolution Filters",
      summary: "Apply convolution kernels to an image and see how a CNN detects features.",
    },
  },
  {
    slug: "edge-detection",
    topic: "deep-learning",
    icon: "🖼️",
    id: {
      title: "Computer Vision — Deteksi Tepi",
      summary: "Lihat bagaimana operator Sobel menemukan tepi objek — dasar pengenalan gambar.",
    },
    en: {
      title: "Computer Vision — Edge Detection",
      summary: "See how the Sobel operator finds object edges — a basis of image recognition.",
    },
  },
  {
    slug: "pixel-classifier",
    topic: "deep-learning",
    icon: "✏️",
    id: {
      title: "Computer Vision — Pengenal Digit",
      summary: "Gambar sebuah digit dan lihat bagaimana jaringan sederhana mengklasifikasikannya.",
    },
    en: {
      title: "Computer Vision — Digit Recognizer",
      summary: "Draw a digit and watch a simple network classify it.",
    },
  },
  {
    slug: "activation-functions",
    topic: "deep-learning",
    icon: "⚡",
    id: {
      title: "Fungsi Aktivasi",
      summary: "Bandingkan ReLU, sigmoid, dan tanh — mengapa non-linearitas penting.",
    },
    en: {
      title: "Activation Functions",
      summary: "Compare ReLU, sigmoid, and tanh — why non-linearity matters.",
    },
  },
  {
    slug: "webcam-vision",
    topic: "deep-learning",
    icon: "📷",
    id: {
      title: "Computer Vision Langsung — Kamera",
      summary: "Deteksi objek & ekspresi wajah secara real-time dari webcam, langsung di perangkatmu.",
    },
    en: {
      title: "Live Computer Vision — Camera",
      summary: "Real-time object & facial-expression detection from your webcam, right on your device.",
    },
  },

  // ---------------- Reinforcement Learning ----------------
  {
    slug: "rl-gridworld",
    topic: "reinforcement-learning",
    icon: "🎮",
    id: {
      title: "Grid-World (Q-learning)",
      summary: "Agen belajar mencapai reward dan menghindari jebakan lewat Q-learning.",
    },
    en: {
      title: "Grid-World (Q-learning)",
      summary: "An agent learns to reach rewards and avoid traps via Q-learning.",
    },
  },
  {
    slug: "multi-armed-bandit",
    topic: "reinforcement-learning",
    icon: "🎰",
    id: {
      title: "Multi-Armed Bandit",
      summary: "Dilema eksplorasi vs eksploitasi: mesin slot mana yang paling menguntungkan?",
    },
    en: {
      title: "Multi-Armed Bandit",
      summary: "The explore-vs-exploit dilemma: which slot machine pays best?",
    },
  },
  {
    slug: "rl-maze",
    topic: "reinforcement-learning",
    icon: "🌀",
    id: {
      title: "Labirin (Value Iteration)",
      summary: "Lihat nilai menyebar dari tujuan ke seluruh labirin membentuk kebijakan optimal.",
    },
    en: {
      title: "Maze (Value Iteration)",
      summary: "Watch values propagate from the goal across the maze into an optimal policy.",
    },
  },
  {
    slug: "cartpole",
    topic: "reinforcement-learning",
    icon: "🤸",
    id: {
      title: "Keseimbangan Tiang (CartPole)",
      summary: "Agen belajar menyeimbangkan tiang dengan menggeser kereta kiri/kanan.",
    },
    en: {
      title: "Pole Balancing (CartPole)",
      summary: "An agent learns to balance a pole by moving a cart left/right.",
    },
  },
  {
    slug: "explore-exploit",
    topic: "reinforcement-learning",
    icon: "⚖️",
    id: {
      title: "Eksplorasi vs Eksploitasi",
      summary: "Bandingkan strategi ε-greedy dengan nilai ε berbeda pada masalah yang sama.",
    },
    en: {
      title: "Exploration vs Exploitation",
      summary: "Compare ε-greedy strategies with different ε values on the same problem.",
    },
  },
  {
    slug: "dynamic-pricing",
    topic: "reinforcement-learning",
    icon: "🚕",
    id: {
      title: "Dynamic Pricing Ride-Hailing",
      summary: "Agen RL menyetel harga (surge) sesuai demand, lalu lintas & cuaca untuk memaksimalkan revenue.",
    },
    en: {
      title: "Ride-Hailing Dynamic Pricing",
      summary: "An RL agent tunes surge pricing by demand, traffic & weather to maximize revenue.",
    },
  },

  // ---------------- LLM & NLP ----------------
  {
    slug: "sentiment-naive-bayes",
    topic: "llm",
    icon: "😊",
    id: {
      title: "NLP Tradisional — Analisis Sentimen",
      summary: "Klasifikasi sentimen dengan bag-of-words & Naive Bayes — tanpa deep learning.",
    },
    en: {
      title: "Traditional NLP — Sentiment Analysis",
      summary: "Classify sentiment with bag-of-words & Naive Bayes — no deep learning.",
    },
  },
  {
    slug: "tfidf",
    topic: "llm",
    icon: "📊",
    id: {
      title: "NLP Tradisional — TF-IDF",
      summary: "Lihat kata mana yang paling 'penting' dalam sebuah dokumen dan mengapa.",
    },
    en: {
      title: "Traditional NLP — TF-IDF",
      summary: "See which words are most 'important' in a document, and why.",
    },
  },
  {
    slug: "tokenization",
    topic: "llm",
    icon: "🧩",
    id: {
      title: "Tokenisasi",
      summary: "Bagaimana teks dipecah menjadi token — unit dasar yang diproses LLM.",
    },
    en: {
      title: "Tokenization",
      summary: "How text is split into tokens — the basic units an LLM processes.",
    },
  },
  {
    slug: "word-embeddings",
    topic: "llm",
    icon: "🗺️",
    id: {
      title: "Word Embeddings",
      summary: "Kata sebagai vektor: kata bermakna serupa berdekatan dalam ruang makna.",
    },
    en: {
      title: "Word Embeddings",
      summary: "Words as vectors: similar meanings sit close together in meaning-space.",
    },
  },
  {
    slug: "attention",
    topic: "llm",
    icon: "🔦",
    id: {
      title: "BERT / Transformer — Attention",
      summary: "Visualisasikan mekanisme self-attention: kata mana 'memperhatikan' kata mana.",
    },
    en: {
      title: "BERT / Transformer — Attention",
      summary: "Visualize self-attention: which words 'attend' to which.",
    },
  },
];

// Grouped helper: { topicSlug: [demo, ...] }
export const demosByTopic = demoList.reduce((acc, d) => {
  (acc[d.topic] ||= []).push(d);
  return acc;
}, {});

export const getDemo = (slug) => demoList.find((d) => d.slug === slug);
export const allDemoSlugs = demoList.map((d) => d.slug);


// Per-demo "how it works" steps + real-world application, keyed by slug.
// Bilingual. Used by the demo detail page.
export const demoDetails = {
  "supervised-knn": {
    id: { how: ["k-NN menyimpan semua contoh berlabel.", "Titik baru diklasifikasi dari k tetangga terdekat.", "Kelas terbanyak menang.", "Ubah k: batas jadi lebih halus/tajam."], case: "Mengklasifikasi jenis bunga dari ukuran kelopak, atau menandai transaksi penipuan." },
    en: { how: ["k-NN stores all labeled examples.", "A new point is classified from its k nearest neighbors.", "The majority class wins.", "Change k: the boundary gets smoother/sharper."], case: "Classifying flower species from petal sizes, or flagging fraudulent transactions." },
  },
  "unsupervised-kmeans": {
    id: { how: ["Tempatkan k centroid acak.", "Tiap titik ikut centroid terdekat.", "Centroid pindah ke rata-rata anggotanya.", "Ulangi sampai konvergen."], case: "Segmentasi pelanggan berdasarkan perilaku belanja." },
    en: { how: ["Place k random centroids.", "Each point joins its nearest centroid.", "Centroids move to their members' average.", "Repeat until convergence."], case: "Customer segmentation based on shopping behavior." },
  },
  regression: {
    id: { how: ["Regresi linear mencari garis terbaik y=m·x+b.", "Kualitas diukur dengan MSE.", "Regresi logistik memakai sigmoid untuk probabilitas.", "Ambang 0,5 menentukan kelas."], case: "Prediksi harga rumah (linear) atau deteksi email spam (logistik)." },
    en: { how: ["Linear regression finds the best line y=m·x+b.", "Quality is measured by MSE.", "Logistic regression uses a sigmoid for probability.", "A 0.5 threshold sets the class."], case: "House price prediction (linear) or spam detection (logistic)." },
  },
  "decision-tree": {
    id: { how: ["Pilih fitur & ambang yang paling memisahkan kelas (Gini).", "Bagi data menjadi dua cabang.", "Ulangi pada tiap cabang.", "Berhenti pada kedalaman maksimum."], case: "Persetujuan kredit, diagnosis berbasis aturan yang mudah dijelaskan." },
    en: { how: ["Pick the feature & threshold that best split classes (Gini).", "Split data into two branches.", "Repeat on each branch.", "Stop at max depth."], case: "Credit approval, explainable rule-based diagnosis." },
  },
  "naive-bayes": {
    id: { how: ["Hitung P(kelas) dan P(fitur|kelas).", "Terapkan teorema Bayes.", "Asumsikan fitur saling independen.", "Pilih kelas dengan probabilitas tertinggi."], case: "Filter spam, klasifikasi teks, diagnosis cepat." },
    en: { how: ["Compute P(class) and P(feature|class).", "Apply Bayes' theorem.", "Assume features are independent.", "Pick the highest-probability class."], case: "Spam filtering, text classification, quick diagnosis." },
  },
  "neural-network": {
    id: { how: ["Input masuk ke lapisan tersembunyi.", "Neuron non-linear menangkap pola rumit.", "Backpropagation menyesuaikan bobot.", "Loss mengecil seiring latihan."], case: "Pengenalan gambar, suara, dan banyak tugas persepsi." },
    en: { how: ["Inputs feed hidden layers.", "Non-linear neurons capture complex patterns.", "Backpropagation adjusts weights.", "Loss shrinks as it trains."], case: "Image and speech recognition, and many perception tasks." },
  },
  "cnn-filters": {
    id: { how: ["Kernel kecil digeser ke seluruh gambar.", "Tiap posisi menghitung jumlah berbobot.", "Filter berbeda menonjolkan fitur berbeda.", "CNN menumpuk banyak filter."], case: "Deteksi objek, klasifikasi gambar medis." },
    en: { how: ["A small kernel slides across the image.", "Each position computes a weighted sum.", "Different filters emphasize different features.", "CNNs stack many filters."], case: "Object detection, medical image classification." },
  },
  "edge-detection": {
    id: { how: ["Operator Sobel menghitung gradien x & y.", "Besar gradien menandai perubahan tajam.", "Ambang menyaring tepi lemah.", "Tepi jadi fitur untuk tahap berikutnya."], case: "Pra-pemrosesan untuk pengenalan objek & OCR." },
    en: { how: ["The Sobel operator computes x & y gradients.", "Gradient magnitude marks sharp changes.", "A threshold filters weak edges.", "Edges become features for later stages."], case: "Preprocessing for object recognition & OCR." },
  },
  "pixel-classifier": {
    id: { how: ["Gambar dipetakan ke grid piksel.", "Pola dibandingkan dengan template terlatih.", "Kecocokan tertinggi jadi prediksi.", "Jaringan nyata belajar template ini dari data."], case: "Pengenalan tulisan tangan (MNIST), kode pos otomatis." },
    en: { how: ["The drawing maps to a pixel grid.", "The pattern is compared to trained templates.", "The best match becomes the prediction.", "Real networks learn these templates from data."], case: "Handwriting recognition (MNIST), automatic postal codes." },
  },
  "activation-functions": {
    id: { how: ["Tiap neuron menerapkan fungsi aktivasi.", "Non-linearitas memungkinkan pola kompleks.", "ReLU cepat & sederhana.", "Sigmoid/tanh membatasi rentang output."], case: "Komponen dasar di semua jaringan saraf modern." },
    en: { how: ["Each neuron applies an activation function.", "Non-linearity enables complex patterns.", "ReLU is fast & simple.", "Sigmoid/tanh bound the output range."], case: "A basic component in all modern neural networks." },
  },
  "webcam-vision": {
    id: { how: ["Kamera mengambil frame video secara langsung.", "Model deep learning (CNN) berjalan di browser — di perangkatmu.", "Mode objek: COCO-SSD menandai objek dengan kotak pembatas.", "Mode ekspresi: model wajah menaksir emosi (senang/sedih/netral/dll).", "Semua pemrosesan lokal — tidak ada video yang diunggah."], case: "Kamera keamanan pintar, filter kamera media sosial, analisis emosi UX, aksesibilitas." },
    en: { how: ["The camera captures live video frames.", "A deep learning model (CNN) runs in the browser — on your device.", "Object mode: COCO-SSD marks objects with bounding boxes.", "Expression mode: a face model estimates emotion (happy/sad/neutral/etc).", "All processing is local — no video is uploaded."], case: "Smart security cameras, social-media camera filters, UX emotion analysis, accessibility." },
  },
  "rl-gridworld": {
    id: { how: ["Agen menjelajah grid.", "Menerima reward +1 (tujuan) / −1 (jebakan).", "Q-learning memperbarui nilai (state, aksi).", "Panah menunjukkan kebijakan optimal."], case: "Navigasi robot, permainan, optimasi rute." },
    en: { how: ["The agent explores the grid.", "It gets +1 (goal) / −1 (trap) rewards.", "Q-learning updates (state, action) values.", "Arrows show the optimal policy."], case: "Robot navigation, games, route optimization." },
  },
  "multi-armed-bandit": {
    id: { how: ["Beberapa mesin punya peluang menang tersembunyi.", "Agen menaksir nilai tiap mesin.", "ε-greedy menyeimbangkan coba-baru vs pakai-terbaik.", "Estimasi menyatu ke mesin terbaik."], case: "Uji A/B, penempatan iklan, rekomendasi." },
    en: { how: ["Several machines have hidden win rates.", "The agent estimates each machine's value.", "ε-greedy balances try-new vs use-best.", "Estimates converge on the best machine."], case: "A/B testing, ad placement, recommendations." },
  },
  "rl-maze": {
    id: { how: ["Beri nilai 1 pada tujuan.", "Nilai menyebar mundur (γ).", "Tiap sel ambil nilai tetangga terbaik.", "Panah membentuk jalur optimal."], case: "Perencanaan jalur, GPS, logistik gudang." },
    en: { how: ["Give the goal a value of 1.", "Values propagate backward (γ).", "Each cell takes its best neighbor's value.", "Arrows form the optimal path."], case: "Path planning, GPS, warehouse logistics." },
  },
  cartpole: {
    id: { how: ["Fisika mensimulasikan kereta & tiang.", "Policy memilih dorongan kiri/kanan.", "Reward = lama bertahan.", "Bobot policy disesuaikan agar bertahan lebih lama."], case: "Kontrol robot, stabilisasi drone, otomasi industri." },
    en: { how: ["Physics simulates the cart & pole.", "A policy chooses left/right pushes.", "Reward = time balanced.", "Policy weights are tuned to balance longer."], case: "Robot control, drone stabilization, industrial automation." },
  },
  "explore-exploit": {
    id: { how: ["Tiga agen memakai ε berbeda.", "Semua memainkan bandit yang sama.", "ε kecil bisa terjebak; ε besar boros.", "ε sedang biasanya paling optimal."], case: "Menyetel strategi eksplorasi di sistem rekomendasi nyata." },
    en: { how: ["Three agents use different ε.", "All play the same bandit.", "Small ε can get stuck; large ε wastes.", "Medium ε is usually most optimal."], case: "Tuning exploration strategy in real recommender systems." },
  },
  "dynamic-pricing": {
    id: { how: ["State: demand, lalu lintas, cuaca (hujan).", "Aksi: memilih pengali harga (surge).", "Reward: revenue = harga × order yang diterima.", "Harga naik menaikkan margin tapi menurunkan order (elastisitas).", "Agen ε-greedy belajar surge optimal untuk tiap kondisi."], case: "Penetapan harga dinamis di layanan ride-hailing, tiket, & hotel." },
    en: { how: ["State: demand, traffic, weather (rain).", "Action: choose a surge multiplier.", "Reward: revenue = price × accepted orders.", "Higher price raises margin but lowers orders (elasticity).", "An ε-greedy agent learns the optimal surge per condition."], case: "Dynamic pricing in ride-hailing, ticketing, & hotels." },
  },
  "sentiment-naive-bayes": {
    id: { how: ["Teks dipecah jadi kata (bag-of-words).", "Tiap kata punya bobot positif/negatif.", "Naive Bayes menjumlah bukti.", "Kelas dengan probabilitas tertinggi menang."], case: "Analisis ulasan produk, pemantauan media sosial." },
    en: { how: ["Text is split into words (bag-of-words).", "Each word has a positive/negative weight.", "Naive Bayes sums the evidence.", "The highest-probability class wins."], case: "Product review analysis, social media monitoring." },
  },
  tfidf: {
    id: { how: ["TF = seberapa sering kata di satu dokumen.", "IDF = seberapa langka di seluruh koleksi.", "TF-IDF = TF × IDF.", "Skor tinggi = kata paling khas."], case: "Mesin pencari, ekstraksi kata kunci, pengelompokan dokumen." },
    en: { how: ["TF = how often a word is in one document.", "IDF = how rare it is across the collection.", "TF-IDF = TF × IDF.", "High score = most distinctive word."], case: "Search engines, keyword extraction, document clustering." },
  },
  tokenization: {
    id: { how: ["Teks dipecah jadi token (sering sub-kata).", "Kata umum = satu token.", "Kata langka dipecah, ditandai '##'.", "Tiap token dipetakan ke ID angka."], case: "Langkah pertama setiap LLM sebelum memproses teks." },
    en: { how: ["Text is split into tokens (often sub-words).", "Common words = one token.", "Rare words get split, marked '##'.", "Each token maps to a numeric ID."], case: "The first step of every LLM before processing text." },
  },
  "word-embeddings": {
    id: { how: ["Tiap kata jadi vektor angka.", "Kata bermakna serupa berdekatan.", "Jarak/arah menangkap hubungan makna.", "Model belajar vektor ini dari teks besar."], case: "Pencarian semantik, terjemahan, rekomendasi." },
    en: { how: ["Each word becomes a number vector.", "Similar meanings sit close together.", "Distance/direction captures relationships.", "Models learn these vectors from large text."], case: "Semantic search, translation, recommendations." },
  },
  attention: {
    id: { how: ["Tiap kata membuat query, key, value.", "Kecocokan query-key jadi bobot perhatian.", "Softmax menormalkan bobot.", "Output = jumlah value berbobot."], case: "Inti BERT & GPT — memahami konteks kalimat." },
    en: { how: ["Each word forms a query, key, value.", "Query-key match becomes attention weight.", "Softmax normalizes the weights.", "Output = weighted sum of values."], case: "The heart of BERT & GPT — understanding sentence context." },
  },
};
