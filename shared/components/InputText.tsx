"use client";
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  placeholder?: string;
};

export default function InputText({ name, label, placeholder, className = "", ...rest }: Props) {
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
        placeholder={placeholder}
        {...rest}
        className={`w-full bg-white/4 border border-white/10 rounded-md px-3 py-2 text-white placeholder-gray-300 focus:outline-none ${className}`}
      />
    </div>
  );
}
