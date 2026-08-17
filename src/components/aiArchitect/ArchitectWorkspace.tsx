import React, { useState } from 'react';
import { SolutionArchitecture, SolutionArchitectInput } from '../../types';
import { ArchitectVisualCanvas } from './ArchitectVisualCanvas';
import { ArchitectRequirementSource } from './ArchitectRequirementSource';
import { AISolutionArchitectService } from '../../services/aiSolutionArchitectService';
import {
  Workflow,
  Server,
  Layout,
  Database,
  Shield,
  Sparkles,
  Layers,
  AlertTriangle,
  Download,
  FileText,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Cpu,
  Cloud,
  Lock,
  GitBranch,
  Table,
  Boxes
} from 'lucide-react';

interface ArchitectWorkspaceProps {
  architecture: SolutionArchitecture;
  inputData: SolutionArchitectInput;
  onReGenerate: () => void;
  onProceedToProposal?: () => void;
  onOpenConsultation?: () => void;
  onOpenModuleGenerator?: () => void;
}

type WorkspaceTab =
  | 'Visual Canvas'
  | 'Pattern & Tech Stack'
  | 'Frontend Specs'
  | 'Backend & REST APIs'
  | 'Database & ERD'
  | 'Auth, Security & Cloud'
  | 'AI Architecture'
  | 'Traceability Matrix'
  | 'Risks & Assumptions';

export const ArchitectWorkspace: React.FC<ArchitectWorkspaceProps> = ({
  architecture,
  inputData,
  onReGenerate,
  onProceedToProposal,
  onOpenConsultation,
  onOpenModuleGenerator
}) => {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('Visual Canvas');
  const [isApproved, setIsApproved] = useState<boolean>(false);

  const handleExportJSON = () => {
    AISolutionArchitectService.exportJSON(architecture);
  };

  const handleExportPDF = () => {
    AISolutionArchitectService.exportPDF(architecture);
  };

  const handleApprove = () => {
    setIsApproved(true);
    AISolutionArchitectService.trackEvent('architecture_approved', {
      pattern: architecture.architectureOverview?.pattern
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Requirement Source */}
      <ArchitectRequirementSource inputData={inputData} />

      {/* Main Action Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-800 uppercase tracking-wider">
              {architecture.architectureOverview?.pattern || 'Modular Monolith'} Architecture
            </span>
            {isApproved && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Approved Blueprint
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            {architecture.summary || 'Technical Solution Architecture Blueprint'}
          </h2>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onReGenerate}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Re-Generate
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> JSON
          </button>

          {onOpenModuleGenerator && (
            <button
              onClick={onOpenModuleGenerator}
              className="px-3.5 py-2 bg-purple-900/60 hover:bg-purple-800 text-purple-200 rounded-xl text-xs font-semibold border border-purple-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Boxes className="w-3.5 h-3.5 text-purple-300" /> Configure Modules
            </button>
          )}

          <button
            onClick={handleExportPDF}
            className="px-3.5 py-2 bg-blue-900/60 hover:bg-blue-800 text-blue-200 rounded-xl text-xs font-semibold border border-blue-700 transition flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" /> Export PDF
          </button>

          {!isApproved ? (
            <button
              onClick={handleApprove}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/20 transition flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" /> Approve Architecture
            </button>
          ) : (
            <button
              onClick={onProceedToProposal || onOpenConsultation}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-600/20 transition flex items-center gap-2 animate-pulse"
            >
              Lanjut ke Proposal & Rab <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-1.5 flex items-center gap-1 overflow-x-auto custom-scrollbar">
        {[
          { id: 'Visual Canvas', icon: Workflow },
          { id: 'Pattern & Tech Stack', icon: Server },
          { id: 'Frontend Specs', icon: Layout },
          { id: 'Backend & REST APIs', icon: Cpu },
          { id: 'Database & ERD', icon: Database },
          { id: 'Auth, Security & Cloud', icon: Shield },
          { id: 'AI Architecture', icon: Sparkles },
          { id: 'Traceability Matrix', icon: Layers },
          { id: 'Risks & Assumptions', icon: AlertTriangle }
        ].map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as WorkspaceTab)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${
                active
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" /> {tab.id}
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      {activeTab === 'Visual Canvas' && (
        <ArchitectVisualCanvas architecture={architecture} />
      )}

      {activeTab === 'Pattern & Tech Stack' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6">
          {/* Pattern Overview */}
          <div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Server className="w-5 h-5 text-cyan-400" /> Architecture Pattern: {architecture.architectureOverview?.pattern}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
              {architecture.architectureOverview?.reason}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-emerald-950/20 border border-emerald-900/40 rounded-xl space-y-2">
              <h4 className="font-bold text-emerald-400 text-sm">Keunggulan Pattern Ini</h4>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                {(architecture.architectureOverview?.advantages || []).map((adv, idx) => (
                  <li key={idx}>{adv}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-amber-950/20 border border-amber-900/40 rounded-xl space-y-2">
              <h4 className="font-bold text-amber-400 text-sm">Trade-Offs & Pertimbangan</h4>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                {(architecture.architectureOverview?.tradeOffs || []).map((tr, idx) => (
                  <li key={idx}>{tr}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technology Stack Table */}
          <div>
            <h4 className="text-base font-bold text-white mb-3">Technology Stack Recommendation</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <th className="p-3">Kategori</th>
                    <th className="p-3">Teknologi Pilihan</th>
                    <th className="p-3">Alasan Pemilihan</th>
                    <th className="p-3">Alternatif</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {(architecture.technologyStack || []).map((tech, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-cyan-400">{tech.category}</td>
                      <td className="p-3 font-mono font-bold text-white">{tech.technology}</td>
                      <td className="p-3 text-slate-300">{tech.reason}</td>
                      <td className="p-3 text-slate-400 font-mono">{tech.alternative}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cost & Scalability Path */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="font-bold text-cyan-400 mb-1">Cost Optimization Strategy</div>
              <div className="text-slate-300">
                {architecture.costConsideration?.notes || 'Gunakan Cloud Run serverless scale-to-zero untuk efisiensi biaya hosting.'}
              </div>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="font-bold text-blue-400 mb-1">Scalability & Growth Path</div>
              <div className="text-slate-300">
                {Array.isArray(architecture.scalabilityPath)
                  ? architecture.scalabilityPath.map((s) => `${s.phase}: ${s.title} (${s.strategy})`).join(' | ')
                  : String(architecture.scalabilityPath || 'Migrasi bertahap ke microservices terpisah jika traffic melebihi 100k DAU.')}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Frontend Specs' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layout className="w-5 h-5 text-cyan-400" /> Frontend Application Specifications
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400">Framework:</span><br/>
              <strong className="text-white text-sm">{architecture.frontendArchitecture?.framework}</strong>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400">UI / Styling:</span><br/>
              <strong className="text-cyan-400 text-sm">{architecture.frontendArchitecture?.uiFramework}</strong>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400">State Management:</span><br/>
              <strong className="text-emerald-400 text-sm">{architecture.frontendArchitecture?.stateManagement}</strong>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-300 mb-2">Folder Structure Blueprint</h4>
            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
              {architecture.frontendArchitecture?.folderStructure}
            </pre>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-300 mb-2">Error Handling Strategy</h4>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
              {architecture.frontendArchitecture?.errorHandling}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Backend & REST APIs' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-400" /> Backend Services & REST APIs Specification
          </h3>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
            <div>Runtime Framework: <strong className="text-white">{architecture.backendArchitecture?.framework}</strong></div>
            <div>Architecture API Style: <strong className="text-cyan-400">{architecture.backendArchitecture?.apiStyle}</strong></div>
            <div>Business Logic Layer: <strong className="text-emerald-400">{architecture.backendArchitecture?.businessLogic}</strong></div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-300 mb-3">REST API Endpoints Specification</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <th className="p-3">Method</th>
                    <th className="p-3">Path</th>
                    <th className="p-3">Purpose</th>
                    <th className="p-3">Auth / Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {(architecture.apiEndpoints || []).map((ep) => (
                    <tr key={ep.id} className="hover:bg-slate-800/40">
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                          ep.method === 'GET' ? 'bg-blue-950 text-blue-400 border border-blue-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}>
                          {ep.method}
                        </span>
                      </td>
                      <td className="p-3 font-mono font-bold text-white">{ep.path}</td>
                      <td className="p-3 text-slate-300">{ep.purpose}</td>
                      <td className="p-3 text-slate-400">{ep.authentication ? '🔒 ' + ep.role : 'Public'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Database & ERD' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" /> Relational Database Architecture & ERD
          </h3>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
            <div>Database Type: <strong className="text-white">{architecture.databaseArchitecture?.databaseType} ({architecture.databaseArchitecture?.primaryDatabase})</strong></div>
            <div className="text-slate-400 mt-1">{architecture.databaseArchitecture?.rationale}</div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-300 mb-3">Entities Specification</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(architecture.databaseEntities || []).map((entity) => (
                <div key={entity.entityName} className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="font-bold text-emerald-400 text-sm flex items-center justify-between">
                    <span>{entity.entityName}</span>
                    <span className="font-mono text-[10px] text-slate-500">PK: {entity.primaryKey}</span>
                  </div>
                  <div className="text-slate-300 font-mono text-[11px]">
                    Attributes: {entity.attributes.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Auth, Security & Cloud' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-400" /> Authentication, Security & Cloud Infrastructure
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-indigo-400 text-sm flex items-center gap-1.5">
                <Lock className="w-4 h-4" /> Authentication Strategy
              </h4>
              <div>Method: <strong>{architecture.authenticationArchitecture?.method}</strong></div>
              <p className="text-slate-400 leading-relaxed">{architecture.authenticationArchitecture?.flowDescription}</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-sky-400 text-sm flex items-center gap-1.5">
                <Cloud className="w-4 h-4" /> Cloud Infrastructure ({architecture.cloudArchitecture?.provider})
              </h4>
              <div>Backend Host: <strong>{architecture.cloudArchitecture?.backendHosting}</strong></div>
              <div>Database Host: <strong>{architecture.cloudArchitecture?.databaseHosting}</strong></div>
              <div>CDN: <strong>{architecture.cloudArchitecture?.cdn}</strong></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'AI Architecture' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400" /> Gemini AI Gateway Architecture
          </h3>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-3">
            <div>Provider Strategy: <strong className="text-pink-400">{architecture.aiArchitecture?.providerStrategy}</strong></div>
            <div>RAG Supported: <strong>{architecture.aiArchitecture?.ragSupported ? 'Yes' : 'No'}</strong></div>
            <div>Vector DB: <strong>{architecture.aiArchitecture?.vectorDatabase}</strong></div>
          </div>
        </div>
      )}

      {activeTab === 'Traceability Matrix' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" /> Architecture Traceability Matrix
          </h3>
          <p className="text-xs text-slate-400">
            Memetakan keterkaitan dari Requirement SRS ke Komponen Modul, Technology Stack, REST API, dan Entity Database.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <th className="p-3">Requirement</th>
                  <th className="p-3">Module</th>
                  <th className="p-3">System Component</th>
                  <th className="p-3">Technology</th>
                  <th className="p-3">REST API</th>
                  <th className="p-3">Database Entity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {(architecture.traceabilityMatrix || []).map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="p-3 font-mono text-cyan-400 font-bold">{row.requirementId}</td>
                    <td className="p-3 text-slate-200">{row.moduleName}</td>
                    <td className="p-3 text-white font-semibold">{row.componentId}</td>
                    <td className="p-3 text-slate-300 font-mono">{row.technology}</td>
                    <td className="p-3 text-emerald-400 font-mono">{row.apiEndpoint}</td>
                    <td className="p-3 text-slate-300 font-mono">{row.dbTable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Risks & Assumptions' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" /> Risks & Technical Assumptions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(architecture.risks || []).map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="font-bold text-amber-400 flex items-center justify-between">
                  <span>{item.risk}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                    Impact: {item.impact}
                  </span>
                </div>
                <p className="text-slate-300"><strong>Rekomendasi / Mitigasi:</strong> {item.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
