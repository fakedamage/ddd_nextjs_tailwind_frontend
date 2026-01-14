"use client";
import React from "react";
import LeadForm from "@/modules/lead/components/LeadForm";

export default function Banner() {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://motinfilms.com.br/Showreel.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* dark overlay to enhance contrast */}
      <div className="absolute inset-0 bg-black/55" />

      {/* center logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="https://motinfilms.com.br/motin-logo-white.webp?dpl=dpl_BNpMCDP13xRyHR28gDtjssxwFgRX"
          alt="Motin Films"
          className="h-28 md:h-36 object-contain pointer-events-auto drop-shadow-xl"
        />
      </div>

      {/* Glass form (bottom-right on large screens, centered on mobile) */}
      <div className="absolute inset-0 flex items-end md:items-center justify-center md:justify-center p-6">
        <div className="w-full max-w-xl md:mr-12">
          <div
            id="contact"
            className="bg-white/6 border border-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-lg text-white"
            style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.6)" }}
          >
            <h4 className="text-xl font-semibold mb-2">Solicite um orçamento</h4>
            <p className="text-gray-300 text-sm mb-4">Conte-nos sua necessidade — respondemos rápido</p>
            <LeadForm />
          </div>
        </div>
      </div>

      {/* subtle hover pointer-effect on video (CSS only) */}
      <style jsx>{`
        section#hero :global(video) {
          transform: scale(1.03);
          transition: transform 600ms ease;
        }
        section#hero:hover :global(video) {
          transform: scale(1.06) translateY(-3px);
        }
      `}</style>
    </section>
  );
}
