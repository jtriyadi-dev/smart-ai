import React, { useState } from 'react';
import { RequirementAnalysis, FunctionalRequirementItem, BusinessRequirementItem } from '../../types';
import { AIRequirementAnalyzerService } from '../../services/aiRequirementService';
import { RequirementPermissionMatrixView } from './RequirementPermissionMatrixView';
import { RequirementWorkflowView } from './RequirementWorkflowView';
import { RequirementTraceabilityView } from './RequirementTraceabilityView';
import { 
  Sparkles, ShieldCheck, FileText, CheckCircle2, AlertTriangle, HelpCircle, 
  Search, Filter, Save, Download, Printer, Plus, Trash2, Edit3, ArrowRight,
  Gauge, Layers, Users, GitCommit, Database, Zap, Cpu, CheckSquare, RefreshCw, FileCode2, Boxes
} from 'lucide-react';

interface RequirementReviewWorkspaceProps {
  analysis: RequirementAnalysis;
  onUpdateAnalysis: (updated: RequirementAnalysis) => void;
  onOpenProposalGenerator?: (analysis: RequirementAnalysis) => void;
  onOpenProjectEstimator?: (analysis: RequirementAnalysis) => void;
  onOpenSolutionArchitect?: (analysis: RequirementAnalysis) => void;
  onOpenModuleGenerator?: (analysis: RequirementAnalysis) => void;
}

export const RequirementReviewWorkspace: React.FC<RequirementReviewWorkspaceProps> = ({
  analysis,
  onUpdateAnalysis,
  onOpenProposalGenerator,
  onOpenProjectEstimator,
  onOpenSolutionArchitect,
  onOpenModuleGenerator
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'business' | 'functional' | 'nonfunctional' | 'modules' | 'matrix' | 'workflow' | 'integrations' | 'traceability' | 'srs'
  >('overview');

  // Search & Filters for Functional Requirements
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [moduleFilter, setModuleFilter] = useState<string>('ALL');

  // State for Add FR Modal
  const [showAddFrModal, setShowAddFrModal] = useState<boolean>(false);
  const [newFrData, setNewFrData] = useState<Partial<FunctionalRequirementItem>>({
    module: 'Dashboard',
    feature: '',
    description: '',
    userRole: 'Staff / Operator',
    category: 'Transaction',
    priority: 'Must Have'
  });

  // State for Version History Popup
  const [showVersionHistory, setShowVersionHistory] = useState<boolean>(false);

  // Status Badge Toggle Handler
  const handleToggleStatus = (type: 'FR' | 'BR', id: string) => {
    if (type === 'FR') {
      const updatedFrs = analysis.functionalRequirements.map((fr) => {
        if (fr.id === id) {
          const nextStatus = fr.status === 'Confirmed' ? 'User Edited' : 'Confirmed';
          return { ...fr, status: nextStatus as any };
        }
        return fr;
      });
      const updatedAnalysis = { ...analysis, functionalRequirements: updatedFrs };
      onUpdateAnalysis(updatedAnalysis);
      AIRequirementAnalyzerService.saveRequirementToStorage(updatedAnalysis);
    } else if (type === 'BR') {
      const updatedBrs = analysis.businessRequirements.map((br) => {
        if (br.id === id) {
          const nextStatus = br.status === 'Confirmed' ? 'User Edited' : 'Confirmed';
          return { ...br, status: nextStatus as any };
        }
        return br;
      });
      const updatedAnalysis = { ...analysis, businessRequirements: updatedBrs };
      onUpdateAnalysis(updatedAnalysis);
      AIRequirementAnalyzerService.saveRequirementToStorage(updatedAnalysis);
    }
  };

  // Add New Functional Requirement
  const handleAddFunctionalRequirement = () => {
    if (!newFrData.feature || !newFrData.description) {
      alert('Nama fitur dan deskripsi requirement wajib diisi.');
      return;
    }

    const nextId = `FR-00${analysis.functionalRequirements.length + 1}`;
    const newItem: FunctionalRequirementItem = {
      id: nextId,
      module: newFrData.module || 'General',
      feature: newFrData.feature,
      description: newFrData.description,
      userRole: newFrData.userRole || 'All Roles',
      category: (newFrData.category as any) || 'Transaction',
      priority: (newFrData.priority as any) || 'Must Have',
      status: 'Confirmed'
    };

    const updatedFrs = [newItem, ...analysis.functionalRequirements];
    const updatedAnalysis = { ...analysis, functionalRequirements: updatedFrs };
    onUpdateAnalysis(updatedAnalysis);
    AIRequirementAnalyzerService.saveRequirementToStorage(updatedAnalysis);
    AIRequirementAnalyzerService.saveVersion(updatedAnalysis, `Ditambahkan requirement baru: ${nextId}`);

    setShowAddFrModal(false);
    setNewFrData({
      module: 'Dashboard',
      feature: '',
      description: '',
      userRole: 'Staff / Operator',
      category: 'Transaction',
      priority: 'Must Have'
    });
  };

  // Delete Functional Requirement
  const handleDeleteFr = (id: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus requirement ${id}?`)) {
      const updatedFrs = analysis.functionalRequirements.filter((fr) => fr.id !== id);
      const updatedAnalysis = { ...analysis, functionalRequirements: updatedFrs };
      onUpdateAnalysis(updatedAnalysis);
      AIRequirementAnalyzerService.saveRequirementToStorage(updatedAnalysis);
      AIRequirementAnalyzerService.saveVersion(updatedAnalysis, `Dihapus requirement: ${id}`);
    }
  };

  // Save Manual Trigger
  const handleSaveRequirement = () => {
    AIRequirementAnalyzerService.saveRequirementToStorage(analysis);
    AIRequirementAnalyzerService.saveVersion(analysis, 'Requirement disimpan secara manual oleh user');
    alert('Requirement Specification berhasil disimpan ke penyimpanan lokal.');
  };

  // Filtered Functional Requirements
  const filteredFrs = analysis.functionalRequirements.filter((fr) => {
    const matchesSearch =
      fr.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fr.feature.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fr.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fr.module.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority = priorityFilter === 'ALL' || fr.priority === priorityFilter;
    const matchesModule = moduleFilter === 'ALL' || fr.module === moduleFilter;

    return matchesSearch && matchesPriority && matchesModule;
  });

  const allModulesList = Array.from(
    new Set(analysis.functionalRequirements.map((fr) => fr.module))
  );

  return (
    <div className="space-y-8">
      
      {/* Top Specification Header Bar */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/40 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/40 space-y-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>AI-GENERATED PRELIMINARY SOFTWARE REQUIREMENTS</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
                Versi {analysis.version || 1}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              {analysis.projectOverview?.solutionName || 'Software Requirement Specification'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
              {analysis.projectOverview?.executiveSummary}
            </p>
          </div>

          {/* Completeness Score Card */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-cyan-500/30 text-center space-y-1 min-w-[170px]">
            <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
              REQUIREMENT COMPLETENESS
            </div>
            <div className="text-3xl font-extrabold text-cyan-300 font-display">
              {analysis.requirementCompleteness?.score || 88}
              <span className="text-sm font-normal text-slate-500">/100</span>
            </div>
            <p className="text-[10px] text-slate-400">
              {analysis.requirementCompleteness?.label || 'Preliminary Assessment'}
            </p>
          </div>
        </div>

        {/* DOCUMENT ACTION BUTTONS BAR */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSaveRequirement}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all hover:bg-slate-800"
            >
              <Save className="w-3.5 h-3.5 text-cyan-400" />
              <span>Simpan Requirement</span>
            </button>

            <button
              type="button"
              onClick={() => AIRequirementAnalyzerService.exportJSON(analysis)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all hover:bg-slate-800"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Download JSON</span>
            </button>

            <button
              type="button"
              onClick={() => AIRequirementAnalyzerService.exportPDF(analysis)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all hover:bg-slate-800"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cetak / PDF SRS</span>
            </button>
          </div>

          {/* NEXT STAGE INTEGRATION POINTS FOR PROMPTS 6 & 7 */}
          <div className="flex flex-wrap items-center gap-2">
            {onOpenSolutionArchitect && (
              <button
                type="button"
                onClick={() => onOpenSolutionArchitect(analysis)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 hover:from-blue-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-950/50 transition-all glow-primary-cta"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Rancang Arsitektur (AI Architect)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {onOpenModuleGenerator && (
              <button
                type="button"
                onClick={() => onOpenModuleGenerator(analysis)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-purple-950/50 transition-all"
              >
                <Boxes className="w-3.5 h-3.5" />
                <span>Konfigurasi Modul (AI Modules)</span>
              </button>
            )}

            {onOpenProposalGenerator && (
              <button
                type="button"
                onClick={() => onOpenProposalGenerator(analysis)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-950/50 transition-all"
              >
                <FileCode2 className="w-3.5 h-3.5" />
                <span>Generate Proposal</span>
              </button>
            )}

            {onOpenProjectEstimator && (
              <button
                type="button"
                onClick={() => onOpenProjectEstimator(analysis)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-950/50 transition-all"
              >
                <Gauge className="w-3.5 h-3.5" />
                <span>Estimate Project</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* WORKSPACE NAVIGATION TABS BAR */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none text-xs font-mono">
        {[
          { id: 'overview', label: 'Ringkasan Eksekutif', icon: FileText },
          { id: 'business', label: 'Business Requirements', icon: CheckSquare },
          { id: 'functional', label: 'Functional Requirements', icon: CheckCircle2 },
          { id: 'nonfunctional', label: 'Non-Functional', icon: ShieldCheck },
          { id: 'modules', label: 'Modul & User Roles', icon: Layers },
          { id: 'matrix', label: 'Permission Matrix', icon: ShieldCheck },
          { id: 'workflow', label: 'Business Workflows', icon: GitCommit },
          { id: 'integrations', label: 'Integrasi & AI', icon: Cpu },
          { id: 'traceability', label: 'Traceability Matrix', icon: GitCommit },
          { id: 'srs', label: 'Dokumen SRS Preview', icon: FileCode2 }
        ].map((tab) => {
          const IconC = tab.icon;
          const isAct = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer font-bold ${
                isAct
                  ? 'bg-cyan-950 border border-cyan-500 text-cyan-300 shadow-md'
                  : 'bg-slate-950/60 border border-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-800'
              }`}
            >
              <IconC className={`w-3.5 h-3.5 ${isAct ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Overview Factors */}
            <div className="md:col-span-2 glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Gauge className="w-4 h-4 text-cyan-400" />
                <span>Analisis Kesiapan Requirement (Quality Assessment)</span>
              </h3>
              
              <div className="space-y-2">
                {analysis.requirementCompleteness?.factors?.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* Quality Warnings */}
              {analysis.qualityWarnings && analysis.qualityWarnings.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 space-y-1 text-xs">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5 font-mono">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>PERHATIAN & REKOMENDASI VALIDASI</span>
                  </div>
                  {analysis.qualityWarnings.map((w, i) => (
                    <p key={i} className="text-slate-300 text-[11px]">{w}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Assumptions & Open Questions Summary */}
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Pertanyaan Terbuka & Asumsi</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-cyan-400 font-mono text-[10px] uppercase block mb-1">
                    ASUMSI PENGEMBANGAN:
                  </span>
                  <ul className="list-disc pl-4 text-slate-300 space-y-1 text-[11px]">
                    {analysis.assumptions?.map((asm, i) => (
                      <li key={i}>{asm}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="font-bold text-amber-400 font-mono text-[10px] uppercase block mb-1">
                    PERTANYAAN UNTUK DISKUSI:
                  </span>
                  {analysis.openQuestions?.map((q, i) => (
                    <div key={i} className="p-2 rounded bg-slate-950 border border-slate-800 mb-1.5 text-[11px]">
                      <p className="font-bold text-slate-200">{q.question}</p>
                      <p className="text-slate-400 text-[10px] mt-0.5">{q.whyItMatters}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Project Risks */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>Potensi Risiko Proyek & Rekomendasi Mitigasi</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {analysis.risks?.map((risk, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-red-300">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{risk.risk}</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Impact: {risk.impact}</p>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-cyan-300 text-[11px]">
                    <strong>Mitigasi:</strong> {risk.mitigationRecommendation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BUSINESS REQUIREMENTS */}
      {activeTab === 'business' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Business Requirements (BR) & Objectives</h3>
              <p className="text-xs text-slate-400">Kebutuhan dari sudut pandang tujuan bisnis perusahaan.</p>
            </div>
          </div>

          <div className="space-y-4">
            {analysis.businessRequirements?.map((br) => (
              <div
                key={br.id}
                className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3 hover:border-slate-700 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs">
                      {br.id}
                    </span>
                    <h4 className="font-bold text-white text-sm">{br.name}</h4>
                    {br.isAIRecommendation && (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 text-[10px] font-mono border border-indigo-500/40">
                        AI Recommendation
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      br.priority === 'High' ? 'bg-red-950 text-red-300 border border-red-500/40' : 'bg-slate-800 text-slate-300'
                    }`}>
                      Priority: {br.priority}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleToggleStatus('BR', br.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono cursor-pointer transition-all ${
                        br.status === 'Confirmed'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-900 text-cyan-300 border border-cyan-500/40'
                      }`}
                    >
                      {br.status || 'AI Suggested'}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300">{br.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">OBJECTIVE BISNIS:</span>
                    <p className="text-slate-200 mt-0.5">{br.businessObjective}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">BUSINESS VALUE:</span>
                    <p className="text-cyan-300 font-semibold mt-0.5">{br.businessValue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: FUNCTIONAL REQUIREMENTS */}
      {activeTab === 'functional' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari ID (FR-001), nama fitur, atau deskripsi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">Semua Prioritas</option>
                <option value="Must Have">Must Have</option>
                <option value="Should Have">Should Have</option>
                <option value="Could Have">Could Have</option>
                <option value="Optional">Optional</option>
              </select>

              <select
                value={moduleFilter}
                onChange={(e) => setModuleFilter(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">Semua Modul</option>
                {allModulesList.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setShowAddFrModal(true)}
                className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/20"
              >
                <Plus className="w-4 h-4 font-black" />
                <span>Tambah FR</span>
              </button>
            </div>

          </div>

          {/* Functional Requirements Grid/List */}
          <div className="space-y-3">
            {filteredFrs.map((fr) => (
              <div
                key={fr.id}
                className="glass-card rounded-2xl p-4 border border-slate-800 hover:border-cyan-500/30 transition-all space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-950 border border-blue-500/40 text-blue-300 font-mono font-bold text-xs">
                      {fr.id}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-xs font-mono">
                      {fr.module}
                    </span>
                    <h4 className="font-bold text-white text-sm">{fr.feature}</h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      fr.priority === 'Must Have'
                        ? 'bg-blue-950 text-blue-300 border border-blue-500/40'
                        : fr.priority === 'Should Have'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                        : 'bg-slate-900 text-slate-400'
                    }`}>
                      {fr.priority}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleToggleStatus('FR', fr.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono cursor-pointer transition-all ${
                        fr.status === 'Confirmed'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-900 text-cyan-300 border border-cyan-500/40'
                      }`}
                    >
                      {fr.status || 'AI Suggested'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteFr(fr.id)}
                      className="p-1 rounded text-slate-500 hover:text-red-400 cursor-pointer"
                      title="Hapus Requirement Ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300">{fr.description}</p>

                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-900">
                  <span>User Role: <strong className="text-slate-200">{fr.userRole}</strong></span>
                  <span>Kategori: <strong className="text-cyan-400 font-mono">{fr.category}</strong></span>
                </div>
              </div>
            ))}

            {filteredFrs.length === 0 && (
              <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center text-slate-400 text-xs">
                Tidak ada requirement yang cocok dengan kata kunci atau filter terpilih.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: NON-FUNCTIONAL REQUIREMENTS */}
      {activeTab === 'nonfunctional' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Non-Functional Requirements (NFR)</h3>
              <p className="text-xs text-slate-400">Spesifikasi kinerja, keamanan, skalabilitas, dan keandalan sistem.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.nonFunctionalRequirements?.map((nfr) => (
              <div
                key={nfr.id}
                className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-500/40 text-purple-300 font-mono font-bold text-xs">
                      {nfr.id}
                    </span>
                    <span className="font-bold text-white text-xs">{nfr.category}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] font-mono">
                    {nfr.priority}
                  </span>
                </div>

                <p className="text-xs text-slate-200">{nfr.requirement}</p>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                  <strong className="text-cyan-400 font-mono uppercase block text-[10px]">RASIONALISASI:</strong>
                  <span>{nfr.rationale}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: MODULES & USER ROLES */}
      {activeTab === 'modules' && (
        <div className="space-y-8">
          
          {/* Modules Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Daftar Modul Aplikasi Terstruktur</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.modules?.map((m) => (
                <div key={m.id} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs">
                      {m.id}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] font-mono font-bold">
                      {m.priority}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-sm">{m.name}</h4>
                  <p className="text-xs text-slate-300">{m.description}</p>

                  <div className="pt-2 border-t border-slate-800 text-xs space-y-1">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">FITUR KUNCI:</div>
                    <div className="flex flex-wrap gap-1">
                      {m.keyFeatures?.map((kf, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[11px]">
                          {kf}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Roles */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Struktur User Roles (Hierarki Peran)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {analysis.userRoles?.map((r) => (
                <div key={r.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-cyan-300 text-sm font-mono">{r.roleName}</h4>
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px] font-mono">
                      {r.accessLevel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{r.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 6: PERMISSION MATRIX */}
      {activeTab === 'matrix' && (
        <RequirementPermissionMatrixView matrix={analysis.permissionMatrix} />
      )}

      {/* TAB 7: WORKFLOW */}
      {activeTab === 'workflow' && (
        <RequirementWorkflowView workflows={analysis.workflows} />
      )}

      {/* TAB 8: INTEGRATIONS & AI */}
      {activeTab === 'integrations' && (
        <div className="space-y-8">
          
          {/* AI Requirements */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI Requirements & Technology Specifications</span>
            </h3>

            <div className="space-y-4">
              {analysis.aiRequirements?.map((ai) => (
                <div key={ai.id} className="glass-card rounded-2xl p-5 border border-cyan-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs">
                        {ai.id}
                      </span>
                      <h4 className="font-bold text-white text-sm">{ai.feature}</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] font-mono">
                      {ai.recommendedAITechnology}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">{ai.businessPurpose}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">INPUT DATA:</span>
                      <span className="text-slate-200">{ai.inputData}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">OUTPUT AI:</span>
                      <span className="text-cyan-300 font-bold">{ai.output}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Integrations */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>Kebutuhan Integrasi Sistem Eksternal</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {analysis.integrations?.map((int) => (
                <div key={int.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-xs font-mono">{int.system}</h4>
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px]">
                      {int.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{int.purpose}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 9: TRACEABILITY MATRIX */}
      {activeTab === 'traceability' && (
        <RequirementTraceabilityView traceabilityMap={analysis.traceabilityMap} />
      )}

      {/* TAB 10: SRS DOCUMENT PREVIEW */}
      {activeTab === 'srs' && (
        <div className="glass-card rounded-3xl p-8 border border-slate-800 space-y-8 text-slate-200 text-xs">
          <div className="border-b border-slate-800 pb-6 flex items-center justify-between">
            <div>
              <div className="text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">
                SOFTWARE REQUIREMENT SPECIFICATION (SRS)
              </div>
              <h2 className="text-2xl font-extrabold text-white mt-1">
                {analysis.projectOverview?.solutionName}
              </h2>
              <p className="text-slate-400 text-xs">
                Dokumen Spesifikasi Teknis Terstruktur • SMART-AI.ID AI Business Analyst Platform
              </p>
            </div>
            <button
              type="button"
              onClick={() => AIRequirementAnalyzerService.exportPDF(analysis)}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / PDF Dokumen Ini</span>
            </button>
          </div>

          <div className="space-y-6">
            <section className="space-y-2">
              <h3 className="font-bold text-white font-mono text-sm text-cyan-300 uppercase border-b border-slate-800 pb-1">
                1. Project Overview & Business Objectives
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {analysis.projectOverview?.executiveSummary}
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-white font-mono text-sm text-cyan-300 uppercase border-b border-slate-800 pb-1">
                2. Functional Requirements (FR) Summary
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {analysis.functionalRequirements?.map((fr) => (
                  <li key={fr.id}>
                    <strong>[{fr.id}] {fr.feature}:</strong> {fr.description} (<em>Role: {fr.userRole}</em>)
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-white font-mono text-sm text-cyan-300 uppercase border-b border-slate-800 pb-1">
                3. Non-Functional Requirements (NFR)
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {analysis.nonFunctionalRequirements?.map((nfr) => (
                  <li key={nfr.id}>
                    <strong>[{nfr.category}]:</strong> {nfr.requirement}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-white font-mono text-sm text-cyan-300 uppercase border-b border-slate-800 pb-1">
                4. AI Requirements & Systems Integration
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {analysis.aiRequirements?.map((ai) => (
                  <li key={ai.id}>
                    <strong>[AI Engine] {ai.feature}:</strong> {ai.businessPurpose} ({ai.recommendedAITechnology})
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      )}

      {/* ADD FUNCTIONAL REQUIREMENT MODAL */}
      {showAddFrModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-cyan-500/40 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                <span>Tambah Functional Requirement Baru</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddFrModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer text-sm font-mono"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Modul Aplikasi</label>
                <input
                  type="text"
                  value={newFrData.module || ''}
                  onChange={(e) => setNewFrData({ ...newFrData, module: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  placeholder="Contoh: Dashboard, Production, Inventory"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Nama Fitur</label>
                <input
                  type="text"
                  value={newFrData.feature || ''}
                  onChange={(e) => setNewFrData({ ...newFrData, feature: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  placeholder="Contoh: Production Data Entry Form"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Deskripsi Detail Kebutuhan</label>
                <textarea
                  rows={3}
                  value={newFrData.description || ''}
                  onChange={(e) => setNewFrData({ ...newFrData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500 resize-none"
                  placeholder="Jelaskan apa yang dapat dilakukan user pada fitur ini..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">User Role</label>
                  <input
                    type="text"
                    value={newFrData.userRole || ''}
                    onChange={(e) => setNewFrData({ ...newFrData, userRole: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                    placeholder="Contoh: Production Staff"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Prioritas</label>
                  <select
                    value={newFrData.priority || 'Must Have'}
                    onChange={(e) => setNewFrData({ ...newFrData, priority: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Must Have">Must Have</option>
                    <option value="Should Have">Should Have</option>
                    <option value="Could Have">Could Have</option>
                    <option value="Optional">Optional</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddFrModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-bold cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleAddFunctionalRequirement}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold cursor-pointer"
              >
                Simpan Requirement
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
