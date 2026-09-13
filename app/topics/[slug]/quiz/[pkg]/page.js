import { notFound } from "next/navigation";
import GuidedPackageView from "@/components/GuidedPackageView";
import { allPackageParams, getPackage } from "@/lib/guidedPackages";

export function generateStaticParams() {
  // params: { slug: topic, pkg }
  return allPackageParams();
}

export function generateMetadata({ params }) {
  const p = getPackage(params.slug, params.pkg);
  if (!p) return { title: "Cognia" };
  return { title: `${p.id.title} — Cognia` };
}

export default function GuidedPackagePage({ params }) {
  const p = getPackage(params.slug, params.pkg);
  if (!p) notFound();
  return <GuidedPackageView pkg={p} topic={params.slug} />;
}
