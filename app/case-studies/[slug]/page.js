import { notFound } from "next/navigation";
import CaseStudyView from "@/components/CaseStudyView";
import { caseStudies } from "@/lib/caseStudies";

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const study = caseStudies[params.slug];
  if (!study) return { title: "Cognia" };
  return { title: `${study.id.title} — Cognia` };
}

export default function CaseStudyPage({ params }) {
  const study = caseStudies[params.slug];
  if (!study) notFound();
  return <CaseStudyView study={study} />;
}
