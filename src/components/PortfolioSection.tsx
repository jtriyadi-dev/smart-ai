import React, { useState } from 'react';
import { PORTFOLIO_CONCEPTS } from '../data/content';
import { PortfolioItem } from '../types';
import { Sparkles, ArrowRight, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PortfolioSectionProps {
  onSelectPortfolio: (item: PortfolioItem) => void;
  onOpenConsultation: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectPortfolio, onOpenConsultation }) => {
  const [activeTag, setActiveTag] = useState<string>('all');

  const allTags = ['all', 'Pertambangan', 'Perkebunan', 'Rumah Sakit', 'Pendidikan', 'Supply Chain', 'AI Copilot'];

  const filteredPortfolios = activeTag === 'all'
    ? PORTFOLIO_CONCEPTS
    : PORTFOLIO_CONCEPTS.filter(item => item.tags.includes(activeTag) || item.industry.toLowerCase().includes(activeTag.toLowerCase()));

  return (
    <section id="portfolio" className="py-20 md:py-28 relative bg-[#06090e] bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d172e] border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>PORTFOLIO & CONCEPTUAL SOLUTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Konsep Solusi <span className="text-gradient-cyan">Aplikasi AI Custom</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Gambaran visual dan blueprint arsitektur aplikasi custom yang siap diadaptasikan dan dibangun khusus sesuai kebutuhan unik perusahaan Anda.
          </p>

          {/* Badge Label Explanation */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-[11px] font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Label: Concept / Custom Solution Architecture</span>
          </div>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 font-mono text-xs">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer font-semibold ${
                activeTag === tag
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tag === 'all' ? 'Semua Solusi' : tag}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPortfolios.map((item) => (
            <div
              key={item.id}
              className="card-interactive overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Visual Banner Header */}
                <div className={`h-32 bg-gradient-to-br ${item.imageBg} p-4 flex flex-col justify-between relative border-b border-white/10 overflow-hidden text-left`}>
                  <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Sparkles className="w-16 h-16 text-cyan-400" />
                  </div>

                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-amber-950/90 text-amber-300 border border-amber-500/40">
                      {item.badge}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                      {item.industry}
                    </span>
                  </div>

                  <h3 className="text-base font-display font-bold text-white group-hover:text-cyan-300 transition-colors relative z-10">
                    {item.title}
                  </h3>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-4 text-left">
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 font-normal">
                    {item.description}
                  </p>

                  {/* Impact Metrics Badges */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                    {item.metrics.map((m, idx) => (
                      <div key={idx} className="bg-slate-950/80 p-2 rounded-lg border border-slate-800 text-center">
                        <div className="text-[9px] text-slate-400 font-mono">{m.label}</div>
                        <div className="text-sm font-extrabold text-cyan-400 font-mono">{m.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* AI Feature highlight */}
                  <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-[11px] text-slate-300">
                    <span className="text-cyan-400 font-semibold font-mono block mb-0.5">Fitur AI Utama:</span>
                    <span className="text-slate-300 font-normal">{item.aiFeature}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectPortfolio(item)}
                  className="w-full btn-outline py-2.5 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer group/btn"
                >
                  <span>Spesifikasi & Arsitektur</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Custom Application CTA Banner */}
        <div className="mt-12 text-center p-8 rounded-2xl card-featured border border-cyan-500/30 max-w-3xl mx-auto space-y-3">
          <h3 className="text-xl font-bold font-display text-white">Ingin Mewujudkan Konsep Aplikasi untuk Bisnis Anda?</h3>
          <p className="text-xs sm:text-sm text-slate-300 font-normal">
            Tim SMART-AI.ID siap merancang prototype dan arsitektur aplikasi sesuai dengan alur kerja spesifik perusahaan Anda.
          </p>
          <button
            onClick={onOpenConsultation}
            className="btn-primary px-6 py-3 text-xs font-bold cursor-pointer inline-flex items-center gap-2"
          >
            <span>Ajukan Diskusi Proyek Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

