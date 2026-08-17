import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, AlertTriangle, CheckCircle2, ArrowRight, Brain, FileText, Loader2, X } from 'lucide-react';
import { Proposal } from '../../types';
import { AIProposalService, ProposalInputData } from '../../services/aiProposalService';

interface GenerateProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProposalCreated: (proposal: Proposal) => void;
  initialData?: Partial<ProposalInputData>;
}

export const GenerateProposalModal: React.FC<GenerateProposalModalProps> = ({
  isOpen,
  onClose,
  onProposalCreated,
  initialData
}) => {
  const init: Partial<ProposalInputData> = initialData || {};

  const [formData, setFormData] = useState<ProposalInputData>({
    companyName: init.companyName || '',
    contactName: init.contactName || '',
    contactPosition: init.contactPosition || 'IT Manager',
    contactEmail: init.contactEmail || '',
    contactPhone: init.contactPhone || '',
    companyAddress: init.companyAddress || '',
    industry: init.industry || 'Teknologi & Operasional',
    projectTitle: init.projectTitle || '',
    message: init.message || '',
    estimatedValueMax: init.estimatedValueMax || 300000000,
    leadId: init.leadId,
    opportunityId: init.opportunityId
  });

  React.useEffect(() => {
    if (isOpen) {
      const d = initialData || {};
      setFormData({
        companyName: d.companyName || '',
        contactName: d.contactName || '',
        contactPosition: d.contactPosition || 'IT Manager',
        contactEmail: d.contactEmail || '',
        contactPhone: d.contactPhone || '',
        companyAddress: d.companyAddress || '',
        industry: d.industry || 'Teknologi & Operasional',
        projectTitle: d.projectTitle || '',
        message: d.message || '',
        estimatedValueMax: d.estimatedValueMax || 300000000,
        leadId: d.leadId,
        opportunityId: d.opportunityId
      });
    }
  }, [isOpen, initialData]);

  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  // Check completeness
  const missingFields: string[] = [];
  if (!formData.companyName) missingFields.push('Nama Perusahaan');
  if (!formData.contactName) missingFields.push('Nama Kontak');
  if (!formData.projectTitle && !formData.message) missingFields.push('Judul / Deskripsi Kebutuhan Proyek');

  const isComplete = missingFields.length === 0;

  const handleGenerate = async (forceDraftAnyway = false) => {
    setIsGenerating(true);
    try {
      const generated = await AIProposalService.generateProposal({
        ...formData,
        projectTitle: formData.projectTitle || `Penawaran Solusi Enterprise - ${formData.companyName || 'Klien'}`
      });
      onProposalCreated(generated);
      onClose();
    } catch (err) {
      console.error('Failed to generate proposal:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#0b0f19] border border-cyan-500/30 rounded-2xl p-6 max-w-xl w-full space-y-5 shadow-2xl relative text-slate-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI Proposal Generator</h3>
              <p className="text-xs text-slate-400">Generate B2B software proposal draft in seconds</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Completeness Warning Banner if fields missing */}
        {!isComplete && (
          <div className="bg-amber-950/60 border border-amber-500/40 text-amber-300 p-4 rounded-xl text-xs space-y-2">
            <div className="flex items-center space-x-2 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Some project information is incomplete.</span>
            </div>
            <p className="text-slate-300">Informasi berikut belum lengkap untuk analisis AI maksimal:</p>
            <ul className="list-disc list-inside space-y-0.5 text-amber-200 font-medium">
              {missingFields.map((field, idx) => (
                <li key={idx}>{field}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Input Form Fields */}
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Nama Perusahaan *</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Contoh: PT Nusantara Energy"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Nama Kontak Person *</label>
              <input
                type="text"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                placeholder="Contoh: Bapak Hendra"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Jabatan / Position</label>
              <input
                type="text"
                value={formData.contactPosition}
                onChange={(e) => setFormData({ ...formData, contactPosition: e.target.value })}
                placeholder="Contoh: VP Information Technology"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Industri Perusahaan</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="Contoh: Pertambangan / Logistik"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1">Judul / Nama Proyek</label>
            <input
              type="text"
              value={formData.projectTitle}
              onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
              placeholder="Contoh: Penawaran Solusi Mining Telemetry Platform"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1">Detail Kebutuhan & Requirement</label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Jelaskan secara singkat masalah operasional klien dan modul yang dibutuhkan..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
            ></textarea>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="pt-3 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full md:w-auto px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-700"
          >
            Batal
          </button>

          <div className="flex items-center space-x-2 w-full md:w-auto">
            {!isComplete && (
              <button
                onClick={() => handleGenerate(true)}
                disabled={isGenerating}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-xl transition"
              >
                Generate Draft Anyway
              </button>
            )}

            <button
              onClick={() => handleGenerate(false)}
              disabled={isGenerating}
              className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing & Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Proposal Draft</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
