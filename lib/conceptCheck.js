// One quick "concept check" question per demo, keyed by slug. Bilingual (id/en).
// Tests conceptual understanding (the WHY), distinct from CodePractice (the API).
// Shape per language:
//   { q: "question", options: ["a","b","c"], answer: <index>, explain: "why" }
// Keep it to a single, high-value question. The correct option index is `answer`.

export const conceptCheck = {
  // ==================== AI OVERVIEW ====================
  dimensions: {
    id: { q: "Apa yang dimaksud 'curse of dimensionality'?", options: ["Data jadi lebih mudah dipisahkan saat dimensi naik", "Jarak antar titik jadi kurang bermakna saat dimensi sangat tinggi", "Model selalu lebih akurat dengan lebih banyak fitur"], answer: 1, explain: "Pada dimensi sangat tinggi, titik-titik cenderung berjarak mirip sehingga jarak kehilangan makna — inilah curse of dimensionality." },
    en: { q: "What is the 'curse of dimensionality'?", options: ["Data becomes easier to separate as dimensions grow", "Distances between points become less meaningful at very high dimensions", "Models are always more accurate with more features"], answer: 1, explain: "At very high dimensions points tend to be nearly equidistant, so distance loses meaning — that's the curse of dimensionality." },
  },

  // ==================== MACHINE LEARNING ====================
  "supervised-knn": {
    id: { q: "Mengapa fitur harus di-scale sebelum k-NN?", options: ["Agar pelatihan lebih cepat", "Karena k-NN berbasis jarak, fitur berskala besar akan mendominasi", "Agar k bisa bernilai genap"], answer: 1, explain: "k-NN memakai jarak; tanpa scaling, fitur dengan rentang nilai besar mendominasi perhitungan jarak." },
    en: { q: "Why scale features before k-NN?", options: ["To make training faster", "Because k-NN is distance-based, large-scale features would dominate", "So k can be even"], answer: 1, explain: "k-NN uses distance; without scaling, features with large ranges dominate the distance computation." },
  },
  "unsupervised-kmeans": {
    id: { q: "Apa fungsi metode elbow pada k-means?", options: ["Membantu memilih jumlah cluster k", "Mempercepat konvergensi", "Men-scale fitur otomatis"], answer: 0, explain: "Elbow memplot inertia terhadap k; 'siku' menandakan k yang wajar." },
    en: { q: "What is the elbow method used for in k-means?", options: ["Choosing the number of clusters k", "Speeding up convergence", "Auto-scaling features"], answer: 0, explain: "The elbow plots inertia vs k; the 'elbow' suggests a reasonable k." },
  },
  regression: {
    id: { q: "Kapan memakai logistic regression, bukan linear regression?", options: ["Saat target berupa nilai kontinu", "Saat target berupa kelas/kategori", "Saat tidak ada fitur numerik"], answer: 1, explain: "Logistic regression mengeluarkan probabilitas 0–1 untuk klasifikasi; linear untuk nilai kontinu." },
    en: { q: "When use logistic regression instead of linear regression?", options: ["When the target is a continuous value", "When the target is a class/category", "When there are no numeric features"], answer: 1, explain: "Logistic regression outputs 0–1 probabilities for classification; linear is for continuous values." },
  },
  "gradient-descent": {
    id: { q: "Apa akibat learning rate yang terlalu besar?", options: ["Konvergensi sangat lambat", "Loss bisa berosilasi atau meledak", "Model selalu underfit"], answer: 1, explain: "Langkah terlalu besar bisa melompati minimum sehingga loss berosilasi/divergen." },
    en: { q: "What happens if the learning rate is too high?", options: ["Convergence is very slow", "The loss can oscillate or explode", "The model always underfits"], answer: 1, explain: "Too-large steps overshoot the minimum, so the loss oscillates/diverges." },
  },
  "roc-threshold": {
    id: { q: "Apa arti menggeser ambang keputusan ke bawah?", options: ["Lebih banyak prediksi positif (recall naik, precision bisa turun)", "Model jadi lebih akurat otomatis", "ROC-AUC berubah"], answer: 0, explain: "Ambang lebih rendah menandai lebih banyak kasus positif → recall naik, precision cenderung turun. AUC tak berubah." },
    en: { q: "What does lowering the decision threshold do?", options: ["More positive predictions (recall up, precision may drop)", "Automatically makes the model more accurate", "Changes the ROC-AUC"], answer: 0, explain: "A lower threshold flags more positives → recall rises, precision tends to fall. AUC is unchanged." },
  },
  "decision-tree": {
    id: { q: "Mengapa decision tree rawan overfitting?", options: ["Karena memakai jarak Euclidean", "Karena bisa tumbuh dalam & menghafal data latih", "Karena butuh scaling fitur"], answer: 1, explain: "Pohon yang dibiarkan dalam akan membuat daun untuk hampir tiap sampel — menghafal, bukan menggeneralisasi." },
    en: { q: "Why are decision trees prone to overfitting?", options: ["They use Euclidean distance", "They can grow deep and memorize the training data", "They need feature scaling"], answer: 1, explain: "An unbounded deep tree makes a leaf for nearly every sample — memorizing instead of generalizing." },
  },
  "random-forest": {
    id: { q: "Mengapa Random Forest biasanya lebih stabil dari satu decision tree?", options: ["Karena memakai satu pohon yang sangat dalam", "Karena merata-ratakan banyak pohon yang beragam", "Karena tidak memakai bootstrap"], answer: 1, explain: "Menggabungkan banyak pohon pada subset data/fitur mengurangi variansi → prediksi lebih stabil." },
    en: { q: "Why is a Random Forest usually more stable than a single tree?", options: ["It uses one very deep tree", "It averages many diverse trees", "It avoids bootstrapping"], answer: 1, explain: "Aggregating many trees on data/feature subsets reduces variance → more stable predictions." },
  },
  "naive-bayes": {
    id: { q: "Asumsi 'naive' pada Naive Bayes adalah…", options: ["Semua fitur saling independen jika kelas diketahui", "Semua fitur harus numerik", "Data harus seimbang"], answer: 0, explain: "Naive Bayes mengasumsikan fitur independen secara kondisional terhadap kelas — sering tak benar, tapi tetap berguna." },
    en: { q: "The 'naive' assumption in Naive Bayes is…", options: ["All features are independent given the class", "All features must be numeric", "The data must be balanced"], answer: 0, explain: "Naive Bayes assumes features are conditionally independent given the class — often false yet still useful." },
  },
  svm: {
    id: { q: "Apa yang dimaksud 'margin' pada SVM?", options: ["Jumlah support vector", "Jarak antara batas keputusan dan titik terdekat tiap kelas", "Learning rate"], answer: 1, explain: "SVM memaksimalkan margin — jarak dari hyperplane ke titik terdekat (support vectors)." },
    en: { q: "What is the 'margin' in an SVM?", options: ["The number of support vectors", "The distance between the boundary and the nearest point of each class", "The learning rate"], answer: 1, explain: "SVM maximizes the margin — the distance from the hyperplane to the nearest points (support vectors)." },
  },
  pca: {
    id: { q: "Apa yang dimaksimalkan oleh komponen utama pertama PCA?", options: ["Keterpisahan antar kelas", "Varians data yang dijelaskan", "Jumlah fitur"], answer: 1, explain: "Komponen pertama adalah arah dengan varians terbesar; PCA bersifat unsupervised (tanpa label)." },
    en: { q: "What does PCA's first principal component maximize?", options: ["Between-class separation", "The variance of the data captured", "The number of features"], answer: 1, explain: "The first component is the direction of greatest variance; PCA is unsupervised (no labels)." },
  },
  tsne: {
    id: { q: "Apa yang TIDAK boleh ditafsirkan dari plot t-SNE?", options: ["Adanya cluster lokal", "Ukuran & jarak antar cluster sebagai makna global", "Titik yang berdekatan cenderung mirip"], answer: 1, explain: "t-SNE hanya menjaga struktur lokal; ukuran cluster & jarak antar cluster tidak bermakna global." },
    en: { q: "What should you NOT read from a t-SNE plot?", options: ["The presence of local clusters", "Cluster sizes & inter-cluster distances as global meaning", "Nearby points being similar"], answer: 1, explain: "t-SNE preserves only local structure; cluster sizes & inter-cluster distances aren't globally meaningful." },
  },
  lda: {
    id: { q: "Beda utama LDA dibanding PCA?", options: ["LDA memakai label kelas, PCA tidak", "LDA selalu lebih cepat", "PCA hanya untuk teks"], answer: 0, explain: "LDA (supervised) memaksimalkan keterpisahan kelas memakai label; PCA (unsupervised) memaksimalkan varians." },
    en: { q: "Key difference of LDA vs PCA?", options: ["LDA uses class labels, PCA does not", "LDA is always faster", "PCA is only for text"], answer: 0, explain: "LDA (supervised) maximizes class separability using labels; PCA (unsupervised) maximizes variance." },
  },
  dbscan: {
    id: { q: "Keunggulan DBSCAN dibanding k-means?", options: ["Selalu lebih cepat", "Menemukan cluster bentuk tak beraturan & menandai outlier", "Tidak perlu data"], answer: 1, explain: "DBSCAN berbasis kepadatan: menangkap bentuk tak beraturan dan menandai titik jarang sebagai noise." },
    en: { q: "An advantage of DBSCAN over k-means?", options: ["It's always faster", "It finds irregular shapes & flags outliers", "It needs no data"], answer: 1, explain: "DBSCAN is density-based: it captures irregular shapes and marks sparse points as noise." },
  },
};

// ==================== DEEP LEARNING / COMPUTER VISION ====================
Object.assign(conceptCheck, {
  "neural-network": {
    id: { q: "Tanpa fungsi aktivasi non-linear, jaringan banyak lapis setara dengan…", options: ["Satu model linear", "Decision tree", "k-means"], answer: 0, explain: "Komposisi fungsi linear tetap linear; non-linearitas-lah yang memberi kekuatan jaringan dalam." },
    en: { q: "Without non-linear activations, a deep network is equivalent to…", options: ["A single linear model", "A decision tree", "k-means"], answer: 0, explain: "A composition of linear functions is still linear; non-linearity is what gives deep nets their power." },
  },
  "cnn-filters": {
    id: { q: "Apa keunggulan utama CNN untuk gambar?", options: ["Tidak butuh data", "Berbagi bobot & menangkap pola spasial lokal", "Selalu lebih kecil dari MLP"], answer: 1, explain: "Filter konvolusi berbagi bobot dan menangkap pola lokal (tepi/tekstur) secara efisien." },
    en: { q: "A key advantage of CNNs for images?", options: ["They need no data", "Weight sharing & capturing local spatial patterns", "They're always smaller than an MLP"], answer: 1, explain: "Convolution filters share weights and capture local patterns (edges/textures) efficiently." },
  },
  "edge-detection": {
    id: { q: "Mengapa gambar biasanya di-blur sebelum deteksi tepi?", options: ["Agar warna lebih cerah", "Mengurangi noise agar tepi tak palsu", "Menambah resolusi"], answer: 1, explain: "Blur (mis. Gaussian) meredam noise sehingga operator tepi tidak menandai noise sebagai tepi." },
    en: { q: "Why blur an image before edge detection?", options: ["To brighten colors", "To reduce noise so edges aren't spurious", "To add resolution"], answer: 1, explain: "Blurring (e.g. Gaussian) suppresses noise so edge operators don't flag noise as edges." },
  },
  "pixel-classifier": {
    id: { q: "Metrik yang lebih tepat untuk segmentasi dibanding akurasi piksel?", options: ["IoU / Dice", "Learning rate", "Jumlah epoch"], answer: 0, explain: "IoU/Dice mengukur tumpang-tindih prediksi vs ground truth, lebih adil saat kelas tak seimbang." },
    en: { q: "A better metric for segmentation than pixel accuracy?", options: ["IoU / Dice", "Learning rate", "Number of epochs"], answer: 0, explain: "IoU/Dice measures overlap of prediction vs ground truth, fairer under class imbalance." },
  },
  "activation-functions": {
    id: { q: "Mengapa ReLU lebih disukai daripada sigmoid di lapisan tersembunyi?", options: ["Lebih lambat tapi akurat", "Mengurangi masalah vanishing gradient", "Selalu menghasilkan probabilitas"], answer: 1, explain: "ReLU tidak menjenuh untuk nilai positif, sehingga gradien tak cepat menghilang seperti sigmoid." },
    en: { q: "Why prefer ReLU over sigmoid in hidden layers?", options: ["Slower but accurate", "It reduces vanishing gradients", "It always outputs probabilities"], answer: 1, explain: "ReLU doesn't saturate for positive values, so gradients don't vanish as with sigmoid." },
  },
  "latent-space": {
    id: { q: "Apa fungsi 'bottleneck' pada autoencoder?", options: ["Memperbesar data", "Memaksa representasi ringkas (kompresi)", "Menambah label"], answer: 1, explain: "Lapisan bottleneck sempit memaksa model menyimpan informasi penting secara padat." },
    en: { q: "What is the autoencoder 'bottleneck' for?", options: ["Enlarging the data", "Forcing a compact representation (compression)", "Adding labels"], answer: 1, explain: "A narrow bottleneck forces the model to store key information compactly." },
  },
  "speech-spectrogram": {
    id: { q: "Apa yang ditampilkan spektrogram?", options: ["Intensitas frekuensi sepanjang waktu", "Teks transkripsi", "Label kelas"], answer: 0, explain: "Spektrogram memetakan energi tiap frekuensi terhadap waktu — representasi umum untuk audio." },
    en: { q: "What does a spectrogram show?", options: ["Frequency intensity over time", "The transcription text", "A class label"], answer: 0, explain: "A spectrogram maps the energy of each frequency against time — a common audio representation." },
  },
  "cnn-filter-image": {
    id: { q: "Apa yang biasanya ditangkap filter lapisan AWAL CNN?", options: ["Objek utuh", "Tepi & tekstur sederhana", "Nama kelas"], answer: 1, explain: "Lapisan awal menangkap fitur rendah (tepi/tekstur); objek kompleks muncul di lapisan lebih dalam." },
    en: { q: "What do EARLY CNN layer filters usually capture?", options: ["Whole objects", "Simple edges & textures", "Class names"], answer: 1, explain: "Early layers capture low-level features (edges/textures); complex objects emerge deeper." },
  },
  "webcam-vision": {
    id: { q: "Pertimbangan penting untuk inferensi real-time di browser?", options: ["Model harus sangat besar", "Model ringan agar frame tak tersendat", "Harus offline total"], answer: 1, explain: "Real-time butuh model ringan/terkuantisasi agar laju frame tetap lancar di perangkat pengguna." },
    en: { q: "An important concern for real-time in-browser inference?", options: ["The model must be very large", "A light model so frames don't stutter", "It must be fully offline"], answer: 1, explain: "Real-time needs a light/quantized model so the frame rate stays smooth on the user's device." },
  },
});

// ==================== REINFORCEMENT LEARNING ====================
Object.assign(conceptCheck, {
  "rl-gridworld": {
    id: { q: "Apa peran discount factor γ?", options: ["Mengatur kecepatan render", "Menyeimbangkan reward sekarang vs masa depan", "Menentukan jumlah state"], answer: 1, explain: "γ mendekati 1 menghargai reward jangka panjang; γ kecil fokus ke reward segera." },
    en: { q: "What is the discount factor γ's role?", options: ["Sets render speed", "Balances immediate vs future reward", "Sets the number of states"], answer: 1, explain: "γ near 1 values long-term reward; a small γ focuses on immediate reward." },
  },
  "qlearning-train": {
    id: { q: "Mengapa ε (epsilon) di-decay seiring pelatihan?", options: ["Agar agen beralih dari eksplorasi ke eksploitasi", "Agar reward selalu naik", "Agar tabel Q mengecil"], answer: 0, explain: "Di awal perlu banyak eksplorasi; setelah belajar, ε mengecil agar agen memanfaatkan pengetahuannya." },
    en: { q: "Why decay ε (epsilon) during training?", options: ["To shift the agent from exploration to exploitation", "To make reward always rise", "To shrink the Q-table"], answer: 0, explain: "Early on you need lots of exploration; once learned, ε shrinks so the agent exploits what it knows." },
  },
  "multi-armed-bandit": {
    id: { q: "Masalah bandit berbeda dari RL penuh karena…", options: ["Tidak ada state yang berubah antar keputusan", "Selalu deterministik", "Tak punya reward"], answer: 0, explain: "Bandit adalah RL satu-state: tiap keputusan tidak mengubah state untuk keputusan berikutnya." },
    en: { q: "A bandit problem differs from full RL because…", options: ["There's no changing state between decisions", "It's always deterministic", "It has no reward"], answer: 0, explain: "A bandit is single-state RL: each decision doesn't change the state for the next one." },
  },
  "rl-maze": {
    id: { q: "Mengapa reward yang sangat jarang menyulitkan pembelajaran?", options: ["Membuat agen lebih cepat belajar", "Agen jarang mendapat sinyal untuk memperbaiki kebijakan", "Memaksa γ = 0"], answer: 1, explain: "Reward jarang (hanya di tujuan) memberi sedikit umpan balik; reward shaping dapat membantu." },
    en: { q: "Why do very sparse rewards make learning hard?", options: ["They speed up learning", "The agent rarely gets a signal to improve its policy", "They force γ = 0"], answer: 1, explain: "Sparse rewards (only at the goal) give little feedback; reward shaping can help." },
  },
  cartpole: {
    id: { q: "Mengapa performa RL dievaluasi rata-rata banyak episode?", options: ["Karena satu episode saja sudah pasti", "Karena reward RL berisik & bervariasi", "Karena mempercepat pelatihan"], answer: 1, explain: "Hasil RL stokastik; merata-ratakan banyak episode memberi estimasi yang lebih andal." },
    en: { q: "Why evaluate RL over many episodes' average?", options: ["Because a single episode is certain", "Because RL reward is noisy & varies", "Because it speeds up training"], answer: 1, explain: "RL outcomes are stochastic; averaging many episodes gives a more reliable estimate." },
  },
  "explore-exploit": {
    id: { q: "Apa risiko hanya eksploitasi sejak awal?", options: ["Terjebak pada pilihan suboptimal", "Reward selalu maksimal", "Tidak ada risiko"], answer: 0, explain: "Tanpa eksplorasi, agen mungkin tak pernah menemukan opsi yang sebenarnya lebih baik." },
    en: { q: "Risk of pure exploitation from the start?", options: ["Getting stuck on a suboptimal choice", "Reward is always maximal", "No risk"], answer: 0, explain: "Without exploration, the agent may never discover a genuinely better option." },
  },
  "dynamic-pricing": {
    id: { q: "Mengapa guardrail harga penting saat agen bereksperimen?", options: ["Agar harga bisa tak terbatas", "Mencegah harga ekstrem yang merugikan selama eksplorasi", "Agar reward nol"], answer: 1, explain: "Batas min/maks mencegah agen mencoba harga ekstrem yang berdampak buruk di dunia nyata." },
    en: { q: "Why are price guardrails important when the agent experiments?", options: ["So prices can be unbounded", "To prevent harmful extreme prices during exploration", "To make reward zero"], answer: 1, explain: "Min/max bounds stop the agent from trying extreme prices that harm the real business." },
  },
});

// ==================== NLP / LLM ====================
Object.assign(conceptCheck, {
  "sentiment-naive-bayes": {
    id: { q: "Mengapa n-gram membantu analisis sentimen?", options: ["Mempercepat pelatihan", "Menangkap frasa seperti 'tidak bagus'", "Menghapus stopword"], answer: 1, explain: "Satu kata tak menangkap negasi; bigram seperti 'tidak bagus' memperbaiki pemahaman sentimen." },
    en: { q: "Why do n-grams help sentiment analysis?", options: ["They speed up training", "They capture phrases like 'not good'", "They remove stopwords"], answer: 1, explain: "Single words miss negation; a bigram like 'not good' improves sentiment understanding." },
  },
  tfidf: {
    id: { q: "Apa yang dilakukan bagian IDF pada TF-IDF?", options: ["Menaikkan bobot kata yang jarang & informatif", "Menghapus semua angka", "Men-scale fitur numerik"], answer: 0, explain: "IDF menurunkan bobot kata umum dan menaikkan kata langka yang lebih membedakan dokumen." },
    en: { q: "What does the IDF part of TF-IDF do?", options: ["Up-weights rare, informative words", "Removes all numbers", "Scales numeric features"], answer: 0, explain: "IDF down-weights common words and up-weights rare words that better distinguish documents." },
  },
  tokenization: {
    id: { q: "Pada tokenisasi subword (BPE), satu kata panjang bisa menjadi…", options: ["Selalu satu token", "Beberapa token", "Nol token"], answer: 1, explain: "BPE memecah kata langka/panjang menjadi beberapa subkata, jadi 1 kata ≠ selalu 1 token." },
    en: { q: "With subword (BPE) tokenization, one long word can become…", options: ["Always one token", "Several tokens", "Zero tokens"], answer: 1, explain: "BPE splits rare/long words into several subwords, so 1 word ≠ always 1 token." },
  },
  "word-embeddings": {
    id: { q: "Keterbatasan embedding statis seperti word2vec?", options: ["Tak bisa dihitung", "Satu vektor per kata, tak peka konteks", "Hanya untuk angka"], answer: 1, explain: "Embedding statis memberi satu vektor per kata, jadi 'bank' sungai = 'bank' uang." },
    en: { q: "A limitation of static embeddings like word2vec?", options: ["They can't be computed", "One vector per word, context-insensitive", "Numbers only"], answer: 1, explain: "Static embeddings give one vector per word, so river 'bank' = money 'bank'." },
  },
  attention: {
    id: { q: "Apa inti yang dihitung mekanisme attention?", options: ["Seberapa relevan tiap token terhadap token lain", "Jumlah parameter", "Learning rate"], answer: 0, explain: "Attention menghitung bobot relevansi antar token agar model fokus ke bagian penting." },
    en: { q: "What does attention essentially compute?", options: ["How relevant each token is to others", "The parameter count", "The learning rate"], answer: 0, explain: "Attention computes relevance weights between tokens so the model focuses on important parts." },
  },
  "next-token": {
    id: { q: "Apa yang sebenarnya dilakukan LLM saat 'menjawab'?", options: ["Mencari jawaban di database", "Memprediksi token berikut yang paling mungkin", "Menjalankan kode"], answer: 1, explain: "LLM memprediksi token demi token; karena itu ia bisa 'berhalusinasi' dan perlu diverifikasi." },
    en: { q: "What is an LLM actually doing when it 'answers'?", options: ["Looking up an answer in a database", "Predicting the most likely next token", "Running code"], answer: 1, explain: "An LLM predicts token by token; that's why it can 'hallucinate' and needs verification." },
  },
  ner: {
    id: { q: "Metrik yang tepat untuk mengevaluasi NER?", options: ["F1 level entitas (span)", "RMSE", "Silhouette"], answer: 0, explain: "NER dinilai dengan F1 pada span entitas (bukan sekadar akurasi per token)." },
    en: { q: "The right metric to evaluate NER?", options: ["Entity-level (span) F1", "RMSE", "Silhouette"], answer: 0, explain: "NER is scored with F1 over entity spans (not mere per-token accuracy)." },
  },
  "rag-chatbot": {
    id: { q: "Mengapa RAG mengurangi halusinasi?", options: ["Membuat model lebih besar", "Menyertakan dokumen relevan sebagai dasar jawaban", "Menaikkan temperature"], answer: 1, explain: "RAG mengambil dokumen nyata lalu menjadikannya konteks, sehingga jawaban berdasar sumber." },
    en: { q: "Why does RAG reduce hallucination?", options: ["It makes the model bigger", "It grounds the answer in retrieved relevant documents", "It raises temperature"], answer: 1, explain: "RAG retrieves real documents and uses them as context, so answers are grounded in sources." },
  },
  "agentic-ai": {
    id: { q: "Apa yang membedakan AI 'agentik'?", options: ["Hanya menjawab satu prompt", "Merencanakan & memakai alat lewat beberapa langkah", "Tidak memakai LLM"], answer: 1, explain: "Agen AI merencanakan, memanggil alat, dan beraksi berurutan untuk mencapai tujuan." },
    en: { q: "What characterizes 'agentic' AI?", options: ["It only answers a single prompt", "It plans & uses tools over multiple steps", "It uses no LLM"], answer: 1, explain: "An AI agent plans, calls tools, and acts in sequence to reach a goal." },
  },
  "transfer-ner": {
    id: { q: "Mengapa fine-tuning memakai learning rate kecil?", options: ["Agar pelatihan lebih lama", "Agar tak merusak pengetahuan model pra-latih", "Agar tokenizer berubah"], answer: 1, explain: "lr kecil menjaga bobot pra-latih yang berharga sambil menyesuaikan ke tugas baru." },
    en: { q: "Why fine-tune with a small learning rate?", options: ["To make training longer", "To avoid wrecking the pre-trained knowledge", "To change the tokenizer"], answer: 1, explain: "A small lr preserves valuable pre-trained weights while adapting to the new task." },
  },
  "text-cnn": {
    id: { q: "Apa yang ditangkap filter CNN pada teks?", options: ["Pola n-gram lokal", "Seluruh dokumen sekaligus", "Label kelas langsung"], answer: 0, explain: "Filter berukuran k menangkap pola n-gram (frasa pendek); beberapa ukuran kernel menangkap panjang berbeda." },
    en: { q: "What do CNN filters capture in text?", options: ["Local n-gram patterns", "The whole document at once", "The class label directly"], answer: 0, explain: "A size-k filter captures n-gram patterns (short phrases); multiple kernel sizes capture different lengths." },
  },
  "rnn-text": {
    id: { q: "Mengapa LSTM/GRU dipakai daripada vanilla RNN?", options: ["Lebih sederhana", "Mengatasi vanishing gradient pada urutan panjang", "Tak butuh urutan"], answer: 1, explain: "Gerbang pada LSTM/GRU menjaga informasi jangka panjang, mengatasi vanishing gradient." },
    en: { q: "Why use LSTM/GRU over a vanilla RNN?", options: ["They're simpler", "They handle vanishing gradients on long sequences", "They need no order"], answer: 1, explain: "LSTM/GRU gates preserve long-range information, mitigating vanishing gradients." },
  },
  "active-learning": {
    id: { q: "Ide inti active learning?", options: ["Melabeli semua data sekaligus", "Memilih sampel paling informatif untuk dilabeli", "Menghapus data"], answer: 1, explain: "Active learning memilih contoh yang paling tidak pasti/bermanfaat agar pelabelan efisien." },
    en: { q: "The core idea of active learning?", options: ["Label all data at once", "Pick the most informative samples to label", "Delete data"], answer: 1, explain: "Active learning selects the most uncertain/useful examples so labeling is efficient." },
  },
  "nlu-nlg": {
    id: { q: "Beda NLU dan NLG?", options: ["NLU memahami input, NLG menghasilkan output bahasa", "Keduanya sama", "NLG hanya untuk angka"], answer: 0, explain: "NLU = Natural Language Understanding (memahami); NLG = Generation (menghasilkan teks)." },
    en: { q: "Difference between NLU and NLG?", options: ["NLU understands input, NLG generates language output", "They're the same", "NLG is only for numbers"], answer: 0, explain: "NLU = Natural Language Understanding (comprehend); NLG = Generation (produce text)." },
  },
});

export const getConceptCheck = (slug) => conceptCheck[slug] || null;
