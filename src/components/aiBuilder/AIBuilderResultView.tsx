import React, { useState } from 'react';
import { ApplicationAnalysis, ApplicationModule, AIBuilderInput } from '../../types';
import { AIApplicationBuilderService } from '../../services/aiBuilderService';
import { 
  Sparkles, Bot, ShieldCheck, Download, Save, RefreshCw, Edit3, MessageSquare, 
  ArrowRight, Layers, CheckCircle2, Users, Cpu, FileText, ChevronRight, 
  Plus, Trash2, HelpCircle, Terminal, Award, Network, Globe2
} from 'lucide-react';

interface AIBuilderResultViewProps {
  analysis: ApplicationAnalysis;
  inputData: AIBuilderInput;
  onEditInput: () => void;
  onReAnalyze: () => void;
  onOpenConsultation: (analysis: ApplicationAnalysis) => void;
  onOpenRequirementAnalyzer?: (analysis: ApplicationAnalysis) => void;
}

export const AIBuilderResultView: React.FC<AIBuilderResultViewProps> = ({
  analysis,
  inputData,
  onEditInput,
  onReAnalyze,
  onOpenConsultation,
  onOpenRequirementAnalyzer
}) => {
  const [currentAnalysis, setCurrentAnalysis] = useState<ApplicationAnalysis>(analysis);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  
  // New module state
  const [newModuleName, setNewModuleName] = useState('');
  const [newModuleDesc, setNewModuleDesc] = useState('');
  const [newModulePriority, setNewModulePriority] = useState<'Essential' | 'Recommended' | 'Optional'>('Recommended');
  const [showAddModuleForm, setShowAddModuleForm] = useState(false);

  const handleSaveToStorage = () => {
    const success = AIApplicationBuilderService.saveBlueprintToStorage(currentAnalysis, inputData);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleExportJSON = () => {
    AIApplicationBuilderService.exportAsJSON(
      currentAnalysis,
      `smart-ai-blueprint-${(inputData.businessName || 'enterprise').toLowerCase().replace(/\s+/g, '-')}.json`
    );
  };

  const handleExportPDF = () => {
    AIApplicationBuilderService.exportAsPrintablePDF();
  };

  // Module Editor logic
  const handleAddModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleName.trim()) return;

    const newMod: ApplicationModule = {
      id: `mod-custom-${Date.now()}`,
      name: newModuleName,
      description: newModuleDesc || 'Modul kustom kueri bisnis',
      priority: newModulePriority,
      purpose: 'Modul kustom tambahan sesuai kebutuhan perusahaan'
    };

    setCurrentAnalysis((prev) => ({
      ...prev,
      recommendedModules: [...prev.recommendedModules, newMod]
    }));

    setNewModuleName('');
    setNewModuleDesc('');
    setShowAddModuleForm(false);
  };

  const handleDeleteModule = (id: string) => {
    setCurrentAnalysis((prev) => ({
      ...prev,
      recommendedModules: prev.recommendedModules.filter((m) => m.id !== id)
    }));
  };

  const scoreObj = currentAnalysis.digitalReadinessScore || {
    score: 85,
    label: 'AI-generated preliminary assessment',
    explanation: 'Skor kesiapan digital operasional tinggi.',
    contributingFactors: ['Proses bisnis terstruktur', 'Skala pengguna sesuai', 'Kebutuhan AI jelas']
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300 text-left">
      
      {/* Top Banner & Quick Actions Toolbar */}
      <div className="glass-card rounded-2xl p-6 border border-cyan-500/40 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold mb-2">
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI APPLICATION BLUEPRINT COMPLETED</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
              {currentAnalysis.recommendedSolution?.solutionName || 'AI Enterprise Application Blueprint'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Dirumuskan khusus untuk: <span className="text-cyan-300 font-semibold">{inputData.businessName || 'Perusahaan Klien'}</span> ({inputData.businessIndustry})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={onEditInput}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-xs text-slate-300 hover:text-white font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-400" />
              <span>Edit Kebutuhan</span>
            </button>

            <button
              onClick={onReAnalyze}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-xs text-slate-300 hover:text-white font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Analisis Ulang</span>
            </button>

            <button
              onClick={handleSaveToStorage}
              className={`px-3.5 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-all ${
                saveSuccess
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                  : 'bg-slate-900 border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white'
              }`}
            >
              <Save className="w-3.5 h-3.5 text-emerald-400" />
              <span>{saveSuccess ? 'Tersimpan!' : 'Simpan Hasil'}</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2 rounded-xl bg-cyan-950 border border-cyan-700/80 hover:bg-cyan-900 text-xs text-cyan-300 font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download Blueprint</span>
            </button>
          </div>
        </div>

        {/* Executive Summary & Score Overview */}
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-3">
            <h3 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Executive Summary & Business Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
              {currentAnalysis.recommendedSolution?.solutionDescription}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Tujuan Utama</span>
                <span className="text-slate-200 font-medium line-clamp-1">{currentAnalysis.recommendedSolution?.primaryObjective}</span>
              </div>
              <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Arsitektur Rekomendasi</span>
                <span className="text-cyan-300 font-bold line-clamp-1">{currentAnalysis.recommendedSolution?.recommendedArchitectureType}</span>
              </div>
              <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-500 uppercase block">Jumlah Modul</span>
                <span className="text-emerald-400 font-bold">{currentAnalysis.recommendedModules?.length || 0} Modul Inti</span>
              </div>
            </div>
          </div>

          {/* Digital Transformation Readiness Score Badge */}
          <div className="lg:col-span-4 glass-card p-5 rounded-xl border border-cyan-500/30 flex flex-col justify-between bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase">
                  Digital Readiness Score
                </span>
                <span className="text-[9px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                  {scoreObj.label}
                </span>
              </div>

              <div className="flex items-baseline gap-2 my-2">
                <span className="text-4xl sm:text-5xl font-extrabold font-display text-gradient-cyan">
                  {scoreObj.score}
                </span>
                <span className="text-sm font-mono text-slate-400">/ 100</span>
              </div>

              <p className="text-[11px] text-slate-300 leading-snug">
                {scoreObj.explanation}
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Faktor Pendukung:</span>
              {(scoreObj.contributingFactors || []).map((factor, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[10.5px] text-slate-300">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="truncate">{factor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: Business Analysis & Problem Analysis */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Business Analysis */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold font-display text-white">Analisis Profil & Karakteristik Bisnis</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <p className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300">
              {currentAnalysis.businessAnalysis?.operationalCharacteristics}
            </p>

            <div>
              <span className="font-mono text-cyan-400 font-bold uppercase text-[11px] block mb-1.5">
                Proses Kunci Operasional:
              </span>
              <div className="space-y-1">
                {(currentAnalysis.businessAnalysis?.keyProcesses || []).map((kp, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></span>
                    <span>{kp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-cyan-400 font-bold uppercase text-[11px] block mb-1.5">
                Peluang Digitalisasi:
              </span>
              <div className="space-y-1">
                {(currentAnalysis.businessAnalysis?.digitalizationOpportunities || []).map((opp, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{opp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Problem Analysis */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Cpu className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold font-display text-white">Analisis Masalah & Solusi Digital</h3>
          </div>

          <div className="space-y-3 text-xs">
            {(currentAnalysis.problemAnalysis || []).map((prob, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded">
                    {prob.category}
                  </span>
                </div>
                <p className="text-white font-semibold">{prob.problem}</p>
                <p className="text-slate-400 text-[11px]">Dampak: <span className="text-red-300">{prob.impact}</span></p>
                <p className="text-cyan-300 text-[11px] font-medium pt-1 border-t border-slate-800/80 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>Solusi: {prob.digitalOpportunity}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: Recommended Application Modules with Interactive Module Editor */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-cyan-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold font-display text-white">
                Rekomendasi Modul Aplikasi Inti ({currentAnalysis.recommendedModules?.length || 0})
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Daftar modul yang disarankan oleh AI. Anda dapat menambah, mengubah, atau menghapus modul sesuai kebutuhan.
            </p>
          </div>

          <button
            onClick={() => setShowAddModuleForm(!showAddModuleForm)}
            className="px-4 py-2 bg-cyan-950 border border-cyan-500/50 hover:bg-cyan-900 text-cyan-300 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Modul Baru</span>
          </button>
        </div>

        {/* Add Module Form */}
        {showAddModuleForm && (
          <form onSubmit={handleAddModule} className="p-4 rounded-xl bg-slate-900 border border-cyan-500/40 space-y-3 animate-in fade-in">
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase">Tambah Modul Kustom</h4>
            <div className="grid sm:grid-cols-3 gap-3">
              <input
                type="text"
                required
                placeholder="Nama Modul (contoh: Modul Integrasi RFID)"
                value={newModuleName}
                onChange={(e) => setNewModuleName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <input
                type="text"
                placeholder="Fungsi & Tujuan Modul"
                value={newModuleDesc}
                onChange={(e) => setNewModuleDesc(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <select
                value={newModulePriority}
                onChange={(e) => setNewModulePriority(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Essential">Essential (Wajib)</option>
                <option value="Recommended">Recommended (Sangat Disarankan)</option>
                <option value="Optional">Optional (Tambahan Opsional)</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddModuleForm(false)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg text-xs cursor-pointer"
              >
                Simpan Modul
              </button>
            </div>
          </form>
        )}

        {/* Modules Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(currentAnalysis.recommendedModules || []).map((mod, index) => {
            const isEssential = mod.priority === 'Essential';
            return (
              <div
                key={mod.id || index}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-3 relative group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase border ${
                      isEssential 
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-700' 
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {mod.priority}
                    </span>

                    <button
                      onClick={() => handleDeleteModule(mod.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 transition-opacity cursor-pointer"
                      title="Hapus modul ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="text-sm font-bold font-display text-white">{mod.name}</h4>
                  <p className="text-xs text-slate-400">{mod.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-cyan-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{mod.purpose}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: Visual Application Architecture Diagram */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Network className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold font-display text-white">Visual Blueprint Diagram Aplikasi</h2>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
            Interactive Architecture Flow
          </span>
        </div>

        {/* Blueprint Flow Node Diagram */}
        <div className="p-6 bg-[#04070d] rounded-2xl border border-slate-800 overflow-x-auto space-y-6">
          <div className="flex items-center justify-between min-w-[700px] gap-2">
            
            {/* Node 1: Users */}
            <div className="flex-1 p-3 bg-slate-900 border border-cyan-500/40 rounded-xl text-center space-y-1">
              <Users className="w-5 h-5 text-cyan-400 mx-auto" />
              <span className="text-xs font-bold text-white block">1. USER ROLES</span>
              <span className="text-[10px] text-slate-400 block">Admin, Management, Staff</span>
            </div>

            <ChevronRight className="w-5 h-5 text-cyan-500 shrink-0" />

            {/* Node 2: Web & PWA App */}
            <div className="flex-1 p-3 bg-slate-900 border border-cyan-500/40 rounded-xl text-center space-y-1">
              <Globe2 className="w-5 h-5 text-cyan-400 mx-auto" />
              <span className="text-xs font-bold text-white block">2. FRONTEND APP</span>
              <span className="text-[10px] text-slate-400 block">React + PWA Mobile</span>
            </div>

            <ChevronRight className="w-5 h-5 text-cyan-500 shrink-0" />

            {/* Node 3: Core API & Modules */}
            <div className="flex-1 p-3 bg-blue-950 border border-blue-500/50 rounded-xl text-center space-y-1">
              <Layers className="w-5 h-5 text-blue-400 mx-auto" />
              <span className="text-xs font-bold text-white block">3. CORE MODULES</span>
              <span className="text-[10px] text-blue-300 block">{currentAnalysis.recommendedModules?.length} Modul Inti</span>
            </div>

            <ChevronRight className="w-5 h-5 text-cyan-500 shrink-0" />

            {/* Node 4: AI & Database Engine */}
            <div className="flex-1 p-3 bg-purple-950 border border-purple-500/50 rounded-xl text-center space-y-1">
              <Bot className="w-5 h-5 text-purple-400 mx-auto" />
              <span className="text-xs font-bold text-white block">4. AI & DB ENGINE</span>
              <span className="text-[10px] text-purple-300 block">Gemini 2.5 + PostgreSQL</span>
            </div>

            <ChevronRight className="w-5 h-5 text-cyan-500 shrink-0" />

            {/* Node 5: Dashboard Output */}
            <div className="flex-1 p-3 bg-emerald-950 border border-emerald-500/50 rounded-xl text-center space-y-1">
              <Award className="w-5 h-5 text-emerald-400 mx-auto" />
              <span className="text-xs font-bold text-white block">5. REALTIME DASHBOARD</span>
              <span className="text-[10px] text-emerald-300 block">Executive Insights</span>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 4: User Roles & Business Workflows */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* User Roles */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Users className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold font-display text-white">Struktur Peran Pengguna (User Roles)</h3>
          </div>

          <div className="space-y-3 text-xs">
            {(currentAnalysis.userRoles || []).map((role, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-xs">{role.roleName}</h4>
                  <span className="text-[9.5px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    {role.accessLevel}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px]">{role.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Business Workflows */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold font-display text-white">Alur Kerja Sistem (Business Workflows)</h3>
          </div>

          <div className="space-y-3 text-xs">
            {(currentAnalysis.workflows || []).map((wf, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-500/50 flex items-center justify-center font-mono font-bold text-cyan-300 text-xs shrink-0">
                  {wf.stepNumber || idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">{wf.title}</h4>
                  <p className="text-slate-400 text-[11px] mt-0.5">{wf.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 5: AI Features & Integrations */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-purple-500/30 space-y-6 bg-gradient-to-br from-purple-950/20 via-slate-900 to-slate-950">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Bot className="w-6 h-6 text-purple-400" />
          <div>
            <h2 className="text-xl font-bold font-display text-white">Kapabilitas Kecerdasan AI & Integrasi</h2>
            <p className="text-xs text-slate-400">Teknologi kecerdasan buatan Google Gemini yang diintegrasikan ke dalam aplikasi Anda.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {(currentAnalysis.aiFeatures || []).map((aiFeat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 space-y-2 text-xs">
              <span className="text-[9px] font-mono font-bold bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800 block w-fit">
                AI FEATURE
              </span>
              <h4 className="font-bold text-white text-xs">{aiFeat.feature}</h4>
              <p className="text-slate-300 text-[11px]">{aiFeat.purpose}</p>
              <div className="pt-2 border-t border-slate-800 text-[10.5px] text-emerald-400 font-medium">
                Manfaat: {aiFeat.expectedBenefit}
              </div>
            </div>
          ))}
        </div>

        {/* Integrations */}
        <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
          <span className="font-mono text-cyan-400 font-bold uppercase block text-[11px]">
            Integrasi Layanan & API Ekosistem:
          </span>
          <div className="flex flex-wrap gap-2">
            {(currentAnalysis.integrations || []).map((integ, idx) => (
              <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-medium text-[11px]">
                {integ}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 6: Development Phases */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Terminal className="w-6 h-6 text-cyan-400" />
          <h2 className="text-xl font-bold font-display text-white">Tahapan Pelaksanaan Project (Development Phases)</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {(currentAnalysis.developmentPhases || []).map((phase, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono font-bold text-cyan-400 block uppercase">
                {phase.phase}
              </span>
              <h4 className="font-bold text-white text-xs">{phase.title}</h4>
              <p className="text-slate-400 text-[11px]">{phase.description}</p>
              <div className="pt-2 border-t border-slate-800 space-y-1">
                {(phase.keyModules || []).map((km, i) => (
                  <span key={i} className="inline-block px-2 py-0.5 bg-slate-950 text-slate-300 rounded text-[10px] mr-1">
                    {km}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM LEAD CAPTURE CTA SECTION */}
      <div className="glass-card rounded-3xl p-8 sm:p-10 border border-cyan-500/50 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 text-center space-y-6 relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-900/80 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>READY TO BUILD YOUR CUSTOM APP?</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
            Sudah Mendapat Gambaran Aplikasinya?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Tim konsultan dan AI Solution Architect SMART-AI.ID siap mendiskusikan cetak biru ini, melakukan penyelarasan teknis, dan menyiapkan proposal resmi untuk perusahaan Anda.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {onOpenRequirementAnalyzer && (
            <button
              onClick={() => onOpenRequirementAnalyzer(currentAnalysis)}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-950/50 transition-all glow-primary-cta"
            >
              <Cpu className="w-4 h-4 text-cyan-200" />
              <span>Analisis Requirement dengan AI (SRS)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => onOpenConsultation(currentAnalysis)}
            className="btn-primary w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-cyan-200" />
            <span>Konsultasikan Blueprint Ini Sekarang</span>
          </button>

          <button
            onClick={handleExportPDF}
            className="w-full sm:w-auto px-6 py-4 bg-slate-900 border border-slate-700 hover:border-slate-600 rounded-xl text-xs sm:text-sm font-bold text-slate-200 hover:text-white flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Cetak Dokumen Printable</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-400 italic pt-2">
          {currentAnalysis.disclaimer || 'Hasil rekomendasi AI ini bersifat sebagai panduan awal arsitektur teknis.'}
        </p>
      </div>

    </div>
  );
};
