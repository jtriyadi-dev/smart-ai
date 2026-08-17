import React from 'react';
import { MVPRequirement } from '../../types';
import { Rocket, CheckCircle2, Clock, DollarSign, Layers, ChevronRight } from 'lucide-react';

interface MVPEstimationCardProps {
  mvp: MVPRequirement;
  onSelectMVP?: () => void;
}

export const MVPEstimationCard: React.FC<MVPEstimationCardProps> = ({
  mvp,
  onSelectMVP
}) => {
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 shadow-xl mb-8 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Rocket className="w-3.5 h-3.5 text-indigo-400" />
            <span>Fast Launch Option</span>
          </div>

          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Estimasi Rilis Versi MVP (Minimum Viable Product)</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
            Ingin melakukan validasi bisnis ke pengguna secara cepat? AI telah mengisolasi modul prioritas esensial untuk peluncuran versi awal dalam kurun waktu lebih singkat.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-800">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Timeline MVP: <strong className="text-white">{mvp.timelineMonthsMin} – {mvp.timelineMonthsMax} Bulan</strong></span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-800">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Investasi MVP: <strong className="text-emerald-400 font-mono">{formatIDR(mvp.investmentMinIDR)} – {formatIDR(mvp.investmentMaxIDR)}</strong></span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-800">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Total ~{mvp.featuresCount} Fitur Esensial</span>
            </div>
          </div>
        </div>

        <div className="lg:w-80 shrink-0 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
            Modul Esensial MVP Terpilih:
          </h3>
          <div className="space-y-1.5 mb-4 max-h-36 overflow-y-auto pr-1">
            {mvp.modulesIncluded.map((modName, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{modName}</span>
              </div>
            ))}
          </div>

          {onSelectMVP && (
            <button
              onClick={onSelectMVP}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-950/50 transition-all"
            >
              <span>Gunakan Estimasi MVP</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
