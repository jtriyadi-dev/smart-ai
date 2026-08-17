import React, { useState } from 'react';
import { ProjectPhaseDetails, FullProjectMilestone, ProjectTask } from '../../types';
import { Calendar, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface Props {
  phases: ProjectPhaseDetails[];
  milestones: FullProjectMilestone[];
  tasks: ProjectTask[];
  startDate: string;
  targetDate: string;
  isCustomerView?: boolean;
}

export const ProjectGanttChart: React.FC<Props> = ({
  phases,
  milestones,
  tasks,
  startDate,
  targetDate,
  isCustomerView = false,
}) => {
  const [activeTab, setActiveTab] = useState<'PHASES' | 'MILESTONES' | 'TASKS'>('PHASES');

  const start = new Date(startDate || '2026-08-01').getTime();
  const end = new Date(targetDate || '2026-10-31').getTime();
  const totalDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

  const calculatePosition = (itemStartStr: string, itemEndStr: string) => {
    const itemStart = new Date(itemStartStr || startDate).getTime();
    const itemEnd = new Date(itemEndStr || targetDate).getTime();

    const leftDays = Math.max(0, Math.ceil((itemStart - start) / (1000 * 60 * 60 * 24)));
    const durationDays = Math.max(1, Math.ceil((itemEnd - itemStart) / (1000 * 60 * 60 * 24)));

    const leftPercent = Math.min(95, Math.max(0, (leftDays / totalDays) * 100));
    const widthPercent = Math.min(100 - leftPercent, Math.max(3, (durationDays / totalDays) * 100));

    return { leftPercent, widthPercent };
  };

  const visibleTasks = isCustomerView ? tasks.filter((t) => t.visibility === 'CUSTOMER_VISIBLE') : tasks;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" /> Visual Project Timeline (Gantt View)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Schedule: {startDate} &rarr; {targetDate} ({totalDays} days duration)
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('PHASES')}
            className={`px-3 py-1 rounded-md font-semibold transition-all ${
              activeTab === 'PHASES'
                ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Phases
          </button>
          <button
            onClick={() => setActiveTab('MILESTONES')}
            className={`px-3 py-1 rounded-md font-semibold transition-all ${
              activeTab === 'MILESTONES'
                ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Milestones
          </button>
          <button
            onClick={() => setActiveTab('TASKS')}
            className={`px-3 py-1 rounded-md font-semibold transition-all ${
              activeTab === 'TASKS'
                ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Tasks ({visibleTasks.length})
          </button>
        </div>
      </div>

      {/* Gantt View Grid */}
      <div className="overflow-x-auto min-w-[600px]">
        {/* Timeline Axis */}
        <div className="grid grid-cols-12 gap-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800 pl-48">
          <div>Aug W1</div>
          <div>Aug W2</div>
          <div>Aug W3</div>
          <div>Aug W4</div>
          <div>Sep W1</div>
          <div>Sep W2</div>
          <div>Sep W3</div>
          <div>Sep W4</div>
          <div>Oct W1</div>
          <div>Oct W2</div>
          <div>Oct W3</div>
          <div>Oct W4</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60 py-2 space-y-2">
          {activeTab === 'PHASES' &&
            phases.map((phase) => {
              const { leftPercent, widthPercent } = calculatePosition(phase.startDate, phase.dueDate);
              return (
                <div key={phase.id} className="flex items-center py-2 text-xs hover:bg-slate-50/50 dark:hover:bg-slate-800/30 rounded-md transition-all">
                  <div className="w-48 shrink-0 pr-3 font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {phase.name} ({phase.progress}%)
                  </div>
                  <div className="flex-1 relative h-7 bg-slate-100 dark:bg-slate-800/60 rounded-md overflow-hidden">
                    <div
                      className={`absolute top-1 bottom-1 rounded-md shadow-xs flex items-center px-2 text-[10px] font-bold text-white transition-all ${
                        phase.status === 'COMPLETED'
                          ? 'bg-emerald-500'
                          : phase.status === 'IN_PROGRESS'
                          ? 'bg-sky-500'
                          : 'bg-slate-400'
                      }`}
                      style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                    >
                      <span className="truncate">{phase.dueDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}

          {activeTab === 'MILESTONES' &&
            milestones.map((m) => {
              const { leftPercent, widthPercent } = calculatePosition(m.startDate, m.dueDate);
              return (
                <div key={m.id} className="flex items-center py-2 text-xs hover:bg-slate-50/50 dark:hover:bg-slate-800/30 rounded-md transition-all">
                  <div className="w-48 shrink-0 pr-3 font-semibold text-slate-800 dark:text-slate-200 truncate" title={m.name}>
                    {m.name}
                  </div>
                  <div className="flex-1 relative h-7 bg-slate-100 dark:bg-slate-800/60 rounded-md overflow-hidden">
                    <div
                      className={`absolute top-1 bottom-1 rounded-md shadow-xs flex items-center px-2 text-[10px] font-bold text-white transition-all ${
                        m.status === 'COMPLETED'
                          ? 'bg-emerald-600'
                          : m.status === 'IN_PROGRESS'
                          ? 'bg-purple-600'
                          : 'bg-amber-500'
                      }`}
                      style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                    >
                      <span className="truncate">{m.dueDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}

          {activeTab === 'TASKS' &&
            visibleTasks.map((t) => {
              const { leftPercent, widthPercent } = calculatePosition(t.dueDate, t.dueDate);
              return (
                <div key={t.id} className="flex items-center py-1.5 text-xs hover:bg-slate-50/50 dark:hover:bg-slate-800/30 rounded-md transition-all">
                  <div className="w-48 shrink-0 pr-3 font-medium text-slate-700 dark:text-slate-300 truncate" title={t.name}>
                    {t.name}
                  </div>
                  <div className="flex-1 relative h-6 bg-slate-100 dark:bg-slate-800/60 rounded-md overflow-hidden">
                    <div
                      className={`absolute top-1 bottom-1 rounded-md flex items-center px-2 text-[9px] font-bold text-white transition-all ${
                        t.status === 'DONE'
                          ? 'bg-emerald-500'
                          : t.status === 'BLOCKED'
                          ? 'bg-rose-500'
                          : 'bg-indigo-500'
                      }`}
                      style={{ left: `${leftPercent}%`, width: `${Math.max(12, widthPercent)}%` }}
                    >
                      <span className="truncate">{t.dueDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
