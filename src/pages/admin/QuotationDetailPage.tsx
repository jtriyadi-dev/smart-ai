import React, { useState, useEffect } from 'react';
import {
  FileCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Printer,
  Send,
  Edit3,
  Copy,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Layers,
  Lock,
  UserCheck,
  History,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { useRouter } from '../../lib/router';
import { Quotation, QuotationApproval, Proposal } from '../../types';
import { QuotationDocumentService } from '../../services/QuotationDocumentService';
import { CurrencyService } from '../../services/CurrencyService';
import { ProposalDocumentService } from '../../services/proposalDocumentService';
import { QuotationScopeValidator } from '../../services/QuotationScopeValidator';
import { SendQuotationModal } from '../../components/quotation/SendQuotationModal';

export const QuotationDetailPage: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  // Extract ID from path e.g. /admin/quotations/QTN-123
  const quotationId = currentPath.replace('/admin/quotations/', '').replace('/preview', '');

  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [proposal, setProposal] = useState<Proposal | null>(null);

  // Approval Modal States
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [approvalAction, setApprovalAction] = useState<'APPROVE' | 'REJECT' | 'REVISION'>('APPROVE');
  const [approvalComment, setApprovalComment] = useState('');
  const [approverName, setApproverName] = useState('Rahmat Wijaya');
  const [approverRole, setApproverRole] = useState('Director of Commercials');

  const [sendModalOpen, setSendModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, [quotationId]);

  const loadData = () => {
    const q = QuotationDocumentService.getQuotationById(quotationId);
    if (q) {
      setQuotation(q);
      if (q.proposalId) {
        const p = ProposalDocumentService.getProposalById(q.proposalId);
        if (p) setProposal(p);
      }
    }
  };

  if (!quotation) {
    return (
      <div className="min-h-screen bg-[#06090e] text-slate-100 p-8 pt-32 text-center">
        <h2 className="text-xl font-bold text-white">Quotation tidak ditemukan.</h2>
        <button
          onClick={() => navigate('/admin/quotations')}
          className="mt-4 px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs"
        >
          Kembali ke Dashboard Quotation
        </button>
      </div>
    );
  }

  // Scope diff vs Proposal
  const scopeDiff = proposal
    ? QuotationScopeValidator.validateScopeVsProposal(proposal.modules, quotation.items)
    : null;

  const handleExecuteApproval = () => {
    if (approvalAction === 'APPROVE') {
      QuotationDocumentService.approveQuotation(quotation.id, approverName, approverRole, approvalComment);
    } else if (approvalAction === 'REJECT') {
      QuotationDocumentService.rejectQuotation(quotation.id, approverName, approverRole, approvalComment);
    } else {
      QuotationDocumentService.requestRevision(quotation.id, approverName, approverRole, approvalComment);
    }
    setIsApprovalModalOpen(false);
    loadData();
  };

  const publicUrl = `${window.location.origin}/quotation/view/${quotation.secureToken}`;

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 p-4 sm:p-6 lg:p-8 pt-24">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/quotations')}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400">{quotation.quotationNumber}</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300">
                  {quotation.version}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  {quotation.status}
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-white mt-0.5">{quotation.projectName}</h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => navigate(`/admin/quotations/${quotation.id}/edit`)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5"
            >
              <Edit3 className="w-4 h-4" /> Edit
            </button>
            <button
              onClick={() => navigate(`/admin/quotations/${quotation.id}/pdf`)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold border border-slate-700 flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" /> Export PDF
            </button>
            <button
              onClick={() => setSendModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" /> Kirim ke Klien
            </button>
          </div>
        </div>

        {/* Commercial Highlights Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">Customer & Perusahaan</span>
            <div className="font-bold text-white text-sm">{quotation.companyName}</div>
            <div className="text-xs text-slate-400">{quotation.contactName}</div>
            <div className="mt-1">
              <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                quotation.pricingModel === 'Monthly'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : quotation.pricingModel === 'Hybrid'
                  ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                  : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
              }`}>
                {quotation.pricingModel === 'Monthly' ? '🔄 Layanan Bulanan (OpEx)' : quotation.pricingModel === 'Hybrid' ? '⚡ Hybrid Model' : '💎 CapEx (Sekali Bayar)'}
              </span>
            </div>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">Masa Berlaku Penawaran</span>
            <div className="font-bold text-slate-200 text-xs">{quotation.quotationDate} s/d {quotation.validUntil}</div>
            <div className="text-[10px] text-slate-500">Validity: {quotation.validityDays} Hari</div>
            <div className="text-[11px] text-slate-300 mt-1">Sektor: <strong className="text-cyan-400">{quotation.industry}</strong></div>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">
              {quotation.pricingModel === 'Monthly' ? 'Total Layanan Bulanan' : 'Total One-time Investment'}
            </span>
            <div className="font-mono font-black text-emerald-400 text-lg">
              {CurrencyService.formatCurrency(quotation.grandTotal, quotation.currency)}
              {quotation.pricingModel === 'Monthly' && <span className="text-xs font-normal text-slate-400 ml-1">/ bulan</span>}
            </div>
            {quotation.recurringMonthly > 0 && quotation.pricingModel !== 'Monthly' && (
              <div className="text-xs text-purple-400 font-mono mt-0.5">
                + {CurrencyService.formatCurrency(quotation.recurringMonthly, quotation.currency)} / bln (SLA)
              </div>
            )}
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">Approval & Secure Link</span>
            <div className="text-xs text-slate-300 font-medium">
              {quotation.approvedBy ? `Appr: ${quotation.approvedBy}` : 'Belum Disetujui'}
            </div>
            <a
              href={publicUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:underline mt-1"
            >
              <ExternalLink className="w-3 h-3" /> Preview Link Klien
            </a>
          </div>
        </div>

        {/* Approval Workflow Screen */}
        <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Commercial Approval Workflow</h3>
                <p className="text-xs text-slate-400">Proses persetujuan manajerial resmi sebelum dikirimkan ke Klien.</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setApprovalAction('APPROVE');
                  setIsApprovalModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
              >
                <CheckCircle2 className="w-4 h-4" /> Approve
              </button>
              <button
                onClick={() => {
                  setApprovalAction('REVISION');
                  setIsApprovalModalOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs flex items-center gap-1.5"
              >
                <AlertTriangle className="w-4 h-4" /> Minta Revisi
              </button>
              <button
                onClick={() => {
                  setApprovalAction('REJECT');
                  setIsApprovalModalOpen(true);
                }}
                className="px-3 py-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500 hover:text-white font-bold text-xs flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" /> Tolak
              </button>
            </div>
          </div>

          {/* Scope Diff Alert if Mismatch */}
          {scopeDiff && scopeDiff.hasScopeMismatch && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Scope Mismatch Detector:
              </div>
              <p>{scopeDiff.summaryMessage}</p>
            </div>
          )}

          {/* Approval History List */}
          {quotation.approvalHistory && quotation.approvalHistory.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider block">
                Riwayat Persetujuan Komersial:
              </span>
              {quotation.approvalHistory.map((app) => (
                <div key={app.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-start justify-between">
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>{app.approverName}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({app.role})</span>
                    </div>
                    <p className="text-slate-300 mt-1">"{app.comment}"</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      app.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {app.status}
                    </span>
                    <div className="text-[10px] text-slate-500 mt-1">{new Date(app.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detailed Items Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Layers className="w-4 h-4 text-cyan-400" /> Item & Modul Terdaftar dalam Penawaran
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-800/80 border-b border-slate-800 text-slate-400 uppercase font-semibold text-[10px]">
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Nama Item & Deskripsi</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Harga Satuan</th>
                  <th className="p-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {quotation.items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-cyan-300">{item.category}</td>
                    <td className="p-3">
                      <div className="font-bold text-white">{item.name}</div>
                      <div className="text-[11px] text-slate-400">{item.description}</div>
                    </td>
                    <td className="p-3 text-center">{item.quantity} {item.unit}</td>
                    <td className="p-3 text-right font-mono">{CurrencyService.formatCurrency(item.unitPrice, quotation.currency)}</td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-400">{CurrencyService.formatCurrency(item.subtotal, quotation.currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Approval Modal */}
      {isApprovalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl text-slate-100 space-y-4">
            <h3 className="text-lg font-bold text-white">Konfirmasi Tindakan Approval</h3>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Nama Pejabat Penyetuju</label>
              <input
                type="text"
                value={approverName}
                onChange={(e) => setApproverName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Jabatan / Role</label>
              <input
                type="text"
                value={approverRole}
                onChange={(e) => setApproverRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Catatan / Komentar Approval</label>
              <textarea
                rows={3}
                value={approvalComment}
                onChange={(e) => setApprovalComment(e.target.value)}
                placeholder="Tuliskan catatan komersial..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsApprovalModalOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:bg-slate-800"
              >
                Batal
              </button>
              <button
                onClick={handleExecuteApproval}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400"
              >
                Eksekusi {approvalAction}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Modal */}
      {sendModalOpen && (
        <SendQuotationModal
          isOpen={sendModalOpen}
          onClose={() => setSendModalOpen(false)}
          quotation={quotation}
          onSuccess={loadData}
        />
      )}
    </div>
  );
};
