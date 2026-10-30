// Practical tips for each demo, keyed by slug. Bilingual (id/en).
// Answers the two questions students most often get wrong: *when* to use an
// algorithm (and when NOT to), and the *common mistakes* people make with it.
// Shape per language:
//   {
//     useWhen:   ["short phrase", ...],   // good fits
//     avoidWhen: ["short phrase", ...],   // poor fits / better alternatives
//     mistakes:  [{ bad: "the trap", fix: "how to avoid it" }, ...],
//   }
// Keep each phrase short (one line). This is a quick reference, not a textbook.

export const practicalTips = {
  // ==================== AI OVERVIEW ====================
  dimensions: {
    id: {
      useWhen: ["Mau memahami kenapa data berdimensi tinggi sulit divisualisasikan", "Belajar dasar sebelum masuk ke reduksi dimensi"],
      avoidWhen: ["Butuh algoritma prediksi — ini konsep, bukan model"],
      mistakes: [
        { bad: "Mengira lebih banyak fitur selalu lebih baik.", fix: "Fitur berlebih memicu curse of dimensionality: jarak jadi tak bermakna. Pilih fitur yang relevan." },
        { bad: "Menganggap semua hubungan data itu linear.", fix: "Banyak pola bersifat non-linear; cek dengan plot sebelum memilih model linear." },
      ],
    },
    en: {
      useWhen: ["Understanding why high-dimensional data is hard to visualize", "Building intuition before dimensionality reduction"],
      avoidWhen: ["You need a predictive algorithm — this is a concept, not a model"],
      mistakes: [
        { bad: "Assuming more features is always better.", fix: "Too many features trigger the curse of dimensionality: distances lose meaning. Keep relevant features." },
        { bad: "Assuming all relationships are linear.", fix: "Many patterns are non-linear; plot the data before picking a linear model." },
      ],
    },
  },

  // ==================== MACHINE LEARNING ====================
  "supervised-knn": {
    id: {
      useWhen: ["Dataset kecil–menengah dengan batas keputusan tidak linear", "Butuh baseline cepat tanpa pelatihan"],
      avoidWhen: ["Dataset sangat besar (prediksi lambat)", "Fitur berdimensi sangat tinggi"],
      mistakes: [
        { bad: "Lupa men-scale fitur sebelum menghitung jarak.", fix: "k-NN berbasis jarak — selalu StandardScaler/MinMaxScaler dulu, kalau tidak fitur berskala besar mendominasi." },
        { bad: "Memakai k genap pada klasifikasi 2 kelas.", fix: "Pakai k ganjil agar tidak terjadi seri suara." },
        { bad: "Memilih k sembarangan.", fix: "Tuning k lewat cross-validation; k terlalu kecil = overfit, terlalu besar = underfit." },
      ],
    },
    en: {
      useWhen: ["Small–medium datasets with non-linear boundaries", "Need a quick baseline with no training"],
      avoidWhen: ["Very large datasets (slow prediction)", "Very high-dimensional features"],
      mistakes: [
        { bad: "Forgetting to scale features before measuring distance.", fix: "k-NN is distance-based — always StandardScaler/MinMaxScaler first, or large-scale features dominate." },
        { bad: "Using an even k for 2-class classification.", fix: "Use an odd k to avoid tie votes." },
        { bad: "Picking k arbitrarily.", fix: "Tune k with cross-validation; too small = overfit, too large = underfit." },
      ],
    },
  },

  "unsupervised-kmeans": {
    id: {
      useWhen: ["Cluster berbentuk bulat & ukuran mirip", "Butuh pengelompokan cepat & skalabel"],
      avoidWhen: ["Cluster bentuk tidak beraturan / kepadatan berbeda (pakai DBSCAN)", "Banyak outlier"],
      mistakes: [
        { bad: "Menebak jumlah k tanpa dasar.", fix: "Gunakan metode elbow atau silhouette untuk memilih k." },
        { bad: "Tidak men-scale fitur.", fix: "k-means memakai jarak Euclidean; skala fitur harus disamakan dulu." },
        { bad: "Menjalankan sekali saja lalu percaya hasilnya.", fix: "Inisialisasi acak bisa jebakan lokal; pakai n_init>1 (k-means++)." },
      ],
    },
    en: {
      useWhen: ["Roughly spherical, similarly-sized clusters", "Need fast, scalable grouping"],
      avoidWhen: ["Irregular shapes / varying density (use DBSCAN)", "Many outliers"],
      mistakes: [
        { bad: "Guessing k with no basis.", fix: "Use the elbow method or silhouette score to choose k." },
        { bad: "Not scaling features.", fix: "k-means uses Euclidean distance; standardize features first." },
        { bad: "Running once and trusting the result.", fix: "Random init can hit local optima; use n_init>1 (k-means++)." },
      ],
    },
  },

  regression: {
    id: {
      useWhen: ["Hubungan fitur–target mendekati linear", "Butuh model yang mudah diinterpretasi"],
      avoidWhen: ["Pola sangat non-linear tanpa rekayasa fitur", "Banyak fitur saling berkorelasi tinggi"],
      mistakes: [
        { bad: "Memakai linear regression untuk masalah klasifikasi.", fix: "Untuk kelas, pakai logistic regression (keluaran probabilitas 0–1)." },
        { bad: "Mengabaikan multikolinearitas.", fix: "Fitur yang saling berkorelasi membuat koefisien tidak stabil; pakai regularisasi (Ridge/Lasso)." },
        { bad: "Menilai model hanya dari R² pada data latih.", fix: "Selalu evaluasi di data uji; R² latih bisa menipu." },
      ],
    },
    en: {
      useWhen: ["Feature–target relationship is near-linear", "You need an interpretable model"],
      avoidWhen: ["Strongly non-linear patterns with no feature engineering", "Many highly correlated features"],
      mistakes: [
        { bad: "Using linear regression for classification.", fix: "For classes, use logistic regression (outputs 0–1 probabilities)." },
        { bad: "Ignoring multicollinearity.", fix: "Correlated features make coefficients unstable; use regularization (Ridge/Lasso)." },
        { bad: "Judging the model by training-set R² only.", fix: "Always evaluate on held-out data; training R² can mislead." },
      ],
    },
  },

  "gradient-descent": {
    id: {
      useWhen: ["Melatih model dengan fungsi loss yang bisa diturunkan", "Dataset terlalu besar untuk solusi analitik"],
      avoidWhen: ["Ada solusi bentuk tertutup yang murah (mis. regresi linear kecil)"],
      mistakes: [
        { bad: "Learning rate terlalu besar.", fix: "Loss meledak/berosilasi; turunkan lr atau pakai scheduler." },
        { bad: "Learning rate terlalu kecil.", fix: "Konvergen sangat lambat; naikkan bertahap atau pakai Adam." },
        { bad: "Lupa men-scale fitur.", fix: "Skala fitur berbeda membuat permukaan loss memanjang & konvergensi lambat." },
      ],
    },
    en: {
      useWhen: ["Training a model with a differentiable loss", "Dataset too large for a closed-form solution"],
      avoidWhen: ["A cheap closed-form solution exists (e.g. small linear regression)"],
      mistakes: [
        { bad: "Learning rate too high.", fix: "Loss explodes/oscillates; lower lr or use a scheduler." },
        { bad: "Learning rate too low.", fix: "Converges painfully slowly; raise it gradually or use Adam." },
        { bad: "Forgetting to scale features.", fix: "Different feature scales elongate the loss surface and slow convergence." },
      ],
    },
  },

  "roc-threshold": {
    id: {
      useWhen: ["Memilih ambang keputusan untuk classifier probabilistik", "Membandingkan model terlepas dari ambang"],
      avoidWhen: ["Data sangat imbalanced (lebih baik pakai PR-curve)"],
      mistakes: [
        { bad: "Selalu memakai ambang 0.5.", fix: "Ambang optimal bergantung biaya FP vs FN; sesuaikan dengan konteks." },
        { bad: "Memakai ROC-AUC pada data sangat imbalanced.", fix: "ROC bisa terlihat bagus padahal buruk; pakai Precision-Recall AUC." },
        { bad: "Mengoptimalkan hanya satu metrik.", fix: "Seimbangkan precision & recall sesuai dampak kesalahan di dunia nyata." },
      ],
    },
    en: {
      useWhen: ["Choosing a decision threshold for a probabilistic classifier", "Comparing models independent of threshold"],
      avoidWhen: ["Heavily imbalanced data (prefer the PR curve)"],
      mistakes: [
        { bad: "Always using a 0.5 threshold.", fix: "The optimal threshold depends on FP vs FN cost; tune it to context." },
        { bad: "Using ROC-AUC on heavily imbalanced data.", fix: "ROC can look great while the model is poor; use Precision-Recall AUC." },
        { bad: "Optimizing a single metric.", fix: "Balance precision & recall against the real-world cost of each error." },
      ],
    },
  },

  "decision-tree": {
    id: {
      useWhen: ["Butuh model yang mudah dijelaskan ke non-teknis", "Fitur campuran numerik & kategorikal"],
      avoidWhen: ["Butuh akurasi tertinggi (pakai ensemble seperti Random Forest)", "Data sangat kecil & berisik"],
      mistakes: [
        { bad: "Membiarkan pohon tumbuh tanpa batas.", fix: "Pohon dalam = overfit; atur max_depth / min_samples_leaf atau lakukan pruning." },
        { bad: "Mengharapkan batas keputusan halus.", fix: "Pohon membuat batas bertingkat (axis-aligned); untuk batas halus pakai model lain." },
        { bad: "Mengira tree selalu stabil.", fix: "Sedikit perubahan data bisa mengubah struktur; ensembling menstabilkan." },
      ],
    },
    en: {
      useWhen: ["You need a model easy to explain to non-technical people", "Mixed numeric & categorical features"],
      avoidWhen: ["You need top accuracy (use an ensemble like Random Forest)", "Very small, noisy data"],
      mistakes: [
        { bad: "Letting the tree grow unbounded.", fix: "Deep trees overfit; set max_depth / min_samples_leaf or prune." },
        { bad: "Expecting smooth decision boundaries.", fix: "Trees make stair-step (axis-aligned) boundaries; use other models for smooth ones." },
        { bad: "Assuming a single tree is stable.", fix: "Small data changes can reshape it; ensembling stabilizes predictions." },
      ],
    },
  },

  "random-forest": {
    id: {
      useWhen: ["Butuh akurasi kuat dengan tuning minimal", "Data tabular dengan fitur campuran"],
      avoidWhen: ["Butuh interpretasi satu aturan sederhana (pakai single tree)", "Latensi/ukuran model sangat dibatasi"],
      mistakes: [
        { bad: "Mengira forest tidak bisa overfit.", fix: "Risiko lebih kecil, tapi pohon terlalu dalam + sedikit data tetap bisa overfit." },
        { bad: "Membaca feature_importances_ sebagai sebab-akibat.", fix: "Itu importance prediktif, bukan kausalitas; bias ke fitur berkardinalitas tinggi." },
        { bad: "Memakai terlalu sedikit pohon.", fix: "Naikkan n_estimators sampai skor stabil (lebih banyak pohon tak menambah overfit)." },
      ],
    },
    en: {
      useWhen: ["You need strong accuracy with minimal tuning", "Tabular data with mixed features"],
      avoidWhen: ["You need one simple interpretable rule (use a single tree)", "Latency/model size is tightly constrained"],
      mistakes: [
        { bad: "Assuming forests can't overfit.", fix: "Lower risk, but very deep trees + little data can still overfit." },
        { bad: "Reading feature_importances_ as causation.", fix: "It's predictive importance, not causality; biased toward high-cardinality features." },
        { bad: "Using too few trees.", fix: "Raise n_estimators until the score stabilizes (more trees don't add overfit)." },
      ],
    },
  },

  "naive-bayes": {
    id: {
      useWhen: ["Klasifikasi teks / spam dengan fitur banyak", "Butuh baseline cepat & ringan"],
      avoidWhen: ["Fitur sangat saling bergantung", "Butuh probabilitas terkalibrasi akurat"],
      mistakes: [
        { bad: "Lupa Laplace smoothing.", fix: "Kata yang tak pernah muncul membuat probabilitas 0; set alpha>0." },
        { bad: "Memakai varian yang salah.", fix: "MultinomialNB untuk hitungan kata, GaussianNB untuk fitur kontinu." },
        { bad: "Percaya penuh probabilitasnya.", fix: "Asumsi independensi membuat probabilitas sering terlalu yakin." },
      ],
    },
    en: {
      useWhen: ["Text / spam classification with many features", "Need a fast, lightweight baseline"],
      avoidWhen: ["Features are strongly dependent", "You need well-calibrated probabilities"],
      mistakes: [
        { bad: "Forgetting Laplace smoothing.", fix: "Unseen words make a probability 0; set alpha>0." },
        { bad: "Using the wrong variant.", fix: "MultinomialNB for word counts, GaussianNB for continuous features." },
        { bad: "Fully trusting its probabilities.", fix: "The independence assumption makes probabilities often over-confident." },
      ],
    },
  },

  svm: {
    id: {
      useWhen: ["Data berdimensi tinggi (mis. teks)", "Margin pemisah jelas antar kelas"],
      avoidWhen: ["Dataset sangat besar (pelatihan lambat)", "Butuh probabilitas langsung"],
      mistakes: [
        { bad: "Lupa men-scale fitur.", fix: "SVM sangat sensitif skala; selalu standardisasi dulu." },
        { bad: "Memakai kernel RBF tanpa tuning.", fix: "Tuning C dan gamma lewat grid/cross-validation." },
        { bad: "Memaksa kernel non-linear padahal data linear.", fix: "Coba kernel linear dulu — lebih cepat & sering cukup." },
      ],
    },
    en: {
      useWhen: ["High-dimensional data (e.g. text)", "A clear separating margin between classes"],
      avoidWhen: ["Very large datasets (slow training)", "You need probabilities directly"],
      mistakes: [
        { bad: "Forgetting to scale features.", fix: "SVM is very scale-sensitive; always standardize first." },
        { bad: "Using the RBF kernel without tuning.", fix: "Tune C and gamma via grid/cross-validation." },
        { bad: "Forcing a non-linear kernel on linear data.", fix: "Try the linear kernel first — faster and often enough." },
      ],
    },
  },

  pca: {
    id: {
      useWhen: ["Mengurangi fitur yang berkorelasi", "Visualisasi data berdimensi tinggi ke 2D/3D"],
      avoidWhen: ["Butuh komponen yang dapat diinterpretasi langsung", "Hubungan utama bersifat non-linear (pakai t-SNE/UMAP)"],
      mistakes: [
        { bad: "Lupa men-standardisasi fitur.", fix: "PCA peka skala; fitur berskala besar akan mendominasi komponen." },
        { bad: "Menyimpan terlalu sedikit/banyak komponen.", fix: "Pilih berdasarkan explained variance ratio (mis. 95%)." },
        { bad: "Fit PCA pada seluruh data termasuk test.", fix: "Fit hanya pada train, lalu transform test — mencegah data leakage." },
      ],
    },
    en: {
      useWhen: ["Reducing correlated features", "Visualizing high-dimensional data in 2D/3D"],
      avoidWhen: ["You need directly interpretable components", "The main structure is non-linear (use t-SNE/UMAP)"],
      mistakes: [
        { bad: "Forgetting to standardize features.", fix: "PCA is scale-sensitive; large-scale features dominate the components." },
        { bad: "Keeping too few/too many components.", fix: "Choose by explained variance ratio (e.g. 95%)." },
        { bad: "Fitting PCA on all data including test.", fix: "Fit on train only, then transform test — prevents data leakage." },
      ],
    },
  },

  tsne: {
    id: {
      useWhen: ["Visualisasi cluster berdimensi tinggi ke 2D", "Eksplorasi struktur lokal data"],
      avoidWhen: ["Sebagai fitur untuk model lain (tidak stabil)", "Dataset sangat besar tanpa pra-reduksi"],
      mistakes: [
        { bad: "Menafsirkan ukuran & jarak antar cluster.", fix: "t-SNE hanya menjaga struktur lokal; jarak global tidak bermakna." },
        { bad: "Memakai perplexity default membabi buta.", fix: "Coba beberapa nilai (5–50); hasil bisa sangat berbeda." },
        { bad: "Menjalankan langsung pada ribuan dimensi.", fix: "Reduksi dulu dengan PCA agar lebih cepat & stabil." },
      ],
    },
    en: {
      useWhen: ["Visualizing high-dimensional clusters in 2D", "Exploring local structure in data"],
      avoidWhen: ["As features for another model (unstable)", "Very large datasets without pre-reduction"],
      mistakes: [
        { bad: "Interpreting cluster sizes & distances.", fix: "t-SNE preserves only local structure; global distances are meaningless." },
        { bad: "Blindly using default perplexity.", fix: "Try several values (5–50); results can differ a lot." },
        { bad: "Running directly on thousands of dimensions.", fix: "Pre-reduce with PCA first for speed & stability." },
      ],
    },
  },

  lda: {
    id: {
      useWhen: ["Reduksi dimensi dengan label kelas tersedia", "Memaksimalkan pemisahan antar kelas"],
      avoidWhen: ["Tidak ada label (pakai PCA)", "Batas antar kelas sangat non-linear"],
      mistakes: [
        { bad: "Mengira LDA sama dengan PCA.", fix: "PCA tanpa label (varians), LDA memakai label (keterpisahan kelas)." },
        { bad: "Memakai komponen melebihi (kelas−1).", fix: "LDA maksimal menghasilkan C−1 komponen." },
        { bad: "Mengabaikan asumsi distribusi.", fix: "LDA mengasumsikan kovarians antar kelas mirip & distribusi normal." },
      ],
    },
    en: {
      useWhen: ["Dimensionality reduction when class labels are available", "Maximizing between-class separation"],
      avoidWhen: ["No labels available (use PCA)", "Highly non-linear class boundaries"],
      mistakes: [
        { bad: "Confusing LDA with PCA.", fix: "PCA is unsupervised (variance); LDA uses labels (class separability)." },
        { bad: "Using more than (classes−1) components.", fix: "LDA yields at most C−1 components." },
        { bad: "Ignoring its distribution assumptions.", fix: "LDA assumes similar class covariances & roughly normal features." },
      ],
    },
  },

  dbscan: {
    id: {
      useWhen: ["Cluster bentuk tidak beraturan & ada outlier", "Jumlah cluster tak diketahui"],
      avoidWhen: ["Kepadatan cluster sangat bervariasi", "Data berdimensi sangat tinggi"],
      mistakes: [
        { bad: "Menebak eps sembarangan.", fix: "Gunakan k-distance plot untuk memilih eps." },
        { bad: "Lupa men-scale fitur.", fix: "eps berbasis jarak; standardisasi dulu agar bermakna." },
        { bad: "Menganggap semua titik harus masuk cluster.", fix: "DBSCAN sengaja menandai titik jarang sebagai noise (label −1)." },
      ],
    },
    en: {
      useWhen: ["Irregular cluster shapes with outliers", "Unknown number of clusters"],
      avoidWhen: ["Clusters with very different densities", "Very high-dimensional data"],
      mistakes: [
        { bad: "Guessing eps arbitrarily.", fix: "Use a k-distance plot to choose eps." },
        { bad: "Forgetting to scale features.", fix: "eps is distance-based; standardize first so it's meaningful." },
        { bad: "Expecting every point to be clustered.", fix: "DBSCAN deliberately labels sparse points as noise (label −1)." },
      ],
    },
  },
};

// ==================== DEEP LEARNING / COMPUTER VISION ====================
Object.assign(practicalTips, {
  "neural-network": {
    id: {
      useWhen: ["Pola kompleks & non-linear dengan banyak data", "Fitur mentah (gambar/teks/sinyal)"],
      avoidWhen: ["Data tabular kecil (coba tree/ensemble dulu)", "Butuh interpretasi penuh"],
      mistakes: [
        { bad: "Tidak men-normalisasi input.", fix: "Normalisasi/standardisasi input mempercepat & menstabilkan pelatihan." },
        { bad: "Jaringan terlalu besar untuk data kecil.", fix: "Tambah dropout/regularisasi atau kecilkan model agar tak overfit." },
        { bad: "Lupa memisahkan validation set.", fix: "Pantau val-loss untuk early stopping; train-loss saja menyesatkan." },
      ],
    },
    en: {
      useWhen: ["Complex, non-linear patterns with lots of data", "Raw features (images/text/signals)"],
      avoidWhen: ["Small tabular data (try trees/ensembles first)", "You need full interpretability"],
      mistakes: [
        { bad: "Not normalizing inputs.", fix: "Normalizing/standardizing inputs speeds up & stabilizes training." },
        { bad: "A network too large for the data.", fix: "Add dropout/regularization or shrink the model to avoid overfit." },
        { bad: "Forgetting a validation split.", fix: "Watch val-loss for early stopping; train-loss alone misleads." },
      ],
    },
  },
  "cnn-filters": {
    id: {
      useWhen: ["Data grid/gambar dengan pola spasial lokal", "Butuh invariansi terhadap pergeseran"],
      avoidWhen: ["Data tabular tanpa struktur spasial", "Data sangat sedikit tanpa augmentasi"],
      mistakes: [
        { bad: "Melupakan augmentasi data.", fix: "Flip/rotate/crop menambah variasi & mengurangi overfit." },
        { bad: "Melatih dari nol untuk dataset kecil.", fix: "Pakai transfer learning dari model pre-trained." },
        { bad: "Mengabaikan ukuran receptive field.", fix: "Tumpuk conv/pooling agar lapisan dalam 'melihat' konteks lebih luas." },
      ],
    },
    en: {
      useWhen: ["Grid/image data with local spatial patterns", "You want shift-invariance"],
      avoidWhen: ["Tabular data with no spatial structure", "Very little data without augmentation"],
      mistakes: [
        { bad: "Skipping data augmentation.", fix: "Flip/rotate/crop adds variety & cuts overfit." },
        { bad: "Training from scratch on a tiny dataset.", fix: "Use transfer learning from a pre-trained model." },
        { bad: "Ignoring the receptive field.", fix: "Stack conv/pooling so deep layers 'see' wider context." },
      ],
    },
  },
  "edge-detection": {
    id: {
      useWhen: ["Pra-pemrosesan citra klasik (deteksi tepi/kontur)", "Mengajarkan konsep konvolusi filter"],
      avoidWhen: ["Pengenalan objek kompleks (pakai CNN)"],
      mistakes: [
        { bad: "Tidak mengurangi noise dulu.", fix: "Terapkan Gaussian blur sebelum deteksi tepi agar tak ramai." },
        { bad: "Ambang Canny sembarangan.", fix: "Sesuaikan threshold atas/bawah dengan kontras citra." },
        { bad: "Mengabaikan ruang warna.", fix: "Konversi ke grayscale dulu untuk operator tepi standar." },
      ],
    },
    en: {
      useWhen: ["Classic image preprocessing (edges/contours)", "Teaching the convolution-filter concept"],
      avoidWhen: ["Complex object recognition (use a CNN)"],
      mistakes: [
        { bad: "Not denoising first.", fix: "Apply Gaussian blur before edge detection to avoid noisy edges." },
        { bad: "Arbitrary Canny thresholds.", fix: "Tune the upper/lower thresholds to the image's contrast." },
        { bad: "Ignoring color space.", fix: "Convert to grayscale first for standard edge operators." },
      ],
    },
  },
  "pixel-classifier": {
    id: {
      useWhen: ["Segmentasi per-piksel sederhana", "Dataset berlabel piksel tersedia"],
      avoidWhen: ["Butuh pemahaman objek utuh (pakai segmentation CNN)"],
      mistakes: [
        { bad: "Mengabaikan konteks tetangga piksel.", fix: "Tambah fitur spasial/patch, bukan hanya warna satu piksel." },
        { bad: "Kelas tak seimbang (banyak latar).", fix: "Pakai class weight atau sampling seimbang." },
        { bad: "Menilai akurasi global saja.", fix: "Pakai IoU/Dice untuk segmentasi, bukan hanya akurasi piksel." },
      ],
    },
    en: {
      useWhen: ["Simple per-pixel segmentation", "Pixel-labeled data is available"],
      avoidWhen: ["You need whole-object understanding (use a segmentation CNN)"],
      mistakes: [
        { bad: "Ignoring neighboring-pixel context.", fix: "Add spatial/patch features, not just a single pixel's color." },
        { bad: "Imbalanced classes (mostly background).", fix: "Use class weights or balanced sampling." },
        { bad: "Judging by global accuracy only.", fix: "Use IoU/Dice for segmentation, not just pixel accuracy." },
      ],
    },
  },
  "activation-functions": {
    id: {
      useWhen: ["Memilih non-linearitas untuk lapisan jaringan", "Memahami vanishing gradient"],
      avoidWhen: ["Lapisan output regresi (biasanya tanpa aktivasi)"],
      mistakes: [
        { bad: "Memakai sigmoid di lapisan dalam.", fix: "Rawan vanishing gradient; pakai ReLU/variannya di hidden layer." },
        { bad: "ReLU 'mati' karena lr besar.", fix: "Pakai LeakyReLU/ELU atau turunkan learning rate." },
        { bad: "Salah aktivasi di output.", fix: "Softmax untuk multi-kelas, sigmoid untuk biner, linear untuk regresi." },
      ],
    },
    en: {
      useWhen: ["Choosing a layer's non-linearity", "Understanding vanishing gradients"],
      avoidWhen: ["A regression output layer (usually no activation)"],
      mistakes: [
        { bad: "Using sigmoid in deep hidden layers.", fix: "Prone to vanishing gradients; use ReLU/variants in hidden layers." },
        { bad: "Dying ReLUs from a high lr.", fix: "Use LeakyReLU/ELU or lower the learning rate." },
        { bad: "Wrong output activation.", fix: "Softmax for multi-class, sigmoid for binary, linear for regression." },
      ],
    },
  },
  "latent-space": {
    id: {
      useWhen: ["Kompresi/representasi data (autoencoder)", "Deteksi anomali lewat reconstruction error"],
      avoidWhen: ["Butuh label prediksi langsung (ini unsupervised)"],
      mistakes: [
        { bad: "Bottleneck terlalu besar.", fix: "Autoencoder hanya menyalin input; perkecil dimensi laten." },
        { bad: "Mengharapkan dimensi laten bermakna.", fix: "Tanpa constraint (mis. VAE) sumbu laten tak harus terinterpretasi." },
        { bad: "Lupa menormalkan input.", fix: "Normalisasi membantu rekonstruksi stabil." },
      ],
    },
    en: {
      useWhen: ["Compressing/representing data (autoencoders)", "Anomaly detection via reconstruction error"],
      avoidWhen: ["You need direct label predictions (this is unsupervised)"],
      mistakes: [
        { bad: "A bottleneck that's too wide.", fix: "The autoencoder just copies the input; shrink the latent dim." },
        { bad: "Expecting meaningful latent axes.", fix: "Without constraints (e.g. a VAE) latent axes needn't be interpretable." },
        { bad: "Forgetting to normalize inputs.", fix: "Normalization helps stable reconstruction." },
      ],
    },
  },
  "speech-spectrogram": {
    id: {
      useWhen: ["Representasi audio untuk model (speech/musik)", "Pra-pemrosesan sebelum CNN/RNN audio"],
      avoidWhen: ["Sinyal non-periodik yang butuh domain waktu murni"],
      mistakes: [
        { bad: "Salah memilih ukuran window FFT.", fix: "Trade-off resolusi waktu vs frekuensi; sesuaikan dengan tugas." },
        { bad: "Melupakan skala mel/log.", fix: "Mel-spectrogram lebih dekat persepsi pendengaran manusia." },
        { bad: "Tidak menormalkan amplitudo.", fix: "Normalisasi/konversi dB menstabilkan pelatihan." },
      ],
    },
    en: {
      useWhen: ["Audio representation for models (speech/music)", "Preprocessing before an audio CNN/RNN"],
      avoidWhen: ["Non-periodic signals needing pure time-domain analysis"],
      mistakes: [
        { bad: "Wrong FFT window size.", fix: "Trade time vs frequency resolution; match it to the task." },
        { bad: "Skipping the mel/log scale.", fix: "A mel-spectrogram is closer to human auditory perception." },
        { bad: "Not normalizing amplitude.", fix: "Normalizing / dB conversion stabilizes training." },
      ],
    },
  },
  "cnn-filter-image": {
    id: {
      useWhen: ["Melihat efek filter konvolusi pada gambar nyata", "Membangun intuisi feature map"],
      avoidWhen: ["Produksi — ini alat visual, bukan pipeline inferensi"],
      mistakes: [
        { bad: "Mengira filter awal mengenali objek.", fix: "Lapisan awal menangkap tepi/tekstur; objek muncul di lapisan dalam." },
        { bad: "Mengabaikan padding/stride.", fix: "Keduanya mengubah ukuran & isi feature map." },
        { bad: "Melupakan normalisasi nilai piksel.", fix: "Skala 0–1 membuat hasil filter konsisten." },
      ],
    },
    en: {
      useWhen: ["Seeing convolution-filter effects on real images", "Building feature-map intuition"],
      avoidWhen: ["Production — this is a visual tool, not an inference pipeline"],
      mistakes: [
        { bad: "Thinking early filters recognize objects.", fix: "Early layers capture edges/textures; objects emerge in deeper layers." },
        { bad: "Ignoring padding/stride.", fix: "Both change the feature map's size & content." },
        { bad: "Forgetting pixel normalization.", fix: "Scaling to 0–1 keeps filter results consistent." },
      ],
    },
  },
  "webcam-vision": {
    id: {
      useWhen: ["Demo inferensi real-time di browser", "Prototipe interaksi berbasis kamera"],
      avoidWhen: ["Butuh akurasi tinggi pada perangkat lemah"],
      mistakes: [
        { bad: "Mengabaikan izin & privasi kamera.", fix: "Minta izin eksplisit & proses lokal bila memungkinkan." },
        { bad: "Model terlalu berat untuk real-time.", fix: "Pakai model ringan/terkuantisasi agar frame tak tersendat." },
        { bad: "Lupa pencahayaan memengaruhi hasil.", fix: "Uji di berbagai kondisi cahaya; tambah pra-pemrosesan." },
      ],
    },
    en: {
      useWhen: ["Real-time in-browser inference demos", "Camera-based interaction prototypes"],
      avoidWhen: ["You need high accuracy on weak devices"],
      mistakes: [
        { bad: "Ignoring camera permission & privacy.", fix: "Ask explicit permission & process locally where possible." },
        { bad: "A model too heavy for real-time.", fix: "Use a light/quantized model so frames don't stutter." },
        { bad: "Forgetting lighting affects results.", fix: "Test across lighting conditions; add preprocessing." },
      ],
    },
  },
});

// ==================== REINFORCEMENT LEARNING ====================
Object.assign(practicalTips, {
  "rl-gridworld": {
    id: {
      useWhen: ["Belajar konsep state–action–reward", "Lingkungan diskret kecil & terdefinisi"],
      avoidWhen: ["State kontinu besar tanpa pendekatan fungsi"],
      mistakes: [
        { bad: "Reward dirancang buruk.", fix: "Reward menyesatkan = perilaku tak diinginkan; rancang dengan hati-hati." },
        { bad: "Discount factor γ keliru.", fix: "γ kecil terlalu rakus jangka pendek; γ≈0.9–0.99 biasanya seimbang." },
        { bad: "Tanpa eksplorasi.", fix: "Pakai ε-greedy; tanpa eksplorasi agen terjebak kebijakan buruk." },
      ],
    },
    en: {
      useWhen: ["Learning the state–action–reward concept", "Small, well-defined discrete environments"],
      avoidWhen: ["Large continuous state spaces without function approximation"],
      mistakes: [
        { bad: "Poorly designed rewards.", fix: "Misleading rewards cause unwanted behavior; design them carefully." },
        { bad: "Wrong discount factor γ.", fix: "Small γ is too short-sighted; γ≈0.9–0.99 usually balances well." },
        { bad: "No exploration.", fix: "Use ε-greedy; without exploration the agent gets stuck in bad policies." },
      ],
    },
  },
  "qlearning-train": {
    id: {
      useWhen: ["Lingkungan diskret & model-free", "Tabel state–action muat di memori"],
      avoidWhen: ["State/action sangat besar (pakai Deep Q-Network)"],
      mistakes: [
        { bad: "Learning rate α tak diturunkan.", fix: "Turunkan α seiring waktu agar nilai Q konvergen." },
        { bad: "ε tetap tinggi selamanya.", fix: "Decay ε agar beralih dari eksplorasi ke eksploitasi." },
        { bad: "Episode terlalu sedikit.", fix: "Beri cukup episode agar tabel Q sempat konvergen." },
      ],
    },
    en: {
      useWhen: ["Discrete, model-free environments", "A state–action table fits in memory"],
      avoidWhen: ["Very large state/action spaces (use a Deep Q-Network)"],
      mistakes: [
        { bad: "Learning rate α never decayed.", fix: "Decay α over time so Q-values converge." },
        { bad: "ε kept high forever.", fix: "Decay ε to shift from exploration to exploitation." },
        { bad: "Too few episodes.", fix: "Give enough episodes for the Q-table to converge." },
      ],
    },
  },
  "multi-armed-bandit": {
    id: {
      useWhen: ["Pilihan berulang dengan reward tak pasti (A/B, iklan)", "Tanpa state antar keputusan"],
      avoidWhen: ["Keputusan bergantung state/urutan (pakai RL penuh)"],
      mistakes: [
        { bad: "Terlalu cepat eksploitasi arm terbaik sementara.", fix: "Beri eksplorasi awal; pakai UCB/Thompson sampling." },
        { bad: "Mengabaikan ketidakpastian estimasi.", fix: "Arm jarang dicoba punya estimasi tidak pasti — perhitungkan." },
        { bad: "Mengira lingkungan statis.", fix: "Jika reward berubah waktu, pakai bandit non-stasioner." },
      ],
    },
    en: {
      useWhen: ["Repeated choices with uncertain rewards (A/B, ads)", "No state between decisions"],
      avoidWhen: ["Decisions depend on state/order (use full RL)"],
      mistakes: [
        { bad: "Exploiting the current-best arm too soon.", fix: "Allow early exploration; use UCB/Thompson sampling." },
        { bad: "Ignoring estimate uncertainty.", fix: "Rarely-tried arms have uncertain estimates — account for it." },
        { bad: "Assuming a static environment.", fix: "If rewards drift over time, use a non-stationary bandit." },
      ],
    },
  },
  "rl-maze": {
    id: {
      useWhen: ["Visualisasi pencarian kebijakan di ruang berstruktur", "Belajar path-finding berbasis reward"],
      avoidWhen: ["Lingkungan dunia-nyata berisik tanpa simulator"],
      mistakes: [
        { bad: "Reward hanya di tujuan akhir.", fix: "Reward sangat jarang = belajar lambat; pertimbangkan reward shaping." },
        { bad: "Tanpa batas langkah per episode.", fix: "Beri max-steps agar episode tak berputar selamanya." },
        { bad: "Eksplorasi tak memadai.", fix: "Pastikan ε cukup di awal untuk menjelajah seluruh maze." },
      ],
    },
    en: {
      useWhen: ["Visualizing policy search in a structured space", "Learning reward-based path-finding"],
      avoidWhen: ["Noisy real-world environments without a simulator"],
      mistakes: [
        { bad: "Reward only at the final goal.", fix: "Very sparse rewards = slow learning; consider reward shaping." },
        { bad: "No step limit per episode.", fix: "Add max-steps so episodes don't loop forever." },
        { bad: "Insufficient exploration.", fix: "Keep ε high enough early to explore the whole maze." },
      ],
    },
  },
  cartpole: {
    id: {
      useWhen: ["Benchmark kontrol kontinu klasik", "Menguji algoritma policy-gradient/DQN"],
      avoidWhen: ["Butuh tugas dunia-nyata langsung (ini simulasi)"],
      mistakes: [
        { bad: "Tidak menormalkan observasi.", fix: "Normalisasi state mempercepat konvergensi." },
        { bad: "Menilai dari satu episode.", fix: "Reward RL berisik; rata-ratakan banyak episode." },
        { bad: "Hyperparameter tak di-tuning.", fix: "RL sangat sensitif; tuning lr, γ, ukuran batch." },
      ],
    },
    en: {
      useWhen: ["A classic continuous-control benchmark", "Testing policy-gradient/DQN algorithms"],
      avoidWhen: ["You need a real-world task directly (this is a simulation)"],
      mistakes: [
        { bad: "Not normalizing observations.", fix: "Normalizing the state speeds up convergence." },
        { bad: "Judging from a single episode.", fix: "RL reward is noisy; average over many episodes." },
        { bad: "Untuned hyperparameters.", fix: "RL is very sensitive; tune lr, γ, batch size." },
      ],
    },
  },
  "explore-exploit": {
    id: {
      useWhen: ["Memahami dilema eksplorasi vs eksploitasi", "Mendesain strategi ε / UCB"],
      avoidWhen: ["Masalah deterministik tanpa ketidakpastian"],
      mistakes: [
        { bad: "Eksploitasi murni sejak awal.", fix: "Akan terjebak pilihan suboptimal; jelajahi dulu." },
        { bad: "Eksplorasi terus tanpa henti.", fix: "Boros; kurangi eksplorasi setelah cukup informasi." },
        { bad: "Mengabaikan konteks jangka panjang.", fix: "Seimbangkan reward sekarang vs informasi untuk masa depan." },
      ],
    },
    en: {
      useWhen: ["Understanding the explore–exploit dilemma", "Designing ε / UCB strategies"],
      avoidWhen: ["Deterministic problems with no uncertainty"],
      mistakes: [
        { bad: "Pure exploitation from the start.", fix: "You get stuck on a suboptimal choice; explore first." },
        { bad: "Exploring forever.", fix: "Wasteful; reduce exploration once you have enough info." },
        { bad: "Ignoring the long-term context.", fix: "Balance reward now vs information for the future." },
      ],
    },
  },
  "dynamic-pricing": {
    id: {
      useWhen: ["Optimasi harga dengan umpan balik permintaan", "Keputusan sekuensial yang memengaruhi reward"],
      avoidWhen: ["Harga diatur regulasi ketat / tak ada ruang eksperimen"],
      mistakes: [
        { bad: "Bereksperimen harga tanpa batas aman.", fix: "Beri guardrail (harga min/maks) agar tak merugikan." },
        { bad: "Mengabaikan reaksi pelanggan jangka panjang.", fix: "Harga agresif bisa menurunkan loyalitas; perhitungkan." },
        { bad: "Mengira permintaan statis.", fix: "Permintaan musiman/tren berubah; model harus adaptif." },
      ],
    },
    en: {
      useWhen: ["Price optimization with demand feedback", "Sequential decisions that affect reward"],
      avoidWhen: ["Prices are tightly regulated / no room to experiment"],
      mistakes: [
        { bad: "Experimenting on price without safe bounds.", fix: "Add guardrails (min/max price) to avoid losses." },
        { bad: "Ignoring long-term customer reaction.", fix: "Aggressive pricing can erode loyalty; account for it." },
        { bad: "Assuming static demand.", fix: "Seasonal/trend demand shifts; the model must adapt." },
      ],
    },
  },
});

// ==================== NLP / LLM ====================
Object.assign(practicalTips, {
  "sentiment-naive-bayes": {
    id: {
      useWhen: ["Klasifikasi sentimen teks cepat & ringan", "Baseline sebelum model yang lebih berat"],
      avoidWhen: ["Butuh paham konteks/sarkasme (pakai transformer)"],
      mistakes: [
        { bad: "Melupakan pembersihan teks.", fix: "Lowercase, buang noise/stopword sesuai kebutuhan sebelum fitur." },
        { bad: "Mengabaikan negasi.", fix: "'tidak bagus' bisa salah klasifikasi; pertimbangkan n-gram." },
        { bad: "Melatih pada data tak seimbang.", fix: "Seimbangkan kelas atau pakai bobot kelas." },
      ],
    },
    en: {
      useWhen: ["Fast, lightweight text sentiment classification", "A baseline before heavier models"],
      avoidWhen: ["You need context/sarcasm understanding (use a transformer)"],
      mistakes: [
        { bad: "Skipping text cleaning.", fix: "Lowercase, strip noise/stopwords as needed before features." },
        { bad: "Ignoring negation.", fix: "'not good' can be misclassified; consider n-grams." },
        { bad: "Training on imbalanced data.", fix: "Balance classes or use class weights." },
      ],
    },
  },
  tfidf: {
    id: {
      useWhen: ["Fitur teks untuk model klasik (SVM/NB)", "Pencarian/relevansi dokumen sederhana"],
      avoidWhen: ["Butuh makna semantik (pakai embeddings)"],
      mistakes: [
        { bad: "Tidak membatasi vocabulary.", fix: "Set max_features/min_df agar matriks tak meledak & bising." },
        { bad: "Mengabaikan stopword & normalisasi.", fix: "Kata umum mendominasi; buang stopword & lakukan stemming/lemmatization." },
        { bad: "Mengira TF-IDF paham sinonim.", fix: "Ini berbasis kata persis; sinonim dianggap berbeda." },
      ],
    },
    en: {
      useWhen: ["Text features for classic models (SVM/NB)", "Simple document search/relevance"],
      avoidWhen: ["You need semantic meaning (use embeddings)"],
      mistakes: [
        { bad: "Not capping the vocabulary.", fix: "Set max_features/min_df so the matrix doesn't explode & get noisy." },
        { bad: "Ignoring stopwords & normalization.", fix: "Common words dominate; remove stopwords & stem/lemmatize." },
        { bad: "Expecting TF-IDF to know synonyms.", fix: "It's exact-word based; synonyms count as different terms." },
      ],
    },
  },
  tokenization: {
    id: {
      useWhen: ["Pra-pemrosesan teks untuk model NLP", "Memahami cara LLM memecah teks"],
      avoidWhen: ["Analisis karakter-level murni"],
      mistakes: [
        { bad: "Mengira 1 kata = 1 token.", fix: "Subword (BPE) memecah kata jadi beberapa token." },
        { bad: "Tokenizer tak cocok dengan model.", fix: "Selalu pakai tokenizer bawaan model yang sama." },
        { bad: "Mengabaikan batas panjang token.", fix: "Teks melebihi context window akan terpotong." },
      ],
    },
    en: {
      useWhen: ["Preprocessing text for NLP models", "Understanding how an LLM splits text"],
      avoidWhen: ["Pure character-level analysis"],
      mistakes: [
        { bad: "Assuming 1 word = 1 token.", fix: "Subword (BPE) splits words into several tokens." },
        { bad: "Tokenizer mismatched to the model.", fix: "Always use the model's own matching tokenizer." },
        { bad: "Ignoring the token-length limit.", fix: "Text beyond the context window gets truncated." },
      ],
    },
  },
  "word-embeddings": {
    id: {
      useWhen: ["Mewakili kata dengan makna semantik", "Mengukur kemiripan kata/dokumen"],
      avoidWhen: ["Butuh makna bergantung konteks (pakai embeddings kontekstual)"],
      mistakes: [
        { bad: "Mengira embedding statis paham konteks.", fix: "word2vec/GloVe satu vektor per kata; 'bank' sungai = bank uang." },
        { bad: "Melatih dari nol dengan data kecil.", fix: "Pakai embedding pre-trained untuk korpus kecil." },
        { bad: "Membandingkan dengan jarak Euclidean.", fix: "Gunakan cosine similarity untuk kedekatan arah vektor." },
      ],
    },
    en: {
      useWhen: ["Representing words with semantic meaning", "Measuring word/document similarity"],
      avoidWhen: ["You need context-dependent meaning (use contextual embeddings)"],
      mistakes: [
        { bad: "Thinking static embeddings understand context.", fix: "word2vec/GloVe give one vector per word; river 'bank' = money 'bank'." },
        { bad: "Training from scratch on little data.", fix: "Use pre-trained embeddings for small corpora." },
        { bad: "Comparing with Euclidean distance.", fix: "Use cosine similarity for vector-direction closeness." },
      ],
    },
  },
  attention: {
    id: {
      useWhen: ["Memahami inti transformer & LLM", "Memodelkan hubungan jarak jauh dalam urutan"],
      avoidWhen: ["Urutan sangat panjang tanpa optimasi (biaya kuadratik)"],
      mistakes: [
        { bad: "Mengira attention = penjelasan sebab.", fix: "Bobot attention bukan bukti kausal; tafsirkan hati-hati." },
        { bad: "Melupakan positional encoding.", fix: "Attention tak punya urutan bawaan; posisi harus ditambahkan." },
        { bad: "Mengabaikan biaya O(n²).", fix: "Urutan panjang mahal; pakai varian efisien bila perlu." },
      ],
    },
    en: {
      useWhen: ["Understanding the core of transformers & LLMs", "Modeling long-range relations in a sequence"],
      avoidWhen: ["Very long sequences without optimization (quadratic cost)"],
      mistakes: [
        { bad: "Treating attention as a causal explanation.", fix: "Attention weights aren't causal evidence; interpret carefully." },
        { bad: "Forgetting positional encoding.", fix: "Attention has no inherent order; positions must be added." },
        { bad: "Ignoring the O(n²) cost.", fix: "Long sequences are expensive; use efficient variants if needed." },
      ],
    },
  },
  "next-token": {
    id: {
      useWhen: ["Memahami cara LLM menghasilkan teks", "Mengatur kreativitas lewat sampling"],
      avoidWhen: ["Butuh jawaban deterministik faktual tanpa verifikasi"],
      mistakes: [
        { bad: "Temperature terlalu tinggi.", fix: "Keluaran jadi ngawur; turunkan untuk konsistensi." },
        { bad: "Mengira LLM 'tahu' fakta.", fix: "Ia memprediksi token berikut; bisa halusinasi — verifikasi." },
        { bad: "Mengabaikan top-k/top-p.", fix: "Atur sampling untuk menyeimbangkan variasi & kualitas." },
      ],
    },
    en: {
      useWhen: ["Understanding how an LLM generates text", "Controlling creativity via sampling"],
      avoidWhen: ["You need deterministic factual answers without verification"],
      mistakes: [
        { bad: "Temperature too high.", fix: "Output becomes incoherent; lower it for consistency." },
        { bad: "Thinking the LLM 'knows' facts.", fix: "It predicts the next token; it can hallucinate — verify." },
        { bad: "Ignoring top-k/top-p.", fix: "Tune sampling to balance variety & quality." },
      ],
    },
  },
  ner: {
    id: {
      useWhen: ["Mengekstrak entitas (nama, tempat, tanggal)", "Pra-pemrosesan untuk pencarian/analitik"],
      avoidWhen: ["Entitas sangat domain-spesifik tanpa data latih"],
      mistakes: [
        { bad: "Memakai model umum untuk domain khusus.", fix: "Fine-tune pada entitas domain (medis/hukum)." },
        { bad: "Mengabaikan skema label (BIO).", fix: "Konsistenkan tagging B-/I-/O agar batas entitas benar." },
        { bad: "Menilai akurasi token saja.", fix: "Pakai F1 level entitas (span), bukan hanya per-token." },
      ],
    },
    en: {
      useWhen: ["Extracting entities (names, places, dates)", "Preprocessing for search/analytics"],
      avoidWhen: ["Very domain-specific entities with no training data"],
      mistakes: [
        { bad: "Using a generic model for a special domain.", fix: "Fine-tune on domain entities (medical/legal)." },
        { bad: "Ignoring the label scheme (BIO).", fix: "Keep B-/I-/O tagging consistent so entity spans are correct." },
        { bad: "Judging token accuracy only.", fix: "Use entity-level (span) F1, not just per-token." },
      ],
    },
  },
  "rag-chatbot": {
    id: {
      useWhen: ["Menjawab dari basis pengetahuan spesifik", "Mengurangi halusinasi dengan sumber nyata"],
      avoidWhen: ["Pengetahuan kecil yang bisa langsung di prompt"],
      mistakes: [
        { bad: "Chunk dokumen terlalu besar/kecil.", fix: "Ukuran chunk memengaruhi relevansi; uji & sesuaikan + overlap." },
        { bad: "Mengira retrieval selalu relevan.", fix: "Evaluasi kualitas retrieval; dokumen salah = jawaban salah." },
        { bad: "Tidak menampilkan sumber.", fix: "Sertakan sitasi agar jawaban dapat diverifikasi." },
      ],
    },
    en: {
      useWhen: ["Answering from a specific knowledge base", "Reducing hallucination with real sources"],
      avoidWhen: ["A small knowledge set that fits directly in the prompt"],
      mistakes: [
        { bad: "Chunks too large/small.", fix: "Chunk size drives relevance; test & tune it plus overlap." },
        { bad: "Assuming retrieval is always relevant.", fix: "Evaluate retrieval quality; wrong docs = wrong answers." },
        { bad: "Not showing sources.", fix: "Include citations so answers can be verified." },
      ],
    },
  },
  "agentic-ai": {
    id: {
      useWhen: ["Tugas multi-langkah dengan alat (tool use)", "Butuh perencanaan & aksi berurutan"],
      avoidWhen: ["Tugas satu langkah sederhana (prompt langsung cukup)"],
      mistakes: [
        { bad: "Tanpa batas langkah/biaya.", fix: "Beri max-steps & timeout agar agen tak berputar mahal." },
        { bad: "Mempercayai aksi tanpa validasi.", fix: "Verifikasi/guardrail sebelum aksi berdampak (mis. hapus data)." },
        { bad: "Tool description tak jelas.", fix: "Deskripsi alat buruk bikin agen salah pilih; perjelas." },
      ],
    },
    en: {
      useWhen: ["Multi-step tasks with tool use", "You need planning & sequential actions"],
      avoidWhen: ["Simple single-step tasks (a direct prompt is enough)"],
      mistakes: [
        { bad: "No step/cost limit.", fix: "Add max-steps & timeouts so the agent doesn't loop expensively." },
        { bad: "Trusting actions without validation.", fix: "Verify/guardrail before impactful actions (e.g. deleting data)." },
        { bad: "Unclear tool descriptions.", fix: "Poor tool docs make the agent pick wrong; make them explicit." },
      ],
    },
  },
  "transfer-ner": {
    id: {
      useWhen: ["Data berlabel sedikit untuk tugas NER", "Memanfaatkan model pre-trained besar"],
      avoidWhen: ["Domain sangat berbeda dari data pra-latih"],
      mistakes: [
        { bad: "Learning rate fine-tuning terlalu besar.", fix: "Pakai lr kecil agar tak merusak bobot pre-trained." },
        { bad: "Melatih seluruh model pada data mungil.", fix: "Bekukan lapisan bawah, latih lapisan atas dulu." },
        { bad: "Tokenizer tak sesuai model.", fix: "Gunakan tokenizer dari checkpoint yang sama." },
      ],
    },
    en: {
      useWhen: ["Little labeled data for an NER task", "Leveraging a large pre-trained model"],
      avoidWhen: ["A domain very different from the pre-training data"],
      mistakes: [
        { bad: "Fine-tuning learning rate too high.", fix: "Use a small lr so you don't wreck pre-trained weights." },
        { bad: "Training the whole model on tiny data.", fix: "Freeze lower layers, train upper layers first." },
        { bad: "Tokenizer mismatched to the model.", fix: "Use the tokenizer from the same checkpoint." },
      ],
    },
  },
  "text-cnn": {
    id: {
      useWhen: ["Klasifikasi teks menangkap pola n-gram lokal", "Butuh model cepat & lebih ringan dari RNN"],
      avoidWhen: ["Ketergantungan jarak jauh penting (pakai transformer)"],
      mistakes: [
        { bad: "Panjang urutan tak dipadding seragam.", fix: "Pad/truncate ke panjang tetap untuk batch." },
        { bad: "Ukuran filter tunggal.", fix: "Pakai beberapa ukuran kernel untuk menangkap n-gram berbeda." },
        { bad: "Embedding tak dibekukan saat data kecil.", fix: "Bekukan embedding pre-trained untuk data kecil." },
      ],
    },
    en: {
      useWhen: ["Text classification capturing local n-gram patterns", "A fast model lighter than an RNN"],
      avoidWhen: ["Long-range dependencies matter (use a transformer)"],
      mistakes: [
        { bad: "Sequences not padded uniformly.", fix: "Pad/truncate to a fixed length for batching." },
        { bad: "A single filter size.", fix: "Use multiple kernel sizes to capture different n-grams." },
        { bad: "Not freezing embeddings on small data.", fix: "Freeze pre-trained embeddings for small datasets." },
      ],
    },
  },
  "rnn-text": {
    id: {
      useWhen: ["Data berurutan di mana urutan penting", "Urutan pendek–menengah"],
      avoidWhen: ["Urutan sangat panjang (gradien hilang) — pakai transformer"],
      mistakes: [
        { bad: "Memakai vanilla RNN untuk urutan panjang.", fix: "Pakai LSTM/GRU untuk mengatasi vanishing gradient." },
        { bad: "Melupakan gradient clipping.", fix: "Clip gradien agar pelatihan tak meledak." },
        { bad: "Mengabaikan padding mask.", fix: "Beri mask agar token padding tak memengaruhi loss." },
      ],
    },
    en: {
      useWhen: ["Sequential data where order matters", "Short–medium sequences"],
      avoidWhen: ["Very long sequences (vanishing gradients) — use a transformer"],
      mistakes: [
        { bad: "Using a vanilla RNN for long sequences.", fix: "Use LSTM/GRU to handle vanishing gradients." },
        { bad: "Forgetting gradient clipping.", fix: "Clip gradients so training doesn't explode." },
        { bad: "Ignoring the padding mask.", fix: "Mask padding tokens so they don't affect the loss." },
      ],
    },
  },
  "active-learning": {
    id: {
      useWhen: ["Pelabelan mahal & ingin efisien", "Ada banyak data tak berlabel"],
      avoidWhen: ["Pelabelan murah/otomatis (labeli saja semua)"],
      mistakes: [
        { bad: "Strategi query asal-asalan.", fix: "Pakai uncertainty sampling/query-by-committee yang terukur." },
        { bad: "Mengabaikan bias sampel terpilih.", fix: "Query selektif bisa membuat distribusi latih bias." },
        { bad: "Melatih ulang dari nol tiap putaran.", fix: "Lakukan inkremental agar hemat waktu komputasi." },
      ],
    },
    en: {
      useWhen: ["Labeling is expensive & you want efficiency", "Lots of unlabeled data available"],
      avoidWhen: ["Labeling is cheap/automatic (just label everything)"],
      mistakes: [
        { bad: "Ad-hoc query strategy.", fix: "Use principled uncertainty sampling/query-by-committee." },
        { bad: "Ignoring selection bias.", fix: "Selective querying can bias the training distribution." },
        { bad: "Retraining from scratch each round.", fix: "Train incrementally to save compute time." },
      ],
    },
  },
  "nlu-nlg": {
    id: {
      useWhen: ["Memahami beda pemahaman vs pembangkitan bahasa", "Merancang asisten percakapan"],
      avoidWhen: ["Tugas satu arah sederhana (klasifikasi saja)"],
      mistakes: [
        { bad: "Mencampur tugas NLU & NLG tanpa batas jelas.", fix: "Pisahkan: pahami intent dulu, baru hasilkan respons." },
        { bad: "Mengabaikan evaluasi pembangkitan.", fix: "Pakai metrik seperti BLEU/ROUGE + tinjauan manusia." },
        { bad: "Mengira NLG selalu faktual.", fix: "Keluaran bisa salah; tambahkan grounding/verifikasi." },
      ],
    },
    en: {
      useWhen: ["Understanding language understanding vs generation", "Designing conversational assistants"],
      avoidWhen: ["Simple one-way tasks (classification only)"],
      mistakes: [
        { bad: "Mixing NLU & NLG with no clear boundary.", fix: "Separate them: understand intent first, then generate a response." },
        { bad: "Skipping generation evaluation.", fix: "Use metrics like BLEU/ROUGE plus human review." },
        { bad: "Assuming NLG is always factual.", fix: "Output can be wrong; add grounding/verification." },
      ],
    },
  },
});

export const getPracticalTips = (slug) => practicalTips[slug] || null;
