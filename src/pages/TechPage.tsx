import React from 'react';
import { TECH_STACK } from '../data/content';
import { Cpu, CheckCircle2, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { DeviceCompatibilityShowcase } from '../components/common/DeviceCompatibilityShowcase';

export const TechPage: React.FC = () => {
  const categories = [
    { key: 'frontend', title: 'Frontend Architecture' },
    { key: 'backend', title: 'Backend & Microservices' },
    { key: 'database', title: 'Database & Storage' },
    { key: 'ai', title: 'Artificial Intelligence Engine' },
    { key: 'cloud', title: 'Cloud Infrastructure & DevOps' },
  ];

  return (
    <div className="py-24 md:py-32 bg-[#06090e] bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>EKOSISTEM TEKNOLOGI ENTERPRISE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Technology <span className="text-gradient-cyan">Ecosystem</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Teknologi dan kerangka kerja modern yang siap diintegrasikan untuk membangun aplikasi web custom berkinerja tinggi, aman, dan mudah diskalakan.
          </p>

          {/* Mandatory Disclaimer Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 font-mono text-center max-w-2xl mx-auto flex items-center justify-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Technology ecosystem yang dapat digunakan dalam pengembangan solusi sesuai kebutuhan arsitektur bisnis Anda.</span>
          </div>
        </div>

        {/* Categories Breakdown */}
        <div className="space-y-12">
          {categories.map((cat) => {
            const items = TECH_STACK.filter(t => t.category === cat.key);
            return (
              <div key={cat.key} className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10">
                <h3 className="text-xl font-display font-bold text-white mb-6 pb-3 border-b border-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span>{cat.title}</span>
                </h3>

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {items.map((tech, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2"
                    >
                      <div className="text-sm font-bold text-white font-display flex items-center justify-between">
                        <span>{tech.name}</span>
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {tech.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Cross-Platform Device Architecture & Compatibility */}
        <div className="mt-16">
          <DeviceCompatibilityShowcase />
        </div>

        {/* Cloud Security Banner */}
        <div className="mt-16 p-8 rounded-2xl glass-panel border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-white font-display">Standar Keamanan & Performa Kelas Enterprise</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Setiap aplikasi yang dibangun oleh SMART-AI.ID dilengkapi skema enkripsi SSL/TLS, proteksi OWASP Top 10, isolasi database, serta otomatisasi CI/CD deployment.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-950/80 px-4 py-2.5 rounded-xl border border-cyan-500/40 shrink-0">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Enterprise Grade Security</span>
          </div>
        </div>

      </div>
    </div>
  );
};
