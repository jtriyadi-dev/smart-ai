import React, { useState, useEffect } from 'react';
import {
  Users,
  Building2,
  Briefcase,
  FileText,
  DollarSign,
  LifeBuoy,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  Layers,
  Search,
  Filter
} from 'lucide-react';
import { AdminControlService } from '../../services/AdminControlService';
import { useRouter } from '../../lib/router';

export const AdminDashboardHome: React.FC = () => {
  const { navigate } = useRouter();
  const [dateFilter, setDateFilter] = useState<'7d' | '30d' | '90d' | '12m'>('30d');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const overview = AdminControlService.getDashboardOverview(dateFilter);
    setData(overview);
  }, [dateFilter]);

  if (!data) return <div className="p-8 text-center font-mono text-cyan-400">Memuat Dashboard SMART-AI.ID...</div>;

  const { kpis, pipelineCounts, projectHealth, supportSummary, invoiceSummary, recentLeads, recentProjects, recentProposals, aiTelemetry, aiInsight, alerts } = data;

  return (
    <div className="space-y-8">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-r from-slate-900 via-indigo-950/80 to-purple-950/60 border border-white/10 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>ENTERPRISE CONTROL CENTER</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight">
            Good Morning, Admin
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Here's what's happening with SMART-AI.ID today. Seluruh pipeline sales, delivery, keuangan, dan AI telemetry beroperasi optimal.
          </p>
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => navigate('/admin/developer')}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-600/20 cursor-pointer"
            >
              <span>Developer Control Panel</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Global Date Filter Controls */}
        <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 z-10 text-xs font-mono">
          <Filter className="w-3.5 h-3.5 text-cyan-400 ml-2" />
          <button
            onClick={() => setDateFilter('7d')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              dateFilter === '7d' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setDateFilter('30d')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              dateFilter === '30d' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            30 Days
          </button>
          <button
            onClick={() => setDateFilter('90d')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              dateFilter === '90d' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            90 Days
          </button>
          <button
            onClick={() => setDateFilter('12m')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              dateFilter === '12m' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            12 Months
          </button>
        </div>
      </div>

      {/* KPI CARDS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {/* Card 1: Total Leads */}
        <button
          onClick={() => navigate('/admin/leads')}
          className="glass-card rounded-2xl p-4 border border-white/10 space-y-2 text-left hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Leads</span>
            <Users className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-white font-display group-hover:text-cyan-400 transition-colors">
            {kpis.totalLeads}
          </div>
          <div className="text-[10px] text-emerald-400 font-mono font-bold">{kpis.comparison.leadGrowth} vs prev</div>
        </button>

        {/* Card 2: New Leads */}
        <button
          onClick={() => navigate('/admin/leads')}
          className="glass-card rounded-2xl p-4 border border-white/10 space-y-2 text-left hover:border-purple-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>New Leads</span>
            <Sparkles className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-cyan-400 font-display">{kpis.newLeads}</div>
          <div className="text-[10px] text-slate-400 font-mono">Memerlukan follow-up</div>
        </button>

        {/* Card 3: Active Customers */}
        <button
          onClick={() => navigate('/admin/customers')}
          className="glass-card rounded-2xl p-4 border border-white/10 space-y-2 text-left hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Clients</span>
            <Building2 className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-white font-display group-hover:text-indigo-400 transition-colors">
            {kpis.activeCustomers}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">Active Retainers</div>
        </button>

        {/* Card 4: Active Projects */}
        <button
          onClick={() => navigate('/admin/projects')}
          className="glass-card rounded-2xl p-4 border border-white/10 space-y-2 text-left hover:border-emerald-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Projects</span>
            <Briefcase className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-display">{kpis.activeProjects}</div>
          <div className="text-[10px] text-emerald-400 font-mono font-bold">{kpis.comparison.projectDeliveryRate} rate</div>
        </button>

        {/* Card 5: Pending Proposals */}
        <button
          onClick={() => navigate('/admin/proposals')}
          className="glass-card rounded-2xl p-4 border border-white/10 space-y-2 text-left hover:border-amber-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Proposals</span>
            <FileText className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400 font-display">{kpis.pendingProposals}</div>
          <div className="text-[10px] text-slate-400 font-mono">In Review</div>
        </button>

        {/* Card 6: Outstanding Invoices */}
        <button
          onClick={() => navigate('/admin/invoices')}
          className="glass-card rounded-2xl p-4 border border-white/10 space-y-2 text-left hover:border-rose-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Invoices</span>
            <DollarSign className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-rose-400 font-display">{kpis.outstandingInvoicesCount}</div>
          <div className="text-[10px] text-rose-400 font-mono font-bold">Outstanding</div>
        </button>

        {/* Card 7: Open Tickets */}
        <button
          onClick={() => navigate('/admin/support')}
          className="glass-card rounded-2xl p-4 border border-white/10 space-y-2 text-left hover:border-blue-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Support</span>
            <LifeBuoy className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-blue-400 font-display">{kpis.openTickets}</div>
          <div className="text-[10px] text-slate-400 font-mono">Open Tickets</div>
        </button>

        {/* Card 8: Monthly Revenue */}
        <button
          onClick={() => navigate('/admin/invoices')}
          className="glass-card rounded-2xl p-4 border border-white/10 space-y-2 col-span-2 sm:col-span-1 text-left hover:border-emerald-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl font-extrabold text-emerald-400 font-display">
            Rp {(kpis.totalMonthlyRevenue / 1000000).toFixed(0)}M
          </div>
          <div className="text-[10px] text-emerald-400 font-mono font-bold">{kpis.comparison.revenueGrowth}</div>
        </button>
      </div>

      {/* AI INSIGHT CARD & ALERT CENTER */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* AI Insight Card */}
        <div className="md:col-span-2 glass-card rounded-2xl p-6 border border-purple-500/30 bg-gradient-to-br from-purple-950/20 via-slate-900 to-slate-950 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-300">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>AI BUSINESS COPILOT INSIGHT</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-900/60 text-purple-200 border border-purple-700">
              REALTIME ANALYTICS
            </span>
          </div>
          <p className="text-sm font-sans text-slate-200 leading-relaxed font-medium">{aiInsight}</p>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-2 border-t border-purple-900/40">
            <span>Success Rate: <strong className="text-emerald-400">{aiTelemetry.successRate}</strong></span>
            <span>Avg Latency: <strong className="text-cyan-400">{aiTelemetry.avgResponseTime}</strong></span>
          </div>
        </div>

        {/* Alert Center */}
        <div className="glass-card rounded-2xl p-6 border border-rose-500/30 bg-slate-900/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400">
              <AlertTriangle className="w-4 h-4" />
              <span>ALERT CENTER</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 text-[10px] font-mono font-bold">
              {alerts.length} ALERTS
            </span>
          </div>
          <div className="space-y-2 text-xs">
            {alerts.map((al: any) => (
              <div
                key={al.id}
                onClick={() => {
                  if (al.type.includes('INVOICE') || al.type.includes('FINANCE')) {
                    navigate('/admin/invoices');
                  } else if (al.type.includes('PROJECT') || al.type.includes('MILESTONE')) {
                    navigate('/admin/projects');
                  } else {
                    navigate('/admin/crm');
                  }
                }}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 hover:border-rose-500/40 hover:bg-slate-900 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="font-bold text-rose-400">{al.type}</span>
                  <span className="text-amber-400 font-bold">{al.level}</span>
                </div>
                <p className="text-slate-200 leading-snug">{al.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SALES PIPELINE VISUAL & HEALTH OVERVIEW */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Pipeline Stage Visual */}
        <div className="md:col-span-2 glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>SALES PIPELINE STAGES</span>
            </h3>
            <button onClick={() => navigate('/admin/crm')} className="text-xs font-mono text-cyan-400 hover:underline cursor-pointer">
              Buka CRM Pipeline →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            <button
              onClick={() => navigate('/admin/crm')}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 hover:border-cyan-500/50 hover:bg-slate-900 transition-all cursor-pointer"
            >
              <span className="text-[10px] font-mono text-slate-400">NEW</span>
              <div className="text-lg font-bold text-cyan-400 font-display">{pipelineCounts.NEW}</div>
            </button>
            <button
              onClick={() => navigate('/admin/crm')}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 hover:border-indigo-500/50 hover:bg-slate-900 transition-all cursor-pointer"
            >
              <span className="text-[10px] font-mono text-slate-400">CONTACTED</span>
              <div className="text-lg font-bold text-indigo-400 font-display">{pipelineCounts.CONTACTED}</div>
            </button>
            <button
              onClick={() => navigate('/admin/crm')}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 hover:border-purple-500/50 hover:bg-slate-900 transition-all cursor-pointer"
            >
              <span className="text-[10px] font-mono text-slate-400">QUALIFIED</span>
              <div className="text-lg font-bold text-purple-400 font-display">{pipelineCounts.QUALIFIED}</div>
            </button>
            <button
              onClick={() => navigate('/admin/crm')}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 hover:border-amber-500/50 hover:bg-slate-900 transition-all cursor-pointer"
            >
              <span className="text-[10px] font-mono text-slate-400">PROPOSAL</span>
              <div className="text-lg font-bold text-amber-400 font-display">{pipelineCounts.PROPOSAL}</div>
            </button>
            <button
              onClick={() => navigate('/admin/crm')}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 hover:border-rose-500/50 hover:bg-slate-900 transition-all cursor-pointer"
            >
              <span className="text-[10px] font-mono text-slate-400">NEGOTIATION</span>
              <div className="text-lg font-bold text-rose-400 font-display">{pipelineCounts.NEGOTIATION}</div>
            </button>
            <button
              onClick={() => navigate('/admin/crm')}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 hover:border-emerald-500/50 hover:bg-slate-900 transition-all cursor-pointer"
            >
              <span className="text-[10px] font-mono text-slate-400">WON DEALS</span>
              <div className="text-lg font-bold text-emerald-400 font-display">{pipelineCounts.WON}</div>
            </button>
          </div>
        </div>

        {/* Project Health Card */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span>PROJECT HEALTH</span>
            </h3>
            <button onClick={() => navigate('/admin/projects')} className="text-xs font-mono text-cyan-400 hover:underline cursor-pointer">
              Kelola →
            </button>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <button
              onClick={() => navigate('/admin/projects')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/40 transition-all cursor-pointer"
            >
              <span>ON TRACK</span>
              <span className="font-bold text-base">{projectHealth.ON_TRACK}</span>
            </button>
            <button
              onClick={() => navigate('/admin/projects')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-300 hover:bg-amber-900/40 transition-all cursor-pointer"
            >
              <span>AT RISK</span>
              <span className="font-bold text-base">{projectHealth.AT_RISK}</span>
            </button>
            <button
              onClick={() => navigate('/admin/projects')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 hover:bg-rose-900/40 transition-all cursor-pointer"
            >
              <span>DELAYED</span>
              <span className="font-bold text-base">{projectHealth.DELAYED}</span>
            </button>
            <button
              onClick={() => navigate('/admin/projects')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-900 transition-all cursor-pointer"
            >
              <span>COMPLETED</span>
              <span className="font-bold text-base">{projectHealth.COMPLETED}</span>
            </button>
          </div>
        </div>
      </div>

      {/* TABLES SECTION: RECENT LEADS & RECENT PROJECTS */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>RECENT LEADS</span>
            </h3>
            <button onClick={() => navigate('/admin/leads')} className="text-xs font-mono text-cyan-400 hover:underline">
              Lihat Semua ({kpis.totalLeads}) →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 font-mono text-[10px] text-cyan-400 uppercase">
                <tr>
                  <th className="p-2.5">Perusahaan</th>
                  <th className="p-2.5">Kontak</th>
                  <th className="p-2.5">Score</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {recentLeads.map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-slate-900/50">
                    <td className="p-2.5 font-bold text-white">{lead.companyName}</td>
                    <td className="p-2.5">{lead.contactName}</td>
                    <td className="p-2.5 font-mono text-purple-400 font-bold">{lead.aiScore || 85}</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-2.5 text-right">
                      <button
                        onClick={() => navigate('/admin/leads')}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-cyan-300"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span>ACTIVE PROJECTS</span>
            </h3>
            <button onClick={() => navigate('/admin/projects')} className="text-xs font-mono text-cyan-400 hover:underline">
              Lihat Semua ({recentProjects.length}) →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 font-mono text-[10px] text-emerald-400 uppercase">
                <tr>
                  <th className="p-2.5">Project</th>
                  <th className="p-2.5">Customer</th>
                  <th className="p-2.5">Progress</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {recentProjects.map((p: any) => (
                  <tr key={p.id} className="hover:bg-slate-900/50">
                    <td className="p-2.5 font-bold text-white">{p.title}</td>
                    <td className="p-2.5">{p.clientName}</td>
                    <td className="p-2.5 font-mono text-emerald-400 font-bold">{p.progressPercentage || 45}%</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {p.status}
                      </span>
                    </td>
                    <td className="p-2.5 text-right">
                      <button
                        onClick={() => navigate(`/admin/projects/${p.id}`)}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-emerald-300"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
