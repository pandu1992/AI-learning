"use client";

import { useLang } from "@/components/LanguageProvider";
import ImmersiveHero from "@/components/immersive/ImmersiveHero";
import DataPlayground from "@/components/playground/DataPlayground";
import { getTheme } from "@/lib/immersiveThemes";

// "Bring your own data" page: place your own points and watch k-NN / k-means run
// on them live. Learning becomes personal and hands-on.
export default function PlaygroundPage() {
  const { lang } = useLang();
  const labels = {
    id: {
      title: "Playground Data",
      sub: "Gambar titik datamu sendiri, lalu lihat k-NN atau k-means bekerja langsung pada data itu.",
    },
    en: {
      title: "Data Playground",
      sub: "Draw your own data points, then watch k-NN or k-means run live on them.",
    },
  }[lang];
  const theme = getTheme("demos");

  return (
    <div>
      <ImmersiveHero theme={theme} icon="🖌️" title={labels.title} subtitle={labels.sub} eyebrow={theme.eyebrow[lang]} />
      <div className="mx-auto max-w-5xl px-4 py-12">
        <DataPlayground />
      </div>
    </div>
  );
}
