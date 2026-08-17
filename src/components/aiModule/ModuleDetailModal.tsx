import React, { useState } from 'react';
import {
  X,
  Boxes,
  Users,
  Workflow,
  Sparkles,
  Database,
  Layers,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Shield,
  FileText,
  Clock,
  Link,
  ChevronRight
} from 'lucide-react';
import { ApplicationModule } from '../../types';

interface ModuleDetailModalProps {
  module: ApplicationModule | null;
  onClose: () => void;
  onEdit: (module: ApplicationModule) => void;
}

export const ModuleDetailModal: React.FC<ModuleDetailModalProps> = ({ module, onClose, onEdit }) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'features' | 'roles' | 'dependencies' | 'workflow' | 'ai' | 'architecture'
  >('overview');

  if (!module) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                {module.category}
              </span>
              <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                {module.priority}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                ID: #{module.id}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>{module.name}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">{module.description}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 bg-slate-950/60 border-b border-slate-800/80 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Ringkasan & Purpose', icon: Layers },
            { id: 'features', label: `Daftar Fitur (${module.features?.length || 0})`, icon: Boxes },
            { id: 'roles', label: 'User Roles', icon: Users },
            { id: 'dependencies', label: 'Dependencies', icon: Workflow },
            { id: 'workflow', label: 'Workflows', icon: Clock },
            { id: 'ai', label: `AI Features (${module.aiFeatures?.length || 0})`, icon: Sparkles },
            { id: 'architecture', label: 'Architecture Impact', icon: Cpu }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'border-blue-500 text-blue-400 bg-blue-950/30'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* TAB 1: OVERVIEW & PURPOSE */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-mono text-blue-400 font-bold block uppercase mb-1">
                  Tujuan Utama Modul (Business Purpose):
                </span>
                <p className="text-sm text-slate-200 font-medium leading-relaxed">&ldquo;{module.purpose}&rdquo;</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                  <span className="text-xs font-mono font-bold text-slate-400 block mb-2">STATUS & SOURCE</span>
                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-500">Status Modul:</span>
                      <span className="font-semibold text-slate-200">{module.status}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-500">Sumber Konfigurasi:</span>
                      <span className="font-semibold text-slate-200">{module.source}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Urutan Prioritas:</span>
                      <span className="font-semibold text-blue-400">Urutan #{module.order}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                  <span className="text-xs font-mono font-bold text-slate-400 block mb-2">DATA & INTEGRASI</span>
                  <div className="space-y-2">
                    <div>
                      <span className="text-slate-500 block mb-1">Kebutuhan Data Utama:</span>
                      <div className="flex flex-wrap gap-1">
                        {module.dataRequirements?.map((d, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
                            {d}
                          </span>
                        )) || <span className="text-slate-600">-</span>}
                      </div>
                    </div>
                    <div className="pt-2">
                      <span className="text-slate-500 block mb-1">Sistem Terintegrasi:</span>
                      <div className="flex flex-wrap gap-1">
                        {module.integrations?.map((int, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-blue-950 border border-blue-800/80 text-blue-300 text-[11px]">
                            {int}
                          </span>
                        )) || <span className="text-slate-600">-</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FEATURES */}
          {activeTab === 'features' && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                Daftar Fitur Fungsional Modul ({module.features?.length || 0})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {module.features?.map((feat, idx) => (
                  <div key={feat.id || idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono text-slate-500 font-semibold">{feat.id}</span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-blue-300 border border-slate-800">
                          {feat.priority}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-white mb-1">{feat.name}</h5>
                      <p className="text-[11px] text-slate-400">{feat.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: USER ROLES */}
          {activeTab === 'roles' && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Peran Pengguna (User Roles) Yang Membutuhkan Modul Ini
              </h4>
              <div className="flex flex-wrap gap-2">
                {module.roles?.map((role, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <span className="font-semibold">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DEPENDENCIES */}
          {activeTab === 'dependencies' && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Ketergantungan Modul (Module Dependencies)
              </h4>

              {module.dependencies && module.dependencies.length > 0 ? (
                <div className="space-y-2">
                  {module.dependencies.map((dep, idx) => (
                    <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-purple-900/40 flex items-start gap-3">
                      <Workflow className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{dep.dependsOnModuleName || dep.dependsOnModuleId}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                            REQUIRES
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">{dep.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center text-slate-500">
                  Modul ini bersifat mandiri dan tidak memiliki ketergantungan wajib pada modul lain.
                </div>
              )}
            </div>
          )}

          {/* TAB 5: WORKFLOW */}
          {activeTab === 'workflow' && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Alur Kerja Operasional (Operational Workflow)
              </h4>

              <div className="space-y-3 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
                {module.workflow?.map((wf, idx) => {
                  const stepNum = typeof wf === 'object' ? wf.step : idx + 1;
                  const title = typeof wf === 'object' ? wf.title : `Langkah ${idx + 1}`;
                  const desc = typeof wf === 'object' ? wf.description : wf;
                  const role = typeof wf === 'object' ? wf.role : 'User';

                  return (
                    <div key={idx} className="flex items-start gap-3 relative pl-2">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 z-10 shadow-md">
                        {stepNum}
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-bold text-white">{title}</h5>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800">
                            {role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">{desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: AI FEATURES */}
          {activeTab === 'ai' && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Kemampuan AI Terintegrasi (AI Capabilities)
              </h4>

              {module.aiFeatures && module.aiFeatures.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {module.aiFeatures.map((ai, idx) => {
                    const name = typeof ai === 'object' ? ai.name : ai;
                    const desc = typeof ai === 'object' ? ai.description : 'Peningkatan kecerdasan buatan otomatis.';
                    const benefit = typeof ai === 'object' ? ai.benefit : 'Menghemat waktu pemrosesan manual.';

                    return (
                      <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-cyan-800/40 relative overflow-hidden">
                        <div className="flex items-start gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 animate-pulse" />
                          <h5 className="font-bold text-cyan-200">{name}</h5>
                        </div>
                        <p className="text-[11px] text-slate-400 mb-2">{desc}</p>
                        {benefit && (
                          <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 p-1.5 rounded border border-emerald-800/40">
                            Dampak: {benefit}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center text-slate-500">
                  Belum ada fitur AI spesifik yang ditambahkan pada modul ini.
                </div>
              )}
            </div>
          )}

          {/* TAB 7: ARCHITECTURE IMPACT */}
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Dampak Terhadap Arsitektur Sistem (Architecture Impact)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-mono text-blue-400 font-bold block mb-2 uppercase">
                    Frontend UI Components
                  </span>
                  <ul className="space-y-1 text-slate-300">
                    {module.architectureImpact?.frontend?.map((fe, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <ChevronRight className="w-3 h-3 text-blue-400" />
                        <span>{fe}</span>
                      </li>
                    )) || <li>-</li>}
                  </ul>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-mono text-cyan-400 font-bold block mb-2 uppercase">
                    Backend Micro-Services / Modules
                  </span>
                  <ul className="space-y-1 text-slate-300">
                    {module.architectureImpact?.backend?.map((be, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <ChevronRight className="w-3 h-3 text-cyan-400" />
                        <span>{be}</span>
                      </li>
                    )) || <li>-</li>}
                  </ul>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-mono text-purple-400 font-bold block mb-2 uppercase">
                    Database Tables & Entities
                  </span>
                  <ul className="space-y-1 text-slate-300">
                    {module.architectureImpact?.database?.map((db, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <ChevronRight className="w-3 h-3 text-purple-400" />
                        <span>{db}</span>
                      </li>
                    )) || <li>-</li>}
                  </ul>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-mono text-emerald-400 font-bold block mb-2 uppercase">
                    REST API Endpoints
                  </span>
                  <ul className="space-y-1 text-slate-300 font-mono text-[11px]">
                    {module.architectureImpact?.api?.map((api, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-emerald-300">
                        <ChevronRight className="w-3 h-3 text-emerald-400" />
                        <span>{api}</span>
                      </li>
                    )) || <li>-</li>}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              onEdit(module);
            }}
            className="px-4 py-2 rounded-xl bg-amber-600/20 border border-amber-500/40 text-amber-300 hover:bg-amber-600/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Edit Modul Ini</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition-all cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
