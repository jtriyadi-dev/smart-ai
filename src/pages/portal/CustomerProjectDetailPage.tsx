import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { CustomerPortalLayout } from '../../components/portal/CustomerPortalLayout';
import { CustomerPortalService, CustomerSession } from '../../services/CustomerPortalService';
import { CustomerProject } from '../../types';
import {
  FolderKanban,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Layers,
  FileCode,
  UserCheck,
  Receipt,
  MessageSquare,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

interface Props {
  projectId?: string;
}

export const CustomerProjectDetailPage: React.FC<Props> = ({ projectId }) => {
  const { navigate, currentPath } = useRouter();
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [project, setProject] = useState<CustomerProject | null>(null);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'MODULES' | 'MILESTONES' | 'UPDATES' | 'FINANCIAL'>('OVERVIEW');

  useEffect(() => {
    const s = CustomerPortalService.getCurrentSession();
    if (s) {
      setSession(s);
      // Extract project ID from route if not explicitly passed
      const id = projectId || currentPath.split('/portal/projects/')[1] || 'PROJ-001';
      const found = CustomerPortalService.getProjectById(s.company.id, id);
      setProject(found || null);
    }
  }, [projectId, currentPath]);

  if (!session || !project) {
    return (
      <CustomerPortalLayout activePath="/portal/projects">
        <div className="p-8 text-center text-slate-400 text-xs">
          Proyek tidak ditemukan atau Anda tidak memiliki akses.
          <button onClick={() => navigate('/portal/projects')} className="block mx-auto mt-4 text-cyan-400 font-bold">
            Kembali ke Daftar Proyek
          </button>
        </div>
      </CustomerPortalLayout>
    );
  }

  const fmtCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const timelineSteps = [
    { title: 'Requirements', done: true },
    { title: 'Architecture Design', done: true },
    { title: 'Core Development', done: project.progressPercentage >= 50 },
    { title: 'UAT Testing', done: project.progressPercentage >= 80 },
    { title: 'Deployment', done: project.progressPercentage === 100 },
    { title: 'Completed', done: project.status === 'COMPLETED' }
  ];

  return (
    <CustomerPortalLayout activePath="/portal/projects">
      {/* Back Button */}
      <button
        onClick={() => navigate('/portal/projects')}
        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Proyek
      </button>

      {/* Project Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                {project.status}
              </span>
              <span className="text-xs text-slate-400">Industry: {project.industry}</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">{project.projectName}</h1>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400">Target Completion</div>
            <div className="text-sm font-bold text-cyan-400 flex items-center justify-end gap-1.5 mt-0.5">
              <Calendar className="w-4 h-4" /> {project.expectedCompletion}
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 max-w-3xl leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Overall Development Progress</span>
            <span className="font-extrabold text-cyan-400 text-sm">{project.progressPercentage}%</span>
          </div>
          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${project.progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Visual Timeline Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 mb-8 overflow-x-auto">
        <h3 className="text-xs font-bold text-slate-300 mb-4 uppercase tracking-wider">Visual Development Roadmap</h3>
        <div className="flex items-center justify-between min-w-[600px] text-xs">
          {timelineSteps.map((step, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center relative">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition ${
                  step.done
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}
              >
                {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
              </div>
              <span className={`text-[11px] font-semibold ${step.done ? 'text-white' : 'text-slate-500'}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 mb-6 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`pb-3 px-4 transition border-b-2 ${
            activeTab === 'OVERVIEW'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Overview & Stack
        </button>
        <button
          onClick={() => setActiveTab('MODULES')}
          className={`pb-3 px-4 transition border-b-2 ${
            activeTab === 'MODULES'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Modules ({project.modules.length})
        </button>
        <button
          onClick={() => setActiveTab('MILESTONES')}
          className={`pb-3 px-4 transition border-b-2 ${
            activeTab === 'MILESTONES'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Milestones ({project.milestones.length})
        </button>
        <button
          onClick={() => setActiveTab('UPDATES')}
          className={`pb-3 px-4 transition border-b-2 ${
            activeTab === 'UPDATES'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Updates Feed ({project.updates.length})
        </button>
        <button
          onClick={() => setActiveTab('FINANCIAL')}
          className={`pb-3 px-4 transition border-b-2 ${
            activeTab === 'FINANCIAL'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Financial Summary
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-cyan-400" /> Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-cyan-400" /> Assigned Team & Management
            </h3>
            <div className="text-xs text-slate-300 space-y-2">
              <div>Project Manager: <strong className="text-white">{project.projectManager}</strong></div>
              <div>Start Date: <strong className="text-white">{project.startDate}</strong></div>
              <div>Expected Completion: <strong className="text-white">{project.expectedCompletion}</strong></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'MODULES' && (
        <div className="space-y-3">
          {project.modules.map((m) => (
            <div key={m.id} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-4 text-xs">
              <div>
                <div className="font-semibold text-white">{m.name}</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Status: {m.status}</div>
              </div>
              <div className="text-right shrink-0">
                <span className="font-bold text-cyan-400 text-sm">{m.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'MILESTONES' && (
        <div className="space-y-4">
          {project.milestones.map((m) => (
            <div key={m.id} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h4 className="text-sm font-bold text-white">{m.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{m.description}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                  m.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                }`}>
                  {m.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 mt-4 pt-3 border-t border-slate-800/80">
                <span>Jatuh Tempo: <strong>{m.dueDate}</strong></span>
                <span>Progress: <strong className="text-cyan-400">{m.progress}%</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'UPDATES' && (
        <div className="space-y-4">
          {project.updates.map((upd) => (
            <div key={upd.id} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-bold text-cyan-400">{upd.author}</span>
                <span>{upd.date}</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{upd.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{upd.content}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'FINANCIAL' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-amber-400" /> Financial Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-slate-400 block mb-1">Contract Value</span>
              <span className="text-sm font-extrabold text-white">{fmtCurrency(project.financialSummary.contractValue)}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-slate-400 block mb-1">Total Invoiced</span>
              <span className="text-sm font-extrabold text-cyan-400">{fmtCurrency(project.financialSummary.invoiced)}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-slate-400 block mb-1">Total Paid</span>
              <span className="text-sm font-extrabold text-emerald-400">{fmtCurrency(project.financialSummary.paid)}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-slate-400 block mb-1">Outstanding Balance</span>
              <span className="text-sm font-extrabold text-amber-400">{fmtCurrency(project.financialSummary.outstanding)}</span>
            </div>
          </div>
        </div>
      )}
    </CustomerPortalLayout>
  );
};
