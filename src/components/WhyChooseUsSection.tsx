import React from 'react';
import { WHY_CHOOSE_US } from '../data/content';
import { Code2, Sparkles, Target, Layers, Server, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface WhyChooseUsProps {
  onOpenConsultation: () => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsProps> = ({ onOpenConsultation }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-6 h-6 text-cyan-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-purple-400" />;
      case 'Target': return <Target className="w-6 h-6 text-amber-400" />;
      case 'Layers': return <Layers className="w-6 h-6 text-indigo-400" />;
      case 'Server': return <Server className="w-6 h-6 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-blue-400" />;
      default: return <CheckCircle2 className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="tentang" className="py-20 md:py-28 relative bg-[#070a12] border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d172e] border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
            <span>MENGAPA MEMILIH SMART-AI.ID</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            6 Alasan Utama Bermitra Dengan <span className="text-gradient-cyan">SMART-AI.ID</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Mitra pengembangan software terpercaya bagi perusahaan yang membutuhkan solusi digital handal, berorientasi hasil, dan didukung teknologi AI terdepan.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={idx}
              className="card-interactive p-6 sm:p-7 flex flex-col justify-between group text-left"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  {getIcon(item.iconName)}
                </div>

                <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs font-mono text-cyan-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Enterprise Standard Quality</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 p-8 rounded-2xl card-featured border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold font-display text-white">Siap Membangun Aplikasi kustom Berbasis AI?</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">
              Tim spesialis kami siap mendampingi dari tahap analisis kebutuhan hingga peluncuran di cloud production.
            </p>
          </div>

          <button
            onClick={onOpenConsultation}
            className="shrink-0 btn-primary px-6 py-3 text-xs font-bold whitespace-nowrap cursor-pointer"
          >
            Mulai Konsultasi Bebas Biaya
          </button>
        </div>

      </div>
    </section>
  );
};

