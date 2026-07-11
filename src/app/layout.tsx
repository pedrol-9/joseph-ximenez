import type { Metadata } from "next";
import { Playfair_Display, Outfit, Courgette } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const courgette = Courgette({
  weight: "400",
  variable: "--font-courgette",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joseph Ximénez | El Ermitaño",
  description: "Homenaje a Joseph Ximénez, místico y mártir del Desierto de la Candelaria.",
};

// src/app/layout.tsx
import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${playfair.variable} ${outfit.variable} ${courgette.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('jx-theme');
                  if (saved && ['colonial', 'terracota'].indexOf(saved) !== -1) {
                    document.documentElement.setAttribute('data-theme', saved);
                  } else {
                    document.documentElement.setAttribute('data-theme', 'terracota');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-bg-primary text-text-primary transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            {children}
            <ScrollToTop />
            <ThemeSwitcher />
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


// src/app/layout.tsx

