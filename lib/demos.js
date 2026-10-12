// Central registry of ALL interactive demos, each tagged with its parent topic.
// Metadata only (title/summary/icon/how/case). The actual React components are
// mapped in components/DemoView.jsx by slug. This keeps content editable in one
// place and lets us group demos per topic.

export const demoList = [
  // ---------------- AI Overview ----------------
  {
    slug: "dimensions",
    topic: "ai-overview",
    icon: "🧊",
    id: {
      title: "Dimensi Data: 1D → 4D & Linear vs Non-linear",
      summary: "Putar kubus 3D, lihat fitur sebagai dimensi, dan pahami kaitannya ke reduksi dimensi.",
    },
    en: {
      title: "Data Dimensions: 1D → 4D & Linear vs Non-linear",
      summary: "Rotate a 3D cube, see features as dimensions, and connect it to dimensionality reduction.",
    },
  },

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
    slug: "gradient-descent",
    topic: "machine-learning",
    icon: "📉",
    id: {
      title: "Gradient Descent — Cara Model Belajar",
      summary: "Atur learning rate dan lihat bola menuruni 'lembah loss': konvergen, osilasi, atau divergen.",
    },
    en: {
      title: "Gradient Descent — How Models Learn",
      summary: "Tune the learning rate and watch the ball roll down the 'loss valley': converge, oscillate, or diverge.",
    },
  },
  {
    slug: "roc-threshold",
    topic: "machine-learning",
    icon: "🧮",
    id: {
      title: "Confusion Matrix, ROC & Threshold",
      summary: "Geser ambang keputusan: lihat confusion matrix, precision/recall, dan titik kerja di kurva ROC (+ AUC) bergerak.",
    },
    en: {
      title: "Confusion Matrix, ROC & Threshold",
      summary: "Drag the decision threshold: watch the confusion matrix, precision/recall, and the ROC operating point (+ AUC) move.",
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
    slug: "random-forest",
    topic: "machine-learning",
    icon: "🌲",
    id: {
      title: "Random Forest — Kebijaksanaan Orang Banyak",
      summary: "Banyak pohon lemah yang voting menghasilkan batas keputusan yang lebih halus & akurat. Atur jumlah pohon.",
    },
    en: {
      title: "Random Forest — Wisdom of Crowds",
      summary: "Many weak trees voting produce a smoother, more accurate decision boundary. Tune the number of trees.",
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
    slug: "latent-space",
    topic: "deep-learning",
    icon: "🎨",
    id: {
      title: "Penjelajah Ruang Laten (Generatif)",
      summary: "Geser vektor laten z → wajah berubah mulus. Intuisi di balik VAE/GAN & pembuat gambar AI.",
    },
    en: {
      title: "Latent Space Explorer (Generative)",
      summary: "Drag the latent vector z → the face morphs smoothly. The intuition behind VAEs/GANs & image generators.",
    },
  },
  {
    slug: "speech-spectrogram",
    topic: "deep-learning",
    icon: "🎤",
    id: {
      title: "Suara → Spektrogram & Transkrip",
      summary: "Ucapkan sesuatu: lihat gelombang, spektrogram real-time, dan transkrip ucapan — langsung di perangkatmu.",
    },
    en: {
      title: "Speech → Spectrogram & Transcript",
      summary: "Speak and watch the waveform, a real-time spectrogram, and a live transcript — right on your device.",
    },
  },
  {
    slug: "cnn-filter-image",
    topic: "deep-learning",
    icon: "🖼️",
    id: {
      title: "Filter CNN pada Gambarmu",
      summary: "Unggah gambar & terapkan kernel konvolusi (tepi, sharpen, blur, Sobel) — lihat yang 'dilihat' lapisan CNN.",
    },
    en: {
      title: "CNN Filter on Your Image",
      summary: "Upload an image & apply a convolution kernel (edges, sharpen, blur, Sobel) — see what a CNN layer 'sees'.",
    },
  },
  {
    slug: "webcam-vision",
    topic: "deep-learning",
    icon: "📷",
    id: {
      title: "Computer Vision Langsung — Kamera",
      summary: "Deteksi objek, ekspresi, kerangka wajah, tangan (hitung jari + gestur 👍✌️✊) & pose tubuh (hitung repetisi squat/angkat tangan) real-time, di perangkatmu.",
    },
    en: {
      title: "Live Computer Vision — Camera",
      summary: "Real-time object, expression, face mesh, hand (finger count + gestures 👍✌️✊) & body pose (squat/hands-up rep counter) detection from your webcam, on your device.",
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
    slug: "qlearning-train",
    topic: "reinforcement-learning",
    icon: "📈",
    id: {
      title: "Q-learning — Latih dari Nol",
      summary: "Latih agen RL per episode & lihat grafik reward NAIK saat ia belajar jalur optimal. Atur eksplorasi (ε).",
    },
    en: {
      title: "Q-learning — Train from Scratch",
      summary: "Train an RL agent per episode & watch the reward chart RISE as it learns the optimal path. Tune exploration (ε).",
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
  {
    slug: "next-token",
    topic: "llm",
    icon: "🔮",
    id: {
      title: "Prediksi Kata Berikutnya (seperti GPT)",
      summary: "Ketik teks, lihat distribusi probabilitas kata berikutnya, dan atur temperature — inti cara kerja LLM.",
    },
    en: {
      title: "Next-Word Prediction (like GPT)",
      summary: "Type text, see the next-word probability distribution, and tune temperature — the core of how LLMs work.",
    },
  },
  {
    slug: "ner",
    topic: "llm",
    icon: "🏷️",
    id: {
      title: "NER — Pengenalan Entitas Bernama",
      summary: "Tandai nama orang, lokasi, organisasi, tanggal, dan uang dalam teks — tugas inti NLP.",
    },
    en: {
      title: "NER — Named Entity Recognition",
      summary: "Tag people, locations, organizations, dates, and money in text — a core NLP task.",
    },
  },
  {
    slug: "rag-chatbot",
    topic: "llm",
    icon: "🔎",
    id: {
      title: "Chatbot RAG — Jawab dari Dokumen",
      summary: "Tempel dokumen, ajukan pertanyaan: sistem mengambil potongan relevan lalu menjawab berdasarkan itu (anti-halusinasi).",
    },
    en: {
      title: "RAG Chatbot — Answer from Documents",
      summary: "Paste documents, ask a question: it retrieves relevant chunks then answers from them (anti-hallucination).",
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
  dimensions: {
    id: { how: ["Tiap dimensi (sumbu) = satu fitur data: 1D=(x), 2D=(x,y), 3D=(x,y,z).", "Dimensi ke-4 tak bisa 'dilihat' langsung — dipetakan ke warna titik.", "Data linear bisa dipisah garis/bidang lurus; non-linear butuh batas melengkung.", "Data nyata sering berdimensi tinggi (ratusan fitur) → sulit divisualkan.", "Reduksi dimensi (PCA) memproyeksikan ke 2D/3D sambil menjaga struktur penting."], case: "Memvisualkan embedding kata/gambar, memilih fitur, dan mempercepat model dengan PCA/t-SNE." },
    en: { how: ["Each dimension (axis) = one data feature: 1D=(x), 2D=(x,y), 3D=(x,y,z).", "The 4th dimension can't be 'seen' directly — it's mapped to point color.", "Linear data splits with a straight line/plane; non-linear needs a curved boundary.", "Real data is often high-dimensional (hundreds of features) → hard to visualize.", "Dimensionality reduction (PCA) projects to 2D/3D while keeping key structure."], case: "Visualizing word/image embeddings, feature selection, and speeding models up with PCA/t-SNE." },
  },
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
    id: { how: ["Kamera mengambil frame video secara langsung.", "Model deep learning (CNN) berjalan di browser — di perangkatmu.", "Mode objek: COCO-SSD menandai objek dengan kotak pembatas.", "Mode ekspresi: model wajah menaksir emosi (senang/sedih/netral/dll).", "Mode kerangka wajah: MediaPipe FaceMesh menggambar 468 titik landmark wajah.", "Mode kerangka tangan: 21 titik/tangan + hitung jari + kenali gestur (👍👎✌️✊✋☝️🤟).", "Mode pose tubuh: 33 titik + penghitung repetisi otomatis (squat / angkat tangan).", "Semua pemrosesan lokal — tidak ada video yang diunggah."], case: "Kamera keamanan pintar, filter kamera media sosial (AR), bahasa isyarat & gestur, pelatih olahraga/fitness, aksesibilitas." },
    en: { how: ["The camera captures live video frames.", "A deep learning model (CNN) runs in the browser — on your device.", "Object mode: COCO-SSD marks objects with bounding boxes.", "Expression mode: a face model estimates emotion (happy/sad/neutral/etc).", "Face skeleton mode: MediaPipe FaceMesh draws 468 face landmark points.", "Hand mode: 21 points/hand + finger count + gesture recognition (👍👎✌️✊✋☝️🤟).", "Body pose mode: 33 points + automatic rep counter (squat / hands-up).", "All processing is local — no video is uploaded."], case: "Smart security cameras, social-media AR filters, sign language & gestures, sports/fitness coaching, accessibility." },
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
  "next-token": {
    id: { how: ["Model belajar peluang kata berikutnya dari korpus (trigram → bigram).", "Konteks terakhir menentukan distribusi kata berikutnya.", "Temperature menata ulang distribusi: rendah = fokus, tinggi = kreatif.", "Model menghasilkan teks satu token setiap langkah (autoregresif)."], case: "Inti LLM seperti GPT: autocomplete, chatbot, penulisan & ringkasan teks." },
    en: { how: ["The model learns next-word probabilities from a corpus (trigram → bigram).", "The recent context sets the next-word distribution.", "Temperature reshapes it: low = focused, high = creative.", "It generates text one token per step (autoregressive)."], case: "The core of LLMs like GPT: autocomplete, chatbots, text writing & summarization." },
  },
  ner: {
    id: { how: ["Teks dipecah menjadi token (kata).", "Tiap token dicocokkan dengan kamus (gazetteer) & pola (tanggal/uang/angka).", "Huruf kapital di tengah kalimat jadi petunjuk nama orang.", "Tiap entitas diberi label jenisnya: Orang/Lokasi/Organisasi/Tanggal/Uang."], case: "Ekstraksi informasi, pencarian, chatbot, analisis dokumen hukum/medis." },
    en: { how: ["Text is split into tokens (words).", "Each token is matched against a dictionary (gazetteer) & patterns (date/money/number).", "Mid-sentence capitalization hints at a person's name.", "Each entity is labeled by type: Person/Location/Organization/Date/Money."], case: "Information extraction, search, chatbots, legal/medical document analysis." },
  },
  "latent-space": {
    id: { how: ["Model generatif punya 'decoder': vektor laten z → output.", "Tiap dimensi z mengendalikan satu faktor visual.", "Titik laten berdekatan → output mirip (ruang laten mulus).", "Mengambil sampel z acak = menghasilkan output baru."], case: "VAE/GAN, pembuat gambar AI, interpolasi/morphing, augmentasi data." },
    en: { how: ["A generative model has a 'decoder': latent vector z → output.", "Each z dimension controls one visual factor.", "Nearby latent points → similar outputs (a smooth latent space).", "Sampling a random z = generating a new output."], case: "VAEs/GANs, AI image generators, interpolation/morphing, data augmentation." },
  },
  "speech-spectrogram": {
    id: { how: ["Mikrofon menangkap gelombang suara (amplitudo vs waktu).", "FFT mengubahnya jadi spektrogram: frekuensi × waktu × kekuatan.", "Model memperlakukan spektrogram seperti gambar (CNN/Transformer).", "Web Speech API mengubah ucapan jadi teks (speech-to-text)."], case: "Asisten suara, transkripsi otomatis, deteksi suara, aksesibilitas." },
    en: { how: ["The mic captures sound waves (amplitude vs time).", "An FFT turns them into a spectrogram: frequency × time × strength.", "Models treat the spectrogram like an image (CNN/Transformer).", "The Web Speech API turns speech into text (speech-to-text)."], case: "Voice assistants, automatic transcription, sound detection, accessibility." },
  },
  "gradient-descent": {
    id: { how: ["Model mencari parameter yang meminimalkan 'loss' (kesalahan).", "Gradien = arah kemiringan loss; descent = melangkah menurun.", "Aturan: x ← x − α·gradien, dengan α = learning rate.", "α terlalu besar → osilasi/divergen; terlalu kecil → lambat."], case: "Melatih hampir semua model ML & jaringan saraf (backpropagation)." },
    en: { how: ["A model seeks parameters that minimize the 'loss' (error).", "The gradient = slope of the loss; descent = stepping downhill.", "Rule: x ← x − α·gradient, where α = learning rate.", "α too large → oscillate/diverge; too small → slow."], case: "Training almost every ML model & neural network (backpropagation)." },
  },
  "roc-threshold": {
    id: { how: ["Pengklasifikasi memberi skor 0–1 per contoh.", "Ambang memisahkan prediksi positif/negatif → confusion matrix.", "Naikkan ambang: precision naik, recall turun (dan sebaliknya).", "ROC & AUC merangkum performa di semua ambang (1,0 = sempurna, 0,5 = acak)."], case: "Memilih ambang untuk deteksi penipuan, diagnosis, filter spam." },
    en: { how: ["A classifier gives each example a 0–1 score.", "The threshold splits positive/negative predictions → confusion matrix.", "Raise the threshold: precision up, recall down (and vice versa).", "ROC & AUC summarize performance across all thresholds (1.0 = perfect, 0.5 = random)."], case: "Choosing a threshold for fraud detection, diagnosis, spam filtering." },
  },
  "random-forest": {
    id: { how: ["Tiap pohon dilatih pada sampel acak data (bootstrap) + fitur acak.", "Satu pohon dangkal = lemah, batasnya kasar/overfit.", "Banyak pohon lalu VOTING → kesalahan acak saling meniadakan.", "Hasilnya batas lebih halus & akurat (teknik ensemble/bagging)."], case: "Prediksi tabular, skoring risiko, sistem rekomendasi, kompetisi data." },
    en: { how: ["Each tree trains on a random data sample (bootstrap) + random features.", "A single shallow tree is weak, with a jagged/overfit boundary.", "Many trees then VOTE → their random errors cancel out.", "Result: a smoother, more accurate boundary (ensemble/bagging)."], case: "Tabular prediction, risk scoring, recommendations, data competitions." },
  },
  "rag-chatbot": {
    id: { how: ["Dokumen dipecah menjadi potongan (chunk).", "Tiap potongan & pertanyaan diubah jadi vektor (TF-IDF).", "Ambil potongan paling mirip dengan pertanyaan (cosine similarity).", "Jawaban disusun DARI potongan itu — bukan dikarang."], case: "Chatbot dokumen, asisten pengetahuan, pencarian semantik, dukungan pelanggan." },
    en: { how: ["Documents are split into chunks.", "Each chunk & the question become vectors (TF-IDF).", "Retrieve the chunks most similar to the question (cosine similarity).", "The answer is composed FROM those chunks — not made up."], case: "Document chatbots, knowledge assistants, semantic search, customer support." },
  },
  "cnn-filter-image": {
    id: { how: ["Kernel 3×3 digeser ke seluruh gambar (konvolusi).", "Tiap posisi = jumlah berbobot piksel di sekitarnya.", "Kernel berbeda menonjolkan fitur berbeda (tepi, blur, dsb).", "CNN BELAJAR nilai kernelnya sendiri dari data latih."], case: "Deteksi tepi, pra-pemrosesan citra, dan dasar semua CNN visi." },
    en: { how: ["A 3×3 kernel slides across the image (convolution).", "Each position = a weighted sum of nearby pixels.", "Different kernels emphasize different features (edges, blur, etc).", "A CNN LEARNS its own kernel values from training data."], case: "Edge detection, image preprocessing, and the basis of all vision CNNs." },
  },
  "qlearning-train": {
    id: { how: ["Agen menjelajah grid lewat coba-coba (ε-greedy).", "Tiap langkah memperbarui Q(state,aksi) = reward + γ·nilai terbaik berikutnya.", "Nilai menyebar mundur dari tujuan ke seluruh grid.", "Reward per episode naik hingga agen menemukan jalur optimal."], case: "Robotika, game, navigasi, penjadwalan — belajar dari pengalaman." },
    en: { how: ["The agent explores the grid by trial and error (ε-greedy).", "Each step updates Q(state,action) = reward + γ·best next value.", "Value propagates backward from the goal across the grid.", "Reward per episode rises until the agent finds the optimal path."], case: "Robotics, games, navigation, scheduling — learning from experience." },
  },
};
