import React, { useState, useEffect } from 'react';
import { useRouter } from '../lib/router';
import {
  Cpu,
  Sparkles,
  Search,
  Filter,
  Grid,
  List as ListIcon,
  Plus,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  Workflow,
  Download,
  Share2,
  SlidersHorizontal,
  ChevronRight,
  Shield,
  Boxes,
  FileText,
  Calculator
} from 'lucide-react';
import {
  ApplicationModule,
  ModuleCategory,
  ModuleConfigurationResult,
  ModuleOptimizationSuggestion,
  RequirementAnalysis,
  SolutionArchitecture
} from '../types';
import { AIModuleGeneratorService } from '../services/aiModuleService';
import { IndustrySelector } from '../components/aiModule/IndustrySelector';
import { ModuleCard } from '../components/aiModule/ModuleCard';
import { ModuleDetailModal } from '../components/aiModule/ModuleDetailModal';
import { AddEditModuleModal } from '../components/aiModule/AddEditModuleModal';
import { AIOptimizerModal } from '../components/aiModule/AIOptimizerModal';
import { AIRecommendModal } from '../components/aiModule/AIRecommendModal';
import { ModuleArchitectureMap } from '../components/aiModule/ModuleArchitectureMap';
import { ModuleLoadingState } from '../components/aiModule/ModuleLoadingState';

interface AIModuleGeneratorPageProps {
  initialRequirementAnalysis?: RequirementAnalysis | null;
  initialSolutionArchitecture?: SolutionArchitecture | null;
  onOpenConsultationForm?: (modulesConfig: ModuleConfigurationResult) => void;
  onContinueToNextStage?: (stage: string) => void;
}

const CATEGORY_TABS = [
  'All',
  'Core',
  'Operations',
  'Management',
  'Finance',
  'HR',
  'Reporting',
  'Integration',
  'AI',
  'Administration'
];

export const AIModuleGeneratorPage: React.FC<AIModuleGeneratorPageProps> = ({
  initialRequirementAnalysis,
  initialSolutionArchitecture,
  onOpenConsultationForm,
  onContinueToNextStage
}) => {
  // Config Inputs
  const [industry, setIndustry] = useState<string>('Mining');
  const [customDescription, setCustomDescription] = useState<string>('');
  const [businessType, setBusinessType] = useState<string>('Mining Contractor');
  const [companyScale, setCompanyScale] = useState<'Small' | 'Medium' | 'Large' | 'Enterprise'>('Medium');
  const [usersCount, setUsersCount] = useState<string>('25 - 100 users');
  const [branchesCount, setBranchesCount] = useState<string>('2 - 5 site');

  // Execution States
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [isRecommending, setIsRecommending] = useState<boolean>(false);

  // Modules Data & Result
  const [modules, setModules] = useState<ApplicationModule[]>([]);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  // View States
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');

  // Modals
  const [selectedModuleForDetail, setSelectedModuleForDetail] = useState<ApplicationModule | null>(null);
  const [editingModule, setEditingModule] = useState<ApplicationModule | null>(null);
  const [isAddEditOpen, setIsAddEditOpen] = useState<boolean>(false);
  const [isOptimizerOpen, setIsOptimizerOpen] = useState<boolean>(false);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);
  const [isRecommendOpen, setIsRecommendOpen] = useState<boolean>(false);
  const [suggestedModules, setSuggestedModules] = useState<ApplicationModule[]>([]);

  const { navigate } = useRouter();

  // Page Title & SEO
  useEffect(() => {
    document.title = 'AI Module Generator | SMART-AI.ID';
  }, []);

  // Check LocalStorage or Initial Props on Mount
  useEffect(() => {
    const saved = AIModuleGeneratorService.getSavedConfiguration();
    if (saved && saved.modules && saved.modules.length > 0) {
      setIndustry(saved.industry || 'Mining');
      setBusinessType(saved.businessType || 'Mining Contractor');
      setCompanyScale((saved.companyScale as any) || 'Medium');
      setModules(saved.modules);
      setIsConfirmed(saved.confirmed || false);
    } else {
      // Auto-trigger initial module generation based on default or requirement analysis context
      handleGenerateModules();
    }
  }, []);

  // Action: Generate Modules with AI
  const handleGenerateModules = async () => {
    setIsGenerating(true);
    try {
      const config = await AIModuleGeneratorService.generateModules({
        industry,
        customIndustryDescription: customDescription,
        businessType,
        companyScale,
        usersCount,
        branchesCount,
        requirementAnalysis: initialRequirementAnalysis,
        solutionArchitecture: initialSolutionArchitecture
      });

      setModules(config.modules);
      setIsConfirmed(false);
    } catch (err) {
      console.error('Failed to generate modules:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Action: Add/Save Module
  const handleSaveModule = (newOrUpdatedModule: ApplicationModule) => {
    let updatedModules = [...modules];
    const existingIndex = updatedModules.findIndex((m) => m.id === newOrUpdatedModule.id);

    if (existingIndex >= 0) {
      updatedModules[existingIndex] = newOrUpdatedModule;
    } else {
      updatedModules.push(newOrUpdatedModule);
    }

    setModules(updatedModules);
    saveUpdatedState(updatedModules);
  };

  // Action: Delete Module
  const handleDeleteModule = (moduleToDelete: ApplicationModule) => {
    // Check if any other module depends on this
    const dependents = modules.filter((m) =>
      m.dependencies?.some((d) => d.dependsOnModuleId === moduleToDelete.id)
    );

    let confirmMsg = `Hapus modul "${moduleToDelete.name}"?`;
    if (dependents.length > 0) {
      confirmMsg += `\n\nPERINGATAN: Modul [${dependents.map((d) => d.name).join(', ')}] memiliki ketergantungan pada modul ini. Menghapus modul ini dapat mempengaruhi alur kerja sistem.`;
    }

    if (window.confirm(confirmMsg)) {
      const filtered = modules.filter((m) => m.id !== moduleToDelete.id);
      setModules(filtered);
      saveUpdatedState(filtered);
    }
  };

  // Action: Move Up / Down
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const copy = [...modules];
    const temp = copy[index - 1];
    copy[index - 1] = copy[index];
    copy[index] = temp;
    // update order field
    copy.forEach((m, idx) => (m.order = idx + 1));
    setModules(copy);
    saveUpdatedState(copy);
  };

  const handleMoveDown = (index: number) => {
    if (index === modules.length - 1) return;
    const copy = [...modules];
    const temp = copy[index + 1];
    copy[index + 1] = copy[index];
    copy[index] = temp;
    copy.forEach((m, idx) => (m.order = idx + 1));
    setModules(copy);
    saveUpdatedState(copy);
  };

  // Action: Open Optimizer
  const handleOpenOptimizer = async () => {
    setIsOptimizerOpen(true);
    setIsOptimizing(true);
    try {
      const opt = await AIModuleGeneratorService.optimizeModules(industry, modules);
      setOptimizationResult(opt);
    } catch (e) {
      console.warn('Optimization request error:', e);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleApplyOptimization = (suggestion: ModuleOptimizationSuggestion) => {
    // Handle suggestion apply
    if (suggestion.type === 'Merge' && suggestion.targetModuleIds && suggestion.targetModuleIds.length >= 2) {
      const idsToMerge = suggestion.targetModuleIds;
      const target1 = modules.find((m) => m.id === idsToMerge[0]);
      if (target1) {
        target1.name = `${target1.name} (Consolidated)`;
        target1.status = 'User Modified';
        const filtered = modules.filter((m) => !idsToMerge.slice(1).includes(m.id));
        setModules(filtered);
        saveUpdatedState(filtered);
      }
    }
  };

  // Action: Ask AI for More Modules
  const handleAskAIForMore = async () => {
    setIsRecommendOpen(true);
    setIsRecommending(true);
    try {
      const recs = await AIModuleGeneratorService.askAIForMoreModules(industry, modules);
      setSuggestedModules(recs);
    } catch (e) {
      console.warn('Recommend error:', e);
    } finally {
      setIsRecommending(false);
    }
  };

  const handleAddSelectedRecommendations = (newMods: ApplicationModule[]) => {
    const merged = [...modules, ...newMods];
    setModules(merged);
    saveUpdatedState(merged);
  };

  // Helper: Persist Changes
  const saveUpdatedState = (updatedModules: ApplicationModule[]) => {
    const summary = AIModuleGeneratorService.calculateSummary(updatedModules);
    const resultConfig: ModuleConfigurationResult = {
      industry,
      businessType,
      companyScale,
      modules: updatedModules,
      summary,
      confirmed: isConfirmed,
      savedAt: new Date().toISOString()
    };
    AIModuleGeneratorService.saveConfiguration(resultConfig);
  };

  // Confirm Configuration
  const handleConfirmConfiguration = () => {
    setIsConfirmed(true);
    const summary = AIModuleGeneratorService.calculateSummary(modules);
    const resultConfig: ModuleConfigurationResult = {
      industry,
      businessType,
      companyScale,
      modules,
      summary,
      confirmed: true,
      savedAt: new Date().toISOString()
    };
    AIModuleGeneratorService.saveConfiguration(resultConfig);

    if (onOpenConsultationForm) {
      onOpenConsultationForm(resultConfig);
    }
  };

  // Filter Modules
  const filteredModules = modules.filter((m) => {
    const matchesCat = selectedCategory === 'All' || m.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.features?.some((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPriority = priorityFilter === 'All' || m.priority === priorityFilter;

    return matchesCat && matchesSearch && matchesPriority;
  });

  const summaryStats = AIModuleGeneratorService.calculateSummary(modules);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* PAGE HEADER */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-300 text-xs font-mono font-bold tracking-wider uppercase shadow-md glow-cyan-subtle">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI APPLICATION CONFIGURATOR</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            AI Module Generator
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Pilih industri Anda dan biarkan AI menyusun struktur modul aplikasi yang sesuai dengan kebutuhan bisnis Anda.
          </p>
        </div>

        {/* INDUSTRY SELECTOR PANEL */}
        <IndustrySelector
          selectedIndustry={industry}
          customDescription={customDescription}
          selectedBusinessType={businessType}
          companyScale={companyScale}
          usersCount={usersCount}
          branchesCount={branchesCount}
          requirementAnalysis={initialRequirementAnalysis}
          solutionArchitecture={initialSolutionArchitecture}
          onIndustryChange={setIndustry}
          onCustomDescriptionChange={setCustomDescription}
          onBusinessTypeChange={setBusinessType}
          onScaleChange={setCompanyScale}
          onUsersCountChange={setUsersCount}
          onBranchesCountChange={setBranchesCount}
          onGenerate={handleGenerateModules}
          isGenerating={isGenerating}
        />

        {/* LOADING ANIMATION STATE */}
        {isGenerating ? (
          <ModuleLoadingState industry={industry} businessType={businessType} />
        ) : (
          <>
            {/* MODULES SUMMARY STATS BAR */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-md">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center flex-1">
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block font-semibold">Total Modul</span>
                    <span className="text-lg font-bold text-white">{summaryStats.totalModules}</span>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-xl border border-rose-900/40">
                    <span className="text-[10px] font-mono text-rose-400 uppercase block font-semibold">Must Have</span>
                    <span className="text-lg font-bold text-rose-300">{summaryStats.mustHaveCount}</span>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-xl border border-blue-900/40">
                    <span className="text-[10px] font-mono text-blue-400 uppercase block font-semibold">Recommended</span>
                    <span className="text-lg font-bold text-blue-300">{summaryStats.recommendedCount}</span>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">Optional</span>
                    <span className="text-lg font-bold text-slate-300">{summaryStats.optionalCount}</span>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-xl border border-cyan-900/40">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase block font-semibold">AI Enabled</span>
                    <span className="text-lg font-bold text-cyan-300">{summaryStats.aiEnabledCount}</span>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-mono text-amber-400 uppercase block font-semibold">User Added</span>
                    <span className="text-lg font-bold text-amber-300">{summaryStats.userAddedCount}</span>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">Modified</span>
                    <span className="text-lg font-bold text-slate-200">{summaryStats.userModifiedCount}</span>
                  </div>
                </div>

                {/* Confirm CTA in Summary */}
                <div className="flex items-center justify-end shrink-0">
                  <button
                    type="button"
                    onClick={handleConfirmConfiguration}
                    className={`px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
                      isConfirmed
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white shadow-emerald-950 glow-primary-cta'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>{isConfirmed ? 'Modul Dikonfirmasi' : 'Confirm Module Configuration'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ACTION TOOLBAR & FILTERS */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
                {CATEGORY_TABS.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`py-2 px-3.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-950 font-bold'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search & View Switcher Toolbar */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Search */}
                <div className="relative flex-1 sm:w-48">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Cari modul..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Priority Filter */}
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-300 focus:outline-none cursor-pointer"
                >
                  <option value="All">Semua Prioritas</option>
                  <option value="Must Have">Must Have</option>
                  <option value="Recommended">Recommended</option>
                  <option value="Optional">Optional</option>
                </select>

                {/* View Switcher Buttons */}
                <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                      viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Grid View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('map')}
                    className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                      viewMode === 'map' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Architecture Map"
                  >
                    <Workflow className="w-4 h-4" />
                  </button>
                </div>

                {/* AI Feature Action Buttons */}
                <button
                  type="button"
                  onClick={handleAskAIForMore}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 border border-blue-500/40 hover:border-blue-400 text-blue-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>Ask AI for More</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenOptimizer}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Optimize Modules</span>
                </button>

                {/* Add Module button */}
                <button
                  type="button"
                  onClick={() => {
                    setEditingModule(null);
                    setIsAddEditOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-blue-950"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tambah Modul</span>
                </button>
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            {viewMode === 'map' ? (
              <ModuleArchitectureMap
                modules={filteredModules}
                onSelectModule={(mod) => setSelectedModuleForDetail(mod)}
              />
            ) : filteredModules.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredModules.map((mod, index) => (
                  <ModuleCard
                    key={mod.id}
                    module={mod}
                    index={index}
                    totalModules={filteredModules.length}
                    onViewDetails={(m) => setSelectedModuleForDetail(m)}
                    onEdit={(m) => {
                      setEditingModule(m);
                      setIsAddEditOpen(true);
                    }}
                    onDelete={(m) => handleDeleteModule(m)}
                    onMoveUp={handleMoveUp}
                    onMoveDown={handleMoveDown}
                  />
                ))}
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center space-y-4 my-6">
                <Boxes className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">Belum Ada Modul Aplikasi</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Belum ada modul yang sesuai dengan pencarian atau filter pilihan Anda. Silakan generate ulang dengan AI atau tambah secara manual.
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleGenerateModules}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer"
                  >
                    Generate Modules with AI
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingModule(null);
                      setIsAddEditOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white text-xs font-bold cursor-pointer"
                  >
                    + Tambah Modul Manual
                  </button>
                </div>
              </div>
            )}

            {/* CONFIRMATION & NEXT STAGES CTA BANNER */}
            {isConfirmed && (
              <div className="mt-8 bg-gradient-to-r from-emerald-950/90 via-slate-900 to-blue-950/90 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold mb-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>KONFIGURASI MODUL DISERTAKAN</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Struktur Modul Produk Anda Telah Siap Ditransformasikan!
                  </h3>
                  <p className="text-xs text-slate-300 max-w-2xl">
                    Konfigurasi {modules.length} modul untuk industri {industry} telah disimpan. Anda dapat melanjutkannya ke perancangan skema Database ERD, spesifikasi REST API, atau estimasi pengerjaan proyek.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => navigate('/ai-project-estimator')}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Estimate Project</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onContinueToNextStage && onContinueToNextStage('database')}
                    className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>Lanjut ke Database Design</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenConsultationForm) {
                        onOpenConsultationForm({
                          industry,
                          businessType,
                          companyScale,
                          modules,
                          summary: summaryStats,
                          confirmed: true,
                          savedAt: new Date().toISOString()
                        });
                      }
                    }}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>Ajukan Konsultasi Proyek</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* MODALS */}
      {/* 1. Module Detail Modal */}
      <ModuleDetailModal
        module={selectedModuleForDetail}
        onClose={() => setSelectedModuleForDetail(null)}
        onEdit={(mod) => {
          setSelectedModuleForDetail(null);
          setEditingModule(mod);
          setIsAddEditOpen(true);
        }}
      />

      {/* 2. Add / Edit Module Modal */}
      <AddEditModuleModal
        isOpen={isAddEditOpen}
        editingModule={editingModule}
        onClose={() => setIsAddEditOpen(false)}
        onSave={handleSaveModule}
      />

      {/* 3. AI Optimizer Modal */}
      <AIOptimizerModal
        isOpen={isOptimizerOpen}
        industry={industry}
        optimizationResult={optimizationResult}
        isLoading={isOptimizing}
        onClose={() => setIsOptimizerOpen(false)}
        onApplyOptimization={handleApplyOptimization}
      />

      {/* 4. AI Recommend Modal */}
      <AIRecommendModal
        isOpen={isRecommendOpen}
        suggestedModules={suggestedModules}
        isLoading={isRecommending}
        onClose={() => setIsRecommendOpen(false)}
        onAddSelected={handleAddSelectedRecommendations}
      />
    </div>
  );
};
