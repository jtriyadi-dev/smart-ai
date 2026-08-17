import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus, LeadSource, LeadPriority, LeadFilterOptions } from '../types';
import { LeadService } from '../services/leadService';
import { LeadDetailModal } from '../components/admin/LeadDetailModal';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import {
  Users,
  Search,
  Filter,
  Sparkles,
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  Clock,
  Briefcase,
  Layers,
  Calendar,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const AdminLeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [filters, setFilters] = useState<LeadFilterOptions>({
    status: 'all',
    source: 'all',
    priority: 'all',
    searchQuery: ''
  });

  useEffect(() => {
    document.title = 'Lead Generation & Sales CRM Dashboard | SMART-AI.ID';
    loadLeads();
  }, []);

  const loadLeads = () => {
    const list = LeadService.getLeadsLocal();
    setLeads(list);
  };

  useEffect(() => {
    const res = LeadService.filterLeads(leads, filters);
    setFilteredLeads(res);
  }, [leads, filters]);

  const stats = LeadService.getLeadStats(leads);

  const handleOpenDetail = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleUpdateLeadInList = (updated: Lead) => {
    setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    setSelectedLead(updated);
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'New': return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      case 'Contacted': return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
      case 'Qualified': return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'Consultation Scheduled': return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Proposal Sent': return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'Won': return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'Lost': return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>SMART-AI.ID Sales Engine</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Lead Generation & Sales CRM Dashboard
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Manajemen prospek masuk dari AI Application Builder, AI Project Estimator, & Form Kontak.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadLeads}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-bold transition-all cursor-pointer"
            >
              Refresh Data
            </button>
          </div>
        </div>

        {/* Metrics Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Leads</span>
            <span className="text-2xl font-black text-white">{stats.total}</span>
            <span className="text-[10px] text-slate-400 block mt-1">Masuk ke sistem</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg">
            <span className="text-[10px] font-bold text-cyan-400 uppercase block">Lead Baru</span>
            <span className="text-2xl font-black text-cyan-300">{stats.newLeads}</span>
            <span className="text-[10px] text-cyan-400/80 block mt-1">Belum diproses</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg">
            <span className="text-[10px] font-bold text-purple-400 uppercase block">Qualified</span>
            <span className="text-2xl font-black text-purple-300">{stats.qualified}</span>
            <span className="text-[10px] text-purple-400/80 block mt-1">Kebutuhan sesuai</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg">
            <span className="text-[10px] font-bold text-amber-400 uppercase block">Sesi Konsultasi</span>
            <span className="text-2xl font-black text-amber-300">{stats.consultations}</span>
            <span className="text-[10px] text-amber-400/80 block mt-1">Dijadwalkan</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg">
            <span className="text-[10px] font-bold text-emerald-400 uppercase block">Deal Won</span>
            <span className="text-2xl font-black text-emerald-400">{stats.won}</span>
            <span className="text-[10px] text-emerald-400/80 block mt-1">Converted Client</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Win Rate</span>
            <span className="text-2xl font-black text-amber-400">{stats.winRatePercentage}%</span>
            <span className="text-[10px] text-slate-400 block mt-1">Conversion Ratio</span>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari nama, perusahaan, kode ref..."
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
            >
              <option value="all">Semua Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Consultation Scheduled">Consultation Scheduled</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>

            <select
              value={filters.source}
              onChange={(e) => setFilters({ ...filters, source: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
            >
              <option value="all">Semua Source</option>
              <option value="Website Contact Form">Website Contact Form</option>
              <option value="AI Application Builder">AI Application Builder</option>
              <option value="AI Requirement Analyzer">AI Requirement Analyzer</option>
              <option value="AI Solution Architect">AI Solution Architect</option>
              <option value="AI Project Estimator">AI Project Estimator</option>
              <option value="Direct Consultation">Direct Consultation</option>
            </select>

            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
            >
              <option value="all">Semua Priority</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
        </div>

        {/* Lead Collection Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Lead & Kode Ref</th>
                  <th className="py-4 px-4">Perusahaan & Industri</th>
                  <th className="py-4 px-4">Source Tool</th>
                  <th className="py-4 px-4">AI Score</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Tanggal Masuk</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      Tidak ada lead yang memenuhi kriteria filter.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => handleOpenDetail(lead)}
                      className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                    >
                      <td className="py-4 px-6">
                        <div className="font-bold text-white text-sm">{lead.name}</div>
                        <div className="font-mono text-[10px] text-purple-400">{lead.referenceCode}</div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-200">{lead.company}</div>
                        <div className="text-[11px] text-slate-400">{lead.industry}</div>
                      </td>

                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 text-[11px] font-medium">
                          {lead.source}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-bold text-amber-400">{lead.score.totalScore}</span>
                        <span className="text-[10px] text-slate-500 ml-1">({lead.score.level})</span>
                      </td>

                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full border text-[11px] font-bold ${getStatusBadge(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>

                      <td className="py-4 px-4 font-mono text-[11px] text-slate-400">
                        {new Date(lead.createdAt).toLocaleDateString('id-ID')}
                      </td>

                      <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <WhatsAppButton
                            source="Admin CRM Table"
                            contextData={{ name: lead.name, referenceCode: lead.referenceCode }}
                            variant="Compact"
                            size="sm"
                            label="WA"
                          />

                          <button
                            onClick={() => handleOpenDetail(lead)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                            title="Detail Lead"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <LeadDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lead={selectedLead}
        onUpdateLead={handleUpdateLeadInList}
      />
    </div>
  );
};
