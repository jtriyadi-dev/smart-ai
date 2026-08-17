import React, { useState, useEffect } from 'react';
import { Sparkles, Cpu, CheckCircle2, Search, FileText, Database, Shield, ShieldCheck } from 'lucide-react';

interface RequirementLoadingStateProps {
  businessName?: string;
  industry?: string;
}

export const RequirementLoadingState: React.FC<RequirementLoadingStateProps> = ({
  businessName,
  industry
}) => {
  const stages = [
    { title: 'Understanding Business Context & Objectives', detail: 'Menganalisis profil dan target bisnis perusahaan' },
    { title: 'Analyzing Operational Processes & Pain Points', detail: 'Mengidentifikasi bottleneck dan masalah operasional' },
    { title: 'Defining Business & Functional Requirements', detail: 'Menyusun daftar BR-001 dan FR-001 terstruktur' },
    { title: 'Designing Core Application Modules', detail: 'Mengelompokkan fitur ke dalam modul sistem' },
    { title: 'Mapping User Roles & Permission Matrix', detail: 'Merumuskan matriks otorisasi RBAC (Super Admin, Manager, Staff)' },
    { title: 'Mapping Business Workflows & Approval Steps', detail: 'Menyusun skema alur persetujuan bertingkat' },
    { title: 'Identifying System Integrations & APIs', detail: 'Deteksi kebutuhan WhatsApp Gateway, Export, & Payment API' },
    { title: 'Defining AI Requirements & Data Needs', detail: 'Merumuskan spesifikasi Google Gemini AI Copilot & OCR' },
    { title: 'Checking Dependencies & Project Risks', detail: 'Identifikasi asumsi, pertanyaan terbuka, & potensi risiko' },
    { title: 'Preparing Software Requirement Specification (SRS)', detail: 'Finalisasi dokumen spesifikasi teknis' }
  ];

  const [activeStage, setActiveStage] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => {
        if (prev < stages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [stages.length]);

  return (
    <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-12 border border-cyan-500/30 text-center space-y-8 shadow-2xl shadow-cyan-950/40">
      
      {/* Central Visual Pulsing Radar */}
      <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping"></div>
        <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-cyan-600 to-indigo-600 animate-spin opacity-40"></div>
        <div className="relative w-20 h-20 rounded-full bg-slate-950 border border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/50">
          <Cpu className="w-10 h-10 text-cyan-400 animate-pulse" />
        </div>
      </div>

      {/* Header Info */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>AI BUSINESS ANALYST IS ANALYZING REQUIREMENTS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
          Menyusun Software Requirement Specification (SRS)
        </h2>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Menganalisis kebutuhan <span className="text-cyan-300 font-bold">{businessName || 'Perusahaan Klien'}</span> ({industry || 'Industri'})...
        </p>
      </div>

      {/* Live Stage Progress Steps */}
      <div className="max-w-xl mx-auto space-y-3 text-left bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between text-xs font-mono text-cyan-400 font-bold mb-2 pb-2 border-b border-slate-800">
          <span>TAHAP ANALISIS AI ({activeStage + 1}/{stages.length})</span>
          <span>{Math.round(((activeStage + 1) / stages.length) * 100)}%</span>
        </div>

        {stages.map((stg, idx) => {
          const isDone = idx < activeStage;
          const isCurrent = idx === activeStage;

          return (
            <div
              key={idx}
              className={`flex items-start gap-3 p-2.5 rounded-xl transition-all duration-300 ${
                isCurrent
                  ? 'bg-cyan-950/70 border border-cyan-500/50 text-white shadow-md'
                  : isDone
                  ? 'text-slate-300 opacity-80'
                  : 'text-slate-600 opacity-40'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Cpu className="w-4 h-4 text-cyan-400 animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold leading-tight ${isCurrent ? 'text-cyan-300' : isDone ? 'text-slate-200' : 'text-slate-500'}`}>
                  {stg.title}
                </p>
                {isCurrent && (
                  <p className="text-[11px] text-slate-400 mt-0.5 animate-pulse">
                    {stg.detail}...
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-slate-500 font-mono">
        SMART-AI.ID AI Engine • Google Gemini 2.5 Flash • Structured SRS Output
      </div>
    </div>
  );
};
