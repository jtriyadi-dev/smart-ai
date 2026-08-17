import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface AnnouncementBarProps {
  onOpenConsultation: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onOpenConsultation }) => {
  return (
    <div className="bg-gradient-to-r from-slate-950 via-[#091326] to-slate-950 border-b border-cyan-500/20 text-slate-200 text-xs py-2 sm:py-2.5 px-4 relative z-40 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center">
        {/* Highlight Pill */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm shadow-cyan-500/10 shrink-0">
          <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>Solusi Enterprise</span>
        </span>

        {/* Text */}
        <span className="text-slate-300 text-[11px] sm:text-xs font-normal tracking-wide">
          Bangun aplikasi bisnis custom berbasis AI bersama <strong className="text-white font-semibold tracking-normal">SMART-AI.ID</strong>
        </span>

        {/* Separator */}
        <span className="hidden md:inline text-slate-600 font-mono text-xs">•</span>

        {/* CTA Link Button */}
        <button
          onClick={onOpenConsultation}
          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold text-[11px] sm:text-xs group transition-all duration-200 cursor-pointer hover:underline underline-offset-4 shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded px-1"
        >
          <span>Mulai Konsultasi</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

