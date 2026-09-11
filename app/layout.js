import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "AI Belajar — Platform Pembelajaran AI Interaktif",
  description:
    "Belajar Artificial Intelligence secara interaktif: Machine Learning, Deep Learning, Reinforcement Learning, LLM, demo, dan studi kasus.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen antialiased">
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
