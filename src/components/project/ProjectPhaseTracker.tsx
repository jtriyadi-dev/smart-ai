import React from 'react';
import { ProjectPhaseDetails } from '../../types';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface Props {
  phases: ProjectPhaseDetails[];
  overallProgress: number;
}

export const ProjectPhaseTracker: React.FC<Props> = ({ phases, overallProgress }) => {
  const sortedPhases = [...(phases || [])].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Project Phase Tracker
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Weighted phase engine &bull; Total overall progress: {overallProgress}%
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <span className="text-xs text-slate-500 dark:text-slate-400">Overall Progress</span>
            <div className="text-lg font-black text-sky-600 dark:text-sky-400">{overallProgress}%</div>
          </div>
        </div>
      </div>

      {/* Main Overall Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 mb-6 overflow-hidden flex">
        {sortedPhases.map((phase) => {
          const segmentWidth = (phase.weight || 20); // % of total length
          const filledWidth = (phase.progress / 100) * segmentWidth;
          return (
            <div
              key={phase.id}
              style={{ width: `${segmentWidth}%` }}
              className="h-full border-r border-white dark:border-slate-900 relative bg-slate-200 dark:bg-slate-700/60 overflow-hidden"
              title={`${phase.name}: ${phase.progress}% (${phase.weight}% weight)`}
            >
              <div
                style={{ width: `${(phase.progress)}%` }}
                className={`h-full transition-all duration-500 ${
                  phase.status === 'COMPLETED'
                    ? 'bg-emerald-500'
                    : phase.status === 'IN_PROGRESS'
                    ? 'bg-sky-500'
                    : phase.status === 'DELAYED'
                    ? 'bg-rose-500'
                    : 'bg-slate-300 dark:bg-slate-600'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Phase Cards Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {sortedPhases.map((phase) => {
          const isDone = phase.status === 'COMPLETED' || phase.progress === 100;
          const isInProgress = phase.status === 'IN_PROGRESS' || (phase.progress > 0 && phase.progress < 100);

          return (
            <div
              key={phase.id}
              className={`p-3 rounded-lg border transition-all ${
                isDone
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40'
                  : isInProgress
                  ? 'bg-sky-50/50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-800/40 shadow-xs ring-1 ring-sky-400/20'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate" title={phase.name}>
                  {phase.name}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : isInProgress ? (
                  <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400 animate-pulse shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-slate-400 dark:text-slate-600 shrink-0" />
                )}
              </div>

              <div className="flex items-baseline justify-between mb-1">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Weight: {phase.weight}%</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">{phase.progress}%</span>
              </div>

              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isDone ? 'bg-emerald-500' : isInProgress ? 'bg-sky-500' : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                  style={{ width: `${phase.progress}%` }}
                />
              </div>

              {phase.subItems && phase.subItems.length > 0 && (
                <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400">
                  {phase.subItems.filter((s) => s.completed).length} / {phase.subItems.length} tasks done
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
