import React, { useState, useEffect } from 'react';
import { Cpu, Sparkles, CheckCircle2, Loader2, Workflow, Shield, Database, Layers } from 'lucide-react';

interface ModuleLoadingStateProps {
  industry: string;
  businessType: string;
}

const STAGES = [
  { label: 'Understanding Industry Context', icon: Workflow, desc: 'Menganalisis karakteristik industri & regulasi' },
  { label: 'Analyzing Business Processes', icon: Layers, desc: 'Memetakan alur kerja utama & operasional' },
  { label: 'Mapping Operational Areas', icon: Cpu, desc: 'Mengidentifikasi divisi & tanggung jawab' },
  { label: 'Identifying Core Modules', icon: Database, desc: 'Menyusun modul utama & fungsionalitas dasar' },
  { label: 'Identifying Supporting Modules', icon: Shield, desc: 'Menyusun modul pendukung, SDM & keuangan' },
  { label: 'Identifying AI Opportunities', icon: Sparkles, desc: 'Menemukan titik penerapan kecerdasan buatan' },
  { label: 'Checking Module Dependencies', icon: Workflow, desc: 'Memetakan keterhubungan antar modul' },
  { label: 'Optimizing Application Structure', icon: CheckCircle2, desc: 'Menyusun struktur modul paling efisien' }
];

export const ModuleLoadingState: React.FC<ModuleLoadingStateProps> = ({ industry, businessType }) => {
  const [currentStage, setCurrentStage] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[450px] flex flex-col items-center justify-center p-8 bg-slate-900/90 border border-slate-800 rounded-2xl relative overflow-hidden text-center my-6">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Center Spinner */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full border-4 border-slate-800 border-t-blue-500 border-r-cyan-400 animate-spin flex items-center justify-center shadow-lg shadow-blue-500/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">
        AI Sedang Menyusun Modul Aplikasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{industry}</span>
      </h3>
      <p className="text-sm text-slate-400 mb-8 max-w-lg">
        Menyesuaikan arsitektur produk dengan jenis bisnis <span className="text-slate-200 font-semibold">{businessType}</span>.
      </p>

      {/* Stage Progress List */}
      <div className="w-full max-w-md space-y-3 text-left bg-slate-950/80 p-5 rounded-xl border border-slate-800/80 shadow-inner">
        {STAGES.map((stage, idx) => {
          const isDone = idx < currentStage;
          const isCurrent = idx === currentStage;
          const Icon = stage.icon;

          return (
            <div
              key={stage.label}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                isCurrent
                  ? 'bg-blue-950/80 border border-blue-500/50 text-blue-300'
                  : isDone
                  ? 'text-slate-300'
                  : 'text-slate-600 opacity-60'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-5 h-5 text-cyan-400 animate-spin shrink-0" />
              ) : (
                <div className="w-5 h-5 rounded-full border border-slate-700 shrink-0 flex items-center justify-center text-[10px] font-mono">
                  {idx + 1}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold tracking-wide flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{stage.label}</span>
                </div>
                {isCurrent && <p className="text-[11px] text-cyan-300/80 mt-0.5 truncate">{stage.desc}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
