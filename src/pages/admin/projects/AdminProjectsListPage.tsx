import React, { useState, useEffect } from 'react';
import { FullProjectRecord, FullProjectStatus, ProjectHealthStatus } from '../../../types';
import { ProjectService } from '../../../services/ProjectService';
import { ProjectHealthBadge } from '../../../components/project/ProjectHealthBadge';
import { ProjectStatusBadge } from '../../../components/project/ProjectStatusBadge';
import { ProjectReportService } from '../../../services/ProjectReportService';
import {
  FolderKanban,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  Printer,
  Calendar,
  Building,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

export const AdminProjectsListPage: React.FC = () => {
  const [projects, setProjects] = useState<FullProjectRecord[]>([]);
  const [search, setSearch] = useState('');
  const [selectedHealth, setSelectedHealth] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const data = ProjectService.getAllProjects();
    setProjects(data);
  };

  const filteredProjects = projects.filter((p) => {
    if (selectedHealth !== 'ALL' && p.health !== selectedHealth) return false;
    if (selectedStatus !== 'ALL' && p.status !== selectedStatus) return false;
    if (
      search &&
      !p.projectName.toLowerCase().includes(search.toLowerCase()) &&
      !p.customerName.toLowerCase().includes(search.toLowerCase()) &&
      !p.projectNumber.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const totalCount = projects.length;
  const onTrackCount = projects.filter((p) => p.health === 'ON_TRACK').length;
  const atRiskCount = projects.filter((p) => p.health === 'AT_RISK' || p.health === 'DELAYED' || p.health === 'BLOCKED').length;
  const completedCount = projects.filter((p) => p.status === 'COMPLETED').length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-sky-500/20 text-sky-400 border border-sky-500/30 uppercase tracking-wider">
              Project Management Engine
            </span>
          </div>
          <h1 className="text-xl font-black tracking-tight">Software Development Projects Command Center</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time tracking of SMART-AI.ID client development projects, phase roadmaps, and delivery health.
          </p>
        </div>

        <a
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" /> Initialize New Project
        </a>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span>Total Projects</span>
            <FolderKanban className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{totalCount}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span>On Track Health</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{onTrackCount}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span>At Risk / Delayed</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{atRiskCount}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span>Completed Projects</span>
            <TrendingUp className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-sky-600 dark:text-sky-400">{completedCount}</div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by project name, client company, or project number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedHealth}
            onChange={(e) => setSelectedHealth(e.target.value)}
            className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-slate-700 dark:text-slate-300"
          >
            <option value="ALL">All Health Statuses</option>
            <option value="ON_TRACK">On Track</option>
            <option value="AT_RISK">At Risk</option>
            <option value="DELAYED">Delayed</option>
            <option value="BLOCKED">Blocked</option>
            <option value="COMPLETED">Completed</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-slate-700 dark:text-slate-300"
          >
            <option value="ALL">All Project Phases</option>
            <option value="PLANNING">Planning</option>
            <option value="REQUIREMENT">Requirement</option>
            <option value="DESIGN">UI/UX Design</option>
            <option value="DEVELOPMENT">Development</option>
            <option value="TESTING">Testing</option>
            <option value="UAT">UAT Acceptance</option>
            <option value="DEPLOYMENT">Deployment</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      {/* Projects Table / Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <FolderKanban className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No Projects Found</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your filter or search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-sky-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">{p.projectNumber}</span>
                    <ProjectStatusBadge status={p.status} />
                  </div>
                  <ProjectHealthBadge health={p.health} />
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 transition-colors mb-1">
                  {p.projectName}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium mb-3">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>{p.customerName}</span>
                  <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                  <span>{p.industry}</span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Overall Progress</span>
                    <span className="font-black text-slate-900 dark:text-white">{p.overallProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        p.overallProgress === 100
                          ? 'bg-emerald-500'
                          : p.health === 'DELAYED'
                          ? 'bg-rose-500'
                          : 'bg-sky-500'
                      }`}
                      style={{ width: `${p.overallProgress}%` }}
                    />
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-600 dark:text-slate-400 mb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">PM Lead</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{p.projectManagerName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Target Due</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{p.targetDate}</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => ProjectReportService.printProjectReport(p, false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all"
                >
                  <Printer className="w-3.5 h-3.5" /> Report PDF
                </button>

                <a
                  href={`/admin/projects/${p.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-all"
                >
                  Manage Command Center <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
