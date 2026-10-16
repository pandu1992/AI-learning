import "./globals.css";
import "katex/dist/katex.min.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { ProgressProvider } from "@/components/ProgressProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/immersive/ReadingProgress";
import CommandPalette from "@/components/CommandPalette";

export const metadata = {
  title: "Cognia — Platform Pembelajaran AI Interaktif",
  description:
    "Belajar Artificial Intelligence secara interaktif: Machine Learning, Deep Learning, Reinforcement Learning, LLM, demo, dan studi kasus. BINUS Online Computer Science.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        {/* Set theme before paint to avoid a flash of the wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('cognia_theme');if(t==='dark'||(!t&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();",
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <ProgressProvider>
              <ReadingProgress />
              <CommandPalette />
              <Header />
              <main>{children}</main>
              <Footer />
            </ProgressProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
