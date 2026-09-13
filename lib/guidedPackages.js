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
