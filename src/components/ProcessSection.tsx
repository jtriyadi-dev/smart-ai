import React from 'react';
import { PROCESS_STEPS } from '../data/content';
import { MessageSquare, FileSearch, Layout, Code, CheckCircle2, Rocket, ArrowRight, Clock } from 'lucide-react';

interface ProcessSectionProps {
  onOpenConsultation: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenConsultation }) => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-cyan-400" />;
      case 'FileSearch': return <FileSearch className="w-5 h-5 text-indigo-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-purple-400" />;
      case 'Code': return <Code className="w-5 h-5 text-emerald-400" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-amber-400" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-rose-400" />;
      default: return <CheckCircle2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section className="py-20 md:py-28 relative bg-[#06090e] bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d172e] border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
            <span>METHODOLOGY & WORKFLOW</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Bagaimana Kami Membangun <span className="text-gradient-cyan">Aplikasi Anda</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Metodologi terstruktur, cepat, dan transparan dari awal konsultasi hingga peluncuran aplikasi siap pakai. Kami menjaga komunikasi intensif di setiap tahapan proyek.
          </p>
        </div>

        {/* Timeline Grid (6 Steps) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="card-interactive p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getStepIcon(step.iconName)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase font-bold">
                        Langkah 0{step.stepNumber}
                      </span>
                      <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800 shrink-0">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>{step.duration}</span>
                  </div>
                </div>

                {/* Subtitle */}
                <p className="text-xs font-semibold text-cyan-400 mb-2 font-mono">{step.subtitle}</p>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-5 font-normal">
                  {step.description}
                </p>

                {/* Deliverables */}
                <div className="pt-4 border-t border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-semibold mb-1">
                    Output & Deliverables:
                  </span>
                  {step.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step indicator footer */}
              <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Phase 0{step.stepNumber} of 06</span>
                <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Detail <ArrowRight className="w-3 h-3" />
                </span>
              </div>

            </div>
          ))}

        </div>

        {/* CTA Bottom Callout */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenConsultation}
            className="btn-primary px-8 py-3.5 text-xs sm:text-sm font-bold cursor-pointer inline-flex items-center gap-2"
          >
            <Rocket className="w-4 h-4 text-cyan-200" />
            <span>Mulai Langkah Pertama: Konsultasi Gratis</span>
          </button>
        </div>

      </div>
    </section>
  );
};

