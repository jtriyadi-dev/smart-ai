import React from 'react';
import { Calculator, Sparkles, AlertCircle, History, Settings, RefreshCw } from 'lucide-react';

interface EstimatorHeaderProps {
  onRecalculate?: () => void;
  onOpenHistory?: () => void;
  onOpenPricingConfig?: () => void;
  isCalculating?: boolean;
}

export const EstimatorHeader: React.FC<EstimatorHeaderProps> = ({
  onRecalculate,
  onOpenHistory,
  onOpenPricingConfig,
  isCalculating = false
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 p-6 md:p-8 border border-purple-800/30 shadow-2xl mb-8">
      {/* Background Accent Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wide uppercase mb-3">
            <Calculator className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Project Estimator Engine</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <span>AI Project Estimator</span>
            <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
          </h1>

          <p className="text-slate-300 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
            Dapatkan estimasi awal kompleksitas proyek, waktu pengerjaan, alokasi tim, dan kisaran investasi berbasis pembobotan algoritma AI berdasarkan konfigurasi aplikasi Anda.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {onOpenHistory && (
            <button
              onClick={onOpenHistory}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-all cursor-pointer shadow-sm"
            >
              <History className="w-4 h-4 text-purple-400" />
              <span>Riwayat Estimasi</span>
            </button>
          )}

          {onOpenPricingConfig && (
            <button
              onClick={onOpenPricingConfig}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-all cursor-pointer shadow-sm"
            >
              <Settings className="w-4 h-4 text-indigo-400" />
              <span>Setting Bobot Harga</span>
            </button>
          )}

          {onRecalculate && (
            <button
              onClick={onRecalculate}
              disabled={isCalculating}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-purple-900/40 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isCalculating ? 'animate-spin' : ''}`} />
              <span>{isCalculating ? 'Kalkulasi Ulang...' : 'Hitung Ulang Estimasi'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Preliminary Notice Banner */}
      <div className="mt-6 pt-4 border-t border-purple-800/20 flex items-start gap-2.5 text-xs text-amber-300/90 bg-amber-500/10 px-4 py-3 rounded-xl border border-amber-500/20">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p>
          <strong className="font-semibold text-amber-200">Preliminary AI-Generated Estimate:</strong> Seluruh angka yang ditampilkan merupakan estimasi indikatif awal berdasarkan pembobotan kompleksitas fitur. Hasil ini ditujukan untuk perencanaan dan pertimbangan awal, bukan quotation final, kontrak, atau jaminan biaya pengerjaan.
        </p>
      </div>
    </div>
  );
};
