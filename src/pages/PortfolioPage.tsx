import React from 'react';
import { PORTFOLIO_LIST } from '../data/content';
import { PortfolioItem } from '../types';
import { Layers, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

interface PortfolioPageProps {
  onSelectPortfolio: (item: PortfolioItem) => void;
  onOpenConsultation: () => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onSelectPortfolio, onOpenConsultation }) => {
  return (
    <div className="py-24 md:py-32 bg-[#06090e] bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>BLUEPRINT PORTFOLIO & SOLUSI KONSEPTUAL</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Portfolio <span className="text-gradient-cyan">Sistem AI Enterprise</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Eksplorasi contoh arsitektur blueprint aplikasi web berbasis AI yang dirancang oleh tim SMART-AI.ID untuk berbagai sektor bisnis strategis.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_LIST.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Card Header Banner */}
                <div className={`h-36 ${item.imageBg} p-5 flex flex-col justify-between relative`}>
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-950/80 text-cyan-300 border border-cyan-500/40">
                      {item.badge}
                    </span>
                    <span className="text-[10px] font-mono text-slate-300 bg-slate-950/60 px-2 py-0.5 rounded">
                      {item.industry}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white z-10 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-[10px] font-mono text-purple-300 font-bold uppercase flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      <span>Fitur AI Utama:</span>
                    </div>
                    <p className="text-[11px] text-slate-300">{item.aiFeature}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectPortfolio(item)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-cyan-950/80 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-300 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Lihat Detail Blueprint</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenConsultation}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-white font-bold text-xs rounded-xl shadow-xl shadow-cyan-500/25 transition-all cursor-pointer"
          >
            Minta Rencana Blueprint untuk Perusahaan Anda
          </button>
        </div>

      </div>
    </div>
  );
};
