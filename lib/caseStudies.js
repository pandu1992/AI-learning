// HBS/Stanford-style narrative business cases, bilingual (id/en).
// Each case study has a fictional-but-realistic company, a protagonist facing a
// decision, the challenge, the AI approach (with techniques), results, lessons,
// and discussion questions for classroom use.
//
// Shape per language:
// {
//   title, subtitle, company (name, industry, location, size),
//   protagonist { name, role, quote },
//   sections: [{ heading, paragraphs[] }],
//   techniques: [{ name, note }],
//   results: [string],
//   lessons: [string],
//   questions: [string],
// }

export const caseStudies = {
  business: {
    icon: "💼",
    id: {
      title: "TokoRuang: Menyelamatkan Pelanggan yang Diam-diam Pergi",
      subtitle: "Bagaimana sebuah e-commerce memakai machine learning untuk menekan churn 30%.",
      company: { name: "TokoRuang", industry: "E-commerce ritel", location: "Jakarta, Indonesia", size: "±480 karyawan, 2,3 juta pelanggan aktif" },
      protagonist: {
        name: "Dinar Prasetya",
        role: "VP of Growth",
        quote: "Kami tidak kekurangan pelanggan baru. Masalahnya, kami kehilangan pelanggan lama tanpa pernah tahu alasannya.",
      },
      sections: [
        {
          heading: "Latar",
          paragraphs: [
            "Pada kuartal ketiga, tim keuangan TokoRuang menyadari sesuatu yang mengganggu: meski akuisisi pelanggan baru tumbuh 18% year-on-year, pendapatan bersih justru stagnan. Biaya iklan naik, tetapi laba tidak mengikuti.",
            "Dinar Prasetya, VP of Growth yang baru enam bulan menjabat, diminta CEO untuk menemukan 'kebocoran' itu dalam 90 hari. Analisis awal timnya menunjuk pada satu angka yang selama ini terabaikan: tingkat churn — pelanggan yang berhenti berbelanja — telah diam-diam merangkak naik ke 24% per tahun.",
          ],
        },
        {
          heading: "Tantangan",
          paragraphs: [
            "Masalahnya, tim tidak tahu pelanggan mana yang akan pergi sampai mereka benar-benar pergi. Program retensi yang ada bersifat 'semprot merata' — memberi diskon ke semua orang, termasuk pelanggan yang toh akan tetap setia. Ini mahal dan tidak efektif.",
            "Dinar menghadapi pilihan: terus menambah anggaran akuisisi (yang disukai tim pemasaran), atau berinvestasi membangun kemampuan memprediksi churn (yang belum pernah dilakukan perusahaan dan butuh waktu).",
          ],
        },
        {
          heading: "Keputusan & Pendekatan AI",
          paragraphs: [
            "Dinar memilih jalur kedua. Bekerja sama dengan tim data, mereka membangun model machine learning yang memprediksi kemungkinan seorang pelanggan akan churn dalam 30 hari ke depan.",
            "Fitur yang dipakai: frekuensi pembelian, waktu sejak transaksi terakhir, nilai rata-rata pesanan, jumlah keluhan, dan aktivitas membuka aplikasi. Model klasifikasi memberi tiap pelanggan skor risiko. Pelanggan berisiko tinggi lalu dikelompokkan agar penawaran retensi bisa dipersonalisasi — bukan lagi diskon merata.",
          ],
        },
        {
          heading: "Hasil",
          paragraphs: [
            "Dalam dua kuartal, TokoRuang memangkas churn dari 24% menjadi 17% pada segmen yang ditargetkan — penurunan relatif sekitar 30%. Yang menarik, total anggaran promosi justru turun 12% karena diskon hanya diberikan ke pelanggan yang benar-benar berisiko dan bernilai.",
            "Namun tidak semua mulus: pada awalnya model salah menandai banyak pelanggan setia sebagai 'berisiko' (false positive), membuang biaya diskon. Tim harus menyeimbangkan ambang keputusan antara menangkap yang benar-benar akan pergi dan tidak mengganggu yang loyal.",
          ],
        },
      ],
      techniques: [
        { name: "Klasifikasi (Supervised)", note: "Memprediksi label churn / tidak churn dari data historis berlabel." },
        { name: "Segmentasi (k-means)", note: "Mengelompokkan pelanggan berisiko untuk personalisasi penawaran." },
        { name: "Feature engineering", note: "Mengubah log transaksi mentah menjadi sinyal prediktif." },
      ],
      results: [
        "Churn pada segmen target turun ~30% (24% → 17%).",
        "Anggaran promosi turun 12% karena penargetan lebih tepat.",
        "Waktu deteksi pelanggan berisiko: dari 'setelah pergi' menjadi 30 hari sebelumnya.",
      ],
      lessons: [
        "Memprediksi lebih murah daripada mengakuisisi ulang.",
        "Model bukan sihir — ambang keputusan (trade-off false positive/negative) adalah keputusan bisnis, bukan hanya teknis.",
        "Kualitas fitur (data) lebih menentukan daripada kecanggihan algoritma.",
      ],
      questions: [
        "Jika Anda Dinar, bagaimana Anda menjelaskan trade-off false positive ke tim keuangan?",
        "Fitur data tambahan apa yang mungkin meningkatkan prediksi, dan apa risiko privasinya?",
        "Kapan menaikkan anggaran akuisisi tetap merupakan keputusan yang benar dibanding retensi?",
      ],
    },
    en: {
      title: "TokoRuang: Saving the Customers Who Quietly Left",
      subtitle: "How an e-commerce company used machine learning to cut churn by 30%.",
      company: { name: "TokoRuang", industry: "Retail e-commerce", location: "Jakarta, Indonesia", size: "~480 employees, 2.3M active customers" },
      protagonist: {
        name: "Dinar Prasetya",
        role: "VP of Growth",
        quote: "We weren't short on new customers. The problem was losing old ones without ever knowing why.",
      },
      sections: [
        {
          heading: "Background",
          paragraphs: [
            "In the third quarter, TokoRuang's finance team noticed something troubling: although new-customer acquisition grew 18% year-on-year, net revenue was flat. Ad spend rose, but profit did not follow.",
            "Dinar Prasetya, VP of Growth just six months into the role, was asked by the CEO to find the 'leak' within 90 days. Her team's first analysis pointed to a long-ignored number: churn — customers who stop buying — had quietly crept up to 24% per year.",
          ],
        },
        {
          heading: "The Challenge",
          paragraphs: [
            "The trouble was, the team didn't know which customers would leave until they actually left. The existing retention program was 'spray and pray' — offering discounts to everyone, including customers who would have stayed loyal anyway. Expensive and ineffective.",
            "Dinar faced a choice: keep increasing the acquisition budget (favored by marketing), or invest in building the ability to predict churn (never done before and slower to pay off).",
          ],
        },
        {
          heading: "The Decision & AI Approach",
          paragraphs: [
            "Dinar chose the second path. Working with the data team, they built a machine learning model to predict how likely a customer was to churn within the next 30 days.",
            "Features used: purchase frequency, time since last order, average order value, number of complaints, and app-open activity. A classification model gave each customer a risk score. High-risk customers were then clustered so retention offers could be personalized — no more blanket discounts.",
          ],
        },
        {
          heading: "Results",
          paragraphs: [
            "Within two quarters, TokoRuang cut churn from 24% to 17% in the targeted segment — a relative drop of about 30%. Notably, total promotion budget actually fell 12% because discounts went only to customers who were genuinely at risk and valuable.",
            "It wasn't all smooth: early on the model mislabeled many loyal customers as 'at risk' (false positives), wasting discount spend. The team had to balance the decision threshold between catching real leavers and not annoying loyal ones.",
          ],
        },
      ],
      techniques: [
        { name: "Classification (Supervised)", note: "Predicts churn / no-churn from labeled historical data." },
        { name: "Segmentation (k-means)", note: "Groups at-risk customers to personalize offers." },
        { name: "Feature engineering", note: "Turns raw transaction logs into predictive signals." },
      ],
      results: [
        "Churn in the target segment fell ~30% (24% → 17%).",
        "Promotion budget dropped 12% thanks to sharper targeting.",
        "At-risk detection time: from 'after they left' to 30 days ahead.",
      ],
      lessons: [
        "Predicting is cheaper than re-acquiring.",
        "A model is not magic — the decision threshold (false positive/negative trade-off) is a business call, not just technical.",
        "Feature (data) quality matters more than algorithm sophistication.",
      ],
      questions: [
        "If you were Dinar, how would you explain the false-positive trade-off to finance?",
        "What extra data features might improve prediction, and what are the privacy risks?",
        "When is increasing the acquisition budget still the right call over retention?",
      ],
    },
  },

  agriculture: {
    icon: "🌾",
    id: {
      title: "Sawah Pintar: Mata Digital untuk Petani Padi",
      subtitle: "Koperasi tani memakai computer vision untuk mendeteksi penyakit sejak dini.",
      company: { name: "Koperasi Tani Makmur", industry: "Pertanian padi", location: "Klaten, Jawa Tengah", size: "1.200 petani anggota, 3.400 hektar" },
      protagonist: {
        name: "Pak Sugeng",
        role: "Ketua Koperasi",
        quote: "Saat kami melihat daunnya menguning, sering sudah terlambat. Setengah petak bisa hilang dalam seminggu.",
      },
      sections: [
        {
          heading: "Latar",
          paragraphs: [
            "Koperasi Tani Makmur menaungi 1.200 petani padi. Selama bertahun-tahun, hama dan penyakit seperti hawar daun bakteri menyerang tanpa peringatan, dan pengetahuan mendeteksinya terpusat pada segelintir penyuluh yang harus keliling ratusan hektar.",
            "Pak Sugeng, ketua koperasi, tahu bahwa deteksi terlambat berarti gagal panen dan utang bagi petani kecil.",
          ],
        },
        {
          heading: "Tantangan",
          paragraphs: [
            "Penyuluh ahli terlalu sedikit dan tidak mungkin memeriksa setiap petak setiap hari. Petani awam sulit membedakan gejala penyakit dari kekurangan nutrisi biasa. Keputusan menyemprot pestisida sering diambil terlambat, atau justru berlebihan sehingga boros dan merusak lingkungan.",
            "Koperasi mempertimbangkan: melatih lebih banyak penyuluh (mahal dan lambat) atau mencoba solusi teknologi yang belum pernah dipakai petani mereka.",
          ],
        },
        {
          heading: "Keputusan & Pendekatan AI",
          paragraphs: [
            "Bekerja sama dengan universitas lokal, koperasi mengembangkan aplikasi ponsel sederhana: petani memotret daun padi, dan sebuah model deep learning (CNN) mengklasifikasikan apakah tanaman sehat, terkena hawar daun, atau kekurangan nutrisi.",
            "Model dilatih dari ribuan foto daun berlabel oleh penyuluh. Ini pada dasarnya memindahkan 'mata ahli' ke setiap ponsel petani, memungkinkan pemeriksaan harian mandiri.",
          ],
        },
        {
          heading: "Hasil",
          paragraphs: [
            "Setelah satu musim tanam, petak yang memakai aplikasi melaporkan deteksi dini penyakit rata-rata 4–6 hari lebih cepat. Kehilangan panen akibat penyakit turun sekitar 22%, dan penggunaan pestisida turun 18% karena penyemprotan jadi lebih tepat sasaran.",
            "Tantangannya nyata: sinyal internet di sawah tidak stabil (model harus bisa jalan offline di ponsel), dan awalnya banyak petani lebih tua ragu mempercayai 'tebakan aplikasi' dibanding intuisi puluhan tahun. Adopsi baru meningkat setelah beberapa petani berpengaruh membuktikan hasilnya.",
          ],
        },
      ],
      techniques: [
        { name: "CNN / Computer Vision", note: "Mengklasifikasi kondisi daun dari foto." },
        { name: "Klasifikasi citra", note: "Sehat vs. penyakit vs. defisiensi nutrisi." },
        { name: "Model on-device", note: "Berjalan offline di ponsel karena internet terbatas." },
      ],
      results: [
        "Deteksi penyakit 4–6 hari lebih cepat.",
        "Kehilangan panen akibat penyakit turun ~22%.",
        "Penggunaan pestisida turun 18%.",
      ],
      lessons: [
        "AI memperluas keahlian langka (penyuluh) ke banyak orang sekaligus.",
        "Kendala lapangan (internet, perangkat) sama pentingnya dengan akurasi model.",
        "Adopsi teknologi adalah masalah kepercayaan sosial, bukan hanya teknis.",
      ],
      questions: [
        "Bagaimana Anda akan membangun kepercayaan petani senior terhadap sistem ini?",
        "Apa risiko jika model salah menyatakan tanaman sakit sebagai sehat?",
        "Bagaimana koperasi bisa terus memperbarui model saat muncul penyakit baru?",
      ],
    },
    en: {
      title: "Smart Paddy: Digital Eyes for Rice Farmers",
      subtitle: "A farming cooperative uses computer vision to catch crop disease early.",
      company: { name: "Tani Makmur Cooperative", industry: "Rice farming", location: "Klaten, Central Java", size: "1,200 member farmers, 3,400 hectares" },
      protagonist: {
        name: "Pak Sugeng",
        role: "Cooperative Chairman",
        quote: "By the time we saw the leaves yellowing, it was often too late. Half a plot could be gone in a week.",
      },
      sections: [
        {
          heading: "Background",
          paragraphs: [
            "The Tani Makmur Cooperative serves 1,200 rice farmers. For years, pests and diseases like bacterial leaf blight struck without warning, and the know-how to spot them sat with a handful of extension officers who had to roam hundreds of hectares.",
            "Pak Sugeng, the cooperative chairman, knew that late detection meant crop failure and debt for smallholders.",
          ],
        },
        {
          heading: "The Challenge",
          paragraphs: [
            "Expert officers were too few to inspect every plot every day. Ordinary farmers struggled to tell disease symptoms from ordinary nutrient deficiency. Decisions to spray pesticide often came too late — or were excessive, wasteful, and harmful to the environment.",
            "The cooperative weighed its options: train more extension officers (expensive and slow) or try a technology solution their farmers had never used.",
          ],
        },
        {
          heading: "The Decision & AI Approach",
          paragraphs: [
            "Partnering with a local university, the cooperative built a simple phone app: a farmer photographs a rice leaf, and a deep learning model (CNN) classifies whether the plant is healthy, has leaf blight, or is nutrient-deficient.",
            "The model was trained on thousands of leaf photos labeled by extension officers. In essence, it moved the 'expert's eye' into every farmer's phone, enabling daily self-checks.",
          ],
        },
        {
          heading: "Results",
          paragraphs: [
            "After one planting season, plots using the app reported early disease detection 4–6 days sooner on average. Crop loss from disease fell about 22%, and pesticide use dropped 18% because spraying became better targeted.",
            "The challenges were real: internet in the fields was unreliable (the model had to run offline on the phone), and at first many older farmers hesitated to trust an 'app's guess' over decades of intuition. Adoption only rose after a few influential farmers proved the results.",
          ],
        },
      ],
      techniques: [
        { name: "CNN / Computer Vision", note: "Classifies leaf condition from a photo." },
        { name: "Image classification", note: "Healthy vs. disease vs. nutrient deficiency." },
        { name: "On-device model", note: "Runs offline on phones due to limited internet." },
      ],
      results: [
        "Disease detected 4–6 days earlier.",
        "Crop loss from disease down ~22%.",
        "Pesticide use down 18%.",
      ],
      lessons: [
        "AI scales scarce expertise (officers) to many people at once.",
        "Field constraints (internet, devices) matter as much as model accuracy.",
        "Technology adoption is a matter of social trust, not just technical merit.",
      ],
      questions: [
        "How would you build senior farmers' trust in this system?",
        "What is the risk if the model wrongly calls a sick plant healthy?",
        "How can the cooperative keep the model updated as new diseases emerge?",
      ],
    },
  },

  health: {
    icon: "🩺",
    id: {
      title: "RS Harapan: Antrean Radiologi yang Tak Kunjung Habis",
      subtitle: "Rumah sakit memakai deep learning untuk memprioritaskan rontgen dada kritis.",
      company: { name: "Rumah Sakit Harapan", industry: "Layanan kesehatan", location: "Surabaya, Indonesia", size: "620 tempat tidur, 8 radiolog" },
      protagonist: {
        name: "dr. Anita Wijaya, Sp.Rad",
        role: "Kepala Departemen Radiologi",
        quote: "Setiap penundaan pembacaan adalah taruhan. Pertanyaannya bukan apakah kami cukup teliti, tapi apakah kami cukup cepat.",
      },
      sections: [
        {
          heading: "Latar",
          paragraphs: [
            "RS Harapan memproses lebih dari 300 rontgen dada per hari, tetapi hanya punya 8 radiolog. Antrean pembacaan bisa mengular hingga 24 jam pada hari sibuk. Sebagian besar hasil normal, namun sebagian kecil menunjukkan kondisi kritis seperti pneumotoraks yang butuh tindakan segera.",
            "dr. Anita khawatir kasus kritis 'tersembunyi' di tengah tumpukan hasil normal, tertunda hanya karena urutan antrean.",
          ],
        },
        {
          heading: "Tantangan",
          paragraphs: [
            "Menambah radiolog sulit — mereka langka dan mahal. Meminta radiolog membaca lebih cepat berisiko menaikkan kesalahan. dr. Anita butuh cara agar kasus paling mendesak naik ke urutan atas antrean, tanpa mengganti peran dokter.",
            "Ada pula kekhawatiran etis dan hukum: apa yang terjadi jika AI melewatkan sesuatu? Siapa yang bertanggung jawab?",
          ],
        },
        {
          heading: "Keputusan & Pendekatan AI",
          paragraphs: [
            "Alih-alih membiarkan AI mendiagnosis, dr. Anita memilih peran yang lebih aman: triase. Sebuah model deep learning (CNN) menganalisis setiap rontgen dan memberi skor kemungkinan temuan kritis, lalu mengurutkan ulang antrean sehingga kasus berisiko tinggi dibaca radiolog lebih dahulu.",
            "Poin penting: AI tidak pernah membuat keputusan akhir. Setiap gambar tetap dibaca manusia. AI hanya mengubah urutan, bukan menggantikan penilaian.",
          ],
        },
        {
          heading: "Hasil",
          paragraphs: [
            "Waktu tunggu pembacaan untuk kasus kritis turun dari rata-rata 11 jam menjadi kurang dari 2 jam. Tidak ada radiolog yang dikurangi; sebaliknya, beban mental berkurang karena mereka tahu kasus genting sudah diprioritaskan.",
            "Tetap ada tantangan: model kadang memberi 'alarm palsu' yang membuat radiolog membaca kasus normal lebih dulu (mengganggu efisiensi), dan tim harus rutin mengaudit performa model agar tidak menurun seiring waktu (model drift).",
          ],
        },
      ],
      techniques: [
        { name: "CNN / Deep Learning", note: "Menganalisis citra rontgen untuk skor risiko." },
        { name: "Triase (prioritas), bukan diagnosis", note: "AI mengurutkan antrean; dokter tetap memutuskan." },
        { name: "Human-in-the-loop", note: "Setiap hasil tetap diverifikasi manusia." },
      ],
      results: [
        "Waktu tunggu kasus kritis: 11 jam → <2 jam.",
        "Tidak ada pengurangan radiolog; beban kerja lebih terkelola.",
        "Kasus genting jarang lagi tenggelam di antrean.",
      ],
      lessons: [
        "Di domain berisiko tinggi, AI sebagai 'asisten triase' lebih bijak daripada 'pengambil keputusan'.",
        "Human-in-the-loop menjaga akuntabilitas medis dan hukum.",
        "Model perlu diaudit terus-menerus untuk mencegah penurunan performa.",
      ],
      questions: [
        "Mengapa memakai AI untuk triase lebih aman daripada untuk diagnosis akhir?",
        "Bagaimana rumah sakit harus menangani tanggung jawab bila AI salah prioritas?",
        "Metode apa untuk memantau agar model tidak menurun seiring waktu?",
      ],
    },
    en: {
      title: "Harapan Hospital: The Radiology Queue That Never Ended",
      subtitle: "A hospital uses deep learning to prioritize critical chest X-rays.",
      company: { name: "Harapan Hospital", industry: "Healthcare", location: "Surabaya, Indonesia", size: "620 beds, 8 radiologists" },
      protagonist: {
        name: "Dr. Anita Wijaya, Radiologist",
        role: "Head of Radiology",
        quote: "Every reading delay is a gamble. The question wasn't whether we were careful enough, but whether we were fast enough.",
      },
      sections: [
        {
          heading: "Background",
          paragraphs: [
            "Harapan Hospital processes over 300 chest X-rays a day, but has only 8 radiologists. The reading queue could stretch to 24 hours on busy days. Most results are normal, yet a small fraction show critical conditions like pneumothorax that need immediate action.",
            "Dr. Anita worried that critical cases were 'hiding' among the pile of normal results, delayed simply by queue order.",
          ],
        },
        {
          heading: "The Challenge",
          paragraphs: [
            "Hiring more radiologists was hard — they are scarce and expensive. Asking them to read faster risked more errors. Dr. Anita needed a way to move the most urgent cases to the top of the queue, without replacing the doctors' role.",
            "There were ethical and legal concerns too: what happens if the AI misses something? Who is responsible?",
          ],
        },
        {
          heading: "The Decision & AI Approach",
          paragraphs: [
            "Rather than letting AI diagnose, Dr. Anita chose a safer role: triage. A deep learning model (CNN) analyzes each X-ray and assigns a likelihood score of a critical finding, then re-orders the queue so high-risk cases are read by a radiologist first.",
            "The key point: the AI never makes the final decision. Every image is still read by a human. The AI only changes the order, not the judgment.",
          ],
        },
        {
          heading: "Results",
          paragraphs: [
            "Reading wait time for critical cases dropped from an average of 11 hours to under 2. No radiologists were cut; instead, their mental load eased knowing urgent cases were already prioritized.",
            "Challenges remained: the model sometimes gave 'false alarms' that pushed normal cases to the front (hurting efficiency), and the team had to routinely audit model performance so it wouldn't degrade over time (model drift).",
          ],
        },
      ],
      techniques: [
        { name: "CNN / Deep Learning", note: "Analyzes X-ray images for a risk score." },
        { name: "Triage (prioritization), not diagnosis", note: "AI orders the queue; doctors still decide." },
        { name: "Human-in-the-loop", note: "Every result is still verified by a human." },
      ],
      results: [
        "Critical-case wait time: 11 hours → <2 hours.",
        "No radiologists cut; workload more manageable.",
        "Urgent cases rarely buried in the queue anymore.",
      ],
      lessons: [
        "In high-stakes domains, AI as a 'triage assistant' is wiser than as a 'decision maker'.",
        "Human-in-the-loop preserves medical and legal accountability.",
        "Models need continuous auditing to prevent performance decay.",
      ],
      questions: [
        "Why is using AI for triage safer than for final diagnosis?",
        "How should the hospital handle liability if the AI mis-prioritizes?",
        "What methods would monitor the model so it doesn't degrade over time?",
      ],
    },
  },

  education: {
    icon: "🎓",
    id: {
      title: "Kampus Merdeka Online: Ketika Satu Ukuran Tak Cocok untuk Semua",
      subtitle: "Platform kursus daring memakai pembelajaran adaptif untuk menekan angka putus kelas.",
      company: { name: "BelajarKita", industry: "Pendidikan teknologi (EdTech)", location: "Bandung, Indonesia", size: "140.000 pelajar aktif" },
      protagonist: {
        name: "Rani Kusuma",
        role: "Head of Learning Experience",
        quote: "Kami punya konten hebat. Tapi konten hebat yang ditinggalkan di tengah jalan tidak mengajarkan apa pun.",
      },
      sections: [
        {
          heading: "Latar",
          paragraphs: [
            "BelajarKita menawarkan kursus pemrograman daring untuk puluhan ribu pelajar dengan latar sangat beragam — dari mahasiswa hingga pekerja beralih karier. Kurikulumnya seragam: semua orang melewati urutan materi yang sama dengan kecepatan yang sama.",
            "Rani memperhatikan pola yang mengkhawatirkan: 61% pelajar berhenti sebelum menyelesaikan kursus, banyak yang menyerah tepat setelah topik-topik sulit tertentu.",
          ],
        },
        {
          heading: "Tantangan",
          paragraphs: [
            "Pelajar yang cepat merasa bosan karena materi terlalu lambat; pelajar yang lambat merasa kewalahan dan tertinggal. Kurikulum 'satu ukuran untuk semua' gagal di kedua ujung spektrum.",
            "Rani harus memutuskan: merombak konten secara manual (butuh tim besar dan waktu berbulan-bulan) atau membangun sistem yang menyesuaikan jalur belajar tiap orang secara otomatis.",
          ],
        },
        {
          heading: "Keputusan & Pendekatan AI",
          paragraphs: [
            "Tim membangun sistem pembelajaran adaptif. Berdasarkan jawaban kuis dan pola interaksi, model mengelompokkan pelajar (clustering) dan menyesuaikan tingkat kesulitan soal berikutnya — memberi latihan tambahan pada konsep yang lemah, dan melewati yang sudah dikuasai.",
            "Sistem juga memprediksi pelajar yang berisiko putus (klasifikasi) dan memicu intervensi: pengingat, ringkasan, atau tawaran sesi mentor. Sebuah tutor virtual berbasis LLM menjawab pertanyaan kapan saja untuk mengurangi rasa 'tersesat sendirian'.",
          ],
        },
        {
          heading: "Hasil",
          paragraphs: [
            "Setelah dua kohort, tingkat penyelesaian kursus naik dari 39% menjadi 58%. Pelajar melaporkan materi terasa 'pas' dengan kemampuan mereka. Prediksi risiko putus memungkinkan tim menjangkau pelajar tepat sebelum mereka menyerah.",
            "Namun ada dilema: personalisasi berlebihan bisa membuat sebagian pelajar hanya mengambil jalur termudah dan melewatkan tantangan yang justru penting untuk pertumbuhan. Tim harus merancang agar sistem tetap mendorong, bukan sekadar menyenangkan.",
          ],
        },
      ],
      techniques: [
        { name: "Clustering (Unsupervised)", note: "Mengelompokkan pelajar dengan pola belajar serupa." },
        { name: "Klasifikasi (Supervised)", note: "Memprediksi risiko putus kelas." },
        { name: "Tutor virtual (LLM)", note: "Menjawab pertanyaan pelajar kapan saja." },
      ],
      results: [
        "Tingkat penyelesaian naik dari 39% → 58%.",
        "Intervensi tepat waktu bagi pelajar berisiko putus.",
        "Kepuasan pelajar terhadap tingkat kesulitan meningkat.",
      ],
      lessons: [
        "Personalisasi meningkatkan hasil, tapi harus tetap menantang, bukan hanya memanjakan.",
        "Kombinasi teknik (clustering + klasifikasi + LLM) sering lebih kuat daripada satu model.",
        "Metrik yang dioptimalkan (penyelesaian) harus dipilih hati-hati agar tidak menyesatkan.",
      ],
      questions: [
        "Bagaimana menyeimbangkan 'materi yang pas' dengan 'tantangan yang perlu'?",
        "Apa risiko jika sistem terlalu menyederhanakan jalur belajar?",
        "Metrik apa selain tingkat penyelesaian yang sebaiknya dipantau?",
      ],
    },
    en: {
      title: "Learn Online: When One Size Fits No One",
      subtitle: "An online course platform uses adaptive learning to reduce dropouts.",
      company: { name: "BelajarKita", industry: "Education technology (EdTech)", location: "Bandung, Indonesia", size: "140,000 active learners" },
      protagonist: {
        name: "Rani Kusuma",
        role: "Head of Learning Experience",
        quote: "We had great content. But great content abandoned halfway teaches nothing.",
      },
      sections: [
        {
          heading: "Background",
          paragraphs: [
            "BelajarKita offers online programming courses to tens of thousands of learners from very different backgrounds — from university students to career switchers. The curriculum was uniform: everyone went through the same sequence at the same pace.",
            "Rani noticed a worrying pattern: 61% of learners quit before finishing, many giving up right after certain hard topics.",
          ],
        },
        {
          heading: "The Challenge",
          paragraphs: [
            "Fast learners got bored because the pace was too slow; slower learners felt overwhelmed and fell behind. The 'one size fits all' curriculum failed at both ends of the spectrum.",
            "Rani had to decide: manually overhaul the content (a large team and months of work) or build a system that automatically adapts each person's learning path.",
          ],
        },
        {
          heading: "The Decision & AI Approach",
          paragraphs: [
            "The team built an adaptive learning system. Based on quiz answers and interaction patterns, a model clusters learners and adjusts the difficulty of upcoming questions — giving extra practice on weak concepts and skipping mastered ones.",
            "The system also predicts at-risk learners (classification) and triggers interventions: reminders, summaries, or an offer of a mentor session. An LLM-based virtual tutor answers questions anytime to reduce the feeling of being 'lost alone'.",
          ],
        },
        {
          heading: "Results",
          paragraphs: [
            "After two cohorts, course completion rose from 39% to 58%. Learners reported the material felt 'right' for their level. Dropout-risk prediction let the team reach learners just before they gave up.",
            "But a dilemma emerged: over-personalization could let some learners take only the easiest path and skip the challenges that actually drive growth. The team had to design the system to keep pushing, not merely please.",
          ],
        },
      ],
      techniques: [
        { name: "Clustering (Unsupervised)", note: "Groups learners with similar learning patterns." },
        { name: "Classification (Supervised)", note: "Predicts dropout risk." },
        { name: "Virtual tutor (LLM)", note: "Answers learner questions anytime." },
      ],
      results: [
        "Completion rate rose from 39% → 58%.",
        "Timely intervention for at-risk learners.",
        "Higher learner satisfaction with difficulty level.",
      ],
      lessons: [
        "Personalization improves outcomes, but must stay challenging, not just comfortable.",
        "Combining techniques (clustering + classification + LLM) often beats a single model.",
        "The optimized metric (completion) must be chosen carefully to avoid misleading incentives.",
      ],
      questions: [
        "How do you balance 'material that fits' with 'the challenge that's needed'?",
        "What is the risk if the system oversimplifies the learning path?",
        "What metrics besides completion rate should be monitored?",
      ],
    },
  },
};
