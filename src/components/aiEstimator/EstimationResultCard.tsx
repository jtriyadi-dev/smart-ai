import React from 'react';
import { ProjectEstimate } from '../../types';
import { Clock, DollarSign, Gauge, ShieldCheck, ArrowRight, Sparkles, AlertCircle, FileText } from 'lucide-react';

interface EstimationResultCardProps {
  estimate: ProjectEstimate;
  onGenerateProposal?: () => void;
  onReviewArchitecture?: () => void;
}

export const EstimationResultCard: React.FC<EstimationResultCardProps> = ({
  estimate,
  onGenerateProposal,
  onReviewArchitecture
}) => {
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const getComplexityColor = (level: string) => {
    switch (level) {
      case 'Very Low': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Low': return 'text-teal-400 bg-teal-500/10 border-teal-500/30';
      case 'Medium': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'High': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'Very High': return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      default: return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-purple-900/40 rounded-3xl p-6 md:p-8 shadow-2xl mb-8 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Preliminary AI Estimation Output</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              Hasil Estimasi Proyek: {estimate.projectTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Dihitung berdasarkan {estimate.scope.modulesCount} modul, {estimate.scope.featuresCount} fitur, dan kriteria arsitektur cloud.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold ${getComplexityColor(estimate.complexity.level)}`}>
              Complexity Score: {estimate.complexity.score}/100 ({estimate.complexity.level})
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold">
              Tier: {estimate.investment.tier}
            </span>
          </div>
        </div>

        {/* Big Key Metrics Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
          {/* Timeline Card */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 relative group hover:border-purple-500/40 transition-all">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Estimated Development Timeline</span>
            </div>
            <div className="text-2xl md:text-3xl font-black text-white tracking-tight">
              {estimate.timeline.minMonths} – {estimate.timeline.maxMonths} <span className="text-lg font-bold text-slate-400">Bulan</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              ~{estimate.timeline.totalPersonDaysMin} - {estimate.timeline.totalPersonDaysMax} Person-Days pengerjaan paralel
            </p>
          </div>

          {/* Investment Range Card */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-purple-900/30 relative group hover:border-purple-500/40 transition-all">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Estimated Investment Range</span>
            </div>
            <div className="text-lg md:text-xl font-black text-emerald-400 tracking-tight">
              {formatIDR(estimate.investment.minIDR)}
              <span className="block text-sm font-semibold text-slate-300 mt-0.5">
                s/d {formatIDR(estimate.investment.maxIDR)}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Kisar biaya awal berdasarkan alokasi tim & tingkat AI
            </p>
          </div>

          {/* Complexity Card */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 relative group hover:border-purple-500/40 transition-all">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-2">
              <Gauge className="w-4 h-4 text-amber-400" />
              <span>Project Complexity Level</span>
            </div>
            <div className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{estimate.complexity.level}</span>
              <span className="text-sm font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {estimate.complexity.score}/100
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Berdasarkan {estimate.complexity.factors.length} pembobot kompleksitas teknis
            </p>
          </div>

          {/* Confidence Level Card */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 relative group hover:border-purple-500/40 transition-all">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Estimation Confidence Level</span>
            </div>
            <div className="text-2xl md:text-3xl font-black text-cyan-300 tracking-tight">
              {estimate.confidence.level} <span className="text-lg font-bold text-slate-400">({estimate.confidence.scorePercentage}%)</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 truncate" title={estimate.confidence.reason}>
              {estimate.confidence.reason}
            </p>
          </div>
        </div>

        {/* Disclaimer Footer & Next Step Actions */}
        <div className="pt-6 border-t border-slate-800 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start gap-2 text-xs text-slate-400 max-w-2xl">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              {estimate.disclaimer}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onReviewArchitecture && (
              <button
                onClick={onReviewArchitecture}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Review Arsitektur</span>
              </button>
            )}

            {onGenerateProposal && (
              <button
                onClick={onGenerateProposal}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-purple-900/40"
              >
                <span>Generate Business Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
