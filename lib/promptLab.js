// Canned, rule-based "LLM responses" for the Prompt Engineering Playground.
// No external API — each example task has pre-written outputs that illustrate how
// different prompting techniques (zero-shot, few-shot, chain-of-thought, role)
// change the QUALITY/shape of the answer. The point is pedagogical: show the
// technique's effect, not to run a real model. Bilingual (id/en).

export const TECHNIQUES = {
  id: [
    { key: "zero", name: "Zero-shot", desc: "Langsung bertanya tanpa contoh." },
    { key: "few", name: "Few-shot", desc: "Beri beberapa contoh dulu sebagai pola." },
    { key: "cot", name: "Chain-of-Thought", desc: "Minta model berpikir langkah demi langkah." },
    { key: "role", name: "Role prompting", desc: "Beri peran/persona agar jawaban sesuai konteks." },
  ],
  en: [
    { key: "zero", name: "Zero-shot", desc: "Ask directly with no examples." },
    { key: "few", name: "Few-shot", desc: "Give a few examples first as a pattern." },
    { key: "cot", name: "Chain-of-Thought", desc: "Ask the model to reason step by step." },
    { key: "role", name: "Role prompting", desc: "Give a persona so the answer fits context." },
  ],
};

export const TASKS = {
  id: [
    { key: "math", label: "Soal cerita matematika", question: "Sebuah toko menjual 3 pensil seharga Rp6.000. Berapa harga 7 pensil?" },
    { key: "sentiment", label: "Analisis sentimen", question: "Tentukan sentimen: 'Pelayanannya lambat, tapi makanannya enak sekali.'" },
    { key: "summary", label: "Ringkas teks", question: "Ringkas: 'AI generatif membuat teks, gambar, dan kode baru dari pola data latih.'" },
  ],
  en: [
    { key: "math", label: "Math word problem", question: "A shop sells 3 pencils for $6. How much for 7 pencils?" },
    { key: "sentiment", label: "Sentiment analysis", question: "Classify sentiment: 'Service was slow, but the food was delicious.'" },
    { key: "summary", label: "Summarize text", question: "Summarize: 'Generative AI creates new text, images, and code from patterns in training data.'" },
  ],
};

// prompt[taskKey][techKey] -> { prompt, response, quality: 1..3, note }
export const SAMPLES = {
  id: {
    math: {
      zero: { prompt: "Berapa harga 7 pensil?", response: "Rp14.000.", quality: 2, note: "Jawaban langsung, tapi tanpa penjelasan — bisa salah tanpa ketahuan." },
      few: { prompt: "2 pensil = Rp4.000. 5 pensil = Rp10.000. 7 pensil = ?", response: "Rp14.000.", quality: 2, note: "Contoh membantu pola, tapi tetap tanpa langkah." },
      cot: { prompt: "Pikirkan langkah demi langkah, lalu jawab.", response: "Harga 1 pensil = Rp6.000 ÷ 3 = Rp2.000. Maka 7 × Rp2.000 = Rp14.000.", quality: 3, note: "Langkah eksplisit → jawaban lebih dapat diperiksa & andal." },
      role: { prompt: "Kamu guru matematika SD. Jelaskan ke murid.", response: "Pertama cari harga satu pensil: 6.000 ÷ 3 = 2.000. Lalu kalikan 7: 7 × 2.000 = 14.000. Jadi Rp14.000, ya!", quality: 3, note: "Persona membuat gaya penjelasan sesuai audiens." },
    },
    sentiment: {
      zero: { prompt: "Sentimennya apa?", response: "Campuran/Netral.", quality: 2, note: "Benar tapi kasar; tak menjelaskan aspek." },
      few: { prompt: "'Enak' → positif. 'Lambat' → negatif. Kalimat ini → ?", response: "Campuran: positif untuk makanan, negatif untuk layanan.", quality: 3, note: "Contoh mengajari model membedah per-aspek." },
      cot: { prompt: "Analisis tiap bagian lalu simpulkan.", response: "'Pelayanan lambat' = negatif; 'makanan enak' = positif → sentimen campuran (aspek-based).", quality: 3, note: "Penalaran mengungkap sentimen per-aspek." },
      role: { prompt: "Kamu analis ulasan restoran.", response: "Sentimen campuran. Layanan: negatif. Makanan: sangat positif. Saran: perbaiki kecepatan layanan.", quality: 3, note: "Persona menambah sudut pandang yang berguna." },
    },
    summary: {
      zero: { prompt: "Ringkas.", response: "AI generatif membuat konten baru dari data.", quality: 2, note: "Ringkas, cukup untuk kasus sederhana." },
      few: { prompt: "Contoh ringkasan 1 kalimat diberikan…", response: "AI generatif menghasilkan teks/gambar/kode baru dari pola data latih.", quality: 3, note: "Contoh menyeragamkan format output." },
      cot: { prompt: "Identifikasi ide utama, lalu ringkas.", response: "Ide utama: menciptakan konten baru. Ringkasan: AI generatif membuat teks, gambar, & kode dari pola data.", quality: 3, note: "Langkah membantu menjaga info kunci." },
      role: { prompt: "Kamu editor berita.", response: "AI generatif: teknologi yang menghasilkan teks, gambar, dan kode orisinal dari pola data pelatihan.", quality: 3, note: "Persona editor → ringkasan rapi & siap terbit." },
    },
  },
  en: {
    math: {
      zero: { prompt: "How much for 7 pencils?", response: "$14.", quality: 2, note: "Direct answer, but no reasoning — could be wrong undetected." },
      few: { prompt: "2 pencils = $4. 5 pencils = $10. 7 pencils = ?", response: "$14.", quality: 2, note: "Examples give a pattern, but still no steps." },
      cot: { prompt: "Think step by step, then answer.", response: "One pencil = $6 ÷ 3 = $2. So 7 × $2 = $14.", quality: 3, note: "Explicit steps → more checkable & reliable answer." },
      role: { prompt: "You are an elementary math teacher. Explain to a pupil.", response: "First find one pencil's price: 6 ÷ 3 = 2. Then multiply by 7: 7 × 2 = 14. So it's $14!", quality: 3, note: "The persona tailors the explanation to the audience." },
    },
    sentiment: {
      zero: { prompt: "What's the sentiment?", response: "Mixed/Neutral.", quality: 2, note: "Correct but coarse; no aspect breakdown." },
      few: { prompt: "'Delicious' → positive. 'Slow' → negative. This sentence → ?", response: "Mixed: positive on food, negative on service.", quality: 3, note: "Examples teach the model to break down by aspect." },
      cot: { prompt: "Analyze each part then conclude.", response: "'Service was slow' = negative; 'food delicious' = positive → mixed (aspect-based) sentiment.", quality: 3, note: "Reasoning surfaces aspect-level sentiment." },
      role: { prompt: "You are a restaurant-review analyst.", response: "Mixed sentiment. Service: negative. Food: very positive. Tip: improve service speed.", quality: 3, note: "The persona adds a useful point of view." },
    },
    summary: {
      zero: { prompt: "Summarize.", response: "Generative AI makes new content from data.", quality: 2, note: "Concise, fine for simple cases." },
      few: { prompt: "A one-sentence summary example is given…", response: "Generative AI produces new text/images/code from training-data patterns.", quality: 3, note: "Examples standardize the output format." },
      cot: { prompt: "Identify the main idea, then summarize.", response: "Main idea: creating new content. Summary: generative AI makes text, images & code from data patterns.", quality: 3, note: "Steps help preserve the key information." },
      role: { prompt: "You are a news editor.", response: "Generative AI: technology that produces original text, images, and code from training-data patterns.", quality: 3, note: "Editor persona → a clean, publish-ready summary." },
    },
  },
};
