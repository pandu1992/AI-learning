// Math behind each algorithm, keyed by demo slug. Bilingual (id/en).
// Shape per language:
//   {
//     formulas: [{ tex: "LaTeX string", caption: "what it is" }],
//     symbols:  [{ sym: "LaTeX symbol", meaning: "plain text" }],
//     intuition: "one-line intuition",
//   }
// LaTeX note: escape backslashes for JS strings (e.g. "\\sum").

export const demoMath = {
  // ==================== MACHINE LEARNING ====================
  "supervised-knn": {
    id: {
      formulas: [
        { tex: "d(x, y) = \\sqrt{\\sum_{i=1}^{n} (x_i - y_i)^2}", caption: "Jarak Euclidean antara dua titik." },
        { tex: "\\hat{y} = \\operatorname*{mode}\\{\\, y_j : j \\in N_k(x) \\,\\}", caption: "Prediksi = kelas terbanyak di antara k tetangga terdekat." },
      ],
      symbols: [
        { sym: "x, y", meaning: "dua titik data (vektor fitur)" },
        { sym: "n", meaning: "jumlah fitur (dimensi)" },
        { sym: "k", meaning: "banyaknya tetangga yang dipertimbangkan" },
        { sym: "N_k(x)", meaning: "himpunan k tetangga terdekat dari x" },
      ],
      intuition: "Ukur jarak ke semua titik, ambil k terdekat, lalu ikuti suara terbanyak.",
    },
    en: {
      formulas: [
        { tex: "d(x, y) = \\sqrt{\\sum_{i=1}^{n} (x_i - y_i)^2}", caption: "Euclidean distance between two points." },
        { tex: "\\hat{y} = \\operatorname*{mode}\\{\\, y_j : j \\in N_k(x) \\,\\}", caption: "Prediction = majority class among the k nearest neighbors." },
      ],
      symbols: [
        { sym: "x, y", meaning: "two data points (feature vectors)" },
        { sym: "n", meaning: "number of features (dimensions)" },
        { sym: "k", meaning: "number of neighbors considered" },
        { sym: "N_k(x)", meaning: "set of the k nearest neighbors of x" },
      ],
      intuition: "Measure distance to all points, take the k closest, then follow the majority vote.",
    },
  },

  "unsupervised-kmeans": {
    id: {
      formulas: [
        { tex: "J = \\sum_{i=1}^{k} \\sum_{x \\in C_i} \\lVert x - \\mu_i \\rVert^2", caption: "Fungsi objektif: total jarak kuadrat ke centroid (diminimalkan)." },
        { tex: "\\mu_i = \\frac{1}{|C_i|} \\sum_{x \\in C_i} x", caption: "Centroid = rata-rata semua titik di cluster." },
      ],
      symbols: [
        { sym: "k", meaning: "jumlah cluster" },
        { sym: "C_i", meaning: "cluster ke-i" },
        { sym: "\\mu_i", meaning: "centroid (pusat) cluster ke-i" },
        { sym: "\\lVert \\cdot \\rVert", meaning: "panjang (norma) vektor" },
      ],
      intuition: "Ulangi: tiap titik ikut centroid terdekat, lalu centroid pindah ke rata-rata anggotanya.",
    },
    en: {
      formulas: [
        { tex: "J = \\sum_{i=1}^{k} \\sum_{x \\in C_i} \\lVert x - \\mu_i \\rVert^2", caption: "Objective: total squared distance to centroids (minimized)." },
        { tex: "\\mu_i = \\frac{1}{|C_i|} \\sum_{x \\in C_i} x", caption: "Centroid = mean of all points in the cluster." },
      ],
      symbols: [
        { sym: "k", meaning: "number of clusters" },
        { sym: "C_i", meaning: "the i-th cluster" },
        { sym: "\\mu_i", meaning: "centroid (center) of cluster i" },
        { sym: "\\lVert \\cdot \\rVert", meaning: "vector length (norm)" },
      ],
      intuition: "Repeat: each point joins its nearest centroid, then centroids move to their members' mean.",
    },
  },

  regression: {
    id: {
      formulas: [
        { tex: "\\hat{y} = m x + b", caption: "Regresi linear: garis lurus." },
        { tex: "\\text{MSE} = \\frac{1}{n} \\sum_{i=1}^{n} (\\hat{y}_i - y_i)^2", caption: "Mean Squared Error — yang diminimalkan." },
        { tex: "\\sigma(z) = \\frac{1}{1 + e^{-z}}", caption: "Regresi logistik: fungsi sigmoid untuk probabilitas." },
      ],
      symbols: [
        { sym: "m", meaning: "kemiringan (slope)" },
        { sym: "b", meaning: "perpotongan (intercept)" },
        { sym: "\\hat{y}", meaning: "nilai prediksi" },
        { sym: "z", meaning: "input linear (mis. m x + b)" },
      ],
      intuition: "Cari garis yang membuat rata-rata selisih kuadrat sekecil mungkin.",
    },
    en: {
      formulas: [
        { tex: "\\hat{y} = m x + b", caption: "Linear regression: a straight line." },
        { tex: "\\text{MSE} = \\frac{1}{n} \\sum_{i=1}^{n} (\\hat{y}_i - y_i)^2", caption: "Mean Squared Error — what we minimize." },
        { tex: "\\sigma(z) = \\frac{1}{1 + e^{-z}}", caption: "Logistic regression: sigmoid for probability." },
      ],
      symbols: [
        { sym: "m", meaning: "slope" },
        { sym: "b", meaning: "intercept" },
        { sym: "\\hat{y}", meaning: "predicted value" },
        { sym: "z", meaning: "linear input (e.g. m x + b)" },
      ],
      intuition: "Find the line that makes the average squared error as small as possible.",
    },
  },

  "decision-tree": {
    id: {
      formulas: [
        { tex: "G = 1 - \\sum_{c=1}^{C} p_c^2", caption: "Impuritas Gini pada sebuah node." },
        { tex: "G_{\\text{split}} = \\frac{n_L}{n} G_L + \\frac{n_R}{n} G_R", caption: "Gini berbobot setelah pemisahan (dipilih yang terkecil)." },
      ],
      symbols: [
        { sym: "p_c", meaning: "proporsi kelas c dalam node" },
        { sym: "C", meaning: "jumlah kelas" },
        { sym: "n_L, n_R", meaning: "jumlah data di cabang kiri/kanan" },
        { sym: "G_L, G_R", meaning: "Gini cabang kiri/kanan" },
      ],
      intuition: "Pilih pemisahan yang membuat tiap cabang semurni mungkin (Gini terkecil).",
    },
    en: {
      formulas: [
        { tex: "G = 1 - \\sum_{c=1}^{C} p_c^2", caption: "Gini impurity at a node." },
        { tex: "G_{\\text{split}} = \\frac{n_L}{n} G_L + \\frac{n_R}{n} G_R", caption: "Weighted Gini after a split (pick the smallest)." },
      ],
      symbols: [
        { sym: "p_c", meaning: "proportion of class c in the node" },
        { sym: "C", meaning: "number of classes" },
        { sym: "n_L, n_R", meaning: "count in the left/right branch" },
        { sym: "G_L, G_R", meaning: "Gini of the left/right branch" },
      ],
      intuition: "Choose the split that makes each branch as pure as possible (lowest Gini).",
    },
  },

  "naive-bayes": {
    id: {
      formulas: [
        { tex: "P(c \\mid x) = \\frac{P(c)\\, P(x \\mid c)}{P(x)}", caption: "Teorema Bayes." },
        { tex: "\\hat{c} = \\arg\\max_{c}\\; P(c) \\prod_{i=1}^{n} P(x_i \\mid c)", caption: "Prediksi: asumsi fitur independen (naif)." },
      ],
      symbols: [
        { sym: "P(c)", meaning: "peluang awal (prior) kelas c" },
        { sym: "P(x_i \\mid c)", meaning: "peluang fitur i jika kelas c" },
        { sym: "\\hat{c}", meaning: "kelas dengan probabilitas tertinggi" },
        { sym: "\\prod", meaning: "perkalian semua fitur" },
      ],
      intuition: "Gabungkan bukti tiap fitur dengan aturan Bayes, pilih kelas paling mungkin.",
    },
    en: {
      formulas: [
        { tex: "P(c \\mid x) = \\frac{P(c)\\, P(x \\mid c)}{P(x)}", caption: "Bayes' theorem." },
        { tex: "\\hat{c} = \\arg\\max_{c}\\; P(c) \\prod_{i=1}^{n} P(x_i \\mid c)", caption: "Prediction: assumes features are independent (naive)." },
      ],
      symbols: [
        { sym: "P(c)", meaning: "prior probability of class c" },
        { sym: "P(x_i \\mid c)", meaning: "likelihood of feature i given class c" },
        { sym: "\\hat{c}", meaning: "class with the highest probability" },
        { sym: "\\prod", meaning: "product over all features" },
      ],
      intuition: "Combine each feature's evidence via Bayes' rule, then pick the most likely class.",
    },
  },

  // ==================== DEEP LEARNING ====================
  "neural-network": {
    id: {
      formulas: [
        { tex: "a = \\phi\\!\\left( \\sum_{i} w_i x_i + b \\right)", caption: "Satu neuron: jumlah berbobot lalu fungsi aktivasi." },
        { tex: "\\mathcal{L} = -\\frac{1}{n}\\sum \\big[ y \\log \\hat{y} + (1-y)\\log(1-\\hat{y}) \\big]", caption: "Loss (cross-entropy)." },
        { tex: "w \\leftarrow w - \\eta \\frac{\\partial \\mathcal{L}}{\\partial w}", caption: "Gradient descent memperbarui bobot." },
      ],
      symbols: [
        { sym: "w_i", meaning: "bobot koneksi" },
        { sym: "b", meaning: "bias" },
        { sym: "\\phi", meaning: "fungsi aktivasi (mis. tanh)" },
        { sym: "\\eta", meaning: "learning rate (langkah belajar)" },
      ],
      intuition: "Tebak, ukur kesalahan, lalu geser bobot sedikit ke arah yang mengurangi loss.",
    },
    en: {
      formulas: [
        { tex: "a = \\phi\\!\\left( \\sum_{i} w_i x_i + b \\right)", caption: "One neuron: weighted sum then activation." },
        { tex: "\\mathcal{L} = -\\frac{1}{n}\\sum \\big[ y \\log \\hat{y} + (1-y)\\log(1-\\hat{y}) \\big]", caption: "Loss (cross-entropy)." },
        { tex: "w \\leftarrow w - \\eta \\frac{\\partial \\mathcal{L}}{\\partial w}", caption: "Gradient descent updates the weights." },
      ],
      symbols: [
        { sym: "w_i", meaning: "connection weight" },
        { sym: "b", meaning: "bias" },
        { sym: "\\phi", meaning: "activation function (e.g. tanh)" },
        { sym: "\\eta", meaning: "learning rate (step size)" },
      ],
      intuition: "Guess, measure error, then nudge weights slightly in the direction that lowers loss.",
    },
  },

  "cnn-filters": {
    id: {
      formulas: [
        { tex: "(I * K)(i,j) = \\sum_{u}\\sum_{v} I(i+u,\\, j+v)\\, K(u,v)", caption: "Operasi konvolusi 2D." },
      ],
      symbols: [
        { sym: "I", meaning: "gambar input" },
        { sym: "K", meaning: "kernel / filter" },
        { sym: "(i,j)", meaning: "posisi piksel" },
        { sym: "u,v", meaning: "offset di dalam kernel" },
      ],
      intuition: "Geser kernel kecil ke seluruh gambar; tiap posisi menghasilkan satu jumlah berbobot.",
    },
    en: {
      formulas: [
        { tex: "(I * K)(i,j) = \\sum_{u}\\sum_{v} I(i+u,\\, j+v)\\, K(u,v)", caption: "2D convolution operation." },
      ],
      symbols: [
        { sym: "I", meaning: "input image" },
        { sym: "K", meaning: "kernel / filter" },
        { sym: "(i,j)", meaning: "pixel position" },
        { sym: "u,v", meaning: "offset within the kernel" },
      ],
      intuition: "Slide a small kernel across the whole image; each position yields one weighted sum.",
    },
  },

  "edge-detection": {
    id: {
      formulas: [
        { tex: "G_x = S_x * I, \\quad G_y = S_y * I", caption: "Gradien arah x dan y (konvolusi Sobel)." },
        { tex: "G = \\sqrt{G_x^2 + G_y^2}", caption: "Besar gradien = kekuatan tepi." },
      ],
      symbols: [
        { sym: "S_x, S_y", meaning: "kernel Sobel horizontal/vertikal" },
        { sym: "G_x, G_y", meaning: "gradien arah x/y" },
        { sym: "G", meaning: "besar gradien total" },
        { sym: "I", meaning: "gambar (grayscale)" },
      ],
      intuition: "Tepi ada di tempat kecerahan berubah tajam — yaitu gradien besar.",
    },
    en: {
      formulas: [
        { tex: "G_x = S_x * I, \\quad G_y = S_y * I", caption: "Gradients in x and y (Sobel convolution)." },
        { tex: "G = \\sqrt{G_x^2 + G_y^2}", caption: "Gradient magnitude = edge strength." },
      ],
      symbols: [
        { sym: "S_x, S_y", meaning: "horizontal/vertical Sobel kernels" },
        { sym: "G_x, G_y", meaning: "gradient in x/y direction" },
        { sym: "G", meaning: "total gradient magnitude" },
        { sym: "I", meaning: "(grayscale) image" },
      ],
      intuition: "Edges live where brightness changes sharply — i.e. where the gradient is large.",
    },
  },

  "pixel-classifier": {
    id: {
      formulas: [
        { tex: "\\text{score}(t) = \\frac{\\sum_{p} w_p \\, [\\, g_p = T^t_p \\,]}{\\sum_{p} w_p}", caption: "Kecocokan gambar dengan template tiap kelas." },
        { tex: "\\hat{t} = \\arg\\max_{t}\\; \\text{score}(t)", caption: "Prediksi = template paling cocok." },
      ],
      symbols: [
        { sym: "g_p", meaning: "nilai piksel p pada gambar" },
        { sym: "T^t_p", meaning: "piksel p pada template kelas t" },
        { sym: "w_p", meaning: "bobot piksel" },
        { sym: "[\\cdot]", meaning: "1 jika cocok, 0 jika tidak" },
      ],
      intuition: "Bandingkan pola piksel dengan tiap template; pilih yang paling mirip.",
    },
    en: {
      formulas: [
        { tex: "\\text{score}(t) = \\frac{\\sum_{p} w_p \\, [\\, g_p = T^t_p \\,]}{\\sum_{p} w_p}", caption: "Match between the drawing and each class template." },
        { tex: "\\hat{t} = \\arg\\max_{t}\\; \\text{score}(t)", caption: "Prediction = best-matching template." },
      ],
      symbols: [
        { sym: "g_p", meaning: "pixel p value in the drawing" },
        { sym: "T^t_p", meaning: "pixel p in template of class t" },
        { sym: "w_p", meaning: "pixel weight" },
        { sym: "[\\cdot]", meaning: "1 if it matches, 0 otherwise" },
      ],
      intuition: "Compare the pixel pattern to each template; pick the most similar one.",
    },
  },

  "activation-functions": {
    id: {
      formulas: [
        { tex: "\\text{ReLU}(x) = \\max(0, x)", caption: "ReLU: sederhana dan cepat." },
        { tex: "\\sigma(x) = \\frac{1}{1+e^{-x}}", caption: "Sigmoid: output di (0, 1)." },
        { tex: "\\tanh(x) = \\frac{e^{x}-e^{-x}}{e^{x}+e^{-x}}", caption: "Tanh: output di (-1, 1)." },
      ],
      symbols: [
        { sym: "x", meaning: "input ke neuron" },
        { sym: "e", meaning: "bilangan Euler ≈ 2,718" },
        { sym: "\\max", meaning: "ambil nilai terbesar" },
      ],
      intuition: "Non-linearitas inilah yang memungkinkan jaringan mempelajari pola rumit.",
    },
    en: {
      formulas: [
        { tex: "\\text{ReLU}(x) = \\max(0, x)", caption: "ReLU: simple and fast." },
        { tex: "\\sigma(x) = \\frac{1}{1+e^{-x}}", caption: "Sigmoid: output in (0, 1)." },
        { tex: "\\tanh(x) = \\frac{e^{x}-e^{-x}}{e^{x}+e^{-x}}", caption: "Tanh: output in (-1, 1)." },
      ],
      symbols: [
        { sym: "x", meaning: "input to the neuron" },
        { sym: "e", meaning: "Euler's number ≈ 2.718" },
        { sym: "\\max", meaning: "take the larger value" },
      ],
      intuition: "This non-linearity is exactly what lets a network learn complex patterns.",
    },
  },
};


// ==================== REINFORCEMENT LEARNING ====================
Object.assign(demoMath, {
  "rl-gridworld": {
    id: {
      formulas: [
        { tex: "Q(s,a) \\leftarrow Q(s,a) + \\alpha \\big[\\, r + \\gamma \\max_{a'} Q(s',a') - Q(s,a) \\,\\big]", caption: "Aturan pembaruan Q-learning." },
      ],
      symbols: [
        { sym: "Q(s,a)", meaning: "nilai aksi a pada state s" },
        { sym: "\\alpha", meaning: "learning rate" },
        { sym: "r", meaning: "reward yang diterima" },
        { sym: "\\gamma", meaning: "faktor diskon (0–1)" },
        { sym: "s'", meaning: "state berikutnya" },
      ],
      intuition: "Perbarui nilai aksi ke arah reward sekarang plus nilai terbaik masa depan.",
    },
    en: {
      formulas: [
        { tex: "Q(s,a) \\leftarrow Q(s,a) + \\alpha \\big[\\, r + \\gamma \\max_{a'} Q(s',a') - Q(s,a) \\,\\big]", caption: "Q-learning update rule." },
      ],
      symbols: [
        { sym: "Q(s,a)", meaning: "value of action a in state s" },
        { sym: "\\alpha", meaning: "learning rate" },
        { sym: "r", meaning: "reward received" },
        { sym: "\\gamma", meaning: "discount factor (0–1)" },
        { sym: "s'", meaning: "next state" },
      ],
      intuition: "Nudge the action value toward the immediate reward plus the best future value.",
    },
  },

  "multi-armed-bandit": {
    id: {
      formulas: [
        { tex: "Q_t(a) = \\frac{1}{N_t(a)} \\sum_{i=1}^{N_t(a)} r_i", caption: "Estimasi nilai = rata-rata reward mesin a." },
        { tex: "a_t = \\begin{cases} \\text{acak} & \\text{peluang } \\varepsilon \\\\ \\arg\\max_a Q_t(a) & \\text{peluang } 1-\\varepsilon \\end{cases}", caption: "Strategi ε-greedy." },
      ],
      symbols: [
        { sym: "Q_t(a)", meaning: "estimasi nilai mesin a" },
        { sym: "N_t(a)", meaning: "berapa kali mesin a ditarik" },
        { sym: "r_i", meaning: "reward pada tarikan ke-i" },
        { sym: "\\varepsilon", meaning: "peluang bereksplorasi" },
      ],
      intuition: "Kebanyakan pakai mesin terbaik, tapi sesekali coba yang lain untuk belajar.",
    },
    en: {
      formulas: [
        { tex: "Q_t(a) = \\frac{1}{N_t(a)} \\sum_{i=1}^{N_t(a)} r_i", caption: "Value estimate = average reward of arm a." },
        { tex: "a_t = \\begin{cases} \\text{random} & \\text{prob. } \\varepsilon \\\\ \\arg\\max_a Q_t(a) & \\text{prob. } 1-\\varepsilon \\end{cases}", caption: "ε-greedy strategy." },
      ],
      symbols: [
        { sym: "Q_t(a)", meaning: "value estimate of arm a" },
        { sym: "N_t(a)", meaning: "times arm a was pulled" },
        { sym: "r_i", meaning: "reward on the i-th pull" },
        { sym: "\\varepsilon", meaning: "probability of exploring" },
      ],
      intuition: "Mostly use the best arm, but occasionally try others to keep learning.",
    },
  },

  "rl-maze": {
    id: {
      formulas: [
        { tex: "V(s) = \\max_{a} \\sum_{s'} P(s' \\mid s,a)\\,\\big[\\, r + \\gamma V(s') \\,\\big]", caption: "Persamaan Bellman (value iteration)." },
        { tex: "\\pi(s) = \\arg\\max_{a} \\; \\big[\\, r + \\gamma V(s') \\,\\big]", caption: "Kebijakan optimal = aksi bernilai tertinggi." },
      ],
      symbols: [
        { sym: "V(s)", meaning: "nilai dari state s" },
        { sym: "\\gamma", meaning: "faktor diskon" },
        { sym: "\\pi(s)", meaning: "kebijakan: aksi pada state s" },
        { sym: "P(s'\\mid s,a)", meaning: "peluang transisi ke s'" },
      ],
      intuition: "Nilai menyebar mundur dari tujuan; ikuti tetangga bernilai tertinggi.",
    },
    en: {
      formulas: [
        { tex: "V(s) = \\max_{a} \\sum_{s'} P(s' \\mid s,a)\\,\\big[\\, r + \\gamma V(s') \\,\\big]", caption: "Bellman equation (value iteration)." },
        { tex: "\\pi(s) = \\arg\\max_{a} \\; \\big[\\, r + \\gamma V(s') \\,\\big]", caption: "Optimal policy = highest-value action." },
      ],
      symbols: [
        { sym: "V(s)", meaning: "value of state s" },
        { sym: "\\gamma", meaning: "discount factor" },
        { sym: "\\pi(s)", meaning: "policy: action in state s" },
        { sym: "P(s'\\mid s,a)", meaning: "probability of moving to s'" },
      ],
      intuition: "Values spread backward from the goal; follow the highest-valued neighbor.",
    },
  },

  cartpole: {
    id: {
      formulas: [
        { tex: "a = \\begin{cases} \\text{dorong kanan} & k_\\theta\\, \\theta + k_\\omega\\, \\dot{\\theta} > 0 \\\\ \\text{dorong kiri} & \\text{selain itu} \\end{cases}", caption: "Kebijakan kontrol linear sederhana." },
        { tex: "R = \\sum_{t} 1 \\quad \\text{(selama tiang tegak)}", caption: "Reward = jumlah langkah bertahan." },
      ],
      symbols: [
        { sym: "\\theta", meaning: "sudut kemiringan tiang" },
        { sym: "\\dot{\\theta}", meaning: "kecepatan sudut" },
        { sym: "k_\\theta, k_\\omega", meaning: "bobot policy (yang disetel)" },
        { sym: "R", meaning: "total reward" },
      ],
      intuition: "Dorong kereta ke arah yang mengoreksi kemiringan; makin lama tegak, makin besar reward.",
    },
    en: {
      formulas: [
        { tex: "a = \\begin{cases} \\text{push right} & k_\\theta\\, \\theta + k_\\omega\\, \\dot{\\theta} > 0 \\\\ \\text{push left} & \\text{otherwise} \\end{cases}", caption: "A simple linear control policy." },
        { tex: "R = \\sum_{t} 1 \\quad \\text{(while the pole stays up)}", caption: "Reward = number of steps balanced." },
      ],
      symbols: [
        { sym: "\\theta", meaning: "pole tilt angle" },
        { sym: "\\dot{\\theta}", meaning: "angular velocity" },
        { sym: "k_\\theta, k_\\omega", meaning: "policy weights (tuned)" },
        { sym: "R", meaning: "total reward" },
      ],
      intuition: "Push the cart to correct the tilt; the longer it stays up, the higher the reward.",
    },
  },

  "explore-exploit": {
    id: {
      formulas: [
        { tex: "a_t = \\begin{cases} \\text{acak} & \\text{peluang } \\varepsilon \\\\ \\arg\\max_a Q_t(a) & \\text{peluang } 1-\\varepsilon \\end{cases}", caption: "ε-greedy: parameter tunggal yang mengatur keseimbangan." },
        { tex: "\\text{regret} = \\sum_{t} \\big( Q(a^*) - Q(a_t) \\big)", caption: "Regret: kerugian akibat tak selalu memilih yang terbaik." },
      ],
      symbols: [
        { sym: "\\varepsilon", meaning: "peluang eksplorasi" },
        { sym: "a^*", meaning: "aksi terbaik sesungguhnya" },
        { sym: "Q_t(a)", meaning: "estimasi nilai aksi a" },
      ],
      intuition: "ε kecil = cepat tapi bisa terjebak; ε besar = boros. Ada titik seimbang.",
    },
    en: {
      formulas: [
        { tex: "a_t = \\begin{cases} \\text{random} & \\text{prob. } \\varepsilon \\\\ \\arg\\max_a Q_t(a) & \\text{prob. } 1-\\varepsilon \\end{cases}", caption: "ε-greedy: a single knob for the balance." },
        { tex: "\\text{regret} = \\sum_{t} \\big( Q(a^*) - Q(a_t) \\big)", caption: "Regret: the loss from not always choosing the best." },
      ],
      symbols: [
        { sym: "\\varepsilon", meaning: "exploration probability" },
        { sym: "a^*", meaning: "the truly best action" },
        { sym: "Q_t(a)", meaning: "value estimate of action a" },
      ],
      intuition: "Small ε = fast but can get stuck; large ε = wasteful. There's a sweet spot.",
    },
  },

  // ==================== LLM & NLP ====================
  "sentiment-naive-bayes": {
    id: {
      formulas: [
        { tex: "\\hat{c} = \\arg\\max_{c \\in \\{+,-\\}} P(c) \\prod_{w \\in d} P(w \\mid c)", caption: "Klasifikasi sentimen dengan Naive Bayes." },
        { tex: "P(w \\mid c) = \\frac{\\text{count}(w, c) + 1}{\\sum_{w'} \\text{count}(w', c) + |V|}", caption: "Estimasi kata (Laplace smoothing)." },
      ],
      symbols: [
        { sym: "d", meaning: "dokumen (kumpulan kata)" },
        { sym: "c", meaning: "kelas: positif / negatif" },
        { sym: "|V|", meaning: "ukuran kosakata" },
        { sym: "\\text{count}(w,c)", meaning: "frekuensi kata w di kelas c" },
      ],
      intuition: "Jumlahkan bukti tiap kata; kelas dengan peluang terbesar menang.",
    },
    en: {
      formulas: [
        { tex: "\\hat{c} = \\arg\\max_{c \\in \\{+,-\\}} P(c) \\prod_{w \\in d} P(w \\mid c)", caption: "Sentiment classification with Naive Bayes." },
        { tex: "P(w \\mid c) = \\frac{\\text{count}(w, c) + 1}{\\sum_{w'} \\text{count}(w', c) + |V|}", caption: "Word likelihood (Laplace smoothing)." },
      ],
      symbols: [
        { sym: "d", meaning: "document (bag of words)" },
        { sym: "c", meaning: "class: positive / negative" },
        { sym: "|V|", meaning: "vocabulary size" },
        { sym: "\\text{count}(w,c)", meaning: "frequency of word w in class c" },
      ],
      intuition: "Sum each word's evidence; the class with the highest probability wins.",
    },
  },

  tfidf: {
    id: {
      formulas: [
        { tex: "\\text{tf}(w,d) = \\frac{\\text{count}(w,d)}{|d|}", caption: "Term Frequency: seberapa sering kata di dokumen." },
        { tex: "\\text{idf}(w) = \\log \\frac{N}{\\text{df}(w)}", caption: "Inverse Document Frequency: seberapa langka kata." },
        { tex: "\\text{tf-idf}(w,d) = \\text{tf}(w,d) \\times \\text{idf}(w)", caption: "Skor akhir." },
      ],
      symbols: [
        { sym: "N", meaning: "jumlah dokumen" },
        { sym: "\\text{df}(w)", meaning: "jumlah dokumen yang memuat w" },
        { sym: "|d|", meaning: "panjang dokumen" },
      ],
      intuition: "Kata bernilai tinggi = sering di satu dokumen tapi langka di seluruh koleksi.",
    },
    en: {
      formulas: [
        { tex: "\\text{tf}(w,d) = \\frac{\\text{count}(w,d)}{|d|}", caption: "Term Frequency: how often a word is in a doc." },
        { tex: "\\text{idf}(w) = \\log \\frac{N}{\\text{df}(w)}", caption: "Inverse Document Frequency: how rare a word is." },
        { tex: "\\text{tf-idf}(w,d) = \\text{tf}(w,d) \\times \\text{idf}(w)", caption: "Final score." },
      ],
      symbols: [
        { sym: "N", meaning: "number of documents" },
        { sym: "\\text{df}(w)", meaning: "documents containing w" },
        { sym: "|d|", meaning: "document length" },
      ],
      intuition: "High score = frequent in one document but rare across the whole collection.",
    },
  },

  tokenization: {
    id: {
      formulas: [
        { tex: "\\text{text} \\;\\longrightarrow\\; [t_1, t_2, \\ldots, t_m]", caption: "Teks dipecah menjadi urutan token." },
        { tex: "t_i \\;\\longmapsto\\; \\text{id}_i \\in \\{1, \\ldots, |V|\\}", caption: "Tiap token dipetakan ke sebuah ID angka." },
      ],
      symbols: [
        { sym: "t_i", meaning: "token ke-i (sering sub-kata)" },
        { sym: "m", meaning: "jumlah token" },
        { sym: "|V|", meaning: "ukuran kosakata model" },
      ],
      intuition: "Model tidak melihat huruf/kata mentah — hanya urutan ID token.",
    },
    en: {
      formulas: [
        { tex: "\\text{text} \\;\\longrightarrow\\; [t_1, t_2, \\ldots, t_m]", caption: "Text is split into a sequence of tokens." },
        { tex: "t_i \\;\\longmapsto\\; \\text{id}_i \\in \\{1, \\ldots, |V|\\}", caption: "Each token maps to a numeric ID." },
      ],
      symbols: [
        { sym: "t_i", meaning: "the i-th token (often a sub-word)" },
        { sym: "m", meaning: "number of tokens" },
        { sym: "|V|", meaning: "model's vocabulary size" },
      ],
      intuition: "The model never sees raw letters/words — only a sequence of token IDs.",
    },
  },

  "word-embeddings": {
    id: {
      formulas: [
        { tex: "w \\;\\longmapsto\\; \\mathbf{v}_w \\in \\mathbb{R}^{d}", caption: "Kata dipetakan ke vektor berdimensi d." },
        { tex: "\\text{sim}(a,b) = \\frac{\\mathbf{v}_a \\cdot \\mathbf{v}_b}{\\lVert \\mathbf{v}_a \\rVert \\, \\lVert \\mathbf{v}_b \\rVert}", caption: "Kemiripan kosinus antar kata." },
      ],
      symbols: [
        { sym: "\\mathbf{v}_w", meaning: "vektor embedding kata w" },
        { sym: "d", meaning: "dimensi embedding" },
        { sym: "\\cdot", meaning: "hasil kali titik (dot product)" },
      ],
      intuition: "Makin kecil sudut antar vektor, makin mirip makna kedua kata.",
    },
    en: {
      formulas: [
        { tex: "w \\;\\longmapsto\\; \\mathbf{v}_w \\in \\mathbb{R}^{d}", caption: "A word maps to a d-dimensional vector." },
        { tex: "\\text{sim}(a,b) = \\frac{\\mathbf{v}_a \\cdot \\mathbf{v}_b}{\\lVert \\mathbf{v}_a \\rVert \\, \\lVert \\mathbf{v}_b \\rVert}", caption: "Cosine similarity between words." },
      ],
      symbols: [
        { sym: "\\mathbf{v}_w", meaning: "embedding vector of word w" },
        { sym: "d", meaning: "embedding dimension" },
        { sym: "\\cdot", meaning: "dot product" },
      ],
      intuition: "The smaller the angle between vectors, the more similar the two words' meanings.",
    },
  },

  attention: {
    id: {
      formulas: [
        { tex: "\\text{Attention}(Q,K,V) = \\text{softmax}\\!\\left( \\frac{Q K^{\\top}}{\\sqrt{d_k}} \\right) V", caption: "Scaled dot-product attention (inti Transformer)." },
        { tex: "\\text{softmax}(z)_i = \\frac{e^{z_i}}{\\sum_j e^{z_j}}", caption: "Softmax menormalkan skor jadi bobot (jumlah = 1)." },
      ],
      symbols: [
        { sym: "Q, K, V", meaning: "query, key, value (dari tiap token)" },
        { sym: "d_k", meaning: "dimensi key (untuk penskalaan)" },
        { sym: "K^{\\top}", meaning: "transpos matriks key" },
      ],
      intuition: "Kecocokan query–key menentukan seberapa besar tiap kata 'memperhatikan' kata lain.",
    },
    en: {
      formulas: [
        { tex: "\\text{Attention}(Q,K,V) = \\text{softmax}\\!\\left( \\frac{Q K^{\\top}}{\\sqrt{d_k}} \\right) V", caption: "Scaled dot-product attention (heart of the Transformer)." },
        { tex: "\\text{softmax}(z)_i = \\frac{e^{z_i}}{\\sum_j e^{z_j}}", caption: "Softmax turns scores into weights (summing to 1)." },
      ],
      symbols: [
        { sym: "Q, K, V", meaning: "query, key, value (from each token)" },
        { sym: "d_k", meaning: "key dimension (for scaling)" },
        { sym: "K^{\\top}", meaning: "transpose of the key matrix" },
      ],
      intuition: "The query–key match decides how much each word 'attends' to the others.",
    },
  },
});

// ==================== AI OVERVIEW: DATA DIMENSIONS ====================
Object.assign(demoMath, {
  dimensions: {
    id: {
      formulas: [
        { tex: "\\mathbf{x} = (x_1, x_2, \\ldots, x_d) \\in \\mathbb{R}^{d}", caption: "Sebuah data adalah vektor dengan d fitur (dimensi)." },
        { tex: "\\hat{y} = w_1 x_1 + w_2 x_2 + \\cdots + w_d x_d + b", caption: "Model LINEAR: garis/bidang di ruang d-dimensi." },
        { tex: "\\mathbf{z} = W \\mathbf{x}, \\quad \\mathbf{z} \\in \\mathbb{R}^{k}, \\; k \\ll d", caption: "Reduksi dimensi (mis. PCA): proyeksi d → k dimensi." },
      ],
      symbols: [
        { sym: "d", meaning: "jumlah fitur / dimensi data" },
        { sym: "\\mathbf{x}", meaning: "vektor fitur satu data" },
        { sym: "w_i, b", meaning: "bobot & bias model linear" },
        { sym: "k", meaning: "dimensi hasil reduksi (k jauh lebih kecil dari d)" },
      ],
      intuition: "Tiap fitur menambah satu dimensi. Model linear = bidang lurus; jika data non-linear, bidang lurus gagal. Data berdimensi tinggi diproyeksikan (PCA) ke 2D/3D agar bisa dilihat & efisien.",
    },
    en: {
      formulas: [
        { tex: "\\mathbf{x} = (x_1, x_2, \\ldots, x_d) \\in \\mathbb{R}^{d}", caption: "A data point is a vector with d features (dimensions)." },
        { tex: "\\hat{y} = w_1 x_1 + w_2 x_2 + \\cdots + w_d x_d + b", caption: "A LINEAR model: a line/plane in d-dimensional space." },
        { tex: "\\mathbf{z} = W \\mathbf{x}, \\quad \\mathbf{z} \\in \\mathbb{R}^{k}, \\; k \\ll d", caption: "Dimensionality reduction (e.g. PCA): project d → k dimensions." },
      ],
      symbols: [
        { sym: "d", meaning: "number of features / data dimensions" },
        { sym: "\\mathbf{x}", meaning: "one data point's feature vector" },
        { sym: "w_i, b", meaning: "linear model's weights & bias" },
        { sym: "k", meaning: "reduced dimension (k much smaller than d)" },
      ],
      intuition: "Each feature adds a dimension. A linear model = a flat boundary; if data is non-linear, a flat boundary fails. High-dimensional data is projected (PCA) to 2D/3D to be seen & computed efficiently.",
    },
  },
});

export const getDemoMath = (slug) => demoMath[slug] || null;
