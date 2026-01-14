"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function InputPassword({
  name,
  value,
  onChange,
  placeholder = "Senha",
}: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={visible ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full bg-white/4 border border-white/10 rounded-md
          px-3 py-2 pr-10 text-white placeholder-gray-300
          focus:outline-none
        "
      />

      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="
          absolute right-3 top-1/2 -translate-y-1/2
          text-white/50 hover:text-white transition
        "
        aria-label="Mostrar/ocultar senha"
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
