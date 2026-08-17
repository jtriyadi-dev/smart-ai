import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Printer,
  MessageSquare,
  FileText,
  Building2,
  Sparkles,
  XCircle,
  AlertTriangle,
  Loader2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Proposal } from '../types';
import { ProposalDocumentService } from '../services/proposalDocumentService';
import { ProposalDocumentView } from '../components/proposal/ProposalDocumentView';

export const PublicProposalViewPage: React.FC = () => {
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const pathname = window.location.pathname;
    const parts = pathname.split('/');
    // Format: /proposal/view/:token
    const token = parts[3];

    if (token) {
      const found = ProposalDocumentService.getProposalByPublicToken(token);
      if (found) {
        setProposal(found);

        // Auto track view count & status change to VIEWED
        if (found.status === 'SENT') {
          ProposalDocumentService.updateProposalStatus(found.id, 'VIEWED', 'Customer Client');
        } else {
          ProposalDocumentService.updateProposalStatus(found.id, found.status, 'Customer Client');
        }
      }
    }
  }, []);

  if (!proposal) {
    return (
      <div className="min-h-screen bg-[#06090e] text-slate-100 p-8 flex items-center justify-center font-sans">
        <div className="text-center space-y-4 max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl">
          <FileText className="w-12 h-12 text-slate-600 mx-auto" />
          <h2 className="text-xl font-bold text-white">Proposal Tidak Ditemukan / Link Kedaluwarsa</h2>
          <p className="text-xs text-slate-400">
            Link proposal yang Anda buka tidak valid atau telah mengalami pembaruan. Silakan hubungi tim SMART-AI.ID.
          </p>
        </div>
      </div>
    );
  }

  const handleAcceptProposal = () => {
    const updated = ProposalDocumentService.updateProposalStatus(proposal.id, 'ACCEPTED', 'Customer Representative');
    if (updated) {
      setProposal({ ...updated });
      setActionSuccessMsg('Terima kasih! Anda telah menyetujui proposal ini secara resmi.');
    }
  };

  const handleSendRevision = () => {
    if (!revisionNotes) return;

    proposal.revisionRequest = revisionNotes;
    const updated = ProposalDocumentService.updateProposalStatus(
      proposal.id,
      'IN REVIEW',
      'Customer Representative',
      `Permohonan Revisi: ${revisionNotes}`
    );

    if (updated) {
      setProposal({ ...updated });
      setIsRevisionModalOpen(false);
      setActionSuccessMsg('Permohonan revisi proposal Anda telah terkirim kepada tim SMART-AI.ID.');
    }
  };

  return (
    <div className="min-h-screen bg-[#040711] text-slate-100 font-sans p-4 md:p-8 space-y-6 selection:bg-cyan-500/30">
      {/* Top Floating Client Action Bar (Hidden in Print) */}
      <div className="max-w-4xl mx-auto bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-4 z-40 shadow-2xl print:hidden">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-black text-slate-950 text-sm">
            AI
          </div>
          <div>
            <div className="text-xs font-bold text-white">SMART-AI.ID Official Client Portal</div>
            <div className="text-[11px] text-slate-400">
              Proposal #{proposal.proposalNumber} — Versi <span className="text-amber-300 font-bold">{proposal.version}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {proposal.status !== 'ACCEPTED' && (
            <>
              <button
                onClick={handleAcceptProposal}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
              >
                <CheckCircle2 className="w-4 h-4" /> Setujui Proposal
              </button>

              <button
                onClick={() => setIsRevisionModalOpen(true)}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4 text-cyan-400" /> Request Revision
              </button>
            </>
          )}

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-indigo-600/20"
          >
            <Printer className="w-4 h-4" /> Cetak / Export PDF
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {actionSuccessMsg && (
        <div className="max-w-4xl mx-auto bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 p-4 rounded-2xl text-xs font-bold flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{actionSuccessMsg}</span>
          </div>
          <button onClick={() => setActionSuccessMsg(null)} className="text-emerald-400 hover:text-white">
            &times;
          </button>
        </div>
      )}

      {/* Document View Component */}
      <ProposalDocumentView proposal={proposal} />

      {/* Revision Request Modal */}
      <AnimatePresence>
        {isRevisionModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 print:hidden">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0b0f19] border border-cyan-500/30 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl text-slate-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-cyan-400" /> Ajukan Catatan Revisi Proposal
                </h3>
                <button onClick={() => setIsRevisionModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <p className="text-slate-300">
                  Tuliskan poin penyesuaian scope, timeline, atau komersial yang Anda harapkan dari tim SMART-AI.ID:
                </p>
                <textarea
                  rows={4}
                  value={revisionNotes}
                  onChange={(e) => setRevisionNotes(e.target.value)}
                  placeholder="Contoh: Mohon penyesuaian modul Fleet Telemetry agar ditambahkan fitur alarm suara di aplikasi driver..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2">
                <button
                  onClick={() => setIsRevisionModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  onClick={handleSendRevision}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl"
                >
                  Kirim Catatan Revisi
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
