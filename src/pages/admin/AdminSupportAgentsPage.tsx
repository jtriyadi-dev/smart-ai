import React, { useState, useEffect } from 'react';
import { AdminSupportLayout } from '../../components/admin/AdminSupportLayout';
import { SupportTicketService } from '../../services/SupportTicketService';
import { SupportAgent } from '../../types';
import { Users, User, ShieldCheck, Activity, Plus, Check } from 'lucide-react';

export const AdminSupportAgentsPage: React.FC = () => {
  const [agents, setAgents] = useState<SupportAgent[]>([]);

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = () => {
    const list = SupportTicketService.getAgents();
    setAgents(list);
  };

  const toggleStatus = (agId: string) => {
    const updated = agents.map((a) => {
      if (a.id === agId) {
        const nextStatus = a.activeStatus === 'AVAILABLE' ? 'BUSY' : a.activeStatus === 'BUSY' ? 'OFFLINE' : 'AVAILABLE';
        return { ...a, activeStatus: nextStatus as any };
      }
      return a;
    });
    setAgents(updated);
    localStorage.setItem('smart_ai_support_agents', JSON.stringify(updated));
  };

  return (
    <AdminSupportLayout activeTab="agents">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" /> Support Team & Agent Workload
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Manajemen agen support, status keaktifan (Available/Busy/Offline), keahlian modul, dan beban ticket aktif.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((ag) => (
            <div key={ag.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold text-sm flex items-center justify-center border border-cyan-500/30">
                    {ag.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{ag.name}</h3>
                    <div className="text-xs text-slate-400">{ag.role}</div>
                  </div>
                </div>

                <button
                  onClick={() => toggleStatus(ag.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition ${
                    ag.activeStatus === 'AVAILABLE'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : ag.activeStatus === 'BUSY'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {ag.activeStatus}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Beban Ticket Aktif:</span>
                  <span className="font-mono font-bold text-cyan-400">{ag.currentWorkload} / {ag.maxConcurrentTickets || 5}</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-500 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (ag.currentWorkload / (ag.maxConcurrentTickets || 5)) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Spesialisasi & Skills:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {ag.skills.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 text-[10px] border border-slate-800 font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminSupportLayout>
  );
};
