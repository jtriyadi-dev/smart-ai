import React, { useState, useEffect } from 'react';
import {
  FileText,
  Save,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Layers,
  DollarSign,
  Calendar,
  Shield,
  HelpCircle,
  Plus,
  Trash2,
  Eye,
  AlertTriangle,
  Lock
} from 'lucide-react';
import { Proposal, ProposalInvestmentMode } from '../../types';
import { ProposalDocumentService } from '../../services/proposalDocumentService';

export const ProposalEditorPage: React.FC = () => {
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [activeSection, setActiveSection] = useState<string>('cover');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [isNewVersionCreated, setIsNewVersionCreated] = useState(false);

  // Extract ID from pathname e.g. /admin/proposals/PROP-001/edit
  useEffect(() => {
    const pathname = window.location.pathname;
    const parts = pathname.split('/');
    // Format: /admin/proposals/:id/edit
    const propId = parts[3];

    if (propId) {
      const found = ProposalDocumentService.getProposalById(propId);
      if (found) {
        setProposal({ ...found });
      }
    }
  }, []);

  if (!proposal) {
    return (
      <div className="min-h-screen bg-[#06090e] text-slate-100 p-8 flex items-center justify-center">
        <div className="text-center space-y-4">
          <FileText className="w-12 h-12 text-slate-600 mx-auto animate-pulse" />
          <h2 className="text-lg font-bold">Proposal Tidak Ditemukan</h2>
          <a href="/admin/proposals" className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl inline-block">
            Kembali ke Dashboard Proposal
          </a>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (!proposal) return;

    // Check if approved, create new version automatically
    if (proposal.status === 'APPROVED' || proposal.status === 'SENT') {
      const updated = ProposalDocumentService.createNewVersion(
        proposal,
        'Sales Admin',
        'Pembaruan konten dan syarat komersial proposal'
      );
      setProposal({ ...updated });
      setIsNewVersionCreated(true);
      setSaveSuccessMsg(`Proposal telah diperbarui & dibuat versi baru (${updated.version})!`);
    } else {
      const updated = ProposalDocumentService.saveProposal(proposal);
      setProposal({ ...updated });
      setSaveSuccessMsg('Perubahan proposal berhasil disimpan!');
    }

    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  const sections = [
    { id: 'cover', label: 'Cover & Company Info' },
    { id: 'summary', label: 'Executive Summary' },
    { id: 'problem', label: 'Customer Problem & Objectives' },
    { id: 'solution', label: 'Proposed Solution' },
    { id: 'modules', label: 'Modules & Features' },
    { id: 'tech', label: 'Technology & Architecture' },
    { id: 'scope', label: 'Scope, Assumptions & Exclusions' },
    { id: 'timeline', label: 'Timeline & Methodology' },
    { id: 'investment', label: 'Commercial & Investment' },
    { id: 'terms', label: 'Terms & Conditions' }
  ];

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 font-sans p-4 md:p-8 space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <a
            href={`/admin/proposals/${proposal.id}`}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </a>
          <div>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span className="font-mono text-cyan-400 font-bold">{proposal.proposalNumber}</span>
              <span>•</span>
              <span className="text-amber-300 font-bold">{proposal.version}</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white">Proposal Editor</h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href={`/admin/proposals/${proposal.id}`}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-2 border border-slate-700"
          >
            <Eye className="w-4 h-4 text-cyan-400" /> Preview
          </a>

          <button
            onClick={handleSave}
            className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <Save className="w-4 h-4" /> Simpan Perubahan
          </button>
        </div>
      </div>

      {/* Save Success Banner */}
      {saveSuccessMsg && (
        <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{saveSuccessMsg}</span>
          </div>
        </div>
      )}

      {/* Editor Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Section Navigation (3 Cols) */}
        <div className="lg:col-span-3 space-y-2">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1 block">
              Daftar Section Document
            </span>

            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
                  activeSection === sec.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{sec.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Active Section Form (9 Cols) */}
        <div className="lg:col-span-9 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs">
          {/* SECTION: COVER */}
          {activeSection === 'cover' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-white border-b border-slate-800 pb-2">Cover & Customer Information</h2>

              <div>
                <label className="font-semibold block mb-1">Judul Proposal / Project Title</label>
                <input
                  type="text"
                  value={proposal.title}
                  onChange={(e) => setProposal({ ...proposal, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1">Nama Perusahaan Klien</label>
                  <input
                    type="text"
                    value={proposal.companyName}
                    onChange={(e) => setProposal({ ...proposal, companyName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Nama Personil Kontak</label>
                  <input
                    type="text"
                    value={proposal.contactName}
                    onChange={(e) => setProposal({ ...proposal, contactName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1">Email Kontak</label>
                  <input
                    type="text"
                    value={proposal.contactEmail || ''}
                    onChange={(e) => setProposal({ ...proposal, contactEmail: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Telepon / WhatsApp Kontak</label>
                  <input
                    type="text"
                    value={proposal.contactPhone || ''}
                    onChange={(e) => setProposal({ ...proposal, contactPhone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION: SUMMARY */}
          {activeSection === 'summary' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-white border-b border-slate-800 pb-2">Executive Summary</h2>
              <div>
                <label className="font-semibold block mb-1">Teks Ringkasan Eksekutif</label>
                <textarea
                  rows={6}
                  value={proposal.executiveSummary}
                  onChange={(e) => setProposal({ ...proposal, executiveSummary: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 leading-relaxed focus:outline-none focus:border-cyan-500"
                ></textarea>
              </div>
            </div>
          )}

          {/* SECTION: PROBLEM */}
          {activeSection === 'problem' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-white border-b border-slate-800 pb-2">Customer Problem & Objectives</h2>

              <div>
                <label className="font-semibold block mb-1">Situasi & Tantangan Operasional Saat Ini</label>
                <textarea
                  rows={3}
                  value={proposal.customerProblem.currentSituation}
                  onChange={(e) =>
                    setProposal({
                      ...proposal,
                      customerProblem: { ...proposal.customerProblem, currentSituation: e.target.value }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-cyan-500"
                ></textarea>
              </div>

              <div>
                <label className="font-semibold block mb-1">Dampak Terhadap Bisnis (Business Impact)</label>
                <input
                  type="text"
                  value={proposal.customerProblem.businessImpact}
                  onChange={(e) =>
                    setProposal({
                      ...proposal,
                      customerProblem: { ...proposal.customerProblem, businessImpact: e.target.value }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          )}

          {/* SECTION: MODULES */}
          {activeSection === 'modules' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h2 className="text-base font-bold text-white">Project Modules</h2>
                <button
                  onClick={() =>
                    setProposal({
                      ...proposal,
                      modules: [
                        ...proposal.modules,
                        {
                          name: 'Modul Baru',
                          category: 'Operations',
                          description: 'Deskripsi modul baru',
                          keyFeatures: ['Fitur 1', 'Fitur 2']
                        }
                      ]
                    })
                  }
                  className="px-3 py-1 bg-cyan-500 text-slate-950 font-bold rounded-lg flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Modul
                </button>
              </div>

              <div className="space-y-4">
                {proposal.modules.map((mod, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 relative">
                    <button
                      onClick={() =>
                        setProposal({
                          ...proposal,
                          modules: proposal.modules.filter((_, i) => i !== idx)
                        })
                      }
                      className="absolute top-3 right-3 text-rose-400 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold block mb-1">Nama Modul</label>
                        <input
                          type="text"
                          value={mod.name}
                          onChange={(e) => {
                            const newMods = [...proposal.modules];
                            newMods[idx].name = e.target.value;
                            setProposal({ ...proposal, modules: newMods });
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="font-semibold block mb-1">Kategori</label>
                        <input
                          type="text"
                          value={mod.category}
                          onChange={(e) => {
                            const newMods = [...proposal.modules];
                            newMods[idx].category = e.target.value;
                            setProposal({ ...proposal, modules: newMods });
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold block mb-1">Deskripsi Modul</label>
                      <textarea
                        rows={2}
                        value={mod.description}
                        onChange={(e) => {
                          const newMods = [...proposal.modules];
                          newMods[idx].description = e.target.value;
                          setProposal({ ...proposal, modules: newMods });
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200"
                      ></textarea>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: COMMERCIAL & INVESTMENT */}
          {activeSection === 'investment' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-white border-b border-slate-800 pb-2">Commercial & Investment</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold block mb-1">Mode Pricing</label>
                  <select
                    value={proposal.investment.mode}
                    onChange={(e) =>
                      setProposal({
                        ...proposal,
                        investment: { ...proposal.investment, mode: e.target.value as ProposalInvestmentMode }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="Estimated">Estimated Investment (Range)</option>
                    <option value="Fixed">Fixed Price Proposal</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Batas Minimal (Rp)</label>
                  <input
                    type="number"
                    value={proposal.investment.rangeMin}
                    onChange={(e) =>
                      setProposal({
                        ...proposal,
                        investment: { ...proposal.investment, rangeMin: Number(e.target.value) }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Batas Maksimal (Rp)</label>
                  <input
                    type="number"
                    value={proposal.investment.rangeMax}
                    onChange={(e) =>
                      setProposal({
                        ...proposal,
                        investment: { ...proposal.investment, rangeMax: Number(e.target.value) }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION: TERMS */}
          {activeSection === 'terms' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-white border-b border-slate-800 pb-2">Terms & Conditions</h2>

              <div className="space-y-3">
                {proposal.termsAndConditions.map((term, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2">
                    <input
                      type="text"
                      value={term.title}
                      onChange={(e) => {
                        const newTerms = [...proposal.termsAndConditions];
                        newTerms[idx].title = e.target.value;
                        setProposal({ ...proposal, termsAndConditions: newTerms });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 font-bold text-cyan-300"
                    />
                    <textarea
                      rows={2}
                      value={term.content}
                      onChange={(e) => {
                        const newTerms = [...proposal.termsAndConditions];
                        newTerms[idx].content = e.target.value;
                        setProposal({ ...proposal, termsAndConditions: newTerms });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200"
                    ></textarea>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Default fallback for other sections */}
          {!['cover', 'summary', 'problem', 'modules', 'investment', 'terms'].includes(activeSection) && (
            <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800 text-slate-400 space-y-2">
              <Sparkles className="w-8 h-8 text-cyan-400 mx-auto" />
              <h3 className="text-sm font-bold text-white">Section "{activeSection}"</h3>
              <p className="text-xs text-slate-400">Konten section ini dibuat secara otomatis oleh AI dan siap dipreview.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
