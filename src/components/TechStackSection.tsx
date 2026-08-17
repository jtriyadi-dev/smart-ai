import React, { useState } from 'react';
import { TECH_STACK } from '../data/content';
import { Info, Atom, Globe, FileCode, Palette, Smartphone, Server, Terminal, Network, Database, HardDrive, Zap, Flame, Sparkles, Bot, Cpu, Workflow, Cloud, Shield, Play } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'database' | 'ai' | 'cloud'>('all');

  const getTechIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom': return <Atom className="w-5 h-5 text-cyan-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-slate-200" />;
      case 'FileCode': return <FileCode className="w-5 h-5 text-blue-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-sky-400" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-indigo-400" />;
      case 'Server': return <Server className="w-5 h-5 text-emerald-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-amber-400" />;
      case 'Network': return <Network className="w-5 h-5 text-purple-400" />;
      case 'Database': return <Database className="w-5 h-5 text-blue-400" />;
      case 'HardDrive': return <HardDrive className="w-5 h-5 text-teal-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-emerald-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-cyan-400" />;
      case 'Bot': return <Bot className="w-5 h-5 text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'Workflow': return <Workflow className="w-5 h-5 text-indigo-400" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-blue-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-orange-400" />;
      case 'Play': return <Play className="w-5 h-5 text-slate-200" />;
      default: return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const filteredTech = activeTab === 'all'
    ? TECH_STACK
    : TECH_STACK.filter(item => item.category === activeTab);

  return (
    <section id="teknologi" className="py-20 md:py-28 relative bg-[#070a12] border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d172e] border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
            <span>MODERN TECH STACK CAPABILITY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Teknologi yang <span className="text-gradient-cyan">Kami Gunakan</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Kami memanfaatkan ekosistem teknologi modern yang teruji, aman, dan siap pakai untuk skala enterprise. Bebas biaya lisensi berkala yang tidak perlu.
          </p>

          {/* Prompt Disclaimer Note */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 text-xs text-left max-w-2xl mx-auto font-normal">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Catatan Arsitektur:</strong> Daftar di bawah ini merupakan opsi teknologi yang siap dikonfigurasikan & dikembangkan sesuai kebutuhan spesifik proyek Anda.
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 font-mono text-xs">
          {[
            { id: 'all', label: 'Semua Stack' },
            { id: 'frontend', label: 'Frontend' },
            { id: 'backend', label: 'Backend' },
            { id: 'database', label: 'Database' },
            { id: 'ai', label: 'AI & Machine Learning' },
            { id: 'cloud', label: 'Cloud & Infrastructure' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-semibold ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTech.map((item, idx) => (
            <div
              key={idx}
              className="card-interactive p-4 flex items-start gap-3.5 group"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                {getTechIcon(item.icon)}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors font-display">
                    {item.name}
                  </h3>
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {item.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

