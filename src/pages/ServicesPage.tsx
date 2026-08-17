import React from 'react';
import { SERVICES_LIST } from '../data/content';
import { ServiceItem } from '../types';
import { Sparkles, ArrowRight, CheckCircle2, Code2, Server, Bot, BarChart3, Workflow, Network } from 'lucide-react';

interface ServicesPageProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenConsultation: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onSelectService, onOpenConsultation }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot': return <Bot className="w-6 h-6 text-cyan-400" />;
      case 'Code2': return <Code2 className="w-6 h-6 text-indigo-400" />;
      case 'Workflow': return <Workflow className="w-6 h-6 text-purple-400" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-emerald-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-400" />;
      case 'Network': return <Network className="w-6 h-6 text-cyan-300" />;
      default: return <Server className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div className="py-24 md:py-32 bg-[#06090e] bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>LAYANAN PENGEMBANGAN APLIKASI CUSTOM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Layanan Spesialis <span className="text-gradient-cyan">SMART-AI.ID</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Kami merancang, membangun, dan menyempurnakan aplikasi web kustom yang terintegrasi dengan teknologi Artificial Intelligence (AI) terkini untuk mendukung operasional bisnis skala menengah hingga enterprise.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="glass-card rounded-2xl p-7 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(service.iconName)}
                  </div>

                  {service.badge && (
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                <div className="space-y-2 mb-6 pt-4 border-t border-slate-800/80">
                  <div className="text-[11px] font-mono text-cyan-400 font-bold uppercase">Fitur Kunci:</div>
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectService(service)}
                className="w-full py-3 bg-slate-900 hover:bg-cyan-950/80 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-300 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Lihat Spesifikasi Detail</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 p-8 rounded-2xl glass-panel border border-cyan-500/30 text-center space-y-4">
          <h3 className="text-xl font-bold text-white font-display">Membutuhkan Solusi Custom di Luar Daftar Layanan di Atas?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Tim solusi arsitek kami siap mendengarkan kebutuhan khusus industri Anda dan menyusun proposal teknis yang disesuaikan.
          </p>
          <button
            onClick={onOpenConsultation}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            Konsultasikan Kebutuhan Anda
          </button>
        </div>

      </div>
    </div>
  );
};
