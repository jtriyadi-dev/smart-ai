import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Eye,
  Send,
  XCircle,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Edit,
  Copy,
  Printer,
  Download,
  Building2,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Proposal, ProposalStatus } from '../../types';
import { ProposalDocumentService } from '../../services/proposalDocumentService';
import { GenerateProposalModal } from '../../components/proposal/GenerateProposalModal';

export const ProposalsDashboardPage: React.FC = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [copySuccessMsg, setCopySuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    loadProposals();
  }, []);

  const loadProposals = () => {
    const list = ProposalDocumentService.getAllProposals();
    setProposals(list);
  };

  const filteredProposals = proposals.filter((p) => {
    const matchesSearch =
      p.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.proposalNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.contactName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // KPI calculations
  const totalCount = proposals.length;
  const draftCount = proposals.filter((p) => p.status === 'DRAFT').length;
  const inReviewCount = proposals.filter((p) => p.status === 'IN REVIEW').length;
  const approvedCount = proposals.filter((p) => p.status === 'APPROVED').length;
  const sentCount = proposals.filter((p) => p.status === 'SENT').length;
  const viewedCount = proposals.filter((p) => p.status === 'VIEWED').length;
  const acceptedCount = proposals.filter((p) => p.status === 'ACCEPTED').length;
  const rejectedCount = proposals.filter((p) => p.status === 'REJECTED').length;
  const expiredCount = proposals.filter((p) => p.status === 'EXPIRED').length;

  const handleCopyPublicLink = (proposal: Proposal) => {
    const publicUrl = `${window.location.origin}/proposal/view/${proposal.publicToken}`;
    navigator.clipboard.writeText(publicUrl);
    setCopySuccessMsg(`Secure public proposal link copied to clipboard!`);
    setTimeout(() => setCopySuccessMsg(null), 3000);
  };

  const getStatusBadge = (status: ProposalStatus) => {
    switch (status) {
      case 'DRAFT':
        return <span className="px-2.5 py-1 bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-bold rounded-full">DRAFT</span>;
      case 'IN REVIEW':
        return <span className="px-2.5 py-1 bg-purple-950 text-purple-300 border border-purple-500/40 text-[10px] font-bold rounded-full">IN REVIEW</span>;
      case 'APPROVED':
        return <span className="px-2.5 py-1 bg-blue-950 text-blue-300 border border-blue-500/40 text-[10px] font-bold rounded-full">APPROVED</span>;
      case 'SENT':
        return <span className="px-2.5 py-1 bg-indigo-950 text-indigo-300 border border-indigo-500/40 text-[10px] font-bold rounded-full">SENT</span>;
      case 'VIEWED':
        return <span className="px-2.5 py-1 bg-amber-950 text-amber-300 border border-amber-500/40 text-[10px] font-bold rounded-full">VIEWED</span>;
      case 'ACCEPTED':
        return <span className="px-2.5 py-1 bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold rounded-full">ACCEPTED</span>;
      case 'REJECTED':
        return <span className="px-2.5 py-1 bg-rose-950 text-rose-300 border border-rose-500/40 text-[10px] font-bold rounded-full">REJECTED</span>;
      case 'EXPIRED':
        return <span className="px-2.5 py-1 bg-slate-900 text-slate-500 border border-slate-800 text-[10px] font-bold rounded-full">EXPIRED</span>;
      default:
        return <span className="px-2.5 py-1 bg-slate-800 text-slate-400 text-[10px] font-bold rounded-full">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 p-4 md:p-8 space-y-8 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
            <span>Admin</span>
            <span>/</span>
            <span>CRM & Sales</span>
            <span>/</span>
            <span className="text-cyan-400 font-semibold">Proposal Management</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
              <FileText className="w-6 h-6" />
            </div>
            AI Proposal Management Engine
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Kelola, review, edit, approve, dan ekspor proposal B2B profesional yang terhubung langsung dengan data CRM & AI Engine.
          </p>
        </div>

        <button
          onClick={() => setIsGenerateModalOpen(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg shadow-cyan-500/20 transition self-start md:self-center"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate New Proposal</span>
        </button>
      </div>

      {/* Success Notification */}
      {copySuccessMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{copySuccessMsg}</span>
          </div>
          <button onClick={() => setCopySuccessMsg(null)} className="text-emerald-400 hover:text-white">
            &times;
          </button>
        </motion.div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Total</span>
          <span className="text-xl font-extrabold text-white">{totalCount}</span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Draft</span>
          <span className="text-xl font-extrabold text-slate-300">{draftCount}</span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl space-y-1">
          <span className="text-[10px] text-purple-400 font-bold uppercase block">In Review</span>
          <span className="text-xl font-extrabold text-purple-300">{inReviewCount}</span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl space-y-1">
          <span className="text-[10px] text-blue-400 font-bold uppercase block">Approved</span>
          <span className="text-xl font-extrabold text-blue-300">{approvedCount}</span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl space-y-1">
          <span className="text-[10px] text-indigo-400 font-bold uppercase block">Sent</span>
          <span className="text-xl font-extrabold text-indigo-300">{sentCount}</span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl space-y-1">
          <span className="text-[10px] text-amber-400 font-bold uppercase block">Viewed</span>
          <span className="text-xl font-extrabold text-amber-300">{viewedCount}</span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl space-y-1">
          <span className="text-[10px] text-emerald-400 font-bold uppercase block">Accepted</span>
          <span className="text-xl font-extrabold text-emerald-400">{acceptedCount}</span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl space-y-1">
          <span className="text-[10px] text-rose-400 font-bold uppercase block">Rejected</span>
          <span className="text-xl font-extrabold text-rose-400">{rejectedCount}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari berdasarkan nomor proposal, perusahaan, kontak, atau judul..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 text-[11px]">
          {['ALL', 'DRAFT', 'IN REVIEW', 'APPROVED', 'SENT', 'VIEWED', 'ACCEPTED', 'REJECTED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Proposals List Grid */}
      <div className="space-y-4">
        {filteredProposals.map((prop) => (
          <div
            key={prop.id}
            className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition space-y-4 shadow-lg"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-bold text-cyan-400">{prop.proposalNumber}</span>
                  <span className="text-xs font-bold text-amber-300">Version {prop.version}</span>
                  {getStatusBadge(prop.status)}
                </div>
                <h3 className="text-base font-bold text-white">{prop.title}</h3>
              </div>

              <div className="text-xs md:text-right text-slate-400 space-y-0.5">
                <div>Dibuat: {new Date(prop.createdAt).toLocaleDateString('id-ID')}</div>
                <div className="text-emerald-400 font-bold">
                  Rp {(prop.investment.rangeMin / 1e6).toFixed(0)}M – Rp {(prop.investment.rangeMax / 1e6).toFixed(0)}M
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Perusahaan & Kontak:</span>
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" /> {prop.companyName}
                </div>
                <div className="text-slate-400">{prop.contactName} ({prop.contactPosition || 'Executive'})</div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Timeline & Support:</span>
                <div>Estimasi: {prop.timeline.totalMonths}</div>
                <div className="text-slate-400">Garansi: {prop.support.periodDays} Hari Kalender</div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Statistik Link Customer:</span>
                <div>Dilihat Customer: <span className="font-bold text-amber-300">{prop.viewCount || 0}x</span></div>
                {prop.lastViewedAt && (
                  <div className="text-slate-400 text-[11px]">
                    Terakhir Dilihat: {new Date(prop.lastViewedAt).toLocaleTimeString('id-ID')}
                  </div>
                )}
              </div>
            </div>

            {/* Card Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/80 text-xs">
              <div className="flex items-center space-x-2">
                <a
                  href={`/admin/proposals/${prop.id}`}
                  className="px-3.5 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-xl font-bold flex items-center gap-1.5 transition"
                >
                  <Eye className="w-3.5 h-3.5" /> View Proposal
                </a>

                <a
                  href={`/admin/proposals/${prop.id}/edit`}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-bold flex items-center gap-1.5 transition"
                >
                  <Edit className="w-3.5 h-3.5" /> Edit Proposal
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopyPublicLink(prop)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Link Public
                </button>

                <a
                  href={`/proposal/view/${prop.publicToken}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/40 text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Preview as Client
                </a>
              </div>
            </div>
          </div>
        ))}

        {filteredProposals.length === 0 && (
          <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400 space-y-3">
            <FileText className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">Tidak Ada Proposal Ditemukan</h3>
            <p className="text-xs text-slate-500">Belum ada proposal yang dibuat atau sesuai dengan filter pencarian.</p>
            <button
              onClick={() => setIsGenerateModalOpen(true)}
              className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl inline-flex items-center gap-2 mt-2"
            >
              <Plus className="w-4 h-4" /> Generate Proposal Baru
            </button>
          </div>
        )}
      </div>

      {/* Generate Proposal Modal */}
      <GenerateProposalModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        onProposalCreated={(newProp) => {
          loadProposals();
          window.location.href = `/admin/proposals/${newProp.id}`;
        }}
      />
    </div>
  );
};
