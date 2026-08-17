import React from 'react';
import { AlertTriangle, HelpCircle, FileCheck, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface AssumptionsRisksCardProps {
  assumptions: string[];
  exclusions: string[];
  risks: { risk: string; level: 'High' | 'Medium' | 'Low'; mitigation: string }[];
  openQuestions: string[];
}

export const AssumptionsRisksCard: React.FC<AssumptionsRisksCardProps> = ({
  assumptions,
  exclusions,
  risks,
  openQuestions
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl mb-8">
      <div className="flex items-center justify-between pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Asumsi, Eksklusi & Manajemen Risiko Estimasi</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-normal">
                Risk & Governance
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Batasan asumsi pengerjaan dan identifikasi potensi hambatan proyek beserta mitigasinya.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Assumptions */}
        <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-purple-400" />
            <span>Asumsi Kerja Estimasi (Estimation Assumptions):</span>
          </h3>
          <div className="space-y-2">
            {assumptions.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exclusions */}
        <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Belum Termasuk / Eksklusi (Exclusions):</span>
          </h3>
          <div className="space-y-2">
            {exclusions.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Potential Risks */}
      <div className="mt-6 pt-5 border-t border-slate-800">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>Potensi Risiko & Mitigasi Teknis:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {risks.map((r, idx) => (
            <div key={idx} className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-white">{r.risk}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  r.level === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                  'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  Risk: {r.level}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong className="text-indigo-300">Mitigasi: </strong> {r.mitigation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Open Questions */}
      {openQuestions && openQuestions.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-800 bg-purple-950/20 p-4 rounded-2xl border border-purple-800/30">
          <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span>Informasi Tambahan Untuk Mengasah Presisi Estimasi:</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            {openQuestions.map((oq, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                <span className="text-purple-400 font-bold">•</span>
                <span>{oq}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
