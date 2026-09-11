// Central content model for the platform.
// Bilingual (id = Bahasa Indonesia default, en = English).

export const site = {
  id: {
    name: "AI Belajar",
    tagline: "Platform pembelajaran interaktif untuk mengenal Artificial Intelligence",
    intro:
      "Jelajahi dunia AI mulai dari Machine Learning, Deep Learning, Reinforcement Learning, hingga Large Language Models — lengkap dengan ilustrasi, demo interaktif, video, dan studi kasus nyata di berbagai bidang.",
  },
  en: {
    name: "AI Belajar",
    tagline: "An interactive learning platform to explore Artificial Intelligence",
    intro:
      "Explore AI from Machine Learning, Deep Learning, Reinforcement Learning, to Large Language Models — with illustrations, interactive demos, videos, and real-world case studies across many fields.",
  },
};

// Curriculum topics shown on the homepage and in navigation.
export const topics = [
  {
    slug: "ai-overview",
    icon: "🧠",
    id: {
      title: "Pengantar AI",
      summary: "Apa itu kecerdasan buatan, sejarah singkat, dan peta besar sub-bidangnya.",
    },
    en: {
      title: "AI Overview",
      summary: "What artificial intelligence is, a short history, and the map of its subfields.",
    },
  },
  {
    slug: "machine-learning",
    icon: "📈",
    id: {
      title: "Machine Learning",
      summary: "Bagaimana mesin belajar dari data — supervised & unsupervised learning.",
    },
    en: {
      title: "Machine Learning",
      summary: "How machines learn from data — supervised & unsupervised learning.",
    },
  },
  {
    slug: "deep-learning",
    icon: "🕸️",
    id: {
      title: "Deep Learning",
      summary: "Neural network berlapis: CNN untuk gambar, RNN/Transformer untuk urutan.",
    },
    en: {
      title: "Deep Learning",
      summary: "Layered neural networks: CNNs for images, RNN/Transformers for sequences.",
    },
  },
  {
    slug: "reinforcement-learning",
    icon: "🎮",
    id: {
      title: "Reinforcement Learning",
      summary: "Agen belajar dari coba-coba melalui reward — seperti melatih hewan peliharaan.",
    },
    en: {
      title: "Reinforcement Learning",
      summary: "Agents learn by trial and error through rewards — like training a pet.",
    },
  },
  {
    slug: "llm",
    icon: "💬",
    id: {
      title: "Large Language Models",
      summary: "Model bahasa raksasa seperti GPT: cara kerja token, atensi, dan transformer.",
    },
    en: {
      title: "Large Language Models",
      summary: "Giant language models like GPT: tokens, attention, and transformers.",
    },
  },
];

// NOTE: The interactive demo list now lives in lib/demos.js (grouped per topic).

// Case studies per field.
export const fields = [
  {
    slug: "business",
    icon: "💼",
    id: { title: "Bisnis", summary: "AI di dunia bisnis dan industri." },
    en: { title: "Business", summary: "AI in business and industry." },
  },
  {
    slug: "agriculture",
    icon: "🌾",
    id: { title: "Pertanian", summary: "AI untuk pertanian cerdas." },
    en: { title: "Agriculture", summary: "AI for smart farming." },
  },
  {
    slug: "health",
    icon: "🩺",
    id: { title: "Kesehatan", summary: "AI dalam dunia medis." },
    en: { title: "Health", summary: "AI in healthcare." },
  },
  {
    slug: "education",
    icon: "🎓",
    id: { title: "Pendidikan", summary: "AI untuk pembelajaran." },
    en: { title: "Education", summary: "AI for learning." },
  },
];
