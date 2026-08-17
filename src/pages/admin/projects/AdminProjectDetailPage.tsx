import React, { useState, useEffect } from 'react';
import { useRouter } from '../../../lib/router';
import { ProjectService } from '../../../services/ProjectService';
import { ProjectReportService } from '../../../services/ProjectReportService';
import { AIProjectManagerService } from '../../../services/AIProjectManagerService';
import { FullProjectRecord, TaskStatus, ProjectDocumentType, MeetingType, RiskSeverity, ProjectPhaseName } from '../../../types';

import { ProjectPhaseTracker } from '../../../components/project/ProjectPhaseTracker';
import { ProjectHealthBadge } from '../../../components/project/ProjectHealthBadge';
import { ProjectStatusBadge } from '../../../components/project/ProjectStatusBadge';
import { ProjectKanbanBoard } from '../../../components/project/ProjectKanbanBoard';
import { ProjectGanttChart } from '../../../components/project/ProjectGanttChart';
import { ProjectDocumentCenter } from '../../../components/project/ProjectDocumentCenter';
import { ProjectMeetingScheduler } from '../../../components/project/ProjectMeetingScheduler';
import { ProjectUpdatesFeed } from '../../../components/project/ProjectUpdatesFeed';
import { ProjectRisksAndIssues } from '../../../components/project/ProjectRisksAndIssues';
import { ProjectUATAndReleases } from '../../../components/project/ProjectUATAndReleases';
import { ProjectChatPanel } from '../../../components/project/ProjectChatPanel';

import {
  ArrowLeft,
  Printer,
  Sparkles,
  Plus,
  Calendar,
  Building,
  DollarSign,
  Layers,
  FileText,
  Video,
  Megaphone,
  ShieldAlert,
  Rocket,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Activity,
  User,
  ExternalLink,
} from 'lucide-react';

interface Props {
  projectId?: string;
}

export const AdminProjectDetailPage: React.FC<Props> = ({ projectId }) => {
  const { currentPath, navigate } = useRouter();
  const [project, setProject] = useState<FullProjectRecord | null>(null);
  const [activeTab, setActiveTab] = useState<
    'KANBAN' | 'GANTT' | 'DOCUMENTS' | 'MEETINGS' | 'UPDATES' | 'RISKS' | 'UAT' | 'CHAT'
  >('KANBAN');

  // Quick Action Modal States
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskPhase, setTaskPhase] = useState<ProjectPhaseName>('Development');
  const [taskPriority, setTaskPriority] = useState<'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');
  const [taskAssignee, setTaskAssignee] = useState('Senior Lead Dev');

  // AI Assistant Analysis State
  const [aiAnalysisModal, setAiAnalysisModal] = useState<{
    isOpen: boolean;
    type: 'UPDATE' | 'RISK';
    title: string;
    content: string;
    loading: boolean;
  }>({
    isOpen: false,
    type: 'UPDATE',
    title: '',
    content: '',
    loading: false,
  });

  useEffect(() => {
    loadProject();
  }, [projectId, currentPath]);

  const loadProject = () => {
    const id = projectId || currentPath.split('/admin/projects/')[1] || 'prj_global_logistics_01';
    const found = ProjectService.getProjectById(id);
    if (found) {
      setProject(found);
    } else {
      // Fallback if ID not found, try first available project
      const all = ProjectService.getAllProjects();
      if (all.length > 0) {
        setProject(all[0]);
      }
    }
  };

  if (!project) {
    return (
      <div className="text-center py-16">
        <div className="text-slate-400 text-xs mb-4">Project Workspace Not Found</div>
        <a
          href="/admin/projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Projects List
        </a>
      </div>
    );
  }

  const fmtCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(
      val
    );
  };

  // Handlers for updating project state
  const handleTaskStatusChange = (taskId: string, newStatus: TaskStatus) => {
    ProjectService.updateTask(project.id, taskId, { status: newStatus });
    loadProject();
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    ProjectService.addTask(project.id, {
      name: taskName,
      phaseName: taskPhase,
      priority: taskPriority,
      assigneeName: taskAssignee,
      status: 'TODO',
      visibility: 'CUSTOMER_VISIBLE',
    });

    setTaskName('');
    setShowTaskModal(false);
    loadProject();
  };

  const handleUploadDocument = (doc: any) => {
    ProjectService.addDocument(project.id, doc);
    loadProject();
  };

  const handleScheduleMeeting = (mtg: any) => {
    ProjectService.addMeeting(project.id, mtg);
    loadProject();
  };

  const handlePostUpdate = (upd: any) => {
    ProjectService.addUpdateNotice(project.id, upd);
    loadProject();
  };

  const handleAddRisk = (risk: any) => {
    const currentRisks = project.risks || [];
    const newRisk = {
      id: `risk_${Date.now()}`,
      projectId: project.id,
      title: risk.title || 'New Risk',
      description: risk.description || risk.title || 'No description provided',
      impact: risk.impact || '',
      probability: risk.probability || 'MEDIUM',
      severity: risk.severity || 'MEDIUM',
      mitigation: risk.mitigation || '',
      status: risk.status || 'ACTIVE',
      visibility: risk.visibility || 'CUSTOMER_VISIBLE',
      createdAt: new Date().toISOString(),
    };
    ProjectService.updateProject(project.id, { risks: [...currentRisks, newRisk] });
    loadProject();
  };

  const handleSendMessage = (msgText: string) => {
    ProjectService.addChatMessage(project.id, {
      senderId: 'pm_admin',
      senderName: project.projectManagerName || 'Project Manager',
      senderRole: 'Project Manager',
      senderType: 'PM',
      message: msgText,
    });
    loadProject();
  };

  // AI Generators
  const handleRunAiCustomerUpdate = async () => {
    setAiAnalysisModal({
      isOpen: true,
      type: 'UPDATE',
      title: 'Generating AI Customer Progress Update...',
      content: '',
      loading: true,
    });

    try {
      const result = await AIProjectManagerService.generateCustomerSafeUpdate(project);
      setAiAnalysisModal({
        isOpen: true,
        type: 'UPDATE',
        title: result.title,
        content: result.content,
        loading: false,
      });
    } catch (e) {
      setAiAnalysisModal({
        isOpen: true,
        type: 'UPDATE',
        title: 'AI Generation Error',
        content: 'Failed to connect to Gemini AI Engine. Please check your network.',
        loading: false,
      });
    }
  };

  const handleRunAiRiskAnalysis = async () => {
    setAiAnalysisModal({
      isOpen: true,
      type: 'RISK',
      title: 'Generating AI Project Risk Assessment...',
      content: '',
      loading: true,
    });

    try {
      const result = await AIProjectManagerService.analyzeProjectRisks(project);
      setAiAnalysisModal({
        isOpen: true,
        type: 'RISK',
        title: `AI Risk Assessment Level: ${result.riskLevel}`,
        content: `${result.summary}\n\nRecommended Actions:\n${result.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}`,
        loading: false,
      });
    } catch (e) {
      setAiAnalysisModal({
        isOpen: true,
        type: 'RISK',
        title: 'AI Analysis Error',
        content: 'Failed to run Gemini Risk Diagnostics.',
        loading: false,
      });
    }
  };

  const handlePublishAiUpdate = () => {
    if (aiAnalysisModal.content && aiAnalysisModal.type === 'UPDATE') {
      ProjectService.addUpdateNotice(project.id, {
        title: aiAnalysisModal.title,
        content: aiAnalysisModal.content,
        visibility: 'CUSTOMER_VISIBLE',
        status: 'PUBLISHED',
      });
      loadProject();
      setAiAnalysisModal({ ...aiAnalysisModal, isOpen: false });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Navigation Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href="/admin/projects"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-sky-400">{project.projectNumber}</span>
                <ProjectStatusBadge status={project.status} />
                <ProjectHealthBadge health={project.health} />
              </div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight">{project.projectName}</h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-500" /> {project.customerName}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-500" /> Lead PM: {project.projectManagerName}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" /> Target Due: {project.targetDate}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRunAiCustomerUpdate}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-500/20 border border-sky-500/30 text-sky-300 hover:bg-sky-500/30 text-xs font-bold transition-all"
            >
              <Sparkles className="w-4 h-4 text-sky-400" /> AI Progress Update
            </button>

            <button
              onClick={handleRunAiRiskAnalysis}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:bg-amber-500/30 text-xs font-bold transition-all"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" /> AI Risk Check
            </button>

            <button
              onClick={() => ProjectReportService.printProjectReport(project, true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
            >
              <Printer className="w-4 h-4" /> Executive PDF Report
            </button>
          </div>
        </div>

        {/* Project Contract Summary */}
        <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Contract Value</span>
            <span className="font-mono text-sm font-bold text-white">
              {fmtCurrency(project.financialSummary?.contractValue || 0)}
            </span>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Invoiced</span>
            <span className="font-mono text-sm font-bold text-sky-400">
              {fmtCurrency(project.financialSummary?.invoiced || 0)}
            </span>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Paid Receipts</span>
            <span className="font-mono text-sm font-bold text-emerald-400">
              {fmtCurrency(project.financialSummary?.paid || 0)}
            </span>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Outstanding Balance</span>
            <span className="font-mono text-sm font-bold text-amber-400">
              {fmtCurrency(project.financialSummary?.outstanding || 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Weighted Phase Tracker */}
      <ProjectPhaseTracker phases={project.phases} overallProgress={project.overallProgress} />

      {/* Main Command Center Tabs Header */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-2 shadow-xs flex items-center gap-1 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('KANBAN')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'KANBAN'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" /> Tasks & Kanban ({project.tasks?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab('GANTT')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'GANTT'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" /> Timeline & Gantt
        </button>

        <button
          onClick={() => setActiveTab('RISKS')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'RISKS'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4" /> Risks & Issues ({project.risks?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab('DOCUMENTS')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'DOCUMENTS'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" /> Document Center ({project.documents?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab('MEETINGS')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'MEETINGS'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Video className="w-4 h-4" /> Meetings ({project.meetings?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab('UPDATES')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'UPDATES'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Megaphone className="w-4 h-4" /> Updates Feed ({project.updates?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab('UAT')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'UAT'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Rocket className="w-4 h-4" /> UAT & Releases ({project.releases?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab('CHAT')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'CHAT'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Client PM Chat ({project.messages?.length || 0})
        </button>
      </div>

      {/* Active Tab View */}
      {activeTab === 'KANBAN' && (
        <ProjectKanbanBoard
          tasks={project.tasks || []}
          onTaskStatusChange={handleTaskStatusChange}
          onAddTaskClick={() => setShowTaskModal(true)}
          isCustomerView={false}
        />
      )}

      {activeTab === 'GANTT' && (
        <ProjectGanttChart
          phases={project.phases}
          milestones={project.milestones}
          tasks={project.tasks}
          startDate={project.startDate}
          targetDate={project.targetDate}
          isCustomerView={false}
        />
      )}

      {activeTab === 'RISKS' && (
        <ProjectRisksAndIssues
          risks={project.risks || []}
          issues={project.issues || []}
          onAddRisk={handleAddRisk}
          isCustomerView={false}
        />
      )}

      {activeTab === 'DOCUMENTS' && (
        <ProjectDocumentCenter
          documents={project.documents || []}
          onUploadDocument={handleUploadDocument}
          isCustomerView={false}
        />
      )}

      {activeTab === 'MEETINGS' && (
        <ProjectMeetingScheduler
          meetings={project.meetings || []}
          onScheduleMeeting={handleScheduleMeeting}
          isCustomerView={false}
        />
      )}

      {activeTab === 'UPDATES' && (
        <ProjectUpdatesFeed
          project={project}
          updates={project.updates || []}
          onPostUpdate={handlePostUpdate}
          isCustomerView={false}
        />
      )}

      {activeTab === 'UAT' && (
        <ProjectUATAndReleases
          uatTestCases={project.uatTestCases || []}
          uatApproval={project.uatApproval}
          releases={project.releases || []}
          isCustomerView={false}
        />
      )}

      {activeTab === 'CHAT' && (
        <ProjectChatPanel
          messages={project.messages || []}
          onSendMessage={handleSendMessage}
          isCustomerView={false}
        />
      )}

      {/* Add Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Create New Project Task</h3>

            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Task Name *</label>
                <input
                  type="text"
                  required
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="e.g. Build Webhook Event Handler for Payment Gateway"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Phase</label>
                  <select
                    value={taskPhase}
                    onChange={(e) => setTaskPhase(e.target.value as ProjectPhaseName)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Requirement">Requirement</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Development">Development</option>
                    <option value="Testing">Testing</option>
                    <option value="Deployment">Deployment</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="URGENT">URGENT</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Assigned Team Member</label>
                <input
                  type="text"
                  value={taskAssignee}
                  onChange={(e) => setTaskAssignee(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow-xs"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Assistant Modal */}
      {aiAnalysisModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-500" /> {aiAnalysisModal.title}
            </h3>

            {aiAnalysisModal.loading ? (
              <div className="py-12 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
                <Clock className="w-6 h-6 text-sky-500 animate-spin" />
                <span>Gemini AI Analyzing project metrics & generating insights...</span>
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 text-xs font-mono text-slate-800 dark:text-slate-200 max-h-80 overflow-y-auto whitespace-pre-line border border-slate-200 dark:border-slate-700">
                {aiAnalysisModal.content}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setAiAnalysisModal({ ...aiAnalysisModal, isOpen: false })}
                className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 text-xs"
              >
                Close
              </button>
              {!aiAnalysisModal.loading && aiAnalysisModal.type === 'UPDATE' && (
                <button
                  type="button"
                  onClick={handlePublishAiUpdate}
                  className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow-xs text-xs"
                >
                  Publish AI Update to Customer
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
