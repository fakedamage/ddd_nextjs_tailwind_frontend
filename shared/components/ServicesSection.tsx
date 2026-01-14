// src/_shared/components/ServicesSection.tsx
import { Film, Briefcase, BookOpen } from "lucide-react";

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative bg-[#0e0e0e] py-32 overflow-hidden"
    >
      {/* Glow background */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-[900px] h-[900px] bg-teal-500/10 blur-[180px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-sm mb-6">
          <span>🎥</span>
          Audiovisual completo
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold">
          Nossos <span className="text-teal-400">Serviços</span>
        </h2>

        {/* Subtitle */}
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Soluções completas em produção audiovisual
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <ServiceCard
            icon={<Film size={28} />}
            title="Filmes Institucionais"
            description="Conte a história da sua empresa de forma envolvente e profissional"
          />

          <ServiceCard
            icon={<Briefcase size={28} />}
            title="Eventos Corporativos"
            description="Capture os momentos mais importantes dos seus eventos empresariais"
          />

          <ServiceCard
            icon={<BookOpen size={28} />}
            title="Filmes de Conteúdo"
            description="Crie conteúdo estratégico para suas redes sociais e marketing digital"
          />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        relative rounded-2xl p-8
        bg-gradient-to-b from-white/5 to-white/[0.02]
        border border-white/10
        backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-2
        hover:shadow-[0_0_40px_rgba(20,184,166,0.15)]
      "
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 mx-auto mb-6">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-3">{title}</h3>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        {description}
      </p>

      {/* Button */}
      <button
        className="
          px-5 py-2 rounded-md text-sm font-medium
          text-teal-400
          bg-teal-500/10
          hover:bg-teal-500/20
          transition
        "
      >
        Saiba mais
      </button>
    </div>
  );
}
