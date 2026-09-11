import { notFound } from "next/navigation";
import TopicView from "@/components/TopicView";
import { topicBodies } from "@/lib/topicContent";

export function generateStaticParams() {
  return Object.keys(topicBodies).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const body = topicBodies[params.slug];
  if (!body) return { title: "AI Belajar" };
  return { title: `${body.id.title} — AI Belajar` };
}

export default function TopicPage({ params }) {
  const body = topicBodies[params.slug];
  if (!body) notFound();
  return <TopicView body={body} />;
}
