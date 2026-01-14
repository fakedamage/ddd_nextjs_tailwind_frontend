import Link from "next/link";
import RotatingText from "./RotatingText";

export default function AuthAside() {
  return (
    <aside className="hidden lg:flex w-[45%] items-center justify-center bg-black relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-[600px] h-[600px] bg-teal-500/10 blur-[160px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-md text-center px-10">

        <Link
          href="/"
        >
          <img
            src="https://motinfilms.com.br/motin-logo-white.webp?dpl=dpl_BNpMCDP13xRyHR28gDtjssxwFgRX"
            alt="Motin Films"
            className="h-16 mx-auto mb-8 object-contain"
          />
        </Link>
        <h2 className="text-3xl font-bold mb-6 text-white">
          <span className="text-teal-400">Audiovisual</span> que gera impacto
        </h2>

        <RotatingText />
      </div>
    </aside >
  );
}
