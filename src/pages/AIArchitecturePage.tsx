import React, { useState, useEffect } from 'react';
import { SolutionArchitectInput, SolutionArchitecture, RequirementAnalysis } from '../types';
import { AISolutionArchitectService } from '../services/aiSolutionArchitectService';
import { AIRequirementAnalyzerService } from '../services/aiRequirementService';
import { ArchitectConfigPanel } from '../components/aiArchitect/ArchitectConfigPanel';
import { ArchitectLoadingState } from '../components/aiArchitect/ArchitectLoadingState';
import { ArchitectWorkspace } from '../components/aiArchitect/ArchitectWorkspace';
import { Sparkles, Server, Workflow, CheckCircle2, History, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

interface AIArchitecturePageProps {
  onOpenConsultationForm?: (architecture: SolutionArchitecture) => void;
  onOpenModuleGenerator?: () => void;
}

export const AIArchitecturePage: React.FC<AIArchitecturePageProps> = ({
  onOpenConsultationForm,
  onOpenModuleGenerator
}) => {
  const [savedReq, setSavedReq] = useState<RequirementAnalysis | null>(null);
  const [architectureData, setArchitectureData] = useState<SolutionArchitecture | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [versionList, setVersionList] = useState<any[]>([]);

  // Default Architecture Config
  const [inputData, setInputData] = useState<SolutionArchitectInput>({
    applicationType: 'SaaS',
    scale: 'Medium',
    priority: ['Performance', 'Security', 'Scalability'],
    deploymentPreference: 'Cloud',
    aiArchitecturePreference: 'AI Recommended'
  });

  // Load saved requirement analysis & saved solution architecture on mount
  useEffect(() => {
    // Check saved requirement analysis
    const reqStorage = AIRequirementAnalyzerService.getSavedRequirement();
    if (reqStorage && reqStorage.requirement) {
      setSavedReq(reqStorage.requirement);
      setInputData((prev) => ({
        ...prev,
        requirementAnalysis: reqStorage.requirement,
        projectOverview: reqStorage.requirement.projectOverview,
        modules: reqStorage.requirement.modules,
        functionalRequirements: reqStorage.requirement.functionalRequirements,
        nonFunctionalRequirements: reqStorage.requirement.nonFunctionalRequirements,
        integrations: reqStorage.requirement.integrations,
        userRoles: reqStorage.requirement.userRoles,
        aiRequirements: reqStorage.requirement.aiRequirements
      }));
    }

    // Check saved architecture
    const archStorage = AISolutionArchitectService.getSavedArchitecture();
    if (archStorage && archStorage.architecture) {
      setArchitectureData(archStorage.architecture);
    }

    // Check version history
    const versions = AISolutionArchitectService.getVersions();
    setVersionList(versions);

    // Track page view event
    AISolutionArchitectService.trackEvent('solution_architect_started');
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorMsg(null);

    const result = await AISolutionArchitectService.analyzeArchitecture(inputData);

    setIsGenerating(false);

    if (result.success && result.data) {
      setArchitectureData(result.data);
      setVersionList(AISolutionArchitectService.getVersions());
    } else {
      setErrorMsg(result.error || 'Gagal memproses rekomendasi arsitektur.');
    }
  };

  const handleSelectVersion = (verData: SolutionArchitecture) => {
    setArchitectureData(verData);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#06090e] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Banner Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900 to-[#0c1322] border border-slate-800 rounded-3xl p-8 md:p-12 mb-10 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Workflow className="w-4 h-4" /> AI SOLUTION ARCHITECT & BLUEPRINT GENERATOR
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Merancang Arsitektur Sistem, Cloud, REST API & Database Terstruktur
            </h1>

            <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-6">
              Mengubah Software Requirement Specification (SRS) menjadi blueprint arsitektur teknis lengkap dengan diagram komponen visual, ERD database, spesifikasi REST API, serta strategi cloud infrastructure.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Modular Monolith & Microservices
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-400" /> Relational PostgreSQL ERD
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Interactive Visual Canvas
              </span>
            </div>
          </div>
        </div>

        {/* Saved SRS Status Indicator if present */}
        {savedReq && (
          <div className="mb-6 bg-cyan-950/40 border border-cyan-800/60 rounded-xl p-4 text-xs text-cyan-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>
                Persyaratan terhubung dari SRS: <strong className="text-white">{savedReq.projectOverview?.solutionName}</strong> ({savedReq.functionalRequirements?.length || 0} Functional Requirements)
              </span>
            </div>
            <span className="font-mono text-[10px] bg-cyan-900/80 px-2 py-0.5 rounded text-cyan-300">
              AUTOCONFIGURED
            </span>
          </div>
        )}

        {/* Configuration Panel */}
        <ArchitectConfigPanel
          inputData={inputData}
          onChange={(updated) => setInputData(updated)}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-4 mb-6 bg-rose-950/80 border border-rose-800 text-rose-200 rounded-xl text-xs">
            <strong>Error:</strong> {errorMsg}
          </div>
        )}

        {/* Version History Drawer Bar if available */}
        {versionList.length > 0 && !isGenerating && (
          <div className="mb-6 bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <History className="w-4 h-4 text-cyan-400" />
              <span>Riwayat Versi Arsitektur ({versionList.length} versi tersimpan):</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar">
              {versionList.map((ver) => (
                <button
                  key={ver.version}
                  onClick={() => handleSelectVersion(ver.data)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono border transition ${
                    architectureData?.version === ver.version
                      ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  v{ver.version}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State Animation */}
        {isGenerating && <ArchitectLoadingState />}

        {/* Architecture Workspace Display */}
        {!isGenerating && architectureData && (
          <ArchitectWorkspace
            architecture={architectureData}
            inputData={inputData}
            onReGenerate={handleGenerate}
            onProceedToProposal={() => {
              if (onOpenConsultationForm) {
                onOpenConsultationForm(architectureData);
              }
            }}
            onOpenModuleGenerator={onOpenModuleGenerator}
          />
        )}
      </div>
    </div>
  );
};
