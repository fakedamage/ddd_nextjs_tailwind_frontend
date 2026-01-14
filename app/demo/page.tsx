export default function DemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center px-4">
      {/* Glow background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-teal-500/20 blur-[140px] rounded-full" />
      </div>

      {/* Glass card */}
      <section className="relative z-10 w-full max-w-5xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_rgba(45,212,191,0.15)] p-6 md:p-10">
        {/* Title */}
        <header className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-teal-300 tracking-wide drop-shadow-[0_0_12px_rgba(45,212,191,0.6)]">
            Apresentação do Projeto
          </h1>
          <p className="mt-2 text-zinc-400">
            Visualização da aplicação em execução
          </p>
        </header>

        {/* Video container */}
        <div className="relative rounded-xl overflow-hidden border border-teal-400/20 shadow-[0_0_40px_rgba(45,212,191,0.25)]">
          <video
            src="/docs/demo.mp4"
            controls
            playsInline
            preload="metadata"
            className="w-full h-auto rounded-xl bg-black"
          />
        </div>

      </section>
    </main>
  );
}
