"use client";
import React, { useEffect, useState } from "react";

type Props = {
  name: string;
  value?: string; // valor **sem máscara** (ex: "41999999999")
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // receberá evento com target.value = valor sem máscara
  placeholder?: string;
  className?: string;
  label?: string;
  ariaLabel?: string;
};

function onlyDigits(v: string) {
  return v.replace(/\D/g, "");
}

function formatBrazilPhone(digits: string) {
  // digits = only numbers, max 11
  const d = digits.slice(0, 11);
  const len = d.length;
  if (len === 0) return "";
  if (len <= 2) return `(${d}`;
  if (len <= 6) {
    const area = d.slice(0, 2);
    const part = d.slice(2);
    return `(${area}) ${part}`;
  }
  if (len <= 10) {
    const area = d.slice(0, 2);
    const part1 = d.slice(2, len - 4);
    const part2 = d.slice(-4);
    return `(${area}) ${part1}-${part2}`;
  }
  // len === 11 (most common mobile format: (AA) B CCCC-CCCC -> (41) 9 9999-9999)
  const area = d.slice(0, 2);
  const first = d.slice(2, 3);
  const mid = d.slice(3, 7);
  const last = d.slice(7, 11);
  return `(${area}) ${first} ${mid}-${last}`;
}

export default function InputPhone({ name, value = "", onChange, placeholder = "Telefone", className = "", label, ariaLabel }: Props) {
  // displayValue holds the formatted phone shown to the user
  const [display, setDisplay] = useState<string>(formatBrazilPhone(onlyDigits(value)));

  // if parent changes value externally, reflect it formatted
  useEffect(() => {
    setDisplay(formatBrazilPhone(onlyDigits(value)));
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const digits = onlyDigits(raw).slice(0, 11); // limit to 11 digits
    const formatted = formatBrazilPhone(digits);
    setDisplay(formatted);

    // build synthetic event so parent onChange receives { target: { name, value: digits } }
    const synthetic = {
      target: {
        name,
        value: digits,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    onChange(synthetic);
  }

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-sm text-gray-300 mb-1">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        value={display}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        inputMode="tel"
        className={`w-full bg-white/4 border border-white/10 rounded-md px-3 py-2 text-white placeholder-gray-300 focus:outline-none ${className}`}
      />
    </div>
  );
}
