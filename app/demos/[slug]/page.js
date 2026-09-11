import { notFound } from "next/navigation";
import DemoView from "@/components/DemoView";

const valid = [
  "supervised-knn",
  "unsupervised-kmeans",
  "regression",
  "neural-network",
  "rl-gridworld",
];

export function generateStaticParams() {
  return valid.map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  return { title: "Demo — AI Belajar" };
}

export default function DemoPage({ params }) {
  if (!valid.includes(params.slug)) notFound();
  return <DemoView slug={params.slug} />;
}
