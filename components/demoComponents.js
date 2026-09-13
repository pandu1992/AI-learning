// Maps each demo slug to its React component. Kept separate from lib/demos.js
// (which is pure metadata) so the metadata can be imported by server components
// without pulling in client-only demo code.
import KnnDemo from "./demos/KnnDemo";
import KMeansDemo from "./demos/KMeansDemo";
import RegressionDemo from "./demos/RegressionDemo";
import DecisionTreeDemo from "./demos/DecisionTreeDemo";
import NaiveBayesDemo from "./demos/NaiveBayesDemo";
import NeuralNetDemo from "./demos/NeuralNetDemo";
import CnnFiltersDemo from "./demos/CnnFiltersDemo";
import EdgeDetectionDemo from "./demos/EdgeDetectionDemo";
import PixelClassifierDemo from "./demos/PixelClassifierDemo";
import ActivationDemo from "./demos/ActivationDemo";
import WebcamVisionDemo from "./demos/WebcamVisionDemo";
import GridWorldDemo from "./demos/GridWorldDemo";
import BanditDemo from "./demos/BanditDemo";
import MazeValueDemo from "./demos/MazeValueDemo";
import CartPoleDemo from "./demos/CartPoleDemo";
import ExploreExploitDemo from "./demos/ExploreExploitDemo";
import SentimentDemo from "./demos/SentimentDemo";
import TfidfDemo from "./demos/TfidfDemo";
import TokenizationDemo from "./demos/TokenizationDemo";
import EmbeddingsDemo from "./demos/EmbeddingsDemo";
import AttentionDemo from "./demos/AttentionDemo";

export const demoComponents = {
  "supervised-knn": KnnDemo,
  "unsupervised-kmeans": KMeansDemo,
  regression: RegressionDemo,
  "decision-tree": DecisionTreeDemo,
  "naive-bayes": NaiveBayesDemo,
  "neural-network": NeuralNetDemo,
  "cnn-filters": CnnFiltersDemo,
  "edge-detection": EdgeDetectionDemo,
  "pixel-classifier": PixelClassifierDemo,
  "activation-functions": ActivationDemo,
  "webcam-vision": WebcamVisionDemo,
  "rl-gridworld": GridWorldDemo,
  "multi-armed-bandit": BanditDemo,
  "rl-maze": MazeValueDemo,
  cartpole: CartPoleDemo,
  "explore-exploit": ExploreExploitDemo,
  "sentiment-naive-bayes": SentimentDemo,
  tfidf: TfidfDemo,
  tokenization: TokenizationDemo,
  "word-embeddings": EmbeddingsDemo,
  attention: AttentionDemo,
};
