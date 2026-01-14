'use client';
import React, { useState } from 'react';
import AuthCard from './AuthCard';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import SignUpMagic from './SignUpMagic';

export default function AuthToggle() {
  const [mode, setMode] = useState<'signin' | 'signup' | 'signupMagic'>('signin');

  return (
    <div className="flex gap-8 items-start">
      <div className="hidden md:block w-1/3 text-white">
        <h2 className="text-3xl font-bold mb-4">Conte a história da sua empresa</h2>
        <p className="opacity-80">Textos rotativos aqui — destaque valores, missão e diferencial.</p>
      </div>

      <div className="w-full md:w-2/3">
        <div className="flex gap-2 mb-4 justify-end">
          <button onClick={() => setMode('signin')} className={`px-4 py-2 rounded-full ${mode === 'signin' ? 'bg-teal-500 text-black' : 'bg-white/6 text-white'}`}>Sign In</button>
          <button onClick={() => setMode('signup')} className={`px-4 py-2 rounded-full ${mode === 'signup' ? 'bg-teal-500 text-black' : 'bg-white/6 text-white'}`}>Sign Up (senha)</button>
          <button onClick={() => setMode('signupMagic')} className={`px-4 py-2 rounded-full ${mode === 'signupMagic' ? 'bg-teal-500 text-black' : 'bg-white/6 text-white'}`}>Sign Up (magic)</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AuthCard title="Acessar / Entrar">
            <SignInForm />
          </AuthCard>

          {/* Ao selecionar 'signup' mostramos o card de cadastro com senha */}
          <AuthCard title={mode === 'signup' ? 'Criar conta (senha)' : 'Criar conta (magic link)'}>
            {mode === 'signup' ? <SignUpForm /> : <SignUpMagic />}
          </AuthCard>
        </div>
      </div>
    </div>
  );
}
