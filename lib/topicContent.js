// Detailed bilingual body content for each curriculum topic.
// Each section is a block the topic page renders. Video `id` fields are left
// empty so instructors can paste their own YouTube video IDs.

export const topicBodies = {
  "ai-overview": {
    icon: "🧠",
    id: {
      title: "Pengantar AI",
      subtitle: "Peta besar kecerdasan buatan dan sub-bidangnya.",
      sections: [
        {
          heading: "Apa itu Artificial Intelligence?",
          paragraphs: [
            "Artificial Intelligence (AI) adalah bidang ilmu komputer yang membuat mesin mampu melakukan tugas yang biasanya memerlukan kecerdasan manusia — seperti mengenali gambar, memahami bahasa, mengambil keputusan, dan belajar dari pengalaman.",
            "AI adalah payung besar. Di dalamnya ada Machine Learning (ML). Di dalam ML ada Deep Learning (DL). Reinforcement Learning (RL) adalah cara belajar tersendiri, dan Large Language Models (LLM) adalah aplikasi deep learning untuk bahasa.",
          ],
        },
        {
          heading: "Peta sub-bidang",
          list: [
            "Machine Learning — mesin belajar pola dari data.",
            "Deep Learning — ML dengan neural network berlapis banyak.",
            "Reinforcement Learning — agen belajar dari reward & hukuman.",
            "Large Language Models — model bahasa raksasa seperti GPT.",
          ],
        },
        {
          heading: "Mengapa penting sekarang?",
          paragraphs: [
            "Tiga hal bertemu: data yang melimpah, komputasi murah (GPU), dan algoritma yang matang. Kombinasi ini membuat AI melompat maju dalam satu dekade terakhir.",
          ],
        },
      ],
    },
    en: {
      title: "AI Overview",
      subtitle: "The big map of artificial intelligence and its subfields.",
      sections: [
        {
          heading: "What is Artificial Intelligence?",
          paragraphs: [
            "Artificial Intelligence (AI) is the branch of computer science that lets machines perform tasks that normally require human intelligence — recognizing images, understanding language, making decisions, and learning from experience.",
            "AI is a big umbrella. Inside it is Machine Learning (ML). Inside ML is Deep Learning (DL). Reinforcement Learning (RL) is its own way of learning, and Large Language Models (LLM) are a deep-learning application for language.",
          ],
        },
        {
          heading: "Map of subfields",
          list: [
            "Machine Learning — machines learn patterns from data.",
            "Deep Learning — ML using many-layered neural networks.",
            "Reinforcement Learning — agents learn from rewards & penalties.",
            "Large Language Models — giant language models like GPT.",
          ],
        },
        {
          heading: "Why now?",
          paragraphs: [
            "Three things came together: abundant data, cheap computation (GPUs), and mature algorithms. This combination made AI leap forward over the last decade.",
          ],
        },
      ],
    },
    videoId: "",
  },

  "machine-learning": {
    icon: "📈",
    id: {
      title: "Machine Learning",
      subtitle: "Bagaimana mesin belajar pola dari data.",
      sections: [
        {
          heading: "Ide inti",
          paragraphs: [
            "Alih-alih menulis aturan satu per satu, kita memberi mesin banyak contoh (data) dan membiarkannya menemukan pola sendiri. Pola inilah yang disebut model.",
          ],
        },
        {
          heading: "Supervised Learning (belajar dengan label)",
          paragraphs: [
            "Data punya jawaban/label. Model belajar memetakan input ke output. Cocok untuk klasifikasi (kategori) dan regresi (angka).",
          ],
          list: [
            "k-Nearest Neighbors (k-NN) — klasifikasi berdasarkan tetangga terdekat.",
            "Linear/Logistic Regression — menarik garis pemisah atau prediksi angka.",
            "Decision Tree & Random Forest — serangkaian pertanyaan ya/tidak.",
            "Contoh kasus: deteksi email spam, prediksi harga rumah.",
          ],
        },
        {
          heading: "Unsupervised Learning (tanpa label)",
          paragraphs: [
            "Data tidak punya label. Model mencari struktur tersembunyi, misalnya mengelompokkan data yang mirip.",
          ],
          list: [
            "k-Means Clustering — mengelompokkan data ke k kelompok.",
            "PCA — menyederhanakan dimensi data.",
            "Contoh kasus: segmentasi pelanggan, deteksi anomali.",
          ],
        },
        {
          heading: "Coba langsung",
          paragraphs: [
            "Lihat halaman Demo untuk mencoba k-NN (supervised) dan k-means (unsupervised) secara interaktif.",
          ],
        },
      ],
    },
    en: {
      title: "Machine Learning",
      subtitle: "How machines learn patterns from data.",
      sections: [
        {
          heading: "Core idea",
          paragraphs: [
            "Instead of writing rules one by one, we give the machine many examples (data) and let it discover the patterns itself. That pattern is called a model.",
          ],
        },
        {
          heading: "Supervised Learning (learning with labels)",
          paragraphs: [
            "The data has answers/labels. The model learns to map inputs to outputs. Great for classification (categories) and regression (numbers).",
          ],
          list: [
            "k-Nearest Neighbors (k-NN) — classify by nearest neighbors.",
            "Linear/Logistic Regression — draw a separating line or predict numbers.",
            "Decision Tree & Random Forest — a series of yes/no questions.",
            "Case examples: spam email detection, house price prediction.",
          ],
        },
        {
          heading: "Unsupervised Learning (no labels)",
          paragraphs: [
            "The data has no labels. The model finds hidden structure, e.g. grouping similar data.",
          ],
          list: [
            "k-Means Clustering — group data into k clusters.",
            "PCA — simplify data dimensions.",
            "Case examples: customer segmentation, anomaly detection.",
          ],
        },
        {
          heading: "Try it yourself",
          paragraphs: [
            "Visit the Demos page to try k-NN (supervised) and k-means (unsupervised) interactively.",
          ],
        },
      ],
    },
    videoId: "",
  },

  "deep-learning": {
    icon: "🕸️",
    id: {
      title: "Deep Learning",
      subtitle: "Neural network berlapis banyak.",
      sections: [
        {
          heading: "Dari neuron ke jaringan",
          paragraphs: [
            "Deep learning meniru cara kerja otak secara longgar: unit kecil (neuron) yang saling terhubung dalam lapisan. Setiap lapisan mempelajari fitur yang makin abstrak — dari garis, ke bentuk, ke objek.",
          ],
        },
        {
          heading: "Arsitektur populer",
          list: [
            "CNN (Convolutional Neural Network) — juara untuk gambar.",
            "RNN/LSTM — untuk data berurutan seperti teks & waktu.",
            "Transformer — dasar dari LLM modern.",
          ],
        },
        {
          heading: "Bagaimana ia belajar?",
          paragraphs: [
            "Melalui backpropagation dan gradient descent: model menebak, mengukur kesalahan (loss), lalu menyesuaikan bobot sedikit demi sedikit sampai kesalahan mengecil.",
          ],
        },
      ],
    },
    en: {
      title: "Deep Learning",
      subtitle: "Many-layered neural networks.",
      sections: [
        {
          heading: "From neuron to network",
          paragraphs: [
            "Deep learning loosely mimics the brain: small units (neurons) connected in layers. Each layer learns increasingly abstract features — from edges, to shapes, to objects.",
          ],
        },
        {
          heading: "Popular architectures",
          list: [
            "CNN (Convolutional Neural Network) — champion for images.",
            "RNN/LSTM — for sequential data like text & time series.",
            "Transformer — the foundation of modern LLMs.",
          ],
        },
        {
          heading: "How does it learn?",
          paragraphs: [
            "Through backpropagation and gradient descent: the model guesses, measures its error (loss), then nudges its weights bit by bit until the error shrinks.",
          ],
        },
      ],
    },
    videoId: "",
  },

  "reinforcement-learning": {
    icon: "🎮",
    id: {
      title: "Reinforcement Learning",
      subtitle: "Belajar dari coba-coba melalui reward.",
      sections: [
        {
          heading: "Analogi melatih hewan peliharaan",
          paragraphs: [
            "Sebuah agen berada dalam sebuah lingkungan. Ia mengambil aksi, menerima reward (hadiah) atau penalti, lalu belajar strategi (policy) yang memaksimalkan reward jangka panjang.",
          ],
        },
        {
          heading: "Istilah kunci",
          list: [
            "State — kondisi saat ini.",
            "Action — aksi yang bisa diambil.",
            "Reward — umpan balik dari lingkungan.",
            "Policy — strategi memilih aksi.",
          ],
        },
        {
          heading: "Contoh nyata",
          list: [
            "Game (AlphaGo, Atari).",
            "Robotika — belajar berjalan.",
            "Optimasi rute & manajemen energi.",
          ],
        },
      ],
    },
    en: {
      title: "Reinforcement Learning",
      subtitle: "Learning by trial and error through rewards.",
      sections: [
        {
          heading: "The pet-training analogy",
          paragraphs: [
            "An agent lives in an environment. It takes actions, receives rewards or penalties, then learns a strategy (policy) that maximizes long-term reward.",
          ],
        },
        {
          heading: "Key terms",
          list: [
            "State — the current situation.",
            "Action — what the agent can do.",
            "Reward — feedback from the environment.",
            "Policy — the strategy for choosing actions.",
          ],
        },
        {
          heading: "Real examples",
          list: ["Games (AlphaGo, Atari).", "Robotics — learning to walk.", "Route optimization & energy management."],
        },
      ],
    },
    videoId: "",
  },

  llm: {
    icon: "💬",
    id: {
      title: "Large Language Models",
      subtitle: "Model bahasa raksasa seperti GPT.",
      sections: [
        {
          heading: "Apa itu LLM?",
          paragraphs: [
            "LLM adalah neural network berbasis Transformer yang dilatih pada teks dalam jumlah sangat besar. Tugas dasarnya sederhana: memprediksi kata (token) berikutnya. Dari tugas sederhana ini muncul kemampuan menjawab, meringkas, menerjemahkan, dan menulis kode.",
          ],
        },
        {
          heading: "Konsep penting",
          list: [
            "Token — potongan kata yang diproses model.",
            "Attention — mekanisme yang menimbang kata mana yang penting.",
            "Pre-training lalu fine-tuning — belajar umum dulu, lalu diarahkan.",
            "Prompt — instruksi yang kita berikan ke model.",
          ],
        },
        {
          heading: "Batasan",
          paragraphs: [
            "LLM bisa 'berhalusinasi' (mengarang fakta), sensitif pada cara bertanya, dan hanya tahu hingga batas data pelatihannya. Selalu verifikasi output penting.",
          ],
        },
      ],
    },
    en: {
      title: "Large Language Models",
      subtitle: "Giant language models like GPT.",
      sections: [
        {
          heading: "What is an LLM?",
          paragraphs: [
            "An LLM is a Transformer-based neural network trained on enormous amounts of text. Its basic task is simple: predict the next word (token). From this simple task emerges the ability to answer, summarize, translate, and write code.",
          ],
        },
        {
          heading: "Important concepts",
          list: [
            "Token — the chunks of words the model processes.",
            "Attention — the mechanism that weighs which words matter.",
            "Pre-training then fine-tuning — learn broadly first, then steer.",
            "Prompt — the instruction we give the model.",
          ],
        },
        {
          heading: "Limitations",
          paragraphs: [
            "LLMs can 'hallucinate' (make up facts), are sensitive to phrasing, and only know up to their training cutoff. Always verify important outputs.",
          ],
        },
      ],
    },
    videoId: "",
  },
};
