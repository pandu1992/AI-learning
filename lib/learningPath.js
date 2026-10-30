// Recommended learning path (roadmap), bilingual (id/en). An ordered sequence of
// stages; each stage lists what to study and links (topics, data-foundations,
// demos). `steps` entries reference existing routes so the page stays in sync.
// Shape:
//   { id, icon, id:{title,goal}, en:{title,goal},
//     steps: [{ href, id:{label}, en:{label}, kind }] }
// `kind` is used only for a small tag: "topic" | "foundations" | "demo" | "quiz".

export const learningPath = [
  {
    id: "foundations",
    icon: "🧱",
    idL: { title: "1. Fondasi Data", goal: "Pahami data, fitur, pembagian data, dan jebakan seperti overfitting sebelum menyentuh model." },
    enL: { title: "1. Data Foundations", goal: "Understand data, features, splitting, and traps like overfitting before touching models." },
    steps: [
      { href: "/topics/ai-overview", kind: "topic", idL: { label: "Pengantar AI" }, enL: { label: "AI Overview" } },
      { href: "/topics/ai-overview/data-foundations", kind: "foundations", idL: { label: "Fondasi Data (10 bagian)" }, enL: { label: "Data Foundations (10 sections)" } },
      { href: "/demos/dimensions", kind: "demo", idL: { label: "Demo: Dimensi Data" }, enL: { label: "Demo: Data Dimensions" } },
    ],
  },
  {
    id: "supervised",
    icon: "🎯",
    idL: { title: "2. Supervised Learning", goal: "Belajar dari data berlabel: klasifikasi & regresi, serta cara mengukur performanya." },
    enL: { title: "2. Supervised Learning", goal: "Learn from labeled data: classification & regression, and how to measure performance." },
    steps: [
      { href: "/topics/machine-learning", kind: "topic", idL: { label: "Topik Machine Learning" }, enL: { label: "Machine Learning topic" } },
      { href: "/demos/supervised-knn", kind: "demo", idL: { label: "Demo: k-NN" }, enL: { label: "Demo: k-NN" } },
      { href: "/demos/regression", kind: "demo", idL: { label: "Demo: Regresi" }, enL: { label: "Demo: Regression" } },
      { href: "/demos/decision-tree", kind: "demo", idL: { label: "Demo: Decision Tree" }, enL: { label: "Demo: Decision Tree" } },
      { href: "/demos/random-forest", kind: "demo", idL: { label: "Demo: Random Forest" }, enL: { label: "Demo: Random Forest" } },
      { href: "/demos/roc-threshold", kind: "demo", idL: { label: "Demo: Ambang ROC & Evaluasi" }, enL: { label: "Demo: ROC Threshold & Evaluation" } },
    ],
  },
  {
    id: "unsupervised",
    icon: "🔗",
    idL: { title: "3. Unsupervised & Reduksi Dimensi", goal: "Temukan pola tanpa label (clustering) dan padatkan fitur (PCA, t-SNE)." },
    enL: { title: "3. Unsupervised & Dimensionality Reduction", goal: "Find patterns without labels (clustering) and compress features (PCA, t-SNE)." },
    steps: [
      { href: "/demos/unsupervised-kmeans", kind: "demo", idL: { label: "Demo: k-means" }, enL: { label: "Demo: k-means" } },
      { href: "/demos/dbscan", kind: "demo", idL: { label: "Demo: DBSCAN" }, enL: { label: "Demo: DBSCAN" } },
      { href: "/demos/pca", kind: "demo", idL: { label: "Demo: PCA" }, enL: { label: "Demo: PCA" } },
      { href: "/demos/tsne", kind: "demo", idL: { label: "Demo: t-SNE" }, enL: { label: "Demo: t-SNE" } },
    ],
  },
  {
    id: "deeplearning",
    icon: "🕸️",
    idL: { title: "4. Deep Learning", goal: "Neuron, aktivasi, gradient descent, dan CNN untuk citra." },
    enL: { title: "4. Deep Learning", goal: "Neurons, activations, gradient descent, and CNNs for images." },
    steps: [
      { href: "/topics/deep-learning", kind: "topic", idL: { label: "Topik Deep Learning" }, enL: { label: "Deep Learning topic" } },
      { href: "/demos/neural-network", kind: "demo", idL: { label: "Demo: Jaringan Saraf" }, enL: { label: "Demo: Neural Network" } },
      { href: "/demos/activation-functions", kind: "demo", idL: { label: "Demo: Fungsi Aktivasi" }, enL: { label: "Demo: Activation Functions" } },
      { href: "/demos/gradient-descent", kind: "demo", idL: { label: "Demo: Gradient Descent" }, enL: { label: "Demo: Gradient Descent" } },
      { href: "/demos/cnn-filters", kind: "demo", idL: { label: "Demo: Filter CNN" }, enL: { label: "Demo: CNN Filters" } },
    ],
  },
  {
    id: "nlp",
    icon: "💬",
    idL: { title: "5. NLP & Large Language Models", goal: "Dari tokenisasi & embedding hingga attention, LLM, dan RAG." },
    enL: { title: "5. NLP & Large Language Models", goal: "From tokenization & embeddings to attention, LLMs, and RAG." },
    steps: [
      { href: "/topics/llm", kind: "topic", idL: { label: "Topik Large Language Models" }, enL: { label: "Large Language Models topic" } },
      { href: "/demos/tokenization", kind: "demo", idL: { label: "Demo: Tokenisasi" }, enL: { label: "Demo: Tokenization" } },
      { href: "/demos/word-embeddings", kind: "demo", idL: { label: "Demo: Word Embeddings" }, enL: { label: "Demo: Word Embeddings" } },
      { href: "/demos/attention", kind: "demo", idL: { label: "Demo: Attention" }, enL: { label: "Demo: Attention" } },
      { href: "/demos/next-token", kind: "demo", idL: { label: "Demo: Prediksi Token Berikut" }, enL: { label: "Demo: Next-Token Prediction" } },
      { href: "/demos/rag-chatbot", kind: "demo", idL: { label: "Demo: Chatbot RAG" }, enL: { label: "Demo: RAG Chatbot" } },
    ],
  },
  {
    id: "rl",
    icon: "🎮",
    idL: { title: "6. Reinforcement Learning", goal: "Agen, reward, kebijakan, dan dilema eksplorasi vs eksploitasi." },
    enL: { title: "6. Reinforcement Learning", goal: "Agents, rewards, policies, and the explore-vs-exploit dilemma." },
    steps: [
      { href: "/topics/reinforcement-learning", kind: "topic", idL: { label: "Topik Reinforcement Learning" }, enL: { label: "Reinforcement Learning topic" } },
      { href: "/demos/rl-gridworld", kind: "demo", idL: { label: "Demo: Gridworld" }, enL: { label: "Demo: Gridworld" } },
      { href: "/demos/explore-exploit", kind: "demo", idL: { label: "Demo: Eksplorasi vs Eksploitasi" }, enL: { label: "Demo: Explore vs Exploit" } },
      { href: "/demos/qlearning-train", kind: "demo", idL: { label: "Demo: Pelatihan Q-Learning" }, enL: { label: "Demo: Q-Learning Training" } },
    ],
  },
  {
    id: "ethics",
    icon: "⚖️",
    idL: { title: "7. Etika AI & Sertifikasi", goal: "Pahami dampak & tanggung jawab AI, lalu uji pemahaman lewat sertifikasi." },
    enL: { title: "7. AI Ethics & Certification", goal: "Understand AI's impact & responsibility, then test your knowledge via certification." },
    steps: [
      { href: "/topics/ai-ethics", kind: "topic", idL: { label: "Topik Etika AI" }, enL: { label: "AI Ethics topic" } },
      { href: "/certification", kind: "quiz", idL: { label: "Uji & dapatkan Sertifikat" }, enL: { label: "Take the Certification" } },
    ],
  },
];
