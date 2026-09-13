// Multi-case, HBS/MIT/Stanford-style narrative case studies grouped by field,
// with Indonesian context. Bilingual (id/en). Each field holds several cases.
//
// Case shape:
// {
//   slug, icon,
//   id: { title, subtitle, company:{name,industry,location,size},
//         protagonist:{name,role,quote}, sections:[{heading,paragraphs[]}],
//         techniques:[{name,note}], results:[str], lessons:[str], questions:[str] },
//   en: { ...same },
//   visualization: { type, caption:{id,en}, ...spec },   // story-level interactive viz
//   analysisViz:   { type, caption:{id,en}, ...spec },   // algorithm-in-action viz
// }
//
// Names are illustrative for teaching. Visual/analysis specs are consumed by
// components/caseviz/CaseViz.jsx.

export const caseStudiesByField = {
  education: [
    // ---------- 1 ----------
    {
      slug: "belajarkita-adaptive",
      icon: "🎓",
      id: {
        title: "BelajarKita: Ketika Satu Ukuran Tak Cocok untuk Semua",
        subtitle: "Platform kursus daring memakai pembelajaran adaptif untuk menekan angka putus kelas.",
        company: { name: "BelajarKita", industry: "EdTech", location: "Bandung, Indonesia", size: "140.000 pelajar aktif" },
        protagonist: { name: "Rani Kusuma", role: "Head of Learning Experience", quote: "Kami punya konten hebat. Tapi konten hebat yang ditinggalkan di tengah jalan tidak mengajarkan apa pun." },
        sections: [
          { heading: "Latar", paragraphs: [
            "BelajarKita menawarkan kursus pemrograman daring untuk puluhan ribu pelajar dengan latar sangat beragam — dari mahasiswa hingga pekerja beralih karier. Kurikulumnya seragam: semua orang melewati urutan materi yang sama dengan kecepatan yang sama.",
            "Rani memperhatikan pola yang mengkhawatirkan: 61% pelajar berhenti sebelum menyelesaikan kursus, banyak yang menyerah tepat setelah topik-topik sulit tertentu.",
          ] },
          { heading: "Tantangan", paragraphs: [
            "Pelajar cepat merasa bosan karena materi terlalu lambat; pelajar lambat merasa kewalahan. Kurikulum 'satu ukuran untuk semua' gagal di kedua ujung spektrum.",
            "Rani harus memilih: merombak konten manual (butuh tim besar berbulan-bulan) atau membangun sistem yang menyesuaikan jalur belajar tiap orang secara otomatis.",
          ] },
          { heading: "Keputusan & Pendekatan AI", paragraphs: [
            "Tim membangun sistem pembelajaran adaptif. Dari jawaban kuis dan pola interaksi, model mengelompokkan pelajar (clustering) dan menyesuaikan tingkat kesulitan soal berikutnya.",
            "Sistem juga memprediksi pelajar berisiko putus (klasifikasi) lalu memicu intervensi: pengingat, ringkasan, atau tawaran sesi mentor. Sebuah tutor virtual berbasis LLM menjawab pertanyaan kapan saja.",
          ] },
          { heading: "Hasil & Refleksi", paragraphs: [
            "Setelah dua kohort, tingkat penyelesaian naik dari 39% menjadi 58%. Prediksi risiko memungkinkan tim menjangkau pelajar tepat sebelum mereka menyerah.",
            "Dilema muncul: personalisasi berlebihan bisa membuat pelajar hanya mengambil jalur termudah dan melewatkan tantangan penting. Tim harus merancang sistem yang tetap mendorong, bukan sekadar menyenangkan.",
          ] },
        ],
        techniques: [
          { name: "Clustering (Unsupervised)", note: "Mengelompokkan pelajar dengan pola belajar serupa." },
          { name: "Klasifikasi (Supervised)", note: "Memprediksi risiko putus kelas." },
          { name: "Tutor Virtual (LLM)", note: "Menjawab pertanyaan pelajar kapan saja." },
        ],
        results: ["Tingkat penyelesaian 39% → 58%.", "Intervensi tepat waktu bagi pelajar berisiko.", "Kepuasan pelajar atas tingkat kesulitan meningkat."],
        lessons: ["Personalisasi meningkatkan hasil, tapi harus tetap menantang.", "Kombinasi teknik sering mengalahkan satu model.", "Metrik yang dioptimalkan harus dipilih hati-hati."],
        questions: ["Bagaimana menyeimbangkan 'materi yang pas' dengan 'tantangan yang perlu'?", "Apa risiko jika sistem terlalu menyederhanakan jalur belajar?", "Metrik apa selain tingkat penyelesaian yang perlu dipantau?"],
      },
      en: {
        title: "BelajarKita: When One Size Fits No One",
        subtitle: "An online course platform uses adaptive learning to reduce dropouts.",
        company: { name: "BelajarKita", industry: "EdTech", location: "Bandung, Indonesia", size: "140,000 active learners" },
        protagonist: { name: "Rani Kusuma", role: "Head of Learning Experience", quote: "We had great content. But great content abandoned halfway teaches nothing." },
        sections: [
          { heading: "Background", paragraphs: [
            "BelajarKita offers online programming courses to tens of thousands of learners from very different backgrounds. The curriculum was uniform: everyone went through the same sequence at the same pace.",
            "Rani noticed a worrying pattern: 61% of learners quit before finishing, many giving up right after certain hard topics.",
          ] },
          { heading: "The Challenge", paragraphs: [
            "Fast learners got bored; slow learners felt overwhelmed. The one-size-fits-all curriculum failed at both ends.",
            "Rani had to choose: manually overhaul content (months of work) or build a system that adapts each person's path automatically.",
          ] },
          { heading: "The Decision & AI Approach", paragraphs: [
            "The team built an adaptive learning system. From quiz answers and interaction patterns, a model clusters learners and adjusts upcoming difficulty.",
            "It also predicts at-risk learners (classification) and triggers interventions: reminders, summaries, or a mentor session. An LLM tutor answers questions anytime.",
          ] },
          { heading: "Results & Reflection", paragraphs: [
            "After two cohorts, completion rose from 39% to 58%. Risk prediction let the team reach learners just before they gave up.",
            "A dilemma emerged: over-personalization could let learners take only the easiest path. The team had to keep the system challenging, not merely pleasing.",
          ] },
        ],
        techniques: [
          { name: "Clustering (Unsupervised)", note: "Groups learners with similar patterns." },
          { name: "Classification (Supervised)", note: "Predicts dropout risk." },
          { name: "Virtual Tutor (LLM)", note: "Answers learner questions anytime." },
        ],
        results: ["Completion rate 39% → 58%.", "Timely intervention for at-risk learners.", "Higher satisfaction with difficulty level."],
        lessons: ["Personalization helps, but must stay challenging.", "Combining techniques often beats one model.", "Choose the optimized metric carefully."],
        questions: ["How to balance 'material that fits' with 'the challenge that's needed'?", "What is the risk if the system oversimplifies the path?", "What metrics besides completion rate should be monitored?"],
      },
      visualization: {
        type: "beforeAfter",
        caption: { id: "Dampak pembelajaran adaptif pada dua kohort.", en: "Impact of adaptive learning across two cohorts." },
        metrics: [
          { label: { id: "Tingkat penyelesaian", en: "Completion rate" }, before: 39, after: 58, unit: "%" },
          { label: { id: "Angka putus kelas", en: "Dropout rate" }, before: 61, after: 42, unit: "%", betterWhenLower: true },
          { label: { id: "Kepuasan pelajar", en: "Learner satisfaction" }, before: 3.2, after: 4.4, unit: "/5", decimals: 1 },
        ],
      },
      analysisViz: {
        type: "scatterCluster",
        caption: { id: "Clustering mengelompokkan pelajar berdasarkan pola belajar, lalu jalur materi disesuaikan per kelompok.", en: "Clustering groups learners by learning pattern; the content path is then tailored per group." },
        xLabel: { id: "Kecepatan belajar", en: "Learning speed" },
        yLabel: { id: "Nilai kuis", en: "Quiz score" },
        groups: [
          { name: { id: "Cepat & kuat", en: "Fast & strong" }, color: "#0093D0", points: [[0.75, 0.8], [0.82, 0.7], [0.68, 0.85], [0.9, 0.78]] },
          { name: { id: "Perlu latihan", en: "Needs practice" }, color: "#F5A200", points: [[0.3, 0.35], [0.22, 0.45], [0.35, 0.28], [0.28, 0.5]] },
          { name: { id: "Sedang", en: "Steady" }, color: "#059669", points: [[0.55, 0.55], [0.5, 0.62], [0.6, 0.48], [0.52, 0.58]] },
        ],
      },
    },

    // ---------- 2 ----------
    {
      slug: "smk-dropout-early-warning",
      icon: "🏫",
      id: {
        title: "SMK Nusantara: Menemukan Siswa yang Hampir Menyerah",
        subtitle: "Sistem peringatan dini berbasis klasifikasi menekan angka putus sekolah.",
        company: { name: "SMK Nusantara", industry: "Pendidikan menengah kejuruan", location: "Semarang, Jawa Tengah", size: "1.800 siswa, 3 kompetensi keahlian" },
        protagonist: { name: "Bu Retno", role: "Wakil Kepala Bidang Kesiswaan", quote: "Waktu kami tahu seorang anak akan berhenti, biasanya sudah tiga bulan dia menghilang perlahan. Kami ingin tahu lebih awal." },
        sections: [
          { heading: "Latar", paragraphs: [
            "SMK Nusantara punya masalah menahun: setiap tahun sekitar 9% siswa putus sekolah, sering karena masalah ekonomi, kehadiran menurun, atau nilai anjlok yang tak tertangani.",
            "Guru BK kewalahan memantau 1.800 siswa secara manual. Ketika tanda bahaya terlihat, biasanya sudah terlambat.",
          ] },
          { heading: "Tantangan", paragraphs: [
            "Data ada — presensi, nilai, catatan pelanggaran, status pembayaran — tapi tersebar di banyak buku dan spreadsheet. Tidak ada yang menyatukannya menjadi sinyal dini.",
            "Bu Retno ingin sistem yang menandai siswa berisiko lebih awal, agar intervensi (konseling, keringanan biaya, bimbingan) bisa datang tepat waktu — bukan setelah anak menghilang.",
          ] },
          { heading: "Keputusan & Pendekatan AI", paragraphs: [
            "Bekerja sama dengan mahasiswa magang informatika, sekolah membangun model klasifikasi yang memprediksi risiko putus sekolah tiap semester dari presensi, tren nilai, dan status pembayaran.",
            "Model memberi skor risiko per siswa. Yang penting: sistem hanya alat bantu triase — keputusan dan pendekatan personal tetap di tangan guru BK.",
          ] },
          { heading: "Hasil & Refleksi", paragraphs: [
            "Setahun berjalan, angka putus sekolah turun dari 9% ke 5,5%. Guru BK bisa fokus pada 40–50 siswa berisiko tertinggi ketimbang menebak-nebak.",
            "Tantangan etis muncul: label 'berisiko' tidak boleh menjadi stigma. Sekolah menetapkan bahwa skor hanya terlihat oleh guru BK dan dipakai untuk membantu, bukan menghukum.",
          ] },
        ],
        techniques: [
          { name: "Klasifikasi (Supervised)", note: "Memprediksi risiko putus sekolah dari data historis." },
          { name: "Feature engineering", note: "Menggabungkan presensi, tren nilai, status pembayaran." },
          { name: "Human-in-the-loop", note: "Guru BK memutuskan tindakan, bukan model." },
        ],
        results: ["Angka putus sekolah 9% → 5,5%.", "Deteksi risiko rata-rata 1 semester lebih awal.", "Sumber daya BK terfokus pada yang paling butuh."],
        lessons: ["Menyatukan data yang berserakan sering jadi langkah terpenting.", "Skor risiko harus membantu, bukan menstigma.", "Ambang keputusan menyeimbangkan menjangkau vs mengganggu."],
        questions: ["Bagaimana mencegah label 'berisiko' menjadi bias guru terhadap siswa?", "Fitur apa yang berpotensi tidak adil (mis. status ekonomi)?", "Siapa yang boleh melihat skor, dan mengapa?"],
      },
      en: {
        title: "SMK Nusantara: Finding Students About to Give Up",
        subtitle: "A classification-based early-warning system reduces dropouts.",
        company: { name: "SMK Nusantara", industry: "Vocational secondary school", location: "Semarang, Central Java", size: "1,800 students, 3 majors" },
        protagonist: { name: "Bu Retno", role: "Deputy Head of Student Affairs", quote: "By the time we knew a student would leave, they'd usually been quietly fading for three months. We wanted to know sooner." },
        sections: [
          { heading: "Background", paragraphs: [
            "SMK Nusantara had a chronic problem: each year about 9% of students dropped out — often due to finances, declining attendance, or unaddressed failing grades.",
            "Counselors couldn't monitor 1,800 students by hand. By the time warning signs showed, it was usually too late.",
          ] },
          { heading: "The Challenge", paragraphs: [
            "The data existed — attendance, grades, discipline notes, payment status — but was scattered across books and spreadsheets. Nothing unified it into an early signal.",
            "Bu Retno wanted a system to flag at-risk students earlier, so interventions (counseling, fee relief, tutoring) could arrive in time.",
          ] },
          { heading: "The Decision & AI Approach", paragraphs: [
            "With CS interns, the school built a classification model predicting per-semester dropout risk from attendance, grade trends, and payment status.",
            "The model gives each student a risk score. Crucially, it is only a triage aid — decisions and personal outreach stay with counselors.",
          ] },
          { heading: "Results & Reflection", paragraphs: [
            "Within a year, dropouts fell from 9% to 5.5%. Counselors could focus on the top 40–50 at-risk students instead of guessing.",
            "An ethical challenge arose: the 'at-risk' label must not become a stigma. The school ruled scores visible only to counselors and used to help, not punish.",
          ] },
        ],
        techniques: [
          { name: "Classification (Supervised)", note: "Predicts dropout risk from historical data." },
          { name: "Feature engineering", note: "Combines attendance, grade trends, payment status." },
          { name: "Human-in-the-loop", note: "Counselors decide the action, not the model." },
        ],
        results: ["Dropout rate 9% → 5.5%.", "Risk detected ~1 semester earlier.", "Counseling resources focused on those most in need."],
        lessons: ["Unifying scattered data is often the most important step.", "Risk scores must help, not stigmatize.", "The threshold balances reaching vs. bothering."],
        questions: ["How to prevent the 'at-risk' label from biasing teachers?", "Which features could be unfair (e.g. economic status)?", "Who may see the scores, and why?"],
      },
      visualization: {
        type: "funnel",
        caption: { id: "Perjalanan siswa dari terdaftar hingga lulus — klik tiap tahap.", en: "Student journey from enrolled to graduated — click each stage." },
        stages: [
          { label: { id: "Terdaftar", en: "Enrolled" }, value: 1800, note: { id: "Semua siswa aktif di awal tahun.", en: "All active students at year start." } },
          { label: { id: "Presensi turun", en: "Attendance drops" }, value: 260, note: { id: "Sinyal awal paling kuat menurut model.", en: "The strongest early signal per the model." } },
          { label: { id: "Ditandai berisiko", en: "Flagged at-risk" }, value: 95, note: { id: "Dijangkau guru BK untuk intervensi.", en: "Reached by counselors for intervention." } },
          { label: { id: "Berhasil bertahan", en: "Retained" }, value: 63, note: { id: "Kembali aktif setelah intervensi tepat waktu.", en: "Back on track after timely intervention." } },
        ],
      },
      analysisViz: {
        type: "threshold",
        caption: { id: "Menyetel ambang risiko: rendah = jangkau lebih banyak siswa (recall naik) tapi lebih banyak alarm palsu.", en: "Tuning the risk threshold: lower = reach more students (higher recall) but more false alarms." },
        positiveLabel: { id: "Akan putus", en: "Will drop out" },
        negativeLabel: { id: "Bertahan", en: "Will stay" },
        dist: {
          pos: [0.9, 0.82, 0.76, 0.68, 0.61, 0.55, 0.48, 0.4],
          neg: [0.1, 0.18, 0.25, 0.32, 0.4, 0.47, 0.55, 0.63, 0.2, 0.3],
        },
      },
    },

    // ---------- 3 ----------
    {
      slug: "essay-autograding",
      icon: "📝",
      id: {
        title: "Universitas Cendana: Menilai 12.000 Esai Tanpa Kehabisan Dosen",
        subtitle: "NLP membantu penilaian esai awal, dosen tetap memegang keputusan akhir.",
        company: { name: "Universitas Cendana", industry: "Pendidikan tinggi", location: "Yogyakarta, Indonesia", size: "24.000 mahasiswa" },
        protagonist: { name: "Dr. Bagus", role: "Koordinator Mata Kuliah Umum", quote: "Umpan balik esai yang datang tiga minggu kemudian sudah kehilangan momen belajarnya." },
        sections: [
          { heading: "Latar", paragraphs: [
            "Mata kuliah wajib 'Berpikir Kritis' diikuti 12.000 mahasiswa per semester, dengan tugas esai mingguan. Dosen dan asisten kewalahan; umpan balik sering terlambat berminggu-minggu.",
            "Dr. Bagus tahu umpan balik cepat adalah inti pembelajaran menulis — tapi skala membuatnya mustahil secara manual.",
          ] },
          { heading: "Tantangan", paragraphs: [
            "Menilai esai bukan sekadar benar/salah; ada struktur argumen, koherensi, dan bukti. Model naif berisiko memberi nilai tinggi pada esai panjang tapi kosong.",
            "Kekhawatiran besar: bias dan keadilan. Sistem tak boleh menghukum gaya bahasa daerah atau menguntungkan kata-kata canggih tanpa substansi.",
          ] },
          { heading: "Keputusan & Pendekatan AI", paragraphs: [
            "Tim memakai pendekatan NLP bertingkat: TF-IDF & fitur linguistik untuk sinyal dasar, lalu model bahasa untuk menilai koherensi dan relevansi terhadap rubrik.",
            "Sistem memberi nilai awal + umpan balik terarah dalam hitungan detik. Dosen meninjau sampel dan semua kasus di zona abu-abu; keputusan akhir tetap manusia.",
          ] },
          { heading: "Hasil & Refleksi", paragraphs: [
            "Waktu umpan balik turun dari 3 minggu menjadi kurang dari 1 hari. Mahasiswa bisa merevisi selagi materi masih segar.",
            "Audit keadilan rutin dijalankan: nilai model dibandingkan dengan penilai manusia lintas kelompok untuk mendeteksi bias. Beberapa penyesuaian rubrik diperlukan.",
          ] },
        ],
        techniques: [
          { name: "NLP Tradisional (TF-IDF)", note: "Fitur dasar dari teks esai." },
          { name: "Model Bahasa (LLM)", note: "Menilai koherensi & relevansi rubrik." },
          { name: "Audit keadilan", note: "Membandingkan skor model vs manusia lintas kelompok." },
        ],
        results: ["Waktu umpan balik 3 minggu → <1 hari.", "Beban penilaian manual turun ~70%.", "Mahasiswa merevisi lebih sering karena umpan balik cepat."],
        lessons: ["AI menilai draf; manusia menjaga keadilan & nuansa.", "Umpan balik cepat > nilai akhir yang akurat tapi telat.", "Audit bias harus rutin, bukan sekali."],
        questions: ["Bagaimana memastikan penilaian tidak bias terhadap gaya bahasa tertentu?", "Kapan esai harus wajib dinilai manusia?", "Apa risiko mahasiswa menulis 'untuk mesin', bukan untuk berpikir?"],
      },
      en: {
        title: "Cendana University: Grading 12,000 Essays Without Running Out of Lecturers",
        subtitle: "NLP assists first-pass essay grading; lecturers keep the final call.",
        company: { name: "Cendana University", industry: "Higher education", location: "Yogyakarta, Indonesia", size: "24,000 students" },
        protagonist: { name: "Dr. Bagus", role: "General Course Coordinator", quote: "Essay feedback that arrives three weeks later has already lost its teachable moment." },
        sections: [
          { heading: "Background", paragraphs: [
            "The required 'Critical Thinking' course enrolls 12,000 students per semester with weekly essays. Staff were overwhelmed; feedback often lagged by weeks.",
            "Dr. Bagus knew fast feedback is central to learning to write — but scale made it impossible by hand.",
          ] },
          { heading: "The Challenge", paragraphs: [
            "Grading essays isn't right/wrong; there's argument structure, coherence, and evidence. A naive model risks rewarding long but empty essays.",
            "A major concern: bias and fairness. The system must not penalize regional language styles or reward fancy words without substance.",
          ] },
          { heading: "The Decision & AI Approach", paragraphs: [
            "The team used layered NLP: TF-IDF and linguistic features for base signals, then a language model to judge coherence and rubric relevance.",
            "The system gives a first-pass grade + targeted feedback in seconds. Lecturers review samples and all borderline cases; the final decision stays human.",
          ] },
          { heading: "Results & Reflection", paragraphs: [
            "Feedback time dropped from 3 weeks to under 1 day. Students could revise while the material was fresh.",
            "Regular fairness audits ran: model scores were compared with human graders across groups to detect bias. Some rubric adjustments were needed.",
          ] },
        ],
        techniques: [
          { name: "Traditional NLP (TF-IDF)", note: "Base features from essay text." },
          { name: "Language Model (LLM)", note: "Judges coherence & rubric relevance." },
          { name: "Fairness audit", note: "Compares model vs human scores across groups." },
        ],
        results: ["Feedback time 3 weeks → <1 day.", "Manual grading load down ~70%.", "Students revise more thanks to fast feedback."],
        lessons: ["AI grades drafts; humans safeguard fairness & nuance.", "Fast feedback beats accurate-but-late grades.", "Bias audits must be routine, not one-off."],
        questions: ["How to ensure grading isn't biased against certain language styles?", "When must an essay be human-graded?", "What is the risk of students writing 'for the machine'?"],
      },
      visualization: {
        type: "timeline",
        caption: { id: "Perjalanan menerapkan penilaian esai berbantuan NLP.", en: "The journey of deploying NLP-assisted essay grading." },
        milestones: [
          { when: { id: "Bulan 1", en: "Month 1" }, title: { id: "Kumpulkan & anonimkan esai", en: "Collect & anonymize essays" }, detail: { id: "Membangun dataset esai berlabel nilai dari arsip, dianonimkan untuk privasi.", en: "Build a grade-labeled essay dataset from archives, anonymized for privacy." } },
          { when: { id: "Bulan 2", en: "Month 2" }, title: { id: "Model + rubrik", en: "Model + rubric" }, detail: { id: "Menggabungkan TF-IDF dan LLM, dikalibrasi ke rubrik dosen.", en: "Combine TF-IDF and an LLM, calibrated to the lecturer's rubric." } },
          { when: { id: "Bulan 3", en: "Month 3" }, title: { id: "Uji paralel", en: "Parallel trial" }, detail: { id: "Model & manusia menilai esai yang sama untuk mengecek kesenjangan.", en: "Model & humans grade the same essays to check the gap." } },
          { when: { id: "Bulan 4", en: "Month 4" }, title: { id: "Peluncuran + audit", en: "Rollout + audit" }, detail: { id: "Diluncurkan dengan audit keadilan berkala dan tinjauan dosen.", en: "Launched with periodic fairness audits and lecturer review." } },
        ],
      },
      analysisViz: {
        type: "pipeline",
        caption: { id: "Bagaimana sebuah esai mengalir melalui pipeline penilaian.", en: "How an essay flows through the grading pipeline." },
        stages: [
          { icon: "📄", label: { id: "Esai masuk", en: "Essay in" }, detail: { id: "Teks esai mahasiswa diterima dan dibersihkan.", en: "The student's essay text is received and cleaned." } },
          { icon: "🧩", label: { id: "Tokenisasi", en: "Tokenize" }, detail: { id: "Teks dipecah menjadi token untuk diproses model.", en: "Text is split into tokens for the model to process." } },
          { icon: "📊", label: { id: "Fitur (TF-IDF)", en: "Features (TF-IDF)" }, detail: { id: "Menghitung kata kunci penting & sinyal linguistik dasar.", en: "Compute key terms & basic linguistic signals." } },
          { icon: "🔦", label: { id: "Analisis LLM", en: "LLM analysis" }, detail: { id: "Model bahasa menilai koherensi & relevansi rubrik.", en: "A language model judges coherence & rubric relevance." } },
          { icon: "🎯", label: { id: "Nilai + umpan balik", en: "Grade + feedback" }, detail: { id: "Menghasilkan nilai awal dan komentar terarah.", en: "Produces a first-pass grade and targeted comments." } },
          { icon: "👩‍🏫", label: { id: "Tinjauan dosen", en: "Lecturer review" }, detail: { id: "Dosen memeriksa kasus abu-abu; keputusan akhir manusia.", en: "The lecturer checks borderline cases; final call is human." } },
        ],
      },
    },

    // ---------- 4 ----------
    {
      slug: "campus-chatbot",
      icon: "💬",
      id: {
        title: "Politeknik Bahari: Tutor Virtual yang Tak Pernah Tidur",
        subtitle: "Asisten LLM menjawab pertanyaan mahasiswa 24/7 — dengan rambu-rambu.",
        company: { name: "Politeknik Bahari", industry: "Pendidikan vokasi", location: "Makassar, Sulawesi Selatan", size: "6.500 mahasiswa" },
        protagonist: { name: "Pak Yusuf", role: "Kepala Pusat Pembelajaran Digital", quote: "Mahasiswa kami banyak yang bekerja siang dan belajar malam. Pertanyaan mereka muncul jam 1 pagi, saat tak ada dosen." },
        sections: [
          { heading: "Latar", paragraphs: [
            "Banyak mahasiswa Politeknik Bahari adalah pekerja yang belajar di luar jam kerja. Pertanyaan tentang materi sering muncul larut malam, dan menunggu balasan dosen keesokan hari memutus momentum belajar.",
            "Forum diskusi ada, tapi sepi dan lambat. Pak Yusuf ingin bantuan yang selalu tersedia.",
          ] },
          { heading: "Tantangan", paragraphs: [
            "LLM umum bisa 'berhalusinasi' — menjawab dengan percaya diri tapi salah. Untuk materi teknik, jawaban keliru berbahaya.",
            "Tantangan kedua: jawaban harus berbasis materi kuliah resmi, bukan sekadar pengetahuan umum internet yang mungkin usang atau tidak sesuai kurikulum.",
          ] },
          { heading: "Keputusan & Pendekatan AI", paragraphs: [
            "Tim membangun tutor virtual dengan pola Retrieval-Augmented Generation (RAG): pertanyaan dijawab hanya berdasarkan bahan kuliah resmi yang diambil (retrieval), lalu dirangkai oleh LLM.",
            "Jika bahan relevan tak ditemukan, asisten mengarahkan ke dosen alih-alih mengarang. Setiap jawaban menyertakan rujukan ke sumber materi.",
          ] },
          { heading: "Hasil & Refleksi", paragraphs: [
            "Waktu tunggu jawaban turun drastis; 78% pertanyaan terjawab tanpa menunggu dosen. Kepuasan mahasiswa naik, terutama kelas malam.",
            "Tim tetap memantau: sampel jawaban ditinjau dosen mingguan untuk menjaga akurasi, dan mahasiswa diingatkan bahwa asisten adalah pembantu belajar, bukan sumber kebenaran mutlak.",
          ] },
        ],
        techniques: [
          { name: "LLM + RAG", note: "Menjawab berdasarkan materi resmi yang diambil, bukan tebakan." },
          { name: "Word Embeddings", note: "Mencari bagian materi paling relevan dengan pertanyaan." },
          { name: "Human oversight", note: "Dosen meninjau sampel jawaban secara berkala." },
        ],
        results: ["78% pertanyaan terjawab tanpa menunggu dosen.", "Tersedia 24/7, ideal untuk kelas malam.", "Setiap jawaban menyertakan rujukan materi."],
        lessons: ["RAG mengurangi halusinasi dengan mengikat jawaban ke sumber.", "Lebih baik berkata 'tanya dosen' daripada mengarang.", "Transparansi rujukan membangun kepercayaan."],
        questions: ["Kapan asisten sebaiknya menolak menjawab dan meneruskan ke dosen?", "Bagaimana mencegah mahasiswa terlalu bergantung pada AI?", "Apa risiko jika materi resmi sendiri keliru?"],
      },
      en: {
        title: "Bahari Polytechnic: A Virtual Tutor That Never Sleeps",
        subtitle: "An LLM assistant answers student questions 24/7 — with guardrails.",
        company: { name: "Bahari Polytechnic", industry: "Vocational education", location: "Makassar, South Sulawesi", size: "6,500 students" },
        protagonist: { name: "Pak Yusuf", role: "Head of Digital Learning Center", quote: "Many of our students work by day and study by night. Their questions arrive at 1 a.m., when no lecturer is around." },
        sections: [
          { heading: "Background", paragraphs: [
            "Many Bahari students are workers studying after hours. Questions arise late at night, and waiting for a lecturer's reply the next day breaks their momentum.",
            "A discussion forum existed but was quiet and slow. Pak Yusuf wanted always-available help.",
          ] },
          { heading: "The Challenge", paragraphs: [
            "A general LLM can 'hallucinate' — answering confidently but wrongly. For engineering material, wrong answers are dangerous.",
            "Second challenge: answers must be grounded in official course material, not generic internet knowledge that may be outdated or off-curriculum.",
          ] },
          { heading: "The Decision & AI Approach", paragraphs: [
            "The team built a virtual tutor using Retrieval-Augmented Generation (RAG): questions are answered only from retrieved official course material, then composed by an LLM.",
            "If no relevant material is found, the assistant routes to a lecturer instead of inventing. Every answer cites its source material.",
          ] },
          { heading: "Results & Reflection", paragraphs: [
            "Answer wait time dropped sharply; 78% of questions were answered without waiting for a lecturer. Satisfaction rose, especially in night classes.",
            "The team keeps monitoring: lecturers review answer samples weekly, and students are reminded the assistant is a study aid, not an absolute authority.",
          ] },
        ],
        techniques: [
          { name: "LLM + RAG", note: "Answers from retrieved official material, not guesses." },
          { name: "Word Embeddings", note: "Finds the course sections most relevant to a question." },
          { name: "Human oversight", note: "Lecturers periodically review answer samples." },
        ],
        results: ["78% of questions answered without waiting for a lecturer.", "Available 24/7, ideal for night classes.", "Every answer cites its source material."],
        lessons: ["RAG reduces hallucination by grounding answers in sources.", "Better to say 'ask a lecturer' than to invent.", "Citation transparency builds trust."],
        questions: ["When should the assistant refuse and route to a lecturer?", "How to prevent over-reliance on the AI?", "What if the official material itself is wrong?"],
      },
      visualization: {
        type: "beforeAfter",
        caption: { id: "Dampak tutor virtual pada pengalaman belajar mahasiswa.", en: "Impact of the virtual tutor on the student experience." },
        metrics: [
          { label: { id: "Pertanyaan terjawab mandiri", en: "Self-served questions" }, before: 0, after: 78, unit: "%" },
          { label: { id: "Waktu tunggu rata-rata (jam)", en: "Avg. wait time (hours)" }, before: 14, after: 1, unit: "j", betterWhenLower: true },
          { label: { id: "Kepuasan kelas malam", en: "Night-class satisfaction" }, before: 3.0, after: 4.5, unit: "/5", decimals: 1 },
        ],
      },
      analysisViz: {
        type: "pipeline",
        caption: { id: "Alur RAG: pertanyaan mahasiswa dijawab dari materi resmi, bukan tebakan.", en: "The RAG flow: a student question is answered from official material, not guesses." },
        stages: [
          { icon: "❓", label: { id: "Pertanyaan", en: "Question" }, detail: { id: "Mahasiswa mengetik pertanyaan tentang materi.", en: "The student types a question about the material." } },
          { icon: "🗺️", label: { id: "Embedding", en: "Embedding" }, detail: { id: "Pertanyaan diubah menjadi vektor makna.", en: "The question is turned into a meaning vector." } },
          { icon: "🔍", label: { id: "Pencarian materi", en: "Retrieve" }, detail: { id: "Sistem menemukan bagian materi resmi paling relevan.", en: "The system finds the most relevant official material." } },
          { icon: "🔦", label: { id: "LLM merangkai", en: "LLM composes" }, detail: { id: "LLM menyusun jawaban HANYA dari materi yang ditemukan.", en: "The LLM composes an answer ONLY from the retrieved material." } },
          { icon: "🔗", label: { id: "Jawaban + rujukan", en: "Answer + citation" }, detail: { id: "Jawaban diberikan lengkap dengan rujukan sumbernya.", en: "The answer is given with its source citation." } },
        ],
      },
    },

    // ---------- 5 ----------
    {
      slug: "literacy-cv-scoring",
      icon: "📚",
      id: {
        title: "Gerakan Literasi Desa: Menilai Kemajuan Membaca dari Foto",
        subtitle: "Computer vision membantu relawan memantau ribuan lembar kerja dari daerah terpencil.",
        company: { name: "Yayasan Baca Bersama", industry: "LSM pendidikan literasi", location: "Nusa Tenggara Timur, Indonesia", size: "320 relawan, 180 desa" },
        protagonist: { name: "Kak Melati", role: "Koordinator Program", quote: "Relawan kami mengirim foto lembar kerja lewat ponsel. Menilai ribuan foto satu per satu memakan seluruh akhir pekan kami." },
        sections: [
          { heading: "Latar", paragraphs: [
            "Yayasan Baca Bersama menjalankan program literasi di 180 desa terpencil. Relawan memotret lembar kerja anak dengan ponsel dan mengirimkannya, karena banyak lokasi tanpa internet stabil untuk aplikasi.",
            "Menilai ribuan foto lembar kerja secara manual membebani tim pusat dan memperlambat umpan balik ke relawan.",
          ] },
          { heading: "Tantangan", paragraphs: [
            "Foto tidak seragam: pencahayaan buruk, miring, tulisan tangan anak yang beragam. Model harus tahan terhadap kondisi lapangan yang jauh dari ideal.",
            "Karena keterbatasan internet, sebagian pemrosesan perlu jalan langsung di ponsel relawan (on-device), bukan hanya di server.",
          ] },
          { heading: "Keputusan & Pendekatan AI", paragraphs: [
            "Tim membangun model computer vision (CNN) yang mengenali jawaban pada lembar kerja terstruktur dan menilai kemajuan membaca dari foto — meski miring atau kurang terang.",
            "Model ringan dijalankan di ponsel untuk pra-pemrosesan; hasil ringkas dikirim saat sinyal tersedia. Kasus yang model tak yakin ditandai untuk ditinjau relawan.",
          ] },
          { heading: "Hasil & Refleksi", paragraphs: [
            "Waktu penilaian turun dari akhir pekan penuh menjadi beberapa jam. Relawan menerima umpan balik lebih cepat, dan tim pusat bisa fokus memantau tren, bukan menghitung manual.",
            "Pelajaran penting: data pelatihan harus mencerminkan kondisi nyata (foto buram, miring). Model yang hanya dilatih pada foto bersih gagal di lapangan.",
          ] },
        ],
        techniques: [
          { name: "Computer Vision (CNN)", note: "Mengenali & menilai lembar kerja dari foto." },
          { name: "Model on-device", note: "Pra-pemrosesan di ponsel karena internet terbatas." },
          { name: "Confidence flagging", note: "Kasus tak yakin ditandai untuk ditinjau manusia." },
        ],
        results: ["Waktu penilaian: akhir pekan → beberapa jam.", "Umpan balik ke relawan jauh lebih cepat.", "Tim pusat fokus pada tren, bukan hitung manual."],
        lessons: ["Data latih harus mencerminkan kondisi lapangan nyata.", "Batasan internet menuntut solusi on-device.", "Tandai ketidakpastian; jangan paksa model menebak."],
        questions: ["Bagaimana memastikan model adil untuk beragam gaya tulisan tangan anak?", "Apa risiko menilai anak dari foto yang mungkin salah baca?", "Kapan penilaian manusia tetap wajib?"],
      },
      en: {
        title: "Village Literacy Movement: Scoring Reading Progress from Photos",
        subtitle: "Computer vision helps volunteers review thousands of worksheets from remote areas.",
        company: { name: "Baca Bersama Foundation", industry: "Literacy education NGO", location: "East Nusa Tenggara, Indonesia", size: "320 volunteers, 180 villages" },
        protagonist: { name: "Kak Melati", role: "Program Coordinator", quote: "Our volunteers send worksheet photos by phone. Grading thousands of photos one by one ate up our entire weekends." },
        sections: [
          { heading: "Background", paragraphs: [
            "The Baca Bersama Foundation runs literacy programs in 180 remote villages. Volunteers photograph children's worksheets with phones and send them, since many sites lack stable internet for an app.",
            "Grading thousands of worksheet photos by hand burdened the central team and slowed feedback to volunteers.",
          ] },
          { heading: "The Challenge", paragraphs: [
            "Photos weren't uniform: poor lighting, tilted angles, varied children's handwriting. The model had to tolerate far-from-ideal field conditions.",
            "Because of limited internet, some processing had to run directly on volunteers' phones (on-device), not only on a server.",
          ] },
          { heading: "The Decision & AI Approach", paragraphs: [
            "The team built a computer-vision model (CNN) that recognizes answers on structured worksheets and scores reading progress from photos — even tilted or dim ones.",
            "A lightweight model runs on the phone for preprocessing; concise results are sent when signal is available. Low-confidence cases are flagged for volunteer review.",
          ] },
          { heading: "Results & Reflection", paragraphs: [
            "Grading time dropped from a full weekend to a few hours. Volunteers got feedback faster, and the central team could focus on tracking trends, not manual counting.",
            "A key lesson: training data must reflect real conditions (blurry, tilted photos). A model trained only on clean photos failed in the field.",
          ] },
        ],
        techniques: [
          { name: "Computer Vision (CNN)", note: "Recognizes & scores worksheets from photos." },
          { name: "On-device model", note: "Preprocessing on phones due to limited internet." },
          { name: "Confidence flagging", note: "Uncertain cases flagged for human review." },
        ],
        results: ["Grading time: a weekend → a few hours.", "Much faster feedback to volunteers.", "Central team focuses on trends, not manual counting."],
        lessons: ["Training data must reflect real field conditions.", "Internet limits demand on-device solutions.", "Flag uncertainty; don't force the model to guess."],
        questions: ["How to ensure fairness across diverse children's handwriting?", "What is the risk of scoring a child from a possibly-misread photo?", "When is human grading still mandatory?"],
      },
      visualization: {
        type: "timeline",
        caption: { id: "Tahapan membangun penilaian literasi berbasis foto di daerah terpencil.", en: "Stages of building photo-based literacy scoring in remote areas." },
        milestones: [
          { when: { id: "Tahap 1", en: "Phase 1" }, title: { id: "Kumpulkan foto lapangan", en: "Collect field photos" }, detail: { id: "Mengumpulkan foto lembar kerja apa adanya — buram, miring, beragam.", en: "Gather worksheet photos as-is — blurry, tilted, varied." } },
          { when: { id: "Tahap 2", en: "Phase 2" }, title: { id: "Latih CNN tahan-kondisi", en: "Train robust CNN" }, detail: { id: "Melatih model dengan augmentasi agar tahan pencahayaan & sudut buruk.", en: "Train with augmentation to withstand poor lighting & angles." } },
          { when: { id: "Tahap 3", en: "Phase 3" }, title: { id: "Model ringan di ponsel", en: "Lightweight on phone" }, detail: { id: "Mengecilkan model agar berjalan offline di ponsel relawan.", en: "Shrink the model to run offline on volunteers' phones." } },
          { when: { id: "Tahap 4", en: "Phase 4" }, title: { id: "Uji lapangan + tinjauan", en: "Field test + review" }, detail: { id: "Kasus tak yakin ditandai untuk ditinjau relawan berpengalaman.", en: "Low-confidence cases flagged for experienced volunteer review." } },
        ],
      },
      analysisViz: {
        type: "pipeline",
        caption: { id: "Bagaimana sebuah foto lembar kerja diproses menjadi skor.", en: "How a worksheet photo is processed into a score." },
        stages: [
          { icon: "📷", label: { id: "Foto masuk", en: "Photo in" }, detail: { id: "Relawan memotret lembar kerja dengan ponsel.", en: "A volunteer photographs the worksheet with a phone." } },
          { icon: "🩹", label: { id: "Perbaiki citra", en: "Fix image" }, detail: { id: "Meluruskan, menajamkan, dan menormalkan pencahayaan.", en: "Deskew, sharpen, and normalize lighting." } },
          { icon: "🔎", label: { id: "CNN membaca", en: "CNN reads" }, detail: { id: "Konvolusi mendeteksi tanda & jawaban pada lembar.", en: "Convolution detects marks & answers on the sheet." } },
          { icon: "🎯", label: { id: "Skor + keyakinan", en: "Score + confidence" }, detail: { id: "Menghasilkan skor beserta tingkat keyakinan model.", en: "Produces a score along with the model's confidence." } },
          { icon: "🧑", label: { id: "Tinjau bila ragu", en: "Review if unsure" }, detail: { id: "Keyakinan rendah? Ditandai untuk relawan.", en: "Low confidence? Flagged for a volunteer." } },
        ],
      },
    },
  ],
};
