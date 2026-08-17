import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  Download,
  Send,
  CheckCircle2,
  Edit,
  Copy,
  ExternalLink,
  ArrowLeft,
  Clock,
  Sparkles,
  MessageSquare,
  History,
  ShieldCheck,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Proposal, ProposalStatus } from '../../types';
import { ProposalDocumentService } from '../../services/proposalDocumentService';
import { ProposalDocumentView } from '../../components/proposal/ProposalDocumentView';

export const ProposalViewPage: React.FC = () => {
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [isVersionDrawerOpen, setIsVersionDrawerOpen] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;
    const parts = pathname.split('/');
    // /admin/proposals/:id
    const propId = parts[3];

    if (propId) {
      const found = ProposalDocumentService.getProposalById(propId);
      if (found) {
        setProposal(found);
      }
    }
  }, []);

  if (!proposal) {
    return (
      <div className="min-h-screen bg-[#06090e] text-slate-100 p-8 flex items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <FileText className="w-12 h-12 text-slate-600 mx-auto animate-pulse" />
          <h2 className="text-lg font-bold">Proposal Tidak Ditemukan</h2>
          <a href="/admin/proposals" className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl inline-block">
            Kembali ke Proposal Dashboard
          </a>
        </div>
      </div>
    );
  }

  const handleUpdateStatus = (newStatus: ProposalStatus, extraNotes?: string) => {
    const updated = ProposalDocumentService.updateProposalStatus(proposal.id, newStatus, 'Sales Admin', extraNotes);
    if (updated) {
      setProposal({ ...updated });
      setActionSuccessMsg(`Status proposal berhasil diperbarui menjadi "${newStatus}".`);
      setTimeout(() => setActionSuccessMsg(null), 4000);
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/proposal/view/${proposal.publicToken}`;
    navigator.clipboard.writeText(url);
    setActionSuccessMsg('Public client link copied to clipboard!');
    setTimeout(() => setActionSuccessMsg(null), 3000);
  };

  const handlePrintOrPDF = () => {
    window.print();
  };

  const handleOpenWhatsApp = () => {
    const text = `Halo Bapak/Ibu ${proposal.contactName} (${proposal.companyName}),\n\nBerikut dokumen Proposal Resmi dari SMART-AI.ID:\n*${proposal.title}*\n\nAnda dapat melihat detail dokumen proposal pada tautan secure berikut:\n${window.location.origin}/proposal/view/${proposal.publicToken}\n\nTerima kasih!`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
    handleUpdateStatus('SENT');
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 font-sans p-4 md:p-8 space-y-6">
      {/* Top Header Bar (Hidden in Print) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800 print:hidden">
        <div className="flex items-center space-x-3">
          <a href="/admin/proposals" className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition">
            <ArrowLeft className="w-5 h-5" />
          </a>
          <div>
            <div className="flex items-center space-x-2 text-xs text-slate-400 mb-0.5">
              <span className="font-mono text-cyan-400 font-bold">{proposal.proposalNumber}</span>
              <span>•</span>
              <span className="text-amber-300 font-bold">Version {proposal.version}</span>
              <span>•</span>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-200 text-[10px] font-bold rounded">{proposal.status}</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white">{proposal.companyName}</h1>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {proposal.status === 'DRAFT' || proposal.status === 'IN REVIEW' ? (
            <button
              onClick={() => handleUpdateStatus('APPROVED')}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
            >
              <CheckCircle2 className="w-4 h-4" /> Approve Proposal
            </button>
          ) : null}

          {proposal.status === 'APPROVED' || proposal.status === 'SENT' || proposal.status === 'VIEWED' ? (
            <button
              onClick={handleOpenWhatsApp}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-600/20"
            >
              <Send className="w-4 h-4" /> Kirim via WhatsApp
            </button>
          ) : null}

          <a
            href={`/admin/proposals/${proposal.id}/edit`}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
          >
            <Edit className="w-4 h-4" /> Edit Proposal
          </a>

          <button
            onClick={handleCopyLink}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
          >
            <Copy className="w-4 h-4" /> Copy Link
          </button>

          <button
            onClick={handlePrintOrPDF}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-indigo-600/20"
          >
            <Printer className="w-4 h-4" /> Print / Export PDF
          </button>

          <button
            onClick={() => setIsVersionDrawerOpen(true)}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
            title="Version History & Audit Log"
          >
            <History className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {actionSuccessMsg && (
        <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{actionSuccessMsg}</span>
          </div>
        </div>
      )}

      {/* Document View Component */}
      <ProposalDocumentView proposal={proposal} />

      {/* Version History & Change Log Drawer */}
      <AnimatePresence>
        {isVersionDrawerOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end print:hidden">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="bg-[#0b0f19] border-l border-slate-800 w-full max-w-md h-full p-6 space-y-6 overflow-y-auto text-slate-200 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-cyan-400" /> Version History & Audit Log
                </h3>
                <button onClick={() => setIsVersionDrawerOpen(false)} className="text-slate-400 hover:text-white">
                  &times;
                </button>
              </div>

              {/* Version Items */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Daftar Versi Proposal</span>
                {proposal.versions.map((ver, idx) => (
                  <div key={idx} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-cyan-300">{ver.version}</span>
                      <span className="text-[10px] text-slate-400">{new Date(ver.date).toLocaleDateString('id-ID')}</span>
                    </div>
                    <p className="text-slate-300">{ver.summaryOfChanges || 'No change details'}</p>
                    <div className="text-[10px] text-slate-500">Oleh: {ver.author}</div>
                  </div>
                ))}
              </div>

              {/* Change Logs */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Audit Log Perubahan</span>
                {proposal.changeLogs.map((log) => (
                  <div key={log.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">{log.section}</span>
                      <span className="text-[10px] text-slate-500">{new Date(log.date).toLocaleTimeString('id-ID')}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      <span className="text-rose-400 font-mono">{log.oldValue}</span> &rarr;{' '}
                      <span className="text-emerald-400 font-mono">{log.newValue}</span>
                    </div>
                    <div className="text-[10px] text-slate-500">Oleh: {log.changedBy}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
