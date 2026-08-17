import React, { useState } from 'react';
import { ProjectTask, TaskStatus, TaskPriority, TaskVisibility } from '../../types';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Lock,
  Eye,
  Plus,
  User,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface Props {
  tasks: ProjectTask[];
  onTaskStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
  onAddTaskClick?: () => void;
  isCustomerView?: boolean;
}

const KANBAN_COLUMNS: { id: TaskStatus; label: string; bg: string; border: string; badge: string }[] = [
  { id: 'TODO', label: 'To Do', bg: 'bg-slate-50 dark:bg-slate-900/40', border: 'border-slate-200 dark:border-slate-800', badge: 'bg-slate-200 text-slate-800' },
  { id: 'IN_PROGRESS', label: 'In Progress', bg: 'bg-sky-50/50 dark:bg-sky-950/20', border: 'border-sky-200 dark:border-sky-900/40', badge: 'bg-sky-100 text-sky-800' },
  { id: 'IN_REVIEW', label: 'In Review', bg: 'bg-purple-50/50 dark:bg-purple-950/20', border: 'border-purple-200 dark:border-purple-900/40', badge: 'bg-purple-100 text-purple-800' },
  { id: 'BLOCKED', label: 'Blocked', bg: 'bg-rose-50/50 dark:bg-rose-950/20', border: 'border-rose-200 dark:border-rose-900/40', badge: 'bg-rose-100 text-rose-800' },
  { id: 'DONE', label: 'Done', bg: 'bg-emerald-50/50 dark:bg-emerald-950/20', border: 'border-emerald-200 dark:border-emerald-900/40', badge: 'bg-emerald-100 text-emerald-800' },
];

export const ProjectKanbanBoard: React.FC<Props> = ({
  tasks,
  onTaskStatusChange,
  onAddTaskClick,
  isCustomerView = false,
}) => {
  const [filterVisibility, setFilterVisibility] = useState<'ALL' | 'CUSTOMER_VISIBLE' | 'INTERNAL'>('ALL');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');

  const visibleTasks = tasks.filter((t) => {
    if (isCustomerView && t.visibility !== 'CUSTOMER_VISIBLE') return false;
    if (filterVisibility === 'CUSTOMER_VISIBLE' && t.visibility !== 'CUSTOMER_VISIBLE') return false;
    if (filterVisibility === 'INTERNAL' && t.visibility !== 'INTERNAL') return false;
    if (filterPriority !== 'ALL' && t.priority !== filterPriority) return false;
    return true;
  });

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-bold';
      case 'HIGH':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      case 'MEDIUM':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
      case 'LOW':
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="space-y-4">
      {/* Kanban Filters Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-sky-600 dark:text-sky-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {isCustomerView ? 'Project Task Roadmap' : 'Interactive Task Kanban Board'}
          </h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
            {visibleTasks.length} tasks
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!isCustomerView && (
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs">
              <button
                onClick={() => setFilterVisibility('ALL')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  filterVisibility === 'ALL'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                All Visibility
              </button>
              <button
                onClick={() => setFilterVisibility('CUSTOMER_VISIBLE')}
                className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition-all ${
                  filterVisibility === 'CUSTOMER_VISIBLE'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Eye className="w-3 h-3 text-emerald-600" /> Client Visible
              </button>
              <button
                onClick={() => setFilterVisibility('INTERNAL')}
                className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition-all ${
                  filterVisibility === 'INTERNAL'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Lock className="w-3 h-3 text-amber-600" /> Internal
              </button>
            </div>
          )}

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-slate-300"
          >
            <option value="ALL">All Priorities</option>
            <option value="URGENT">Urgent</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          {!isCustomerView && onAddTaskClick && (
            <button
              onClick={onAddTaskClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add Task
            </button>
          )}
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-2">
        {KANBAN_COLUMNS.map((col) => {
          const colTasks = visibleTasks.filter((t) => t.status === col.id);

          return (
            <div
              key={col.id}
              className={`rounded-xl border ${col.border} ${col.bg} p-3 flex flex-col min-h-[400px]`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  {col.label}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${col.badge}`}>
                  {colTasks.length}
                </span>
              </div>

              {/* Column Tasks */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                {colTasks.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400 dark:text-slate-600 italic">
                    No tasks in {col.label}
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-3 shadow-2xs hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-md ${getPriorityBadge(task.priority)}`}>
                          {task.priority}
                        </span>

                        {!isCustomerView && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 ${
                              task.visibility === 'CUSTOMER_VISIBLE'
                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            }`}
                            title={task.visibility === 'CUSTOMER_VISIBLE' ? 'Visible to Customer' : 'Internal Only'}
                          >
                            {task.visibility === 'CUSTOMER_VISIBLE' ? (
                              <Eye className="w-2.5 h-2.5" />
                            ) : (
                              <Lock className="w-2.5 h-2.5" />
                            )}
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug mb-1">
                        {task.name}
                      </h4>

                      {task.description && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
                          {task.description}
                        </p>
                      )}

                      {/* Phase & Milestone Tag */}
                      {task.phaseName && (
                        <div className="text-[10px] text-sky-600 dark:text-sky-400 font-medium mb-2">
                          Phase: {task.phaseName}
                        </div>
                      )}

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mb-2 overflow-hidden">
                        <div
                          className={`h-full ${
                            task.status === 'DONE'
                              ? 'bg-emerald-500'
                              : task.status === 'BLOCKED'
                              ? 'bg-rose-500'
                              : 'bg-sky-500'
                          }`}
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>

                      {/* Card Footer */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-400" />
                          <span className="truncate max-w-[80px]">{task.assigneeName || 'Team'}</span>
                        </div>

                        <div className="flex items-center gap-1 text-[10px]">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{task.dueDate.split('T')[0]}</span>
                        </div>
                      </div>

                      {/* Internal Quick Move Actions */}
                      {!isCustomerView && onTaskStatusChange && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          <span className="text-[10px] text-slate-400">Move:</span>
                          <div className="flex items-center gap-1">
                            {col.id !== 'TODO' && (
                              <button
                                onClick={() => onTaskStatusChange(task.id, 'TODO')}
                                className="px-1.5 py-0.5 rounded text-[9px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                              >
                                ToDo
                              </button>
                            )}
                            {col.id !== 'IN_PROGRESS' && (
                              <button
                                onClick={() => onTaskStatusChange(task.id, 'IN_PROGRESS')}
                                className="px-1.5 py-0.5 rounded text-[9px] bg-sky-100 hover:bg-sky-200 text-sky-800 dark:bg-sky-950 dark:text-sky-300"
                              >
                                Prog
                              </button>
                            )}
                            {col.id !== 'DONE' && (
                              <button
                                onClick={() => onTaskStatusChange(task.id, 'DONE')}
                                className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-100 hover:bg-emerald-200 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                              >
                                Done
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
