// Bilingual case-study content per field. Each field has an intro and a list
// of concrete AI applications, noting which technique they map to.

export const caseStudies = {
  business: {
    icon: "💼",
    id: {
      title: "AI di Bidang Bisnis",
      subtitle: "Dari layanan pelanggan hingga prediksi permintaan.",
      intro:
        "Perusahaan menggunakan AI untuk memahami pelanggan, mengotomasi pekerjaan berulang, dan mengambil keputusan berbasis data.",
      cases: [
        { title: "Segmentasi pelanggan", desc: "Mengelompokkan pelanggan berdasarkan perilaku belanja.", tech: "Unsupervised — k-means" },
        { title: "Prediksi churn", desc: "Memperkirakan pelanggan yang akan berhenti berlangganan.", tech: "Supervised — klasifikasi" },
        { title: "Sistem rekomendasi", desc: "Menyarankan produk yang relevan (seperti e-commerce).", tech: "ML / Deep Learning" },
        { title: "Chatbot layanan", desc: "Menjawab pertanyaan pelanggan otomatis 24/7.", tech: "LLM" },
        { title: "Deteksi penipuan", desc: "Menandai transaksi mencurigakan secara real-time.", tech: "Supervised + anomaly detection" },
      ],
    },
    en: {
      title: "AI in Business",
      subtitle: "From customer service to demand forecasting.",
      intro:
        "Companies use AI to understand customers, automate repetitive work, and make data-driven decisions.",
      cases: [
        { title: "Customer segmentation", desc: "Group customers by shopping behavior.", tech: "Unsupervised — k-means" },
        { title: "Churn prediction", desc: "Predict which customers will cancel.", tech: "Supervised — classification" },
        { title: "Recommendation systems", desc: "Suggest relevant products (like e-commerce).", tech: "ML / Deep Learning" },
        { title: "Service chatbots", desc: "Answer customer questions automatically 24/7.", tech: "LLM" },
        { title: "Fraud detection", desc: "Flag suspicious transactions in real time.", tech: "Supervised + anomaly detection" },
      ],
    },
  },

  agriculture: {
    icon: "🌾",
    id: {
      title: "AI di Bidang Pertanian",
      subtitle: "Menuju pertanian presisi dan cerdas.",
      intro:
        "AI membantu petani meningkatkan hasil panen, menghemat sumber daya, dan mendeteksi masalah lebih awal.",
      cases: [
        { title: "Deteksi penyakit tanaman", desc: "Mengenali penyakit dari foto daun.", tech: "Deep Learning — CNN" },
        { title: "Prediksi hasil panen", desc: "Memperkirakan produksi dari cuaca & tanah.", tech: "Supervised — regresi" },
        { title: "Klasifikasi lahan", desc: "Memetakan jenis tanaman dari citra satelit.", tech: "Deep Learning — CNN" },
        { title: "Irigasi cerdas", desc: "Mengatur penyiraman berdasarkan sensor.", tech: "Reinforcement Learning" },
        { title: "Deteksi gulma", desc: "Membedakan tanaman dan gulma untuk penyemprotan tepat.", tech: "Deep Learning — CNN" },
      ],
    },
    en: {
      title: "AI in Agriculture",
      subtitle: "Toward precision and smart farming.",
      intro:
        "AI helps farmers boost yields, save resources, and detect problems early.",
      cases: [
        { title: "Plant disease detection", desc: "Recognize diseases from leaf photos.", tech: "Deep Learning — CNN" },
        { title: "Yield prediction", desc: "Estimate production from weather & soil.", tech: "Supervised — regression" },
        { title: "Land classification", desc: "Map crop types from satellite imagery.", tech: "Deep Learning — CNN" },
        { title: "Smart irrigation", desc: "Control watering based on sensors.", tech: "Reinforcement Learning" },
        { title: "Weed detection", desc: "Tell crops from weeds for precise spraying.", tech: "Deep Learning — CNN" },
      ],
    },
  },

  health: {
    icon: "🩺",
    id: {
      title: "AI di Bidang Kesehatan",
      subtitle: "Membantu diagnosis dan penelitian medis.",
      intro:
        "AI mendukung tenaga medis — bukan menggantikan — dengan menganalisis data dalam skala besar.",
      cases: [
        { title: "Analisis citra medis", desc: "Membantu membaca X-ray, CT, dan MRI.", tech: "Deep Learning — CNN" },
        { title: "Prediksi risiko penyakit", desc: "Menilai risiko dari rekam medis.", tech: "Supervised — klasifikasi" },
        { title: "Penemuan obat", desc: "Mempercepat pencarian kandidat molekul.", tech: "Deep Learning" },
        { title: "Asisten klinis", desc: "Meringkas catatan pasien untuk dokter.", tech: "LLM" },
        { title: "Pemantauan pasien", desc: "Mendeteksi anomali dari sensor wearable.", tech: "ML — anomaly detection" },
      ],
    },
    en: {
      title: "AI in Healthcare",
      subtitle: "Assisting diagnosis and medical research.",
      intro:
        "AI supports medical professionals — not replaces them — by analyzing data at scale.",
      cases: [
        { title: "Medical image analysis", desc: "Help read X-rays, CT, and MRI.", tech: "Deep Learning — CNN" },
        { title: "Disease risk prediction", desc: "Assess risk from medical records.", tech: "Supervised — classification" },
        { title: "Drug discovery", desc: "Speed up finding candidate molecules.", tech: "Deep Learning" },
        { title: "Clinical assistant", desc: "Summarize patient notes for doctors.", tech: "LLM" },
        { title: "Patient monitoring", desc: "Detect anomalies from wearable sensors.", tech: "ML — anomaly detection" },
      ],
    },
  },

  education: {
    icon: "🎓",
    id: {
      title: "AI di Bidang Pendidikan",
      subtitle: "Pembelajaran yang lebih personal.",
      intro:
        "AI dapat menyesuaikan materi dengan kebutuhan tiap siswa dan meringankan tugas administratif pengajar.",
      cases: [
        { title: "Pembelajaran adaptif", desc: "Menyesuaikan tingkat soal dengan kemampuan siswa.", tech: "ML / Reinforcement Learning" },
        { title: "Penilaian otomatis", desc: "Menilai esai dan jawaban terbuka.", tech: "LLM" },
        { title: "Tutor virtual", desc: "Menjawab pertanyaan siswa kapan saja.", tech: "LLM" },
        { title: "Prediksi risiko putus sekolah", desc: "Mengidentifikasi siswa yang butuh bantuan.", tech: "Supervised — klasifikasi" },
        { title: "Pengelompokan gaya belajar", desc: "Mengelompokkan siswa dengan pola belajar mirip.", tech: "Unsupervised — clustering" },
      ],
    },
    en: {
      title: "AI in Education",
      subtitle: "More personalized learning.",
      intro:
        "AI can tailor material to each student's needs and ease teachers' administrative load.",
      cases: [
        { title: "Adaptive learning", desc: "Match question difficulty to student ability.", tech: "ML / Reinforcement Learning" },
        { title: "Automated grading", desc: "Grade essays and open answers.", tech: "LLM" },
        { title: "Virtual tutors", desc: "Answer student questions anytime.", tech: "LLM" },
        { title: "Dropout risk prediction", desc: "Identify students who need help.", tech: "Supervised — classification" },
        { title: "Learning-style grouping", desc: "Group students with similar learning patterns.", tech: "Unsupervised — clustering" },
      ],
    },
  },
};
