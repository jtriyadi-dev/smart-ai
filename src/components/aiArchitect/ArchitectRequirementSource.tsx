import React, { useState } from 'react';
import { RequirementAnalysis, SolutionArchitectInput } from '../../types';
import { FileCode, Layers, ShieldCheck, Cpu, ChevronDown, ChevronUp, Database, ArrowRight } from 'lucide-react';

interface ArchitectRequirementSourceProps {
  inputData: SolutionArchitectInput;
  requirementAnalysis?: RequirementAnalysis | null;
}

export const ArchitectRequirementSource: React.FC<ArchitectRequirementSourceProps> = ({
  inputData,
  requirementAnalysis
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const solutionName = requirementAnalysis?.projectOverview?.solutionName || inputData.projectOverview?.solutionName || 'Custom Enterprise System';
  const targetDomain = requirementAnalysis?.projectOverview?.targetDomain || inputData.projectOverview?.targetDomain || 'Business Application';
  const moduleCount = requirementAnalysis?.modules?.length || inputData.modules?.length || 0;
  const functionalCount = requirementAnalysis?.functionalRequirements?.length || inputData.functionalRequirements?.length || 0;
  const nonFunctionalCount = requirementAnalysis?.nonFunctionalRequirements?.length || inputData.nonFunctionalRequirements?.length || 0;
  const aiReqCount = requirementAnalysis?.aiRequirements?.length || inputData.aiRequirements?.length || 0;
  const integrationCount = requirementAnalysis?.integrations?.length || inputData.integrations?.length || 0;
  const userRolesCount = requirementAnalysis?.userRoles?.length || inputData.userRoles?.length || 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mb-6 shadow-md text-slate-200">
      <div className="p-4 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 text-cyan-400 rounded-lg border border-blue-500/20">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider text-cyan-400 uppercase bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                REQUIREMENT SOURCE
              </span>
              <span className="text-xs text-slate-400">Software Requirement Specification (SRS)</span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              {solutionName}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="font-semibold text-white">{functionalCount}</span> Functional Req
            <span className="text-slate-600">|</span>
            <span className="font-semibold text-white">{moduleCount}</span> Modul
            <span className="text-slate-600">|</span>
            <span className="font-semibold text-cyan-400">{aiReqCount}</span> AI Features
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition"
          >
            {isExpanded ? (
              <>Tutup Sumber <ChevronUp className="w-3.5 h-3.5" /></>
            ) : (
              <>Lihat Sumber Architecture <ChevronDown className="w-3.5 h-3.5" /></>
            )}
          </button>
        </div>
      </div>

      {/* Expanded Detail Matrix */}
      {isExpanded && (
        <div className="p-5 bg-slate-950/90 text-xs border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2 p-3 bg-slate-900/80 rounded-lg border border-slate-800">
            <div className="font-bold text-cyan-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Project & Domain
            </div>
            <div className="text-slate-300">Domain: <strong className="text-white">{targetDomain}</strong></div>
            <div className="text-slate-300">Platforms: <strong className="text-white">{(requirementAnalysis?.projectOverview?.targetPlatforms || inputData.platform || ['Web Desktop', 'PWA']).join(', ')}</strong></div>
            <div className="text-slate-400 line-clamp-2">
              Summary: {requirementAnalysis?.projectOverview?.executiveSummary || inputData.projectOverview?.executiveSummary || '-'}
            </div>
          </div>

          <div className="space-y-2 p-3 bg-slate-900/80 rounded-lg border border-slate-800">
            <div className="font-bold text-blue-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> Functional Scope
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Functional Requirements:</span>
              <strong className="text-white">{functionalCount} Items</strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Modules Count:</span>
              <strong className="text-white">{moduleCount} Modules</strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>User Roles:</span>
              <strong className="text-white">{userRolesCount} Roles</strong>
            </div>
          </div>

          <div className="space-y-2 p-3 bg-slate-900/80 rounded-lg border border-slate-800">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Quality & Integrations
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Non-Functional Requirements:</span>
              <strong className="text-white">{nonFunctionalCount} Items</strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>External Integrations:</span>
              <strong className="text-white">{integrationCount} APIs</strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>AI Requirements:</span>
              <strong className="text-cyan-400 font-bold">{aiReqCount} Features</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
