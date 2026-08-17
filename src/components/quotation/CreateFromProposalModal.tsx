import React, { useState, useEffect } from 'react';
import { X, FileText, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Proposal } from '../../types';
import { ProposalDocumentService } from '../../services/proposalDocumentService';
import { QuotationDocumentService } from '../../services/QuotationDocumentService';

interface CreateFromProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuotationCreated: (newQuotationId: string) => void;
}

export const CreateFromProposalModal: React.FC<CreateFromProposalModalProps> = ({
  isOpen,
  onClose,
  onQuotationCreated
}) => {
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    if (isOpen) {
      setProposals(ProposalDocumentService.getAllProposals());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectProposal = (proposal: Proposal) => {
    const q = QuotationDocumentService.createQuotationFromProposal(proposal, 'Sales Executive');
    onQuotationCreated(q.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 sm:p-8 my-8 shadow-2xl text-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800/60 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Buat Quotation dari Proposal</h3>
            <p className="text-xs text-slate-400">Pilih dokumen proposal terdaftar untuk mengimpor data customer & spesifikasi modul.</p>
          </div>
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          {proposals.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              Belum ada dokumen proposal yang tersimpan.
            </div>
          ) : (
            proposals.map((prop) => (
              <div
                key={prop.id}
                onClick={() => handleSelectProposal(prop)}
                className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 transition-all cursor-pointer group flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-cyan-400">{prop.proposalNumber}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold uppercase">
                      {prop.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {prop.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Customer: <span className="text-slate-200">{prop.companyName}</span> ({prop.contactName})
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-slate-800 text-slate-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 flex justify-end border-t border-slate-800 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};
