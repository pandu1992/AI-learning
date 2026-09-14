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
  "ai-overview": [
    // -------- Package 1 --------
    {
      slug: "what-is-ai",
      icon: "🧠",
      viz: {
        type: "pipeline",
        caption: { id: "Peta besar: AI ⊃ Machine Learning ⊃ Deep Learning; LLM adalah penerapannya.", en: "The big map: AI ⊃ Machine Learning ⊃ Deep Learning; LLMs are an application." },
        stages: [
          { icon: "🧠", label: { id: "AI", en: "AI" }, detail: { id: "Payung terbesar: membuat mesin melakukan tugas cerdas.", en: "The biggest umbrella: making machines do intelligent tasks." } },
          { icon: "📈", label: { id: "Machine Learning", en: "Machine Learning" }, detail: { id: "Bagian dari AI: mesin belajar pola dari data.", en: "A subset of AI: machines learn patterns from data." } },
          { icon: "🕸️", label: { id: "Deep Learning", en: "Deep Learning" }, detail: { id: "Bagian dari ML: jaringan saraf berlapis banyak.", en: "A subset of ML: many-layered neural networks." } },
          { icon: "💬", label: { id: "LLM", en: "LLM" }, detail: { id: "Penerapan deep learning untuk bahasa (mis. GPT).", en: "A deep-learning application for language (e.g. GPT)." } },
        ],
      },
      id: {
        title: "Paket 1 — Apa itu Artificial Intelligence?",
        subtitle: "Peta besar AI dan hubungan sub-bidangnya.",
        knowledge: {
          paragraphs: [
            "Artificial Intelligence (AI) adalah bidang ilmu komputer yang membuat mesin mampu melakukan tugas yang biasanya butuh kecerdasan manusia: mengenali gambar, memahami bahasa, mengambil keputusan, dan belajar dari pengalaman.",
            "AI adalah payung besar. Di dalamnya ada Machine Learning (ML). Di dalam ML ada Deep Learning (DL). Large Language Models (LLM) adalah penerapan deep learning untuk bahasa. Memahami peta ini membantu kita menempatkan tiap teknik pada posisinya.",
          ],
          keyPoints: [
            "AI ⊃ Machine Learning ⊃ Deep Learning.",
            "LLM = penerapan deep learning untuk bahasa.",
            "Tidak semua AI adalah machine learning (ada juga sistem berbasis aturan).",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Memilah Solusi untuk Sebuah Masalah",
          scenario: [
            "Sebuah startup ingin (a) memfilter komentar kasar, (b) memperkirakan penjualan bulan depan, dan (c) menjawab pertanyaan pelanggan dengan bahasa alami.",
            "Memahami peta AI membantu memilih pendekatan: klasifikasi teks (ML) untuk (a), regresi/peramalan (ML) untuk (b), dan LLM untuk (c). Tidak semua butuh deep learning — beberapa cukup dengan ML klasik yang murah.",
          ],
          takeaway: "Mengenali peta AI mencegah 'memakai palu untuk semua paku' — pilih teknik sesuai masalah.",
        },
        questions: [
          { q: "Manakah urutan yang benar dari yang paling luas ke paling sempit?", options: ["AI → Machine Learning → Deep Learning", "Deep Learning → AI → Machine Learning", "Machine Learning → AI → LLM", "LLM → Deep Learning → AI"], answer: 0, explain: "AI adalah payung terbesar; ML di dalamnya; Deep Learning di dalam ML." },
          { q: "LLM paling tepat digambarkan sebagai…", options: ["Penerapan deep learning untuk bahasa", "Jenis basis data", "Algoritma clustering", "Perangkat keras GPU"], answer: 0, explain: "LLM adalah model deep learning (berbasis Transformer) untuk memproses bahasa." },
          { q: "Pernyataan yang benar tentang AI dan machine learning:", options: ["Tidak semua AI adalah machine learning", "Semua AI pasti deep learning", "ML lebih luas daripada AI", "AI dan LLM adalah sinonim"], answer: 0, explain: "AI mencakup juga sistem berbasis aturan, bukan hanya yang belajar dari data." },
        ],
      },
      en: {
        title: "Package 1 — What is Artificial Intelligence?",
        subtitle: "The big map of AI and how its subfields relate.",
        knowledge: {
          paragraphs: [
            "Artificial Intelligence (AI) is the branch of computer science that lets machines do tasks normally requiring human intelligence: recognizing images, understanding language, making decisions, and learning from experience.",
            "AI is a big umbrella. Inside it is Machine Learning (ML). Inside ML is Deep Learning (DL). Large Language Models (LLM) are a deep-learning application for language. Understanding this map helps us place each technique correctly.",
          ],
          keyPoints: [
            "AI ⊃ Machine Learning ⊃ Deep Learning.",
            "LLM = a deep-learning application for language.",
            "Not all AI is machine learning (there are rule-based systems too).",
          ],
        },
        caseStudy: {
          title: "Case Study: Matching Solutions to a Problem",
          scenario: [
            "A startup wants to (a) filter toxic comments, (b) forecast next month's sales, and (c) answer customer questions in natural language.",
            "Understanding the AI map helps pick approaches: text classification (ML) for (a), regression/forecasting (ML) for (b), and an LLM for (c). Not everything needs deep learning — some are fine with cheap classic ML.",
          ],
          takeaway: "Knowing the AI map prevents 'using a hammer for every nail' — pick the technique that fits the problem.",
        },
        questions: [
          { q: "Which is the correct order from broadest to narrowest?", options: ["AI → Machine Learning → Deep Learning", "Deep Learning → AI → Machine Learning", "Machine Learning → AI → LLM", "LLM → Deep Learning → AI"], answer: 0, explain: "AI is the biggest umbrella; ML inside it; Deep Learning inside ML." },
          { q: "An LLM is best described as…", options: ["A deep-learning application for language", "A kind of database", "A clustering algorithm", "A GPU hardware device"], answer: 0, explain: "An LLM is a deep-learning (Transformer-based) model for processing language." },
          { q: "Which statement about AI and machine learning is true?", options: ["Not all AI is machine learning", "All AI is necessarily deep learning", "ML is broader than AI", "AI and LLM are synonyms"], answer: 0, explain: "AI also includes rule-based systems, not only things that learn from data." },
        ],
      },
    },

    // -------- Package 2 --------
    {
      slug: "types-of-learning",
      icon: "🧩",
      viz: {
        type: "pipeline",
        caption: { id: "Tiga cara belajar utama dalam machine learning.", en: "The three main ways of learning in machine learning." },
        stages: [
          { icon: "🏷️", label: { id: "Supervised", en: "Supervised" }, detail: { id: "Belajar dari data berlabel (fitur + jawaban).", en: "Learns from labeled data (features + answers)." } },
          { icon: "🔗", label: { id: "Unsupervised", en: "Unsupervised" }, detail: { id: "Menemukan struktur tanpa label (mis. cluster).", en: "Finds structure without labels (e.g. clusters)." } },
          { icon: "🎮", label: { id: "Reinforcement", en: "Reinforcement" }, detail: { id: "Belajar dari coba-coba lewat reward.", en: "Learns by trial and error via rewards." } },
        ],
      },
      id: {
        title: "Paket 2 — Tiga Jenis Pembelajaran",
        subtitle: "Supervised, Unsupervised, dan Reinforcement Learning.",
        knowledge: {
          paragraphs: [
            "Ada tiga cara utama mesin belajar. Supervised learning belajar dari data berlabel (ada 'jawaban'). Unsupervised learning menemukan pola pada data tanpa label. Reinforcement learning belajar dari coba-coba melalui reward dan hukuman.",
            "Memilih jenis yang tepat bergantung pada data dan tujuan. Punya label? Cenderung supervised. Ingin menemukan kelompok tersembunyi? Unsupervised. Ada agen yang mengambil aksi berurutan? Reinforcement.",
          ],
          keyPoints: [
            "Supervised = ada label; belajar memetakan input → output.",
            "Unsupervised = tanpa label; menemukan struktur.",
            "Reinforcement = agen + reward; belajar dari interaksi.",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Tiga Masalah di Satu Perusahaan Logistik",
          scenario: [
            "Sebuah perusahaan logistik menghadapi: (1) memprediksi paket yang berisiko terlambat (punya data historis berlabel), (2) mengelompokkan pelanggan berdasarkan pola pengiriman (tanpa label), dan (3) mengatur rute armada yang berubah tiap hari.",
            "Solusinya berbeda-beda: (1) supervised, (2) unsupervised, (3) reinforcement learning. Satu perusahaan, tiga jenis pembelajaran.",
          ],
          takeaway: "Jenis pembelajaran ditentukan oleh bentuk data dan tujuan — bukan oleh selera teknologi.",
        },
        questions: [
          { q: "Anda punya 10.000 email yang sudah ditandai spam/bukan, dan ingin memprediksi email baru. Jenis pembelajaran?", options: ["Supervised learning", "Unsupervised learning", "Reinforcement learning", "Tidak butuh pembelajaran"], answer: 0, explain: "Ada label (spam/bukan) dan tujuannya memprediksi — supervised." },
          { q: "Mengelompokkan pelanggan tanpa kategori awal termasuk…", options: ["Unsupervised learning", "Supervised learning", "Reinforcement learning", "Regresi linear"], answer: 0, explain: "Tanpa label, tujuannya menemukan kelompok — unsupervised." },
          { q: "Ciri khas reinforcement learning adalah…", options: ["Agen belajar dari reward atas aksinya", "Selalu butuh jutaan label", "Tidak pernah butuh data", "Hanya untuk gambar"], answer: 0, explain: "RL berpusat pada agen yang memaksimalkan reward dari interaksi." },
        ],
      },
      en: {
        title: "Package 2 — The Three Types of Learning",
        subtitle: "Supervised, Unsupervised, and Reinforcement Learning.",
        knowledge: {
          paragraphs: [
            "There are three main ways machines learn. Supervised learning learns from labeled data (there are 'answers'). Unsupervised learning finds patterns in unlabeled data. Reinforcement learning learns by trial and error through rewards and penalties.",
            "Choosing the right type depends on your data and goal. Have labels? Likely supervised. Want to find hidden groups? Unsupervised. Have an agent taking sequential actions? Reinforcement.",
          ],
          keyPoints: [
            "Supervised = labels present; learn input → output mapping.",
            "Unsupervised = no labels; find structure.",
            "Reinforcement = agent + rewards; learn from interaction.",
          ],
        },
        caseStudy: {
          title: "Case Study: Three Problems at One Logistics Company",
          scenario: [
            "A logistics company faces: (1) predicting packages at risk of being late (has labeled history), (2) grouping customers by shipping patterns (no labels), and (3) routing a fleet that changes daily.",
            "The solutions differ: (1) supervised, (2) unsupervised, (3) reinforcement learning. One company, three learning types.",
          ],
          takeaway: "The learning type is set by the shape of your data and your goal — not by tech fashion.",
        },
        questions: [
          { q: "You have 10,000 emails labeled spam/not and want to predict new ones. Learning type?", options: ["Supervised learning", "Unsupervised learning", "Reinforcement learning", "No learning needed"], answer: 0, explain: "Labels exist (spam/not) and the goal is prediction — supervised." },
          { q: "Grouping customers with no prior categories is…", options: ["Unsupervised learning", "Supervised learning", "Reinforcement learning", "Linear regression"], answer: 0, explain: "Without labels, the goal is to find groups — unsupervised." },
          { q: "A hallmark of reinforcement learning is…", options: ["An agent learning from rewards for its actions", "Always needing millions of labels", "Never needing data", "Being only for images"], answer: 0, explain: "RL centers on an agent maximizing reward from interaction." },
        ],
      },
    },

    // -------- Package 3 --------
    {
      slug: "ai-workflow",
      icon: "🔄",
      viz: {
        type: "pipeline",
        caption: { id: "Alur kerja proyek AI dari data hingga pemantauan.", en: "The AI project workflow from data to monitoring." },
        stages: [
          { icon: "🗂️", label: { id: "Data", en: "Data" }, detail: { id: "Mengumpulkan & membersihkan data — sering langkah terlama.", en: "Collect & clean data — often the longest step." } },
          { icon: "🧪", label: { id: "Latih", en: "Train" }, detail: { id: "Model belajar pola dari data latih.", en: "The model learns patterns from training data." } },
          { icon: "📏", label: { id: "Evaluasi", en: "Evaluate" }, detail: { id: "Uji pada data yang belum pernah dilihat.", en: "Test on data it has never seen." } },
          { icon: "🚀", label: { id: "Terapkan", en: "Deploy" }, detail: { id: "Model dipakai untuk memprediksi data nyata.", en: "The model is used to predict real data." } },
          { icon: "📡", label: { id: "Pantau", en: "Monitor" }, detail: { id: "Awasi performa; latih ulang bila menurun.", en: "Watch performance; retrain if it degrades." } },
        ],
      },
      id: {
        title: "Paket 3 — Alur Kerja Proyek AI",
        subtitle: "Dari data mentah hingga model yang dipantau.",
        knowledge: {
          paragraphs: [
            "Membangun AI bukan hanya soal memilih algoritma. Alur kerjanya: kumpulkan & bersihkan data → latih model → evaluasi pada data yang belum dilihat → terapkan (deploy) → pantau performa.",
            "Kesalahan umum pemula: langsung fokus ke model. Padahal, pengumpulan & pembersihan data sering memakan porsi terbesar, dan pemantauan setelah deploy penting karena performa bisa menurun seiring waktu (data drift).",
          ],
          keyPoints: [
            "Data sering menyita waktu terbanyak, bukan modelnya.",
            "Evaluasi harus di data yang belum pernah dilihat model.",
            "Setelah deploy, model perlu dipantau & bisa dilatih ulang.",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Model yang 'Pintar' di Lab, Gagal di Lapangan",
          scenario: [
            "Sebuah tim membangun model prediksi permintaan yang akurat 95% saat diuji. Namun tiga bulan setelah deploy, akurasinya anjlok.",
            "Ternyata perilaku pelanggan berubah (data drift) dan tak ada yang memantau. Setelah menambahkan pemantauan dan pelatihan ulang berkala, performa pulih. Pelajaran: siklus AI tidak berhenti saat model jadi.",
          ],
          takeaway: "Deploy bukan garis akhir — tanpa pemantauan, model yang baik pun bisa memburuk diam-diam.",
        },
        questions: [
          { q: "Langkah mana yang sering memakan waktu paling banyak dalam proyek AI nyata?", options: ["Mengumpulkan & membersihkan data", "Menamai variabel", "Memilih warna grafik", "Menulis judul laporan"], answer: 0, explain: "Data yang berkualitas & rapi biasanya menyita porsi kerja terbesar." },
          { q: "Mengapa model dievaluasi pada data yang belum pernah dilihat?", options: ["Untuk menguji kemampuan generalisasi", "Agar lebih cepat", "Agar akurasi selalu 100%", "Karena data latih hilang"], answer: 0, explain: "Menguji pada data baru mengukur apakah model benar-benar belajar, bukan menghafal." },
          { q: "Menurunnya performa model seiring perubahan data nyata disebut…", options: ["Data/model drift", "Overfitting instan", "Konvergensi", "Tokenisasi"], answer: 0, explain: "Drift adalah saat distribusi data berubah sehingga model jadi kurang akurat." },
        ],
      },
      en: {
        title: "Package 3 — The AI Project Workflow",
        subtitle: "From raw data to a monitored model.",
        knowledge: {
          paragraphs: [
            "Building AI isn't just picking an algorithm. The workflow: collect & clean data → train the model → evaluate on unseen data → deploy → monitor performance.",
            "A common beginner mistake: jumping straight to the model. In reality, data collection & cleaning often takes the biggest share, and post-deployment monitoring matters because performance can degrade over time (data drift).",
          ],
          keyPoints: [
            "Data often takes the most time, not the model.",
            "Evaluate on data the model has never seen.",
            "After deploy, the model needs monitoring & possible retraining.",
          ],
        },
        caseStudy: {
          title: "Case Study: A Model 'Smart' in the Lab, Failing in the Field",
          scenario: [
            "A team built a demand-prediction model that was 95% accurate in testing. But three months after deployment, its accuracy plunged.",
            "It turned out customer behavior shifted (data drift) and no one was monitoring. After adding monitoring and periodic retraining, performance recovered. Lesson: the AI cycle doesn't stop when the model is built.",
          ],
          takeaway: "Deployment isn't the finish line — without monitoring, even a good model can quietly degrade.",
        },
        questions: [
          { q: "Which step often takes the most time in a real AI project?", options: ["Collecting & cleaning data", "Naming variables", "Choosing chart colors", "Writing the report title"], answer: 0, explain: "High-quality, tidy data usually takes the biggest share of the work." },
          { q: "Why evaluate a model on data it has never seen?", options: ["To test generalization", "To make it faster", "So accuracy is always 100%", "Because training data was lost"], answer: 0, explain: "Testing on new data measures whether the model truly learned, not memorized." },
          { q: "A model's performance declining as real data shifts is called…", options: ["Data/model drift", "Instant overfitting", "Convergence", "Tokenization"], answer: 0, explain: "Drift is when the data distribution changes so the model becomes less accurate." },
        ],
      },
    },

    // -------- Package 4 --------
    {
      slug: "ai-ethics",
      icon: "⚖️",
      viz: {
        type: "pipeline",
        caption: { id: "Sumber bias bisa masuk di banyak titik pipeline AI.", en: "Bias can enter at many points of the AI pipeline." },
        stages: [
          { icon: "🗂️", label: { id: "Data bias", en: "Biased data" }, detail: { id: "Data historis bisa mewarisi ketidakadilan masa lalu.", en: "Historical data can inherit past unfairness." } },
          { icon: "🧪", label: { id: "Model belajar bias", en: "Model learns bias" }, detail: { id: "Model meniru pola dalam data, termasuk yang bias.", en: "The model mirrors patterns in data, including biased ones." } },
          { icon: "⚖️", label: { id: "Keputusan tak adil", en: "Unfair decision" }, detail: { id: "Prediksi bisa merugikan kelompok tertentu.", en: "Predictions may harm certain groups." } },
          { icon: "🔍", label: { id: "Audit & perbaiki", en: "Audit & fix" }, detail: { id: "Uji keadilan lintas kelompok & perbaiki data/model.", en: "Test fairness across groups & fix data/model." } },
        ],
      },
      id: {
        title: "Paket 4 — Etika & Bias dalam AI",
        subtitle: "Mengapa 'akurat' saja tidak cukup.",
        knowledge: {
          paragraphs: [
            "Model AI belajar dari data. Jika data mencerminkan ketidakadilan masa lalu, model bisa mewarisi dan bahkan memperkuat bias itu — meski akurasinya tinggi secara keseluruhan.",
            "Karena itu, sistem AI yang bertanggung jawab memerlukan: data yang representatif, audit keadilan lintas kelompok, transparansi, dan sering kali 'human-in-the-loop' untuk keputusan berisiko tinggi.",
          ],
          keyPoints: [
            "Bias data → bias model → keputusan tak adil.",
            "Akurasi tinggi bisa menyembunyikan ketidakadilan pada kelompok kecil.",
            "Audit keadilan & pengawasan manusia itu penting.",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Sistem Seleksi Lamaran yang Bias",
          scenario: [
            "Sebuah perusahaan memakai AI untuk menyaring lamaran kerja, dilatih dari data perekrutan 10 tahun terakhir. Model tampak akurat, tetapi diam-diam menurunkan skor pelamar dari kelompok tertentu.",
            "Penyebabnya: data historis mencerminkan bias masa lalu. Setelah audit keadilan dan perbaikan data + fitur, sistem dibuat lebih adil, dan keputusan akhir tetap ditinjau perekrut manusia.",
          ],
          takeaway: "Model 'akurat' bisa tetap tidak adil. Audit keadilan dan pengawasan manusia adalah bagian wajib AI yang bertanggung jawab.",
        },
        questions: [
          { q: "Dari mana bias dalam model AI paling sering berasal?", options: ["Dari data pelatihan yang bias", "Dari warna antarmuka", "Dari kecepatan internet", "Dari nama variabel"], answer: 0, explain: "Model meniru pola dalam datanya; data yang bias menghasilkan model yang bias." },
          { q: "Mengapa akurasi tinggi secara keseluruhan bisa menyesatkan?", options: ["Bisa menyembunyikan ketidakadilan pada kelompok kecil", "Selalu berarti model sempurna", "Berarti tidak perlu audit", "Menjamin keadilan"], answer: 0, explain: "Rata-rata bagus bisa menutupi performa buruk/tak adil pada subkelompok tertentu." },
          { q: "Praktik yang mendukung AI bertanggung jawab adalah…", options: ["Audit keadilan + human-in-the-loop", "Menyembunyikan cara kerja model", "Mengabaikan kelompok minoritas", "Memakai data sesedikit mungkin"], answer: 0, explain: "Audit lintas kelompok dan pengawasan manusia menjaga keadilan & akuntabilitas." },
        ],
      },
      en: {
        title: "Package 4 — Ethics & Bias in AI",
        subtitle: "Why 'accurate' alone is not enough.",
        knowledge: {
          paragraphs: [
            "AI models learn from data. If the data reflects past unfairness, the model can inherit and even amplify that bias — even with high overall accuracy.",
            "So responsible AI systems need: representative data, fairness audits across groups, transparency, and often a 'human-in-the-loop' for high-stakes decisions.",
          ],
          keyPoints: [
            "Biased data → biased model → unfair decisions.",
            "High accuracy can hide unfairness for small groups.",
            "Fairness audits & human oversight matter.",
          ],
        },
        caseStudy: {
          title: "Case Study: A Biased Résumé-Screening System",
          scenario: [
            "A company used AI to screen job applications, trained on 10 years of hiring data. The model looked accurate, but quietly lowered scores for applicants from certain groups.",
            "The cause: historical data reflected past bias. After a fairness audit and fixing data + features, the system became fairer, and final decisions stayed with human recruiters.",
          ],
          takeaway: "An 'accurate' model can still be unfair. Fairness audits and human oversight are a required part of responsible AI.",
        },
        questions: [
          { q: "Where does bias in an AI model most often come from?", options: ["From biased training data", "From the interface colors", "From internet speed", "From variable names"], answer: 0, explain: "Models mirror patterns in their data; biased data yields a biased model." },
          { q: "Why can high overall accuracy be misleading?", options: ["It can hide unfairness for small groups", "It always means the model is perfect", "It means no audit is needed", "It guarantees fairness"], answer: 0, explain: "A good average can mask poor/unfair performance on specific subgroups." },
          { q: "A practice that supports responsible AI is…", options: ["Fairness audits + human-in-the-loop", "Hiding how the model works", "Ignoring minority groups", "Using as little data as possible"], answer: 0, explain: "Cross-group audits and human oversight protect fairness & accountability." },
        ],
      },
    },

    // -------- Package 5 --------
    {
      slug: "ai-in-daily-life",
      icon: "🌍",
      viz: {
        type: "timeline",
        caption: { id: "AI hadir di banyak momen sehari-hari — klik tiap titik.", en: "AI is present in many everyday moments — click each point." },
        milestones: [
          { when: { id: "Pagi", en: "Morning" }, title: { id: "Rekomendasi & filter", en: "Recommendations & filters" }, detail: { id: "Feed media sosial & email spam disaring oleh model ML.", en: "Social feeds & spam email are filtered by ML models." } },
          { when: { id: "Siang", en: "Midday" }, title: { id: "Navigasi & terjemahan", en: "Navigation & translation" }, detail: { id: "Peta memilih rute; terjemahan otomatis pakai model bahasa.", en: "Maps pick routes; auto-translation uses language models." } },
          { when: { id: "Sore", en: "Afternoon" }, title: { id: "Pembayaran aman", en: "Safe payments" }, detail: { id: "Deteksi penipuan menilai transaksi dalam milidetik.", en: "Fraud detection scores transactions in milliseconds." } },
          { when: { id: "Malam", en: "Evening" }, title: { id: "Asisten & rekomendasi", en: "Assistants & recommendations" }, detail: { id: "Asisten suara & rekomendasi film ditenagai AI.", en: "Voice assistants & movie recommendations are AI-powered." } },
        ],
      },
      id: {
        title: "Paket 5 — AI dalam Kehidupan Sehari-hari",
        subtitle: "Mengenali AI yang sudah ada di sekitar kita.",
        knowledge: {
          paragraphs: [
            "AI bukan sesuatu yang futuristik semata — ia sudah ada di banyak momen harian: filter spam, rekomendasi konten, navigasi peta, terjemahan otomatis, deteksi penipuan, dan asisten suara.",
            "Mengenali AI di sekitar kita membantu kita menjadi pengguna yang lebih kritis: memahami kapan sebuah keputusan dibuat oleh model, apa keterbatasannya, dan kapan harus mempertanyakannya.",
          ],
          keyPoints: [
            "AI sudah tertanam di aplikasi sehari-hari.",
            "Rekomendasi, filter, navigasi, dan pembayaran sering ditenagai AI.",
            "Pengguna yang sadar-AI lebih kritis terhadap keputusan otomatis.",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Sehari Bersama AI Tanpa Disadari",
          scenario: [
            "Seorang mahasiswa membuka aplikasi: feed-nya diurutkan model rekomendasi, email spam sudah tersaring, peta memilih rute tercepat, dan pembayaran e-wallet-nya lolos setelah dinilai sistem deteksi penipuan.",
            "Semua ini terjadi tanpa ia sadari melibatkan AI. Mengenalinya membuatnya lebih memahami mengapa ia melihat konten tertentu — dan lebih waspada terhadap 'gelembung' rekomendasi.",
          ],
          takeaway: "AI paling berpengaruh justru yang tak terlihat. Kesadaran akan kehadirannya adalah literasi digital penting.",
        },
        questions: [
          { q: "Manakah contoh AI dalam kehidupan sehari-hari?", options: ["Filter spam & rekomendasi konten", "Menyalakan lampu dengan sakelar", "Menulis di buku catatan", "Menyeduh kopi manual"], answer: 0, explain: "Filter spam dan rekomendasi ditenagai model machine learning." },
          { q: "Mengapa penting menyadari AI di sekitar kita?", options: ["Agar menjadi pengguna yang lebih kritis", "Agar berhenti memakai teknologi", "Karena AI selalu benar", "Agar tidak perlu belajar"], answer: 0, explain: "Kesadaran membantu kita memahami & mempertanyakan keputusan otomatis." },
          { q: "'Gelembung rekomendasi' merujuk pada…", options: ["Kita hanya melihat konten serupa yang dipilih model", "Kesalahan koneksi internet", "Jenis kunci enkripsi", "Metode pembersihan data"], answer: 0, explain: "Sistem rekomendasi bisa mempersempit ragam konten yang kita lihat." },
        ],
      },
      en: {
        title: "Package 5 — AI in Everyday Life",
        subtitle: "Recognizing the AI already around us.",
        knowledge: {
          paragraphs: [
            "AI isn't purely futuristic — it's already in many daily moments: spam filters, content recommendations, map navigation, auto-translation, fraud detection, and voice assistants.",
            "Recognizing the AI around us helps us become more critical users: understanding when a decision is made by a model, what its limits are, and when to question it.",
          ],
          keyPoints: [
            "AI is embedded in everyday apps.",
            "Recommendations, filters, navigation, and payments are often AI-powered.",
            "AI-aware users are more critical of automated decisions.",
          ],
        },
        caseStudy: {
          title: "Case Study: A Day With AI Without Noticing",
          scenario: [
            "A student opens their apps: the feed is ordered by a recommender, spam is already filtered, the map picks the fastest route, and the e-wallet payment clears after a fraud-detection system scores it.",
            "All of this happens without them realizing AI is involved. Recognizing it helps them understand why they see certain content — and stay wary of recommendation 'bubbles'.",
          ],
          takeaway: "The most influential AI is often invisible. Awareness of its presence is an important digital literacy.",
        },
        questions: [
          { q: "Which is an example of AI in daily life?", options: ["Spam filters & content recommendations", "Turning on a light with a switch", "Writing in a notebook", "Manually brewing coffee"], answer: 0, explain: "Spam filters and recommendations are powered by machine-learning models." },
          { q: "Why is it important to be aware of AI around us?", options: ["To become a more critical user", "To stop using technology", "Because AI is always right", "So we never have to learn"], answer: 0, explain: "Awareness helps us understand & question automated decisions." },
          { q: "A recommendation 'bubble' refers to…", options: ["Seeing only similar content the model picks", "An internet connection error", "A type of encryption key", "A data-cleaning method"], answer: 0, explain: "Recommender systems can narrow the range of content we see." },
        ],
      },
    },

    // -------- Package: Intelligent Agents --------
    {
      slug: "intelligent-agents",
      icon: "🤖",
      viz: {
        type: "pipeline",
        caption: { id: "Siklus agen–lingkungan: menangkap → berpikir → bertindak → lingkungan berubah.", en: "The agent–environment loop: perceive → think → act → environment changes." },
        stages: [
          { icon: "👁️", label: { id: "Persepsi", en: "Perceive" }, detail: { id: "Sensor membaca keadaan lingkungan (percept).", en: "Sensors read the environment's state (a percept)." } },
          { icon: "🧠", label: { id: "Program Agen", en: "Agent Program" }, detail: { id: "Memetakan persepsi → aksi (mungkin pakai memori/tujuan).", en: "Maps percept → action (maybe using memory/goals)." } },
          { icon: "🦾", label: { id: "Aksi", en: "Act" }, detail: { id: "Aktuator menjalankan aksi yang dipilih.", en: "Actuators carry out the chosen action." } },
          { icon: "🌍", label: { id: "Lingkungan Berubah", en: "Environment Changes" }, detail: { id: "Keadaan baru dipersepsi pada putaran berikutnya.", en: "The new state is perceived on the next round." } },
        ],
      },
      id: {
        title: "Paket — Agen Cerdas & Lingkungan",
        subtitle: "Konsep agen, lingkungan, sensor & aktuator — fondasi banyak sistem AI.",
        knowledge: {
          paragraphs: [
            "Banyak sistem AI paling mudah dipahami sebagai AGEN: sesuatu yang menangkap (persepsi) lingkungannya lewat SENSOR dan bertindak lewat AKTUATOR. Lingkungan adalah 'dunia' tempat agen beroperasi, dan keadaannya berubah akibat aksi agen.",
            "Siklusnya berulang: lingkungan → persepsi (sensor) → program agen memilih aksi → aktuator bertindak → lingkungan berubah. Jenis agen berkisar dari refleks sederhana hingga agen yang belajar. Sifat lingkungan (terobservasi penuh/sebagian, deterministik/stokastik, statis/dinamis, dst.) menentukan seberapa sulit tugasnya.",
          ],
          keyPoints: [
            "Agen = sensor (persepsi) + program agen + aktuator (aksi).",
            "Aksi agen mengubah lingkungan; keadaan baru dipersepsi lagi (loop).",
            "Jenis agen: refleks sederhana → berbasis model → berbasis tujuan → berbasis utilitas → belajar.",
            "Sifat lingkungan menentukan kesulitan & jenis agen yang dibutuhkan.",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Penyedot Debu Robotik",
          scenario: [
            "Sebuah penyedot debu robotik memakai sensor untuk mendeteksi apakah petak lantai kotor dan di mana posisinya. Program agennya memutuskan: bila kotor → isap; bila bersih → pindah. Aktuator (roda & pengisap) menjalankan aksi, lalu lantai berubah menjadi bersih.",
            "Ini contoh agen sederhana pada lingkungan yang terobservasi sebagian (hanya tahu petak saat ini). Menambahkan memori (model dunia) atau tujuan (membersihkan seluruh ruangan seefisien mungkin) membuatnya lebih canggih.",
          ],
          takeaway: "Memandang AI sebagai 'agen dalam lingkungan' memberi kerangka yang sama untuk termostat, mobil otonom, hingga agen Reinforcement Learning.",
        },
        questions: [
          { q: "Sensor pada sebuah agen berfungsi untuk…", options: ["Menangkap keadaan lingkungan (persepsi)", "Menjalankan aksi ke lingkungan", "Menyimpan kode program", "Memberi reward"], answer: 0, explain: "Sensor adalah cara agen menerima persepsi dari lingkungan; aktuator yang menjalankan aksi." },
          { q: "Urutan siklus agen yang benar adalah…", options: ["Persepsi (sensor) → program agen → aksi (aktuator) → lingkungan berubah", "Aksi → sensor → reward → tujuan", "Program agen → sensor → memori → selesai", "Lingkungan → aktuator → sensor → berhenti"], answer: 0, explain: "Agen menangkap lewat sensor, memutuskan, bertindak lewat aktuator, lalu lingkungan berubah — berulang." },
          { q: "Lingkungan yang 'terobservasi sebagian' berarti…", options: ["Agen tidak bisa melihat seluruh keadaan sekaligus", "Lingkungan tidak pernah berubah", "Tidak ada agen lain", "Aksi selalu pasti hasilnya"], answer: 0, explain: "Terobservasi sebagian: sensor tidak menangkap seluruh keadaan, sehingga agen sering butuh memori." },
          { q: "Agen berbasis utilitas berbeda dari agen berbasis tujuan karena…", options: ["Menilai seberapa BAIK suatu keadaan, bukan sekadar tercapai/tidak", "Tidak butuh sensor", "Selalu lebih lambat", "Hanya bekerja di catur"], answer: 0, explain: "Agen utilitas memaksimalkan fungsi utilitas (menimbang trade-off), bukan hanya mencapai tujuan biner." },
        ],
      },
      en: {
        title: "Package — Intelligent Agents & Environments",
        subtitle: "Agent, environment, sensors & actuators — the foundation of many AI systems.",
        knowledge: {
          paragraphs: [
            "Many AI systems are easiest to understand as AGENTS: something that perceives its environment through SENSORS and acts on it through ACTUATORS. The environment is the 'world' the agent operates in, and its state changes because of the agent's actions.",
            "The cycle repeats: environment → perception (sensors) → the agent program picks an action → actuators act → the environment changes. Agent types range from simple reflex to learning agents. Environment properties (fully/partially observable, deterministic/stochastic, static/dynamic, etc.) decide how hard the task is.",
          ],
          keyPoints: [
            "Agent = sensors (perception) + agent program + actuators (action).",
            "The agent's action changes the environment; the new state is perceived again (a loop).",
            "Agent types: simple reflex → model-based → goal-based → utility-based → learning.",
            "Environment properties set the difficulty & the kind of agent needed.",
          ],
        },
        caseStudy: {
          title: "Case Study: A Robot Vacuum",
          scenario: [
            "A robot vacuum uses sensors to detect whether its floor tile is dirty and where it is. Its agent program decides: if dirty → suck; if clean → move. The actuators (wheels & suction) carry out the action, and the floor becomes clean.",
            "This is a simple agent in a partially observable environment (it only knows its current tile). Adding memory (a world model) or a goal (clean the whole room as efficiently as possible) makes it more sophisticated.",
          ],
          takeaway: "Viewing AI as an 'agent in an environment' gives one framework for thermostats, self-driving cars, and Reinforcement Learning agents alike.",
        },
        questions: [
          { q: "An agent's sensors are used to…", options: ["Perceive the environment's state (percepts)", "Carry out actions on the environment", "Store program code", "Give out rewards"], answer: 0, explain: "Sensors are how an agent receives percepts; actuators carry out actions." },
          { q: "The correct agent cycle order is…", options: ["Perception (sensors) → agent program → action (actuators) → environment changes", "Action → sensors → reward → goal", "Agent program → sensors → memory → done", "Environment → actuators → sensors → stop"], answer: 0, explain: "The agent perceives via sensors, decides, acts via actuators, then the environment changes — repeating." },
          { q: "A 'partially observable' environment means…", options: ["The agent can't see the whole state at once", "The environment never changes", "There are no other agents", "Actions always have certain outcomes"], answer: 0, explain: "Partially observable: sensors don't capture the full state, so the agent often needs memory." },
          { q: "A utility-based agent differs from a goal-based agent because it…", options: ["Rates HOW GOOD a state is, not just reached/not", "Needs no sensors", "Is always slower", "Only works in chess"], answer: 0, explain: "A utility agent maximizes a utility function (weighing trade-offs), not just a binary goal." },
        ],
      },
    },
  ],

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

  "deep-learning": [
    // -------- Package 1 --------
    {
      slug: "neural-network-basics",
      icon: "🧠",
      demoSlug: "neural-network",
      mathSlug: "neural-network",
      id: {
        title: "Paket 1 — Dasar Jaringan Saraf",
        subtitle: "Neuron, lapisan, dan cara jaringan belajar.",
        knowledge: {
          paragraphs: [
            "Jaringan saraf tiruan tersusun dari unit kecil (neuron) yang terhubung dalam lapisan. Tiap neuron menghitung jumlah berbobot dari inputnya lalu melewatkannya ke fungsi aktivasi.",
            "Jaringan belajar dengan menyesuaikan bobot melalui backpropagation dan gradient descent: menebak, mengukur kesalahan (loss), lalu menggeser bobot sedikit demi sedikit agar loss mengecil. Lapisan tersembunyi memungkinkan jaringan menangkap pola non-linear yang rumit.",
          ],
          keyPoints: [
            "Neuron = jumlah berbobot + fungsi aktivasi.",
            "Lapisan tersembunyi menangkap pola non-linear.",
            "Belajar = backpropagation + gradient descent memperkecil loss.",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Memisahkan Pola yang Tak Bisa Digaris Lurus",
          scenario: [
            "Sebuah tim mencoba memisahkan dua kelas data berbentuk lingkaran di dalam lingkaran. Model linear sederhana gagal karena batasnya lurus.",
            "Dengan menambahkan lapisan tersembunyi dan fungsi aktivasi non-linear, jaringan saraf berhasil membentuk batas melengkung yang memisahkan kedua kelas. Coba demo di bagian atas: naikkan jumlah neuron dan amati batas keputusan berubah.",
          ],
          takeaway: "Kekuatan jaringan saraf datang dari non-linearitas — kemampuannya menekuk batas keputusan sesuai bentuk data.",
        },
        questions: [
          { q: "Apa yang dihitung sebuah neuron sebelum fungsi aktivasi?", options: ["Jumlah berbobot dari input", "Jarak Euclidean", "Impuritas Gini", "Reward"], answer: 0, explain: "Neuron menghitung Σ(wᵢ·xᵢ)+b, lalu melewatkannya ke aktivasi." },
          { q: "Peran lapisan tersembunyi adalah…", options: ["Menangkap pola non-linear yang rumit", "Menyimpan data mentah", "Mengganti kebutuhan data", "Mempercepat internet"], answer: 0, explain: "Lapisan tersembunyi + aktivasi non-linear memungkinkan batas keputusan melengkung." },
          { q: "Proses menyesuaikan bobot berdasarkan kesalahan disebut…", options: ["Backpropagation + gradient descent", "Clustering", "Tokenisasi", "Konvolusi"], answer: 0, explain: "Backpropagation menghitung gradien loss; gradient descent memperbarui bobot." },
        ],
      },
      en: {
        title: "Package 1 — Neural Network Basics",
        subtitle: "Neurons, layers, and how a network learns.",
        knowledge: {
          paragraphs: [
            "Artificial neural networks are built from small units (neurons) connected in layers. Each neuron computes a weighted sum of its inputs, then passes it through an activation function.",
            "The network learns by adjusting weights via backpropagation and gradient descent: guess, measure the error (loss), then nudge weights bit by bit to shrink the loss. Hidden layers let the network capture complex non-linear patterns.",
          ],
          keyPoints: [
            "Neuron = weighted sum + activation function.",
            "Hidden layers capture non-linear patterns.",
            "Learning = backpropagation + gradient descent reducing loss.",
          ],
        },
        caseStudy: {
          title: "Case Study: Separating Patterns You Can't Draw with a Straight Line",
          scenario: [
            "A team tries to separate two classes shaped as a circle inside a circle. A simple linear model fails because its boundary is straight.",
            "By adding a hidden layer and a non-linear activation, the neural network forms a curved boundary that separates the classes. Try the demo above: increase the neuron count and watch the boundary change.",
          ],
          takeaway: "A neural network's power comes from non-linearity — its ability to bend the decision boundary to the data's shape.",
        },
        questions: [
          { q: "What does a neuron compute before the activation function?", options: ["A weighted sum of inputs", "Euclidean distance", "Gini impurity", "A reward"], answer: 0, explain: "A neuron computes Σ(wᵢ·xᵢ)+b, then passes it to the activation." },
          { q: "The role of hidden layers is to…", options: ["Capture complex non-linear patterns", "Store raw data", "Replace the need for data", "Speed up the internet"], answer: 0, explain: "Hidden layers + non-linear activation allow curved decision boundaries." },
          { q: "Adjusting weights based on error is called…", options: ["Backpropagation + gradient descent", "Clustering", "Tokenization", "Convolution"], answer: 0, explain: "Backpropagation computes loss gradients; gradient descent updates the weights." },
        ],
      },
    },

    // -------- Package 2 --------
    {
      slug: "activation-nonlinearity",
      icon: "⚡",
      demoSlug: "activation-functions",
      mathSlug: "activation-functions",
      id: {
        title: "Paket 2 — Fungsi Aktivasi & Non-linearitas",
        subtitle: "Mengapa ReLU, sigmoid, dan tanh penting.",
        knowledge: {
          paragraphs: [
            "Fungsi aktivasi menambahkan non-linearitas ke jaringan. Tanpanya, menumpuk banyak lapisan linear tetap setara dengan satu lapisan linear — jaringan tak bisa mempelajari pola rumit.",
            "ReLU sederhana & cepat (mengembalikan 0 untuk nilai negatif). Sigmoid dan tanh 'menghaluskan' output ke rentang tertentu (0..1 atau -1..1), berguna di lapisan tertentu. Pilihan aktivasi memengaruhi kecepatan dan kualitas pelatihan.",
          ],
          keyPoints: [
            "Tanpa aktivasi non-linear, banyak lapisan = satu lapisan linear.",
            "ReLU: sederhana, cepat, populer di lapisan tersembunyi.",
            "Sigmoid/tanh: membatasi output ke rentang tertentu.",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Jaringan yang 'Macet' Belajar",
          scenario: [
            "Sebuah tim membangun jaringan dalam tanpa fungsi aktivasi non-linear. Meski ditambah banyak lapisan, akurasinya tak kunjung membaik.",
            "Setelah menambahkan ReLU di antara lapisan, jaringan mulai mempelajari pola kompleks dan akurasi melonjak. Coba demo aktivasi di atas untuk membandingkan bentuk ReLU, sigmoid, dan tanh.",
          ],
          takeaway: "Aktivasi non-linear bukan detail kecil — ia yang membuat 'deep' learning benar-benar bekerja.",
        },
        questions: [
          { q: "Apa yang terjadi jika jaringan dalam TIDAK memakai aktivasi non-linear?", options: ["Setara dengan satu lapisan linear", "Menjadi lebih akurat", "Berjalan tanpa data", "Menjadi CNN otomatis"], answer: 0, explain: "Komposisi fungsi linear tetap linear; non-linearitas dibutuhkan untuk pola kompleks." },
          { q: "Ciri ReLU adalah…", options: ["Mengembalikan 0 untuk input negatif, nilai itu sendiri untuk positif", "Selalu antara -1 dan 1", "Selalu antara 0 dan 1", "Menghasilkan probabilitas"], answer: 0, explain: "ReLU(x)=max(0,x): 0 untuk negatif, x untuk positif." },
          { q: "Sigmoid berguna ketika kita ingin output berupa…", options: ["Probabilitas di rentang 0..1", "Bilangan bulat besar", "Vektor gambar", "Label acak"], answer: 0, explain: "Sigmoid memetakan nilai ke (0,1), cocok sebagai probabilitas." },
        ],
      },
      en: {
        title: "Package 2 — Activation Functions & Non-linearity",
        subtitle: "Why ReLU, sigmoid, and tanh matter.",
        knowledge: {
          paragraphs: [
            "Activation functions add non-linearity to a network. Without them, stacking many linear layers is still equivalent to one linear layer — the network can't learn complex patterns.",
            "ReLU is simple & fast (returns 0 for negatives). Sigmoid and tanh 'squash' output into a range (0..1 or -1..1), useful in certain layers. The activation choice affects training speed and quality.",
          ],
          keyPoints: [
            "Without non-linear activation, many layers = one linear layer.",
            "ReLU: simple, fast, popular in hidden layers.",
            "Sigmoid/tanh: bound the output to a fixed range.",
          ],
        },
        caseStudy: {
          title: "Case Study: A Network That's 'Stuck' Learning",
          scenario: [
            "A team builds a deep network with no non-linear activation. Even adding many layers, its accuracy never improves.",
            "After adding ReLU between layers, the network starts learning complex patterns and accuracy jumps. Try the activation demo above to compare the shapes of ReLU, sigmoid, and tanh.",
          ],
          takeaway: "Non-linear activation isn't a small detail — it's what makes 'deep' learning actually work.",
        },
        questions: [
          { q: "What happens if a deep network uses NO non-linear activation?", options: ["It's equivalent to one linear layer", "It becomes more accurate", "It runs without data", "It becomes a CNN automatically"], answer: 0, explain: "Composing linear functions stays linear; non-linearity is needed for complex patterns." },
          { q: "A hallmark of ReLU is…", options: ["Returns 0 for negatives, the value itself for positives", "Always between -1 and 1", "Always between 0 and 1", "Produces probabilities"], answer: 0, explain: "ReLU(x)=max(0,x): 0 for negatives, x for positives." },
          { q: "Sigmoid is useful when we want the output to be…", options: ["A probability in the 0..1 range", "A large integer", "An image vector", "A random label"], answer: 0, explain: "Sigmoid maps values to (0,1), fitting as a probability." },
        ],
      },
    },

    // -------- Package 3 --------
    {
      slug: "cnn-convolution",
      icon: "🔎",
      demoSlug: "cnn-filters",
      mathSlug: "cnn-filters",
      id: {
        title: "Paket 3 — Computer Vision: Konvolusi (CNN)",
        subtitle: "Bagaimana kernel mendeteksi fitur pada gambar.",
        knowledge: {
          paragraphs: [
            "Convolutional Neural Network (CNN) adalah arsitektur juara untuk gambar. Intinya adalah operasi konvolusi: sebuah kernel (matriks kecil, mis. 3×3) digeser ke seluruh gambar, menghitung jumlah berbobot di tiap posisi untuk mendeteksi fitur seperti tepi, tekstur, atau pola.",
            "CNN menumpuk banyak filter: lapisan awal mendeteksi fitur sederhana (garis, tepi), lapisan lebih dalam menggabungkannya menjadi bentuk dan objek. Inilah yang membuat CNN unggul mengenali gambar.",
          ],
          keyPoints: [
            "Konvolusi = kernel digeser ke seluruh gambar.",
            "Kernel berbeda menonjolkan fitur berbeda (tepi, blur, dll).",
            "Lapisan awal = fitur sederhana; lapisan dalam = objek kompleks.",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Mendeteksi Cacat Produk di Pabrik",
          scenario: [
            "Sebuah pabrik ingin mendeteksi goresan halus pada produk logam dari foto. Aturan manual gagal karena goresan sangat bervariasi.",
            "CNN dilatih mengenali pola goresan lewat filter konvolusi. Filter mendeteksi tepi dan tekstur tak wajar, lalu lapisan lebih dalam memutuskan cacat/tidak. Coba demo filter konvolusi di atas untuk melihat efek tiap kernel.",
          ],
          takeaway: "Konvolusi memungkinkan CNN 'melihat' fitur lokal di gambar — fondasi dari hampir semua pengenalan citra modern.",
        },
        questions: [
          { q: "Operasi inti pada CNN adalah…", options: ["Konvolusi (kernel digeser ke gambar)", "Clustering titik", "Tokenisasi teks", "Q-learning"], answer: 0, explain: "CNN memakai konvolusi: kernel kecil digeser untuk mendeteksi fitur." },
          { q: "Kernel yang berbeda pada CNN berfungsi untuk…", options: ["Menonjolkan fitur berbeda (tepi, tekstur)", "Menyimpan gambar", "Mempercepat GPU", "Memberi label manual"], answer: 0, explain: "Tiap kernel menekankan fitur tertentu tergantung angkanya." },
          { q: "Pada CNN, lapisan yang lebih dalam cenderung…", options: ["Menggabungkan fitur sederhana menjadi objek kompleks", "Menghapus gambar", "Hanya menyalin input", "Mengacak piksel"], answer: 0, explain: "Lapisan dalam menyusun fitur dasar menjadi representasi tingkat tinggi." },
        ],
      },
      en: {
        title: "Package 3 — Computer Vision: Convolution (CNN)",
        subtitle: "How kernels detect features in an image.",
        knowledge: {
          paragraphs: [
            "The Convolutional Neural Network (CNN) is the champion architecture for images. Its core is the convolution operation: a kernel (a small matrix, e.g. 3×3) is slid across the whole image, computing a weighted sum at each position to detect features like edges, textures, or patterns.",
            "CNNs stack many filters: early layers detect simple features (lines, edges), deeper layers combine them into shapes and objects. This is what makes CNNs excel at recognizing images.",
          ],
          keyPoints: [
            "Convolution = a kernel slid across the whole image.",
            "Different kernels emphasize different features (edges, blur, etc.).",
            "Early layers = simple features; deep layers = complex objects.",
          ],
        },
        caseStudy: {
          title: "Case Study: Detecting Product Defects in a Factory",
          scenario: [
            "A factory wants to detect fine scratches on metal products from photos. Manual rules fail because scratches vary so much.",
            "A CNN is trained to recognize scratch patterns via convolution filters. Filters detect unusual edges and textures, then deeper layers decide defect/not. Try the convolution-filter demo above to see each kernel's effect.",
          ],
          takeaway: "Convolution lets a CNN 'see' local features in an image — the foundation of nearly all modern image recognition.",
        },
        questions: [
          { q: "The core operation in a CNN is…", options: ["Convolution (a kernel slid over the image)", "Clustering points", "Text tokenization", "Q-learning"], answer: 0, explain: "CNNs use convolution: a small kernel is slid to detect features." },
          { q: "Different kernels in a CNN serve to…", options: ["Emphasize different features (edges, textures)", "Store the image", "Speed up the GPU", "Label data manually"], answer: 0, explain: "Each kernel emphasizes a particular feature depending on its numbers." },
          { q: "In a CNN, deeper layers tend to…", options: ["Combine simple features into complex objects", "Delete the image", "Only copy the input", "Shuffle pixels"], answer: 0, explain: "Deep layers assemble basic features into high-level representations." },
        ],
      },
    },

    // -------- Package 4 --------
    {
      slug: "edge-detection-features",
      icon: "🖼️",
      demoSlug: "edge-detection",
      mathSlug: "edge-detection",
      id: {
        title: "Paket 4 — Computer Vision: Deteksi Tepi",
        subtitle: "Menemukan batas objek dengan gradien (Sobel).",
        knowledge: {
          paragraphs: [
            "Deteksi tepi adalah langkah klasik computer vision: menemukan tempat kecerahan gambar berubah tajam — yaitu batas objek. Operator Sobel menghitung gradien di arah x dan y, lalu besarnya menandai kekuatan tepi.",
            "Tepi adalah fitur dasar yang sangat informatif. Banyak pipeline pengenalan objek memakai tepi sebagai langkah awal sebelum analisis lebih lanjut. Ambang (threshold) menentukan seberapa banyak detail vs noise yang dipertahankan.",
          ],
          keyPoints: [
            "Tepi = tempat kecerahan berubah tajam (gradien besar).",
            "Sobel menghitung gradien arah x & y.",
            "Ambang menyeimbangkan detail vs noise.",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Membaca Meteran Air Otomatis dari Foto",
          scenario: [
            "Sebuah PDAM ingin membaca angka meteran air dari foto petugas. Langkah pertama: menemukan batas tiap digit di tengah latar yang berisik.",
            "Deteksi tepi (Sobel) menyoroti kontur angka, memisahkannya dari latar, sebelum tahap pengenalan digit. Coba demo deteksi tepi di atas dan geser ambangnya.",
          ],
          takeaway: "Deteksi tepi mengubah gambar kompleks menjadi fitur batas yang bersih — pijakan awal bagi banyak tugas visi.",
        },
        questions: [
          { q: "Deteksi tepi menemukan…", options: ["Tempat kecerahan berubah tajam", "Kata paling sering", "Cluster pelanggan", "Aksi dengan reward tertinggi"], answer: 0, explain: "Tepi berada di lokasi dengan gradien kecerahan besar." },
          { q: "Operator Sobel bekerja dengan menghitung…", options: ["Gradien arah x dan y", "Probabilitas Bayes", "Jarak k tetangga", "Nilai Q"], answer: 0, explain: "Sobel mengestimasi gradien horizontal & vertikal, lalu besarnya = kekuatan tepi." },
          { q: "Menaikkan ambang deteksi tepi cenderung…", options: ["Menyisakan hanya tepi paling kuat", "Menambah noise", "Menghapus gambar", "Memberi label otomatis"], answer: 0, explain: "Ambang tinggi menyaring tepi lemah, menyisakan yang paling kuat." },
        ],
      },
      en: {
        title: "Package 4 — Computer Vision: Edge Detection",
        subtitle: "Finding object boundaries with gradients (Sobel).",
        knowledge: {
          paragraphs: [
            "Edge detection is a classic computer-vision step: finding where image brightness changes sharply — i.e. object boundaries. The Sobel operator computes gradients in the x and y directions, and their magnitude marks edge strength.",
            "Edges are highly informative basic features. Many object-recognition pipelines use edges as a first step before further analysis. The threshold controls how much detail vs noise is kept.",
          ],
          keyPoints: [
            "Edges = where brightness changes sharply (large gradient).",
            "Sobel computes x & y gradients.",
            "The threshold balances detail vs noise.",
          ],
        },
        caseStudy: {
          title: "Case Study: Auto-Reading Water Meters from Photos",
          scenario: [
            "A water utility wants to read meter digits from field-worker photos. First step: find each digit's boundary amid a noisy background.",
            "Edge detection (Sobel) highlights the digit contours, separating them from the background, before the digit-recognition stage. Try the edge-detection demo above and slide the threshold.",
          ],
          takeaway: "Edge detection turns a complex image into clean boundary features — a starting point for many vision tasks.",
        },
        questions: [
          { q: "Edge detection finds…", options: ["Where brightness changes sharply", "The most frequent word", "Customer clusters", "The highest-reward action"], answer: 0, explain: "Edges sit where the brightness gradient is large." },
          { q: "The Sobel operator works by computing…", options: ["Gradients in x and y", "Bayes probabilities", "k-neighbor distances", "Q-values"], answer: 0, explain: "Sobel estimates horizontal & vertical gradients; magnitude = edge strength." },
          { q: "Raising the edge-detection threshold tends to…", options: ["Keep only the strongest edges", "Add noise", "Delete the image", "Auto-label data"], answer: 0, explain: "A high threshold filters weak edges, keeping the strongest." },
        ],
      },
    },

    // -------- Package 5 --------
    {
      slug: "image-classification",
      icon: "✏️",
      demoSlug: "pixel-classifier",
      mathSlug: "pixel-classifier",
      id: {
        title: "Paket 5 — Computer Vision: Klasifikasi Gambar",
        subtitle: "Dari piksel menjadi label (mis. mengenali digit).",
        knowledge: {
          paragraphs: [
            "Klasifikasi gambar mengubah kumpulan piksel menjadi sebuah label — misalnya 'ini angka 7'. Jaringan mempelajari pola piksel yang khas untuk tiap kelas dari banyak contoh berlabel (seperti dataset MNIST untuk digit tulisan tangan).",
            "Alih-alih aturan kaku, model mencocokkan pola yang dipelajari. Semakin beragam & representatif data latih, semakin tahan model terhadap variasi tulisan tangan, sudut, dan pencahayaan.",
          ],
          keyPoints: [
            "Input = piksel; output = label kelas + keyakinan.",
            "Model belajar pola khas tiap kelas dari data berlabel.",
            "Keragaman data latih menentukan ketahanan model.",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Digitalisasi Formulir Tulisan Tangan",
          scenario: [
            "Sebuah kantor pemerintah ingin mendigitalkan ribuan formulir berisi angka tulisan tangan. Mengetik ulang secara manual lambat dan rawan salah.",
            "Model klasifikasi digit membaca tiap kotak angka dan mengubahnya menjadi teks digital, dengan kasus berkeyakinan rendah ditandai untuk diperiksa manusia. Coba demo pengenal digit di atas: gambar sebuah angka dan lihat prediksinya.",
          ],
          takeaway: "Klasifikasi gambar memindahkan pekerjaan membaca berulang ke mesin — dengan manusia menangani kasus yang ragu.",
        },
        questions: [
          { q: "Tugas klasifikasi gambar menghasilkan…", options: ["Label kelas untuk gambar (mis. digit 7)", "Angka kontinu", "Cluster tanpa nama", "Urutan aksi"], answer: 0, explain: "Klasifikasi memetakan gambar ke salah satu kategori/label." },
          { q: "Agar model tahan terhadap variasi tulisan tangan, yang paling penting adalah…", options: ["Data latih yang beragam & representatif", "GPU termahal", "Nama file yang rapi", "Warna antarmuka"], answer: 0, explain: "Model belajar dari data; keragaman data latih menentukan ketahanannya." },
          { q: "Praktik bijak untuk kasus berkeyakinan rendah adalah…", options: ["Menandainya untuk diperiksa manusia", "Mengabaikannya", "Memaksa model menebak diam-diam", "Menghapus datanya"], answer: 0, explain: "Human-in-the-loop menangani kasus ragu untuk menjaga akurasi." },
        ],
      },
      en: {
        title: "Package 5 — Computer Vision: Image Classification",
        subtitle: "From pixels to a label (e.g. recognizing digits).",
        knowledge: {
          paragraphs: [
            "Image classification turns a set of pixels into a label — e.g. 'this is a 7'. The network learns the pixel patterns characteristic of each class from many labeled examples (like the MNIST dataset for handwritten digits).",
            "Instead of rigid rules, the model matches learned patterns. The more diverse & representative the training data, the more robust the model is to variation in handwriting, angle, and lighting.",
          ],
          keyPoints: [
            "Input = pixels; output = class label + confidence.",
            "The model learns each class's characteristic patterns from labeled data.",
            "Training-data diversity determines robustness.",
          ],
        },
        caseStudy: {
          title: "Case Study: Digitizing Handwritten Forms",
          scenario: [
            "A government office wants to digitize thousands of forms with handwritten numbers. Manual re-typing is slow and error-prone.",
            "A digit-classification model reads each number box and converts it to digital text, with low-confidence cases flagged for human review. Try the digit-recognizer demo above: draw a number and see its prediction.",
          ],
          takeaway: "Image classification shifts repetitive reading to the machine — with humans handling the uncertain cases.",
        },
        questions: [
          { q: "An image-classification task produces…", options: ["A class label for the image (e.g. digit 7)", "A continuous number", "Unnamed clusters", "A sequence of actions"], answer: 0, explain: "Classification maps an image to one of several categories/labels." },
          { q: "To make the model robust to handwriting variation, the most important thing is…", options: ["Diverse & representative training data", "The most expensive GPU", "Tidy file names", "Interface colors"], answer: 0, explain: "The model learns from data; training-data diversity drives robustness." },
          { q: "A wise practice for low-confidence cases is…", options: ["Flag them for human review", "Ignore them", "Force the model to guess silently", "Delete the data"], answer: 0, explain: "Human-in-the-loop handles uncertain cases to preserve accuracy." },
        ],
      },
    },
  ],

  "reinforcement-learning": [
    // -------- Package 1 --------
    {
      slug: "rl-agent-reward",
      icon: "🎮",
      demoSlug: "rl-gridworld",
      mathSlug: "rl-gridworld",
      id: {
        title: "Paket 1 — Agen, Reward, dan Q-learning",
        subtitle: "Bagaimana agen belajar dari coba-coba.",
        knowledge: {
          paragraphs: [
            "Reinforcement Learning (RL) adalah cara agen belajar dari interaksi dengan lingkungan. Agen mengamati state, memilih aksi, lalu menerima reward (hadiah) atau penalti. Tujuannya: memaksimalkan total reward jangka panjang.",
            "Q-learning menyimpan 'nilai' tiap pasangan (state, aksi) — seberapa baik melakukan aksi tersebut di state itu. Nilai diperbarui dari pengalaman: reward yang diterima sekarang plus perkiraan nilai terbaik di masa depan (didiskon oleh γ).",
          ],
          keyPoints: [
            "Komponen inti: state, action, reward, policy.",
            "Q(s,a) = seberapa baik aksi a di state s.",
            "Faktor diskon γ menimbang reward masa depan.",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Robot Gudang Mencari Rute",
          scenario: [
            "Sebuah robot gudang harus menemukan jalur tercepat ke rak tujuan sambil menghindari area terlarang. Tak ada peta rute yang diberikan sebelumnya.",
            "Dengan Q-learning, robot mencoba banyak jalur, menerima reward saat mendekati tujuan dan penalti saat menabrak larangan. Lama-kelamaan ia belajar kebijakan (policy) optimal. Coba demo grid-world di atas: jalankan pelatihan dan amati panah kebijakan terbentuk.",
          ],
          takeaway: "RL cocok untuk masalah keputusan berurutan dengan konsekuensi tertunda — agen menemukan strategi terbaik lewat pengalaman.",
        },
        questions: [
          { q: "Dalam RL, umpan balik dari lingkungan atas aksi agen disebut…", options: ["Reward", "Label", "Token", "Gradien"], answer: 0, explain: "Agen belajar dengan memaksimalkan reward jangka panjang." },
          { q: "Q(s,a) merepresentasikan…", options: ["Seberapa baik melakukan aksi a di state s", "Jumlah data latih", "Ukuran gambar", "Jarak Euclidean"], answer: 0, explain: "Q-value menaksir nilai jangka panjang dari mengambil aksi a pada state s." },
          { q: "Faktor diskon γ berfungsi untuk…", options: ["Menimbang pentingnya reward masa depan", "Menghapus outlier", "Menambah jumlah state", "Mempercepat GPU"], answer: 0, explain: "γ (0–1) menentukan seberapa besar reward masa depan dihargai dibanding sekarang." },
        ],
      },
      en: {
        title: "Package 1 — Agents, Rewards, and Q-learning",
        subtitle: "How an agent learns by trial and error.",
        knowledge: {
          paragraphs: [
            "Reinforcement Learning (RL) is how an agent learns from interaction with an environment. The agent observes a state, picks an action, then receives a reward or penalty. The goal: maximize total long-term reward.",
            "Q-learning stores the 'value' of each (state, action) pair — how good it is to take that action in that state. Values are updated from experience: the reward received now plus the estimated best future value (discounted by γ).",
          ],
          keyPoints: [
            "Core components: state, action, reward, policy.",
            "Q(s,a) = how good action a is in state s.",
            "The discount factor γ weighs future rewards.",
          ],
        },
        caseStudy: {
          title: "Case Study: A Warehouse Robot Finding Routes",
          scenario: [
            "A warehouse robot must find the fastest path to a target shelf while avoiding forbidden zones. No route map is given in advance.",
            "With Q-learning, the robot tries many paths, getting reward as it nears the goal and penalty when it hits a forbidden area. Over time it learns an optimal policy. Try the grid-world demo above: run training and watch the policy arrows form.",
          ],
          takeaway: "RL suits sequential-decision problems with delayed consequences — the agent finds the best strategy through experience.",
        },
        questions: [
          { q: "In RL, the environment's feedback on the agent's action is called…", options: ["Reward", "Label", "Token", "Gradient"], answer: 0, explain: "The agent learns by maximizing long-term reward." },
          { q: "Q(s,a) represents…", options: ["How good it is to take action a in state s", "The amount of training data", "The image size", "Euclidean distance"], answer: 0, explain: "The Q-value estimates the long-term value of taking action a in state s." },
          { q: "The discount factor γ serves to…", options: ["Weigh the importance of future rewards", "Remove outliers", "Add more states", "Speed up the GPU"], answer: 0, explain: "γ (0–1) sets how much future reward is valued versus the present." },
        ],
      },
    },

    // -------- Package 2 --------
    {
      slug: "explore-vs-exploit",
      icon: "⚖️",
      demoSlug: "explore-exploit",
      mathSlug: "explore-exploit",
      id: {
        title: "Paket 2 — Eksplorasi vs Eksploitasi",
        subtitle: "Menyeimbangkan mencoba hal baru dan memakai yang terbaik.",
        knowledge: {
          paragraphs: [
            "Dilema inti dalam RL: haruskah agen memakai aksi terbaik yang diketahui (eksploitasi), atau mencoba aksi lain yang mungkin lebih baik (eksplorasi)? Terlalu banyak eksploitasi bisa terjebak pada pilihan suboptimal; terlalu banyak eksplorasi memboroskan kesempatan.",
            "Strategi ε-greedy adalah solusi sederhana: dengan peluang ε agen bereksplorasi acak, selebihnya memakai aksi terbaik. Menyetel ε menyeimbangkan kedua sisi.",
          ],
          keyPoints: [
            "Eksploitasi = pakai yang terbaik sekarang; eksplorasi = coba yang baru.",
            "ε-greedy: eksplorasi dengan peluang ε.",
            "ε terlalu kecil bisa terjebak; terlalu besar boros.",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Menguji Tata Letak Halaman (A/B Testing Cerdas)",
          scenario: [
            "Sebuah tim produk ingin tahu tata letak halaman mana yang paling banyak diklik. Menampilkan semua secara merata (eksplorasi murni) memboroskan trafik pada tata letak buruk.",
            "Dengan pendekatan ε-greedy (multi-armed bandit), sistem kebanyakan menampilkan tata letak terbaik sejauh ini, tapi sesekali menguji yang lain — belajar sambil tetap efisien. Coba demo eksplorasi-vs-eksploitasi di atas.",
          ],
          takeaway: "Keseimbangan eksplorasi–eksploitasi bukan cuma teori RL — ia menyetir sistem rekomendasi & uji A/B di dunia nyata.",
        },
        questions: [
          { q: "'Eksploitasi' dalam RL berarti…", options: ["Memakai aksi terbaik yang diketahui", "Mencoba aksi acak baru", "Menghapus data", "Menambah label"], answer: 0, explain: "Eksploitasi memanfaatkan pengetahuan saat ini untuk reward maksimum." },
          { q: "Parameter ε pada ε-greedy mengatur…", options: ["Seberapa sering agen bereksplorasi", "Ukuran gambar", "Jumlah lapisan jaringan", "Panjang token"], answer: 0, explain: "ε adalah peluang memilih aksi acak (eksplorasi)." },
          { q: "Risiko ε yang terlalu KECIL adalah…", options: ["Terjebak pada pilihan suboptimal", "Terlalu banyak eksplorasi", "Model tak bisa dilatih", "Akurasi selalu 100%"], answer: 0, explain: "Dengan sedikit eksplorasi, agen mungkin tak pernah menemukan aksi yang lebih baik." },
        ],
      },
      en: {
        title: "Package 2 — Exploration vs Exploitation",
        subtitle: "Balancing trying new things and using the best.",
        knowledge: {
          paragraphs: [
            "The core dilemma in RL: should the agent use the best known action (exploitation), or try other actions that might be better (exploration)? Too much exploitation can get stuck on a suboptimal choice; too much exploration wastes opportunities.",
            "The ε-greedy strategy is a simple solution: with probability ε the agent explores randomly, otherwise it uses the best action. Tuning ε balances the two sides.",
          ],
          keyPoints: [
            "Exploit = use the current best; explore = try something new.",
            "ε-greedy: explore with probability ε.",
            "ε too small can get stuck; too large wastes effort.",
          ],
        },
        caseStudy: {
          title: "Case Study: Testing Page Layouts (Smart A/B Testing)",
          scenario: [
            "A product team wants to know which page layout gets the most clicks. Showing all equally (pure exploration) wastes traffic on bad layouts.",
            "With an ε-greedy approach (multi-armed bandit), the system mostly shows the best layout so far, but occasionally tests others — learning while staying efficient. Try the explore-vs-exploit demo above.",
          ],
          takeaway: "The explore–exploit balance isn't just RL theory — it steers recommenders & A/B tests in the real world.",
        },
        questions: [
          { q: "'Exploitation' in RL means…", options: ["Using the best known action", "Trying a new random action", "Deleting data", "Adding labels"], answer: 0, explain: "Exploitation leverages current knowledge for maximum reward." },
          { q: "The ε parameter in ε-greedy controls…", options: ["How often the agent explores", "The image size", "The number of network layers", "Token length"], answer: 0, explain: "ε is the probability of choosing a random (exploratory) action." },
          { q: "The risk of ε being too SMALL is…", options: ["Getting stuck on a suboptimal choice", "Too much exploration", "The model can't be trained", "Accuracy is always 100%"], answer: 0, explain: "With little exploration, the agent may never find a better action." },
        ],
      },
    },

    // -------- Package 3 --------
    {
      slug: "value-iteration-policy",
      icon: "🌀",
      demoSlug: "rl-maze",
      mathSlug: "rl-maze",
      id: {
        title: "Paket 3 — Nilai State & Kebijakan Optimal",
        subtitle: "Bagaimana nilai menyebar membentuk policy (value iteration).",
        knowledge: {
          paragraphs: [
            "Setiap state punya 'nilai' — perkiraan total reward yang bisa diraih dari sana. Value iteration menghitungnya lewat persamaan Bellman: nilai sebuah state bergantung pada reward langsung plus nilai (terdiskon) dari state berikutnya yang terbaik.",
            "Nilai menyebar mundur dari tujuan ke seluruh peta. Setelah stabil, kebijakan optimal (policy) mudah dibaca: di tiap state, pilih aksi menuju tetangga bernilai tertinggi.",
          ],
          keyPoints: [
            "Nilai state = perkiraan total reward dari state itu.",
            "Persamaan Bellman menghubungkan nilai antar-state.",
            "Policy optimal = selalu menuju tetangga bernilai tertinggi.",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Perencanaan Rute Evakuasi",
          scenario: [
            "Sebuah gedung ingin menyusun rute evakuasi tercepat ke pintu keluar dari titik mana pun, mempertimbangkan koridor yang terhalang.",
            "Dengan value iteration, 'nilai keselamatan' menyebar mundur dari pintu keluar ke seluruh ruangan. Setiap titik lalu punya arah terbaik menuju keluar. Coba demo labirin di atas: klik iterasi berulang dan lihat nilai merambat lalu panah kebijakan terbentuk.",
          ],
          takeaway: "Value iteration mengubah satu tujuan menjadi peta arah optimal dari mana pun — dasar banyak sistem perencanaan jalur.",
        },
        questions: [
          { q: "Nilai (value) sebuah state merepresentasikan…", options: ["Perkiraan total reward dari state itu", "Jumlah piksel", "Banyaknya label", "Ukuran dataset"], answer: 0, explain: "Value adalah ekspektasi total reward jangka panjang mulai dari state tersebut." },
          { q: "Pada value iteration, nilai menyebar…", options: ["Mundur dari state tujuan", "Dari kiri ke kanan saja", "Acak setiap langkah", "Hanya di sekitar agen"], answer: 0, explain: "Nilai merambat mundur dari tujuan ke seluruh peta." },
          { q: "Kebijakan optimal dibaca dengan…", options: ["Memilih aksi menuju tetangga bernilai tertinggi", "Memilih aksi acak", "Menghindari semua reward", "Meminimalkan nilai"], answer: 0, explain: "Policy optimal selalu bergerak ke arah nilai tertinggi." },
        ],
      },
      en: {
        title: "Package 3 — State Values & the Optimal Policy",
        subtitle: "How values spread to form a policy (value iteration).",
        knowledge: {
          paragraphs: [
            "Every state has a 'value' — the estimated total reward reachable from it. Value iteration computes it via the Bellman equation: a state's value depends on the immediate reward plus the (discounted) value of the best next state.",
            "Values spread backward from the goal across the whole map. Once stable, the optimal policy is easy to read: in each state, choose the action toward the highest-valued neighbor.",
          ],
          keyPoints: [
            "A state's value = estimated total reward from it.",
            "The Bellman equation links values between states.",
            "The optimal policy = always move to the highest-valued neighbor.",
          ],
        },
        caseStudy: {
          title: "Case Study: Evacuation Route Planning",
          scenario: [
            "A building wants the fastest evacuation route to an exit from any point, accounting for blocked corridors.",
            "With value iteration, a 'safety value' spreads backward from the exit across all rooms. Each point then has a best direction toward the exit. Try the maze demo above: click iterate repeatedly and watch values propagate and policy arrows form.",
          ],
          takeaway: "Value iteration turns a single goal into an optimal direction map from anywhere — the basis of many path-planning systems.",
        },
        questions: [
          { q: "A state's value represents…", options: ["The estimated total reward from that state", "The number of pixels", "The count of labels", "The dataset size"], answer: 0, explain: "Value is the expected long-term total reward starting from that state." },
          { q: "In value iteration, values spread…", options: ["Backward from the goal state", "Left to right only", "Randomly each step", "Only near the agent"], answer: 0, explain: "Values propagate backward from the goal across the map." },
          { q: "The optimal policy is read by…", options: ["Choosing the action toward the highest-valued neighbor", "Choosing a random action", "Avoiding all rewards", "Minimizing value"], answer: 0, explain: "The optimal policy always moves toward the highest value." },
        ],
      },
    },

    // -------- Package 4 --------
    {
      slug: "control-cartpole",
      icon: "🤸",
      demoSlug: "cartpole",
      mathSlug: "cartpole",
      id: {
        title: "Paket 4 — Kontrol & Keseimbangan (CartPole)",
        subtitle: "RL untuk tugas kontrol dinamis secara real-time.",
        knowledge: {
          paragraphs: [
            "Banyak masalah dunia nyata adalah tugas kontrol: menjaga sesuatu tetap stabil sambil kondisinya terus berubah. CartPole adalah contoh klasik — menjaga tiang tetap tegak dengan menggerakkan kereta kiri/kanan.",
            "Agen (atau kebijakan) mengamati state (sudut tiang, kecepatan sudut) dan memilih aksi. Reward = lama bertahan. Kebijakan yang baik mengoreksi kemiringan sebelum tiang jatuh — mirip cara sistem kontrol menstabilkan drone atau robot.",
          ],
          keyPoints: [
            "Tugas kontrol: menjaga stabilitas di lingkungan dinamis.",
            "State berubah terus; aksi harus cepat & tepat.",
            "Reward = durasi keberhasilan (mis. lama tiang tegak).",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Menstabilkan Drone Pengantar",
          scenario: [
            "Sebuah startup mengembangkan drone pengantar yang harus tetap stabil saat angin berubah-ubah dan beban bergeser.",
            "Prinsipnya sama dengan CartPole: sistem kontrol terus membaca kemiringan dan mengoreksinya secepat mungkin. Menyetel 'kebijakan' kontrol menentukan seberapa lama & stabil drone bertahan. Coba demo CartPole di atas dan atur bobot kontrolernya.",
          ],
          takeaway: "Tugas kontrol seperti CartPole adalah jembatan RL ke robotika & otomasi — menjaga sistem stabil di dunia yang terus berubah.",
        },
        questions: [
          { q: "CartPole adalah contoh tugas…", options: ["Kontrol (menjaga stabilitas)", "Klasifikasi teks", "Clustering pelanggan", "Deteksi tepi"], answer: 0, explain: "CartPole adalah tugas kontrol: menjaga tiang tegak lewat aksi berkelanjutan." },
          { q: "Dalam CartPole, reward biasanya berupa…", options: ["Lama tiang tetap tegak", "Jumlah gambar", "Banyaknya kata", "Ukuran file"], answer: 0, explain: "Semakin lama seimbang, semakin besar total reward." },
          { q: "Tugas kontrol menuntut aksi yang…", options: ["Cepat & tepat karena state terus berubah", "Sekali saja lalu selesai", "Tidak bergantung state", "Selalu acak"], answer: 0, explain: "Lingkungan dinamis menuntut koreksi berkelanjutan yang tepat waktu." },
        ],
      },
      en: {
        title: "Package 4 — Control & Balance (CartPole)",
        subtitle: "RL for real-time dynamic control tasks.",
        knowledge: {
          paragraphs: [
            "Many real-world problems are control tasks: keeping something stable while conditions keep changing. CartPole is a classic example — keeping a pole upright by moving a cart left/right.",
            "The agent (or policy) observes the state (pole angle, angular velocity) and picks an action. Reward = time balanced. A good policy corrects the tilt before the pole falls — like how control systems stabilize a drone or robot.",
          ],
          keyPoints: [
            "Control tasks: maintain stability in a dynamic environment.",
            "State changes continuously; actions must be fast & precise.",
            "Reward = duration of success (e.g. time upright).",
          ],
        },
        caseStudy: {
          title: "Case Study: Stabilizing a Delivery Drone",
          scenario: [
            "A startup develops a delivery drone that must stay stable as wind shifts and its load moves.",
            "The principle is the same as CartPole: the control system constantly reads the tilt and corrects it as fast as possible. Tuning the control 'policy' decides how long & stably the drone holds. Try the CartPole demo above and adjust the controller weights.",
          ],
          takeaway: "Control tasks like CartPole are RL's bridge to robotics & automation — keeping systems stable in an ever-changing world.",
        },
        questions: [
          { q: "CartPole is an example of a…", options: ["Control task (maintaining stability)", "Text classification task", "Customer clustering task", "Edge detection task"], answer: 0, explain: "CartPole is a control task: keep the pole upright via continuous actions." },
          { q: "In CartPole, the reward is usually…", options: ["How long the pole stays upright", "The number of images", "The count of words", "The file size"], answer: 0, explain: "The longer it balances, the higher the total reward." },
          { q: "Control tasks demand actions that are…", options: ["Fast & precise because the state keeps changing", "Done once then finished", "Independent of state", "Always random"], answer: 0, explain: "A dynamic environment requires timely, precise, continuous corrections." },
        ],
      },
    },

    // -------- Package 5 --------
    {
      slug: "rl-applications",
      icon: "🎰",
      demoSlug: "multi-armed-bandit",
      mathSlug: "multi-armed-bandit",
      id: {
        title: "Paket 5 — Bandit & Penerapan RL",
        subtitle: "Multi-armed bandit dan di mana RL dipakai.",
        knowledge: {
          paragraphs: [
            "Multi-armed bandit adalah versi RL yang disederhanakan: beberapa 'mesin slot' dengan peluang menang tersembunyi, dan agen harus menemukan yang terbaik sambil tetap mengumpulkan reward. Ini menyoroti dilema eksplorasi–eksploitasi secara murni.",
            "RL dipakai luas: rekomendasi & iklan (bandit), permainan (AlphaGo, Atari), robotika, penjadwalan, manajemen energi, dan penalaan (fine-tuning) model bahasa. Kuncinya: masalah dengan keputusan berurutan dan umpan balik berupa reward.",
          ],
          keyPoints: [
            "Bandit: menemukan opsi terbaik dari beberapa pilihan tersembunyi.",
            "RL cocok untuk keputusan berurutan dengan reward.",
            "Penerapan: rekomendasi, game, robotika, penjadwalan, energi.",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Memilih Judul Notifikasi Terbaik",
          scenario: [
            "Sebuah aplikasi ingin tahu judul notifikasi mana yang paling banyak dibuka pengguna. Ada 4 kandidat judul; menampilkan satu judul buruk terlalu lama merugikan engagement.",
            "Dengan pendekatan bandit, sistem mengalokasikan lebih banyak tampilan ke judul dengan tingkat buka tertinggi sejauh ini, sambil tetap sesekali menguji yang lain. Coba demo multi-armed bandit di atas dan atur ε.",
          ],
          takeaway: "Bandit mengubah 'menebak judul terbaik' menjadi proses belajar terukur — banyak dipakai di produk digital nyata.",
        },
        questions: [
          { q: "Multi-armed bandit paling menyoroti dilema…", options: ["Eksplorasi vs eksploitasi", "Overfitting vs underfitting", "Bias vs variance data gambar", "Presisi vs recall saja"], answer: 0, explain: "Bandit adalah bentuk murni dari trade-off eksplorasi–eksploitasi." },
          { q: "Manakah BUKAN penerapan umum RL?", options: ["Menyimpan file ke basis data", "Rekomendasi & iklan", "Permainan (AlphaGo)", "Robotika"], answer: 0, explain: "Menyimpan file adalah operasi biasa, bukan masalah keputusan berbasis reward." },
          { q: "Ciri masalah yang cocok untuk RL adalah…", options: ["Keputusan berurutan dengan umpan balik reward", "Data gambar berlabel statis", "Teks tanpa tujuan", "Tabel tanpa aksi"], answer: 0, explain: "RL berpusat pada agen yang mengambil aksi berurutan dan menerima reward." },
        ],
      },
      en: {
        title: "Package 5 — Bandits & RL Applications",
        subtitle: "Multi-armed bandits and where RL is used.",
        knowledge: {
          paragraphs: [
            "The multi-armed bandit is a simplified form of RL: several 'slot machines' with hidden win rates, and the agent must find the best one while still collecting reward. It highlights the explore–exploit dilemma in pure form.",
            "RL is widely used: recommendations & ads (bandits), games (AlphaGo, Atari), robotics, scheduling, energy management, and fine-tuning language models. The key: problems with sequential decisions and reward-based feedback.",
          ],
          keyPoints: [
            "Bandit: find the best option among several hidden choices.",
            "RL suits sequential decisions with rewards.",
            "Applications: recommendations, games, robotics, scheduling, energy.",
          ],
        },
        caseStudy: {
          title: "Case Study: Choosing the Best Notification Title",
          scenario: [
            "An app wants to know which notification title users open most. There are 4 candidate titles; showing a bad one too long hurts engagement.",
            "With a bandit approach, the system allocates more shows to the title with the highest open rate so far, while occasionally testing others. Try the multi-armed bandit demo above and adjust ε.",
          ],
          takeaway: "Bandits turn 'guessing the best title' into a measurable learning process — widely used in real digital products.",
        },
        questions: [
          { q: "The multi-armed bandit most highlights the dilemma of…", options: ["Exploration vs exploitation", "Overfitting vs underfitting", "Bias vs variance in image data", "Precision vs recall only"], answer: 0, explain: "The bandit is a pure form of the explore–exploit trade-off." },
          { q: "Which is NOT a common RL application?", options: ["Saving a file to a database", "Recommendations & ads", "Games (AlphaGo)", "Robotics"], answer: 0, explain: "Saving a file is an ordinary operation, not a reward-based decision problem." },
          { q: "A hallmark of an RL-suitable problem is…", options: ["Sequential decisions with reward feedback", "Static labeled image data", "Text with no goal", "A table with no actions"], answer: 0, explain: "RL centers on an agent taking sequential actions and receiving rewards." },
        ],
      },
    },
  ],

  llm: [
    // -------- Package 1 --------
    {
      slug: "traditional-nlp-sentiment",
      icon: "😊",
      demoSlug: "sentiment-naive-bayes",
      mathSlug: "sentiment-naive-bayes",
      id: {
        title: "Paket 1 — NLP Tradisional: Analisis Sentimen",
        subtitle: "Bag-of-words + Naive Bayes, tanpa deep learning.",
        knowledge: {
          paragraphs: [
            "Sebelum era deep learning, NLP sudah bekerja dengan pendekatan sederhana. Analisis sentimen klasik memakai bag-of-words: teks dipecah menjadi kumpulan kata (tanpa memperhatikan urutan), lalu Naive Bayes menghitung peluang kata-kata itu muncul di kelas positif vs negatif.",
            "Pendekatan ini ringan, cepat, dan mudah dijelaskan — cocok sebagai dasar sebelum memahami model yang lebih canggih. Meski sederhana, ia masih dipakai luas untuk klasifikasi teks.",
          ],
          keyPoints: [
            "Bag-of-words mengabaikan urutan kata.",
            "Naive Bayes menghitung peluang kelas dari kata.",
            "Ringan & cepat — dasar NLP sebelum deep learning.",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Memantau Ulasan Produk UMKM",
          scenario: [
            "Sebuah UMKM di marketplace kebanjiran ratusan ulasan per hari. Membaca semuanya manual mustahil, padahal sentimen pelanggan penting untuk perbaikan produk.",
            "Dengan analisis sentimen berbasis bag-of-words + Naive Bayes, tiap ulasan otomatis ditandai positif/negatif, dan lonjakan ulasan negatif memicu perhatian. Coba demo sentimen di atas: ketik ulasan dan lihat kata mana yang berpengaruh.",
          ],
          takeaway: "Teknik NLP klasik yang sederhana pun bisa memberi nilai besar — memahami dasarnya penting sebelum melompat ke model canggih.",
        },
        questions: [
          { q: "Pendekatan 'bag-of-words' berarti…", options: ["Teks dianggap kumpulan kata tanpa urutan", "Menyimpan gambar kata", "Mengurutkan kata secara ketat", "Menghapus semua kata"], answer: 0, explain: "Bag-of-words merepresentasikan teks sebagai frekuensi kata, mengabaikan urutan." },
          { q: "Analisis sentimen dengan Naive Bayes termasuk…", options: ["NLP tradisional (tanpa deep learning)", "Computer vision", "Reinforcement learning", "Clustering gambar"], answer: 0, explain: "Ini pendekatan NLP klasik berbasis probabilitas, bukan deep learning." },
          { q: "Keunggulan utama pendekatan ini adalah…", options: ["Ringan, cepat, dan mudah dijelaskan", "Selalu paling akurat", "Tidak butuh data", "Hanya untuk gambar"], answer: 0, explain: "Naive Bayes + bag-of-words sangat efisien dan interpretable." },
        ],
      },
      en: {
        title: "Package 1 — Traditional NLP: Sentiment Analysis",
        subtitle: "Bag-of-words + Naive Bayes, no deep learning.",
        knowledge: {
          paragraphs: [
            "Before the deep-learning era, NLP already worked with simple approaches. Classic sentiment analysis uses bag-of-words: text is split into a set of words (ignoring order), then Naive Bayes computes how likely those words are to appear in the positive vs negative class.",
            "This approach is lightweight, fast, and easy to explain — a great foundation before understanding more advanced models. Despite its simplicity, it's still widely used for text classification.",
          ],
          keyPoints: [
            "Bag-of-words ignores word order.",
            "Naive Bayes computes class probability from words.",
            "Light & fast — the basis of NLP before deep learning.",
          ],
        },
        caseStudy: {
          title: "Case Study: Monitoring Small-Business Product Reviews",
          scenario: [
            "A small business on a marketplace is flooded with hundreds of reviews a day. Reading them all by hand is impossible, yet customer sentiment is vital for product improvement.",
            "With bag-of-words + Naive Bayes sentiment analysis, each review is auto-tagged positive/negative, and a surge of negatives triggers attention. Try the sentiment demo above: type a review and see which words matter.",
          ],
          takeaway: "Even simple classic NLP can deliver great value — understanding the basics matters before jumping to advanced models.",
        },
        questions: [
          { q: "The 'bag-of-words' approach means…", options: ["Text is treated as a set of words without order", "Storing images of words", "Strictly ordering words", "Deleting all words"], answer: 0, explain: "Bag-of-words represents text as word frequencies, ignoring order." },
          { q: "Sentiment analysis with Naive Bayes is…", options: ["Traditional NLP (no deep learning)", "Computer vision", "Reinforcement learning", "Image clustering"], answer: 0, explain: "It's a classic probability-based NLP approach, not deep learning." },
          { q: "The key strength of this approach is…", options: ["Light, fast, and easy to explain", "Always the most accurate", "It needs no data", "It's only for images"], answer: 0, explain: "Naive Bayes + bag-of-words is very efficient and interpretable." },
        ],
      },
    },

    // -------- Package 2 --------
    {
      slug: "tfidf-importance",
      icon: "📊",
      demoSlug: "tfidf",
      mathSlug: "tfidf",
      id: {
        title: "Paket 2 — TF-IDF: Kata yang Paling Berarti",
        subtitle: "Menilai pentingnya kata dalam dokumen.",
        knowledge: {
          paragraphs: [
            "TF-IDF menilai seberapa 'penting' sebuah kata dalam satu dokumen dibanding seluruh koleksi. TF (Term Frequency) mengukur seberapa sering kata muncul di dokumen; IDF (Inverse Document Frequency) mengecilkan bobot kata yang muncul di mana-mana.",
            "Hasilnya: kata yang sering di satu dokumen tetapi langka di dokumen lain mendapat skor tinggi — itulah kata yang membedakan. Kata umum seperti 'yang', 'di', 'the' justru berskor rendah.",
          ],
          keyPoints: [
            "TF = frekuensi kata dalam satu dokumen.",
            "IDF = seberapa langka kata di seluruh koleksi.",
            "Skor tinggi = kata paling khas/membedakan.",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Mesin Pencari Dokumen Internal",
          scenario: [
            "Sebuah perusahaan punya ribuan dokumen internal dan ingin pencarian yang menampilkan dokumen paling relevan, bukan yang paling banyak mengandung kata umum.",
            "TF-IDF memberi bobot lebih pada kata khas tiap dokumen, sehingga pencarian 'kebijakan cuti melahirkan' menemukan dokumen yang benar-benar membahasnya. Coba demo TF-IDF di atas: edit dokumen dan lihat kata paling khas tiap dokumen.",
          ],
          takeaway: "TF-IDF mengubah kumpulan teks menjadi sinyal 'apa yang membedakan' — fondasi mesin pencari & ekstraksi kata kunci.",
        },
        questions: [
          { q: "TF-IDF memberi skor TINGGI pada kata yang…", options: ["Sering di satu dokumen tapi langka di seluruh koleksi", "Muncul di semua dokumen", "Paling pendek", "Berhuruf kapital"], answer: 0, explain: "Kata khas (lokal sering, global langka) paling membedakan sebuah dokumen." },
          { q: "Komponen IDF berfungsi untuk…", options: ["Mengecilkan bobot kata yang muncul di mana-mana", "Menghitung panjang kata", "Menghapus angka", "Mengurutkan huruf"], answer: 0, explain: "IDF menurunkan bobot kata umum yang tak membedakan." },
          { q: "TF-IDF banyak dipakai untuk…", options: ["Mesin pencari & ekstraksi kata kunci", "Menyeimbangkan tiang", "Deteksi tepi gambar", "Kontrol robot"], answer: 0, explain: "TF-IDF adalah dasar klasik pencarian teks dan pengambilan kata kunci." },
        ],
      },
      en: {
        title: "Package 2 — TF-IDF: The Most Meaningful Words",
        subtitle: "Scoring how important a word is in a document.",
        knowledge: {
          paragraphs: [
            "TF-IDF scores how 'important' a word is in one document versus the whole collection. TF (Term Frequency) measures how often a word appears in a document; IDF (Inverse Document Frequency) downweights words that appear everywhere.",
            "The result: a word frequent in one document but rare in others scores high — that's the distinguishing word. Common words like 'the', 'of', 'in' score low.",
          ],
          keyPoints: [
            "TF = word frequency within one document.",
            "IDF = how rare the word is across the collection.",
            "High score = the most distinctive word.",
          ],
        },
        caseStudy: {
          title: "Case Study: An Internal Document Search Engine",
          scenario: [
            "A company has thousands of internal documents and wants search that surfaces the most relevant ones, not those with the most common words.",
            "TF-IDF weights each document's distinctive words higher, so searching 'maternity leave policy' finds the document that truly discusses it. Try the TF-IDF demo above: edit documents and see each one's most distinctive words.",
          ],
          takeaway: "TF-IDF turns a text collection into a 'what makes it distinct' signal — the basis of search engines & keyword extraction.",
        },
        questions: [
          { q: "TF-IDF gives a HIGH score to a word that…", options: ["Is frequent in one document but rare across the collection", "Appears in every document", "Is the shortest", "Is capitalized"], answer: 0, explain: "A distinctive word (locally frequent, globally rare) best differentiates a document." },
          { q: "The IDF component serves to…", options: ["Downweight words that appear everywhere", "Count word length", "Delete numbers", "Sort letters"], answer: 0, explain: "IDF lowers the weight of common, non-distinguishing words." },
          { q: "TF-IDF is widely used for…", options: ["Search engines & keyword extraction", "Balancing a pole", "Image edge detection", "Robot control"], answer: 0, explain: "TF-IDF is a classic basis for text search and keyword retrieval." },
        ],
      },
    },

    // -------- Package 3 --------
    {
      slug: "tokenization-basics",
      icon: "🧩",
      demoSlug: "tokenization",
      mathSlug: "tokenization",
      id: {
        title: "Paket 3 — Tokenisasi: Cara LLM Membaca Teks",
        subtitle: "Memecah teks menjadi token sebelum diproses.",
        knowledge: {
          paragraphs: [
            "LLM tidak membaca kata utuh seperti manusia. Teks lebih dulu dipecah menjadi token — sering berupa sub-kata. Kata umum menjadi satu token; kata panjang atau langka dipecah menjadi beberapa token.",
            "Tiap token dipetakan ke sebuah ID angka yang menjadi input model. Memahami tokenisasi menjelaskan banyak hal: mengapa jumlah token ≠ jumlah kata, dan mengapa biaya & batas panjang LLM dihitung dalam token.",
          ],
          keyPoints: [
            "Teks → token (sering sub-kata) → ID angka.",
            "Jumlah token biasanya lebih banyak dari jumlah kata.",
            "Batas & biaya LLM dihitung dalam token.",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Mengelola Biaya Layanan Berbasis LLM",
          scenario: [
            "Sebuah startup membangun asisten berbasis LLM dan terkejut melihat tagihannya membengkak. Ternyata biaya dihitung per token, dan prompt panjang mereka menghasilkan token jauh lebih banyak dari dugaan.",
            "Setelah memahami tokenisasi, tim memperpendek prompt dan menghemat biaya signifikan. Coba demo tokenisasi di atas: ketik kalimat dan lihat teks dipecah menjadi token beserta ID-nya.",
          ],
          takeaway: "Memahami tokenisasi bukan sekadar teori — ia langsung memengaruhi biaya, kecepatan, dan batas panjang aplikasi LLM.",
        },
        questions: [
          { q: "Sebelum diproses LLM, teks terlebih dahulu…", options: ["Dipecah menjadi token", "Diubah jadi gambar", "Dikelompokkan (clustering)", "Diberi reward"], answer: 0, explain: "Tokenisasi memecah teks menjadi token yang lalu dipetakan ke ID angka." },
          { q: "Mengapa jumlah token sering lebih banyak dari jumlah kata?", options: ["Kata panjang/langka dipecah jadi beberapa token", "Token selalu satu huruf", "Model menghapus kata", "Token = kalimat"], answer: 0, explain: "Tokenizer sub-kata memecah kata langka menjadi beberapa potongan." },
          { q: "Biaya & batas panjang LLM umumnya dihitung dalam…", options: ["Token", "Piksel", "Cluster", "Episode"], answer: 0, explain: "Layanan LLM mengukur input/output dalam token." },
        ],
      },
      en: {
        title: "Package 3 — Tokenization: How LLMs Read Text",
        subtitle: "Splitting text into tokens before processing.",
        knowledge: {
          paragraphs: [
            "LLMs don't read whole words as humans do. Text is first split into tokens — often sub-words. Common words become one token; long or rare words are split into several tokens.",
            "Each token maps to a numeric ID that becomes the model's input. Understanding tokenization explains a lot: why token count ≠ word count, and why LLM cost & length limits are counted in tokens.",
          ],
          keyPoints: [
            "Text → tokens (often sub-words) → numeric IDs.",
            "Token count is usually higher than word count.",
            "LLM limits & cost are counted in tokens.",
          ],
        },
        caseStudy: {
          title: "Case Study: Managing LLM Service Costs",
          scenario: [
            "A startup builds an LLM-based assistant and is shocked by a ballooning bill. It turns out cost is per token, and their long prompts produced far more tokens than expected.",
            "After understanding tokenization, the team shortened prompts and saved significantly. Try the tokenization demo above: type a sentence and see the text split into tokens with their IDs.",
          ],
          takeaway: "Understanding tokenization isn't just theory — it directly affects cost, speed, and length limits of LLM apps.",
        },
        questions: [
          { q: "Before an LLM processes it, text is first…", options: ["Split into tokens", "Turned into an image", "Clustered", "Given a reward"], answer: 0, explain: "Tokenization splits text into tokens that are then mapped to numeric IDs." },
          { q: "Why is token count often higher than word count?", options: ["Long/rare words are split into several tokens", "Tokens are always one letter", "The model deletes words", "A token = a sentence"], answer: 0, explain: "Sub-word tokenizers split rare words into several pieces." },
          { q: "LLM cost & length limits are generally counted in…", options: ["Tokens", "Pixels", "Clusters", "Episodes"], answer: 0, explain: "LLM services measure input/output in tokens." },
        ],
      },
    },

    // -------- Package 4 --------
    {
      slug: "word-embeddings-meaning",
      icon: "🗺️",
      demoSlug: "word-embeddings",
      mathSlug: "word-embeddings",
      id: {
        title: "Paket 4 — Word Embeddings: Makna sebagai Vektor",
        subtitle: "Kata bermakna serupa berdekatan dalam ruang.",
        knowledge: {
          paragraphs: [
            "Word embedding mengubah kata menjadi vektor angka. Ajaibnya, kata bermakna serupa ditempatkan berdekatan dalam ruang vektor — 'kucing' dekat dengan 'anjing', 'raja' dekat dengan 'ratu'.",
            "Kedekatan diukur dengan kemiripan kosinus (sudut antar-vektor). Embedding memungkinkan mesin 'memahami' makna secara numerik, membuka pencarian semantik, terjemahan, dan menjadi input dasar bagi model bahasa modern.",
          ],
          keyPoints: [
            "Kata → vektor angka berdimensi banyak.",
            "Makna serupa = vektor berdekatan.",
            "Kemiripan diukur dengan kosinus (sudut vektor).",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Pencarian Semantik di Toko Online",
          scenario: [
            "Sebuah toko online frustrasi karena pencarian berbasis kata kunci gagal: mencari 'jaket dingin' tak menemukan produk berlabel 'jaket musim salju'.",
            "Dengan embeddings, sistem membandingkan makna, bukan kata persis — sehingga 'dingin' dan 'musim salju' dianggap berdekatan. Coba demo word embeddings di atas: klik sebuah kata dan lihat tetangga maknanya.",
          ],
          takeaway: "Embeddings memindahkan pencarian dari 'kata yang sama' ke 'makna yang sama' — lompatan besar untuk relevansi.",
        },
        questions: [
          { q: "Word embedding merepresentasikan kata sebagai…", options: ["Vektor angka, makna serupa berdekatan", "Gambar berwarna", "Pohon keputusan", "Aturan if-else"], answer: 0, explain: "Embedding menempatkan kata dalam ruang vektor sesuai maknanya." },
          { q: "Kedekatan makna antar-kata sering diukur dengan…", options: ["Kemiripan kosinus", "Impuritas Gini", "Reward", "Jumlah token"], answer: 0, explain: "Cosine similarity mengukur sudut antar-vektor embedding." },
          { q: "Manfaat langsung embeddings adalah…", options: ["Pencarian semantik (berbasis makna)", "Menyeimbangkan tiang", "Deteksi tepi", "Kompresi gambar"], answer: 0, explain: "Embedding memungkinkan pencocokan berdasarkan makna, bukan kata persis." },
        ],
      },
      en: {
        title: "Package 4 — Word Embeddings: Meaning as Vectors",
        subtitle: "Similar meanings sit close together in space.",
        knowledge: {
          paragraphs: [
            "Word embeddings turn words into number vectors. Remarkably, words with similar meaning are placed close together in vector space — 'cat' near 'dog', 'king' near 'queen'.",
            "Closeness is measured by cosine similarity (the angle between vectors). Embeddings let machines 'understand' meaning numerically, enabling semantic search, translation, and serving as a base input for modern language models.",
          ],
          keyPoints: [
            "Word → a high-dimensional number vector.",
            "Similar meaning = nearby vectors.",
            "Similarity is measured by cosine (vector angle).",
          ],
        },
        caseStudy: {
          title: "Case Study: Semantic Search in an Online Store",
          scenario: [
            "An online store is frustrated that keyword search fails: searching 'cold jacket' doesn't find products labeled 'winter jacket'.",
            "With embeddings, the system compares meaning, not exact words — so 'cold' and 'winter' are considered close. Try the word-embeddings demo above: click a word and see its meaning-neighbors.",
          ],
          takeaway: "Embeddings shift search from 'same word' to 'same meaning' — a big leap in relevance.",
        },
        questions: [
          { q: "A word embedding represents a word as…", options: ["A number vector, similar meanings nearby", "A colored image", "A decision tree", "An if-else rule"], answer: 0, explain: "Embeddings place words in a vector space according to meaning." },
          { q: "Meaning closeness between words is often measured by…", options: ["Cosine similarity", "Gini impurity", "A reward", "Token count"], answer: 0, explain: "Cosine similarity measures the angle between embedding vectors." },
          { q: "A direct benefit of embeddings is…", options: ["Semantic (meaning-based) search", "Balancing a pole", "Edge detection", "Image compression"], answer: 0, explain: "Embeddings enable matching by meaning, not exact words." },
        ],
      },
    },

    // -------- Package 5 --------
    {
      slug: "transformer-attention",
      icon: "🔦",
      demoSlug: "attention",
      mathSlug: "attention",
      id: {
        title: "Paket 5 — Transformer & Attention (BERT/GPT)",
        subtitle: "Inti dari model bahasa modern.",
        knowledge: {
          paragraphs: [
            "Transformer adalah arsitektur yang mendasari LLM modern seperti BERT dan GPT. Kekuatannya ada pada mekanisme self-attention: setiap kata bisa 'memperhatikan' kata lain dalam kalimat untuk memahami konteks.",
            "Contoh klasik: pada 'kucing itu mengejar tikus karena ia lapar', attention membantu kata 'ia' memperhatikan 'kucing' untuk memahami rujukannya. Kemampuan menangkap hubungan antar-kata inilah yang membuat Transformer sangat kuat memahami bahasa.",
          ],
          keyPoints: [
            "Transformer = dasar BERT & GPT.",
            "Self-attention: tiap kata menimbang relevansi kata lain.",
            "Menangkap konteks & hubungan jarak jauh antar-kata.",
          ],
        },
        caseStudy: {
          title: "Studi Kasus: Asisten Ringkasan Dokumen Hukum",
          scenario: [
            "Sebuah firma hukum ingin meringkas kontrak panjang, di mana satu klausa sering merujuk klausa lain yang jauh letaknya.",
            "Model berbasis Transformer unggul di sini karena attention bisa menghubungkan bagian yang berjauhan dalam teks, menjaga konteks saat meringkas. Coba demo attention di atas: arahkan kursor ke sebuah baris dan lihat ke mana kata itu 'memperhatikan'.",
          ],
          takeaway: "Self-attention adalah terobosan yang membuat model memahami konteks & hubungan jauh — jantung dari revolusi LLM.",
        },
        questions: [
          { q: "Arsitektur yang mendasari LLM modern (BERT/GPT) adalah…", options: ["Transformer", "k-Means", "CNN klasik", "Pohon keputusan"], answer: 0, explain: "Transformer dengan self-attention adalah dasar LLM modern." },
          { q: "Self-attention memungkinkan tiap kata untuk…", options: ["'Memperhatikan' kata lain guna memahami konteks", "Menghitung tepi gambar", "Mengelompokkan pelanggan", "Menyeimbangkan tiang"], answer: 0, explain: "Attention menimbang relevansi antar-kata untuk memahami konteks." },
          { q: "Keunggulan attention untuk teks panjang adalah…", options: ["Menghubungkan bagian yang berjauhan (konteks jarak jauh)", "Menghapus kata", "Mengubah teks jadi gambar", "Mengurutkan abjad"], answer: 0, explain: "Attention dapat menghubungkan kata yang berjauhan, menjaga konteks." },
        ],
      },
      en: {
        title: "Package 5 — Transformers & Attention (BERT/GPT)",
        subtitle: "The heart of modern language models.",
        knowledge: {
          paragraphs: [
            "The Transformer is the architecture underlying modern LLMs like BERT and GPT. Its power lies in the self-attention mechanism: each word can 'attend' to other words in the sentence to understand context.",
            "A classic example: in 'the cat chased the mouse because it was hungry', attention helps the word 'it' attend to 'cat' to understand its reference. This ability to capture relationships between words is what makes Transformers so powerful at understanding language.",
          ],
          keyPoints: [
            "Transformer = the basis of BERT & GPT.",
            "Self-attention: each word weighs the relevance of others.",
            "Captures context & long-range relationships between words.",
          ],
        },
        caseStudy: {
          title: "Case Study: A Legal-Document Summarization Assistant",
          scenario: [
            "A law firm wants to summarize long contracts, where one clause often refers to another far away.",
            "Transformer-based models excel here because attention can link distant parts of the text, preserving context while summarizing. Try the attention demo above: hover a row and see where that word 'attends'.",
          ],
          takeaway: "Self-attention is the breakthrough that lets models grasp context & long-range relationships — the heart of the LLM revolution.",
        },
        questions: [
          { q: "The architecture underlying modern LLMs (BERT/GPT) is the…", options: ["Transformer", "k-Means", "Classic CNN", "Decision tree"], answer: 0, explain: "The Transformer with self-attention is the basis of modern LLMs." },
          { q: "Self-attention lets each word…", options: ["'Attend' to other words to understand context", "Compute image edges", "Cluster customers", "Balance a pole"], answer: 0, explain: "Attention weighs relevance between words to understand context." },
          { q: "Attention's strength for long text is…", options: ["Linking distant parts (long-range context)", "Deleting words", "Turning text into images", "Sorting the alphabet"], answer: 0, explain: "Attention can connect far-apart words, preserving context." },
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
