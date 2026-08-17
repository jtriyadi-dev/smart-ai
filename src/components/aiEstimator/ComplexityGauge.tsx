import React from 'react';
import { ComplexityBreakdown } from '../../types';
import { Gauge, Info, Layers, Users, Zap, Cpu, Globe, Shield, Database } from 'lucide-react';

interface ComplexityGaugeProps {
  complexity: ComplexityBreakdown;
}

export const ComplexityGauge: React.FC<ComplexityGaugeProps> = ({ complexity }) => {
  const getFactorIcon = (factorName: string) => {
    if (factorName.includes('Modul')) return <Layers className="w-4 h-4 text-purple-400" />;
    if (factorName.includes('Pengguna')) return <Users className="w-4 h-4 text-cyan-400" />;
    if (factorName.includes('AI') || factorName.includes('Artificial')) return <Cpu className="w-4 h-4 text-amber-400" />;
    if (factorName.includes('Integrasi') || factorName.includes('API')) return <Zap className="w-4 h-4 text-emerald-400" />;
    if (factorName.includes('Realtime')) return <Zap className="w-4 h-4 text-rose-400" />;
    if (factorName.includes('Platform')) return <Globe className="w-4 h-4 text-indigo-400" />;
    return <Shield className="w-4 h-4 text-teal-400" />;
  };

  const getScoreColor = (score: number) => {
    if (score > 75) return 'from-rose-500 to-orange-500 text-rose-400';
    if (score > 55) return 'from-orange-500 to-amber-500 text-orange-400';
    if (score > 35) return 'from-amber-500 to-teal-500 text-amber-400';
    return 'from-emerald-500 to-teal-500 text-emerald-400';
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl mb-8">
      <div className="flex items-center justify-between pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Analisis Skor Kompleksitas AI</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                Preliminary Assessment
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Skor dibobotkan secara transparan berdasarkan 7 vektor arsitektur teknis utama.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        {/* Left Gauge Meter */}
        <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 flex flex-col items-center justify-center text-center">
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* SVG Ring Gauge */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="8"
                className="text-slate-800 fill-none"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="url(#complexityGradient)"
                strokeWidth="8"
                strokeDasharray={`${(complexity.score / 100) * 264} 264`}
                strokeLinecap="round"
                className="fill-none transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="complexityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white">{complexity.score}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">dari 100</span>
              <span className={`text-xs font-bold mt-1 px-2 py-0.5 rounded-full ${getScoreColor(complexity.score)}`}>
                {complexity.level}
              </span>
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-400 max-w-xs leading-relaxed">
            <span className="font-semibold text-slate-200">Kategori {complexity.level}:</span> Tingkat pembobotan ini mempengaruhi kebutuhan alokasi insinyur, durasi sprint, dan standar sertifikasi keamanan.
          </div>
        </div>

        {/* Right Vector Factors Breakdown Progress Bars */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-purple-400" />
            <span>Rincian Pembobotan Faktor Kompleksitas</span>
          </h3>

          {complexity.factors.map((factor, idx) => {
            const percentage = Math.round((factor.scoreContribution / factor.weight) * 100);
            return (
              <div key={idx} className="bg-slate-950/40 p-3 rounded-2xl border border-slate-800/60 hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-200 flex items-center gap-2">
                    {getFactorIcon(factor.factorName)}
                    <span>{factor.factorName}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-mono text-[11px]">
                      {factor.scoreContribution} / {factor.weight} pt
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      factor.impact === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      factor.impact === 'Medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {factor.impact}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden mb-1">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      factor.impact === 'High' ? 'bg-gradient-to-r from-orange-500 to-rose-500' :
                      factor.impact === 'Medium' ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                      'bg-gradient-to-r from-emerald-500 to-teal-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(8, percentage))}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-400">
                  {factor.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
