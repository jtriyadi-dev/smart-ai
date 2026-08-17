import React, { useState, useEffect } from 'react';
import {
  FileCheck,
  Plus,
  Search,
  Filter,
  DollarSign,
  FileText,
  Copy,
  Eye,
  Edit3,
  Send,
  Printer,
  Sparkles,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  Layers
} from 'lucide-react';
import { useRouter } from '../../lib/router';
import { Quotation, QuotationStatus } from '../../types';
import { QuotationDocumentService } from '../../services/QuotationDocumentService';
import { CurrencyService } from '../../services/CurrencyService';
import { PriceCatalogModal } from '../../components/quotation/PriceCatalogModal';
import { CreateFromProposalModal } from '../../components/quotation/CreateFromProposalModal';
import { SendQuotationModal } from '../../components/quotation/SendQuotationModal';

export const QuotationsDashboardPage: React.FC = () => {
  const { navigate } = useRouter();
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Modals
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isProposalImportOpen, setIsProposalImportOpen] = useState(false);
  const [sendModalQuotation, setSendModalQuotation] = useState<Quotation | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setQuotations(QuotationDocumentService.getAllQuotations());
  };

  const handleDuplicate = (id: string) => {
    const duplicated = QuotationDocumentService.duplicateQuotation(id);
    if (duplicated) {
      loadData();
      navigate(`/admin/quotations/${duplicated.id}/edit`);
    }
  };

  // KPI Calculations
  const totalCount = quotations.length;
  const draftCount = quotations.filter((q) => q.status === 'DRAFT').length;
  const inReviewCount = quotations.filter((q) => q.status === 'IN REVIEW' || q.status === 'REVISION REQUIRED').length;
  const approvedCount = quotations.filter((q) => q.status === 'APPROVED').length;
  const sentCount = quotations.filter((q) => q.status === 'SENT' || q.status === 'VIEWED').length;
  const acceptedCount = quotations.filter((q) => q.status === 'ACCEPTED').length;
  const rejectedCount = quotations.filter((q) => q.status === 'REJECTED' || q.status === 'CANCELLED' || q.status === 'EXPIRED').length;

  const totalValueApprovedAccepted = quotations
    .filter((q) => q.status === 'APPROVED' || q.status === 'ACCEPTED' || q.status === 'SENT' || q.status === 'VIEWED')
    .reduce((sum, q) => sum + (q.grandTotal || 0), 0);

  // Filter Logic
  const filteredQuotations = quotations.filter((q) => {
    const matchesSearch =
      q.quotationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.contactName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || q.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: QuotationStatus) => {
    switch (status) {
      case 'DRAFT':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">DRAFT</span>;
      case 'IN REVIEW':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1 w-max"><Clock className="w-3 h-3" /> IN REVIEW</span>;
      case 'REVISION REQUIRED':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/30 flex items-center gap-1 w-max"><AlertTriangle className="w-3 h-3" /> REVISION</span>;
      case 'APPROVED':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 w-max"><CheckCircle2 className="w-3 h-3" /> APPROVED</span>;
      case 'SENT':
      case 'VIEWED':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center gap-1 w-max"><Send className="w-3 h-3" /> {status}</span>;
      case 'ACCEPTED':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1 w-max"><ShieldCheck className="w-3 h-3" /> ACCEPTED</span>;
      case 'REJECTED':
      case 'EXPIRED':
      case 'CANCELLED':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1 w-max"><XCircle className="w-3 h-3" /> {status}</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 p-4 sm:p-6 lg:p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <FileCheck className="w-3.5 h-3.5" /> SMART QUOTATION SYSTEM
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Commercial Quotations & Official Offers
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Manajemen penawaran harga resmi, penetapan paket, persetujuan komersial, dan pendaftaran versi penawaran.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsCatalogOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-2"
            >
              <DollarSign className="w-4 h-4 text-cyan-400" /> Catalog Price
            </button>
            <button
              onClick={() => setIsProposalImportOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-pink-400" /> Create from Proposal
            </button>
            <button
              onClick={() => navigate('/admin/quotations/new')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Create New Quotation
            </button>
          </div>
        </div>

        {/* Commercial KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Total Quotations</span>
            <div className="text-2xl font-extrabold text-white">{totalCount}</div>
            <span className="text-[10px] text-slate-500 mt-1 block">Seluruh Versi</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Draft</span>
            <div className="text-2xl font-extrabold text-slate-300">{draftCount}</div>
            <span className="text-[10px] text-slate-500 mt-1 block">Dalam Penyusunan</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block mb-1">In Review</span>
            <div className="text-2xl font-extrabold text-amber-400">{inReviewCount}</div>
            <span className="text-[10px] text-amber-500/80 mt-1 block">Menunggu Approval</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block mb-1">Approved</span>
            <div className="text-2xl font-extrabold text-emerald-400">{approvedCount}</div>
            <span className="text-[10px] text-emerald-500/80 mt-1 block">Siap Dikirim</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider block mb-1">Sent & Viewed</span>
            <div className="text-2xl font-extrabold text-blue-400">{sentCount}</div>
            <span className="text-[10px] text-blue-500/80 mt-1 block">Aktif Ditinjau Klien</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider block mb-1">Accepted</span>
            <div className="text-2xl font-extrabold text-cyan-400">{acceptedCount}</div>
            <span className="text-[10px] text-cyan-500/80 mt-1 block">Penawaran Diterima</span>
          </div>
        </div>

        {/* Commercial Pipeline Value Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Total Active Commercial Offer Value</span>
              <span className="text-2xl font-black text-white font-mono">
                {CurrencyService.formatCurrency(totalValueApprovedAccepted, 'IDR')}
              </span>
            </div>
          </div>
          <div className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800 max-w-md">
            ⚠️ <strong>Commercial Rule:</strong> Project Estimator menghasilkan <em>Estimated Investment</em>. Official Quotation hanya menjadi resmi setelah melewati Human Review & Approval.
          </div>
        </div>

        {/* Search & Status Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Cari No. Quotation, Customer, atau Proyek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {['ALL', 'DRAFT', 'IN REVIEW', 'APPROVED', 'SENT', 'ACCEPTED', 'REJECTED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  statusFilter === st
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/50'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Quotations List Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-800/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="p-4">No. Quotation & Version</th>
                  <th className="p-4">Customer & Contact</th>
                  <th className="p-4">Project & Package</th>
                  <th className="p-4 text-right">Grand Total (Rp)</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {filteredQuotations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-500">
                      Tidak ada quotation yang sesuai dengan pencarian/filter.
                    </td>
                  </tr>
                ) : (
                  filteredQuotations.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4">
                        <div className="font-mono font-bold text-cyan-400 text-sm flex items-center gap-2">
                          {q.quotationNumber}
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-sans">
                            {q.version}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          Tgl: {q.quotationDate} • Valid: {q.validUntil}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-white text-sm">{q.companyName}</div>
                        <div className="text-xs text-slate-400">{q.contactName} ({q.contactPosition})</div>
                      </td>

                      <td className="p-4">
                        <div className="font-semibold text-slate-200">{q.projectName}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/50 text-[10px] text-cyan-300">
                            Paket {q.packageName || 'Custom'}
                          </span>
                          {q.proposalNumber && (
                            <span className="text-[10px] text-pink-400 font-mono">
                              Prop: {q.proposalNumber}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-4 text-right font-mono font-bold text-emerald-400 text-sm">
                        {CurrencyService.formatCurrency(q.grandTotal, q.currency)}
                        {q.recurringMonthly > 0 && (
                          <div className="text-[10px] text-slate-400 font-sans font-normal">
                            + {CurrencyService.formatCurrency(q.recurringMonthly, q.currency)}/bln
                          </div>
                        )}
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex justify-center">{getStatusBadge(q.status)}</div>
                        {q.approvedBy && (
                          <div className="text-[9px] text-slate-500 mt-1">Appr: {q.approvedBy}</div>
                        )}
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => navigate(`/admin/quotations/${q.id}`)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors"
                            title="Detail / Approval View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => navigate(`/admin/quotations/${q.id}/edit`)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                            title="Edit Quotation"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => navigate(`/admin/quotations/${q.id}/pdf`)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors"
                            title="Printable PDF"
                          >
                            <Printer className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setSendModalQuotation(q)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-pink-400 transition-colors"
                            title="Kirim Penawaran"
                          >
                            <Send className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDuplicate(q.id)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors"
                            title="Duplikasi (Buat Versi/Quotation Baru)"
                          >
                            <Copy className="w-4 h-4" />
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

      {/* Catalog Modal */}
      <PriceCatalogModal isOpen={isCatalogOpen} onClose={() => setIsCatalogOpen(false)} />

      {/* Import Proposal Modal */}
      <CreateFromProposalModal
        isOpen={isProposalImportOpen}
        onClose={() => setIsProposalImportOpen(false)}
        onQuotationCreated={(newId) => navigate(`/admin/quotations/${newId}/edit`)}
      />

      {/* Send Modal */}
      {sendModalQuotation && (
        <SendQuotationModal
          isOpen={!!sendModalQuotation}
          onClose={() => setSendModalQuotation(null)}
          quotation={sendModalQuotation}
          onSuccess={loadData}
        />
      )}
    </div>
  );
};
