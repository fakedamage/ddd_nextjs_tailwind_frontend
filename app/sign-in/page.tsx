'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthAside from '@/shared/components/AuthAside';
import AuthCard from '@/modules/user/components/AuthCard';
import { supabaseClient } from '@/shared/infrastructure/supabaseClient';

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      const { data } = await supabaseClient.auth.getSession();

      if (!mounted) return;

      if (data?.session) {
        // usuário já está autenticado → dashboard
        router.replace('/dashboard');
      }
    }

    checkSession();
    return () => {
      mounted = false;
    };
  }, [router]);

  return (
    <main className="min-h-screen bg-[#0e0e0e] flex">
      {/* Left side */}
      <AuthAside />

      {/* Right side */}
      <div className="flex-1 flex items-center justify-center px-10">
        <AuthCard />
      </div>
    </main>
  );
}
