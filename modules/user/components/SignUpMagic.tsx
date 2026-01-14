'use client';
import { useState } from 'react';
import InputText from '@/shared/components/InputText';
import { useRouter } from 'next/navigation';

export default function SignUpMagic() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (!email || !email.includes('@')) {
      setError('Informe um e-mail válido');
      return;
    }

    setLoading(true);
    try {
      const redirectTo = `${window.location.origin}/auth/callback`;
      const res = await fetch('/api/auth/magic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, redirectTo, mode: 'signup' }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error?.message || body?.message || 'Erro ao enviar magic link');
      setInfo('E-mail enviado. Abra sua caixa de entrada e confirme o link.');
      // mantemos na UX; o callback da Supabase redirecionará ao clicar no link
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h4 className="text-lg font-medium">Criar conta (magic link)</h4>
      <InputText name="email" placeholder="seu@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      {error && <p className="text-sm text-red-400">{error}</p>}
      {info && <p className="text-sm text-teal-300">{info}</p>}
      <button type="submit" disabled={loading} className="w-full py-2 rounded-full bg-teal-400 text-black font-semibold">
        {loading ? 'Enviando...' : 'Enviar magic link'}
      </button>
    </form>
  );
}
