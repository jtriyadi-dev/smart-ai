import React, { useState } from 'react';
import { CheckSquare, CheckCircle2, XCircle, Clock, FileText, DollarSign, Globe, Database } from 'lucide-react';
import { AdminControlService } from '../../services/AdminControlService';
import { AdminApprovalItem } from '../../types';

export const AdminApprovalsPage: React.FC = () => {
  const [approvals, setApprovals] = useState<AdminApprovalItem[]>(AdminControlService.getApprovals());
  const [filter, setFilter] = useState<'REVIEW' | 'APPROVED' | 'REJECTED' | 'ALL'>('REVIEW');

  const handleAction = (id: string, status: 'APPROVED' | 'REJECTED') => {
    AdminControlService.updateApprovalStatus(id, status);
    setApprovals(AdminControlService.getApprovals());
  };

  const filteredItems = filter === 'ALL' ? approvals : approvals.filter((a) => a.status === filter);

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 font-mono text-xs font-bold">
        <button
          onClick={() => setFilter('REVIEW')}
          className={`px-3 py-1.5 rounded-xl ${
            filter === 'REVIEW' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          Menunggu Review ({approvals.filter((a) => a.status === 'REVIEW').length})
        </button>
        <button
          onClick={() => setFilter('APPROVED')}
          className={`px-3 py-1.5 rounded-xl ${
            filter === 'APPROVED' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          Disetujui ({approvals.filter((a) => a.status === 'APPROVED').length})
        </button>
        <button
          onClick={() => setFilter('REJECTED')}
          className={`px-3 py-1.5 rounded-xl ${
            filter === 'REJECTED' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          Ditolak ({approvals.filter((a) => a.status === 'REJECTED').length})
        </button>
        <button
          onClick={() => setFilter('ALL')}
          className={`px-3 py-1.5 rounded-xl ${
            filter === 'ALL' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          Semua ({approvals.length})
        </button>
      </div>

      {/* Approvals List */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="glass-card p-12 text-center text-slate-500 font-mono text-xs rounded-2xl border border-white/10">
            Tidak ada item persetujuan pada kategori ini.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-bold">
                    {item.itemType}
                  </span>
                  <span className="text-slate-400">Req by: {item.requestedBy}</span>
                  <span className="text-slate-500">({item.requestedAt})</span>
                </div>

                <h3 className="text-base font-bold text-white font-display">{item.title}</h3>

                {item.notes && <p className="text-xs text-amber-300/90 font-sans italic bg-amber-950/30 p-2 rounded-lg border border-amber-900/40">Catatan: {item.notes}</p>}
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                {item.status === 'REVIEW' ? (
                  <>
                    <button
                      onClick={() => handleAction(item.id, 'APPROVED')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleAction(item.id, 'REJECTED')}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </>
                ) : (
                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-mono font-bold ${
                      item.status === 'APPROVED'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}
                  >
                    STATUS: {item.status}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
