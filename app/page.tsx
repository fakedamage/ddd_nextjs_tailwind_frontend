// src/app/page.tsx
import Banner from "@/shared/components/Banner";
import Header from "@/shared/components/Header";
import ServicesSection from "@/shared/components/ServicesSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crie seu filme com a produtora das grandes marcas — Motin Films",
  description:
    "Motin Films — Produção audiovisual profissional. Filmes institucionais, cobertura de eventos corporativos e conteúdo estratégico para redes sociais.",
  openGraph: {
    title: "Crie seu filme com a produtora das grandes marcas — Motin Films",
    description:
      "Soluções completas em produção audiovisual — filmes institucionais, eventos corporativos e filmes de conteúdo.",
    url: "https://motinfilms.com.br",
    siteName: "Motin Films",
    images: [
      {
        url: "https://motinfilms.com.br/motin-logo-white.webp?dpl=dpl_BNpMCDP13xRyHR28gDtjssxwFgRX",
        width: 1200,
        height: 630,
        alt: "Motin Films",
      },
    ],
    // optional video as open graph video
    videos: [
      {
        url: "https://motinfilms.com.br/Showreel.mp4",
        secureUrl: "https://motinfilms.com.br/Showreel.mp4",
        type: "video/mp4",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "player",
    title: "Motin Films — Crie seu filme com a produtora das grandes marcas",
    description:
      "Filmes institucionais, cobertura de eventos corporativos e conteúdo para redes sociais.",
    images: ["https://motinfilms.com.br/motin-logo-white.webp?dpl=dpl_BNpMCDP13xRyHR28gDtjssxwFgRX"],
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0e0e0e] text-white">
      <Header />
      <Banner />
      <ServicesSection />

      <footer className="py-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Motin Films — Todos os direitos reservados
      </footer>
    </main>
  );
}
