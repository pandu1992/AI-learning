import "./globals.css";
import "katex/dist/katex.min.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Cognia — Platform Pembelajaran AI Interaktif",
  description:
    "Belajar Artificial Intelligence secara interaktif: Machine Learning, Deep Learning, Reinforcement Learning, LLM, demo, dan studi kasus. BINUS Online Computer Science.",
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
