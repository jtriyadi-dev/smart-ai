import React from 'react';
import { ProjectHealthStatus } from '../../types';
import { CheckCircle2, AlertTriangle, Clock, Ban, Trophy } from 'lucide-react';

interface Props {
  health: ProjectHealthStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const ProjectHealthBadge: React.FC<Props> = ({ health, size = 'md' }) => {
  const configs: Record<
    ProjectHealthStatus,
    { label: string; bg: string; text: string; border: string; icon: any }
  > = {
    ON_TRACK: {
      label: 'On Track',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      text: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-200 dark:border-emerald-800/50',
      icon: CheckCircle2,
    },
    AT_RISK: {
      label: 'At Risk',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      text: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-200 dark:border-amber-800/50',
      icon: AlertTriangle,
    },
    DELAYED: {
      label: 'Delayed',
      bg: 'bg-rose-50 dark:bg-rose-950/40',
      text: 'text-rose-700 dark:text-rose-300',
      border: 'border-rose-200 dark:border-rose-800/50',
      icon: Clock,
    },
    BLOCKED: {
      label: 'Blocked',
      bg: 'bg-purple-50 dark:bg-purple-950/40',
      text: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-200 dark:border-purple-800/50',
      icon: Ban,
    },
    COMPLETED: {
      label: 'Completed',
      bg: 'bg-sky-50 dark:bg-sky-950/40',
      text: 'text-sky-700 dark:text-sky-300',
      border: 'border-sky-200 dark:border-sky-800/50',
      icon: Trophy,
    },
  };

  const config = configs[health] || configs.ON_TRACK;
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs font-semibold gap-1.5',
    lg: 'px-3 py-1.5 text-sm font-bold gap-2',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]}`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      <span>{config.label}</span>
    </span>
  );
};
