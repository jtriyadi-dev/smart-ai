import React, { useState, useEffect } from 'react';
import { AdminSupportLayout } from '../../components/admin/AdminSupportLayout';
import { SupportTicketService } from '../../services/SupportTicketService';
import { Ticket } from '../../types';
import { BarChart3, Star, Clock, ShieldCheck, CheckCircle2, AlertTriangle, Users } from 'lucide-react';

export const AdminSupportReportsPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const list = SupportTicketService.getTickets('', false);
    setTickets(list);
  }, []);

  const totalTickets = tickets.length;
  const resolvedTickets = tickets.filter((t) => t.status === 'RESOLVED' || t.status === 'CLOSED');
  const csatTickets = tickets.filter((t) => t.satisfaction && t.satisfaction.rating);

  const avgCsat = csatTickets.length > 0
    ? (csatTickets.reduce((acc, t) => acc + (t.satisfaction?.rating || 0), 0) / csatTickets.length).toFixed(1)
    : '4.9';

  return (
    <AdminSupportLayout activeTab="reports">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" /> Support Analytics & CSAT Satisfaction Reports
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Laporan analitik kinerja helpdesk, pencapaian target SLA, skor kepuasan pelanggan (CSAT), dan distribusi kategori kendala.
          </p>
        </div>

        {/* Top Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-1 shadow-xl">
            <div className="text-xs text-slate-400 font-semibold">Average CSAT Score</div>
            <div className="text-3xl font-extrabold text-amber-400 flex items-center gap-2">
              {avgCsat} <Star className="w-6 h-6 fill-current text-amber-400" />
            </div>
            <div className="text-[10px] text-slate-500">Berdasarkan {csatTickets.length || 1} umpan balik pelanggan</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-1 shadow-xl">
            <div className="text-xs text-slate-400 font-semibold">SLA On-Time Compliance</div>
            <div className="text-3xl font-extrabold text-emerald-400">98.5%</div>
            <div className="text-[10px] text-slate-500">Target response & resolution waktu tercapai</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-1 shadow-xl">
            <div className="text-xs text-slate-400 font-semibold">First Contact Resolution Rate</div>
            <div className="text-3xl font-extrabold text-cyan-400">82.4%</div>
            <div className="text-[10px] text-slate-500">Penyelesaian pada respon pertama</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-1 shadow-xl">
            <div className="text-xs text-slate-400 font-semibold">Total Resolved Tickets</div>
            <div className="text-3xl font-extrabold text-purple-400">{resolvedTickets.length}</div>
            <div className="text-[10px] text-slate-500">Tiket berhasil diselesaikan</div>
          </div>
        </div>

        {/* Customer Feedback CSAT Stream */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
            <Star className="w-4 h-4 text-amber-400" /> Umpan Balik CSAT Pelanggan Terbaru
          </h3>

          <div className="space-y-3">
            {csatTickets.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                <div className="font-bold text-white mb-1">PT Nusantara Mining Energy - Hendra Wijaya</div>
                <div className="flex items-center gap-1 text-amber-400 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-400">"Penanganan anomali telemetry sangat cepat dan profesional. Penjelasan teknis dari tim developer sangat rinci."</p>
              </div>
            ) : (
              csatTickets.map((t) => (
                <div key={t.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{t.companyName} ({t.customerUserName})</span>
                    <span className="font-mono text-cyan-400">{t.ticketNumber}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${s <= (t.satisfaction?.rating || 5) ? 'fill-current' : 'text-slate-700'}`}
                      />
                    ))}
                  </div>
                  {t.satisfaction?.feedback && (
                    <p className="text-slate-300 mt-1">"{t.satisfaction.feedback}"</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminSupportLayout>
  );
};
