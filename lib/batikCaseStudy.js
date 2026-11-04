// Content for the Batik Motif Classification case-study module (Group Assignment
// Week 2). Bilingual (id/en). Each "soal" (task) has an intro, learning goals,
// runnable PyTorch code, an explanation, and expected-output notes. Kept as data
// so the page stays a thin renderer. Datasets live in the repo under docs/*.zip.

export const BATIK_CLASSES = ["Parang", "Kawung", "Megamendung", "Sekarjagad", "Truntum"];

// Public download links (served from the GitHub repo the site is built from).
export const BATIK_DATASETS = [
  { name: "Parang", file: "Parang.zip", id: "Motif garis diagonal (Yogyakarta) — makna ketekunan & kesinambungan.", en: "Diagonal line motif (Yogyakarta) — meaning perseverance & continuity." },
  { name: "Kawung", file: "Kawung.zip", id: "Pola bulatan/elips simetris — melambangkan kesucian & keadilan.", en: "Symmetric circle/ellipse pattern — symbolizes purity & justice." },
  { name: "Megamendung", file: "Megamendung.zip", id: "Motif awan (Cirebon) — ketenangan & kesabaran.", en: "Cloud motif (Cirebon) — calmness & patience." },
  { name: "Sekarjagad", file: "Sekarjagad.zip", id: "Peta ragam motif — keberagaman & keindahan dunia.", en: "A map of varied motifs — diversity & the beauty of the world." },
  { name: "Truntum", file: "Truntum.zip", id: "Motif bunga kecil (Surakarta) — cinta yang tumbuh kembali.", en: "Small flower motif (Surakarta) — love that blossoms anew." },
];

// Datasets are committed to the repo under docs/ and downloaded directly from
// GitHub (the static site doesn't serve docs/). This base points at the raw
// file endpoint for the repo's default branch.
export const DATASET_BASE_URL = "https://github.com/pandu1992/AI-learning/raw/main/docs";

export const batikIntro = {
  id: {
    title: "Studi Kasus: Klasifikasi Motif Batik dengan Deep Learning",
    subtitle: "Tugas Kelompok Week 2 — membangun sistem klasifikasi 5 motif batik Nusantara memakai MLP (PyTorch), sebagai upaya digitalisasi & pelestarian warisan budaya.",
    bgTitle: "Latar Belakang",
    bg: [
      "Indonesia kaya akan warisan budaya batik — tiap daerah punya motif, pola, warna, dan filosofi khas. Dokumentasi motif masih tersebar dan identifikasinya bergantung pada keahlian perajin.",
      "Sebuah komunitas perajin & pusat dokumentasi budaya ingin membangun sistem klasifikasi motif batik berbasis AI untuk membantu identifikasi, pengelompokan koleksi digital, dan pelestarian pengetahuan.",
      "Tim memakai pendekatan Deep Learning dengan arsitektur Multilayer Perceptron (MLP) sebagai model awal untuk mengklasifikasikan citra batik ke dalam lima kategori.",
    ],
    note: "Prototipe ini adalah alat bantu dokumentasi visual — bukan pengganti pengetahuan budaya, filosofi, atau keahlian perajin dalam mengidentifikasi motif.",
    objectivesTitle: "Yang akan kamu pelajari",
    objectives: [
      "Menyusun dataset citra terstruktur per kelas (ImageFolder).",
      "Membangun pipeline data PyTorch: Dataset → transform → DataLoader (mini-batch).",
      "Merancang MLP 4 lapisan tersembunyi untuk klasifikasi 5 kelas.",
      "Melatih, menguji dimensi output, dan mengevaluasi dengan confusion matrix, PCA & t-SNE.",
    ],
  },
  en: {
    title: "Case Study: Batik Motif Classification with Deep Learning",
    subtitle: "Week 2 Group Assignment — build a classifier for 5 Indonesian batik motifs using an MLP (PyTorch), as an effort toward digitizing & preserving cultural heritage.",
    bgTitle: "Background",
    bg: [
      "Indonesia has a rich batik heritage — each region has distinctive motifs, patterns, colors, and philosophy. Motif documentation is scattered and identification relies on artisans' expertise.",
      "A community of artisans & a culture-documentation center want to build an AI-based batik-motif classifier to aid identification, organize digital collections, and preserve knowledge.",
      "The team uses a Deep Learning approach with a Multilayer Perceptron (MLP) as the initial model to classify batik images into five categories.",
    ],
    note: "This prototype is a visual-documentation aid — not a replacement for cultural knowledge, philosophy, or artisans' expertise in identifying motifs.",
    objectivesTitle: "What you'll learn",
    objectives: [
      "Assemble a structured per-class image dataset (ImageFolder).",
      "Build a PyTorch data pipeline: Dataset → transform → DataLoader (mini-batch).",
      "Design a 4-hidden-layer MLP for 5-class classification.",
      "Train, check output dimensions, and evaluate with a confusion matrix, PCA & t-SNE.",
    ],
  },
};

export const batikTasks = [
  // -------- Soal 1 --------
  {
    n: 1, weight: "20%", icon: "🗂️",
    id: {
      title: "Membangun Dataset Digital Motif Batik",
      brief: "Kumpulkan 5 kelas citra berwarna, masing-masing 20 citra, ukuran 32×32×3, tersusun per kategori.",
      points: [
        "Lima kelas: Parang, Kawung, Megamendung, Sekarjagad, Truntum.",
        "Minimal 20 citra RGB per kelas (dataset di modul ini berisi jauh lebih banyak — pilih 20 bila ingin sesuai soal).",
        "Ukuran tiap citra 32×32×3 (tinggi × lebar × channel RGB) — di-resize saat transform.",
        "Struktur folder: satu folder per kelas agar bisa dibaca ImageFolder.",
      ],
      explain: "Struktur folder-per-kelas adalah kunci: PyTorch ImageFolder memakai nama folder sebagai label kelas secara otomatis. Ukuran 32×32 membuat vektor input MLP = 32·32·3 = 3.072 fitur.",
    },
    en: {
      title: "Build the Digital Batik Dataset",
      brief: "Collect 5 color-image classes, 20 images each, size 32×32×3, organized per category.",
      points: [
        "Five classes: Parang, Kawung, Megamendung, Sekarjagad, Truntum.",
        "At least 20 RGB images per class (this module's dataset has many more — pick 20 if you must match the task).",
        "Each image 32×32×3 (height × width × RGB channels) — resized in the transform.",
        "Folder structure: one folder per class so ImageFolder can read it.",
      ],
      explain: "The folder-per-class structure is key: PyTorch's ImageFolder uses folder names as class labels automatically. A 32×32 size makes the MLP input vector = 32·32·3 = 3,072 features.",
    },
    code: `dataset/
├── Parang/        # 20+ images (.jpg)
├── Kawung/
├── Megamendung/
├── Sekarjagad/
└── Truntum/`,
    codeLang: "text",
    expected: {
      id: "Setelah diekstrak, tiap folder kelas berisi citra .jpg. Nama folder = label kelas.",
      en: "After extraction, each class folder holds .jpg images. Folder name = class label.",
    },
  },

  // -------- Soal 2 --------
  {
    n: 2, weight: "20%", icon: "🧩",
    id: {
      title: "Pipeline Dataset dengan PyTorch (ImageFolder)",
      brief: "Baca citra per kelas memakai torchvision ImageFolder + transform resize ke 32×32 dan ToTensor.",
      points: [
        "Transform: Resize((32,32)) → ToTensor() → (opsional) Normalize.",
        "ImageFolder membaca folder & memberi label otomatis sesuai urutan alfabet nama folder.",
        "Cek dataset.classes untuk melihat pemetaan label.",
      ],
      explain: "ToTensor() mengubah citra PIL (0–255) menjadi tensor float (0–1) berbentuk [C,H,W]. Normalize membantu training lebih stabil. dataset.classes memberi daftar nama kelas sesuai indeks label.",
    },
    en: {
      title: "PyTorch Dataset Pipeline (ImageFolder)",
      brief: "Read per-class images with torchvision ImageFolder + a transform that resizes to 32×32 and ToTensor.",
      points: [
        "Transform: Resize((32,32)) → ToTensor() → (optional) Normalize.",
        "ImageFolder reads folders & assigns labels automatically by alphabetical folder order.",
        "Check dataset.classes to see the label mapping.",
      ],
      explain: "ToTensor() turns a PIL image (0–255) into a float tensor (0–1) shaped [C,H,W]. Normalize helps training stability. dataset.classes lists class names by label index.",
    },
    code: `import torch
from torchvision import datasets, transforms

transform = transforms.Compose([
    transforms.Resize((32, 32)),          # enforce 32x32
    transforms.ToTensor(),                # -> [3, 32, 32], values 0..1
    transforms.Normalize((0.5, 0.5, 0.5),
                         (0.5, 0.5, 0.5)) # center to [-1, 1]
])

dataset = datasets.ImageFolder(root="dataset", transform=transform)
print("Classes:", dataset.classes)       # ['Kawung','Megamendung','Parang','Sekarjagad','Truntum']
print("Total images:", len(dataset))`,
    codeLang: "python",
    expected: {
      id: "Classes: 5 nama folder (urut alfabet). Total images = jumlah seluruh citra.",
      en: "Classes: 5 folder names (alphabetical). Total images = sum of all images.",
    },
  },

  // -------- Soal 3 --------
  {
    n: 3, weight: "20%", icon: "📦",
    id: {
      title: "Mini-Batch Data Loading (DataLoader)",
      brief: "Bagi dataset ke train/test lalu buat DataLoader agar citra & label dimuat per batch.",
      points: [
        "Split train/test (mis. 80/20) dengan random_split.",
        "DataLoader(batch_size=…, shuffle=True) untuk training.",
        "Tiap iterasi memberi tensor images [B,3,32,32] dan labels [B].",
      ],
      explain: "Mini-batch membuat pelatihan efisien & gradien lebih stabil daripada satu-satu atau sekaligus. shuffle=True penting pada data latih agar urutan tak membias model. Batch kecil = update lebih sering tapi lebih berisik.",
    },
    en: {
      title: "Mini-Batch Data Loading (DataLoader)",
      brief: "Split the dataset into train/test, then create DataLoaders so images & labels load per batch.",
      points: [
        "Train/test split (e.g. 80/20) with random_split.",
        "DataLoader(batch_size=…, shuffle=True) for training.",
        "Each iteration yields images [B,3,32,32] and labels [B].",
      ],
      explain: "Mini-batches make training efficient & gradients more stable than one-at-a-time or all-at-once. shuffle=True matters for training data so ordering doesn't bias the model. A smaller batch = more frequent but noisier updates.",
    },
    code: `from torch.utils.data import DataLoader, random_split

n_test = int(0.2 * len(dataset))
n_train = len(dataset) - n_test
train_set, test_set = random_split(dataset, [n_train, n_test])

train_loader = DataLoader(train_set, batch_size=16, shuffle=True)
test_loader  = DataLoader(test_set,  batch_size=16, shuffle=False)

images, labels = next(iter(train_loader))
print("Batch images:", images.shape)   # torch.Size([16, 3, 32, 32])
print("Batch labels:", labels.shape)   # torch.Size([16])`,
    codeLang: "python",
    expected: {
      id: "Batch images: [16, 3, 32, 32] · Batch labels: [16].",
      en: "Batch images: [16, 3, 32, 32] · Batch labels: [16].",
    },
  },

  // -------- Soal 4 --------
  {
    n: 4, weight: "20%", icon: "🧠",
    id: {
      title: "Arsitektur MLP (4 Lapisan Tersembunyi)",
      brief: "Bangun MLP: input 3072 → 512 → 256 → 128 → 64 → output 5, dengan aktivasi ReLU.",
      points: [
        "Input = 32·32·3 = 3072 (citra di-flatten).",
        "Hidden: 512 → 256 → 128 → 64 neuron, tiap lapisan diikuti ReLU.",
        "Output = 5 (jumlah kelas motif batik).",
      ],
      explain: "MLP memperlakukan citra sebagai vektor datar, jadi ia mengabaikan struktur spasial (itu sebabnya CNN biasanya lebih baik untuk citra — poin bagus untuk laporan). ReLU memberi non-linearitas. Output 5 logit → dipakai CrossEntropyLoss (sudah termasuk softmax).",
    },
    en: {
      title: "MLP Architecture (4 Hidden Layers)",
      brief: "Build an MLP: input 3072 → 512 → 256 → 128 → 64 → output 5, with ReLU activations.",
      points: [
        "Input = 32·32·3 = 3072 (image flattened).",
        "Hidden: 512 → 256 → 128 → 64 neurons, each followed by ReLU.",
        "Output = 5 (number of batik-motif classes).",
      ],
      explain: "An MLP treats the image as a flat vector, so it ignores spatial structure (that's why CNNs usually do better on images — a great point for your report). ReLU adds non-linearity. The 5 output logits feed CrossEntropyLoss (which includes softmax).",
    },
    code: `import torch.nn as nn

class BatikMLP(nn.Module):
    def __init__(self, in_features=32*32*3, num_classes=5):
        super().__init__()
        self.net = nn.Sequential(
            nn.Flatten(),                 # [B,3,32,32] -> [B,3072]
            nn.Linear(in_features, 512), nn.ReLU(),
            nn.Linear(512, 256),         nn.ReLU(),
            nn.Linear(256, 128),         nn.ReLU(),
            nn.Linear(128, 64),          nn.ReLU(),
            nn.Linear(64, num_classes),  # 5 logits
        )

    def forward(self, x):
        return self.net(x)

model = BatikMLP()
print(model)`,
    codeLang: "python",
    expected: {
      id: "Ringkasan model: 5 Linear + 4 ReLU; lapisan terakhir menghasilkan 5 keluaran.",
      en: "Model summary: 5 Linear + 4 ReLU; the last layer outputs 5 values.",
    },
  },

  // -------- Soal 5 --------
  {
    n: 5, weight: "20%", icon: "📊",
    id: {
      title: "Pelatihan, Uji Dimensi Output & Evaluasi",
      brief: "Latih model, cetak ukuran output MLP, lalu evaluasi: confusion matrix, PCA & t-SNE dari representasi.",
      points: [
        "Loss = CrossEntropyLoss, optimizer = Adam.",
        "WAJIB: cetak ukuran output model (harus [B, 5]).",
        "Evaluasi: akurasi + confusion matrix.",
        "Ambil representasi lapisan tersembunyi → visualisasi PCA & t-SNE.",
      ],
      explain: "Mencetak shape output memastikan model & data cocok. Confusion matrix menunjukkan kelas mana yang tertukar (motif mirip cenderung bingung). PCA/t-SNE pada representasi menunjukkan apakah model memisahkan kelas dengan baik di ruang fitur. Karena MLP mengabaikan struktur spasial, akurasi mungkin sederhana — jelaskan ini & sarankan CNN sebagai langkah berikut.",
    },
    en: {
      title: "Training, Output-Dimension Check & Evaluation",
      brief: "Train the model, print the MLP's output size, then evaluate: confusion matrix, PCA & t-SNE of representations.",
      points: [
        "Loss = CrossEntropyLoss, optimizer = Adam.",
        "REQUIRED: print the model's output size (must be [B, 5]).",
        "Evaluate: accuracy + confusion matrix.",
        "Extract hidden-layer representations → PCA & t-SNE visualization.",
      ],
      explain: "Printing the output shape confirms model & data match. The confusion matrix shows which classes get swapped (visually similar motifs tend to confuse). PCA/t-SNE on representations shows whether the model separates classes in feature space. Since an MLP ignores spatial structure, accuracy may be modest — explain this & suggest a CNN as the next step.",
    },
    code: `import torch.optim as optim

device = "cuda" if torch.cuda.is_available() else "cpu"
model = model.to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=1e-3)

# --- quick output-dimension check (Soal 5 requirement) ---
images, labels = next(iter(train_loader))
out = model(images.to(device))
print("Output size:", out.shape)        # torch.Size([16, 5])

# --- training loop ---
for epoch in range(20):
    model.train()
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        optimizer.zero_grad()
        loss = criterion(model(images), labels)
        loss.backward()
        optimizer.step()
    print(f"epoch {epoch+1}: loss={loss.item():.4f}")`,
    codeLang: "python",
    expected: {
      id: "Output size: [16, 5]. Loss menurun tiap epoch jika pelatihan berjalan baik.",
      en: "Output size: [16, 5]. Loss decreases each epoch if training goes well.",
    },
  },
];

// Evaluation & visualization snippet (shared, follows the referenced utils).
export const batikEval = {
  id: {
    title: "Evaluasi: Akurasi, Confusion Matrix, PCA & t-SNE",
    note: "Kumpulkan prediksi di test set untuk akurasi & confusion matrix; ambil representasi lapisan tersembunyi lalu proyeksikan dengan PCA & t-SNE untuk melihat keterpisahan kelas.",
  },
  en: {
    title: "Evaluation: Accuracy, Confusion Matrix, PCA & t-SNE",
    note: "Collect test-set predictions for accuracy & the confusion matrix; extract hidden-layer representations then project with PCA & t-SNE to inspect class separation.",
  },
  code: `from sklearn.metrics import confusion_matrix, accuracy_score
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
import numpy as np

model.eval()
all_preds, all_labels, all_feats = [], [], []
# hook the 64-dim layer (second to last) as the "representation"
feat_extractor = nn.Sequential(*list(model.net.children())[:-1])

with torch.no_grad():
    for images, labels in test_loader:
        images = images.to(device)
        logits = model(images)
        feats  = feat_extractor(images)          # [B, 64]
        all_preds.extend(logits.argmax(1).cpu().numpy())
        all_labels.extend(labels.numpy())
        all_feats.extend(feats.cpu().numpy())

all_feats = np.array(all_feats)
print("Accuracy:", accuracy_score(all_labels, all_preds))
print("Confusion matrix:\\n", confusion_matrix(all_labels, all_preds))

pca  = PCA(n_components=2).fit_transform(all_feats)
tsne = TSNE(n_components=2, perplexity=15).fit_transform(all_feats)
# then scatter-plot pca / tsne colored by all_labels (see plot.py reference)`,
  codeLang: "python",
};

export const batikReferences = [
  { label: "Dataset (Mendeley)", url: "https://data.mendeley.com/datasets/5hp2dg7n3m/1" },
  { label: "Template training (nn.ipynb)", url: "https://github.com/n-patricia/comp6940/blob/main/tutorial/sess2/nn.ipynb" },
  { label: "misc.py (representation, PCA, t-SNE)", url: "https://github.com/n-patricia/comp6940/blob/main/src/utils/misc.py" },
  { label: "plot.py (confusion matrix, representations)", url: "https://github.com/n-patricia/comp6940/blob/main/src/utils/plot.py" },
];
