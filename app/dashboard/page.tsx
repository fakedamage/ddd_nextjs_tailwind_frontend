import React from 'react';
import dynamic from 'next/dynamic';
import LeadList from '@/modules/lead/presentation/LeadList';


export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-white">Dashboard</h1>

      <section className="mb-6">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-black/50 to-black/30 border border-white/6 p-4">
          <LeadList />
        </div>
      </section>
    </div>
  );
}
