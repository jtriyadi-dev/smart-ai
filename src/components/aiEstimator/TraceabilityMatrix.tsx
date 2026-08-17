import React from 'react';
import { EstimationTraceabilityItem } from '../../types';
import { GitCommit, Layers, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

interface TraceabilityMatrixProps {
  traceability: EstimationTraceabilityItem[];
}

export const TraceabilityMatrix: React.FC<TraceabilityMatrixProps> = ({ traceability }) => {
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl mb-8">
      <div className="flex items-center justify-between pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <GitCommit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Matriks Traceability Estimasi (Requirement to Effort)</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-normal">
                Traceability Map
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Menghubungkan setiap poin requirement bisnis hingga kontribusi effort person-days dan investasi.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Req Code</th>
              <th className="py-3 px-4">Requirement / Deskripsi</th>
              <th className="py-3 px-4">Modul Terkait</th>
              <th className="py-3 px-4 text-center">Kompleksitas</th>
              <th className="py-3 px-4 text-center">Person-Days</th>
              <th className="py-3 px-4 text-right">Kontribusi Investasi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {traceability.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-4 font-mono text-purple-400 font-bold">
                  {item.requirementCode}
                </td>
                <td className="py-3 px-4 font-semibold text-white max-w-xs truncate">
                  {item.requirementTitle}
                </td>
                <td className="py-3 px-4 text-slate-300">
                  {item.moduleName}
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.complexity === 'High' || item.complexity === 'Very High' 
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {item.complexity}
                  </span>
                </td>
                <td className="py-3 px-4 text-center font-mono font-bold text-slate-200">
                  {item.personDaysEffort} Days
                </td>
                <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">
                  {formatIDR(item.investmentContributionIDR)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
