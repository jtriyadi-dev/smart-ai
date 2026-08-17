import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, Layers, AlertCircle, Cpu, Zap, RefreshCw } from 'lucide-react';
import { ModuleOptimizationResult, ModuleOptimizationSuggestion } from '../../types';

interface AIOptimizerModalProps {
  isOpen: boolean;
  industry: string;
  optimizationResult: ModuleOptimizationResult | null;
  isLoading: boolean;
  onClose: () => void;
  onApplyOptimization: (suggestion: ModuleOptimizationSuggestion) => void;
}

export const AIOptimizerModal: React.FC<AIOptimizerModalProps> = ({
  isOpen,
  industry,
  optimizationResult,
  isLoading,
  onClose,
  onApplyOptimization
}) => {
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleApply = (sug: ModuleOptimizationSuggestion) => {
    onApplyOptimization(sug);
    setAppliedIds((prev) => [...prev, sug.id]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI Module Optimizer</h3>
              <p className="text-xs text-slate-400">
                Optimasi struktur modul untuk industri <span className="text-cyan-300 font-semibold">{industry}</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
              <h4 className="text-sm font-bold text-white mb-1">Menganalisis Efisiensi & Struktur Modul...</h4>
              <p className="text-xs text-slate-400 max-w-sm">
                AI sedang mencari potensi penggabungan (merge), pemisahan (split), dan pengilangan kecenderungan duplikasi data.
              </p>
            </div>
          ) : optimizationResult ? (
            <>
              {/* Overall Analysis Card */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-800/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" />
                    <span>ANALISIS REKAYASA ARSITEKTUR</span>
                  </span>
                  <div className="text-xs font-mono text-slate-300 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                    Jumlah Modul Saat Ini: <span className="font-bold text-cyan-300">{optimizationResult.currentModuleCount}</span>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">{optimizationResult.overallAnalysis}</p>
              </div>

              {/* Suggestions List */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Rekomendasi Langkah Optimasi ({optimizationResult.suggestions?.length || 0})
                </h4>

                {optimizationResult.suggestions?.map((sug) => {
                  const isApplied = appliedIds.includes(sug.id);

                  return (
                    <div
                      key={sug.id}
                      className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border ${
                              sug.type === 'Merge'
                                ? 'bg-purple-950 text-purple-300 border-purple-800'
                                : sug.type === 'Split'
                                ? 'bg-blue-950 text-blue-300 border-blue-800'
                                : sug.type === 'Add'
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                                : 'bg-slate-900 text-slate-300 border-slate-800'
                            }`}
                          >
                            Tindakan: {sug.type}
                          </span>
                          <h5 className="font-bold text-white text-sm">{sug.title}</h5>
                        </div>

                        <button
                          type="button"
                          disabled={isApplied}
                          onClick={() => handleApply(sug)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isApplied
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 opacity-80 cursor-default'
                              : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 text-white shadow-md'
                          }`}
                        >
                          {isApplied ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Terapkan</span>
                            </>
                          ) : (
                            <>
                              <span>Apply Recommendation</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                        <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                          <span className="font-mono text-slate-500 block mb-0.5 font-semibold">Alasan Akademis/Bisnis:</span>
                          <p className="text-slate-300">{sug.reason}</p>
                        </div>
                        <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                          <span className="font-mono text-emerald-400 block mb-0.5 font-semibold">Manfaat Hasil Optimasi:</span>
                          <p className="text-slate-300">{sug.benefits}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="py-8 text-center text-slate-500">Gagal memuat rekomendasi optimasi modul.</div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 cursor-pointer"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
