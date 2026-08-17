import React from 'react';
import { CopilotQueryResponse } from '../../types';
import { X, Calculator, Database, ShieldCheck, Cpu, Code2, AlertCircle } from 'lucide-react';

interface ExplainabilityModalProps {
  response: CopilotQueryResponse;
  onClose: () => void;
}

export const ExplainabilityModal: React.FC<ExplainabilityModalProps> = ({ response, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Transparansi Formulasi & Jejak Audit Perhitungan</h3>
              <p className="text-xs text-slate-400">Dasar matematis dan sumber data deterministik Copilot Engine</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs">
          
          {/* Question & Intent */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase">1. Parsed Structured Intent</div>
            <div className="text-white font-bold">"{response.question}"</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] text-slate-300">
              <div>Mode: <span className="text-cyan-400 font-mono">{response.intent.mode}</span></div>
              <div>Metric: <span className="text-purple-400 font-mono">{response.intent.metric}</span></div>
              <div>Dimension: <span className="text-emerald-400 font-mono">{response.intent.dimension || 'ALL'}</span></div>
              <div>Range: <span className="text-amber-400 font-mono">{response.intent.timeRange}</span></div>
            </div>
          </div>

          {/* Math Formula & Explanation */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">2. Deterministic Calculation Formula</div>
            <div className="font-mono text-slate-200 bg-slate-900 p-3 rounded-xl border border-slate-800 leading-relaxed text-[11px]">
              {response.calculationExplanation}
            </div>
          </div>

          {/* Data Source & Freshness */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">3. Data Provenance & Governance</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div className="flex items-center gap-2 text-slate-300">
                <Database className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Source: <strong className="text-white">{response.dataSourceName}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mode: <strong className="text-emerald-400 font-mono">READ-ONLY (Encrypted)</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Cpu className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Data Period: <strong className="text-white">{response.periodLabel}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Confidence: <strong className="text-amber-400 font-bold">{response.confidence}</strong></span>
              </div>
            </div>
          </div>

          {/* Safety Warning */}
          {response.dataQualityNotice && (
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] leading-relaxed flex items-start gap-2">
              <Code2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{response.dataQualityNotice}</span>
            </div>
          )}

        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
          >
            Tutup Penjelasan
          </button>
        </div>

      </div>
    </div>
  );
};
