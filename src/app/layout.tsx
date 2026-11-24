import type { Metadata } from "next";
import {
  Instrument_Serif,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
  Syne,
} from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SiteShell } from "@/components/SiteShell";

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-syne",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Pedro Carlos Teixeira Neto — Full Stack & Sistemas",
  description:
    "Portfólio de engenharia de software e laboratório de projetos de Pedro Teixeira (PROTHOTYPE): Cafofo (Rust/Tauri), PRISMA (Expo/Supabase), Dynamic Island Win11 e GPU Hunter BR.",
  authors: [{ name: "Pedro Carlos Teixeira Neto", url: "https://github.com/PROTHOTYPE" }],
  openGraph: {
    title: "Pedro Carlos Teixeira Neto — Portfólio & PROTHOTYPE Lab",
    description:
      "Projetos em produção, arquitetura técnica e simuladores interativos em TypeScript, React, Rust (Tauri/Axum), PostgreSQL e Python.",
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedro Carlos Teixeira Neto — Full Stack & Sistemas",
    description:
      "Portfólio bilíngue (PT-BR/EN) com cases técnicos e simuladores interativos dos projetos.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${syne.variable} ${instrumentSerif.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen antialiased bg-[#08080A] text-[#F5F5F7]">
        <LanguageProvider>
          <SiteShell>{children}</SiteShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
