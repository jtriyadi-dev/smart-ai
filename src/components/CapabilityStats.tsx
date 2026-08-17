import React from 'react';
import { Code2, Cpu, ShieldCheck, Layers, Sparkles } from 'lucide-react';

export const CapabilityStats: React.FC = () => {
  const capabilities = [
    {
      metric: '100% CUSTOM',
      title: 'Custom Applications',
      desc: 'Aplikasi web yang dirancang dan dibangun khusus dari nol sesuai alur kerja & aturan operasional bisnis Anda.',
      icon: Code2,
      badge: 'Tailored Workflow'
    },
    {
      metric: 'GEMINI AI',
      title: 'AI-Powered System',
      desc: 'Diintegrasikan dengan model AI Generatif, RAG dokumen internal, dan otomatisasi cerdas berkecepatan tinggi.',
      icon: Cpu,
      badge: 'Enterprise LLM'
    },
    {
      metric: 'ENTERPRISE',
      title: 'Enterprise Ready',
      desc: 'Sistem terenkripsi dengan Role-Based Access Control, audit log, kepatuhan keamanan, dan standar produksi.',
      icon: ShieldCheck,
      badge: 'High Security'
    },
    {
      metric: 'CLOUD NATIVE',
      title: 'Scalable Architecture',
      desc: 'Arsitektur modular berbasis cloud yang siap dikembangkan seiring dengan pertumbuhan dan ekspansi bisnis.',
      icon: Layers,
      badge: 'High Availability'
    }
  ];

  return (
    <section className="py-20 bg-[#06090e] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d172e] border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>KAPABILITAS TEKNOLOGI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Teknologi yang Dibangun untuk <span className="text-gradient-cyan">Kebutuhan Bisnis</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Fondasi rekayasa perangkat lunak modern untuk memastikan aplikasi bisnis Anda cepat, aman, responsif, dan siap dikembangkan jangka panjang.
          </p>
        </div>

        {/* 4 Capability Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {capabilities.map((cap) => {
            const IconComp = cap.icon;
            return (
              <div
                key={cap.title}
                className="card-interactive p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-500/50 transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-500/30">
                      {cap.badge}
                    </span>
                  </div>

                  <div className="text-2xl font-extrabold font-mono text-white tracking-tight pt-1 group-hover:text-cyan-300 transition-colors">
                    {cap.metric}
                  </div>

                  <h3 className="text-base font-bold text-white">
                    {cap.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {cap.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Standard Architecture</span>
                  <span className="text-cyan-400">✓ Production Grade</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
