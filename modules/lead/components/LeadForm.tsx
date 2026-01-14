// src/modules/lead/components/LeadForm.tsx
"use client";
import React, { useState } from "react";
import InputText from "@/shared/components/InputText";
import InputPhone from "@/shared/components/InputPhone";

type LeadFormState = {
  name: string;
  email: string;
  phone: string; // armazenaremos SEM máscara, ex: 41999999999
  need: "INSTITUTIONAL_FILMS" | "CORPORATE_EVENTS" | "CONTENT_FILMS" | "";
};

export default function LeadForm() {
  const [form, setForm] = useState<LeadFormState>({
    name: "",
    email: "",
    phone: "",
    need: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!form.name || !form.email || !form.need) {
      setError("Preencha nome, e-mail e necessidade.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || null, // aqui já está SEM máscara
          need: form.need,
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error((json && json.error) || "Erro ao enviar");
      }

      setMessage("Mensagem enviada! Em breve entraremos em contato.");
      setForm({ name: "", email: "", phone: "", need: "" });
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InputText
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Nome"
          aria-label="Nome"
        />
        <InputText
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="E-mail"
          aria-label="E-mail"
          type="email"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InputPhone
          name="phone"
          value={form.phone}
          onChange={onChange}
          placeholder="Telefone"
          ariaLabel="Telefone"
        />

        <select
          name="need"
          value={form.need}
          onChange={onChange}
          className="w-full bg-white/4 border border-white/10 rounded-md px-3 py-2 text-white placeholder-gray-300 focus:outline-none"
          aria-label="Necessidade"
        >
          <option value="">Selecione a necessidade</option>
          <option value="INSTITUTIONAL_FILMS">Filmes Institucionais</option>
          <option value="CORPORATE_EVENTS">Eventos Corporativos</option>
          <option value="CONTENT_FILMS">Filmes de Conteúdo</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="
          px-4 py-2 rounded-md bg-white text-black font-medium hover:brightness-95 cursor-pointer"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
        <span className="text-sm text-gray-300">{message ? message : null}</span>
        {error && <p className="text-sm text-teal-400">{error}</p>}
      </div>


    </form>
  );
}
