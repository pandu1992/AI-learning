// Bilingual (id/en) glossary of AI/ML/NLP terms used across the platform.
// Shape per entry:
//   { term, category, id: { def }, en: { def }, also?: ["related term", ...] }
// `category` groups terms on the /glossary page. Keep definitions to 1–2 lines.

export const glossaryCategories = {
  id: {
    fundamentals: "Dasar",
    supervised: "Supervised Learning",
    unsupervised: "Unsupervised Learning",
    evaluation: "Evaluasi Model",
    deeplearning: "Deep Learning",
    nlp: "NLP & LLM",
    rl: "Reinforcement Learning",
  },
  en: {
    fundamentals: "Fundamentals",
    supervised: "Supervised Learning",
    unsupervised: "Unsupervised Learning",
    evaluation: "Model Evaluation",
    deeplearning: "Deep Learning",
    nlp: "NLP & LLM",
    rl: "Reinforcement Learning",
  },
};

export const categoryOrder = [
  "fundamentals", "supervised", "unsupervised", "evaluation", "deeplearning", "nlp", "rl",
];

export const glossary = [
  // ---------------- Fundamentals ----------------
  {
    term: "Feature", category: "fundamentals", also: ["Label", "Dimension"],
    id: { def: "Variabel masukan (kolom) yang dipakai model untuk membuat prediksi." },
    en: { def: "An input variable (column) the model uses to make a prediction." },
  },
  {
    term: "Label", category: "fundamentals", also: ["Feature"],
    id: { def: "Jawaban/target yang ingin diprediksi (ada pada data supervised)." },
    en: { def: "The target/answer you want to predict (present in supervised data)." },
  },
  {
    term: "Overfitting", category: "fundamentals", also: ["Underfitting", "Regularization"],
    id: { def: "Model terlalu hafal data latih sehingga buruk di data baru." },
    en: { def: "A model memorizes the training data and performs poorly on new data." },
  },
  {
    term: "Underfitting", category: "fundamentals", also: ["Overfitting"],
    id: { def: "Model terlalu sederhana sehingga gagal menangkap pola bahkan di data latih." },
    en: { def: "A model too simple to capture the pattern, even on training data." },
  },
  {
    term: "Dimension", category: "fundamentals", also: ["Feature", "Dimensionality Reduction"],
    id: { def: "Jumlah fitur pada data; makin tinggi makin sulit divisualisasikan & dimodelkan." },
    en: { def: "The number of features in the data; higher is harder to visualize & model." },
  },
  {
    term: "Hyperparameter", category: "fundamentals",
    id: { def: "Pengaturan yang kita tentukan sebelum pelatihan (mis. k, learning rate), bukan dipelajari model." },
    en: { def: "A setting you choose before training (e.g. k, learning rate), not learned by the model." },
  },
  {
    term: "Train/Test Split", category: "fundamentals", also: ["Cross-Validation", "Data Leakage"],
    id: { def: "Membagi data: sebagian untuk melatih, sebagian untuk menguji di data yang belum pernah dilihat." },
    en: { def: "Splitting data: part to train, part to test on unseen examples." },
  },
  {
    term: "Data Leakage", category: "fundamentals", also: ["Train/Test Split"],
    id: { def: "Informasi dari data uji bocor ke pelatihan, membuat skor terlalu bagus & menipu." },
    en: { def: "Test information leaks into training, making scores unrealistically good." },
  },
  {
    term: "Feature Scaling", category: "fundamentals",
    id: { def: "Menyamakan skala fitur (standardisasi/normalisasi) agar algoritma berbasis jarak adil." },
    en: { def: "Putting features on a common scale (standardize/normalize) so distance-based algorithms are fair." },
  },
  {
    term: "Regularization", category: "fundamentals", also: ["Overfitting"],
    id: { def: "Menambah penalti pada model agar lebih sederhana & tidak overfit (mis. L1/L2)." },
    en: { def: "Adding a penalty to keep the model simpler and reduce overfitting (e.g. L1/L2)." },
  },

  // ---------------- Supervised ----------------
  {
    term: "Classification", category: "supervised", also: ["Regression"],
    id: { def: "Memprediksi kategori diskret (mis. spam / bukan spam)." },
    en: { def: "Predicting a discrete category (e.g. spam / not spam)." },
  },
  {
    term: "Regression", category: "supervised", also: ["Classification"],
    id: { def: "Memprediksi nilai kontinu (mis. harga rumah)." },
    en: { def: "Predicting a continuous value (e.g. house price)." },
  },
  {
    term: "Decision Boundary", category: "supervised",
    id: { def: "Garis/permukaan yang memisahkan kelas-kelas dalam ruang fitur." },
    en: { def: "The line/surface that separates classes in feature space." },
  },
  {
    term: "Ensemble", category: "supervised", also: ["Decision Boundary"],
    id: { def: "Menggabungkan banyak model (mis. Random Forest) agar lebih akurat & stabil." },
    en: { def: "Combining many models (e.g. Random Forest) for better accuracy & stability." },
  },

  // ---------------- Unsupervised ----------------
  {
    term: "Clustering", category: "unsupervised",
    id: { def: "Mengelompokkan data tanpa label berdasarkan kemiripan." },
    en: { def: "Grouping unlabeled data by similarity." },
  },
  {
    term: "Centroid", category: "unsupervised", also: ["Clustering"],
    id: { def: "Titik pusat sebuah cluster (rata-rata anggotanya) pada k-means." },
    en: { def: "A cluster's center point (mean of its members) in k-means." },
  },
  {
    term: "Dimensionality Reduction", category: "unsupervised", also: ["Dimension"],
    id: { def: "Memadatkan banyak fitur menjadi sedikit sambil menjaga informasi penting (mis. PCA)." },
    en: { def: "Compressing many features into fewer while keeping key information (e.g. PCA)." },
  },
  {
    term: "Explained Variance", category: "unsupervised", also: ["Dimensionality Reduction"],
    id: { def: "Seberapa banyak informasi (varians) yang dipertahankan tiap komponen PCA." },
    en: { def: "How much information (variance) each PCA component retains." },
  },

  // ---------------- Evaluation ----------------
  {
    term: "Accuracy", category: "evaluation", also: ["Precision", "Recall"],
    id: { def: "Proporsi prediksi benar; bisa menyesatkan pada data tidak seimbang." },
    en: { def: "Proportion of correct predictions; can mislead on imbalanced data." },
  },
  {
    term: "Precision", category: "evaluation", also: ["Recall", "F1 Score"],
    id: { def: "Dari yang diprediksi positif, berapa yang benar-benar positif." },
    en: { def: "Of those predicted positive, how many are truly positive." },
  },
  {
    term: "Recall", category: "evaluation", also: ["Precision", "F1 Score"],
    id: { def: "Dari semua positif sebenarnya, berapa yang berhasil ditemukan." },
    en: { def: "Of all true positives, how many were found." },
  },
  {
    term: "F1 Score", category: "evaluation", also: ["Precision", "Recall"],
    id: { def: "Rata-rata harmonik precision & recall; seimbang untuk kelas tak seimbang." },
    en: { def: "Harmonic mean of precision & recall; balanced for imbalanced classes." },
  },
  {
    term: "ROC-AUC", category: "evaluation", also: ["Accuracy"],
    id: { def: "Luas area di bawah kurva ROC; mengukur pemisahan kelas lintas ambang." },
    en: { def: "Area under the ROC curve; measures class separation across thresholds." },
  },
  {
    term: "Confusion Matrix", category: "evaluation", also: ["Precision", "Recall"],
    id: { def: "Tabel TP/FP/FN/TN yang merinci jenis kesalahan klasifikasi." },
    en: { def: "A TP/FP/FN/TN table detailing the kinds of classification errors." },
  },
  {
    term: "Cross-Validation", category: "evaluation", also: ["Train/Test Split"],
    id: { def: "Membagi data berulang (mis. k-fold) agar estimasi performa lebih andal." },
    en: { def: "Repeatedly splitting data (e.g. k-fold) for a more reliable performance estimate." },
  },

  // ---------------- Deep Learning ----------------
  {
    term: "Neuron", category: "deeplearning", also: ["Activation Function"],
    id: { def: "Unit dasar jaringan: menjumlahkan input berbobot lalu melewatkan fungsi aktivasi." },
    en: { def: "A network's basic unit: sums weighted inputs then passes an activation function." },
  },
  {
    term: "Activation Function", category: "deeplearning", also: ["Neuron"],
    id: { def: "Fungsi non-linear (mis. ReLU) yang memungkinkan jaringan belajar pola kompleks." },
    en: { def: "A non-linear function (e.g. ReLU) that lets a network learn complex patterns." },
  },
  {
    term: "Epoch", category: "deeplearning", also: ["Gradient Descent"],
    id: { def: "Satu putaran penuh seluruh data latih melewati model." },
    en: { def: "One full pass of all training data through the model." },
  },
  {
    term: "Gradient Descent", category: "deeplearning", also: ["Learning Rate", "Loss Function"],
    id: { def: "Algoritma optimasi yang menyesuaikan bobot untuk mengecilkan loss selangkah demi selangkah." },
    en: { def: "An optimization algorithm that nudges weights to reduce loss step by step." },
  },
  {
    term: "Learning Rate", category: "deeplearning", also: ["Gradient Descent"],
    id: { def: "Besar langkah tiap pembaruan bobot; terlalu besar meledak, terlalu kecil lambat." },
    en: { def: "The step size per weight update; too big explodes, too small is slow." },
  },
  {
    term: "Loss Function", category: "deeplearning", also: ["Gradient Descent"],
    id: { def: "Ukuran seberapa salah prediksi model; pelatihan berusaha meminimalkannya." },
    en: { def: "A measure of how wrong the model's predictions are; training minimizes it." },
  },
  {
    term: "Convolution", category: "deeplearning", also: ["Feature Map"],
    id: { def: "Operasi filter geser pada gambar untuk menangkap pola lokal (tepi, tekstur)." },
    en: { def: "A sliding-filter operation on images to capture local patterns (edges, textures)." },
  },
  {
    term: "Feature Map", category: "deeplearning", also: ["Convolution"],
    id: { def: "Keluaran filter konvolusi yang menyorot fitur tertentu dalam gambar." },
    en: { def: "A convolution filter's output highlighting a particular feature in the image." },
  },
  {
    term: "Transfer Learning", category: "deeplearning",
    id: { def: "Memakai model terlatih besar lalu menyesuaikannya (fine-tune) ke tugas baru dengan sedikit data." },
    en: { def: "Reusing a large pre-trained model and fine-tuning it to a new task with little data." },
  },
  {
    term: "Dropout", category: "deeplearning", also: ["Regularization", "Overfitting"],
    id: { def: "Teknik regularisasi: menonaktifkan sebagian neuron secara acak saat latih agar tak overfit." },
    en: { def: "A regularization trick: randomly disabling neurons during training to curb overfitting." },
  },

  // ---------------- NLP & LLM ----------------
  {
    term: "Token", category: "nlp", also: ["Tokenization", "Embedding"],
    id: { def: "Potongan teks terkecil yang diproses model (bisa kata atau subkata)." },
    en: { def: "The smallest text chunk a model processes (a word or subword)." },
  },
  {
    term: "Tokenization", category: "nlp", also: ["Token"],
    id: { def: "Proses memecah teks menjadi token sebelum diumpankan ke model." },
    en: { def: "The process of splitting text into tokens before feeding a model." },
  },
  {
    term: "Embedding", category: "nlp", also: ["Token", "Cosine Similarity"],
    id: { def: "Representasi vektor numerik yang menangkap makna kata/teks." },
    en: { def: "A numeric vector representation that captures a word's/text's meaning." },
  },
  {
    term: "Cosine Similarity", category: "nlp", also: ["Embedding"],
    id: { def: "Ukuran kemiripan arah dua vektor (0–1); dipakai membandingkan embedding." },
    en: { def: "A measure of two vectors' directional similarity (0–1); used to compare embeddings." },
  },
  {
    term: "Attention", category: "nlp", also: ["Transformer"],
    id: { def: "Mekanisme yang membobot token mana yang paling relevan satu sama lain." },
    en: { def: "A mechanism that weights which tokens are most relevant to each other." },
  },
  {
    term: "Transformer", category: "nlp", also: ["Attention", "LLM"],
    id: { def: "Arsitektur berbasis attention yang menjadi fondasi LLM modern." },
    en: { def: "An attention-based architecture that underpins modern LLMs." },
  },
  {
    term: "LLM", category: "nlp", also: ["Transformer", "Hallucination"],
    id: { def: "Large Language Model: model besar yang memprediksi token berikutnya untuk menghasilkan teks." },
    en: { def: "Large Language Model: a big model that predicts the next token to generate text." },
  },
  {
    term: "Hallucination", category: "nlp", also: ["LLM", "RAG"],
    id: { def: "Saat LLM menghasilkan informasi yang terdengar meyakinkan tetapi salah/mengada-ada." },
    en: { def: "When an LLM produces confident-sounding but false/fabricated information." },
  },
  {
    term: "RAG", category: "nlp", also: ["Hallucination", "Embedding"],
    id: { def: "Retrieval-Augmented Generation: mengambil dokumen relevan dulu agar jawaban LLM berdasar sumber." },
    en: { def: "Retrieval-Augmented Generation: fetch relevant documents first so the LLM's answer is grounded." },
  },
  {
    term: "Temperature", category: "nlp", also: ["LLM"],
    id: { def: "Parameter yang mengatur keacakan keluaran LLM; tinggi lebih kreatif, rendah lebih konsisten." },
    en: { def: "A parameter controlling LLM output randomness; higher is more creative, lower more consistent." },
  },
  {
    term: "Fine-tuning", category: "nlp", also: ["Transfer Learning"],
    id: { def: "Melatih lanjut model pra-latih pada data tugas spesifik." },
    en: { def: "Further-training a pre-trained model on task-specific data." },
  },

  // ---------------- Reinforcement Learning ----------------
  {
    term: "Agent", category: "rl", also: ["Environment", "Policy"],
    id: { def: "Entitas pembelajar yang mengambil aksi untuk memaksimalkan reward." },
    en: { def: "The learner that takes actions to maximize reward." },
  },
  {
    term: "Environment", category: "rl", also: ["Agent", "State"],
    id: { def: "Dunia tempat agen beraksi dan menerima state & reward." },
    en: { def: "The world the agent acts in and receives states & rewards from." },
  },
  {
    term: "Reward", category: "rl", also: ["Policy"],
    id: { def: "Sinyal umpan balik numerik; agen belajar memaksimalkan total reward." },
    en: { def: "A numeric feedback signal; the agent learns to maximize total reward." },
  },
  {
    term: "Policy", category: "rl", also: ["Agent", "Reward"],
    id: { def: "Strategi agen: pemetaan dari state ke aksi." },
    en: { def: "The agent's strategy: a mapping from states to actions." },
  },
  {
    term: "Exploration vs Exploitation", category: "rl", also: ["Policy"],
    id: { def: "Dilema antara mencoba hal baru (eksplorasi) vs memakai yang sudah diketahui terbaik (eksploitasi)." },
    en: { def: "The trade-off between trying new things (exploration) vs using the known best (exploitation)." },
  },
  {
    term: "Q-value", category: "rl", also: ["Policy", "Reward"],
    id: { def: "Perkiraan total reward masa depan dari mengambil suatu aksi pada suatu state." },
    en: { def: "An estimate of total future reward from taking an action in a given state." },
  },
];

// Lookup a single glossary entry by its term (case-insensitive exact match).
export function getGlossaryTerm(term) {
  const q = (term || "").trim().toLowerCase();
  return glossary.find((e) => e.term.toLowerCase() === q) || null;
}

// Terms sorted longest-first, for greedy auto-matching in AutoGlossary.
export const glossaryTermsByLength = glossary
  .map((e) => e.term)
  .sort((a, b) => b.length - a.length);

// Simple search helper (used by the glossary page).
export function searchGlossary(query, lang) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return glossary;
  return glossary.filter((e) =>
    e.term.toLowerCase().includes(q) ||
    (e[lang]?.def || "").toLowerCase().includes(q) ||
    (e.also || []).some((a) => a.toLowerCase().includes(q))
  );
}
