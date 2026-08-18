import React, { useState, useEffect } from 'react';
import {
  Building2,
  Sparkles,
  Search,
  Users,
  MapPin,
  Briefcase,
  Layers,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  FileText,
  Workflow,
  Cpu
} from 'lucide-react';
import { RequirementAnalysis, SolutionArchitecture } from '../../types';
import { AIModuleGeneratorService } from '../../services/aiModuleService';

interface IndustrySelectorProps {
  selectedIndustry: string;
  customDescription: string;
  selectedBusinessType: string;
  companyScale: 'Small' | 'Medium' | 'Large' | 'Enterprise';
  usersCount: string;
  branchesCount: string;
  requirementAnalysis?: RequirementAnalysis | null;
  solutionArchitecture?: SolutionArchitecture | null;
  onIndustryChange: (ind: string) => void;
  onCustomDescriptionChange: (desc: string) => void;
  onBusinessTypeChange: (bt: string) => void;
  onScaleChange: (scale: 'Small' | 'Medium' | 'Large' | 'Enterprise') => void;
  onUsersCountChange: (uc: string) => void;
  onBranchesCountChange: (bc: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const INDUSTRIES = [
  'Mining',
  'Coal Mining',
  'Nickel Mining',
  'Plantation',
  'Poultry',
  'Shrimp Farming',
  'Hospital',
  'Aesthetic & Beauty Clinic',
  'Clinic & Pharmacy',
  'School',
  'Manufacturing',
  'Retail',
  'Restaurant',
  'Distributor',
  'Logistics',
  'Fleet Management',
  'Construction',
  'Property',
  'Agriculture',
  'Financial Services',
  'Professional Services',
  'Other'
];

export const IndustrySelector: React.FC<IndustrySelectorProps> = ({
  selectedIndustry,
  customDescription,
  selectedBusinessType,
  companyScale,
  usersCount,
  branchesCount,
  requirementAnalysis,
  solutionArchitecture,
  onIndustryChange,
  onCustomDescriptionChange,
  onBusinessTypeChange,
  onScaleChange,
  onUsersCountChange,
  onBranchesCountChange,
  onGenerate,
  isGenerating
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredIndustries = INDUSTRIES.filter((ind) =>
    ind.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const businessTypeOptions = AIModuleGeneratorService.getBusinessTypesForIndustry(selectedIndustry);

  useEffect(() => {
    // If business type is empty or invalid for selected industry, set default
    if (!selectedBusinessType || !businessTypeOptions.includes(selectedBusinessType)) {
      onBusinessTypeChange(businessTypeOptions[0] || 'General Operator');
    }
  }, [selectedIndustry]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden mb-8 backdrop-blur-md">
      {/* Decorative gradient background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Requirement Context Banner if passed from earlier prompt stages */}
      {(requirementAnalysis || solutionArchitecture) && (
        <div className="mb-6 bg-slate-950/80 border border-blue-500/30 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-900/50 border border-blue-500/40 text-blue-400 mt-0.5 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-semibold">
                  CONTEXT LOADED
                </span>
                <h4 className="text-sm font-bold text-white">
                  {requirementAnalysis?.projectOverview?.solutionName || 'Spesifikasi Proyek Terkini'}
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                {requirementAnalysis?.projectOverview?.executiveSummary ||
                  solutionArchitecture?.summary ||
                  'Konstruksi modul AI akan mengasimilasi hasil analisis requirement dan rancangan arsitektur sebelumnya.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/50 px-3 py-1.5 rounded-lg border border-cyan-800/50 shrink-0">
            <Cpu className="w-3.5 h-3.5" />
            <span>
              {requirementAnalysis?.functionalRequirements?.length || 0} Req &bull; {solutionArchitecture?.systemComponents?.length || 0} Comp
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Industry Selection */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>Pilih Industri Bisnis</span>
            <span className="text-rose-400">*</span>
          </label>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-slate-950 border border-slate-700 hover:border-blue-500 rounded-xl px-4 py-3 text-left text-sm font-semibold text-white flex items-center justify-between transition-all cursor-pointer shadow-inner"
            >
              <span className="truncate">{selectedIndustry}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-50 mt-2 w-full bg-slate-950 border border-slate-700 rounded-xl shadow-2xl p-2 space-y-2 max-h-64 overflow-y-auto">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Cari industri..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  {filteredIndustries.map((ind) => (
                    <button
                      key={ind}
                      type="button"
                      onClick={() => {
                        onIndustryChange(ind);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        selectedIndustry === ind
                          ? 'bg-blue-600 text-white font-bold'
                          : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <span>{ind}</span>
                      {selectedIndustry === ind && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </button>
                  ))}
                  {filteredIndustries.length === 0 && (
                    <div className="p-3 text-xs text-slate-500 text-center">Industri tidak ditemukan</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. Business Type Selector */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <span>Jenis Bisnis (Business Type)</span>
            <span className="text-rose-400">*</span>
          </label>

          <select
            value={selectedBusinessType}
            onChange={(e) => onBusinessTypeChange(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 hover:border-cyan-500 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:border-cyan-500 transition-all cursor-pointer shadow-inner"
          >
            {businessTypeOptions.map((bt) => (
              <option key={bt} value={bt} className="bg-slate-900 text-white">
                {bt}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Company Scale */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Skala Perusahaan</span>
          </label>

          <div className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {(['Small', 'Medium', 'Large', 'Enterprise'] as const).map((scale) => (
              <button
                key={scale}
                type="button"
                onClick={() => onScaleChange(scale)}
                className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  companyScale === scale
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-950'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {scale}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Description field if "Other" is selected */}
      {selectedIndustry === 'Other' && (
        <div className="mt-6 space-y-2">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>Jelaskan Industri & Model Bisnis Anda</span>
            <span className="text-rose-400">*</span>
          </label>
          <textarea
            rows={3}
            placeholder="Contoh: Kami adalah perusahaan layanan sewa drone pemetaan lahan perkebunan berbasis SaaS dengan sistem bayar per hektar..."
            value={customDescription}
            onChange={(e) => onCustomDescriptionChange(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
          />
        </div>
      )}

      {/* Users & Branches Optional Scale Detail Inputs */}
      <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <Users className="w-4 h-4 text-blue-400 shrink-0" />
          <div className="flex-1">
            <span className="text-[11px] text-slate-400 block font-mono">Estimasi Pengguna:</span>
            <input
              type="text"
              value={usersCount}
              onChange={(e) => onUsersCountChange(e.target.value)}
              placeholder="Contoh: 25 - 100 users"
              className="bg-transparent text-xs font-semibold text-white focus:outline-none w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
          <div className="flex-1">
            <span className="text-[11px] text-slate-400 block font-mono">Lokasi / Cabang:</span>
            <input
              type="text"
              value={branchesCount}
              onChange={(e) => onBranchesCountChange(e.target.value)}
              placeholder="Contoh: 3 site / cabang"
              className="bg-transparent text-xs font-semibold text-white focus:outline-none w-full"
            />
          </div>
        </div>

        <div className="sm:col-span-2 lg:col-span-1 flex items-center justify-end">
          <button
            type="button"
            onClick={onGenerate}
            disabled={isGenerating || (selectedIndustry === 'Other' && !customDescription.trim())}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-950/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer glow-primary-cta"
          >
            <Sparkles className="w-4 h-4 text-cyan-200 animate-spin-slow" />
            <span>{isGenerating ? 'Menyusun Modul...' : 'Generate Modules with AI'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
