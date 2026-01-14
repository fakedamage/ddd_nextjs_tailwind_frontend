"use client";
import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { LogIn, UserPlus, WandSparklesIcon } from "lucide-react";
import SignUpMagic from "./SignUpMagic";

export default function AuthCard() {
  const [mode, setMode] = useState<"signin" | "signup" | "signup_magic">("signin");

  return (
    <div
      className="
        w-full max-w-md p-8 rounded-2xl
        bg-gradient-to-b from-white/5 to-white/[0.02]
        border border-white/10
        backdrop-blur-xl
        shadow-[0_0_40px_rgba(20,184,166,0.15)]
        transition-all duration-500
      "
    >
      {/* Toggle */}
      <div className="flex gap-2 mb-8">
        <ToggleButton
          active={mode === "signin"}
          icon={<LogIn size={18} />}
          onClick={() => setMode("signin")}
        >
          Entrar
        </ToggleButton>

        <ToggleButton
          active={mode === "signup"}
          icon={<UserPlus size={18} />}
          onClick={() => setMode("signup")}
        >
          Criar conta
        </ToggleButton>
      </div>

      {/* Forms */}
      <div className="relative">
        <div
          className={`transition-all duration-500 ${
            mode === "signin"
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-4 pointer-events-none absolute inset-0"
          }`}
        >
          <SignInForm />
        </div>

        <div
          className={`transition-all duration-500 ${
            mode === "signup"
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-4 pointer-events-none absolute inset-0"
          }`}
        >
          <SignUpForm />
        </div>

      </div>
    </div>
  );
}

function ToggleButton({
  active,
  icon,
  children,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full text-sm
        transition
        ${
          active
            ? "bg-teal-500/20 text-teal-400"
            : "bg-white/5 text-white/60 hover:bg-white/10"
        }
      `}
    >
      <span className="w-7 h-7 rounded-full bg-teal-500/10 flex items-center justify-center">
        {icon}
      </span>
      {children}
    </button>
  );
}
