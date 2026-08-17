import React from 'react';
import { CheckCircle2, Cpu, Zap, TrendingUp } from 'lucide-react';

interface SolutionSectionProps {
  overview: string;
  impacts: string[];
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ overview, impacts }) => {
  return (
    <section className="py-16 bg-slate-900/40 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-4">
                <Cpu className="w-3.5 h-3.5" />
                <span>SMART-AI.ID Enterprise Solution</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4">
                Pendekatan Solusi Terintegrasi & Berbasis AI
              </h2>

              <p className="text-slate-300 text-base leading-relaxed mb-6">
                {overview}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {impacts.map((imp, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-200 text-xs font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{imp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 p-6 rounded-2xl">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-4">
                <TrendingUp className="w-4 h-4" />
                <span>Metrik Dampak Bisnis (Business Impact)</span>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80">
                  <div className="text-xs text-slate-400">Peningkatan Efisiensi Operasional</div>
                  <div className="text-2xl font-black text-cyan-400 mt-0.5">+25% s/d +40%</div>
                  <div className="text-[11px] text-slate-500 mt-1">Mengurangi pekerjaan repetitif manual</div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80">
                  <div className="text-xs text-slate-400">Kecepatan Laporan Eksekutif</div>
                  <div className="text-2xl font-black text-blue-400 mt-0.5">Real-time (0 Detik)</div>
                  <div className="text-[11px] text-slate-500 mt-1">Tanpa rekapitulasi konsolidasi berhari-hari</div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80">
                  <div className="text-xs text-slate-400">Akurasi Prediksi AI</div>
                  <div className="text-2xl font-black text-emerald-400 mt-0.5">92% - 98%</div>
                  <div className="text-[11px] text-slate-500 mt-1">Minim risiko forecasting salah</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
