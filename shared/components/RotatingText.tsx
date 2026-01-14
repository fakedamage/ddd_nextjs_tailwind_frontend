"use client";
import { useEffect, useState } from "react";

const TEXTS = [
  "Conte a história da sua empresa de forma envolvente e profissional",
  "Capture os momentos mais importantes dos seus eventos empresariais",
  "Crie conteúdo estratégico para suas redes sociais e marketing digital",
];

export default function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % TEXTS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-lg text-teal-400 transition-opacity duration-700">
      {TEXTS[index]}
    </p>
  );
}
