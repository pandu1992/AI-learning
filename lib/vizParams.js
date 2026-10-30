// Slider definitions for the ModelViz "Parameter Sandbox", keyed by demo slug.
// When a slug has an entry here, ModelViz shows sliders and uses the matching
// parametrized scene from lib/modelScenesParam.js, passing the live values as
// `params` to draw(). Shape:
//   { intro:{id,en}, controls:[{ key, min, max, step, default, label:{id,en} }] }

export const vizParams = {
  "supervised-knn": {
    intro: {
      id: "Geser k untuk melihat bagaimana jumlah tetangga mengubah suara.",
      en: "Drag k to see how the number of neighbors changes the vote.",
    },
    controls: [
      { key: "k", min: 1, max: 9, step: 2, default: 3, label: { id: "k (jumlah tetangga)", en: "k (neighbors)" } },
    ],
  },
  "unsupervised-kmeans": {
    intro: {
      id: "Geser k untuk mengubah jumlah cluster (data sebenarnya 3 blob).",
      en: "Drag k to change the number of clusters (true data has 3 blobs).",
    },
    controls: [
      { key: "k", min: 1, max: 5, step: 1, default: 3, label: { id: "k (jumlah cluster)", en: "k (clusters)" } },
    ],
  },
  "gradient-descent": {
    intro: {
      id: "Geser learning rate: amati konvergensi vs divergensi.",
      en: "Drag the learning rate: watch convergence vs divergence.",
    },
    controls: [
      { key: "lr", min: 0.02, max: 1.1, step: 0.02, default: 0.3, label: { id: "learning rate", en: "learning rate" } },
    ],
  },
  "decision-tree": {
    intro: {
      id: "Geser max_depth: makin dalam = makin banyak kotak keputusan.",
      en: "Drag max_depth: deeper = more decision regions.",
    },
    controls: [
      { key: "maxDepth", min: 1, max: 4, step: 1, default: 2, label: { id: "max_depth (kedalaman)", en: "max_depth" } },
    ],
  },
};

export const getVizParams = (slug) => vizParams[slug] || null;
