import React from 'react';
import { TimelinePhase } from '../../types';
import { Calendar, GitBranch, CheckCircle2, Clock, Layers } from 'lucide-react';

interface TimelinePhaseChartProps {
  phases: TimelinePhase[];
  minMonths: number;
  maxMonths: number;
}

export const TimelinePhaseChart: React.FC<TimelinePhaseChartProps> = ({
  phases,
  minMonths,
  maxMonths
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Roadmap Tahapan & Timeline Pengerjaan</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-normal">
                Parallel Execution
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Estimasi jadwal pengerjaan berbasis dependensi paralel, bukan penjumlahan sekuensial naif.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800">
          <Clock className="w-4 h-4 text-amber-400" />
          <div className="text-xs">
            <span className="text-slate-400">Total Calendar Time: </span>
            <strong className="text-white font-bold">{minMonths} – {maxMonths} Bulan</strong>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {phases.map((phase, idx) => (
          <div key={phase.id || idx} className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold flex items-center justify-center border border-purple-500/30 shrink-0">
                  {idx + 1}
                </span>
                <h3 className="text-sm font-bold text-white">{phase.name}</h3>
                {phase.isParallel && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                    <GitBranch className="w-3 h-3" />
                    <span>Parallel Track</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-400 font-mono">
                  Durasi: <strong className="text-amber-300">{phase.durationWeeksMin} – {phase.durationWeeksMax} Minggu</strong>
                </span>
                <span className="text-slate-500 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {phase.personDays} Person-Days
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              {phase.description}
            </p>

            {/* Phase Visual Bar Indicator */}
            <div className="w-full bg-slate-900 rounded-xl h-2.5 overflow-hidden flex items-center p-0.5 border border-slate-800">
              <div
                className={`h-full rounded-lg bg-gradient-to-r ${
                  phase.isParallel ? 'from-indigo-500 to-cyan-500' : 'from-purple-500 to-indigo-500'
                }`}
                style={{ width: `${Math.min(100, Math.max(15, (phase.durationWeeksMax / 8) * 100))}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
