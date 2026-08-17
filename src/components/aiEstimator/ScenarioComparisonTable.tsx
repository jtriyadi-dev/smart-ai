import React, { useState } from 'react';
import { EstimationScenario } from '../../types';
import { Layers, CheckCircle2, Clock, DollarSign, Shield, Sparkles, Check, ArrowRight } from 'lucide-react';

interface ScenarioComparisonTableProps {
  scenarios: EstimationScenario[];
  selectedScenarioId?: string;
  onSelectScenario?: (scenario: EstimationScenario) => void;
}

export const ScenarioComparisonTable: React.FC<ScenarioComparisonTableProps> = ({
  scenarios,
  selectedScenarioId = 'balanced',
  onSelectScenario
}) => {
  const [activeId, setActiveId] = useState<string>(selectedScenarioId);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleSelect = (scenario: EstimationScenario) => {
    setActiveId(scenario.id);
    if (onSelectScenario) onSelectScenario(scenario);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl mb-8">
      <div className="flex items-center justify-between pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Perbandingan 3 Skenario Pengembangan</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-normal">
                Scenario Estimation
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Pilih skenario cakupan yang paling sesuai dengan strategi launching dan ketersediaan anggaran Anda.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {scenarios.map((sc) => {
          const isSelected = activeId === sc.id;
          const isRecommended = sc.id === 'balanced';

          return (
            <div
              key={sc.id}
              onClick={() => handleSelect(sc)}
              className={`relative rounded-3xl p-6 border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-purple-950/60 via-slate-900 to-slate-950 border-purple-500 shadow-xl shadow-purple-950/50 ring-2 ring-purple-500/30'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              {isRecommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md">
                  Rekomendasi Utama
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-white">{sc.title}</h3>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected ? 'bg-purple-600 border-purple-400 text-white' : 'border-slate-700 bg-slate-900'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <p className="text-xs font-semibold text-purple-300 mb-2">{sc.subtitle}</p>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">{sc.description}</p>

                {/* Key Numbers */}
                <div className="space-y-2 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800/80 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                      Timeline:
                    </span>
                    <strong className="text-white">{sc.timelineMonthsMin} – {sc.timelineMonthsMax} Bulan</strong>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      Investasi:
                    </span>
                    <strong className="text-emerald-400 font-mono">
                      {formatIDR(sc.investmentMinIDR)} – {formatIDR(sc.investmentMaxIDR)}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" />
                      Modul Aktif:
                    </span>
                    <strong className="text-white">{sc.modulesIncludedCount} Modul</strong>
                  </div>
                </div>

                {/* Trade-offs */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    Karakteristik Skenario:
                  </span>
                  {sc.tradeOffs.map((to, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-1.5 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span>{to}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <p className="text-[11px] text-slate-400 italic mb-3">
                  <strong className="text-slate-300 not-italic">Cocok untuk:</strong> {sc.recommendedFor}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(sc);
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-900/40'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span>{isSelected ? 'Skenario Terpilih' : 'Pilih Skenario Ini'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
