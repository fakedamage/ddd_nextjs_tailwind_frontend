'use client';
import React, { useEffect, useState } from 'react';
import { AppUser, getUserFromLocal, removeUserFromLocal } from '@/modules/user/utils/authLocal';
import { supabaseClient } from '../infrastructure/supabaseClient';
import { useRouter } from 'next/navigation';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(getUserFromLocal());
  }, []);

  async function handleLogout() {
    try {
      // encerra sessão no supabase
      await supabaseClient.auth.signOut();
    } catch (err) {
      console.warn('Erro ao chamar signOut', err);
    }
    removeUserFromLocal();
    router.replace('/');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between p-4 border-b border-white/6 bg-black/40">
        <div className="flex items-center gap-4">
          <div className="text-xl font-semibold">Motin Films Dashboard</div>
          {user && <div className="text-sm text-white/80">Olá, <span className="font-medium text-white">{user.email}</span></div>}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/dashboard')} className="px-3 py-1 rounded-full bg-white/6 text-white">Dashboard</button>
          <button onClick={handleLogout} className="px-3 py-1 rounded-full bg-red-600 text-white font-semibold">Logout</button>
        </div>
      </header>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
