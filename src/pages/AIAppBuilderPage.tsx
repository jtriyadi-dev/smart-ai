import React, { useState, useEffect } from 'react';
import { AIBuilderInput, ApplicationAnalysis, AIScopeBlueprint } from '../types';
import { AIApplicationBuilderService } from '../services/aiBuilderService';
import { StepBusiness } from '../components/aiBuilder/StepBusiness';
import { StepProblem } from '../components/aiBuilder/StepProblem';
import { StepRequirements } from '../components/aiBuilder/StepRequirements';
import { StepScale } from '../components/aiBuilder/StepScale';
import { StepPlatform } from '../components/aiBuilder/StepPlatform';
import { StepFeatures } from '../components/aiBuilder/StepFeatures';
import { StepReview } from '../components/aiBuilder/StepReview';
import { AILoadingState } from '../components/aiBuilder/AILoadingState';
import { AIBuilderResultView } from '../components/aiBuilder/AIBuilderResultView';
import { 
  Sparkles, Cpu, ArrowLeft, ArrowRight, CheckCircle2, Building2, 
  AlertTriangle, Target, Users, Monitor, Layers, FileCheck, Save
} from 'lucide-react';

interface AIAppBuilderPageProps {
  onOpenConsultationWithBlueprint?: (blueprint: AIScopeBlueprint) => void;
  onOpenConsultationWithAnalysis?: (analysis: ApplicationAnalysis) => void;
  onOpenRequirementAnalyzer?: (analysis: ApplicationAnalysis) => void;
}

export const AIAppBuilderPage: React.FC<AIAppBuilderPageProps> = ({
  onOpenConsultationWithBlueprint,
  onOpenConsultationWithAnalysis,
  onOpenRequirementAnalyzer
}) => {
  // Wizard active step index (0 to 6)
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  // State for AI execution & results
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<ApplicationAnalysis | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Saved blueprint in storage check
  const [savedBlueprint, setSavedBlueprint] = useState<{ savedAt: string; blueprint: ApplicationAnalysis } | null>(null);

  useEffect(() => {
    const saved = AIApplicationBuilderService.getSavedBlueprint();
    if (saved) {
      setSavedBlueprint(saved);
    }
  }, []);

  // Form State initialized with defaults
  const [formData, setFormData] = useState<AIBuilderInput>({
    businessName: '',
    businessIndustry: 'Mining',
    businessDescription: '',
    businessLocation: '',
    businessType: 'Enterprise',
    businessProblems: '',
    quickProblemSelections: ['Excel Management', 'Slow Reporting'],
    requirementsGoalsText: '',
    goalsSelections: ['Automation', 'Centralized Data', 'Real-time Monitoring'],
    userScale: '11–50',
    branchesCount: '1',
    estimatedTransactions: 'Medium',
    operationalLocations: 'Single Location',
    platforms: ['Web Desktop', 'PWA'],
    selectedFeatures: [
      'Dashboard Eksekutif',
      'User Management & Roles (RBAC)',
      'Production & Operasional Lapangan',
      'Dynamic Reporting & Export Center'
    ],
    customFeatures: ''
  });

  const stepMeta = [
    { title: 'Profil Bisnis', icon: Building2 },
    { title: 'Masalah', icon: AlertTriangle },
    { title: 'Kebutuhan', icon: Target },
    { title: 'Skala', icon: Users },
    { title: 'Platform', icon: Monitor },
    { title: 'Fitur', icon: Layers },
    { title: 'Tinjau & AI', icon: FileCheck }
  ];

  const handleFieldChange = (field: keyof AIBuilderInput, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  // Validation before advancing
  const validateStep = (stepIdx: number): boolean => {
    const errors: Record<string, string> = {};

    if (stepIdx === 0) {
      if (!formData.businessIndustry) {
        errors.businessIndustry = 'Pilih sektor industri perusahaan Anda.';
      }
      if (!formData.businessDescription || formData.businessDescription.trim().length < 10) {
        errors.businessDescription = 'Jelaskan aktivitas bisnis Anda secara singkat (minimal 10 karakter).';
      }
    } else if (stepIdx === 1) {
      if (!formData.businessProblems || formData.businessProblems.trim().length < 5) {
        errors.businessProblems = 'Jelaskan kendala atau masalah bisnis yang dihadapi saat ini.';
      }
    } else if (stepIdx === 2) {
      if (!formData.requirementsGoalsText || formData.requirementsGoalsText.trim().length < 5) {
        errors.requirementsGoalsText = 'Jelaskan ekspektasi atau target aplikasi yang diinginkan.';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < stepMeta.length - 1) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleRunAIAnalysis = async () => {
    // Final check across all mandatory steps
    if (!validateStep(0) || !validateStep(1) || !validateStep(2)) {
      alert('Mohon lengkapi data profil bisnis, masalah, dan kebutuhan aplikasi terlebih dahulu.');
      return;
    }

    setIsAnalyzing(true);
    setServerError(null);

    const result = await AIApplicationBuilderService.analyzeApplication(formData);

    if (result.success && result.data) {
      setAnalysisResult(result.data);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      setServerError(result.error || 'Gagal menghasilkan analisis AI. Silakan coba lagi.');
    }

    setIsAnalyzing(false);
  };

  const handleRestoreSavedBlueprint = () => {
    if (savedBlueprint) {
      setAnalysisResult(savedBlueprint.blueprint);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleOpenConsultation = (analysis: ApplicationAnalysis) => {
    if (onOpenConsultationWithAnalysis) {
      onOpenConsultationWithAnalysis(analysis);
    } else if (onOpenConsultationWithBlueprint) {
      // Map to legacy blueprint interface
      onOpenConsultationWithBlueprint({
        summary: analysis.summary || analysis.recommendedSolution?.solutionDescription,
        recommendedStack: {
          frontend: 'React + PWA',
          backend: 'Node.js Express API',
          database: 'PostgreSQL Relational DB',
          aiEngine: 'Google Gemini 2.5 Flash',
          cloud: 'Google Cloud Infrastructure'
        },
        coreModules: analysis.recommendedModules.map((m) => m.name),
        aiCapabilities: analysis.aiFeatures.map((a) => a.feature),
        estimatedTimeWeeks: '4-6 Minggu',
        recommendedPhases: [],
        budgetTier: 'Custom Enterprise Solution'
      });
    } else {
      // Fallback: direct WhatsApp
      const text = encodeURIComponent(
        `Halo Tim SMART-AI.ID, saya telah menggunakan AI Application Builder untuk perusahaan ${inputDataName(formData)}. Saya ingin berkonsultasi mengenai rekomendasi aplikasi: ${analysis.recommendedSolution?.solutionName}`
      );
      window.open(`https://wa.me/6285187869164?text=${text}`, '_blank');
    }
  };

  const inputDataName = (data: AIBuilderInput) => data.businessName || 'Perusahaan Klien';

  return (
    <div className="py-24 md:py-32 bg-[#06090e] bg-tech-grid min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-lg shadow-cyan-950/50">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>AI APPLICATION BUILDER — SMART-AI.ID</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
            Buat Aplikasi dengan <span className="text-gradient-cyan">Kecerdasan AI</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Jelaskan kebutuhan bisnis Anda dengan bahasa sederhana. AI CTO SMART-AI.ID akan merumuskan spesifikasi modul, struktur user role, alur kerja, dan arsitektur aplikasi dalam hitungan detik.
          </p>

          {/* Saved Blueprint Banner Alert */}
          {savedBlueprint && !analysisResult && !isAnalyzing && (
            <div className="pt-2">
              <button
                onClick={handleRestoreSavedBlueprint}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-mono font-bold cursor-pointer transition-all hover:border-cyan-400"
              >
                <Save className="w-3.5 h-3.5 text-cyan-400" />
                <span>Lihat Hasil Blueprint Tersimpan ({savedBlueprint.blueprint.recommendedSolution?.solutionName || 'Aplikasi'})</span>
              </button>
            </div>
          )}
        </div>

        {/* ANALYSIS RESULT DISPLAY MODE */}
        {analysisResult ? (
          <AIBuilderResultView
            analysis={analysisResult}
            inputData={formData}
            onEditInput={() => {
              setAnalysisResult(null);
              setCurrentStep(0);
            }}
            onReAnalyze={handleRunAIAnalysis}
            onOpenConsultation={handleOpenConsultation}
            onOpenRequirementAnalyzer={onOpenRequirementAnalyzer}
          />
        ) : isAnalyzing ? (
          /* LOADING STATE MODE */
          <AILoadingState
            businessName={formData.businessName}
            industry={formData.businessIndustry}
          />
        ) : (
          /* MULTI-STEP WIZARD FORM MODE */
          <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-cyan-500/30 space-y-8 shadow-2xl shadow-cyan-950/30">
            
            {/* Step Progress Bar Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  <span>Langkah {currentStep + 1} dari {stepMeta.length}</span>
                </span>
                <span className="text-slate-400">
                  {stepMeta[currentStep].title}
                </span>
              </div>

              {/* Progress Bar Track */}
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / stepMeta.length) * 100}%` }}
                ></div>
              </div>

              {/* Step Chips Bar */}
              <div className="grid grid-cols-7 gap-1 pt-1">
                {stepMeta.map((step, idx) => {
                  const IconComp = step.icon;
                  const isDone = idx < currentStep;
                  const isCurrent = idx === currentStep;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (idx < currentStep || validateStep(currentStep)) {
                          setCurrentStep(idx);
                        }
                      }}
                      className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        isCurrent
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold shadow-md'
                          : isDone
                          ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          : 'bg-slate-950/60 border-slate-900 text-slate-600'
                      }`}
                      title={step.title}
                    >
                      <IconComp className={`w-3.5 h-3.5 ${isCurrent ? 'text-cyan-400' : isDone ? 'text-slate-300' : 'text-slate-600'}`} />
                      <span className="text-[10px] hidden sm:block truncate w-full">{step.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Server Error Message */}
            {serverError && (
              <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs text-left">
                {serverError}
              </div>
            )}

            {/* STEP CONTENT BODY */}
            <div className="min-h-[300px]">
              {currentStep === 0 && (
                <StepBusiness
                  formData={formData}
                  onChange={handleFieldChange}
                  errors={formErrors}
                />
              )}
              {currentStep === 1 && (
                <StepProblem
                  formData={formData}
                  onChange={handleFieldChange}
                  errors={formErrors}
                />
              )}
              {currentStep === 2 && (
                <StepRequirements
                  formData={formData}
                  onChange={handleFieldChange}
                  errors={formErrors}
                />
              )}
              {currentStep === 3 && (
                <StepScale
                  formData={formData}
                  onChange={handleFieldChange}
                />
              )}
              {currentStep === 4 && (
                <StepPlatform
                  formData={formData}
                  onChange={handleFieldChange}
                />
              )}
              {currentStep === 5 && (
                <StepFeatures
                  formData={formData}
                  onChange={handleFieldChange}
                />
              )}
              {currentStep === 6 && (
                <StepReview
                  formData={formData}
                  onEditStep={(idx) => setCurrentStep(idx)}
                  onSubmit={handleRunAIAnalysis}
                />
              )}
            </div>

            {/* WIZARD NAVIGATION FOOTER BUTTONS */}
            {currentStep < 6 && (
              <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 text-white text-xs font-extrabold flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20 transition-all glow-primary-cta"
                >
                  <span>Langkah Berikutnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
