import { notFound } from "next/navigation";
import GuidedPackageListView from "@/components/GuidedPackageListView";
import { getPackages, topicsWithPackages } from "@/lib/guidedPackages";
import { topics } from "@/lib/content";

export function generateStaticParams() {
  return topicsWithPackages().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const meta = topics.find((t) => t.slug === params.slug);
  if (!meta) return { title: "Cognia" };
  return { title: `${meta.id.title} — Latihan Terpandu — Cognia` };
}

export default function TopicQuizListPage({ params }) {
  const packages = getPackages(params.slug);
  const topicMeta = topics.find((t) => t.slug === params.slug);
  if (!topicMeta || packages.length === 0) notFound();
  return <GuidedPackageListView topic={params.slug} topicMeta={topicMeta} packages={packages} />;
}
