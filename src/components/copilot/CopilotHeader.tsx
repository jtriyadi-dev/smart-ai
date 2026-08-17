import React from 'react';
import { IndustryType, UserRole, BusinessHealthStatus } from '../../types';
import { Sparkles, Building2, UserCheck, ShieldCheck, Activity, Cpu, Database } from 'lucide-react';

interface CopilotHeaderProps {
  activeIndustry: IndustryType;
  onSelectIndustry: (ind: IndustryType) => void;
  activeRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  healthScore: number;
  healthStatus: BusinessHealthStatus;
}

export const CopilotHeader: React.FC<CopilotHeaderProps> = ({
  activeIndustry,
  onSelectIndustry,
  activeRole,
  onSelectRole,
  healthScore,
  healthStatus
}) => {
  const industries: { id: IndustryType; label: string; icon: string }[] = [
    { id: 'RETAIL', label: 'Retail & POS', icon: '🏪' },
    { id: 'MINING', label: 'Mining (Tambang)', icon: '⛏️' },
    { id: 'HOSPITAL', label: 'Hospital (SIMRS)', icon: '🏥' },
    { id: 'MANUFACTURING', label: 'Manufacturing', icon: '🏭' },
    { id: 'PLANTATION', label: 'Plantation (Sawit)', icon: '🌴' },
    { id: 'POULTRY', label: 'Poultry (Peternakan)', icon: '🐔' },
    { id: 'SHRIMP_FARM', label: 'Shrimp Farm (Tambak)', icon: '🦐' },
    { id: 'SCHOOL', label: 'School (Pendidikan)', icon: '🏫' },
    { id: 'CUSTOM', label: 'Custom Enterprise', icon: '⚡' }
  ];

  const roles: UserRole[] = ['CEO', 'FINANCE', 'OPERATIONS', 'WAREHOUSE', 'HR', 'GENERAL_MANAGER'];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl backdrop-blur-md">
      
      {/* Top Header Title & Status */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>ENTERPRISE AI BUSINESS COPILOT ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            SMART-AI.ID Business Copilot
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Analytics • Anomaly Detection • Forecasting • Recommendations • Role-Based Data Governance
          </p>
        </div>

        {/* Health Score Badge & Data Source Status */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-cyan-400 text-sm">
                {healthScore}
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Business Health Score</div>
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" /> {healthStatus}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-xs text-slate-300">
            <Database className="w-4 h-4 text-cyan-400" />
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Data Sources</div>
              <div className="font-bold text-white">6 Connected (Read-Only)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        
        {/* Industry Adapter Selector */}
        <div className="space-y-1.5">
          <label className="block font-bold text-slate-300 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" /> Active Industry AI Adapter:
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {industries.map((ind) => (
              <button
                key={ind.id}
                onClick={() => onSelectIndustry(ind.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
                  activeIndustry === ind.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md font-extrabold'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{ind.icon}</span>
                <span>{ind.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* User Role Selector (RBAC Test) */}
        <div className="space-y-1.5">
          <label className="block font-bold text-slate-300 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-purple-400" /> User Access Role (RBAC Simulation):
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => onSelectRole(r)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
                  activeRole === r
                    ? 'bg-purple-500 text-white shadow-md font-extrabold'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{r}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
