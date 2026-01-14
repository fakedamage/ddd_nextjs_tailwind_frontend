"use client";
import { useState } from "react";
import InputText from "@/shared/components/InputText";
import InputPassword from "@/shared/components/InputPassword";
import { useRouter } from "next/navigation";

type FormState = {
  name: string;
  email: string;
  password: string;
};

export default function SignUpForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
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

    if (!form.name || !form.email || !form.password) {
      setError("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });

      const body = await res.json();
      if (!res.ok) throw new Error(body?.error?.message || body?.message || "Erro ao criar conta");

      setInfo("Conta criada com sucesso. Verifique seu e-mail se houver confirmação.");
      // opcional: redirecionar para painel ou forçar reload
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold text-teal-300">Criar conta</h3>

      <InputText
        name="name"
        value={form.name}
        onChange={onChange}
        placeholder="Nome"
      />

      <InputText
        name="email"
        value={form.email}
        onChange={onChange}
        placeholder="E-mail"
        type="email"
      />

      <InputPassword
        name="password"
        value={form.password}
        onChange={onChange}
        placeholder="Senha"
      />

      {error && <p className="text-sm text-red-400">{error}</p>}
      {info && <p className="text-sm text-teal-300">{info}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-white text-black rounded-md font-medium disabled:opacity-60"
      >
        {loading ? "Criando..." : "Criar conta"}
      </button>
    </form>
  );
}
