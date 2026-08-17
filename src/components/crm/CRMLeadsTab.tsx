import React, { useState } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  UserCheck,
  Building2,
  Phone,
  Mail,
  MessageCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  MoreVertical,
  Plus,
  Tag,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Lead, LeadPriority, LeadStatus } from '../../types';
import { LeadService } from '../../services/leadService';
import { CRMService } from '../../services/crmService';

interface CRMLeadsTabProps {
  leads: Lead[];
  onRefresh: () => void;
  onWhatsAppClick: (phone: string, name: string, context: string) => void;
  onOpenOpportunity: (oppId: string) => void;
}

export const CRMLeadsTab: React.FC<CRMLeadsTabProps> = ({
  leads,
  onRefresh,
  onWhatsAppClick,
  onOpenOpportunity
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkOwner, setBulkOwner] = useState('Budi Santoso');

  const filteredLeads = leads.filter((lead) => {
    const matchSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.referenceCode.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchIndustry = industryFilter === 'All' || lead.industry === industryFilter;
    const matchPriority = priorityFilter === 'All' || lead.priority === priorityFilter;

    return matchSearch && matchStatus && matchIndustry && matchPriority;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedLeadIds(filteredLeads.map((l) => l.id));
    } else {
      setSelectedLeadIds([]);
    }
  };

  const toggleSelectLead = (id: string) => {
    if (selectedLeadIds.includes(id)) {
      setSelectedLeadIds(selectedLeadIds.filter((item) => item !== id));
    } else {
      setSelectedLeadIds([...selectedLeadIds, id]);
    }
  };

  const handleConvertToOpportunity = (lead: Lead) => {
    try {
      const opp = CRMService.convertLeadToOpportunity(lead.id);
      onRefresh();
      onOpenOpportunity(opp.id);
    } catch (err: any) {
      alert(err.message || 'Gagal mengonversi Lead.');
    }
  };

  const handleApplyBulkAssignment = () => {
    selectedLeadIds.forEach((id) => {
      LeadService.assignLead(id, bulkOwner, 'Sales Consultant');
    });
    setSelectedLeadIds([]);
    setShowBulkModal(false);
    onRefresh();
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari lead, perusahaan, email, ref code..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="All">Semua Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Consultation Scheduled">Consultation Scheduled</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="All">Semua Prioritas</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Bulk Action Trigger */}
          {selectedLeadIds.length > 0 && (
            <button
              onClick={() => setShowBulkModal(true)}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 transition-all shadow-lg shadow-blue-500/20"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Bulk Assign ({selectedLeadIds.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-400 text-[11px] font-bold uppercase border-b border-slate-800">
                <th className="p-3.5 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedLeadIds.length > 0 && selectedLeadIds.length === filteredLeads.length}
                    onChange={handleSelectAll}
                    className="rounded bg-slate-900 border-slate-700 text-blue-500 focus:ring-0"
                  />
                </th>
                <th className="p-3.5">Ref Code & Nama</th>
                <th className="p-3.5">Perusahaan & Industri</th>
                <th className="p-3.5">Source & Layanan</th>
                <th className="p-3.5 text-center">Score</th>
                <th className="p-3.5">Status & Priority</th>
                <th className="p-3.5">Assigned To</th>
                <th className="p-3.5 text-right">Aksi CRM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs text-slate-200">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-slate-500">
                    <p className="font-semibold text-slate-400 text-sm">Belum ada lead terdaftar.</p>
                    <p className="text-xs mt-1">Gunakan form pendaftaran atau AI Application Builder untuk mendapatkan lead baru.</p>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors group">
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={selectedLeadIds.includes(lead.id)}
                        onChange={() => toggleSelectLead(lead.id)}
                        className="rounded bg-slate-900 border-slate-700 text-blue-500 focus:ring-0"
                      />
                    </td>
                    <td className="p-3.5">
                      <div className="font-mono text-[11px] text-blue-400 font-bold">{lead.referenceCode || lead.id}</div>
                      <div className="font-bold text-slate-100">{lead.name}</div>
                      <div className="text-[10px] text-slate-400">{lead.email}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-200 flex items-center space-x-1">
                        <Building2 className="w-3 h-3 text-slate-500" />
                        <span>{lead.company}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">{lead.industry}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-medium border border-slate-700">
                        {lead.source}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-1">{lead.service}</div>
                    </td>
                    <td className="p-3.5 text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded font-mono font-bold text-xs ${
                          (lead.score?.totalScore || 0) >= 80
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : (lead.score?.totalScore || 0) >= 50
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {lead.score?.totalScore || 65}
                      </span>
                    </td>
                    <td className="p-3.5 space-y-1">
                      <div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {lead.status}
                        </span>
                      </div>
                      <div className="text-[10px] font-semibold text-slate-400">
                        Prioritas: <span className="text-amber-300">{lead.priority}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-300 font-medium">
                      {lead.assignedTo || 'Unassigned'}
                    </td>
                    <td className="p-3.5 text-right space-x-1.5">
                      <button
                        onClick={() => onWhatsAppClick(lead.whatsapp || lead.phone, lead.name, lead.service)}
                        title="WhatsApp"
                        className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>

                      {lead.status !== 'Qualified' && lead.status !== 'Won' ? (
                        <button
                          onClick={() => handleConvertToOpportunity(lead)}
                          className="px-2.5 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-[11px] font-semibold rounded-lg shadow-sm"
                        >
                          Convert Opportunity
                        </button>
                      ) : (
                        <span className="text-[10px] text-emerald-400 font-semibold px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                          Converted
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-sm font-bold text-white">Bulk Assign ({selectedLeadIds.length} Lead)</h3>
            <div>
              <label className="text-xs text-slate-400">Pilih Sales / Consultant</label>
              <select
                value={bulkOwner}
                onChange={(e) => setBulkOwner(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="Budi Santoso">Budi Santoso (Senior Consultant)</option>
                <option value="Siti Rahma">Siti Rahma (Healthcare Sales Specialist)</option>
                <option value="Rian Pratama">Rian Pratama (Fintech Account Exec)</option>
                <option value="Dewi Lestari">Dewi Lestari (Logistics Lead)</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowBulkModal(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-400 bg-slate-800 rounded-xl"
              >
                Batal
              </button>
              <button
                onClick={handleApplyBulkAssignment}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl"
              >
                Konfirmasi Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
