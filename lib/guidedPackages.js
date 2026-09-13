// Guided quiz packages per topic. Each package is a mini-lesson:
//   Knowledge (theory + interactive viz + KaTeX formulas) -> Case study -> Quiz
//
// Package shape (bilingual id/en for text; refs are language-agnostic):
// {
//   slug, icon,
//   id/en: {
//     title, subtitle,
//     knowledge: { paragraphs: [str], keyPoints?: [str] },
//     caseStudy: { title, scenario: [str], takeaway: str },
//     questions: [{ q, options:[str], answer:(idx), explain }],
//   },
//   demoSlug?: string,   // reuse an interactive demo (demoComponents)
//   mathSlug?: string,   // reuse KaTeX formulas via getDemoMath
//   viz?: { type, caption:{id,en}, ...spec },  // reuse CaseViz interactive viz
// }

export const guidedPackages = {
  "machine-learning": [
    // -------- Package 1 --------
    {
      slug: "supervised-basics",
      icon: "🎯",
      demoSlug: "supervised-knn",
      mathSlug: "supervised-knn",
      id: {
        title: "Paket 1 — Dasar Supervised Learning (k-NN)",
        subtitle: "Belajar dari data berlabel dan mengklasifikasi titik baru.",
        knowledge: {
          paragraphs: [
            "Supervised learning adalah cara mesin belajar dari data yang sudah punya jawaban (label). Model mempelajari pemetaan dari fitur input ke label output, lalu memakainya untuk memprediksi data baru.",
            "k-Nearest Neighbors (k-NN) adalah algoritma supervised yang sederhana namun kuat: untuk mengklasifikasi titik baru, ia melihat k tetangga terdekat dan mengikuti suara terbanyak. Tidak ada 'pelatihan' rumit — model hanya menyimpan contoh dan menghitung jarak saat prediksi.",
          ],
          keyPoints: [
            "Butuh data berlabel (fitur + jawaban).",
            "k kecil = batas keputusan tajam (rentan noise); k besar = lebih halus.",
            "Cocok untuk klasifikasi maupun regresi sederhana.",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Menyaring Buah Layak Ekspor",
          scenario: [
            "Sebuah koperasi buah di Malang ingin memilah mangga layak ekspor dari yang tidak, berdasarkan dua fitur sederhana: berat dan tingkat kematangan (dari sensor warna).",
            "Petugas berpengalaman melabeli ribuan mangga sebelumnya (layak / tidak). Dengan k-NN, mangga baru dibandingkan ke tetangga terdekatnya di ruang berat–kematangan.",
          ],
          takeaway: "Dengan data berlabel yang baik, k-NN mengubah intuisi petugas menjadi keputusan yang konsisten dan dapat diskalakan.",
        },
        questions: [
          { q: "Apa yang WAJIB dimiliki data untuk supervised learning?", options: ["Label/jawaban", "Koneksi internet", "GPU mahal", "Data gambar"], answer: 0, explain: "Supervised learning belajar dari pasangan fitur–label; label adalah syarat utamanya." },
          { q: "Pada k-NN, jika k dinaikkan terlalu besar, apa yang terjadi pada batas keputusan?", options: ["Menjadi lebih halus dan bisa mengabaikan pola lokal", "Menjadi acak", "Model berhenti bekerja", "Akurasi selalu 100%"], answer: 0, explain: "k besar merata-ratakan lebih banyak tetangga, membuat batas lebih halus tapi bisa melewatkan detail lokal." },
          { q: "Kasus mangga ekspor di atas termasuk tugas…", options: ["Klasifikasi (layak/tidak)", "Clustering", "Reduksi dimensi", "Peramalan deret waktu"], answer: 0, explain: "Memprediksi kategori (layak/tidak) adalah klasifikasi." },
        ],
      },
      en: {
        title: "Package 1 — Supervised Learning Basics (k-NN)",
        subtitle: "Learn from labeled data and classify new points.",
        knowledge: {
          paragraphs: [
            "Supervised learning is how a machine learns from data that already has answers (labels). The model learns a mapping from input features to output labels, then uses it to predict new data.",
            "k-Nearest Neighbors (k-NN) is a simple yet powerful supervised algorithm: to classify a new point, it looks at the k closest neighbors and follows the majority vote. There's no complex 'training' — the model just stores examples and computes distances at prediction time.",
          ],
          keyPoints: [
            "Needs labeled data (features + answers).",
            "Small k = sharp boundary (noise-prone); large k = smoother.",
            "Works for classification and simple regression.",
          ],
        },
        caseStudy: {
          title: "Case Study: Sorting Export-Grade Fruit",
          scenario: [
            "A fruit cooperative in Malang wants to sort export-grade mangoes from the rest, using two simple features: weight and ripeness (from a color sensor).",
            "Experienced workers labeled thousands of mangoes beforehand (grade / not). With k-NN, a new mango is compared to its nearest neighbors in the weight–ripeness space.",
          ],
          takeaway: "With good labeled data, k-NN turns worker intuition into consistent, scalable decisions.",
        },
        questions: [
          { q: "What MUST the data have for supervised learning?", options: ["Labels/answers", "An internet connection", "An expensive GPU", "Image data"], answer: 0, explain: "Supervised learning learns from feature–label pairs; labels are the key requirement." },
          { q: "In k-NN, if k is set too large, what happens to the decision boundary?", options: ["It gets smoother and may ignore local patterns", "It becomes random", "The model stops working", "Accuracy is always 100%"], answer: 0, explain: "A large k averages more neighbors, smoothing the boundary but possibly missing local detail." },
          { q: "The export-mango case above is a…", options: ["Classification (grade/not) task", "Clustering task", "Dimensionality reduction task", "Time-series forecasting task"], answer: 0, explain: "Predicting a category (grade/not) is classification." },
        ],
      },
    },

    // -------- Package 2 --------
    {
      slug: "unsupervised-clustering",
      icon: "🔗",
      demoSlug: "unsupervised-kmeans",
      mathSlug: "unsupervised-kmeans",
      id: {
        title: "Paket 2 — Unsupervised Learning (k-means)",
        subtitle: "Menemukan kelompok tersembunyi tanpa label.",
        knowledge: {
          paragraphs: [
            "Unsupervised learning bekerja pada data TANPA label. Tujuannya menemukan struktur tersembunyi — misalnya mengelompokkan data yang mirip.",
            "k-means mengelompokkan data ke dalam k cluster. Ia mengulang dua langkah: setiap titik ikut centroid terdekat, lalu tiap centroid pindah ke rata-rata anggotanya — sampai posisi centroid stabil (konvergen).",
          ],
          keyPoints: [
            "Tidak butuh label — mencari pola sendiri.",
            "Kita memilih jumlah cluster k di awal.",
            "Sensitif terhadap posisi awal centroid.",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Segmentasi Pelanggan Toko Online",
          scenario: [
            "Sebuah toko online di Jakarta ingin memahami pelanggannya tanpa asumsi awal. Mereka punya data belanja (frekuensi & nilai transaksi) tetapi tanpa kategori apa pun.",
            "Dengan k-means, pelanggan terbagi otomatis menjadi kelompok seperti 'pemburu diskon', 'pelanggan setia bernilai tinggi', dan 'jarang belanja' — dasar untuk strategi pemasaran berbeda.",
          ],
          takeaway: "Unsupervised learning menemukan segmen alami yang bahkan tak terpikirkan sebelumnya oleh tim.",
        },
        questions: [
          { q: "Perbedaan utama unsupervised dari supervised learning adalah…", options: ["Tidak memakai label", "Selalu lebih akurat", "Tidak butuh data", "Hanya untuk gambar"], answer: 0, explain: "Unsupervised learning bekerja tanpa label; ia mencari struktur sendiri." },
          { q: "Dalam k-means, apa yang dilakukan pada langkah 'update'?", options: ["Centroid pindah ke rata-rata anggotanya", "Menambah jumlah data", "Memberi label manual", "Menghapus outlier"], answer: 0, explain: "Setelah assignment, tiap centroid dipindah ke rata-rata titik anggotanya." },
          { q: "Segmentasi pelanggan tanpa kategori awal paling tepat memakai…", options: ["Clustering (unsupervised)", "Klasifikasi (supervised)", "Regresi linear", "k-NN"], answer: 0, explain: "Tanpa label kategori, clustering menemukan kelompok secara otomatis." },
        ],
      },
      en: {
        title: "Package 2 — Unsupervised Learning (k-means)",
        subtitle: "Find hidden groups without labels.",
        knowledge: {
          paragraphs: [
            "Unsupervised learning works on data WITHOUT labels. The goal is to find hidden structure — for example, grouping similar data together.",
            "k-means groups data into k clusters. It repeats two steps: each point joins its nearest centroid, then each centroid moves to the average of its members — until the centroids stabilize (converge).",
          ],
          keyPoints: [
            "Needs no labels — finds patterns itself.",
            "We choose the number of clusters k up front.",
            "Sensitive to the initial centroid positions.",
          ],
        },
        caseStudy: {
          title: "Case Study: Segmenting Online-Store Customers",
          scenario: [
            "An online store in Jakarta wants to understand its customers without prior assumptions. They have shopping data (frequency & transaction value) but no categories.",
            "With k-means, customers split automatically into groups like 'deal hunters', 'high-value loyalists', and 'rare shoppers' — a basis for different marketing strategies.",
          ],
          takeaway: "Unsupervised learning surfaces natural segments the team hadn't even thought of.",
        },
        questions: [
          { q: "The key difference of unsupervised from supervised learning is…", options: ["It uses no labels", "It's always more accurate", "It needs no data", "It's only for images"], answer: 0, explain: "Unsupervised learning works without labels; it finds structure on its own." },
          { q: "In k-means, what happens in the 'update' step?", options: ["Centroids move to their members' average", "More data is added", "Labels are set manually", "Outliers are removed"], answer: 0, explain: "After assignment, each centroid moves to the mean of its member points." },
          { q: "Segmenting customers with no prior categories is best done with…", options: ["Clustering (unsupervised)", "Classification (supervised)", "Linear regression", "k-NN"], answer: 0, explain: "Without category labels, clustering finds the groups automatically." },
        ],
      },
    },

    // -------- Package 3 --------
    {
      slug: "regression-error",
      icon: "📉",
      demoSlug: "regression",
      mathSlug: "regression",
      id: {
        title: "Paket 3 — Regresi & Mengukur Error",
        subtitle: "Menarik garis terbaik dan memahami MSE.",
        knowledge: {
          paragraphs: [
            "Regresi memprediksi angka kontinu (bukan kategori). Regresi linear mencari garis y = m·x + b yang paling pas melewati data.",
            "Seberapa 'pas' garis diukur dengan error. Metrik umum adalah Mean Squared Error (MSE): rata-rata kuadrat selisih antara prediksi dan nilai asli. Melatih model = mencari m dan b yang membuat MSE sekecil mungkin.",
          ],
          keyPoints: [
            "Regresi = memprediksi angka; klasifikasi = memprediksi kategori.",
            "MSE menghukum kesalahan besar lebih berat (karena dikuadratkan).",
            "Regresi logistik memakai sigmoid untuk mengubah regresi menjadi klasifikasi probabilistik.",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Memperkirakan Harga Kos di Sekitar Kampus",
          scenario: [
            "Seorang mahasiswa membangun alat perkiraan harga kos berdasarkan luas kamar dan jarak ke kampus.",
            "Dengan regresi, ia menarik garis melalui data harga historis. MSE membantunya menilai apakah garisnya sudah cukup baik atau masih meleset jauh pada beberapa kos.",
          ],
          takeaway: "Regresi mengubah data historis menjadi perkiraan angka; MSE memberi tahu seberapa jauh perkiraan itu meleset.",
        },
        questions: [
          { q: "Regresi paling tepat untuk memprediksi…", options: ["Angka kontinu (mis. harga)", "Kategori (mis. spam/bukan)", "Kelompok tanpa label", "Urutan aksi"], answer: 0, explain: "Regresi memprediksi nilai numerik kontinu." },
          { q: "Mengapa MSE mengkuadratkan selisih error?", options: ["Agar kesalahan besar dihukum lebih berat", "Agar hasil selalu negatif", "Agar model lebih cepat", "Tanpa alasan khusus"], answer: 0, explain: "Mengkuadratkan membuat error besar berkontribusi jauh lebih besar, mendorong model menghindarinya." },
          { q: "Untuk mengubah regresi menjadi klasifikasi probabilistik, kita memakai fungsi…", options: ["Sigmoid", "Euclidean", "Gini", "Softmax pada pixel"], answer: 0, explain: "Regresi logistik menerapkan sigmoid pada output linear untuk menghasilkan probabilitas." },
        ],
      },
      en: {
        title: "Package 3 — Regression & Measuring Error",
        subtitle: "Fit the best line and understand MSE.",
        knowledge: {
          paragraphs: [
            "Regression predicts continuous numbers (not categories). Linear regression finds the best-fitting line y = m·x + b through the data.",
            "How 'well' the line fits is measured by error. A common metric is Mean Squared Error (MSE): the average of the squared differences between predictions and actual values. Training the model = finding m and b that make MSE as small as possible.",
          ],
          keyPoints: [
            "Regression = predict numbers; classification = predict categories.",
            "MSE penalizes large errors more heavily (because they're squared).",
            "Logistic regression uses a sigmoid to turn regression into probabilistic classification.",
          ],
        },
        caseStudy: {
          title: "Case Study: Estimating Boarding-House Rent Near Campus",
          scenario: [
            "A student builds a rent estimator based on room size and distance to campus.",
            "Using regression, they fit a line through historical price data. MSE helps judge whether the line is good enough or still far off for some listings.",
          ],
          takeaway: "Regression turns historical data into numeric estimates; MSE tells you how far off those estimates are.",
        },
        questions: [
          { q: "Regression is best for predicting…", options: ["Continuous numbers (e.g. price)", "Categories (e.g. spam/not)", "Unlabeled groups", "A sequence of actions"], answer: 0, explain: "Regression predicts continuous numeric values." },
          { q: "Why does MSE square the error?", options: ["So large errors are penalized more heavily", "So the result is always negative", "To make the model faster", "For no particular reason"], answer: 0, explain: "Squaring makes large errors contribute much more, pushing the model to avoid them." },
          { q: "To turn regression into probabilistic classification, we use the…", options: ["Sigmoid function", "Euclidean distance", "Gini impurity", "Softmax over pixels"], answer: 0, explain: "Logistic regression applies a sigmoid to the linear output to produce a probability." },
        ],
      },
    },

    // -------- Package 4 --------
    {
      slug: "decision-tree-splits",
      icon: "🌳",
      demoSlug: "decision-tree",
      mathSlug: "decision-tree",
      id: {
        title: "Paket 4 — Decision Tree & Overfitting",
        subtitle: "Keputusan bertingkat dan bahaya pohon terlalu dalam.",
        knowledge: {
          paragraphs: [
            "Decision tree membuat keputusan lewat serangkaian pertanyaan ya/tidak pada fitur. Tiap pemisahan (split) memilih fitur & ambang yang paling memisahkan kelas — sering diukur dengan impuritas Gini.",
            "Pohon yang dangkal mungkin terlalu sederhana (underfitting), tapi pohon yang terlalu dalam bisa menghafal data latih (overfitting) dan buruk pada data baru. Menyeimbangkan kedalaman adalah kunci.",
          ],
          keyPoints: [
            "Split memilih fitur & ambang dengan Gini terkecil.",
            "Terlalu dangkal = underfitting; terlalu dalam = overfitting.",
            "Keunggulan: mudah dijelaskan (interpretable).",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Persetujuan Pinjaman Mikro",
          scenario: [
            "Sebuah lembaga keuangan mikro ingin aturan persetujuan pinjaman yang bisa dijelaskan ke nasabah dan regulator.",
            "Decision tree menghasilkan aturan transparan (mis. 'jika penghasilan > X dan cicilan lain < Y, maka setujui'). Tim membatasi kedalaman pohon agar tidak overfitting pada kasus historis yang aneh.",
          ],
          takeaway: "Decision tree unggul saat keputusan harus transparan — tapi kedalaman harus dijaga agar tetap adil dan general.",
        },
        questions: [
          { q: "Kriteria umum untuk memilih split terbaik pada decision tree adalah…", options: ["Impuritas Gini terkecil", "Jarak Euclidean terbesar", "MSE tertinggi", "Reward maksimum"], answer: 0, explain: "Split dipilih agar tiap cabang semurni mungkin (Gini terkecil)." },
          { q: "Pohon yang terlalu dalam cenderung mengalami…", options: ["Overfitting", "Underfitting", "Konvergensi instan", "Kehilangan label"], answer: 0, explain: "Pohon terlalu dalam menghafal data latih dan buruk pada data baru — overfitting." },
          { q: "Keunggulan utama decision tree di kasus pinjaman adalah…", options: ["Mudah dijelaskan (interpretable)", "Selalu paling akurat", "Tidak butuh data", "Berjalan tanpa fitur"], answer: 0, explain: "Aturan pohon transparan dan mudah dijelaskan ke nasabah/regulator." },
        ],
      },
      en: {
        title: "Package 4 — Decision Trees & Overfitting",
        subtitle: "Stepwise decisions and the danger of too-deep trees.",
        knowledge: {
          paragraphs: [
            "A decision tree makes decisions via a series of yes/no questions on features. Each split picks the feature & threshold that best separates the classes — often measured by Gini impurity.",
            "A shallow tree may be too simple (underfitting), but a too-deep tree can memorize the training data (overfitting) and do poorly on new data. Balancing depth is key.",
          ],
          keyPoints: [
            "A split picks the feature & threshold with the lowest Gini.",
            "Too shallow = underfitting; too deep = overfitting.",
            "Strength: easy to explain (interpretable).",
          ],
        },
        caseStudy: {
          title: "Case Study: Micro-Loan Approval",
          scenario: [
            "A microfinance institution wants loan-approval rules explainable to customers and regulators.",
            "A decision tree yields transparent rules (e.g. 'if income > X and other installments < Y, approve'). The team limits tree depth to avoid overfitting to odd historical cases.",
          ],
          takeaway: "Decision trees shine when decisions must be transparent — but depth must be controlled to stay fair and general.",
        },
        questions: [
          { q: "A common criterion for the best split in a decision tree is…", options: ["Lowest Gini impurity", "Largest Euclidean distance", "Highest MSE", "Maximum reward"], answer: 0, explain: "A split is chosen so each branch is as pure as possible (lowest Gini)." },
          { q: "A too-deep tree tends to suffer from…", options: ["Overfitting", "Underfitting", "Instant convergence", "Losing labels"], answer: 0, explain: "Too-deep trees memorize training data and generalize poorly — overfitting." },
          { q: "The key strength of a decision tree in the loan case is…", options: ["It's easy to explain (interpretable)", "It's always the most accurate", "It needs no data", "It runs without features"], answer: 0, explain: "Tree rules are transparent and easy to explain to customers/regulators." },
        ],
      },
    },

    // -------- Package 5 --------
    {
      slug: "naive-bayes-probability",
      icon: "🎲",
      demoSlug: "naive-bayes",
      mathSlug: "naive-bayes",
      id: {
        title: "Paket 5 — Naive Bayes & Probabilitas",
        subtitle: "Klasifikasi berbasis peluang dengan teorema Bayes.",
        knowledge: {
          paragraphs: [
            "Naive Bayes mengklasifikasi dengan menghitung probabilitas tiap kelas menggunakan teorema Bayes, lalu memilih kelas dengan probabilitas tertinggi.",
            "Disebut 'naif' karena mengasumsikan tiap fitur saling independen — asumsi yang sering tidak sepenuhnya benar, namun anehnya bekerja sangat baik dalam praktik, terutama untuk klasifikasi teks.",
          ],
          keyPoints: [
            "Menggabungkan bukti tiap fitur lewat perkalian probabilitas.",
            "Asumsi independensi menyederhanakan perhitungan.",
            "Cepat, ringan, dan kuat untuk teks (mis. filter spam).",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Menyaring Email Spam",
          scenario: [
            "Sebuah kampus kebanjiran email spam. Tim IT membangun filter yang mempelajari kata-kata yang sering muncul di spam vs email sah.",
            "Naive Bayes menghitung: 'diberi kata-kata dalam email ini, lebih mungkin spam atau bukan?' — lalu memilih yang paling mungkin. Ringan dan cukup akurat untuk berjalan di server email.",
          ],
          takeaway: "Meski asumsinya sederhana, Naive Bayes adalah tulang punggung banyak filter spam klasik karena cepat dan efektif.",
        },
        questions: [
          { q: "Naive Bayes memilih kelas berdasarkan…", options: ["Probabilitas tertinggi (teorema Bayes)", "Jarak terdekat", "Reward terbesar", "Gradien terkecil"], answer: 0, explain: "Ia menghitung probabilitas tiap kelas lalu memilih yang tertinggi." },
          { q: "Mengapa disebut 'naif' (naive)?", options: ["Mengasumsikan fitur saling independen", "Tidak butuh data", "Selalu salah", "Hanya untuk gambar"], answer: 0, explain: "Asumsi independensi antar-fitur adalah bagian 'naif'-nya." },
          { q: "Naive Bayes sangat populer untuk tugas…", options: ["Klasifikasi teks (mis. spam)", "Menyeimbangkan tiang", "Deteksi tepi gambar", "Peramalan cuaca jangka panjang"], answer: 0, explain: "Ringan & efektif untuk teks — dasar banyak filter spam." },
        ],
      },
      en: {
        title: "Package 5 — Naive Bayes & Probability",
        subtitle: "Probability-based classification with Bayes' theorem.",
        knowledge: {
          paragraphs: [
            "Naive Bayes classifies by computing each class's probability using Bayes' theorem, then picking the class with the highest probability.",
            "It's called 'naive' because it assumes features are independent — an assumption often not fully true, yet it works surprisingly well in practice, especially for text classification.",
          ],
          keyPoints: [
            "Combines each feature's evidence via multiplying probabilities.",
            "The independence assumption simplifies the math.",
            "Fast, lightweight, and strong for text (e.g. spam filtering).",
          ],
        },
        caseStudy: {
          title: "Case Study: Filtering Spam Email",
          scenario: [
            "A campus is flooded with spam. The IT team builds a filter that learns which words appear often in spam vs legitimate email.",
            "Naive Bayes computes: 'given the words in this email, is it more likely spam or not?' — then picks the most likely. Light enough to run on the mail server.",
          ],
          takeaway: "Despite its simple assumption, Naive Bayes is the backbone of many classic spam filters because it's fast and effective.",
        },
        questions: [
          { q: "Naive Bayes picks a class based on…", options: ["Highest probability (Bayes' theorem)", "Nearest distance", "Largest reward", "Smallest gradient"], answer: 0, explain: "It computes each class's probability then picks the highest." },
          { q: "Why is it called 'naive'?", options: ["It assumes features are independent", "It needs no data", "It's always wrong", "It's only for images"], answer: 0, explain: "The between-feature independence assumption is the 'naive' part." },
          { q: "Naive Bayes is very popular for…", options: ["Text classification (e.g. spam)", "Balancing a pole", "Image edge detection", "Long-range weather forecasting"], answer: 0, explain: "Light & effective for text — the basis of many spam filters." },
        ],
      },
    },
  ],
};

// Helpers
export function getPackages(topic) {
  return guidedPackages[topic] || [];
}
export function getPackage(topic, slug) {
  return getPackages(topic).find((p) => p.slug === slug) || null;
}
export function allPackageParams() {
  const params = [];
  for (const topic of Object.keys(guidedPackages)) {
    for (const p of guidedPackages[topic]) {
      params.push({ slug: topic, pkg: p.slug });
    }
  }
  return params;
}
export function topicsWithPackages() {
  return Object.keys(guidedPackages);
}
