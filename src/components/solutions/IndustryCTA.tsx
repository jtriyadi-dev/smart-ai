import React from 'react';
import { Sparkles, ArrowRight, Bot, Calculator, FileSearch } from 'lucide-react';
import { useNavigate } from '../../lib/router';

interface IndustryCTAProps {
  industrySlug: string;
  industryName: string;
  onRequestConsultation: () => void;
}

export const IndustryCTA: React.FC<IndustryCTAProps> = ({
  industrySlug,
  industryName,
  onRequestConsultation,
}) => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <div className="p-8 md:p-12 rounded-3xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-xl shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Transform {industryName}?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Build Your Industry Solution
          </h2>

          <p className="mt-4 text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Mulai membangun software kustom berbasis AI untuk industri {industryName} bersama SMART-AI.ID dalam waktu singkat.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate(`/ai-app-builder?industry=${encodeURIComponent(industrySlug)}`)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Sparkles className="w-5 h-5 text-cyan-200" />
              <span>Build With AI</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onRequestConsultation}
              className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-cyan-800/80 text-cyan-300 font-bold flex items-center gap-2 transition-all hover:scale-105"
            >
              <Bot className="w-5 h-5 text-cyan-400" />
              <span>Request Consultation</span>
            </button>

            <button
              onClick={() => navigate(`/ai-project-estimator?industry=${encodeURIComponent(industrySlug)}`)}
              className="px-5 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-sm flex items-center gap-2 transition-all hover:text-white"
            >
              <Calculator className="w-4 h-4 text-cyan-400" />
              <span>Get Initial Estimate</span>
            </button>

            <button
              onClick={() => navigate(`/ai-requirement-analyzer?industry=${encodeURIComponent(industrySlug)}`)}
              className="px-5 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-sm flex items-center gap-2 transition-all hover:text-white"
            >
              <FileSearch className="w-4 h-4 text-purple-400" />
              <span>Analyze Requirements</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
