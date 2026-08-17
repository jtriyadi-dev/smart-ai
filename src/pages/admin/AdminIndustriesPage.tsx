import React, { useState } from 'react';
import { Factory, Search, Plus, Edit, Sparkles, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { IndustrySolutionsService } from '../../services/IndustrySolutionsService';
import { IndustrySolutionConfig } from '../../types';

export const AdminIndustriesPage: React.FC = () => {
  const [industries, setIndustries] = useState<IndustrySolutionConfig[]>(IndustrySolutionsService.getAllSolutions());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustrySolutionConfig | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredSolutions = industries.filter(
    (ind) =>
      ind.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ind.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ind.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (solution: IndustrySolutionConfig) => {
    setSelectedIndustry({ ...solution });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndustry) {
      setIndustries(industries.map((i) => (i.slug === selectedIndustry.slug ? selectedIndustry : i)));
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari 19 Sektor Industri (Mining, Hospital, School, Poultry...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="text-xs font-mono text-cyan-400 font-bold bg-cyan-950/80 px-3 py-1.5 rounded-xl border border-cyan-800">
          Total 19 Dedicated Industry Modules
        </div>
      </div>

      {/* Industries Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSolutions.map((ind) => (
          <div
            key={ind.slug}
            className="glass-card rounded-2xl p-5 border border-white/10 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {ind.category.toUpperCase()}
                </span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">SLUG: {ind.slug}</span>
              </div>

              <h3 className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                {ind.name}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{ind.heroDescription || ind.subtitle}</p>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-[11px]">
                <div className="font-mono text-purple-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Subjudul Solusi:</span>
                </div>
                <p className="text-slate-300 line-clamp-1">{ind.subtitle}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                {ind.businessImpactSummary?.[0] || `${ind.modules?.length || 0} Modul AI`}
              </span>
              <button
                onClick={() => handleEdit(ind)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Manage</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {modalOpen && selectedIndustry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white font-display">
                Edit Solusi Industri: {selectedIndustry.name}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded bg-slate-800 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Nama Solusi</label>
                <input
                  type="text"
                  required
                  value={selectedIndustry.name}
                  onChange={(e) => setSelectedIndustry({ ...selectedIndustry, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Subtitle</label>
                <input
                  type="text"
                  value={selectedIndustry.subtitle}
                  onChange={(e) => setSelectedIndustry({ ...selectedIndustry, subtitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Deskripsi Hero</label>
                <textarea
                  rows={2}
                  value={selectedIndustry.heroDescription}
                  onChange={(e) => setSelectedIndustry({ ...selectedIndustry, heroDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Tagline</label>
                <input
                  type="text"
                  value={selectedIndustry.heroTagline}
                  onChange={(e) => setSelectedIndustry({ ...selectedIndustry, heroTagline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold cursor-pointer"
                >
                  Simpan Industri
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
