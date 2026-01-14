'use client';
import React, { useEffect, useState } from 'react';
import { supabaseClient } from '@/shared/infrastructure/supabaseClient';
import { Lead } from '@/modules/lead/domain/Lead';
import { PhoneCallIcon } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { LEAD_NEED_ENUM_LABELS } from '../domain/LeadEnums';


// Simple confirm modal component (inline)
function ConfirmModal({
  open,
  title,
  description,
  onCancel,
  onConfirm,
  loading,
}: {
  open: boolean;
  title: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-white/6">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        {description && <p className="text-sm text-white/80 mb-4">{description}</p>}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-3 py-1 rounded-full bg-white/6 text-white"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 rounded-full bg-red-600 text-black font-semibold"
            disabled={loading}
          >
            {loading ? 'Excluindo...' : 'Confirmar exclusão'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LeadList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // delete modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetLead, setTargetLead] = useState<Lead | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const { data } = await supabaseClient.auth.getSession();
        const accessToken = data?.session?.access_token ?? null;
        if (!accessToken) throw new Error('Usuário não autenticado. Faça login.');

        const res = await fetch('/api/leads', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const body = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(body?.error?.message || body?.message || `Erro ${res.status}`);
        }

        const rows = body?.data ?? body ?? [];
        const entities = rows.map((row: any) => Lead.fromRow(row));
        if (mounted) {
          setLeads(entities);
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Erro ao carregar leads:', err);
        if (mounted) {
          setError(err.message ?? 'Erro inesperado');
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  async function handleDelete(lead: Lead) {
    setTargetLead(lead);
    setConfirmOpen(true);
  }

  async function confirmDelete() {
    if (!targetLead) return;
    setDeleting(true);
    setError(null);

    try {
      const { data } = await supabaseClient.auth.getSession();
      const accessToken = data?.session?.access_token ?? null;
      if (!accessToken) throw new Error('Usuário não autenticado.');

      const res = await fetch(`/api/leads?id=${encodeURIComponent(targetLead.id)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const body = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(body?.error?.message || body?.message || `Erro ${res.status}`);
      }

      // remove do estado local sem recarregar a lista inteira (mais rápido)
      setLeads((prev) => prev.filter((l) => l.id !== targetLead.id));
      setConfirmOpen(false);
      setTargetLead(null);
    } catch (err: any) {
      console.error('Erro ao excluir lead:', err);
      setError(err.message ?? 'Erro ao excluir');
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <div className="p-6">Carregando leads...</div>;
  if (error) return <div className="p-6 text-red-400">Erro: {String(error)}</div>;
  if (leads.length === 0) return <div className="p-6 text-white/80">Nenhum lead encontrado.</div>;

  return (
    <div className="space-y-3">
      {leads.map((lead) => (
        <div key={lead.id} className="p-4 rounded-2xl bg-black/50 border border-white/6 flex items-start justify-between">
          <div>
            <div className="font-semibold text-white">{lead.name}</div>
            <div className="text-sm text-white/70">{lead.email}</div>
            {lead.phone && <div className="text-sm text-white/60">{lead.phone}</div>}
            {lead.need && <div className="text-xs mt-2 inline-block px-2 py-1 rounded-full text-black/80 bg-teal-400 font-bold">{LEAD_NEED_ENUM_LABELS[lead.need]}</div>}
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="text-xs text-white/60">{lead.createdAt ? new Date(lead.createdAt).toLocaleString() : ''}</div>

            {/* delete icon button */}
            <button
              title="Excluir lead"
              onClick={() => handleDelete(lead)}
              className="p-2 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 transition-transform cursor-pointer"
              aria-label={`Excluir lead ${lead.name}`}
            >
              
              <Trash2 className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      ))}

      <ConfirmModal
        open={confirmOpen}
        title="Confirmar exclusão"
        description={`Deseja realmente excluir o lead "${targetLead?.name}"? Essa ação não pode ser desfeita.`}
        onCancel={() => {
          setConfirmOpen(false);
          setTargetLead(null);
        }}
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </div>
  );
}
