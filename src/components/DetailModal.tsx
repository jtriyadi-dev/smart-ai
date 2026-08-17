import React from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles, Building2, ShieldCheck } from 'lucide-react';
import { ServiceItem, IndustrySolution, PortfolioItem } from '../types';

interface DetailModalProps {
  data: ServiceItem | IndustrySolution | PortfolioItem | null;
  type: 'service' | 'industry' | 'portfolio' | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ data, type, onClose, onOpenConsultation }) => {
  if (!data || !type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-card rounded-2xl border border-cyan-500/30 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto text-left space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
              {type === 'service' ? 'Spesifikasi Layanan' : type === 'industry' ? 'Solusi Industri' : 'Blueprint Portfolio'}
            </span>
            {'badge' in data && data.badge && (
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-500/40">
                {data.badge}
              </span>
            )}
          </div>

          <h3 className="text-2xl font-display font-bold text-white">
            {data.title}
          </h3>
        </div>

        {/* Modal Body depending on type */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          {'fullDesc' in data && (
            <p className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-slate-200">
              {data.fullDesc}
            </p>
          )}

          {'fullDetails' in data && (
            <p className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-slate-200">
              {data.fullDetails}
            </p>
          )}

          {/* Service Features */}
          {'features' in data && (
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase text-xs font-mono text-cyan-400">Modul & Kapabilitas Utama:</h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {data.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Industry Key Features */}
          {'keyFeatures' in data && (
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase text-xs font-mono text-cyan-400">Fitur Operasional Kunci:</h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {data.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Capability */}
          {'aiCapability' in data && (
            <div className="p-3 bg-cyan-950/60 border border-cyan-500/40 rounded-xl space-y-1">
              <div className="font-bold text-cyan-300 text-xs flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Integrasi AI Spesifik:</span>
              </div>
              <p className="text-xs text-slate-200">{data.aiCapability}</p>
            </div>
          )}

          {/* Portfolio Metrics */}
          {'metrics' in data && (
            <div className="grid grid-cols-2 gap-3 pt-2">
              {data.metrics.map((m, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <div className="text-xs text-slate-400 font-mono">{m.label}</div>
                  <div className="text-lg font-bold text-cyan-300 font-mono">{m.value}</div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700"
          >
            Tutup
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenConsultation();
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Konsultasikan Solusi Ini</span>
          </button>
        </div>

      </div>
    </div>
  );
};
