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

  business: [
    // ---------- 1 ----------
    {
      slug: "tokoruang-churn",
      icon: "💼",
      id: {
        title: "TokoRuang: Menyelamatkan Pelanggan yang Diam-diam Pergi",
        subtitle: "E-commerce memakai machine learning untuk menekan churn hingga 30%.",
        company: { name: "TokoRuang", industry: "E-commerce ritel", location: "Jakarta, Indonesia", size: "±480 karyawan, 2,3 juta pelanggan aktif" },
        protagonist: { name: "Dinar Prasetya", role: "VP of Growth", quote: "Kami tidak kekurangan pelanggan baru. Masalahnya, kami kehilangan pelanggan lama tanpa pernah tahu alasannya." },
        sections: [
          { heading: "Latar", paragraphs: [
            "Meski akuisisi pelanggan baru tumbuh 18% year-on-year, pendapatan bersih TokoRuang justru stagnan. Biaya iklan naik, laba tidak mengikuti.",
            "CEO meminta Dinar menemukan 'kebocoran' dalam 90 hari. Analisis menunjuk satu angka terabaikan: churn tahunan telah merangkak ke 24%.",
          ] },
          { heading: "Tantangan", paragraphs: [
            "Tim tak tahu pelanggan mana yang akan pergi sampai mereka benar-benar pergi. Program retensi bersifat 'semprot merata' — diskon untuk semua, termasuk yang toh setia. Mahal dan tidak efektif.",
            "Dinar harus memilih: terus menambah anggaran akuisisi, atau membangun kemampuan memprediksi churn yang belum pernah ada.",
          ] },
          { heading: "Keputusan & Pendekatan AI", paragraphs: [
            "Dinar memilih memprediksi. Tim membangun model klasifikasi yang menaksir kemungkinan seorang pelanggan churn dalam 30 hari, dari fitur seperti frekuensi belanja, waktu sejak transaksi terakhir, nilai pesanan, dan keluhan.",
            "Pelanggan berisiko tinggi dikelompokkan agar penawaran retensi dipersonalisasi — bukan lagi diskon merata.",
          ] },
          { heading: "Hasil & Refleksi", paragraphs: [
            "Dalam dua kuartal, churn pada segmen target turun dari 24% ke 17% — turun relatif ~30%. Anggaran promosi malah turun 12% karena diskon lebih tepat sasaran.",
            "Tidak semua mulus: awalnya model salah menandai pelanggan setia sebagai 'berisiko' (false positive), membuang biaya. Tim harus menyetel ambang keputusan.",
          ] },
        ],
        techniques: [
          { name: "Klasifikasi (Supervised)", note: "Memprediksi churn / tidak dari data historis berlabel." },
          { name: "Segmentasi (k-means)", note: "Mengelompokkan pelanggan berisiko untuk personalisasi." },
          { name: "Feature engineering", note: "Mengubah log transaksi menjadi sinyal prediktif." },
        ],
        results: ["Churn segmen target 24% → 17% (turun ~30%).", "Anggaran promosi turun 12%.", "Deteksi risiko 30 hari lebih awal."],
        lessons: ["Memprediksi lebih murah daripada mengakuisisi ulang.", "Ambang keputusan adalah keputusan bisnis, bukan sekadar teknis.", "Kualitas fitur menentukan lebih dari kecanggihan algoritma."],
        questions: ["Bagaimana menjelaskan trade-off false positive ke tim keuangan?", "Fitur tambahan apa yang meningkatkan prediksi, dan risiko privasinya?", "Kapan menambah anggaran akuisisi tetap keputusan yang benar?"],
      },
      en: {
        title: "TokoRuang: Saving the Customers Who Quietly Left",
        subtitle: "An e-commerce firm uses machine learning to cut churn by up to 30%.",
        company: { name: "TokoRuang", industry: "Retail e-commerce", location: "Jakarta, Indonesia", size: "~480 employees, 2.3M active customers" },
        protagonist: { name: "Dinar Prasetya", role: "VP of Growth", quote: "We weren't short on new customers. The problem was losing old ones without ever knowing why." },
        sections: [
          { heading: "Background", paragraphs: [
            "Although new-customer acquisition grew 18% year-on-year, TokoRuang's net revenue was flat. Ad spend rose; profit did not follow.",
            "The CEO asked Dinar to find the 'leak' within 90 days. The analysis pointed to a neglected number: annual churn had crept to 24%.",
          ] },
          { heading: "The Challenge", paragraphs: [
            "The team didn't know which customers would leave until they left. Retention was 'spray and pray' — discounts for everyone, including the loyal. Expensive and ineffective.",
            "Dinar had to choose: keep raising the acquisition budget, or build a churn-prediction capability that never existed.",
          ] },
          { heading: "The Decision & AI Approach", paragraphs: [
            "Dinar chose to predict. The team built a classification model estimating each customer's 30-day churn likelihood from features like purchase frequency, recency, order value, and complaints.",
            "High-risk customers were clustered so retention offers could be personalized — no more blanket discounts.",
          ] },
          { heading: "Results & Reflection", paragraphs: [
            "In two quarters, churn in the target segment fell from 24% to 17% — a ~30% relative drop. Promotion budget actually fell 12% thanks to sharper targeting.",
            "Not all smooth: early on the model mislabeled loyal customers as 'at risk' (false positives), wasting spend. The team had to tune the threshold.",
          ] },
        ],
        techniques: [
          { name: "Classification (Supervised)", note: "Predicts churn / no-churn from labeled data." },
          { name: "Segmentation (k-means)", note: "Groups at-risk customers for personalization." },
          { name: "Feature engineering", note: "Turns transaction logs into predictive signals." },
        ],
        results: ["Target-segment churn 24% → 17% (~30% drop).", "Promotion budget down 12%.", "Risk detected 30 days earlier."],
        lessons: ["Predicting is cheaper than re-acquiring.", "The threshold is a business call, not just technical.", "Feature quality matters more than algorithm sophistication."],
        questions: ["How to explain the false-positive trade-off to finance?", "What extra features improve prediction, and their privacy risks?", "When is raising the acquisition budget still right?"],
      },
      visualization: {
        type: "beforeAfter",
        caption: { id: "Dampak model prediksi churn selama dua kuartal.", en: "Impact of the churn-prediction model over two quarters." },
        metrics: [
          { label: { id: "Tingkat churn", en: "Churn rate" }, before: 24, after: 17, unit: "%", betterWhenLower: true },
          { label: { id: "Anggaran promosi (indeks)", en: "Promo budget (index)" }, before: 100, after: 88, unit: "", betterWhenLower: true },
          { label: { id: "Nilai umur pelanggan (indeks)", en: "Customer LTV (index)" }, before: 100, after: 121, unit: "" },
        ],
      },
      analysisViz: {
        type: "threshold",
        caption: { id: "Menyetel ambang skor churn: rendah = tangkap lebih banyak yang akan pergi (recall naik) tapi lebih banyak salah-alarm ke pelanggan setia.", en: "Tuning the churn-score threshold: lower = catch more leavers (higher recall) but more false alarms to loyal customers." },
        positiveLabel: { id: "Akan churn", en: "Will churn" },
        negativeLabel: { id: "Tetap setia", en: "Will stay" },
        dist: { pos: [0.92, 0.85, 0.78, 0.7, 0.63, 0.56, 0.49, 0.42], neg: [0.08, 0.16, 0.24, 0.33, 0.41, 0.5, 0.58, 0.66, 0.22, 0.35] },
      },
    },

    // ---------- 2 ----------
    {
      slug: "warung-demand-forecast",
      icon: "📦",
      id: {
        title: "Grosir Sejahtera: Menebak Permintaan Sebelum Rak Kosong",
        subtitle: "Peramalan deret waktu menekan kehabisan stok sekaligus barang menumpuk.",
        company: { name: "Grosir Sejahtera", industry: "Distribusi FMCG", location: "Surabaya, Jawa Timur", size: "42 gudang mikro, 3.800 warung mitra" },
        protagonist: { name: "Hendra", role: "Head of Supply Chain", quote: "Kalau stok kosong, warung pindah ke pesaing. Kalau berlebih, modal kami mati di gudang. Keduanya sama-sama menyakitkan." },
        sections: [
          { heading: "Latar", paragraphs: [
            "Grosir Sejahtera memasok ribuan warung. Permintaan naik-turun tajam: musim, gajian, hari besar, bahkan cuaca. Pemesanan ulang masih mengandalkan insting manajer gudang.",
            "Akibatnya: sebagian barang laris sering kosong, sementara barang lain menumpuk hingga kedaluwarsa.",
          ] },
          { heading: "Tantangan", paragraphs: [
            "Setiap produk × gudang punya pola sendiri. Menebak manual untuk ribuan kombinasi mustahil konsisten.",
            "Hendra butuh peramalan yang menangkap musiman (mis. lonjakan menjelang hari besar) dan tren, tapi tetap bisa dijelaskan ke tim gudang yang skeptis.",
          ] },
          { heading: "Keputusan & Pendekatan AI", paragraphs: [
            "Tim membangun model peramalan deret waktu (regresi dengan komponen musiman) yang memprediksi permintaan per produk per gudang untuk 2 minggu ke depan.",
            "Prediksi diterjemahkan menjadi titik pemesanan ulang otomatis. Manajer gudang tetap bisa menimpa keputusan — membangun kepercayaan bertahap.",
          ] },
          { heading: "Hasil & Refleksi", paragraphs: [
            "Kehabisan stok turun 41%, sementara barang kedaluwarsa turun 28%. Modal kerja yang tertahan di stok berlebih berkurang signifikan.",
            "Pelajaran: event tak terduga (mis. viral di media sosial) tetap mengecoh model. Sistem terbaik memadukan ramalan mesin dengan pengetahuan lokal manusia.",
          ] },
        ],
        techniques: [
          { name: "Peramalan Deret Waktu", note: "Memprediksi permintaan masa depan dari pola historis." },
          { name: "Regresi + musiman", note: "Menangkap tren dan lonjakan berulang (hari besar)." },
          { name: "Human override", note: "Manajer gudang dapat menyesuaikan hasil." },
        ],
        results: ["Kehabisan stok turun 41%.", "Barang kedaluwarsa turun 28%.", "Modal kerja di stok berlebih berkurang signifikan."],
        lessons: ["Peramalan baik menyeimbangkan stok kosong vs menumpuk.", "Event viral/anomali tetap butuh penilaian manusia.", "Kepercayaan tim tumbuh saat mereka bisa menimpa keputusan."],
        questions: ["Bagaimana model menangani produk baru tanpa riwayat?", "Kapan sebaiknya mempercayai ramalan vs insting gudang?", "Metrik apa: akurasi ramalan atau biaya total rantai pasok?"],
      },
      en: {
        title: "Grosir Sejahtera: Predicting Demand Before Shelves Go Empty",
        subtitle: "Time-series forecasting cuts both stockouts and overstock.",
        company: { name: "Grosir Sejahtera", industry: "FMCG distribution", location: "Surabaya, East Java", size: "42 micro-warehouses, 3,800 partner shops" },
        protagonist: { name: "Hendra", role: "Head of Supply Chain", quote: "Empty shelves send shops to competitors. Overstock kills our capital in the warehouse. Both hurt equally." },
        sections: [
          { heading: "Background", paragraphs: [
            "Grosir Sejahtera supplies thousands of small shops. Demand swings sharply: seasons, paydays, holidays, even weather. Reordering still relied on warehouse managers' instinct.",
            "As a result, best-sellers often ran out while other goods piled up to expiry.",
          ] },
          { heading: "The Challenge", paragraphs: [
            "Every product × warehouse has its own pattern. Guessing manually for thousands of combinations can't be consistent.",
            "Hendra needed forecasting that captured seasonality (e.g. holiday spikes) and trend, yet remained explainable to a skeptical warehouse team.",
          ] },
          { heading: "The Decision & AI Approach", paragraphs: [
            "The team built a time-series forecasting model (regression with seasonal components) predicting demand per product per warehouse for the next 2 weeks.",
            "Forecasts became automatic reorder points. Managers could still override — building trust gradually.",
          ] },
          { heading: "Results & Reflection", paragraphs: [
            "Stockouts fell 41%, while expired goods fell 28%. Working capital tied up in overstock dropped significantly.",
            "Lesson: unexpected events (e.g. going viral) still fooled the model. The best system blends machine forecasts with local human knowledge.",
          ] },
        ],
        techniques: [
          { name: "Time-Series Forecasting", note: "Predicts future demand from historical patterns." },
          { name: "Regression + seasonality", note: "Captures trend and recurring spikes (holidays)." },
          { name: "Human override", note: "Warehouse managers can adjust the output." },
        ],
        results: ["Stockouts down 41%.", "Expired goods down 28%.", "Capital tied in overstock reduced significantly."],
        lessons: ["Good forecasting balances stockouts vs overstock.", "Viral/anomaly events still need human judgment.", "Trust grows when the team can override."],
        questions: ["How does the model handle new products with no history?", "When to trust the forecast vs warehouse instinct?", "Which metric: forecast accuracy or total supply-chain cost?"],
      },
      visualization: {
        type: "beforeAfter",
        caption: { id: "Dampak peramalan permintaan pada operasi gudang.", en: "Impact of demand forecasting on warehouse operations." },
        metrics: [
          { label: { id: "Kejadian stok kosong", en: "Stockout incidents" }, before: 100, after: 59, unit: "", betterWhenLower: true },
          { label: { id: "Barang kedaluwarsa", en: "Expired goods" }, before: 100, after: 72, unit: "", betterWhenLower: true },
          { label: { id: "Ketersediaan produk", en: "Product availability" }, before: 86, after: 96, unit: "%" },
        ],
      },
      analysisViz: {
        type: "pipeline",
        caption: { id: "Bagaimana data penjualan berubah menjadi titik pemesanan ulang.", en: "How sales data turns into a reorder point." },
        stages: [
          { icon: "🧾", label: { id: "Data penjualan", en: "Sales data" }, detail: { id: "Riwayat penjualan harian per produk per gudang dikumpulkan.", en: "Daily sales history per product per warehouse is collected." } },
          { icon: "📅", label: { id: "Pola musiman", en: "Seasonality" }, detail: { id: "Model memisahkan tren, musiman (hari besar), dan noise.", en: "The model separates trend, seasonality (holidays), and noise." } },
          { icon: "📈", label: { id: "Ramalan 2 minggu", en: "2-week forecast" }, detail: { id: "Regresi memproyeksikan permintaan untuk periode mendatang.", en: "Regression projects demand for the coming period." } },
          { icon: "🎯", label: { id: "Titik pesan ulang", en: "Reorder point" }, detail: { id: "Ramalan + stok pengaman menentukan kapan & berapa memesan.", en: "Forecast + safety stock sets when & how much to reorder." } },
          { icon: "🧑", label: { id: "Tinjauan manajer", en: "Manager review" }, detail: { id: "Manajer dapat menimpa jika ada info lokal (mis. event).", en: "Managers can override with local info (e.g. an event)." } },
        ],
      },
    },

    // ---------- 3 ----------
    {
      slug: "bank-fraud-detection",
      icon: "🛡️",
      id: {
        title: "Bank Amanah: Menangkap Penipuan dalam Hitungan Milidetik",
        subtitle: "Deteksi anomali menahan transaksi mencurigakan sebelum uang hilang.",
        company: { name: "Bank Amanah", industry: "Perbankan digital", location: "Jakarta, Indonesia", size: "6,1 juta nasabah, 40 juta transaksi/hari" },
        protagonist: { name: "Sarah Wibowo", role: "Head of Risk & Fraud", quote: "Kami punya waktu kurang dari sedetik untuk memutuskan: loloskan transaksi, atau tahan. Salah sedikit, nasabah kabur atau uang melayang." },
        sections: [
          { heading: "Latar", paragraphs: [
            "Seiring pertumbuhan transaksi digital, kerugian akibat penipuan (kartu dicuri, ambil-alih akun) meningkat. Aturan manual berbasis 'jika-maka' cepat ketinggalan dari modus baru.",
            "Sarah butuh sistem yang belajar dari pola dan menangkap transaksi tak wajar secara real-time.",
          ] },
          { heading: "Tantangan", paragraphs: [
            "Penipuan sangat langka (< 0,1% transaksi) — data sangat tidak seimbang. Terlalu agresif, banyak transaksi sah ditolak (nasabah marah). Terlalu longgar, penipuan lolos.",
            "Setiap keputusan harus dibuat dalam milidetik, di tengah 40 juta transaksi per hari.",
          ] },
          { heading: "Keputusan & Pendekatan AI", paragraphs: [
            "Tim membangun deteksi anomali: model belajar 'seperti apa perilaku normal' tiap nasabah, lalu menandai transaksi yang menyimpang jauh (lokasi asing, jumlah tak biasa, kecepatan mencurigakan).",
            "Skor risiko menentukan aksi: loloskan, minta verifikasi tambahan (OTP), atau tahan. Kasus abu-abu diteruskan ke analis manusia.",
          ] },
          { heading: "Hasil & Refleksi", paragraphs: [
            "Kerugian penipuan turun 54%, sementara transaksi sah yang salah ditolak justru turun karena penargetan lebih cerdas ketimbang aturan kaku.",
            "Tantangan berkelanjutan: penipu beradaptasi. Model harus dilatih ulang rutin, dan tim mengawasi 'model drift' agar performa tak menurun.",
          ] },
        ],
        techniques: [
          { name: "Deteksi Anomali (Unsupervised)", note: "Menandai transaksi yang menyimpang dari perilaku normal." },
          { name: "Klasifikasi risiko", note: "Skor risiko menentukan loloskan / verifikasi / tahan." },
          { name: "Human-in-the-loop", note: "Analis meninjau kasus abu-abu." },
        ],
        results: ["Kerugian penipuan turun 54%.", "Penolakan transaksi sah menurun.", "Keputusan dalam milidetik pada skala 40 juta/hari."],
        lessons: ["Data sangat tidak seimbang butuh pendekatan khusus.", "Menyeimbangkan pengalaman nasabah vs keamanan.", "Penipu beradaptasi — model harus terus diperbarui."],
        questions: ["Bagaimana menangani kelas yang sangat tidak seimbang?", "Berapa biaya sebuah false positive bagi nasabah?", "Kapan verifikasi tambahan lebih baik daripada menolak langsung?"],
      },
      en: {
        title: "Bank Amanah: Catching Fraud in Milliseconds",
        subtitle: "Anomaly detection holds suspicious transactions before money is lost.",
        company: { name: "Bank Amanah", industry: "Digital banking", location: "Jakarta, Indonesia", size: "6.1M customers, 40M transactions/day" },
        protagonist: { name: "Sarah Wibowo", role: "Head of Risk & Fraud", quote: "We have under a second to decide: let the transaction through, or hold it. Get it wrong and a customer leaves — or money disappears." },
        sections: [
          { heading: "Background", paragraphs: [
            "As digital transactions grew, fraud losses (stolen cards, account takeover) rose. Manual 'if-then' rules quickly fell behind new schemes.",
            "Sarah needed a system that learns from patterns and catches unusual transactions in real time.",
          ] },
          { heading: "The Challenge", paragraphs: [
            "Fraud is very rare (< 0.1% of transactions) — highly imbalanced data. Too aggressive, and many legit transactions get declined (angry customers). Too lax, and fraud slips through.",
            "Every decision must be made in milliseconds, amid 40 million transactions a day.",
          ] },
          { heading: "The Decision & AI Approach", paragraphs: [
            "The team built anomaly detection: the model learns 'what normal looks like' for each customer, then flags transactions that deviate strongly (foreign location, unusual amount, suspicious velocity).",
            "A risk score sets the action: allow, request extra verification (OTP), or hold. Borderline cases go to human analysts.",
          ] },
          { heading: "Results & Reflection", paragraphs: [
            "Fraud losses fell 54%, while wrongly declined legit transactions actually dropped thanks to smarter targeting over rigid rules.",
            "Ongoing challenge: fraudsters adapt. The model must be retrained regularly, and the team watches for 'model drift'.",
          ] },
        ],
        techniques: [
          { name: "Anomaly Detection (Unsupervised)", note: "Flags transactions deviating from normal behavior." },
          { name: "Risk classification", note: "A risk score sets allow / verify / hold." },
          { name: "Human-in-the-loop", note: "Analysts review borderline cases." },
        ],
        results: ["Fraud losses down 54%.", "Fewer wrongly declined legit transactions.", "Decisions in milliseconds at 40M/day scale."],
        lessons: ["Highly imbalanced data needs special handling.", "Balancing customer experience vs security.", "Fraudsters adapt — models must keep updating."],
        questions: ["How to handle highly imbalanced classes?", "What is the cost of a false positive to a customer?", "When is extra verification better than an outright decline?"],
      },
      visualization: {
        type: "funnel",
        caption: { id: "Bagaimana 40 juta transaksi harian disaring — klik tiap tahap.", en: "How 40M daily transactions are filtered — click each stage." },
        stages: [
          { label: { id: "Transaksi masuk", en: "Transactions in" }, value: 40000000, note: { id: "Semua transaksi harian yang harus dinilai.", en: "All daily transactions to be scored." } },
          { label: { id: "Ditandai anomali", en: "Flagged anomalies" }, value: 82000, note: { id: "Menyimpang dari perilaku normal nasabah.", en: "Deviating from the customer's normal behavior." } },
          { label: { id: "Minta verifikasi (OTP)", en: "Verification asked" }, value: 15000, note: { id: "Risiko sedang: konfirmasi tambahan, bukan tolak langsung.", en: "Medium risk: extra confirmation, not an outright decline." } },
          { label: { id: "Penipuan dicegah", en: "Fraud prevented" }, value: 2100, note: { id: "Transaksi penipuan yang berhasil dihentikan.", en: "Fraudulent transactions successfully stopped." } },
        ],
      },
      analysisViz: {
        type: "threshold",
        caption: { id: "Menyetel ambang skor risiko: menyeimbangkan menahan penipuan (recall) vs mengganggu nasabah sah (presisi).", en: "Tuning the risk-score threshold: balancing stopping fraud (recall) vs bothering legit customers (precision)." },
        positiveLabel: { id: "Penipuan", en: "Fraud" },
        negativeLabel: { id: "Transaksi sah", en: "Legit transaction" },
        dist: { pos: [0.95, 0.9, 0.84, 0.77, 0.7, 0.62, 0.54, 0.46], neg: [0.05, 0.12, 0.2, 0.28, 0.36, 0.44, 0.52, 0.6, 0.15, 0.25, 0.33, 0.4] },
      },
    },

    // ---------- 4 ----------
    {
      slug: "ecommerce-recommender",
      icon: "🎁",
      id: {
        title: "GayaKita: Menemukan Produk yang 'Pas' untuk Tiap Pembeli",
        subtitle: "Sistem rekomendasi meningkatkan penjualan tanpa menambah lalu lintas.",
        company: { name: "GayaKita", industry: "E-commerce fesyen", location: "Bandung, Indonesia", size: "1,4 juta pengguna aktif bulanan" },
        protagonist: { name: "Aletta", role: "Chief Product Officer", quote: "Katalog kami 200 ribu produk. Tanpa bantuan, pembeli tersesat dan pergi dengan keranjang kosong." },
        sections: [
          { heading: "Latar", paragraphs: [
            "GayaKita punya katalog raksasa, tapi pembeli hanya melihat sebagian kecil sebelum menyerah. Halaman 'produk populer' yang sama untuk semua orang terasa tidak relevan.",
            "Aletta ingin tiap pembeli melihat produk yang benar-benar cocok dengan selera mereka.",
          ] },
          { heading: "Tantangan", paragraphs: [
            "Selera fesyen sangat personal dan berubah. Pengguna baru belum punya riwayat ('cold start'). Merekomendasikan barang yang itu-itu saja membuat pembeli bosan.",
            "Aletta harus meningkatkan relevansi tanpa menjebak pengguna dalam 'gelembung' yang sempit.",
          ] },
          { heading: "Keputusan & Pendekatan AI", paragraphs: [
            "Tim membangun sistem rekomendasi: collaborative filtering ('pengguna seperti Anda juga menyukai...') dipadu kemiripan konten produk (warna, kategori, gaya) untuk mengatasi cold start.",
            "Sedikit unsur eksplorasi disisipkan agar rekomendasi tetap segar, bukan sekadar mengulang selera lama.",
          ] },
          { heading: "Hasil & Refleksi", paragraphs: [
            "Tingkat klik pada produk yang direkomendasikan naik 2,3×, dan nilai pesanan rata-rata naik 19% — tanpa menambah biaya akuisisi lalu lintas.",
            "Refleksi: metrik jangka pendek (klik) bisa menyesatkan. Tim mulai mengukur kepuasan jangka panjang agar sistem tak sekadar memancing klik.",
          ] },
        ],
        techniques: [
          { name: "Collaborative Filtering", note: "Rekomendasi dari pola 'pengguna serupa'." },
          { name: "Content-based + Embeddings", note: "Kemiripan produk untuk mengatasi cold start." },
          { name: "Eksplorasi vs Eksploitasi", note: "Menjaga rekomendasi tetap segar." },
        ],
        results: ["Klik produk rekomendasi naik 2,3×.", "Nilai pesanan rata-rata naik 19%.", "Peningkatan tanpa menambah biaya lalu lintas."],
        lessons: ["Menggabungkan sinyal mengatasi kelemahan masing-masing metode.", "Cold start butuh sinyal konten, bukan hanya riwayat.", "Optimasi klik jangka pendek bisa menyesatkan."],
        questions: ["Bagaimana merekomendasikan untuk pengguna yang benar-benar baru?", "Bagaimana menghindari 'gelembung filter' yang menyempitkan pilihan?", "Metrik apa yang mencerminkan kepuasan jangka panjang?"],
      },
      en: {
        title: "GayaKita: Finding the 'Right' Product for Each Shopper",
        subtitle: "A recommender lifts sales without adding traffic.",
        company: { name: "GayaKita", industry: "Fashion e-commerce", location: "Bandung, Indonesia", size: "1.4M monthly active users" },
        protagonist: { name: "Aletta", role: "Chief Product Officer", quote: "Our catalog has 200,000 products. Without help, shoppers get lost and leave with an empty cart." },
        sections: [
          { heading: "Background", paragraphs: [
            "GayaKita had a huge catalog, but shoppers saw only a sliver before giving up. The same 'popular products' page for everyone felt irrelevant.",
            "Aletta wanted each shopper to see products that truly matched their taste.",
          ] },
          { heading: "The Challenge", paragraphs: [
            "Fashion taste is deeply personal and shifting. New users have no history ('cold start'). Recommending the same items over and over bores shoppers.",
            "Aletta had to raise relevance without trapping users in a narrow 'bubble'.",
          ] },
          { heading: "The Decision & AI Approach", paragraphs: [
            "The team built a recommender: collaborative filtering ('users like you also liked...') combined with product content similarity (color, category, style) to handle cold start.",
            "A dash of exploration was added so recommendations stayed fresh, not just replays of old taste.",
          ] },
          { heading: "Results & Reflection", paragraphs: [
            "Click-through on recommended products rose 2.3×, and average order value rose 19% — without extra traffic-acquisition cost.",
            "Reflection: short-term metrics (clicks) can mislead. The team began measuring long-term satisfaction so the system wouldn't just bait clicks.",
          ] },
        ],
        techniques: [
          { name: "Collaborative Filtering", note: "Recommends from 'similar users' patterns." },
          { name: "Content-based + Embeddings", note: "Product similarity to handle cold start." },
          { name: "Exploration vs Exploitation", note: "Keeps recommendations fresh." },
        ],
        results: ["Recommended-product clicks up 2.3×.", "Average order value up 19%.", "Gains without extra traffic cost."],
        lessons: ["Combining signals offsets each method's weakness.", "Cold start needs content signals, not just history.", "Optimizing short-term clicks can mislead."],
        questions: ["How to recommend for a brand-new user?", "How to avoid a 'filter bubble' that narrows choices?", "Which metric reflects long-term satisfaction?"],
      },
      visualization: {
        type: "beforeAfter",
        caption: { id: "Dampak sistem rekomendasi pada perilaku belanja.", en: "Impact of the recommender on shopping behavior." },
        metrics: [
          { label: { id: "Klik produk rekomendasi (indeks)", en: "Recommended clicks (index)" }, before: 100, after: 230, unit: "" },
          { label: { id: "Nilai pesanan rata-rata (indeks)", en: "Avg order value (index)" }, before: 100, after: 119, unit: "" },
          { label: { id: "Produk dilihat/sesi", en: "Products viewed/session" }, before: 6, after: 11, unit: "" },
        ],
      },
      analysisViz: {
        type: "scatterCluster",
        caption: { id: "Rekomendasi memetakan produk & pembeli dalam 'ruang selera'; item yang berdekatan disarankan bersama.", en: "The recommender maps products & shoppers in a 'taste space'; nearby items are suggested together." },
        xLabel: { id: "Gaya (kasual ↔ formal)", en: "Style (casual ↔ formal)" },
        yLabel: { id: "Rentang harga", en: "Price range" },
        groups: [
          { name: { id: "Kasual harian", en: "Everyday casual" }, color: "#0093D0", points: [[0.2, 0.25], [0.3, 0.2], [0.15, 0.35], [0.28, 0.3]] },
          { name: { id: "Formal premium", en: "Premium formal" }, color: "#F5A200", points: [[0.8, 0.82], [0.72, 0.75], [0.85, 0.7], [0.78, 0.88]] },
          { name: { id: "Olahraga", en: "Sportswear" }, color: "#059669", points: [[0.5, 0.45], [0.45, 0.5], [0.55, 0.4], [0.48, 0.55]] },
        ],
      },
    },

    // ---------- 5 ----------
    {
      slug: "callcenter-nlp-routing",
      icon: "📞",
      id: {
        title: "Sinar Telekom: Membaca Ribuan Keluhan Tanpa Membaca Satu per Satu",
        subtitle: "NLP mengelompokkan & mengarahkan keluhan pelanggan secara otomatis.",
        company: { name: "Sinar Telekom", industry: "Telekomunikasi", location: "Medan, Sumatera Utara", size: "9 juta pelanggan, 20.000 tiket/hari" },
        protagonist: { name: "Bimo", role: "VP Customer Care", quote: "Tiap hari 20 ribu keluhan masuk. Membaca dan menyalurkannya secara manual membuat pelanggan menunggu berjam-jam." },
        sections: [
          { heading: "Latar", paragraphs: [
            "Pusat layanan Sinar Telekom kebanjiran tiket melalui chat, email, dan media sosial. Agen menghabiskan waktu hanya untuk membaca, mengategorikan, dan mengarahkan tiap tiket ke tim yang tepat.",
            "Akibatnya, keluhan mendesak (mis. gangguan massal) tenggelam di antara pertanyaan rutin.",
          ] },
          { heading: "Tantangan", paragraphs: [
            "Keluhan ditulis dalam bahasa sehari-hari, campur bahasa daerah, singkatan, dan salah ketik. Kategorisasi manual lambat dan tidak konsisten antar-agen.",
            "Bimo ingin tiap tiket otomatis dikategorikan, diukur sentimennya, dan diarahkan — sambil menaikkan yang genting ke atas antrean.",
          ] },
          { heading: "Keputusan & Pendekatan AI", paragraphs: [
            "Tim membangun pipeline NLP: analisis sentimen menandai tiket marah/genting, klasifikasi topik mengarahkan ke tim yang tepat, dan pengelompokan menemukan lonjakan keluhan serupa (indikasi gangguan massal).",
            "Agen tetap menangani percakapan; AI hanya menyortir, memberi konteks, dan memprioritaskan.",
          ] },
          { heading: "Hasil & Refleksi", paragraphs: [
            "Waktu penyaluran tiket turun dari rata-rata 38 menit menjadi hampir instan. Deteksi gangguan massal lebih cepat karena lonjakan keluhan serupa langsung terlihat.",
            "Refleksi: model perlu contoh bahasa lokal yang cukup; awalnya salah membaca istilah gaul dan bahasa daerah. Data pelatihan yang representatif jadi kunci.",
          ] },
        ],
        techniques: [
          { name: "Analisis Sentimen (NLP)", note: "Menandai tiket marah/genting untuk diprioritaskan." },
          { name: "Klasifikasi Topik", note: "Mengarahkan tiket ke tim yang tepat." },
          { name: "Clustering", note: "Menemukan lonjakan keluhan serupa (gangguan massal)." },
        ],
        results: ["Waktu penyaluran 38 menit → hampir instan.", "Deteksi gangguan massal lebih cepat.", "Agen fokus menyelesaikan, bukan menyortir."],
        lessons: ["NLP butuh data bahasa lokal yang representatif.", "AI menyortir & memprioritaskan; manusia menyelesaikan.", "Clustering mengubah banyak keluhan menjadi sinyal operasional."],
        questions: ["Bagaimana menangani campur kode & bahasa daerah?", "Apa risiko salah prioritas terhadap keluhan genting?", "Kapan tiket harus selalu ditangani manusia?"],
      },
      en: {
        title: "Sinar Telekom: Reading Thousands of Complaints Without Reading Each One",
        subtitle: "NLP auto-groups and routes customer complaints.",
        company: { name: "Sinar Telekom", industry: "Telecommunications", location: "Medan, North Sumatra", size: "9M subscribers, 20,000 tickets/day" },
        protagonist: { name: "Bimo", role: "VP Customer Care", quote: "20,000 complaints arrive daily. Reading and routing them by hand kept customers waiting for hours." },
        sections: [
          { heading: "Background", paragraphs: [
            "Sinar Telekom's care center was flooded with tickets via chat, email, and social media. Agents spent time just reading, categorizing, and routing each ticket to the right team.",
            "As a result, urgent complaints (e.g. a mass outage) drowned among routine questions.",
          ] },
          { heading: "The Challenge", paragraphs: [
            "Complaints are written in everyday language, mixed regional dialects, abbreviations, and typos. Manual categorization is slow and inconsistent across agents.",
            "Bimo wanted each ticket auto-categorized, sentiment-scored, and routed — while pushing urgent ones up the queue.",
          ] },
          { heading: "The Decision & AI Approach", paragraphs: [
            "The team built an NLP pipeline: sentiment analysis flags angry/urgent tickets, topic classification routes to the right team, and clustering finds surges of similar complaints (a mass-outage signal).",
            "Agents still handle conversations; the AI only sorts, adds context, and prioritizes.",
          ] },
          { heading: "Results & Reflection", paragraphs: [
            "Ticket routing time dropped from an average of 38 minutes to nearly instant. Mass-outage detection sped up as surges of similar complaints became visible immediately.",
            "Reflection: the model needed enough local-language examples; early on it misread slang and dialects. Representative training data was key.",
          ] },
        ],
        techniques: [
          { name: "Sentiment Analysis (NLP)", note: "Flags angry/urgent tickets to prioritize." },
          { name: "Topic Classification", note: "Routes tickets to the right team." },
          { name: "Clustering", note: "Finds surges of similar complaints (mass outage)." },
        ],
        results: ["Routing time 38 min → near-instant.", "Faster mass-outage detection.", "Agents focus on resolving, not sorting."],
        lessons: ["NLP needs representative local-language data.", "AI sorts & prioritizes; humans resolve.", "Clustering turns many complaints into an operational signal."],
        questions: ["How to handle code-mixing & regional dialects?", "What is the risk of mis-prioritizing an urgent complaint?", "When must a ticket always be handled by a human?"],
      },
      visualization: {
        type: "timeline",
        caption: { id: "Tahapan menerapkan pipeline NLP untuk layanan pelanggan.", en: "Stages of deploying the customer-service NLP pipeline." },
        milestones: [
          { when: { id: "Bulan 1", en: "Month 1" }, title: { id: "Kumpulkan & beri label tiket", en: "Collect & label tickets" }, detail: { id: "Mengumpulkan tiket lama, memberi label kategori & sentimen (termasuk bahasa lokal).", en: "Gather past tickets, label category & sentiment (incl. local language)." } },
          { when: { id: "Bulan 2", en: "Month 2" }, title: { id: "Latih sentimen + topik", en: "Train sentiment + topic" }, detail: { id: "Model NLP dilatih mengenali sentimen dan topik keluhan.", en: "NLP models trained to recognize complaint sentiment and topic." } },
          { when: { id: "Bulan 3", en: "Month 3" }, title: { id: "Clustering lonjakan", en: "Surge clustering" }, detail: { id: "Menambahkan clustering untuk mendeteksi gangguan massal otomatis.", en: "Add clustering to auto-detect mass outages." } },
          { when: { id: "Bulan 4", en: "Month 4" }, title: { id: "Peluncuran + pemantauan", en: "Rollout + monitoring" }, detail: { id: "Diluncurkan dengan pemantauan akurasi rutin dan umpan balik agen.", en: "Launched with routine accuracy monitoring and agent feedback." } },
        ],
      },
      analysisViz: {
        type: "pipeline",
        caption: { id: "Bagaimana sebuah keluhan diproses dari teks mentah hingga tim yang tepat.", en: "How a complaint flows from raw text to the right team." },
        stages: [
          { icon: "💬", label: { id: "Keluhan masuk", en: "Complaint in" }, detail: { id: "Teks keluhan diterima dari chat/email/media sosial.", en: "Complaint text arrives via chat/email/social." } },
          { icon: "🧩", label: { id: "Tokenisasi", en: "Tokenize" }, detail: { id: "Teks dipecah menjadi token untuk diproses.", en: "Text is split into tokens for processing." } },
          { icon: "😊", label: { id: "Sentimen", en: "Sentiment" }, detail: { id: "Menilai apakah pelanggan marah/genting untuk prioritas.", en: "Scores whether the customer is angry/urgent for priority." } },
          { icon: "🏷️", label: { id: "Klasifikasi topik", en: "Classify topic" }, detail: { id: "Menentukan kategori: tagihan, jaringan, perangkat, dsb.", en: "Determines the category: billing, network, device, etc." } },
          { icon: "🔀", label: { id: "Diarahkan", en: "Routed" }, detail: { id: "Tiket dikirim ke tim yang tepat, yang genting naik antrean.", en: "The ticket is sent to the right team; urgent ones jump the queue." } },
        ],
      },
    },
  ],

  health: [
    // ---------- 1 ----------
    {
      slug: "harapan-xray-triage",
      icon: "🩺",
      id: {
        title: "RS Harapan: Antrean Radiologi yang Tak Kunjung Habis",
        subtitle: "Deep learning memprioritaskan rontgen dada kritis — dokter tetap memutuskan.",
        company: { name: "Rumah Sakit Harapan", industry: "Layanan kesehatan", location: "Surabaya, Indonesia", size: "620 tempat tidur, 8 radiolog" },
        protagonist: { name: "dr. Anita Wijaya, Sp.Rad", role: "Kepala Departemen Radiologi", quote: "Setiap penundaan pembacaan adalah taruhan. Pertanyaannya bukan apakah kami cukup teliti, tapi apakah kami cukup cepat." },
        sections: [
          { heading: "Latar", paragraphs: [
            "RS Harapan memproses lebih dari 300 rontgen dada per hari, tetapi hanya punya 8 radiolog. Antrean pembacaan bisa mengular hingga 24 jam pada hari sibuk.",
            "Sebagian besar hasil normal, namun sebagian kecil menunjukkan kondisi kritis seperti pneumotoraks yang butuh tindakan segera. dr. Anita khawatir kasus genting tenggelam di tumpukan.",
          ] },
          { heading: "Tantangan", paragraphs: [
            "Menambah radiolog sulit — mereka langka dan mahal. Meminta mereka membaca lebih cepat berisiko menaikkan kesalahan.",
            "Ada pula kekhawatiran etis dan hukum: apa yang terjadi jika AI melewatkan sesuatu? Siapa yang bertanggung jawab?",
          ] },
          { heading: "Keputusan & Pendekatan AI", paragraphs: [
            "Alih-alih membiarkan AI mendiagnosis, dr. Anita memilih peran yang lebih aman: triase. Model deep learning (CNN) memberi skor kemungkinan temuan kritis pada tiap rontgen, lalu mengurutkan ulang antrean.",
            "Poin penting: AI tidak pernah membuat keputusan akhir. Setiap gambar tetap dibaca manusia. AI hanya mengubah urutan.",
          ] },
          { heading: "Hasil & Refleksi", paragraphs: [
            "Waktu tunggu pembacaan untuk kasus kritis turun dari rata-rata 11 jam menjadi kurang dari 2 jam. Tidak ada radiolog yang dikurangi.",
            "Tantangan berlanjut: model kadang memberi 'alarm palsu', dan performa harus diaudit rutin agar tidak menurun (model drift).",
          ] },
        ],
        techniques: [
          { name: "CNN / Deep Learning", note: "Menganalisis citra rontgen untuk skor risiko." },
          { name: "Triase (prioritas), bukan diagnosis", note: "AI mengurutkan antrean; dokter tetap memutuskan." },
          { name: "Human-in-the-loop", note: "Setiap hasil tetap diverifikasi manusia." },
        ],
        results: ["Waktu tunggu kasus kritis: 11 jam → <2 jam.", "Tidak ada pengurangan radiolog.", "Kasus genting jarang lagi tenggelam di antrean."],
        lessons: ["Di domain berisiko tinggi, AI sebagai 'asisten triase' lebih bijak daripada 'pengambil keputusan'.", "Human-in-the-loop menjaga akuntabilitas medis & hukum.", "Model perlu diaudit terus-menerus."],
        questions: ["Mengapa AI untuk triase lebih aman daripada diagnosis akhir?", "Bagaimana menangani tanggung jawab bila AI salah prioritas?", "Metode apa untuk memantau agar model tidak menurun?"],
      },
      en: {
        title: "Harapan Hospital: The Radiology Queue That Never Ended",
        subtitle: "Deep learning prioritizes critical chest X-rays — doctors still decide.",
        company: { name: "Harapan Hospital", industry: "Healthcare", location: "Surabaya, Indonesia", size: "620 beds, 8 radiologists" },
        protagonist: { name: "Dr. Anita Wijaya", role: "Head of Radiology", quote: "Every reading delay is a gamble. The question wasn't whether we were careful enough, but whether we were fast enough." },
        sections: [
          { heading: "Background", paragraphs: [
            "Harapan Hospital processes over 300 chest X-rays a day but has only 8 radiologists. The reading queue could stretch to 24 hours on busy days.",
            "Most results are normal, yet a small fraction show critical conditions like pneumothorax needing immediate action. Dr. Anita worried urgent cases were buried in the pile.",
          ] },
          { heading: "The Challenge", paragraphs: [
            "Hiring more radiologists was hard — scarce and expensive. Asking them to read faster risked more errors.",
            "There were ethical and legal concerns too: what if the AI misses something? Who is responsible?",
          ] },
          { heading: "The Decision & AI Approach", paragraphs: [
            "Rather than letting AI diagnose, Dr. Anita chose a safer role: triage. A deep learning model (CNN) scores each X-ray's likelihood of a critical finding, then re-orders the queue.",
            "The key point: the AI never makes the final decision. Every image is still read by a human. The AI only changes the order.",
          ] },
          { heading: "Results & Reflection", paragraphs: [
            "Reading wait time for critical cases dropped from an average of 11 hours to under 2. No radiologists were cut.",
            "Challenges remained: the model sometimes gave 'false alarms', and performance must be audited regularly to avoid drift.",
          ] },
        ],
        techniques: [
          { name: "CNN / Deep Learning", note: "Analyzes X-ray images for a risk score." },
          { name: "Triage (prioritization), not diagnosis", note: "AI orders the queue; doctors still decide." },
          { name: "Human-in-the-loop", note: "Every result is still verified by a human." },
        ],
        results: ["Critical-case wait time: 11h → <2h.", "No radiologists cut.", "Urgent cases rarely buried in the queue anymore."],
        lessons: ["In high-stakes domains, AI as a 'triage assistant' beats a 'decision maker'.", "Human-in-the-loop preserves medical & legal accountability.", "Models need continuous auditing."],
        questions: ["Why is AI for triage safer than final diagnosis?", "How to handle liability if the AI mis-prioritizes?", "What methods monitor the model against drift?"],
      },
      visualization: {
        type: "beforeAfter",
        caption: { id: "Dampak triase berbasis AI pada alur radiologi.", en: "Impact of AI-based triage on the radiology workflow." },
        metrics: [
          { label: { id: "Waktu tunggu kasus kritis (jam)", en: "Critical-case wait (hours)" }, before: 11, after: 2, unit: "j", betterWhenLower: true, decimals: 0 },
          { label: { id: "Kasus genting terlewat (indeks)", en: "Missed urgent (index)" }, before: 100, after: 31, unit: "", betterWhenLower: true },
          { label: { id: "Kepuasan radiolog", en: "Radiologist satisfaction" }, before: 3.1, after: 4.3, unit: "/5", decimals: 1 },
        ],
      },
      analysisViz: {
        type: "threshold",
        caption: { id: "Menyetel ambang skor kritis: rendah = tangkap lebih banyak kasus genting (recall) tapi lebih banyak alarm palsu.", en: "Tuning the critical-score threshold: lower = catch more urgent cases (recall) but more false alarms." },
        positiveLabel: { id: "Kritis", en: "Critical" },
        negativeLabel: { id: "Normal", en: "Normal" },
        dist: { pos: [0.94, 0.88, 0.8, 0.72, 0.64, 0.56, 0.48], neg: [0.06, 0.14, 0.22, 0.3, 0.38, 0.46, 0.54, 0.62, 0.2, 0.33] },
      },
    },

    // ---------- 2 ----------
    {
      slug: "puskesmas-risk-screening",
      icon: "❤️",
      id: {
        title: "Puskesmas Sehat: Menemukan Risiko Diabetes Sebelum Terlambat",
        subtitle: "Klasifikasi risiko membantu skrining massal di layanan primer.",
        company: { name: "Dinas Kesehatan Kabupaten (Puskesmas Sehat)", industry: "Layanan kesehatan primer", location: "Klaten, Jawa Tengah", size: "28 puskesmas, ~310.000 warga" },
        protagonist: { name: "dr. Fitri", role: "Kepala Program Penyakit Tidak Menular", quote: "Banyak warga baru tahu mereka diabetes setelah komplikasi. Kami ingin menjangkau mereka jauh sebelum itu." },
        sections: [
          { heading: "Latar", paragraphs: [
            "Penyakit tidak menular seperti diabetes tipe 2 meningkat, sering terdiagnosis terlambat saat sudah ada komplikasi. Skrining massal mahal jika semua orang menjalani tes laboratorium lengkap.",
            "dr. Fitri ingin memfokuskan sumber daya tes pada warga yang paling berisiko.",
          ] },
          { heading: "Tantangan", paragraphs: [
            "Puskesmas punya banyak data sederhana (usia, IMT, tekanan darah, riwayat keluarga, lingkar pinggang) tapi tak punya kapasitas tes lab untuk semua.",
            "Model harus dapat dijelaskan ke tenaga kesehatan dan tidak menggantikan diagnosis dokter — hanya membantu memprioritaskan siapa yang perlu tes lanjutan.",
          ] },
          { heading: "Keputusan & Pendekatan AI", paragraphs: [
            "Tim membangun model klasifikasi risiko dari data pemeriksaan dasar untuk menaksir kemungkinan seseorang berisiko tinggi diabetes.",
            "Warga berisiko tinggi diprioritaskan untuk tes gula darah dan edukasi. Model sengaja dibuat sederhana & dapat dijelaskan agar dipercaya nakes.",
          ] },
          { heading: "Hasil & Refleksi", paragraphs: [
            "Dengan anggaran tes yang sama, jumlah kasus berisiko yang terdeteksi dini naik hampir 2×, karena tes diarahkan ke orang yang tepat.",
            "Refleksi: model bukan alat diagnosis. Semua hasil positif tetap dikonfirmasi tes lab dan pemeriksaan dokter. Keadilan lintas kelompok juga diaudit.",
          ] },
        ],
        techniques: [
          { name: "Klasifikasi Risiko (Supervised)", note: "Menaksir risiko dari data pemeriksaan dasar." },
          { name: "Model yang dapat dijelaskan", note: "Sederhana agar dipercaya & dipahami nakes." },
          { name: "Konfirmasi manusia", note: "Positif tetap dikonfirmasi tes lab & dokter." },
        ],
        results: ["Deteksi dini kasus berisiko naik ~2× pada anggaran yang sama.", "Tes lab diarahkan ke yang paling butuh.", "Edukasi pencegahan lebih tepat sasaran."],
        lessons: ["AI mengalokasikan sumber daya langka, bukan menggantikan tes.", "Model yang dapat dijelaskan membangun kepercayaan klinis.", "Audit keadilan penting di layanan publik."],
        questions: ["Apa risiko warga berisiko yang terlewat model (false negative)?", "Bagaimana memastikan model adil lintas kelompok usia/ekonomi?", "Kapan tetap melakukan tes universal meski model bilang rendah risiko?"],
      },
      en: {
        title: "Puskesmas Sehat: Finding Diabetes Risk Before It's Too Late",
        subtitle: "Risk classification supports mass screening at primary care.",
        company: { name: "District Health Office (Puskesmas Sehat)", industry: "Primary healthcare", location: "Klaten, Central Java", size: "28 clinics, ~310,000 residents" },
        protagonist: { name: "Dr. Fitri", role: "Head of Non-Communicable Disease Program", quote: "Many residents only learn they have diabetes after complications. We wanted to reach them long before that." },
        sections: [
          { heading: "Background", paragraphs: [
            "Non-communicable diseases like type 2 diabetes are rising, often diagnosed late with complications already present. Mass screening is costly if everyone gets full lab tests.",
            "Dr. Fitri wanted to focus testing resources on the highest-risk residents.",
          ] },
          { heading: "The Challenge", paragraphs: [
            "Clinics have lots of simple data (age, BMI, blood pressure, family history, waist size) but lack lab capacity for everyone.",
            "The model had to be explainable to health workers and must not replace a doctor's diagnosis — only help prioritize who needs further testing.",
          ] },
          { heading: "The Decision & AI Approach", paragraphs: [
            "The team built a risk-classification model from basic checkup data to estimate someone's likelihood of high diabetes risk.",
            "High-risk residents were prioritized for blood-sugar tests and education. The model was deliberately simple & explainable to earn trust.",
          ] },
          { heading: "Results & Reflection", paragraphs: [
            "With the same testing budget, early-detected at-risk cases nearly doubled, because tests were directed to the right people.",
            "Reflection: the model is not a diagnostic tool. All positives are confirmed by lab tests and a doctor. Fairness across groups is also audited.",
          ] },
        ],
        techniques: [
          { name: "Risk Classification (Supervised)", note: "Estimates risk from basic checkup data." },
          { name: "Explainable model", note: "Simple so health workers trust & understand it." },
          { name: "Human confirmation", note: "Positives confirmed by lab & doctor." },
        ],
        results: ["Early at-risk detection ~2× on the same budget.", "Lab tests directed to those most in need.", "Prevention education better targeted."],
        lessons: ["AI allocates scarce resources; it doesn't replace tests.", "Explainable models build clinical trust.", "Fairness audits matter in public services."],
        questions: ["What is the risk of at-risk residents missed by the model (false negatives)?", "How to ensure fairness across age/economic groups?", "When to still test universally despite a low-risk prediction?"],
      },
      visualization: {
        type: "funnel",
        caption: { id: "Bagaimana skrining risiko memfokuskan tes lab — klik tiap tahap.", en: "How risk screening focuses lab tests — click each stage." },
        stages: [
          { label: { id: "Warga diperiksa", en: "Residents screened" }, value: 42000, note: { id: "Pemeriksaan dasar murah untuk banyak warga.", en: "Cheap basic checkups for many residents." } },
          { label: { id: "Ditandai berisiko", en: "Flagged at-risk" }, value: 5600, note: { id: "Model memprioritaskan yang paling berisiko.", en: "The model prioritizes the highest-risk." } },
          { label: { id: "Tes gula darah", en: "Blood-sugar test" }, value: 5600, note: { id: "Anggaran tes difokuskan ke kelompok ini.", en: "Testing budget focused on this group." } },
          { label: { id: "Dikonfirmasi & ditangani dini", en: "Confirmed & treated early" }, value: 1450, note: { id: "Ditangani sebelum komplikasi muncul.", en: "Managed before complications appear." } },
        ],
      },
      analysisViz: {
        type: "scatterCluster",
        caption: { id: "Model memisahkan warga risiko tinggi vs rendah dari fitur pemeriksaan dasar.", en: "The model separates high- vs low-risk residents from basic checkup features." },
        xLabel: { id: "Indeks massa tubuh (IMT)", en: "Body mass index (BMI)" },
        yLabel: { id: "Gula darah puasa", en: "Fasting blood sugar" },
        groups: [
          { name: { id: "Risiko tinggi", en: "High risk" }, color: "#dc2626", points: [[0.78, 0.8], [0.7, 0.72], [0.85, 0.68], [0.75, 0.85]] },
          { name: { id: "Risiko rendah", en: "Low risk" }, color: "#059669", points: [[0.3, 0.28], [0.24, 0.35], [0.35, 0.22], [0.28, 0.4], [0.2, 0.3]] },
        ],
      },
    },

    // ---------- 3 ----------
    {
      slug: "skinscan-teledermatology",
      icon: "🔬",
      id: {
        title: "KulitSehat: Membawa Skrining Kulit ke Daerah Tanpa Dokter Spesialis",
        subtitle: "Computer vision membantu triase lesi kulit dari foto di daerah terpencil.",
        company: { name: "KulitSehat (startup teledermatologi)", industry: "Health-tech", location: "Kupang, Nusa Tenggara Timur", size: "Melayani 60+ klinik daerah" },
        protagonist: { name: "dr. Reza", role: "Chief Medical Officer", quote: "Antrean ke dokter kulit bisa berbulan-bulan. Untuk lesi yang mencurigakan, penundaan itu bisa berakibat fatal." },
        sections: [
          { heading: "Latar", paragraphs: [
            "Di banyak daerah, dokter spesialis kulit sangat langka. Warga dengan lesi kulit mencurigakan harus menunggu berbulan-bulan atau menempuh perjalanan jauh untuk rujukan.",
            "KulitSehat ingin membantu klinik daerah memilah lesi mana yang perlu segera dirujuk.",
          ] },
          { heading: "Tantangan", paragraphs: [
            "Foto lesi dari ponsel klinik sangat bervariasi: pencahayaan, fokus, warna kulit yang beragam. Model harus tahan kondisi ini dan tidak bias terhadap warna kulit tertentu.",
            "Risiko sangat tinggi: melewatkan lesi ganas berbahaya, tapi terlalu banyak rujukan palsu membebani sistem rujukan yang sudah terbatas.",
          ] },
          { heading: "Keputusan & Pendekatan AI", paragraphs: [
            "Tim membangun model computer vision (CNN) yang mengklasifikasikan foto lesi ke tingkat kekhawatiran: rendah, sedang, atau perlu rujukan segera — sebagai alat triase, bukan diagnosis.",
            "Semua kasus 'perlu rujukan' dan sebagian sampel acak ditinjau dokter kulit jarak jauh (teledermatologi). Model dilatih pada data yang mencakup beragam warna kulit.",
          ] },
          { heading: "Hasil & Refleksi", paragraphs: [
            "Waktu triase awal turun dari berbulan-bulan menjadi hari. Rujukan menjadi lebih tepat sasaran — kasus mendesak naik prioritas, kasus jinak tak lagi membanjiri antrean spesialis.",
            "Refleksi: keadilan lintas warna kulit adalah isu kritis. Tim harus aktif mengumpulkan data beragam dan mengaudit performa per kelompok.",
          ] },
        ],
        techniques: [
          { name: "Computer Vision (CNN)", note: "Mengklasifikasi tingkat kekhawatiran lesi dari foto." },
          { name: "Triase, bukan diagnosis", note: "Menentukan prioritas rujukan; dokter tetap mendiagnosis." },
          { name: "Audit keadilan", note: "Memantau performa lintas warna kulit." },
        ],
        results: ["Waktu triase awal: bulan → hari.", "Rujukan lebih tepat sasaran.", "Kasus mendesak naik prioritas lebih cepat."],
        lessons: ["Keadilan data (warna kulit) krusial di CV medis.", "Triase mengurangi beban rujukan yang langka.", "Risiko tinggi menuntut tinjauan manusia yang ketat."],
        questions: ["Bagaimana memastikan model adil untuk semua warna kulit?", "Berapa besar biaya sebuah false negative di sini?", "Kapan model sebaiknya menolak menilai (foto buruk) dan minta ulang?"],
      },
      en: {
        title: "KulitSehat: Bringing Skin Screening to Areas Without Specialists",
        subtitle: "Computer vision triages skin lesions from photos in remote areas.",
        company: { name: "KulitSehat (teledermatology startup)", industry: "Health-tech", location: "Kupang, East Nusa Tenggara", size: "Serving 60+ regional clinics" },
        protagonist: { name: "Dr. Reza", role: "Chief Medical Officer", quote: "The wait for a dermatologist can be months. For a suspicious lesion, that delay can be fatal." },
        sections: [
          { heading: "Background", paragraphs: [
            "In many regions, dermatologists are extremely scarce. Residents with suspicious lesions wait months or travel far for a referral.",
            "KulitSehat wanted to help regional clinics sort which lesions need urgent referral.",
          ] },
          { heading: "The Challenge", paragraphs: [
            "Clinic phone photos vary widely: lighting, focus, diverse skin tones. The model had to tolerate this and not be biased toward certain skin tones.",
            "The stakes are high: missing a malignant lesion is dangerous, but too many false referrals overload an already limited referral system.",
          ] },
          { heading: "The Decision & AI Approach", paragraphs: [
            "The team built a computer-vision model (CNN) that classifies lesion photos into concern levels: low, medium, or urgent referral — as a triage aid, not a diagnosis.",
            "All 'urgent referral' cases plus a random sample are reviewed by a remote dermatologist (teledermatology). The model was trained on data spanning diverse skin tones.",
          ] },
          { heading: "Results & Reflection", paragraphs: [
            "Initial triage time dropped from months to days. Referrals became better targeted — urgent cases were prioritized, benign ones no longer flooded the specialist queue.",
            "Reflection: fairness across skin tones is a critical issue. The team had to actively collect diverse data and audit performance per group.",
          ] },
        ],
        techniques: [
          { name: "Computer Vision (CNN)", note: "Classifies lesion concern level from a photo." },
          { name: "Triage, not diagnosis", note: "Sets referral priority; doctors still diagnose." },
          { name: "Fairness audit", note: "Monitors performance across skin tones." },
        ],
        results: ["Initial triage time: months → days.", "Better-targeted referrals.", "Urgent cases prioritized faster."],
        lessons: ["Data fairness (skin tone) is crucial in medical CV.", "Triage eases scarce referral load.", "High stakes demand strict human review."],
        questions: ["How to ensure the model is fair across all skin tones?", "How costly is a false negative here?", "When should the model refuse to score (bad photo) and ask again?"],
      },
      visualization: {
        type: "timeline",
        caption: { id: "Tahapan membangun triase lesi kulit yang adil & andal.", en: "Stages of building fair, reliable skin-lesion triage." },
        milestones: [
          { when: { id: "Tahap 1", en: "Phase 1" }, title: { id: "Kumpulkan data beragam", en: "Collect diverse data" }, detail: { id: "Mengumpulkan foto lesi mencakup beragam warna kulit & kondisi cahaya.", en: "Gather lesion photos spanning diverse skin tones & lighting." } },
          { when: { id: "Tahap 2", en: "Phase 2" }, title: { id: "Latih CNN + audit bias", en: "Train CNN + bias audit" }, detail: { id: "Melatih model dan mengaudit performa per kelompok warna kulit.", en: "Train the model and audit performance per skin-tone group." } },
          { when: { id: "Tahap 3", en: "Phase 3" }, title: { id: "Alur teledermatologi", en: "Teledermatology loop" }, detail: { id: "Kasus mendesak & sampel acak ditinjau dokter kulit jarak jauh.", en: "Urgent cases & random samples reviewed by a remote dermatologist." } },
          { when: { id: "Tahap 4", en: "Phase 4" }, title: { id: "Peluncuran bertahap", en: "Phased rollout" }, detail: { id: "Diluncurkan ke klinik daerah dengan pemantauan keamanan ketat.", en: "Rolled out to regional clinics with strict safety monitoring." } },
        ],
      },
      analysisViz: {
        type: "pipeline",
        caption: { id: "Bagaimana foto lesi diproses menjadi tingkat prioritas rujukan.", en: "How a lesion photo becomes a referral-priority level." },
        stages: [
          { icon: "📷", label: { id: "Foto lesi", en: "Lesion photo" }, detail: { id: "Klinik memotret lesi dengan ponsel.", en: "The clinic photographs the lesion with a phone." } },
          { icon: "🩹", label: { id: "Normalisasi", en: "Normalize" }, detail: { id: "Menormalkan warna & pencahayaan agar adil lintas kondisi.", en: "Normalize color & lighting for fairness across conditions." } },
          { icon: "🔎", label: { id: "CNN menilai", en: "CNN assesses" }, detail: { id: "Konvolusi mendeteksi pola tekstur/warna lesi.", en: "Convolution detects lesion texture/color patterns." } },
          { icon: "🚦", label: { id: "Tingkat kekhawatiran", en: "Concern level" }, detail: { id: "Rendah / sedang / rujukan segera + keyakinan.", en: "Low / medium / urgent referral + confidence." } },
          { icon: "👨‍⚕️", label: { id: "Tinjauan dokter", en: "Doctor review" }, detail: { id: "Kasus mendesak ditinjau dokter kulit jarak jauh.", en: "Urgent cases reviewed by a remote dermatologist." } },
        ],
      },
    },

    // ---------- 4 ----------
    {
      slug: "sepsis-early-warning",
      icon: "🏥",
      id: {
        title: "RSUD Sentosa: Mendeteksi Sepsis Sebelum Memburuk",
        subtitle: "Peringatan dini berbasis data tanda vital menyelamatkan waktu berharga di ICU.",
        company: { name: "RSUD Sentosa", industry: "Rumah sakit umum daerah", location: "Malang, Jawa Timur", size: "450 tempat tidur, ICU 24 bed" },
        protagonist: { name: "dr. Galih", role: "Kepala ICU", quote: "Sepsis membunuh secara diam-diam. Setiap jam keterlambatan penanganan menaikkan risiko kematian secara nyata." },
        sections: [
          { heading: "Latar", paragraphs: [
            "Sepsis — respons tubuh yang mengancam nyawa terhadap infeksi — berkembang cepat dan gejalanya samar di awal. Deteksi terlambat sangat mematikan.",
            "Perawat ICU memantau banyak pasien sekaligus; perubahan halus pada tanda vital mudah luput di tengah kesibukan.",
          ] },
          { heading: "Tantangan", paragraphs: [
            "Tanda vital (detak jantung, suhu, tekanan darah, laju napas) direkam terus-menerus, tapi menafsirkan tren gabungannya secara real-time itu sulit bagi manusia.",
            "Sistem harus sensitif menangkap sepsis dini, tapi 'kelelahan alarm' (terlalu banyak alarm palsu) berbahaya karena membuat staf mengabaikannya.",
          ] },
          { heading: "Keputusan & Pendekatan AI", paragraphs: [
            "Tim membangun model peringatan dini yang memantau tren tanda vital dan lab untuk menaksir risiko sepsis, memberi skor yang diperbarui terus-menerus.",
            "Ketika risiko melewati ambang, sistem memberi peringatan lembut ke perawat untuk memeriksa pasien — bukan memberi diagnosis atau perintah tindakan.",
          ] },
          { heading: "Hasil & Refleksi", paragraphs: [
            "Waktu rata-rata dari onset ke intervensi turun beberapa jam, dan tim melaporkan penurunan kejadian sepsis berat yang tak tertangani.",
            "Refleksi kunci: menyetel ambang sangat hati-hati untuk menghindari kelelahan alarm. Kepercayaan staf hanya terbangun ketika alarm terbukti bermakna.",
          ] },
        ],
        techniques: [
          { name: "Peringatan Dini (Deret waktu)", note: "Memantau tren tanda vital secara real-time." },
          { name: "Klasifikasi risiko", note: "Menaksir kemungkinan sepsis dari sinyal gabungan." },
          { name: "Desain anti kelelahan-alarm", note: "Ambang disetel agar alarm bermakna." },
        ],
        results: ["Waktu onset → intervensi turun beberapa jam.", "Kejadian sepsis berat tak tertangani menurun.", "Perawat mendapat peringatan dini yang bermakna."],
        lessons: ["Kelelahan alarm sama berbahayanya dengan terlambat.", "AI mengawasi tren yang sulit dilihat manusia real-time.", "Kepercayaan staf dibangun oleh alarm yang terbukti akurat."],
        questions: ["Bagaimana menyeimbangkan sensitivitas vs kelelahan alarm?", "Apa konsekuensi false negative pada sepsis?", "Bagaimana memastikan staf tidak terlalu bergantung pada alarm?"],
      },
      en: {
        title: "Sentosa Regional Hospital: Detecting Sepsis Before It Worsens",
        subtitle: "A vital-signs early-warning system saves precious ICU time.",
        company: { name: "Sentosa Regional Hospital", industry: "Regional general hospital", location: "Malang, East Java", size: "450 beds, 24-bed ICU" },
        protagonist: { name: "Dr. Galih", role: "Head of ICU", quote: "Sepsis kills quietly. Every hour of delayed treatment raises mortality risk measurably." },
        sections: [
          { heading: "Background", paragraphs: [
            "Sepsis — a life-threatening response to infection — develops fast, with subtle early symptoms. Late detection is deadly.",
            "ICU nurses monitor many patients at once; subtle vital-sign changes are easily missed amid the rush.",
          ] },
          { heading: "The Challenge", paragraphs: [
            "Vital signs (heart rate, temperature, blood pressure, respiration) are recorded continuously, but interpreting their combined trend in real time is hard for humans.",
            "The system must be sensitive to early sepsis, yet 'alarm fatigue' (too many false alarms) is dangerous because staff start ignoring it.",
          ] },
          { heading: "The Decision & AI Approach", paragraphs: [
            "The team built an early-warning model monitoring vital-sign and lab trends to estimate sepsis risk, producing a continuously updated score.",
            "When risk crosses a threshold, the system gently alerts a nurse to check the patient — it does not diagnose or order treatment.",
          ] },
          { heading: "Results & Reflection", paragraphs: [
            "Average time from onset to intervention dropped by several hours, and the team reported fewer unmanaged severe-sepsis events.",
            "Key reflection: the threshold was tuned very carefully to avoid alarm fatigue. Staff trust only grew once alarms proved meaningful.",
          ] },
        ],
        techniques: [
          { name: "Early Warning (Time-series)", note: "Monitors vital-sign trends in real time." },
          { name: "Risk classification", note: "Estimates sepsis likelihood from combined signals." },
          { name: "Anti-alarm-fatigue design", note: "Threshold tuned so alarms stay meaningful." },
        ],
        results: ["Onset → intervention time down several hours.", "Fewer unmanaged severe-sepsis events.", "Nurses get meaningful early warnings."],
        lessons: ["Alarm fatigue is as dangerous as being late.", "AI watches trends humans can't track in real time.", "Staff trust is built by alarms that prove accurate."],
        questions: ["How to balance sensitivity vs alarm fatigue?", "What are the consequences of a false negative in sepsis?", "How to ensure staff don't over-rely on alarms?"],
      },
      visualization: {
        type: "beforeAfter",
        caption: { id: "Dampak peringatan dini sepsis pada respons ICU.", en: "Impact of sepsis early warning on ICU response." },
        metrics: [
          { label: { id: "Waktu onset→intervensi (jam)", en: "Onset→intervention (hours)" }, before: 6, after: 2.5, unit: "j", betterWhenLower: true, decimals: 1 },
          { label: { id: "Sepsis berat tak tertangani (indeks)", en: "Unmanaged severe sepsis (index)" }, before: 100, after: 64, unit: "", betterWhenLower: true },
          { label: { id: "Kepercayaan staf pada alarm", en: "Staff trust in alarms" }, before: 2.6, after: 4.1, unit: "/5", decimals: 1 },
        ],
      },
      analysisViz: {
        type: "threshold",
        caption: { id: "Menyetel ambang risiko sepsis: menyeimbangkan menangkap kasus dini (recall) vs kelelahan alarm (presisi).", en: "Tuning the sepsis-risk threshold: balancing catching early cases (recall) vs alarm fatigue (precision)." },
        positiveLabel: { id: "Menuju sepsis", en: "Heading to sepsis" },
        negativeLabel: { id: "Stabil", en: "Stable" },
        dist: { pos: [0.9, 0.83, 0.76, 0.68, 0.6, 0.52, 0.45], neg: [0.1, 0.18, 0.26, 0.34, 0.42, 0.5, 0.58, 0.66, 0.24, 0.38, 0.3] },
      },
    },

    // ---------- 5 ----------
    {
      slug: "hospital-bed-forecast",
      icon: "🛏️",
      id: {
        title: "Jaringan RS Nusa: Meramal Lonjakan Pasien Sebelum Ranjang Penuh",
        subtitle: "Peramalan permintaan membantu perencanaan kapasitas & staf rumah sakit.",
        company: { name: "Jaringan RS Nusa", industry: "Jaringan rumah sakit", location: "Denpasar, Bali", size: "7 rumah sakit, 2.100 tempat tidur" },
        protagonist: { name: "Ibu Kadek", role: "Direktur Operasional", quote: "Saat lonjakan datang tiba-tiba, kami kekurangan ranjang dan perawat di saat paling genting. Kami butuh melihat gelombang itu lebih awal." },
        sections: [
          { heading: "Latar", paragraphs: [
            "Permintaan rumah sakit berfluktuasi: musim penyakit, hari libur, wabah lokal, bahkan acara besar di kota. Perencanaan kapasitas dan jadwal staf sering reaktif — menambal saat sudah kewalahan.",
            "Ibu Kadek ingin merencanakan tempat tidur, staf, dan persediaan berdasarkan permintaan yang diantisipasi, bukan tebakan.",
          ] },
          { heading: "Tantangan", paragraphs: [
            "Pola permintaan berbeda antar rumah sakit dan antar departemen. Faktor eksternal (cuaca, musim flu, hari libur) memengaruhi lonjakan.",
            "Ramalan harus cukup akurat untuk perencanaan, tapi juga menyertakan ketidakpastian agar manajer bisa menyiapkan rencana cadangan.",
          ] },
          { heading: "Keputusan & Pendekatan AI", paragraphs: [
            "Tim membangun model peramalan deret waktu yang memprediksi jumlah kunjungan IGD dan kebutuhan rawat inap per rumah sakit untuk 1–2 minggu ke depan, memakai riwayat + faktor musiman.",
            "Ramalan disajikan dengan rentang ketidakpastian, membantu manajer menyusun jadwal staf dan alokasi tempat tidur secara proaktif.",
          ] },
          { heading: "Hasil & Refleksi", paragraphs: [
            "Kejadian kekurangan tempat tidur mendadak turun signifikan, dan lembur staf yang tak terencana berkurang karena penjadwalan lebih antisipatif.",
            "Refleksi: ramalan adalah alat bantu perencanaan, bukan ramalan pasti. Menyajikan ketidakpastian dengan jujur membuat keputusan lebih baik daripada satu angka tunggal yang terlihat pasti.",
          ] },
        ],
        techniques: [
          { name: "Peramalan Deret Waktu", note: "Memprediksi kunjungan & kebutuhan rawat inap." },
          { name: "Faktor musiman & eksternal", note: "Musim penyakit, hari libur, cuaca." },
          { name: "Estimasi ketidakpastian", note: "Menyajikan rentang, bukan satu angka." },
        ],
        results: ["Kekurangan tempat tidur mendadak turun signifikan.", "Lembur staf tak terencana berkurang.", "Perencanaan kapasitas menjadi proaktif."],
        lessons: ["Menyajikan ketidakpastian lebih jujur & berguna dari satu angka.", "Peramalan memindahkan operasi dari reaktif ke proaktif.", "Tiap unit butuh model dengan pola sendiri."],
        questions: ["Bagaimana merencanakan untuk skenario terburuk, bukan hanya rata-rata?", "Apa risiko terlalu percaya pada satu angka ramalan?", "Bagaimana menangani kejadian langka yang belum pernah terjadi?"],
      },
      en: {
        title: "Nusa Hospital Network: Forecasting Patient Surges Before Beds Fill",
        subtitle: "Demand forecasting supports hospital capacity & staffing planning.",
        company: { name: "Nusa Hospital Network", industry: "Hospital network", location: "Denpasar, Bali", size: "7 hospitals, 2,100 beds" },
        protagonist: { name: "Ibu Kadek", role: "Director of Operations", quote: "When a surge hits suddenly, we're short on beds and nurses at the worst moment. We needed to see the wave coming earlier." },
        sections: [
          { heading: "Background", paragraphs: [
            "Hospital demand fluctuates: disease seasons, holidays, local outbreaks, even big city events. Capacity and staff planning were often reactive — patching once already overwhelmed.",
            "Ibu Kadek wanted to plan beds, staff, and supplies based on anticipated demand, not guesswork.",
          ] },
          { heading: "The Challenge", paragraphs: [
            "Demand patterns differ across hospitals and departments. External factors (weather, flu season, holidays) drive surges.",
            "Forecasts had to be accurate enough for planning, yet include uncertainty so managers could prepare contingency plans.",
          ] },
          { heading: "The Decision & AI Approach", paragraphs: [
            "The team built a time-series forecasting model predicting ER visits and inpatient needs per hospital for the next 1–2 weeks, using history + seasonal factors.",
            "Forecasts were presented with uncertainty ranges, helping managers proactively set staff schedules and bed allocation.",
          ] },
          { heading: "Results & Reflection", paragraphs: [
            "Sudden bed-shortage incidents fell significantly, and unplanned staff overtime dropped thanks to more anticipatory scheduling.",
            "Reflection: a forecast is a planning aid, not a certainty. Presenting uncertainty honestly led to better decisions than a single confident-looking number.",
          ] },
        ],
        techniques: [
          { name: "Time-Series Forecasting", note: "Predicts visits & inpatient needs." },
          { name: "Seasonal & external factors", note: "Disease seasons, holidays, weather." },
          { name: "Uncertainty estimation", note: "Presents a range, not one number." },
        ],
        results: ["Sudden bed shortages down significantly.", "Unplanned staff overtime reduced.", "Capacity planning became proactive."],
        lessons: ["Presenting uncertainty is more honest & useful than one number.", "Forecasting shifts operations from reactive to proactive.", "Each unit needs a model with its own pattern."],
        questions: ["How to plan for the worst case, not just the average?", "What is the risk of over-trusting a single forecast number?", "How to handle rare events that have never occurred?"],
      },
      visualization: {
        type: "timeline",
        caption: { id: "Tahapan membangun peramalan kapasitas rumah sakit.", en: "Stages of building hospital capacity forecasting." },
        milestones: [
          { when: { id: "Bulan 1", en: "Month 1" }, title: { id: "Satukan data kunjungan", en: "Unify visit data" }, detail: { id: "Menggabungkan riwayat kunjungan IGD & rawat inap lintas 7 RS.", en: "Combine ER & inpatient visit history across 7 hospitals." } },
          { when: { id: "Bulan 2", en: "Month 2" }, title: { id: "Model + faktor musiman", en: "Model + seasonality" }, detail: { id: "Melatih model deret waktu dengan faktor musim & hari libur.", en: "Train a time-series model with seasonal & holiday factors." } },
          { when: { id: "Bulan 3", en: "Month 3" }, title: { id: "Tambah ketidakpastian", en: "Add uncertainty" }, detail: { id: "Menyajikan rentang ramalan, bukan satu angka.", en: "Present forecast ranges, not a single number." } },
          { when: { id: "Bulan 4", en: "Month 4" }, title: { id: "Integrasi perencanaan", en: "Planning integration" }, detail: { id: "Ramalan dipakai untuk jadwal staf & alokasi tempat tidur.", en: "Forecasts feed staff scheduling & bed allocation." } },
        ],
      },
      analysisViz: {
        type: "pipeline",
        caption: { id: "Bagaimana data kunjungan menjadi rencana kapasitas.", en: "How visit data becomes a capacity plan." },
        stages: [
          { icon: "🧾", label: { id: "Data kunjungan", en: "Visit data" }, detail: { id: "Riwayat kunjungan harian per RS & departemen.", en: "Daily visit history per hospital & department." } },
          { icon: "📅", label: { id: "Faktor musiman", en: "Seasonality" }, detail: { id: "Memisahkan tren, musim penyakit, dan hari libur.", en: "Separates trend, disease seasons, and holidays." } },
          { icon: "📈", label: { id: "Ramalan + rentang", en: "Forecast + range" }, detail: { id: "Memproyeksikan permintaan 1–2 minggu dengan ketidakpastian.", en: "Projects 1–2 week demand with uncertainty." } },
          { icon: "🛏️", label: { id: "Rencana kapasitas", en: "Capacity plan" }, detail: { id: "Menerjemahkan ramalan ke kebutuhan tempat tidur & staf.", en: "Translates the forecast to bed & staff needs." } },
          { icon: "🧑‍💼", label: { id: "Keputusan manajer", en: "Manager decision" }, detail: { id: "Manajer menyiapkan rencana cadangan untuk skenario tinggi.", en: "Managers prepare contingency for the high scenario." } },
        ],
      },
    },
  ],

  agriculture: [
    // ---------- 1 ----------
    {
      slug: "tanimakmur-disease-cv",
      icon: "🌾",
      id: {
        title: "Koperasi Tani Makmur: Mata Digital untuk Petani Padi",
        subtitle: "Computer vision mendeteksi penyakit tanaman sejak dini dari foto daun.",
        company: { name: "Koperasi Tani Makmur", industry: "Pertanian padi", location: "Klaten, Jawa Tengah", size: "1.200 petani anggota, 3.400 hektar" },
        protagonist: { name: "Pak Sugeng", role: "Ketua Koperasi", quote: "Saat kami melihat daunnya menguning, sering sudah terlambat. Setengah petak bisa hilang dalam seminggu." },
        sections: [
          { heading: "Latar", paragraphs: [
            "Koperasi menaungi 1.200 petani padi. Hama dan penyakit seperti hawar daun bakteri menyerang tanpa peringatan, dan keahlian mendeteksinya terpusat pada segelintir penyuluh.",
            "Pak Sugeng tahu deteksi terlambat berarti gagal panen dan utang bagi petani kecil.",
          ] },
          { heading: "Tantangan", paragraphs: [
            "Penyuluh ahli terlalu sedikit untuk memeriksa ratusan hektar setiap hari. Petani awam sulit membedakan gejala penyakit dari kekurangan nutrisi biasa.",
            "Koperasi menimbang: melatih lebih banyak penyuluh (mahal, lambat) atau mencoba teknologi yang belum pernah dipakai petani.",
          ] },
          { heading: "Keputusan & Pendekatan AI", paragraphs: [
            "Bersama universitas lokal, koperasi membuat aplikasi ponsel: petani memotret daun padi, dan model deep learning (CNN) mengklasifikasikan sehat, hawar daun, atau kekurangan nutrisi.",
            "Model dilatih dari ribuan foto daun berlabel penyuluh — memindahkan 'mata ahli' ke tiap ponsel petani.",
          ] },
          { heading: "Hasil & Refleksi", paragraphs: [
            "Setelah satu musim tanam, deteksi dini penyakit rata-rata 4–6 hari lebih cepat. Kehilangan panen akibat penyakit turun ~22%, penggunaan pestisida turun 18%.",
            "Tantangan nyata: internet di sawah tidak stabil (model harus jalan offline), dan adopsi baru naik setelah beberapa petani berpengaruh membuktikan hasilnya.",
          ] },
        ],
        techniques: [
          { name: "CNN / Computer Vision", note: "Mengklasifikasi kondisi daun dari foto." },
          { name: "Klasifikasi citra", note: "Sehat vs penyakit vs defisiensi nutrisi." },
          { name: "Model on-device", note: "Berjalan offline karena internet terbatas." },
        ],
        results: ["Deteksi penyakit 4–6 hari lebih cepat.", "Kehilangan panen akibat penyakit turun ~22%.", "Penggunaan pestisida turun 18%."],
        lessons: ["AI memperluas keahlian langka (penyuluh) ke banyak orang.", "Kendala lapangan sama pentingnya dengan akurasi model.", "Adopsi adalah masalah kepercayaan sosial."],
        questions: ["Bagaimana membangun kepercayaan petani senior?", "Apa risiko jika model salah menyatakan tanaman sakit sebagai sehat?", "Bagaimana memperbarui model saat muncul penyakit baru?"],
      },
      en: {
        title: "Tani Makmur Cooperative: Digital Eyes for Rice Farmers",
        subtitle: "Computer vision detects crop disease early from leaf photos.",
        company: { name: "Tani Makmur Cooperative", industry: "Rice farming", location: "Klaten, Central Java", size: "1,200 member farmers, 3,400 hectares" },
        protagonist: { name: "Pak Sugeng", role: "Cooperative Chairman", quote: "By the time we saw the leaves yellowing, it was often too late. Half a plot could be gone in a week." },
        sections: [
          { heading: "Background", paragraphs: [
            "The cooperative serves 1,200 rice farmers. Pests and diseases like bacterial leaf blight struck without warning, and the know-how to spot them sat with a few extension officers.",
            "Pak Sugeng knew late detection meant crop failure and debt for smallholders.",
          ] },
          { heading: "The Challenge", paragraphs: [
            "Expert officers were too few to inspect hundreds of hectares daily. Ordinary farmers struggled to tell disease from ordinary nutrient deficiency.",
            "The cooperative weighed: train more officers (costly, slow) or try technology their farmers had never used.",
          ] },
          { heading: "The Decision & AI Approach", paragraphs: [
            "With a local university, the cooperative built a phone app: a farmer photographs a rice leaf, and a deep learning model (CNN) classifies healthy, leaf blight, or nutrient deficiency.",
            "The model was trained on thousands of officer-labeled leaf photos — moving the 'expert's eye' into every farmer's phone.",
          ] },
          { heading: "Results & Reflection", paragraphs: [
            "After one planting season, early disease detection was 4–6 days sooner on average. Disease crop loss fell ~22%, pesticide use dropped 18%.",
            "Real challenges: field internet was unreliable (the model had to run offline), and adoption only rose after influential farmers proved the results.",
          ] },
        ],
        techniques: [
          { name: "CNN / Computer Vision", note: "Classifies leaf condition from a photo." },
          { name: "Image classification", note: "Healthy vs disease vs nutrient deficiency." },
          { name: "On-device model", note: "Runs offline due to limited internet." },
        ],
        results: ["Disease detected 4–6 days earlier.", "Disease crop loss down ~22%.", "Pesticide use down 18%."],
        lessons: ["AI scales scarce expertise to many people.", "Field constraints matter as much as accuracy.", "Adoption is a matter of social trust."],
        questions: ["How to build senior farmers' trust?", "What if the model wrongly calls a sick plant healthy?", "How to update the model as new diseases emerge?"],
      },
      visualization: {
        type: "beforeAfter",
        caption: { id: "Dampak deteksi penyakit berbasis foto selama satu musim tanam.", en: "Impact of photo-based disease detection over one planting season." },
        metrics: [
          { label: { id: "Kehilangan panen (indeks)", en: "Crop loss (index)" }, before: 100, after: 78, unit: "", betterWhenLower: true },
          { label: { id: "Penggunaan pestisida (indeks)", en: "Pesticide use (index)" }, before: 100, after: 82, unit: "", betterWhenLower: true },
          { label: { id: "Deteksi dini lebih cepat (hari)", en: "Earlier detection (days)" }, before: 0, after: 5, unit: " hari" },
        ],
      },
      analysisViz: {
        type: "pipeline",
        caption: { id: "Bagaimana foto daun menjadi diagnosis di ponsel petani.", en: "How a leaf photo becomes a diagnosis on the farmer's phone." },
        stages: [
          { icon: "📷", label: { id: "Foto daun", en: "Leaf photo" }, detail: { id: "Petani memotret daun padi dengan ponsel.", en: "The farmer photographs a rice leaf with a phone." } },
          { icon: "🩹", label: { id: "Perbaiki citra", en: "Fix image" }, detail: { id: "Menormalkan warna & pencahayaan lapangan.", en: "Normalize field color & lighting." } },
          { icon: "🔎", label: { id: "CNN membaca", en: "CNN reads" }, detail: { id: "Konvolusi mendeteksi pola bercak/warna daun.", en: "Convolution detects leaf spot/color patterns." } },
          { icon: "🏷️", label: { id: "Klasifikasi", en: "Classify" }, detail: { id: "Sehat / hawar daun / kekurangan nutrisi + keyakinan.", en: "Healthy / leaf blight / nutrient deficiency + confidence." } },
          { icon: "💊", label: { id: "Saran tindakan", en: "Action advice" }, detail: { id: "Memberi anjuran penanganan; kasus ragu ke penyuluh.", en: "Gives handling advice; uncertain cases to an officer." } },
        ],
      },
    },

    // ---------- 2 ----------
    {
      slug: "yield-forecast-planning",
      icon: "🌽",
      id: {
        title: "Sentra Jagung Lombok: Meramal Panen untuk Menstabilkan Harga",
        subtitle: "Peramalan hasil panen membantu petani & koperasi merencanakan lebih baik.",
        company: { name: "Asosiasi Petani Jagung Lombok", industry: "Pertanian jagung", location: "Lombok, Nusa Tenggara Barat", size: "2.600 petani, 8.000 hektar" },
        protagonist: { name: "Pak Wayan", role: "Ketua Asosiasi", quote: "Kalau semua panen bersamaan, harga jatuh. Kalau meleset dari perkiraan, pembeli besar kabur. Kami butuh melihat panen sebelum tiba." },
        sections: [
          { heading: "Latar", paragraphs: [
            "Petani jagung Lombok sering menghadapi harga jatuh saat panen raya serentak, dan kesulitan negosiasi dengan pembeli besar karena tak bisa menjanjikan volume secara akurat.",
            "Pak Wayan ingin memperkirakan total hasil panen wilayah lebih awal, untuk mengatur waktu jual dan kontrak.",
          ] },
          { heading: "Tantangan", paragraphs: [
            "Hasil panen dipengaruhi banyak faktor: curah hujan, jenis tanah, waktu tanam, dan luas lahan yang tersebar. Menaksir manual tidak akurat.",
            "Data ada sebagian (cuaca, luas tanam, citra satelit), tapi belum pernah digabung menjadi satu prediksi yang berguna.",
          ] },
          { heading: "Keputusan & Pendekatan AI", paragraphs: [
            "Tim membangun model regresi yang memprediksi hasil panen per wilayah dari fitur cuaca, luas tanam (dari citra satelit), dan waktu tanam.",
            "Prediksi membantu asosiasi mengatur jadwal jual bertahap dan bernegosiasi kontrak dengan pembeli berdasarkan volume yang lebih pasti.",
          ] },
          { heading: "Hasil & Refleksi", paragraphs: [
            "Dengan perkiraan panen lebih awal, asosiasi bisa mengatur waktu jual sehingga harga di tingkat petani lebih stabil, dan kontrak dengan pembeli besar meningkat.",
            "Refleksi: prediksi tak pernah sempurna — cuaca ekstrem tetap mengejutkan. Rentang perkiraan lebih berguna daripada satu angka, dan pengetahuan lokal petani tetap penting.",
          ] },
        ],
        techniques: [
          { name: "Regresi (Supervised)", note: "Memprediksi hasil panen dari fitur numerik." },
          { name: "Citra satelit", note: "Menaksir luas & kondisi tanam dari udara." },
          { name: "Estimasi ketidakpastian", note: "Menyajikan rentang panen, bukan satu angka." },
        ],
        results: ["Harga di tingkat petani lebih stabil.", "Kontrak dengan pembeli besar meningkat.", "Perencanaan jual bertahap lebih tertata."],
        lessons: ["Prediksi memindahkan tawar-menawar dari reaktif ke terencana.", "Rentang lebih jujur & berguna dari satu angka.", "Pengetahuan lokal melengkapi model."],
        questions: ["Bagaimana model menangani cuaca ekstrem yang jarang?", "Apa risiko jika petani terlalu percaya prediksi tunggal?", "Fitur data apa yang paling sulit dikumpulkan di lapangan?"],
      },
      en: {
        title: "Lombok Corn Hub: Forecasting Harvests to Stabilize Prices",
        subtitle: "Yield forecasting helps farmers & the cooperative plan better.",
        company: { name: "Lombok Corn Farmers Association", industry: "Corn farming", location: "Lombok, West Nusa Tenggara", size: "2,600 farmers, 8,000 hectares" },
        protagonist: { name: "Pak Wayan", role: "Association Head", quote: "If everyone harvests at once, prices crash. If we miss our estimate, big buyers walk away. We needed to see the harvest before it arrives." },
        sections: [
          { heading: "Background", paragraphs: [
            "Lombok's corn farmers often faced price crashes during simultaneous peak harvests, and struggled to negotiate with big buyers because they couldn't promise volume accurately.",
            "Pak Wayan wanted to estimate the region's total yield earlier, to time sales and contracts.",
          ] },
          { heading: "The Challenge", paragraphs: [
            "Yield depends on many factors: rainfall, soil type, planting time, and scattered planted area. Estimating by hand is inaccurate.",
            "Some data existed (weather, planted area, satellite imagery), but was never combined into one useful prediction.",
          ] },
          { heading: "The Decision & AI Approach", paragraphs: [
            "The team built a regression model predicting per-region yield from weather, planted area (from satellite imagery), and planting time.",
            "Predictions helped the association stagger sales and negotiate buyer contracts based on more certain volumes.",
          ] },
          { heading: "Results & Reflection", paragraphs: [
            "With earlier harvest estimates, the association staggered sales so farm-gate prices were more stable, and contracts with big buyers increased.",
            "Reflection: predictions are never perfect — extreme weather still surprises. A range beats a single number, and farmers' local knowledge remains essential.",
          ] },
        ],
        techniques: [
          { name: "Regression (Supervised)", note: "Predicts yield from numeric features." },
          { name: "Satellite imagery", note: "Estimates planted area & condition from above." },
          { name: "Uncertainty estimation", note: "Presents a yield range, not one number." },
        ],
        results: ["More stable farm-gate prices.", "More contracts with big buyers.", "Better-organized staggered selling."],
        lessons: ["Prediction shifts bargaining from reactive to planned.", "A range is more honest & useful than one number.", "Local knowledge complements the model."],
        questions: ["How does the model handle rare extreme weather?", "What is the risk if farmers over-trust a single prediction?", "Which data features are hardest to collect in the field?"],
      },
      visualization: {
        type: "beforeAfter",
        caption: { id: "Dampak peramalan panen pada stabilitas ekonomi petani.", en: "Impact of yield forecasting on farmer economic stability." },
        metrics: [
          { label: { id: "Volatilitas harga (indeks)", en: "Price volatility (index)" }, before: 100, after: 68, unit: "", betterWhenLower: true },
          { label: { id: "Kontrak pembeli besar", en: "Big-buyer contracts" }, before: 12, after: 27, unit: "" },
          { label: { id: "Akurasi rencana volume", en: "Volume plan accuracy" }, before: 61, after: 84, unit: "%" },
        ],
      },
      analysisViz: {
        type: "pipeline",
        caption: { id: "Bagaimana data lapangan & satelit menjadi prakiraan panen.", en: "How field & satellite data become a harvest forecast." },
        stages: [
          { icon: "🛰️", label: { id: "Citra satelit", en: "Satellite imagery" }, detail: { id: "Menaksir luas & kondisi lahan tanam dari udara.", en: "Estimates planted area & condition from above." } },
          { icon: "🌧️", label: { id: "Data cuaca", en: "Weather data" }, detail: { id: "Curah hujan, suhu, dan pola musim dikumpulkan.", en: "Rainfall, temperature, and seasonal patterns collected." } },
          { icon: "📊", label: { id: "Fitur gabungan", en: "Combined features" }, detail: { id: "Menyatukan luas, cuaca, dan waktu tanam.", en: "Unifies area, weather, and planting time." } },
          { icon: "📈", label: { id: "Regresi panen", en: "Yield regression" }, detail: { id: "Model memprediksi hasil panen + rentang ketidakpastian.", en: "The model predicts yield + an uncertainty range." } },
          { icon: "🤝", label: { id: "Rencana jual", en: "Sales plan" }, detail: { id: "Asosiasi mengatur waktu jual & kontrak pembeli.", en: "The association times sales & buyer contracts." } },
        ],
      },
    },

    // ---------- 3 ----------
    {
      slug: "smart-irrigation-rl",
      icon: "💧",
      id: {
        title: "Kebun Hijau Subang: Menyiram Tepat, Hemat Air",
        subtitle: "Reinforcement learning mengatur irigasi berdasarkan sensor tanah & cuaca.",
        company: { name: "Kebun Hijau Subang", industry: "Hortikultura (sayuran)", location: "Subang, Jawa Barat", size: "120 hektar rumah kaca & lahan terbuka" },
        protagonist: { name: "Ibu Sri", role: "Manajer Kebun", quote: "Air makin mahal dan langka. Menyiram terlalu banyak memboroskan air dan menghanyutkan pupuk; terlalu sedikit, tanaman stres." },
        sections: [
          { heading: "Latar", paragraphs: [
            "Kebun Hijau menghadapi biaya air yang naik dan pasokan yang tidak menentu. Penyiraman berbasis jadwal tetap tidak menyesuaikan dengan kondisi tanah dan cuaca nyata.",
            "Ibu Sri ingin sistem yang menyiram tepat sesuai kebutuhan tanaman — tidak lebih, tidak kurang.",
          ] },
          { heading: "Tantangan", paragraphs: [
            "Kebutuhan air berubah menurut kelembapan tanah, suhu, tahap pertumbuhan, dan prakiraan hujan. Aturan tetap gagal menangkap dinamika ini.",
            "Keputusan menyiram punya konsekuensi tertunda: menyiram hari ini memengaruhi kondisi besok. Ini masalah yang cocok untuk pembelajaran berbasis reward.",
          ] },
          { heading: "Keputusan & Pendekatan AI", paragraphs: [
            "Tim menerapkan reinforcement learning: agen mengamati state (kelembapan tanah, suhu, prakiraan hujan) dan memilih aksi (berapa banyak menyiram), dengan reward yang menyeimbangkan kesehatan tanaman dan penghematan air.",
            "Agen dilatih di simulasi terlebih dahulu, lalu diterapkan bertahap dengan pengawasan manusia sebelum otomatis penuh.",
          ] },
          { heading: "Hasil & Refleksi", paragraphs: [
            "Penggunaan air turun 26% tanpa menurunkan hasil panen; di beberapa blok hasil malah membaik karena penyiraman lebih konsisten sesuai kebutuhan.",
            "Refleksi: mendesain fungsi reward itu seni — reward yang salah bisa membuat agen 'menghemat air' berlebihan hingga merugikan tanaman. Pengawasan awal penting.",
          ] },
        ],
        techniques: [
          { name: "Reinforcement Learning", note: "Agen belajar kebijakan menyiram dari reward." },
          { name: "Sensor + prakiraan", note: "State: kelembapan tanah, suhu, prakiraan hujan." },
          { name: "Simulasi lalu bertahap", note: "Dilatih di simulasi, diterapkan dengan pengawasan." },
        ],
        results: ["Penggunaan air turun 26%.", "Hasil panen stabil, beberapa blok membaik.", "Penyiraman menyesuaikan kondisi nyata, bukan jadwal kaku."],
        lessons: ["Keputusan dengan konsekuensi tertunda cocok untuk RL.", "Desain fungsi reward menentukan perilaku agen.", "Latih di simulasi sebelum ke lapangan nyata."],
        questions: ["Bagaimana mendesain reward yang menyeimbangkan air vs hasil?", "Apa risiko menyerahkan kontrol penuh ke agen terlalu dini?", "Bagaimana menangani sensor yang rusak atau tidak akurat?"],
      },
      en: {
        title: "Kebun Hijau Subang: Watering Precisely, Saving Water",
        subtitle: "Reinforcement learning controls irrigation from soil & weather sensors.",
        company: { name: "Kebun Hijau Subang", industry: "Horticulture (vegetables)", location: "Subang, West Java", size: "120 hectares greenhouse & open field" },
        protagonist: { name: "Ibu Sri", role: "Farm Manager", quote: "Water is getting expensive and scarce. Overwatering wastes water and washes away fertilizer; underwatering stresses the plants." },
        sections: [
          { heading: "Background", paragraphs: [
            "Kebun Hijau faced rising water costs and uncertain supply. Fixed-schedule watering didn't adapt to real soil and weather conditions.",
            "Ibu Sri wanted a system that watered exactly as the plants needed — no more, no less.",
          ] },
          { heading: "The Challenge", paragraphs: [
            "Water needs change with soil moisture, temperature, growth stage, and rain forecasts. Fixed rules failed to capture these dynamics.",
            "Watering decisions have delayed consequences: watering today affects tomorrow's condition. This is a good fit for reward-based learning.",
          ] },
          { heading: "The Decision & AI Approach", paragraphs: [
            "The team applied reinforcement learning: an agent observes state (soil moisture, temperature, rain forecast) and chooses an action (how much to water), with a reward balancing plant health and water saving.",
            "The agent was trained in simulation first, then deployed gradually with human oversight before full automation.",
          ] },
          { heading: "Results & Reflection", paragraphs: [
            "Water use fell 26% without reducing yield; in some blocks yield even improved due to more consistent, need-based watering.",
            "Reflection: designing the reward function is an art — a wrong reward could make the agent over-'save water' to the plants' harm. Early oversight mattered.",
          ] },
        ],
        techniques: [
          { name: "Reinforcement Learning", note: "The agent learns a watering policy from rewards." },
          { name: "Sensors + forecast", note: "State: soil moisture, temperature, rain forecast." },
          { name: "Simulation then phased", note: "Trained in simulation, deployed with oversight." },
        ],
        results: ["Water use down 26%.", "Yield stable, some blocks improved.", "Watering adapts to real conditions, not a rigid schedule."],
        lessons: ["Delayed-consequence decisions suit RL.", "Reward design shapes the agent's behavior.", "Train in simulation before the real field."],
        questions: ["How to design a reward balancing water vs yield?", "What is the risk of full control too early?", "How to handle broken or inaccurate sensors?"],
      },
      visualization: {
        type: "beforeAfter",
        caption: { id: "Dampak irigasi berbasis RL pada penggunaan air & hasil.", en: "Impact of RL-based irrigation on water use & yield." },
        metrics: [
          { label: { id: "Penggunaan air (indeks)", en: "Water use (index)" }, before: 100, after: 74, unit: "", betterWhenLower: true },
          { label: { id: "Hasil panen (indeks)", en: "Yield (index)" }, before: 100, after: 104, unit: "" },
          { label: { id: "Pemborosan pupuk (indeks)", en: "Fertilizer runoff (index)" }, before: 100, after: 71, unit: "", betterWhenLower: true },
        ],
      },
      analysisViz: {
        type: "pipeline",
        caption: { id: "Siklus keputusan agen RL untuk irigasi.", en: "The RL agent's decision cycle for irrigation." },
        stages: [
          { icon: "🌡️", label: { id: "Baca sensor (state)", en: "Read sensors (state)" }, detail: { id: "Kelembapan tanah, suhu, dan prakiraan hujan dibaca.", en: "Soil moisture, temperature, and rain forecast are read." } },
          { icon: "🤖", label: { id: "Agen memilih aksi", en: "Agent chooses action" }, detail: { id: "Kebijakan menentukan berapa banyak air disiramkan.", en: "The policy decides how much water to apply." } },
          { icon: "💧", label: { id: "Menyiram", en: "Water applied" }, detail: { id: "Sistem irigasi menyiram sesuai keputusan agen.", en: "The irrigation system waters per the agent's decision." } },
          { icon: "🌱", label: { id: "Reward", en: "Reward" }, detail: { id: "Kesehatan tanaman + air hemat memberi umpan balik.", en: "Plant health + water saved give feedback." } },
          { icon: "🔁", label: { id: "Belajar & ulangi", en: "Learn & repeat" }, detail: { id: "Agen memperbarui kebijakan dari reward, lalu mengulang.", en: "The agent updates its policy from the reward, then repeats." } },
        ],
      },
    },

    // ---------- 4 ----------
    {
      slug: "weed-detection-robot",
      icon: "🌱",
      id: {
        title: "AgriTech Nusantara: Menyemprot Gulma, Bukan Tanaman",
        subtitle: "Computer vision membedakan gulma dari tanaman untuk penyemprotan presisi.",
        company: { name: "AgriTech Nusantara", industry: "Teknologi pertanian presisi", location: "Lampung, Sumatera", size: "Melayani 40 perkebunan mitra" },
        protagonist: { name: "Rangga", role: "Kepala Teknik Lapangan", quote: "Menyemprot herbisida ke seluruh lahan itu mahal dan merusak lingkungan. Kami hanya ingin menyemprot gulma yang benar-benar gulma." },
        sections: [
          { heading: "Latar", paragraphs: [
            "Perkebunan mitra AgriTech menyemprot herbisida secara merata ke seluruh lahan — boros bahan kimia, mahal, dan berdampak buruk pada tanah serta air.",
            "Rangga ingin sistem yang menyemprot hanya pada gulma, membiarkan tanaman utama tak tersentuh.",
          ] },
          { heading: "Tantangan", paragraphs: [
            "Membedakan gulma dari tanaman muda itu sulit — bentuk dan warnanya bisa mirip, dan kondisi lapangan (tanah, cahaya, sudut) sangat bervariasi.",
            "Keputusan harus dibuat cepat saat alat bergerak melintasi lahan, dan kesalahan berarti tanaman utama ikut tersemprot.",
          ] },
          { heading: "Keputusan & Pendekatan AI", paragraphs: [
            "Tim membangun model computer vision (CNN) yang mengenali dan menyegmentasi gulma vs tanaman dari kamera yang dipasang pada alat semprot presisi.",
            "Hanya nozel di atas gulma yang aktif. Sistem dilatih pada data lapangan beragam dan diuji hati-hati sebelum penyemprotan otomatis.",
          ] },
          { heading: "Hasil & Refleksi", paragraphs: [
            "Penggunaan herbisida turun hingga 60% pada lahan uji, dengan pengendalian gulma yang setara — menghemat biaya dan mengurangi dampak lingkungan.",
            "Refleksi: model harus dilatih pada beragam jenis gulma dan kondisi. Salah mengenali tanaman muda sebagai gulma merusak panen, jadi ambang keputusan dibuat konservatif.",
          ] },
        ],
        techniques: [
          { name: "Computer Vision (CNN)", note: "Mengenali & menyegmentasi gulma vs tanaman." },
          { name: "Segmentasi citra", note: "Menandai piksel gulma untuk semprot presisi." },
          { name: "Pengujian konservatif", note: "Ambang hati-hati agar tanaman utama aman." },
        ],
        results: ["Penggunaan herbisida turun hingga 60%.", "Pengendalian gulma tetap setara.", "Biaya & dampak lingkungan menurun."],
        lessons: ["Data latih harus mencakup beragam gulma & kondisi.", "Presisi mengubah ekonomi & lingkungan penyemprotan.", "Salah kenal tanaman muda berbahaya — ambang konservatif."],
        questions: ["Bagaimana menyeimbangkan menyemprot semua gulma vs melindungi tanaman?", "Apa dampak jika model bias ke satu jenis tanaman?", "Kapan penyemprotan otomatis boleh tanpa pengawasan?"],
      },
      en: {
        title: "AgriTech Nusantara: Spraying Weeds, Not Crops",
        subtitle: "Computer vision tells weeds from crops for precision spraying.",
        company: { name: "AgriTech Nusantara", industry: "Precision agriculture tech", location: "Lampung, Sumatra", size: "Serving 40 partner plantations" },
        protagonist: { name: "Rangga", role: "Head of Field Engineering", quote: "Spraying herbicide across the whole field is expensive and harms the environment. We only wanted to spray the actual weeds." },
        sections: [
          { heading: "Background", paragraphs: [
            "AgriTech's partner plantations sprayed herbicide evenly across whole fields — wasteful, costly, and bad for soil and water.",
            "Rangga wanted a system that sprayed only weeds, leaving the main crop untouched.",
          ] },
          { heading: "The Challenge", paragraphs: [
            "Telling weeds from young crops is hard — shapes and colors can look alike, and field conditions (soil, light, angle) vary widely.",
            "Decisions must be fast as the machine moves across the field, and errors mean the main crop gets sprayed too.",
          ] },
          { heading: "The Decision & AI Approach", paragraphs: [
            "The team built a computer-vision model (CNN) that recognizes and segments weeds vs crops from a camera mounted on a precision sprayer.",
            "Only nozzles over weeds activate. The system was trained on diverse field data and tested carefully before automatic spraying.",
          ] },
          { heading: "Results & Reflection", paragraphs: [
            "Herbicide use fell up to 60% on test fields, with equivalent weed control — saving cost and cutting environmental impact.",
            "Reflection: the model must be trained on diverse weed types and conditions. Mistaking a young crop for a weed harms the harvest, so the threshold was kept conservative.",
          ] },
        ],
        techniques: [
          { name: "Computer Vision (CNN)", note: "Recognizes & segments weeds vs crops." },
          { name: "Image segmentation", note: "Marks weed pixels for precision spraying." },
          { name: "Conservative testing", note: "Careful threshold keeps the main crop safe." },
        ],
        results: ["Herbicide use down up to 60%.", "Weed control stayed equivalent.", "Lower cost & environmental impact."],
        lessons: ["Training data must span diverse weeds & conditions.", "Precision changes the economics & ecology of spraying.", "Mistaking young crops is dangerous — keep threshold conservative."],
        questions: ["How to balance spraying all weeds vs protecting crops?", "What if the model is biased toward one crop type?", "When may automatic spraying run without oversight?"],
      },
      visualization: {
        type: "beforeAfter",
        caption: { id: "Dampak penyemprotan presisi berbasis CV.", en: "Impact of CV-based precision spraying." },
        metrics: [
          { label: { id: "Penggunaan herbisida (indeks)", en: "Herbicide use (index)" }, before: 100, after: 40, unit: "", betterWhenLower: true },
          { label: { id: "Biaya bahan kimia (indeks)", en: "Chemical cost (index)" }, before: 100, after: 46, unit: "", betterWhenLower: true },
          { label: { id: "Efektivitas kendali gulma", en: "Weed-control effectiveness" }, before: 92, after: 91, unit: "%" },
        ],
      },
      analysisViz: {
        type: "scatterCluster",
        caption: { id: "CV memisahkan gulma vs tanaman dari fitur bentuk & warna daun; hanya gulma yang disemprot.", en: "CV separates weeds vs crops by leaf shape & color; only weeds get sprayed." },
        xLabel: { id: "Bentuk daun", en: "Leaf shape" },
        yLabel: { id: "Warna / tekstur", en: "Color / texture" },
        groups: [
          { name: { id: "Tanaman utama", en: "Main crop" }, color: "#059669", points: [[0.7, 0.72], [0.78, 0.65], [0.66, 0.8], [0.74, 0.7]] },
          { name: { id: "Gulma", en: "Weeds" }, color: "#F5A200", points: [[0.28, 0.3], [0.2, 0.4], [0.35, 0.25], [0.24, 0.35], [0.3, 0.22]] },
        ],
      },
    },

    // ---------- 5 ----------
    {
      slug: "land-classification-satellite",
      icon: "🛰️",
      id: {
        title: "Bumidata: Memetakan Jutaan Hektar dari Angkasa",
        subtitle: "Klasifikasi citra satelit memetakan jenis lahan & tanaman untuk kebijakan pangan.",
        company: { name: "BumiData (lembaga riset pertanian)", industry: "Riset & kebijakan pertanian", location: "Bogor, Jawa Barat", size: "Mendukung perencanaan pangan nasional" },
        protagonist: { name: "Dr. Laras", role: "Peneliti Utama Geospasial", quote: "Kita tak bisa mengelola apa yang tak bisa kita lihat. Peta lahan yang akurat dan terbaru adalah fondasi kebijakan pangan." },
        sections: [
          { heading: "Latar", paragraphs: [
            "Perencanaan pangan nasional butuh peta akurat: di mana sawah, kebun, hutan, dan lahan terbangun. Survei manual mahal, lambat, dan cepat usang.",
            "Dr. Laras ingin memanfaatkan citra satelit yang melimpah untuk memetakan penggunaan lahan secara berkala dan konsisten.",
          ] },
          { heading: "Tantangan", paragraphs: [
            "Citra satelit sangat besar dan kompleks; membedakan sawah dari kebun atau lahan bera butuh mengenali pola tekstur & warna yang halus.",
            "Awan, bayangan, dan perbedaan musim mempersulit. Model harus konsisten lintas waktu dan wilayah yang luas.",
          ] },
          { heading: "Keputusan & Pendekatan AI", paragraphs: [
            "Tim membangun model klasifikasi citra (CNN) yang melabeli tiap petak citra satelit ke kategori penggunaan lahan: sawah, kebun, hutan, air, atau terbangun.",
            "Hasil divalidasi dengan sampel survei lapangan (ground truth). Peta yang dihasilkan diperbarui berkala untuk memantau perubahan.",
          ] },
          { heading: "Hasil & Refleksi", paragraphs: [
            "Pemetaan yang dulu makan waktu berbulan-bulan kini bisa diperbarui jauh lebih cepat dan konsisten, mendukung keputusan alokasi lahan dan estimasi produksi pangan.",
            "Refleksi: model sebaik data validasi lapangannya. Kolaborasi dengan surveyor lokal tetap krusial untuk menjaga akurasi dan menangkap konteks yang tak terlihat dari angkasa.",
          ] },
        ],
        techniques: [
          { name: "Klasifikasi Citra (CNN)", note: "Melabeli penggunaan lahan dari citra satelit." },
          { name: "Validasi ground-truth", note: "Sampel survei lapangan mengoreksi model." },
          { name: "Pemantauan berkala", note: "Peta diperbarui untuk melacak perubahan lahan." },
        ],
        results: ["Pemetaan lahan: bulan → jauh lebih cepat & konsisten.", "Mendukung alokasi lahan & estimasi produksi.", "Perubahan penggunaan lahan terpantau berkala."],
        lessons: ["Model sebaik data validasi lapangannya.", "Kolaborasi surveyor lokal menjaga akurasi.", "Citra melimpah + AI membuka pemantauan skala besar."],
        questions: ["Bagaimana menangani awan & perbedaan musim pada citra?", "Apa dampak kebijakan jika peta salah klasifikasi?", "Seberapa sering peta perlu diperbarui agar tetap relevan?"],
      },
      en: {
        title: "BumiData: Mapping Millions of Hectares from Space",
        subtitle: "Satellite image classification maps land & crop types for food policy.",
        company: { name: "BumiData (agricultural research institute)", industry: "Agricultural research & policy", location: "Bogor, West Java", size: "Supports national food planning" },
        protagonist: { name: "Dr. Laras", role: "Lead Geospatial Researcher", quote: "You can't manage what you can't see. An accurate, current land map is the foundation of food policy." },
        sections: [
          { heading: "Background", paragraphs: [
            "National food planning needs accurate maps: where paddies, plantations, forests, and built-up land are. Manual surveys are costly, slow, and quickly outdated.",
            "Dr. Laras wanted to leverage abundant satellite imagery to map land use periodically and consistently.",
          ] },
          { heading: "The Challenge", paragraphs: [
            "Satellite imagery is huge and complex; telling paddy from plantation or fallow land requires recognizing subtle texture & color patterns.",
            "Clouds, shadows, and seasonal differences complicate it. The model must be consistent across time and vast regions.",
          ] },
          { heading: "The Decision & AI Approach", paragraphs: [
            "The team built an image-classification model (CNN) labeling each satellite tile into a land-use category: paddy, plantation, forest, water, or built-up.",
            "Results were validated with field-survey samples (ground truth). The resulting maps are refreshed periodically to monitor change.",
          ] },
          { heading: "Results & Reflection", paragraphs: [
            "Mapping that once took months can now be refreshed far faster and more consistently, supporting land-allocation decisions and food-production estimates.",
            "Reflection: a model is only as good as its field validation data. Collaboration with local surveyors remains crucial for accuracy and context invisible from space.",
          ] },
        ],
        techniques: [
          { name: "Image Classification (CNN)", note: "Labels land use from satellite imagery." },
          { name: "Ground-truth validation", note: "Field-survey samples correct the model." },
          { name: "Periodic monitoring", note: "Maps refreshed to track land change." },
        ],
        results: ["Land mapping: months → far faster & consistent.", "Supports land allocation & production estimates.", "Land-use change monitored periodically."],
        lessons: ["A model is only as good as its field validation.", "Local surveyor collaboration keeps accuracy.", "Abundant imagery + AI unlocks large-scale monitoring."],
        questions: ["How to handle clouds & seasonal differences in imagery?", "What is the policy impact if the map misclassifies?", "How often must maps refresh to stay relevant?"],
      },
      visualization: {
        type: "timeline",
        caption: { id: "Tahapan membangun pemetaan lahan berbasis satelit.", en: "Stages of building satellite-based land mapping." },
        milestones: [
          { when: { id: "Tahap 1", en: "Phase 1" }, title: { id: "Kumpulkan citra + label", en: "Collect imagery + labels" }, detail: { id: "Mengumpulkan citra satelit & label penggunaan lahan dari survei.", en: "Gather satellite imagery & land-use labels from surveys." } },
          { when: { id: "Tahap 2", en: "Phase 2" }, title: { id: "Latih CNN klasifikasi", en: "Train classification CNN" }, detail: { id: "Model belajar membedakan sawah, kebun, hutan, air, terbangun.", en: "The model learns paddy, plantation, forest, water, built-up." } },
          { when: { id: "Tahap 3", en: "Phase 3" }, title: { id: "Validasi lapangan", en: "Field validation" }, detail: { id: "Membandingkan prediksi dengan survei nyata (ground truth).", en: "Compare predictions with real surveys (ground truth)." } },
          { when: { id: "Tahap 4", en: "Phase 4" }, title: { id: "Pemantauan berkala", en: "Periodic monitoring" }, detail: { id: "Memperbarui peta untuk melacak perubahan penggunaan lahan.", en: "Refresh maps to track land-use change." } },
        ],
      },
      analysisViz: {
        type: "pipeline",
        caption: { id: "Bagaimana petak citra satelit menjadi peta penggunaan lahan.", en: "How a satellite tile becomes a land-use map." },
        stages: [
          { icon: "🛰️", label: { id: "Petak citra", en: "Image tile" }, detail: { id: "Citra satelit dibagi menjadi petak-petak kecil.", en: "Satellite imagery is split into small tiles." } },
          { icon: "☁️", label: { id: "Saring awan", en: "Filter clouds" }, detail: { id: "Menyaring awan & bayangan agar tak mengecoh model.", en: "Filter clouds & shadows so they don't fool the model." } },
          { icon: "🔎", label: { id: "CNN mengklasifikasi", en: "CNN classifies" }, detail: { id: "Konvolusi mengenali pola tekstur & warna lahan.", en: "Convolution recognizes land texture & color patterns." } },
          { icon: "🗺️", label: { id: "Peta lahan", en: "Land map" }, detail: { id: "Tiap petak dilabeli & disatukan menjadi peta.", en: "Each tile is labeled & stitched into a map." } },
          { icon: "✅", label: { id: "Validasi lapangan", en: "Field validation" }, detail: { id: "Sampel dicek surveyor untuk menjaga akurasi.", en: "Samples checked by surveyors to keep accuracy." } },
        ],
      },
    },
  ],
};
