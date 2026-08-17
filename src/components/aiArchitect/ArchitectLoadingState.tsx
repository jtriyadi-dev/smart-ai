import React, { useState, useEffect } from 'react';
import { Cpu, Server, Database, Shield, Cloud, Sparkles, CheckCircle2 } from 'lucide-react';

interface ArchitectLoadingStateProps {
  onCancel?: () => void;
}

const LOADING_STEPS = [
  { id: 1, text: 'Analyzing Business Requirements & System Scope', icon: Cpu },
  { id: 2, text: 'Designing Application Architecture Pattern (Modular Monolith / Microservices)', icon: Server },
  { id: 3, text: 'Formulating Frontend Architecture (React 19, TypeScript, PWA)', icon: Cpu },
  { id: 4, text: 'Designing Backend Service Layer & Business Logic', icon: Server },
  { id: 5, text: 'Mapping Relational Database Schemas & Entities (PostgreSQL)', icon: Database },
  { id: 6, text: 'Designing REST API Endpoints & Versioning Specifications', icon: Server },
  { id: 7, text: 'Structuring Authentication & Role-Based Access Control (RBAC)', icon: Shield },
  { id: 8, text: 'Designing AI Gateway Proxy & Gemini Model Abstraction Layer', icon: Sparkles },
  { id: 9, text: 'Configuring Cloud Infrastructure & Container Hosting (Cloud Run)', icon: Cloud },
  { id: 10, text: 'Checking Component Dependencies & Security Boundaries', icon: Shield },
  { id: 11, text: 'Validating Architecture Scalability & Cost Efficiency Trade-offs', icon: Cpu },
  { id: 12, text: 'Generating Interactive Visual Architecture Diagram & ERD Canvas', icon: Sparkles }
];

export const ArchitectLoadingState: React.FC<ArchitectLoadingStateProps> = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < LOADING_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const progressPercent = Math.min(100, Math.round(((currentStepIndex + 1) / LOADING_STEPS.length) * 100));

  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center p-8 bg-slate-900 text-white rounded-2xl shadow-2xl relative overflow-hidden my-6 border border-slate-800">
      {/* Background Animated Glow Grids */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="relative z-10 max-w-xl w-full text-center">
        {/* Animated Icon Circle */}
        <div className="relative inline-block mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5 animate-spin-slow">
            <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-9 h-9 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500"></span>
          </span>
        </div>

        <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-200 to-cyan-300 bg-clip-text text-transparent mb-2">
          AI Solution Architect Active
        </h2>
        <p className="text-slate-400 text-sm mb-8">
          Menganalisis requirement dan merumuskan arsitektur sistem yang terstruktur, scalable, secure, dan cloud-ready...
        </p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-2">
            <span>TAHAP {currentStepIndex + 1} DARI {LOADING_STEPS.length}</span>
            <span className="text-cyan-400 font-mono font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-700">
            <div
              className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 h-1.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Active Step Indicator */}
        <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 rounded-xl p-4 text-left shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/20 shrink-0">
              {React.createElement(LOADING_STEPS[currentStepIndex].icon, { className: 'w-5 h-5 animate-spin-slow' })}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-cyan-400 font-semibold tracking-wide uppercase">Sedang Memproses</div>
              <div className="text-sm font-medium text-slate-200 truncate">
                {LOADING_STEPS[currentStepIndex].text}
              </div>
            </div>
          </div>
        </div>

        {/* Mini Steps Check list */}
        <div className="mt-6 grid grid-cols-1 gap-2 text-xs text-left max-h-36 overflow-y-auto pr-1 custom-scrollbar">
          {LOADING_STEPS.slice(0, currentStepIndex + 1).map((step, idx) => {
            const isCurrent = idx === currentStepIndex;
            return (
              <div
                key={step.id}
                className={`flex items-center gap-2 p-1.5 rounded transition-all ${
                  isCurrent ? 'text-cyan-300 font-semibold bg-cyan-950/40 border border-cyan-800/40' : 'text-slate-400 opacity-80'
                }`}
              >
                {isCurrent ? (
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin shrink-0"></div>
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                )}
                <span className="truncate">{step.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
