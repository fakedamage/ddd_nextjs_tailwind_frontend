'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/shared/infrastructure/supabaseClient';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      // 🔁 Fluxo moderno (PKCE)
      if (code) {
        const { error } = await supabaseClient.auth.exchangeCodeForSession(code);

        if (error) {
          console.error('Erro ao trocar code por sessão', error);
          router.replace('/sign-in?error=auth');
          return;
        }

        router.replace('/dashboard');
        return;
      }

      // 🔎 Fallback: sessão já existente
      const { data } = await supabaseClient.auth.getSession();
      if (data.session) {
        router.replace('/dashboard');
        return;
      }

      // ❌ Nada válido
      router.replace('/sign-in');
    };

    handleAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Validando autenticação...
    </div>
  );
}
