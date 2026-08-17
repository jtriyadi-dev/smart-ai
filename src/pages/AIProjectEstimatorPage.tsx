import React, { useState, useEffect } from 'react';
import { useRouter } from '../lib/router';
import {
  ProjectEstimationInput,
  ProjectEstimate,
  EstimationPricingConfig,
  EstimationHistoryVersion,
  RequirementAnalysis,
  SolutionArchitecture,
  ApplicationModule
} from '../types';
import { AIProjectEstimatorService } from '../services/aiProjectEstimatorService';

// Estimator Components
import { EstimatorHeader } from '../components/aiEstimator/EstimatorHeader';
import { ProjectConfigSummaryCard } from '../components/aiEstimator/ProjectConfigSummaryCard';
import { EstimationResultCard } from '../components/aiEstimator/EstimationResultCard';
import { ComplexityGauge } from '../components/aiEstimator/ComplexityGauge';
import { CostBreakdownChart } from '../components/aiEstimator/CostBreakdownChart';
import { TimelinePhaseChart } from '../components/aiEstimator/TimelinePhaseChart';
import { ScenarioComparisonTable } from '../components/aiEstimator/ScenarioComparisonTable';
import { MVPEstimationCard } from '../components/aiEstimator/MVPEstimationCard';
import { TeamRecommendationCard } from '../components/aiEstimator/TeamRecommendationCard';
import { FactorAnalysisCard } from '../components/aiEstimator/FactorAnalysisCard';
import { AssumptionsRisksCard } from '../components/aiEstimator/AssumptionsRisksCard';
import { TraceabilityMatrix } from '../components/aiEstimator/TraceabilityMatrix';
import { EstimateHistoryModal } from '../components/aiEstimator/EstimateHistoryModal';
import { PricingConfigModal } from '../components/aiEstimator/PricingConfigModal';
import { GenerateProposalModal } from '../components/proposal/GenerateProposalModal';

import { Save, Download, FileText, ArrowRight, Check, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';

interface AIProjectEstimatorPageProps {
  onOpenProposalGenerator?: (estimate: ProjectEstimate) => void;
}

export const AIProjectEstimatorPage: React.FC<AIProjectEstimatorPageProps> = ({
  onOpenProposalGenerator
}) => {
  const { navigate } = useRouter();

  // State
  const [input, setInput] = useState<ProjectEstimationInput>({
    industry: 'Enterprise Software',
    businessType: 'B2B / Custom Operations',
    platform: 'Web + Mobile',
    projectScale: 'Medium',
    projectPriority: 'Balanced',
    modulesCount: 8,
    featuresCount: 38,
    usersCount: 250,
    branchesCount: 3,
    userRolesCount: 4,
    aiLevel: 'Intermediate',
    apiIntegrationsCount: 3,
    realtimeLevel: 'Basic',
    databaseComplexity: 'Medium',
    authentication: 'JWT + OAuth2 RBAC',
    securityLevel: 'Enhanced',
    cloudDeployment: 'Docker / Cloud Run GCP'
  });

  const [estimate, setEstimate] = useState<ProjectEstimate | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Modals
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isPricingOpen, setIsPricingOpen] = useState<boolean>(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState<boolean>(false);
  const [pricingConfig, setPricingConfig] = useState<EstimationPricingConfig>(
    AIProjectEstimatorService.getPricingConfig()
  );
  const [history, setHistory] = useState<EstimationHistoryVersion[]>([]);

  // 1. Load context from Module Generator / Architect / Requirement Analyzer on mount
  useEffect(() => {
    let moduleData: any = null;
    let requirementData: RequirementAnalysis | null = null;
    let architectureData: SolutionArchitecture | null = null;

    try {
      const savedModules = localStorage.getItem('smart_ai_module_config');
      if (savedModules) moduleData = JSON.parse(savedModules);

      const savedReq = localStorage.getItem('smart_ai_requirement_analysis');
      if (savedReq) requirementData = JSON.parse(savedReq);

      const savedArch = localStorage.getItem('smart_ai_solution_architect_latest');
      if (savedArch) architectureData = JSON.parse(savedArch);
    } catch (e) {
      console.warn('Failed reading prior workspace context', e);
    }

    const loadedInput: ProjectEstimationInput = {
      industry: moduleData?.industry || (requirementData as any)?.industry || (requirementData?.projectOverview as any)?.industry || 'Enterprise Software',
      businessType: moduleData?.businessType || 'Custom Operations',
      platform: 'Web + Mobile',
      projectScale: (moduleData?.companyScale as any) || 'Medium',
      projectPriority: 'Balanced',
      modulesCount: moduleData?.summary?.totalModules || moduleData?.modules?.length || 8,
      featuresCount: moduleData?.modules
        ? moduleData.modules.reduce((acc: number, m: ApplicationModule) => acc + (m.features?.length || 3), 0)
        : 38,
      usersCount: moduleData?.usersCount || 250,
      branchesCount: moduleData?.branchesCount || 3,
      userRolesCount: 4,
      aiLevel: moduleData?.summary?.aiEnabledCount > 3 ? 'Advanced' : moduleData?.summary?.aiEnabledCount > 0 ? 'Intermediate' : 'Basic',
      apiIntegrationsCount: 3,
      realtimeLevel: 'Basic',
      databaseComplexity: 'Medium',
      authentication: 'JWT + OAuth2 RBAC',
      securityLevel: 'Enhanced',
      cloudDeployment: (architectureData as any)?.deploymentStrategy?.provider || 'Docker / Cloud Run GCP',
      modules: moduleData?.modules || [],
      requirementAnalysis: requirementData,
      solutionArchitecture: architectureData
    };

    setInput(loadedInput);
    runEstimateCalculation(loadedInput);
    setHistory(AIProjectEstimatorService.getEstimateHistory());
  }, []);

  // 2. Run Estimation Engine
  const runEstimateCalculation = async (calcInput: ProjectEstimationInput) => {
    setIsCalculating(true);
    try {
      const result = await AIProjectEstimatorService.generateEstimate(calcInput);
      setEstimate(result);
    } catch (err) {
      console.error('Failed generating estimate:', err);
    } finally {
      setIsCalculating(false);
    }
  };

  // 3. Handle Input Parameter Updates & Auto Recalculate
  const handleUpdateInput = (updatedInput: ProjectEstimationInput) => {
    setInput(updatedInput);
    runEstimateCalculation(updatedInput);
  };

  // 4. Save Estimate to Local History
  const handleSaveEstimate = () => {
    if (!estimate) return;
    AIProjectEstimatorService.saveEstimateLocally(estimate);
    setHistory(AIProjectEstimatorService.getEstimateHistory());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // 5. Export JSON
  const handleExportJSON = () => {
    if (estimate) {
      AIProjectEstimatorService.exportEstimateJSON(estimate);
    }
  };

  // 6. Handle Proposal Navigation
  const handleGenerateProposal = () => {
    if (estimate && onOpenProposalGenerator) {
      onOpenProposalGenerator(estimate);
    } else {
      setIsProposalModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <EstimatorHeader
          onRecalculate={() => runEstimateCalculation(input)}
          onOpenHistory={() => setIsHistoryOpen(true)}
          onOpenPricingConfig={() => setIsPricingOpen(true)}
          isCalculating={isCalculating}
        />

        {/* Project Configuration Summary Card */}
        <ProjectConfigSummaryCard
          input={input}
          onUpdateInput={handleUpdateInput}
        />

        {/* Loading Spinner State */}
        {isCalculating && !estimate && (
          <div className="bg-slate-900 border border-purple-800/30 rounded-3xl p-12 text-center my-8">
            <RefreshCw className="w-10 h-10 text-purple-400 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">Menghitung Estimasi AI...</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Sistem sedang melakukan kalkulasi pembobotan kompleksitas, alokasi tim insinyur, dan analisis durasi roadmap proyek Anda.
            </p>
          </div>
        )}

        {/* Main Estimation Workspace Output */}
        {estimate && (
          <div className="space-y-8 animate-fade-in">
            {/* Primary Hero Result Card */}
            <EstimationResultCard
              estimate={estimate}
              onGenerateProposal={handleGenerateProposal}
              onReviewArchitecture={() => navigate('/ai-solution-architect')}
            />

            {/* Complexity Gauge & Factor Breakdown */}
            <ComplexityGauge complexity={estimate.complexity} />

            {/* Fast MVP Option Card */}
            <MVPEstimationCard mvp={estimate.mvpEstimate} />

            {/* Scenario Comparison Table (Lean vs Balanced vs Enterprise) */}
            <ScenarioComparisonTable scenarios={estimate.scenarios} />

            {/* Cost Category Breakdown & Timeline Phase Roadmap */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CostBreakdownChart breakdown={estimate.costBreakdown} />
              <TimelinePhaseChart
                phases={estimate.timeline.phases}
                minMonths={estimate.timeline.minMonths}
                maxMonths={estimate.timeline.maxMonths}
              />
            </div>

            {/* Team Recommendation & Effort Allocation */}
            <TeamRecommendationCard teamRecommendation={estimate.teamRecommendation} />

            {/* Cost Drivers & Cost Savers */}
            <FactorAnalysisCard
              costDrivers={estimate.costDrivers}
              costSavers={estimate.costSavers}
              timelineDrivers={estimate.timelineDrivers}
            />

            {/* Traceability Matrix */}
            <TraceabilityMatrix traceability={estimate.traceability} />

            {/* Assumptions, Exclusions, Risks */}
            <AssumptionsRisksCard
              assumptions={estimate.assumptions}
              exclusions={estimate.exclusions}
              risks={estimate.risks}
              openQuestions={estimate.openQuestions}
            />

            {/* Action Bar Footer */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Siap Melangkah ke Tahap Proposal Bisnis?</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Gunakan hasil estimasi awal ini untuk otomatis merilis Dokumen Proposal Penawaran Proyek Resmi.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleSaveEstimate}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-all cursor-pointer"
                >
                  {isSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4 text-purple-400" />}
                  <span>{isSaved ? 'Tersimpan!' : 'Simpan Estimasi'}</span>
                </button>

                <button
                  onClick={handleExportJSON}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Export JSON</span>
                </button>

                <button
                  onClick={handleGenerateProposal}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-purple-900/40"
                >
                  <span>Generate Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        <EstimateHistoryModal
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          history={history}
          onSelectVersion={(ver) => {
            setEstimate(ver.estimateData);
          }}
        />

        <PricingConfigModal
          isOpen={isPricingOpen}
          onClose={() => setIsPricingOpen(false)}
          config={pricingConfig}
          onSaveConfig={(updated) => {
            setPricingConfig(updated);
            AIProjectEstimatorService.savePricingConfig(updated);
            runEstimateCalculation(input);
          }}
        />

        <GenerateProposalModal
          isOpen={isProposalModalOpen}
          onClose={() => setIsProposalModalOpen(false)}
          initialData={{
            industry: input.industry,
            projectTitle: `Penawaran Solusi - ${input.industry} (${input.projectScale} Scale)`,
            estimatedValueMax: estimate?.scenarios?.find((s) => s.id === 'balanced')?.investmentMaxIDR || estimate?.investment?.maxIDR || 300000000
          }}
          onProposalCreated={(newProp) => {
            window.location.href = `/admin/proposals/${newProp.id}`;
          }}
        />
      </div>
    </div>
  );
};
