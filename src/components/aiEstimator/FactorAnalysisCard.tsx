import React from 'react';
import { TrendingUp, TrendingDown, HelpCircle, CheckCircle2 } from 'lucide-react';

interface FactorAnalysisCardProps {
  costDrivers: string[];
  costSavers: string[];
  timelineDrivers: string[];
}

export const FactorAnalysisCard: React.FC<FactorAnalysisCardProps> = ({
  costDrivers,
  costSavers,
  timelineDrivers
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl mb-8">
      <div className="flex items-center justify-between pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Analisis Faktor Penggerak Biaya & Timeline</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-normal">
                Pricing Transparency
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Penjelasan transparan mengenai faktor utama yang mempengaruhi kenaikan atau efisiensi anggaran Anda.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Cost Drivers (Higher Cost) */}
        <div className="bg-slate-950/60 p-5 rounded-2xl border border-orange-500/20">
          <h3 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>Faktor Yang Meningkatkan Investasi:</span>
          </h3>

          <div className="space-y-2">
            {costDrivers.map((driver, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                <span>{driver}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Savers (Lower Cost) */}
        <div className="bg-slate-950/60 p-5 rounded-2xl border border-emerald-500/20">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <TrendingDown className="w-4 h-4" />
            <span>Faktor Yang Menjaga Efisiensi Biaya:</span>
          </h3>

          <div className="space-y-2">
            {costSavers.map((saver, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>{saver}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Drivers */}
      <div className="mt-6 pt-4 border-t border-slate-800 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
          Faktor Penentu Utama Durasi Timeline (Timeline Drivers):
        </h4>
        <div className="flex flex-wrap items-center gap-2">
          {timelineDrivers.map((td, idx) => (
            <span key={idx} className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs text-purple-300">
              • {td}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
