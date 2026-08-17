import React, { useState, useEffect } from 'react';
import { RequirementAnalyzerInput, RequirementAnalysis, ApplicationAnalysis } from '../types';
import { AIRequirementAnalyzerService } from '../services/aiRequirementService';
import { AIApplicationBuilderService } from '../services/aiBuilderService';
import { RequirementBlueprintBanner } from '../components/aiRequirement/RequirementBlueprintBanner';
import { RequirementLoadingState } from '../components/aiRequirement/RequirementLoadingState';
import { RequirementReviewWorkspace } from '../components/aiRequirement/RequirementReviewWorkspace';
import { 
  Sparkles, Cpu, ArrowLeft, RefreshCw, FileText, CheckCircle2, AlertTriangle, 
  Target, Users, Layers, ShieldCheck, Download, Save, Compass
} from 'lucide-react';

interface AIRequirementAnalyzerPageProps {
  onOpenProposalGenerator?: (analysis: RequirementAnalysis) => void;
  onOpenProjectEstimator?: (analysis: RequirementAnalysis) => void;
  onOpenConsultationForm?: (analysis: RequirementAnalysis) => void;
  onOpenSolutionArchitect?: (analysis: RequirementAnalysis) => void;
  onOpenModuleGenerator?: (analysis: RequirementAnalysis) => void;
}

export const AIRequirementAnalyzerPage: React.FC<AIRequirementAnalyzerPageProps> = ({
  onOpenProposalGenerator,
  onOpenProjectEstimator,
  onOpenConsultationForm,
  onOpenSolutionArchitect,
  onOpenModuleGenerator
}) => {
  // State for AI Execution
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<RequirementAnalysis | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  // Storage checks
  const [savedBlueprint, setSavedBlueprint] = useState<ApplicationAnalysis | null>(null);
  const [isUsingBlueprint, setIsUsingBlueprint] = useState<boolean>(true);

  // Input Data initialized with smart defaults
  const [inputData, setInputData] = useState<RequirementAnalyzerInput>({
    businessProfile: {
      name: '',
      industry: 'Mining',
      type: 'Enterprise',
      description: 'Sistem operasional dan manajemen terpadu.',
      location: 'Indonesia'
    },
    businessProblems: 'Proses pencatatan operasional masih manual dan pengolahan laporan membutuhkan waktu berhari-hari.',
    businessGoals: 'Otomatisasi penginputan data, eliminasi kesalahan manual, dan penyediaan dashboard real-time.',
    companyScale: {
      userScale: '11–50',
      branchesCount: '1',
      transactions: 'Medium',
      operationalLocations: 'Single Location'
    },
    platform: ['Web Desktop', 'PWA'],
    selectedFeatures: [
      'Dashboard Eksekutif',
      'User Management & Roles (RBAC)',
      'Production & Operasional Lapangan',
      'Dynamic Reporting & Export Center'
    ],
    applicationBlueprint: null,
    priority: ['Cost Efficiency', 'Speed', 'Scalability'],
    requirementDepth: 'Standard'
  });

  // Load existing blueprint or requirement on mount
  useEffect(() => {
    // Check saved requirement analysis first
    const savedReq = AIRequirementAnalyzerService.getSavedRequirement();
    if (savedReq && savedReq.requirement) {
      setAnalysisResult(savedReq.requirement);
    }

    // Check saved blueprint from AI Application Builder
    const savedBp = AIApplicationBuilderService.getSavedBlueprint();
    if (savedBp && savedBp.blueprint) {
      setSavedBlueprint(savedBp.blueprint);
      const bp = savedBp.blueprint;

      setInputData((prev) => ({
        ...prev,
        businessProfile: {
          name: bp.recommendedSolution?.solutionName ? bp.recommendedSolution.solutionName.split(' ')[0] : 'Perusahaan Klien',
          industry: bp.businessAnalysis?.businessType?.split(' ')[0] || 'Enterprise',
          type: 'Enterprise',
          description: bp.recommendedSolution?.solutionDescription || prev.businessProfile.description,
          location: 'Indonesia'
        },
        businessProblems: bp.businessAnalysis?.primaryChallenges?.join('. ') || prev.businessProblems,
        businessGoals: bp.recommendedSolution?.primaryObjective || prev.businessGoals,
        applicationBlueprint: bp
      }));
    }
  }, []);

  const handleRunRequirementAnalysis = async () => {
    setIsAnalyzing(true);
    setServerError(null);

    const result = await AIRequirementAnalyzerService.analyzeRequirements(inputData);

    if (result.success && result.data) {
      setAnalysisResult(result.data);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      setServerError(result.error || 'Gagal menganalisis requirement. Silakan coba lagi.');
    }

    setIsAnalyzing(false);
  };

  const handleUseBlueprint = () => {
    setIsUsingBlueprint(true);
    if (savedBlueprint) {
      setInputData((prev) => ({
        ...prev,
        applicationBlueprint: savedBlueprint
      }));
    }
  };

  const handleUseManual = () => {
    setIsUsingBlueprint(false);
    setInputData((prev) => ({
      ...prev,
      applicationBlueprint: null
    }));
  };

  return (
    <div className="py-24 md:py-32 bg-[#06090e] bg-tech-grid min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* PAGE HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-lg shadow-cyan-950/50">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>AI BUSINESS ANALYST — SMART-AI.ID</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
            AI Requirement <span className="text-gradient-cyan">Analyzer</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Ubah kebutuhan bisnis menjadi Software Requirement Specification (SRS) yang terstruktur, rapi, dan siap digunakan sebagai dasar perencanaan proyek.
          </p>

          {/* Visual AI System Analysis Bar Indicator */}
          <div className="flex items-center justify-center gap-6 pt-2 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5 text-cyan-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Business Analyst Engine</span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>System Analyst Engine</span>
            </div>
            <div className="flex items-center gap-1.5 text-indigo-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Solution Architect Engine</span>
            </div>
          </div>
        </div>

        {/* LOADING STATE MODE */}
        {isAnalyzing ? (
          <RequirementLoadingState
            businessName={inputData.businessProfile.name}
            industry={inputData.businessProfile.industry}
          />
        ) : analysisResult ? (
          /* REQUIREMENT REVIEW WORKSPACE MODE */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setAnalysisResult(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Ubah Konfigurasi / Input Blueprint</span>
              </button>

              <button
                type="button"
                onClick={handleRunRequirementAnalysis}
                className="px-4 py-2 rounded-xl bg-cyan-950 border border-cyan-500/50 text-cyan-300 hover:text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-Analyze Requirement</span>
              </button>
            </div>

            <RequirementReviewWorkspace
              analysis={analysisResult}
              onUpdateAnalysis={(updated) => setAnalysisResult(updated)}
              onOpenProposalGenerator={onOpenProposalGenerator}
              onOpenProjectEstimator={onOpenProjectEstimator}
              onOpenSolutionArchitect={onOpenSolutionArchitect}
              onOpenModuleGenerator={onOpenModuleGenerator}
            />
          </div>
        ) : (
          /* CONFIGURATION & INPUT SOURCE MODE */
          <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-cyan-500/30 space-y-8 shadow-2xl shadow-cyan-950/30">
            
            {/* Blueprint Banner & Depth Options */}
            <RequirementBlueprintBanner
              blueprint={savedBlueprint}
              inputData={inputData}
              onChangeInputData={(newInput) => setInputData(newInput)}
              onUseBlueprint={handleUseBlueprint}
              onUseManual={handleUseManual}
              isUsingBlueprint={isUsingBlueprint}
            />

            {/* Server Error Message */}
            {serverError && (
              <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs text-left flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Manual Form Inputs if No Blueprint or Manual Mode Selected */}
            {!isUsingBlueprint && (
              <div className="space-y-4 pt-4 border-t border-slate-800 text-xs">
                <h3 className="font-bold text-white text-sm">Input Manual Requirement Bisnis</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Nama Perusahaan / Bisnis</label>
                    <input
                      type="text"
                      value={inputData.businessProfile.name}
                      onChange={(e) => setInputData({
                        ...inputData,
                        businessProfile: { ...inputData.businessProfile, name: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                      placeholder="Contoh: PT Tambang Gemilang"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Sektor Industri</label>
                    <input
                      type="text"
                      value={inputData.businessProfile.industry}
                      onChange={(e) => setInputData({
                        ...inputData,
                        businessProfile: { ...inputData.businessProfile, industry: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                      placeholder="Contoh: Mining / Commerce / Logistics"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Kendala & Masalah Operasional Bisnis</label>
                  <textarea
                    rows={3}
                    value={inputData.businessProblems}
                    onChange={(e) => setInputData({ ...inputData, businessProblems: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500 resize-none"
                    placeholder="Jelaskan masalah operasional yang dihadapi saat ini..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Target Kebutuhan & Ekspektasi Aplikasi</label>
                  <textarea
                    rows={3}
                    value={inputData.businessGoals}
                    onChange={(e) => setInputData({ ...inputData, businessGoals: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500 resize-none"
                    placeholder="Jelaskan ekspektasi hasil dari penggunaan aplikasi..."
                  />
                </div>
              </div>
            )}

            {/* PRIMARY CTA: ANALYZE REQUIREMENTS */}
            <div className="pt-6 border-t border-slate-800 text-center">
              <button
                type="button"
                onClick={handleRunRequirementAnalysis}
                className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 text-white text-sm font-extrabold inline-flex items-center justify-center gap-3 cursor-pointer shadow-xl shadow-cyan-500/20 transition-all glow-primary-cta"
              >
                <Cpu className="w-5 h-5 text-cyan-200 animate-pulse" />
                <span>ANALYZE REQUIREMENTS WITH AI</span>
              </button>
              <p className="text-[11px] text-slate-400 mt-2 font-mono">
                AI Business Analyst & Solution Architect akan merumuskan spesifikasi SRS terstruktur secara instan.
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
