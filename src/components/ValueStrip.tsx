import React from 'react';
import { Code2, Cpu, Smartphone, Layers, Target } from 'lucide-react';

export const ValueStrip: React.FC = () => {
  const items = [
    { label: 'CUSTOM DEVELOPMENT', icon: Code2, desc: '100% Tailored Architecture' },
    { label: 'AI READY', icon: Cpu, desc: 'Google Gemini & LLM Integrated' },
    { label: 'RESPONSIVE', icon: Smartphone, desc: 'Desktop, Tablet & Mobile App' },
    { label: 'SCALABLE', icon: Layers, desc: 'High Performance Cloud Native' },
    { label: 'BUSINESS FOCUSED', icon: Target, desc: 'Designed for High ROI' },
  ];

  return (
    <section className="border-y border-slate-800/80 bg-[#070b14] py-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop / Tablet Horizontal Strip */}
        <div className="hidden md:flex items-center justify-between gap-4 font-mono text-xs text-slate-300">
          {items.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <React.Fragment key={item.label}>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 group-hover:border-cyan-500/50 group-hover:text-cyan-300 transition-colors">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white tracking-wider text-[11px] group-hover:text-cyan-300 transition-colors">
                      {item.label}
                    </div>
                    <div className="text-[10px] text-slate-400 font-sans">
                      {item.desc}
                    </div>
                  </div>
                </div>
                {idx < items.length - 1 && (
                  <div className="h-6 w-[1px] bg-slate-800/80"></div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile Grid View */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:hidden font-mono text-xs">
          {items.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.label}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5 text-left"
              >
                <div className="p-1.5 rounded-lg bg-slate-800 text-cyan-400 shrink-0">
                  <IconComp className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-white text-[10px] tracking-wide truncate">
                    {item.label}
                  </div>
                  <div className="text-[9px] text-slate-400 font-sans truncate">
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
