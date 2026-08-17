import React, { useState } from 'react';
import { INDUSTRY_SOLUTIONS } from '../data/content';
import { IndustrySolution } from '../types';
import { Building2, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface IndustriesPageProps {
  onSelectIndustry: (industry: IndustrySolution) => void;
  onOpenConsultation: () => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onSelectIndustry, onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Industri' },
    { id: 'primary', label: 'Pertambangan & Energi' },
    { id: 'agriculture', label: 'Sawit, Peternakan & Tambak' },
    { id: 'healthcare', label: 'Kesehatan & Pendidikan' },
    { id: 'operations', label: 'Manufaktur & Logistik' },
    { id: 'commerce', label: 'Ritel & Restaurant' },
  ];

  const filteredIndustries = selectedCategory === 'all'
    ? INDUSTRY_SOLUTIONS
    : INDUSTRY_SOLUTIONS.filter(item => item.category === selectedCategory);

  return (
    <div className="py-24 md:py-32 bg-[#06090e] bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>SOLUSI SPESIFIK BERDASARKAN SEKTOR INDUSTRI</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Solusi Industri <span className="text-gradient-cyan">Terintegrasi</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Arsitektur software custom SMART-AI.ID dirancang khusus untuk memecahkan tantangan operasional lapangan, kepatuhan regulasi, dan otomatisasi workflows di berbagai lini bisnis unggulan Indonesia.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Industry Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIndustries.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl p-6 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                    {item.impactMetrics}
                  </span>
                </div>

                <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {item.shortDesc}
                </p>

                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 mb-4 space-y-1">
                  <div className="text-[10px] font-mono text-cyan-300 font-bold uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>Kapabilitas AI:</span>
                  </div>
                  <p className="text-[11px] text-slate-200">{item.aiCapability}</p>
                </div>
              </div>

              <button
                onClick={() => onSelectIndustry(item)}
                className="w-full py-2.5 bg-slate-900 hover:bg-cyan-950/80 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-300 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Solution</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenConsultation}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-white font-bold text-xs rounded-xl shadow-xl shadow-cyan-500/25 transition-all cursor-pointer"
          >
            Diskusi Kebutuhan Industri Anda
          </button>
        </div>

      </div>
    </div>
  );
};
