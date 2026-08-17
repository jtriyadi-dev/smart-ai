import React from 'react';
import { FullProjectStatus } from '../../types';

interface Props {
  status: FullProjectStatus;
}

export const ProjectStatusBadge: React.FC<Props> = ({ status }) => {
  const statusMap: Record<FullProjectStatus, { label: string; className: string }> = {
    PLANNING: { label: 'Planning', className: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
    REQUIREMENT: { label: 'Requirement', className: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' },
    DESIGN: { label: 'UI/UX Design', className: 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300' },
    DEVELOPMENT: { label: 'Development', className: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300' },
    TESTING: { label: 'Testing & QA', className: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300' },
    UAT: { label: 'UAT Acceptance', className: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300' },
    DEPLOYMENT: { label: 'Deployment', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' },
    MAINTENANCE: { label: 'Maintenance', className: 'bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300' },
    COMPLETED: { label: 'Completed', className: 'bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300' },
    ON_HOLD: { label: 'On Hold', className: 'bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300' },
    CANCELLED: { label: 'Cancelled', className: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300' },
  };

  const item = statusMap[status] || { label: status, className: 'bg-slate-100 text-slate-700' };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold ${item.className}`}>
      {item.label}
    </span>
  );
};
