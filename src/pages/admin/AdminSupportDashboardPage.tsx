import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { AdminSupportLayout } from '../../components/admin/AdminSupportLayout';
import { SupportTicketService } from '../../services/SupportTicketService';
import { TicketSLAService } from '../../services/TicketSLAService';
import { Ticket, SupportAgent } from '../../types';
import {
  LifeBuoy,
  ListOrdered,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Building2,
  FolderOpen,
  User,
  Activity
} from 'lucide-react';

export const AdminSupportDashboardPage: React.FC = () => {
  const { navigate } = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [agents, setAgents] = useState<SupportAgent[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allTickets = SupportTicketService.getTickets('', false);
    setTickets(allTickets);
    const allAgents = SupportTicketService.getAgents();
    setAgents(allAgents);
  };

  // Dynamic Metrics
  const totalCount = tickets.length;
  const openCount = tickets.filter((t) => t.status === 'OPEN').length;
  const inProgressCount = tickets.filter((t) => t.status === 'IN_PROGRESS').length;
  const testingCount = tickets.filter((t) => t.status === 'TESTING').length;
  const resolvedCount = tickets.filter((t) => t.status === 'RESOLVED').length;
  const closedCount = tickets.filter((t) => t.status === 'CLOSED').length;

  const slaAtRiskCount = tickets.filter((t) => TicketSLAService.getSLAStatus(t).status === 'AT_RISK' && t.status !== 'RESOLVED' && t.status !== 'CLOSED').length;
  const slaBreachedCount = tickets.filter((t) => TicketSLAService.getSLAStatus(t).status === 'BREACHED' && t.status !== 'RESOLVED' && t.status !== 'CLOSED').length;

  // Urgent / High Priority queue
  const highPriorityQueue = tickets.filter((t) => (t.priority === 'URGENT' || t.priority === 'HIGH') && t.status !== 'RESOLVED' && t.status !== 'CLOSED');

  return (
    <AdminSupportLayout activeTab="dashboard">
      <div className="space-y-6">
        {/* KPI Metrics Dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Total Tickets</div>
            <div className="text-2xl font-bold text-white mt-1">{totalCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Open</div>
            <div className="text-2xl font-bold text-blue-400 mt-1">{openCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">In Progress</div>
            <div className="text-2xl font-bold text-cyan-400 mt-1">{inProgressCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Testing</div>
            <div className="text-2xl font-bold text-purple-400 mt-1">{testingCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Resolved</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{resolvedCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Closed</div>
            <div className="text-2xl font-bold text-slate-400 mt-1">{closedCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 bg-amber-500/5">
            <div className="text-[11px] text-amber-400 font-medium">SLA At Risk</div>
            <div className="text-2xl font-bold text-amber-400 mt-1">{slaAtRiskCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-rose-500/30 bg-rose-500/5">
            <div className="text-[11px] text-rose-400 font-medium">SLA Breached</div>
            <div className="text-2xl font-bold text-rose-400 mt-1">{slaBreachedCount}</div>
          </div>
        </div>

        {/* Priority Attention & Agent Workload Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Urgent & High Priority Queue (2 cols) */}
          <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" /> Urgent & High Priority Queue ({highPriorityQueue.length})
              </h3>
              <button
                onClick={() => navigate('/admin/support/queue')}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                Full Queue <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {highPriorityQueue.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                Tidak ada ticket Urgent/High priority dalam antrean penanganan aktif saat ini.
              </div>
            ) : (
              <div className="space-y-3">
                {highPriorityQueue.map((t) => {
                  const sla = TicketSLAService.getSLAStatus(t);
                  const slaColors = TicketSLAService.getSLAColorClasses(sla.status);

                  return (
                    <div
                      key={t.id}
                      onClick={() => navigate(`/admin/support/${t.id}`)}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-cyan-400">{t.ticketNumber}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            {t.priority}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300">
                            {t.status}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white">{t.subject}</h4>
                        <div className="text-[11px] text-slate-400">
                          {t.companyName} • {t.projectName || 'General'}
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${slaColors.bg} ${slaColors.text} ${slaColors.border} inline-flex items-center gap-1`}>
                          <Clock className="w-3 h-3" /> {sla.displayLabel}
                        </span>
                        <div className="text-[10px] text-slate-500 mt-1">
                          Assignee: {t.assigneeName || 'Unassigned'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Support Team Workload Overview (1 col) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" /> Agent Workload
              </h3>
              <button
                onClick={() => navigate('/admin/support/agents')}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
              >
                Manage
              </button>
            </div>

            <div className="space-y-3">
              {agents.map((ag) => (
                <div key={ag.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center border border-cyan-500/30">
                        {ag.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{ag.name}</div>
                        <div className="text-[10px] text-slate-400">{ag.role}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {ag.activeStatus}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 flex justify-between items-center pt-1 border-t border-slate-900">
                    <span>Current Active Workload:</span>
                    <span className="font-bold text-cyan-400">{ag.currentWorkload} Tickets</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminSupportLayout>
  );
};
