import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { CustomerPortalLayout } from '../../components/portal/CustomerPortalLayout';
import { CustomerPortalService, CustomerSession } from '../../services/CustomerPortalService';
import { CustomerDashboardService } from '../../services/CustomerDashboardService';
import {
  FolderKanban,
  FileText,
  Receipt,
  LifeBuoy,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Sparkles,
  Building2,
  TrendingUp,
  FileCheck,
  PlusCircle,
  MessageSquare,
  Bot
} from 'lucide-react';

export const CustomerDashboardPage: React.FC = () => {
  const { navigate } = useRouter();
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [kpis, setKpis] = useState<any>(null);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [consultTopic, setConsultTopic] = useState('');
  const [consultMessage, setConsultMessage] = useState('');
  const [consultSent, setConsultSent] = useState(false);

  useEffect(() => {
    const s = CustomerPortalService.getCurrentSession();
    if (s) {
      setSession(s);
      const kpiData = CustomerDashboardService.getDashboardKPIs(s.company.id, s.company.name);
      setKpis(kpiData);
    }
  }, []);

  if (!session || !kpis) return null;

  const handleRequestConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    CustomerPortalService.requestConsultation(session.company.id, session.user.id, session.user.name, {
      topic: consultTopic || 'Pengembangan Fitur Baru',
      preferredDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      message: consultMessage
    });
    setConsultSent(true);
    setTimeout(() => {
      setConsultSent(false);
      setConsultationModalOpen(false);
      setConsultTopic('');
      setConsultMessage('');
    }, 2000);
  };

  const fmtCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <CustomerPortalLayout activePath="/portal/dashboard">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-[#0d1527] to-[#071d33] border border-slate-800 p-6 md:p-8 mb-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
              <Building2 className="w-3.5 h-3.5" /> Client Portal Overview
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Welcome, {session.company.name}
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
              Manage your projects, proposals, invoices, and support in one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setConsultationModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Request Consultation
            </button>
            <button
              onClick={() => navigate('/portal/tickets/new')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-cyan-400" /> Open Ticket
            </button>
          </div>
        </div>

        {/* Decorative Grid Accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Active Projects</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{kpis.activeProjectsCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Dari total {kpis.totalProjectsCount} proyek ({kpis.completedProjectsCount} selesai)
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Pending Proposals</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{kpis.pendingProposalsCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Menunggu peninjauan/diskusi</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Outstanding Invoices</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-400">{kpis.outstandingInvoicesCount}</div>
          <div className="text-[11px] text-slate-400 mt-1 truncate">
            {fmtCurrency(kpis.totalOutstandingAmount)}
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Open Tickets</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <LifeBuoy className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{kpis.openTicketsCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Support teknis & kendala aktif</div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Left Column: Active Projects & Financial Summary */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Projects Widget */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base font-bold text-white">Active Projects</h2>
              </div>
              <button
                onClick={() => navigate('/portal/projects')}
                className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
              >
                Lihat Semua Proyek <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {kpis.activeProjects.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                No active projects yet. Silakan ajukan konsultasi untuk memulai proyek baru.
              </div>
            ) : (
              <div className="space-y-4">
                {kpis.activeProjects.map((p: any) => (
                  <div
                    key={p.id}
                    onClick={() => navigate(`/portal/projects/${p.id}`)}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition">
                          {p.projectName}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{p.description}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shrink-0">
                        {p.status}
                      </span>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                        <span>Progress Pengembangan</span>
                        <span className="font-bold text-cyan-400">{p.progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${p.progressPercentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <span>Estimasi Selesai: <strong className="text-slate-200">{p.expectedCompletion}</strong></span>
                      <span>PM: <strong className="text-slate-200">{p.projectManager}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Financial Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold text-white">Outstanding Invoices</h2>
              </div>
              <button
                onClick={() => navigate('/portal/invoices')}
                className="text-xs text-cyan-400 hover:underline font-semibold flex items-center gap-1"
              >
                Kelola Invoice <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {kpis.outstandingInvoices.length === 0 ? (
              <div className="p-6 text-center text-emerald-400 text-xs bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Semua tagihan perusahaan Anda telah lunas (No outstanding invoices).
              </div>
            ) : (
              <div className="space-y-3">
                {kpis.outstandingInvoices.map((inv: any) => (
                  <div
                    key={inv.id}
                    onClick={() => navigate('/portal/invoices')}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4 hover:border-amber-500/40 cursor-pointer transition"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">Invoice #{inv.invoiceNumber}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Jatuh Tempo: {inv.dueDate}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-extrabold text-amber-400">
                        {fmtCurrency(inv.outstandingAmount)}
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase">
                        {inv.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Upcoming Milestones & Open Tickets */}
        <div className="space-y-8">
          {/* Upcoming Milestones */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white">Upcoming Milestones</h2>
            </div>

            {kpis.upcomingMilestones.length === 0 ? (
              <div className="text-xs text-slate-500 text-center py-4">Belum ada milestone mendatang.</div>
            ) : (
              <div className="space-y-3">
                {kpis.upcomingMilestones.map((m: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1">
                    <div className="font-semibold text-white">{m.milestoneName}</div>
                    <div className="text-[11px] text-slate-400">{m.projectName}</div>
                    <div className="flex items-center justify-between text-[10px] text-cyan-400 pt-1">
                      <span>Jatuh tempo: {m.dueDate}</span>
                      <span className="font-bold">{m.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Open Tickets */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <LifeBuoy className="w-5 h-5 text-emerald-400" />
                <h2 className="text-base font-bold text-white">Open Tickets</h2>
              </div>
              <button
                onClick={() => navigate('/portal/tickets')}
                className="text-xs text-cyan-400 hover:underline font-semibold"
              >
                Lihat Semua
              </button>
            </div>

            {kpis.openTickets.length === 0 ? (
              <div className="text-xs text-slate-500 text-center py-4">Tidak ada tiket support terbuka.</div>
            ) : (
              <div className="space-y-3">
                {kpis.openTickets.map((t: any) => (
                  <div
                    key={t.id}
                    onClick={() => navigate('/portal/tickets')}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs hover:border-emerald-500/40 cursor-pointer transition"
                  >
                    <div className="font-semibold text-white line-clamp-1">[{t.ticketNumber}] {t.subject}</div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-bold uppercase">
                        {t.status}
                      </span>
                      <span>Prioritas: {t.priority}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Consultation Request Modal */}
      {consultationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0d131f] border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-white mb-1">Request Technical Consultation</h3>
            <p className="text-xs text-slate-400 mb-4">
              Ajukan diskusi teknis dengan tim Solution Architect SMART-AI.ID untuk proyek baru atau add-on modul.
            </p>

            {consultSent ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Permintaan konsultasi Anda telah dikirim!
              </div>
            ) : (
              <form onSubmit={handleRequestConsultation} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Topik Konsultasi</label>
                  <input
                    type="text"
                    required
                    value={consultTopic}
                    onChange={(e) => setConsultTopic(e.target.value)}
                    placeholder="misal: Integrasi Modul AI Vision atau Pembahasan SLA"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Pesan / Catatan Tambahan</label>
                  <textarea
                    rows={3}
                    value={consultMessage}
                    onChange={(e) => setConsultMessage(e.target.value)}
                    placeholder="Jelaskan kebutuhan ringkas Anda..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setConsultationModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                  >
                    Kirim Permintaan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </CustomerPortalLayout>
  );
};
