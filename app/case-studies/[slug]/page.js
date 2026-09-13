import { notFound } from "next/navigation";
import CaseStudyFieldView from "@/components/CaseStudyFieldView";
import { fields, getFieldCases, getFieldMeta } from "@/lib/caseStudyIndex";

export function generateStaticParams() {
  return fields.map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }) {
  const meta = getFieldMeta(params.slug);
  if (!meta) return { title: "Cognia" };
  return { title: `${meta.id.title} — Studi Kasus — Cognia` };
}

export default function CaseFieldPage({ params }) {
  const meta = getFieldMeta(params.slug);
  const cases = getFieldCases(params.slug);
  if (!meta || cases.length === 0) notFound();
  return <CaseStudyFieldView field={params.slug} meta={meta} cases={cases} />;
}
