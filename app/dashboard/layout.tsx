import React from 'react';
import DashboardShell from '@/shared/presentation/DashboardShell';

export const metadata = {
  title: 'Dashboard',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // O DashboardShell é cliente (mostra nome, logout etc). Mantemos o layout aqui e renderizamos children.
  return (
    <html lang="pt-br">
      <body>
        <div className="min-h-screen bg-slate-900 text-white">
          <DashboardShell>{children}</DashboardShell>
        </div>
      </body>
    </html>
  );
}
