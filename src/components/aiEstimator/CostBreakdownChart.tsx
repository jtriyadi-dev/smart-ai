import React from 'react';
import { CostCategoryBreakdown } from '../../types';
import { PieChart, DollarSign, Cpu, Zap, Database, Smartphone, Cloud, ShieldCheck, CheckSquare } from 'lucide-react';

interface CostBreakdownChartProps {
  breakdown: CostCategoryBreakdown[];
  currency?: string;
}

export const CostBreakdownChart: React.FC<CostBreakdownChartProps> = ({
  breakdown,
  currency = 'IDR'
}) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Development': return <DollarSign className="w-4 h-4 text-purple-400" />;
      case 'AI Integration': return <Cpu className="w-4 h-4 text-amber-400" />;
      case 'API & Integration': return <Zap className="w-4 h-4 text-emerald-400" />;
      case 'Database & Backend': return <Database className="w-4 h-4 text-indigo-400" />;
      case 'Mobile App': return <Smartphone className="w-4 h-4 text-cyan-400" />;
      case 'Cloud & DevOps': return <Cloud className="w-4 h-4 text-teal-400" />;
      case 'QA & Testing': return <CheckSquare className="w-4 h-4 text-rose-400" />;
      case 'Security & Compliance': return <ShieldCheck className="w-4 h-4 text-blue-400" />;
      default: return <DollarSign className="w-4 h-4 text-slate-400" />;
    }
  };

  const getCategoryColor = (idx: number) => {
    const colors = [
      'from-purple-500 to-indigo-500',
      'from-amber-500 to-orange-500',
      'from-emerald-500 to-teal-500',
      'from-indigo-500 to-cyan-500',
      'from-cyan-500 to-blue-500',
      'from-teal-500 to-emerald-500',
      'from-rose-500 to-pink-500',
      'from-blue-500 to-indigo-500'
    ];
    return colors[idx % colors.length];
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl mb-8">
      <div className="flex items-center justify-between pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Distribusi Alokasi Komponen Investasi</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-normal">
                Cost Factors Model
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Rincian persentase estimasi pengalokasian sumber daya berdasarkan arsitektur aplikasi.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {breakdown.map((item, idx) => (
          <div key={idx} className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                  {getCategoryIcon(item.category)}
                </div>
                <span className="text-sm font-bold text-white">{item.category}</span>
              </div>
              <span className="text-xs font-black text-purple-300 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20">
                {item.percentage}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden mb-3">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${getCategoryColor(idx)} transition-all duration-700`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>

            <p className="text-xs text-slate-400 mb-2 leading-relaxed">
              {item.description}
            </p>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/60 text-slate-300">
              <span className="text-slate-500 text-[11px]">Kisaran Alokasi:</span>
              <span className="font-semibold text-emerald-400 font-mono">
                {formatCurrency(item.estimatedMinAmount)} – {formatCurrency(item.estimatedMaxAmount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
