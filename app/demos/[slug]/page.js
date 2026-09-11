import { notFound } from "next/navigation";
import DemoView from "@/components/DemoView";
import { allDemoSlugs, getDemo } from "@/lib/demos";

export function generateStaticParams() {
  return allDemoSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const demo = getDemo(params.slug);
  if (!demo) return { title: "Demo — AI Belajar" };
  return { title: `${demo.id.title} — AI Belajar` };
}

export default function DemoPage({ params }) {
  if (!allDemoSlugs.includes(params.slug)) notFound();
  return <DemoView slug={params.slug} />;
}
