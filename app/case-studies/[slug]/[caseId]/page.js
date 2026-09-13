import { notFound } from "next/navigation";
import CaseStudyView from "@/components/CaseStudyView";
import { allCaseParams, getCase } from "@/lib/caseStudyIndex";

export function generateStaticParams() {
  // params: { slug: field, caseId }
  return allCaseParams();
}

export function generateMetadata({ params }) {
  const study = getCase(params.slug, params.caseId);
  if (!study) return { title: "Cognia" };
  return { title: `${study.id.title} — Cognia` };
}

export default function CaseDetailPage({ params }) {
  const study = getCase(params.slug, params.caseId);
  if (!study) notFound();
  return <CaseStudyView study={study} field={params.slug} />;
}
