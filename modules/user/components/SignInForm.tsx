"use client";
import { useState } from "react";
import InputText from "@/shared/components/InputText";
import InputPassword from "@/shared/components/InputPassword";
import { useRouter } from "next/navigation";

type FormState = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const router = useRouter();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (!form.email) {
      setError("Preencha o e-mail.");
      return;
    }

    setLoading(true);

    try {
      // Se user forneceu senha -> login por senha
      if (form.password) {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, password: form.password }),
        });

        const body = await res.json();
        if (!res.ok) throw new Error(body?.error?.message || body?.message || "Erro ao autenticar");

        // login bem-sucedido -> supabase devolve session/user
        // Você pode salvar a sessão no cliente, redirecionar, etc.
        setInfo("Login bem-sucedido. Redirecionando...");
        // opcional: forçar reload para que o session provider pegue a sessão
        router.refresh();
      } else {
        // Sem senha -> enviar magic link
        const res = await fetch("/api/auth/magic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email }),
        });

        const body = await res.json();
        if (!res.ok) throw new Error(body?.error?.message || body?.message || "Erro ao enviar magic link");

        setInfo("Magic link enviado. Verifique sua caixa de entrada.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Erro ao autenticar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold text-teal-300">Acessar painel</h3>

      <InputText
        name="email"
        value={form.email}
        onChange={onChange}
        placeholder="seu@exemplo.com"
        type="email"
      />

      <InputPassword
        name="password"
        value={form.password}
        onChange={onChange}
        placeholder="deixe vazio para magic link"
      />

      {error && <p className="text-sm text-red-400">{error}</p>}
      {info && <p className="text-sm text-teal-300">{info}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-white text-black rounded-md font-medium disabled:opacity-60"
      >
        {loading ? "Processando..." : form.password ? "Entrar" : "Enviar magic link"}
      </button>
    </form>
  );
}
