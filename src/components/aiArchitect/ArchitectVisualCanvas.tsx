import React, { useState } from 'react';
import {
  SolutionArchitecture,
  ArchitectureNode,
  ArchitectureNodeType
} from '../../types';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  User,
  Layout,
  Server,
  Shield,
  Database,
  Cpu,
  Cloud,
  Sparkles,
  Globe,
  Activity,
  Layers,
  ArrowRight,
  Info,
  X,
  CheckCircle2,
  Workflow
} from 'lucide-react';

interface ArchitectVisualCanvasProps {
  architecture: SolutionArchitecture;
}

type DiagramTabType =
  | 'System Architecture'
  | 'Frontend Tree'
  | 'Backend Pipeline'
  | 'Database ERD'
  | 'API Map'
  | 'Authentication'
  | 'AI Flow'
  | 'Cloud Infrastructure'
  | 'Deployment CI/CD';

export const ArchitectVisualCanvas: React.FC<ArchitectVisualCanvasProps> = ({
  architecture
}) => {
  const [activeTab, setActiveTab] = useState<DiagramTabType>('System Architecture');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(
    architecture.architectureDiagram?.nodes?.[1] || null
  );

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.15, 1.6));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.15, 0.6));
  const handleReset = () => setZoomLevel(1);

  const getNodeIcon = (type: ArchitectureNodeType) => {
    switch (type) {
      case 'USER': return <User className="w-5 h-5 text-amber-400" />;
      case 'FRONTEND': return <Layout className="w-5 h-5 text-cyan-400" />;
      case 'API': return <Server className="w-5 h-5 text-blue-400" />;
      case 'AUTH': return <Shield className="w-5 h-5 text-indigo-400" />;
      case 'BACKEND': return <Server className="w-5 h-5 text-violet-400" />;
      case 'DATABASE': return <Database className="w-5 h-5 text-emerald-400" />;
      case 'CACHE': return <Cpu className="w-5 h-5 text-teal-400" />;
      case 'STORAGE': return <Layers className="w-5 h-5 text-sky-400" />;
      case 'AI': return <Sparkles className="w-5 h-5 text-pink-400" />;
      case 'EXTERNAL': return <Globe className="w-5 h-5 text-orange-400" />;
      case 'CLOUD': return <Cloud className="w-5 h-5 text-blue-300" />;
      case 'MONITORING': return <Activity className="w-5 h-5 text-rose-400" />;
      default: return <Server className="w-5 h-5 text-slate-400" />;
    }
  };

  const getNodeColor = (type: ArchitectureNodeType, isSelected: boolean) => {
    if (isSelected) {
      return 'border-cyan-400 ring-2 ring-cyan-500/50 bg-slate-900 shadow-xl shadow-cyan-500/10';
    }
    switch (type) {
      case 'USER': return 'border-amber-500/40 bg-amber-950/20 hover:border-amber-400';
      case 'FRONTEND': return 'border-cyan-500/40 bg-cyan-950/20 hover:border-cyan-400';
      case 'API': return 'border-blue-500/40 bg-blue-950/20 hover:border-blue-400';
      case 'AUTH': return 'border-indigo-500/40 bg-indigo-950/20 hover:border-indigo-400';
      case 'DATABASE': return 'border-emerald-500/40 bg-emerald-950/20 hover:border-emerald-400';
      case 'CACHE': return 'border-teal-500/40 bg-teal-950/20 hover:border-teal-400';
      case 'AI': return 'border-pink-500/40 bg-pink-950/20 hover:border-pink-400';
      case 'EXTERNAL': return 'border-orange-500/40 bg-orange-950/20 hover:border-orange-400';
      case 'CLOUD': return 'border-sky-500/40 bg-sky-950/20 hover:border-sky-400';
      default: return 'border-slate-700 bg-slate-900/60 hover:border-slate-500';
    }
  };

  const diagramTabs: DiagramTabType[] = [
    'System Architecture',
    'Frontend Tree',
    'Backend Pipeline',
    'Database ERD',
    'API Map',
    'Authentication',
    'AI Flow',
    'Cloud Infrastructure',
    'Deployment CI/CD'
  ];

  const nodes = architecture.architectureDiagram?.nodes || [];
  const connections = architecture.architectureDiagram?.connections || [];

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl mb-8 text-white">
      {/* Header & Tabs */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-lg text-white">
            <Workflow className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider text-cyan-400 uppercase bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                INTERACTIVE ARCHITECTURE CANVAS
              </span>
              <span className="text-xs text-slate-400">{architecture.architectureOverview?.pattern}</span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              Visual Architecture Diagram & System Components
            </h3>
          </div>
        </div>

        {/* Canvas Controls */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={handleZoomOut}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono px-1 font-bold text-cyan-400">{Math.round(zoomLevel * 100)}%</span>
          <button
            onClick={handleZoomIn}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition"
            title="Reset Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-2 flex items-center gap-2 overflow-x-auto custom-scrollbar">
        {diagramTabs.map((tab) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                active
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Main Canvas View Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 min-h-[520px]">
        {/* Left / Center Diagram Stage */}
        <div className="lg:col-span-2 p-6 bg-slate-950/80 relative overflow-hidden flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
          {/* Legend Bar */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 mb-4 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
            <span className="font-bold text-slate-300 uppercase tracking-wider">Legend:</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Client</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> Frontend</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span> API Server</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Database</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-pink-400"></span> Gemini AI</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span> External API</span>
          </div>

          {/* Render Active Diagram Content based on Tab */}
          <div
            className="flex-1 flex flex-col items-center justify-center transition-transform duration-300 my-2"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
          >
            {activeTab === 'System Architecture' && (
              <div className="w-full max-w-2xl space-y-6">
                {/* Visual Architecture Nodes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {nodes.map((node) => {
                    const isSelected = selectedNode?.id === node.id;
                    return (
                      <button
                        key={node.id}
                        onClick={() => setSelectedNode(node)}
                        className={`p-4 rounded-xl text-left border transition cursor-pointer relative group ${getNodeColor(
                          node.type,
                          isSelected
                        )}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-1.5 rounded-lg bg-slate-800/80">
                            {getNodeIcon(node.type)}
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 uppercase">{node.type}</span>
                        </div>
                        <div className="font-bold text-sm text-white group-hover:text-cyan-300 transition">
                          {node.name}
                        </div>
                        <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">{node.description}</div>
                        <div className="mt-2 text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-900 inline-block">
                          {node.technology}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Connection Flow Summary */}
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <div className="font-bold text-cyan-400 mb-1.5 flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5" /> Key Data Flow Connections:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {connections.map((conn, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-slate-950/60 p-2 rounded border border-slate-800/80 text-[11px]">
                        <span className="font-mono text-slate-400">{conn.source.replace('node-', '')}</span>
                        <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span className="font-mono text-slate-200">{conn.target.replace('node-', '')}</span>
                        <span className="text-slate-400 text-[10px] ml-auto truncate">({conn.description})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Frontend Tree' && (
              <div className="w-full max-w-md bg-slate-900/90 p-5 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300">
                <div className="font-bold text-cyan-400 mb-3 text-sm flex items-center gap-2">
                  <Layout className="w-4 h-4" /> {architecture.frontendArchitecture?.framework} Folder Structure
                </div>
                <pre className="text-cyan-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
{architecture.frontendArchitecture?.folderStructure || `src/
├── components/       # Shared UI Components
├── features/         # Modular Business Features
├── pages/            # Page Views & Routes
├── services/         # API Service Abstractions
├── hooks/            # Custom React Hooks
├── store/            # Global App State
└── types/            # TypeScript Interface Declarations`}
                </pre>
                <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-slate-800/60 p-2 rounded">UI: <strong className="text-white">{architecture.frontendArchitecture?.uiFramework}</strong></div>
                  <div className="bg-slate-800/60 p-2 rounded">State: <strong className="text-white">{architecture.frontendArchitecture?.stateManagement}</strong></div>
                </div>
              </div>
            )}

            {activeTab === 'Backend Pipeline' && (
              <div className="w-full max-w-lg space-y-3">
                <div className="text-center font-bold text-sm text-cyan-400 mb-2">
                  Request Handling Pipeline ({architecture.backendArchitecture?.framework})
                </div>
                {['Client HTTP Request', 'Security & CORS Middleware', 'JWT Auth & RBAC Check', 'Controller Route Handler', 'Service Business Logic', 'Database Repository (PostgreSQL)', 'AI Proxy Service (Gemini API)'].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="w-6 h-6 rounded-full bg-blue-600/20 text-cyan-400 font-bold flex items-center justify-center shrink-0 border border-blue-500/30">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-slate-200">{step}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Database ERD' && (
              <div className="w-full max-w-xl space-y-4">
                <div className="text-center font-bold text-sm text-emerald-400 mb-2">
                  Entity Relationship Diagram (ERD Schema)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(architecture.erdDiagram?.entities || []).map((ent) => (
                    <div key={ent.id} className="bg-slate-900/90 p-3.5 rounded-xl border border-emerald-900/50 text-xs">
                      <div className="font-bold text-emerald-400 border-b border-slate-800 pb-1.5 mb-2 flex items-center justify-between">
                        <span>{ent.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">TABLE</span>
                      </div>
                      <ul className="space-y-1 font-mono text-[11px] text-slate-300">
                        {ent.fields.map((f, i) => (
                          <li key={i} className="flex items-center justify-between">
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'API Map' && (
              <div className="w-full max-w-xl space-y-2">
                <div className="font-bold text-sm text-cyan-400 mb-3 text-center">
                  REST API Endpoints Specifications ({architecture.apiArchitecture?.baseUrl})
                </div>
                {(architecture.apiEndpoints || []).map((ep) => (
                  <div key={ep.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                        ep.method === 'GET' ? 'bg-blue-950 text-blue-400 border border-blue-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}>
                        {ep.method}
                      </span>
                      <code className="text-white font-semibold">{ep.path}</code>
                    </div>
                    <div className="text-slate-400 text-[11px]">{ep.purpose}</div>
                    <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded">
                      {ep.authentication ? '🔒 ' + ep.role : 'Public'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Authentication' && (
              <div className="w-full max-w-md bg-slate-900 p-5 rounded-2xl border border-slate-800 text-xs space-y-3">
                <div className="font-bold text-sm text-indigo-400 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Authentication Strategy
                </div>
                <p className="text-slate-300">{architecture.authenticationArchitecture?.method}</p>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-400 leading-relaxed">
                  {architecture.authenticationArchitecture?.flowDescription}
                </div>
                <div className="flex gap-2 font-mono text-[11px]">
                  <span className="p-2 bg-indigo-950 text-indigo-300 rounded border border-indigo-800 flex-1">
                    Token: {architecture.authenticationArchitecture?.tokenStrategy}
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'AI Flow' && (
              <div className="w-full max-w-lg bg-slate-900 p-5 rounded-2xl border border-slate-800 text-xs space-y-4">
                <div className="font-bold text-sm text-pink-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> AI Gateway & Provider Strategy
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-200">
                  <strong>Provider Strategy:</strong> {architecture.aiArchitecture?.providerStrategy}
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-slate-800/80 p-2.5 rounded">RAG Enabled: <strong className="text-pink-400">{architecture.aiArchitecture?.ragSupported ? 'Yes' : 'No'}</strong></div>
                  <div className="bg-slate-800/80 p-2.5 rounded">Vector DB: <strong className="text-white">{architecture.aiArchitecture?.vectorDatabase}</strong></div>
                </div>
                <div className="text-[11px] text-slate-400">
                  <strong>Guardrails:</strong> {(architecture.aiArchitecture?.guardrails || []).join(', ')}
                </div>
              </div>
            )}

            {activeTab === 'Cloud Infrastructure' && (
              <div className="w-full max-w-lg bg-slate-900 p-5 rounded-2xl border border-slate-800 text-xs space-y-3">
                <div className="font-bold text-sm text-sky-400 flex items-center gap-2">
                  <Cloud className="w-4 h-4" /> Cloud Topology ({architecture.cloudArchitecture?.provider})
                </div>
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                    <span className="text-slate-400">Backend Host:</span><br/>
                    <strong className="text-white">{architecture.cloudArchitecture?.backendHosting}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                    <span className="text-slate-400">Database Host:</span><br/>
                    <strong className="text-white">{architecture.cloudArchitecture?.databaseHosting}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                    <span className="text-slate-400">CDN & WAF:</span><br/>
                    <strong className="text-white">{architecture.cloudArchitecture?.cdn}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                    <span className="text-slate-400">Monitoring:</span><br/>
                    <strong className="text-white">{architecture.cloudArchitecture?.monitoring}</strong>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Deployment CI/CD' && (
              <div className="w-full max-w-lg space-y-3">
                <div className="font-bold text-sm text-cyan-400 text-center mb-2">
                  Automated Deployment Pipeline (CI/CD)
                </div>
                {(architecture.deploymentArchitecture?.ciCdPipeline || ['Git Push', 'Build Docker Container', 'Run Automated Tests', 'Deploy to Cloud Run']).map((step, idx) => (
                  <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold text-slate-200">{step}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Node Inspector Card */}
        <div className="p-5 bg-slate-900/90 text-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Component Inspector</span>
            </div>
            {selectedNode && (
              <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-900">
                {selectedNode.type}
              </span>
            )}
          </div>

          {selectedNode ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                  {getNodeIcon(selectedNode.type)} {selectedNode.name}
                </h4>
                <p className="text-slate-300 leading-relaxed">{selectedNode.description}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="text-slate-400">Technology:</div>
                <div className="font-mono text-cyan-300 font-semibold">{selectedNode.technology}</div>
              </div>

              {selectedNode.dependencies && selectedNode.dependencies.length > 0 && (
                <div>
                  <div className="font-semibold text-slate-300 mb-1">Dependencies:</div>
                  <ul className="list-disc list-inside text-slate-400 space-y-0.5">
                    {selectedNode.dependencies.map((dep, idx) => (
                      <li key={idx}>{dep}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1.5 text-[11px]">
                <div className="text-slate-400 font-semibold">Security Guideline:</div>
                <div className="text-slate-300">
                  {selectedNode.security || 'Enforce server-side validation and TLS 1.3 encryption.'}
                </div>
              </div>

              <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-900/40 text-[11px] text-blue-300">
                <strong>Data Flow Role:</strong> Node ini memproses atau meneruskan payload data utama aplikasi.
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              Pilih salah satu node diagram di samping untuk melihat detail spesifikasi komponen.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
