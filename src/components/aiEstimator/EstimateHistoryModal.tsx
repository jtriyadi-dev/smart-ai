import React from 'react';
import { EstimationHistoryVersion } from '../../types';
import { X, History, Clock, Layers, ArrowRight, Check } from 'lucide-react';

interface EstimateHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: EstimationHistoryVersion[];
  onSelectVersion: (version: EstimationHistoryVersion) => void;
}

export const EstimateHistoryModal: React.FC<EstimateHistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectVersion
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Riwayat Versioning Estimasi</h2>
              <p className="text-xs text-slate-400">Daftar estimasi yang tersimpan berdasarkan perubahan konfigurasi.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              Belum ada versi riwayat estimasi tersimpan.
            </div>
          ) : (
            history.map((ver) => (
              <div
                key={ver.versionId}
                className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-white">{ver.versionName}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(ver.timestamp).toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
                    <span className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 text-purple-300">
                      Score: {ver.complexityScore}
                    </span>
                    <span className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 text-emerald-400 font-mono">
                      {ver.investmentRangeIDR}
                    </span>
                    <span className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 text-amber-300">
                      {ver.timelineMonthsRange}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectVersion(ver);
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shrink-0"
                >
                  <span>Muat Versi Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
