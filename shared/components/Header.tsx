"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { supabaseClient } from "@/shared/infrastructure/supabaseClient";

export default function Header() {
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      const { data } = await supabaseClient.auth.getSession();
      if (!mounted) return;

      setIsLogged(!!data?.session);
      setLoading(false);
    }

    checkAuth();

    // escuta mudanças de auth (login/logout)
    const { data: sub } = supabaseClient.auth.onAuthStateChange(() => {
      checkAuth();
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 z-30">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="https://motinfilms.com.br/motin-logo-white.webp?dpl=dpl_BNpMCDP13xRyHR28gDtjssxwFgRX"
            alt="Motin Films"
            className="h-10 w-auto"
          />
        </div>

        <nav className="hidden md:flex gap-6 items-center text-gray-200">
          <a className="hover:text-white transition" href="#services">
            Serviços
          </a>
          <a className="hover:text-white transition" href="#contact">
            Contato
          </a>

          {/* evita flicker enquanto carrega */}
          {!loading && (
            <Link
              href={isLogged ? "/dashboard" : "/sign-in"}
              className="px-4 py-2 rounded-md bg-white text-black font-medium hover:brightness-95"
              aria-label={isLogged ? "Acessar dashboard" : "Entrar"}
            >
              {isLogged ? "Dashboard" : "Entrar"}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
