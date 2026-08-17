import React from 'react';
import * as Icons from 'lucide-react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface WorkflowStep {
  step: number;
  title: string;
  desc: string;
  icon: string;
}

interface WorkflowSectionProps {
  steps?: WorkflowStep[];
}

const DEFAULT_STEPS: WorkflowStep[] = [
  { step: 1, title: 'Data Capture', desc: 'Pengumpulan data otomatis dari IoT, sensor, & input pengguna.', icon: 'Database' },
  { step: 2, title: 'Operation', desc: 'Eksekusi proses bisnis harian yang efisien.', icon: 'Cpu' },
  { step: 3, title: 'Monitoring', desc: 'Pemantauan status & KPI secara live 24/7.', icon: 'Activity' },
  { step: 4, title: 'Analytics', desc: 'Kalkulasi tren dan agregasi metrik.', icon: 'BarChart3' },
  { step: 5, title: 'AI Insight', desc: 'Deteksi anomali, analisis, & prediksi AI.', icon: 'Sparkles' },
  { step: 6, title: 'Decision', desc: 'Rekomendasi tindakan presisi untuk pimpinan.', icon: 'CheckCircle2' },
  { step: 7, title: 'Action', desc: 'Eksekusi otomatis dan perbaikan berkelanjutan.', icon: 'Zap' }
];

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ steps = DEFAULT_STEPS }) => {
  return (
    <section className="py-16 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-3 py-1 rounded-full">
            Visual Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
            Alur Kerja Sistem Terpadu
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Bagaimana data mengalir dari lapangan hingga menjadi tindakan keputusan strategis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((st, idx) => {
            const IconComponent = (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[st.icon] || Icons.Zap;

            return (
              <div
                key={st.step || idx}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 font-extrabold text-xs flex items-center justify-center">
                    {st.step}
                  </span>
                  <IconComponent className="w-5 h-5 text-slate-400" />
                </div>

                <h3 className="text-sm font-bold text-white mb-1">{st.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{st.desc}</p>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-700 z-10">
                    <ArrowRight className="w-5 h-5 text-slate-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
