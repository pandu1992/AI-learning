// Question bank for the live (Kahoot-style) NLP review quiz.
// Bilingual. Each: { id/en: { q, options:[4] }, answer (0-based), explain:{id,en} }
// Mix of concept checks and short "mini-case" scenarios across the NLP demos.

export const liveQuizQuestions = [
  {
    answer: 1,
    id: { q: "Sebuah startup punya 150 kalimat berlabel untuk NER. Pendekatan terbaik?", options: ["Latih model besar dari nol", "Fine-tune model bahasa pra-latih (transfer learning)", "Pakai aturan regex saja", "Tunggu sampai punya 1 juta label"] },
    en: { q: "A startup has 150 labeled sentences for NER. Best approach?", options: ["Train a big model from scratch", "Fine-tune a pretrained language model (transfer learning)", "Use regex rules only", "Wait until it has 1M labels"] },
    explain: { id: "Dengan data sedikit, transfer learning jauh unggul karena model sudah 'paham bahasa'.", en: "With little data, transfer learning wins big since the model already 'knows language'." },
  },
  {
    answer: 2,
    id: { q: "Tokenisasi dalam NLP adalah proses…", options: ["Mengenkripsi teks", "Menghapus stopword", "Memecah teks jadi unit (token)", "Menerjemahkan bahasa"] },
    en: { q: "Tokenization in NLP is the process of…", options: ["Encrypting text", "Removing stopwords", "Splitting text into units (tokens)", "Translating languages"] },
    explain: { id: "Token adalah potongan teks (kata/subkata) yang diproses model.", en: "Tokens are the chunks of text (words/subwords) a model processes." },
  },
  {
    answer: 0,
    id: { q: "Word embedding membuat kata dengan makna mirip…", options: ["Berdekatan dalam ruang vektor", "Punya ejaan sama", "Selalu bersebelahan di kalimat", "Dihapus dari kosakata"] },
    en: { q: "Word embeddings place words with similar meaning…", options: ["Close together in vector space", "With the same spelling", "Always adjacent in a sentence", "Removed from the vocabulary"] },
    explain: { id: "Embedding menempatkan makna serupa berdekatan; arah/jarak menangkap relasi.", en: "Embeddings put similar meanings nearby; direction/distance captures relationships." },
  },
  {
    answer: 1,
    id: { q: "Pada kalimat 'ia' merujuk ke 'kucing', mekanisme Transformer yang menangkapnya adalah…", options: ["Konvolusi", "Self-attention", "Max-pooling", "Dropout"] },
    en: { q: "In a sentence where 'it' refers to 'the cat', the Transformer mechanism that captures this is…", options: ["Convolution", "Self-attention", "Max-pooling", "Dropout"] },
    explain: { id: "Self-attention menimbang kata mana memperhatikan kata lain → menangkap rujukan.", en: "Self-attention weighs which words attend to which → captures references." },
  },
  {
    answer: 3,
    id: { q: "Model NER menandai 'Jakarta' sebagai…", options: ["PERSON", "ORG", "DATE", "LOCATION"] },
    en: { q: "A NER model tags 'Jakarta' as…", options: ["PERSON", "ORG", "DATE", "LOCATION"] },
    explain: { id: "Jakarta adalah entitas lokasi (LOC/GPE).", en: "Jakarta is a location entity (LOC/GPE)." },
  },
  {
    answer: 0,
    id: { q: "Perbedaan utama CNN-teks vs RNN-teks?", options: ["CNN menilai banyak n-gram sekaligus; RNN berurutan", "CNN hanya untuk gambar", "RNN tidak punya parameter", "Keduanya identik"] },
    en: { q: "Key difference between text-CNN vs text-RNN?", options: ["CNN scores many n-grams in parallel; RNN is sequential", "CNN is only for images", "RNN has no parameters", "They are identical"] },
    explain: { id: "CNN menangkap frasa lokal paralel; RNN membawa memori secara berurutan.", en: "CNN captures local phrases in parallel; RNN carries memory sequentially." },
  },
  {
    answer: 2,
    id: { q: "Pada RNN, apa yang membawa 'memori' konteks sebelumnya?", options: ["Learning rate", "Kernel", "Hidden state", "Softmax"] },
    en: { q: "In an RNN, what carries the 'memory' of earlier context?", options: ["Learning rate", "Kernel", "The hidden state", "Softmax"] },
    explain: { id: "Hidden state hₜ diperbarui tiap langkah dan membawa konteks.", en: "The hidden state hₜ updates each step and carries context." },
  },
  {
    answer: 1,
    id: { q: "Anotasi teks mahal. Strategi memilih contoh paling informatif untuk dilabeli?", options: ["Pelabelan acak", "Active learning (paling tidak pasti)", "Melabeli semua", "Tidak melabeli apa pun"] },
    en: { q: "Text annotation is costly. Strategy to pick the most informative examples to label?", options: ["Random labeling", "Active learning (most uncertain)", "Label everything", "Label nothing"] },
    explain: { id: "Active learning memilih contoh paling membingungkan model → hemat label.", en: "Active learning picks the examples that confuse the model most → saves labels." },
  },
  {
    answer: 0,
    id: { q: "NLU bertugas…, sedangkan NLG bertugas…", options: ["memahami teks → makna; menghasilkan teks dari makna", "menghasilkan; memahami", "mengenkripsi; mendekripsi", "melatih; menguji"] },
    en: { q: "NLU does…, while NLG does…", options: ["understand text → meaning; generate text from meaning", "generate; understand", "encrypt; decrypt", "train; test"] },
    explain: { id: "NLU: bahasa→makna. NLG: makna→bahasa.", en: "NLU: language→meaning. NLG: meaning→language." },
  },
  {
    answer: 3,
    id: { q: "LLM seperti GPT pada dasarnya dilatih untuk…", options: ["Mengelompokkan gambar", "Menghitung reward", "Mengenkripsi teks", "Memprediksi token berikutnya"] },
    en: { q: "An LLM like GPT is fundamentally trained to…", options: ["Cluster images", "Compute rewards", "Encrypt text", "Predict the next token"] },
    explain: { id: "Tugas dasar LLM: memprediksi kata/token berikutnya dari konteks.", en: "An LLM's basic task: predict the next word/token from context." },
  },
  {
    answer: 1,
    id: { q: "Parameter 'temperature' tinggi pada generasi teks membuat output…", options: ["Selalu identik", "Lebih bervariasi/kreatif (berisiko ngawur)", "Tanpa probabilitas", "Lebih pendek"] },
    en: { q: "A high 'temperature' in text generation makes output…", options: ["Always identical", "More varied/creative (riskier)", "Have no probabilities", "Shorter"] },
    explain: { id: "Temperature tinggi meratakan distribusi → lebih banyak variasi.", en: "High temperature flattens the distribution → more variety." },
  },
  {
    answer: 2,
    id: { q: "Chatbot menjawab BERDASARKAN dokumen yang diambil (bukan mengarang). Teknik ini?", options: ["Overfitting", "Dropout", "RAG (Retrieval-Augmented Generation)", "Tokenisasi"] },
    en: { q: "A chatbot answers FROM retrieved documents (not made up). This technique is?", options: ["Overfitting", "Dropout", "RAG (Retrieval-Augmented Generation)", "Tokenization"] },
    explain: { id: "RAG mengambil potongan relevan lalu menjawab dari situ → kurangi halusinasi.", en: "RAG retrieves relevant chunks then answers from them → reduces hallucination." },
  },
  {
    answer: 0,
    id: { q: "Agen LLM memesan tiket. Sebelum aksi tak-terbalikkan (bayar), yang terbaik adalah…", options: ["Minta persetujuan manusia (human-in-the-loop)", "Langsung bayar tanpa cek", "Berhenti selamanya", "Mengacak pilihan"] },
    en: { q: "An LLM agent books a ticket. Before an irreversible action (pay), best to…", options: ["Ask for human approval (human-in-the-loop)", "Pay immediately without checks", "Stop forever", "Randomize the choice"] },
    explain: { id: "Aksi berisiko/tak-terbalikkan butuh persetujuan manusia.", en: "Risky/irreversible actions need human approval." },
  },
  {
    answer: 1,
    id: { q: "TF-IDF memberi bobot tinggi pada kata yang…", options: ["Muncul di semua dokumen", "Sering di satu dokumen tapi langka di koleksi", "Paling pendek", "Huruf kapital"] },
    en: { q: "TF-IDF gives high weight to a word that…", options: ["Appears in all documents", "Is frequent in one doc but rare across the collection", "Is shortest", "Is capitalized"] },
    explain: { id: "TF-IDF menonjolkan kata khas sebuah dokumen.", en: "TF-IDF highlights words distinctive to a document." },
  },
  {
    answer: 2,
    id: { q: "Model bias gender pada rekrutmen paling sering berakar dari…", options: ["GPU lambat", "Terlalu sedikit warna UI", "Data historis yang timpang", "Learning rate tinggi"] },
    en: { q: "Gender bias in a hiring model most often stems from…", options: ["A slow GPU", "Too few UI colors", "Skewed historical data", "A high learning rate"] },
    explain: { id: "Model meniru ketimpangan pada data latihnya.", en: "The model mirrors the imbalance in its training data." },
  },
];

export const LIVE_QUIZ_TOTAL = liveQuizQuestions.length;
